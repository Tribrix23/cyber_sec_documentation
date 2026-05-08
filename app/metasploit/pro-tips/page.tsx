'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function MetasploitProTipsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-lightbulb-line" />
          Metasploit Section 8 of 10
        </div>
        <DocHeading level={1}>Pro Tips</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Expert advice for efficient and effective Metasploit usage.
        </p>
      </motion.div>

      <motion.section className="mt-8 space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Callout type="tip">
          Always verify target scope before running exploits. A single wrong RHOSTS can cause unintended damage.
        </Callout>
        <Callout type="info">
          Use <code className="text-cyber-amber">db_nmap</code> to scan and automatically import results into Metasploit's database for easy target selection.
        </Callout>
        <Callout type="tip">
          Set <code className="text-cyber-amber">setg LHOST</code> once at the start of your session so you never forget it in individual modules.
        </Callout>
        <Callout type="warning">
          Never expose Metasploit listener ports to the public internet without proper firewall rules. Set <code className="text-cyber-amber">LHOST</code> to your VPN or internal IP.
        </Callout>
        <Callout type="info">
          Use <code className="text-cyber-amber">sessions -K</code> to kill all active sessions and <code className="text-cyber-amber">jobs -K</code> to stop all background jobs when done.
        </Callout>
        <Callout type="tip">
          Resource scripts (.rc files) let you automate repetitive exploit sequences. Run with <code className="text-cyber-amber">msfconsole -r script.rc</code>.
        </Callout>
        <Callout type="info">
          Use <code className="text-cyber-amber">setg</code> for global settings and <code className="text-cyber-amber">set</code> for module-specific settings.
        </Callout>
        <Callout type="tip">
          Test auxiliary modules first (like scanners) to confirm vulnerabilities before attempting exploits.
        </Callout>
        <Callout type="warning">
          Always ensure you have written authorization before testing any system with Metasploit.
        </Callout>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="mt-8 flex gap-3">
          <a href="/metasploit/quiz" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Quiz <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/metasploit/database" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}