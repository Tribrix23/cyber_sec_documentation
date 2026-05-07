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

const tips = [
  {
    title: 'Start with Single Mode',
    detail: 'Always start every cracking session with <InlineCode>--single</InlineCode>. It uses user metadata (name, GECOS) to generate guesses and is fast enough to try on every hash. Many weak passwords use personal information directly.',
    priority: 1,
  },
  {
    title: 'Use Sessions to Save Progress',
    detail: 'Cracking large hash sets can take days. Always save your session with <InlineCode>--session=myjob</InlineCode>. If interrupted, resume with <InlineCode>--restore=myjob</InlineCode> instead of starting over.',
    priority: 2,
  },
  {
    title: 'Combine Wordlist + Incremental Fallback',
    detail: 'Combine <InlineCode>--wordlist=rockyou.txt --incremental</InlineCode> to run dictionary first, then automatically try brute force on remaining hashes. This handles both weak dictionary passwords AND unknown short PINs.',
    priority: 3,
  },
  {
    title: 'Know Your Hash Speed',
    detail: 'MD5/NTLM: billions/sec with GPU. bcrypt/scrypt/argon2: hundreds or less. Plan time estimates with <InlineCode>john --test</InlineCode> to benchmark. Slow hashes require longer wordlists + better rules.',
    priority: 4,
  },
  {
    title: 'Filter Wordlists for Target',
    detail: 'Instead of raw rockyou.txt, filter to relevant words: company name, location, products, years. Pre-processing to custom lists gives better hit rate and faster cracking cycle.',
    priority: 5,
  },
  {
    title: 'Use Fork for CPU Parallelism',
    detail: '<InlineCode>--fork=N</InlineCode> splits work across N CPU cores. For wordlist mode, fork=4 on a 4-core machine nearly quadruples speed. Benchmark to find sweet spot.',
    priority: 6,
  },
  {
    title: 'Compressed Wordlists',
    detail: 'John reads <InlineCode>.gz</InlineCode> directly: <InlineCode>--wordlist=rockyou.txt.gz</InlineCode>. This saves disk space without slowing down I/O much.',
    priority: 7,
  },
  {
    title: 'Mask Attacks for Known Patterns',
    detail: 'For external mode or Hashcat-style masks: <InlineCode>?u?u?u?d?d?d</InlineCode> for "AAA123" patterns. Not native to John — use external mode or hybrid attacks with rules.',
    priority: 8,
  },
  {
    title: 'External Mode for Custom Generators',
    detail: 'When you know the password structure (e.g., "CompanyYYMMDD!"), write an external mode or use <InlineCode>--stdout</InlineCode> piping to generate candidates efficiently.',
    priority: 9,
  },
  {
    title: 'Format-Specific Optimization',
    detail: 'For slow hashes (bcrypt, argon2), disable rules — each guess already costs 100ms+. With wordlists, focus on quality over quantity. For fast hashes, use huge wordlists + Jumbo rules.',
    priority: 10,
  },
  {
    title: 'Hybrid Wordlist+Brute Force with Rules',
    detail: 'Instead of pure incremental, use <InlineCode>--rules=Wordlist</InlineCode> to append numbers or <InlineCode>--rules=Jumbo</InlineCode> for permutations. This gives incremental-like coverage with dictionary base.',
    priority: 11,
  },
  {
    title: 'Remove Duplicates & Sort Hash Files',
    detail: 'Sort and deduplicate your hash file: <InlineCode>sort hashes.txt | uniq > clean.txt</InlineCode>. Prevents redundant work and avoids counting cracked passwords incorrectly.',
    priority: 12,
  },
  {
    title: 'Benchmark Before Investing Time',
    detail: 'Run <InlineCode>john --test</InlineCode> to see guesses/sec for every format on your hardware. This informs whether GPU or CPU paths are better, and whether brute force is feasible.',
    priority: 13,
  },
  {
    title: 'Maximize RAM for Slow Hashes',
    detail: 'Memory-hard hashes (scrypt, argon2) run faster with more RAM. Stop other memory-hungry processes to give John full access to system memory during cracking.',
    priority: 14,
  },
  {
    title: 'Use Multiple Wordlists Sequentially',
    detail: 'Feed several wordlists one after another (multiple <InlineCode>--wordlist</InlineCode> flags). John exhausts the first before moving to the second. Order by likelihood.',
    priority: 15,
  },
  {
    title: 'Exploit Password Reuse',
    detail: 'If you crack one hash format, try the same password on other accounts/hashes. Add <InlineCode>--users</InlineCode> to target specific accounts, or use <InlineCode>--show</InlineCode> to export results.',
    priority: 16,
  },
  {
    title: 'Check for Already-Cracked Hashes',
    detail: 'Use <InlineCode>john --show hashes.txt</InlineCode> to list cracked passwords. This also removes them from further attempts. Keep a master cracked.txt list across engagements.',
    priority: 17,
  },
  {
    title: 'Leverage GPU with OpenCL',
    detail: 'Build John with <InlineCode>--enable-opencl</InlineCode> for GPU acceleration. Use formats with <InlineCode>-opencl</InlineCode> suffix (md5-opencl, sha256-opencl). GPU can be 100-1000x faster than CPU.',
    priority: 18,
  },
  {
    title: 'Limit Brute-Force for Specific Patterns',
    detail: 'Use <InlineCode>--max-length=N</InlineCode> with incremental mode to restrict search space to short passwords you can realistically exhaust.',
    priority: 19,
  },
  {
    title: 'Watch Progress with --status',
    detail: 'For named sessions, run <InlineCode>john --status=myjob</InlineCode> in another terminal to see current rate, elapsed time, and current candidate.',
    priority: 20,
  },
];

