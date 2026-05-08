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

const ciExamples = [
  {
    platform: 'GitHub Actions',
    icon: 'ri-github-line',
    color: 'text-cyber-cyan',
    yaml: `name: Cloud Security Scan
on:
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 6 * * *'  # Daily at 6 AM

jobs:
  cloudsploit-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Cloudsploit
        run: npm install -g @aquasecurity/cloudsploit

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Run Cloudsploit scan
        run: |
          cloudsploit scan aws \\
            --services iam,s3,ec2 \\
            --severity critical,high \\
            --output json \\
            --outfile results.json

      - name: Upload results
        uses: actions/upload-artifact@v3
        with:
          name: cloudsploit-results
          path: results.json

      - name: Fail on critical issues
        run: |
          if grep -q '"severity":"CRITICAL"' results.json; then
            echo "Critical security issues found!"
            cat results.json
            exit 1
          fi`,
    },
  {
    platform: 'GitLab CI',
    icon: 'ri-gitlab-line',
    color: 'text-cyber-amber',
    yaml: `stages:
  - security

cloudsploit-scan:
  stage: security
  image: node:18
  before_script:
    - npm install -g @aquasecurity/cloudsploit
  script:
    - cloudsploit scan aws \\
        --services iam,s3,ec2,rds \\
        --severity high,critical \\
        --output json \\
        --outfile results.json
    - |
      if grep -q '"severity":"CRITICAL"' results.json; then
        echo "Critical security issues found!"
        exit 1
      fi
  artifacts:
    paths:
      - results.json
    expire_in: 1 week
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == "main"
      when: schedule`,
    variables: {
      'AWS_ACCESS_KEY_ID': '$AWS_ACCESS_KEY_ID',
      'AWS_SECRET_ACCESS_KEY': '$AWS_SECRET_ACCESS_KEY',
    },
  },
  {
    platform: 'Jenkins',
    icon: 'ri-git-merge-line',
    color: 'text-cyber-green',
    yaml: `pipeline {
  agent any

  environment {
    CLOUDSPLOIT_HOME = tool name: 'cloudsploit', type: 'com.aquasecurity.cloudsploit'
    AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
    AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
  }

  stages {
    stage('Install Cloudsploit') {
      steps {
        sh 'npm install -g @aquasecurity/cloudsploit'
      }
    }

    stage('Security Scan') {
      steps {
        sh '''
          cloudsploit scan aws \\
            --services iam,s3,ec2 \\
            --severity critical,high \\
            --output junit \\
            --outfile results.xml
        '''
      }
    }

    stage('Publish Results') {
      steps {
        junit 'results.xml'
        archiveArtifacts artifacts: 'results.json', fingerprint: true
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}`,
    },
  {
    platform: 'Azure DevOps',
    icon: 'ri-microsoft-line',
    color: 'text-cyber-cyan',
    yaml: `trigger:
  - main
  - develop

schedules:
  - cron: "0 6 * * *"
    displayName: Daily 6 AM scan
    branches:
      include:
        - main

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '18.x'
    displayName: 'Install Node.js'

  - script: npm install -g @aquasecurity/cloudsploit
    displayName: 'Install Cloudsploit'

  - task: AWSCLI@1
    inputs:
      awsCredentials: 'AWS-Service-Connection'
      regionName: 'us-east-1'
    displayName: 'Configure AWS credentials'

  - script: |
      cloudsploit scan aws \\
        --services iam,s3,ec2 \\
        --severity critical \\
        --output json \\
        --outfile results.json
    displayName: 'Run Cloudsploit scan'

  - task: PublishBuildArtifacts@1
    inputs:
      PathtoPublish: 'results.json'
      ArtifactName: 'security-scan'
    displayName: 'Publish results'`,
    },
  ];

