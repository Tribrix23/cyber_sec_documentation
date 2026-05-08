'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import ModuleQuiz, { QuizQuestion } from '@/components/base/ModuleQuiz';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the primary purpose of Cloudsploit?',
    options: [
      'Password cracking for encrypted files',
      'Cloud security misconfiguration scanning',
      'Network packet capture and analysis',
      'Web application vulnerability scanning',
    ],
    correct: 1,
    explanation: 'Cloudsploit is specifically designed to scan AWS, Azure, and GCP for security misconfigurations, compliance violations, and best practice deviations.',
  },
  {
    id: 2,
    question: 'Which cloud providers does Cloudsploit support?',
    options: [
      'AWS only',
      'AWS and Azure only',
      'AWS, Azure, and GCP',
      'All cloud providers including Oracle Cloud',
    ],
    correct: 2,
    explanation: 'Cloudsploit natively supports Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP).',
  },
  {
    id: 3,
    question: 'What is the minimum recommended IAM policy scope for Cloudsploit scanning?',
    options: [
      'AdministratorAccess (full admin)',
      'PowerUserAccess',
      'ReadOnlyAccess or custom readonly policy',
      'SecurityAudit managed policy',
    ],
    correct: 2,
    explanation: 'Use least privilege principle. Start with read-only permissions that allow describe/list actions on resources. SecurityAudit policy is also appropriate.',
  },
  {
    id: 4,
    question: 'Which S3 detector checks if a bucket allows public read access?',
    options: [
      'S3_BUCKET_PUBLIC_WRITE',
      'S3_BUCKET_ACL_PUBLIC_READ',
      'S3_BUCKET_PUBLIC_READ',
      'S3_BUCKET_POLICY_PUBLIC',
    ],
    correct: 2,
    explanation: 'S3_BUCKET_PUBLIC_READ checks if an S3 bucket allows public read access via ACLs, bucket policies, or block public access settings.',
  },
  {
    id: 5,
    question: 'How do you suppress a specific detector from triggering?',
    options: [
      'Edit the detector source code',
      'Use --suppress DETECTOR_ID flag',
      'Modify config.json only',
      'Detectors cannot be suppressed',
    ],
    correct: 1,
    explanation: 'Use the --suppress flag with detector IDs (comma-separated) or --suppress-file to load suppressions from a file.',
  },
  {
    id: 6,
    question: 'Which Azure detector checks if a storage account allows public blob access?',
    options: [
      'STORAGE_ACCOUNT_PUBLIC_ACCESS',
      'AZURE_STORAGE_PUBLIC_BLOB',
      'STORAGE_CONTAINER_PUBLIC',
      'AZURE_BLOB_PUBLIC_READ',
    ],
    correct: 0,
    explanation: 'STORAGE_ACCOUNT_PUBLIC_ACCESS checks if Azure Storage account blob containers allow public (anonymous) read access.',
  },
  {
    id: 7,
    question: 'What does the --quick flag do?',
    options: [
      'Runs all detectors in all regions',
      'Runs only critical and high severity detectors on common services',
      'Displays quick help summary',
      'Skips authentication checks',
    ],
    correct: 1,
    explanation: 'The --quick flag runs a faster scan using a curated set of common high-risk detectors on core services, suitable for daily checks.',
  },
  {
    id: 8,
    question: 'Which GCP detector identifies publicly accessible Cloud Storage buckets?',
    options: [
      'GCS_PUBLIC_ACCESS',
      'GCP_BUCKET_PUBLIC',
      'CLOUD_STORAGE_PUBLIC',
      'STORAGE_BUCKET_READ_ALL',
    ],
    correct: 0,
    explanation: 'GCS_PUBLIC_ACCESS checks if Google Cloud Storage buckets grant allUsers or allAuthenticatedUsers permissions.',
  },
  {
    id: 9,
    question: 'What is the recommended output format for CI/CD integration?',
    options: [
      'table (default)',
      'html',
      'json or junit',
      'csv only',
    ],
    correct: 2,
    explanation: 'JSON and JUnit formats are machine-readable and integrate well with CI/CD tools, test frameworks, and automated fail conditions.',
  },
  {
    id: 10,
    question: 'Which AWS detector checks if CloudTrail is enabled?',
    options: [
      'AWS_CLOUDTRAIL_ENABLED',
      'CLOUDTRAIL_PRESENT',
      'CLOUDTRAIL_ENABLED',
      'AUDIT_LOGGING_ENABLED',
    ],
    correct: 2,
    explanation: 'CLOUDTRAIL_ENABLED verifies that AWS CloudTrail is enabled for audit logging in each region.',
  },
  {
    id: 11,
    question: 'How do you scan only specific AWS regions?',
    options: [
      'Edit the config file manually before each scan',
      'Use --regions flag with comma-separated list',
      'Cloudsploit always scans all regions',
      'Set region in AWS CLI profile only',
    ],
    correct: 1,
    explanation: 'Use --regions us-east-1,us-west-2,eu-west-1 to limit scanning to specific regions, reducing scan time.',
  },
  {
    id: 12,
    question: 'What does the IAM_NO_ROOT_ACCESS_KEY detector check?',
    options: [
      'If root password meets complexity',
      'If root account has active access keys (should have none)',
      'If root MFA is enabled',
      'If root user is deleted',
    ],
    correct: 1,
    explanation: 'IAM_NO_ROOT_ACCESS_KEY ensures the AWS root account does not have active access keys, which is a critical security risk if present.',
  },
  {
    id: 13,
    question: 'Which severity level indicates the highest risk in Cloudsploit?',
    options: [
      'HIGH',
      'CRITICAL',
      'MEDIUM',
      'LOW',
    ],
    correct: 1,
    explanation: 'CRITICAL is the highest severity level, indicating immediate action required due to high risk of compromise (e.g., public S3 buckets, public RDS).',
  },
  {
    id: 14,
    question: 'What is the purpose of custom detectors in Cloudsploit?',
    options: [
      'Replace built-in detectors entirely',
      'Add organization-specific security checks',
      'Speed up scan execution',
      'Generate custom HTML reports',
    ],
    correct: 1,
    explanation: 'Custom detectors let you write JavaScript code to check for organization-specific policies, tagging requirements, or unique resource types.',
  },
  {
    id: 15,
    question: 'Which command lists all available detectors?',
    options: [
      'cloudsploit list',
      'cloudsploit detectors --list',
      'cloudsploit show-detectors',
      'cloudsploit --all',
    ],
    correct: 1,
    explanation: 'cloudsploit detectors --list shows all detectors across configured providers. Add --provider aws to filter by provider.',
  },
  {
    id: 16,
    question: 'What does the RDS_INSTANCE_PUBLICLY_ACCESSIBLE detector identify?',
    options: [
      'RDS instance without backups',
      'RDS instance accessible from the internet',
      'RDS instance with weak password',
      'RDS instance without encryption',
    ],
    correct: 1,
    explanation: 'RDS_INSTANCE_PUBLICLY_ACCESSIBLE detects RDS databases that are publicly reachable, exposing them to the internet.',
  },
  {
    id: 17,
    question: 'Which flag allows you to run a compliance scan against CIS benchmarks?',
    options: [
      '--benchmark cis',
      '--compliance cis',
      '--cis-scan',
      '--standard cis',
    ],
    correct: 1,
    explanation: 'Use --compliance cis to run only CIS benchmark detectors. Other options include nist, pci, and hipaa.',
  },
  {
    id: 18,
    question: 'How would you scan only IAM and S3 in AWS?',
    options: [
      'cloudsploit scan aws --service iam,s3',
      'cloudsploit scan aws --services iam,s3',
      'cloudsploit scan iam s3',
      'cloudsploit aws --only-iam-s3',
    ],
    correct: 1,
    explanation: 'Use --services (or -s) flag with comma-separated service names: --services iam,s3.',
  },
  {
    id: 19,
    question: 'What does the --dry-run flag do?',
    options: [
      'Runs scans without writing output to disk',
      'Shows what would be scanned without executing',
      'Tests API connectivity only',
      'Simulates remediation actions',
    ],
    correct: 1,
    explanation: '--dry-run enumerates all resources that would be scanned and detectors that would run, but does not actually execute any checks.',
  },
  {
    id: 20,
    question: 'Where does Cloudsploit save scan results by default (JSON format)?',
    options: [
      'Current working directory',
      '/tmp/cloudsploit/results/',
      '~/.cloudsploit/results/',
      '~/.config/cloudsploit/output/',
    ],
    correct: 2,
    explanation: 'By default, JSON results are saved to ~/.cloudsploit/results/ with timestamped filenames.',
  },
  {
    id: 21,
    question: 'Which Azure Key Vault detector checks if soft delete is enabled?',
    options: [
      'KEY_VAULT_SOFT_DELETE',
      'AZURE_KEY_VAULT_RECOVERY',
      'KEY_VAULT_PURGE_PROTECTION',
      'VAULT_SOFT_DELETE_CHECK',
    ],
    correct: 0,
    explanation: 'KEY_VAULT_SOFT_DELETE checks if Azure Key Vault has soft delete enabled, which protects against accidental or malicious deletion.',
  },
  {
    id: 22,
    question: 'What is the recommended approach for managing scan credentials in CI/CD?',
    options: [
      'Hardcode credentials in pipeline scripts',
      'Store in plain text config files',
      'Use CI/CD platform secret management',
      'Use root account for convenience',
    ],
    correct: 2,
    explanation: 'Always use the secret/variable management features of your CI/CD platform (GitHub Secrets, GitLab CI variables, Jenkins credentials).',
  },
  {
    id: 23,
    question: 'Which detector would flag an EC2 instance with port 22 open to 0.0.0.0/0?',
    options: [
      'EC2_SSH_OPEN',
      'EC2_SECURITY_GROUP_UNRESTRICTED_SSH',
      'EC2_PORT_22_PUBLIC',
      'SSH_ACCESS_WORLD',
    ],
    correct: 1,
    explanation: 'EC2_SECURITY_GROUP_UNRESTRICTED_SSH detects security groups that allow SSH (port 22) from any IP address (0.0.0.0/0).',
  },
  {
    id: 24,
    question: 'How can you scan multiple AWS accounts?',
    options: [
      'Only one account per Cloudsploit installation',
      'Use --account flag for each scan, or --multi-account with config file',
      'Merge accounts in AWS Organizations automatically',
      'Not possible, need separate installations',
    ],
    correct: 1,
    explanation: 'Use multiple profiles (--profile flag) or a multi-account config file to scan multiple AWS accounts in one command or sequentially.',
  },
];

