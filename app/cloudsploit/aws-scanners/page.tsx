'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Codeblock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const awsScanners = [
  {
    category: 'Identity & Access',
    detectors: [
      { name: 'IAM Password Policy', id: 'IAM_PASSWORD_POLICY', desc: 'Checks if IAM password policy meets complexity requirements' },
      { name: 'IAM No Root Access Key', id: 'IAM_NO_ROOT_ACCESS_KEY', desc: 'Ensures root account has no active access keys' },
      { name: 'IAM Users With Password', id: 'IAM_USERS_WITH_PASSWORD', desc: 'Finds IAM users that have console passwords (should use MFA)' },
      { name: 'IAM MFA Enabled', id: 'IAM_MFA_ENABLED', desc: 'Verifies MFA is enabled for all IAM users with passwords' },
      { name: 'IAM UserwithAccessKeysOlderThan90Days', id: 'IAM_USER_ACCESS_KEYS_OLDER_THAN_90_DAYS', desc: 'Access keys should be rotated regularly' },
      { name: 'IAM Assume Role Policy Allows External Principals', id: 'IAM_ASSUME_ROLE_POLICY_ALLOWS_EXTERNAL_PRINCIPALS', desc: 'Checks for overly permissive trust relationships' },
    ],
  },
  {
    category: 'Storage',
    detectors: [
      { name: 'S3 Bucket Public Read', id: 'S3_BUCKET_PUBLIC_READ', desc: 'S3 bucket allows public read access via ACL or policy' },
      { name: 'S3 Bucket Public Write', id: 'S3_BUCKET_PUBLIC_WRITE', desc: 'S3 bucket allows public write/delete access' },
      { name: 'S3 Bucket Versioning Disabled', id: 'S3_BUCKET_VERSIONING_DISABLED', desc: 'Versioning not enabled (data recovery risk)' },
      { name: 'S3 Bucket Encryption Disabled', id: 'S3_BUCKET_ENCRYPTION_DISABLED', desc: 'Server-side encryption not enabled for data at rest' },
      { name: 'S3 Bucket Logging Disabled', id: 'S3_BUCKET_LOGGING_DISABLED', desc: 'Access logging not configured for audit trail' },
      { name: 'S3 Bucket Lifecycle Policy Missing', id: 'S3_BUCKET_LIFECYCLE_POLICY_MISSING', desc: 'No lifecycle rules for cost optimization' },
      { name: 'EBS Volume Unencrypted', id: 'EBS_VOLUME_UNENCRYPTED', desc: 'EBS volume lacks encryption at rest' },
      { name: 'EFS File System Unencrypted', id: 'EFS_FILE_SYSTEM_UNENCRYPTED', desc: 'EFS file system not encrypted' },
    ],
  },
  {
    category: 'Compute',
    detectors: [
      { name: 'EC2 Instance No Public IP', id: 'EC2_INSTANCE_NO_PUBLIC_IP', desc: 'Instance has public IP address (attack surface)' },
      { name: 'EC2 Instance Detailed Monitoring Disabled', id: 'EC2_INSTANCE_DETAILED_MONITORING_DISABLED', desc: 'CloudWatch detailed monitoring not enabled' },
      { name: 'EC2 Instance Termination Protection Disabled', id: 'EC2_INSTANCE_TERMINATION_PROTECTION_DISABLED', desc: 'Accidental deletion protection not enabled' },
      { name: 'EC2 Security Group Open to World', id: 'EC2_SECURITY_GROUP_OPEN_TO_WORLD', desc: 'Security group allows 0.0.0.0/0 on sensitive ports' },
      { name: 'EC2 Security Group Unrestricted SSH', id: 'EC2_SECURITY_GROUP_UNRESTRICTED_SSH', desc: 'Port 22 open to world (should use bastion)' },
      { name: 'EC2 Security Group Unrestricted RDP', id: 'EC2_SECURITY_GROUP_UNRESTRICTED_RDP', desc: 'Port 3389 open to world' },
      { name: 'Lambda Function Public Access', id: 'LAMBDA_FUNCTION_PUBLIC_ACCESS', desc: 'Lambda function policy allows public invoke' },
      { name: 'Lambda Function Environment Variables Encrypted', id: 'LAMBDA_FUNCTION_ENV_VARIABLES_ENCRYPTED', desc: 'Sensitive env vars not encrypted with KMS' },
    ],
  },
  {
    category: 'Database',
    detectors: [
      { name: 'RDS Instance Publicly Accessible', id: 'RDS_INSTANCE_PUBLICLY_ACCESSIBLE', desc: 'RDS database accessible from internet' },
      { name: 'RDS Instance Storage Encrypted', id: 'RDS_INSTANCE_STORAGE_ENCRYPTED', desc: 'RDS storage encryption not enabled' },
      { name: 'RDS Instance Backup Retention', id: 'RDS_INSTANCE_BACKUP_RETENTION', desc: 'Automated backups not enabled or retention &lt;7 days' },
      { name: 'RDS Instance Deletion Protection Disabled', id: 'RDS_INSTANCE_DELETION_PROTECTION_DISABLED', desc: 'Accidental database deletion protection off' },
      { name: 'ElastiCache Cluster No Public IP', id: 'ELASTICACHE_CLUSTER_NO_PUBLIC_IP', desc: 'Redis/Memcached has public endpoint' },
      { name: 'DynamoDB Point-in-Time Recovery Disabled', id: 'DYNAMODB_PITR_DISABLED', desc: 'No point-in-time recovery for accidental deletes' },
    ],
  },
  {
    category: 'Networking',
    detectors: [
      { name: 'VPC Flow Logs Disabled', id: 'VPC_FLOW_LOGS_DISABLED', desc: 'VPC Flow Logs not enabled for network monitoring' },
      { name: 'VPC Default Security Group Contains Inbound Rules', id: 'VPC_DEFAULT_SECURITY_GROUP_INBOUND_RULES', desc: 'Default VPC security group allows inbound traffic' },
      { name: 'VPC Peering Allows External Traffic', id: 'VPC_PEERING_ALLOWS_EXTERNAL_TRAFFIC', desc: 'VPC peering connection accepts traffic from external CIDR' },
      { name: 'NAT Gateway Check', id: 'NAT_GATEWAY_CHECK', desc: 'Checks NAT Gateway configuration and redundancy' },
      { name: 'Internet Gateway Attached', id: 'INTERNET_GATEWAY_ATTACHED', desc: 'Checks for unexpected internet-facing resources' },
    ],
  },
  {
    category: 'Monitoring & Logging',
    detectors: [
      { name: 'CloudTrail Enabled', id: 'CLOUDTRAIL_ENABLED', desc: 'CloudTrail not enabled for audit logging' },
      { name: 'CloudTrail Log Validation Enabled', id: 'CLOUDTRAIL_LOG_VALIDATION_ENABLED', desc: 'CloudTrail log file validation disabled' },
      { name: 'CloudTrail Encrypted', id: 'CLOUDTRAIL_ENCRYPTED', desc: 'CloudTrail logs not encrypted at rest' },
      { name: 'CloudTrail Multi Region Enabled', id: 'CLOUDTRAIL_MULTI_REGION_ENABLED', desc: 'CloudTrail not enabled in all regions' },
      { name: 'CloudWatch Log Retention Set', id: 'CLOUDWATCH_LOG_RETENTION_SET', desc: 'CloudWatch log groups have no retention policy' },
      { name: 'Config Service Enabled', id: 'CONFIG_SERVICE_ENABLED', desc: 'AWS Config not enabled for resource tracking' },
    ],
  },
  {
    category: 'Security & Encryption',
    detectors: [
      { name: 'KMS Key Rotation Enabled', id: 'KMS_KEY_ROTATION_ENABLED', desc: 'KMS key automatic rotation not enabled' },
      { name: 'KMS Key Policy Allows Public Access', id: 'KMS_KEY_POLICY_ALLOWS_PUBLIC_ACCESS', desc: 'KMS key policy grants access to wildcard principal' },
      { name: 'ACM Certificate Expiration', id: 'ACM_CERT_EXPIRATION', desc: 'SSL/TLS certificate expires within 30 days' },
      { name: 'ACM Certificate Missing Domains', id: 'ACM_CERT_MISSING_DOMAINS', desc: 'Certificate does not cover all domain variations' },
      { name: 'Secrets Manager Rotation Disabled', id: 'SECRETSMANAGER_ROTATION_DISABLED', desc: 'Secret rotation not configured for sensitive credentials' },
      { name: 'WAF WebACL Missing', id: 'WAF_WEBACL_MISSING', desc: 'WebACL not associated with CloudFront/ALB' },
    ],
  },
];

