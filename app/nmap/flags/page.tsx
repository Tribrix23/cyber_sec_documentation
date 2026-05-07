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

const flagCategories = [
  {
    title: 'Scan Control',
    flags: [
      { flag: '-sS', desc: 'TCP SYN scan (stealth, default with root)', example: 'nmap -sS 10.0.0.1' },
      { flag: '-sT', desc: 'TCP Connect scan (uses OS connect())', example: 'nmap -sT 10.0.0.1' },
      { flag: '-sU', desc: 'UDP scan', example: 'nmap -sU -p 53 10.0.0.1' },
      { flag: '-sV', desc: 'Service/version detection', example: 'nmap -sV 10.0.0.1' },
      { flag: '-O', desc: 'OS detection (fingerprinting)', example: 'nmap -O 10.0.0.1' },
      { flag: '-A', desc: 'Aggressive: enables -O, -sV, -sC, --traceroute', example: 'nmap -A 10.0.0.1' },
      { flag: '-sC', desc: 'Run default NSE scripts', example: 'nmap -sC 10.0.0.1' },
      { flag: '-sn', desc: 'Ping scan only (no ports)', example: 'nmap -sn 10.0.0.0/24' },
      { flag: '-Pn', desc: 'Skip host discovery, treat all as online', example: 'nmap -Pn 10.0.0.1' },
    ],
  },
  {
    title: 'Port Selection',
    flags: [
      { flag: '-p <ports>', desc: 'Scan specific ports (comma or range)', example: 'nmap -p 22,80,443 10.0.0.1' },
      { flag: '-p-', desc: 'Scan all 65,535 TCP ports', example: 'nmap -p- 10.0.0.1' },
      { flag: '-p 1-1000', desc: 'Scan port range', example: 'nmap -p 1-1000 10.0.0.1' },
      { flag: '--top-ports <n>', desc: 'Scan the N most common ports', example: 'nmap --top-ports 100 10.0.0.1' },
      { flag: '-F', desc: 'Fast scan: top 100 ports', example: 'nmap -F 10.0.0.1' },
      { flag: '-r', desc: 'Scan ports in sequential order (not random)', example: 'nmap -r -p- 10.0.0.1' },
      { flag: '--port-ratio <ratio>', desc: 'Scan ports more common than given ratio', example: 'nmap --port-ratio 0.01 10.0.0.1' },
    ],
  },
  {
    title: 'Host Discovery',
    flags: [
      { flag: '-PS<portlist>', desc: 'TCP SYN ping on specified ports', example: 'nmap -PS22,80,443 10.0.0.1' },
      { flag: '-PA<portlist>', desc: 'TCP ACK ping on specified ports', example: 'nmap -PA80 10.0.0.1' },
      { flag: '-PU<portlist>', desc: 'UDP ping on specified ports', example: 'nmap -PU53 10.0.0.1' },
      { flag: '-PE', desc: 'ICMP echo request ping', example: 'nmap -PE 10.0.0.1' },
      { flag: '-PP', desc: 'ICMP timestamp request ping', example: 'nmap -PP 10.0.0.1' },
      { flag: '-PM', desc: 'ICMP address mask request ping', example: 'nmap -PM 10.0.0.1' },
      { flag: '-PR', desc: 'ARP ping (local networks only)', example: 'nmap -PR 10.0.0.0/24' },
      { flag: '-n', desc: 'Never do DNS resolution', example: 'nmap -n 10.0.0.1' },
      { flag: '-R', desc: 'Always do DNS resolution', example: 'nmap -R 10.0.0.1' },
    ],
  },
  {
    title: 'Timing & Performance',
    flags: [
      { flag: '-T<0-5>', desc: 'Set timing template (0=paranoid, 5=insane)', example: 'nmap -T4 10.0.0.1' },
      { flag: '--min-parallelism <num>', desc: 'Minimum probe parallelism', example: 'nmap --min-parallelism 100 10.0.0.1' },
      { flag: '--max-parallelism <num>', desc: 'Maximum probe parallelism', example: 'nmap --max-parallelism 50 10.0.0.1' },
      { flag: '--min-rtt-timeout <time>', desc: 'Minimum probe round trip time', example: 'nmap --min-rtt-timeout 100ms 10.0.0.1' },
      { flag: '--max-rtt-timeout <time>', desc: 'Maximum probe round trip time', example: 'nmap --max-rtt-timeout 2s 10.0.0.1' },
      { flag: '--max-retries <tries>', desc: 'Maximum number of port scan probe retransmissions', example: 'nmap --max-retries 3 10.0.0.1' },
      { flag: '--host-timeout <time>', desc: 'Give up on target after this time', example: 'nmap --host-timeout 30m 10.0.0.0/24' },
      { flag: '--scan-delay <time>', desc: 'Delay between probes to a host', example: 'nmap --scan-delay 5s 10.0.0.1' },
    ],
  },
  {
    title: 'Evasion & Spoofing',
    flags: [
      { flag: '-f', desc: 'Fragment packets (8 bytes after header)', example: 'nmap -f 10.0.0.1' },
      { flag: '-D <decoy1,decoy2,...>', desc: 'Hide scan among decoys', example: 'nmap -D RND:10,ME 10.0.0.1' },
      { flag: '-S <IP_Address>', desc: 'Spoof source address', example: 'nmap -S 192.168.1.100 10.0.0.1' },
      { flag: '-e <iface>', desc: 'Use specified network interface', example: 'nmap -e eth0 10.0.0.1' },
      { flag: '--source-port <portnum>', desc: 'Spoof source port number', example: 'nmap --source-port 53 10.0.0.1' },
      { flag: '--data-length <num>', desc: 'Append random data to packet payloads', example: 'nmap --data-length 200 10.0.0.1' },
      { flag: '--spoof-mac <mac>', desc: 'Spoof MAC address', example: 'nmap --spoof-mac 0 10.0.0.1' },
      { flag: '--badsum', desc: 'Send packets with bogus checksums', example: 'nmap --badsum 10.0.0.1' },
    ],
  },
  {
    title: 'Output Formats',
    flags: [
      { flag: '-oN <file>', desc: 'Normal output (human readable)', example: 'nmap -oN scan.txt 10.0.0.1' },
      { flag: '-oX <file>', desc: 'XML output', example: 'nmap -oX scan.xml 10.0.0.1' },
      { flag: '-oG <file>', desc: 'Grepable output', example: 'nmap -oG scan.gnmap 10.0.0.1' },
      { flag: '-oA <basename>', desc: 'Output in all major formats', example: 'nmap -oA scan 10.0.0.1' },
      { flag: '-v', desc: 'Increase verbosity', example: 'nmap -v 10.0.0.1' },
      { flag: '-vv', desc: 'More verbosity', example: 'nmap -vv 10.0.0.1' },
      { flag: '-d', desc: 'Increase debugging level', example: 'nmap -d 10.0.0.1' },
      { flag: '--reason', desc: 'Display reason for port state', example: 'nmap --reason 10.0.0.1' },
      { flag: '--open', desc: 'Only show open (or possibly open) ports', example: 'nmap --open 10.0.0.1' },
      { flag: '--packet-trace', desc: 'Show all packets sent and received', example: 'nmap --packet-trace 10.0.0.1' },
    ],
  },
  {
    title: 'Target Specification',
    flags: [
      { flag: '-iL <inputfilename>', desc: 'Read targets from file', example: 'nmap -iL targets.txt' },
      { flag: '-iR <num hosts>', desc: 'Choose random targets', example: 'nmap -iR 100' },
      { flag: '--exclude <host1,...>', desc: 'Exclude hosts/networks', example: 'nmap --exclude 10.0.0.1 10.0.0.0/24' },
      { flag: '--excludefile <exclude_file>', desc: 'Exclude list from file', example: 'nmap --excludefile exclude.txt 10.0.0.0/24' },
    ],
  },
];

