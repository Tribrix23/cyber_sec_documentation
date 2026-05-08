'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

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
  { cmd: 'check', desc: 'Check if target is vulnerable', example: "check" },
  { cmd: 'back', desc: 'Return to the main prompt without the module selected', example: "back" },
  { cmd: 'sessions', desc: 'List active sessions', example: "sessions -l" },
  { cmd: 'sessions -i', desc: 'Interact with a specific session', example: "sessions -i 1" },
];

export default function MetasploitCommandsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-terminal-line" />
          Metasploit Section 3 of 10
        </div>
        <DocHeading level={1}>Essential msfconsole Commands</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Master these fundamental commands to navigate msfconsole effectively.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="space-y-3">
          {essentialCommands.map((c) => (
            <div key={c.cmd} className="cyber-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <code className="text-sm font-mono text-cyber-amber bg-cyber-bg px-3 py-1 rounded">{c.cmd}</code>
                <span className="text-sm text-cyber-text">{c.desc}</span>
              </div>
              <code className="block text-xs font-mono text-cyber-green bg-cyber-bg-card px-3 py-2 rounded">{c.example}</code>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-white mb-4">Session Management</h2>
        <div className="cyber-card p-4">
          <CodeBlock code="sessions -l                    # List all sessions\nsessions -i 1              # Interact with session 1\nsessions -k 1              # Kill session 1\nsessions -K               # Kill all sessions" />
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-white mb-4">Workspace Management</h2>
        <div className="cyber-card p-4">
          <CodeBlock code="workspace -a pentest      # Create new workspace\nworkspace -s pentest      # Switch to workspace\nworkspace -d pentest      # Delete workspace" />
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="mt-8 flex gap-3">
          <a href="/metasploit/payloads" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Payloads <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/metasploit/module-types" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}