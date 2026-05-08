'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const webSecurityLayers = [
  {
    layer: 'Network',
    focus: 'Infrastructure security, DDoS protection, TLS configuration.',
    threats: 'Man-in-the-middle, SSL stripping, port scanning.',
    tools: 'Nmap, sslscan, testssl.sh, Cloudflare',
  },
  {
    layer: 'Server',
    focus: 'OS hardening, web server configuration, access controls.',
    threats: 'Directory traversal, file inclusion, server misconfig.',
    tools: 'Nikto, Nessus, OpenVAS',
  },
  {
    layer: 'Application',
    focus: 'Input validation, business logic, session management.',
    threats: 'SQL injection, XSS, CSRF, broken access control.',
    tools: 'Burp Suite, OWASP ZAP, SQLMap, Browser Dev Tools',
  },
  {
    layer: 'Data',
    focus: 'Encryption at rest/in transit, data classification.',
    threats: 'Data leakage, weak crypto, exposed PII.',
    tools: 'Hashcat, John, custom scripts',
  },
];

const secureHeaders = [
  { header: 'Content-Security-Policy', value: "default-src 'self'", desc: 'Prevents XSS by controlling resource loading.' },
  { header: 'X-Frame-Options', value: 'DENY', desc: 'Prevents clickjacking attacks.' },
  { header: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains', desc: 'Enforces HTTPS connections.' },
  { header: 'X-Content-Type-Options', value: 'nosniff', desc: 'Prevents MIME type sniffing.' },
  { header: 'Referrer-Policy', value: 'strict-origin-when-cross-origin', desc: 'Limits referrer information leakage.' },
];

const apiSecurity = [
  {
    concern: 'Authentication',
    bestPractices: 'Use OAuth 2.0 / OIDC, implement MFA, rotate API keys regularly.',
    antiPatterns: 'API keys in URLs, static tokens, no rate limiting.',
  },
  {
    concern: 'Authorization',
    bestPractices: 'Scope-based permissions, RBAC, resource-level access control.',
    antiPatterns: 'Admin endpoints public, horizontal privilege escalation.',
  },
  {
    concern: 'Input Validation',
    bestPractices: 'Validate all input, use schemas, whitelist allowed values.',
    antiPatterns: 'Trust client data, no schema validation, string concatenation.',
  },
  {
    concern: 'Rate Limiting',
    bestPractices: 'Per-API key limits, exponential backoff, circuit breakers.',
    antiPatterns: 'No limits, same limits for all endpoints, no abuse detection.',
  },
];

const commonVulnerabilities = [
  {
    vuln: 'Injection',
    desc: 'Untrusted data interpreted as code/command (SQL, NoSQL, OS, LDAP).',
    example: "User input ' OR '1'='1 in login form alters SQL query logic.",
    defense: 'Parameterized queries, ORM, input validation, least privilege DB accounts.',
  },
  {
    vuln: 'Broken Authentication',
    desc: 'Session management flaws allowing credential stuffing or session hijacking.',
    example: 'Session not invalidated after password change; long-lived JWT tokens.',
    defense: 'MFA, secure cookie flags, session timeout, passwordless auth.',
  },
  {
    vuln: 'Sensitive Data Exposure',
    desc: 'Inadequate protection of sensitive data at rest or in transit.',
    example: 'Storing passwords in plaintext or with weak hashing (MD5, SHA1).',
    defense: 'AES-256 for data at rest, TLS 1.3, proper key management, tokenization.',
  },
  {
    vuln: 'XML External Entities (XXE)',
    desc: 'Poorly configured XML processors allowing file access or SSRF.',
    example: '<!ENTITY xxe SYSTEM "file:///etc/passwd"> in uploaded XML.',
    defense: 'Disable DTD processing, use JSON, whitelist allowed entities.',
  },
  {
    vuln: 'Broken Access Control',
    desc: 'Users can act outside their intended permissions.',
    example: '/api/admin/deleteUser accessible by changing user_id in request.',
    defense: 'Server-side authorization checks, deny-by-default, API gateway policies.',
  },
];

export default function WebAppSecurityPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-global-line" />
          Module 10 of 20 — Offensive Security
        </div>
        <DocHeading level={1}>Web Application Security Deep Dive</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Web applications are the primary attack surface for most organizations. Modern web apps are
          complex ecosystems of frontend frameworks, APIs, microservices, and third-party integrations—
          each introducing potential vulnerabilities. This module covers defense strategies across all layers.
        </p>
      </motion.div>

      {/* Security Layers */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Web Application Security Layers</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Web security must be applied at every layer—a weakness at any level can compromise the entire application.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {webSecurityLayers.map((layer) => (
            <div key={layer.layer} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-3">{layer.layer} Layer</h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-white">Focus:</span>
                  <span className="text-cyber-text"> {layer.focus}</span>
                </div>
                <div>
                  <span className="font-semibold text-cyber-red">Threats:</span>
                  <span className="text-cyber-text"> {layer.threats}</span>
                </div>
                <div>
                  <span className="font-semibold text-cyber-green">Tools:</span>
                  <span className="text-cyber-cyan font-mono"> {layer.tools}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Secure Headers */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Essential Security Headers</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          HTTP security headers provide browser-enforced protections against common web vulnerabilities.
          These headers instruct browsers on how to behave when processing your application.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border border-cyber-border rounded-lg overflow-hidden">
            <thead className="bg-cyber-bg-card">
              <tr>
                <th className="text-left px-4 py-3 text-cyber-text font-semibold">Header</th>
                <th className="text-left px-4 py-3 text-cyber-text font-semibold">Recommended Value</th>
                <th className="text-left px-4 py-3 text-cyber-text font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border">
              {secureHeaders.map((h) => (
                <tr key={h.header} className="hover:bg-cyber-bg-card/50 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-cyber-cyan">{h.header}</td>
                  <td className="px-4 py-2.5 font-mono text-cyber-green text-xs">{h.value}</td>
                  <td className="px-4 py-2.5 text-cyber-text text-xs">{h.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* API Security */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>API Security Best Practices</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Modern applications rely heavily on APIs. Securing them requires attention to authentication,
          authorization, input validation, and rate limiting.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {apiSecurity.map((api) => (
            <div key={api.concern} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-white mb-3">{api.concern}</h3>
              <div className="space-y-2">
                <div className="p-2 rounded bg-cyber-green/5 border border-cyber-green/10">
                  <p className="text-xs font-semibold text-cyber-green mb-1">Do:</p>
                  <p className="text-xs text-cyber-text">{api.bestPractices}</p>
                </div>
                <div className="p-2 rounded bg-cyber-red/5 border border-cyber-red/10">
                  <p className="text-xs font-semibold text-cyber-red mb-1">Don't:</p>
                  <p className="text-xs text-cyber-text">{api.antiPatterns}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Common Vulnerabilities */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Critical Web Application Vulnerabilities</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Understanding the most common vulnerabilities helps prioritize security testing and remediation efforts.
        </p>

        <div className="mt-6 space-y-4">
          {commonVulnerabilities.map((vuln) => (
            <div key={vuln.vuln} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-amber mb-2">{vuln.vuln}</h3>
              <div className="space-y-2 text-xs">
                <p className="text-cyber-text">{vuln.desc}</p>
                <div className="p-2 rounded bg-cyber-red/5 border border-cyber-red/10">
                  <span className="font-semibold text-cyber-red">Example:</span>
                  <span className="text-cyber-text"> {vuln.example}</span>
                </div>
                <div className="p-2 rounded bg-cyber-green/5 border border-cyber-green/10">
                  <span className="font-semibold text-cyber-green">Defense:</span>
                  <span className="text-cyber-text"> {vuln.defense}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Key Takeaways */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Key Takeaways</DocHeading>
        <ul className="mt-4 space-y-2 text-cyber-text text-sm">
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Defense in depth</strong> across network, server, application, and data layers.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Security headers</strong> provide browser-side protection against XSS, clickjacking, and more.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>API security</strong> requires authentication, authorization, and rate limiting at minimum.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>OWASP Top 10</strong> vulnerabilities remain the primary attack vectors—test for them regularly.</span>
          </li>
        </ul>
      </motion.section>

      {/* Navigation */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="flex gap-3 justify-between items-center">
                <div className="text-sm text-cyber-text">
                  <i className="ri-book-open-line" /> Module 10 of 20
                </div>
                <div className="flex gap-3">
                  <a href="/cybersecurity/pentesting-methodologies" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
                    <i className="ri-arrow-left-line mr-1" /> Penetration Testing
                  </a>
                  <a href="/cybersecurity/wireless-network-security" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
                    Next: Wireless & Network Security <i className="ri-arrow-right-line ml-1" />
                  </a>
                </div>
              </div>
            </motion.section>
    </div>
  );
}