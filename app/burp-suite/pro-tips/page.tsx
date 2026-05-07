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
    title: 'Always Set Target Scope First',
    detail: 'Define scope before testing. Prevents accidental testing of unauthorized hosts, keeps your project organized, and speeds up scans. Scope also enables "Scope-aware" tools to only attack in-scope targets.',
    priority: 1,
  },
  {
    title: 'Use Passive Scan as Baseline',
    detail: 'Passive scan runs automatically on all proxied traffic. Let it gather information before you start manual testing — it flags low-hanging fruit like missing headers, informational disclosures, and weak SSL settings.',
    priority: 2,
  },
  {
    title: 'Intruder Throttling (Community vs Pro)',
    detail: 'Community edition throttles Intruder to ~1 request/second. For high-speed attacks, use Turbo Intruder extension (bypasses throttle) or upgrade to Professional edition.',
    priority: 3,
  },
  {
    title: 'Follow Redirects Intelligently',
    detail: 'In Intruder and Repeater, enable "Follow redirects" only when needed. Following every redirect adds noise and slows attacks. Disable it when testing a single endpoint.',
    priority: 4,
  },
  {
    title: 'Save Sessions Frequently',
    detail: 'Cracking or brute-forcing sessions can run for hours. Save your project (File → Save) regularly. You can also save Intruder results mid-attack and resume later.',
    priority: 5,
  },
  {
    title: 'Collaborator for OAST',
    detail: 'Out-of-band (OAST) vulnerabilities like blind SSRF, XXE, and command injection call back to your server. Configure Collaborator (Pro) or use Burp Collaborator public server to catch callbacks.',
    priority: 6,
  },
  {
    title: 'Filter HTTP History',
    detail: 'Use HTTP history filter bar to narrow by MIME type, status code, or search keywords. This helps you find API endpoints (JSON), admin pages, or interesting parameters quickly.',
    priority: 7,
  },
  {
    title: 'Send to Correct Tool',
    detail: 'Right-click request context menu: Send to Repeater (manual test), Send to Intruder (fuzzing), Send to Scanner (automated), Send to Comparer (diff). Each has its purpose.',
    priority: 8,
  },
  {
    title: 'Match & Replace Rules',
    detail: 'Proxy → Options → Match and Replace. Automatically modify requests/responses on-the-fly — remove security tokens, normalize headers, bypass client-side checks.',
    priority: 9,
  },
  {
    title: 'Disable Burp Intercept During Spidering',
    detail: 'When spidering, turn intercept OFF. Otherwise every single crawled request gets stuck in Intercept tab and you must manually forward them all.',
    priority: 10,
  },
  {
    title: 'Use Project-Specific Configuration',
    detail: 'Save project options (proxy, scanner, intruder) as templates for frequent targets. Load them quickly instead of reconfiguring each time.',
    priority: 11,
  },
  {
    title: 'Extender Configuration',
    detail: 'Some extensions (Turbo Intruder, Logger++) require their own configuration. Check the extension tab after installing to ensure they are set up correctly.',
    priority: 12,
  },
  {
    title: 'Session Handling Rules',
    detail: 'Pro users can define session handling rules to automatically refresh expired sessions, retry after logout, or use different credentials per scope.',
    priority: 13,
  },
  {
    title: 'Compare Before and After',
    detail: 'Use Comparer to diff a baseline request/response against a modified one. Small length or timing differences often reveal injection points that are not obvious.',
    priority: 14,
  },
  {
    title: 'URL-encode Issues',
    detail: 'Some apps double-encode parameters. If a single URL-encode doesn\'t work, try encoding again before sending. Use Decoder to verify.',
    priority: 15,
  },
  {
    title: 'Payload Encoding in Intruder',
    detail: 'Intruder payload processing rules let you URL-encode, HTML-encode, or apply custom regex before sending. Use them to handle encoded input fields properly.',
    priority: 16,
  },
  {
    title: 'Grep — Match for Anomalies',
    detail: 'In Intruder results, use Grep — Match to flag responses containing errors like "SQL syntax", "exception", "undefined index", which likely indicate vulnerability.',
    priority: 17,
  },
  {
    title: 'Response Timing Analysis',
    detail: 'Time-based blind vulnerabilities (SQLi, command injection) cause delays. Sort Intruder results by "Response received" time to spot outliers.',
    priority: 18,
  },
  {
    title: 'Custom Scope Exclusions',
    detail: 'Besides including target hosts, use exclusion rules to exclude logout URLs, static assets, and monitoring endpoints from scans to reduce noise.',
    priority: 19,
  },
  {
    title: 'Keyboard Shortcuts Productivity',
    detail: 'Learn shortcuts: Ctrl+R (Repeater), Ctrl+I (Intruder), Ctrl+T (intercept toggle), Ctrl+F (find), Ctrl+Shift+F (find in responses). Saves hours.',
    priority: 20,
  },
];

