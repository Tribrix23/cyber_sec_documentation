'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

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
  { cmd: 'getsystem', desc: 'Attempt to elevate to SYSTEM privileges' },
  { cmd: 'clearev', desc: 'Clear Windows event logs' },
];

export default function MetasploitMeterpreterPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-terminal-box-line" />
          Metasploit Section 5 of 10
        </div>
        <DocHeading level={1}>Meterpreter Commands</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Meterpreter is Metasploit's advanced payload that provides an interactive shell with many built-in commands.
          It runs entirely in memory, making it harder to detect.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {meterpreterCommands.map((c) => (
            <div key={c.cmd} className="cyber-card p-3 flex items-start gap-3">
              <code className="text-xs font-mono text-cyber-green bg-cyber-bg px-2 py-1 rounded shrink-0">{c.cmd}</code>
              <span className="text-sm text-cyber-text">{c.desc}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <Callout type="tip" className="mt-6">
        Use <code className="text-cyber-amber">background</code> to return to msfconsole while keeping your Meterpreter session alive.
        Then use <code className="text-cyber-amber">sessions -i ID</code> to return to it.
      </Callout>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-white mb-4">Privilege Escalation</h2>
        <div className="cyber-card p-5">
          <p className="text-sm text-cyber-text mb-3">Meterpreter includes several methods to escalate privileges:</p>
          <ul className="text-sm text-cyber-text space-y-2">
            <li><code className="text-cyber-amber">getsystem</code> - Attempt to elevate via kernel exploits</li>
            <li><code className="text-cyber-amber">load kiwi</code> - Load Mimikatz for credential theft</li>
            <li><code className="text-cyber-amber">use post/multi/recon/local_exploit_suggester</code> - Find local exploits</li>
          </ul>
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="mt-8 flex gap-3">
          <a href="/metasploit/workflow" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Workflow <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/metasploit/payloads" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}