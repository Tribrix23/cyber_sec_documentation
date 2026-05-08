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

export default function CloudsploitInstallation() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-download-line" />
          Installation & Setup
        </div>
        <DocHeading level={1}>Installation</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Cloudsploit can be installed via npm, Docker, or built from source. Choose the method that best fits your workflow.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Prerequisites</DocHeading>
        <div className="cyber-card p-5 mt-4">
          <ul className="space-y-2 text-sm text-cyber-text">
            <li className="flex items-start gap-2">
              <i className="ri-checkbox-line text-cyber-cyan mt-0.5" />
              <span><strong className="text-white">Node.js:</strong> Version 14+ (for npm installation)</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-checkbox-line text-cyber-cyan mt-0.5" />
              <span><strong className="text-white">Docker:</strong> Version 20.10+ (for Docker installation)</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-checkbox-line text-cyber-cyan mt-0.5" />
              <span><strong className="text-white">Git:</strong> For cloning the repository</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-checkbox-line text-cyber-cyan mt-0.5" />
              <span><strong className="text-white">Cloud Credentials:</strong> AWS access key, Azure service principal, or GCP service account</span>
            </li>
          </ul>
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Install via NPM</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          The simplest way to install Cloudsploit is using npm. This installs the CLI globally:
        </p>
        <Codeblock
          language="bash"
          code={`npm install -g @aquasecurity/cloudsploit`}
        />
        <p className="text-cyber-text mt-4">
          Verify the installation:
        </p>
        <Codeblock
          language="bash"
          code={`cloudsploit --version`}
        />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Install via Docker</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Pull the official Docker image from Aqua Security:
        </p>
        <Codeblock
          language="bash"
          code={`docker pull aquasec/cloudsploit:latest`}
        />
        <p className="text-cyber-text mt-4 mb-2">
          Run a basic scan using Docker:
        </p>
        <Codeblock
          language="bash"
          code={`docker run --rm -v ~/.cloudsploit:/root/.cloudsploit \\
  -e AWS_ACCESS_KEY_ID=your_key \\
  -e AWS_SECRET_ACCESS_KEY=your_secret \\
  aquasec/cloudsploit scan aws`}
        />
        <Callout type="info">
          The <code className="text-cyber-cyan">-v ~/.cloudsploit:/root/.cloudsploit</code> mount persists configuration between runs.
        </Callout>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Install from Source</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          For development or the latest features, clone and build from source:
        </p>
        <Codeblock
          language="bash"
          code={`git clone https://github.com/aquasecurity/cloudsploit.git
cd cloudsploit
npm install
npm run build
npm link`}
        />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Post-Installation Setup</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          After installing, you need to configure cloud provider credentials:
        </p>
        <ol className="space-y-3 text-cyber-text">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan text-xs font-bold flex-shrink-0 mt-0.5">1</span>
            <div>
              <strong className="text-white">Create API credentials</strong>
              <p className="mt-1 text-sm">Generate an access key for AWS, a service principal for Azure, or a service account key for GCP with read-only permissions initially.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan text-xs font-bold flex-shrink-0 mt-0.5">2</span>
            <div>
              <strong className="text-white">Configure credentials</strong>
              <p className="mt-1 text-sm">Set credentials via environment variables, AWS profile, or Cloudsploit config file (<code className="text-cyber-cyan">~/.cloudsploit/config.json</code>).</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan text-xs font-bold flex-shrink-0 mt-0.5">3</span>
            <div>
              <strong className="text-white">Test connection</strong>
              <p className="mt-1 text-sm">Run a quick scan with <code className="text-cyber-cyan">--list</code> flag to verify resource discovery works.</p>
            </div>
          </li>
        </ol>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/cloudsploit/configuration" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Configuration <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
      </motion.section>
    </div>
  );
}
