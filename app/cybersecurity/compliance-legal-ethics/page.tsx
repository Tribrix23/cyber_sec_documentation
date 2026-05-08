'use client'
import { useEffect } from 'react'
import DocHeading from '@/components/base/DocHeading'
import Callout from '@/components/base/Callout'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const complianceFrameworks = [
  {
    framework: 'GDPR (General Data Protection Regulation)',
    scope: 'EU citizen data, applies globally to any org processing EU residents.',
    keyReqs: ['Data subject rights (access, erasure, portability)', 'Privacy by design', '72-hour breach notification', 'Data Protection Officer (DPO) for large-scale processing'],
    penalties: 'Up to 4% of global annual revenue or €20M (whichever higher).',
    example: 'British Airways £20M fine (2018) for inadequate security leading to 400k compromised payment cards.',
  },
  {
    framework: 'HIPAA (Health Insurance Portability and Accountability Act)',
    scope: 'Protected Health Information (PHI) in US healthcare.',
    keyReqs: ['Administrative, physical, technical safeguards', 'Encryption at rest and in transit', 'Access controls and audit logs', 'Business Associate Agreements (BAA)'],
    penalties: '$100–$50,000 per violation, max $1.5M/year per violation type.',
    example: 'Anthem $16M fine (2018) for inadequate risk analysis following breach affecting 79M people.',
  },
  {
    framework: 'PCI-DSS (Payment Card Industry Data Security Standard)',
    scope: 'Cardholder data environment—any entity storing/processing/transmitting payment cards.',
    keyReqs: ['12 requirements: firewall config, encryption, access control, monitoring, testing', 'Quarterly network scans, annual assessment'],
    penalties: 'Fines from card brands ($5k–$100k/month), increased transaction fees, loss of ability to process cards.',
    example: 'Target fined $18.5M (2017) across 47 states for breach compromising 40M cards.',
  },
  {
    framework: 'SOX (Sarbanes-Oxley Act)',
    scope: 'Publicly traded companies in US, internal controls over financial reporting.',
    keyReqs: ['Section 404: Management assessment of internal controls', 'Audit trails, data integrity checks', 'Retention of financial records 7 years'],
    penalties: 'Criminal penalties: up to 20 years prison for document destruction, $5M fines for violations.',
    example: 'Enron executives convicted for fraudulent accounting concealed from internal controls.',
  },
]

const cybercrimeLaws = [
  {
    law: 'CFAA (Computer Fraud and Abuse Act) — US',
    scope: 'Unauthorized access to computers, exceeding authorized access.',
    penalties: 'Up to 10 years (first offense), 20 years (repeat).',
    note: 'Broadly written, controversial—prosecutes security researchers if access exceeds authorization even if no harm.',
  },
  {
    law: 'GDPR Article 32 — EU',
    scope: 'Security of processing—requires appropriate technical and organizational measures.',
    penalties: 'Same as GDPR fines, triggered by inadequate security leading to breach.',
    note: 'Encryption pseudonymization are "appropriate measures" demonstrating compliance.',
  },
  {
    law: 'NIS2 Directive — EU',
    scope: 'Network and Information Security—essential and important entities across sectors.',
    penalties: 'Up to €10M or 2% of global turnover.',
    note: 'Requires incident reporting within 24 hours, supply chain security, risk management.',
  },
  {
    law: 'Cybercrime Convention (Budapest)',
    scope: 'International treaty harmonizing cybercrime laws across 66 countries.',
    penalties: 'Varies by adopting country.',
    note: 'Covers illegal access, data interference, system interference, computer-related forgery/fraud.',
  },
]

const ethicalPrinciples = [
  {
    principle: 'Responsible Disclosure',
    desc: 'Report vulnerabilities privately to vendor, allow time to patch before public disclosure.',
    why: 'Prevents weaponization, gives organizations chance to fix, protects users.',
    example: 'Google Project Zero 90-day disclosure policy, coordinated with vendors.',
  },
  {
    principle: 'Do No Harm',
    desc: 'Security testing should not damage systems, disrupt services, or expose user data.',
    why: 'Ethical hackers wield significant power—responsible use maintains trust.',
    example: 'Never exfiltrate production data during pentest; use proof-of-concept only.',
  },
  {
    principle: 'Scope Adherence',
    desc: 'Testing strictly within agreed boundaries (systems, methods, timing).',
    why: 'Authorization is legal shield—out-of-scope testing exceeds consent.',
    example: 'Bug bounty programs explicitly define in-scope targets and allowed techniques.',
  },
  {
    principle: 'Confidentiality',
    desc: 'Protect client data, findings, and sensitive information from unauthorized disclosure.',
    why: 'Breach details could aid attackers before patches available.',
    example: 'Pentest reports marked confidential, encrypted storage, NDAs.',
  },
  {
    principle: 'Integrity of Findings',
    desc: 'Report vulnerabilities accurately, without exaggeration or suppression.',
    why: 'Honest reporting allows proper risk prioritization and remediation.',
    example: 'Do not inflate CVSS scores for attention; do not hide low-severity findings.',
  },
]

