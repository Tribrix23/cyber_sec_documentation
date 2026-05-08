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
    path: '/sslscan/protocol-versions',
    title: 'Protocol Versions',
    desc: 'Understand TLS/SSL protocol versions and deprecation status.',
    icon: 'ri-stack-line',
  },
  {
    path: '/sslscan/cipher-suites',
    title: 'Cipher Suites',
    desc: 'Learn about cipher strength ratings and how to interpret results.',
    icon: 'ri-lock-line',
  },
  {
    path: '/sslscan/vulnerabilities',
    title: 'Vulnerabilities',
    desc: 'Common SSL/TLS vulnerabilities detected by SSLScan.',
    icon: 'ri-alert-line',
  },
  {
    path: '/sslscan/flags',
    title: 'Common Flags',
    desc: 'Comprehensive reference of every SSLScan flag.',
    icon: 'ri-flag-line',
  },
  {
    path: '/sslscan/installation',
    title: 'Installation',
    desc: 'Install SSLScan on Linux, macOS, and Windows.',
    icon: 'ri-download-line',
  },
  {
    path: '/sslscan/examples',
    title: 'Usage Examples',
    desc: 'Real-world SSLScan commands for different scenarios.',
    icon: 'ri-file-list-line',
  },
  {
    path: '/sslscan/command-builder',
    title: 'Command Builder',
    desc: 'Interactive tool to configure options and generate SSLScan commands.',
    icon: 'ri-tools-line',
  },
  {
    path: '/sslscan/pro-tips',
    title: 'Pro Tips',
    desc: 'Expert advice on SSL/TLS hardening and interpretation.',
    icon: 'ri-lightbulb-line',
  },
  {
    path: '/sslscan/quiz',
    title: 'SSLScan Quiz',
    desc: 'Test your knowledge with multiple-choice questions on SSLScan.',
    icon: 'ri-questionnaire-line',
  },
  {
    path: '/sslscan/lab',
    title: 'SSLScan Lab',
    desc: 'Hands-on exercises for SSL/TLS scanning practice.',
    icon: 'ri-flask-line',
  },
];

export default function SSLScanLandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-medium font-mono mb-4">
          <i className="ri-shield-keyhole-line" />
          SSL/TLS Scanner
        </div>
        <DocHeading level={1}>SSLScan</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          <strong className="text-cyber-cyan">SSLScan</strong> is a fast SSL/TLS scanner that queries SSL/TLS services and reports the protocol versions, cipher suites, key exchange parameters, and certificate details.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-white mb-4">Module Sections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sections.map((s) => (
            <a
              key={s.path}
              href={s.path}
              className="cyber-card p-4 hover:border-cyber-green/50 transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyber-bg-card border border-cyber-border flex items-center justify-center flex-shrink-0 text-cyber-green group-hover:bg-cyber-green/10 transition-colors">
                  <i className={s.icon} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-cyber-green transition-colors">{s.title}</h3>
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
            New to SSLScan? Start with these three sections in order:
          </p>
          <ol className="space-y-2">
            {[
              { num: '1', title: 'Protocol Versions', desc: 'Learn about TLS/SSL versions and their security implications.', path: '/sslscan/protocol-versions' },
              { num: '2', title: 'Common Flags', desc: 'Learn the essential flags for SSLScan commands.', path: '/sslscan/flags' },
              { num: '3', title: 'Usage Examples', desc: 'See real commands for scanning SSL/TLS services.', path: '/sslscan/examples' },
            ].map((step) => (
              <li key={step.num}>
                <a href={step.path} className="flex items-center gap-3 p-3 rounded-lg bg-cyber-bg border border-cyber-border hover:border-cyber-green/50 transition-all">
                  <span className="w-7 h-7 rounded-full bg-cyber-green/10 border border-cyber-green/20 flex items-center justify-center text-cyber-green text-xs font-bold flex-shrink-0">
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
          <a href="/sslscan/protocol-versions" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Protocol Versions <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  );
}