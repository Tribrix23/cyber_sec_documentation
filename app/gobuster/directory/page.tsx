'use client'
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

const techniques = [
  {
    title: 'Basic Directory Scan',
    desc: 'The simplest directory scan uses a wordlist to guess common directory and file names. Gobuster sends HTTP GET requests and reports any response that does not return a 404 status code.',
    cmd: 'gobuster dir -u http://10.0.0.1/ -w /usr/share/wordlists/dirb/common.txt',
  },
  {
    title: 'Scan with Extensions',
    desc: 'Web applications often hide backend files like .php, .bak, .txt, or .zip. The -x flag appends extensions to each wordlist entry, dramatically increasing coverage.',
    cmd: 'gobuster dir -u http://10.0.0.1/ -w /usr/share/wordlists/dirb/common.txt -x php,txt,html,js,bak,zip',
  },
  {
    title: 'Follow Redirects',
    desc: 'By default, Gobuster does not follow HTTP redirects. A 301/302 response might lead to an accessible resource. Use -r to follow redirects and see the final destination.',
    cmd: 'gobuster dir -u http://10.0.0.1/ -w common.txt -r',
  },
  {
    title: 'Authenticated Scanning',
    desc: 'Many admin panels and APIs require authentication. Use -c to add a session cookie or -H to add custom headers like Authorization tokens.',
    cmd: 'gobuster dir -u http://10.0.0.1/ -w common.txt -c "session=abc123"',
  },
  {
    title: 'Custom Status Codes',
    desc: 'Gobuster reports any status code that is not 404 by default. You can explicitly include or exclude codes to filter noise. Use --exclude-length to hide responses with known false-positive lengths.',
    cmd: 'gobuster dir -u http://10.0.0.1/ -w common.txt --exclude-length 1234',
  },
  {
    title: 'Recursive Scanning',
    desc: 'When Gobuster finds a directory, you can recursively scan deeper paths. Combine with -t to increase thread count for faster deep enumeration.',
    cmd: 'gobuster dir -u http://10.0.0.1/admin/ -w common.txt -t 50',
  },
];

const statusCodes = [
  { code: '200 OK', meaning: 'Resource exists and is accessible.', action: 'Investigate — this is a valid file or directory.' },
  { code: '301/302 Redirect', meaning: 'Resource exists but redirects elsewhere.', action: 'Follow with -r or manually inspect the Location header.' },
  { code: '401 Unauthorized', meaning: 'Resource exists but requires authentication.', action: 'Try default credentials or credential stuffing attacks.' },
  { code: '403 Forbidden', meaning: 'Resource exists but access is denied.', action: 'Try bypass techniques like path traversal or method switching.' },
  { code: '404 Not Found', meaning: 'Resource does not exist (Gobuster filters these by default).', action: 'No action needed — this is what Gobuster expects for missing resources.' },
  { code: '500 Server Error', meaning: 'The server encountered an error processing the request.', action: 'May indicate a bug or unhandled input — try fuzzing the path.' },
];

export default function GobusterDirectoryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
            <i className="ri-folder-3-line" />
            Gobuster Section 1 of 13
          </div>
          <DocHeading level={1}>Directory & File Bruteforce</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3 text-lg">
                         The <strong className="text-cyber-cyan">dir</strong> mode is Gobuster&apos;s original and most widely used feature. It discovers hidden directories, files, and endpoints on web servers by systematically testing a wordlist against a target URL.
          </p>
        </motion.div>

        {/* How it works */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>How Directory Scanning Works</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3">
            Gobuster takes each word from your wordlist and appends it to the target URL, sending an HTTP GET request for each combination. If the server responds with anything other than a 404 status code, Gobuster reports it as a potential finding. This simple but effective approach reveals admin panels, backup files, configuration files, API endpoints, and hidden application routes.
          </p>

          <div className="mt-6 cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Scanning Flow</h3>
            <div className="space-y-3">
              {[
                { step: '1. Target Parsing', desc: 'Gobuster parses the target URL, validates it, and prepares the base path for wordlist appending.' },
                { step: '2. Wordlist Loading', desc: 'The wordlist is loaded into memory. Large wordlists (millions of entries) are handled efficiently in Go.' },
                { step: '3. Concurrent Requests', desc: 'Gobuster spawns multiple goroutines (threads) to send HTTP requests in parallel. Default is 10 threads.' },
                { step: '4. Response Analysis', desc: 'Each response is checked for status codes, body length, and redirect behavior. Non-404 responses are reported.' },
                { step: '5. Result Formatting', desc: 'Results are printed to stdout in real-time and optionally saved to a file with -o.' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg border border-cyber-border">
                  <span className="text-xs font-bold text-cyber-red font-mono flex-shrink-0">{s.step.split('.')[0]}</span>
                  <div>
                    <span className="text-xs font-semibold text-white">{s.step.split('. ')[1]}</span>
                    <p className="text-xs text-cyber-text mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Techniques */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Directory Scanning Techniques</DocHeading>
          <div className="mt-6 space-y-4">
            {techniques.map((t) => (
              <div key={t.title} className="cyber-card p-5">
                <h3 className="text-sm font-semibold text-white mb-2">{t.title}</h3>
                <p className="text-xs text-cyber-text leading-relaxed mb-3">{t.desc}</p>
                <CodeBlock code={t.cmd} />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Status Codes */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Understanding HTTP Status Codes</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3">
            Reading Gobuster output correctly means understanding what each HTTP status code tells you about the target resource.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm border border-cyber-border rounded-lg overflow-hidden">
              <thead className="bg-cyber-bg-card">
                <tr>
                  <th className="text-left px-4 py-3 text-cyber-text font-semibold">Status Code</th>
                  <th className="text-left px-4 py-3 text-cyber-text font-semibold">Meaning</th>
                  <th className="text-left px-4 py-3 text-cyber-text font-semibold">Recommended Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-border">
                {statusCodes.map((sc) => (
                  <tr key={sc.code} className="hover:bg-cyber-bg-card/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-cyber-red text-xs">{sc.code}</td>
                    <td className="px-4 py-3 text-cyber-text text-xs">{sc.meaning}</td>
                    <td className="px-4 py-3 text-cyber-text text-xs">{sc.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Tips */}
        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Pro Tips for Directory Scanning</DocHeading>
          <div className="mt-4 space-y-3">
            <Callout type="tip">
              Always use <InlineCode>-x</InlineCode> with common extensions. A file named <InlineCode>backup.sql</InlineCode> will not be found unless you include <InlineCode>sql</InlineCode> in your extension list.
            </Callout>
            <Callout type="warning">
              High thread counts (<InlineCode>-t 100</InlineCode>) can trigger WAF rate limiting. Start with <InlineCode>-t 10</InlineCode> and increase gradually if the target handles it well.
            </Callout>
            <Callout type="info">
              Use <InlineCode>--wildcard</InlineCode> to detect wildcard responses. Some servers return 200 for every request, making the scan useless without filtering.
            </Callout>
          </div>

           <div className="mt-8 flex gap-3">
              <a href="/gobuster/dns" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
               Next: DNS Subdomain <i className="ri-arrow-right-line ml-1" />
             </a>
             <a href="/gobuster" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
               <i className="ri-arrow-left-line mr-1" /> Back
             </a>
           </div>
        </motion.section>
      </div>
  );
}