export default function BurpSuiteProTipsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-lightbulb-line" />
          Workflow Efficiency
        </div>
        <DocHeading level={1}>Pro Tips</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Battle-tested tips from professional penetration testers. Master these to dramatically improve your efficiency, reduce false positives, and uncover more vulnerabilities.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-white mb-4">Tips</h2>
        <div className="space-y-2">
          {tips.map((tip, i) => (
            <details key={i} className="group cyber-card overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyber-bg border border-cyber-border flex items-center justify-center text-cyber-amber text-xs font-bold">
                    {tip.priority}
                  </span>
                  <span className="text-sm font-semibold text-white group-hover:text-cyber-amber transition-colors">{tip.title}</span>
                </div>
                <i className="ri-arrow-down-s-line text-cyber-text group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4">
                <p className="text-sm text-cyber-text leading-relaxed pl-9">{tip.detail}</p>
              </div>
            </details>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Keyboard Shortcuts</DocHeading>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { key: 'Ctrl+R', desc: 'Send to Repeater' },
            { key: 'Ctrl+I', desc: 'Send to Intruder' },
            { key: 'Ctrl+S', desc: 'Send to Scanner' },
            { key: 'Ctrl+T', desc: 'Toggle intercept' },
            { key: 'Ctrl+F', desc: 'Find in request/response' },
            { key: 'Ctrl+D', desc: 'Drop intercepted request' },
            { key: 'Ctrl+Enter', desc: 'Send request in Repeater' },
            { key: 'Ctrl+Shift+R', desc: 'Duplicate Repeater tab' },
            { key: 'Ctrl+E', desc: 'Encode selected text' },
            { key: 'Ctrl+Shift+C', desc: 'Copy to Comparer' },
            { key: 'Alt+Home', desc: 'Go to Site map' },
            { key: 'Alt+1..5', desc: 'Switch to tool tab (1=Proxy, 2=Intruder, ...)' },
          ].map((s) => (
            <div key={s.key} className="flex items-center gap-3 p-2 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
              <kbd className="px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-cyber-amber font-mono text-xs whitespace-nowrap">{s.key}</kbd>
              <span className="text-xs text-cyber-text">{s.desc}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Common Pitfalls</DocHeading>
        <div className="mt-4 space-y-3">
          {[
            { title: 'Scanning without scope', desc: 'Can accidentally hit hosts you do not have permission to test. Always define scope before scanning.' },
            { title: 'Ignoring passive scan findings', desc: 'Passive scan often catches missing security headers and info leaks automatically — review them.' },
            { title: 'Relying on automated scanner only', desc: 'Scanners miss business logic flaws, complex chained vulnerabilities. Manual testing is essential.' },
            { title: 'Not installing CA cert properly', desc: 'HTTPS interception fails if cert not trusted. Double-check browser certificate store import.' },
            { title: 'Using default wordlists for Intruder', desc: 'Default payloads are weak. Use SecLists, custom lists tailored to the target technology stack.' },
            { title: 'Failing to validate findings', desc: 'Report only confirmed vulnerabilities. False positives damage credibility.' },
            { title: 'Overlooking cookies and headers', desc: 'Many vulnerabilities live in Set-Cookie headers, JWT tokens, or custom headers like X-Forwarded-For.' },
            { title: 'Not saving project state', desc: 'Close Burp without saving loses hours of work. Save frequently.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
              <i className="ri-close-circle text-cyber-red mt-0.5 flex-shrink-0" />
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
          <a href="/burp-suite/quiz" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Quiz <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/burp-suite/examples" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
