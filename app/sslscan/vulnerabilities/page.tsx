'use client'
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const vulnerabilities = [
  { name: 'Heartbleed', cve: 'CVE-2014-0160', desc: 'OpenSSL memory disclosure bug' },
  { name: 'POODLE', cve: 'CVE-2014-3566', desc: 'SSLv3 padding oracle attack' },
  { name: 'BEAST', cve: 'CVE-2011-3389', desc: 'CBC mode attack against TLS 1.0' },
  { name: 'CRIME', cve: 'CVE-2012-4929', desc: 'Compression-based attack' },
  { name: 'DROWN', cve: 'CVE-2016-0800', desc: 'SSLv2 cross-protocol attack' },
  { name: 'LOGJAM', cve: 'CVE-2015-4000', desc: 'Weak Diffie-Hellman parameters' },
];

export default function VulnerabilitiesPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-medium font-mono mb-4">
          <i className="ri-alert-line" />
          SSLScan Section 3 of 10
        </div>
        <DocHeading level={1}>SSL/TLS Vulnerabilities</DocHeading>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="space-y-3">
          {vulnerabilities.map((v) => (
            <div key={v.name} className="cyber-card p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-cyber-red">{v.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyber-red/10 text-cyber-red border border-cyber-red/20 font-mono">{v.cve}</span>
              </div>
              <p className="text-xs text-cyber-text">{v.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/sslscan/flags" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Common Flags <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sslscan/cipher-suites" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-green hover:text-cyber-green transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}