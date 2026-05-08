'use client'
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const examples = [
  { title: 'Basic scan of a website', cmd: 'sslscan target.com' },
  { title: 'Scan on non-standard port', cmd: 'sslscan --port=8443 target.com' },
  { title: 'Test for Heartbleed', cmd: 'sslscan --heartbleed target.com' },
  { title: 'Show only accepted ciphers', cmd: 'sslscan --no-failed target.com' },
  { title: 'Show full certificate details', cmd: 'sslscan --show-certificate target.com' },
  { title: 'Save results to XML', cmd: 'sslscan --xml=results.xml target.com' },
  { title: 'Scan SMTP with STARTTLS', cmd: 'sslscan --starttls-smtp mail.target.com:25' },
  { title: 'Test only TLS 1.2 and 1.3', cmd: 'sslscan --tls1_2 --tls1_3 target.com' },
];

export default function ExamplesPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-medium font-mono mb-4">
          <i className="ri-file-list-line" />
          SSLScan Section 6 of 10
        </div>
        <DocHeading level={1}>Usage Examples</DocHeading>
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
          <a href="/sslscan/command-builder" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Command Builder <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sslscan/installation" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-green hover:text-cyber-green transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}