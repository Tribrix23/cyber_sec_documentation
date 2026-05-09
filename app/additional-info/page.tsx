'use client'
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

const fadeInStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeInItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

// Expanded port list (common + additional useful ports)
const allPorts = [
  // Well-known ports (0-1023)
  { port: 0, proto: 'TCP/UDP', service: 'Reserved', category: 'System' },
{ port: 7, proto: 'TCP/UDP', service: 'Echo', category: 'Network Testing' },
{ port: 9, proto: 'TCP/UDP', service: 'Discard', category: 'Network Testing' },
{ port: 13, proto: 'TCP/UDP', service: 'Daytime', category: 'Time Sync' },
{ port: 17, proto: 'TCP/UDP', service: 'Quote of the Day', category: 'Network' },
{ port: 19, proto: 'TCP/UDP', service: 'Chargen', category: 'Network Testing' },

{ port: 20, proto: 'TCP', service: 'FTP Data', category: 'File Transfer' },
{ port: 21, proto: 'TCP', service: 'FTP Control', category: 'File Transfer' },
{ port: 22, proto: 'TCP', service: 'SSH / SCP / SFTP', category: 'Remote Admin' },
{ port: 23, proto: 'TCP', service: 'Telnet', category: 'Remote Admin' },
{ port: 25, proto: 'TCP', service: 'SMTP', category: 'Email' },

{ port: 42, proto: 'TCP/UDP', service: 'WINS Replication', category: 'Windows' },
{ port: 49, proto: 'TCP/UDP', service: 'TACACS Authentication', category: 'Authentication' },

{ port: 53, proto: 'TCP/UDP', service: 'DNS', category: 'Name Resolution' },
{ port: 67, proto: 'UDP', service: 'DHCP Server', category: 'Network' },
{ port: 68, proto: 'UDP', service: 'DHCP Client', category: 'Network' },
{ port: 69, proto: 'UDP', service: 'TFTP', category: 'File Transfer' },

{ port: 80, proto: 'TCP', service: 'HTTP', category: 'Web' },

{ port: 88, proto: 'TCP/UDP', service: 'Kerberos Authentication', category: 'Authentication' },

{ port: 110, proto: 'TCP', service: 'POP3', category: 'Email' },
{ port: 119, proto: 'TCP', service: 'NNTP (Usenet)', category: 'News' },
{ port: 123, proto: 'UDP', service: 'NTP', category: 'Time Sync' },

{ port: 135, proto: 'TCP', service: 'MS RPC Endpoint Mapper', category: 'Windows' },
{ port: 137, proto: 'UDP', service: 'NetBIOS Name Service', category: 'Windows' },
{ port: 138, proto: 'UDP', service: 'NetBIOS Datagram', category: 'Windows' },
{ port: 139, proto: 'TCP', service: 'NetBIOS Session', category: 'Windows' },

{ port: 143, proto: 'TCP', service: 'IMAP', category: 'Email' },
{ port: 161, proto: 'UDP', service: 'SNMP', category: 'Network Mgmt' },
{ port: 162, proto: 'UDP', service: 'SNMP Trap', category: 'Network Mgmt' },
{ port: 179, proto: 'TCP', service: 'BGP', category: 'Routing' },
{ port: 194, proto: 'TCP', service: 'IRC', category: 'Communication' },

{ port: 389, proto: 'TCP', service: 'LDAP', category: 'Directory' },
{ port: 443, proto: 'TCP', service: 'HTTPS / SSL', category: 'Web' },
{ port: 445, proto: 'TCP', service: 'SMB / CIFS', category: 'Windows' },

{ port: 464, proto: 'TCP/UDP', service: 'Kerberos Change/Auth', category: 'Authentication' },
{ port: 500, proto: 'UDP', service: 'IKE/IPsec', category: 'VPN' },

{ port: 512, proto: 'TCP', service: 'rexec (legacy remote exec)', category: 'Remote Admin (Legacy)' },
{ port: 513, proto: 'TCP', service: 'rlogin (legacy login)', category: 'Remote Admin (Legacy)' },
{ port: 514, proto: 'TCP/UDP', service: 'Syslog', category: 'Logging' },

{ port: 543, proto: 'TCP', service: 'PostgreSQL (alt)', category: 'Database' },
{ port: 587, proto: 'TCP', service: 'SMTP Submission', category: 'Email' },
{ port: 636, proto: 'TCP', service: 'LDAPS', category: 'Directory' },

{ port: 873, proto: 'TCP', service: 'rsync', category: 'File Transfer' },

{ port: 989, proto: 'TCP', service: 'FTPS Data', category: 'File Transfer' },
{ port: 990, proto: 'TCP', service: 'FTPS Control', category: 'File Transfer' },

{ port: 993, proto: 'TCP', service: 'IMAPS', category: 'Email' },
{ port: 995, proto: 'TCP', service: 'POP3S', category: 'Email' },

{ port: 1080, proto: 'TCP', service: 'SOCKS Proxy', category: 'Proxy' },
{ port: 1194, proto: 'UDP', service: 'OpenVPN', category: 'VPN' },

{ port: 1433, proto: 'TCP', service: 'MSSQL', category: 'Database' },
{ port: 1434, proto: 'UDP', service: 'MSSQL Browser Service', category: 'Database' },
{ port: 1521, proto: 'TCP', service: 'Oracle DB', category: 'Database' },

{ port: 1701, proto: 'UDP', service: 'L2TP VPN', category: 'VPN' },
{ port: 1723, proto: 'TCP', service: 'PPTP VPN', category: 'VPN' },

{ port: 1812, proto: 'UDP', service: 'RADIUS Authentication', category: 'Authentication' },
{ port: 1813, proto: 'UDP', service: 'RADIUS Accounting', category: 'Authentication' },

{ port: 2049, proto: 'TCP/UDP', service: 'NFS', category: 'File Sharing' },

{ port: 2181, proto: 'TCP', service: 'Apache ZooKeeper', category: 'Distributed' },

{ port: 2375, proto: 'TCP', service: 'Docker API (Insecure)', category: 'Container' },
{ port: 2376, proto: 'TCP', service: 'Docker API (Secure TLS)', category: 'Container' },

{ port: 3128, proto: 'TCP', service: 'Squid Proxy', category: 'Proxy' },

{ port: 3306, proto: 'TCP', service: 'MySQL / MariaDB', category: 'Database' },
{ port: 3389, proto: 'TCP', service: 'RDP', category: 'Remote Admin' },

{ port: 3690, proto: 'TCP', service: 'SVN (Subversion)', category: 'Version Control' },

{ port: 4444, proto: 'TCP', service: 'Common Exploit / Backdoor Port', category: 'Exploitation' },

{ port: 4789, proto: 'UDP', service: 'VXLAN', category: 'Networking' },

{ port: 5000, proto: 'TCP', service: 'UPnP / API Services', category: 'Networking' },
{ port: 5060, proto: 'TCP/UDP', service: 'SIP VoIP', category: 'VoIP' },

{ port: 5222, proto: 'TCP', service: 'XMPP Messaging', category: 'Messaging' },

{ port: 5353, proto: 'UDP', service: 'mDNS / Bonjour', category: 'Name Resolution' },

{ port: 5432, proto: 'TCP', service: 'PostgreSQL', category: 'Database' },

{ port: 5601, proto: 'TCP', service: 'Kibana', category: 'Search' },

{ port: 5900, proto: 'TCP', service: 'VNC', category: 'Remote Admin' },
{ port: 5984, proto: 'TCP', service: 'CouchDB', category: 'Database' },

{ port: 6000, proto: 'TCP', service: 'X11 Display System', category: 'Display System' },

{ port: 6379, proto: 'TCP', service: 'Redis', category: 'Database' },

{ port: 7001, proto: 'TCP', service: 'Oracle WebLogic', category: 'Application Server' },

{ port: 8000, proto: 'TCP', service: 'HTTP Dev Server', category: 'Web' },
{ port: 8001, proto: 'TCP', service: 'HTTP Dev Alt', category: 'Web' },

{ port: 8080, proto: 'TCP', service: 'HTTP Proxy / Alt', category: 'Web' },
{ port: 8443, proto: 'TCP', service: 'HTTPS Alt', category: 'Web' },
{ port: 8888, proto: 'TCP', service: 'HTTP Proxy / Dev', category: 'Web' },

{ port: 9000, proto: 'TCP', service: 'Web/API Service', category: 'Web' },

{ port: 9092, proto: 'TCP', service: 'Apache Kafka', category: 'Message Queue' },

{ port: 9200, proto: 'TCP', service: 'Elasticsearch', category: 'Search' },
{ port: 9300, proto: 'TCP', service: 'Elasticsearch Cluster', category: 'Search' },

{ port: 11211, proto: 'TCP/UDP', service: 'Memcached', category: 'Cache' },

{ port: 27017, proto: 'TCP', service: 'MongoDB', category: 'Database' },
{ port: 27018, proto: 'TCP', service: 'MongoDB Sharded Instance', category: 'Database' },
{ port: 28017, proto: 'TCP', service: 'MongoDB HTTP Interface (legacy)', category: 'Database' }
];

