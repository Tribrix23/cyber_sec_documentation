import { useState, useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const scanFlags = [
  { value: '-sS', label: 'SYN Scan (-sS)', default: true },
  { value: '-sT', label: 'Connect Scan (-sT)' },
  { value: '-sU', label: 'UDP Scan (-sU)' },
  { value: '-sV', label: 'Version Detection (-sV)', default: true },
  { value: '-O', label: 'OS Detection (-O)' },
  { value: '-A', label: 'Aggressive (-A)' },
  { value: '-sC', label: 'Default Scripts (-sC)' },
  { value: '-Pn', label: 'Skip Host Discovery (-Pn)' },
  { value: '-n', label: 'No DNS (-n)' },
  { value: '-v', label: 'Verbose (-v)' },
  { value: '-vv', label: 'Very Verbose (-vv)' },
  { value: '-f', label: 'Fragment (-f)' },
  { value: '--traceroute', label: 'Traceroute' },
  { value: '--reason', label: 'Show Reasons' },
  { value: '-6', label: 'IPv6 (-6)' },
];

const timingFlags = [
  { value: '-T0', label: 'Paranoid (-T0)' },
  { value: '-T1', label: 'Sneaky (-T1)' },
  { value: '-T2', label: 'Polite (-T2)' },
  { value: '-T3', label: 'Normal (-T3)', default: true },
  { value: '-T4', label: 'Aggressive (-T4)' },
  { value: '-T5', label: 'Insane (-T5)' },
];

const portOptions = [
  { value: '', label: 'Top 1000 (default)' },
  { value: '-p-', label: 'All 65,535 ports' },
  { value: '-F', label: 'Fast (top 100)' },
  { value: 'custom', label: 'Custom ports' },
];

const scriptOptions = [
  { value: '', label: 'None' },
  { value: 'vuln', label: 'vuln' },
  { value: 'http-title', label: 'http-title' },
  { value: 'ssl-enum-ciphers', label: 'ssl-enum-ciphers' },
  { value: 'smb-os-discovery', label: 'smb-os-discovery' },
  { value: 'dns-brute', label: 'dns-brute' },
  { value: 'ftp-anon', label: 'ftp-anon' },
  { value: 'ssh-brute', label: 'ssh-brute' },
  { value: 'mysql-info', label: 'mysql-info' },
  { value: 'http-enum', label: 'http-enum' },
  { value: 'snmp-brute', label: 'snmp-brute' },
];

const outputOptions = [
  { value: '', label: 'Stdout only' },
  { value: '-oN', label: 'Normal text (-oN)' },
  { value: '-oX', label: 'XML (-oX)' },
  { value: '-oG', label: 'Grepable (-oG)' },
  { value: '-oA', label: 'All formats (-oA)' },
];

export default function NmapCommandBuilderPage() {
  const [target, setTarget] = useState('10.0.0.1');
  const [flags, setFlags] = useState<string[]>(['-sS', '-sV', '-T3']);
  const [portOpt, setPortOpt] = useState('');
  const [customPorts, setCustomPorts] = useState('22,80,443');
  const [script, setScript] = useState('');
  const [output, setOutput] = useState('');
  const [outputFile, setOutputFile] = useState('scan-results');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFlag = (flag: string) => {
    setFlags((prev) => {
      if (prev.includes(flag)) {
        return prev.filter((f) => f !== flag);
      }
      return [...prev, flag];
    });
  };

  const getCommand = () => {
    const parts = ['nmap'];

    // Scan flags (except timing)
    const nonTimingFlags = flags.filter((f) => !f.startsWith('-T'));
    if (nonTimingFlags.length > 0) {
      parts.push(...nonTimingFlags);
    }

    // Timing
    const timing = flags.find((f) => f.startsWith('-T'));
    if (timing) {
      parts.push(timing);
    }

    // Port options
    if (portOpt === '-p-') {
      parts.push('-p-');
    } else if (portOpt === '-F') {
      parts.push('-F');
    } else if (portOpt === 'custom' && customPorts) {
      parts.push(`-p ${customPorts}`);
    }

    // Script
    if (script) {
      parts.push(`--script ${script}`);
    }

    // Output
    if (output === '-oA') {
      parts.push(`-oA ${outputFile}`);
    } else if (output && outputFile) {
      parts.push(`${output} ${outputFile}.${output === '-oN' ? 'txt' : output === '-oX' ? 'xml' : 'gnmap'}`);
    }

    // Target
    parts.push(target);

    return parts.join(' ');
  };

  const copyCommand = () => {
    navigator.clipboard.writeText(getCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTimingSelect = (t: string) => {
    setFlags((prev) => {
      const withoutTiming = prev.filter((f) => !f.startsWith('-T'));
      return [...withoutTiming, t];
    });
  };

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-tools-line" />
            Nmap Section 10 of 13
          </div>
          <DocHeading level={1}>Interactive Command Builder</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            Toggle flags, configure options, and generate copy-ready Nmap commands. This tool helps you learn flag combinations and build complex commands visually.
          </p>
        </motion.div>

        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="cyber-card p-5 md:p-6">
            {/* Target */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-white block mb-2">Target</label>
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-amber"
                placeholder="192.168.1.1 or 10.0.0.0/24"
              />
            </div>

            {/* Scan Flags */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-white block mb-2">Scan Flags</label>
              <div className="flex flex-wrap gap-2">
                {scanFlags.map((sf) => (
                  <button
                    key={sf.value}
                    type="button"
                    onClick={() => toggleFlag(sf.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${
                      flags.includes(sf.value)
                        ? 'bg-cyber-amber/10 border-cyber-amber text-cyber-amber'
                        : 'bg-cyber-bg border-cyber-border text-cyber-text-muted hover:border-cyber-amber/50'
                    }`}
                  >
                    {sf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Timing */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-white block mb-2">Timing Template</label>
              <div className="flex flex-wrap gap-2">
                {timingFlags.map((tf) => (
                  <button
                    key={tf.value}
                    type="button"
                    onClick={() => handleTimingSelect(tf.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${
                      flags.includes(tf.value)
                        ? 'bg-cyber-amber/10 border-cyber-amber text-cyber-amber'
                        : 'bg-cyber-bg border-cyber-border text-cyber-text-muted hover:border-cyber-amber/50'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Port Options */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-white block mb-2">Port Selection</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {portOptions.map((po) => (
                  <button
                    key={po.value}
                    type="button"
                    onClick={() => setPortOpt(po.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${
                      portOpt === po.value
                        ? 'bg-cyber-amber/10 border-cyber-amber text-cyber-amber'
                        : 'bg-cyber-bg border-cyber-border text-cyber-text-muted hover:border-cyber-amber/50'
                    }`}
                  >
                    {po.label}
                  </button>
                ))}
              </div>
              {portOpt === 'custom' && (
                <input
                  type="text"
                  value={customPorts}
                  onChange={(e) => setCustomPorts(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-amber"
                  placeholder="22,80,443 or 1-1000"
                />
              )}
            </div>

            {/* Script */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-white block mb-2">NSE Script</label>
              <select
                value={script}
                onChange={(e) => setScript(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text focus:outline-none focus:border-cyber-amber"
              >
                {scriptOptions.map((so) => (
                  <option key={so.value} value={so.value}>
                    {so.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Output */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-white block mb-2">Output Format</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {outputOptions.map((oo) => (
                  <button
                    key={oo.value}
                    type="button"
                    onClick={() => setOutput(oo.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${
                      output === oo.value
                        ? 'bg-cyber-amber/10 border-cyber-amber text-cyber-amber'
                        : 'bg-cyber-bg border-cyber-border text-cyber-text-muted hover:border-cyber-amber/50'
                    }`}
                  >
                    {oo.label}
                  </button>
                ))}
              </div>
              {output && (
                <input
                  type="text"
                  value={outputFile}
                  onChange={(e) => setOutputFile(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-amber"
                  placeholder="scan-results"
                />
              )}
            </div>

            {/* Generated Command */}
            <div className="bg-cyber-bg border border-cyber-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-cyber-amber uppercase tracking-wider">Generated Command</span>
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
            Try combining <strong className="text-white">-sS</strong>, <strong className="text-white">-sV</strong>, <strong className="text-white">-O</strong>, and <strong className="text-white">--script vuln</strong> for the most comprehensive single-target scan. Add <strong className="text-white">-T4</strong> for speed in lab environments.
          </Callout>

          <div className="mt-8 flex gap-3">
            <a href="/nmap/pro-tips" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Pro Tips <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/nmap/examples" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text-muted hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
  );
}
