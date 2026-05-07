'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import InlineCode from '@/components/base/InlineCode';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const tips = [
  {
    title: 'Always Use -Pn When ICMP is Blocked',
    content: 'Modern firewalls routinely block ICMP echo requests. If you scan without -Pn, Nmap may skip hosts it incorrectly thinks are down. This is one of the most common mistakes that causes incomplete scan results.',
    command: 'nmap -Pn -sS 10.0.0.1',
    type: 'warning' as const,
  },
  {
    title: 'Combine -sS with -sV for Maximum Value',
    content: 'A SYN scan finds open ports. Version detection tells you what is actually running. Together they provide the foundation for every vulnerability assessment. Always run both when doing deep reconnaissance.',
    command: 'nmap -sS -sV 10.0.0.1',
    type: 'tip' as const,
  },
  {
    title: 'Save Output in Multiple Formats',
    content: 'Normal output is human-readable. XML output integrates with tools like Metasploit, Dradis, and vulnerability scanners. Grepable output enables quick command-line parsing. Use -oA to generate all three at once.',
    command: 'nmap -oA scan-results -A 10.0.0.1',
    type: 'info' as const,
  },
  {
    title: 'Use --top-ports for Quick Sweeps',
    content: 'Scanning all 65,535 ports is often unnecessary. The top 1000 ports catch approximately 95% of interesting services. Use --top-ports 100 for extremely fast initial sweeps across large networks.',
    command: 'nmap --top-ports 100 -Pn 10.0.0.0/24',
    type: 'tip' as const,
  },
  {
    title: 'Limit UDP Scans to Specific Ports',
    content: 'UDP scans are extremely slow because of timeouts and lack of handshake. Never scan all UDP ports unless you have days to wait. Focus on ports 53 (DNS), 67/68 (DHCP), 69 (TFTP), 123 (NTP), 161 (SNMP), and 500 (IKE).',
    command: 'nmap -sU -p 53,161,500 10.0.0.1',
    type: 'warning' as const,
  },
  {
    title: 'Use Decoys to Hide Your Source IP',
    content: 'The -D flag creates decoy IP addresses that make it harder for the target to identify the real scanner in their logs. Combine with RND for random decoys or specify real IPs for more believable cover.',
    command: 'nmap -D RND:10,ME -sS 10.0.0.1',
    type: 'info' as const,
  },
  {
    title: 'Fragment Packets to Evade Simple IDS',
    content: 'The -f flag splits IP packets into 8-byte fragments after the header. Some simple packet filters and older IDS signatures cannot reassemble fragments, allowing your scan to pass undetected.',
    command: 'nmap -f -sS -p 80 10.0.0.1',
    type: 'tip' as const,
  },
  {
    title: 'Use --reason for Debugging',
    content: 'When scan results seem wrong, --reason shows exactly why Nmap classified each port. It displays responses like "syn-ack", "reset", "no-response", or "admin-prohibited" that explain the classification.',
    command: 'nmap --reason -sS 10.0.0.1',
    type: 'info' as const,
  },
  {
    title: 'Scan from Files for Large Engagements',
    content: 'For engagements with hundreds of targets, maintain a targets.txt file and use -iL. This is more manageable than extremely long command lines and makes it easy to update scope.',
    command: 'nmap -iL targets.txt -oN results.txt',
    type: 'tip' as const,
  },
  {
    title: 'Use -T4 in Labs, -T3 on Production',
    content: 'Aggressive timing (-T4) is perfect for CTFs and lab environments where speed matters. On production networks, stick with Normal (-T3) or Polite (-T2) to avoid overwhelming targets or triggering alerts.',
    command: 'nmap -T4 -A 10.0.0.1',
    type: 'warning' as const,
  },
  {
    title: 'Run Vuln Scripts After Finding Open Services',
    content: 'The vuln category is powerful but noisy. Run a basic port scan first, then target vuln scripts at hosts with interesting services. This is faster and less likely to trigger IDS than blanket vuln scanning.',
    command: 'nmap -sS -p 22,80,443 10.0.0.1 && nmap --script vuln -p 22,80,443 10.0.0.1',
    type: 'info' as const,
  },
  {
    title: 'Check scanme.nmap.org for Practice',
    content: 'scanme.nmap.org is a real server maintained by the Nmap project for safe practice. It responds like a typical Linux server and is perfectly safe to scan. Use it to test commands before deploying them in real engagements.',
    command: 'nmap -A scanme.nmap.org',
    type: 'tip' as const,
  },
];

const checklists = [
  {
    title: 'Pre-Scan Checklist',
    items: [
      'Confirm written authorization for the target scope',
      'Verify Nmap version is up to date (nmap --version)',
      'Ensure you have root privileges for SYN scans',
      'Check network connectivity to the target (ping or -sn)',
      'Verify wordlists are available for NSE brute scripts',
      'Plan output format (-oA recommended for engagements)',
      'Choose appropriate timing template for the environment',
    ],
  },
  {
    title: 'Post-Scan Checklist',
    items: [
      'Review all open ports and their services',
      'Cross-reference service versions with CVE databases',
      'Investigate filtered ports — they may be open behind firewalls',
      'Document OS detection results and confidence levels',
      'Review NSE script output for vulnerabilities and misconfigurations',
      'Export results to your reporting platform',
      'Archive raw scan files for compliance and evidence',
    ],
  },
];

export default function NmapProTipsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-lightbulb-line" />
            Nmap Section 11 of 13
          </div>
          <DocHeading level={1}>Pro Tips</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3 text-lg">
            Expert guidance distilled from years of real-world Nmap usage. These tips cover stealth, accuracy, output management, and practical workflows that separate beginners from professionals.
          </p>
        </motion.div>

        {/* Tips */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Expert Recommendations</DocHeading>
          <div className="mt-6 space-y-4">
            {tips.map((tip) => (
              <div key={tip.title}>
                <Callout type={tip.type} title={tip.title}>
                  <p className="text-xs text-cyber-text leading-relaxed mb-2">{tip.content}</p>
                  <CodeBlock code={tip.command} />
                </Callout>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Checklists */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Professional Checklists</DocHeading>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {checklists.map((cl) => (
              <div key={cl.title} className="cyber-card p-5">
                <h3 className="text-sm font-semibold text-white mb-3">{cl.title}</h3>
                <ul className="space-y-2">
                  {cl.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-cyber-text">
                      <span className="w-4 h-4 rounded border border-cyber-border flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-check-line text-[8px] text-cyber-green" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Legal */}
        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Legal & Ethical Considerations</DocHeading>
          <Callout type="danger">
            Unauthorized port scanning is illegal in many jurisdictions and violates the terms of service of most cloud providers and ISPs. Always obtain explicit, written authorization before scanning any network you do not own. Document your scope and permissions carefully.
          </Callout>
          <div className="mt-4 cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Rules of Engagement</h3>
            <ul className="space-y-2">
              {[
                'Never scan networks outside your authorized scope',
                'Do not use Nmap to scan government or military networks without explicit authorization',
                'Report findings responsibly and do not exploit vulnerabilities without permission',
                'Respect rate limits and scan gently on production systems',
                'Delete scan data when the engagement concludes per your agreement',
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-cyber-text">
                  <span className="w-1 h-1 rounded-full bg-cyber-red mt-1.5 flex-shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex gap-3">
            <a href="/nmap/quiz" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Quiz <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/nmap/command-builder" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
  );
}
