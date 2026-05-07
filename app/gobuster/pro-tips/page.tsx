import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import InlineCode from '@/components/base/InlineCode';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const tips = [
  {
    title: 'Gobuster is Loud — Get Authorization',
    content: 'Gobuster sends hundreds or thousands of HTTP requests in rapid succession. This is easily detected by WAFs, IDS systems, and server logs. Always obtain explicit written authorization before brute-forcing any target.',
    command: 'gobuster dir -u http://10.0.0.1/ -w common.txt -t 10',
    type: 'danger' as const,
  },
  {
    title: 'Use -t 50+ on Fast Networks',
    content: 'On reliable, high-speed networks, increasing threads dramatically speeds up enumeration. Start with -t 10, then increase to -t 50 or -t 100 if the target handles it without errors.',
    command: 'gobuster dir -u http://10.0.0.1/ -w common.txt -t 50',
    type: 'tip' as const,
  },
  {
    title: 'Combine Gobuster with Other Tools',
    content: 'Gobuster excels at speed but lacks advanced filtering. Combine it with ffuf or feroxbuster for more sophisticated response filtering, or use httpx to quickly probe discovered endpoints for alive services.',
    command: 'gobuster dns -d example.com -w subdomains.txt -o subs.txt && cat subs.txt | httpx',
    type: 'info' as const,
  },
  {
    title: 'Always Use Extensions on Web Apps',
    content: 'A basic directory scan without -x will miss critical files like config.php, backup.zip, or database.sql. Always include relevant extensions for the target technology stack.',
    command: 'gobuster dir -u http://10.0.0.1/ -w common.txt -x php,txt,bak,zip,sql,js,html',
    type: 'tip' as const,
  },
  {
    title: 'Filter Wildcard Responses',
    content: 'Some servers return the same response for every request (wildcard responses). Without filtering, Gobuster reports every word as a hit. Use --exclude-length or --wildcard to handle this.',
    command: 'gobuster dir -u http://10.0.0.1/ -w common.txt --exclude-length 1234',
    type: 'warning' as const,
  },
  {
    title: 'Use -k for Self-Signed HTTPS',
    content: 'When scanning HTTPS sites with self-signed or invalid certificates, Gobuster will error out unless you use -k to skip TLS verification.',
    command: 'gobuster dir -u https://10.0.0.1/ -w common.txt -k',
    type: 'info' as const,
  },
  {
    title: 'Save Results Every Time',
    content: 'Always use -o to save results. Command-line output is easily lost. Saved files are essential for reporting, comparison between scans, and feeding data into other tools.',
    command: 'gobuster dir -u http://10.0.0.1/ -w common.txt -o results.txt',
    type: 'tip' as const,
  },
  {
    title: 'Use Custom Wordlists for Targets',
    content: 'Generic wordlists find generic results. Build target-specific lists from OSINT: company names, product names, employee names, industry terms. These often reveal admin panels, dev environments, and backup endpoints.',
    command: 'gobuster dir -u http://10.0.0.1/ -w custom-target.txt -x php',
    type: 'info' as const,
  },
  {
    title: 'Authenticate for Deeper Coverage',
    content: 'Many applications hide endpoints behind authentication. Use -c for cookies or -H for tokens to scan authenticated areas that unauthenticated scanners completely miss.',
    command: 'gobuster dir -u http://10.0.0.1/ -w common.txt -c "session=abc123"',
    type: 'tip' as const,
  },
  {
    title: 'Watch for Rate Limiting',
    content: 'If Gobuster starts receiving 429 (Too Many Requests) or connection timeouts, the target has rate limiting. Reduce threads with -t 5 or add --delay 1s to stay under the limit.',
    command: 'gobuster dir -u http://10.0.0.1/ -w common.txt -t 5 --delay 1s',
    type: 'warning' as const,
  },
  {
    title: 'Enumerate S3 Buckets Systematically',
    content: 'When searching for S3 buckets, try common naming patterns: company-backup, company-dev, company-staging, app-name-data. Also try common region suffixes if you know the AWS region.',
    command: 'gobuster s3 -w s3-buckets.txt',
    type: 'info' as const,
  },
  {
    title: 'Combine DNS and Vhost Enumeration',
    content: 'First find subdomains with Gobuster DNS, then check if multiple subdomains resolve to the same IP. If they do, use vhost mode to discover additional virtual hosts on that shared infrastructure.',
    command: 'gobuster dns -d example.com -w subdomains.txt && gobuster vhost -u http://10.0.0.1/ -w vhosts.txt --append-domain -d example.com',
    type: 'tip' as const,
  },
];

export default function GobusterProTipsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
            <i className="ri-lightbulb-line" />
            Gobuster Section 11 of 13
          </div>
          <DocHeading level={1}>Pro Tips</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            Expert guidance for getting the most out of Gobuster while avoiding common mistakes. These tips cover speed, stealth, accuracy, and responsible disclosure.
          </p>
        </motion.div>

        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Expert Recommendations</DocHeading>
          <div className="mt-6 space-y-4">
            {tips.map((tip) => (
              <div key={tip.title}>
                <Callout type={tip.type} title={tip.title}>
                  <p className="text-xs text-cyber-text-muted leading-relaxed mb-2">{tip.content}</p>
                  <CodeBlock code={tip.command} />
                </Callout>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Legal & Ethical Considerations</DocHeading>
          <Callout type="danger">
            Unauthorized brute-forcing is illegal in many jurisdictions and violates most terms of service. Always obtain explicit, written authorization before scanning any target. Document your scope carefully.
          </Callout>
          <div className="mt-4 cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Rules of Engagement</h3>
            <ul className="space-y-2">
              {[
                'Never brute-force targets outside your authorized scope',
                'Respect rate limits and reduce threads if the target shows signs of stress',
                'Do not download files from discovered S3 buckets without permission',
                'Report findings responsibly and do not exploit them without authorization',
                'Delete scan data when the engagement concludes per your agreement',
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-cyber-text-muted">
                  <span className="w-1 h-1 rounded-full bg-cyber-red mt-1.5 flex-shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex gap-3">
            <a href="/gobuster/quiz" className="px-5 py-2.5 rounded-lg bg-cyber-red text-white text-sm font-semibold hover:bg-cyber-red/80 transition-all whitespace-nowrap">
              Next: Quiz <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/gobuster/command-builder" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text-muted hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
  );
}
