import { useEffect, useState } from 'react';
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

const scanTypes = [
  {
    flag: '-sS',
    name: 'TCP SYN Scan',
    category: 'TCP',
    stealth: true,
    privilege: true,
    summary: 'Sends SYN packets but never completes the three-way handshake. The default and most popular scan type.',
    detail: `The TCP SYN scan is Nmap's default and most popular technique. It works by sending a SYN packet to each target port. If the port is open, the target responds with SYN-ACK. Instead of completing the handshake with ACK, Nmap immediately sends RST to tear down the connection. From the target's perspective, no full TCP connection was ever established — meaning it typically does not get logged by application-layer services.

This scan requires root/administrator privileges because it crafts raw TCP packets that bypass the operating system's normal TCP/IP stack. Without root, Nmap silently falls back to TCP Connect scan (-sT).

SYN scans are fast, relatively stealthy, and work against virtually all TCP stacks. They are the first choice for virtually every penetration tester and security auditor. The only downside is that stateful firewalls and IDS systems can still detect them, especially at high speeds.`,
    example: 'nmap -sS 192.168.1.1',
    whenToUse: 'Use as your default scan on every engagement. Best for general reconnaissance when you have root access.',
  },
  {
    flag: '-sT',
    name: 'TCP Connect Scan',
    category: 'TCP',
    stealth: false,
    privilege: false,
    summary: 'Completes the full TCP three-way handshake using the OS connect() system call.',
    detail: `The TCP Connect scan uses the operating system's standard connect() system call to establish full TCP connections with each target port. This means the three-way handshake (SYN → SYN-ACK → ACK) is completed normally, and the connection is then immediately closed with RST.

Because it uses normal system calls, this scan does not require root privileges. However, it is slower than SYN scanning and much more visible: the OS logs each connection attempt, and the target application may log the connection as well. On some systems, you may run out of local ephemeral ports if scanning large port ranges.

Connect scans are the fallback when raw packet privileges are unavailable. They are also useful when scanning through certain proxies or when the scanning system does not support raw sockets.`,
    example: 'nmap -sT 192.168.1.1',
    whenToUse: 'Use when you do not have root privileges, or when raw socket access is restricted.',
  },
  {
    flag: '-sU',
    name: 'UDP Scan',
    category: 'UDP',
    stealth: true,
    privilege: true,
    summary: 'Sends UDP packets to target ports. No handshake means ambiguous results for open ports.',
    detail: `UDP scanning is fundamentally different from TCP scanning because UDP is connectionless. Nmap sends a UDP datagram to each target port. If the port is closed, the target typically responds with an ICMP "port unreachable" message — telling Nmap definitively that the port is closed. If the port is open, the service may respond with application data, or it may remain silent.

This silence creates ambiguity: Nmap cannot distinguish between an open port that chose not to respond and a filtered port where a firewall dropped the packet. Such ports are marked as "open|filtered."

UDP scans are notoriously slow. Because UDP does not guarantee delivery, Nmap must wait for the timeout period (usually several seconds) before assuming no response means the port is open or filtered. Scanning all 65,535 UDP ports can take hours. Most practitioners scan only specific UDP ports of interest: 53 (DNS), 67/68 (DHCP), 69 (TFTP), 123 (NTP), 161 (SNMP), and 500 (IKE).`,
    example: 'nmap -sU -p 53,161,500 192.168.1.1',
    whenToUse: 'Use when you need to find UDP services like DNS, SNMP, or VPN endpoints. Always limit the port range.',
  },
  {
    flag: '-sN',
    name: 'TCP NULL Scan',
    category: 'Stealth',
    stealth: true,
    privilege: true,
    summary: 'Sends TCP packets with NO flags set. Exploits RFC 793 behavior to evade simple filters.',
    detail: `The NULL scan sends TCP packets with absolutely no flags set. According to RFC 793, if such a packet arrives at a closed port, the target must respond with RST. If it arrives at an open port, the target should ignore it (because there is no valid TCP state that matches a no-flag packet).

Thus: RST response = closed port. No response = open or filtered port.

NULL scans can slip past simple packet filters that only check for SYN flags. However, modern stateful firewalls and IDS systems easily detect them. More importantly, Windows and many Cisco devices do not strictly follow RFC 793 — they send RST for all ports regardless of state, making NULL scans show every port as "closed" on these systems regardless of reality.`,
    example: 'nmap -sN 192.168.1.1',
    whenToUse: 'Use against Unix/Linux targets with simple stateless firewalls. Do not use against Windows.',
  },
  {
    flag: '-sF',
    name: 'TCP FIN Scan',
    category: 'Stealth',
    stealth: true,
    privilege: true,
    summary: 'Sends packets with only the FIN flag set. Similar logic to NULL scan.',
    detail: `The FIN scan sends TCP packets with only the FIN flag set. The logic is identical to the NULL scan: closed ports must respond with RST per RFC 793, while open ports should ignore the packet. RST = closed, no response = open or filtered.

FIN scans are slightly more likely to pass through stateless packet filters than SYN scans because many simple filters only block packets with the SYN flag. However, like NULL scans, they are unreliable against Windows systems and some network equipment that violates RFC 793.

The FIN scan is one of the three "stealth" scans (along with NULL and Xmas) that rely on TCP stack quirks. They are primarily of historical interest and for specific firewall evasion scenarios rather than daily use.`,
    example: 'nmap -sF 192.168.1.1',
    whenToUse: 'Use when you suspect a stateless firewall that only filters SYN packets. Avoid Windows targets.',
  },
  {
    flag: '-sX',
    name: 'TCP Xmas Scan',
    category: 'Stealth',
    stealth: true,
    privilege: true,
    summary: 'Sets FIN, PSH, and URG flags simultaneously. Named because the packet is "lit up like a Christmas tree."',
    detail: `The Xmas scan sets the FIN, PSH, and URG flags all at once on each TCP packet. Like NULL and FIN scans, it relies on RFC 793 behavior: closed ports must respond with RST, open ports should ignore the unusual packet.

The name comes from the visual representation in packet analysis tools — the combination of three flags makes the packet header look "lit up" like a Christmas tree.

Xmas scans share all the same caveats as NULL and FIN scans: unreliable on Windows and non-RFC-compliant stacks, detectable by modern IDS, and primarily useful against simple stateless firewalls. They are rarely used in modern penetration testing but remain part of the Nmap toolkit for completeness and specific edge cases.`,
    example: 'nmap -sX 192.168.1.1',
    whenToUse: 'Use for completeness when other stealth scans fail, or against very old/simple packet filters.',
  },
  {
    flag: '-sA',
    name: 'TCP ACK Scan',
    category: 'Firewall',
    stealth: true,
    privilege: true,
    summary: 'Never determines if ports are open. Maps firewall rules and filter sets.',
    detail: `The ACK scan is unique because it does not determine whether ports are open or closed. Instead, it maps firewall rule sets and identifies whether ports are filtered or unfiltered.

ACK scans send TCP packets with only the ACK flag set. Because ACK packets are not part of connection initiation, stateful firewalls typically drop unmatched ACKs (marking the port as "filtered"). Stateless firewalls or routers without connection tracking simply allow ACKs through (marking the port as "unfiltered").

This scan is primarily used to understand the firewall configuration between you and the target. It is not useful for finding open services, but it is invaluable for firewall auditing and understanding network topology. Combine it with SYN scans to get both service and firewall information.`,
    example: 'nmap -sA 192.168.1.1',
    whenToUse: 'Use to map firewall rules and understand filtering between you and the target.',
  },
  {
    flag: '-sW',
    name: 'TCP Window Scan',
    category: 'Stealth',
    stealth: true,
    privilege: true,
    summary: 'Similar to ACK scan but exploits window size differences to infer open/closed ports.',
    detail: `The Window scan is nearly identical to the ACK scan but adds an important nuance: it examines the TCP Window size in RST responses. Some systems return different window sizes for RST packets depending on whether the port is open or closed, allowing Nmap to infer the port state even though the scan type is not designed for that purpose.

Window scans are unreliable because very few modern operating systems exhibit this behavior. They are included in Nmap primarily for completeness and for targeting specific legacy systems known to have window size quirks. In practice, you will almost never use this scan type.`,
    example: 'nmap -sW 192.168.1.1',
    whenToUse: 'Rarely used. Only useful against specific legacy systems with known window size behavior.',
  },
  {
    flag: '-sM',
    name: 'TCP Maimon Scan',
    category: 'Stealth',
    stealth: true,
    privilege: true,
    summary: 'Named after its discoverer Uriel Maimon. Uses FIN/ACK probe.',
    detail: `The Maimon scan sends packets with both FIN and ACK flags set. It was discovered by Uriel Maimon in 1996 and documented in Phrack Magazine. The idea is similar to NULL/FIN/Xmas scans: closed ports should respond with RST, while open ports should ignore the packet.

However, many BSD-derived systems drop FIN/ACK packets to open ports without sending RST, creating a distinguishable behavior pattern. Like Window scans, Maimon scans are highly system-specific and rarely used in modern practice. They remain in Nmap for historical completeness and specialized research scenarios.`,
    example: 'nmap -sM 192.168.1.1',
    whenToUse: 'Rarely used. Primarily of historical and research interest.',
  },
  {
    flag: '-sI',
    name: 'Idle Scan (Zombie Scan)',
    category: 'Advanced',
    stealth: true,
    privilege: true,
    summary: 'The ultimate stealth scan. Bounces probes through an idle "zombie" host.',
    detail: `The Idle scan is the most stealthy and advanced scan technique in Nmap. It works by bouncing scan probes through an intermediate "zombie" host that has a predictable IPID (IP Identification) sequence. The attacker sends spoofed packets to the target with the zombie's IP address as the source. The target responds to the zombie, not the attacker. The attacker then probes the zombie's IPID to infer whether the target port was open or closed.

If the target port is open, it sends SYN-ACK to the zombie. The zombie, not expecting this connection, sends RST back to the target — incrementing its IPID by one. If the port is closed, the target sends RST directly to the zombie, which does not increment the IPID. By comparing IPID values before and after, the attacker deduces the port state without ever directly contacting the target.

Finding a suitable zombie host is the hardest part. The zombie must be truly idle (no other network traffic) and must have predictable IPID increments. Modern operating systems randomize IPIDs, making this scan increasingly difficult to execute successfully.`,
    example: 'nmap -sI zombie_host:113 192.168.1.1',
    whenToUse: 'Use only when maximum stealth is required and you have identified a suitable idle zombie host.',
  },
  {
    flag: '-sV',
    name: 'Version Detection',
    category: 'Service',
    stealth: false,
    privilege: false,
    summary: 'Probes open ports to determine service name, version, and extra metadata.',
    detail: `Version detection (-sV) is not technically a "scan type" in the same sense as SYN or UDP scans, but it is one of the most important phases of a comprehensive Nmap assessment. After identifying open ports, Nmap sends a series of application-layer probes designed to elicit version-specific responses from services.

The nmap-service-probes file contains over 7,000 signatures matching responses from services like OpenSSH, Apache, Nginx, MySQL, PostgreSQL, SMB, SNMP, and thousands more. When a match is found, Nmap reports the service name, version number, and sometimes extra details like hostname, OS, device type, and CPE identifiers.

Version detection is noisy because it sends many probe strings to each open port. However, it is essential for vulnerability assessment: knowing that a target runs Apache 2.4.41 allows you to search for CVEs affecting that exact version. Without version detection, you only know a port is "open" — not whether it is exploitable.`,
    example: 'nmap -sV 192.168.1.1',
    whenToUse: 'Always use after finding open ports. Critical for vulnerability assessment and exploit selection.',
  },
  {
    flag: '-sO',
    name: 'IP Protocol Scan',
    category: 'Protocol',
    stealth: true,
    privilege: true,
    summary: 'Determines which IP protocols (TCP, UDP, ICMP, IGMP, etc.) the target supports.',
    detail: `The IP Protocol scan is one of Nmap's least known but most interesting features. Instead of scanning TCP or UDP ports, it sends raw IP packets with different protocol numbers in the IP header (field 9). Protocol numbers include: 1 (ICMP), 6 (TCP), 17 (UDP), 47 (GRE), 50 (ESP), 51 (AH), and many others.

If the target supports a protocol, it typically responds with something — even if just an ICMP protocol unreachable for protocols it does not support. By systematically testing protocol numbers, Nmap maps the target's entire IP protocol stack.

This scan is particularly useful for discovering unusual protocol support on embedded devices, industrial control systems (ICS), VPN endpoints, and legacy networking equipment. It is almost never needed on standard Windows or Linux servers but can reveal fascinating results on routers, firewalls, and specialized hardware.`,
    example: 'nmap -sO 192.168.1.1',
    whenToUse: 'Use against routers, embedded devices, and ICS systems to map their full protocol stacks.',
  },
  {
    flag: '-sn',
    name: 'Ping Scan / Host Discovery',
    category: 'Discovery',
    stealth: false,
    privilege: false,
    summary: 'Only checks which hosts are online. No port scanning.',
    detail: `The Ping scan (host discovery) does not scan any ports. Its sole purpose is to determine which targets on a network are online and responding. By default, Nmap combines multiple probe types for maximum reliability: ICMP echo requests (ping), TCP SYN to port 443, TCP ACK to port 80, and ICMP timestamp requests.

Hosts that respond to any probe are marked as "up" and would normally proceed to port scanning. With -sn, Nmap stops after host discovery and reports only the list of responsive hosts. This is useful for quickly mapping a network before deciding which hosts deserve deeper scrutiny.

The -Pn flag does the opposite: it skips host discovery entirely and treats all specified targets as online. This is essential when ICMP ping is blocked by firewalls, which is common on modern networks. Without -Pn, Nmap might skip scanning hosts it incorrectly believes are down.`,
    example: 'nmap -sn 192.168.1.0/24',
    whenToUse: 'Use for quick network host enumeration. Combine with -Pn when ICMP is blocked by firewalls.',
  },
];

