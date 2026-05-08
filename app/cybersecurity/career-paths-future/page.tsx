'use client'
import { useEffect } from 'react'
import DocHeading from '@/components/base/DocHeading'
import Callout from '@/components/base/Callout'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const cybersecurityRoles = [
  {
    role: 'Security Analyst (Tier 1)',
    focus: 'Monitor alerts, incident triage, log review, initial response.',
    certs: ['CompTIA Security+', 'CySA+', 'GSEC'],
    salary: '$70k–$100k',
    path: 'Start with SOC operations, learn SIEM, incident response basics.',
  },
  {
    role: 'Penetration Tester / Red Teamer',
    focus: 'Adversarial testing, exploit development, threat emulation.',
    certs: ['OSCP', 'OSEP', 'CREST', 'CEH'],
    salary: '$90k–$140k',
    path: 'Build pentesting skills, contribute to bug bounties, master toolsets.',
  },
  {
    role: 'Security Engineer (Tier 2)',
    focus: 'Architecture, security tool deployment, automation, hardening.',
    certs: ['CISSP', 'GICSP', 'AWS/Azure Security Specialties'],
    salary: '$100k–$150k',
    path: 'Deepen architecture knowledge, cloud security, automate with code.',
  },
  {
    role: 'Threat Hunter / DFIR Analyst',
    focus: 'Proactive threat detection, digital forensics, malware analysis.',
    certs: ['GCFA', 'GCIH', 'GREM', 'CFCE'],
    salary: '$110k–$160k',
    path: 'Master forensics tools, incident response, reverse engineering.',
  },
  {
    role: 'Security Architect (Tier 3)',
    focus: 'Enterprise security design, risk management, strategy.',
    certs: ['CISSP-ISSAP', 'SABSA', 'Google Cloud Security Architect'],
    salary: '$130k–$200k+',
    path: 'Broad technical depth + business alignment. Threat modeling, zero trust design.',
  },
  {
    role: 'CISO / Security Executive',
    focus: 'Security program leadership, governance, budget, board communication.',
    certs: ['CISM', 'CISSP', 'PMI-PBA', 'MBA (often)'],
    salary: '$180k–$300k+',
    path: 'Combine technical expertise with management, policy, risk quantification.',
  },
]

const emergingDomains = [
  {
    domain: 'AI/ML Security',
    desc: 'Securing AI models against adversarial attacks, data poisoning, model theft.',
    roles: ['AI Security Engineer', 'ML Trust & Safety', 'Red Team AI'],
    skills: ['PyTorch/TensorFlow internals', 'adversarial ML', 'data lineage'],
  },
  {
    domain: 'Cloud & DevSecOps',
    desc: 'Securing cloud-native infrastructure, IaC, CI/CD pipelines, containers.',
    roles: ['Cloud Security Engineer', 'DevSecOps Engineer', 'Kubernetes Security Specialist'],
    skills: ['AWS/Azure/GCP security', 'Terraform', 'Kubernetes', 'SAST/DAST'],
  },
  {
    domain: 'IoT & OT Security',
    desc: 'Protecting industrial control systems, medical devices, smart infrastructure.',
    roles: ['ICS/SCADA Security Engineer', 'IoT Pentester', 'OT Security Analyst'],
    skills: ['Modbus, PROFINET', 'air-gap bypass techniques', 'embedded firmware analysis'],
  },
  {
    domain: 'Quantum-Resistant Security',
    desc: 'Preparing migration to post-quantum cryptography, quantum key distribution.',
    roles: ['PQC Migration Engineer', 'Quantum Security Researcher'],
    skills: ['lattice-based crypto', 'NIST PQC standards', 'crypto-agility design'],
  },
  {
    domain: 'Threat Intelligence & Hunting',
    desc: 'Proactive detection through intelligence-driven analysis, ATT&CK mapping.',
    roles: ['Threat Intelligence Analyst', 'Threat Hunter', 'TI Platform Engineer'],
    skills: ['MITRE ATT&CK', 'OSINT', 'YARA/Sigma rules', 'threat feeds'],
  },
  {
    domain: 'Application Security',
    desc: 'Secure code review, SDLC integration, bug bounty program management.',
    roles: ['AppSec Engineer', 'Security Champion', 'Product Security Engineer'],
    skills: ['SAST/DAST/IAST', 'secure coding', 'threat modeling', 'code review'],
  },
]

