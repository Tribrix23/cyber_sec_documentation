'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/base/Codeblock';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const allDetectors = [
  // AWS
  { id: 'IAM_PASSWORD_POLICY', provider: 'AWS', severity: 'HIGH', category: 'IAM', desc: 'IAM password policy does not meet complexity requirements' },
  { id: 'IAM_NO_ROOT_ACCESS_KEY', provider: 'AWS', severity: 'CRITICAL', category: 'IAM', desc: 'Root account has active access keys' },
  { id: 'IAM_USERS_WITH_PASSWORD', provider: 'AWS', severity: 'MEDIUM', category: 'IAM', desc: 'IAM users have console passwords without MFA' },
  { id: 'IAM_MFA_ENABLED', provider: 'AWS', severity: 'HIGH', category: 'IAM', desc: 'MFA not enabled for IAM users with passwords' },
  { id: 'S3_BUCKET_PUBLIC_READ', provider: 'AWS', severity: 'CRITICAL', category: 'Storage', desc: 'S3 bucket allows public read access' },
  { id: 'S3_BUCKET_PUBLIC_WRITE', provider: 'AWS', severity: 'CRITICAL', category: 'Storage', desc: 'S3 bucket allows public write access' },
  { id: 'S3_BUCKET_ENCRYPTION_DISABLED', provider: 'AWS', severity: 'HIGH', category: 'Storage', desc: 'S3 server-side encryption not enabled' },
  { id: 'S3_BUCKET_LOGGING_DISABLED', provider: 'AWS', severity: 'LOW', category: 'Storage', desc: 'S3 access logging not enabled' },
  { id: 'EBS_VOLUME_UNENCRYPTED', provider: 'AWS', severity: 'HIGH', category: 'Storage', desc: 'EBS volume lacks encryption' },
  { id: 'EC2_SECURITY_GROUP_OPEN_TO_WORLD', provider: 'AWS', severity: 'HIGH', category: 'Compute', desc: 'Security group allows 0.0.0.0/0' },
  { id: 'EC2_SECURITY_GROUP_UNRESTRICTED_SSH', provider: 'AWS', severity: 'HIGH', category: 'Compute', desc: 'Port 22 open to internet' },
  { id: 'EC2_SECURITY_GROUP_UNRESTRICTED_RDP', provider: 'AWS', severity: 'HIGH', category: 'Compute', desc: 'Port 3389 open to internet' },
  { id: 'RDS_INSTANCE_PUBLICLY_ACCESSIBLE', provider: 'AWS', severity: 'CRITICAL', category: 'Database', desc: 'RDS accessible from internet' },
  { id: 'RDS_INSTANCE_STORAGE_ENCRYPTED', provider: 'AWS', severity: 'HIGH', category: 'Database', desc: 'RDS storage not encrypted' },
  { id: 'CLOUDTRAIL_ENABLED', provider: 'AWS', severity: 'HIGH', category: 'Monitoring', desc: 'CloudTrail not enabled' },
  { id: 'CLOUDTRAIL_LOG_VALIDATION_ENABLED', provider: 'AWS', severity: 'MEDIUM', category: 'Monitoring', desc: 'CloudTrail log validation disabled' },
  { id: 'KMS_KEY_ROTATION_ENABLED', provider: 'AWS', severity: 'MEDIUM', category: 'Security', desc: 'KMS key automatic rotation disabled' },

  // Azure
  { id: 'AZURE_AD_PASSWORD_POLICY', provider: 'Azure', severity: 'HIGH', category: 'IAM', desc: 'Azure AD password policy is weak' },
  { id: 'AZURE_AD_MFA_ENFORCEMENT', provider: 'Azure', severity: 'HIGH', category: 'IAM', desc: 'MFA not enforced for all users' },
  { id: 'STORAGE_ACCOUNT_PUBLIC_ACCESS', provider: 'Azure', severity: 'CRITICAL', category: 'Storage', desc: 'Storage account allows public blob access' },
  { id: 'STORAGE_ACCOUNT_SECURE_TRANSFER', provider: 'Azure', severity: 'HIGH', category: 'Storage', desc: 'HTTPS-only not enforced' },
  { id: 'VM_PUBLIC_IP_ADDRESS', provider: 'Azure', severity: 'MEDIUM', category: 'Compute', desc: 'VM has public IP address' },
  { id: 'VM_DISK_ENCRYPTION', provider: 'Azure', severity: 'HIGH', category: 'Compute', desc: 'VM disks not encrypted' },
  { id: 'SQL_SERVER_AUDITING', provider: 'Azure', severity: 'HIGH', category: 'Database', desc: 'SQL Server auditing disabled' },
  { id: 'SQL_SERVER_ENCRYPTION', provider: 'Azure', severity: 'HIGH', category: 'Database', desc: 'Transparent Data Encryption disabled' },
  { id: 'KEY_VAULT_SOFT_DELETE', provider: 'Azure', severity: 'HIGH', category: 'Security', desc: 'Key Vault soft delete disabled' },
  { id: 'AKS_RBAC_ENABLED', provider: 'Azure', severity: 'HIGH', category: 'Kubernetes', desc: 'RBAC not enabled for AKS' },

  // GCP
  { id: 'GCP_IAM_PASSWORD_POLICY', provider: 'GCP', severity: 'HIGH', category: 'IAM', desc: 'Organization password policy missing' },
  { id: 'GCP_IAM_2SV', provider: 'GCP', severity: 'HIGH', category: 'IAM', desc: '2-Step verification not enforced' },
  { id: 'GCS_PUBLIC_ACCESS', provider: 'GCP', severity: 'CRITICAL', category: 'Storage', desc: 'Cloud Storage bucket publicly accessible' },
  { id: 'GCS_VERSIONING', provider: 'GCP', severity: 'LOW', category: 'Storage', desc: 'Object versioning not enabled' },
  { id: 'GCE_PUBLIC_IP', provider: 'GCP', severity: 'MEDIUM', category: 'Compute', desc: 'Compute Engine has external IP' },
  { id: 'GCE_SHIELDED_VM', provider: 'GCP', severity: 'MEDIUM', category: 'Compute', desc: 'Shielded VM features disabled' },
  { id: 'CLOUD_SQL_PUBLIC_IP', provider: 'GCP', severity: 'CRITICAL', category: 'Database', desc: 'Cloud SQL accessible publicly' },
  { id: 'CLOUD_FUNCTION_PUBLIC_ACCESS', provider: 'GCP', severity: 'HIGH', category: 'Serverless', desc: 'Cloud Function allows unauthenticated access' },
];

