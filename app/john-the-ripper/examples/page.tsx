'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const examples = [
  {
    title: 'Crack Unix /etc/shadow entry (sha512crypt)',
    cmd: 'john --wordlist=rockyou.txt --rules --format=sha512crypt hashes.txt',
    desc: 'Most common: shadow file entry. After extracting with unshadow, use --format=sha512crypt.',
    note: 'Extract with: unshadow /etc/passwd /etc/shadow > hashes.txt',
  },
  {
    title: 'Crack Windows NTLM hash dump',
    cmd: 'john --wordlist=rockyou.txt --rules ntlm_hashes.txt',
    desc: 'From mimikatz, secretsdump, or ntlmssp capture. Auto-detect format typically works without --format=NT.',
    note: 'NTLM is fast: billions/sec with GPU.',
  },
  {
    title: 'Crack captured WPA/WPA2 PSK handshake',
    cmd: 'john --wordlist=rockyou.txt --rules --format=hccapx capture.hccapx',
    desc: 'Convert .pcap with hccapx (aircrack-ng tools) or hcxpcapngtool, then crack.',
    note: 'WPA2 is intentionally slow (~500-1000 guesses/sec CPU).',
  },
  {
    title: 'Extract + crack ZIP password',
    cmd: 'zip2john archive.zip > zip_hash.txt\njohn --wordlist=rockyou.txt zip_hash.txt',
    desc: 'Two-step: extract PKZIP hash, then crack.',
    note: 'ZIP crypto is weak; millions/sec possible.',
  },
  {
    title: 'Extract + crack RAR archive',
    cmd: 'rar2john secret.rar > rar_hash.txt\njohn --wordlist=rockyou.txt rar_hash.txt',
    desc: 'RAR v3 and v5 supported; v5 is much slower.',
    note: 'RAR5 uses AES; expect <100 guesses/sec on CPU.',
  },
  {
    title: 'Crack encrypted PDF',
    cmd: 'pdf2john.pl document.pdf > pdf_hash.txt\njohn --wordlist=rockyou.txt pdf_hash.txt',
    desc: 'Older PDFs use RC4 (faster); newer use AES (slower).',
    note: 'Add -s for AES support if pdf2john complains.',
  },
  {
    title: 'Crack SSH private key passphrase',
    cmd: 'ssh2john id_rsa > ssh_hash.txt\njohn --wordlist=rockyou.txt ssh_hash.txt',
    desc: 'Only works if the key was encrypted with a passphrase.',
    note: 'SSH key types: RSA, DSA, ECDSA, Ed25519 all supported.',
  },
  {
    title: 'Crack KeePass database',
    cmd: 'keepass2john database.kdbx > kp_hash.txt\njohn --wordlist=rockyou.txt kp_hash.txt',
    desc: 'KeePass 1.x (.kdb) and 2.x (.kdbx) supported.',
    note: 'Very slow — AES + many rounds. Expect hundreds/sec.',
  },
  {
    title: 'GPU-accelerated md5crypt cracking',
    cmd: 'john --format=md5crypt-opencl --wordlist=rockyou.txt hashes.txt',
    desc: 'If John was built with OpenCL, use -opencl variants for GPU.',
    note: 'Benchmark: john --format=md5crypt-opencl --test',
  },
  {
    title: 'Crack with incremental after wordlist fails',
    cmd: 'john --wordlist=rockyou.txt --incremental hashes.txt',
    desc: 'Wordlist first, then fallback to brute force. Handy for remaining hashes.',
    note: 'Warning: incremental is extremely slow beyond 7 characters.',
  },
  {
    title: 'Crack with custom rules file',
    cmd: 'john --wordlist=rockyou.txt --rules=OfficeRules hashes.txt',
    desc: 'Create a .rules file in ~/.john/john.conf or current directory.',
    note: 'Rule syntax: one operation per line; see doc/RULES in source.',
  },
  {
    title: 'Single crack mode first pass',
    cmd: 'john --single hashes.txt',
    desc: 'Always run this first — it is fast and often cracks many hashes immediately.',
    note: 'Works best on hashes with username/gecos accessible.',
  },
  {
    title: 'Restore interrupted session',
    cmd: 'john --restore=crack_session',
    desc: 'Resume a stopped/cancelled cracking session.',
    note: 'Use --session=name to save session on initial run.',
  },
  {
    title: 'Multi-core parallel cracking',
    cmd: 'john --fork=4 --wordlist=rockyou.txt hashes.txt',
    desc: 'Spaunches 4 John processes; distributes hash space across CPU cores.',
    note: 'Do not exceed core count; diminishing returns beyond cores.',
  },
  {
    title: 'Crack WEP WiFi key (not WPA)',
    cmd: 'john --format=wep --incremental=ASCII wep_hash.txt',
    desc: 'WEP uses RC4 with known IVs; much faster than WPA.',
    note: 'Obtain .hccap/.pcap with aireplay-ng, convert with aircrack tools.',
  },
  {
    title: 'Show cracked passwords only',
    cmd: 'john --show hashes.txt',
    desc: 'Lists cracked passwords along with the hash, leaving uncracked ones untouched.',
    note: 'To see only cracked: john --show --format=... hashes.txt',
  },
  {
    title: 'Limit password length (incremental)',
    cmd: 'john --incremental --max-length=6 --format=raw-md5 hashes.txt',
    desc: 'Practical for short PIN codes or 6-character alphanumeric.',
    note: '6 lowercase = 308 million combinations; ~10 min at 500k p/s.',
  },
  {
    title: 'Crack Bitcoin wallet',
    cmd: 'bitcoin2john wallet.dat > btc_hash.txt\njohn --wordlist=rockyou.txt btc_hash.txt',
    desc: 'Bitcoin Core wallet.dat uses SHA256 encryption of passphrase.',
    note: 'wallet.dat must be unencrypted wallet version prior to v2.',
  },
  {
    title: 'Squid proxy digest auth',
    cmd: 'john --format=md5-apr --wordlist=rockyou.txt squid_hashes.txt',
    desc: 'Apache apr1 (MD5) format for HTTP Digest or Squid proxy.',
    note: 'Also works for many legacy web apps.',
  },
  {
    title: 'Crack with multiple wordlists',
    cmd: 'john --wordlist=rockyou.txt --wordlist=common.txt --wordlist=employees.txt hashes.txt',
    desc: 'Sequential: tries all words from first, then second, then third list.',
    note: 'No priority; you can order lists by likelihood to be efficient.',
  },
];