// Recommended minimum display (most essential)
const topPorts = allPorts.slice(0, 10);

const operatingSystems = [
  {
    name: 'Kali Linux',
    icon: '',
    color: 'text-cyber-cyan',
    desc: 'Industry-standard penetration testing distribution. Pre-installed with 600+ security tools. Based on Debian.',
    bestFor: 'Offensive security, pentesting, CTFs, forensics',
    link: 'https://www.kali.org',
  },
  {
    name: 'Parrot OS',
    icon: '',
    color: 'text-cyber-green',
    desc: 'Security-focused distro with strong privacy features. Lighter than Kali, includes AnonSurf for anonymity.',
    bestFor: 'Privacy-conscious pen-testing, lightweight environments',
    link: 'https://www.parrotsec.org',
  },
  {
    name: 'Black Arch Linux',
    icon: '',
    color: 'text-cyber-red',
    desc: ' Arch Linux-based penetration testing distro with the largest repository of security tools (3000+).',
    bestFor: 'Advanced Linux users, bleeding-edge tools, customization',
    link: 'https://blackarch.org',
  },
  {
    name: 'Security Onion',
    icon: 'ri-shield-check-line',
    color: 'text-cyber-amber',
    desc: 'Linux distro for intrusion detection, network security monitoring, and log management. Includes Suricata, Zeek.',
    bestFor: 'Defensive security, SOC, network monitoring',
    link: 'https://securityonion.net',
  },
  {
    name: 'CAINE (Computer Aided INvestigative Environment)',
    icon: 'ri-search-eye-line',
    color: 'text-cyber-text-dim',
    desc: 'Italian digital forensics distribution focused on incident response and forensic analysis.',
    bestFor: 'Digital forensics, incident response, malware analysis',
    link: 'https://www.caine-live.net',
  },
  {
    name: 'BackBox Linux',
    icon: 'ri-bug-line',
    color: 'text-cyber-cyan',
    desc: 'Ubuntu-based pen-testing distro with a fast, lightweight XFCE desktop and rapid release cycle.',
    bestFor: 'Beginners, fast setup, web app testing',
    link: 'https://www.backbox.org',
  },
];

