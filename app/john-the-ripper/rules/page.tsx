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

const ruleSets = [
  {
    name: 'None',
    id: '',
    desc: 'No transformations; tests raw wordlist entries only.',
    speed: 'Fastest',
    mutations: '0 per word',
    use: 'Baseline, very fast dictionary check.',
  },
  {
    name: 'Single',
    id: 'Single',
    desc: 'Applies simple mutations: capitalization of first letter, append/ prepend user info from hash context, reverse.',
    speed: 'Fast',
    mutations: '~10 per word',
    use: 'First expansion beyond raw wordlist.',
  },
  {
    name: 'Wordlist',
    id: 'Wordlist',
    desc: 'Moderate rule set: append numbers (1-99), common suffixes (123, !, ?), capitalize, leet substitutions (a→@, e→3).',
    speed: 'Medium',
    mutations: '~100-500 per word',
    use: 'General-purpose for most real-world passwords.',
  },
  {
    name: 'Extra',
    id: 'Extra',
    desc: 'More aggressive than Wordlist; adds case permutations, repeated chars, more leet substitutions, common pattern variations.',
    speed: 'Medium-Slow',
    mutations: '~500-2000 per word',
    use: 'When Wordlist yields few results; office/social passwords.',
  },
  {
    name: 'Jumbo',
    id: 'Jumbo',
    desc: 'Extensive rule set with thousands of permutations: case toggles, character duplication, vowel swapping, sandwich patterns, and more.',
    speed: 'Slow',
    mutations: '2000+ per word',
    use: 'Finally go for broke — catch everything before incremental.',
  },
];

const ruleExamples = [
  {
    title: 'Append common suffix',
    rule: '?l?l?l?l?d?d?d?d?d?d?s',
    explanation: 'Lowercase name + 6 digits + optional special char',
  },
  {
    title: 'Capitalize first letter',
    rule: 'Az',
    explanation: 'Capitalize the word, possibly add suffix (not shown)',
  },
  {
    title: 'Leet speak substitution',
    rule: 'a @\ne 3\ns $\ni !\no 0',
    explanation: 'Replace letters with common leet substitutions',
  },
  {
    title: 'Add year suffix',
    rule: '?y?y?y?y',
    explanation: 'Append current year range (1980-2030)',
  },
];

