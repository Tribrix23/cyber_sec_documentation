'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const corePrinciples = [
  {
    title: 'Confidentiality',
    desc: 'Ensuring that data is accessible only to those authorized to view it. Achieved through encryption, access controls, and data classification. Analogy: A sealed letter that only the intended recipient can open.',
    icon: 'ri-lock-line',
    example: 'Equifax breach (2017): Unencrypted personal data of 147 million people exposed due to poor access controls and unpatched vulnerabilities.',
  },
  {
    title: 'Integrity',
    desc: 'Maintaining the accuracy and completeness of data. Prevents unauthorized modification. Mechanisms include hashing, digital signatures, and checksums. Analogy: A tamper-evident seal on a medicine bottle.',
    icon: 'ri-file-shield-line',
    example: 'Stuxnet (2010): Malware compromised industrial system integrity by altered centrifuge speeds while showing normal readings to operators.',
  },
  {
    title: 'Availability',
    desc: 'Ensuring systems and data are accessible when needed. Involves redundancy, DDoS mitigation, backups, and disaster recovery planning. Analogy: A 24/7 always-on hospital emergency room.',
    icon: 'ri-time-line',
    example: 'Dyn DDoS attack (2016): Major websites (Twitter, Netflix, Reddit) unavailable for hours when Mirai botnet overwhelmed DNS provider Dyn.',
  },
];

const securityMindsets = [
  {
    title: 'Assume Breach',
    desc: 'Operate under the assumption that systems are already compromised. Focus on rapid detection and response rather than purely preventive measures.',
    incident: 'Target (2013): Attackers had network access for 3 weeks before detection. Assume-breach approach would have triggered alerts earlier through anomaly detection.',
  },
  {
    title: 'Least Privilege',
    desc: 'Grant only the minimum permissions necessary for a user or system to perform its function. No one should have more access than absolutely required.',
    incident: 'SolarWinds (2020): Compromised Orion update mechanism gave attackers elevated access across 18,000 organizations due to excessive trust in update signing.',
  },
  {
    title: 'Defense in Depth',
    desc: 'Multiple overlapping security controls so that if one fails, others still protect the asset. Like layers of an onion—each layer must be breached.',
    incident: 'Colonial Pipeline (2021): Single compromised password led to operational shutdown. Multi-factor authentication at all critical access points would have prevented full compromise.',
  },
  {
    title: 'Zero Trust',
    desc: 'Never trust, always verify. Authenticate and authorize every access request regardless of origin. Trust is earned continuously, not granted permanently.',
    incident: 'Okta (2022): Social engineering of support staff led to breach. Zero Trust MFA for all administrative actions would have limited lateral movement.',
  },
  {
    title: 'Threat Modeling',
    desc: 'Systematically identify threats, vulnerabilities, and mitigations before building systems. Ask: What can go wrong? How likely? How bad?',
    incident: 'Log4Shell (2021): Lack of threat modeling around remote code execution in logging framework led to global crisis affecting millions of Java applications.',
  },
];

const attackVectors = [
  {
    vector: 'Network Attacks',
    examples: ['Man-in-the-middle (MITM)', 'Denial of Service (DoS/DDoS)', 'Port scanning & enumeration', 'Packet sniffing'],
    defense: 'Firewalls, IDS/IPS, VPN encryption, network segmentation',
  },
  {
    vector: 'Application Attacks',
    examples: ['SQL Injection', 'Cross-Site Scripting (XSS)', 'Cross-Site Request Forgery (CSRF)', 'Remote Code Execution (RCE)'],
    defense: 'Input validation, parameterized queries, Content Security Policy (CSP), secure coding practices',
  },
  {
    vector: 'Social Engineering',
    examples: ['Phishing emails', 'Pretexting calls', 'Tailgating physical access', 'Baiting with USB drops'],
    defense: 'Security awareness training, MFA, physical security controls, verification procedures',
  },
  {
    vector: 'Supply Chain',
    examples: ['Compromised software updates', 'Dependency vulnerabilities', 'Hardware backdoors', 'Third-party breaches'],
    defense: 'Software Bill of Materials (SBOM), code signing verification, vendor risk assessments, network segmentation',
  },
];

