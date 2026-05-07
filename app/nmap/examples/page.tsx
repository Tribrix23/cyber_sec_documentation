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

const exampleCategories = [
  {
    title: 'Basic Scanning',
    examples: [
      {
        title: 'Quick port scan on a single target',
        cmd: 'nmap 192.168.1.1',
        desc: 'Scans the top 1000 most common TCP ports. This is the simplest possible Nmap command and the starting point for any reconnaissance.',
        when: 'Use as your first scan against any new target to get a quick overview of open services.',
      },
      {
        title: 'Scan an IP range',
        cmd: 'nmap 192.168.1.1-254',
        desc: 'Scans 254 hosts in the specified range. Nmap expands the range and processes each host individually, showing results as they arrive.',
        when: 'Use for host discovery and port scanning across a subnet. Faster than scanning each IP individually.',
      },
      {
        title: 'Scan a CIDR network',
        cmd: 'nmap 10.0.0.0/24',
        desc: 'Scans all 256 IP addresses in the /24 subnet. Nmap automatically expands CIDR notation into individual addresses.',
        when: 'Use when you know the network size and want to discover all live hosts and their services in one command.',
      },
      {
        title: 'Ping scan only (no ports)',
        cmd: 'nmap -sn 192.168.1.0/24',
        desc: 'Performs host discovery only, skipping port scanning. Uses ICMP, TCP SYN (443), and TCP ACK (80) to find live hosts.',
        when: 'Use to quickly map which hosts are online before deciding which ones to port-scan more deeply.',
      },
    ],
  },
  {
    title: 'Advanced Port Scanning',
    examples: [
      {
        title: 'Stealth SYN scan on all 65,535 ports',
        cmd: 'nmap -sS -p- 10.0.0.1',
        desc: 'Combines stealth SYN scanning with full port range coverage. Requires root privileges. Scans every single TCP port, which can take 10-30 minutes depending on network speed.',
        when: 'Use when you need complete coverage and have root access. Be patient — this is thorough but slow.',
      },
      {
        title: 'Aggressive scan with OS and version detection',
        cmd: 'nmap -A -T4 10.0.0.1',
        desc: '-A enables OS detection, version detection, default NSE scripts, and traceroute. -T4 speeds it up. This is the most comprehensive single-target scan.',
        when: 'Use for deep reconnaissance on a single target when time permits. Provides maximum information in one scan.',
      },
      {
        title: 'Fast top-100 ports with no ping',
        cmd: 'nmap -Pn --top-ports 100 10.0.0.0/24',
        desc: 'Skips host discovery (-Pn) and scans only the 100 most common ports. Fast way to check a large network for obvious services.',
        when: 'Use for quick sweeps across large networks where ICMP ping is blocked by firewalls.',
      },
      {
        title: 'UDP scan for DNS and SNMP',
        cmd: 'nmap -sU -p 53,161 10.0.0.1',
        desc: 'UDP scanning is slow because connectionless protocols provide no acknowledgment. Limiting to specific ports makes it practical.',
        when: 'Use when you need to find UDP services. Always limit the port range — scanning all UDP ports takes hours.',
      },
    ],
  },
  {
    title: 'NSE Script Scanning',
    examples: [
      {
        title: 'Run all vulnerability scripts',
        cmd: 'nmap --script vuln 10.0.0.1',
        desc: 'Runs every script in the "vuln" category, which detects known vulnerabilities like EternalBlue, Heartbleed, and CVEs based on version banners.',
        when: 'Use after finding open services to quickly identify exploitable vulnerabilities. This is noisy but invaluable.',
      },
      {
        title: 'Run default scripts',
        cmd: 'nmap -sC 10.0.0.1',
        desc: 'Equivalent to --script=default. Runs safe, non-intrusive scripts that provide useful info like HTTP titles, SSL certs, and SSH hostkeys.',
        when: 'Use as a standard addition to every scan. Safe enough for production systems.',
      },
      {
        title: 'Grab HTTP titles on a subnet',
        cmd: 'nmap --script http-title -p 80,8080,8443 10.0.0.0/24',
        desc: 'Runs the http-title script against all specified web ports across the subnet. Great for quickly identifying exposed web applications.',
        when: 'Use during reconnaissance to map web applications and find interesting titles like "Admin Panel" or "phpMyAdmin".',
      },
      {
        title: 'Enumerate SMB shares',
        cmd: 'nmap --script smb-enum-shares -p 445 10.0.0.1',
        desc: 'Discovers SMB shares, their permissions, and contents. Often reveals sensitive files, backups, or credential stores.',
        when: 'Use against Windows targets or Samba servers to find exposed network shares.',
      },
    ],
  },
  {
    title: 'Evasion & Stealth',
    examples: [
      {
        title: 'Decoy scan with 10 random IPs',
        cmd: 'nmap -D RND:10 -sS -p 22,80,443 10.0.0.1',
        desc: 'Hides your real IP among 10 random decoy addresses. The target sees traffic from 11 sources and cannot easily identify the real scanner.',
        when: 'Use when you need to obscure the scanning source in target logs. Requires you to specify your real IP with ME if needed.',
      },
      {
        title: 'Fragment packets to evade IDS',
        cmd: 'nmap -f -sS -p 80 10.0.0.1',
        desc: 'Splits packets into tiny 8-byte fragments after the IP header. Some simple IDS signatures cannot reassemble fragments.',
        when: 'Use against simple packet filters or older IDS systems that lack fragment reassembly.',
      },
      {
        title: 'Spoof source port to 53 (DNS)',
        cmd: 'nmap --source-port 53 -sS 10.0.0.1',
        desc: 'Many firewalls allow traffic from port 53 because DNS is essential. By spoofing this source port, some simple filters may allow your scan through.',
        when: 'Use against stateless firewalls that whitelist well-known ports without full connection tracking.',
      },
      {
        title: 'Idle (zombie) scan',
        cmd: 'nmap -sI 192.168.1.100:113 10.0.0.1',
        desc: 'The ultimate stealth scan. Bounces probes through an idle "zombie" host so the target never sees your IP at all.',
        when: 'Use only when you have identified a suitable zombie host with predictable IPID sequencing. Very difficult to execute successfully on modern systems.',
      },
    ],
  },
  {
    title: 'Output & Logging',
    examples: [
      {
        title: 'Output to XML and normal formats',
        cmd: 'nmap -oX scan.xml -oN scan.txt 10.0.0.1',
        desc: 'Saves results in both XML (for tools) and normal text (for humans) simultaneously. You can output to all formats with -oA.',
        when: 'Use on every professional engagement. XML output integrates with Metasploit, Dradis, and other reporting tools.',
      },
      {
        title: 'Scan from a target list file',
        cmd: 'nmap -iL targets.txt -oN results.txt',
        desc: 'Reads target IPs or hostnames from a file instead of the command line. Useful for large-scope engagements with hundreds of targets.',
        when: 'Use when you have a pre-defined scope list from the client or discovered via reconnaissance.',
      },
      {
        title: 'Traceroute with full detection',
        cmd: 'nmap -A --traceroute 10.0.0.1',
        desc: 'Combines aggressive scanning with network path tracing. Shows each hop between you and the target, useful for understanding network topology.',
        when: 'Use to map network topology and identify intermediate firewalls, routers, or proxies.',
      },
      {
        title: 'Show reasons for port states',
        cmd: 'nmap --reason 10.0.0.1',
        desc: 'Displays exactly why Nmap classified each port as open, closed, or filtered. Shows responses like "syn-ack", "reset", or "no-response".',
        when: 'Use when debugging scan results or writing detailed reports that need to justify every finding.',
      },
    ],
  },
];

