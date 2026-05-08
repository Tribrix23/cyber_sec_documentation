'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Codeblock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const azureScanners = [
  {
    category: 'Identity & Access',
    detectors: [
      { name: 'Azure AD Password Policy', id: 'AZURE_AD_PASSWORD_POLICY', desc: 'Checks Azure AD password protection settings' },
      { name: 'Azure AD MFA Enforcement', id: 'AZURE_AD_MFA_ENFORCEMENT', desc: 'Verifies MFA is enabled for all users' },
      { name: 'Azure AD Guest Users', id: 'AZURE_AD_GUEST_USERS', desc: 'Identifies external guest users and their access' },
      { name: 'Azure AD Privileged Role Assignments', id: 'AZURE_AD_PRIVILEGED_ROLES', desc: 'Checks for excessive privileged role assignments' },
      { name: 'Service Principal Credential Age', id: 'AZURE_SP_CREDENTIAL_AGE', desc: 'Service principal credentials older than 90 days' },
    ],
  },
  {
    category: 'Storage',
    detectors: [
      { name: 'Storage Account Public Access', id: 'STORAGE_ACCOUNT_PUBLIC_ACCESS', desc: 'Storage container or blob public access enabled' },
      { name: 'Storage Account Secure Transfer', id: 'STORAGE_ACCOUNT_SECURE_TRANSFER', desc: 'HTTPS only not enforced for storage' },
      { name: 'Storage Account Encryption', id: 'STORAGE_ACCOUNT_ENCRYPTION', desc: 'Customer-managed keys or Microsoft-managed encryption' },
      { name: 'Storage Account Network Rules', id: 'STORAGE_ACCOUNT_NETWORK_RULES', desc: 'Network restrictions missing (default allow all)' },
      { name: 'Storage Account Logging Enabled', id: 'STORAGE_ACCOUNT_LOGGING_ENABLED', desc: 'Read/write/delete logging not configured' },
      { name: 'Storage Account Blob Versioning', id: 'STORAGE_ACCOUNT_BLOB_VERSIONING', desc: 'Blob versioning disabled (data retention risk)' },
    ],
  },
  {
    category: 'Compute',
    detectors: [
      { name: 'VM Public IP Address', id: 'VM_PUBLIC_IP_ADDRESS', desc: 'Virtual machine has public IP assigned' },
      { name: 'VM Disk Encryption', id: 'VM_DISK_ENCRYPTION', desc: 'OS/data disks not encrypted with Azure Disk Encryption' },
      { name: 'VM Backup Enabled', id: 'VM_BACKUP_ENABLED', desc: 'Azure Backup not configured for VM' },
      { name: 'VM Anti-Malware Extension', id: 'VM_ANTI_MALWARE_EXTENSION', desc: 'Microsoft Antimalware extension not installed' },
      { name: 'App Service HTTPS Only', id: 'APP_SERVICE_HTTPS_ONLY', desc: 'HTTPS-only setting not enabled for web app' },
      { name: 'App Service Authentication', id: 'APP_SERVICE_AUTHENTICATION', desc: 'Authentication/Authorization not enabled' },
      { name: 'App Service Always On', id: 'APP_SERVICE_ALWAYS_ON', desc: 'Always On setting disabled (affects reliability)' },
    ],
  },
  {
    category: 'Database',
    detectors: [
      { name: 'SQL Server Auditing', id: 'SQL_SERVER_AUDITING', desc: 'Auditing not enabled for Azure SQL Database' },
      { name: 'SQL Server Encryption', id: 'SQL_SERVER_ENCRYPTION', desc: 'Transparent Data Encryption (TDE) not enabled' },
      { name: 'SQL Server Threat Detection', id: 'SQL_SERVER_THREAT_DETECTION', desc: 'Advanced Threat Protection not enabled' },
      { name: 'SQL Server Firewall Rules', id: 'SQL_SERVER_FIREWALL_RULES', desc: 'Overly permissive firewall rules (0.0.0.0)' },
      { name: 'Cosmos DB Firewall', id: 'COSMOS_DB_FIREWALL', desc: 'Cosmos DB firewall rules too permissive' },
      { name: 'Redis Cache Firewall', id: 'REDIS_FIREWALL', desc: 'Azure Cache for Redis firewall configuration' },
    ],
  },
  {
    category: 'Security & Key Vault',
    detectors: [
      { name: 'Key Vault Soft Delete', id: 'KEY_VAULT_SOFT_DELETE', desc: 'Soft delete not enabled (permanent loss risk)' },
      { name: 'Key Vault Purge Protection', id: 'KEY_VAULT_PURGE_PROTECTION', desc: 'Purge protection disabled' },
      { name: 'Key Vault Firewall', id: 'KEY_VAULT_FIREWALL', desc: 'Key Vault network rules too permissive' },
      { name: 'Security Center Standard Tier', id: 'SECURITY_CENTER_STANDARD', desc: 'Using Free tier instead of Standard' },
      { name: 'Security Center Auto Provisioning', id: 'SECURITY_CENTER_AUTO_PROVISIONING', desc: 'Auto-provisioning of security agents disabled' },
      { name: 'Defender for Storage Enabled', id: 'DEFENDER_FOR_STORAGE_ENABLED', desc: 'Microsoft Defender for Storage not enabled' },
    ],
  },
  {
    category: 'Container & Kubernetes',
    detectors: [
      { name: 'AKS RBAC Enabled', id: 'AKS_RBAC_ENABLED', desc: 'RBAC not enabled for AKS cluster' },
      { name: 'AKS Network Policy', id: 'AKS_NETWORK_POLICY', desc: 'Network policy not enabled (Calico/Azure)' },
      { name: 'AKS OMS Agent', id: 'AKS_OMS_AGENT', desc: 'Log Analytics agent not installed on AKS' },
      { name: 'Container Registry Admin User', id: 'CONTAINER_REGISTRY_ADMIN_USER', desc: 'Admin user enabled on ACR (security risk)' },
      { name: 'Container Registry Firewall', id: 'CONTAINER_REGISTRY_FIREWALL', desc: 'ACR network rules not configured' },
    ],
  },
  {
    category: 'Monitoring & Governance',
    detectors: [
      { name: 'Activity Log Retention', id: 'ACTIVITY_LOG_RETENTION', desc: 'Activity log retention less than 365 days' },
      { name: 'Resource Locks Missing', id: 'RESOURCE_LOCKS_MISSING', desc: 'Critical resources lack resource locks' },
      { name: 'Policy Assignment Missing', id: 'POLICY_ASSIGNMENT_MISSING', desc: 'Azure Policy not assigned to subscription' },
      { name: 'Cost Anomaly Detection', id: 'COST_ANOMALY_DETECTION', desc: 'Cost Management anomaly detection disabled' },
    ],
  },
];