const essentialTools = [
  { name: 'Nmap', purpose: 'Network discovery and port scanning' },
  { name: 'Wireshark', purpose: 'Packet capture and protocol analysis' },
  { name: 'Burp Suite', purpose: 'Web application testing' },
  { name: 'Metasploit', purpose: 'Exploitation framework' },
  { name: 'SQLMap', purpose: 'Automated SQL injection' },
  { name: 'John the Ripper', purpose: 'Password cracking' },
  { name: 'Gobuster', purpose: 'Directory and subdomain enumeration' },
  { name: 'Hashcat', purpose: 'Advanced password recovery (GPU)' },
  { name: 'Cloudsploit', purpose: 'Cloud security scanning and misconfiguration detection' },
  { name: 'Netcat', purpose: 'Networking Swiss Army knife' },
];

const certifications = [
  { abbr: 'Security+', full: 'CompTIA Security+', level: 'Foundational', org: 'CompTIA' },
  { abbr: 'CEH', full: 'Certified Ethical Hacker', level: 'Intermediate', org: 'EC-Council' },
  { abbr: 'OSCP', full: 'OffSec Certified Professional', level: 'Advanced', org: 'OffSec' },
  { abbr: 'GPEN', full: 'GIAC Penetration Tester', level: 'Advanced', org: 'GIAC' },
];

