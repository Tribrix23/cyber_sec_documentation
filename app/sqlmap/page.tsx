'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const sections = [
  {
    path: '/sqlmap/injection-techniques',
    title: 'Injection Techniques',
    desc: 'Understand the six SQL injection techniques SQLMap uses to extract data.',
    icon: 'ri-code-s-slash-line',
  },
  {
    path: '/sqlmap/tamper-scripts',
    title: 'Tamper Scripts',
    desc: 'Bypass WAFs and input filters with 50+ tamper scripts.',
    icon: 'ri-shield-keyhole-line',
  },
  {
    path: '/sqlmap/detection',
    title: 'Detection & Enumeration',
    desc: 'Detect injection points and enumerate databases, tables, and columns.',
    icon: 'ri-radar-line',
  },
  {
    path: '/sqlmap/database-enumeration',
    title: 'Database Enumeration',
    desc: 'Extract database names, table structures, and column information.',
    icon: 'ri-database-2-line',
  },
  {
    path: '/sqlmap/data-extraction',
    title: 'Data Extraction',
    desc: 'Dump database contents including usernames, passwords, and sensitive data.',
    icon: 'ri-download-cloud-line',
  },
  {
    path: '/sqlmap/os-commands',
    title: 'OS Commands',
    desc: 'Execute arbitrary OS commands and read/write files on vulnerable servers.',
    icon: 'ri-terminal-box-line',
  },
  {
    path: '/sqlmap/flags',
    title: 'Common Flags',
    desc: 'Comprehensive reference of every SQLMap flag with real-world usage.',
    icon: 'ri-flag-line',
  },
  {
    path: '/sqlmap/installation',
    title: 'Installation',
    desc: 'Install SQLMap on Linux, macOS, Windows, and from source.',
    icon: 'ri-download-line',
  },
  {
    path: '/sqlmap/examples',
    title: 'Usage Examples',
    desc: 'Real-world SQLMap commands for each exploitation scenario.',
    icon: 'ri-file-list-line',
  },
  {
    path: '/sqlmap/command-builder',
    title: 'Command Builder',
    desc: 'Interactive tool to configure options and generate SQLMap commands.',
    icon: 'ri-tools-line',
  },
  {
    path: '/sqlmap/pro-tips',
    title: 'Pro Tips',
    desc: 'Expert advice on optimization, WAF bypass, and advanced techniques.',
    icon: 'ri-lightbulb-line',
  },
  {
    path: '/sqlmap/quiz',
    title: 'SQLMap Quiz',
    desc: 'Test your knowledge with 15 multiple-choice questions on SQLMap.',
    icon: 'ri-questionnaire-line',
  },
  {
    path: '/sqlmap/lab',
    title: 'SQLMap Lab',
    desc: 'Hands-on exercises where you type SQLMap commands for different scenarios.',
    icon: 'ri-flask-line',
  },
];

export default function SQLMapLandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-database-2-line" />
          SQL Injection Tool
        </div>
        <DocHeading level={1}>SQLMap</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          <strong className="text-cyber-cyan">SQLMap</strong> is an open-source penetration testing tool that automates the detection and exploitation of SQL injection vulnerabilities. It supports MySQL, Oracle, PostgreSQL, MSSQL, SQLite, and more.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-white mb-4">Module Sections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sections.map((s) => (
            <a
              key={s.path}
              href={s.path}
              className="cyber-card p-4 hover:border-cyber-red/50 transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyber-bg-card border border-cyber-border flex items-center justify-center flex-shrink-0 text-cyber-red group-hover:bg-cyber-red/10 transition-colors">
                  <i className={s.icon} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-cyber-red transition-colors">{s.title}</h3>
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
            New to SQLMap? Start with these three sections in order:
          </p>
          <ol className="space-y-2">
            {[
              { num: '1', title: 'Injection Techniques', desc: 'Learn how SQLMap exploits SQLi vulnerabilities.', path: '/sqlmap/injection-techniques' },
              { num: '2', title: 'Common Flags', desc: 'Learn the essential flags for every SQLMap command.', path: '/sqlmap/flags' },
              { num: '3', title: 'Usage Examples', desc: 'See real commands for exploiting SQL injection.', path: '/sqlmap/examples' },
            ].map((step) => (
              <li key={step.num}>
                <a href={step.path} className="flex items-center gap-3 p-3 rounded-lg bg-cyber-bg border border-cyber-border hover:border-cyber-red/50 transition-all">
                  <span className="w-7 h-7 rounded-full bg-cyber-red/10 border border-cyber-red/20 flex items-center justify-center text-cyber-red text-xs font-bold flex-shrink-0">
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

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-5 border-cyber-red/30 bg-cyber-red/5">
          <h3 className="text-sm font-semibold text-cyber-red mb-2">Warning</h3>
          <p className="text-xs text-cyber-text">
            SQLMap is a powerful offensive tool. Only use it against systems you own or have explicit written permission to test. Unauthorized use is illegal.
          </p>
        </div>
      </motion.section>
    </div>
  );
}