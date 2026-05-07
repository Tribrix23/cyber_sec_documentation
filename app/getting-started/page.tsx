import { useState } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const osiLayers = [
  { num: 7, name: 'Application', proto: 'HTTP, HTTPS, FTP, DNS, SMTP', desc: 'User-facing protocols and data exchange' },
  { num: 6, name: 'Presentation', proto: 'SSL/TLS, MIME', desc: 'Data formatting, encryption, compression' },
  { num: 5, name: 'Session', proto: 'NetBIOS, RPC', desc: 'Session management and dialog control' },
  { num: 4, name: 'Transport', proto: 'TCP, UDP', desc: 'Reliable delivery, flow control, ports' },
  { num: 3, name: 'Network', proto: 'IP, ICMP, ARP', desc: 'Logical addressing and routing' },
  { num: 2, name: 'Data Link', proto: 'Ethernet, Wi-Fi, PPP', desc: 'Physical addressing (MAC), framing' },
  { num: 1, name: 'Physical', proto: 'Cables, Hubs, Signals', desc: 'Raw bit transmission over physical media' },
];

const commonPorts = [
  { port: 20, proto: 'TCP', service: 'FTP Data' },
  { port: 21, proto: 'TCP', service: 'FTP Control' },
  { port: 22, proto: 'TCP', service: 'SSH' },
  { port: 23, proto: 'TCP', service: 'Telnet' },
  { port: 25, proto: 'TCP', service: 'SMTP' },
  { port: 53, proto: 'TCP/UDP', service: 'DNS' },
  { port: 80, proto: 'TCP', service: 'HTTP' },
  { port: 110, proto: 'TCP', service: 'POP3' },
  { port: 143, proto: 'TCP', service: 'IMAP' },
  { port: 443, proto: 'TCP', service: 'HTTPS' },
  { port: 445, proto: 'TCP', service: 'SMB' },
  { port: 3306, proto: 'TCP', service: 'MySQL' },
  { port: 3389, proto: 'TCP', service: 'RDP' },
  { port: 8080, proto: 'TCP', service: 'HTTP Proxy/Alt' },
];

const terminology = [
  { term: 'Threat', def: 'Any potential danger that could exploit a vulnerability to harm assets.' },
  { term: 'Vulnerability', def: 'A weakness in a system, process, or control that can be exploited.' },
  { term: 'Exploit', def: 'Code or technique that takes advantage of a vulnerability to cause unintended behavior.' },
  { term: 'Payload', def: 'The malicious component delivered after an exploit succeeds.' },
  { term: 'Zero Day', def: 'A vulnerability that is unknown to the vendor and has no patch available.' },
  { term: 'Attack Surface', def: 'The total sum of all entry points an attacker could use.' },
  { term: 'Mitigation', def: 'Actions taken to reduce the severity or likelihood of a risk.' },
  { term: 'Threat Actor', def: 'An individual or group with intent and capability to attack systems.' },
  { term: 'Indicators of Compromise (IoC)', def: 'Artifacts observed on a network or OS that indicate a potential intrusion.' },
  { term: 'Kill Chain', def: 'A model describing the stages of a cyberattack from reconnaissance to exfiltration.' },
];

const courseModules = [
  { name: 'Wireshark', icon: 'ri-radar-line', color: 'text-cyber-cyan', desc: 'Packet analysis, capture filters, protocol dissection, and forensics' },
  { name: 'Nmap', icon: 'ri-shield-check-line', color: 'text-cyber-amber', desc: 'Host discovery, port scanning, service detection, and NSE scripting' },
  { name: 'Gobuster', icon: 'ri-folder-open-line', color: 'text-cyber-red', desc: 'Directory enumeration, subdomain brute-forcing, and virtual host discovery' },
  { name: 'John the Ripper', icon: 'ri-lock-unlock-line', color: 'text-cyber-green', desc: 'Password cracking with wordlists, rules, and incremental brute force' },
  { name: 'Burp Suite', icon: 'ri-bug-line', color: 'text-cyber-amber', desc: 'Web proxy, repeater, intruder, and automated vulnerability scanning' },
  { name: 'SQLMap', icon: 'ri-database-2-line', color: 'text-cyber-red', desc: 'Automated SQL injection detection, exploitation, and database enumeration' },
  { name: 'SSLScan', icon: 'ri-shield-keyhole-line', color: 'text-cyber-green', desc: 'SSL/TLS cipher analysis, certificate inspection, and vulnerability detection' },
  { name: 'Netcat', icon: 'ri-terminal-box-line', color: 'text-cyber-cyan', desc: 'Networking Swiss Army knife: shells, transfers, scanning, and debugging' },
  { name: 'Metasploit', icon: 'ri-fire-line', color: 'text-cyber-amber', desc: 'Exploitation framework, payloads, Meterpreter, and post-exploitation' },
];

