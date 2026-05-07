'use client'
import { useState, useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const crackingModes = [
  {
    mode: 'single',
    name: 'Single Crack Mode',
    desc: 'Uses information from the login name, GECOS fields, and full name to generate likely passwords. Fast and often surprisingly effective.',
    cmd: 'john --single hashes.txt',
    when: 'Always run this first. It is fast and catches many weak passwords.',
  },
  {
    mode: 'wordlist',
    name: 'Wordlist Mode',
    desc: 'Tries passwords from a wordlist file. The most common cracking method. Can be combined with rules for mutations.',
    cmd: 'john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt',
    when: 'When you have a good wordlist and the target hash is not found by single mode.',
  },
  {
    mode: 'incremental',
    name: 'Incremental / Brute Force Mode',
    desc: 'Tries all possible character combinations up to a limit. The slowest but most thorough method.',
    cmd: 'john --incremental hashes.txt',
    when: 'When all other methods fail and you have computational time available.',
  },
  {
    mode: 'external',
    name: 'External Mode',
    desc: 'Uses a custom C-like program to generate candidate passwords. For advanced users who need custom generation logic.',
    cmd: 'john --external=MyMode hashes.txt',
    when: 'When you need a custom algorithm for password generation beyond rules.',
  },
];

const hashFormats = [
  { format: 'md5crypt', desc: 'Traditional MD5-based crypt ($1$)' },
  { format: 'sha512crypt', desc: 'SHA-512-based crypt ($6$)' },
  { format: 'bcrypt', desc: 'Blowfish-based bcrypt ($2a$, $2b$, $2y$)' },
  { format: 'descrypt', desc: 'Traditional DES-based crypt' },
  { format: 'NT', desc: 'Windows NTLM hash' },
  { format: 'LM', desc: 'Windows LAN Manager hash' },
  { format: 'raw-md5', desc: 'Raw MD5 hash (not salted)' },
  { format: 'raw-sha256', desc: 'Raw SHA-256 hash' },
  { format: 'ssh', desc: 'SSH private key passphrase' },
  { format: 'zip', desc: 'ZIP file password' },
  { format: 'rar', desc: 'RAR file password' },
  { format: 'pdf', desc: 'PDF document password' },
  { format: 'office', desc: 'Microsoft Office document password' },
  { format: 'mysql', desc: 'MySQL authentication hash' },
  { format: 'krb5pa-sha1', desc: 'Kerberos 5 pre-auth hash' },
];

const rules = [
  { name: 'None', desc: 'No rules — pure wordlist' },
  { name: 'Single', desc: 'Tries login-derived guesses' },
  { name: 'Wordlist', desc: 'Applies common mutations to wordlist' },
  { name: 'Extra', desc: 'More aggressive mutations: leet speak, case changes' },
  { name: 'Jumbo', desc: 'Extensive rule set with many permutations' },
];

const commands = [
  { title: 'Identify hash format', cmd: 'john --show hashes.txt' },
  { title: 'Show cracked passwords', cmd: 'john --show hashes.txt' },
  { title: 'Crack with specific format', cmd: 'john --format=sha512crypt hashes.txt' },
  { title: 'Restore interrupted session', cmd: 'john --restore=myjob' },
  { title: 'Save progress to named session', cmd: 'john --session=myjob hashes.txt' },
  { title: 'Limit password length', cmd: 'john --max-length=8 hashes.txt' },
  { title: 'Use specific number of threads', cmd: 'john --fork=4 hashes.txt' },
  { title: 'Show current status', cmd: 'john --status=myjob' },
  { title: 'Show cracked + uncracked', cmd: 'john --show=left hashes.txt' },
  { title: 'Convert hash to John format', cmd: 'zip2john file.zip > hashes.txt' },
  { title: 'Convert PDF to John format', cmd: 'pdf2john.pl file.pdf > hashes.txt' },
  { title: 'Convert SSH key to John format', cmd: 'ssh2john id_rsa > hashes.txt' },
  { title: 'Crack with rules enabled', cmd: 'john --wordlist=rockyou.txt --rules hashes.txt' },
  { title: 'Incremental with charset', cmd: 'john --incremental:LowerNum hashes.txt' },
];

const hashExtraction = [
  { tool: 'zip2john', desc: 'Extract password hash from ZIP archives', example: 'zip2john secret.zip > zip_hash.txt' },
  { tool: 'rar2john', desc: 'Extract password hash from RAR archives', example: 'rar2john secret.rar > rar_hash.txt' },
  { tool: 'pdf2john', desc: 'Extract password hash from PDF files', example: 'pdf2john.pl document.pdf > pdf_hash.txt' },
  { tool: 'ssh2john', desc: 'Extract passphrase hash from SSH private keys', example: 'ssh2john id_rsa > ssh_hash.txt' },
  { tool: 'keepass2john', desc: 'Extract hash from KeePass databases', example: 'keepass2john database.kdbx > keepass_hash.txt' },
  { tool: 'office2john', desc: 'Extract hash from MS Office documents', example: 'office2john.doc document.docx > office_hash.txt' },
  { tool: 'gpg2john', desc: 'Extract hash from GPG private keys', example: 'gpg2john private.asc > gpg_hash.txt' },
  { tool: 'hccap2john', desc: 'Convert WPA/WPA2 handshake to John format', example: 'hccap2john capture.hccap > wpa_hash.txt' },
];

export default function JohnTheRipperPage() {
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const [builderMode, setBuilderMode] = useState('wordlist');
  const [builderFile, setBuilderFile] = useState('hashes.txt');
  const [builderWordlist, setBuilderWordlist] = useState('/usr/share/wordlists/rockyou.txt');
  const [builderFormat, setBuilderFormat] = useState('');
  const [builderRule, setBuilderRule] = useState('');
  const [builderSession, setBuilderSession] = useState('myjob');
  const [builderIncremental, setBuilderIncremental] = useState('');
  const [builderFork, setBuilderFork] = useState('');
  const [builderMaxLen, setBuilderMaxLen] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getGeneratedCommand = () => {
    let cmd = 'john';
    if (builderMode === 'wordlist' && builderWordlist) {
      cmd += ` --wordlist=${builderWordlist}`;
    }
    if (builderMode === 'incremental') {
      cmd += builderIncremental ? ` --incremental=${builderIncremental}` : ' --incremental';
    }
    if (builderMode === 'single') {
      cmd += ' --single';
    }
    if (builderMode === 'external') {
      cmd += ' --external=MyMode';
    }
    if (builderRule) {
      cmd += ` --rules=${builderRule}`;
    }
    if (builderFormat) {
      cmd += ` --format=${builderFormat}`;
    }
    if (builderSession) {
      cmd += ` --session=${builderSession}`;
    }
    if (builderFork) {
      cmd += ` --fork=${builderFork}`;
    }
    if (builderMaxLen) {
      cmd += ` --max-length=${builderMaxLen}`;
    }
    cmd += ` ${builderFile}`;
    return cmd;
  };

  const copyCmd = () => {
    navigator.clipboard.writeText(getGeneratedCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
            <i className="ri-lock-unlock-line" />
            Password Cracker
          </div>
          <DocHeading level={1}>John the Ripper</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            <strong className="text-white">John the Ripper (JtR)</strong> is an open-source password cracking tool originally developed by Alexander Peslyak (Solar Designer).
            It supports hundreds of hash and cipher types, including Unix crypts, Windows NTLM, Office documents, PDFs, archives, and more.
            It is the standard tool for password auditing and CTF challenges.
          </p>
        </motion.div>

        {/* Overview */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="overview">What is John the Ripper</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            John combines several cracking modes, an efficient wordlist-based attack engine, and support for multiple CPUs/GPUs (via OpenCL).
            Its rule engine can mutate wordlists with thousands of transformations like appending numbers, leet speak, and case changes.
          </p>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Single crack mode (login info based)',
              'Wordlist mode with custom rules',
              'Incremental brute force mode',
              'External mode (custom C-like code)',
              'GPU acceleration via OpenCL',
              'Session save/restore functionality',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-cyber-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Installation */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="installation">Installation</DocHeading>
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Linux (Kali / apt)</h4>
              <CodeBlock code="sudo apt update && sudo apt install john" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">macOS (Homebrew)</h4>
              <CodeBlock code="brew install john" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Build from Source (Jumbo)</h4>
              <CodeBlock code={"git clone https://github.com/openwall/john.git\ncd john/src\n./configure && make -sj4"} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Verify Installation</h4>
              <CodeBlock code="john --version" />
            </div>
          </div>
          <Callout type="info" className="mt-4">
            The <InlineCode>john-jumbo</InlineCode> package includes all the hash extraction utilities like zip2john, pdf2john, ssh2john, and hundreds of format modules.
          </Callout>
        </motion.section>

        {/* Cracking Modes */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="modes">Cracking Modes</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            John supports four main cracking modes. Each serves a different purpose and should be used at the right stage of your attack.
          </p>
          <div className="mt-5 space-y-3">
            {crackingModes.map((mode) => (
              <button
                key={mode.mode}
                type="button"
                onClick={() => setActiveMode(activeMode === mode.mode ? null : mode.mode)}
                className={`w-full cyber-card p-4 text-left cursor-pointer ${activeMode === mode.mode ? 'border-cyber-cyan' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-cyber-cyan flex-shrink-0">
                    --{mode.mode}
                  </span>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white">{mode.name}</h4>
                    <p className="text-xs text-cyber-text-muted mt-1">{mode.desc}</p>
                    {activeMode === mode.mode && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 space-y-2"
                      >
                        <div className="p-2 rounded bg-cyber-bg border border-cyber-border">
                          <span className="text-[10px] text-cyber-text-dim font-semibold">COMMAND</span>
                          <code className="block text-xs font-mono text-cyber-green mt-1 break-all">{mode.cmd}</code>
                        </div>
                        <p className="text-xs text-cyber-amber">
                          <i className="ri-lightbulb-line mr-1" />
                          {mode.when}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Hash Formats */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="formats">Supported Hash Formats</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            John supports over 400 hash formats. You can list all supported formats with <InlineCode>john --list=formats</InlineCode>. Here are the most common:
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {hashFormats.map((h) => (
              <div key={h.format} className="flex items-start gap-2 p-3 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
                <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-green flex-shrink-0">{h.format}</span>
                <span className="text-xs text-cyber-text-muted">{h.desc}</span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-white mb-2">List all formats</h4>
            <CodeBlock code="john --list=formats | tr ',' '\n' | less" />
          </div>
        </motion.section>

        {/* Rules */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="rules">Rules</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Rules transform wordlist entries by appending numbers, changing case, applying leet speak, and more.
            They massively increase your chances without needing a larger wordlist.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {rules.map((r) => (
              <div key={r.name} className="cyber-card p-4">
                <h4 className="text-sm font-semibold text-white">{r.name}</h4>
                <p className="text-xs text-cyber-text-muted mt-1">{r.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-white mb-2">Enable rules with wordlist mode</h4>
            <CodeBlock code="john --wordlist=rockyou.txt --rules hashes.txt" />
          </div>
          <Callout type="tip" className="mt-4">
            The <InlineCode>Jumbo</InlineCode> rule set applies thousands of mutations. It is slower but catches passwords like <InlineCode>P@ssw0rd123!</InlineCode> from the base word <InlineCode>password</InlineCode>.
          </Callout>
        </motion.section>

        {/* Hash Extraction Tools */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="extraction">Hash Extraction Utilities</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Before cracking files, you need to extract their password hashes into a format John can understand. Jumbo John ships with many conversion tools:
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {hashExtraction.map((h) => (
              <div key={h.tool} className="cyber-card p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-cyan">{h.tool}</span>
                </div>
                <p className="text-xs text-cyber-text-muted mb-2">{h.desc}</p>
                <code className="text-xs font-mono text-cyber-green break-all">{h.example}</code>
              </div>
            ))}
          </div>
          <Callout type="info" className="mt-4">
            After extracting the hash, feed the resulting file to John: <InlineCode>john extracted_hash.txt</InlineCode>
          </Callout>
        </motion.section>

        {/* Commands */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="commands">Command Reference</DocHeading>
          <div className="mt-4 space-y-4">
            {commands.map((c, i) => (
              <div key={i}>
                <h4 className="text-sm font-semibold text-white mb-2">{c.title}</h4>
                <CodeBlock code={c.cmd} />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Interactive Command Builder */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="builder">Interactive Command Builder</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Configure your cracking session and copy the generated John command.
          </p>

          <div className="mt-5 cyber-card p-5 md:p-6">
            {/* Mode */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Cracking Mode</label>
              <div className="flex gap-2 flex-wrap">
                {['single', 'wordlist', 'incremental', 'external'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setBuilderMode(m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap capitalize ${
                      builderMode === m
                        ? 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan'
                        : 'bg-cyber-bg border-cyber-border text-cyber-text-muted hover:border-cyber-cyan/50'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Hash file */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Hash File</label>
              <input
                type="text"
                value={builderFile}
                onChange={(e) => setBuilderFile(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
                placeholder="hashes.txt"
              />
            </div>

            {/* Wordlist (wordlist mode) */}
            {builderMode === 'wordlist' && (
              <div className="mb-4">
                <label className="text-sm font-semibold text-white block mb-2">Wordlist Path</label>
                <input
                  type="text"
                  value={builderWordlist}
                  onChange={(e) => setBuilderWordlist(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
                  placeholder="/usr/share/wordlists/rockyou.txt"
                />
              </div>
            )}

            {/* Incremental charset */}
            {builderMode === 'incremental' && (
              <div className="mb-4">
                <label className="text-sm font-semibold text-white block mb-2">Incremental Charset (optional)</label>
                <select
                  value={builderIncremental}
                  onChange={(e) => setBuilderIncremental(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text focus:outline-none focus:border-cyber-cyan"
                >
                  <option value="">All (default)</option>
                  <option value="LowerNum">Lowercase + Numbers</option>
                  <option value="UpperNum">Uppercase + Numbers</option>
                  <option value="Alpha">All Letters</option>
                  <option value="Alnum">Letters + Numbers</option>
                </select>
              </div>
            )}

            {/* Format */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Hash Format (optional)</label>
              <select
                value={builderFormat}
                onChange={(e) => setBuilderFormat(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text focus:outline-none focus:border-cyber-cyan"
              >
                <option value="">Auto-detect</option>
                <option value="md5crypt">md5crypt</option>
                <option value="sha512crypt">sha512crypt</option>
                <option value="bcrypt">bcrypt</option>
                <option value="descrypt">descrypt</option>
                <option value="NT">NT</option>
                <option value="LM">LM</option>
                <option value="raw-md5">raw-md5</option>
                <option value="raw-sha256">raw-sha256</option>
                <option value="ssh">ssh</option>
                <option value="zip">zip</option>
                <option value="rar">rar</option>
                <option value="pdf">pdf</option>
                <option value="office">office</option>
                <option value="mysql">mysql</option>
              </select>
            </div>

            {/* Rules (wordlist mode) */}
            {builderMode === 'wordlist' && (
              <div className="mb-4">
                <label className="text-sm font-semibold text-white block mb-2">Rules (optional)</label>
                <select
                  value={builderRule}
                  onChange={(e) => setBuilderRule(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text focus:outline-none focus:border-cyber-cyan"
                >
                  <option value="">No rules</option>
                  <option value="Single">Single</option>
                  <option value="Wordlist">Wordlist</option>
                  <option value="Extra">Extra</option>
                  <option value="Jumbo">Jumbo</option>
                </select>
              </div>
            )}

            {/* Session */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Session Name</label>
              <input
                type="text"
                value={builderSession}
                onChange={(e) => setBuilderSession(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
                placeholder="myjob"
              />
            </div>

            {/* Fork */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Fork / Threads (optional)</label>
              <input
                type="number"
                value={builderFork}
                onChange={(e) => setBuilderFork(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
                placeholder="4"
              />
            </div>

            {/* Max length */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-white block mb-2">Max Password Length (optional)</label>
              <input
                type="number"
                value={builderMaxLen}
                onChange={(e) => setBuilderMaxLen(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
                placeholder="8"
              />
            </div>

            {/* Generated Command */}
            <div className="bg-cyber-bg border border-cyber-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-cyber-cyan">Generated Command</span>
                <button
                  type="button"
                  onClick={copyCmd}
                  className="text-xs text-cyber-cyan hover:text-cyber-cyan-dim transition-colors flex items-center gap-1"
                >
                  <i className={copied ? 'ri-check-line' : 'ri-file-copy-line'} />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="text-sm font-mono text-cyber-green break-all">{getGeneratedCommand()}</code>
            </div>
          </div>
        </motion.section>

        {/* Tips */}
        <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="tips">Pro Tips</DocHeading>
          <div className="mt-4 space-y-3">
            <Callout type="tip">Always run <InlineCode>--single</InlineCode> first. It is extremely fast and catches weak passwords based on user information.</Callout>
            <Callout type="info">Use <InlineCode>--fork=4</InlineCode> to utilize multiple CPU cores and speed up cracking significantly.</Callout>
            <Callout type="tip">Save sessions with <InlineCode>--session=name</InlineCode> so you can resume with <InlineCode>--restore=name</InlineCode> if interrupted.</Callout>
            <Callout type="warning">Cracking bcrypt, scrypt, or PBKDF2 hashes is extremely slow. Be prepared for days or weeks of runtime.</Callout>
            <Callout type="info">For GPU acceleration, build John with OpenCL support and use the <InlineCode>--format=bcrypt-opencl</InlineCode> variants.</Callout>
          </div>
        </motion.section>
      </div>
  );
}
