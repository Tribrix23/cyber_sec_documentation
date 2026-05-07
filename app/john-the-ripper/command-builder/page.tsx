'use client'
import { useEffect, useState } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function JohnCommandBuilderPage() {
  const [mode, setMode] = useState('wordlist');
  const [hashFile, setHashFile] = useState('hashes.txt');
  const [wordlist, setWordlist] = useState('/usr/share/wordlists/rockyou.txt');
  const [format, setFormat] = useState('');
  const [rule, setRule] = useState('');
  const [incremental, setIncremental] = useState('');
  const [session, setSession] = useState('myjob');
  const [fork, setFork] = useState('');
  const [maxLen, setMaxLen] = useState('');
  const [external, setExternal] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [copied, setCopied] = useState(false);

  const generateCommand = () => {
    let cmd = 'john';
    if (mode === 'wordlist' && wordlist) {
      cmd += ` --wordlist=${wordlist}`;
    }
    if (mode === 'incremental') {
      cmd += incremental ? ` --incremental=${incremental}` : ' --incremental';
    }
    if (mode === 'single') {
      cmd += ' --single';
    }
    if (mode === 'external') {
      cmd += external ? ` --external=${external}` : ' --external=custom';
    }
    if (rule) cmd += ` --rules=${rule}`;
    if (format) cmd += ` --format=${format}`;
    if (session) cmd += ` --session=${session}`;
    if (fork) cmd += ` --fork=${fork}`;
    if (maxLen) cmd += ` --max-length=${maxLen}`;
    cmd += ` ${hashFile}`;
    return cmd;
  };

  const copyCommand = () => {
    navigator.clipboard.writeText(generateCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-tools-line" />
          Interactive Tool
        </div>
        <DocHeading level={1}>Command Builder</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Configure your John the Ripper cracking session interactively, then copy the generated command. Select your cracking mode and options below.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-5 md:p-6">
          {/* Cracking Mode */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-white block mb-2">Cracking Mode</label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'single', label: 'Single Crack', desc: 'Fast — uses user info' },
                { value: 'wordlist', label: 'Wordlist', desc: 'Dictionary attack' },
                { value: 'incremental', label: 'Incremental', desc: 'Brute force' },
                { value: 'external', label: 'External', desc: 'Custom generator' },
              ].map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMode(m.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                    mode === m.value
                      ? 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan'
                      : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-cyan/50'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-cyber-text mt-1.5">
              {mode === 'single' && 'Uses login name, GECOS fields, and home directory to generate likely passwords. Extremely fast.'}
              {mode === 'wordlist' && 'Reads passwords from a wordlist file. Most commonly used mode.'}
              {mode === 'incremental' && 'Generates all character combinations. Slow but thorough.'}
              {mode === 'external' && 'Uses custom C-like script for specialized generation.'}
            </p>
          </div>

          {/* Hash File */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-white block mb-2">Hash File</label>
            <input
              type="text"
              value={hashFile}
              onChange={(e) => setHashFile(e.target.value)}
              className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
              placeholder="hashes.txt"
            />
          </div>

          {/* Wordlist (wordlist mode only) */}
          {mode === 'wordlist' && (
            <div className="mb-6">
              <label className="text-sm font-semibold text-white block mb-2">Wordlist Path</label>
              <input
                type="text"
                value={wordlist}
                onChange={(e) => setWordlist(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
                placeholder="/usr/share/wordlists/rockyou.txt"
              />
            </div>
          )}

          {/* Incremental charset */}
          {mode === 'incremental' && (
            <div className="mb-6">
              <label className="text-sm font-semibold text-white block mb-2">Incremental Charset</label>
              <select
                value={incremental}
                onChange={(e) => setIncremental(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text focus:outline-none focus:border-cyber-cyan"
              >
                <option value="">All (default — all printable ASCII)</option>
                <option value="LowerNum">Lowercase + Digits</option>
                <option value="UpperNum">Uppercase + Digits</option>
                <option value="Alpha">Letters only</option>
                <option value="Alnum">Letters + Digits</option>
                <option value="LanMan">LanMan (Win 7-char uppercase)</option>
                <option value="Digits">Digits only</option>
                <option value="ASCII">Printable ASCII</option>
              </select>
            </div>
          )}

          {/* External mode name */}
          {mode === 'external' && (
            <div className="mb-6">
              <label className="text-sm font-semibold text-white block mb-2">External Mode Name</label>
              <input
                type="text"
                value={external}
                onChange={(e) => setExternal(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
                placeholder="MyMode or Alnum4"
              />
              <p className="text-xs text-cyber-text mt-1">List all external modes: <InlineCode>john --list=external</InlineCode></p>
            </div>
          )}

          {/* Hash Format */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-white block mb-2">Hash Format (optional)</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text focus:outline-none focus:border-cyber-cyan"
            >
              <option value="">Auto-detect (recommended)</option>
              <option value="descrypt">descrypt</option>
              <option value="md5crypt">md5crypt</option>
              <option value="sha256crypt">sha256crypt</option>
              <option value="sha512crypt">sha512crypt</option>
              <option value="bcrypt">bcrypt</option>
              <option value="yescrypt">yescrypt</option>
              <option value="NT">NT (Windows NTLM)</option>
              <option value="LM">LM (Windows LAN Manager)</option>
              <option value="raw-md5">raw-md5</option>
              <option value="raw-sha1">raw-sha1</option>
              <option value="raw-sha256">raw-sha256</option>
              <option value="raw-sha512">raw-sha512</option>
              <option value="mysql">mysql</option>
              <option value="zip">zip</option>
              <option value="rar">rar</option>
              <option value="pdf">pdf</option>
              <option value="office">office</option>
              <option value="ssh">ssh</option>
              <option value="keepass">keepass</option>
              <option value="hccapx">hccapx (WPA/WPA2)</option>
              <option value="bitcoin">bitcoin</option>
            </select>
          </div>

          {/* Rules (wordlist mode only) */}
          {mode === 'wordlist' && (
            <div className="mb-6">
              <label className="text-sm font-semibold text-white block mb-2">Rules (optional)</label>
              <select
                value={rule}
                onChange={(e) => setRule(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text focus:outline-none focus:border-cyber-cyan"
              >
                <option value="">None — use raw wordlist</option>
                <option value="Single">Single — fast personal info mutations</option>
                <option value="Wordlist">Wordlist — moderate dictionary mutations</option>
                <option value="Extra">Extra — more aggressive mutations</option>
                <option value="Jumbo">Jumbo — thousands of permutations (slow)</option>
              </select>
            </div>
          )}

          {/* Session */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-white block mb-2">Session Name</label>
            <input
              type="text"
              value={session}
              onChange={(e) => setSession(e.target.value)}
              className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
              placeholder="myjob"
            />
            <p className="text-xs text-cyber-text mt-1">
              Save/restore interrupted sessions with <InlineCode>--session=name</InlineCode> and <InlineCode>--restore=name</InlineCode>.
            </p>
          </div>

          {/* Fork */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-white block mb-2">Fork / Threads (optional)</label>
            <input
              type="number"
              value={fork}
              onChange={(e) => setFork(e.target.value)}
              className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
              placeholder="4"
            />
            <p className="text-xs text-cyber-text mt-1">
              Use <InlineCode>--fork=N</InlineCode> to parallelize across multiple CPU cores.
            </p>
          </div>

          {/* Max Length */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-white block mb-2">Max Password Length (optional)</label>
            <input
              type="number"
              value={maxLen}
              onChange={(e) => setMaxLen(e.target.value)}
              className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
              placeholder="8"
            />
            <p className="text-xs text-cyber-text mt-1">
              Limit guess length with <InlineCode>--max-length=N</InlineCode>. Useful for incremental mode.
            </p>
          </div>

          {/* Generated Command */}
          <div className="bg-cyber-bg border border-cyber-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-cyber-cyan">Generated Command</span>
              <button
                type="button"
                onClick={copyCommand}
                className={`text-xs flex items-center gap-1 transition-colors ${copied ? 'text-cyber-green' : 'text-cyber-cyan hover:text-cyber-cyan-dim'}`}
              >
                <i className={copied ? 'ri-check-line' : 'ri-file-copy-line'} />
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <code className="block text-base font-mono text-cyber-green break-all p-3 bg-cyber-bg-card rounded-lg border border-cyber-border/50">
              {generateCommand()}
            </code>
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Common Presets</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Instead of building from scratch each time, use these proven configurations:
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              title: 'Quick Single + Wordlist',
              cmd: 'john --single --wordlist=rockyou.txt --rules=Wordlist --session=firstpass hashes.txt',
              desc: 'First-pass comprehensive attack',
            },
            {
              title: 'GPU-accelerated MD5',
              cmd: 'john --format=MD5-opencl --wordlist=rockyou.txt hashes.txt',
              desc: 'Massive speedup if OpenCL available',
            },
            {
              title: 'Targeted incremental for PINs',
              cmd: 'john --incremental=Digits --max-length=6 --fork=8 hashes.txt',
              desc: '4-6 digit PIN brute force',
            },
            {
              title: 'Resume interrupted session',
              cmd: 'john --restore=myjob',
              desc: 'Continue where you left off',
            },
            {
              title: 'LM hash cracking (7-char uppercase)',
              cmd: 'john --format=LM --incremental=LanMan hashes.txt',
              desc: 'Legacy Windows LM hashes',
            },
            {
              title: 'WPA2 handshake with wordlist+rules',
              cmd: 'john --wordlist=rockyou.txt --rules --format=hccapx handshake.hccapx',
              desc: 'Crack WPA2 PSK',
            },
          ].map((preset, i) => (
            <div key={i} className="cyber-card p-4">
              <h4 className="text-sm font-semibold text-white">{preset.title}</h4>
              <p className="text-xs text-cyber-text mt-1">{preset.desc}</p>
              <div className="mt-2 p-2 rounded bg-cyber-bg border border-cyber-border">
                <code className="text-xs font-mono text-cyber-green break-all">{preset.cmd}</code>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/john-the-ripper/examples" className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg text-sm font-semibold hover:bg-cyber-cyan-dim transition-all whitespace-nowrap">
            Next: Examples <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/john-the-ripper/hash-extraction" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-cyan hover:text-cyber-cyan transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
