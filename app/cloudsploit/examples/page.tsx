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

const examples = [
  {
    title: 'Complete AWS Account Audit',
    desc: 'Scan entire AWS account across all regions with all detectors, save detailed report',
    code: `cloudsploit scan aws \\
  --all-regions \\
  --output html \\
  --outfile ~/reports/aws-audit-$(date +%Y%m%d).html \\
  --account-name "Production AWS"`,
    notes: ['Runs all detectors globally', 'HTML report easy to share', 'Includes timestamp in filename'],
  },
  {
    title: 'High-Risk Resource Quick Check',
    desc: 'Fast scan for critical security issues in critical services only',
    code: `cloudsploit scan aws \\
  --services s3,ec2,iam,rds \\
  --severity critical,high \\
  --threads 20 \\
  --output json`,
    notes: ['Limited to high-impact services', 'Only shows critical/high findings', 'Multi-threaded for speed'],
  },
  {
    title: 'S3 Bucket Security Focus',
    desc: 'Deep dive into S3 bucket security across all accounts',
    code: `cloudsploit scan aws \\
  --services s3 \\
  --suppress S3_BUCKET_VERSIONING_DISABLED,S3_BUCKET_LOGGING_DISABLED \\
  --output csv \\
  --outfile s3-findings.csv`,
    notes: ['Focus on storage security', 'Suppress low-priority S3 findings', 'CSV for spreadsheet analysis'],
  },
  {
    title: 'Azure Multi-Subscription Scan',
    desc: 'Scan multiple Azure subscriptions with different service principal profiles',
    code: `# Using Azure CLI credentials
az login
cloudsploit scan azure --all-subscriptions --output table

# Or using multiple profiles
cloudsploit scan azure \\
  --profile dev-subscription \\
  --profile staging-subscription \\
  --profile production-subscription \\
  --output json --outfile azure-scan.json`,
    notes: ['Requires az CLI logged in', 'Can use different profiles per subscription', 'Consolidated report'],
  },
  {
    title: 'GCP Project Compliance (CIS)',
    desc: 'Run CIS benchmark checks only on GCP project',
    code: `cloudsploit scan gcp \\
  --project-id my-gcp-project \\
  --compliance cis \\
  --output junit \\
  --outfile cis-results.xml`,
    notes: ['CIS GCP Foundations Benchmark', 'JUnit for CI/CD integration', 'Project-specific scan'],
  },
  {
    title: 'CI/CD Pipeline Integration',
    desc: 'Run in GitHub Actions/GitLab CI, fail on critical findings',
    code: `#!/bin/bash
# .github/workflows/security-scan.yml

- name: Cloud Security Scan
  run: |
    cloudsploit scan aws \\
      --services iam,s3,ec2 \\
      --severity critical \\
      --output json \\
      --outfile scan-results.json
    
    # Fail if critical issues found
    if grep -q '"severity":"CRITICAL"' scan-results.json; then
      echo "Critical security issues found!"
      exit 1
    fi`,
    notes: ['Only scan critical services', 'Grep JSON for critical severity', 'Exit non-zero to fail pipeline'],
  },
  {
    title: 'Scheduled Daily Scan',
    desc: 'Run automated daily scans with cron/Task Scheduler, email results',
    code: `#!/bin/bash
# /etc/cron.d/cloudsploit-daily

0 6 * * * cloudsploit scan aws \\
  --quick \\
  --output html \\
  --outfile /var/reports/cloudsploit-$(date +\%Y\%m\%d).html \\
  && mail -s "Daily Cloud Security Report" security@company.com < /var/reports/cloudsploit-$(date +\%Y\%m\%d).html`,
    notes: ['Runs at 6 AM daily', 'Quick scan for speed', 'Email report to security team'],
  },
  {
    title: 'Custom Detector Development',
    desc: 'Write and test a custom detector for organization-specific policies',
    code: `# 1. Create custom detector file
cat > ~/.cloudsploit/detectors/custom-tag-check.js << 'EOF'
module.exports = {
  name: "REQUIRED_COST_CENTER_TAG",
  description: "All resources must have CostCenter tag",
  category: "Governance",
  severity: "MEDIUM",
  
  async run(provider) {
    const resources = await provider.getAllResources();
    for (const res of resources) {
      if (!res.tags?.CostCenter) {
        this.addIssue(
          \`Resource \${res.id} missing CostCenter tag\`,
          res.id,
          'Add CostCenter tag to resource'
        );
      }
    }
  }
};
EOF

# 2. Run scan with custom detector
cloudsploit scan aws \\
  --custom-dir ~/.cloudsploit/detectors \\
  --services ec2,s3 \\
  --output json`,
    notes: ['JavaScript-based detector', 'Access to provider SDK', 'Can inspect any resource property'],
  },
  {
    title: 'New Account Onboarding Scan',
    desc: 'First-time scan of newly created AWS account with baseline assessment',
    code: `cloudsploit scan aws \\
  --regions us-east-1,us-west-2,eu-west-1 \\
  --services iam,s3,ec2,cloudtrail,kms \\
  --output html \\
  --outfile onboarding-report.html \\
  --account-name "New AWS Account" \\
  --threads 5`,
    notes: ['Limited regions for initial assessment', 'Focus on foundational services', 'Gentle thread count to avoid API throttling'],
  },
  {
    title: 'False Positive Suppression',
    desc: 'Exclude known safe resources from scan results',
    code: `# Create suppression file
cat > ~/cloudsploit/suppressions.txt << EOF
S3_BUCKET_PUBLIC_READ  # Public read bucket for website hosting
EC2_SECURITY_GROUP_OPEN_TO_WORLD  # Bastion host SG
KMS_KEY_ROTATION_ENABLED  # CMKs rotated manually
EOF

# Run scan with suppressions
cloudsploit scan aws \\
  --suppress-file ~/cloudsploit/suppressions.txt \\
  --output table`,
    notes: ['One detector ID per line', 'Comments with #', 'Apply across all accounts'],
  },
  {
    title: 'Resource Inventory Only',
    desc: 'List all cloud resources without running security checks',
    code: `# List all AWS resources without scanning
cloudsploit scan aws --list-resources --output json > inventory.json

# Or just list what would be scanned
cloudsploit scan aws --dry-run`,
    notes: ['Useful for asset inventory', 'No detector execution', 'Can pipe to jq for analysis'],
  },
];