const secureDevLifecycle = [
  {
    phase: 'Requirements',
    practices: ['Security requirements alongside functional', 'Threat modeling kickoff', 'Compliance mapping'],
  },
  {
    phase: 'Design',
    practices: ['Architecture security review', 'Data flow diagrams', 'STRIDE threat modeling'],
  },
  {
    phase: 'Implementation',
    practices: ['Secure coding standards', 'SAST integration in IDE', 'Pre-commit hooks'],
  },
  {
    phase: 'Testing',
    practices: ['DAST in CI pipeline', 'SCA for dependencies', 'Penetration testing'],
  },
  {
    phase: 'Deployment',
    practices: ['IaC scanning', 'Runtime protection', 'Secrets management'],
  },
  {
    phase: 'Maintenance',
    practices: ['Patch management', 'Continuous monitoring', 'Incident response readiness'],
  },
]

export default function ComplianceLegalEthicsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple text-xs font-medium font-mono mb-4">
          <i className="ri-gavel-line" />
          Module 17 of 20 — Professional Practice
        </div>
        <DocHeading level={1}>Compliance, Legal & Ethics in Cybersecurity</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Security professionals operate within legal and ethical boundaries.
          Understanding regulations, compliance requirements, and ethical guidelines
          is essential for responsible practice and organizational protection.
        </p>
      </motion.div>

      {/* Compliance Frameworks */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Major Compliance Frameworks</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Compliance frameworks define mandatory security controls for specific industries.
          Violations result in substantial fines and reputational damage.
        </p>

        <div className="mt-6 space-y-4">
          {complianceFrameworks.map((framework) => (
            <div key={framework.framework} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-red mb-2">{framework.framework}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-2 rounded bg-cyber-bg border border-cyber-border">
                  <span className="font-semibold text-cyber-cyan">Scope:</span>
                  <span className="text-cyber-text ml-1">{framework.scope}</span>
                </div>
                <div className="p-2 rounded bg-cyber-bg border border-cyber-border">
                  <span className="font-semibold text-cyber-green">Key Requirements:</span>
                  <ul className="text-cyber-text mt-1 list-disc list-inside space-y-0.5">
                    {framework.keyReqs.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-3 p-2 rounded bg-cyber-red/5 border border-cyber-red/10">
                <span className="text-xs font-semibold text-cyber-red">Penalties:</span>
                <span className="text-xs text-cyber-text ml-1">{framework.penalties}</span>
              </div>
              <div className="mt-2 p-2 rounded bg-cyber-amber/5 border border-cyber-amber/10">
                <span className="text-xs font-semibold text-cyber-amber">Real-World:</span>
                <span className="text-xs text-cyber-text ml-1">{framework.example}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Cybercrime Laws */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Cybercrime Laws & Legal Boundaries</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Security professionals must understand what constitutes illegal activity.
          "Authorization" is the line between testing and crime.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {cybercrimeLaws.map((law) => (
            <div key={law.law} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-white mb-2">{law.law}</h3>
              <p className="text-xs text-cyber-text mb-3">{law.scope}</p>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-cyber-red/5 border border-cyber-red/10">
                  <span className="font-semibold text-cyber-red">Penalties:</span>
                  <span className="text-cyber-text ml-1">{law.penalties}</span>
                </div>
                <div className="p-2 rounded bg-cyber-bg border border-cyber-border">
                  <span className="font-semibold text-cyber-amber">Note:</span>
                  <span className="text-cyber-text ml-1">{law.note}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Ethical Principles */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Ethical Principles for Security Professionals</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Ethics guide decisions where rules are ambiguous. Professional codes of conduct
          (ISC2, (ISC)², EC-Council) codify these principles.
        </p>

        <div className="mt-6 space-y-4">
          {ethicalPrinciples.map((ep) => (
            <div key={ep.principle} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">{ep.principle}</h3>
              <p className="text-xs text-cyber-text mb-2">{ep.desc}</p>
              <div className="p-2 rounded bg-cyber-green/5 border border-cyber-green/10 mb-2">
                <span className="text-xs font-semibold text-cyber-green">Why this matters:</span>
                <span className="text-xs text-cyber-text ml-1">{ep.why}</span>
              </div>
              <div className="p-2 rounded bg-cyber-bg border border-cyber-border">
                <span className="text-xs font-semibold text-cyber-amber">Example:</span>
                <span className="text-xs text-cyber-text ml-1">{ep.example}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Secure SDLC Integration */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Security Across the Development Lifecycle</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Compliance and ethics aren't just legal checkboxes—they're integrated into every phase.
        </p>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {secureDevLifecycle.map((phase) => (
            <div key={phase.phase} className="cyber-card p-4">
              <h3 className="text-xs font-semibold text-white mb-2">{phase.phase}</h3>
              <ul className="text-xs text-cyber-text space-y-1 list-disc list-inside">
                {phase.practices.map((practice, i) => (
                  <li key={i}>{practice}</li>
                ))}
              </ul>
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
            <span><strong>Authorization defines legality</strong>—exceeding scope, even with good intent, violates laws like CFAA.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Non-compliance fines</strong> can reach millions and revenue percentages, not just technical risk.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Ethical testing</strong> requires scoped authorization, data protection, harm minimization.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Security is built into processes</strong>, not bolted on—requirements, threat modeling, testing across SDLC.</span>
          </li>
        </ul>
      </motion.section>

      {/* Navigation */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3 justify-between items-center">
          <a href="/cybersecurity/career-paths-future" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Module 17
          </a>
          <a href="/cybersecurity/devsecops-secure-sdlc" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: DevSecOps <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  )
}
