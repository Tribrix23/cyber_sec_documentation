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

export default function BurpSuiteRepeaterPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-repeat-line" />
          Manual Testing Workbench
        </div>
        <DocHeading level={1}>Repeater</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          <strong className="text-cyber-cyan">Repeater</strong> is Burp's manual testing workbench. You send individual requests from Proxy history (or any other tool) to Repeater, then manually edit and resend them to test for vulnerabilities. It is the primary tool for hands-on parameter tampering, header manipulation, and response analysis.
        </p>
        <p className="text-cyber-text leading-relaxed mt-2">
          Repeater supports HTTP/1, HTTP/2, and WebSocket. You can modify every aspect of a request: URL, method, headers, cookies, body. Responses are color-coded (2xx green, 4xx/5xx red) and contain raw, hex, and pretty-printed views.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Sending Requests to Repeater</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          The fastest way to get requests into Repeater:
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { method: 'Right-click', desc: 'From Proxy HTTP history or Site map, right-click any request → Send to Repeater', shortcut: null },
            { method: 'Keyboard', desc: 'Select a request in history, press Ctrl+R to send immediately', shortcut: 'Ctrl+R' },
            { method: 'Drag & Drop', desc: 'Drag a request from Proxy history to the Repeater tab', shortcut: null },
            { method: 'Action menu', desc: 'Select request → top menu: "Action" → "Send to Repeater"', shortcut: null },
          ].map((item, i) => (
            <div key={i} className="cyber-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-cyan">Method {i + 1}</span>
                {item.shortcut && <span className="text-xs text-cyber-amber font-mono">{item.shortcut}</span>}
              </div>
              <p className="text-sm text-cyber-text">{item.desc}</p>
            </div>
          ))}
        </div>
        <Callout type="tip">
          Open multiple Repeater tabs to test multiple requests simultaneously. Each tab is independent — great for comparing side-by-side.
        </Callout>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Repeater Interface</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Each Repeater tab contains two panels: request (left/right or top/bottom depending on layout). Edit the request and click "Send" to see the response.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Request Editor', features: ['Raw edit mode (default)', 'Hex editor for binary data', 'Automatic URL/params decoding', 'Syntax highlighting', 'Header and body split view'] },
            { title: 'Response Viewer', features: ['Raw, hex, and pretty-print views', 'HTML rendering with syntax highlighting', 'Search within response', 'Copy as curl command', 'Send to Comparer, Decoder, or Intruder'] },
          ].map((panel) => (
            <div key={panel.title} className="cyber-card p-4">
              <h4 className="text-sm font-semibold text-cyber-amber mb-2">{panel.title}</h4>
              <ul className="space-y-1">
                {panel.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-cyber-text">
                    <i className="ri-checkbox-circle-line text-cyber-green" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Repeater Actions</DocHeading>
        <div className="mt-4 space-y-3">
          {[
            { title: 'Send Request', desc: 'Send the current request and display the response. Shortcut: Ctrl+Enter or click the "Send" button.' },
            { title: 'Follow Redirects', desc: 'Automatically follow HTTP 3xx redirects to the final destination instead of showing intermediate responses.' },
            { title: 'Clear', desc: 'Clear both request and response panels to start fresh.' },
            { title: 'Save', desc: 'Save the current request to a file for later use.' },
            { title: 'Paste from Browser', desc: 'Quickly paste raw HTTP request copied from browser DevTools.' },
            { title: 'URL-encode / Decode', desc: 'Automatically encode/decode parameter values and path segments using Burp\'s smart encoding.' },
            { title: 'Duplicate Tab', desc: 'Clone the current request into a new tab for parallel testing of variations.' },
          ].map((action, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
              <span className="w-6 h-6 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 flex items-center justify-center text-cyber-amber text-xs flex-shrink-0">{i + 1}</span>
              <div>
                <h4 className="text-sm font-semibold text-white">{action.title}</h4>
                <p className="text-xs text-cyber-text mt-0.5">{action.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Repeater Keyboard Shortcuts</DocHeading>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { key: 'Ctrl+Enter', action: 'Send request' },
            { key: 'Ctrl+R', action: 'Send from Proxy to Repeater' },
            { key: 'Ctrl+I', action: 'Send to Intruder' },
            { key: 'Ctrl+Shift+R', action: 'Duplicate current tab' },
            { key: 'Ctrl+Up/Down', action: 'Switch between request/response panes' },
            { key: 'Ctrl+F', action: 'Find in request/response' },
            { key: 'Ctrl+E', action: 'Encode selected text' },
          ].map((s) => (
            <div key={s.key} className="flex items-center gap-3 p-2 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
              <kbd className="px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-cyber-cyan font-mono text-xs whitespace-nowrap">{s.key}</kbd>
              <span className="text-sm text-cyber-text">{s.action}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Common Testing Workflow</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Here's how to use Repeater for common vulnerability tests:
        </p>
        <div className="mt-4 space-y-3">
          {[
            { title: 'SQL Injection', desc: 'Intercept request → send to Repeater → modify parameter to test for SQL errors or boolean-based injection → observe response differences.' },
            { title: 'XSS', desc: 'Send request to Repeater → inject &lt;script&gt;alert(1)&lt;/script&gt; into input fields → check if script executes in response HTML.' },
            { title: 'Access Control Bypass', desc: 'Modify session cookie or user ID parameter → resend as another user → check if you can access unauthorized data.' },
            { title: 'Header Manipulation', desc: 'Add/modify headers like X-Forwarded-For, Host, or Authorization to test for host header injection, authentication bypass, or SSRF.' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-lg border border-cyber-border bg-cyber-bg-card/50">
              <h4 className="text-sm font-semibold text-white">{item.title}</h4>
              <p className="text-xs text-cyber-text mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
        <Callout type="warning">
          Always test one parameter at a time in Repeater to clearly attribute response changes to your payload.
        </Callout>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/burp-suite/intruder" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Intruder <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/burp-suite/proxy" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