export default function JohnProTipsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-lightbulb-line" />
          Cracking Mastery
        </div>
        <DocHeading level={1}>Pro Tips</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          These are battle-tested tips from real password cracking engagements and CTFs. Mastering them turns a casual user into an efficient cracker.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-white mb-4">Tips</h2>
        <div className="space-y-2">
          {tips.map((tip, i) => (
            <details key={i} className="group cyber-card overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyber-bg border border-cyber-border flex items-center justify-center text-cyber-cyan text-xs font-bold">
                    {tip.priority}
                  </span>
                  <span className="text-sm font-semibold text-white group-hover:text-cyber-cyan transition-colors">{tip.title}</span>
                </div>
                <i className="ri-arrow-down-s-line text-cyber-text group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4">
                <p className="text-sm text-cyber-text leading-relaxed pl-9">
                  {tip.detail.split('<InlineCode>').map((part, j, arr) => {
                    if (j === 0) return part;
                    const [code, ...rest] = part.split('</InlineCode>');
                    return (
                      <>
                        <InlineCode>{code}</InlineCode>
                        {rest.join('</InlineCode>')}
                      </>
                    );
                  })}
                </p>
              </div>
            </details>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Benchmark Your System</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Before committing hours to a cracking session, benchmark the format to gauge feasibility:
        </p>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Run full benchmark</h4>
            <CodeBlock code="john --test" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Test single format</h4>
            <CodeBlock code="john --format=sha512crypt --test" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Test with OpenCL GPU</h4>
            <CodeBlock code="john --format=md5-opencl --test" />
          </div>
        </div>
        <Callout type="info">
          Typical speeds on modern 8-core CPU + good GPU (RTX 3090): NTLM 20B p/s, MD5 40B p/s, bcrypt 200k p/s, argon2 &lt;1000 p/s.
        </Callout>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Advanced Usage Patterns</DocHeading>
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Hybrid mode with stdin piping</h4>
            <CodeBlock code="crunch 6 6 abc123 | john --stdin --format=raw-md5 hashes.txt" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Extract uncracked hashes only</h4>
            <CodeBlock code="john --show --left hashes.txt > remaining.txt" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Monitor session status</h4>
            <CodeBlock code="john --status=myjob" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Generate candidates to stdout</h4>
            <CodeBlock code="john --stdout --wordlist=rockyou.txt --rules=Jumbo | head -100" />
            <p className="text-xs text-cyber-text mt-2">
              Useful to preview your rule expansion without cracking.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/john-the-ripper/quiz" className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg text-sm font-semibold hover:bg-cyber-cyan-dim transition-all whitespace-nowrap">
            Next: Quiz <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/john-the-ripper/examples" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-cyan hover:text-cyber-cyan transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
