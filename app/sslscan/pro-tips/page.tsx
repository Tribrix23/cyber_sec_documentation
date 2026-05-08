'use client'
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import InlineCode from '@/components/base/InlineCode';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function ProTipsPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-medium font-mono mb-4">
          <i className="ri-lightbulb-line" />
          SSLScan Section 8 of 10
        </div>
        <DocHeading level={1}>Pro Tips</DocHeading>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="space-y-3">
          <Callout type="tip">Use <InlineCode>--no-failed</InlineCode> to hide rejected ciphers and focus on what the server actually accepts.</Callout>
          <Callout type="info">SSLScan works on any TCP service with TLS — not just HTTPS. Use <InlineCode>--starttls-smtp</InlineCode> for mail servers.</Callout>
          <Callout type="tip">Export results to XML with <InlineCode>--xml=results.xml</InlineCode> for automated parsing and reporting.</Callout>
          <Callout type="warning">A server supporting TLS 1.0 or 1.1 is a finding in most compliance frameworks (PCI-DSS, HIPAA, SOC2).</Callout>
        </div>
      </motion.section>

      <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/sslscan/quiz" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Quiz <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sslscan/command-builder" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-green hover:text-cyber-green transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}