'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const extractionTools = [
  {
    tool: 'zip2john',
    desc: 'Extract password hash from ZIP archives (traditional PKZIP or AES encrypted).',
    example: 'zip2john secret.zip > zip_hash.txt',
    format: 'ZIP',
  },
  {
    tool: 'rar2john',
    desc: 'Extract password hash from RAR archives (v3 and v5).',
    example: 'rar2john secret.rar > rar_hash.txt',
    format: 'RAR',
  },
  {
    tool: 'pdf2john',
    desc: 'Extract password hash from PDF documents (40/128-bit RC4 or AES).',
    example: 'pdf2john.pl document.pdf > pdf_hash.txt',
    format: 'PDF',
  },
  {
    tool: 'ssh2john',
    desc: 'Extract passphrase hash from SSH private keys (RSA, DSA, ECDSA, Ed25519).',
    example: 'ssh2john id_rsa > ssh_hash.txt',
    format: 'SSH',
  },
  {
    tool: 'keepass2john',
    desc: 'Extract hash from KeePass databases (.kdb, .kdbx).',
    example: 'keepass2john database.kdbx > keepass_hash.txt',
    format: 'KeePass',
  },
  {
    tool: 'office2john',
    desc: 'Extract hash from MS Office documents (.doc, .docx, .xls, .xlsx, .ppt, .pptx).',
    example: 'office2john document.docx > office_hash.txt',
    format: 'MS Office',
  },
  {
    tool: 'gpg2john',
    desc: 'Extract hash from GPG/OpenPGP private keys.',
    example: 'gpg2john private.asc > gpg_hash.txt',
    format: 'GPG',
  },
  {
    tool: 'hccap2john',
    desc: 'Convert WPA/WPA2 handshake capture to crackable hash.',
    example: 'hccap2john capture.hccap > wpa_hash.txt',
    format: 'WPA/WPA2',
  },
  {
    tool: 'bitcoin2john',
    desc: 'Extract wallet encryption hash from Bitcoin wallet.dat.',
    example: 'bitcoin2john wallet.dat > btc_hash.txt',
    format: 'Bitcoin',
  },
  {
    tool: '7z2john',
    desc: 'Extract password hash from 7-Zip archives.',
    example: '7z2john archive.7z > sevenz_hash.txt',
    format: '7-Zip',
  },
  {
    tool: 'truecrypt2john',
    desc: 'Extract hash from TrueCrypt/VeraCrypt volumes.',
    example: 'truecrypt2john volume.tc > tc_hash.txt',
    format: 'TrueCrypt',
  },
  {
    tool: 'cvs2john',
    desc: 'Extract hash from CVS repository passfiles.',
    example: 'cvs2john passfile > cvs_hash.txt',
    format: 'CVS pserver',
  },
];

export default function JohnHashExtractionPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-extraction-line" />
          Hash Extraction
        </div>
        <DocHeading level={1}>Hash Extraction Utilities</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Before John can crack a password, you must extract the password hash from the file or system that stores it. John the Ripper Jumbo ships with a large collection of <strong className="text-cyber-green">format-specific extraction tools</strong> — each ends in <InlineCode>2john</InlineCode> and produces a plain-text hash file that John understands.
        </p>
        <p className="text-cyber-text leading-relaxed mt-2">
          The general pattern is: <InlineCode>tool2john &lt;input_file&gt; &gt; output_hashes.txt</InlineCode>. Then run <InlineCode>john output_hashes.txt</InlineCode>.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Commonly Used Extraction Tools</DocHeading>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {extractionTools.map((tool, i) => (
            <div key={i} className="cyber-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-cyan">{tool.tool}</span>
                <span className="text-xs text-cyber-text-dim">{tool.format}</span>
              </div>
              <p className="text-xs text-cyber-text mb-3">{tool.desc}</p>
              <div className="p-2 rounded bg-cyber-bg border border-cyber-border">
                <span className="text-[10px] text-cyber-text-dim font-mono block mb-1">COMMAND</span>
                <code className="text-xs font-mono text-cyber-green break-all">{tool.example}</code>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Full Example: ZIP File</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Let us walk through cracking a password-protected ZIP archive from start to finish:
        </p>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Step 1: Extract the hash</h4>
            <CodeBlock code="zip2john secret.zip > zip_hash.txt" />
            <p className="text-xs text-cyber-text mt-1">
              The output is the PKZIP encrypted-hash string that John consumes.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Step 2: Inspect the hash</h4>
            <CodeBlock code="cat zip_hash.txt" />
            <p className="text-xs text-cyber-text mt-1">
              You will see a line containing the file name inside, salt, and encrypted checksum — all in one.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Step 3: Crack with wordlist</h4>
            <CodeBlock code="john --wordlist=rockyou.txt zip_hash.txt" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Step 4: View cracked password</h4>
            <CodeBlock code="john --show zip_hash.txt" />
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Full Example: SSH Private Key</DocHeading>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Extract from encrypted RSA key</h4>
            <CodeBlock code="ssh2john ~/.ssh/id_rsa > ssh_hash.txt" />
            <p className="text-xs text-cyber-text mt-1">
              If your key has a passphrase, this extracts the encrypted blob for cracking.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Crack with rules (or incrementally if necessary)</h4>
            <CodeBlock code="john --wordlist=rockyou.txt --rules=Jumbo ssh_hash.txt" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Show recovered passphrase</h4>
            <CodeBlock code="john --show ssh_hash.txt" />
          </div>
        </div>
        <Callout type="warning">
          If the SSH key is not encrypted or uses a new OpenSSH format, ssh2john may not extract anything. Ensure the key prompts for a passphrase on load.
        </Callout>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Full Example: PDF Document</DocHeading>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Extract PDF hash (older RC4 encryption)</h4>
            <CodeBlock code="pdf2john.pl document.pdf > pdf_hash.txt" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Extract AES-encrypted PDF (newer files)</h4>
            <CodeBlock code="pdf2john.pl -s document.pdf > pdf_hash.txt" />
            <p className="text-xs text-cyber-text mt-1">
              <InlineCode>-s</InlineCode> enables AES-256 support for newer Adobe versions.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Crack</h4>
            <CodeBlock code="john --wordlist=rockyou.txt --rules pdf_hash.txt" />
          </div>
          <Callout type="tip">
            PDF passwords can be very slow if the file uses AES-256 encryption. Expect only a few hundred guesses per second on a CPU.
          </Callout>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>List All Available Extraction Tools</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          The <InlineCode>2john</InlineCode> tools are scattered across <InlineCode>/usr/share/john</InlineCode> or in the source's <InlineCode>run</InlineCode> directory. List them:
        </p>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">List all 2john scripts in default path</h4>
            <CodeBlock code="ls /usr/share/john/*2john* 2>/dev/null || find . -name '*2john*'" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">From the John source directory</h4>
            <CodeBlock code="find ./run -name '*2john*' -type f | head -20" />
          </div>
        </div>
        <Callout type="info">
          Some extraction tools are actually Perl scripts (.pl), Python scripts (.py), or binary executables. Ensure you have the required interpreter installed (Perl, Python) if the tool complains.
        </Callout>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/john-the-ripper/command-builder" className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg text-sm font-semibold hover:bg-cyber-cyan-dim transition-all whitespace-nowrap">
            Next: Command Builder <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/john-the-ripper/rules" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-cyan hover:text-cyber-cyan transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
