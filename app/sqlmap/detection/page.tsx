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

export default function DetectionPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-radar-line" />
          SQLMap Section 3 of 13
        </div>
        <DocHeading level={1}>Detection & Enumeration</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          SQLMap automatically detects SQL injection vulnerabilities and fingerprints the database management system.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Automatic Detection</h3>
        <p className="text-cyber-text text-sm mb-3">
          Point SQLMap at any URL with a parameter to test:
        </p>
        <CodeBlock code="sqlmap -u 'http://target.com/page?id=1'" />
        <p className="text-cyber-text text-xs mt-2">
          SQLMap will test all parameters automatically and report which are injectable.
        </p>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">DBMS Fingerprinting</h3>
        <p className="text-cyber-text text-sm mb-3">
          SQLMap identifies the database type automatically:
        </p>
        <CodeBlock code="sqlmap -u 'http://target.com/page?id=1' --level=3" />
        <p className="text-cyber-text text-xs mt-2">
          Supported databases: MySQL, PostgreSQL, MSSQL, Oracle, SQLite, DB2, Firebird, Sybase, etc.
        </p>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Testing Specific Parameters</h3>
        <p className="text-cyber-text text-sm mb-3">
          Test only specific parameters with <InlineCode>-p</InlineCode>:
        </p>
        <CodeBlock code="sqlmap -u 'http://target.com/search?q=test&cat=1' -p q" />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">POST Data Injection</h3>
        <p className="text-cyber-text text-sm mb-3">
          Test POST parameters:
        </p>
        <CodeBlock code="sqlmap -u 'http://target.com/login' --data='username=admin&password=pass'" />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Request File Method</h3>
        <p className="text-cyber-text text-sm mb-3">
          Use Burp Suite exported requests:
        </p>
        <CodeBlock code="sqlmap -r request.txt" />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Callout type="tip">
          Use <InlineCode>--batch</InlineCode> to skip interactive prompts and accept defaults automatically.
        </Callout>
      </motion.section>

      <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/sqlmap/database-enumeration" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Database Enumeration <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sqlmap/tamper-scripts" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}