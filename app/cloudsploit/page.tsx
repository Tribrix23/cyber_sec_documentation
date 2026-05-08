'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const sections = [
  {
    path: '/cloudsploit/command-builder',
    title: 'Command Builder',
    desc: 'Interactive tool to toggle flags, select services, and generate Cloudsploit scan commands.',
    icon: 'ri-tools-line',
  },
  {
    path: '/cloudsploit/installation',
    title: 'Installation',
    desc: 'Install Cloudsploit via npm, Docker, or source. Get up and running quickly on any platform.',
    icon: 'ri-download-line',
  },
  {
    path: '/cloudsploit/configuration',
    title: 'Configuration',
    desc: 'Set up API credentials for AWS, Azure, and GCP. Configure detectors, regions, and scan settings.',
    icon: 'ri-settings-3-line',
  },
  {
    path: '/cloudsploit/running-scans',
    title: 'Running Scans',
    desc: 'Start your first cloud security scan. Learn scan modes, targets, and basic options.',
    icon: 'ri-play-line',
  },
  {
    path: '/cloudsploit/aws-scanners',
    title: 'AWS Scanners',
    desc: 'Complete guide to AWS detectors: IAM, S3, EC2, RDS, Lambda, VPC, CloudTrail, and more.',
    icon: 'ri-amazon-line',
  },
  {
    path: '/cloudsploit/azure-scanners',
    title: 'Azure Scanners',
    desc: 'Azure security detectors: Storage, Key Vault, SQL, App Service, Active Directory, and more.',
    icon: 'ri-microsoft-line',
  },
  {
    path: '/cloudsploit/gcp-scanners',
    title: 'GCP Scanners',
    desc: 'Google Cloud security checks: Compute Engine, Cloud Storage, IAM, BigQuery, and more.',
    icon: 'ri-google-line',
  },
  {
    path: '/cloudsploit/detectors',
    title: 'Detector Reference',
    desc: 'Full list of all security detectors, what they check, severity levels, and remediation steps.',
    icon: 'ri-search-eye-line',
  },
  {
    path: '/cloudsploit/command-flags',
    title: 'Command Flags',
    desc: 'Complete reference of all CLI options: regions, services, output formats, and advanced settings.',
    icon: 'ri-flag-line',
  },
  {
    path: '/cloudsploit/output-formats',
    title: 'Output Formats',
    desc: 'Export scan results to JSON, CSV, HTML, JUnit, and more. Integrate with CI/CD pipelines.',
    icon: 'ri-file-list-3-line',
  },
  {
    path: '/cloudsploit/examples',
    title: 'Examples',
    desc: 'Real-world scan commands for AWS account audit, Azure tenant scan, GCP project review, and CI/CD integration.',
    icon: 'ri-file-list-line',
  },
  {
    path: '/cloudsploit/pro-tips',
    title: 'Pro Tips',
    desc: 'Expert advice on scan scheduling, custom detectors, rate limiting, false positive management, and automation.',
    icon: 'ri-lightbulb-line',
  },
  {
    path: '/cloudsploit/ci-cd',
    title: 'CI/CD Integration',
    desc: 'Integrate Cloudsploit into GitHub Actions, GitLab CI, Jenkins, and other pipelines.',
    icon: 'ri-git-branch-line',
  },
  {
    path: '/cloudsploit/quiz',
    title: 'Cloudsploit Quiz',
    desc: 'Test your cloud security scanning knowledge with 20+ multiple-choice questions.',
    icon: 'ri-questionnaire-line',
  },
  {
    path: '/cloudsploit/lab',
    title: 'Cloudsploit Lab',
    desc: 'Hands-on exercises: scan mock environments, interpret findings, and practice remediation.',
    icon: 'ri-flask-line',
  },
];

export default function CloudsploitLandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
            <i className="ri-shield-keyhole-line" />
            Cloud Security Scanning
          </div>
          <DocHeading level={1}>Cloudsploit</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3 text-lg">
            <strong className="text-cyber-cyan">Cloudsploit</strong> by Aqua Security is a cloud security scanner that detects misconfigurations and compliance issues across AWS, Azure, and Google Cloud Platform. It reviews cloud resources against security best practices and industry standards like CIS benchmarks.
          </p>
          <p className="text-cyber-text leading-relaxed mt-3 text-lg">
            Cloudsploit scans your cloud infrastructure for hundreds of security issues including exposed S3 buckets, overly permissive security groups, unencrypted databases, weak IAM policies, public storage containers, and many more. It provides detailed remediation guidance to help you secure your cloud environment.
          </p>
        </motion.div>

        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-lg font-semibold text-white mb-4">Module Sections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sections.map((s) => (
              <a
                key={s.path}
                href={s.path}
                className="cyber-card p-4 hover:border-cyber-cyan/50 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-cyber-bg-card border border-cyber-border flex items-center justify-center flex-shrink-0 text-cyber-cyan group-hover:bg-cyber-cyan/10 transition-colors">
                    <i className={s.icon} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-cyber-cyan transition-colors">{s.title}</h3>
                    <p className="text-xs text-cyber-text mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </motion.section>

        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Start</h2>
          <div className="cyber-card p-5">
            <p className="text-sm text-cyber-text mb-3">
              New to Cloudsploit? Start with these three sections in order:
            </p>
            <ol className="space-y-2">
              {[
                { num: '1', title: 'Installation', desc: 'Install Cloudsploit via npm, Docker, or source.', path: '/cloudsploit/installation' },
                { num: '2', title: 'Configuration', desc: 'Set up cloud provider credentials and scan settings.', path: '/cloudsploit/configuration' },
                { num: '3', title: 'Running Scans', desc: 'Execute your first cloud security scan and review results.', path: '/cloudsploit/running-scans' },
              ].map((step) => (
                <li key={step.num}>
                  <a href={step.path} className="flex items-center gap-3 p-3 rounded-lg bg-cyber-bg border border-cyber-border hover:border-cyber-cyan/50 transition-all">
                    <span className="w-7 h-7 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan text-xs font-bold flex-shrink-0">
                      {step.num}
                    </span>
                    <div>
                      <span className="text-sm font-semibold text-white">{step.title}</span>
                      <p className="text-xs text-cyber-text">{step.desc}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </motion.section>

        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Key Features</h3>
            <ul className="space-y-2 text-sm text-cyber-text">
              <li className="flex items-start gap-2">
                <i className="ri-check-line text-cyber-cyan mt-0.5" />
                <span><strong className="text-white">Multi-Cloud Support:</strong> Scan AWS, Azure, and GCP from a single tool</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-check-line text-cyber-cyan mt-0.5" />
                <span><strong className="text-white">500+ Security Checks:</strong> CIS benchmarks, vendor best practices, and custom rules</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-check-line text-cyber-cyan mt-0.5" />
                <span><strong className="text-white">Zero Configuration:</strong> Auto-discovers resources in your cloud account</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-check-line text-cyber-cyan mt-0.5" />
                <span><strong className="text-white">Detailed Remediation:</strong> Step-by-step guidance to fix each finding</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-check-line text-cyber-cyan mt-0.5" />
                <span><strong className="text-white">CI/CD Integration:</strong> Run scans in pipelines, fail builds on critical issues</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-check-line text-cyber-cyan mt-0.5" />
                <span><strong className="text-white">Custom Detectors:</strong> Write your own JavaScript security checks</span>
              </li>
            </ul>
          </div>
        </motion.section>

        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/cloudsploit/installation" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Installation <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
        </motion.section>
      </div>
  );
}
