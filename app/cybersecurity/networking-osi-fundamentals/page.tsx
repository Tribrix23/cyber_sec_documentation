'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/base/Codeblock';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const osiLayers = [
  {
    layer: 7,
    name: 'Application',
    description: 'User-facing protocols and data formats. HTTP, HTTPS, FTP, SMTP, DNS operate here.',
    keyProtocols: ['HTTP/HTTPS (Web)', 'SMTP (Email)', 'FTP (File Transfer)', 'DNS (Name Resolution)', 'SSH (Remote Access)'],
    realWorldIncident: 'Heartbleed (2014): OpenSSL vulnerability in TLS implementation at Application layer allowed extraction of 64KB memory chunks from servers, compromising private keys and session cookies across millions of websites.',
    analogy: 'Like the content of a letter you\u2019re writing—the actual message you want to send.',
    pdu: 'Data',
  },
  {
    layer: 6,
    name: 'Presentation',
    description: 'Data translation, encryption, compression, and formatting. Converts data into a format the Application layer can understand.',
    keyProtocols: ['SSL/TLS (Encryption)', 'JPEG/PNG (Image formats)', 'MPEG (Video)', 'ASCII/Unicode (Character encoding)'],
    realWorldIncident: 'ROCA (2017): Infineon TPM vulnerability in RSA key generation algorithm allowed attackers to factor private keys by exploiting weaknesses in the presentation layer\u2019s data transformation process, affecting Estonia\u2019s national ID cards and other systems.',
    analogy: 'Like translating a letter into a foreign language or encrypting it so only the recipient can read it.',
    pdu: 'Data',
  },
  {
    layer: 5,
    name: 'Session',
    description: 'Establishes, maintains, and terminates connections between applications. Manages dialogues and control.',
    keyProtocols: ['NetBIOS', 'RPC', 'PPTP', 'Sockets (TCP/UDP port binding)'],
    realWorldIncident: 'Session hijacking attacks on e-commerce sites in the early 2000s where attackers stole session cookies to impersonate logged-in users, placing fraudulent orders. Led to implementation of secure session management and HttpOnly cookies.',
    analogy: 'Like a phone call\u2014you dial (establish), talk (maintain), and hang up (terminate).',
    pdu: 'Data',
  },
  {
    layer: 4,
    name: 'Transport',
    description: 'End-to-end communication, reliability, flow control, error recovery. TCP (reliable) vs UDP (fast but unreliable).',
    keyProtocols: ['TCP (Connection-oriented)', 'UDP (Connectionless)', 'SCTP (Multi-streaming)'],
    realWorldIncident: 'TCP SYN Flood (1996): First major DoS attack exploited TCP\u2019s three-way handshake by sending SYN packets without completing handshake, exhausting server resources. Led to SYN cookies and modern DDoS mitigation techniques.',
    analogy: 'Like postal service\u2014TCP is registered mail with receipt (guaranteed delivery), UDP is regular mail (may or may not arrive).',
    pdu: 'Segments (TCP) / Datagrams (UDP)',
  },
  {
    layer: 3,
    name: 'Network',
    description: 'Logical addressing and routing. IP addresses determine where packets go. Routers operate at this layer.',
    keyProtocols: ['IP (IPv4/IPv6)', 'ICMP (diagnostics)', 'ARP (address resolution)', 'BGP/OSPF (routing protocols)'],
    realWorldIncident: 'SolarWinds (2020): Attackers bypassed network segmentation by compromising legitimate admin tools. Network layer security (VLANs, firewalls, route filtering) is critical to limiting lateral movement.',
    analogy: 'Like the postal address on an envelope\u2014tells the post office where to deliver.',
    pdu: 'Packets',
  },
  {
    layer: 2,
    name: 'Data Link',
    description: 'Physical addressing (MAC addresses), error detection, flow control between directly connected nodes. Switches operate here.',
    keyProtocols: ['Ethernet (IEEE 802.3)', 'Wi-Fi (IEEE 802.11)', 'ARP', 'PPP'],
    realWorldIncident: 'MAC flooding attacks on switches (early 2000s): Attackers flooded switches with fake MAC addresses, forcing switches into \u201cfail-open\u201d mode where they broadcast all traffic, enabling sniffing of traffic across VLANs. Led to port security features on modern switches.',
    analogy: 'Like the specific apartment number in a building\u2014once mail reaches the building, this tells you which unit.',
    pdu: 'Frames',
  },
  {
    layer: 1,
    name: 'Physical',
    description: 'Actual physical medium: cables, fiber optics, radio waves, connectors, voltages. Defines how bits are transmitted as electrical/light signals.',
    keyProtocols: ['Ethernet cables (Cat5e/6)', 'Fiber optics', 'Wi-Fi radio', 'Bluetooth', 'Coaxial'],
    realWorldIncident: 'Fiber tap attacks: Attackers physically access fiber optic cables and use bend-sensitive taps to extract data without breaking the connection. Undetectable by network monitoring since no electrical disruption occurs. Requires physical security and encryption.',
    analogy: 'Like the road or fiber optic cable itself—the physical medium everything travels on.',
    pdu: 'Bits (0s and 1s)',
  },
];

