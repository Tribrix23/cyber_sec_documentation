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
    path: '/nmap/what-is-nmap',
    title: 'What is Nmap',
    desc: 'History, architecture, capabilities, and why it is the industry standard for network scanning.',
    icon: 'ri-information-line',
  },
  {
    path: '/nmap/how-it-works',
    title: 'How Nmap Works',
    desc: 'Deep dive into the 7 phases of an Nmap scan, from target specification through output generation.',
    icon: 'ri-settings-3-line',
  },
  {
    path: '/nmap/scan-types',
    title: 'Scan Types',
    desc: 'TCP SYN, Connect, UDP, NULL, FIN, Xmas, ACK, and more. Learn which scan to use when.',
    icon: 'ri-radar-line',
  },
  {
    path: '/nmap/port-states',
    title: 'Port States',
    desc: 'Understanding open, closed, filtered, unfiltered, and ambiguous states in scan results.',
    icon: 'ri-door-open-line',
  },
  {
    path: '/nmap/timing',
    title: 'Timing Templates',
    desc: 'T0 through T5 explained. Balance speed against stealth and network reliability.',
    icon: 'ri-time-line',
  },
  {
    path: '/nmap/flags',
    title: 'Common Flags',
    desc: 'A comprehensive reference of every essential Nmap flag with real-world usage examples.',
    icon: 'ri-flag-line',
  },
  {
    path: '/nmap/nse-scripts',
    title: 'NSE Scripts',
    desc: 'The Nmap Scripting Engine: vulnerability detection, service enumeration, and brute forcing with Lua.',
    icon: 'ri-code-s-slash-line',
  },
  {
    path: '/nmap/installation',
    title: 'Installation',
    desc: 'Install Nmap on Linux, macOS, Windows, and from source. Verify your setup.',
    icon: 'ri-download-line',
  },
  {
    path: '/nmap/examples',
    title: 'Usage Examples',
    desc: 'Twelve real-world commands from basic host discovery to advanced decoy scanning.',
    icon: 'ri-file-list-line',
  },
  {
    path: '/nmap/command-builder',
    title: 'Command Builder',
    desc: 'Interactive tool to toggle flags, set targets, and generate copy-paste Nmap commands.',
    icon: 'ri-tools-line',
  },
  {
    path: '/nmap/pro-tips',
    title: 'Pro Tips',
    desc: 'Expert advice on stealth scanning, output formats, IDS evasion, and legal considerations.',
    icon: 'ri-lightbulb-line',
  },
  {
    path: '/nmap/quiz',
    title: 'Nmap Quiz',
    desc: 'Test your knowledge with 17 multiple-choice questions covering all Nmap concepts.',
    icon: 'ri-questionnaire-line',
  },
  {
    path: '/nmap/lab',
    title: 'Nmap Lab',
    desc: 'Hands-on exercises where you type real Nmap commands for 12 different scenarios.',
    icon: 'ri-flask-line',
  },
];

export default function NmapLandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-shield-check-line" />
            Network Reconnaissance
          </div>
          <DocHeading level={1}>Nmap — Network Mapper</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3 text-lg">
             <strong className="text-cyber-cyan">Nmap</strong> is the world&apos;s most widely used network scanner. It discovers hosts, open ports, running services, operating systems, and vulnerabilities across any network — from a single machine to millions of addresses.
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
              New to Nmap? Start with these three sections in order:
            </p>
            <ol className="space-y-2">
              {[
                { num: '1', title: 'What is Nmap', desc: 'Understand what Nmap does and why it matters.', path: '/nmap/what-is-nmap' },
                { num: '2', title: 'Scan Types', desc: 'Learn the difference between SYN, Connect, UDP, and stealth scans.', path: '/nmap/scan-types' },
                { num: '3', title: 'Usage Examples', desc: 'See real commands you can run immediately.', path: '/nmap/examples' },
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
            Always obtain written authorization before scanning any network you do not own. Unauthorized port scanning may violate local laws and terms of service.
          </Callout>
         </motion.section>

        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/nmap/what-is-nmap" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: What is Nmap <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
        </motion.section>
      </div>
   );
}
