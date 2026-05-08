'use client'

import { useState, useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Codeblock from '@/components/base/Codeblock';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const providers = [
  { value: 'aws', label: 'AWS' },
  { value: 'azure', label: 'Azure' },
  { value: 'gcp', label: 'GCP' },
  { value: 'all', label: 'All Configured' },
];

const commonServices = [
  { value: 'iam', label: 'IAM (Identity & Access)' },
  { value: 's3', label: 'S3 / Storage' },
  { value: 'ec2', label: 'EC2 / Compute' },
  { value: 'rds', label: 'RDS / Databases' },
  { value: 'lambda', label: 'Lambda / Functions' },
  { value: 'vpc', label: 'VPC / Networking' },
  { value: 'cloudtrail', label: 'CloudTrail / Logging' },
  { value: 'kms', label: 'KMS / Encryption' },
  { value: 'security-groups', label: 'Security Groups' },
  { value: 'ebs', label: 'EBS / Disks' },
];

const outputFormats = [
  { value: '', label: 'Table (console)' },
  { value: 'json', label: 'JSON' },
  { value: 'csv', label: 'CSV' },
  { value: 'html', label: 'HTML Report' },
  { value: 'junit', label: 'JUnit XML' },
];

const severityLevels = [
  { value: '', label: 'All Severities' },
  { value: 'critical', label: 'Critical Only' },
  { value: 'critical,high', label: 'Critical + High' },
  { value: 'critical,high,medium', label: 'Critical + High + Medium' },
];

export default function CloudsploitCommandBuilderPage() {
  const [provider, setProvider] = useState('aws');
  const [regions, setRegions] = useState('us-east-1,us-west-2');
  const [services, setServices] = useState<string[]>(['iam', 's3', 'ec2']);
  const [severity, setSeverity] = useState('critical,high');
  const [outputFormat, setOutputFormat] = useState('json');
  const [outputFile, setOutputFile] = useState('cloudsploit-report');
  const [quick, setQuick] = useState(false);
  const [comprehensive, setComprehensive] = useState(false);
  const [compliance, setCompliance] = useState('');
  const [threads, setThreads] = useState(10);
  const [verbose, setVerbose] = useState(false);
  const [dryRun, setDryRun] = useState(false);
  const [suppress, setSuppress] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleService = (svc: string) => {
    setServices((prev) => {
      if (prev.includes(svc)) {
        return prev.filter((s) => s !== svc);
      }
      return [...prev, svc];
    });
  };

  const getCommand = () => {
    const parts = ['cloudsploit', 'scan'];

    // Provider
    if (provider !== 'all') {
      parts.push(provider);
    }

    // Regions
    if (regions.trim()) {
      parts.push('--regions', regions.trim());
    }

    // Services
    if (services.length > 0 && !quick && !comprehensive) {
      parts.push('--services', services.join(','));
    }

    // Severity
    if (severity) {
      parts.push('--severity', severity);
    }

    // Output
    if (outputFormat) {
      parts.push('--output', outputFormat);
      if (outputFile) {
        parts.push('--outfile', `${outputFile}.${outputFormat === 'table' ? 'txt' : outputFormat === 'junit' ? 'xml' : outputFormat}`);
      }
    }

    // Advanced
    if (quick) parts.push('--quick');
    if (comprehensive) parts.push('--comprehensive');
    if (compliance) parts.push('--compliance', compliance);
    if (threads !== 10) parts.push('--threads', threads.toString());
    if (verbose) parts.push('--verbose');
    if (dryRun) parts.push('--dry-run');
    if (suppress.trim()) {
      parts.push('--suppress', suppress.trim());
    }

    return parts.join(' \\\n  ');
  };

  const copyToClipboard = () => {
    const cmd = getCommand().replace(/\\\n\s+/g, ' ');
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-tools-line" />
          Interactive Tool
        </div>
        <DocHeading level={1}>Cloudsploit Command Builder</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Build customized Cloudsploit scan commands by selecting options below. Copy the generated command and run it in your terminal.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Options */}
          <div className="space-y-6">
            {/* Cloud Provider */}
            <div className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Cloud Provider</h3>
              <div className="space-y-2">
                {providers.map((p) => (
                  <label key={p.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="provider"
                      value={p.value}
                      checked={provider === p.value}
                      onChange={(e) => setProvider(e.target.value)}
                      className="w-4 h-4 accent-cyber-cyan"
                    />
                    <span className="text-sm text-cyber-text group-hover:text-cyber-cyan transition-colors">
                      {p.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Regions */}
            <div className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Regions to Scan</h3>
              <p className="text-xs text-cyber-text-dim mb-3">
                Comma-separated list of regions. Leave empty for all regions.
              </p>
              <input
                type="text"
                value={regions}
                onChange={(e) => setRegions(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
                placeholder="us-east-1,us-west-2,eu-west-1"
              />
            </div>

            {/* Services */}
            <div className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Cloud Services</h3>
              <p className="text-xs text-cyber-text-dim mb-3">
                Select services to scan. Uncheck to limit scope and speed up scan.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {commonServices.map((svc) => (
                  <label key={svc.value} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={services.includes(svc.value)}
                      onChange={() => toggleService(svc.value)}
                      className="w-4 h-4 accent-cyber-cyan"
                    />
                    <span className="text-xs text-cyber-text group-hover:text-cyber-cyan transition-colors">
                      {svc.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Severity Filter */}
            <div className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Finding Severity</h3>
              <div className="space-y-2">
                {severityLevels.map((sev) => (
                  <label key={sev.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="severity"
                      value={sev.value}
                      checked={severity === sev.value}
                      onChange={(e) => setSeverity(e.target.value)}
                      className="w-4 h-4 accent-cyber-cyan"
                    />
                    <span className="text-sm text-cyber-text group-hover:text-cyber-cyan transition-colors">
                      {sev.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Advanced & Output */}
          <div className="space-y-6">
            {/* Output Options */}
            <div className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Output Format</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-cyber-text-dim block mb-1.5">Format</label>
                  <select
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text focus:outline-none focus:border-cyber-cyan"
                  >
                    {outputFormats.map((fmt) => (
                      <option key={fmt.value} value={fmt.value}>
                        {fmt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-cyber-text-dim block mb-1.5">Output File Name (without extension)</label>
                  <input
                    type="text"
                    value={outputFile}
                    onChange={(e) => setOutputFile(e.target.value)}
                    className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
                    placeholder="scan-results"
                  />
                </div>
              </div>
            </div>

            {/* Scan Mode */}
            <div className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Scan Mode</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={quick}
                    onChange={(e) => {
                      setQuick(e.target.checked);
                      if (e.target.checked) setComprehensive(false);
                    }}
                    className="w-4 h-4 accent-cyber-cyan"
                  />
                  <span className="text-sm text-cyber-text group-hover:text-cyber-cyan transition-colors">
                    Quick Scan (common detectors only)
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={comprehensive}
                    onChange={(e) => {
                      setComprehensive(e.target.checked);
                      if (e.target.checked) setQuick(false);
                    }}
                    className="w-4 h-4 accent-cyber-cyan"
                  />
                  <span className="text-sm text-cyber-text group-hover:text-cyber-cyan transition-colors">
                    Comprehensive (all detectors, all regions)
                  </span>
                </label>
              </div>

              <div className="mt-4">
                <label className="text-xs text-cyber-text-dim block mb-1.5">Compliance Framework</label>
                <select
                  value={compliance}
                  onChange={(e) => {
                    setCompliance(e.target.value);
                    if (e.target.value) setQuick(false);
                  }}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text focus:outline-none focus:border-cyber-cyan"
                >
                  <option value="">None (standard scan)</option>
                  <option value="cis">CIS Benchmarks</option>
                  <option value="nist">NIST</option>
                  <option value="pci">PCI DSS</option>
                  <option value="hipaa">HIPAA</option>
                </select>
              </div>
            </div>

            {/* Advanced Options */}
            <div className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Advanced Options</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-cyber-text-dim block mb-1.5">Concurrent Threads (default: 10)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={threads}
                    onChange={(e) => setThreads(parseInt(e.target.value) || 10)}
                    className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
                  />
                </div>

                <div>
                  <label className="text-xs text-cyber-text-dim block mb-1.5">
                    Suppress Detector IDs (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={suppress}
                    onChange={(e) => setSuppress(e.target.value)}
                    className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
                    placeholder="S3_BUCKET_VERSIONING_DISABLED,..."
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={verbose}
                      onChange={(e) => setVerbose(e.target.checked)}
                      className="w-4 h-4 accent-cyber-cyan"
                    />
                    <span className="text-sm text-cyber-text group-hover:text-cyber-cyan transition-colors">
                      Verbose Output (-verbose)
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={dryRun}
                      onChange={(e) => setDryRun(e.target.checked)}
                      className="w-4 h-4 accent-cyber-cyan"
                    />
                    <span className="text-sm text-cyber-text group-hover:text-cyber-cyan transition-colors">
                      Dry Run (no execution)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Generated Command */}
      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-5 relative">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Generated Command</h3>
            <button
              type="button"
              onClick={copyToClipboard}
              className="px-3 py-1.5 rounded-lg bg-cyber-bg border border-cyber-border text-xs text-cyber-cyan hover:bg-cyber-cyan/10 transition-all flex items-center gap-1.5"
            >
              <i className={copied ? 'ri-check-line' : 'ri-file-copy-line'} />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <Codeblock
            language="bash"
            code={getCommand()}
          />
          <Callout type="info" className="mt-4">
            <strong>Tip:</strong> Copy this command and paste it into your terminal. Make sure your cloud credentials are configured first.
          </Callout>
        </div>
      </motion.section>

      {/* Reference */}
      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Quick Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <h4 className="text-cyber-cyan font-semibold mb-1">Common Service Names</h4>
              <p className="text-cyber-text">
                iam, s3, ec2, rds, lambda, vpc, cloudtrail, kms, security-groups, ebs, efs, sns, sqs, dynamodb
              </p>
            </div>
            <div>
              <h4 className="text-cyber-cyan font-semibold mb-1">Common Regions</h4>
              <p className="text-cyber-text">
                AWS: us-east-1, us-west-2, eu-west-1 | Azure: eastus, westus2, westeurope | GCP: us-central1, europe-west1
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/cloudsploit/examples" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              View Examples <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
      </motion.section>
    </div>
  );
}