export default function CloudsploitDetectors() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-search-eye-line" />
          Security Check Reference
        </div>
        <DocHeading level={1}>Detector Reference</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Complete reference of all Cloudsploit security detectors. Each detector checks for a specific cloud misconfiguration and provides remediation guidance.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Understanding Detectors</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Each Cloudsploit detector:
        </p>
        <ul className="space-y-2 text-cyber-text">
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-line text-cyber-cyan mt-0.5" />
            <span><strong className="text-white">Checks a specific resource:</strong> Scans cloud resources (buckets, VMs, IAM, etc.)</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-line text-cyber-cyan mt-0.5" />
            <span><strong className="text-white">Validates configuration:</strong> Compares settings against security benchmarks</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-line text-cyber-cyan mt-0.5" />
            <span><strong className="text-white">Assigns severity:</strong> Critical, High, Medium, or Low based on risk</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-line text-cyber-cyan mt-0.5" />
            <span><strong className="text-white">Provides remediation:</strong> Step-by-step fix instructions</span>
          </li>
        </ul>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Severity Levels</DocHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="cyber-card p-4 border-l-4 border-red-500">
            <h3 className="text-sm font-semibold text-red-400">Critical</h3>
            <p className="text-xs text-cyber-text mt-1">Immediate security risk requiring urgent attention. Public exposure, unrestricted access, or encryption disabled.</p>
          </div>
          <div className="cyber-card p-4 border-l-4 border-orange-500">
            <h3 className="text-sm font-semibold text-orange-400">High</h3>
            <p className="text-xs text-cyber-text mt-1">Significant security issue. Missing MFA, no backups, or missing logging.</p>
          </div>
          <div className="cyber-card p-4 border-l-4 border-yellow-500">
            <h3 className="text-sm font-semibold text-yellow-400">Medium</h3>
            <p className="text-xs text-cyber-text mt-1">Moderate risk. Configuration improvements, monitoring gaps.</p>
          </div>
          <div className="cyber-card p-4 border-l-4 border-blue-400">
            <h3 className="text-sm font-semibold text-blue-400">Low</h3>
            <p className="text-xs text-cyber-text mt-1">Informational or best practice recommendations.</p>
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Searchable Detector Table</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          All {allDetectors.length}+ detectors across AWS, Azure, and GCP:
        </p>
        <div className="cyber-card p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cyber-border">
                <th className="text-left py-2 px-3 text-cyber-cyan font-semibold">ID</th>
                <th className="text-left py-2 px-3 text-cyber-cyan font-semibold">Provider</th>
                <th className="text-left py-2 px-3 text-cyber-cyan font-semibold">Severity</th>
                <th className="text-left py-2 px-3 text-cyber-cyan font-semibold">Category</th>
                <th className="text-left py-2 px-3 text-cyber-cyan font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {allDetectors.map((det) => (
                <tr key={det.id} className="border-b border-cyber-border/50 hover:bg-cyber-bg/50">
                  <td className="py-2 px-3">
                    <code className="text-xs px-1.5 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-text">
                      {det.id}
                    </code>
                  </td>
                  <td className="py-2 px-3">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      det.provider === 'AWS' ? 'bg-amber/10 text-cyber-amber' :
                      det.provider === 'Azure' ? 'bg-cyan/10 text-cyber-cyan' :
                      'bg-green/10 text-cyber-green'
                    }`}>
                      {det.provider}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      det.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                      det.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                      det.severity === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-400/20 text-blue-400'
                    }`}>
                      {det.severity}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-xs text-cyber-text">{det.category}</td>
                  <td className="py-2 px-3 text-xs text-cyber-text">{det.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Custom Detectors</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Write your own detectors in JavaScript to check for organization-specific requirements:
        </p>
        <CodeBlock
          language="javascript"
          code={`module.exports = {
  name: "CUSTOM_TAG_REQUIRED",
  description: "All EC2 instances must have Owner tag",
  category: "Compute",
  severity: "MEDIUM",

  async run(provider) {
    const ec2 = provider.getClient('ec2');
    const instances = await ec2.describeInstances();

    for (const instance of instances.Reservations.flatMap(r => r.Instances)) {
      const hasOwnerTag = instance.Tags?.some(t => t.Key === 'Owner');
      if (!hasOwnerTag) {
        this.addIssue(
          'Instance ' + instance.InstanceId + ' missing Owner tag',
          instance.InstanceId,
          'Add Owner tag to instance'
        );
      }
    }
  }
};`}
        />
        <p className="text-cyber-text mt-4">
          Save custom detectors to <code className="text-cyber-cyan">~/.cloudsploit/detectors/</code> and enable with <code className="text-cyber-cyan">--custom-dir</code>.
        </p>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/cloudsploit/command-flags" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Command Flags <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
      </motion.section>
    </div>
  );
}
