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

const proxyFeatures = [
  { title: 'Intercept', desc: 'Pause and inspect/modify requests before they reach the server. Turn on/off with Ctrl+T.' },
  { title: 'Forward', desc: 'Send intercepted request to server. You can modify headers, params, body before forwarding.' },
  { title: 'Drop', desc: 'Discard intercepted request. Server never sees it. Useful for filtering noise.' },
  { title: 'Intercept History', desc: 'All requests that passed through intercept are logged for later review.' },
  { title: 'HTTP History', desc: 'Complete log of all HTTP/S traffic through Burp, even when intercept is off.' },
  { title: 'WebSocket History', desc: 'Captures WebSocket messages for real-time application testing.' },
  { title: 'Match & Replace', desc: 'Automatically modify requests/responses based on regex rules. Great for bypassing client-side checks.' },
  { title: 'Options Tab', desc: 'Configure intercept behavior, SSL pass-through, connection timeouts, and interception rules.' },
];

const interceptRules = [
  { rule: 'Intercept client requests', desc: 'Catch requests from browser before they leave your machine.' },
  { rule: 'Intercept server responses', desc: 'Catch responses coming back from server before browser receives them.' },
  { rule: 'Intercept WebSocket messages', desc: 'Catch and modify WebSocket frames in real-time applications.' },
  { rule: 'Intercept based on scope', desc: 'Only intercept requests within your defined target scope.' },
  { rule: 'Intercept based on MIME type', desc: 'Filter by content type (HTML, JSON, XML, etc.).' },
  { rule: 'Intercept based on file extension', desc: 'Catch requests for specific file types (.php, .js, .xml).' },
];

export default function BurpSuiteProxyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-exchange-line" />
          Core Tool
        </div>
        <DocHeading level={1}>Proxy</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          The <strong className="text-cyber-cyan">Proxy tool</strong> is Burp Suite's core component. It sits between your browser and the target web application, intercepting, logging, and allowing you to modify every HTTP/HTTPS request and response. Every security test in Burp begins with Proxy.
        </p>
        <p className="text-cyber-text leading-relaxed mt-2">
          By default, Burp listens on <InlineCode>127.0.0.1:8080</InlineCode>. Configure your browser to use this proxy, and all web traffic flows through Burp where you can inspect, modify, forward, or drop each request.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>How Proxy Works</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Burp acts as a "man-in-the-middle" proxy:
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { step: '1', title: 'Browser', desc: 'Your browser sends HTTP request to proxy (127.0.0.1:8080)' },
            { step: '2', title: 'Burp Proxy', desc: 'Burp receives request, displays in Intercept tab (if enabled)', },
            { step: '3', title: 'Modify?', desc: 'You modify request/response or forward as-is to target server', },
            { step: '4', title: 'Response', desc: 'Server response returns via Burp to browser (also interceptable)', },
          ].map((step) => (
            <div key={step.step} className="cyber-card p-4 text-center">
              <span className="w-8 h-8 rounded-full bg-cyber-amber/10 border border-cyber-amber/30 text-cyber-amber flex items-center justify-center mx-auto mb-2 font-bold">
                {step.step}
              </span>
              <h4 className="text-sm font-semibold text-white">{step.title}</h4>
              <p className="text-xs text-cyber-text mt-1">{step.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Intercept Tab Functions</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          The Intercept tab shows each request waiting for your action. From here you can examine and modify before forwarding:
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {proxyFeatures.map((f, i) => (
            <div key={i} className="cyber-card p-4">
              <h4 className="text-sm font-semibold text-cyber-amber">{f.title}</h4>
              <p className="text-xs text-cyber-text mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-white mb-2">Intercept Controls</h4>
          <div className="cyber-card p-4 font-mono text-xs text-cyber-green">
            <div>Forward (Ctrl+F) — Send request to server</div>
            <div>Drop (Ctrl+D) — Discard request, do not forward</div>
            <div>Intercept is on/off (Ctrl+T) — Toggle interception globally</div>
            <div>Action — Drop-down menu: send to other tools (Repeater, Intruder, etc.)</div>
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>HTTP History Tab</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          The HTTP history tab shows all HTTP/S requests that passed through Burp (whether intercepted or not). This is your primary log for reconnaissance and finding interesting endpoints.
        </p>
        <div className="mt-4 space-y-3">
          {[
            'Filter by MIME type (HTML, JSON, XML, etc.)',
            'Filter by status code (200, 301, 500, etc.)',
            'Search by keyword, parameter name, or header',
            'Right-click any request to send to Repeater, Intruder, Scanner, or Comparer',
            'Export selected requests to a Burp state file or raw HTTP file',
            'Highlight interesting requests with color markers for later review',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
              <i className="ri-arrow-right-s-line text-cyber-amber mt-0.5 flex-shrink-0" />
              <span className="text-sm text-cyber-text">{item}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Interception Rules</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Instead of intercepting every request (overwhelming), configure rules to intercept only specific traffic:
        </p>
        <div className="mt-4 grid grid-cols-1 gap-2">
          {interceptRules.map((r, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-cyber-border bg-cyber-bg-card/50">
              <span className="text-cyber-cyan font-mono text-sm mt-0.5 flex-shrink-0">Rule {i + 1}:</span>
              <div>
                <h4 className="text-sm font-semibold text-white">{r.rule}</h4>
                <p className="text-xs text-cyber-text mt-0.5">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <Callout type="info">
          <>
            Configure interception rules in{" "}
            <strong>Proxy &gt; Intercept &gt; Intercept is based on</strong>{" "}
            rules. Use URL patterns, parameter names, or MIME types to filter.
          </>
        </Callout>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Scope Configuration</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Define your target scope to focus Burp on specific hosts/paths and avoid capturing unrelated traffic:
        </p>
        <div className="mt-4 p-4 rounded-lg bg-cyber-bg border border-cyber-border font-mono text-xs text-cyber-green">
          <div className="mb-2 text-cyber-amber">{'Target > Scope'}</div>
          <div>• Add target URLs: https://target.com/*</div>
          <div>• Include/exclude specific paths</div>
          <div>• Enable "Use advanced scope control" for fine-grained rules</div>
          <div>• Scope-aware tools respect these boundaries</div>
        </div>
        <Callout type="tip">
          Always set your scope before testing. It keeps your project organized, speeds up scanning, and prevents accidental testing of systems you do not have permission to test.
        </Callout>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/burp-suite/repeater" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Repeater <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/burp-suite" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
