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
    path: '/john-the-ripper/installation',
    title: 'Installation',
    desc: 'Install John the Ripper on Linux, macOS, Windows, or build from source with Jumbo patches.',
    icon: 'ri-download-line',
  },
  {
    path: '/john-the-ripper/single-crack-mode',
    title: 'Single Crack Mode',
    desc: 'Uses login name, GECOS, and full name fields to generate candidate passwords. Fast and often surprisingly effective.',
    icon: 'ri-user-line',
  },
  {
    path: '/john-the-ripper/wordlist-mode',
    title: 'Wordlist Mode',
    desc: 'Tries passwords from a wordlist file. The most common cracking method, enhanced with rules for mutations.',
    icon: 'ri-file-list-3-line',
  },
  {
    path: '/john-the-ripper/incremental-mode',
    title: 'Incremental / Brute Force',
    desc: 'Generates all possible character combinations. Slowest but most thorough method for short passwords.',
    icon: 'ri-speed-line',
  },
  {
    path: '/john-the-ripper/external-mode',
    title: 'External Mode',
    desc: 'Plug in custom password generation logic written in a C-like scripting language. For advanced attack scenarios.',
    icon: 'ri-code-s-slash-line',
  },
  {
    path: '/john-the-ripper/hash-formats',
    title: 'Hash Formats',
    desc: 'Comprehensive reference of supported hash types: Unix crypts, Windows NTLM, documents, archives, and more.',
    icon: 'ri-database-2-line',
  },
  {
    path: '/john-the-ripper/rules',
    title: 'Rules',
    desc: 'Mutate wordlist entries with case changes, leet speak, appending/prepending, and thousands of transformations.',
    icon: 'ri-magic-line',
  },
  {
    path: '/john-the-ripper/hash-extraction',
    title: 'Hash Extraction',
    desc: 'Extract password hashes from files: zip2john, rar2john, pdf2john, ssh2john, keepass2john, and more.',
    icon: 'ri-extraction-line',
  },
  {
    path: '/john-the-ripper/command-builder',
    title: 'Command Builder',
    desc: 'Interactive tool to select options, configure sessions, and generate optimized John commands.',
    icon: 'ri-tools-line',
  },
  {
    path: '/john-the-ripper/examples',
    title: 'Examples',
    desc: 'Real-world cracking scenarios and the exact commands for each situation.',
    icon: 'ri-file-list-line',
  },
  {
    path: '/john-the-ripper/pro-tips',
    title: 'Pro Tips',
    desc: 'Expert advice on session management, performance tuning, format-specific optimization, and brute forcing strategies.',
    icon: 'ri-lightbulb-line',
  },
  {
    path: '/john-the-ripper/quiz',
    title: 'John the Ripper Quiz',
    desc: 'Test your password cracking knowledge with 20 multiple-choice questions covering modes, formats, and usage.',
    icon: 'ri-questionnaire-line',
  },
  {
    path: '/john-the-ripper/lab',
    title: 'John the Ripper Lab',
    desc: 'Hands-on exercises where you write John commands to crack different hash types using various modes and options.',
    icon: 'ri-flask-line',
  },
];

export default function JohnTheRipperLandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
            <i className="ri-lock-unlock-line" />
            Module — Password Cracking
          </div>
          <DocHeading level={1}>John the Ripper</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3 text-lg">
            <strong className="text-cyber-cyan">John the Ripper (JtR)</strong> is an open-source password security auditing and recovery tool. It supports hundreds of hash and cipher types — from Unix crypt to Windows NTLM, from PDF and Office documents to ZIP and RAR archives — and combines multiple cracking modes with powerful rule-based wordlist mutations.
          </p>
          <p className="text-cyber-text leading-relaxed mt-3 text-lg">
            John is the standard tool for password cracking in cybersecurity assessments, penetration tests, and CTF challenges. Its Jumbo variant includes GPU acceleration via OpenCL and a vast library of format modules.
          </p>
        </motion.div>

        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-lg font-semibold text-white mb-4">Module Sections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sections.map((s) => (
              <a
                key={s.path}
                href={s.path}
                className="cyber-card p-4 hover:border-cyber-cyan/50 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-cyber-bg-card border border-cyber-border flex items-center justify-center flex-shrink-0 text-cyber-cyan group-hover:bg-cyber-cyan/10 transition-colors">
                    <i className={s.icon} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-cyber-cyan transition-colors">{s.title}</h3>
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
              New to John the Ripper? Start with these three sections in order:
            </p>
            <ol className="space-y-2">
              {[
                { num: '1', title: 'Installation', desc: 'Get John installed on your system, preferably the Jumbo version.', path: '/john-the-ripper/installation' },
                { num: '2', title: 'Single Crack Mode', desc: 'Learn the fastest mode that often cracks passwords immediately.', path: '/john-the-ripper/single-crack-mode' },
                { num: '3', title: 'Wordlist Mode', desc: 'Master the most commonly used attack mode with rules and wordlists.', path: '/john-the-ripper/wordlist-mode' },
              ].map((step) => (
                <li key={step.num}>
                  <a href={step.path} className="flex items-center gap-3 p-3 rounded-lg bg-cyber-bg border border-cyber-border hover:border-cyber-cyan/50 transition-all">
                    <span className="w-7 h-7 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan text-xs font-bold flex-shrink-0">
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
          <Callout type="info">
            Before cracking any password hash, ensure you have legal authorization. Only test systems you own or have explicit permission to audit.
          </Callout>
        </motion.section>

        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/john-the-ripper/installation" className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg text-sm font-semibold hover:bg-cyber-cyan-dim transition-all whitespace-nowrap">
              Next: Installation <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
        </motion.section>
      </div>
  );
}
