'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function JohnWordlistModePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-file-list-3-line" />
          Cracking Mode
        </div>
        <DocHeading level={1}>Wordlist Mode</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          <strong className="text-cyber-green">Wordlist mode</strong> is John's primary attack mode and the most commonly used in real-world engagements. It reads passwords from a wordlist file and tries each one against the target hashes. When combined with rules — powerful transformation engines — wordlist mode multiplies its reach by thousands of mutations per base word.
        </p>
        <p className="text-cyber-text leading-relaxed mt-2">
          The quality of your wordlists determines success. Default wordlists include rockyou.txt (Kali), and SecLists provides dozens of specialized lists (domains, companies, common passwords, mangled patterns, etc.).
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Basic Usage</DocHeading>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Minimal wordlist command</h4>
            <CodeBlock code="john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Custom wordlist</h4>
            <CodeBlock code="john --wordlist=./my_wordlist.txt hashes.txt" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Wordlist with incremental fallback</h4>
            <CodeBlock code="john --wordlist=rockyou.txt --incremental hashes.txt" />
            <p className="text-xs text-cyber-text mt-2">
              Tries the wordlist first, then switches to incremental brute force for remaining hashes.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Common Wordlists</DocHeading>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: 'rockyou.txt', path: '/usr/share/wordlists/rockyou.txt', desc: '14M passwords from RockYou breach — the most popular wordlist.' },
            { name: 'SecLists', path: '/usr/share/wordlists/SecLists/', desc: 'Massive collection including passwords, usernames, directories, and more.' },
            { name: 'dirb', path: '/usr/share/wordlists/dirb/', desc: 'Directory bruteforce wordlists (also good for passwords).' },
            { name: 'custom_top1000.txt', path: 'create your own', desc: 'Targeted top passwords based on your target organization/region.' },
          ].map((w, i) => (
            <div key={i} className="cyber-card p-4">
              <h4 className="text-sm font-semibold text-cyber-cyan">{w.name}</h4>
              <p className="text-xs text-cyber-text mt-1">{w.desc}</p>
              <p className="text-xs text-cyber-text-dim mt-2 font-mono">{w.path}</p>
            </div>
          ))}
        </div>
        <Callout type="warning" className="mt-4">
          rockyou.txt is ~133MB uncompressed and contains 14 million passwords. Ensure you have enough disk space and RAM for large wordlists.
        </Callout>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Wordlist Mode Options</DocHeading>
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Wordlist with rules</h4>
            <CodeBlock code="john --wordlist=rockyou.txt --rules=Jumbo hashes.txt" />
            <p className="text-xs text-cyber-text mt-2">
              Applies thousands of mutations: case toggles, leet speak substitutions, appending numbers, etc.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Wordlist with specific rule set</h4>
            <CodeBlock code="john --wordlist=rockyou.txt --rules=Wordlist hashes.txt" />
            <p className="text-xs text-cyber-text mt-2">
              Wordlist rules: moderate mutations like capitalizing first letter, appending 123, 1-3 digit numbers.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Multiple wordlists</h4>
            <CodeBlock code="john --wordlist=rockyou.txt --wordlist=common_passwords.txt hashes.txt" />
            <p className="text-xs text-cyber-text mt-2">
              John can accept multiple --wordlist flags and tries them sequentially.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Wordlist with custom encoding</h4>
            <CodeBlock code="john --wordlist=rockyou.txt --encoding=utf8 hashes.txt" />
            <p className="text-xs text-cyber-text mt-2">
              Use --encoding if your wordlist contains non-ASCII characters.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Creating Custom Wordlists</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          For targeted assessments, create wordlists specific to your target:
        </p>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Combine multiple sources</h4>
            <CodeBlock code="cat company_names.txt product_names.txt important_years.txt > target_wordlist.txt" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Generate variations with hashcat-utils or Crunch</h4>
            <CodeBlock code="crunch 8 8 -f /usr/share/crunch/charset.lst mixalpha-numeric -o candidates.txt" />
          </div>
          <Callout type="tip">
            {"Preprocess rockyou.txt: remove duplicates with sort -u, filter to relevant length with awk 'length>=8 && length<=12'"}
          </Callout>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Performance Tips</DocHeading>
        <div className="mt-4 space-y-2">
          {[
            { title: 'Use --fork=N for multi-CPU', desc: 'Utilize multiple cores: --fork=4 spawns 4 processes.' },
            { title: 'Use OpenCL format variants for GPU', desc: 'Formats like md5-opencl, sha256-opencl use GPU for massive speedups.' },
            { title: 'Compress wordlists', desc: 'John can read gzipped wordlists directly: --wordlist=rockyou.txt.gz.' },
            { title: 'Disable rules for speed', desc: 'Runs faster but misses mutations; use --rules=Single for minimal transform set.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
              <span className="w-6 h-6 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan text-xs flex-shrink-0">{i + 1}</span>
              <div>
                <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                <p className="text-xs text-cyber-text mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/john-the-ripper/rules" className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg text-sm font-semibold hover:bg-cyber-cyan-dim transition-all whitespace-nowrap">
            Next: Rules <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/john-the-ripper/single-crack-mode" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-cyan hover:text-cyber-cyan transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