export default function CloudsploitQuiz() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-questionnaire-line" />
          Knowledge Check
        </div>
        <DocHeading level={1}>Cloudsploit Quiz</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Test your knowledge of Cloudsploit with {quizQuestions.length} multiple-choice questions covering installation, configuration, scanning, detectors, and best practices.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <ModuleQuiz title="Cloud Security Scanning" questions={quizQuestions} />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Callout type="info">
          <strong>Scoring:</strong> 80%+ (20+ correct) suggests you are ready for the hands-on lab exercises. Below 80%? Review the documentation modules and try again.
        </Callout>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Study Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/cloudsploit/installation" className="text-cyber-cyan hover:underline">
                Installation &rarr;
              </a>
              <span className="text-cyber-text-dim ml-2">Setup and installation methods</span>
            </li>
            <li>
              <a href="/cloudsploit/configuration" className="text-cyber-cyan hover:underline">
                Configuration &rarr;
              </a>
              <span className="text-cyber-text-dim ml-2">Credentials and settings</span>
            </li>
            <li>
              <a href="/cloudsploit/running-scans" className="text-cyber-cyan hover:underline">
                Running Scans &rarr;
              </a>
              <span className="text-cyber-text-dim ml-2">Scan execution flags and options</span>
            </li>
            <li>
              <a href="/cloudsploit/aws-scanners" className="text-cyber-cyan hover:underline">
                AWS Scanners &rarr;
              </a>
              <span className="text-cyber-text-dim ml-2">AWS detector reference</span>
            </li>
            <li>
              <a href="/cloudsploit/azure-scanners" className="text-cyber-cyan hover:underline">
                Azure Scanners &rarr;
              </a>
              <span className="text-cyber-text-dim ml-2">Azure detector reference</span>
            </li>
            <li>
              <a href="/cloudsploit/gcp-scanners" className="text-cyber-cyan hover:underline">
                GCP Scanners &rarr;
              </a>
              <span className="text-cyber-text-dim ml-2">GCP detector reference</span>
            </li>
          </ul>
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="mt-8 flex gap-3">
          <a href="/cloudsploit/lab" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Hands-On Lab <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  );
}
