'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const databaseSetup = [
  { step: '1', title: 'Start PostgreSQL', cmd: 'sudo systemctl start postgresql' },
  { step: '2', title: 'Initialize Database', cmd: 'sudo msfdb init' },
  { step: '3', title: 'Launch msfconsole', cmd: 'msfconsole' },
  { step: '4', title: 'Verify Connection', cmd: 'db_status' },
];

export default function MetasploitDatabasePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-database-2-line" />
          Metasploit Section 7 of 10
        </div>
        <DocHeading level={1}>Database Setup</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Metasploit uses PostgreSQL to store scan results, hosts, services, and vulnerabilities. Setting it up enables powerful features like <code className="text-cyber-amber">db_nmap</code> and workspace management.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="space-y-3">
          {databaseSetup.map((s) => (
            <div key={s.step}>
              <h4 className="text-sm font-semibold text-white mb-2">Step {s.step}: {s.title}</h4>
              <CodeBlock code={s.cmd} />
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-white mb-4">Database-Aware Commands</h2>
        <div className="cyber-card p-5">
          <CodeBlock code={`db_nmap -sS 10.0.0.0/24     # Scan and import results
hosts                      # Show hosts in database
services                   # Show services discovered
vulns                      # Show vulnerabilities found
workspace -a pentest       # Create workspace
workspace pentest          # Switch to workspace`} />
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="mt-8 flex gap-3">
          <a href="/metasploit/pro-tips" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Pro Tips <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/metasploit/workflow" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}