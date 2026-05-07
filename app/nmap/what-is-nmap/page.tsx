'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const capabilities = [
  {
    title: 'Host Discovery',
    desc: 'Nmap identifies live hosts on a network using ICMP echo requests, TCP SYN packets, ARP requests, and other techniques. It can discover hosts across entire subnets in seconds.',
    icon: 'ri-radar-line',
  },
  {
    title: 'Port Scanning',
    desc: 'Nmap can scan TCP, UDP, SCTP, and IP protocols. It tests over 65,000 ports per host and supports ten different scan techniques ranging from stealthy SYN scans to comprehensive Connect scans.',
    icon: 'ri-door-open-line',
  },
  {
    title: 'Service Detection',
    desc: 'The -sV flag sends targeted probes to open ports and matches responses against a database of over 7,000 service fingerprints, identifying exact software names and version numbers.',
    icon: 'ri-server-line',
  },
  {
    title: 'OS Fingerprinting',
    desc: 'Nmap analyzes subtle differences in TCP/IP stack implementations — such as initial TTL values, window sizes, and option ordering — to identify the target operating system with high accuracy.',
    icon: 'ri-computer-line',
  },
  {
    title: 'NSE Scripting Engine',
    desc: 'The Nmap Scripting Engine (NSE) allows users to write and execute Lua scripts for vulnerability detection, credential brute forcing, service enumeration, and custom reconnaissance tasks.',
    icon: 'ri-code-s-slash-line',
  },
  {
    title: 'Multiple Output Formats',
    desc: 'Nmap can output results as plain text, XML, grepable text, and JSON. These formats integrate with vulnerability scanners, SIEMs, and custom automation pipelines.',
    icon: 'ri-file-list-line',
  },
];

const historyTimeline = [
  {
    year: '1997',
    title: 'Birth of Nmap',
    desc: 'Gordon Lyon (Fyodor) releases the first version of Nmap. It begins as a simple port scanner for Linux but quickly gains popularity among system administrators and security researchers.',
  },
  {
    year: '2000',
    title: 'OS Detection Added',
    desc: 'Nmap 2.00 introduces TCP/IP stack fingerprinting, allowing users to identify remote operating systems based on subtle network behavior differences.',
  },
  {
    year: '2003',
    title: 'NSE Scripting Engine',
    desc: 'The Nmap Scripting Engine debuts, transforming Nmap from a scanner into a full reconnaissance and vulnerability assessment platform powered by Lua scripts.',
  },
  {
    year: '2009',
    title: 'Zenmap GUI',
    desc: 'Zenmap, the official Nmap GUI, is released alongside Nmap 4.50. It provides interactive topology mapping, result comparison, and profile-based scanning for users who prefer graphical interfaces.',
  },
  {
    year: '2015',
    title: 'Ncat & Ndiff',
    desc: 'Ncat (a modern replacement for Netcat) and Ndiff (result comparison tool) become core parts of the Nmap suite, expanding its utility beyond pure scanning.',
  },
  {
    year: 'Today',
    title: 'Industry Standard',
    desc: 'Nmap is the most widely referenced network scanner in the world. It ships by default on Kali Linux, appears in countless CTF challenges, and is a required skill for OSCP, CEH, and CISSP certifications.',
  },
];

const useCases = [
  {
    role: 'Penetration Testers',
    desc: 'Nmap is the first tool run during any external or internal pentest engagement. It maps the attack surface, identifies live hosts, finds open services, and feeds data into vulnerability scanners and exploitation frameworks.',
  },
  {
    role: 'Network Administrators',
    desc: 'Admins use Nmap for asset inventory, network auditing, firewall verification, and service change detection. Scheduled Nmap scans can alert teams when unauthorized services appear on the network.',
  },
  {
    role: 'Bug Bounty Hunters',
    desc: 'Before reporting a vulnerability, hunters first use Nmap to understand the target scope. Nmap helps identify subdomains, open ports, and running services that might be vulnerable to known CVEs.',
  },
  {
    role: 'Security Researchers',
    desc: 'Researchers leverage Nmap\'s raw packet crafting and NSE scripting to test novel network protocols, discover new vulnerabilities, and build proof-of-concept exploits against embedded and IoT devices.',
  },
  {
    role: 'Incident Responders',
    desc: 'During a breach investigation, responders use Nmap to rapidly inventory compromised network segments, identify rogue devices, and verify that incident containment measures (firewall blocks, port closures) are effective.',
  },
  {
    role: 'Compliance Auditors',
    desc: 'Auditors run Nmap scans to verify that organizations comply with standards like PCI-DSS, NIST, and CIS benchmarks. Unnecessary open ports and unauthorized services are common compliance violations.',
  },
];

