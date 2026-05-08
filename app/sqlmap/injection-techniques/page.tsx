'use client'
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const techniques = [
  {
    code: 'B',
    name: 'Boolean-based Blind',
    desc: 'Infers data by asking true/false questions through SQL conditions. Works when no output is shown to the user.',
    example: `sqlmap -u 'http://target.com/page?id=1' --technique=B --batch`,
    when: 'Best for pages that don\'t show errors or query results',
  },
  {
    code: 'E',
    name: 'Error-based',
    desc: 'Extracts data from database error messages returned by the application.',
    example: `sqlmap -u 'http://target.com/page?id=1' --technique=E`,
    when: 'When error messages are visible and contain database info',
  },
  {
    code: 'U',
    name: 'UNION-based',
    desc: 'Uses UNION SELECT to append extra query results. Fastest when applicable.',
    example: `sqlmap -u 'http://target.com/page?id=1' --technique=U --columns`,
    when: 'When the page shows query results and UNION is supported',
  },
  {
    code: 'S',
    name: 'Stacked Queries',
    desc: 'Executes multiple SQL statements in a single query. Allows INSERT, UPDATE, DELETE operations.',
    example: `sqlmap -u 'http://target.com/page?id=1' --technique=S --os-cmd=whoami`,
    when: 'When stacked queries are supported (MySQL, MSSQL, PostgreSQL)',
  },
  {
    code: 'T',
    name: 'Time-based Blind',
    desc: 'Uses SLEEP() or WAITFOR DELAY to infer data based on response timing. Works in complete silence.',
    example: `sqlmap -u 'http://target.com/page?id=1' --technique=T --level=5`,
    when: 'When no output or errors are visible (most reliable)',
  },
  {
    code: 'Q',
    name: 'Inline Queries',
    desc: 'Embeds subqueries in the original query. Works in specific scenarios where other techniques fail.',
    example: `sqlmap -u 'http://target.com/page?id=1' --technique=Q`,
    when: 'For specialized injection scenarios',
  },
];

export default function InjectionTechniquesPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-code-s-slash-line" />
          SQLMap Section 1 of 13
        </div>
        <DocHeading level={1}>SQL Injection Techniques</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          SQLMap supports six different injection techniques. Each has its strengths and ideal use cases.
          You can specify which techniques to use with <InlineCode>--technique=BEUSTQ</InlineCode>.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {techniques.map((t) => (
            <div key={t.code} className="cyber-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-lg bg-cyber-red/10 border border-cyber-red/20 text-cyber-red font-bold text-lg flex items-center justify-center">
                  {t.code}
                </span>
                <h3 className="text-base font-semibold text-white">{t.name}</h3>
              </div>
              <p className="text-sm text-cyber-text mb-3">{t.desc}</p>
              <div className="mb-2">
                <span className="text-[10px] text-cyber-text-dim font-mono uppercase">When to use</span>
                <p className="text-xs text-cyber-cyan">{t.when}</p>
              </div>
              <CodeBlock code={t.example} />
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/sqlmap/tamper-scripts" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Tamper Scripts <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sqlmap" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}