const commonCerts = [
  {
    name: 'CompTIA Security+',
    level: 'Foundational',
    cost: '$392',
    duration: '6–12 weeks prep',
    value: 'Entry-level, DoD 8570 compliant, broad overview.',
    who: 'Newcomers to cybersecurity, IT professionals transitioning.',
  },
  {
    name: 'CISSP (Certified Information Systems Security Professional)',
    level: 'Advanced',
    cost: '$749',
    duration: '4–6 months prep',
    value: 'Gold standard, management-focused, globally recognized.',
    who: 'Security engineers, architects, managers with 5+ years experience.',
  },
  {
    name: 'OSCP (Offensive Security Certified Professional)',
    level: 'Advanced',
    cost: '$1,499',
    duration: '3–6 months prep',
    value: 'Hands-on penetration testing, practical exam (24-hour lab).',
    who: 'Penetration testers, red teamers, bug bounty hunters.',
  },
  {
    name: 'CEH (Certified Ethical Hacker)',
    level: 'Intermediate',
    cost: '$1,299',
    duration: '2–3 months prep',
    value: 'Broad tool coverage, recognized by government agencies.',
    who: 'Entry-to-mid pentesters, compliance requirements.',
  },
  {
    name: 'AWS/Azure Security Specialties',
    level: 'Intermediate',
    cost: '$300',
    duration: '1–2 months prep',
    value: 'Cloud-specific security expertise, high demand.',
    who: 'Cloud engineers migrating to security roles.',
  },
  {
    name: 'GCIH / GCFA / GREM (GIAC)',
    level: 'Advanced',
    cost: '$2,495 (exam+course)',
    duration: '2–4 months prep',
    value: 'Incident response, forensics, malware analysis specialization.',
    who: 'SOC analysts, DFIR practitioners, threat analysts.',
  },
]

const certRoadmap = [
  { step: '1', title: 'Start with Fundamentals', cert: 'CompTIA Security+ or CISSP (if experienced)', why: 'Builds broad foundation across all domains.' },
  { step: '2', title: 'Choose Your Specialization', cert: 'OSCP (offensive) / CISSP (defensive/architect) / Cloud Certs', why: 'Deep expertise in chosen track.' },
  { step: '3', title: 'Gain Hands-on Experience', activity: 'Bug bounties, CTFs, lab work, real projects', why: 'Certifications complement practical skills, not replace them.' },
  { step: '4', title: 'Advance to Expert Level', cert: 'CISSP-ISSAP, OSCE, or vendor-specific master certs', why: 'Distinguish as subject matter expert.' },
]