export default function NmapWhatIsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-information-line" />
            Nmap Section 1 of 13
          </div>
          <DocHeading level={1}>What is Nmap</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            <strong className="text-white">Nmap (Network Mapper)</strong> is a free, open-source network scanner used to discover hosts, services, open ports, operating systems, and vulnerabilities on computer networks. Created by Gordon Lyon (Fyodor) in 1997, it has become the most widely used and referenced port scanner in the cybersecurity industry.
          </p>
        </motion.div>

        {/* Core Capabilities */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Core Capabilities</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Nmap is far more than a simple port scanner. It is a comprehensive network reconnaissance platform with six major capability areas that work together to paint a complete picture of target networks.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((cap) => (
              <div key={cap.title} className="cyber-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-cyber-amber/10 border border-cyber-amber/20 flex items-center justify-center text-cyber-amber">
                    <i className={cap.icon} />
                  </span>
                  <h3 className="text-sm font-semibold text-white">{cap.title}</h3>
                </div>
                <p className="text-xs text-cyber-text-muted leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Why Nmap Matters */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Why Nmap Matters in Cybersecurity</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Network reconnaissance is the foundation of both offensive and defensive security. Before an attacker can exploit a vulnerability, they must first know what exists. Before a defender can protect an asset, they must first know it is there. Nmap answers the fundamental question: <strong className="text-white">What is on my network?</strong>
          </p>

          <div className="mt-6 space-y-4">
            <Callout type="info">
              Nmap is referenced in the <strong className="text-white">OSCP</strong> (Offensive Security Certified Professional), <strong className="text-white">CEH</strong> (Certified Ethical Hacker), and <strong className="text-white">CISSP</strong> certification curricula. It is considered an essential tool for any cybersecurity professional.
            </Callout>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {useCases.map((uc) => (
              <div key={uc.role} className="cyber-card p-5">
                <h3 className="text-sm font-semibold text-cyber-cyan mb-2">{uc.role}</h3>
                <p className="text-xs text-cyber-text-muted leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* History */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>History of Nmap</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Understanding Nmap&apos;s evolution helps you appreciate its depth and why certain design decisions were made. Nmap has grown from a simple C program to a multi-tool security platform over 25 years.
          </p>
          <div className="mt-6 space-y-4">
            {historyTimeline.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-cyber-bg-card border border-cyber-border flex items-center justify-center">
                    <span className="text-xs font-bold text-cyber-amber font-mono">{item.year}</span>
                  </div>
                  {i < historyTimeline.length - 1 && (
                    <div className="w-px flex-1 bg-cyber-border mt-2" />
                  )}
                </div>
                <div className="cyber-card p-4 flex-1">
                  <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-cyber-text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Architecture */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Nmap Architecture</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Nmap is written in C and C++ with Lua for scripting. It uses raw sockets and libpcap for packet capture, which requires root privileges on Unix systems. The architecture is modular, allowing each scanning phase to be independently configured or skipped.
          </p>

          <div className="mt-6 cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Scanning Pipeline</h3>
            <div className="space-y-3">
              {[
                { step: '1. Target Parsing', desc: 'Resolves hostnames, expands CIDR blocks (10.0.0.0/24), ranges (192.168.1.1-100), and reads from files (-iL).' },
                { step: '2. Host Discovery', desc: 'Probes targets with ICMP, TCP SYN/ACK, or ARP to determine which hosts are online. Skipped with -Pn.' },
                { step: '3. Port Scanning', desc: 'Sends probes to specified ports using the chosen scan technique. Collects responses and classifies port states.' },
                { step: '4. Service/Version Detection', desc: 'Sends application-layer probes to open ports and matches responses against the nmap-service-probes database.' },
                { step: '5. OS Detection', desc: 'Analyzes TCP/IP stack fingerprints from probe responses to identify the target operating system family and version.' },
                { step: '6. NSE Script Execution', desc: 'Runs Lua scripts against targets for custom checks, vulnerability detection, and data extraction.' },
                { step: '7. Output Formatting', desc: 'Formats and writes results to stdout, files, or multiple formats simultaneously (-oN, -oX, -oG, -oJ).' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg border border-cyber-border">
                  <span className="text-xs font-bold text-cyber-amber font-mono flex-shrink-0">{s.step.split('.')[0]}</span>
                  <div>
                    <span className="text-xs font-semibold text-white">{s.step.split('. ')[1]}</span>
                    <p className="text-xs text-cyber-text-muted mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* First Scan */}
        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Your First Nmap Scan</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            The simplest Nmap command scans the top 1,000 most common TCP ports on a single target. If Nmap is installed and you have network access, you can run this immediately.
          </p>
          <div className="mt-4">
            <CodeBlock code="nmap scanme.nmap.org" />
          </div>
          <p className="text-sm text-cyber-text-muted mt-4 leading-relaxed">
            <strong className="text-white">scanme.nmap.org</strong> is a test server maintained by the Nmap project specifically for learning and testing. It is safe to scan and responds like a typical Linux server. Nmap will show which of the top 1,000 ports are open, the services running on them, and their versions if version detection is enabled.
          </p>

          <Callout type="danger" className="mt-4">
            Never scan networks, servers, or IP addresses you do not own or have explicit written permission to test. Unauthorized scanning is illegal in many jurisdictions and violates most terms of service.
          </Callout>

          <div className="mt-8 flex gap-3">
            <a href="/nmap/how-it-works" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: How Nmap Works <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/nmap/scan-types" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text-muted hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
              Skip to Scan Types
            </a>
          </div>
        </motion.section>
      </div>
  );
}
