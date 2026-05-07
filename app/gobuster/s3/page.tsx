import { useEffect } from 'react';
import Layout from '@/components/feature/Layout';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import InlineCode from '@/components/base/InlineCode';
import CodeBlock from '@/components/base/CodeBlock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function GobusterS3Page() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
            <i className="ri-cloud-line" />
            Gobuster Section 4 of 13
          </div>
          <DocHeading level={1}>AWS S3 Bucket Enumeration</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            The <strong className="text-white">s3</strong> mode brute forces Amazon S3 bucket names to find publicly exposed buckets with misconfigured permissions. S3 buckets are a common source of data breaches when left open or misconfigured.
          </p>
        </motion.div>

        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Understanding S3 Buckets</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Amazon S3 (Simple Storage Service) is a cloud object storage service. Files are stored in containers called <strong className="text-white">buckets</strong>, each with a globally unique name. Bucket names follow the pattern: <InlineCode>https://bucket-name.s3.amazonaws.com/</InlineCode>.
          </p>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            When a bucket is misconfigured with public read access, anyone on the internet can list its contents and download files. This has led to massive data breaches involving personal information, database backups, source code, and credentials.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-green mb-2"><i className="ri-check-line mr-1" /> Properly Secured</h3>
              <ul className="space-y-1.5 text-xs text-cyber-text-muted">
                <li>Bucket is private — no public access</li>
                <li>S3 bucket policy denies all public access</li>
                <li>IAM policies restrict access to specific roles</li>
                <li>Access logging is enabled</li>
              </ul>
            </div>
            <div className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-red mb-2"><i className="ri-close-line mr-1" /> Misconfigured</h3>
              <ul className="space-y-1.5 text-xs text-cyber-text-muted">
                <li>Public read access enabled</li>
                <li>Anyone can list bucket contents</li>
                <li>Anyone can download files</li>
                <li>No access logging or monitoring</li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>S3 Enumeration Commands</DocHeading>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Basic S3 Bucket Scan</h3>
              <CodeBlock code="gobuster s3 -w /usr/share/wordlists/s3-buckets.txt" />
              <p className="text-xs text-cyber-text-muted mt-2">Tests each word in the wordlist as a potential S3 bucket name against AWS endpoints.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Fast Scan with More Threads</h3>
              <CodeBlock code="gobuster s3 -w s3-buckets.txt -t 50" />
              <p className="text-xs text-cyber-text-muted mt-2">Increases thread count for faster enumeration against AWS APIs.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Save Results</h3>
              <CodeBlock code="gobuster s3 -w s3-buckets.txt -o s3-results.txt" />
              <p className="text-xs text-cyber-text-muted mt-2">Saves discovered bucket names for manual inspection and reporting.</p>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>What to Do When You Find a Bucket</DocHeading>
          <div className="mt-4 space-y-3">
            <Callout type="warning">
              If you find an open S3 bucket, do NOT download files without explicit authorization. Document the finding and report it to the bucket owner. Unauthorized access to cloud storage may violate laws.
            </Callout>
            <Callout type="tip">
              You can manually check a bucket with: <InlineCode>curl https://bucket-name.s3.amazonaws.com/</InlineCode>. A 200 response with an XML listing means the bucket is publicly listable.
            </Callout>
            <Callout type="info">
              AWS S3 bucket names are globally unique. Common naming patterns include: company-backups, company-dev, company-staging, company-logs, and app-name-data.
            </Callout>
          </div>

          <div className="mt-8 flex gap-3">
            <a href="/gobuster/fuzz" className="px-5 py-2.5 rounded-lg bg-cyber-red text-white text-sm font-semibold hover:bg-cyber-red/80 transition-all whitespace-nowrap">
              Next: Fuzzing <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/gobuster/vhost" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text-muted hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}