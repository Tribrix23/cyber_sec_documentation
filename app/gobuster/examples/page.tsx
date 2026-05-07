import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const exampleCategories = [
  {
    title: 'Directory Scanning',
    examples: [
      {
        title: 'Directory scan with extensions',
        cmd: 'gobuster dir -u http://10.0.0.1/ -w /usr/share/wordlists/dirb/common.txt -x php,txt,html,js',
        desc: 'Scans for directories and files, appending common web extensions to each wordlist entry. Essential for PHP-based applications.',
      },
      {
        title: 'Dir scan with authentication cookie',
        cmd: 'gobuster dir -u http://10.0.0.1/ -w common.txt -c "session=abc123"',
        desc: 'Adds a session cookie to each request, allowing you to scan authenticated areas of a web application.',
      },
      {
        title: 'Directory scan with custom headers',
        cmd: 'gobuster dir -u http://10.0.0.1/ -w common.txt -H "Authorization: Bearer token" -H "X-API-Key: key123"',
        desc: 'Adds multiple custom headers. Useful for API endpoints that require authentication tokens or API keys.',
      },
      {
        title: 'Follow redirects during dir scan',
        cmd: 'gobuster dir -u http://10.0.0.1/ -w common.txt -r',
        desc: 'Follows HTTP redirects to their final destination. Some resources return 301/302 but are actually accessible after redirect.',
      },
      {
        title: 'Save output to file',
        cmd: 'gobuster dir -u http://10.0.0.1/ -w common.txt -o results.txt',
        desc: 'Saves all discovered directories and files to a text file for later analysis and reporting.',
      },
    ],
  },
  {
    title: 'DNS Subdomain Enumeration',
    examples: [
      {
        title: 'DNS subdomain enumeration',
        cmd: 'gobuster dns -d example.com -w /usr/share/wordlists/subdomains-top1million-5000.txt',
        desc: 'Enumerates subdomains using a list of 5,000 common subdomains. Fast and effective for initial reconnaissance.',
      },
      {
        title: 'DNS with IP display',
        cmd: 'gobuster dns -d example.com -w subdomains.txt -i',
        desc: 'Shows the resolved IP address for each discovered subdomain. Helps identify cloud providers and infrastructure.',
      },
    ],
  },
  {
    title: 'Virtual Host Discovery',
    examples: [
      {
        title: 'Virtual host discovery',
        cmd: 'gobuster vhost -u http://10.0.0.1/ -w /usr/share/wordlists/vhosts.txt',
        desc: 'Tests different Host headers against an IP address to discover virtual hosts on shared hosting.',
      },
      {
        title: 'Vhost with domain append',
        cmd: 'gobuster vhost -u http://10.0.0.1/ -w common.txt --append-domain -d example.com',
        desc: 'Automatically appends .example.com to each wordlist entry. Saves time when building subdomain-style vhosts.',
      },
    ],
  },
  {
    title: 'S3 Bucket Enumeration',
    examples: [
      {
        title: 'S3 bucket enumeration',
        cmd: 'gobuster s3 -w /usr/share/wordlists/s3-buckets.txt',
        desc: 'Brute forces S3 bucket names to find publicly exposed buckets with misconfigured permissions.',
      },
    ],
  },
  {
    title: 'Generic Fuzzing',
    examples: [
      {
        title: 'Fuzz URL paths with threads',
        cmd: 'gobuster fuzz -u "http://10.0.0.1/FUZZ" -w /usr/share/wordlists/common.txt -t 50',
        desc: 'Fuzzes URL paths with increased thread count for faster enumeration. The FUZZ keyword is replaced with each wordlist entry.',
      },
      {
        title: 'Fuzz with POST data',
        cmd: 'gobuster fuzz -u "http://10.0.0.1/login" -w passwords.txt -d "username=admin&password=FUZZ" -X POST',
        desc: 'Fuzzes the password field in a POST login request. Useful for testing credential strength against known passwords.',
      },
    ],
  },
];

export default function GobusterExamplesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
            <i className="ri-file-list-line" />
            Gobuster Section 9 of 13
          </div>
          <DocHeading level={1}>Usage Examples</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            Real-world Gobuster commands organized by mode. Each example includes the command, a detailed explanation, and guidance on when to use it.
          </p>
        </motion.div>

        {exampleCategories.map((cat) => (
          <motion.section key={cat.title} className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <DocHeading level={2}>{cat.title}</DocHeading>
            <div className="mt-4 space-y-5">
              {cat.examples.map((ex, i) => (
                <div key={i} className="cyber-card p-5">
                  <h3 className="text-sm font-semibold text-white mb-2">{ex.title}</h3>
                  <CodeBlock code={ex.cmd} />
                  <p className="text-xs text-cyber-text-muted leading-relaxed mt-3">{ex.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>
        ))}

        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Callout type="danger">
            All examples assume you have <strong className="text-white">written authorization</strong> to test the target. Never run brute-force tools against networks or applications you do not own without explicit permission.
          </Callout>

          <div className="mt-8 flex gap-3">
            <a href="/gobuster/command-builder" className="px-5 py-2.5 rounded-lg bg-cyber-red text-white text-sm font-semibold hover:bg-cyber-red/80 transition-all whitespace-nowrap">
              Next: Command Builder <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/gobuster/installation" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text-muted hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
  );
}