export default function CloudsploitExamples() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-file-list-line" />
          Real-World Usage
        </div>
        <DocHeading level={1}>Examples</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Practical Cloudsploit commands for common security assessment scenarios. Copy, modify, and use these examples in your environment.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Common Use Cases</DocHeading>
        <div className="space-y-6 mt-4">
          {examples.map((example, idx) => (
            <div key={idx} className="cyber-card p-5">
              <h3 className="text-base font-semibold text-cyber-cyan mb-2">{example.title}</h3>
              <p className="text-sm text-cyber-text mb-4">{example.desc}</p>
              <Codeblock
                language="bash"
                code={example.code}
              />
              {example.notes && example.notes.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {example.notes.map((note, noteIdx) => (
                    <li key={noteIdx} className="flex items-start gap-2 text-xs text-cyber-text-dim">
                      <i className="ri-lightbulb-flash-line text-cyber-amber mt-0.5" />
                      {note}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Multi-Account Scanning</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Manage scans across multiple cloud accounts with a single command:
        </p>
        <Codeblock
          language="bash"
          code={`# Scan AWS accounts from config file
cat > ~/accounts.txt << EOF
[account:prod]
aws_access_key_id = AKIA_PRODUCTION
aws_secret_access_key = secret_prod
regions = us-east-1,us-west-2

[account:dev]
aws_access_key_id = AKIA_DEVELOPMENT
aws_secret_access_key = secret_dev
regions = us-east-1
EOF

cloudsploit scan --multi-account ~/accounts.txt \\
  --output combined.json`}
        />
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/cloudsploit/pro-tips" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Pro Tips <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
      </motion.section>
    </div>
  );
}
