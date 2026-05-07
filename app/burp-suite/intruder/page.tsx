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

const attackTypes = [
  {
    name: 'Sniper',
    icon: 'ri-sword-line',
    desc: 'Iterates through a single payload set, attacking one position at a time. Most efficient for testing a single parameter.',
    example: 'Fuzzing one username field with 1000 passwords',
    when: 'Parameter fuzzing, directory traversal, file inclusion, LFI/RFI, single-field injection',
    payloads: 'One payload set → Position 1: [id=1] only',
    speed: 'Fastest for single-parameter testing',
  },
  {
    name: 'Battering Ram',
    icon: 'ri-hammer-line',
    desc: 'Uses the same payload across all defined positions simultaneously. Good for testing when username=password pattern is used.',
    example: 'Testing if username == password across both fields',
    when: 'Credential stuffing where same password used for multiple fields, testing symmetric parameters',
    payloads: 'One payload set → Positions 1&2: both get "admin"',
    speed: ' fast, but limited scope',
  },
  {
    name: 'Pitchfork',
    icon: 'ri-arrow-up-down-line',
    desc: 'Multiple independent payload sets. Each position gets its own payload set. All payloads iterate in parallel (zipper-style).',
    example: 'Username list + Password list pairs: (alice,Pass123), (bob,Secret456)',
    when: 'Username+password combos, replacing multiple related parameters at once, multivalued attacks',
    payloads: 'Set1 (usernames) + Set2 (passwords) → (user1, pass1), (user2, pass2)...',
    speed: 'Medium — each payload set must have same length',
  },
  {
    name: 'Cluster Bomb',
    icon: 'ri-bomb-line',
    desc: 'Multiple payload sets. Tests every possible combination across all positions (cartesian product). Can generate massive request counts.',
    example: '10 usernames × 100 passwords = 1,000 total requests',
    when: 'Brute-force login forms, exhaustive enumeration, when you need to try all combos',
    payloads: 'Set1 (10) × Set2 (100) = 1,000 combos',
    speed: 'Slowest — combinatorial explosion',
  },
];

