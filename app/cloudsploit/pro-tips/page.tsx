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

const proTips = [
  {
    category: 'Scan Performance',
    tips: [
      {
        title: 'Optimize Thread Count',
        tip: 'Use 10-20 threads for most accounts. Increase to 50+ for large enterprises but watch for API rate limits.',
        code: `cloudsploit scan aws --threads 20`,
      },
      {
        title: 'Region Limiting',
        tip: 'Scan only active regions. Most companies use 2-4 regions, not all 25+ AWS regions.',
        code: `cloudsploit scan aws --regions us-east-1,us-west-2,eu-west-1`,
      },
      {
        title: 'Service Targeting',
        tip: 'Target high-risk services first: IAM, S3, EC2, RDS. Add others later.',
        code: `cloudsploit scan aws --services iam,s3,ec2,rds`,
      },
    ],
  },
  {
    category: 'Credential Management',
    tips: [
      {
        title: 'Use IAM Roles on EC2',
        tip: 'When running Cloudsploit from an EC2 instance, attach an IAM role instead of storing access keys.',
      },
      {
        title: 'Rotate Keys Regularly',
        tip: 'Access keys used for scanning should rotate every 90 days. Set calendar reminder.',
      },
      {
        title: 'Least Privilege',
        tip: 'Start with readonly policies. Add specific permissions only when detectors fail due to access issues.',
        code: `# Minimal IAM policy for AWS scanning
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:Describe*",
        "s3:Get*", "s3:List*",
        "iam:Get*", "iam:List*",
        "rds:Describe*"
      ],
      "Resource": "*"
    }
  ]
}`,
      },
    ],
  },
  {
    category: 'False Positive Management',
    tips: [
      {
        title: 'Build Suppression Lists',
        tip: 'Maintain a suppression file for known safe configurations that trigger detectors.',
        code: `# ~/.cloudsploit/suppressions.txt
S3_BUCKET_PUBLIC_READ  # Static website bucket
EC2_SECURITY_GROUP_OPEN_TO_WORLD  # Public load balancer SG
IAM_USER_ACCESS_KEYS_OLDER_THAN_90_DAYS  # Break-glass account`,
      },
      {
        title: 'Custom Detector Overrides',
        tip: 'Write custom detectors that check additional context before flagging.',
      },
      {
        title: 'Resource Exemptions',
        tip: 'Exempt specific resources by ARN rather than suppressing entire detector.',
        code: `cloudsploit scan aws \\
  --exempt-resources "arn:aws:s3:::public-website-*,arn:aws:ec2:us-east-1:123456789012:security-group/sg-*"`,
      },
    ],
  },
  {
    category: 'Automation & Scheduling',
    tips: [
      {
        title: 'Daily Quick Scans',
        tip: 'Run quick scans daily via cron/cron job. Full weekly scans on weekends.',
        code: `# Daily quick scan (6 AM)
0 6 * * * cloudsploit scan aws --quick --quiet

# Weekly full scan (Sunday 2 AM)
0 2 * * 0 cloudsploit scan aws --comprehensive`,
      },
      {
        title: 'CI/CD Integration',
        tip: 'Run compliance scans on PRs to infrastructure repos. Fail builds on critical findings.',
      },
      {
        title: 'Slack/Teams Notifications',
        tip: 'Parse output and send alerts to chat channels for urgent findings.',
        code: `#!/bin/bash
cloudsploit scan aws --severity critical --output json > results.json
if [ $(jq length results.json) -gt 0 ]; then
  curl -X POST -H 'Content-type: application/json' \\
    --data '{"text":"Critical cloud security issues found!"}' \\
    $SLACK_WEBHOOK_URL
fi`,
      },
    ],
  },
  {
    category: 'Reporting & Communication',
    tips: [
      {
        title: 'Executive Summary',
        tip: 'Export to HTML for stakeholder reports. Include remediation timeline and risk ratings.',
      },
      {
        title: 'Dev Team Handoff',
        tip: 'Export CSV with Resource ID and Remediation steps. Filter by environment tag.',
        code: `cloudsploit scan aws \\
  --services ec2,s3,rds \\
  --output csv \\
  --outfile dev-team-findings.csv`,
      },
      {
        title: 'Trend Analysis',
        tip: 'Store historical scan results. Track findings over time to measure improvement.',
        code: `# Archive each scan
mkdir -p ~/scan-archive/$(date +%Y-%m)
cloudsploit scan aws --output json --outfile ~/scan-archive/$(date +%Y-%m)/scan-$(date +%Y%m%d-%H%M).json`,
      },
    ],
  },
  {
    category: 'Advanced Techniques',
    tips: [
      {
        title: 'Custom Detector Development',
        tip: 'Write JavaScript detectors for organization-specific policies. Share across teams.',
        code: `// ~/.cloudsploit/detectors/required-tags.js
module.exports = {
  name: "RESOURCE_MISSING_REQUIRED_TAGS",
  description: "Resources must have Environment and Owner tags",
  category: "Governance",
  severity: "MEDIUM",
  
  async run(provider) {
    const resources = await provider.getAllResources();
    for (const res of resources) {
      const hasEnv = res.tags?.Environment;
      const hasOwner = res.tags?.Owner;
      if (!hasEnv || !hasOwner) {
        this.addIssue(
          \`Missing required tags on \${res.type} \${res.id}\`,
          res.id,
          \`Add Environment and Owner tags\`
        );
      }
    }
  }
};`,
      },
      {
        title: 'Parallel Multi-Cloud Scanning',
        tip: 'Scan AWS, Azure, GCP simultaneously using background processes for faster total runtime.',
        code: `# Run all three in parallel
cloudsploit scan aws --output json --outfile aws.json &
cloudsploit scan azure --output json --outfile azure.json &
cloudsploit scan gcp --output json --outfile gcp.json &
wait
echo "All scans complete"`,
      },
      {
        title: 'Detector Debugging',
        tip: 'Use verbose mode to see detailed detector execution and API calls.',
        code: `cloudsploit scan aws --services s3 --verbose 2>&1 | grep "S3_BUCKET"`,
      },
    ],
  },
  {
    category: 'Security Best Practices',
    tips: [
      {
        title: 'Never Scan Without Authorization',
        tip: 'Always have written permission before scanning any cloud account. Use tagged scan accounts.',
      },
      {
        title: 'Protect Scan Results',
        tip: 'Scan results contain sensitive infrastructure details. Encrypt reports at rest and in transit.',
      },
      {
        title: 'Separate Scanner Credentials',
        tip: 'Use dedicated IAM/service principal for scanning. Never share with personal accounts.',
      },
      {
        title: 'Monitor Scanner Activity',
        tip: 'Enable CloudTrail/Activity Log for the scanner account itself. Detect unauthorized use.',
      },
    ],
  },
];

