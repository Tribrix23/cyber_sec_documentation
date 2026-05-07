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

export default function JohnIncrementalModePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-speed-line" />
          Cracking Mode
        </div>
        <DocHeading level={1}>Incremental / Brute Force Mode</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          <strong className="text-cyber-green">Incremental mode</strong> generates all possible character combinations up to a specified length. It is the most thorough attack because it exhaustively tries every permutation, but it is also the slowest by many orders of magnitude.
        </p>
        <p className="text-cyber-text leading-relaxed mt-2">
          Use incremental mode only as a last resort after wordlist, single, and rule-based attacks have failed. It is practical for passwords of 6-8 characters using a restricted charset (e.g., lowercase + digits) but infeasible for longer or more complex passwords.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Basic Usage</DocHeading>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Default incremental (all printable ASCII)</h4>
            <CodeBlock code="john --incremental hashes.txt" />
            <p className="text-xs text-cyber-text mt-2">
              Exhaustively tries all 95 printable ASCII characters. Extremely slow beyond 7 characters.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Restrict to lowercase letters and digits</h4>
            <CodeBlock code="john --incremental=LowerNum hashes.txt" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Limit password length</h4>
            <CodeBlock code="john --incremental --max-length=6 hashes.txt" />
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Built-in Incremental Charsets</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          John ships with several optimized incremental character sets. The charset determines which characters are used at each position.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: 'ASCII', desc: 'All 95 printable ASCII characters (slowest).' },
            { name: 'Lower', desc: 'Lowercase letters only (a-z).' },
            { name: 'Upper', desc: 'Uppercase letters only (A-Z).' },
            { name: 'Alpha', desc: 'All letters (a-z, A-Z).' },
            { name: 'LowerNum', desc: 'Lowercase + 0-9.' },
            { name: 'UpperNum', desc: 'Uppercase + 0-9.' },
            { name: 'Alnum', desc: 'Letters + digits.' },
            { name: 'LanMan', desc: 'Uppercase only; optimized for Windows LM hashes.' },
            { name: 'Digits', desc: 'Numbers only (0-9).' },
            { name: 'Printable', desc: 'Printable ASCII (default).' },
          ].map((c, i) => (
            <div key={i} className="cyber-card p-4">
              <h4 className="text-sm font-semibold text-cyber-cyan">{c.name}</h4>
              <p className="text-xs text-cyber-text mt-1">{c.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Search Space Size Examples</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Understanding the combinatorial explosion helps you judge attack feasibility:
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cyber-border">
                <th className="text-left py-2 px-3 text-cyber-text font-semibold">Charset</th>
                <th className="text-left py-2 px-3 text-cyber-text font-semibold">Size</th>
                <th className="text-left py-2 px-3 text-cyber-text font-semibold">6-char combos</th>
                <th className="text-left py-2 px-3 text-cyber-text font-semibold">8-char combos</th>
              </tr>
            </thead>
            <tbody>
              {[
                { charset: 'lowercase (a-z)', size: 26, len6: '308 million', len8: '208 billion' },
                { charset: 'lower+num', size: 36, len6: '1.8 billion', len8: '2.8 trillion' },
                { charset: 'alpha (a-zA-Z)', size: 52, len6: '19.7 billion', len8: '53 trillion' },
                { charset: 'alnum', size: 62, len6: '56.8 billion', len8: '218 trillion' },
                { charset: 'printable ASCII', size: 95, len6: '735 billion', len8: '6.6 quadrillion' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-cyber-border/50">
                  <td className="py-2 px-3 text-cyber-cyan font-mono">{row.charset}</td>
                  <td className="py-2 px-3 text-cyber-text">{row.size}</td>
                  <td className="py-2 px-3 text-cyber-text">{row.len6}</td>
                  <td className="py-2 px-3 text-cyber-text">{row.len8}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout type="warning" className="mt-4">
          At 100 million guesses/sec, cracking an 8-character lowercase password takes ~38 minutes. Eight alphanumeric? Over 2 years. Plan cracking sessions accordingly.
        </Callout>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>When to Use Incremental Mode</DocHeading>
        <div className="mt-4 space-y-3">
          {[
            { title: 'As Last Resort', desc: 'After all wordlist, rule, and hybrid attacks fail, try incremental for remaining short passwords.' },
            { title: 'Known Charset', desc: 'If you know the target uses only digits or lowercase letters, incremental becomes tractable for 6-7 characters.' },
            { title: 'CTF Challenges', desc: 'Many CTF flags are intentionally weak (5-6 chars) to make incremental feasible for demo purposes.' },
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

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Optimizing Incremental Speed</DocHeading>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Use --fork for CPU parallelism</h4>
            <CodeBlock code="john --incremental=LowerNum --fork=8 hashes.txt" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Use GPU-accelerated opencl version</h4>
            <CodeBlock code="john --incremental:LowerNum --format=md5-opencl hashes.txt" />
            <p className="text-xs text-cyber-text mt-2">
              Not all formats have OpenCL variants. Check <InlineCode>john --list=formats</InlineCode> for those ending in -opencl.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Restrict max length aggressively</h4>
            <CodeBlock code="john --incremental --max-length=6 hashes.txt" />
          </div>
        </div>
        <Callout type="tip">
          For Windows LM hashes, use <InlineCode>--incremental=LanMan</InlineCode> — it's optimized for the 7-character uppercase limitation of the LM algorithm.
        </Callout>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/john-the-ripper/external-mode" className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg text-sm font-semibold hover:bg-cyber-cyan-dim transition-all whitespace-nowrap">
            Next: External Mode <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/john-the-ripper/single-crack-mode" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-cyan hover:text-cyber-cyan transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
