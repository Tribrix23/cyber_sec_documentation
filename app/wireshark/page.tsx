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
    path: '/wireshark/command-line',
    title: 'Command Line Basics',
    desc: 'Launch Wireshark, capture traffic, and navigate the GUI efficiently.',
    icon: 'ri-terminal-line',
  },
  {
    path: '/wireshark/capture-filters',
    title: 'Capture Filters',
    desc: 'Reduce traffic volume by capturing only relevant packets using BPF syntax.',
    icon: 'ri-filter-3-line',
  },
  {
    path: '/wireshark/display-filters',
    title: 'Display Filters',
    desc: 'Filter captured traffic in real-time with powerful Wireshark display filter language.',
    icon: 'ri-search-eye-line',
  },
  {
    path: '/wireshark/filter-builder',
    title: 'Filter Builder',
    desc: 'Interactive tool to construct complex display filters using protocol, field, operator, and value selectors.',
    icon: 'ri-tools-line',
  },
  {
    path: '/wireshark/advanced-features',
    title: 'Advanced Features',
    desc: 'Follow streams, extract files, decode protocols, and use coloring rules.',
    icon: 'ri-equalizer-line',
  },
  {
    path: '/wireshark/protocol-analysis',
    title: 'Protocol Analysis',
    desc: 'Deep dive into HTTP, DNS, TCP, SSL/TLS, and other protocol structures.',
    icon: 'ri-code-box-line',
  },
  {
    path: '/wireshark/troubleshooting',
    title: 'Troubleshooting',
    desc: 'Diagnose network connectivity, latency, and application issues with Wireshark.',
    icon: 'ri-tools-line',
  },
  {
    path: '/wireshark/wireshark-lab',
    title: 'Wireshark Lab',
    desc: 'Hands-on exercises analyzing PCAP files and answering scenario-based questions.',
    icon: 'ri-flask-line',
  },
  {
    path: '/wireshark/wireshark-quiz',
    title: 'Wireshark Quiz',
    desc: 'Test your knowledge with multiple-choice questions covering all Wireshark concepts.',
    icon: 'ri-questionnaire-line',
  },
];

export default function WiresharkLandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-pulse-line" />
            Module  Network Traffic Analysis
          </div>
          <DocHeading level={1}>Wireshark — Network Protocol Analyzer</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3 text-lg">
             <strong className="text-cyber-cyan">Wireshark</strong> is the world&apos;s most widely used network protocol analyzer. It captures and inspects network packets in real-time, allowing you to analyze protocols, troubleshoot issues, and understand network behavior at a granular level.
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
                  <span className="w-8 h-8 rounded-lg bg-cyber-bg-card border border-cyber-border flex items-center justify-center flex-shrink-0 text-cyber-amber group-hover:bg-cyber-amber/10 transition-colors">
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
              New to Wireshark? Start with these three sections in order:
            </p>
            <ol className="space-y-2">
              {[
                { num: '1', title: 'Command Line Basics', desc: 'Learn to launch Wireshark and capture traffic.', path: '/wireshark/command-line' },
                { num: '2', title: 'Capture Filters', desc: 'Reduce capture size by filtering at the source.', path: '/wireshark/capture-filters' },
                { num: '3', title: 'Display Filters', desc: 'Filter and search captured packets effectively.', path: '/wireshark/display-filters' },
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
          <Callout type="info">
            Wireshark is a passive sniffer — it only observes traffic destined for or routed through the host it runs on. To capture traffic between other hosts, you need port mirroring or a network tap.
          </Callout>
         </motion.section>

        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/wireshark/command-line" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Command Line Basics <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
        </motion.section>
      </div>
   );
}