const comparisonTable = [
  { scan: '-sS (SYN)', speed: 'Fast', stealth: 'High', needsRoot: 'Yes', bestFor: 'General reconnaissance' },
  { scan: '-sT (Connect)', speed: 'Medium', stealth: 'Low', needsRoot: 'No', bestFor: 'Non-root scanning' },
  { scan: '-sU (UDP)', speed: 'Very Slow', stealth: 'Medium', needsRoot: 'Yes', bestFor: 'DNS, SNMP, VPN' },
  { scan: '-sN/sF/sX', speed: 'Medium', stealth: 'Medium', needsRoot: 'Yes', bestFor: 'Simple stateless filters' },
  { scan: '-sA (ACK)', speed: 'Fast', stealth: 'High', needsRoot: 'Yes', bestFor: 'Firewall rule mapping' },
  { scan: '-sI (Idle)', speed: 'Slow', stealth: 'Maximum', needsRoot: 'Yes', bestFor: 'Ultimate stealth' },
  { scan: '-sV (Version)', speed: 'Slow', stealth: 'Low', needsRoot: 'No', bestFor: 'Vulnerability assessment' },
];

export default function NmapScanTypesPage() {
  const [activeScan, setActiveScan] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-radar-line" />
            Nmap Section 3 of 13
          </div>
          <DocHeading level={1}>Scan Types</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            Nmap offers thirteen distinct scan techniques, each designed for different network conditions, target types, and stealth requirements. Choosing the right scan type is one of the most important decisions in any Nmap engagement.
          </p>
        </motion.div>

        {/* Scan Type Cards */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Detailed Scan Type Reference</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Click any scan type to expand and read its full technical explanation, including how it works under the hood, when to use it, and common pitfalls.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {scanTypes.map((scan) => (
              <button
                key={scan.flag}
                type="button"
                onClick={() => setActiveScan(activeScan === scan.flag ? null : scan.flag)}
                className={`cyber-card p-5 text-left cursor-pointer transition-all ${activeScan === scan.flag ? 'border-cyber-amber' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-cyber-amber flex-shrink-0">
                    {scan.flag}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-white">{scan.name}</h3>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyber-bg-card border border-cyber-border text-cyber-text-dim">
                        {scan.category}
                      </span>
                      {scan.stealth && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyber-green/10 text-cyber-green border border-cyber-green/20">
                          Stealth
                        </span>
                      )}
                      {scan.privilege && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyber-red/10 text-cyber-red border border-cyber-red/20">
                          Root Required
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-cyber-text-muted mt-1">{scan.summary}</p>

                    {activeScan === scan.flag && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 space-y-3"
                      >
                        <p className="text-xs text-cyber-text-muted leading-relaxed">{scan.detail}</p>
                        <div className="bg-cyber-bg border border-cyber-border rounded-lg p-3">
                          <span className="text-[10px] text-cyber-text-dim font-mono uppercase tracking-wider">Example</span>
                          <code className="block text-xs font-mono text-cyber-green mt-1">{scan.example}</code>
                        </div>
                        <p className="text-xs text-cyber-amber">
                          <i className="ri-lightbulb-line mr-1" />
                          {scan.whenToUse}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Comparison Table */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Scan Type Comparison</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Use this table to quickly compare scan types across speed, stealth, privilege requirements, and best use cases.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm border border-cyber-border rounded-lg overflow-hidden">
              <thead className="bg-cyber-bg-card">
                <tr>
                  <th className="text-left px-4 py-3 text-cyber-text font-semibold">Scan Type</th>
                  <th className="text-left px-4 py-3 text-cyber-text font-semibold">Speed</th>
                  <th className="text-left px-4 py-3 text-cyber-text font-semibold">Stealth</th>
                  <th className="text-left px-4 py-3 text-cyber-text font-semibold">Root</th>
                  <th className="text-left px-4 py-3 text-cyber-text font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-border">
                {comparisonTable.map((row) => (
                  <tr key={row.scan} className="hover:bg-cyber-bg-card/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-cyber-amber text-xs">{row.scan}</td>
                    <td className="px-4 py-3 text-cyber-text-muted text-xs">{row.speed}</td>
                    <td className="px-4 py-3 text-cyber-text-muted text-xs">{row.stealth}</td>
                    <td className="px-4 py-3 text-cyber-text-muted text-xs">{row.needsRoot}</td>
                    <td className="px-4 py-3 text-cyber-text-muted text-xs">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* TCP Handshake Deep Dive */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>The TCP Three-Way Handshake</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Understanding the TCP handshake is essential for understanding why SYN scans are stealthy and why Connect scans are not. This is the foundation of all TCP scanning.
          </p>

          <div className="mt-6 cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Normal Connection vs SYN Scan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-semibold text-cyber-text-dim mb-2 uppercase tracking-wider">Normal Three-Way Handshake</h4>
                <div className="space-y-2">
                  {[
                    { step: '1. Client → Server', pkt: 'SYN', desc: 'I want to connect' },
                    { step: '2. Server → Client', pkt: 'SYN-ACK', desc: 'I am listening, ready' },
                    { step: '3. Client → Server', pkt: 'ACK', desc: 'Connection established' },
                  ].map((s) => (
                    <div key={s.step} className="flex items-center gap-2 p-2 rounded bg-cyber-bg border border-cyber-border">
                      <span className="text-[10px] text-cyber-text-dim font-mono w-28 flex-shrink-0">{s.step}</span>
                      <span className="text-xs font-mono text-cyber-amber">{s.pkt}</span>
                      <span className="text-[10px] text-cyber-text-muted">{s.desc}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-cyber-text-muted mt-2">The full connection is logged by the OS and the application.</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-cyber-text-dim mb-2 uppercase tracking-wider">SYN Scan (Stealth)</h4>
                <div className="space-y-2">
                  {[
                    { step: '1. Scanner → Target', pkt: 'SYN', desc: 'Probe sent' },
                    { step: '2. Target → Scanner', pkt: 'SYN-ACK', desc: 'Port is open' },
                    { step: '3. Scanner → Target', pkt: 'RST', desc: 'Connection killed' },
                  ].map((s) => (
                    <div key={s.step} className="flex items-center gap-2 p-2 rounded bg-cyber-bg border border-cyber-border">
                      <span className="text-[10px] text-cyber-text-dim font-mono w-28 flex-shrink-0">{s.step}</span>
                      <span className="text-xs font-mono text-cyber-amber">{s.pkt}</span>
                      <span className="text-[10px] text-cyber-text-muted">{s.desc}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-cyber-text-muted mt-2">No full connection ever exists. Often not logged by applications.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Callouts */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Important Considerations</DocHeading>
          <div className="mt-4 space-y-3">
            <Callout type="danger">
              Stealth scans (<InlineCode>-sS</InlineCode>, <InlineCode>-sN</InlineCode>, <InlineCode>-sF</InlineCode>, <InlineCode>-sX</InlineCode>) require root/administrator privileges because they craft raw TCP packets. Without root, Nmap silently falls back to <InlineCode>-sT</InlineCode>.
            </Callout>
            <Callout type="warning">
              NULL, FIN, and Xmas scans are unreliable against Windows targets and many network devices because these systems do not strictly follow RFC 793. They may show all ports as closed regardless of actual state.
            </Callout>
            <Callout type="info">
              UDP scans (<InlineCode>-sU</InlineCode>) are extremely slow. Always limit the port range with <InlineCode>-p</InlineCode> when scanning UDP. Scanning all 65,535 UDP ports can take hours or days.
            </Callout>
            <Callout type="tip">
              For daily use, the combination of <InlineCode>-sS</InlineCode> (SYN scan) + <InlineCode>-sV</InlineCode> (version detection) + <InlineCode>-O</InlineCode> (OS detection) covers 95% of reconnaissance needs on Linux and macOS targets.
            </Callout>
          </div>
        </motion.section>

        {/* Commands */}
        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Quick Reference Commands</DocHeading>
          <div className="mt-4 space-y-3">
            <CodeBlock code="nmap -sS 192.168.1.1" />
            <CodeBlock code="nmap -sT 192.168.1.1" />
            <CodeBlock code="nmap -sU -p 53,161,500 192.168.1.1" />
            <CodeBlock code="nmap -sA 192.168.1.1" />
            <CodeBlock code="nmap -sN 192.168.1.1" />
            <CodeBlock code="nmap -sn 192.168.1.0/24" />
            <CodeBlock code="nmap -sV 192.168.1.1" />
            <CodeBlock code="nmap -sS -sV -O 192.168.1.1" />
          </div>

          <div className="mt-8 flex gap-3">
            <a href="/nmap/port-states" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Port States <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/nmap/how-it-works" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text-muted hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}