const tcpIpModel = [
  {
    name: 'Application Layer',
    mapsTo: ['Application', 'Presentation', 'Session'],
    description: 'Combines OSI layers 5-7. Protocols: HTTP, DNS, SMTP, FTP.',
  },
  {
    name: 'Transport Layer',
    mapsTo: ['Transport'],
    description: 'Direct mapping to OSI layer 4. Protocols: TCP, UDP.',
  },
  {
    name: 'Internet Layer',
    mapsTo: ['Network'],
    description: 'IP addressing and routing. Protocols: IP, ICMP, ARP.',
  },
  {
    name: 'Network Access / Link Layer',
    mapsTo: ['Data Link', 'Physical'],
    description: 'Physical transmission and local network communication. Protocols: Ethernet, Wi-Fi.',
  },
];

const subnettingExamples = [
  {
    scenario: 'Corporate Network Segmentation',
    original: '192.168.1.0/24 (256 addresses)',
    split: '4 subnets of 62 hosts each: 192.168.1.0/26, 192.168.1.64/26, 192.168.1.128/26, 192.168.1.192/26',
    reason: 'Separate departments (Finance, Engineering, HR, Guest WiFi) to limit lateral movement if one segment is compromised.',
  },
  {
    scenario: 'DMZ Design',
    original: '10.0.0.0/16 (65,536 addresses)',
    split: 'Public web servers: 10.0.1.0/24, Database servers: 10.0.2.0/25, Admin network: 10.0.2.128/25',
    reason: 'Public-facing systems isolated from internal resources. Database subnet only accessible from application servers, not directly from internet.',
  },
];

const networkDevices = [
  {
    device: 'Router',
    layer: 'Layer 3 (Network)',
    function: 'Connects different networks. Routes traffic based on IP addresses. Makes forwarding decisions using routing tables.',
    securityRole: 'Enforces network boundaries, implements ACLs (Access Control Lists), terminates VPN tunnels, performs NAT (Network Address Translation).',
    example: 'Corporate router blocks all incoming connections except HTTPS (443) and SSH (22) from known management IPs.',
  },
  {
    device: 'Switch',
    layer: 'Layer 2 (Data Link)',
    function: 'Connects devices on the same network. Forwards frames based on MAC addresses.',
    securityRole: 'VLAN segmentation, port security (MAC limiting), 802.1X authentication, DHCP snooping, ARP inspection.',
    example: 'Switch configured with 802.1X prevents unauthorized devices from connecting to corporate network—devices must authenticate with credentials before gaining network access.',
  },
  {
    device: 'Firewall',
    layer: 'Layer 3/4 (Network/Transport)',
    function: 'Filters traffic based on rules. Can be stateful (tracks connections) or stateless.',
    securityRole: 'Enforces network security policy, blocks/allow traffic based on IP, port, protocol, application signatures.',
    example: 'Next-Gen Firewall (NGFW) inspects HTTPS traffic, blocks known malware C2 communications, and enforces user-based policies.',
  },
  {
    device: 'IDS/IPS',
    layer: 'Layer 2-7 (varies)',
    function: 'IDS detects, IPS prevents malicious traffic. Signature-based and anomaly-based detection.',
    securityRole: 'Network monitoring, threat detection, attack prevention, forensic logging.',
    example: 'Snort IPS detected and blocked SMB exploit attempts from an internal machine contacting known malicious IPs during incident response.',
  },
  {
    device: 'Load Balancer',
    layer: 'Layer 4-7',
    function: 'Distributes traffic across multiple servers for performance and redundancy.',
    securityRole: 'DDoS protection, SSL offloading, application layer filtering, WAF integration.',
    example: 'Cloud load balancer acted as first line of defense during DDoS attack by absorbing traffic spikes and rate-limiting suspicious requests.',
  },
];

