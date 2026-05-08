'use client'
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function InstallationPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-medium font-mono mb-4">
          <i className="ri-download-line" />
          SSLScan Section 5 of 10
        </div>
        <DocHeading level={1}>Installation</DocHeading>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="space-y-6">
          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Linux (apt / Kali)</h3>
            <CodeBlock code="sudo apt install sslscan" />
          </div>
          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">macOS (Homebrew)</h3>
            <CodeBlock code="brew install sslscan" />
          </div>
          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">From Source</h3>
            <CodeBlock code="git clone https://github.com/rbsec/sslscan.git\nsudo make install" />
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/sslscan/examples" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Usage Examples <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sslscan/flags" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-green hover:text-cyber-green transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}