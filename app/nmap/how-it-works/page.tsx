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

const phases = [
  {
    num: '01',
    title: 'Target Specification',
    short: 'How Nmap interprets your input',
    detail: 'Nmap begins by parsing the targets you provide on the command line. It accepts single IP addresses (192.168.1.1), hostnames (scanme.nmap.org), CIDR ranges (10.0.0.0/24), hyphen ranges (192.168.1.1-100), and files containing lists of targets (-iL). Nmap resolves DNS names, expands ranges into individual addresses, and deduplicates the final target list. For IPv6, use the -6 flag. Nmap also supports excluding targets with --exclude and --excludefile.',
    flags: ['nmap 192.168.1.1', 'nmap 10.0.0.0/24', 'nmap -iL targets.txt', 'nmap --exclude 192.168.1.1 10.0.0.0/24'],
  },
  {
    num: '02',
    title: 'Host Discovery',
    short: 'Determining which targets are online',
    detail: 'By default, Nmap does not blindly scan every IP you specify. First, it attempts host discovery to avoid wasting time on offline addresses. It sends ICMP echo requests, TCP SYN to port 443, TCP ACK to port 80, and ICMP timestamp requests. If any probe receives a response, the host is marked "up" and proceeds to port scanning. Use -Pn to skip this phase entirely — useful when ICMP is blocked by firewalls. Use -sn to perform only host discovery without port scanning.',
    flags: ['nmap -sn 10.0.0.0/24', 'nmap -Pn 192.168.1.1', 'nmap -PE -PP -PM 10.0.0.1'],
  },
  {
    num: '03',
    title: 'Port Scanning',
    short: 'Probing ports and interpreting responses',
    detail: 'Nmap sends crafted packets to each target port based on the selected scan type. For TCP SYN scans (-sS), it sends a SYN packet. If SYN-ACK returns, the port is open. If RST returns, it is closed. If nothing returns, it may be filtered. UDP scans (-sU) send UDP datagrams and expect ICMP "port unreachable" for closed ports. Nmap can scan all 65,535 ports (-p-) or a subset. Parallelism is controlled by timing templates (-T0 to -T5).',
    flags: ['nmap -sS -p- 10.0.0.1', 'nmap -sU -p 53,161 10.0.0.1', 'nmap --top-ports 100 10.0.0.1'],
  },
  {
    num: '04',
    title: 'Service & Version Detection',
    short: 'Identifying what is actually running',
    detail: 'When -sV is enabled, Nmap sends application-layer probes to every open port. These probes are designed to elicit version-specific responses from services like SSH, HTTP, FTP, SMTP, and databases. Responses are matched against the nmap-service-probes database, which contains over 7,000 signatures. Version detection also attempts to extract extra info such as protocol numbers, hostname, operating system, device type, and service CPE identifiers.',
    flags: ['nmap -sV 10.0.0.1', 'nmap -sV --version-intensity 5 10.0.0.1', 'nmap -A 10.0.0.1'],
  },
  {
    num: '05',
    title: 'OS Detection',
    short: 'Fingerprinting the operating system',
    detail: 'With -O, Nmap sends a series of specially crafted TCP and UDP probes designed to expose subtle differences in OS TCP/IP stack implementations. Factors analyzed include IPID sequencing, initial TTL values, TCP window sizes, TCP option support and ordering, and responses to malformed packets. Nmap compares these fingerprints against its nmap-os-db database of thousands of known OS signatures. Results include OS family, version, and confidence percentage.',
    flags: ['nmap -O 10.0.0.1', 'nmap -O --osscan-limit 10.0.0.1', 'nmap -A 10.0.0.1'],
  },
  {
    num: '06',
    title: 'NSE Script Execution',
    short: 'Automated vulnerability and service checks',
    detail: 'The Nmap Scripting Engine (NSE) runs Lua scripts against discovered targets. Scripts are organized into categories: auth, broadcast, brute, default, discovery, dos, exploit, external, fuzzer, intrusive, malware, safe, version, and vuln. Default scripts (-sC) run safe, non-intrusive checks. The vuln category detects known CVEs. Brute scripts attempt credential guessing. Discovery scripts enumerate additional hosts, users, or shares. Scripts can run pre-scan, host-scan, service-scan, or post-scan phases.',
    flags: ['nmap -sC 10.0.0.1', 'nmap --script vuln 10.0.0.1', 'nmap --script "http-*" 10.0.0.1'],
  },
  {
    num: '07',
    title: 'Output Generation',
    short: 'Formatting results for humans and machines',
    detail: 'Nmap supports four output formats simultaneously: normal (-oN) for human reading, XML (-oX) for tool parsing and import into vulnerability management platforms, grepable (-oG) for command-line processing with grep/awk, and JSON (-oJ) for modern API integration. Nmap also provides real-time runtime interaction: press v/V for verbosity, d/D for debugging, p/P for packet tracing, and ? for a help menu during an active scan.',
    flags: ['nmap -oN results.txt -oX results.xml 10.0.0.1', 'nmap -oG results.gnmap 10.0.0.1', 'nmap -v 10.0.0.1'],
  },
];

