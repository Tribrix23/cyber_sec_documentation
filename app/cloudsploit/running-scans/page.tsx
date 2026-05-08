'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Codeblock from '@/components/base/Codeblock';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function CloudsploitRunningScans() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-play-line" />
          ScanExecution
        </div>
        <DocHeading level={1}>Running Scans</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Cloudsploit scans your cloud infrastructure by enumerating resources and running security checks against each one. Learn how to start scans, customize scan scope, and interpret results.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Basic Scan</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          The simplest scan targets all enabled cloud providers with default settings:
        </p>
        <Codeblock
          language="bash"
          code={`cloudsploit scan`}
        />
        <p className="text-cyber-text mt-4">
          This will:
        </p>
        <ul className="list-disc list-inside space-y-2 text-cyber-text mt-2 ml-4">
          <li>Discover all accessible resources in configured cloud accounts</li>
          <li>Run all enabled security detectors</li>
          <li>Output results to console in table format</li>
          <li>Save full results to <code className="text-cyber-cyan">~/.cloudsploit/results/</code></li>
        </ul>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Scan Specific Cloud Provider</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Target specific cloud providers if you only want to scan one environment:
        </p>
        <Codeblock
          language="bash"
          code={`# Scan AWS only
cloudsploit scan aws

# Scan Azure only
cloudsploit scan azure

# Scan GCP only
cloudsploit scan gcp

# Scan AWS and Azure (skip GCP)
cloudsploit scan aws azure`}
        />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Limit by Region</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Restrict scans to specific regions to reduce scan time or focus on specific deployments:
        </p>
        <Codeblock
          language="bash"
          code={`# Scan only US regions
cloudsploit scan aws --regions us-east-1,us-west-2,us-west-1

# Scan single region
cloudsploit scan aws --region eu-west-1

# Exclude regions
cloudsploit scan aws --exclude-regions cn-north-1,us-gov-west-1`}
        />
        <Callout type="info">
          Region restriction only applies to region-scoped services (EC2, S3, RDS, etc.). Global services like IAM are always scanned.
        </Callout>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Limit by Service</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Focus on specific cloud services to speed up scans or target high-risk areas:
        </p>
        <Codeblock
          language="bash"
          code={`# Scan only storage services
cloudsploit scan aws --services s3,ebs,efs

# Scan IAM and security groups
cloudsploit scan aws --services iam,security-groups

# Exclude specific services
cloudsploit scan aws --exclude-services cloudtrail,config`}
        />
        <Callout type="warning">
          Use <code className="text-cyber-cyan">cloudsploit detectors --list</code> to see all available service names.
        </Callout>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Custom Detectors</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Run only specific detectors or exclude known false positives:
        </p>
        <Codeblock
          language="bash"
          code={`# Run only S3 and IAM detectors
cloudsploit scan aws --services s3,iam

# Skip specific detectors by ID
cloudsploit scan aws --suppress S3_BUCKET_PUBLIC_READ,S3_BUCKET_VERSIONING_DISABLED

# Run only critical/high severity detectors
cloudsploit scan aws --severity critical,high

# List all available detectors
cloudsploit detectors --list`}
        />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Output Formats</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Export scan results in various formats for reporting or integration:
        </p>
        <Codeblock
          language="bash"
          code={`# JSON output (detailed, machine-readable)
cloudsploit scan aws --output json --outfile scan-results.json

# CSV for spreadsheet analysis
cloudsploit scan aws --output csv --outfile findings.csv

# HTML report with interactive filtering
cloudsploit scan aws --output html --outfile report.html

# JUnit format for CI/CD integration
cloudsploit scan aws --output junit --outfile results.xml

# Table format (default, console-friendly)
cloudsploit scan aws --output table`}
        />
        <Callout type="info">
          Without <code className="text-cyber-cyan">--outfile</code>, output goes to console (except JSON which writes to <code className="text-cyber-cyan">~/.cloudsploit/results/</code> by default).
        </Callout>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Scan Modes</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Cloudsploit offers different scan modes for various use cases:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Quick Scan</h3>
            <p className="text-xs text-cyber-text">
              Fast scan with common detectors only. Good for daily checks.
            </p>
            <div className="mt-3">
              <Codeblock
                language="bash"
                code={`cloudsploit scan --quick`}
              />
            </div>
          </div>
          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Comprehensive Scan</h3>
            <p className="text-xs text-cyber-text">
              All detectors, all regions, thorough enumeration. Takes longer.
            </p>
            <div className="mt-3">
              <Codeblock
                language="bash"
                code={`cloudsploit scan --comprehensive`}            
              />
            </div>
          </div>
          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Compliance Mode</h3>
            <p className="text-xs text-cyber-text">
              Run only CIS benchmark and compliance checks.
            </p>
            <div className="mt-3">
              <Codeblock
                language="bash"
                code={`cloudsploit scan --compliance cis`}
              />
            </div>
          </div>
          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Dry Run</h3>
            <p className="text-xs text-cyber-text">
              Show what would be scanned without executing. Safe for testing config.
            </p>
            <div className="mt-3">
              <Codeblock
                language="bash"
                code={`cloudsploit scan --dry-run`}
              />
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Understanding Output</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Scan results show security findings with severity, description, and remediation:
        </p>
        <Codeblock
          language="bash"
          code={`[CRITICAL] S3 Bucket is publicly accessible
  Resource: arn:aws:s3:::my-bucket
  Region: us-east-1
  Description: The S3 bucket has public read/write permissions via bucket policy
  Remediation: Remove public access ACLs and block public access settings
  Reference: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html`}
        />
        <p className="text-cyber-text mt-4">
          Severity levels:
        </p>
        <ul className="list-disc list-inside space-y-1 text-cyber-text mt-2 ml-4">
          <li><strong className="text-red-400">CRITICAL:</strong> Immediate action required, high risk of compromise</li>
          <li><strong className="text-orange-400">HIGH:</strong> Significant security issue, address soon</li>
          <li><strong className="text-yellow-400">MEDIUM:</strong> Potential security improvement, schedule remediation</li>
          <li><strong className="text-blue-400">LOW:</strong> Minor issue or informational finding</li>
        </ul>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/cloudsploit/aws-scanners" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: AWS Scanners <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
      </motion.section>
    </div>
  );
}
