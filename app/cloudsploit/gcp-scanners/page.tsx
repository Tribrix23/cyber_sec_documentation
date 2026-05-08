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

const gcpScanners = [
  {
    category: 'Identity & Access',
    detectors: [
      { name: 'IAM Password Policy', id: 'GCP_IAM_PASSWORD_POLICY', desc: 'Organization password policy strength' },
      { name: 'IAM 2-Step Verification', id: 'GCP_IAM_2SV', desc: '2-Step verification enforced for users' },
      { name: 'IAM Admin Role Overuse', id: 'GCP_IAM_ADMIN_ROLE_OVERUSE', desc: 'Too many users have Owner/Editor roles' },
      { name: 'IAM Service Account Keys', id: 'GCP_IAM_SERVICE_ACCOUNT_KEYS', desc: 'Service account keys older than 90 days' },
      { name: 'IAM External User Access', id: 'GCP_IAM_EXTERNAL_USER_ACCESS', desc: 'External (non-company) users with access' },
      { name: 'IAP Accessible Resources', id: 'GCP_IAP_ACCESSIBLE', desc: 'Resources accessible without Identity-Aware Proxy' },
    ],
  },
  {
    category: 'Storage',
    detectors: [
      { name: 'Cloud Storage Public Access', id: 'GCS_PUBLIC_ACCESS', desc: 'Bucket allows allUsers or allAuthenticatedUsers' },
      { name: 'Cloud Storage Uniform Bucket Access', id: 'GCS_UNIFORM_BUCKET_ACCESS', desc: 'Uniform bucket-level access not enabled' },
      { name: 'Cloud Storage Encryption', id: 'GCS_ENCRYPTION', desc: 'Customer-managed encryption keys not used' },
      { name: 'Cloud Storage Versioning', id: 'GCS_VERSIONING', desc: 'Object versioning not enabled' },
      { name: 'Cloud Storage Logging', id: 'GCS_LOGGING', desc: 'Access logging not configured' },
      { name: 'Cloud Storage Retention Policy', id: 'GCS_RETENTION_POLICY', desc: 'No retention policy (data deletion risk)' },
    ],
  },
  {
    category: 'Compute',
    detectors: [
      { name: 'Compute Engine Public IP', id: 'GCE_PUBLIC_IP', desc: 'VM instance has external IP address' },
      { name: 'Compute Engine Disk Encryption', id: 'GCE_DISK_ENCRYPTION', desc: 'Persistent disks not encrypted with CMEK' },
      { name: 'Compute Engine OS Patch Management', id: 'GCE_OS_PATCH_MANAGEMENT', desc: 'OS patch management not configured' },
      { name: 'Compute Engine Shielded VM', id: 'GCE_SHIELDED_VM', desc: 'Shielded VM features not enabled' },
      { name: 'GKE Cluster Legacy ABAC', id: 'GKE_LEGACY_ABAC', desc: 'Legacy ABAC enabled instead of RBAC' },
      { name: 'GKE Cluster Private Nodes', id: 'GKE_PRIVATE_NODES', desc: 'Nodes have public IP addresses' },
      { name: 'GKE Cluster Master Authorized Networks', id: 'GKE_MASTER_AUTHORIZED_NETWORKS', desc: 'Control plane accessible from anywhere' },
    ],
  },
  {
    category: 'Database',
    detectors: [
      { name: 'Cloud SQL Public IP', id: 'CLOUD_SQL_PUBLIC_IP', desc: 'Cloud SQL instance has public IP' },
      { name: 'Cloud SQL Encryption', id: 'CLOUD_SQL_ENCRYPTION', desc: 'Customer-managed keys not configured' },
      { name: 'Cloud SQL Automated Backups', id: 'CLOUD_SQL_BACKUPS', desc: 'Automated backups disabled or retention too short' },
      { name: 'Cloud SQL Binary Logging', id: 'CLOUD_SQL_BINARY_LOGGING', desc: 'Binary logging disabled (point-in-time recovery)' },
      { name: 'BigQuery Dataset Public Access', id: 'BIGQUERY_PUBLIC_ACCESS', desc: 'Dataset grants allUsers or allAuthenticatedUsers' },
      { name: 'Firestore Database', id: 'FIRESTORE_DATABASE', desc: 'Firestore security rules too permissive' },
    ],
  },
  {
    category: 'Networking & Security',
    detectors: [
      { name: 'VPC Flow Logs', id: 'VPC_FLOW_LOGS', desc: 'VPC flow logs not enabled for subnet' },
      { name: 'Cloud CDN HTTPS Only', id: 'CLOUD_CDN_HTTPS', desc: 'HTTPS not enforced for Cloud CDN' },
      { name: 'Cloud Armor Security Policy', id: 'CLOUD_ARMOR_POLICY', desc: 'Cloud Armor security policy missing' },
      { name: 'SSL Certificate Expiration', id: 'SSL_CERT_EXPIRATION', desc: 'Managed SSL certificate expiring soon' },
      { name: 'DNS Security Policy', id: 'DNS_SECURITY_POLICY', desc: 'Cloud DNS security policy not configured' },
    ],
  },
  {
    category: 'Serverless & APIs',
    detectors: [
      { name: 'Cloud Function Public Access', id: 'CLOUD_FUNCTION_PUBLIC_ACCESS', desc: 'Cloud Function allows unauthenticated invocations' },
      { name: 'Cloud Function Environment Variables Encrypted', id: 'CLOUD_FUNCTION_ENV_ENCRYPTED', desc: 'Sensitive env vars not encrypted with KMS' },
      { name: 'Cloud Run Public Access', id: 'CLOUD_RUN_PUBLIC_ACCESS', desc: 'Cloud Run service allows unauthenticated access' },
      { name: 'API Gateway API Key Required', id: 'API_GATEWAY_API_KEY', desc: 'API Gateway does not require API key' },
      { name: 'Pub/Sub Topic IAM Policy', id: 'PUBSUB_TOPIC_IAM_POLICY', desc: 'Pub/Sub topic has overly permissive IAM' },
    ],
  },
  {
    category: 'Monitoring & Logging',
    detectors: [
      { name: 'Cloud Monitoring Dashboard', id: 'CLOUD_MONITORING_DASHBOARD', desc: 'No monitoring dashboard for project' },
      { name: 'Cloud Logging Sink Exists', id: 'CLOUD_LOGGING_SINK', desc: 'No log sinks configured for log export' },
      { name: 'Cloud Audit Logs Admin Activity', id: 'CLOUD_AUDIT_LOGS_ADMIN', desc: 'Admin activity audit logs not configured' },
      { name: 'Cloud Audit Logs Data Access', id: 'CLOUD_AUDIT_LOGS_DATA', desc: 'Data access audit logs not configured' },
      { name: 'Error Reporting Enabled', id: 'ERROR_REPORTING_ENABLED', desc: 'Cloud Error Reporting not enabled' },
    ],
  },
];

