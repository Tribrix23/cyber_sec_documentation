'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Codeblock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';
import Callout from '@/components/base/Callout';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const commandFlags = [
  { flag: '--provider / -p', args: '[aws|azure|gcp|all]', desc: 'Cloud provider to scan (default: all configured)' },
  { flag: '--regions / -r', args: 'comma,separated,list', desc: 'Specific regions to scan (AWS/Azure/GCP)' },
  { flag: '--exclude-regions', args: 'comma,separated,list', desc: 'Regions to skip' },
  { flag: '--services / -s', args: 'comma,separated,list', desc: 'Only scan specific services (e.g., s3,ec2,iam)' },
  { flag: '--exclude-services', args: 'comma,separated,list', desc: 'Skip specified services' },
  { flag: '--suppress', args: 'DETECTOR_ID1,DETECTOR_ID2', desc: 'Suppress specific detector IDs (comma-separated)' },
  { flag: '--suppress-file', args: '/path/to/file.txt', desc: 'File containing detector IDs to suppress (one per line)' },
  { flag: '--severity', args: 'critical,high,medium,low', desc: 'Only report findings at or above this severity' },
  { flag: '--output / -o', args: '[table|json|csv|html|junit]', desc: 'Output format (default: table)' },
  { flag: '--outfile', args: '/path/to/file.ext', desc: 'Write output to specified file' },
  { flag: '--config', args: '/path/to/config.json', desc: 'Path to custom configuration file' },
  { flag: '--profile', args: 'profile_name', desc: 'AWS/Azure profile name to use' },
  { flag: '--account-name', args: '"Account Label"', desc: 'Friendly name for cloud account in reports' },
  { flag: '--threads / -t', args: 'NUMBER', desc: 'Number of concurrent scan threads (default: 10)' },
  { flag: '--timeout', args: 'MILLISECONDS', desc: 'API call timeout (default: 30000)' },
  { flag: '--retry', args: 'NUMBER', desc: 'Number of retries for failed API calls (default: 3)' },
  { flag: '--rate-limit', args: 'NUMBER', desc: 'API calls per second limit per region' },
  { flag: '--quick', args: '', desc: 'Run quick scan with common detectors only' },
  { flag: '--comprehensive', args: '', desc: 'Run all detectors across all regions' },
  { flag: '--compliance', args: '[cis|nist|pci|hipaa]', desc: 'Run compliance-specific checks only' },
  { flag: '--dry-run', args: '', desc: 'Show what would be scanned without executing' },
  { flag: '--list-detectors', args: '', desc: 'List all available detectors and exit' },
  { flag: '--list-resources', args: '', desc: 'List discovered resources without scanning' },
  { flag: '--help / -h', args: '', desc: 'Show help message' },
  { flag: '--version / -v', args: '', desc: 'Show version number' },
];

const globalFlags = [
  { flag: '--verbose / -v', args: '', desc: 'Enable verbose logging (show API calls, debug info)' },
  { flag: '--quiet / -q', args: '', desc: 'Suppress non-essential output (only show findings)' },
  { flag: '--no-color', args: '', desc: 'Disable colored output in terminal' },
  { flag: '--log-file', args: '/path/to/cloudsploit.log', desc: 'Write detailed logs to specified file' },
  { flag: '--proxy', args: 'http://proxy:port', desc: 'HTTP proxy for API calls' },
  { flag: '--ca-cert', args: '/path/to/cert.pem', desc: 'Custom CA certificate bundle' },
];

export default function CloudsploitCommandFlags() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-flag-line" />
          CLI Reference
        </div>
        <DocHeading level={1}>Command Flags</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Complete reference of all Cloudsploit command-line flags. Configure scan scope, output, performance, and advanced options.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Basic Scan Command</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          The basic structure of a Cloudsploit scan:
        </p>
        <Codeblock
          language="bash"
          code={`cloudsploit scan [provider] [options]`}
        />
        <Callout type="info">
          Omit the provider to scan all configured cloud accounts, or specify one or more: <code className="text-cyber-cyan">aws</code>, <code className="text-cyber-cyan">azure</code>, <code className="text-cyber-cyan">gcp</code>
        </Callout>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Scan Control Flags</DocHeading>
        <div className="cyber-card p-4 overflow-x-auto mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cyber-border">
                <th className="text-left py-2 px-3 text-cyber-cyan font-semibold w-1/4">Flag</th>
                <th className="text-left py-2 px-3 text-cyber-cyan font-semibold w-1/4">Arguments</th>
                <th className="text-left py-2 px-3 text-cyber-cyan font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {commandFlags.map((item) => (
                <tr key={item.flag} className="border-b border-cyber-border/50 hover:bg-cyber-bg/50">
                  <td className="py-2 px-3">
                    <code className="text-xs px-1.5 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-cyan">
                      {item.flag}
                    </code>
                  </td>
                  <td className="py-2 px-3">
                    {item.args && (
                      <code className="text-xs px-1.5 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-amber">
                        {item.args}
                      </code>
                    )}
                  </td>
                  <td className="py-2 px-3 text-xs text-cyber-text">{item.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Global Flags</DocHeading>
        <p className="text-cyber-text mt-3 mb-2">
          These flags apply to all Cloudsploit commands:
        </p>
        <div className="cyber-card p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cyber-border">
                <th className="text-left py-2 px-3 text-cyber-cyan font-semibold w-1/4">Flag</th>
                <th className="text-left py-2 px-3 text-cyber-cyan font-semibold w-1/4">Arguments</th>
                <th className="text-left py-2 px-3 text-cyber-cyan font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {globalFlags.map((item) => (
                <tr key={item.flag} className="border-b border-cyber-border/50 hover:bg-cyber-bg/50">
                  <td className="py-2 px-3">
                    <code className="text-xs px-1.5 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-cyan">
                      {item.flag}
                    </code>
                  </td>
                  <td className="py-2 px-3">
                    {item.args && (
                      <code className="text-xs px-1.5 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-amber">
                        {item.args}
                      </code>
                    )}
                  </td>
                  <td className="py-2 px-3 text-xs text-cyber-text">{item.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Common Combinations</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Practical examples combining multiple flags:
        </p>
        <div className="space-y-4">
          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Quick AWS Audit</h3>
            <Codeblock
              language="bash"
              code={`cloudsploit scan aws --quick --output html --outfile audit.html`}
            />
            <p className="text-xs text-cyber-text mt-2">Fast scan with common detectors, HTML report output</p>
          </div>

          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Production Scan (All AWS Regions)</h3>
            <Codeblock
              language="bash"
              code={`cloudsploit scan aws --severity high,critical --threads 20 --output json --outfile prod-scan.json`}
            />
            <p className="text-xs text-cyber-text mt-2">Only high/critical findings, multi-threaded, JSON output</p>
          </div>

          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-cyber-cyan mb-2">CI/CD Pipeline Scan</h3>
            <Codeblock
              language="bash"
              code={`cloudsploit scan aws --compliance cis --output junit --outfile results.xml --quiet`}
            />
            <p className="text-xs text-cyber-text mt-2">CIS compliance only, JUnit for CI integration, minimal output</p>
          </div>

          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Exclude Known Safe Resources</h3>
            <Codeblock
              language="bash"
              code={`cloudsploit scan aws --suppress-file ~/cloudsploit/suppressions.txt --exclude-regions us-gov-*`}
            />
            <p className="text-xs text-cyber-text mt-2">Skip known false positives and government regions</p>
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/cloudsploit/output-formats" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Output Formats <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
      </motion.section>
    </div>
  );
}