export default function BurpSuiteIntruderPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-sword-line" />
          Automated Fuzzing & Brute Force
        </div>
        <DocHeading level={1}>Intruder</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          <strong className="text-cyber-cyan">Intruder</strong> is Burp Suite's automated attack engine. It takes a base HTTP request, marks specific positions as attack points (parameters, headers, paths), and iterates through wordlists or generated payloads at those positions. Intruder supports four attack types, each suited to a different scenario.
        </p>
        <p className="text-cyber-text leading-relaxed mt-2">
          Community edition throttles Intruder to ~1 request/second. Use <strong>Turbo Intruder</strong> extension for high-speed attacks (thousands/sec).
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Attack Types</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Choosing the right attack type controls how payloads map to attack positions:
        </p>
        <div className="mt-4 space-y-3">
          {attackTypes.map((attack) => (
            <div key={attack.name} className="cyber-card p-5">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg bg-cyber-bg border border-cyber-border flex items-center justify-center flex-shrink-0 ${attack.icon ? 'text-cyber-red' : ''}`}>
                  <i className={`${attack.icon} text-lg`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-cyber-red">{attack.name}</h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-text-dim font-mono">{attack.payloads}</span>
                  </div>
                  <p className="text-sm text-cyber-text mt-1">{attack.desc}</p>
                  <div className="mt-2 p-2 rounded bg-cyber-bg/50 border-l-2 border-cyber-amber">
                    <p className="text-xs text-cyber-amber"><i className="ri-lightbulb-line mr-1" />Use case: {attack.example}</p>
                  </div>
                  <p className="text-xs text-cyber-text-dim mt-2"><strong>Best for:</strong> {attack.when}</p>
                  <p className="text-xs text-cyber-text"><strong>Speed:</strong> {attack.speed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Setting Up an Intruder Attack</DocHeading>
        <div className="mt-4 space-y-4">
          {[
            { step: '1. Set target scope', desc: 'Go to Target tab and define the scope (hosts, paths) to keep attacks focused.' },
            { step: '2. Send request to Intruder', desc: 'From Proxy history or Repeater, right-click request → Send to Intruder.' },
            { step: '3. Set attack type', desc: 'Intruder window opens. Choose attack type: Sniper, Battering Ram, Pitchfork, or Cluster Bomb.' },
            { step: '4. Mark attack positions', desc: 'In request editor, highlight parameter values or headers you want to fuzz. Click "Add §".' },
            { step: '5. Configure payloads', desc: 'Go to Payloads tab. Choose payload type (simple list, numbers, dates, brute force, file). Load wordlist or generate.' },
            { step: '6. Set payload processing', desc: 'Optionally apply rules: URL-encode, HTML-encode, regex replace, trim, etc.' },
            { step: '7. Start attack', desc: 'Click "Start attack". Results appear in a sortable table with length, status, error count.' },
            { step: '8. Analyze results', desc: 'Sort by response length or status code differences to find anomalies indicating vulnerability.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
              <div>
                <h4 className="text-sm font-semibold text-white">{item.step}</h4>
                <p className="text-xs text-cyber-text mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <Callout type="tip" className="mt-4">
          After attack completes, right-click result row → "Show response in browser" to verify vulnerability in a real browser context.
        </Callout>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Payload Types</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Intruder offers many payload types beyond simple wordlists:
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: 'Simple list', desc: 'Load from file or paste list. Most common — usernames, passwords, paths.' },
            { name: 'Numbers', desc: 'Generate numeric sequences: start-end, range, increment.' },
            { name: 'Dates', desc: 'Generate dates within a range with various formats.' },
            { name: 'Brute force', desc: 'Character-set-based brute force for short strings.' },
            { name: 'Character substitution', desc: 'Apply substitutions like a→@, e→3, s→$.' },
            { name: 'Case mutation', desc: 'Toggle case: lower, upper, capitalize, random.' },
            { name: 'Recursive grep', desc: 'Parse responses and extract values for next attack stage.' },
            { name: 'Runtime file', desc: 'Read payloads from file that updates during attack (for dynamic lists).' },
            { name: 'Character blocks', desc: 'Insert specific character sequences at marked positions.' },
          ].map((p) => (
            <div key={p.name} className="cyber-card p-4">
              <h4 className="text-sm font-semibold text-cyber-cyan">{p.name}</h4>
              <p className="text-xs text-cyber-text mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Payload Processing Rules</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Transform payloads on-the-fly before they are sent. Useful for encoding, hashing, or adding prefixes/suffixes.
        </p>
        <div className="mt-4 p-4 rounded-lg bg-cyber-bg border border-cyber-border font-mono text-xs text-cyber-green">
          <div className="text-cyber-amber mb-2">Example processing chain:</div>
          <div>1. Add suffix ".php" → "admin" becomes "admin.php"</div>
          <div>2. URL-encode → "admin.php" becomes "admin.php"</div>
          <div>3. Apply base64 encode → "YWRtaW4ucGhw"</div>
          <div>Result: final payload = "YWRtaW4ucGhw"</div>
        </div>
        <Callout type="warning">
          Payload processing adds overhead. For very large wordlists, consider preprocessing offline instead of using many rules.
        </Callout>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Grep — Match Results</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          The Grep tab lets you flag interesting responses based on:
        </p>
        <div className="mt-4 space-y-2">
          {[
            'Responses that match a regex pattern (e.g., "SQL syntax error")',
            'Responses that do NOT match a regex (find errors or anomalies)',
            'Responses with specific HTTP status codes',
            'Responses with specific content length (too short/long = interesting)',
            'Responses that set cookies (session changes indicate success)',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-cyber-text">
              <i className="ri-check-line text-cyber-green" /> {item}
            </div>
          ))}
        </div>
        <Callout type="tip">
          For SQL injection, grep for "syntax error", "ODBC", "mysql_fetch". For XSS, grep for reflected payloads in response body.
        </Callout>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/burp-suite/scanner" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Scanner <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/burp-suite/proxy" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
