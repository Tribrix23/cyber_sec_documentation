'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const wirelessProtocols = [
  {
    protocol: 'WEP (Wired Equivalent Privacy)',
    status: 'Broken',
    desc: 'Uses RC4 cipher with 40/104-bit keys. Vulnerable to IV collision attacks.',
    defense: 'Never use. Replace with WPA3 immediately.',
  },
  {
    protocol: 'WPA (WiFi Protected Access)',
    status: 'Deprecated',
    desc: 'Uses TKIP encryption. Vulnerable to MIC attacks, packet forgery.',
    defense: 'Upgrade to WPA2/WPA3. Disable TKIP support.',
  },
  {
    protocol: 'WAP2 (WiFi Protected Access II)',
    status: 'Secure with Config',
    desc: 'Uses AES-CCMP encryption with 128-bit key. Requires strong passphrase.',
    defense: 'Use strong (>20 chars) random passphrases. Disable WPS. Enable PMF.',
  },
  {
    protocol: 'WPA3 (WiFi Protected Access III)',
    status: 'Recommended',
    desc: 'Uses SAE (Simultaneous Authentication of Equals) for dragonfly key exchange.',
    defense: 'Enable on all new deployments. Use transition mode for legacy devices.',
  },
];

const wirelessAttacks = [
  {
    attack: 'Evil Twin',
    desc: 'Attacker sets up AP with same SSID as legitimate network to intercept traffic.',
    tools: 'Kali Linux, hostapd, dnsmasq',
    defense: 'Verify network certificates. Use 802.1X/EAP-TLS authentication.',
  },
  {
    attack: 'KRACK (Key Reinstallation Attack)',
    desc: 'Forces reuse of encryption keys by manipulating handshake messages.',
    tools: 'kali tools, custom scripts',
    defense: 'Apply vendor patches. Use VPN for sensitive traffic.',
  },
  {
    attack: 'Deauthentication Attack',
    desc: 'Floods target with deauth frames to disconnect from network.',
    tools: 'aireplay-ng, mdk3, mdk4',
    defense: 'Monitor for unusual deauth frames. Use 802.11w protected management frames.',
  },
  {
    attack: 'PMKID Attack',
    desc: 'Captures PMKID from AP to crack WPA2-PSK without handshake.',
    tools: 'hashcat, hcxdumptool',
    defense: 'Use strong passphrases (>20 chars). Consider WPA3 or 802.1X.',
  },
];

const bluetoothSecurity = [
  {
    profile: 'Bluetooth Classic',
    risk: 'High - Legacy pairing vulnerable to Just Works attacks.',
    mitre: 'T1557.3 - Adversary-in-the-Middle',
  },
  {
    profile: 'Bluetooth Low Energy (BLE)',
    risk: 'Medium - Limited range but lacks encryption in many implementations.',
    mitre: 'T1040 - Network Sniffing',
  },
  {
    profile: 'Bluetooth Mesh',
    risk: 'Medium - Network key compromise affects entire mesh network.',
    mitre: 'T1557.2 - ARP Cache Poisoning',
  },
];

const iotSecurity = [
  {
    concern: 'Default Credentials',
    desc: 'Manufacturers ship devices with hardcoded usernames/passwords.',
    example: 'Mirai botnet (2016) scanned for default IoT device credentials.',
    mitigation: 'Change defaults immediately. Implement credential rotation policies.',
  },
  {
    concern: 'Unencrypted Communications',
    desc: 'Traffic between device and cloud unencrypted or weakly encrypted.',
    example: 'Ring doorbells sending video unencrypted internally.',
    mitigation: 'Use TLS 1.3. Encrypt data at rest. Segment IoT networks.',
  },
  {
    concern: 'Firmware Updates',
    desc: 'No secure update mechanism or infrequent security patches.',
    example: 'VPNFilter infected 500K+ routers worldwide.',
    mitigation: 'Verify firmware signatures. Subscribe to vendor advisories.',
  },
  {
    concern: 'Physical Access',
    desc: 'Tampering with device hardware exposes secrets, modifies behavior.',
    example: 'St Jude pacemakers vulnerability allowed battery drain via radio.',
    mitigation: 'Tamper-evident seals. Secure boot with hardware root of trust.',
  },
];

export default function WirelessNetworkSecurityPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-wifi-line" />
          Module 11 of 20 — Offensive Security
        </div>
        <DocHeading level={1}>Wireless & Network Security</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Wireless networks extend your attack surface beyond physical boundaries. From WPA2 vulnerabilities
          to Bluetooth eavesdropping and IoT device exploitation, wireless security requires specialized knowledge
          and defensive strategies. This module covers enterprise and consumer wireless security.
        </p>
      </motion.div>

      {/* WiFi Protocols */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>WiFi Security Protocols</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          WiFi security has evolved through several generations. Understanding protocol weaknesses and
          strengths is essential for securing wireless infrastructure.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {wirelessProtocols.map((proto) => (
            <div key={proto.protocol} className="cyber-card p-5">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg bg-cyber-amber/10 border border-cyber-amber/20 flex items-center justify-center shrink-0`}>
                  <i className="ri-wifi-line text-cyber-amber" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white">{proto.protocol}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded bg-cyber-red/10 text-cyber-red mt-1 inline-block`}>{proto.status}</span>
                  <p className="text-xs text-cyber-text mt-2">{proto.desc}</p>
                  <div className="mt-2 p-2 rounded bg-cyber-green/5 border border-cyber-green/10">
                    <span className="text-xs font-semibold text-cyber-green">Defense:</span>
                    <span className="text-xs text-cyber-text"> {proto.defense}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Wireless Attacks */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Common Wireless Attacks</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Wireless attacks exploit protocol weaknesses, misconfigurations, and human factors.
          Each attack requires specific tools and techniques.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {wirelessAttacks.map((attack) => (
            <div key={attack.attack} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-red mb-2">{attack.attack}</h3>
              <p className="text-xs text-cyber-text mb-2">{attack.desc}</p>
              <div className="text-xs space-y-1">
                <p><span className="font-semibold text-white">Tools:</span> <span className="text-cyber-cyan font-mono">{attack.tools}</span></p>
                <p><span className="font-semibold text-cyber-green">Defense:</span> <span className="text-cyber-text">{attack.defense}</span></p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Bluetooth Security */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Bluetooth Security</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Bluetooth connects devices over short ranges but introduces security risks through
          pairing mechanisms and protocol implementations.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          {bluetoothSecurity.map((bt) => (
            <div key={bt.profile} className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-1">{bt.profile}</h3>
              <p className="text-xs text-cyber-red mb-2">{bt.risk}</p>
              <p className="text-xs text-cyber-text">{bt.mitre}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* IoT Security */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>IoT Device Security</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Internet of Things devices multiply entry points into networks. Their constrained
          resources and diverse hardware make them challenging to secure.
        </p>

        <div className="mt-6 space-y-4">
          {iotSecurity.map((iot) => (
            <div key={iot.concern} className="cyber-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyber-purple/10 border border-cyber-purple/20 flex items-center justify-center shrink-0">
                  <i className="ri-device-line text-cyber-purple" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-1">{iot.concern}</h3>
                  <p className="text-xs text-cyber-text mb-2">{iot.desc}</p>
                  <div className="p-2 rounded bg-cyber-red/5 border border-cyber-red/10 mb-2">
                    <span className="text-xs font-semibold text-cyber-red">Example:</span>
                    <span className="text-xs text-cyber-text"> {iot.example}</span>
                  </div>
                  <div className="p-2 rounded bg-cyber-green/5 border border-cyber-green/10">
                    <span className="text-xs font-semibold text-cyber-green">Mitigation:</span>
                    <span className="text-xs text-cyber-text"> {iot.mitigation}</span>
                  </div>
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
            <span><strong>WPA3</strong> is the current standard—WEP, WPA, TKIP are all broken or deprecated.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Evil twin attacks</strong> require user verification—certificate pinning or 802.1X.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>IoT devices</strong> need network segmentation—separate VLAN with restricted access.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Bluetooth</strong> data should be encrypted at application layer—protocol alone insufficient.</span>
          </li>
        </ul>
      </motion.section>

      {/* Navigation */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="flex gap-3 justify-between items-center">
                <div className="text-sm text-cyber-text">
                  <i className="ri-book-open-line" /> Module 11 of 20
                </div>
                <div className="flex gap-3">
                  <a href="/cybersecurity/web-app-security" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
                    <i className="ri-arrow-left-line mr-1" /> Web App Security
                  </a>
                  <a href="/cybersecurity/cloud-devops-security" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
                    Next: Cloud & DevOps <i className="ri-arrow-right-line ml-1" />
                  </a>
                </div>
              </div>
            </motion.section>
    </div>
  );
}