export default function CareerPathsFuturePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple text-xs font-medium font-mono mb-4">
          <i className="ri-compass-3-line" />
          Module 17 of 20 — Professional Practice
        </div>
        <DocHeading level={1}>Career Paths & The Future of Cybersecurity</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Cybersecurity offers diverse career paths from hands-on technical roles to executive leadership.
          This module explores role specializations, in-demand skills, industry certifications,
          and emerging domains shaping the future of the profession.
        </p>
      </motion.div>

      {/* Cybersecurity Career Ladder */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Cybersecurity Career Progression</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Career paths follow a progression from operational to strategic responsibilities.
          Each role requires overlapping skills plus domain expertise.
        </p>

        <div className="mt-6 space-y-4">
          {cybersecurityRoles.map((role, idx) => (
            <div key={role.role} className="cyber-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyber-purple/10 border border-cyber-purple/20 flex items-center justify-center shrink-0 font-bold text-cyber-purple">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-1">{role.role}</h3>
                  <p className="text-xs text-cyber-text mb-3">{role.focus}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                    <div className="p-2 rounded bg-cyber-bg border border-cyber-border">
                      <span className="font-semibold text-cyber-cyan">Certs:</span>
                      <span className="text-cyber-text ml-1">{role.certs.join(', ')}</span>
                    </div>
                    <div className="p-2 rounded bg-cyber-bg border border-cyber-border">
                      <span className="font-semibold text-cyber-green">Salary:</span>
                      <span className="text-cyber-text ml-1">{role.salary}</span>
                    </div>
                    <div className="p-2 rounded bg-cyber-bg border border-cyber-border md:col-span-2 lg:col-span-1">
                      <span className="font-semibold text-cyber-amber">Path:</span>
                      <span className="text-cyber-text ml-1">{role.path}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Emerging Domains */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Emerging Specializations</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          New domains appear as technology evolves. Early specialization in emerging fields
          creates high-demand expertise before talent supply catches up.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergingDomains.map((domain) => (
            <div key={domain.domain} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-green mb-2">{domain.domain}</h3>
              <p className="text-xs text-cyber-text mb-3">{domain.desc}</p>
              <div className="text-xs space-y-2">
                <div>
                  <span className="font-semibold text-white">Roles:</span>
                  <span className="text-cyber-text ml-1">{domain.roles.join(', ')}</span>
                </div>
                <div>
                  <span className="font-semibold text-cyber-cyan">Skills:</span>
                  <span className="text-cyber-text ml-1">{domain.skills.join(', ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Certifications Guide */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Industry Certifications Guide</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Certifications validate knowledge and signal competence to employers.
          Choose based on current skill level and career track.
        </p>

        <div className="mt-6 space-y-4">
          {commonCerts.map((cert) => (
            <div key={cert.name} className="cyber-card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">{cert.name}</h3>
                  <p className="text-xs text-cyber-cyan mt-0.5">{cert.level} • {cert.cost} • {cert.duration}</p>
                </div>
              </div>
              <p className="text-xs text-cyber-text mt-2">{cert.value}</p>
              <div className="mt-2 p-2 rounded bg-cyber-red/5 border border-cyber-red/10">
                <span className="text-xs font-semibold text-cyber-red">Best for:</span>
                <span className="text-xs text-cyber-text ml-1">{cert.who}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Certification Roadmap */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Strategic Certification Roadmap</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Plan your certification journey around experience, not just exams.
        </p>

        <div className="mt-6 space-y-3">
          {certRoadmap.map((step) => (
            <div key={step.step} className="flex gap-4 p-3 rounded-lg bg-cyber-bg border border-cyber-border">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-7 h-7 rounded-full bg-cyber-purple/10 border border-cyber-purple/20 flex items-center justify-center text-cyber-purple text-xs font-bold font-mono">
                  {step.step}
                </div>
                {parseInt(step.step) < 4 && (
                  <div className="w-px flex-1 bg-cyber-border mt-1" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white">{step.title}</h4>
                <p className="text-xs text-cyber-cyan mt-0.5">{step.cert}</p>
                <p className="text-xs text-cyber-text mt-1">{step.why}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Building Skills Outside Certifications */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Beyond Certifications: Building Real Skills</DocHeading>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Capture The Flag (CTF) Competitions',
              desc: 'HackTheBox, TryHackMe, CTFtime events provide hands-on challenges across domains.',
              action: 'Complete 50+ labs, participate in live CTFs monthly.',
            },
            {
              title: 'Bug Bounty Programs',
              desc: 'HackerOne, Bugcrowd, private programs offer real-world disclosure experience.',
              action: 'Report at least 3 valid vulnerabilities across different platforms.',
            },
            {
              title: 'Open Source Contributions',
              desc: 'Fix security bugs in open-source tools, write detection rules, improve docs.',
              action: 'Merge at least 5 PRs to security-related repositories.',
            },
            {
              title: 'Home Lab Practice',
              desc: 'Deploy vulnerable VMs (Metasploitable, DVWA), build your own CI/CD pipeline.',
              action: 'Document at least 10 labs with detailed writeups.',
            },
            {
              title: 'Security Blogging / Research',
              desc: 'Write about findings, tools, threat analysis. Build public portfolio.',
              action: 'Publish 6 technical blog posts per year.',
            },
            {
              title: 'Mentorship & Community',
              desc: 'Join local OWASP chapters, BSides events, Discord communities.',
              action: 'Present at least once at a local meetup or conference.',
            },
          ].map((item) => (
            <div key={item.title} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-cyber-text mb-2">{item.desc}</p>
              <Callout type="info" className="mt-2">
                <span className="text-xs">{item.action}</span>
              </Callout>
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
            <span><strong>Cybersecurity careers</strong> span operational (analyst), technical (engineer), and strategic (architect/CISO) tracks.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Certifications complement experience</strong>—they validate knowledge but do not replace hands-on skills.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Emerging domains</strong> (AI security, quantum, IoT) reward early specialization.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Build a portfolio</strong> through CTFs, bug bounties, open-source contributions, and blogging.</span>
          </li>
        </ul>
      </motion.section>

      {/* Navigation */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3 justify-between items-center">
          <a href="/cybersecurity/security-architecture" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Module 16
          </a>
          <a href="/cybersecurity/compliance-legal-ethics" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Compliance & Legal <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  )
}
