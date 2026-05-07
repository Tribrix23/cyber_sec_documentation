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

const commonFormats = [
  { name: 'descrypt', kernel: 'descrypt', desc: 'Traditional DES-based Unix crypt, 13-char, very fast.', example: '$1$salt$hash' },
  { name: 'bcrypt', kernel: 'bcrypt', desc: 'Blowfish-based, deliberately slow. Uses $2a$, $2b$, $2y$ prefixes.', example: '$2y$12$salt...' },
  { name: 'md5crypt', kernel: 'md5crypt', desc: 'MD5-based crypt ($1$). Still common on legacy systems.', example: '$1$salt$hash' },
  { name: 'sha512crypt', kernel: 'sha512crypt', desc: 'SHA-512-based crypt ($6$). Default on modern Linux.', example: '$6$salt$hash' },
  { name: 'sha256crypt', kernel: 'sha256crypt', desc: 'SHA-256-based crypt ($5$). Intermediate between md5crypt and sha512crypt.', example: '$5$salt$hash' },
  { name: 'yescrypt', kernel: 'yescrypt', desc: 'Memory-hard algorithm; better than bcrypt.', example: '$y$j9T$salt...' },
  { name: 'scrypt', kernel: 'scrypt', desc: 'Memory-hard; designed to thwart GPU/ASIC attacks.', example: '$s0$salt...' },
  { name: 'argon2', kernel: 'argon2', desc: 'Password Hashing Competition winner; very memory-hard.', example: '$argon2i$...' },
  { name: 'NT', kernel: 'NT', desc: 'Windows NTLM hash (MD4 of UTF-16LE password).', example: 'aad3b435b51404eeaad3b435b51404ee' },
  { name: 'LM', kernel: 'LM', desc: 'Legacy Windows LAN Manager; uppercase only, split in half.', example: '299BD128C1101FD6' },
  { name: 'raw-md5', kernel: 'raw-md5', desc: 'Bare 32-char hex MD5; no salt.', example: '5d41402abc4b2a76b9719d911017c592' },
  { name: 'raw-sha1', kernel: 'raw-sha1', desc: 'Bare 40-char hex SHA1.', example: '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12' },
  { name: 'raw-sha256', kernel: 'raw-sha256', desc: 'Bare 64-char hex SHA256.', example: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08' },
  { name: 'raw-sha512', kernel: 'raw-sha512', desc: 'Bare 128-char hex SHA512.', example: 'ee26b0dd4af7...' },
  { name: 'mysql', kernel: 'mysql', desc: 'MySQL 4.1+ SHA1(SHA1(password)).', example: '*94BDCEBE19083CE2A1F959...*' },
  { name: 'md5-apr', kernel: 'md5-apr', desc: 'Apache $apr1$ MD5.', example: '$apr1$salt$hash' },
  { name: 'sha1-google', kernel: 'sha1-google', desc: 'Google credentials hash.', example: 'username:google:hash' },
  { name: 'ssh', kernel: 'ssh', desc: 'SSH private key passphrase (RSA/DSA/ECDSA/ED25519).', example: '-----BEGIN OPENSSH PRIVATE KEY-----' },
  { name: 'zip', kernel: 'zip', desc: 'ZIP archive password (traditional or AES).', example: 'PKZIP encrypted file data' },
  { name: 'rar', kernel: 'rar', desc: 'RAR archive password.', example: 'RAR!...' },
  { name: 'pdf', kernel: 'pdf', desc: 'PDF document encryption (40/128-bit RC4 or AES).', example: 'ownerkey/userkey' },
  { name: 'office', kernel: 'office', desc: 'MS Office 97-2003 (RC4) and 2007-2016 (AES).', example: '$office$*$...' },
  { name: 'keepass', kernel: 'keepass', desc: 'KeePass 1.x (KDB) and 2.x (KDBX) master key.', example: '$keepass$...' },
  { name: 'hccapx', kernel: 'hccapx', desc: 'WPA/WPA2 PSK handshake (hccapx format).', example: 'WPA PSK handshake capture' },
  { name: 'bitcoin', kernel: 'bitcoin', desc: 'Bitcoin wallet passphrase (sha256).', example: 'encrypted wallet.dat' },
  { name: 'telegram', kernel: 'telegram', desc: 'Telegram desktop app passphrase (mtp).', example: 'tdata folder hash' },
  { name: 'whatsapp', kernel: 'whatsapp', desc: 'WhatsApp crypt key.', example: 'WhatsApp database key' },
];

export default function JohnHashFormatsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-database-2-line" />
          Hash Formats
        </div>
        <DocHeading level={1}>Supported Hash Formats</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          John the Ripper Jumbo supports over 400 hash and cipher formats. From classic Unix crypt hashes to modern memory-hard algorithms, from encrypted archives to Windows NTLM — John can crack them all.
        </p>
        <p className="text-cyber-text leading-relaxed mt-2">
          When you run <InlineCode>john --list=formats</InlineCode>, the output lists formats by their kernel name. You specify them with <InlineCode>--format=&lt;name&gt;</InlineCode>.
        </p>
        <Callout type="tip">
          If you do not specify a format, John auto-detects from the hash structure. Explicitly setting <InlineCode>--format</InlineCode> can improve speed by selecting a dedicated optimized code path.
        </Callout>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Common Hash Formats</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          These are the formats you will encounter most frequently in CTFs, pentests, and real-world engagements:
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {commonFormats.map((fmt, i) => (
            <div key={i} className="cyber-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-cyan">{fmt.name}</span>
              </div>
              <p className="text-xs text-cyber-text mb-2">{fmt.desc}</p>
              <p className="text-[10px] text-cyber-text-dim font-mono truncate" title={fmt.example}>{fmt.example}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Listing All Formats</DocHeading>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">List every supported format</h4>
            <CodeBlock code="john --list=formats" />
            <p className="text-xs text-cyber-text mt-2">
              Outputs over 400 format names in a comma-separated list.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Pretty-print one per line</h4>
            <CodeBlock code="john --list=formats | tr ',' '\n' | less" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Count how many formats are supported</h4>
            <CodeBlock code="john --list=formats | tr ',' '\n' | wc -l" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Filter by substring</h4>
            <CodeBlock code="john --list=formats | tr ',' '\n' | grep -i sha" />
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Counting Formats</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          The John Jumbo build contains hundreds of formats across categories:
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { cat: 'Unix crypts', count: '20+', desc: 'DES, MD5, SHA, yescrypt, argon2, etc.' },
            { cat: 'Windows', count: '10+', desc: 'NTLM, LM, cached credentials, Syskey.' },
            { cat: 'Documents', count: '15+', desc: 'PDF, Office, OpenDocument, iWork.' },
            { cat: 'Archives', count: '12+', desc: 'ZIP, RAR, 7z, TAR with encryption.' },
            { cat: 'Network', count: '8+', desc: 'WPA/WPA2, WEP, WPAPSK, SSH.' },
            { cat: 'Databases', count: '20+', desc: 'MySQL, PostgreSQL, Oracle, SQLite.' },
            { cat: 'Applications', count: '50+', desc: 'KeePass, LastPass, 1Password, Telegram.' },
            { cat: 'Blockchain', count: '5+', desc: 'Bitcoin, Ethereum, Monero wallet hashes.' },
          ].map((item, i) => (
            <div key={i} className="cyber-card p-4">
              <h4 className="text-sm font-semibold text-cyber-cyan">{item.cat}</h4>
              <p className="text-xs text-cyber-cyan/70 mt-0.5">{item.count} formats</p>
              <p className="text-xs text-cyber-text mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Understanding Format Strength</DocHeading>
        <div className="mt-4 space-y-3">
          {[
            { label: 'Fast Hashes', desc: 'SHA1, MD5, NTLM — billions of guesses/sec on GPU. Use wordlists or external patterns.', icon: 'ri-flashlight-line', color: 'cyber-green' },
            { label: 'Moderate Hashes', desc: 'bcrypt, sha512crypt — tens to hundreds of thousands/sec. Require longer wordlists or rules.', icon: 'ri-timer-line', color: 'cyber-amber' },
            { label: 'Slow Hashes', desc: 'scrypt, argon2 — thousands/sec or less. Only feasible with rule-rich wordlists; brute force infeasible.', icon: 'ri-pause-circle-line', color: 'cyber-red' },
          ].map((item, i) => (
            <div key={i} className="cyber-card p-4">
              <div className="flex items-start gap-3">
                <span className={`w-8 h-8 rounded-lg bg-${item.color}/10 border border-${item.color}/20 flex items-center justify-center text-${item.color} flex-shrink-0`}>
                  <i className={item.icon} />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-white">{item.label}</h4>
                  <p className="text-xs text-cyber-text mt-1">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Callout type="warning" className="mt-4">
          Cracking Argon2 or high-cost scrypt hashes on CPU can take seconds per guess. GPU accelerates but still orders of magnitude slower than MD5. Budget your cracking time accordingly.
        </Callout>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Identifying Unknown Formats</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          If you encounter a hash you do not recognize:
        </p>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">1. Check format manually with --list</h4>
            <CodeBlock code="john --list=formats | grep -i 'md5\\|sha'" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">2. Use online hash identifier tools</h4>
            <p className="text-xs text-cyber-text">
              hash-identifier, hashid, or online services can suggest format based on prefix and length.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">3. Look at hash structure</h4>
            <p className="text-xs text-cyber-text">
              Patterns: unix crypt starts with $id$; Windows NTLM is 32 hex upper/lower; bcrypt uses $2a$, $2b$, $2y$; salt is usually embedded.
            </p>
          </div>
        </div>
        <Callout type="info">
          John will usually auto-detect correctly, but for some ambiguous cases (e.g., raw SHA256 vs salted SHA256 variant) you need to know the exact format.
        </Callout>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/john-the-ripper/rules" className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg text-sm font-semibold hover:bg-cyber-cyan-dim transition-all whitespace-nowrap">
            Next: Rules <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/john-the-ripper/external-mode" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-cyan hover:text-cyber-cyan transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