const terminology = [
  {
    term: 'Attack Surface',
    def: 'The total sum of all entry points an attacker could use to compromise a system.',
    example: 'A web app with 50 pages, 20 API endpoints, and exposed admin panel has a large attack surface.',
  },
  {
    term: 'Exploit',
    def: 'Code or technique that takes advantage of a vulnerability to cause unintended behavior.',
    example: 'An SQL injection payload that extracts database contents.',
  },
  {
    term: 'Payload',
    def: 'The malicious component delivered after an exploit succeeds; determines what the attacker does post-compromise.',
    example: 'A reverse shell payload that connects back to the attacker.',
  },
  {
    term: 'Zero-Day',
    def: 'A vulnerability that is unknown to the vendor and has no patch available. Highly valuable in offensive security.',
    example: 'A newly discovered Windows kernel vulnerability before Microsoft releases a fix.',
  },
  {
    term: 'Privilege Escalation',
    def: 'Gaining higher-level access (root/administrator) from a lower-privilege account.',
    example: 'Exploiting a SUID binary to gain root on Linux.',
  },
  {
    term: 'Lateral Movement',
    def: 'Moving through a network after initial compromise to reach high-value targets.',
    example: 'Using stolen credentials to access multiple systems in a domain.',
  },
  {
    term: 'Persistence',
    def: 'Mechanisms that maintain access across reboots, updates, or credential changes.',
    example: 'Creating a cron job that re-establishes a shell connection.',
  },
  {
    term: 'C2 (Command & Control)',
    def: 'Infrastructure used by attackers to remotely control compromised systems.',
    example: 'A Cobalt Strike server that issues commands to malware implants.',
  },
  {
    term: 'Red Team',
    def: 'Security professionals who simulate real attacks to test defenses and improve detection.',
    example: 'A team conducting a simulated APT attack over 2 weeks.',
  },
  {
    term: 'Blue Team',
    def: 'Security defenders who protect systems, detect intrusions, and respond to incidents.',
    example: 'SOC analysts monitoring SIEM alerts for anomalies.',
  },
  {
    term: 'Purple Team',
    def: 'Collaboration between red and blue teams to improve detection capabilities and security posture.',
    example: 'Running controlled attacks and refining detection rules in real-time.',
  },
  {
    term: 'TTP (Tactics, Techniques, and Procedures)',
    def: 'The methods and behaviors of threat actors; used to identify and attribute attacks.',
    example: 'APT29 uses specific TTPs like living-off-the-land binaries.',
  },
  {
    term: 'IOC (Indicator of Compromise)',
    def: 'Forensic artifacts that indicate a system or network has been breached.',
    example: 'A specific file hash, IP address, or domain associated with malware.',
  },
  {
    term: 'MITRE ATT&CK',
    def: 'A globally-accessible knowledge base of adversary tactics and techniques observed in real-world attacks.',
    example: 'T1059 - Command and Scripting Interpreter (powershell, wmic, etc.)',
  },
];

const networkBasics = [
  {
    title: 'Private IP Ranges (RFC 1918)',
    content: `10.0.0.0    - 10.255.255.255    (10/8) — Large corporate networks
172.16.0.0  - 172.31.255.255    (172.16/12) — Medium organizations
192.168.0.0 - 192.168.255.255   (192.168/16) — Home/Small office`,
    type: 'code',
  },
  {
    title: 'Reserved/ SPECIAL-USE IPs',
    content: `127.0.0.0/8   — Loopback (localhost)
169.254.0.0/16 — Link-local (APIPA, zero-config)
0.0.0.0        — Unspecified/Default route
255.255.255.255 — Broadcast`,
    type: 'code',
  },
  {
    title: 'Key IPv4 CIDR Reference',
    content: `/32  = 1 host         (single IP)
/31  = 2 hosts        (point-to-point)
/30  = 4 hosts        (small links)
/29  = 8 hosts
/28  = 16 hosts
/27  = 32 hosts
/26  = 64 hosts
/24  = 256 hosts      (class C)
/16  = 65,536 hosts   (class B)
/8   = 16,777,216     (class A)`,
    type: 'code',
  },
];