export default function NmapExamplesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-file-list-line" />
            Nmap Section 9 of 13
          </div>
          <DocHeading level={1}>Usage Examples</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            Real-world Nmap commands organized by use case. Each example includes the command, a detailed explanation of what it does, and guidance on when to use it.
          </p>
        </motion.div>

        {exampleCategories.map((cat) => (
          <motion.section key={cat.title} className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <DocHeading level={2}>{cat.title}</DocHeading>
            <div className="mt-4 space-y-5">
              {cat.examples.map((ex, i) => (
                <div key={i} className="cyber-card p-5">
                  <h3 className="text-sm font-semibold text-white mb-2">{ex.title}</h3>
                  <CodeBlock code={ex.cmd} />
                  <p className="text-xs text-cyber-text-muted leading-relaxed mt-3">{ex.desc}</p>
                  <p className="text-xs text-cyber-amber mt-2">
                    <i className="ri-lightbulb-line mr-1" />
                    {ex.when}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        ))}

        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Callout type="danger">
            All examples assume you have <strong className="text-white">written authorization</strong> to scan the target. Never run these commands against networks you do not own without explicit permission.
          </Callout>

          <div className="mt-8 flex gap-3">
            <a href="/nmap/command-builder" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Command Builder <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/nmap/installation" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text-muted hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
  );
}