export default function NmapFlagsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-flag-line" />
            Nmap Section 6 of 13
          </div>
          <DocHeading level={1}>Common Flags Reference</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3 text-lg">
            Nmap has over 100 command-line flags. This reference organizes the most essential ones into seven categories, each with a description and a working example you can copy and modify.
          </p>
        </motion.div>

        {flagCategories.map((cat) => (
          <motion.section key={cat.title} className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <DocHeading level={2}>{cat.title}</DocHeading>
            <div className="mt-4 space-y-3">
              {cat.flags.map((f) => (
                <div key={f.flag} className="cyber-card p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                    <code className="text-xs font-mono text-cyber-cyan bg-cyber-bg border border-cyber-border rounded px-2 py-1 flex-shrink-0 whitespace-nowrap">
                      {f.flag}
                    </code>
                    <div className="flex-1">
                      <p className="text-sm text-cyber-text">{f.desc}</p>
                      <code className="block text-xs font-mono text-cyber-green mt-2">{f.example}</code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        ))}

        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Callout type="info">
            For the complete flag reference, run <InlineCode>nmap --help</InlineCode> or consult the official Nmap manual at <a href="https://nmap.org/book/man.html" target="_blank" rel="noopener noreferrer nofollow" className="text-cyber-cyan hover:underline">nmap.org/book/man.html</a>
          </Callout>

          <div className="mt-8 flex gap-3">
            <a href="/nmap/nse-scripts" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: NSE Scripts <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/nmap/timing" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
  );
}
