import { useEffect } from 'react';
import Layout from '@/components/feature/Layout';
import DocHeading from '@/components/base/DocHeading';
import LabExercise from '@/components/base/LabExercise';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const nmapLabTasks = [
  {
    id: 1,
    title: 'Basic Host Discovery',
    description: 'You want to check if a single host (192.168.1.1) is online without scanning ports. Write the Nmap command.',
    command: 'nmap -sn 192.168.1.1',
    expectedAnswer: 'nmap -sn 192.168.1.1',
    hint: 'Use -sn to disable port scanning and only perform host discovery.',
  },
  {
    id: 2,
    title: 'Stealth SYN Scan',
    description: 'Perform a stealth SYN scan on 192.168.1.1 for ports 22, 80, and 443. Write the full command.',
    command: 'nmap -sS -p 22,80,443 192.168.1.1',
    expectedAnswer: 'nmap -sS -p 22,80,443 192.168.1.1',
    hint: '-sS is the stealth SYN scan flag. Use -p to specify ports.',
  },
  {
    id: 3,
    title: 'Aggressive Scan',
    description: 'Run an aggressive scan on 10.0.0.5 with timing template 4. Include all default aggressive features.',
    command: 'nmap -A -T4 10.0.0.5',
    expectedAnswer: 'nmap -A -T4 10.0.0.5',
    hint: '-A combines OS detection, version detection, scripts, and traceroute.',
  },
  {
    id: 4,
    title: 'Skip Host Discovery',
    description: 'Scan all ports on 10.0.0.1 while skipping the host discovery phase entirely.',
    command: 'nmap -Pn -p- 10.0.0.1',
    expectedAnswer: 'nmap -Pn -p- 10.0.0.1',
    hint: '-Pn treats all targets as online. -p- scans all 65,535 ports.',
  },
  {
    id: 5,
    title: 'Top 100 Ports Scan',
    description: 'Scan the top 100 most common ports on a target 192.168.1.10 without DNS resolution.',
    command: 'nmap --top-ports 100 -n 192.168.1.10',
    expectedAnswer: 'nmap --top-ports 100 -n 192.168.1.10',
    hint: '--top-ports 100 selects the most common ports. -n skips DNS.',
  },
  {
    id: 6,
    title: 'Vulnerability Script Scan',
    description: 'Run all vulnerability scripts against 10.0.0.1. Write the exact command with the --script flag.',
    command: 'nmap --script vuln 10.0.0.1',
    expectedAnswer: 'nmap --script vuln 10.0.0.1',
    hint: 'The script category name is exactly "vuln".',
  },
  {
    id: 7,
    title: 'UDP Scan Specific Ports',
    description: 'Scan UDP ports 53 and 161 on target 10.0.0.1 using the UDP scan type.',
    command: 'nmap -sU -p 53,161 10.0.0.1',
    expectedAnswer: 'nmap -sU -p 53,161 10.0.0.1',
    hint: '-sU enables UDP scanning. Combine with -p for specific ports.',
  },
  {
    id: 8,
    title: 'Output to XML and Normal',
    description: 'Scan 10.0.0.1 and save output to both XML and normal (human-readable) files simultaneously.',
    command: 'nmap -oX scan.xml -oN scan.txt 10.0.0.1',
    expectedAnswer: 'nmap -oX scan.xml -oN scan.txt 10.0.0.1',
    hint: '-oX is for XML, -oN is for normal text output.',
  },
  {
    id: 9,
    title: 'Decoy Scan',
    description: 'Run a SYN scan against 10.0.0.1 on port 80 using 5 random decoy IP addresses.',
    command: 'nmap -D RND:5 -sS -p 80 10.0.0.1',
    expectedAnswer: 'nmap -D RND:5 -sS -p 80 10.0.0.1',
    hint: '-D RND:5 creates 5 random decoys. Combine with -sS and -p.',
  },
  {
    id: 10,
    title: 'Full Network Scan from File',
    description: 'Read target IPs from a file named targets.txt and perform an aggressive scan with traceroute. Save normal output to results.txt.',
    command: 'nmap -A --traceroute -iL targets.txt -oN results.txt',
    expectedAnswer: 'nmap -A --traceroute -iL targets.txt -oN results.txt',
    hint: '-iL reads from a file. -A includes traceroute but adding --traceroute is explicit.',
  },
  {
    id: 11,
    title: 'Version Detection Only',
    description: 'Perform version detection (-sV) on ports 80 and 443 of target scanme.nmap.org.',
    command: 'nmap -sV -p 80,443 scanme.nmap.org',
    expectedAnswer: 'nmap -sV -p 80,443 scanme.nmap.org',
    hint: '-sV probes services for version information. scanme.nmap.org is Nmap\'s test target.',
  },
  {
    id: 12,
    title: 'Fragmented Packet Scan',
    description: 'Send fragmented packets to evade a simple IDS while scanning port 80 on 10.0.0.1.',
    command: 'nmap -f -p 80 10.0.0.1',
    expectedAnswer: 'nmap -f -p 80 10.0.0.1',
    hint: '-f fragments IP packets into tiny fragments after the header.',
  },
];

export default function NmapLabPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-flask-line" />
            Nmap Section 13 of 13
          </div>
          <DocHeading level={1}>Nmap Lab</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            Apply everything you learned. Type the exact Nmap command for each of these 12 scenarios. You can use hints if you get stuck, but try to solve each task from memory first.
          </p>
        </motion.div>

        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <LabExercise title="Nmap Hands-On Lab" tasks={nmapLabTasks} />
        </motion.section>

        <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">How to Practice for Real</h3>
            <p className="text-xs text-cyber-text-muted leading-relaxed">
              These exercises test your command syntax knowledge. For hands-on practice with real targets, set up a vulnerable lab using VMs like Metasploitable, DVWA, or VulnHub machines. scanme.nmap.org is also available for safe, legal practice.
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <a href="/nmap" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              <i className="ri-home-line mr-1" /> Back to Nmap Module
            </a>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}