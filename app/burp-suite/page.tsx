'use client'
import { useState, useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const tools = [
  {
    id: 'proxy',
    name: 'Proxy',
    icon: 'ri-exchange-line',
    color: 'text-cyber-cyan',
    desc: 'Intercepts HTTP/HTTPS traffic between your browser and the target. The core of Burp Suite — every request passes through here.',
    features: [
      'Intercept and modify requests/responses in real time',
      'Forward, drop, or send to other tools',
      'HTTP history log of all traffic',
      'WebSocket support',
      'Match and replace rules',
    ],
    tip: 'Set your browser proxy to 127.0.0.1:8080 and install the Burp CA certificate to intercept HTTPS.',
  },
  {
    id: 'repeater',
    name: 'Repeater',
    icon: 'ri-repeat-line',
    color: 'text-cyber-amber',
    desc: 'Manually modify and resend individual HTTP requests. Essential for testing parameters, headers, and payloads.',
    features: [
      'Send requests from Proxy history with right-click',
      'Modify any part of the request',
      'Compare responses side by side',
      'Supports HTTP/1, HTTP/2, WebSocket',
      'Save and organize request tabs',
    ],
    tip: 'Use Ctrl+R to send a request from Proxy to Repeater instantly.',
  },
  {
    id: 'intruder',
    name: 'Intruder',
    icon: 'ri-sword-line',
    color: 'text-cyber-red',
    desc: 'Automated attack tool for fuzzing parameters, brute forcing credentials, and enumerating values.',
    features: [
      'Sniper: Single payload set, one position at a time',
      'Battering Ram: Same payload in all positions',
      'Pitchfork: Multiple payload sets, one per position',
      'Cluster Bomb: All combinations of multiple payload sets',
      'Payload processing rules and encoding',
    ],
    tip: 'Community edition throttles Intruder. Use Turbo Intruder extension for high-speed attacks.',
  },
  {
    id: 'scanner',
    name: 'Scanner (Pro)',
    icon: 'ri-scan-line',
    color: 'text-cyber-green',
    desc: 'Automated vulnerability scanner that detects SQLi, XSS, SSRF, XXE, and hundreds of other issues.',
    features: [
      'Active and passive scanning modes',
      'Crawls the application automatically',
      'Detects OWASP Top 10 vulnerabilities',
      'Generates detailed vulnerability reports',
      'Integrates with CI/CD pipelines (Pro)',
    ],
    tip: 'Passive scanning runs automatically on all proxied traffic — no extra configuration needed.',
  },
  {
    id: 'decoder',
    name: 'Decoder',
    icon: 'ri-code-box-line',
    color: 'text-cyber-amber',
    desc: 'Encode and decode data in various formats. Essential for understanding obfuscated payloads.',
    features: [
      'URL encode/decode',
      'Base64 encode/decode',
      'HTML encode/decode',
      'Hex encode/decode',
      'Gzip compress/decompress',
    ],
    tip: 'Chain multiple encoding operations to decode complex multi-layer encoded values.',
  },
  {
    id: 'comparer',
    name: 'Comparer',
    icon: 'ri-arrow-left-right-line',
    color: 'text-cyber-text',
    desc: 'Visually compare two pieces of data — useful for spotting differences between responses.',
    features: [
      'Word-level diff highlighting',
      'Byte-level diff highlighting',
      'Compare request/response pairs',
      'Useful for blind injection detection',
    ],
    tip: 'Send two responses to Comparer to spot subtle differences that indicate injection success.',
  },
];

const intruderAttacks = [
  { name: 'Sniper', desc: 'One payload set. Iterates through each position one at a time. Best for single-parameter fuzzing.', example: 'Fuzzing a single username field' },
  { name: 'Battering Ram', desc: 'One payload set. Same payload inserted into all positions simultaneously.', example: 'Testing if username == password' },
  { name: 'Pitchfork', desc: 'Multiple payload sets. Each set maps to one position. Iterates in parallel.', example: 'Username list + corresponding password list' },
  { name: 'Cluster Bomb', desc: 'Multiple payload sets. Tests every combination. Can generate huge request counts.', example: 'Brute force: all usernames × all passwords' },
];

const shortcuts = [
  { key: 'Ctrl+R', action: 'Send to Repeater' },
  { key: 'Ctrl+I', action: 'Send to Intruder' },
  { key: 'Ctrl+S', action: 'Send to Scanner' },
  { key: 'Ctrl+F', action: 'Forward intercepted request' },
  { key: 'Ctrl+D', action: 'Drop intercepted request' },
  { key: 'Ctrl+T', action: 'Toggle intercept on/off' },
  { key: 'Ctrl+Z', action: 'Undo in Repeater' },
  { key: 'Ctrl+Space', action: 'Send request in Repeater' },
];

const extensions = [
  { name: 'Turbo Intruder', desc: 'High-speed HTTP fuzzer that bypasses Community throttling' },
  { name: 'Logger++', desc: 'Advanced logging with filtering and grep capabilities' },
  { name: 'Autorize', desc: 'Automated authorization testing for IDOR vulnerabilities' },
  { name: 'JWT Editor', desc: 'Decode, modify, and attack JWT tokens' },
  { name: 'Active Scan++', desc: 'Extends the scanner with additional checks' },
  { name: 'Param Miner', desc: 'Discovers hidden parameters and headers' },
  { name: 'Retire.js', desc: 'Identifies vulnerable JavaScript libraries' },
  { name: 'Hackvertor', desc: 'Advanced encoding/decoding with custom tags' },
];

const workflowSteps = [
  { step: '1', title: 'Configure Proxy', desc: 'Set browser proxy to 127.0.0.1:8080. Install Burp CA cert for HTTPS.' },
  { step: '2', title: 'Browse Target', desc: 'Navigate the application normally. Burp captures all traffic in HTTP history.' },
  { step: '3', title: 'Identify Targets', desc: 'Review HTTP history. Right-click interesting requests to send to tools.' },
  { step: '4', title: 'Test with Repeater', desc: 'Manually modify parameters and observe responses for anomalies.' },
  { step: '5', title: 'Automate with Intruder', desc: 'Mark injection points, load payloads, and run automated attacks.' },
  { step: '6', title: 'Scan & Report', desc: 'Run active scan on target scope. Review findings and generate report.' },
];

export default function BurpSuitePage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [activeAttack, setActiveAttack] = useState<string | null>(null);
  const [proxyPort, setProxyPort] = useState('8080');
  const [proxyHost, setProxyHost] = useState('127.0.0.1');
  const [scope, setScope] = useState('https://target.com');
  const [interceptMode, setInterceptMode] = useState('on');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const proxyConfig = `Proxy Host: ${proxyHost}\nProxy Port: ${proxyPort}\nIntercept: ${interceptMode}\nScope: ${scope}`;

  const copyConfig = () => {
    navigator.clipboard.writeText(proxyConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-bug-line" />
            Web Application Security Testing
          </div>
          <DocHeading level={1}>Burp Suite</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3">
             <strong className="text-cyber-cyan">Burp Suite</strong> by PortSwigger is the industry-standard platform for web application security testing.
            It acts as an intercepting proxy between your browser and the target, allowing you to inspect, modify, and replay HTTP/HTTPS traffic.
            Used by penetration testers, bug bounty hunters, and security researchers worldwide.
          </p>
        </motion.div>

        {/* Editions */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="editions">Editions</DocHeading>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Community', price: 'Free', features: ['Proxy, Repeater, Decoder', 'Intruder (throttled)', 'Basic Scanner', 'Extensions (limited)'], color: 'text-cyber-text', border: 'border-cyber-border' },
              { name: 'Professional', price: '$449/yr', features: ['Full Intruder speed', 'Automated Scanner', 'Collaborator', 'All extensions', 'Project files'], color: 'text-cyber-amber', border: 'border-cyber-amber/30' },
              { name: 'Enterprise', price: 'Custom', features: ['CI/CD integration', 'Scheduled scans', 'Team management', 'API access', 'DAST platform'], color: 'text-cyber-cyan', border: 'border-cyber-cyan/30' },
            ].map((ed) => (
              <div key={ed.name} className={`cyber-card p-5 ${ed.border}`}>
                <h3 className={`text-lg font-bold ${ed.color}`}>{ed.name}</h3>
                <p className="text-sm text-cyber-text-dim mt-1">{ed.price}</p>
                <ul className="mt-3 space-y-1.5">
                  {ed.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-cyber-text">
                      <i className="ri-check-line text-cyber-green" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Installation */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="installation">Installation & Setup</DocHeading>
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Download</h4>
              <p className="text-sm text-cyber-text mb-2">
                Download from <a href="https://portswigger.net/burp/releases" target="_blank" rel="noopener noreferrer nofollow" className="text-cyber-cyan hover:underline">portswigger.net/burp/releases</a>. Available for Windows, macOS, and Linux.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Kali Linux (pre-installed)</h4>
              <CodeBlock code="burpsuite" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Install CA Certificate (Firefox)</h4>
              <CodeBlock code={"# 1. Start Burp Suite\n# 2. Browse to http://burpsuite in Firefox\n# 3. Click 'CA Certificate' to download\n# 4. Firefox > Settings > Privacy > Certificates > Import\n# 5. Check 'Trust this CA to identify websites'"} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Configure Browser Proxy</h4>
              <CodeBlock code={"# Firefox: Settings > Network Settings > Manual Proxy\nHTTP Proxy: 127.0.0.1\nPort: 8080\n\n# Or use FoxyProxy extension for quick switching"} />
            </div>
          </div>
          <Callout type="tip" className="mt-4">
            Use the <strong>FoxyProxy</strong> browser extension to quickly switch between Burp proxy and direct connection without changing browser settings each time.
          </Callout>
        </motion.section>

        {/* Tools */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="tools">Core Tools</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3">
            Click any tool card to expand its features and tips.
          </p>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            {tools.map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
                className={`cyber-card p-4 text-left cursor-pointer ${activeTool === tool.id ? 'border-cyber-amber' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-lg bg-cyber-bg flex items-center justify-center flex-shrink-0 ${tool.color}`}>
                    <i className={`${tool.icon} text-lg`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-semibold ${tool.color}`}>{tool.name}</h4>
                    <p className="text-xs text-cyber-text mt-1">{tool.desc}</p>
                    <AnimatePresence>
                      {activeTool === tool.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 space-y-2"
                        >
                          <ul className="space-y-1">
                            {tool.features.map((f) => (
                              <li key={f} className="flex items-center gap-2 text-xs text-cyber-text">
                                <i className="ri-arrow-right-s-line text-cyber-amber" />
                                {f}
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs text-cyber-amber mt-2">
                            <i className="ri-lightbulb-line mr-1" />
                            {tool.tip}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <i className={`ri-arrow-down-s-line text-cyber-text-dim transition-transform ${activeTool === tool.id ? 'rotate-180' : ''}`} />
                </div>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Intruder Attack Types */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="intruder">Intruder Attack Types</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3">
            Intruder supports four attack types. Choosing the right one is critical for efficiency.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {intruderAttacks.map((attack) => (
              <button
                key={attack.name}
                type="button"
                onClick={() => setActiveAttack(activeAttack === attack.name ? null : attack.name)}
                className={`cyber-card p-4 text-left cursor-pointer ${activeAttack === attack.name ? 'border-cyber-red' : ''}`}
              >
                <h4 className="text-sm font-semibold text-cyber-red">{attack.name}</h4>
                <p className="text-xs text-cyber-text mt-1">{attack.desc}</p>
                {activeAttack === attack.name && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-cyber-amber mt-2"
                  >
                    <i className="ri-lightbulb-line mr-1" />
                    Use case: {attack.example}
                  </motion.p>
                )}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Workflow */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="workflow">Typical Pentest Workflow</DocHeading>
          <div className="mt-5 space-y-3">
            {workflowSteps.map((s) => (
              <div key={s.step} className="flex items-start gap-4 p-4 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
                <span className="w-8 h-8 rounded-full bg-cyber-amber/10 border border-cyber-amber/30 text-cyber-amber text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {s.step}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-white">{s.title}</h4>
                  <p className="text-xs text-cyber-text mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Keyboard Shortcuts */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="shortcuts">Keyboard Shortcuts</DocHeading>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {shortcuts.map((s) => (
              <div key={s.key} className="flex items-center gap-3 p-3 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
                <kbd className="px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-cyber-cyan font-mono text-xs whitespace-nowrap">{s.key}</kbd>
                <span className="text-sm text-cyber-text">{s.action}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Extensions */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="extensions">Must-Have Extensions</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3">
            Install extensions from the BApp Store (Extender tab). These are the most useful for pentesters:
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {extensions.map((ext) => (
              <div key={ext.name} className="cyber-card p-4">
                <h4 className="text-sm font-semibold text-cyber-amber">{ext.name}</h4>
                <p className="text-xs text-cyber-text mt-1">{ext.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Interactive Proxy Config */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="config">Interactive Proxy Configurator</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3">
            Configure your Burp proxy settings and copy the configuration summary.
          </p>
          <div className="mt-5 cyber-card p-5 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-semibold text-white block mb-2">Proxy Host</label>
                <input
                  type="text"
                  value={proxyHost}
                  onChange={(e) => setProxyHost(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-amber"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-white block mb-2">Proxy Port</label>
                <input
                  type="text"
                  value={proxyPort}
                  onChange={(e) => setProxyPort(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-amber"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Target Scope</label>
              <input
                type="text"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-amber"
                placeholder="https://target.com"
              />
            </div>
            <div className="mb-5">
              <label className="text-sm font-semibold text-white block mb-2">Intercept Mode</label>
              <div className="flex gap-2">
                {['on', 'off'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setInterceptMode(m)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono border transition-all whitespace-nowrap uppercase ${
                      interceptMode === m
                        ? 'bg-cyber-amber/10 border-cyber-amber text-cyber-amber'
                        : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-amber/50'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-cyber-bg border border-cyber-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-cyber-amber">Proxy Configuration</span>
                <button
                  type="button"
                  onClick={copyConfig}
                  className="text-xs text-cyber-cyan hover:text-cyber-cyan-dim transition-colors flex items-center gap-1"
                >
                  <i className={copied ? 'ri-check-line' : 'ri-file-copy-line'} />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="text-sm font-mono text-cyber-green whitespace-pre-wrap">{proxyConfig}</pre>
            </div>
          </div>
        </motion.section>

        {/* Tips */}
        <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="tips">Pro Tips</DocHeading>
          <div className="mt-4 space-y-3">
            <Callout type="tip">Always define a target scope before scanning. This prevents Burp from capturing irrelevant traffic and speeds up analysis.</Callout>
            <Callout type="info">Use <InlineCode>Ctrl+R</InlineCode> to send any request from Proxy history to Repeater for manual testing.</Callout>
            <Callout type="warning">Community edition throttles Intruder to ~1 request/second. Use Turbo Intruder extension for faster attacks.</Callout>
            <Callout type="tip">The Collaborator (Pro) generates unique URLs/DNS names to detect out-of-band vulnerabilities like blind SSRF and XXE.</Callout>
            <Callout type="danger">Only test applications you have explicit written permission to test. Unauthorized testing is illegal.</Callout>
          </div>
        </motion.section>
      </div>
  );
}
