'use client'

import { useState, useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const scanFlags = [
  { value: '-sS', label: 'SYN Scan (-sS)', default: true, description: 'TCP SYN scan - stealthy, default scan type' },
  { value: '-sT', label: 'Connect Scan (-sT)', description: 'TCP connect scan - completes TCP handshake' },
  { value: '-sU', label: 'UDP Scan (-sU)', description: 'UDP scan - discovers UDP services' },
  { value: '-sV', label: 'Version Detection (-sV)', default: true, description: 'Probe open ports to determine service/version info' },
  { value: '-O', label: 'OS Detection (-O)', description: 'Enable OS detection using TCP/IP fingerprinting' },
  { value: '-A', label: 'Aggressive (-A)', description: 'Enable OS detection, version detection, script scanning, and traceroute' },
  { value: '-sC', label: 'Default Scripts (-sC)', description: 'Run default NSE scripts (equivalent to --script=default)' },
  { value: '-Pn', label: 'Skip Host Discovery (-Pn)', description: 'Skip host discovery and treat all hosts as online' },
  { value: '-n', label: 'No DNS (-n)', description: 'Never do DNS resolution' },
  { value: '-v', label: 'Verbose (-v)', description: 'Increase verbosity level (use -vv or more for greater effect)' },
  { value: '-vv', label: 'Very Verbose (-vv)', description: 'Increase verbosity level more' },
  { value: '-f', label: 'Fragment (-f)', description: 'Fragment packets (use with --mtu to specify size)' },
  { value: '--traceroute', label: 'Traceroute', description: 'Trace path to host' },
  { value: '--reason', label: 'Show Reasons', description: 'Display the reason a port is in a particular state' },
  { value: '-6', label: 'IPv6 (-6)', description: 'Enable IPv6 scanning' },
  { value: '-sN', label: 'TCP NULL Scan (-sN)', description: 'TCP NULL scan - stealth scan with no flags set' },
  { value: '-sF', label: 'TCP FIN Scan (-sF)', description: 'TCP FIN scan - stealth scan with just FIN flag set' },
  { value: '-sX', label: 'TCP Xmas Scan (-sX)', description: 'TCP Xmas scan - stealth scan with FIN, PSH, and URG flags set' },
  { value: '-sA', label: 'TCP ACK Scan (-sA)', description: 'TCP ACK scan - used to map firewall rulesets' },
  { value: '-sW', label: 'TCP Window Scan (-sW)', description: 'TCP Window scan - exploits TCP window size implementation' },
  { value: '-sM', label: 'TCP Maimon Scan (-sM)', description: 'TCP Maimon scan - stealth scan with FIN/ACK flags' },
  { value: '--scanflags', label: 'Custom TCP Flags (--scanflags)', description: 'Specify custom TCP scan flags' },
  { value: '-sI', label: 'Idle Scan (-sI)', description: 'Idle scan - uses a zombie host for stealth scanning' },
  { value: '-sY', label: 'SCTP INIT Scan (-sY)', description: 'SCTP INIT scan' },
  { value: '-sZ', label: 'SCTP COOKIE-ECHO Scan (-sZ)', description: 'SCTP COOKIE-ECHO scan' },
  { value: '-sO', label: 'IP Protocol Scan (-sO)', description: 'IP protocol scan - determines supported IP protocols' },
  { value: '-b', label: 'FTP Bounce Scan (-b)', description: 'FTP bounce scan - uses an FTP proxy' },
  { value: '-D', label: 'Decoy Scan (-D)', description: 'Cloak a scan with decoys' },
  { value: '-S', label: 'Source IP Spoof (-S)', description: 'Spoof source IP address' },
  { value: '-e', label: 'Specify Interface (-e)', description: 'Use specific network interface' },
  { value: '-g', label: 'Source Port Spoof (-g)', description: 'Spoof source port number' },
  { value: '--source-port', label: 'Source Port (--source-port)', description: 'Use given source port' },
  { value: '--data-length', label: 'Append Random Data (--data-length)', description: 'Append random data to sent packets' },
  { value: '--ip-options', label: 'IP Options (--ip-options)', description: 'Send packets with specified IP options' },
  { value: '--ttl', label: 'Set TTL (--ttl)', description: 'Set IP time-to-live field' },
  { value: '--spoof-mac', label: 'Spoof MAC Address (--spoof-mac)', description: 'Spoof MAC address' },
  { value: '--badsum', label: 'Bad Checksum (--badsum)', description: 'Send packets with bogus TCP/UDP checksums' },
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
   const [explanation, setExplanation] = useState('');

   const toggleFlag = (flag: string) => {
     setFlags((prev) => {
       if (prev.includes(flag)) {
         return prev.filter((f) => f !== flag);
       }
       return [...prev, flag];
     });
   };

   useEffect(() => {
    setExplanation(generateExplanation());
  }, [target, flags, portOpt, customPorts, script, output, outputFile]);

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
    } else if (portOpt === 'custom' && customPorts.trim()) {
      parts.push(`-p ${customPorts.trim()}`);
    }

    // Script - support multiple scripts
    if (script.trim()) {
      // Handle comma-separated scripts
      const scripts = script.split(',').map(s => s.trim()).filter(s => s);
      if (scripts.length > 0) {
        parts.push(`--script ${scripts.join(',')}`);
      }
    }

    // Output
    if (output === '-oA') {
      if (outputFile.trim()) {
        parts.push(`-oA ${outputFile.trim()}`);
      }
    } else if (output && outputFile.trim()) {
      let ext = 'txt';
      if (output === '-oX') ext = 'xml';
      else if (output === '-oG') ext = 'gnmap';
      parts.push(`${output} ${outputFile.trim()}.${ext}`);
    }

    // Target - required field
    if (target.trim()) {
      parts.push(target.trim());
    }

    return parts.join(' ');
  };

  const generateExplanation = () => {
    if (!target.trim()) {
      return 'Please enter a target IP address or hostname';
    }

    const explanationParts = [];
    
    // Start with target
    explanationParts.push(`Scanning ${target.trim()}`);

    // Scan type explanation
    const hasSS = flags.includes('-sS');
    const hasST = flags.includes('-sT');
    const hasSU = flags.includes('-sU');
    const hasSN = flags.includes('-sN');
    const hasSF = flags.includes('-sF');
    const hasSX = flags.includes('-sX');
    const hasSA = flags.includes('-sA');
    const hasSW = flags.includes('-sW');
    const hasSM = flags.includes('-sM');
    
    if (hasSS) explanationParts.push('using SYN scan (stealthy TCP scan)');
    else if (hasST) explanationParts.push('using TCP connect scan (completes TCP handshake)');
    else if (hasSU) explanationParts.push('using UDP scan');
    else if (hasSN) explanationParts.push('using TCP NULL scan');
    else if (hasSF) explanationParts.push('using TCP FIN scan');
    else if (hasSX) explanationParts.push('using TCP Xmas scan');
    else if (hasSA) explanationParts.push('using TCP ACK scan (firewall testing)');
    else if (hasSW) explanationParts.push('using TCP Window scan');
    else if (hasSM) explanationParts.push('using TCP Maimon scan');
    else explanationParts.push('using default SYN scan');

    // Port explanation
    if (portOpt === '-p-') {
      explanationParts.push('scanning all 65,535 ports');
    } else if (portOpt === '-F') {
      explanationParts.push('scanning top 100 ports');
    } else if (portOpt === 'custom' && customPorts.trim()) {
      explanationParts.push(`scanning ports ${customPorts.trim()}`);
    } else {
      explanationParts.push('scanning top 1,000 ports');
    }

    // Version detection
    if (flags.includes('-sV')) {
      explanationParts.push('with service/version detection');
    }

    // OS detection
    if (flags.includes('-O')) {
      explanationParts.push('with OS detection');
    }

    // Aggressive mode
    if (flags.includes('-A')) {
      explanationParts.push('with aggressive scanning (OS detection, version detection, scripts, traceroute)');
    }

    // Script scanning
    if (script.trim()) {
      const scripts = script.split(',').map(s => s.trim()).filter(s => s);
      if (scripts.length > 0) {
        explanationParts.push(`running NSE scripts: ${scripts.join(', ')}`);
      }
    }

    // Host discovery
    if (flags.includes('-Pn')) {
      explanationParts.push('skipping host discovery (treating all hosts as online)');
    } else {
      explanationParts.push('with host discovery');
    }

    // DNS resolution
    if (flags.includes('-n')) {
      explanationParts.push('without DNS resolution');
    }

    // Timing
    const timingMatch = flags.find(f => f.startsWith('-T'));
    if (timingMatch) {
      const timingMap: Record<string, string> = {
        '-T0': 'paranoid (very slow)',
        '-T1': 'sneaky (very slow)',
        '-T2': 'polite (slow)',
        '-T3': 'normal (default)',
        '-T4': 'aggressive (faster)',
        '-T5': 'insane (very fast)'
      };
      explanationParts.push(`using ${timingMap[timingMatch]} timing template`);
    }

    // Output
    if (output === '-oA') {
      if (outputFile.trim()) {
        explanationParts.push(`saving results in all formats (${outputFile.trim()}.{{nmap,xm,gnmap}})`);
      }
    } else if (output && outputFile.trim()) {
      let formatName = 'normal output';
      if (output === '-oX') formatName = 'XML format';
      else if (output === '-oG') formatName = 'grepable format';
      explanationParts.push(`saving results in ${formatName} (${outputFile.trim()}.${output === '-oX' ? 'xml' : output === '-oG' ? 'gnmap' : 'txt'})`);
    }

    // Verbosity
    if (flags.includes('-vv')) {
      explanationParts.push('with verbose output');
    } else if (flags.includes('-v')) {
      explanationParts.push('with verbose output');
    }

    // Fragment packets
    if (flags.includes('-f')) {
      explanationParts.push('with packet fragmentation');
    }

    // Traceroute
    if (flags.includes('--traceroute')) {
      explanationParts.push('with traceroute');
    }

    // Show reasons
    if (flags.includes('--reason')) {
      explanationParts.push('showing reasons for port states');
    }

    // IPv6
    if (flags.includes('-6')) {
      explanationParts.push('using IPv6');
    }

    return explanationParts.join(' ');
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
          <p className="text-cyber-text leading-relaxed mt-3 text-lg">
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
              <div key={sf.value} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleFlag(sf.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${
                    flags.includes(sf.value)
                      ? 'bg-cyber-amber/10 border-cyber-amber text-cyber-amber'
                      : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-amber/50'
                  }`}
                >
                  {sf.label}
                </button>
              </div>
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
                        : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-amber/50'
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
                        : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-amber/50'
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
                        : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-amber/50'
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
              {explanation && (
                <div className="mt-2 text-xs text-cyber-text/70">
                  <i className="ri-information-line mr-1" /> {explanation}
                </div>
              )}
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Callout type="tip" >
                         Try combining <strong className="text-cyber-cyan">-sS</strong>, <strong className="text-cyber-cyan">-sV</strong>, <strong className="text-cyber-cyan">-O</strong>, and <strong className="text-cyber-cyan">--script vuln</strong> for the most comprehensive single-target scan.              Add <strong className="text-cyber-cyan">-T4</strong> for speed in lab environments.
          </Callout>

          <div className="mt-8 flex gap-3">
            <a href="/nmap/pro-tips" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Pro Tips <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/nmap/examples" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
  );
}
