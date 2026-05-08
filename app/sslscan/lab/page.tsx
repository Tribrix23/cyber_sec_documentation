'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import LabExercise from '@/components/base/LabExercise';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const sslscanLabTasks = [
  {
    id: 1,
    title: 'Basic scan',
    description: 'Scan https://example.com for SSL/TLS configuration',
    expectedAnswer: 'sslscan example.com',
    hint: 'Just specify the target hostname.',
  },
  {
    id: 2,
    title: 'Scan custom port',
    description: 'Scan port 8443 on example.com',
    expectedAnswer: 'sslscan --port=8443 example.com',
    hint: 'Use --port flag with the port number.',
  },
  {
    id: 3,
    title: 'Test Heartbleed',
    description: 'Test example.com for the Heartbleed vulnerability',
    expectedAnswer: 'sslscan --heartbleed example.com',
    hint: 'Add the --heartbleed flag.',
  },
  {
    id: 4,
    title: 'Hide failed ciphers',
    description: 'Scan example.com showing only accepted ciphers',
    expectedAnswer: 'sslscan --no-failed example.com',
    hint: 'Use --no-failed to hide rejected ciphers.',
  },
  {
    id: 5,
    title: 'Show certificate details',
    description: 'Scan example.com and show full certificate details',
    expectedAnswer: 'sslscan --show-certificate example.com',
    hint: 'Add --show-certificate flag.',
  },
];

export default function SSLScanLabPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-medium font-mono mb-4">
          <i className="ri-flask-line" />
          SSLScan Section 10 of 10
        </div>
        <DocHeading level={1}>SSLScan Lab</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Apply everything you learned. Type the exact SSLScan command for each scenario.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <LabExercise title="SSLScan Hands-On Lab" tasks={sslscanLabTasks} />
      </motion.section>

      <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <a href="/sslscan" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
          <i className="ri-home-line mr-1" /> Back to SSLScan Module
        </a>
      </motion.section>
    </div>
  );
}