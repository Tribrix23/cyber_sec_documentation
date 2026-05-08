'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const androidSecurity = [
  {
    layer: 'Linux Kernel',
    concerns: 'SELinux policies, kernel exploits, rooting attacks.',
    protections: 'Verified Boot, dm-verity, kernel ASLR.',
  },
  {
    layer: 'Hardware Abstraction Layer (HAL)',
    concerns: 'Permission bypass, hardware interface exploits.',
    protections: 'Binder IPC restrictions, SELinux domains.',
  },
  {
    layer: 'Android Runtime',
    concerns: 'Sandbox escape, code injection via JNI.',
    protections: 'SELinux, seccomp-bpf, app sandbox.',
  },
  {
    layer: 'Java/Kotlin Framework',
    concerns: 'Insecure inter-app communication, exported components.',
    protections: 'Permission model, intent filters, protection levels.',
  },
  {
    layer: 'Apps',
    concerns: 'Malicious apps, data leakage, root detection bypass.',
    protections: 'Google Play Protect, SafetyNet, Play App Signing.',
  },
];

const mobileThreats = [
  {
    threat: 'Banking Trojans',
    example: 'EventBot, TeaBot - Overlay attacks to steal credentials.',
    vector: 'Third-party app stores, phishing downloads.',
  },
  {
    threat: 'Screen Overlay',
    example: 'Faketoken - Shows fake login screens over real apps.',
    vector: 'Accessibility permissions abuse.',
  },
  {
    threat: 'SMS Interception',
    example: 'Android/SpyNote - Intercept 2FA codes.',
    vector: 'SMS_READ permission, accessibility services.',
  },
  {
    threat: 'Mobile Ransomware',
    example: 'Android/Lockerpin - Lock devices until payment.',
    vector: 'Malicious apps, exploit kits.',
  },
];

const iosSecurity = [
  {
    feature: 'Secure Enclave',
    desc: 'Hardware-based key management for biometric data and encryption.',
    attack: 'Physical attacks require expensive equipment to extract keys.',
  },
  {
    feature: 'Code Signing',
    desc: 'All apps must be signed by Apple or enterprise certificate.',
    attack: 'Enterprise certs abused for distribution (Haima, PPD).',
  },
  {
    feature: 'Sandbox',
    desc: 'Each app runs in isolated container with restricted file access.',
    attack: 'Jailbreak bypasses sandbox entirely.',
  },
  {
    feature: 'ASLR & KASLR',
    desc: 'Randomized memory layout prevents predictable exploits.',
    attack: 'Info leaks can defeat ASLR.',
  },
];

const iotProtocols = [
  {
    protocol: 'MQTT',
    desc: 'Lightweight publish-subscribe messaging for sensors.',
    risks: 'No encryption by default, weak authentication.',
    secureUse: 'TLS + client certificates, broker ACLs.',
  },
  {
    protocol: 'CoAP',
    desc: 'UDP-based protocol for constrained devices.',
    risks: 'UDP amplification DDoS, DTLS misconfiguration.',
    secureUse: 'OSCORE for end-to-end security.',
  },
  {
    protocol: 'Zigbee',
    desc: 'Low-power mesh networking for home automation.',
    risks: 'Weak network keys, replay attacks.',
    secureUse: 'Install codes, network key rotation.',
  },
  {
    protocol: 'BLE',
    desc: 'Bluetooth Low Energy for proximity devices.',
    risks: 'Just Works pairing, passive eavesdropping.',
    secureUse: 'LE Secure Connections, application-layer encryption.',
  },
];

export default function MobileIoTSecurityPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-smartphone-line" />
          Module 13 of 20 — Advanced Domains
        </div>
        <DocHeading level={1}>Mobile & IoT Security</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Mobile devices and IoT present unique security challenges. iOS and Android have
          fundamentally different security models. IoT devices often lack basic security
          features while controlling physical systems. This module covers attack vectors
          and defensive strategies for both domains.
        </p>
      </motion.div>

      {/* Android Security Layers */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Android Security Architecture</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Android security is defense-in-depth from hardware to apps. Each layer provides
          isolation and protection against different attack vectors.
        </p>

        <div className="mt-6 space-y-4">
          {androidSecurity.map((layer) => (
            <div key={layer.layer} className="cyber-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center shrink-0">
                  <i className="ri-stack-line text-cyber-cyan" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-2">{layer.layer}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-2 rounded bg-cyber-red/5 border border-cyber-red/10">
                      <span className="font-semibold text-cyber-red">Concerns:</span>
                      <span className="text-cyber-text"> {layer.concerns}</span>
                    </div>
                    <div className="p-2 rounded bg-cyber-green/5 border border-cyber-green/10">
                      <span className="font-semibold text-cyber-green">Protections:</span>
                      <span className="text-cyber-text"> {layer.protections}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Mobile Threats */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Mobile Threat Landscape</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Mobile malware leverages platform features like accessibility services and
          app overlays to steal credentials and exfiltrate data.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {mobileThreats.map((threat) => (
            <div key={threat.threat} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-amber mb-2">{threat.threat}</h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-white">Example:</span>
                  <span className="text-cyber-text"> {threat.example}</span>
                </div>
                <div>
                  <span className="font-semibold text-cyber-red">Vector:</span>
                  <span className="text-cyber-text"> {threat.vector}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* iOS Security */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>iOS Security Features</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          iOS prioritizes security through hardware isolation, code signing, and strict
          sandboxing. Jailbreaking defeats most protections.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {iosSecurity.map((feature) => (
            <div key={feature.feature} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyan-400 mb-2">{feature.feature}</h3>
              <p className="text-xs text-cyber-text mb-2">{feature.desc}</p>
              <div className="p-2 rounded bg-cyber-red/5 border border-cyber-red/10">
                <span className="text-xs font-semibold text-cyber-red">Attack:</span>
                <span className="text-xs text-cyber-text"> {feature.attack}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* IoT Protocols */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>IoT Protocols & Security</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          IoT protocols are designed for low power and low bandwidth, often at the cost
          of security. Understanding protocol limitations guides defense strategies.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {iotProtocols.map((proto) => (
            <div key={proto.protocol} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-purple mb-2">{proto.protocol}</h3>
              <p className="text-xs text-cyber-text mb-2">{proto.desc}</p>
              <div className="text-xs space-y-1">
                <p><span className="font-semibold text-cyber-red">Risks:</span> {proto.risks}</p>
                <p><span className="font-semibold text-cyber-green">Secure Use:</span> {proto.secureUse}</p>
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
            <span><strong>Android security</strong> is layered from kernel to apps with SELinux and sandboxing.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>iOS relies on code signing and Secure Enclave</strong>—jailbreaking defeats protections.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>IoT protocols</strong> often lack encryption—security must be layered on top.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Reverse engineering</strong> helps understand app behavior—use tools like Frida, JADX, Hopper.</span>
          </li>
        </ul>
      </motion.section>

      {/* Navigation */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="flex gap-3 justify-between items-center">
                <div className="text-sm text-cyber-text">
                  <i className="ri-book-open-line" /> Module 13 of 20
                </div>
                <div className="flex gap-3">
                  <a href="/cybersecurity/quiz-3" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
                    <i className="ri-arrow-left-line mr-1" /> Quiz 3
                  </a>
                  <a href="/cybersecurity/social-engineering" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
                    Next: Social Engineering <i className="ri-arrow-right-line ml-1" />
                  </a>
                </div>
              </div>
            </motion.section>
    </div>
  );
}