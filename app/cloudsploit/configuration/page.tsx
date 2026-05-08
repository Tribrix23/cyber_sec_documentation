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

export default function CloudsploitConfiguration() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-settings-3-line" />
          API Keys & Settings
        </div>
        <DocHeading level={1}>Configuration</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Cloudsploit requires cloud provider credentials to scan your infrastructure. Configure authentication via environment variables, configuration files, or interactive prompts.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Configuration Methods</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Cloudsploit supports multiple configuration methods, checked in this order:
        </p>
        <ol className="space-y-3 text-cyber-text">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan text-xs font-bold flex-shrink-0 mt-0.5">1</span>
            <div>
              <strong className="text-white">Environment Variables</strong>
              <p className="mt-1 text-sm">Set via <code className="text-cyber-cyan">AWS_ACCESS_KEY_ID</code>, <code className="text-cyber-cyan">AWS_SECRET_ACCESS_KEY</code>, etc.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan text-xs font-bold flex-shrink-0 mt-0.5">2</span>
            <div>
              <strong className="text-white">Cloudsploit Config File</strong>
              <p className="mt-1 text-sm"><code className="text-cyber-cyan">~/.cloudsploit/config.json</code> or <code className="text-cyber-cyan">--config</code> flag</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan text-xs font-bold flex-shrink-0 mt-0.5">3</span>
            <div>
              <strong className="text-white">Cloud Provider Defaults</strong>
              <p className="mt-1 text-sm">AWS CLI <code className="text-cyber-cyan">~/.aws/credentials</code>, Azure <code className="text-cyber-cyan">~/.azure/credentials</code>, GCP application default credentials</p>
            </div>
          </li>
        </ol>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>AWS Configuration</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Configure AWS credentials using IAM access keys with appropriate permissions:
        </p>

        <h3 className="text-base font-semibold text-white mt-5 mb-3">Method 1: Environment Variables</h3>
        <Codeblock
          language="bash"
          code={`export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
export AWS_REGION=us-east-1`}
        />

        <h3 className="text-base font-semibold text-white mt-5 mb-3">Method 2: AWS Credentials File</h3>
        <p className="text-cyber-text mb-2">
          Use the standard AWS credentials file at <code className="text-cyber-cyan">~/.aws/credentials</code>:
        </p>
        <Codeblock
          language="bash"
          code={`[default]
aws_access_key_id = AKIAIOSFODNN7EXAMPLE
aws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
region = us-east-1`}
        />

        <h3 className="text-base font-semibold text-white mt-5 mb-3">Method 3: IAM Role (EC2/ECS/Lambda)</h3>
        <p className="text-cyber-text">
          When running Cloudsploit on EC2, ECS, or Lambda, attach an IAM role with read-only permissions. No credentials needed - Cloudsploit automatically uses the instance profile.
        </p>

        <Callout type="warning" className="mt-4">
          Use read-only credentials for scans. Never use root account or admin-level credentials. Follow the principle of least privilege.
        </Callout>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Azure Configuration</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          For Azure, use a service principal with Reader role at the subscription or management group level:
        </p>

        <h3 className="text-base font-semibold text-white mt-5 mb-3">Create Service Principal</h3>
        <Codeblock
          language="bash"
          code={`az ad sp create-for-rbac --name "cloudsploit-scanner" --role Reader --scopes /subscriptions/{subscription-id}`}
        />

        <h3 className="text-base font-semibold text-white mt-5 mb-3">Set Environment Variables</h3>
        <Codeblock
          language="bash"
          code={`export AZURE_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
export AZURE_CLIENT_SECRET=your_client_secret
export AZURE_TENANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
export AZURE_SUBSCRIPTION_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`}
        />

        <h3 className="text-base font-semibold text-white mt-5 mb-3">Or Use Azure CLI Credentials</h3>
        <p className="text-cyber-text">
          If you're already logged in with <code className="text-cyber-cyan">az login</code>, Cloudsploit will use those credentials automatically.
        </p>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>GCP Configuration</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          For Google Cloud, use a service account key with roles like Viewer, Security Viewer, or a custom role:
        </p>

        <h3 className="text-base font-semibold text-white mt-5 mb-3">Create Service Account Key</h3>
        <Codeblock
          language="bash"
          code={`gcloud iam service-accounts create cloudsploit-scanner \\
  --display-name "Cloudsploit Scanner"

gcloud projects add-iam-policy-binding {project-id} \\
  --member "serviceAccount:cloudsploit-scanner@{project-id}.iam.gserviceaccount.com" \\
  --role "roles/viewer"

gcloud iam service-accounts keys create ~/key.json \\
  --iam-account cloudsploit-scanner@{project-id}.iam.gserviceaccount.com`}
        />

        <h3 className="text-base font-semibold text-white mt-5 mb-3">Set Environment Variable</h3>
        <Codeblock
          language="bash"
          code={`export GOOGLE_APPLICATION_CREDENTIALS=~/key.json
export GOOGLE_CLOUD_PROJECT=your-project-id`}
        />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Configuration File</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Create a configuration file at <code className="text-cyber-cyan">~/.cloudsploit/config.json</code> for persistent settings:
        </p>
        <Codeblock
          language="json"
          code={`{
  "aws": {
    "accessKeyId": "AKIAIOSFODNN7EXAMPLE",
    "secretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    "region": "us-east-1",
    "enabled": true
  },
  "azure": {
    "clientId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "clientSecret": "your_secret",
    "tenantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "subscriptionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "enabled": false
  },
  "gcp": {
    "keyFile": "/path/to/key.json",
    "projectId": "your-project-id",
    "enabled": false
  },
  "scan": {
    "regions": ["us-east-1", "us-west-2"],
    "services": ["s3", "ec2", "iam", "rds"],
    "output": "json",
    "suppress": ["S3_BUCKET_PUBLIC_READ"]
  }
}`}
        />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Multiple Cloud Accounts</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Scan multiple AWS accounts using organization-wide access or multiple credential sets:
        </p>
        <Codeblock
          language="bash"
          code={`# Using multiple profiles
cloudsploit scan aws --profile prod-account
cloudsploit scan aws --profile dev-account

# Or specify credentials directly
AWS_ACCESS_KEY_ID=key1 AWS_SECRET_ACCESS_KEY=secret1 cloudsploit scan aws --account-name "Production"
AWS_ACCESS_KEY_ID=key2 AWS_SECRET_ACCESS_KEY=secret2 cloudsploit scan aws --account-name "Development"`}
        />
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/cloudsploit/running-scans" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Running Scans <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
      </motion.section>
    </div>
  );
}
