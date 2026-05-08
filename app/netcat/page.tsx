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
    path: '/netcat/basic-usage',
    title: 'Basic Usage',
    desc: 'Learn the fundamental nc commands for establishing connections.',
    icon: 'ri-terminal-line',
  },
  {
    path: '/netcat/connection-types',
    title: 'Connection Types',
    desc: 'Understand TCP/UDP, listen vs connect modes, and when to use each.',
    icon: 'ri-link',
  },
  {
    path: '/netcat/file-transfer',
    title: 'File Transfer',
    desc: 'Transfer files between systems using netcat as a simple data pipeline.',
    icon: 'ri-file-copy-line',
  },
  {
    path: '/netcat/port-scanning',
    title: 'Port Scanning',
    desc: 'Use netcat for basic port scanning and service enumeration.',
    icon: 'ri-target-line',
  },
  {
    path: '/netcat/banner-grabbing',
    title: 'Banner Grabbing',
    desc: 'Extract service banners and version information from network services.',
    icon: 'ri-printer-line',
  },
  {
    path: '/netcat/chat',
    title: 'Chat Application',
    desc: 'Set up a simple chat server or client for communication.',
    icon: 'ri-chat-3-line',
  },
  {
    path: '/netcat/remote-shell',
    title: 'Remote Shell',
    desc: 'Create reverse and bind shells for remote system access.',
    icon: 'ri-terminal-box-line',
  },
  {
    path: '/netcat/flags',
    title: 'Flags & Options',
    desc: 'Complete reference of netcat flags with practical examples.',
    icon: 'ri-flag-line',
  },
  {
    path: '/netcat/installation',
    title: 'Installation',
    desc: 'Install Netcat on Linux, macOS, Windows, and from source.',
    icon: 'ri-download-line',
  },
  {
    path: '/netcat/examples',
    title: 'Usage Examples',
    desc: 'Real-world netcat commands for various penetration testing scenarios.',
    icon: 'ri-file-list-line',
  },
  {
    path: '/netcat/command-builder',
    title: 'Command Builder',
    desc: 'Interactive tool to build netcat commands for different use cases.',
    icon: 'ri-tools-line',
  },
  {
    path: '/netcat/pro-tips',
    title: 'Pro Tips',
    desc: 'Advanced techniques, stealth usage, and common pitfalls to avoid.',
    icon: 'ri-lightbulb-line',
  },
  {
    path: '/netcat/quiz',
    title: 'Netcat Quiz',
    desc: 'Test your knowledge with multiple-choice questions on netcat concepts.',
    icon: 'ri-questionnaire-line',
  },
  {
    path: '/netcat/lab',
    title: 'Netcat Lab',
    desc: 'Hands-on exercises to practice netcat in simulated environments.',
    icon: 'ri-flask-line',
  },
];

export default function NetcatLandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-terminal-line" />
          Network Utility Toolkit
        </div>
        <DocHeading level={1}>Netcat</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          <strong className="text-cyber-cyan">Netcat</strong> (often abbreviated as nc) is a versatile networking utility for reading from and writing to network connections using TCP or UDP. It is designed to be a reliable "back-end" tool that can be used directly or easily driven by other programs and scripts. Netcat is a feature-rich network debugging and exploration tool, since it can create almost any kind of connection you would need and has several interesting built-in capabilities.
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
            New to Netcat? Start with these three sections in order:
          </p>
          <ol className="space-y-2">
            {[
              { num: '1', title: 'Basic Usage', desc: 'Understand the fundamental nc commands.', path: '/netcat/basic-usage' },
              { num: '2', title: 'Connection Types', desc: 'Learn TCP/UDP, listen vs connect modes.', path: '/netcat/connection-types' },
              { num: '3', title: 'Usage Examples', desc: 'See real commands for common scenarios.', path: '/netcat/examples' },
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
        <div className="mt-8 flex gap-3">
          <a href="/netcat/basic-usage" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Basic Usage <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  );
}