export default function CloudsploitProTips() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-lightbulb-line" />
          Expert Advice
        </div>
        <DocHeading level={1}>Pro Tips</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Expert advice for running Cloudsploit effectively in production environments. Optimize performance, manage false positives, automate scans, and integrate into your security workflow.
        </p>
      </motion.div>

      {proTips.map((section) => (
        <motion.section key={section.category} className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>{section.category}</DocHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {section.tips.map((tip, idx) => (
              <div key={idx} className="cyber-card p-4">
                <h3 className="text-sm font-semibold text-cyber-cyan mb-2">{tip.title}</h3>
                <p className="text-xs text-cyber-text mb-3">{tip.tip}</p>
                {tip.code && (
                  <Codeblock
                    language="bash"
                    code={tip.code}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.section>
      ))}

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Scan Scheduling Strategies</DocHeading>
        <div className="cyber-card p-5 mt-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Daily Quick Scan</h3>
              <p className="text-xs text-cyber-text mt-1">High-risk services only, 5-10 minutes. Catches new issues fast.</p>
              <Codeblock
                language="bash"
                code={`cloudsploit scan aws --quick --quiet --severity critical`}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Weekly Deep Scan</h3>
              <p className="text-xs text-cyber-text mt-1">All services, all regions. Comprehensive but slow.</p>
              <Codeblock
                language="bash"
                code={`cloudsploit scan aws --comprehensive --output html --outfile weekly-report.html`}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Monthly Compliance</h3>
              <p className="text-xs text-cyber-text mt-1">CIS/NIST/PCI compliance checks for audit purposes.</p>
              <Codeblock
                language="bash"
                code={`cloudsploit scan aws --compliance cis --output pdf --outfile compliance.pdf`}
              />
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/cloudsploit/ci-cd" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: CI/CD Integration <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
      </motion.section>
    </div>
  );
}
