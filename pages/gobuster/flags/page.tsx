import { useEffect } from 'react';
import Layout from '@/components/feature/Layout';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import InlineCode from '@/components/base/InlineCode';
import CodeBlock from '@/components/base/CodeBlock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const flagCategories = [
  {
    title: 'Global Flags (All Modes)',
    flags: [
      { flag: '-w <wordlist>', desc: 'Path to wordlist file', example: 'gobuster dir -u http://10.0.0.1/ -w common.txt' },
      { flag: '-t <threads>', desc: 'Number of concurrent threads (default: 10)', example: 'gobuster dir -u http://10.0.0.1/ -w common.txt -t 50' },
      { flag: '-o <file>', desc: 'Output results to file', example: 'gobuster dir -u http://10.0.0.1/ -w common.txt -o results.txt' },
      { flag: '-v', desc: 'Verbose output (show every attempt)', example: 'gobuster dir -u http://10.0.0.1/ -w common.txt -v' },
      { flag: '-z', desc: 'Suppress progress output', example: 'gobuster dir -u http://10.0.0.1/ -w common.txt -z' },
      { flag: '-q', desc: 'Quiet mode (only show results)', example: 'gobuster dir -u http://10.0.0.1/ -w common.txt -q' },
      { flag: '--timeout <seconds>', desc: 'HTTP timeout per request', example: 'gobuster dir -u http://10.0.0.1/ -w common.txt --timeout 30s' },
      { flag: '--delay <duration>', desc: 'Delay between each request', example: 'gobuster dir -u http://10.0.0.1/ -w common.txt --delay 1s' },
    ],
  },
  {
    title: 'Dir Mode Flags',
    flags: [
      { flag: '-u <url>', desc: 'Target URL', example: 'gobuster dir -u http://10.0.0.1/ -w common.txt' },
      { flag: '-x <extensions>', desc: 'File extensions to append', example: 'gobuster dir -u http://10.0.0.1/ -w common.txt -x php,txt,html' },
      { flag: '-r', desc: 'Follow redirects', example: 'gobuster dir -u http://10.0.0.1/ -w common.txt -r' },
      { flag: '--wildcard', desc: 'Force wildcard detection', example: 'gobuster dir -u http://10.0.0.1/ -w common.txt --wildcard' },
      { flag: '--exclude-length <lengths>', desc: 'Exclude responses with these lengths', example: 'gobuster dir -u http://10.0.0.1/ -w common.txt --exclude-length 1234' },
      { flag: '-c <cookie>', desc: 'Add cookie string', example: 'gobuster dir -u http://10.0.0.1/ -w common.txt -c "session=abc123"' },
      { flag: '-H <header>', desc: 'Add custom HTTP header', example: 'gobuster dir -u http://10.0.0.1/ -w common.txt -H "X-API-Key: key123"' },
      { flag: '-k', desc: 'Skip TLS certificate verification', example: 'gobuster dir -u https://10.0.0.1/ -w common.txt -k' },
      { flag: '-a <agent>', desc: 'Set custom User-Agent string', example: 'gobuster dir -u http://10.0.0.1/ -w common.txt -a "Mozilla/5.0"' },
    ],
  },
  {
    title: 'DNS Mode Flags',
    flags: [
      { flag: '-d <domain>', desc: 'Target domain', example: 'gobuster dns -d example.com -w subdomains.txt' },
      { flag: '-i', desc: 'Show IP addresses', example: 'gobuster dns -d example.com -w subdomains.txt -i' },
      { flag: '--resolver <ip>', desc: 'Custom DNS resolver', example: 'gobuster dns -d example.com -w subdomains.txt --resolver 8.8.8.8' },
    ],
  },
  {
    title: 'Vhost Mode Flags',
    flags: [
      { flag: '-u <url>', desc: 'Target URL (IP-based)', example: 'gobuster vhost -u http://10.0.0.1/ -w vhosts.txt' },
      { flag: '--append-domain', desc: 'Append domain to wordlist entries', example: 'gobuster vhost -u http://10.0.0.1/ -w common.txt --append-domain -d example.com' },
      { flag: '-d <domain>', desc: 'Domain to append (with --append-domain)', example: 'gobuster vhost -u http://10.0.0.1/ -w common.txt --append-domain -d example.com' },
    ],
  },
  {
    title: 'Fuzz Mode Flags',
    flags: [
      { flag: '-u <url>', desc: 'Target URL with FUZZ keyword', example: 'gobuster fuzz -u "http://10.0.0.1/FUZZ" -w common.txt' },
      { flag: '-X <method>', desc: 'HTTP method (GET, POST, PUT, etc.)', example: 'gobuster fuzz -u "http://10.0.0.1/FUZZ" -w common.txt -X POST' },
      { flag: '-d <data>', desc: 'POST data with FUZZ keyword', example: 'gobuster fuzz -u "http://10.0.0.1/login" -w passwords.txt -d "pass=FUZZ" -X POST' },
      { flag: '-H <header>', desc: 'Add custom header', example: 'gobuster fuzz -u "http://10.0.0.1/FUZZ" -w common.txt -H "Authorization: Bearer token"' },
      { flag: '-w1 <wordlist>', desc: 'Wordlist for FUZZ1 placeholder', example: 'gobuster fuzz -u "http://10.0.0.1/FUZZ1/FUZZ2" -w1 dirs.txt -w2 files.txt' },
      { flag: '-w2 <wordlist>', desc: 'Wordlist for FUZZ2 placeholder', example: 'gobuster fuzz -u "http://10.0.0.1/FUZZ1/FUZZ2" -w1 dirs.txt -w2 files.txt' },
    ],
  },
];

export default function GobusterFlagsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
            <i className="ri-flag-line" />
            Gobuster Section 6 of 13
          </div>
          <DocHeading level={1}>Common Flags Reference</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            Gobuster has a rich set of flags organized by mode. This reference covers every essential flag with a description and a working example you can copy and modify.
          </p>
        </motion.div>

        {flagCategories.map((cat) => (
          <motion.section key={cat.title} className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <DocHeading level={2}>{cat.title}</DocHeading>
            <div className="mt-4 space-y-3">
              {cat.flags.map((f) => (
                <div key={f.flag} className="cyber-card p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                    <code className="text-xs font-mono text-cyber-cyan bg-cyber-bg border border-cyber-border rounded px-2 py-1 flex-shrink-0 whitespace-nowrap">
                      {f.flag}
                    </code>
                    <div className="flex-1">
                      <p className="text-sm text-cyber-text-muted">{f.desc}</p>
                      <code className="block text-xs font-mono text-cyber-green mt-2">{f.example}</code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        ))}

        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Callout type="info">
            For the complete flag reference, run <InlineCode>gobuster --help</InlineCode> or consult the official documentation at <a href="https://github.com/OJ/gobuster" target="_blank" rel="noopener noreferrer nofollow" className="text-cyber-cyan hover:underline">github.com/OJ/gobuster</a>
          </Callout>

          <div className="mt-8 flex gap-3">
            <a href="/gobuster/wordlists" className="px-5 py-2.5 rounded-lg bg-cyber-red text-white text-sm font-semibold hover:bg-cyber-red/80 transition-all whitespace-nowrap">
              Next: Wordlists <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/gobuster/fuzz" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text-muted hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}