export default function CloudsploitCiCd() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-git-branch-line" />
          Automation & Pipelines
        </div>
        <DocHeading level={1}>CI/CD Integration</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Integrate Cloudsploit into your CI/CD pipelines to automatically scan cloud infrastructure on every pull request, merge, or schedule. Fail builds on critical findings and track security posture over time.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Why CI/CD Integration?</DocHeading>
        <div className="cyber-card p-5 mt-4">
          <ul className="space-y-3 text-sm text-cyber-text">
            <li className="flex items-start gap-2">
              <i className="ri-checkbox-line text-cyber-cyan mt-0.5" />
              <span><strong className="text-white">Shift Left Security:</strong> Catch issues before infrastructure is deployed to production</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-checkbox-line text-cyber-cyan mt-0.5" />
              <span><strong className="text-white">Prevent Drift:</strong> Stop misconfigurations from entering production via PR gates</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-checkbox-line text-cyber-cyan mt-0.5" />
              <span><strong className="text-white">Continuous Monitoring:</strong> Daily automated scans keep security posture visible</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-checkbox-line text-cyber-cyan mt-0.5" />
              <span><strong className="text-white">Audit Trail:</strong> Pipeline history provides security change timeline</span>
            </li>
          </ul>
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Pipeline Examples</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Ready-to-use pipeline configurations for popular CI/CD platforms:
        </p>

        <div className="space-y-6">
          {ciExamples.map((example, idx) => (
            <div key={idx} className="cyber-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <i className={`${example.icon} text-xl ${example.color}`} />
                <h3 className="text-base font-semibold text-white">{example.platform}</h3>
              </div>
              <Codeblock
                language="yaml"
                code={example.yaml}
              />
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Secrets Management</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Securely store cloud credentials in your CI/CD platform's secret store:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-cyber-cyan mb-2">GitHub Secrets</h3>
            <p className="text-xs text-cyber-text mb-2">
              Store in repository or organization secrets:
            </p>
            <Codeblock
              language="bash"
              code={`AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1`}
            />
          </div>

          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-cyber-cyan mb-2">GitLab CI Variables</h3>
            <p className="text-xs text-cyber-text mb-2">
              Settings &rarr; CI/CD &rarr; Variables:
            </p>
            <Codeblock
              language="bash"
              code={`AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_DEFAULT_REGION`}
            />
          </div>

          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Jenkins Credentials</h3>
            <p className="text-xs text-cyber-text mb-2">
              Add via Jenkins credential store:
            </p>
            <Codeblock
              language="bash"
              code={`Username: AWS_ACCESS_KEY_ID
Password: AWS_SECRET_ACCESS_KEY
ID: aws-credentials`}
            />
          </div>

          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Azure Pipeline Variables</h3>
            <p className="text-xs text-cyber-text mb-2">
              Library &rarr; Variable groups:
            </p>
            <Codeblock
              language="bash"
              code={`awsAccessKey
awsSecretKey
awsRegion`}
            />
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Fail Conditions</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Configure pipelines to fail based on scan results:
        </p>
        <div className="space-y-4">
          <Callout type="success">
            <strong className="text-cyber-cyan">Pass on No Critical:</strong> Allow high/medium findings but fail on critical issues
          </Callout>
          <Codeblock
            language="bash"
            code={`# Fail only on critical findings
cloudsploit scan aws --severity critical --output json > results.json
if [ $(jq '.findings | length' results.json) -gt 0 ]; then
  echo "CRITICAL issues found!"
  exit 1
fi`}
          />

          <Callout type="warning" className="mt-4">
            <strong className="text-cyber-amber">Regresssion Detection:</strong> Fail if new findings appear compared to baseline
          </Callout>
          <Codeblock
            language="bash"
            code={`# Compare with baseline
cloudsploit scan aws --output json > current.json
jq -s '.[1] - .[0]' baseline.json current.json > diff.json
if [ $(jq '.findings | length' diff.json) -gt 0 ]; then
  echo "New security issues detected!"
  exit 1
fi`}
          />
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Docker Alternative</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Use the official Docker image for consistent execution across environments:
        </p>
        <Codeblock
          language="yaml"
          code={`- name: Run Cloudsploit (Docker)
  run: |
    docker run --rm \\
      -v ~/.cloudsploit:/root/.cloudsploit \\
      -e AWS_ACCESS_KEY_ID=\${AWS_ACCESS_KEY_ID} \\
      -e AWS_SECRET_ACCESS_KEY=\${AWS_SECRET_ACCESS_KEY} \\
      -e AWS_REGION=us-east-1 \\
      aquasec/cloudsploit:latest \\
      scan aws --services iam,s3 --output json`}
        />
        <Callout type="info" className="mt-4">
          Docker image ensures consistent versioning and eliminates Node.js dependency management in runners.
        </Callout>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/cloudsploit/quiz" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Quiz <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
      </motion.section>
    </div>
  );
}
