'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const securityPrinciples = [
  {
    principle: 'Zero Trust',
    desc: 'Never trust, always verify. Authenticate and authorize every request.',
    example: 'Google BeyondCorp model—employees access internal apps from any network with device trust scoring.',
    implementation: 'Micro-segmentation, identity-aware proxy, continuous validation.',
  },
  {
    principle: 'Defense in Depth',
    desc: 'Multiple overlapping controls so single failure doesn\'t compromise security.',
    example: 'Firewall + IDS + EDR + SIEM + Security Awareness all protecting the same asset.',
    implementation: 'Layered architecture, redundant controls, fail-closed design.',
  },
  {
    principle: 'Fail-Secure',
    desc: 'Systems default to secure state when failure occurs.',
    example: 'Door locks engage on power loss rather than unlock.',
    implementation: 'Fail-safe defaults in configuration, automatic lockdown on error.',
  },
  {
    principle: 'Least Privilege',
    desc: 'Grant minimum permissions necessary for function.',
    example: 'AWS IAM policies scoped to specific resources and actions.',
    implementation: 'Role-based access, just-in-time access, regular permission reviews.',
  },
  {
    principle: 'Secure by Design',
    desc: 'Security built into architecture from inception, not added later.',
    example: 'Threat modeling during design phase, security requirements in user stories.',
    implementation: 'Security architects in design reviews, threat modeling, security testing.',
  },
];

const architecturePatterns = [
  {
    pattern: 'Demilitarized Zone (DMZ)',
    purpose: 'Isolate external-facing services from internal network.',
    components: 'Web server, application server, reverse proxy, jump host.',
    risks: 'Lateral movement if compromised, insider threat from zone.',
  },
  {
    pattern: 'Air Gap',
    purpose: 'Physically isolate critical systems from other networks.',
    components: 'Dedicated hardware, data diodes, removable media procedures.',
    risks: 'Human error during data transfer, supply chain for removable media.',
  },
  {
    pattern: 'Microsegmentation',
    purpose: 'Fine-grained network isolation using software-defined perimeters.',
    components: 'Software firewalls, service mesh, identity-aware proxies.',
    risks: 'Policy complexity, east-west traffic visibility gaps.',
  },
  {
    pattern: 'Security Orchestration',
    purpose: 'Automate security responses across multiple tools.',
    components: 'SOAR platform, playbooks, integrated security tools.',
    risks: 'False positives triggering disruptive actions, tool dependency.',
  },
];

const threatModeling = [
  {
    method: 'STRIDE',
    desc: 'Categorizes threats: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege.',
    steps: 'Identify assets, trust boundaries, data flows, then apply STRIDE to each flow.',
    tools: 'Microsoft Threat Modeling Tool, OWASP Threat Dragon.',
  },
  {
    method: 'PASTA',
    desc: 'Seven-step process linking business objectives to attacker techniques.',
    steps: 'Define objectives, technical scope, application decomposition, threat analysis, attack modeling, risk analysis, countermeasure definition.',
    tools: 'RiskWatch, threat modeling spreadsheets.',
  },
  {
    method: 'OCTAVE',
    desc: 'Operationally Critical Threat, Asset, and Vulnerability Evaluation focuses on organization risk.',
    steps: 'Build risk-based security strategy, identify assets and vulnerabilities, analyze risks, develop mitigation plan.',
    tools: 'OCTAVE Allegro, self-assessment worksheets.',
  },
];

const securityMetrics = [
  {
    category: 'Detection',
    metrics: [
      'Mean Time to Detect (MTTD) - Target: < 24 hours',
      'Detection accuracy - True positive rate vs false positive rate',
      'Coverage percentage - Assets monitored vs total assets',
    ],
  },
  {
    category: 'Response',
    metrics: [
      'Mean Time to Respond (MTTR) - Target: < 1 hour for critical',
      'Automation rate - Percentage of alerts handled automatically',
      'Containment effectiveness - Lateral movement prevented',
    ],
  },
  {
    category: 'Prevention',
    metrics: [
      'Patch compliance - Percentage of systems up to date',
      'Security test pass rate - Applications passing security gates',
      'Training completion - Staff completing security awareness',
    ],
  },
];