const networkingAttacks = [
  {
    attack: 'Man-in-the-Middle (MITM)',
    method: 'Attacker intercepts communication between two parties. Can be passive (eavesdropping) or active (injecting/modifying traffic).',
    techniques: ['ARP spoofing/poisoning', 'Rogue DHCP server', 'DNS spoofing', 'SSL stripping', 'Evil Twin WiFi'],
    realIncident: 'Superfish (2015): Lenovo laptops shipped with adware that installed self-signed root certificate. Adware performed HTTPS interception to inject ads, creating massive security vulnerability that could be exploited by any attacker on same network.',
    defense: 'End-to-end encryption (TLS with certificate pinning), network monitoring for ARP anomalies, static ARP entries for critical servers.',
  },
  {
    attack: 'Denial of Service (DoS/DDoS)',
    method: 'Overwhelm target with traffic or resource requests to make service unavailable.',
    techniques: ['SYN Flood', 'UDP Flood', 'HTTP Flood', 'DNS Amplification', 'Ping of Death'],
    realIncident: 'Dyn DDoS (2016): Mirai botnet of compromised IoT devices launched 1.2 Tbps DDoS attack on DNS provider Dyn, taking down Twitter, Netflix, Reddit, Spotify, and others across US East Coast.',
    defense: 'Anycast network distribution, rate limiting, scrubbing centers, DDoS mitigation services (Cloudflare, Akamai), traffic shaping.',
  },
  {
    attack: 'ARP Spoofing/Poisoning',
    method: 'Send fake ARP messages to associate attacker MAC with victim IP. Enables MITM on local network.',
    techniques: ['Gratuitous ARP replies', 'ARP cache poisoning', 'ARP flood'],
    realIncident: 'Rogue access points in coffee shops (common): Attackers set up WiFi with common SSID names (e.g., \u201cStarbucks WiFi\u201d). When devices connect, attacker performs ARP spoofing to intercept all traffic, harvesting credentials and session cookies.',
    defense: 'Static ARP entries for critical systems, Dynamic ARP Inspection (DAI) on switches, VPN for all wireless communications, port security.',
  },
  {
    attack: 'DNS Cache Poisoning',
    method: 'Corrupt DNS resolver cache to return malicious IP for legitimate domain.',
    techniques: ['DNS ID spoofing', 'Cache poisoning via prediction', 'Pharming attacks'],
    realIncident: 'SeaDragon/M fimware attack (2011): Compromised DNS servers of ISP to redirect users searching for popular domains to malicious sites. Infects computers with ransomware and banking trojans. Millions affected across Europe.',
    defense: 'DNSSEC (DNS Security Extensions), use trusted DNS resolvers (1.1.1.1, 8.8.8.8), monitor DNS records for changes.',
  },
  {
    attack: 'BGP Hijacking',
    method: 'Announce fake IP prefixes to reroute internet traffic through attacker-controlled networks.',
    techniques: ['Prefix hijacking', 'Subprefix hijacking', 'Session hijacking'],
    realIncident: 'Google traffic rerouted via Russia (2017): Russian ISP (Tele2) accidentally announced BGP routes that diverted 2% of Google\u2019s traffic through their network for 4 minutes. Demonstrated fragility of internet routing. More serious: 2008 Pakistan Telecom deliberately hijacked YouTube, making it globally unavailable.',
    defense: 'RPKI (Resource Public Key Infrastructure) for route validation, BGP monitoring services, multi-homing with diverse providers.',
  },
];

export default function NetworkingOsiFundamentalsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-book-open-line" />
          Module 2 of 20 — Core Infrastructure
        </div>
        <DocHeading level={1}>Networking Fundamentals & OSI Model Deep Dive</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Networking is the bloodstream of enterprise technology. <strong className="text-cyber-cyan">Every cyber attack moves through networks</strong>. Every defensive control monitors or filters network traffic. This module dissects how data travels across networks, the protocols that power the internet, and the security implications of each layer in the networking stack.
        </p>
      </motion.div>

      {/* The OSI Model: Complete Deep Dive */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>The OSI Model: Understanding Network Communication</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          The <strong className="text-cyber-cyan">Open Systems Interconnection (OSI) model</strong> is a 7-layer framework that standardizes network functions from physical cables to application data. Developed by ISO in 1984, it remains fundamental to understanding network security, troubleshooting, and attack vectors.
        </p>

        <Callout type="info" className="mt-4">
          <strong>Why 7 Layers Matter for Security:</strong> Each layer presents unique attack surfaces. Security controls operate at specific layers: firewalls (Layers 3–4), encryption (Layer 6), IDS (Layers 3–7). Understanding which layer an attack exploits helps you select proper defenses.
        </Callout>

        {/* Complete OSI Visualization */}
        <div className="mt-8 grid grid-cols-1 gap-4">
          {osiLayers.map((layer, index) => (
            <div key={layer.layer} className="cyber-card p-5 border-l-4 border-cyber-amber">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Layer Indicator */}
                <div className="flex flex-col items-center md:items-start shrink-0">
                  <div className="w-12 h-12 rounded-full bg-cyber-amber/10 border-2 border-cyber-amber flex items-center justify-center">
                    <span className="text-lg font-bold text-cyber-amber font-mono">{layer.layer}</span>
                  </div>
                  {index < osiLayers.length - 1 && (
                    <div className="hidden md:block w-px h-16 bg-cyber-border my-1" />
                  )}
                </div>

                {/* Layer Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-base font-semibold text-white">{layer.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-cyber-bg text-cyber-cyan text-xs font-mono border border-cyber-border">Layer {layer.layer}</span>
                  </div>
                  <p className="text-sm text-cyber-text leading-relaxed mb-3">{layer.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Key Protocols */}
                    <div>
                      <h4 className="text-xs font-semibold text-cyber-cyan mb-2">Key Protocols</h4>
                      <div className="flex flex-wrap gap-1">
                        {layer.keyProtocols.map((protocol) => (
                          <span key={protocol} className="px-2 py-1 rounded bg-cyber-cyan/10 text-cyber-cyan text-xs font-mono border border-cyber-cyan/20">
                            {protocol}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* PDU */}
                    <div>
                      <h4 className="text-xs font-semibold text-cyber-amber mb-2">Protocol Data Unit</h4>
                      <span className="inline-block px-3 py-1.5 rounded bg-cyber-amber/10 text-cyber-amber text-xs font-mono border border-cyber-amber/30">
                        {layer.pdu}
                      </span>
                    </div>
                  </div>

                  {/* Analogy */}
                  <div className="mt-3 p-3 rounded-lg bg-cyber-bg border border-cyber-border">
                    <p className="text-xs text-cyber-text italic">
                      <strong className="text-cyber-green">Analogy:</strong> {layer.analogy}
                    </p>
                  </div>

                  {/* Real-World Incident */}
                  <Callout type="danger" className="mt-3">
                    <strong>Real Incident:</strong> {layer.realWorldIncident}
                  </Callout>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* TCP/IP Model Comparison */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>TCP/IP Model: The Internet\u2019s Architecture</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          The <strong className="text-cyber-cyan">TCP/IP model (DoD model)</strong> is a 4-layer model that describes how the actual internet works. It\u2019s the practical implementation behind the theoretical OSI model.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {tcpIpModel.map((layer, i) => (
            <div key={layer.name} className="cyber-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-cyber-green/10 border border-cyber-green/20 flex items-center justify-center text-cyber-green font-bold font-mono">
                  {i + 1}
                </span>
                <h3 className="text-sm font-semibold text-white">{layer.name}</h3>
              </div>
              <p className="text-xs text-cyber-text mb-2">{layer.description}</p>
              <div className="p-3 rounded bg-cyber-bg">
                <p className="text-xs text-cyber-cyan mb-1">Maps to OSI Layers:</p>
                <p className="text-xs text-cyber-text font-mono">{layer.mapsTo.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>

        <Callout type="success" className="mt-4">
          <strong>Key Insight:</strong> When a web browser (Application) requests a page, data flows down through TCP/IP layers, across networks, then up through layers at destination. At each layer, protocol-specific headers are added (encapsulation) and then stripped (decapsulation).
        </Callout>
      </motion.section>

      {/* Subnetting & IP Addressing */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>IP Addressing & Subnetting: Network Segmentation Fundamentals</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          IP addressing and subnetting control how networks are structured and how traffic flows. Understanding subnetting is essential for network security—proper segmentation contains breaches and limits lateral movement.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-3">IPv4 Address Structure</h3>
            <p className="text-xs text-cyber-text mb-3">
              An IPv4 address is 32 bits (4 octets) written as dotted decimal: 192.168.1.1
            </p>
            <div className="p-4 rounded bg-cyber-bg border border-cyber-border">
              <div className="grid grid-cols-8 gap-1 text-center text-xs font-mono">
                {[1, 9, 2, 1, 6, 8, 1, 1].map((byte, i) => (
                  <div key={i} className={`col-span-${i === 0 || i === 4 ? 1 : 1} py-2 rounded bg-${i < 4 ? 'cyber-cyan/20 border-cyber-cyan' : 'cyber-amber/20 border-cyber-amber'} border`}>
                    {byte}
                  </div>
                ))}
              </div>
              <p className="text-xs text-cyber-text mt-3 text-center">
                First two octets (192.168): <span className="text-cyber-cyan">Network portion</span> | Last two octets (1.1): <span className="text-cyber-amber">Host portion</span>
              </p>
            </div>
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Subnet Masks & CIDR Notation</h3>
            <p className="text-xs text-cyber-text mb-3">
              Subnet mask defines network vs host bits. CIDR (Classless Inter-Domain Routing) notation: /24 means 24 bits for network.
            </p>
            <CodeBlock code="192.168.1.0/24\n255.255.255.0 = 24 network bits\n\n192.168.1.0/26\n255.255.255.192 = 26 network bits\n= 4 subnets with 62 hosts each" />
          </div>
        </div>

        {/* Subnetting Example Scenarios */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-white mb-3">Real-World Subnetting Scenarios</h3>
          <div className="space-y-4">
            {subnettingExamples.map((example, i) => (
              <div key={i} className="cyber-card p-4">
                <h4 className="text-sm font-semibold text-white mb-2">{example.scenario}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-cyber-cyan mb-1">Original Network:</p>
                    <CodeBlock code={example.original} />
                  </div>
                  <div>
                    <p className="text-xs text-cyber-cyan mb-1">Split Into:</p>
                    <CodeBlock code={example.split} />
                  </div>
                  <div>
                    <p className="text-xs text-cyber-cyan mb-1">Security Reason:</p>
                    <p className="text-xs text-cyber-text leading-relaxed p-2 bg-cyber-bg rounded">
                      {example.reason}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Network Devices & Security Roles */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Network Security Devices & Their Functions</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Network security relies on specialized hardware at different layers of the stack. Each device serves distinct security functions.
        </p>

        <div className="mt-6 space-y-4">
          {networkDevices.map((device, i) => (
            <div key={device.device} className="cyber-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyber-red/10 border border-cyber-red/20 flex items-center justify-center shrink-0">
                  <i className="ri-shield-keyhole-line text-cyber-red text-lg" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-sm font-semibold text-white">{device.device}</h3>
                    <span className="px-2 py-0.5 rounded bg-cyber-red/10 text-cyber-red text-xs font-mono border border-cyber-red/20">
                      {device.layer}
                    </span>
                  </div>
                  <p className="text-xs text-cyber-text mb-2"><strong>Function:</strong> {device.function}</p>
                  <p className="text-xs text-cyber-cyan mb-3"><strong>Security Role:</strong> {device.securityRole}</p>
                  <div className="p-3 rounded-lg bg-cyber-red/5 border border-cyber-red/10">
                    <p className="text-xs text-cyber-red">
                      <strong>Example:</strong> {device.example}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Common Network Attacks Deep Dive */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Network Attack Vectors: Deep Dive</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Most cyber attacks begin with network reconnaissance followed by exploitation of network-based vulnerabilities. Understanding these attack methodologies is critical for defense.
        </p>

        <div className="mt-6 space-y-6">
          {networkingAttacks.map((attack, i) => (
            <div key={attack.attack} className="cyber-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyber-red/10 border-2 border-cyber-red flex items-center justify-center shrink-0">
                  <span className="text-cyber-red font-bold font-mono">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-cyber-red mb-2">{attack.attack}</h3>
                  <p className="text-xs text-cyber-text mb-3"><strong>Method:</strong> {attack.method}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h4 className="text-xs font-semibold text-white mb-2">Common Techniques:</h4>
                      <ul className="text-xs text-cyber-text space-y-1 list-disc list-inside">
                        {attack.techniques.map((tech) => (
                          <li key={tech}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-cyber-green mb-2">Defensive Measures:</h4>
                      <ul className="text-xs text-cyber-green space-y-1 list-disc list-inside">
                        {attack.defense.split(', ').map((def) => (
                          <li key={def}>{def}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Callout type="danger">
                    <strong>Real Incident:</strong> {attack.realIncident}
                  </Callout>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Network Security Best Practices */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Network Security Best Practices</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Implement these proven security controls across your network architecture to reduce attack surface and detect intrusions.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Network Segmentation',
              desc: 'Divide network into zones with firewalls between them. Critical systems get isolated segments. Compromise of one segment doesn\u2019t mean full network compromise.',
            },
            {
              title: 'Zero Trust Architecture',
              desc: 'Never trust, always verify. Authenticate and authorize every connection, user, and device—even inside the network. Microsegmentation enforces least-privilege east-west traffic.',
            },
            {
              title: 'Defense-in-Depth',
              desc: 'Multiple overlapping security layers: perimeter firewall + internal segmentation + endpoint protection + application controls. If one layer fails, others still protect.',
            },
            {
              title: 'Encrypted Communications',
              desc: 'Use TLS 1.3 everywhere. VPNs for remote access. SSH instead of Telnet. Disable legacy protocols (SSLv3, TLS 1.0/1.1). Perfect Forward Secrecy (PFS) key exchange.',
            },
            {
              title: 'Network Monitoring',
              desc: 'Deploy IDS/IPS throughout network. Enable NetFlow/sFlow collection. Centralized logging from all network devices. Regular packet capture analysis.',
            },
            {
              title: 'Secure Configuration',
              desc: 'Disable unused ports and services. Change default credentials. Apply security hardening guides (CIS Benchmarks). Regular vulnerability scanning.',
            },
          ].map((practice, i) => (
            <div key={practice.title} className="cyber-card p-4">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-cyber-green/10 border border-cyber-green/20 flex items-center justify-center text-cyber-green text-xs font-bold font-mono shrink-0">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{practice.title}</h3>
                  <p className="text-xs text-cyber-text leading-relaxed">{practice.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Key Takeaways */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Key Takeaways</DocHeading>
        <ul className="mt-4 space-y-2 text-cyber-text text-sm">
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>OSI Model (7 layers)</strong> is fundamental to understanding network security controls and attack surfaces.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Each OSI layer</strong> hosts distinct protocols, attacks, and security controls. Know what operates at each layer.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Subnetting and segmentation</strong> are primary defenses against lateral movement after breach.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Router (L3) vs Switch (L2)</strong> distinction: routers connect different networks, switches connect devices within same network.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Common attacks</strong> like MITM, DoS, ARP poisoning exploit protocol weaknesses—understanding protocols reveals vulnerabilities.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Defense-in-depth</strong> means overlapping controls at multiple layers—no single point of failure.</span>
          </li>
        </ul>
      </motion.section>

      {/* Further Reading */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Further Reading & Resources</DocHeading>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { title: 'Wireshark Labs', desc: 'Practice protocol analysis with free packet capture tool. Analyze real network traffic and understand protocol behavior.', link: 'https://www.wireshark.org/' },
            { title: 'TCP/IP Illustrated (Stevens)', desc: 'The definitive book on TCP/IP protocol internals. Volume 1 is essential reading for network engineers.', link: 'https://www.pearson.com/en-us/subject-catalog/p/tcp-ip-illustrated-volume-1-the-protocols/9780132126953' },
            { title: 'Cisco Networking Academy', desc: 'Free networking fundamentals course covering CCNA-level material with hands-on labs.', link: 'https://www.netacad.com/' },
            { title: 'MIT 6.829 (Computer Networks)', desc: 'MIT OpenCourseWare graduate-level networking course with lecture notes and assignments.', link: 'https://pdos.csail.mit.edu/6.829/' },
          ].map((res) => (
            <div key={res.title} className="cyber-card p-4">
              <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-cyber-cyan hover:text-cyber-amber transition-colors">
                {res.title}
              </a>
              <p className="text-xs text-cyber-text mt-1">{res.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Navigation */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3 justify-between items-center">
          <div className="text-sm text-cyber-text">
            <i className="ri-book-open-line" /> Module 2 of 20
          </div>
          <div className="flex gap-3">
            <a href="/cybersecurity/foundations-security-mindset" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Foundations
            </a>
            <a href="/cybersecurity/cryptography-basics" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Cryptography <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
