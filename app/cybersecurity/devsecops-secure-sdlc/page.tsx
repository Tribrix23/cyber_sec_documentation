'use client'
import { useEffect } from 'react'
import DocHeading from '@/components/base/DocHeading'
import Callout from '@/components/base/Callout'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const secureSdlcPhases = [
  {
    phase: 'Requirements Gathering',
    activities: [
      'Define security requirements alongside functional requirements',
      'Identify compliance obligations (GDPR, HIPAA, PCI)',
      'Perform high-level threat modeling',
      'Define security acceptance criteria',
    ],
    deliverables: ['Security requirements document', 'Initial threat model', 'Compliance checklist', 'Abuse cases'],
  },
  {
    phase: 'Architecture & Design',
    activities: [
      'Detailed threat modeling (STRIDE/PASTA)',
      'Security architecture review',
      'Data flow analysis and trust boundary identification',
      'Select security patterns and controls',
    ],
    deliverables: ['Threat model report', 'Security architecture diagram', 'Risk register', 'Mitigation plan'],
  },
  {
    phase: 'Implementation / Coding',
    activities: [
      'Secure coding standards enforcement',
      'Static Application Security Testing (SAST)',
      'Pre-commit security hooks (secrets scanning)',
      'Peer code reviews with security focus',
    ],
    tools: ['SonarQube', 'Semgrep', 'Bandit', 'GitLeaks', 'CodeQL', 'Checkmarx'],
  },
  {
    phase: 'Testing',
    activities: [
      'Dynamic Application Security Testing (DAST)',
      'Software Composition Analysis (SCA)',
      'Dependency vulnerability scanning',
      'Interactive Application Security Testing (IAST)',
      'Penetration testing (before release)',
    ],
    tools: ['OWASP ZAP', 'Burp Suite', 'Snyk', 'Dependabot', 'Trivy', 'Aqua'],
  },
  {
    phase: 'Deployment & Release',
    activities: [
      'Infrastructure as Code (IaC) scanning',
      'Container image signing and verification',
      'Runtime Application Self-Protection (RASP)',
      'Secret management and key rotation',
      'Compliance gate verification',
    ],
    tools: ['cosign', 'Notary', 'HashiCorp Vault', 'OPA/Gatekeeper', 'Falco'],
  },
  {
    phase: 'Maintenance & Operations',
    activities: [
      'Continuous monitoring and logging',
      'Patch management and vulnerability remediation',
      'Security incident response readiness',
      'Periodic security audits and assessments',
    ],
    tools: ['SIEM', 'EDR', 'WAF', 'CIS Benchmarks', 'OpenSCAP'],
  },
]

const shiftLeftPractices = [
  {
    practice: 'Security Requirements in User Stories',
    desc: 'Include acceptance criteria for authentication, authorization, input validation, encryption, logging.',
    impact: 'Catch missing security controls at earliest stage—cost to fix is 6–15× lower than post-deployment.',
  },
  {
    practice: 'Threat Modeling Early',
    desc: 'Conduct threat modeling during design phase, before any code is written.',
    impact: 'Architectural fixes cost 30–100× less than re-architecting after deployment.',
  },
  {
    practice: 'Automated Security Gates',
    desc: 'SAST/DAST/SCA in CI/CD pipeline—fail build on critical vulnerabilities.',
    impact: 'Prevents vulnerable code from reaching production; shifts detection from weeks to minutes.',
  },
  {
    practice: 'Developer Security Training',
    desc: 'Regular secure coding workshops, OWASP Top 10 training, code review mentoring.',
    impact: 'Prevents vulnerabilities at source—developer education reduces defect density by 40–60%.',
  },
]

const cicdSecurity = [
  {
    stage: 'Source',
    controls: ['Branch protection (no force push)', 'Code ownership and review requirements', 'Secret scanning (pre-commit hooks)', 'Signed commits verification'],
  },
  {
    stage: 'Build',
    controls: ['SAST scanning', 'Dependency vulnerability check (SCA)', 'Software Bill of Materials (SBOM) generation', 'Container image scanning'],
  },
  {
    stage: 'Test',
    controls: ['DAST scanning', 'Integration security tests', 'Infrastructure compliance checks (terraform validate)', 'Secrets detection'],
  },
  {
    stage: 'Deploy',
    controls: ['Image signing (cosign)', 'Policy checks (OPA/Kyverno)', 'Canary rollout with monitoring', 'Runtime security enforcement'],
  },
  {
    stage: 'Run',
    controls: ['Runtime behavior monitoring (Falco)', 'WAF rule enforcement', 'Anomaly detection', 'Audit logging to SIEM'],
  },
]

