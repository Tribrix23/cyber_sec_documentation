'use client'
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import CodeBlock from '@/components/base/Codeblock';
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
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-lightbulb-line" />
          SQLMap Section 11 of 13
        </div>
        <DocHeading level={1}>Pro Tips</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Expert advice for efficient and effective SQL injection testing with SQLMap.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="space-y-4">
          <Callout type="tip">
            Export requests from Burp Suite and use <InlineCode>sqlmap -r request.txt</InlineCode> to test them — much easier than manually crafting URLs.
          </Callout>
          <Callout type="info">
            Start with <InlineCode>--level=1 --risk=1</InlineCode> and increase only if needed. Higher levels send more requests and may cause damage.
          </Callout>
          <Callout type="tip">
            Use <InlineCode>--batch</InlineCode> to run non-interactively and accept all defaults — great for scripting.
          </Callout>
          <Callout type="warning">
            The <InlineCode>--os-shell</InlineCode> and <InlineCode>--file-write</InlineCode> options can cause serious damage to the target system. Use with extreme caution.
          </Callout>
          <Callout type="tip">
            Chain multiple tamper scripts for better WAF bypass: <InlineCode>--tamper=space2comment,randomcase,charencode</InlineCode>
          </Callout>
          <Callout type="info">
            Use <InlineCode>--tor</InlineCode> for anonymity, but remember Tor is slow. Consider a VPN for faster scans.
          </Callout>
          <Callout type="tip">
            Save session files to resume interrupted scans: <InlineCode>--flush-session</InlineCode> clears old sessions.
          </Callout>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Optimization Tips</h3>
        <div className="space-y-4">
          <div className="cyber-card p-4">
            <h4 className="text-sm font-semibold text-cyber-cyan mb-2">Speed Up Scans</h4>
            <CodeBlock code="sqlmap -u 'http://target.com?id=1' --threads=10 --batch --level=3" />
            <p className="text-xs text-cyber-text mt-2">
              Use more threads for faster scanning, but don't overload the target.
            </p>
          </div>
          <div className="cyber-card p-4">
            <h4 className="text-sm font-semibold text-cyber-cyan mb-2">Stealth Mode</h4>
            <CodeBlock code="sqlmap -u 'http://target.com?id=1' --delay=2 --timeout=30 --retries=1" />
            <p className="text-xs text-cyber-text mt-2">
              Add delays to avoid detection by rate limiting or IDS.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/sqlmap/quiz" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Quiz <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sqlmap/command-builder" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}