export default function CloudsploitAzureScanners() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-microsoft-line" />
          Azure Security Checks
        </div>
        <DocHeading level={1}>Azure Scanners</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Cloudsploit's Azure detectors analyze your Azure tenant for security misconfigurations across Active Directory, Storage, Virtual Machines, SQL Database, Key Vault, AKS, and more.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Scanning Azure Tenant</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Run a full Azure security scan:
        </p>
        <Codeblock
          language="bash"
          code={`cloudsploit scan azure`}
        />
        <p className="text-cyber-text mt-4">
          List all Azure detectors:
        </p>
        <Codeblock
          language="bash"
          code={`cloudsploit detectors --provider azure --list`}
        />
      </motion.section>

      {azureScanners.map((category, idx) => (
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
        <DocHeading level={2}>Scan Specific Subscription</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Target specific Azure subscriptions when you have multi-tenant access:
        </p>
        <Codeblock
          language="bash"
          code={`# Scan single subscription
cloudsploit scan azure --subscription-id xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Scan multiple subscriptions
cloudsploit scan azure --subscriptions sub1,sub2,sub3

# Exclude subscription
cloudsploit scan azure --exclude-subscriptions old-sub-id`}
        />
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/cloudsploit/gcp-scanners" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: GCP Scanners <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
      </motion.section>
    </div>
  );
}
