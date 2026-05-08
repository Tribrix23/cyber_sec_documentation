'use client'
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function CipherSuitesPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-medium font-mono mb-4">
          <i className="ri-lock-line" />
          SSLScan Section 2 of 10
        </div>
        <DocHeading level={1}>Cipher Suites</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          SSLScan rates cipher suites by strength to help identify weak configurations.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Rating Levels</h3>
        <div className="space-y-3">
          <div className="cyber-card p-4">
            <span className="text-sm font-bold text-cyber-green">Preferred</span>
            <p className="text-xs text-cyber-text">Strong modern cipher — recommended</p>
          </div>
          <div className="cyber-card p-4">
            <span className="text-sm font-bold text-cyber-amber">Accepted</span>
            <p className="text-xs text-cyber-text">Acceptable but not ideal</p>
          </div>
          <div className="cyber-card p-4">
            <span className="text-sm font-bold text-cyber-red">Weak</span>
            <p className="text-xs text-cyber-text">Weak cipher — should be disabled</p>
          </div>
          <div className="cyber-card p-4">
            <span className="text-sm font-bold text-cyber-red">Broken</span>
            <p className="text-xs text-cyber-text">Cryptographically broken — must be disabled immediately</p>
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/sslscan/vulnerabilities" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Vulnerabilities <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sslscan/protocol-versions" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-green hover:text-cyber-green transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}