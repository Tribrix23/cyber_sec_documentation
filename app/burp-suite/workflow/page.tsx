'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const workflow = [
  {
    step: '1',
    title: 'Configure Proxy & Scope',
    desc: 'Set browser proxy to 127.0.0.1:8080. Install CA cert. Define target scope in Burp to prevent capturing unrelated traffic.',
    key: 'FoxyProxy or manual proxy settings',
  },
  {
    step: '2',
    title: 'Browse Target Normally',
    desc: 'Visit the application like a regular user. Burp\'s Proxy captures all HTTP/S traffic and logs it to HTTP history. Spider if needed to discover hidden endpoints.',
    key: 'Spider: Target → Spider control → start',
  },
  {
    step: '3',
    title: 'Reconnaissance',
    desc: 'Review HTTP history and Site map. Identify interesting endpoints: login pages, admin panels, API endpoints, file upload forms, parameters with IDs.',
    key: 'Look for .php, .asp, /admin, /api, ?id=',
  },
  {
    step: '4',
    title: 'Manual Testing (Repeater)',
    desc: 'Send interesting requests to Repeater (Ctrl+R). Modify parameters, headers, cookies to test for SQLi, XSS, auth bypass, IDOR, path traversal. Analyze responses carefully.',
    key: 'Repeater: Ctrl+R, Ctrl+Enter to send',
  },
  {
    step: '5',
    title: 'Automated Fuzzing (Intruder)',
    desc: 'For parameters that look injectable, use Intruder with Sniper or Cluster Bomb attack. Load wordlists, set payload positions, and analyze results.',
    key: 'Intruder: Ctrl+I, mark positions with §, select attack type',
  },
  {
    step: '6',
    title: 'Automated Scanning',
    desc: 'Run active scan on discovered endpoints (Pro required). Review generated issues, validate true positives, and eliminate false positives.',
    key: 'Right-click → Scan selected requests',
  },
  {
    step: '7',
    title: 'Advanced Attacking',
    desc: 'Use extensions (Turbo Intruder, Autorize, JWT Editor) for specialized attacks. Test for OAST (out-of-band) with Collaborator.',
    key: 'Collaborator payloads: burpcollaborator.net',
  },
  {
    step: '8',
    title: 'Reporting',
    desc: 'Compile findings: vulnerability name, affected URL, proof-of-concept, impact, remediation. Export Scanner issues as HTML or generate report from issues.',
    key: 'Scanner → Issues → Report → Export',
  },
];

const reconSteps = [
  'Spider the site to map all accessible pages (Target → Spider)',
  'Review Site map for hidden endpoints (/robots.txt, /.git/, backup files)',
  'Check content types: JSON/XML APIs often have different vulnerabilities than HTML',
  'Look for session tokens, cookies, CSRF tokens in requests',
  'Identify input parameters: query, form fields, headers, path segments',
];

const manualTestExamples = [
  { vuln: 'SQL Injection', technique: 'Send parameter to Repeater → try \' OR 1=1 -- → check for error or different response length' },
  { vuln: 'XSS', technique: 'Inject &lt;script&gt;alert(1)&lt;/script&gt; → check if script executes in browser or appears reflected' },
  { vuln: 'IDOR', technique: 'Change user ID in URL/parameter from /account/123 to /account/456 → check if data leaks' },
  { vuln: 'Path Traversal', technique: 'Replace parameter with ../../../etc/passwd → check if file contents appear in response' },
  { vuln: 'Command Injection', technique: 'Try | id or ; whoami in parameter → look for command output in response' },
  { vuln: 'SSRF', technique: 'Inject http://burpcollaborator.net → check Collaborator for DNS/HTTP callbacks' },
  { vuln: 'XXE', technique: 'Inject &lt;?xml version="1.0"?&gt;&lt;!DOCTYPE foo [&lt;!ENTITY xxe SYSTEM "file:///etc/passwd"&gt;]&gt;...' },
  { vuln: ' insecure Deserialization', technique: 'Modify serialized objects (PHP, Java, .NET) — hard without debugging; look for gadget chains' },
];

export default function BurpSuiteWorkflowPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-road-map-line" />
          Methodology
        </div>
        <DocHeading level={1}>Testing Workflow</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          A structured methodology ensures thorough testing and maximizes vulnerability discovery. Follow this workflow for consistent results on any web application.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Systematic Workflow</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Eight-step process from setup to report:
        </p>
        <div className="mt-5 space-y-3">
          {workflow.map((item) => (
            <div key={item.step} className="flex items-start gap-4 p-4 rounded-lg bg-cyber-bg-card/50 border border-cyber-border hover:border-cyber-amber/30 transition-all">
              <span className="w-8 h-8 rounded-full bg-cyber-amber/10 border border-cyber-amber/30 text-cyber-amber text-sm font-bold flex items-center justify-center flex-shrink-0">
                {item.step}
              </span>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                <p className="text-xs text-cyber-text mt-1">{item.desc}</p>
                <div className="mt-2 p-2 rounded bg-cyber-bg border border-cyber-border">
                  <span className="text-xs text-cyber-text-dim font-mono">KEY: {item.key}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Reconnaissance Phase</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Before testing, understand what you are attacking:
        </p>
        <div className="mt-4 space-y-2">
          {reconSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-cyber-text">
              <i className="ri-arrow-right-s-line text-cyber-amber mt-0.5 flex-shrink-0" /> {step}
            </div>
          ))}
        </div>
        <Callout type="info">
          Burp's <strong>Spider</strong> auto-crawls links and forms. However, spidering can miss hidden endpoints — combine with manual browsing and passive scanning for best coverage.
        </Callout>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Manual Testing Examples</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Here are common vulnerabilities and how to test for them in Repeater:
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {manualTestExamples.map((ex, i) => (
            <div key={i} className="cyber-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <h4 className="text-sm font-semibold text-cyber-red">{ex.vuln}</h4>
              </div>
              <p className="text-xs text-cyber-text">{ex.technique}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Scope Management</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Always define a target scope before attacking. Scope prevents accidental testing of unauthorized systems, speeds up scans, and keeps your project manageable.
        </p>
        <div className="mt-4 p-4 rounded-lg bg-cyber-bg border border-cyber-border font-mono text-xs text-cyber-green">
          <div className="text-cyber-amber mb-2">Setting Scope (Target tab)</div>
          <div>1. Add target URL(s): https://target.example.com/*</div>
          <div>2. Include specific paths if needed: /admin, /api/*</div>
          <div>3. Exclude static resources to reduce noise: *.png, *.jpg, *.css</div>
          <div>4. Enable "Use advanced scope control" for fine-grained filtering</div>
        </div>
        <Callout type="warning" className="mt-4">
          Out-of-scope hosts are grayed out in Site map. Some tools (Scanner, Intruder) respect scope and will not attack excluded hosts.
        </Callout>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Validation & False Positives</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Automated tools generate false positives. Always manually verify before reporting:
        </p>
        <div className="mt-4 space-y-3">
          {[
            'SQLi: Try UNION-based payload to confirm database content retrieval.',
            'XSS: Use script tag → check if alert box appears in actual browser (not just reflected).',
            'SSRF: Trigger Collaborator domain → verify DNS/HTTP callback received.',
            'Auth bypass: Test with two different user accounts to confirm privilege escalation.',
            'LFI: Verify file content actually appears in response, not just 200 OK.',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
              <i className="ri-checkbox-circle-line text-cyber-green mt-0.5 flex-shrink-0" />
              <span className="text-sm text-cyber-text">{item}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/burp-suite/command-builder" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Command Builder <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/burp-suite/extensions" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
