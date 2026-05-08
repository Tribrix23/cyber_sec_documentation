'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const sharedResponsibility = [
  {
    cloudProvider: 'Infrastructure',
    provider: 'Physical security, hypervisor, network controls, managed services.',
    customer: 'Configure services securely, patch OS, manage applications.',
  },
  {
    cloudProvider: 'Virtualization',
    provider: 'Host OS, VM isolation, container runtime security.',
    customer: 'Guest OS hardening, runtime protections, container security.',
  },
  {
    cloudProvider: 'Managed Services',
    provider: 'Database, storage, serverless function isolation.',
    customer: 'Access control, data encryption, input validation.',
  },
];

const cisBenchmarks = [
  {
    service: 'AWS',
    keyControls: 'IAM policies, S3 bucket permissions, security groups, CloudTrail logging.',
    tools: 'Prowler, ScoutSuite, Pacu',
  },
  {
    service: 'Azure',
    keyControls: 'Azure AD, NSGs, storage accounts, Key Vault configuration.',
    tools: 'Azucar, Stormspotter, ROADtools',
  },
  {
    service: 'GCP',
    keyControls: 'Cloud IAM, VPC firewall rules, storage buckets, audit logs.',
    tools: 'GCP Scanner, Forseti, Gopher',
  },
];

const containerSecurity = [
  {
    layer: 'Image',
    risks: 'Vulnerable base images, embedded secrets, outdated packages.',
    mitigation: 'Scan images with Trivy/Clair. Use distroless images. Multi-stage builds.',
  },
  {
    layer: 'Registry',
    risks: 'Unauthenticated pull, unsigned images, no access control.',
    mitigation: 'Private registries. Image signing (cosign). RBAC on registry.',
  },
  {
    layer: 'Runtime',
    risks: 'Privilege escalation, container escape, resource exhaustion.',
    mitigation: 'Non-root users. Read-only root FS. seccomp/AppArmor profiles.',
  },
  {
    layer: 'Orchestration',
    risks: 'RBAC misconfiguration, network policies, privileged pods.',
    mitigation: 'RBAC least privilege. Network policies. PodSecurityPolicies/PSA.',
  },
];

const devopsAttackSurface = [
  {
    component: 'Source Code',
    threats: 'Credential leakage, malicious commits, dependency confusion.',
    controls: 'Pre-commit hooks, signed commits, SCA scanning, CODEOWNERS.',
  },
  {
    component: 'Build Pipeline',
    threats: 'Supply chain compromise, build cache poisoning, env variable exposure.',
    controls: 'Isolated runners. Credential scanning. SBOM generation.',
  },
  {
    component: 'Artifact Storage',
    threats: 'Tampered releases, vulnerable dependencies, unsigned packages.',
    controls: 'Immutable tags. Attestations. Vulnerability gates.',
  },
  {
    component: 'Deployment',
    threats: 'Misconfigured IAM, exposed secrets, drift from approved state.',
    controls: 'GitOps. Policy as code (OPA). Post-deploy verification.',
  },
];

export default function CloudDevOpsSecurityPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-cloud-line" />
          Module 12 of 20 — Offensive Security
        </div>
        <DocHeading level={1}>Cloud Security & DevOps Security</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Cloud computing and DevOps practices have transformed how organizations build and deploy
          applications. This creates a new attack surface spanning infrastructure as code, container
          images, CI/CD pipelines, and cloud service configurations. Understanding shared responsibility
          and implementing security throughout the software lifecycle is essential.
        </p>
      </motion.div>

      {/* Shared Responsibility */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Cloud Shared Responsibility Model</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          The shared responsibility model defines what security tasks are handled by the cloud provider
          versus the customer. Confusion leads to misconfigurations and breaches.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {sharedResponsibility.map((sr) => (
            <div key={sr.cloudProvider} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-3">{sr.cloudProvider}</h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-white">Provider:</span>
                  <p className="text-cyber-text">{sr.provider}</p>
                </div>
                <div>
                  <span className="font-semibold text-cyber-green">Customer:</span>
                  <p className="text-cyber-text">{sr.customer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* CIS Benchmarks */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>CIS Benchmarks for Cloud Platforms</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Center for Internet Security (CIS) benchmarks provide consensus security guidelines for
          cloud platforms. Automated tools scan configurations against these benchmarks.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {cisBenchmarks.map((cis) => (
            <div key={cis.service} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-amber mb-2">{cis.service}</h3>
              <p className="text-xs text-cyber-text mb-2">{cis.keyControls}</p>
              <p className="text-xs font-mono text-cyber-cyan">{cis.tools}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Container Security */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Container Security Layers</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Container security requires protection at every layer. Each layer has distinct risks
          and corresponding security controls.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {containerSecurity.map((layer) => (
            <div key={layer.layer} className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-white mb-2">{layer.layer}</h3>
              <p className="text-xs text-cyber-red mb-2">{layer.risks}</p>
              <p className="text-xs text-cyber-green">{layer.mitigation}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* DevOps Attack Surface */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>DevOps Security Attack Surface</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Modern software supply chains are complex. Each component from source to production
          represents potential attack vectors.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {devopsAttackSurface.map((component) => (
            <div key={component.component} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-purple mb-2">{component.component}</h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-cyber-red">Threats:</span>
                  <p className="text-cyber-text">{component.threats}</p>
                </div>
                <div>
                  <span className="font-semibold text-cyber-green">Controls:</span>
                  <p className="text-cyber-text">{component.controls}</p>
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
            <span><strong>Shared responsibility</strong> means you secure what you configure and deploy.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Infrastructure as Code</strong> should be scanned for misconfigurations before deployment.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Container images</strong> must be scanned for vulnerabilities and signed for integrity.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>CI/CD pipelines</strong> are high-value targets—secure with least privilege and scanning.</span>
          </li>
        </ul>
      </motion.section>

      {/* Navigation */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="flex gap-3 justify-between items-center">
                <div className="text-sm text-cyber-text">
                  <i className="ri-book-open-line" /> Module 12 of 20
                </div>
                <div className="flex gap-3">
                  <a href="/cybersecurity/wireless-network-security" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
                    <i className="ri-arrow-left-line mr-1" /> Wireless & Network Security
                  </a>
                  <a href="/cybersecurity/quiz-3" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
                    Next: Quiz 3 <i className="ri-arrow-right-line ml-1" />
                  </a>
                </div>
              </div>
            </motion.section>
    </div>
  );
}