export default function JohnRulesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-magic-line" />
          Advanced Cracking
        </div>
        <DocHeading level={1}>Rules</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          <strong className="text-cyber-green">Rules</strong> are John's mutation engine. They transform every word in your wordlist by applying character-level operations — uppercase/lowercase changes, leet speak substitutions, appending/prepending, reversing, doubling characters, and hundreds more. One word can become thousands of candidates.
        </p>
        <p className="text-cyber-text leading-relaxed mt-2">
          With a 100k-word list, Jumbo rules generate hundreds of millions of password guesses without you having to pre-generate a massive wordlist file.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Built-in Rule Sets</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          John ships with several rule sets from mild to aggressive:
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cyber-border">
                <th className="text-left py-2 px-3 text-cyber-text font-semibold">Rule Set</th>
                <th className="text-left py-2 px-3 text-cyber-text font-semibold">Speed</th>
                <th className="text-left py-2 px-3 text-cyber-text font-semibold">Mutations</th>
                <th className="text-left py-2 px-3 text-cyber-text font-semibold">Best For</th>
              </tr>
            </thead>
            <tbody>
              {ruleSets.map((r, i) => (
                <tr key={i} className="border-b border-cyber-border/50">
                  <td className="py-2 px-3">
                    <span className="inline-block px-2 py-0.5 rounded bg-cyber-cyan/10 text-cyber-cyan font-mono text-xs">{r.name}</span>
                  </td>
                  <td className="py-2 px-3 text-cyber-cyan">{r.speed}</td>
                  <td className="py-2 px-3 text-cyber-text">{r.mutations}</td>
                  <td className="py-2 px-3 text-cyber-text text-xs">{r.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Using Rules</DocHeading>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Wordlist mode with Jumbo rules</h4>
            <CodeBlock code="john --wordlist=rockyou.txt --rules=Jumbo hashes.txt" />
            <p className="text-xs text-cyber-text mt-2">
              Applies the most aggressive rule set. Expect ~100-500x expansion depending on the wordlist size.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Wordlist-only (no rules)</h4>
            <CodeBlock code="john --wordlist=rockyou.txt hashes.txt" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Single mode with rules</h4>
            <CodeBlock code="john --single --rules=Wordlist hashes.txt" />
            <p className="text-xs text-cyber-text mt-2">
              Single mode generates usernames first and then applies rules to mutate each candidate.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Combine wordlist + incremental fallback</h4>
            <CodeBlock code="john --wordlist=rockyou.txt --rules=Extra --incremental hashes.txt" />
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>How Much Expansion?</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Rule expansion multiplies each base word into many candidate passwords. Here is an example for typical rule sets applied to the word <InlineCode>password</InlineCode>:
        </p>
        <div className="mt-4 p-4 rounded-lg bg-cyber-bg border border-cyber-border font-mono text-xs text-cyber-green">
          <div>Rule: Single → ~20 variations</div>
          <div className="text-cyber-text-dim">  Password, Password1, password, p@ssword, 123password, ...</div>
          <div className="mt-1">Rule: Wordlist → ~300 variations</div>
          <div className="text-cyber-text-dim">  Password123, Password!, Passw0rd, p@ssw0rd123, ...</div>
          <div className="mt-1">Rule: Extra → ~1500 variations</div>
          <div className="text-cyber-text-dim">  P@ssW0rd!, p@$$w0rd, pass WORD, ...</div>
          <div className="mt-1">Rule: Jumbo → ~3000+ variations</div>
          <div className="text-cyber-text-dim">  Extensive permutations including double chars, vowel swaps, sandwich patterns.</div>
        </div>
        <Callout type="tip">
          Multiply the number of source words by average rule-generated per word to estimate total guess count. rockyou.txt (14M) × 3000 Jumbo rules → ~42B guesses — plan your cracking sessions accordingly.
        </Callout>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Custom Rules</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          You can write your own rule files if built-in sets are not enough. Create a plain text file where each line describes a sequence of operations.
        </p>
        <div className="mt-4 p-4 rounded-lg bg-cyber-bg border border-cyber-border font-mono text-xs text-cyber-green">
          <div className="mb-2 text-cyber-amber">Example custom.rules:</div>
          <pre>{`# Append two digits at end (200 variants: 00-99)
?d?d

# Prepend common prefix
Company_?l?l?l

# Leet substitutions
a @
e 3
i 1
o 0
s $

# Capitalize first and append year
Az?y?y?y?y

# Duplicate last character
A`}</pre>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-white mb-2">Use a custom rules file</h4>
          <CodeBlock code="john --wordlist=rockyou.txt --rules=custom.rules hashes.txt" />
        </div>
        <Callout type="warning">
          Rule syntax is powerful but precise. The John documentation (<InlineCode>doc/RULES</InlineCode> in the source tree) explains every operation. Write a small test wordlist to validate your rules.
        </Callout>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Performance Impact</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Rules increase coverage at the cost of time. Estimate your throughput:
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: 'Wordlist only', speed: '100M p/s', impact: 'Baseline speed', icon: 'ri-speed-line' },
            { label: 'Wordlist + Single', speed: '30-50M p/s', impact: '3-5x slower', icon: 'ri-subtract-line' },
            { label: 'Wordlist + Wordlist', speed: '5-15M p/s', impact: '10-20x slower', icon: 'ri-speed-mini-line' },
            { label: 'Wordlist + Jumbo', speed: '0.5-2M p/s', impact: '100-200x slower', icon: 'ri-timer-flash-line' },
          ].map((item, i) => (
            <div key={i} className="cyber-card p-4">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan flex-shrink-0"><i className={item.icon} /></span>
                <div>
                  <h4 className="text-sm font-semibold text-cyber-cyan">{item.label}</h4>
                  <p className="text-xs text-cyber-text mt-1">{item.speed} — {item.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Callout type="info">
          Use <InlineCode>--status</InlineCode> to see current guesses/sec. Adjust rules to fit your time budget.
        </Callout>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/john-the-ripper/hash-extraction" className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg text-sm font-semibold hover:bg-cyber-cyan-dim transition-all whitespace-nowrap">
            Next: Hash Extraction <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/john-the-ripper/hash-formats" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-cyan hover:text-cyber-cyan transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
