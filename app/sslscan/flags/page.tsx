'use client'
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const flags = [
  { category: 'Protocol', flags: [
    { flag: '--tls1', desc: 'Only test TLS 1.0' },
    { flag: '--tls1_1', desc: 'Only test TLS 1.1' },
    { flag: '--tls1_2', desc: 'Only test TLS 1.2' },
    { flag: '--tls1_3', desc: 'Only test TLS 1.3' },
    { flag: '--ssl2', desc: 'Test SSLv2 (deprecated)' },
    { flag: '--ssl3', desc: 'Test SSLv3 (deprecated)' },
  ]},
  { category: 'Vulnerability', flags: [
    { flag: '--heartbleed', desc: 'Test for Heartbleed vulnerability' },
    { flag: '--show-certificate', desc: 'Show full certificate details' },
  ]},
  { category: 'Output', flags: [
    { flag: '--no-failed', desc: 'Do not show rejected ciphers' },
    { flag: '--xml=<file>', desc: 'Save output to XML file' },
    { flag: '--json=<file>', desc: 'Save output to JSON file' },
  ]},
  { category: 'Connection', flags: [
    { flag: '-p <port>', desc: 'Specify port (default: 443)' },
    { flag: '--ipv4', desc: 'Force IPv4 connection' },
    { flag: '--ipv6', desc: 'Force IPv6 connection' },
  ]},
];

export default function FlagsPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-medium font-mono mb-4">
          <i className="ri-flag-line" />
          SSLScan Section 4 of 10
        </div>
        <DocHeading level={1}>Common Flags Reference</DocHeading>
      </motion.div>

      {flags.map((cat) => (
        <motion.section key={cat.category} className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h3 className="text-sm font-semibold text-white mb-3">{cat.category} Flags</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {cat.flags.map((f) => (
              <div key={f.flag} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
                <span className="font-mono text-xs px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-cyber-cyan flex-shrink-0 whitespace-nowrap">
                  {f.flag}
                </span>
                <span className="text-sm text-cyber-text">{f.desc}</span>
              </div>
            ))}
          </div>
        </motion.section>
      ))}

      <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/sslscan/installation" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Installation <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sslscan/vulnerabilities" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-green hover:text-cyber-green transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}