export default function SecurityArchitecturePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-building-2-line" />
          Module 16 of 20 — Advanced Domains
        </div>
        <DocHeading level={1}>Security Architecture & Design Principles</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Security architecture translates principles into technical implementations.
          Well-designed systems are resilient by default, with clear trust boundaries
          and failure modes. This module covers architectural patterns, threat
          modeling, and design principles for secure systems.
        </p>
      </motion.div>

      {/* Security Principles */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Fundamental Security Principles</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          These principles guide secure architecture design. They are timeless
          guidelines rather than specific technologies.
        </p>

        <div className="mt-6 space-y-4">
          {securityPrinciples.map((principle) => (
            <div key={principle.principle} className="cyber-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center shrink-0">
                  <i className="ri-shield-check-line text-cyber-cyan" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-1">{principle.principle}</h3>
                  <p className="text-xs text-cyber-text mb-2">{principle.desc}</p>
                  <div className="p-2 rounded bg-cyber-bg border border-cyber-border mb-2">
                    <span className="text-xs font-semibold text-cyber-amber">Example:</span>
                    <span className="text-xs text-cyber-text"> {principle.example}</span>
                  </div>
                  <div className="p-2 rounded bg-cyber-green/5 border border-cyber-green/10">
                    <span className="text-xs font-semibold text-cyber-green">How:</span>
                    <span className="text-xs text-cyber-text"> {principle.implementation}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Architecture Patterns */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Security Architecture Patterns</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Patterns provide proven structures for common security requirements.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {architecturePatterns.map((pattern) => (
            <div key={pattern.pattern} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-amber mb-2">{pattern.pattern}</h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-white">Purpose:</span>
                  <span className="text-cyber-text"> {pattern.purpose}</span>
                </div>
                <div>
                  <span className="font-semibold text-cyber-cyan">Components:</span>
                  <span className="text-cyber-text"> {pattern.components}</span>
                </div>
                <div className="p-2 rounded bg-cyber-red/5 border border-cyber-red/10">
                  <span className="font-semibold text-cyber-red">Risks:</span>
                  <span className="text-cyber-text"> {pattern.risks}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Threat Modeling */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Threat Modeling Methods</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Threat modeling identifies potential attacks before implementation.
          Choose methods based on audience and design stage.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {threatModeling.map((method) => (
            <div key={method.method} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-purple mb-2">{method.method}</h3>
              <p className="text-xs text-cyber-text mb-2">{method.desc}</p>
              <div className="text-xs space-y-1">
                <p><span className="font-semibold text-white">Steps:</span> {method.steps}</p>
                <p><span className="font-semibold text-cyber-cyan">Tools:</span> {method.tools}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Security Metrics */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Security Metrics & KPIs</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Measuring security effectiveness requires metrics tied to business outcomes.
        </p>

        <div className="mt-6 space-y-4">
          {securityMetrics.map((metric) => (
            <div key={metric.category} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-white mb-3">{metric.category} Metrics</h3>
              <ul className="text-xs text-cyber-text space-y-1 list-disc list-inside">
                {metric.metrics.map((m) => (
                  <li key={m}>{m}</li>
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
            <span><strong>Zero Trust and Defense in Depth</strong> are foundational architectural principles.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Threat modeling during design</strong> prevents expensive rework later.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Architecture patterns</strong> provide proven structures for common requirements.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Metrics drive improvement</strong>—track MTTD, MTTR, and prevention rates.</span>
          </li>
        </ul>
      </motion.section>

      {/* Navigation */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3 justify-between items-center">
          <a href="/cybersecurity/encryption-cryptanalysis" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Module 15
          </a>
          <a href="/cybersecurity/quiz-4" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Quiz 4 <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  );
}