export default function GettingStarted() {
  const [activeTerm, setActiveTerm] = useState<number | null>(null);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
            <i className="ri-book-open-line" />
            Getting Started
          </div>
          <DocHeading level={1}>Cybersecurity Fundamentals</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            Welcome to <strong className="text-white">cybersec.devctr.com</strong> — your interactive learning platform for mastering essential offensive and defensive security tools. Before diving into tools, you need to understand the foundations.
          </p>
        </motion.div>

        {/* Section 1: What is Cybersecurity */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2} id="what-is-cybersecurity">What is Cybersecurity</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These attacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.
          </p>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            It encompasses multiple domains including network security, application security, information security, operational security, and disaster recovery. In this course we focus primarily on the <strong className="text-white">network and application layers</strong> where the tools you will learn operate.
          </p>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Network Security — Firewalls, IDS/IPS, segmentation',
              'Application Security — Secure coding, pentesting, bug bounty',
              'Information Security — Data protection, encryption, DLP',
              'Operational Security — Procedures, policies, access control',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-cyber-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 2: The CIA Triad */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2} id="cia-triad">The CIA Triad</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            The CIA Triad is the foundational model for information security policy. Every security control exists to protect one or more of these three principles:
          </p>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="cyber-card p-5 border-l-[3px] border-l-cyber-cyan">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded bg-cyber-cyan/10 flex items-center justify-center text-cyber-cyan">
                  <i className="ri-lock-line" />
                </div>
                <h4 className="text-white font-semibold">Confidentiality</h4>
              </div>
              <p className="text-sm text-cyber-text-muted leading-relaxed">
                Ensures that information is accessible only to those authorized to have access. Encryption, access controls, and authentication mechanisms enforce confidentiality.
              </p>
              <p className="text-xs text-cyber-text-dim mt-2 font-mono">
                Example: HTTPS (TLS) encrypts web traffic so only the browser and server can read it.
              </p>
            </div>

            <div className="cyber-card p-5 border-l-[3px] border-l-cyber-green">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded bg-cyber-green/10 flex items-center justify-center text-cyber-green">
                  <i className="ri-check-double-line" />
                </div>
                <h4 className="text-white font-semibold">Integrity</h4>
              </div>
              <p className="text-sm text-cyber-text-muted leading-relaxed">
                Ensures the accuracy and completeness of data. Integrity controls prevent unauthorized modification, corruption, or deletion of information.
              </p>
              <p className="text-xs text-cyber-text-dim mt-2 font-mono">
                Example: File hashes (SHA-256) verify a downloaded file was not tampered with.
              </p>
            </div>

            <div className="cyber-card p-5 border-l-[3px] border-l-cyber-amber">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded bg-cyber-amber/10 flex items-center justify-center text-cyber-amber">
                  <i className="ri-time-line" />
                </div>
                <h4 className="text-white font-semibold">Availability</h4>
              </div>
              <p className="text-sm text-cyber-text-muted leading-relaxed">
                Ensures that authorized users can access systems and data when needed. Redundancy, load balancing, and DDoS protection maintain availability.
              </p>
              <p className="text-xs text-cyber-text-dim mt-2 font-mono">
                Example: CDN and rate limiting keep a website online during traffic spikes.
              </p>
            </div>
          </div>

          <Callout type="info" className="mt-5">
            Beyond the CIA Triad, modern security also considers <strong className="text-white">Non-repudiation</strong> (proof of action), <strong className="text-white">Authentication</strong> (proving identity), and <strong className="text-white">Authorization</strong> (permission to act).
          </Callout>
        </motion.section>

        {/* Section 3: Networking Prerequisite */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2} id="networking-prerequisite">Networking Prerequisite</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            You cannot secure what you do not understand. Every tool in this course operates at the network layer or above. You must understand how data moves across networks before you can analyze, scan, or exploit it.
          </p>

          <DocHeading level={3} id="osi-model">The OSI Model</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            The Open Systems Interconnection (OSI) model is a conceptual framework that standardizes network communication into seven layers. Every protocol and device operates at one or more of these layers.
          </p>

          <div className="mt-5 space-y-2">
            {osiLayers.map((layer) => (
              <button
                key={layer.num}
                type="button"
                onClick={() => setActiveLayer(activeLayer === layer.num ? null : layer.num)}
                className={`w-full text-left cyber-card p-3.5 flex items-start gap-4 transition-all ${activeLayer === layer.num ? 'border-cyber-cyan' : ''}`}
              >
                <div className="w-8 h-8 rounded-full bg-cyber-bg border border-cyber-border flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-mono font-bold text-cyber-cyan">{layer.num}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white">{layer.name}</h4>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-text-dim font-mono">
                      {layer.proto}
                    </span>
                  </div>
                  <p className="text-xs text-cyber-text-muted mt-1">{layer.desc}</p>
                  {activeLayer === layer.num && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-xs text-cyber-amber mt-2 font-mono"
                    >
                      Key concept: Layer {layer.num} — {layer.name} handles {layer.desc.toLowerCase()}
                    </motion.p>
                  )}
                </div>
              </button>
            ))}
          </div>

          <DocHeading level={3} id="tcp-vs-udp">TCP vs UDP</DocHeading>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="cyber-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded bg-cyber-green/10 flex items-center justify-center text-cyber-green">
                  <i className="ri-shield-check-line" />
                </div>
                <h4 className="text-white font-semibold">TCP (Transmission Control Protocol)</h4>
              </div>
              <ul className="space-y-2 text-sm text-cyber-text-muted">
                <li className="flex gap-2"><span className="text-cyber-green">+</span> Connection-oriented (three-way handshake)</li>
                <li className="flex gap-2"><span className="text-cyber-green">+</span> Reliable delivery with acknowledgments</li>
                <li className="flex gap-2"><span className="text-cyber-green">+</span> Ordered data delivery</li>
                <li className="flex gap-2"><span className="text-cyber-red">-</span> Higher overhead and latency</li>
                <li className="flex gap-2"><span className="text-cyber-red">-</span> Used by: HTTP, HTTPS, SSH, FTP, SMTP</li>
              </ul>
            </div>
            <div className="cyber-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded bg-cyber-amber/10 flex items-center justify-center text-cyber-amber">
                  <i className="ri-flashlight-line" />
                </div>
                <h4 className="text-white font-semibold">UDP (User Datagram Protocol)</h4>
              </div>
              <ul className="space-y-2 text-sm text-cyber-text-muted">
                <li className="flex gap-2"><span className="text-cyber-green">+</span> Connectionless — no handshake</li>
                <li className="flex gap-2"><span className="text-cyber-green">+</span> Low overhead, fast transmission</li>
                <li className="flex gap-2"><span className="text-cyber-green">+</span> Supports multicast and broadcast</li>
                <li className="flex gap-2"><span className="text-cyber-red">-</span> No guaranteed delivery or ordering</li>
                <li className="flex gap-2"><span className="text-cyber-red">-</span> Used by: DNS, DHCP, NTP, VoIP, gaming</li>
              </ul>
            </div>
          </div>

          <DocHeading level={3} id="ports-protocols">Common Ports &amp; Protocols</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Ports are numeric identifiers (0-65535) that distinguish different services on a single host. The first 1024 are "well-known" and reserved by IANA.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border border-cyber-border rounded-lg overflow-hidden">
              <thead className="bg-cyber-bg-card">
                <tr>
                  <th className="text-left px-4 py-3 text-cyber-text font-semibold">Port</th>
                  <th className="text-left px-4 py-3 text-cyber-text font-semibold">Protocol</th>
                  <th className="text-left px-4 py-3 text-cyber-text font-semibold">Service</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-border">
                {commonPorts.map((p) => (
                  <tr key={p.port} className="hover:bg-cyber-bg-card/50 transition-colors">
                    <td className="px-4 py-2.5 font-mono text-cyber-cyan">{p.port}</td>
                    <td className="px-4 py-2.5 text-cyber-text-muted">{p.proto}</td>
                    <td className="px-4 py-2.5 text-cyber-text-muted">{p.service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <DocHeading level={3} id="ip-subnet">IP Addressing &amp; Subnetting</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            An IPv4 address is a 32-bit number divided into four octets. Subnetting splits a network into smaller segments using a subnet mask.
          </p>
          <div className="mt-4 space-y-3">
            <div className="cyber-card p-4">
              <h4 className="text-sm font-semibold text-white mb-2">CIDR Notation</h4>
              <p className="text-sm text-cyber-text-muted">
                CIDR (Classless Inter-Domain Routing) expresses networks as <InlineCode>IP/prefix</InlineCode>. For example, <InlineCode>192.168.1.0/24</InlineCode> means the first 24 bits are the network portion, leaving 8 bits for hosts (256 addresses).
              </p>
              <CodeBlock code={`# Common CIDR ranges
/32  = 1 host          (single IP)
/30  = 4 hosts        (point-to-point)
/24  = 256 hosts      (small office)
/16  = 65,536 hosts   (large network)
/8   = 16,777,216     (massive network)`} />
            </div>
            <div className="cyber-card p-4">
              <h4 className="text-sm font-semibold text-white mb-2">Private IP Ranges (RFC 1918)</h4>
              <p className="text-sm text-cyber-text-muted">
                These addresses are not routable on the public internet and are used inside local networks:
              </p>
              <CodeBlock code={`10.0.0.0    - 10.255.255.255    (10/8)
172.16.0.0  - 172.31.255.255    (172.16/12)
192.168.0.0 - 192.168.255.255   (192.168/16)`} />
            </div>
          </div>
        </motion.section>

        {/* Section 4: Common Terminology */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2} id="terminology">Essential Terminology</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Every field has its vocabulary. Understanding these terms is essential before reading security reports, CVEs, or tool documentation.
          </p>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            {terminology.map((t, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveTerm(activeTerm === i ? null : i)}
                className={`cyber-card p-4 text-left cursor-pointer ${activeTerm === i ? 'border-cyber-cyan' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-cyber-bg border border-cyber-border flex items-center justify-center flex-shrink-0">
                    <i className="ri-bookmark-line text-cyber-cyan text-xs" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white">{t.term}</h4>
                    <AnimatePresence>
                      {activeTerm === i && (
                        <motion.p
                          className="text-xs text-cyber-text-muted mt-2 leading-relaxed"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {t.def}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <i className={`ri-arrow-down-s-line text-cyber-text-dim transition-transform ${activeTerm === i ? 'rotate-180' : ''}`} />
                </div>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Section 5: The Kill Chain */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2} id="kill-chain">The Cyber Kill Chain</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Developed by Lockheed Martin, the Cyber Kill Chain describes the stages of a typical cyber intrusion. Defenders try to break the chain at any stage; attackers try to advance through it.
          </p>

          <div className="mt-5 space-y-3">
            {[
              { stage: '1. Reconnaissance', desc: 'Gathering information about the target: IP ranges, employees, technologies, open ports.', color: 'border-l-cyber-text-muted' },
              { stage: '2. Weaponization', desc: 'Creating or obtaining an exploit and pairing it with a payload (e.g., malicious PDF or macro).', color: 'border-l-cyber-text-dim' },
              { stage: '3. Delivery', desc: 'Transmitting the weapon to the target: email attachment, USB drive, compromised website.', color: 'border-l-cyber-amber' },
              { stage: '4. Exploitation', desc: 'Triggering the vulnerability to execute code on the target system.', color: 'border-l-cyber-red' },
              { stage: '5. Installation', desc: 'Establishing persistence: creating backdoors, scheduled tasks, registry keys.', color: 'border-l-cyber-red' },
              { stage: '6. Command & Control (C2)', desc: 'Opening a communication channel for remote control of the compromised system.', color: 'border-l-cyber-red' },
              { stage: '7. Actions on Objectives', desc: 'Achieving the attacker\'s goal: data exfiltration, ransomware, lateral movement.', color: 'border-l-cyber-red' },
            ].map((s, i) => (
              <div key={i} className={`cyber-card p-4 border-l-[3px] ${s.color}`}>
                <h4 className="text-sm font-semibold text-white mb-1">{s.stage}</h4>
                <p className="text-xs text-cyber-text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <Callout type="info" className="mt-4">
            Tools in this course map to specific kill chain stages: <strong className="text-white">Nmap</strong> = Reconnaissance, <strong className="text-white">Metasploit</strong> = Exploitation &amp; Installation, <strong className="text-white">Netcat</strong> = C2, <strong className="text-white">Wireshark</strong> = Detection across all stages.
          </Callout>
        </motion.section>

        {/* Section 6: Course Structure */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2} id="course-structure">How This Course Works</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Each tool module follows a consistent learning path designed to take you from zero knowledge to hands-on proficiency. Every module contains:
          </p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Learn', desc: 'Read the documentation sections covering concepts, flags, and techniques.', icon: 'ri-book-read-line', color: 'text-cyber-cyan' },
              { step: '02', title: 'Interactive Builder', desc: 'Use the command builder to generate and understand tool commands.', icon: 'ri-tools-line', color: 'text-cyber-amber' },
              { step: '03', title: 'Quiz', desc: 'Test your understanding with 10-15 multiple-choice questions per module.', icon: 'ri-questionnaire-line', color: 'text-cyber-green' },
              { step: '04', title: 'Lab', desc: 'Complete hands-on exercises where you type real commands and answers.', icon: 'ri-flask-line', color: 'text-cyber-red' },
            ].map((s) => (
              <div key={s.step} className="cyber-card p-5 text-center">
                <div className={`w-10 h-10 rounded-full bg-cyber-bg border border-cyber-border flex items-center justify-center mx-auto mb-3 ${s.color}`}>
                  <i className={s.icon} />
                </div>
                <span className="text-[10px] font-mono text-cyber-text-dim">{s.step}</span>
                <h4 className="text-sm font-semibold text-white mt-1">{s.title}</h4>
                <p className="text-xs text-cyber-text-muted mt-1.5">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseModules.map((mod) => (
              <div key={mod.name} className="cyber-card p-4 flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg bg-cyber-bg border border-cyber-border flex items-center justify-center flex-shrink-0 ${mod.color}`}>
                  <i className={mod.icon} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{mod.name}</h4>
                  <p className="text-xs text-cyber-text-muted mt-1">{mod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="cyber-card p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white">Ready to Begin?</h3>
              <p className="mt-2 text-cyber-text-muted max-w-lg mx-auto">
                Start with the Wireshark module or jump directly into any tool. Each module is self-contained and includes interactive builders, quizzes, and labs.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href="/getting-started" className="px-5 py-2.5 bg-cyber-cyan text-cyber-bg font-semibold rounded-lg hover:bg-cyber-cyan-dim transition-all whitespace-nowrap glow-cyan">
                  <i className="ri-radar-line mr-2" />
                  Start with Wireshark
                </a>
                <a href="/nmap" className="px-5 py-2.5 border border-cyber-amber text-cyber-amber font-semibold rounded-lg hover:bg-cyber-amber/10 transition-all whitespace-nowrap">
                  <i className="ri-shield-check-line mr-2" />
                  Jump to Nmap
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
  );
}