'use client'
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const protocols = [
  { name: 'SSL 2.0', port: 'Deprecated 1996', status: 'Broken', statusColor: 'text-cyber-red' },
  { name: 'SSL 3.0', port: 'Deprecated 2015', status: 'Broken', statusColor: 'text-cyber-red' },
  { name: 'TLS 1.0', port: 'Deprecated 2021', status: 'Deprecated', statusColor: 'text-cyber-amber' },
  { name: 'TLS 1.1', port: 'Deprecated 2021', status: 'Deprecated', statusColor: 'text-cyber-amber' },
  { name: 'TLS 1.2', port: 'RFC 5246', status: 'Secure', statusColor: 'text-cyber-green' },
  { name: 'TLS 1.3', port: 'RFC 8446', status: 'Secure', statusColor: 'text-cyber-green' },
];

export default function ProtocolVersionsPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-medium font-mono mb-4">
          <i className="ri-stack-line" />
          SSLScan Section 1 of 10
        </div>
        <DocHeading level={1}>SSL/TLS Protocol Versions</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Understanding protocol versions is crucial for SSL/TLS security assessment.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Protocol Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {protocols.map((p) => (
            <div key={p.name} className="cyber-card p-4">
              <h4 className="text-sm font-semibold text-white">{p.name}</h4>
              <p className="text-xs text-cyber-text">{p.port}</p>
              <span className={`text-xs font-bold ${p.statusColor}`}>{p.status}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/sslscan/cipher-suites" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Cipher Suites <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sslscan" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-green hover:text-cyber-green transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}