export default function CloudsploitAwsScanners() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-amazon-line" />
          AWS Security Checks
        </div>
        <DocHeading level={1}>AWS Scanners</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Cloudsploit includes 100+ AWS security detectors covering IAM, compute, storage, networking, databases, and monitoring. Each detector checks for specific misconfigurations against AWS best practices and CIS benchmarks.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Scanning AWS Account</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Start a full AWS scan with all detectors enabled:
        </p>
        <Codeblock
          language="bash"
          code={`cloudsploit scan aws`}
        />
        <p className="text-cyber-text mt-4">
          To list all AWS-specific detectors:
        </p>
        <Codeblock
          language="bash"
          code={`cloudsploit detectors --provider aws --list`}
        />
      </motion.section>

      {awsScanners.map((category, idx) => (
        <motion.section key={category.category} className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>{category.category}</DocHeading>
          <div className="cyber-card p-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.detectors.map((detector) => (
                <div key={detector.id} className="p-3 rounded-lg bg-cyber-bg border border-cyber-border">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold text-white">{detector.name}</h4>
                    <code className="text-xs px-1.5 py-0.5 rounded bg-cyber-cyan/10 text-cyber-cyan flex-shrink-0">{detector.id}</code>
                  </div>
                  <p className="text-xs text-cyber-text mt-1">{detector.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      ))}

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Suppressing False Positives</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Some detectors may trigger on intentional configurations. Suppress specific detector IDs:
        </p>
        <Codeblock
          language="bash"
          code={`# Suppress multiple detectors
cloudsploit scan aws --suppress S3_BUCKET_PUBLIC_READ,EC2_SECURITY_GROUP_OPEN_TO_WORLD

# Use a suppression file (one ID per line)
cloudsploit scan aws --suppress-file ~/cloudsploit/suppressions.txt

# Ignore specific resources by ARN
cloudsploit scan aws --exempt-resources "arn:aws:s3:::public-bucket*,arn:aws:ec2:us-east-1:123456789012:security-group/sg-*"`}
        />
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/cloudsploit/azure-scanners" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Azure Scanners <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
      </motion.section>
    </div>
  );
}