export default function JohnExamplesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-file-list-line" />
          Real-World Usage
        </div>
        <DocHeading level={1}>Examples</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          A collection of common John the Ripper commands for real-world password cracking scenarios. Each example shows how to handle a specific hash type and which mode is most effective.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="space-y-4">
          {examples.map((ex, i) => (
            <div key={i} className="cyber-card p-5">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white">{ex.title}</h3>
                  <p className="text-xs text-cyber-text mt-1">{ex.desc}</p>
                </div>
              </div>
              <div className="mt-3 ml-10">
                <CodeBlock code={ex.cmd} />
                {ex.note && (
                  <p className="text-xs text-cyber-amber mt-2">
                    <i className="ri-lightbulb-line mr-1" />
                    Note: {ex.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Extraction Strategy Cheatsheet</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Match the file type to the right extraction tool:
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { file: 'ZIP archive', tool: 'zip2john', note: 'work on all ZIP encryption types' },
            { file: 'RAR archive', tool: 'rar2john', note: 'RAR v3 and v5 both supported' },
            { file: 'PDF document', tool: 'pdf2john.pl', note: 'add -s flag for AES PDFs' },
            { file: 'SSH private key', tool: 'ssh2john', note: 'works for RSA/DSA/ECDSA/Ed25519' },
            { file: 'KeePass DB', tool: 'keepass2john', note: 'both .kdb and .kdbx' },
            { file: 'Office file', tool: 'office2john', note: 'doc/xls/ppt old and new' },
            { file: 'WPA handshake', tool: 'hccap2john', note: 'convert .pcap to .hccapx first' },
            { file: 'GPG key', tool: 'gpg2john', note: 'encrypted private keys only' },
            { file: 'Bitcoin wallet', tool: 'bitcoin2john', note: 'wallet.dat (old format)' },
          ].map((item, i) => (
            <div key={i} className="cyber-card p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-green">{item.tool}</span>
              </div>
              <h4 className="text-sm font-semibold text-white">{item.file}</h4>
              <p className="text-xs text-cyber-text mt-1">{item.note}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/john-the-ripper/pro-tips" className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg text-sm font-semibold hover:bg-cyber-cyan-dim transition-all whitespace-nowrap">
            Next: Pro Tips <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/john-the-ripper/command-builder" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-cyan hover:text-cyber-cyan transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
