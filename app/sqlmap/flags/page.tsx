'use client'
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const flags = [
  { category: 'Target', flags: [
    { flag: '-u <url>', desc: 'Target URL with parameter to test' },
    { flag: '-r <file>', desc: 'Load HTTP request from file (Burp export)' },
    { flag: '-p <param>', desc: 'Specify parameter(s) to test' },
  ]},
  { category: 'Request', flags: [
    { flag: '--data <data>', desc: 'POST data string' },
    { flag: '--cookie <cookie>', desc: 'HTTP Cookie header value' },
    { flag: '--headers <headers>', desc: 'Extra HTTP headers' },
    { flag: '--user-agent <ua>', desc: 'Custom User-Agent header' },
    { flag: '--referer <url>', desc: 'HTTP Referer header' },
  ]},
  { category: 'Injection', flags: [
    { flag: '--level <1-5>', desc: 'Test level (1=basic, 5=exhaustive)' },
    { flag: '--risk <1-3>', desc: 'Risk level (1=safe, 3=aggressive)' },
    { flag: '--technique <techniques>', desc: 'Specify technique order (BEUSTQ)' },
    { flag: '--dbms <dbms>', desc: 'Force backend DBMS type' },
  ]},
  { category: 'Enumeration', flags: [
    { flag: '--dbs', desc: 'Enumerate databases' },
    { flag: '--tables', desc: 'Enumerate tables' },
    { flag: '-D <db>', desc: 'Specify database name' },
    { flag: '-T <table>', desc: 'Specify table name' },
    { flag: '--columns', desc: 'Enumerate columns' },
    { flag: '-C <columns>', desc: 'Specify column names' },
    { flag: '--dump', desc: 'Dump table data' },
    { flag: '--dump-all', desc: 'Dump all databases' },
  ]},
  { category: 'OS Access', flags: [
    { flag: '--os-shell', desc: 'Get OS shell' },
    { flag: '--os-cmd <cmd>', desc: 'Execute OS command' },
    { flag: '--file-read <path>', desc: 'Read file from server' },
    { flag: '--file-write <local>', desc: 'Write file to server' },
    { flag: '--file-dest <path>', desc: 'Destination path for file write' },
  ]},
  { category: 'WAF Bypass', flags: [
    { flag: '--tamper <script>', desc: 'Use tamper script(s) to bypass WAF' },
    { flag: '--tamper <s1,s2>', desc: 'Chain multiple tamper scripts' },
  ]},
  { category: 'Network', flags: [
    { flag: '--proxy <url>', desc: 'Route traffic through proxy' },
    { flag: '--tor', desc: 'Use Tor anonymity network' },
    { flag: '--tor-port <port>', desc: 'Tor SOCKS port (default: 9050)' },
    { flag: '--threads <n>', desc: 'Number of concurrent HTTP requests' },
  ]},
  { category: 'Output', flags: [
    { flag: '--batch', desc: 'Never ask for user input (use defaults)' },
    { flag: '-v <0-6>', desc: 'Verbosity level (0=quiet, 6=debug)' },
    { flag: '--output-dir <path>', desc: 'Output directory for logs' },
    { flag: '--flush-session', desc: 'Flush session files' },
  ]},
];

export default function FlagsPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-flag-line" />
          SQLMap Section 7 of 13
        </div>
        <DocHeading level={1}>Common Flags Reference</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Complete reference of SQLMap command-line flags organized by category.
        </p>
      </motion.div>

      {flags.map((cat) => (
        <motion.section key={cat.category} className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h3 className="text-sm font-semibold text-white mb-3">{cat.category} Flags</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {cat.flags.map((f) => (
              <div key={f.flag} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
                <span className="font-mono text-xs px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-cyber-cyan flex-shrink-0 whitespace-nowrap">
                  {f.flag}
                </span>
                <span className="text-sm text-cyber-text">{f.desc}</span>
              </div>
            ))}
          </div>
        </motion.section>
      ))}

      <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/sqlmap/installation" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Installation <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sqlmap/os-commands" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}