'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const scannerModes = [
  {
    mode: 'Passive',
    desc: 'Analyzes traffic without sending any requests. Only inspects requests/responses already captured by Proxy. Safe, zero risk of detection.',
    speed: 'Real-time',
    detection: 'Information disclosure, missing headers, weak SSL/TLS, cookie issues',
    icon: 'ri-eye-line',
  },
  {
    mode: 'Active',
    desc: 'Sends crafted requests to test for vulnerabilities. Can trigger alerts, log events, or cause errors on the target. Use only on authorized targets.',
    speed: 'Medium to Slow',
    detection: 'SQLi, XSS, SSRF, XXE, command injection, path traversal, full OWASP Top 10',
    icon: 'ri-scan-line',
  },
];

const scanTypes = [
  { name: 'Crawl', desc: 'Automatically discovers content (directories, files, endpoints) by following links and submitting forms.' },
  { name: 'Audit', desc: 'Active vulnerability testing against discovered content. Uses hundreds of built-in checks.' },
  { name: 'Custom', desc: 'Select specific scan checks to run. Faster if you know what you are looking for.' },
];

const issueSeverities = [
  { level: 'Critical', color: 'text-cyber-red', desc: 'Immediate risk requiring urgent attention (e.g., unauthenticated RCE, SQLi with data dump).' },
  { level: 'High', color: 'text-cyber-red', desc: 'Significant risk (e.g., stored XSS, authentication bypass, sensitive data exposure).' },
  { level: 'Medium', color: 'text-cyber-amber', desc: 'Moderate risk (e.g., missing security headers, verbose error messages).' },
  { level: 'Low', color: 'text-cyber-cyan', desc: 'Minor issue or informational (e.g., HTTP cookie without HttpFlag, disclosed server version).' },
  { level: 'Info', color: 'text-cyber-text', desc: 'Informational finding; may not indicate vulnerability.' },
];

export default function BurpSuiteScannerPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-medium font-mono mb-4">
          <i className="ri-scan-line" />
          Automated Vulnerability Detection
        </div>
        <DocHeading level={1}>Scanner</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          The <strong className="text-cyber-cyan">Scanner</strong> is Burp's automated vulnerability detection engine. It crawls the target application, submits test payloads, and analyzes responses for hundreds of known vulnerability patterns including SQL injection, XSS, SSRF, XXE, and the full OWASP Top 10.
        </p>
        <p className="text-cyber-text leading-relaxed mt-2">
          <strong className="text-cyber-amber">Note:</strong> The Scanner is a <strong>Pro and Enterprise only</strong> feature. Community edition users must rely on manual testing with Repeater and Intruder, or use free extensions like Active Scan++ for some automation.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Scanner Modes</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Burp Scanner operates in two distinct modes, each serving a different purpose:
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {scannerModes.map((sm) => (
            <div key={sm.mode} className="cyber-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-cyber-bg border border-cyber-border flex items-center justify-center text-cyber-amber">
                  <i className={sm.icon} />
                </div>
                <h3 className="text-lg font-semibold text-white">{sm.mode}</h3>
              </div>
              <p className="text-xs text-cyber-text leading-relaxed mb-3">{sm.desc}</p>
              <div className="text-xs text-cyber-text-dim">
                <span className="font-semibold text-cyber-cyan">Speed:</span> {sm.speed}
              </div>
              <div className="text-xs text-cyber-text-dim mt-1">
                <span className="font-semibold text-cyber-cyan">Detects:</span> {sm.detection}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Running a Scan</DocHeading>
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">From a Saved Request</h4>
            <p className="text-sm text-cyber-text">
              In any tool tab (Proxy, Repeater, Intruder), select a request → right-click → "Scan selected requests". Or open the Scanner tab and manually add URLs.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Scanning the Entire Site</h4>
            <p className="text-sm text-cyber-text mb-2">
              Use the Site map to select the target root folder → right-click → "Spider this host" or "Scan this host". Burp automatically discovers all content and tests each endpoint.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Configuring Scan Scope</h4>
            <p className="text-sm text-cyber-text mb-2">
              Burp only tests URLs within the defined <strong>Target Scope</strong>. Set scope in Target tab before scanning to avoid hitting unauthorized hosts.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Customizing Scan Checks</h4>
            <p className="text-sm text-cyber-text">
              In Scanner options, enable/disable specific vulnerability checks based on your target's technology stack (e.g., only test for SQLi if the app uses a database).
            </p>
          </div>
        </div>
        <Callout type="info">
          Always run a <strong>passive scan</strong> first (it runs automatically on all proxied traffic). Then perform a targeted <strong>active scan</strong> on interesting endpoints discovered.
        </Callout>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Scan Results & Reporting</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Scan results appear in the Scanner tab with an Issues table. Each issue includes:
        </p>
        <div className="mt-4 space-y-2">
          {[
            'Issue name (e.g., SQL Injection)',
            'Severity (Critical to Info)',
            'Confidence (Certain, Firm, Tentative)',
            'Affected URL and parameter',
            'Request/Response that triggered the finding',
            'Remediation advice',
            'CWE classification',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-cyber-text">
              <i className="ri-checkbox-circle-line text-cyber-green" /> {item}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-white mb-2">Report Generation</h4>
          <p className="text-xs text-cyber-text">
            Select issues → right-click → "Report selected issues". Export as HTML with full details for clients or internal documentation.
          </p>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Issue Severity & Confidence</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Burp scores issues by severity and confidence. Both matter for prioritizing work:
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {issueSeverities.map((s) => (
            <div key={s.level} className="flex items-start gap-3 p-3 rounded-lg border border-cyber-border bg-cyber-bg-card/50">
              <span className={`w-2 h-2 rounded-full mt-1.5 ${s.color.replace('text', 'bg')}`} />
              <div>
                <h4 className={`text-sm font-semibold ${s.color}`}>{s.level}</h4>
                <p className="text-xs text-cyber-text mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Scanner Options (Pro)</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Customize scan behavior in Scanner options:
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'Crawl optimization (max depth, max unique locations)',
            'Request throttling (requests/second per host)',
            'Network error handling and retry logic',
            'SSRF collaborator server settings',
            'Issue merge and duplication rules',
            'Scan scope and exclusion rules',
          ].map((opt, i) => (
            <div key={i} className="cyber-card p-4">
              <div className="flex items-center gap-2">
                <i className="ri-settings-3-line text-cyber-cyan" />
                <span className="text-xs text-cyber-text">{opt}</span>
              </div>
            </div>
          ))}
        </div>
        <Callout type="warning">
          Aggressive scan settings can trigger WAFs, rate-limit your IP, or crash fragile applications. Start with conservative rates and increase gradually.
        </Callout>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/burp-suite/decoder" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Decoder <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/burp-suite/repeater" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