const packetTypes = [
  {
    type: 'TCP SYN',
    purpose: 'Check if port is open (stealth scan)',
    response: 'SYN-ACK = open, RST = closed, nothing = filtered',
  },
  {
    type: 'TCP Connect',
    purpose: 'Full handshake when raw sockets unavailable',
    response: 'Full three-way handshake completed by OS',
  },
  {
    type: 'UDP Datagram',
    purpose: 'Probe UDP services',
    response: 'ICMP unreachable = closed, nothing = open/filtered',
  },
  {
    type: 'ICMP Echo',
    purpose: 'Host discovery (ping)',
    response: 'Echo reply = host up',
  },
  {
    type: 'ARP Request',
    purpose: 'Local network host discovery',
    response: 'ARP reply = host up (most reliable locally)',
  },
  {
    type: 'NSE Probes',
    purpose: 'Application-layer service interrogation',
    response: 'Varies by script — banners, versions, CVEs',
  },
];

export default function NmapHowItWorksPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-settings-3-line" />
            Nmap Section 2 of 13
          </div>
          <DocHeading level={1}>How Nmap Works</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3 text-lg">
            Nmap does not simply "scan ports." It follows a carefully designed pipeline of distinct phases, each of which can be independently configured, skipped, or extended. Understanding this pipeline is essential for interpreting scan results and troubleshooting when things go wrong.
          </p>
        </motion.div>

        {/* The 7 Phases */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>The Seven Phases of an Nmap Scan</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3">
            Every Nmap scan follows the same fundamental pipeline. While some phases can be disabled with flags, the default behavior processes targets through all seven stages sequentially.
          </p>

          <div className="mt-6 space-y-4">
            {phases.map((phase) => (
              <div key={phase.num} className="cyber-card p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyber-amber/10 border border-cyber-amber/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-cyber-amber font-mono">{phase.num}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white">{phase.title}</h3>
                    <p className="text-xs text-cyber-text-dim mt-0.5">{phase.short}</p>
                    <p className="text-xs text-cyber-text leading-relaxed mt-3">{phase.detail}</p>
                    <div className="mt-3 space-y-1.5">
                      {phase.flags.map((flag, idx) => (
                        <code key={idx} className="block text-xs font-mono text-cyber-green bg-cyber-bg border border-cyber-border rounded px-2 py-1">
                          {flag}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Packet Types */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Packet Types Nmap Sends</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3">
            Nmap is fundamentally a packet crafter. It builds and sends specific packet types to elicit responses that reveal information about the target. Understanding these packets helps you read Nmap output and troubleshoot scan issues.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm border border-cyber-border rounded-lg overflow-hidden">
              <thead className="bg-cyber-bg-card">
                <tr>
                  <th className="text-left px-4 py-3 text-cyber-text font-semibold">Packet Type</th>
                  <th className="text-left px-4 py-3 text-cyber-text font-semibold">Purpose</th>
                  <th className="text-left px-4 py-3 text-cyber-text font-semibold">Expected Response</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-border">
                {packetTypes.map((pt) => (
                  <tr key={pt.type} className="hover:bg-cyber-bg-card/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-cyber-amber text-xs">{pt.type}</td>
                    <td className="px-4 py-3 text-cyber-text text-xs">{pt.purpose}</td>
                    <td className="px-4 py-3 text-cyber-text text-xs">{pt.response}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Privileges */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Privilege Requirements</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3">
            Many of Nmap&apos;s most powerful features require elevated privileges because they craft raw packets that bypass the operating system&apos;s TCP/IP stack. This is a security feature of modern operating systems.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-green mb-2"><i className="ri-shield-check-line mr-1" /> Root / Administrator</h3>
              <ul className="space-y-1.5 text-xs text-cyber-text">
                <li><InlineCode>-sS</InlineCode> (TCP SYN scan) — raw packet crafting</li>
                <li><InlineCode>-sU</InlineCode> (UDP scan) — raw UDP packets</li>
                <li><InlineCode>-sN/sF/sX</InlineCode> — NULL, FIN, Xmas scans</li>
                <li><InlineCode>-O</InlineCode> (OS detection) — raw probe crafting</li>
                <li><InlineCode>-f</InlineCode> (packet fragmentation) — raw packet manipulation</li>
              </ul>
            </div>
            <div className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-amber mb-2"><i className="ri-user-line mr-1" /> Unprivileged User</h3>
              <ul className="space-y-1.5 text-xs text-cyber-text">
                <li><InlineCode>-sT</InlineCode> (TCP Connect scan) — uses OS connect()</li>
                <li><InlineCode>-sV</InlineCode> (Version detection) — application layer only</li>
                <li><InlineCode>--script</InlineCode> (NSE scripts) — most scripts work fine</li>
                <li><InlineCode>-Pn</InlineCode>, <InlineCode>-n</InlineCode> — no special requirements</li>
                <li><InlineCode>-p</InlineCode>, <InlineCode>-T</InlineCode> — timing and port selection</li>
              </ul>
            </div>
          </div>

          <Callout type="warning" className="mt-4">
            Without root privileges, <InlineCode>-sS</InlineCode> silently falls back to <InlineCode>-sT</InlineCode>. The scan still works but is slower, more visible in logs, and less stealthy.
          </Callout>
        </motion.section>

        {/* Performance */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Scan Performance Fundamentals</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3">
            Nmap scan speed depends on multiple factors: network latency, target responsiveness, firewall behavior, the number of ports scanned, and the timing template selected. Understanding these interactions helps you choose the right settings for your environment.
          </p>

          <div className="mt-6 space-y-4">
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-white mb-2">Parallelism</h3>
              <p className="text-xs text-cyber-text leading-relaxed">
                Nmap sends multiple probes in parallel to different targets and ports. The <InlineCode>-T</InlineCode> templates control the maximum number of parallel probes, timeouts, and retry limits. Higher templates increase parallelism but also increase network load and IDS visibility.
              </p>
            </div>
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-white mb-2">Retransmissions</h3>
              <p className="text-xs text-cyber-text leading-relaxed">
                If a probe receives no response, Nmap assumes packet loss and retransmits. The number of retries depends on the timing template. On unreliable networks, Nmap may retransmit several times before marking a port as filtered. Use <InlineCode>--max-retries 0</InlineCode> to disable retransmissions for faster (but less accurate) scans.
              </p>
            </div>
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-white mb-2">RTT Estimation</h3>
              <p className="text-xs text-cyber-text leading-relaxed">
                Nmap continuously estimates round-trip time (RTT) to each target and adjusts probe timing accordingly. This dynamic adaptation prevents scans from being too aggressive on slow networks or too slow on fast ones. You can override this with <InlineCode>--min-rtt-timeout</InlineCode> and <InlineCode>--max-rtt-timeout</InlineCode>.
              </p>
            </div>
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-white mb-2">Host Groups</h3>
              <p className="text-xs text-cyber-text leading-relaxed">
                Nmap processes targets in groups rather than one at a time. This allows efficient parallel scanning across many hosts. The default group size is optimized for most networks, but you can adjust it with <InlineCode>--min-hostgroup</InlineCode> and <InlineCode>--max-hostgroup</InlineCode> for very large or small scans.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Troubleshooting */}
        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Common Scan Issues</DocHeading>
          <div className="mt-4 space-y-3">
            <Callout type="warning" title="All ports show filtered">
              This usually means a firewall is dropping all probe packets. Try <InlineCode>-Pn</InlineCode> to skip host discovery, or use <InlineCode>-sS</InlineCode> with a different source port (<InlineCode>--source-port 53</InlineCode>) to bypass simple stateless filters.
            </Callout>
            <Callout type="warning" title="Scan is extremely slow">
              UDP scans and scans through VPNs or high-latency links can be very slow. Reduce the port range, increase the timing template, or use <InlineCode>--max-retries 1</InlineCode> to limit retransmissions.
            </Callout>
            <Callout type="warning" title="open|filtered everywhere">
              This ambiguous state often appears with UDP, IP protocol, or stealth scans (FIN/NULL/Xmas) when no response is received. It means Nmap cannot distinguish between an open port and a filtered port. Use <InlineCode>-sS</InlineCode> or <InlineCode>-sT</InlineCode> for clearer results.
            </Callout>
            <Callout type="warning" title="OS detection fails">
              OS detection requires at least one open and one closed TCP port. If the target has no closed ports or if a firewall blocks all probes, <InlineCode>-O</InlineCode> may not produce results. Try a broader port scan first to ensure both open and closed ports exist.
            </Callout>
          </div>

          <div className="mt-8 flex gap-3">
            <a href="/nmap/scan-types" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Scan Types <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/nmap/what-is-nmap" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
  );
}