export default function AdditionalInfo() {
  const [showAllPorts, setShowAllPorts] = useState(false);
  const [activeTerm, setActiveTerm] = useState<number | null>(null);

  const displayedPorts = showAllPorts ? allPorts : topPorts;
  const isBlurred = !showAllPorts;
  const totalPorts = allPorts.length;
  const visibleCount = topPorts.length;

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      {/* Header */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-medium font-mono mb-4">
          <i className="ri-information-line" />
          Reference &amp; Resources
        </div>
        <DocHeading level={1}>Additional Information</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Essential reference material for cybersecurity practitioners. Operating system recommendations, port and protocol references, key terminology, and best-practice guidelines to support your learning and professional work.
        </p>
      </motion.div>

      {/* Section 1: Recommended Operating Systems */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2} id="operating-systems">Recommended Operating Systems</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Choosing the right penetration testing or security-focused OS significantly affects productivity. Each distro has different strengths, tool availability, and learning curves.
        </p>

        <motion.div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4" variants={fadeInStagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {operatingSystems.map((os, i) => (
            <motion.div key={i} className="cyber-card p-5" variants={fadeInItem}>
              <div className="flex items-start gap-3">
<div className={`w-10 h-10 rounded-lg bg-cyber-bg border border-cyber-border flex items-center justify-center flex-shrink-0 ${os.color}`}>
  {os.name === 'Kali Linux' && (
    <img 
      src="/kali.png" 
      alt="Kali Linux" 
      width="24" 
      height="24" 
      className="object-contain"
    />
  )}
  {os.name === 'Parrot OS' && (
    <img 
      src="/parrot.png" 
      alt="Parrot OS" 
      width="24" 
      height="24" 
      className="object-contain"
    />
  )}
  {os.name === 'Black Arch Linux' && (
    <img 
      src="/black-arch.png" 
      alt="Black Arch Linux" 
      width="24" 
      height="24" 
      className="object-contain"
    />
  )}
  {!['Kali Linux', 'Parrot OS', 'Black Arch Linux'].includes(os.name) && (
    <i className={os.icon} />
  )}
</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-white">{os.name}</h3>
                    {os.link && (
                      <a href={os.link} target="_blank" rel="noopener noreferrer" className="text-cyber-cyan text-sm hover:underline">
                        <i className="ri-external-link-line" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-cyber-text mt-2 leading-relaxed">{os.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-[10px] px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-cyber-cyan font-mono">
                      {os.bestFor}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Callout type="tip" className="mt-5">
          <strong className="text-cyber-cyan">Beginner recommendation:</strong> Start with <strong>Kali Linux</strong> — it has the most documentation, largest community, and every tool you&apos;ll need for this course. Install it in a VM (VMware/VirtualBox) alongside your main OS.
        </Callout>
      </motion.section>

      {/* Section 2: Essential Security Tools */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2} id="essential-tools">Core Security Tools Covered</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Throughout this documentation you&apos;ll master these foundational security tools. Each module provides concepts, interactive builders, quizzes, and hands-on labs.
        </p>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {essentialTools.map((tool, i) => (
            <div key={i} className="cyber-card p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-cyber-bg border border-cyber-border flex items-center justify-center flex-shrink-0 text-cyber-cyan">
                <i className="ri-tools-line" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{tool.name}</h4>
                <p className="text-xs text-cyber-text mt-1">{tool.purpose}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Section 3: Common Ports Table with Blur/Expand */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2} id="common-ports">Ports &amp; Protocols Reference</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Ports are numeric identifiers (0&ndash;65535) that distinguish services on a host. The first 1024 are &quot;well-known&quot; and reserved by IANA. This table lists the most common ports you&apos;ll encounter in security assessments.
        </p>

        <div className="mt-5 cyber-card p-5">
           <div className="overflow-x-auto">
             <table className="w-full text-sm border border-cyber-border rounded-lg overflow-hidden">
               <thead className="bg-cyber-bg-card">
                 <tr>
                   <th className="text-left px-4 py-3 text-cyber-text font-semibold">Port</th>
                   <th className="text-left px-4 py-3 text-cyber-text font-semibold">Protocol</th>
                   <th className="text-left px-4 py-3 text-cyber-text font-semibold">Service</th>
                   <th className="text-left px-4 py-3 text-cyber-text font-semibold">Category</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-cyber-border">
                 {displayedPorts.map((p) => (
                   <tr key={p.port} className="hover:bg-cyber-bg-card/50 transition-colors">
                     <td className="px-4 py-2.5 font-mono text-cyber-cyan">{p.port}</td>
                     <td className="px-4 py-2.5 text-cyber-text">{p.proto}</td>
                     <td className="px-4 py-2.5 text-cyber-text">{p.service}</td>
                     <td className="px-4 py-2.5">
                       <span className="text-[10px] px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-text-dim font-mono">
                         {p.category}
                       </span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-5 justify-center">
            {!showAllPorts && (
              <>
                <button
                  type="button"
                  onClick={() => setShowAllPorts(true)}
                  className="px-4 py-2 rounded-lg border border-cyber-cyan text-cyber-cyan text-sm font-medium hover:bg-cyber-cyan/10 transition-all"
                >
                  <i className="ri-eye-line mr-1.5" />
                  Show More ({totalPorts - visibleCount} more)
                </button>
              </>
            )}
            {showAllPorts && (
              <>
                <button
                  type="button"
                  onClick={() => setShowAllPorts(false)}
                  className="px-4 py-2 rounded-lg border border-cyber-text-dim text-cyber-text-dim text-sm font-medium hover:bg-cyber-bg-card transition-all"
                >
                  <i className="ri-eye-off-line mr-1.5" />
                  Collapse
                </button>
                <span className="text-xs text-cyber-text-dim font-mono">
                  Showing all {totalPorts} ports
                </span>
              </>
            )}
          </div>
        </div>

        <Callout type="tip" className="mt-4">
          <strong className="text-cyber-cyan">Must-know ports:</strong> 22 (SSH), 23 (Telnet), 53 (DNS), 80 (HTTP), 443 (HTTPS), 445 (SMB), 3306 (MySQL), 3389 (RDP). Memorize these &mdash; they appear in almost every engagement.
        </Callout>
      </motion.section>

      {/* Section 4: Essential Terminology */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2} id="terminology">Essential Terminology</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Key security terms every practitioner should know. These concepts appear throughout tool documentation, pentest reports, and security discussions.
        </p>

        <motion.div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3" variants={fadeInStagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {terminology.map((t, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setActiveTerm(activeTerm === i ? null : i)}
              className={`cyber-card p-4 text-left cursor-pointer transition-all ${activeTerm === i ? 'border-cyber-cyan bg-cyber-bg-card/50' : 'hover:border-cyber-cyan/50'}`}
              variants={fadeInItem}
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
                        className="text-xs text-cyber-text mt-2 leading-relaxed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {t.def}
                        {t.example && (
                          <span className="block mt-1.5 text-cyber-cyan font-mono bg-cyber-bg px-2 py-1 rounded text-[10px]">
                            {t.example}
                          </span>
                        )}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <i className={`ri-arrow-down-s-line text-cyber-text-dim transition-transform ${activeTerm === i ? 'rotate-180' : ''}`} />
              </div>
            </motion.button>
          ))}
        </motion.div>
      </motion.section>

      {/* Section 5: Network Reference */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2} id="network-reference">Networking Quick Reference</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Fundamental networking concepts and address ranges you&apos;ll reference constantly during security assessments.
        </p>

        <div className="mt-5 space-y-4">
          {networkBasics.map((item, i) => (
            <div key={i} className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2 flex items-center gap-2">
                <i className="ri-radar-line" />
                {item.title}
              </h3>
              <CodeBlock code={item.content} language="text" />
            </div>
          ))}
        </div>

        <Callout type="info" className="mt-4">
          <strong className="text-cyber-cyan">Tip:</strong> Memorize the three private ranges (10/8, 172.16/12, 192.168/16). Any IP within these ranges is internal-only and not routable on the public internet.
        </Callout>
      </motion.section>

      {/* Section 6: Certifications & Career */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2} id="certifications">Certifications &amp; Career Path</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Industry-recognized certifications that validate your skills and advance your cybersecurity career.
        </p>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, i) => (
            <div key={i} className="cyber-card p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-cyber-bg border border-cyber-border flex items-center justify-center mx-auto mb-3 text-cyber-amber">
                <i className="ri-award-line" />
              </div>
              <span className="text-[10px] font-mono text-cyber-text-dim">{cert.org}</span>
              <h3 className="text-base font-semibold text-white mt-1">{cert.abbr}</h3>
              <p className="text-xs text-cyber-text mt-0.5">{cert.full}</p>
              <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber">
                {cert.level}
              </span>
            </div>
          ))}
        </div>

        <Callout type="info" className="mt-5">
          <strong className="text-cyber-cyan">Path progression:</strong> Start with <strong>Security+</strong> for foundations → <strong>CEH</strong> for offensive concepts → <strong>OSCP</strong> for hands-on penetration testing mastery.
        </Callout>
      </motion.section>

      {/* Section 7: Learning Best Practices */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2} id="best-practices">Learning &amp; Practice Best Practices</DocHeading>

        <div className="mt-5 space-y-3">
          {[
            {
              title: 'Use a Virtual Machine (VM) Environment',
              desc: 'Never run security tools on your host machine. Use VirtualBox or VMware with isolated VMs for all testing. Snapshots allow instant rollback after a tool breaks something.',
              icon: 'ri-v-box-line',
            },
            {
              title: 'Practice on Legal, Authorized Targets',
              desc: 'Use platforms like Hack The Box, TryHackMe, VulnHub, or your own lab VMs. Unauthorized scanning is illegal and unethical.',
              icon: 'ri-law-line',
            },
            {
              title: 'Document Everything',
              desc: 'Keep notes on commands tried, results observed, and lessons learned. This builds your personal knowledge base and improves retention.',
              icon: 'ri-file-list-3-line',
            },
            {
              title: 'Understand Before You Copy',
              desc: 'Dont just copy-paste commands from the internet. Understand each flag and option so you can adapt when conditions change.',
              icon: 'ri-search-eye-line',
            },
            {
              title: 'Join Communities',
              desc: ' Engage with r/cybersecurity, HackTheBox Discord, local 0x00sec chapters, and CTF events. Peer learning accelerates growth.',
              icon: 'ri-team-line',
            },
            {
              title: 'Build a Home Lab',
              desc: 'Set up vulnerable VMs (Metasploitable, DVWA, OWASP Juice Shop). Practice scanning, enumerating, and exploiting in a safe environment.',
              icon: 'ri-flask-line',
            },
          ].map((item, i) => (
            <motion.div key={i} className="cyber-card p-4" variants={fadeInItem}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-cyber-bg border border-cyber-border flex items-center justify-center flex-shrink-0 text-cyber-green">
                  <i className={item.icon} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <p className="text-xs text-cyber-text mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Section 8: Quick Command Reference */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2} id="quick-reference">Everyday CLI Commands</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          These commands are useful regardless of which security tool you&apos;re using.
        </p>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-cyber-cyan mb-3 flex items-center gap-2">
              <i className="ri-terminal-line" />
              Network &amp; Host Discovery
            </h3>
            <CodeBlock
              code={`ping 10.0.0.1                 # Test connectivity
traceroute 8.8.8.8           # Trace network path
nslookup example.com         # DNS lookup (Windows)
dig example.com              # DNS lookup (Linux/macOS)
whois example.com            # Domain registration info
netstat -an                  # Active connections (all)
ss -tuln                     # Modern replacement for netstat
arp -a                       # ARP table (local network)
ip addr show                 # Show IP configuration (Linux)`}
              language="bash"
            />
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-cyber-green mb-3 flex items-center gap-2">
              <i className="ri-file-search-line" />
              File &amp; System Analysis
            </h3>
            <CodeBlock
              code={`file suspicious.exe          # Determine file type
sha256sum file.iso            # Calculate SHA-256 hash
md5sum file.bin               # Calculate MD5 hash (less secure)
strings malware.bin           # Extract human-readable strings
hexdump -C file.bin           # Hex dump with ASCII
exiftool image.jpg            # Extract metadata
find / -perm -4000 2>/dev/null # Find SUID binaries
history                      # Show command history
sudo -l                      # List sudo privileges`}
              language="bash"
            />
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[100px]" />
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white">Ready to Start Your Journey?</h3>
            <p className="mt-2 text-cyber-text max-w-lg mx-auto">
              Bookmark this page for future reference. Begin with the Wireshark module to learn packet analysis fundamentals, or jump into Nmap for network reconnaissance skills.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href="/getting-started" className="px-5 py-2.5 bg-cyber-cyan text-cyber-bg font-semibold rounded-lg hover:bg-cyber-cyan-dim transition-all whitespace-nowrap glow-cyan">
                <i className="ri-rocket-line mr-2" />
                CyberSec Fundamentals
              </a>
              <a href="/cybersecurity" className="px-5 py-2.5 border border-cyber-amber text-cyber-amber font-semibold rounded-lg hover:bg-cyber-amber/10 transition-all whitespace-nowrap">
                <i className="ri-radar-line mr-2" />
                Begin with Cybersecurity
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
