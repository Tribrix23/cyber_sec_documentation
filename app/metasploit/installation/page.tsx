'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function MetasploitInstallationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-download-line" />
          Metasploit Section 1 of 10
        </div>
        <DocHeading level={1}>Installation</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Install Metasploit on your preferred platform. Kali Linux ships with it pre-installed.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-white mb-4">Kali Linux</h2>
        <p className="text-cyber-text mb-3">Metasploit Framework comes pre-installed on Kali Linux.</p>
        <CodeBlock code="msfconsole --version" />
        <CodeBlock code="msfupdate" />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-white mb-4">Linux (Debian/Ubuntu)</h2>
        <CodeBlock code="curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-installer.sh -o msfinstall && chmod 755 msfinstall && sudo ./msfinstall" />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-white mb-4">macOS</h2>
        <CodeBlock code="brew install metasploit" />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-white mb-4">Database Setup</h2>
        <p className="text-cyber-text mb-3">Metasploit uses PostgreSQL for workspace management.</p>
        <CodeBlock code="sudo systemctl start postgresql\nsudo msfdb init" />
        <p className="text-cyber-text mt-2">Verify connection in msfconsole: <code className="text-cyber-amber">db_status</code></p>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="mt-8 flex gap-3">
          <a href="/metasploit/module-types" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Module Types <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  );
}