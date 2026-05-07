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

const fuzzExamples = [
  {
    title: 'Fuzz URL Paths',
    cmd: 'gobuster fuzz -u "http://10.0.0.1/FUZZ" -w /usr/share/wordlists/common.txt',
    desc: 'Replaces FUZZ in the URL with each wordlist entry. Tests for hidden directories, files, and API endpoints.',
  },
  {
    title: 'Fuzz with Extensions',
    cmd: 'gobuster fuzz -u "http://10.0.0.1/FUZZ.php" -w /usr/share/wordlists/common.txt',
    desc: 'Appends .php to each wordlist entry. Useful for finding PHP scripts and endpoints in PHP-based applications.',
  },
  {
    title: 'Fuzz Query Parameters',
    cmd: 'gobuster fuzz -u "http://10.0.0.1/api?FUZZ=test" -w /usr/share/wordlists/parameters.txt',
    desc: 'Discovers hidden query parameters that the API might accept. Often reveals debug modes, feature flags, or internal parameters.',
  },
  {
    title: 'Fuzz with Custom Headers',
    cmd: 'gobuster fuzz -u "http://10.0.0.1/FUZZ" -w common.txt -H "X-API-Key: secret123" -H "Accept: application/json"',
    desc: 'Adds custom headers to each request. Useful for authenticated fuzzing or testing API endpoints that require specific headers.',
  },
  {
    title: 'Fuzz POST Data',
    cmd: 'gobuster fuzz -u "http://10.0.0.1/login" -w passwords.txt -d "username=admin&password=FUZZ" -X POST',
    desc: 'Fuzzes the password field in a POST login request. Combines with a password wordlist to test credential strength.',
  },
  {
    title: 'Multiple FUZZ Keywords',
    cmd: 'gobuster fuzz -u "http://10.0.0.1/FUZZ1/FUZZ2" -w1 dirs.txt -w2 files.txt',
    desc: 'Uses multiple FUZZ placeholders with separate wordlists for each. Tests combinations of directories and files simultaneously.',
  },
];

export default function GobusterFuzzPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
            <i className="ri-bug-line" />
            Gobuster Section 5 of 13
          </div>
          <DocHeading level={1}>Generic Fuzzing</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            The <strong className="text-white">fuzz</strong> mode is Gobuster&apos;s most flexible feature. It replaces the <InlineCode>FUZZ</InlineCode> keyword anywhere in an HTTP request with wordlist entries, enabling you to fuzz URLs, query parameters, headers, POST data, and more.
          </p>
        </motion.div>

        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>How Fuzzing Works</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Unlike the dir mode which only appends words to a base URL, the fuzz mode lets you place the <InlineCode>FUZZ</InlineCode> keyword anywhere in the request. Gobuster replaces FUZZ with each wordlist entry and sends the modified request. This makes it incredibly versatile for testing APIs, form fields, authentication endpoints, and custom URL patterns.
          </p>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            You can use multiple FUZZ keywords (FUZZ1, FUZZ2, etc.) with separate wordlists for each. This allows combinatorial testing where you test every combination of values from multiple wordlists.
          </p>

          <Callout type="info" className="mt-4">
            The <InlineCode>FUZZ</InlineCode> keyword is case-sensitive and must appear exactly as shown. Gobuster replaces it before sending each request.
          </Callout>
        </motion.section>

        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Fuzzing Examples</DocHeading>
          <div className="mt-6 space-y-4">
            {fuzzExamples.map((ex) => (
              <div key={ex.title} className="cyber-card p-5">
                <h3 className="text-sm font-semibold text-white mb-2">{ex.title}</h3>
                <p className="text-xs text-cyber-text-muted leading-relaxed mb-3">{ex.desc}</p>
                <CodeBlock code={ex.cmd} />
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Tips for Effective Fuzzing</DocHeading>
          <div className="mt-4 space-y-3">
            <Callout type="tip">
              Use <InlineCode>--exclude-length</InlineCode> to filter out responses with a known false-positive body length. This dramatically reduces noise in fuzzing results.
            </Callout>
            <Callout type="warning">
              Fuzzing POST data on authentication endpoints can trigger account lockout policies. Be careful with brute-force attempts and always verify you have authorization.
            </Callout>
            <Callout type="info">
              For API fuzzing, combine Gobuster with tools like <InlineCode>ffuf</InlineCode> or <InlineCode>wfuzz</InlineCode> for more advanced response filtering and match conditions.
            </Callout>
          </div>

          <div className="mt-8 flex gap-3">
            <a href="/gobuster/flags" className="px-5 py-2.5 rounded-lg bg-cyber-red text-white text-sm font-semibold hover:bg-cyber-red/80 transition-all whitespace-nowrap">
              Next: Common Flags <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/gobuster/s3" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text-muted hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
  );
}