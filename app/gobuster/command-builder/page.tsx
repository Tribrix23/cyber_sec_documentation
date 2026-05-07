'use client'
import { useState, useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const modes = [
  { value: 'dir', label: 'dir' },
  { value: 'dns', label: 'dns' },
  { value: 'vhost', label: 'vhost' },
  { value: 's3', label: 's3' },
  { value: 'fuzz', label: 'fuzz' },
];

const globalFlags = [
  { value: '-v', label: 'Verbose (-v)' },
  { value: '-z', label: 'Suppress progress (-z)' },
  { value: '-q', label: 'Quiet (-q)' },
  { value: '-k', label: 'Skip TLS verify (-k)' },
];

export default function GobusterCommandBuilderPage() {
  const [mode, setMode] = useState('dir');
  const [target, setTarget] = useState('http://10.0.0.1/');
  const [domain, setDomain] = useState('example.com');
  const [wordlist, setWordlist] = useState('/usr/share/wordlists/dirb/common.txt');
  const [threads, setThreads] = useState('10');
  const [extensions, setExtensions] = useState('php,txt,html');
  const [flags, setFlags] = useState<string[]>([]);
  const [output, setOutput] = useState('');
  const [cookie, setCookie] = useState('');
  const [header, setHeader] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFlag = (flag: string) => {
    setFlags((prev) =>
      prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag]
    );
  };

  const getCommand = () => {
    const parts = [`gobuster ${mode}`];

    if (mode !== 's3') {
      parts.push(`-u ${target}`);
    }
    if (mode === 'dns') {
      parts.splice(1, 1);
      parts.push(`-d ${domain}`);
    }

    parts.push(`-w ${wordlist}`);

    if (mode === 'dir' && extensions) {
      parts.push(`-x ${extensions}`);
    }

    if (threads !== '10') {
      parts.push(`-t ${threads}`);
    }

    flags.forEach((f) => parts.push(f));

    if (cookie) {
      parts.push(`-c "${cookie}"`);
    }
    if (header) {
      parts.push(`-H "${header}"`);
    }
    if (output) {
      parts.push(`-o ${output}`);
    }

    return parts.join(' ');
  };

  const copyCommand = () => {
    navigator.clipboard.writeText(getCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
            <i className="ri-tools-line" />
            Gobuster Section 10 of 13
          </div>
          <DocHeading level={1}>Interactive Command Builder</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3 text-lg">
            Select a mode, configure options, and generate copy-ready Gobuster commands. This tool helps you learn flag combinations and build complex commands visually.
          </p>
        </motion.div>

        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="cyber-card p-5 md:p-6">
            {/* Mode */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-white block mb-2">Mode</label>
              <div className="flex flex-wrap gap-2">
                {modes.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setMode(m.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${
                      mode === m.value
                        ? 'bg-cyber-red/10 border-cyber-red text-cyber-red'
                        : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-red/50'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target / Domain */}
            {mode !== 's3' && mode !== 'dns' && (
              <div className="mb-4">
                <label className="text-sm font-semibold text-white block mb-2">Target URL</label>
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
                  placeholder="http://10.0.0.1/"
                />
              </div>
            )}
            {mode === 'dns' && (
              <div className="mb-4">
                <label className="text-sm font-semibold text-white block mb-2">Domain</label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
                  placeholder="example.com"
                />
              </div>
            )}

            {/* Wordlist */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Wordlist</label>
              <input
                type="text"
                value={wordlist}
                onChange={(e) => setWordlist(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
                placeholder="/usr/share/wordlists/dirb/common.txt"
              />
            </div>

            {/* Extensions (dir mode) */}
            {mode === 'dir' && (
              <div className="mb-4">
                <label className="text-sm font-semibold text-white block mb-2">Extensions (-x)</label>
                <input
                  type="text"
                  value={extensions}
                  onChange={(e) => setExtensions(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
                  placeholder="php,txt,html"
                />
              </div>
            )}

            {/* Threads */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Threads (-t)</label>
              <input
                type="number"
                value={threads}
                onChange={(e) => setThreads(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
                placeholder="10"
              />
            </div>

            {/* Global Flags */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Extra Flags</label>
              <div className="flex flex-wrap gap-2">
                {globalFlags.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => toggleFlag(f.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${
                      flags.includes(f.value)
                        ? 'bg-cyber-red/10 border-cyber-red text-cyber-red'
                        : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-red/50'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cookie */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Cookie (-c)</label>
              <input
                type="text"
                value={cookie}
                onChange={(e) => setCookie(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
                placeholder="session=abc123"
              />
            </div>

            {/* Header */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Custom Header (-H)</label>
              <input
                type="text"
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
                placeholder="Authorization: Bearer token"
              />
            </div>

            {/* Output */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-white block mb-2">Output File (-o)</label>
              <input
                type="text"
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
                placeholder="results.txt"
              />
            </div>

            {/* Generated Command */}
            <div className="bg-cyber-bg border border-cyber-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-cyber-red uppercase tracking-wider">Generated Command</span>
                <button
                  type="button"
                  onClick={copyCommand}
                  className="text-xs text-cyber-cyan hover:text-cyber-cyan-dim transition-colors flex items-center gap-1"
                >
                  <i className={copied ? 'ri-check-line text-cyber-green' : 'ri-file-copy-line'} />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="text-sm font-mono text-cyber-green break-all">{getCommand()}</code>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Callout type="tip">
            Try combining <strong className="text-cyber-cyan">dir</strong> mode with <strong className="text-cyber-cyan">-x php,txt,bak</strong> for comprehensive web enumeration.              Add <strong className="text-cyber-cyan">-k</strong> when scanning HTTPS with self-signed certificates.
          </Callout>

          <div className="mt-8 flex gap-3">
            <a href="/gobuster/pro-tips" className="px-5 py-2.5 rounded-lg bg-cyber-red text-white text-sm font-semibold hover:bg-cyber-red/80 transition-all whitespace-nowrap">
              Next: Pro Tips <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/gobuster/examples" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
  );
}