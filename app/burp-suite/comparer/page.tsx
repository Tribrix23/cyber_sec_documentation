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

const comparisonScenarios = [
  {
    title: 'SQL Injection Error Detection',
    desc: 'Compare a normal response to one after injecting a single quote to spot database error differences.',
    example: 'Normal vs. WHEN 1=1 vs. WHEN 1=2 — look for length or content changes',
  },
  {
    title: 'Authentication Bypass',
    desc: 'Compare authenticated vs. unauthenticated responses to identify protected resources.',
    example: 'Request as guest vs. logged-in admin — highlight differences in content',
  },
  {
    title: 'Blind Boolean-based Injection',
    desc: 'Compare two payloads (TRUE condition vs. FALSE condition) to find subtle timing or content length differences.',
    example: 'id=1 AND 1=1 vs. id=1 AND 1=2 — 1 char difference might indicate injection',
  },
  {
    title: 'IDOR Detection',
    desc: 'Compare response of user A accessing their own resource vs. user A accessing user B resource.',
    example: 'User1 /account/1234 vs User1 /account/5678 — differences indicate access control',
  },
];

export default function BurpSuiteComparerPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-arrow-left-right-line" />
          Visual Difference Analysis
        </div>
        <DocHeading level={1}>Comparer</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Comparer is Burp Suite's side-by-side visual diff tool. You paste or send two pieces of data (requests, responses, or any text) and it highlights every difference — word-level and byte-level. This is essential for detecting subtle variances that indicate a vulnerability.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>How to Use Comparer</DocHeading>
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Method 1: Send from other tools</h4>
            <p className="text-sm text-cyber-text mb-2">
              From Proxy history, Repeater, or Scanner results: right-click two items (hold Ctrl to select both) → "Compare".
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Method 2: Copy & paste</h4>
            <p className="text-sm text-cyber-text mb-2">
              Open Comparer tab (Window → Comparer) → paste Left text, then paste Right text → Compare.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Comparison types</h4>
            <p className="text-sm text-cyber-text mb-2">
              Word diff (semantic) or byte diff (binary-level) — switch between the two depending on the data type.
            </p>
          </div>
        </div>
        <div className="mt-4 p-4 rounded-lg bg-cyber-bg border border-cyber-border font-mono text-xs text-cyber-green">
          <div className="text-cyber-amber mb-2">Keyboard Shortcut</div>
          <div>In most Burp views: select text → Ctrl+Shift+C to copy to Comparer (left or right pane).</div>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Comparison Modes</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Comparer offers two diff algorithms:
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Words',
              desc: 'Tokenizes text into words (separated by whitespace/punctuation). Best for comparing HTML, JSON, XML, or human-readable content.',
              icon: 'ri-text',
              use: 'Compare two HTML responses to see which elements differ.',
            },
            {
              title: 'Bytes',
              desc: 'Binary-level byte comparison. Shows exact byte-by-byte differences. Best for binary data, hashes, or Base64 blobs.',
              icon: 'ri-code-box-line',
              use: 'Compare two hashes or encrypted tokens to spot one-byte variance.',
            },
          ].map((mode) => (
            <div key={mode.title} className="cyber-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <i className={`${mode.icon} text-cyber-amber`} />
                <h4 className="text-sm font-semibold text-cyber-amber">{mode.title}</h4>
              </div>
              <p className="text-xs text-cyber-text mb-2">{mode.desc}</p>
              <p className="text-xs text-cyber-text-dim">
                <i className="ri-lightbulb-line mr-1" /> {mode.use}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Common Vulnerability Detection Scenarios</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Use Comparer to confirm vulnerability by comparing responses:
        </p>
        <div className="mt-4 space-y-3">
          {comparisonScenarios.map((scenario, i) => (
            <div key={i} className="p-4 rounded-lg border border-cyber-border bg-cyber-bg-card/50">
              <h4 className="text-sm font-semibold text-white">{scenario.title}</h4>
              <p className="text-xs text-cyber-text mt-1">{scenario.desc}</p>
              <div className="mt-2 p-2 rounded bg-cyber-bg border-l-2 border-cyber-amber">
                <p className="text-xs text-cyber-amber"><i className="ri-lightbulb-line mr-1" />Example: {scenario.example}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Comparing Requests vs Responses</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Comparer helps detect vulnerabilities by showing differences:
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { action: 'Compare two responses', desc: 'Find injection success by comparing normal vs. payloaded response.', icon: 'ri-file-list-line' },
            { action: 'Compare request/response', desc: 'Check if request modifications are reflected in the response as expected.', icon: 'ri-exchange-line' },
            { action: 'Compare multiple responses', desc: 'Send same request with different inputs — differences may leak data.', icon: 'ri-stack-line' },
            { action: 'Compare raw vs hex', desc: 'Detect hidden null bytes or encoding issues invisible in raw view.', icon: 'ri-code-s-slash-line' },
          ].map((item, i) => (
            <div key={i} className="cyber-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className={`${item.icon} text-cyber-cyan`} />
                <h4 className="text-sm font-semibold text-white">{item.action}</h4>
              </div>
              <p className="text-xs text-cyber-text">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Reading the Diff</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Comparer highlights changes with color coding:
        </p>
        <div className="mt-4 space-y-2">
          {[
            { color: 'bg-cyber-red/20 text-cyber-red', label: 'Red highlight', desc: 'Content present on left but missing on right (deletion)' },
            { color: 'bg-cyber-green/20 text-cyber-green', label: 'Green highlight', desc: 'Content present on right but not on left (addition)' },
            { color: 'bg-cyber-amber/20 text-cyber-amber', label: 'Yellow/amber', desc: 'Content modified (both sides different)' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-cyber-border bg-cyber-bg-card/50">
              <span className={`w-3 h-3 rounded-full mt-0.5 ${item.color.split(' ')[0]}`} />
              <div>
                <h4 className={`text-sm font-semibold ${item.color.split(' ')[1]}`}>{item.label}</h4>
                <p className="text-xs text-cyber-text mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <Callout type="tip">
          For blind injection tests, compare response lengths. If a true condition yields a different length than false condition, that indicates injection success even without visible output.
        </Callout>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/burp-suite/extensions" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Extensions <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/burp-suite/decoder" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
