'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import LabExercise, { LabTask } from '@/components/base/LabExercise';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const labTasks: LabTask[] = [
  {
    id: 1,
    title: 'Install Cloudsploit',
    description: 'Install Cloudsploit globally using npm. Verify the installation by checking the version.',
    expectedAnswer: 'npm install -g @aquasecurity/cloudsploit',
    hint: 'Use npm with the -g flag for global installation. Package name is @aquasecurity/cloudsploit',
  },
  {
    id: 2,
    title: 'Configure AWS Credentials',
    description: 'Set AWS credentials using environment variables. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION=us-east-1.',
    expectedAnswer: 'export AWS_ACCESS_KEY_ID=',
    hint: 'Use the export command for each variable. Region should be a valid AWS region like us-east-1.',
  },
  {
    id: 3,
    title: 'List Available Detectors',
    description: 'View all available detectors to understand what security checks Cloudsploit can perform.',
    expectedAnswer: 'cloudsploit detectors --list',
    hint: 'The detectors command with --list flag shows all security checks.',
  },
  {
    id: 4,
    title: 'Run Quick AWS Scan',
    description: 'Execute a quick scan of your AWS account using only high-priority detectors.',
    expectedAnswer: 'cloudsploit scan aws --quick',
    hint: 'Use the scan command with aws provider and --quick flag for a fast security check.',
  },
  {
    id: 5,
    title: 'Limit Scan to Specific Services',
    description: 'Scan only IAM and S3 services to focus on identity and storage security.',
    expectedAnswer: 'cloudsploit scan aws --services iam,s3',
    hint: 'Use --services flag followed by comma-separated service names.',
  },
  {
    id: 6,
    title: 'Scan Specific Region',
    description: 'Run a scan limited to us-east-1 region only (reduces scan time).',
    expectedAnswer: 'cloudsploit scan aws --region',
    hint: 'Use --region (singular) for a single region, or --regions for multiple.',
  },
  {
    id: 7,
    title: 'Suppress Low-Priority Findings',
    description: 'Run a scan that suppresses S3 bucket versioning and logging warnings (common false positives).',
    expectedAnswer: '--suppress',
    hint: 'Use --suppress flag with comma-separated detector IDs to skip specific checks.',
  },
  {
    id: 8,
    title: 'Generate HTML Report',
    description: 'Run a scan and output results to an HTML file for easy sharing with stakeholders.',
    expectedAnswer: '--output html --outfile',
    hint: 'Combine --output format with --outfile to specify output destination.',
  },
  {
    id: 9,
    title: 'Filter by Severity',
    description: 'Only report critical and high severity findings to focus on urgent issues.',
    expectedAnswer: '--severity critical,high',
    hint: 'Use --severity flag with comma-separated severity levels.',
  },
  {
    id: 10,
    title: 'Run Compliance Scan',
    description: 'Execute a CIS benchmark compliance scan against your AWS account.',
    expectedAnswer: 'cloudsploit scan aws --compliance cis',
    hint: 'Compliance scans run only detectors relevant to specific frameworks like CIS, NIST, PCI.',
  },
  {
    id: 11,
    title: 'View Detector Details',
    description: 'Get detailed information about a specific detector (IAM_PASSWORD_POLICY).',
    expectedAnswer: 'cloudsploit detectors --details',
    hint: 'Use --details flag followed by the detector ID to see full information.',
  },
  {
    id: 12,
    title: 'Dry Run Preview',
    description: 'Preview what resources and detectors would be scanned without actually running checks.',
    expectedAnswer: '--dry-run',
    hint: 'The --dry-run flag shows what would be scanned without executing detectors.',
  },
  {
    id: 13,
    title: 'Increase Scan Performance',
    description: 'Run a scan with 20 concurrent threads to speed up enumeration (be mindful of API rate limits).',
    expectedAnswer: '--threads',
    hint: 'Use --threads or -t to control concurrent API calls. Default is 10.',
  },
  {
    id: 14,
    title: 'Create Suppression File',
    description: 'Create a file containing detector IDs to suppress (bypass false positives).',
    expectedAnswer: 'echo',
    hint: 'Use echo to write detector IDs to a file, one per line.',
  },
  {
    id: 15,
    title: 'Use Suppression File in Scan',
    description: 'Run a scan using the suppression file you created to skip specific detectors.',
    expectedAnswer: '--suppress-file',
    hint: 'Point --suppress-file to the path of your suppression file.',
  },
  {
    id: 16,
    title: 'Save JSON Output',
    description: 'Save detailed scan results in JSON format for programmatic analysis.',
    expectedAnswer: '--output json --outfile',
    hint: 'JSON format preserves full detector details, resource info, and remediation guidance.',
  },
  {
    id: 17,
    title: 'Multi-Provider Scan',
    description: 'Scan both AWS and Azure in a single command (requires both configured).',
    expectedAnswer: 'cloudsploit scan aws azure',
    hint: 'List multiple providers after scan without any flags to scan all configured accounts.',
  },
  {
    id: 18,
    title: 'List Resources Without Scanning',
    description: 'Enumerate all cloud resources without running security checks (inventory only).',
    expectedAnswer: '--list-resources',
    hint: 'Use --list-resources to see what would be scanned without executing detectors.',
  },
  {
    id: 19,
    title: 'Verbose Mode for Debugging',
    description: 'Run scan with verbose logging to see detailed API calls and debug information.',
    expectedAnswer: '--verbose',
    hint: 'Verbose flag increases log detail. Useful for troubleshooting detector failures.',
  },
  {
    id: 20,
    title: 'Export to CSV for Analysis',
    description: 'Export findings as CSV for import into spreadsheets or SIEM systems.',
    expectedAnswer: '--output csv --outfile',
    hint: 'CSV format is tabular and easy to analyze in Excel, Google Sheets, or data analysis tools.',
  },
];

export default function CloudsploitLab() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-flask-line" />
          Hands-On Exercises
        </div>
        <DocHeading level={1}>Cloudsploit Lab</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Complete {labTasks.length} hands-on tasks to master Cloudsploit. Type the exact commands you would use in a real environment. Reference commands are provided if you get stuck.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Callout type="warning">
          <strong>Important:</strong> These exercises assume you have Cloudsploit installed and have read-only AWS credentials configured. Never use production credentials for practice. Use a dedicated test account or sandbox environment.
        </Callout>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <LabExercise title="Cloudsploit Hands-On Lab" tasks={labTasks} />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Lab Navigation Tips</h3>
          <ul className="space-y-2 text-sm text-cyber-text">
            <li className="flex items-start gap-2">
              <i className="ri-information-line text-cyber-cyan mt-0.5" />
              <span>Type commands exactly as they would appear in a terminal. Environment variables and options must match.</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-information-line text-cyber-cyan mt-0.5" />
              <span>Click <strong className="text-white">"Show Hint"</strong> if you need guidance. The reference command shows the expected syntax.</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-information-line text-cyber-cyan mt-0.5" />
              <span>Knowledge of flags from the <code className="text-cyber-cyan">Command Flags</code> module is required for many tasks.</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-information-line text-cyber-cyan mt-0.5" />
              <span>Complete 16+ tasks correctly to master the essential Cloudsploit workflows.</span>
            </li>
          </ul>
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/cloudsploit/examples" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Review: Examples <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
      </motion.section>
    </div>
  );
}
