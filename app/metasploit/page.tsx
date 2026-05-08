'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const sections = [
  {
    path: '/metasploit/installation',
    title: 'Installation',
    desc: 'Install Metasploit on Linux, macOS, Windows, or build from source with database setup.',
    icon: 'ri-download-line',
  },
  {
    path: '/metasploit/module-types',
    title: 'Module Types',
    desc: 'Exploit, payload, auxiliary, post-exploitation, encoder, NOP, and evasion modules.',
    icon: 'ri-box-3-line',
  },
  {
    path: '/metasploit/commands',
    title: 'Essential Commands',
    desc: 'Search, use, set, exploit, sessions, workspace, and database commands with examples.',
    icon: 'ri-terminal-line',
  },
  {
    path: '/metasploit/payloads',
    title: 'Common Payloads',
    desc: 'Meterpreter and shell payloads for Windows, Linux, PHP, Java, Android, and Python targets.',
    icon: 'ri-rocket-line',
  },
  {
    path: '/metasploit/meterpreter',
    title: 'Meterpreter Commands',
    desc: 'Post-exploitation commands: sysinfo, migrate, hashdump, keyscan, portfwd, and more.',
    icon: 'ri-terminal-box-line',
  },
  {
    path: '/metasploit/workflow',
    title: 'Exploit Workflow',
    desc: 'Step-by-step exploit execution: search, use, configure, and exploit with real examples.',
    icon: 'ri-road-map-line',
  },
  {
    path: '/metasploit/database',
    title: 'Database Management',
    desc: 'PostgreSQL setup, workspace management, db_nmap, and database-aware commands.',
    icon: 'ri-database-2-line',
  },
  {
    path: '/metasploit/examples',
    title: 'Usage Examples',
    desc: 'Real-world Metasploit commands for exploitation, scanning, and post-exploitation.',
    icon: 'ri-file-list-line',
  },
  {
    path: '/metasploit/command-builder',
    title: 'Command Builder',
    desc: 'Interactive tool to generate msfconsole resource scripts for exploitation.',
    icon: 'ri-tools-line',
  },
  {
    path: '/metasploit/pro-tips',
    title: 'Pro Tips',
    desc: 'Expert advice on scope verification, session management, resource scripts, and best practices.',
    icon: 'ri-lightbulb-line',
  },
  {
    path: '/metasploit/quiz',
    title: 'Metasploit Quiz',
    desc: 'Test your knowledge with 10 multiple-choice questions covering all Metasploit concepts.',
    icon: 'ri-questionnaire-line',
  },
  {
    path: '/metasploit/lab',
    title: 'Metasploit Lab',
    desc: 'Hands-on exercises where you type real msfconsole commands for different scenarios.',
    icon: 'ri-flask-line',
  },
];

export default function MetasploitLandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-fire-line" />
          Penetration Testing Framework
        </div>
        <DocHeading level={1}>Metasploit Framework</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          <strong className="text-cyber-cyan">Metasploit Framework</strong> is the world&apos;s most widely used penetration testing framework.
          It provides a comprehensive environment for developing, testing, and executing exploit code against remote targets.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-white mb-4">Module Sections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sections.map((s) => (
            <a
              key={s.path}
              href={s.path}
              className="cyber-card p-4 hover:border-cyber-amber/50 transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyber-bg-card border border-cyber-border flex items-center justify-center shrink-0 text-cyber-amber group-hover:bg-cyber-amber/10 transition-colors">
                  <i className={s.icon} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-cyber-amber transition-colors">{s.title}</h3>
                  <p className="text-xs text-cyber-text mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Start</h2>
        <div className="cyber-card p-5">
          <p className="text-sm text-cyber-text mb-3">
            New to Metasploit? Start with these three sections in order:
          </p>
          <ol className="space-y-2">
            {[
              { num: '1', title: 'Installation', desc: 'Get Metasploit installed with database support.', path: '/metasploit/installation' },
              { num: '2', title: 'Module Types', desc: 'Understand exploit, payload, auxiliary, and post modules.', path: '/metasploit/module-types' },
              { num: '3', title: 'Commands', desc: 'Learn essential msfconsole commands for navigation.', path: '/metasploit/commands' },
            ].map((step) => (
              <li key={step.num}>
                <a href={step.path} className="flex items-center gap-3 p-3 rounded-lg bg-cyber-bg border border-cyber-border hover:border-cyber-amber/50 transition-all">
                  <span className="w-7 h-7 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 flex items-center justify-center text-cyber-amber text-xs font-bold flex-shrink-0">
                    {step.num}
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-white">{step.title}</span>
                    <p className="text-xs text-cyber-text">{step.desc}</p>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Callout type="danger">
          Metasploit is a powerful offensive tool. Only use it against systems you own or have explicit written authorization to test. Unauthorized use is illegal.
        </Callout>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="mt-8 flex gap-3">
          <a href="/metasploit/installation" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Installation <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  );
}