const containerSecurity = [
  {
    layer: 'Base Image',
    concern: 'Vulnerable OS packages, unnecessary utilities, root user.',
    fix: 'Use minimal images (Alpine, distroless), non-root user, regular updates.',
  },
  {
    layer: 'Dependencies',
    concern: 'Vulnerable libraries (Log4Shell), outdated packages.',
    fix: 'SCA scanning (Trivy, Snyk), automated dependency updates, SBOM inventory.',
  },
  {
    layer: 'Runtime',
    concern: 'Privilege escalation, container escape, resource exhaustion.',
    fix: 'Seccomp/AppArmor profiles, read-only filesystems, resource limits, user namespaces.',
  },
  {
    layer: 'Orchestration',
    concern: 'Kubernetes misconfigurations (privileged pods, hostPath mounts).',
    fix: 'K8s security scanners (kubesec), PodSecurity Standards, network policies, RBAC.',
  },
]

export default function DevSecOpsSecureSdlcPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple text-xs font-medium font-mono mb-4">
          <i className="ri-git-branch-line" />
          Module 18 of 20 — Professional Practice
        </div>
        <DocHeading level={1}>DevSecOps & Secure SDLC</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Modern software delivery requires embedding security throughout the development pipeline.
          DevSecOps combines DevOps velocity with security assurance. This module covers
          secure software development lifecycle practices and CI/CD security automation.
        </p>
      </motion.div>

      {/* SDLC Phases with Security */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Security at Each SDLC Phase</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Security activities map directly to development lifecycle stages. Early integration
          (shift-left) reduces cost and improves efficacy dramatically.
        </p>

        <div className="mt-6 space-y-4">
          {secureSdlcPhases.map((phase) => (
            <div key={phase.phase} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-amber mb-2">{phase.phase}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold text-white">Activities:</span>
                  <ul className="text-xs text-cyber-text mt-1 space-y-1 list-disc list-inside">
                    {phase.activities.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-xs font-semibold text-cyber-cyan">Deliverables:</span>
                  <ul className="text-xs text-cyber-text mt-1 space-y-1 list-disc list-inside">
                    {phase.deliverables?.map((deliv, i) => (
                      <li key={i}>{deliv}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Shift Left Security */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Shift-Left Security Practices</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Shift-left integrates security earlier in development to catch issues before they reach production.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {shiftLeftPractices.map((practice) => (
            <div key={practice.practice} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-green mb-2">{practice.practice}</h3>
              <p className="text-xs text-cyber-text mb-2">{practice.desc}</p>
              <Callout type="success" className="mt-2">
                <span className="text-xs"><strong>Impact:</strong> {practice.impact}</span>
              </Callout>
            </div>
          ))}
        </div>
      </motion.section>

      {/* CI/CD Pipeline Security */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>CI/CD Pipeline Security Controls</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Every pipeline stage introduces security gates. Automation ensures consistency.
        </p>

        <div className="mt-6 space-y-3">
          {cicdSecurity.map((stage) => (
            <div key={stage.stage} className="cyber-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center">
                  <i className="ri-git-pull-request-line text-cyber-cyan" />
                </div>
                <h3 className="text-sm font-semibold text-white">{stage.stage} Stage</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {stage.controls.map((control, i) => (
                  <span key={i} className="px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-xs text-cyber-text">
                    {control}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Container & Kubernetes Security */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Container & Kubernetes Security</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Containerized workloads require hardening at multiple layers—image, runtime, and orchestration.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {containerSecurity.map((layer) => (
            <div key={layer.layer} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-purple mb-2">{layer.layer}</h3>
              <p className="text-xs text-cyber-text mb-2">{layer.concern}</p>
              <div className="p-2 rounded bg-cyber-green/5 border border-cyber-green/10">
                <span className="text-xs font-semibold text-cyber-green">Remediation:</span>
                <span className="text-xs text-cyber-text ml-1">{layer.fix}</span>
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
            <span><strong>Shift-left security</strong> reduces cost by 10–30× compared to post-deployment fixes.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Automated security gates in CI/CD</strong> prevent vulnerable code from reaching production.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Container security spans</strong> base images, dependencies, runtime, and orchestration.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Security as code</strong> enables versioning, review, and automated enforcement.</span>
          </li>
        </ul>
      </motion.section>

      {/* Navigation */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3 justify-between items-center">
          <a href="/cybersecurity/compliance-legal-ethics" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Module 17
          </a>
          <a href="/cybersecurity/threat-intelligence" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Threat Intelligence <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  )
}
