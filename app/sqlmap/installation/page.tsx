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
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-download-line" />
          SQLMap Section 8 of 13
        </div>
        <DocHeading level={1}>Installation</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          SQLMap is written in Python and requires Python 3.7+ to run.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="space-y-6">
          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Kali Linux (Pre-installed)</h3>
            <p className="text-cyber-text text-sm mb-3">SQLMap comes pre-installed on Kali Linux.</p>
            <CodeBlock code="sqlmap --version" />
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Linux / macOS (pip)</h3>
            <p className="text-cyber-text text-sm mb-3">
              Install via pip (recommended for most systems):
            </p>
            <CodeBlock code="pip install sqlmap" />
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">From Source (Git)</h3>
            <p className="text-cyber-text text-sm mb-3">Get the latest development version:</p>
            <CodeBlock code="git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git\nsqlmap" />
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Windows</h3>
            <p className="text-cyber-text text-sm mb-3">
              Download Python from python.org, then install via pip:
            </p>
            <CodeBlock code="pip install sqlmap\n# Or from source:\n# git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git" />
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Docker</h3>
            <p className="text-cyber-text text-sm mb-3">
              Run SQLMap without installing Python:
            </p>
            <CodeBlock code="docker run -it --rm sqlmap/sqlmap -u 'http://target.com?id=1' --batch" />
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/sqlmap/examples" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Usage Examples <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sqlmap/flags" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}