export default function CloudsploitGcpScanners() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-google-line" />
          GCP Security Checks
        </div>
        <DocHeading level={1}>GCP Scanners</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Cloudsploit's GCP detectors review your Google Cloud projects for security best practice violations across Compute Engine, Cloud Storage, GKE, BigQuery, Cloud SQL, IAM, and more.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Scanning GCP Project</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Run a complete GCP security scan:
        </p>
        <Codeblock
          language="bash"
          code={`cloudsploit scan gcp`}
        />
        <p className="text-cyber-text mt-4">
          List all GCP-specific detectors:
        </p>
        <Codeblock
          language="bash"
          code={`cloudsploit detectors --provider gcp --list`}
        />
      </motion.section>

      {gcpScanners.map((category, idx) => (
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
        <DocHeading level={2}>Project vs Organization Scans</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          GCP scans can target individual projects or entire organizations:
        </p>
        <Codeblock
          language="bash"
          code={`# Scan specific project
cloudsploit scan gcp --project-id my-project-123

# Scan all projects in organization (requires org-level permissions)
cloudsploit scan gcp --organization-id 123456789012`}
        />
        <Callout type="info">
          Organization-level scans require <code className="text-cyber-cyan">roles/orgviewer</code> or custom role with <code className="text-cyber-cyan">resourcemanager.projects.list</code> permission.
        </Callout>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/cloudsploit/detectors" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Detector Reference <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
      </motion.section>
    </div>
  );
}
