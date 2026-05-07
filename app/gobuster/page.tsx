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
    path: '/gobuster/directory',
    title: 'Directory & File Bruteforce',
    desc: 'Discover hidden directories and files on web servers by trying a wordlist against a URL.',
    icon: 'ri-folder-3-line',
  },
  {
    path: '/gobuster/dns',
    title: 'DNS Subdomain Bruteforce',
    desc: 'Discover subdomains by DNS resolution using a wordlist. Great for reconnaissance.',
    icon: 'ri-earth-line',
  },
  {
    path: '/gobuster/vhost',
    title: 'Virtual Host Bruteforce',
    desc: 'Test different Host headers to discover virtual hosts on shared hosting environments.',
    icon: 'ri-server-line',
  },
  {
    path: '/gobuster/s3',
    title: 'AWS S3 Bucket Enumeration',
    desc: 'Brute force S3 bucket names to find publicly exposed buckets with misconfigured permissions.',
    icon: 'ri-cloud-line',
  },
  {
    path: '/gobuster/fuzz',
    title: 'Generic Fuzzing',
    desc: 'Fuzz any part of an HTTP request using placeholders. Powerful and flexible.',
    icon: 'ri-bug-line',
  },
  {
    path: '/gobuster/flags',
    title: 'Common Flags',
    desc: 'Comprehensive reference of every Gobuster flag with real-world usage examples.',
    icon: 'ri-flag-line',
  },
  {
    path: '/gobuster/wordlists',
    title: 'Wordlists',
    desc: 'Recommended wordlists from Kali, SecLists, and custom sources for each Gobuster mode.',
    icon: 'ri-file-list-3-line',
  },
  {
    path: '/gobuster/installation',
    title: 'Installation',
    desc: 'Install Gobuster on Linux, macOS, Windows, Docker, and from source.',
    icon: 'ri-download-line',
  },
  {
    path: '/gobuster/examples',
    title: 'Usage Examples',
    desc: 'Real-world commands for each Gobuster mode with context and best practices.',
    icon: 'ri-file-list-line',
  },
  {
    path: '/gobuster/command-builder',
    title: 'Command Builder',
    desc: 'Interactive tool to select mode, configure options, and generate Gobuster commands.',
    icon: 'ri-tools-line',
  },
  {
    path: '/gobuster/pro-tips',
    title: 'Pro Tips',
    desc: 'Expert advice on rate limiting, wordlist selection, output management, and stealth.',
    icon: 'ri-lightbulb-line',
  },
  {
    path: '/gobuster/quiz',
    title: 'Gobuster Quiz',
    desc: 'Test your knowledge with 17 multiple-choice questions covering all Gobuster concepts.',
    icon: 'ri-questionnaire-line',
  },
  {
    path: '/gobuster/lab',
    title: 'Gobuster Lab',
    desc: 'Hands-on exercises where you type real Gobuster commands for different scenarios.',
    icon: 'ri-flask-line',
  },
];

export default function GobusterLandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
            <i className="ri-folder-open-line" />
            Module — Directory & Subdomain Bruteforcing
          </div>
          <DocHeading level={1}>Gobuster</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3 text-lg">
                         <strong className="text-cyber-cyan">Gobuster</strong> is a fast, multi-threaded tool written in Go for brute forcing URIs, DNS subdomains, virtual hosts, AWS S3 buckets, and generic HTTP fuzzing. It is significantly faster than Python-based alternatives due to Go&apos;s concurrency model.
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
              New to Gobuster? Start with these three sections in order:
            </p>
            <ol className="space-y-2">
              {[
                { num: '1', title: 'Directory Bruteforce', desc: 'Understand the most common Gobuster use case.', path: '/gobuster/directory' },
                { num: '2', title: 'Common Flags', desc: 'Learn the flags you will use in every Gobuster command.', path: '/gobuster/flags' },
                { num: '3', title: 'Usage Examples', desc: 'See real commands for each mode.', path: '/gobuster/examples' },
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
            <a href="/gobuster/directory" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Directory & File Bruteforce <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
        </motion.section>
      </div>
   );
}