const emergingTrends = [
  {
    trend: 'AI-Powered Attacks',
    desc: 'Attackers use machine learning for automated phishing, deepfakes for social engineering, and adaptive malware that evades detection.',
    impact: 'Traditional signature-based defenses struggle against AI-generated polymorphic malware.',
    defense: 'AI-powered defenses, behavioral analysis, and employee training on deepfake recognition.',
  },
  {
    trend: 'Ransomware-as-a-Service (RaaS)',
    desc: 'Ransomware kits available on dark markets with affiliate programs, customer support, and profit-sharing models.',
    impact: 'Lower barrier to entry for criminals means more frequent, sophisticated attacks across all sectors.',
    defense: 'Immutable backups, EDR solutions, network segmentation, and user behavior analytics.',
  },
  {
    trend: 'Living Off the Land (LotL)',
    desc: 'Attackers use legitimate system tools and processes (PowerShell, WMI, certutil) instead of malware to evade detection.',
    impact: 'Traditional antivirus misses these attacks because no malicious binaries are dropped.',
    defense: 'Detailed logging, monitoring for anomalous tool usage, application whitelisting, and behavioral rules.',
  },
];

export default function FoundationsSecurityMindsetPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-book-open-line" />
          Module 1 of 20 — Foundations
        </div>
        <DocHeading level={1}>Foundations of Cybersecurity & Security Mindset</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Cybersecurity is not just tools and technologies—it\u2019s a <strong className="text-cyber-cyan">mindset</strong>. Before you can defend systems, you must think like an attacker. Before you can secure data, you must understand what makes it valuable. This module establishes the mental frameworks, core principles, and foundational concepts that underpin every other module in this curriculum.
        </p>
      </motion.div>

      {/* The CIA Triad */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>The CIA Triad: Cornerstone of Security</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Every security control, policy, and technology exists to uphold one or more of the three pillars: <strong className="text-cyber-cyan">Confidentiality, Integrity, Availability</strong>. Understanding these principles is non-negotiable for any security professional.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {corePrinciples.map((principle) => (
            <div key={principle.title} className="cyber-card p-5 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan">
                  <i className={principle.icon} />
                </span>
                <h3 className="text-sm font-semibold text-white">{principle.title}</h3>
              </div>
              <p className="text-xs text-cyber-text leading-relaxed mb-3">{principle.desc}</p>
              <div className="mt-auto p-3 rounded-lg bg-cyber-red/5 border border-cyber-red/10">
                <p className="text-xs text-cyber-red leading-relaxed">
                  <strong>Real Incident:</strong> {principle.example}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Security Mindset Principles */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Security Mindset Principles</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Tools change. Technologies evolve. But the security mindset—a way of thinking about risk, trust, and adversary behavior—remains constant. These five mental models guide every decision you make as a security professional.
        </p>

        <div className="mt-6 space-y-4">
          {securityMindsets.map((mindset, i) => (
            <div key={mindset.title} className="cyber-card p-5">
              <div className="flex items-start gap-4">
                <span className="text-xs font-bold text-cyber-cyan font-mono flex-shrink-0 w-6 h-6 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-1">{mindset.title}</h3>
                  <p className="text-xs text-cyber-text leading-relaxed">{mindset.desc}</p>
                  {mindset.incident && (
                    <Callout type="warning" className="mt-3">
                      <strong>Case Study:</strong> {mindset.incident}
                    </Callout>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Common Attack Vectors */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Understanding Attack Vectors</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Attackers don\u2019t hack systems—they <em>exploit weaknesses</em>. Understanding common attack vectors helps you visualize where defenses must exist.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {attackVectors.map((av) => (
            <div key={av.vector} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-red mb-3">{av.vector}</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-semibold text-white mb-1">Common Techniques:</p>
                  <ul className="text-xs text-cyber-text space-y-1 ml-4 list-disc">
                    {av.examples.map((ex) => (
                      <li key={ex}>{ex}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-cyber-cyan mb-1">Defensive Measures:</p>
                  <p className="text-xs text-cyber-text">{av.defense}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Threat Landscape & Trends */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Current Threat Landscape & Trends</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          The cyber threat landscape evolves rapidly. Understanding trends helps you anticipate attacks before they hit your organization.
        </p>

        <div className="mt-6 space-y-4">
          {emergingTrends.map((trend) => (
            <div key={trend.trend} className="cyber-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyber-red/10 border border-cyber-red/20 flex items-center justify-center shrink-0">
                  <i className="ri-alert-line text-cyber-red" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white">{trend.trend}</h3>
                  <p className="text-xs text-cyber-text mt-1 mb-2">{trend.desc}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-semibold text-cyber-red mb-1">Impact:</p>
                      <p className="text-xs text-cyber-text">{trend.impact}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-cyber-green mb-1">Defensive Approach:</p>
                      <p className="text-xs text-cyber-text">{trend.defense}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Security as a Process */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Security as a Continuous Process</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Security is not a product you buy—it\u2019s a process you maintain. The NIST Cybersecurity Framework outlines five core functions that form a continuous cycle.
        </p>

        <div className="mt-6 cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">NIST Cybersecurity Framework (Identify, Protect, Detect, Respond, Recover)</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { step: '1', title: 'Identify', desc: 'Develop organizational understanding to manage cybersecurity risk.', color: 'cyber-cyan' },
              { step: '2', title: 'Protect', desc: 'Implement safeguards to ensure delivery of critical services.', color: 'cyber-green' },
              { step: '3', title: 'Detect', desc: 'Develop capabilities to identify cybersecurity events.', color: 'cyber-amber' },
              { step: '4', title: 'Respond', desc: 'Take actions regarding detected incidents.', color: 'cyber-red' },
              { step: '5', title: 'Recover', desc: 'Maintain resilience and restore capabilities after incidents.', color: 'cyber-purple' },
            ].map((f) => (
              <div key={f.title} className={`flex flex-col items-center p-4 rounded-lg bg-${f.color}/5 border border-${f.color}/10 text-center`}>
                <span className={`text-lg font-bold text-${f.color} mb-2`}>{f.step}</span>
                <span className="text-xs font-semibold text-white mb-1">{f.title}</span>
                <p className="text-xs text-cyber-text leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Key Takeaways */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Key Takeaways</DocHeading>
        <ul className="mt-4 space-y-2 text-cyber-text text-sm">
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>CIA Triad</strong> is the foundation—every security control maps to at least one pillar.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Security mindset</strong> means thinking like an attacker while acting as a defender.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Defense in depth</strong> ensures no single point of failure compromises security.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Assume breach</strong> acknowledges that determined attackers will eventually get in.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Least privilege</strong> limits damage when credentials are compromised.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Real incidents</strong> referenced throughout illustrate why these principles matter.</span>
          </li>
        </ul>
      </motion.section>

      {/* Further Reading */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Further Reading & Resources</DocHeading>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { title: 'NIST Cybersecurity Framework', desc: 'Official NIST.gov framework documentation and guidelines.', link: 'https://nist.gov/cyberframework' },
            { title: 'CIS Controls', desc: 'Critical Security Controls prioritized by the Center for Internet Security.', link: 'https://cisecurity.org/controls' },
            { title: 'MITRE ATT&CK', desc: 'Global knowledge base of adversary tactics and techniques.', link: 'https://mitre.org/attack' },
            { title: 'OWASP Top 10', desc: 'Most critical web application security risks.', link: 'https://owasp.org/www-project-top-ten' },
          ].map((res) => (
            <div key={res.title} className="cyber-card p-4">
              <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-cyber-cyan hover:text-cyber-amber transition-colors">
                {res.title}
              </a>
              <p className="text-xs text-cyber-text mt-1">{res.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Navigation */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3 justify-between items-center">
          <div className="text-sm text-cyber-text">
            <i className="ri-information-line" /> Module 1 of 20
          </div>
          <div className="flex gap-3">
            <a href="/cybersecurity/networking-osi-fundamentals" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Networking Fundamentals <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
