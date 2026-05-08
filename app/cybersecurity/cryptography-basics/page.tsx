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

const cryptoPrimitives = [
  {
    name: 'Symmetric Encryption',
    description: 'Same secret key encrypts and decrypts. Fast but key distribution challenge.',
    howWorks: 'Plaintext + Key + Algorithm = Ciphertext. Receiver uses same key to decrypt.',
    algorithms: ['AES (Advanced Encryption Standard, 128/192/256-bit)', 'DES (56-bit, broken)', '3DES (168-bit, deprecated)', 'Blowfish (64-bit, deprecated)', 'ChaCha20 (modern alternative)'],
    useCases: ['Encrypting files on disk', 'Database encryption at rest', 'VPN tunnels (IPsec)', 'Wi-Fi WPA2/WPA3'],
    realIncident: 'WannaCry ransomware (2017): Used RSA + AES asymmetric+symmetric combo. AES encrypted victim files, RSA sent encryption key to C2. No recovery without ransom payment or backup.',
    pros: 'Very fast, suitable for bulk data encryption, computationally efficient',
    cons: 'Key distribution problem—how do you securely share secret key with remote party?',
    icon: 'ri-scales-3-line',
  },
  {
    name: 'Asymmetric Encryption',
    description: 'Public key encrypts, private key decrypts. Solves key distribution but slower.',
    howWorks: 'Plaintext + Public Key = Ciphertext. Only holder of corresponding Private Key can decrypt.',
    algorithms: ['RSA (1024/2048/4096-bit, most common)', 'ECC (Elliptic Curve, 256-bit = RSA 3072)', 'DSA (Digital Signature Algorithm)', 'Diffie-Hellman (key agreement)'],
    useCases: ['Digital signatures', 'Key exchange (TLS handshake)', 'SSH authentication', 'PGP/GPG email encryption', 'SSL/TLS certificates'],
    realIncident: 'Heartbleed (2014): OpenSSL bug exposed private keys from memory. Attackers could impersonate any victim&apos;s server or decrypt past/future TLS sessions because private keys were compromised—asymmetric crypto broken by side-channel.',
    pros: 'No key distribution problem—publish public key freely. Enables digital signatures and certificates.',
    cons: 'Much slower (1000x), limited data size (can only encrypt small amounts, usually just symmetric key)',
    icon: 'ri-key-2-line',
  },
  {
    name: 'Cryptographic Hashing',
    description: 'One-way function: input → fixed-size hash. Cannot reverse to original input. Used for integrity verification.',
    properties: ['Deterministic (same input always gives same hash)', 'Avalanche effect (tiny input change → completely different hash)', 'Preimage resistant (cannot reverse)', 'Collision resistant (hard to find two inputs with same hash)'],
    algorithms: ['SHA-256 (bitcoin mining, TLS)', 'SHA-3 (Keccak, newer standard)', 'MD5 (broken, collisions easy)', 'SHA-1 (broken, deprecated)'],
    hashExamples: [
      { input: 'hello', sha256: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824' },
      { input: 'Hello', sha256: '185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969' },
    ],
    realIncident: 'Sony PS3 (2011): Used ECDSA with repeated random nonce k. Deterministic nonce allowed recovery of private signing key from single signature. Led to full compromise of PlayStation signing infrastructure and piracy.',
    pros: 'Fast, irreversible, excellent for passwords (with salt), file integrity, digital signatures',
    cons: 'Not encryption—cannot retrieve original data. Vulnerable to rainbow tables if unsalted.',
    icon: 'ri-fingerprint-line',
  },
  {
    name: 'Digital Signatures',
    description: 'Prove authenticity and integrity of message. Combines hashing + asymmetric encryption.',
    process: 'Signer: Hash(message) + Private Key = Signature. Verifier: Hash(message) + Signature + Public Key = Valid/Invalid',
    algorithms: ['RSA-PSS (Probabilistic Signature Scheme)', 'ECDSA (Elliptic Curve)', 'EdDSA (Ed25519, modern standard)'],
    realIncident: 'Stuxnet (2010): Used stolen digital certificates from Realtek and JMicron to sign malicious drivers, making them appear legitimate to Windows and bypassing driver signature enforcement.',
    pros: 'Non-repudiation (signer cannot deny), message integrity, authentication',
    cons: 'Private key security is critical—compromise = total compromise of signing identity',
    icon: 'ri-quill-pen-line',
  },
];

const encryptionScenarios = [
  {
    scenario: 'HTTPS Web Traffic',
    symmetric: 'AES-256-GCM for bulk data encryption after handshake',
    asymmetric: 'RSA/ECDHE for key exchange and certificate verification',
    hashing: 'SHA-256 for HMAC and certificate fingerprinting',
    outcome: 'Confidentiality + Integrity + Authentication achieved through hybrid approach.',
  },
  {
    scenario: 'SSH Login',
    symmetric: 'AES/ChaCha20 for session encryption after key exchange',
    asymmetric: 'RSA/Ed25519 host and user keys for server/client authentication',
    hashing: 'SHA-256 for challenge-response and key verification',
    outcome: 'Secure shell with encrypted tunnel and mutual authentication.',
  },
  {
    scenario: 'PGP Email',
    symmetric: 'AES for message body encryption with session key',
    asymmetric: 'RSA/ECC receiver&apos;s public key encrypts session key',
    hashing: 'SHA-256 for signature verification and key IDs',
    outcome: 'End-to-end encrypted email where only recipient can read contents.',
  },
  {
    scenario: 'Bitcoin Transactions',
    symmetric: 'Not directly used in transactions (blockchain is public)',
    asymmetric: 'ECDSA (secp256k1 curve) for transaction signing and ownership proof',
    hashing: 'SHA-256 + RIPEMD-160 double hashing for Bitcoin addresses (P2PKH)',
    outcome: 'Cryptographically secure proof of ownership without revealing private key.',
  },
];

const tlsDeepDive = [
  {
    phase: '1. Client Hello',
    description: 'Client sends supported TLS versions, cipher suites, and random nonce.',
    security: 'Allows server to select strongest mutually-supported cipher suite.',
  },
  {
    phase: '2. Server Hello + Certificate',
    description: 'Server responds with chosen cipher suite, its X.509 certificate (public key), and server random.',
    security: 'Certificate chain validated against trusted root CAs. Server proves identity.',
  },
  {
    phase: '3. Key Exchange',
    description: 'RSA: Client encrypts pre-master secret with server&apos;s public key. ECDHE: Both compute shared secret via elliptic curve math.',
    security: 'Eavesdroppers can\u2019t derive pre-master secret without private key (RSA) or solving elliptic curve discrete log (ECDHE).',
  },
  {
    phase: '4. Session Keys',
    description: 'Both sides derive symmetric keys from pre-master secret + both nonces using PRF.',
    security: 'Ephemeral keys ensure Perfect Forward Secrecy—compromise of long-term private key doesn\u2019t decrypt past sessions.',
  },
  {
    phase: '5. Encrypted Communication',
    description: 'All subsequent messages encrypted with symmetric keys (AES-GCM, ChaCha20-Poly1305).',
    security: 'Authenticated encryption prevents tampering. AEAD ciphers provide both confidentiality and integrity.',
  },
];

const pkiComponents = [
  {
    component: 'Certificate Authority (CA)',
    role: 'Trusted third party that digitally signs X.509 certificates after verifying applicant identity.',
    example: 'Let&apos;s Encrypt (free automated CA), DigiCert, GlobalSign, Entrust.',
    trust: 'Root CA certificate is pre-installed in browsers/OS trust stores. Chain of trust verification.',
  },
  {
    component: 'Registration Authority (RA)',
    role: 'Verifies certificate requests before CA signs. Acts as front-end for identity verification.',
    example: 'Corporate Microsoft AD CS Enterprise CA with RA web interface for employee certificate enrollment.',
  },
  {
    component: 'Certificate Repository',
    role: 'Stores issued certificates and CRLs (Certificate Revocation Lists).',
    example: 'LDAP directory, online database accessible via OCSP (Online Certificate Status Protocol).',
  },
  {
    component: 'End Entity',
    role: 'The actual certificate holder—webserver, user, code signing entity.',
    example: 'Amazon&apos;s SSL certificate for amazon.com presented during HTTPS handshake.',
  },
];

const cryptoAttacks = [
  {
    attack: 'Brute Force',
    method: 'Try every possible key until correct one found. With n-bit key, 2^n possibilities.',
    feasibility: 'AES-128: 2^128 ≈ 3.4×10^38 attempts. At 1 trillion attempts/sec, would take 10^18 years—longer than universe age. RSA-2048: 2^112 operations with GNFS (subexponential) but still infeasible with current tech.',
    defense: 'Use sufficiently long keys (AES-256 for long-term data, RSA-3072+ for signatures). Quantum computers threaten RSA/ECC.',
  },
  {
    attack: 'Birthday Attack',
    method: 'Find any two inputs that hash to same value (collision). Birthday paradox: need ~2^(n/2) attempts for n-bit hash.',
    feasibility: 'SHA-1 (160-bit): ≈2^80 attempts. In 2017, Google actually produced SHA-1 collision with 2^63.4 attacks. MD5 (128-bit): collisions trivial (~2^20 operations).',
    defense: 'Use SHA-256+ for new systems. Don\u2019t rely on MD5/SHA-1 for digital signatures, code signing, or certificates.',
  },
  {
    attack: 'Side-Channel Attacks',
    method: 'Extract keys from physical implementation, not algorithm math. Timing, power consumption, electromagnetic radiation, cache behavior.',
    examples: ['Timing attack on RSA: measure decryption time for different ciphertexts to deduce key', 'Power analysis: device power consumption correlates with key operations', 'Cache attack (Spectre/Meltdown): CPU cache timing reveals memory contents'],
    defense: 'Constant-time implementations, hardware security modules (HSMs), memory access randomization, CPU microcode patches.',
  },
  {
    attack: 'Man-in-the-Middle (MITM)',
    method: 'Intercept communication, decrypt, re-encrypt to both parties. Requires breaking encryption or impersonating one party.',
    feasibility: 'Without certificate compromise or malicious CA, TLS MITM is very hard. With compromised CA or user accepting invalid cert, trivial.',
    defense: 'Certificate pinning, strict certificate validation (not accepting self-signed), HSTS, DNSSEC.',
  },
  {
    attack: 'Weak RNG (Random Number Generator)',
    method: 'Predictable random numbers compromise keys. Cryptographic systems need true randomness.',
    realCase: 'Sony PS3 ECDSA nonce reuse (k reused) allowed private key recovery from single signature. Debian OpenSSL entropy bug (2006-2008) generated only 32,767 possible keys—factorable in hours.',
    defense: 'Use OS-provided CSPRNG (/dev/urandom, CryptGenRandom). Never implement crypto PRNG yourself.',
  },
];

export default function CryptographyBasicsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-book-open-line" />
          Module 3 of 20 — Core Infrastructure
        </div>
        <DocHeading level={1}>Cryptography Basics & Encryption Principles</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Cryptography is the mathematical foundation of cybersecurity. <strong className="text-cyber-cyan">Every secure connection, digital signature, password hash, and blockchain transaction</strong> depends on cryptographic primitives. This module covers the essential algorithms, how they work, when to use each, and how they\u2019ve been broken in real incidents.
        </p>
      </motion.div>

      {/* Cryptographic Primitives Overview */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>The Four Pillars of Cryptography</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Modern cryptography rests on four fundamental primitives. Each solves a specific security problem. Understanding when and why to use each is essential.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {cryptoPrimitives.map((primitive) => (
            <div key={primitive.name} className="cyber-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyber-purple/10 border border-cyber-purple/20 flex items-center justify-center shrink-0">
                  <i className={`${primitive.icon} text-cyber-purple text-xl`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-1">{primitive.name}</h3>
                  <p className="text-xs text-cyber-text mb-2">{primitive.description}</p>

                  {primitive.algorithms && (
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-cyber-cyan mb-1">Key Algorithms:</p>
                      <div className="flex flex-wrap gap-1">
                        {primitive.algorithms.map((alg) => (
                          <span key={alg} className="px-2 py-0.5 rounded bg-cyber-bg text-cyber-cyan text-xs font-mono border border-cyber-border">
                            {alg}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {primitive.properties && (
                    <div>
                      <p className="text-xs font-semibold text-cyber-amber mb-1">Core Properties:</p>
                      <ul className="text-xs text-cyber-text list-disc list-inside">
                        {primitive.properties.map((prop) => (
                          <li key={prop}>{prop}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Callout type="danger" className="mt-3">
                    <strong>Real Incident:</strong> {primitive.realIncident}
                  </Callout>
                </div>
              </div>

              {/* Pros and Cons Grid */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-2 rounded bg-cyber-green/5 border border-cyber-green/10">
                  <p className="text-xs font-semibold text-cyber-green mb-1">✓ Advantages</p>
                  <p className="text-xs text-cyber-text leading-relaxed">{primitive.pros}</p>
                </div>
                <div className="p-2 rounded bg-cyber-red/5 border border-cyber-red/10">
                  <p className="text-xs font-semibold text-cyber-red mb-1">✗ Disadvantages</p>
                  <p className="text-xs text-cyber-text leading-relaxed">{primitive.cons}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* How Hashing Works - Visual Example */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Cryptographic Hashing in Depth</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Hash functions map arbitrarily large data to a fixed-length fingerprint. A single character change produces completely different hash (avalanche effect).
        </p>

        <div className="mt-6 cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">SHA-256 Hash Examples: Demonstrating Avalanche Effect</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-cyber-cyan mb-2">Input: \"hello\"</p>
              <CodeBlock code="SHA-256:\n2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824" />
            </div>
            <div>
              <p className="text-xs text-cyber-cyan mb-2">Input: \"Hello\" (capital H)</p>
              <CodeBlock code="SHA-256:\n185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969" />
            </div>
          </div>
          <Callout type="info" className="mt-4">
            <strong>Avalanche Effect:</strong> Changing uppercase \u201cH\u201d to lowercase \u201ch\u201d flips approximately 50% of the 256 output bits. The hashes are completely unrelated. No pattern exists between similar inputs.
          </Callout>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Password Storage',
              desc: 'Never store plaintext passwords. Salt + hash with bcrypt/Argon2. Salt prevents rainbow table attacks. Slow hash thwarts brute force.',
            },
            {
              title: 'File Integrity',
              desc: 'Download files with provided SHA-256 checksum. Recompute hash and compare. Detects corruption, tampering, or man-in-the-middle attacks.',
            },
            {
              title: 'Digital Signatures',
              desc: 'Hash message, encrypt hash with private key. Verifier decrypts signature, hashes message, compares. Proves authenticity without revealing message.',
            },
          ].map((item, i) => (
            <div key={item.title} className="cyber-card p-4">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 flex items-center justify-center text-cyber-amber text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-cyber-text leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Hybrid Encryption (TLS/SSL) */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Hybrid Cryptography: TLS/SSL Deep Dive</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Real-world systems use <strong className="text-cyber-cyan">hybrid cryptography</strong>: asymmetric encryption to exchange symmetric key, then symmetric for bulk data. TLS (Transport Layer Security) is the most widespread implementation.
        </p>

        <div className="mt-6 cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">TLS 1.3 Handshake: Step-by-Step</h3>
          <div className="space-y-4">
            {tlsDeepDive.map((phase, i) => (
              <div key={phase.phase} className="flex gap-4">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center">
                    <span className="text-cyber-cyan text-xs font-bold font-mono">{i + 1}</span>
                  </div>
                  {i < tlsDeepDive.length - 1 && (
                    <div className="w-px flex-1 bg-cyber-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <h4 className="text-sm font-semibold text-white mb-1">{phase.phase}</h4>
                  <p className="text-xs text-cyber-text mb-2">{phase.description}</p>
                  <Callout type="success" className="mt-1">
                    <strong>Security:</strong> {phase.security}
                  </Callout>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-cyber-red mb-2">Why Both Symmetric & Asymmetric?</h3>
            <ul className="text-xs text-cyber-text space-y-2 list-disc list-inside">
              <li><strong>Asymmetric alone:</strong> 1000x slower, encrypting large files impractical</li>
              <li><strong>Symmetric alone:</strong> Key exchange problem\u2014how share secret key securely over internet?</li>
              <li><strong>Hybrid:</strong> Fast symmetric encryption + secure asymmetric key exchange = best of both</li>
              <li><strong>Perfect Forward Secrecy (PFS):</strong> Ephemeral Diffie-Hellman keys ensure past sessions stay secret even if server private key compromised</li>
            </ul>
          </div>
          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-cyber-green mb-2">TLS 1.3 vs 1.2 Improvements</h3>
            <ul className="text-xs text-cyber-text space-y-2 list-disc list-inside">
              <li>1-RTT handshake (faster connection setup)</li>
              <li>Removed weak ciphers (RC4, 3DES, MD5, SHA-1)</li>
              <li>Enforced Perfect Forward Secrecy (PFS)</li>
              <li>Encrypted Server Name Indication (ESNI) for SNI privacy</li>
              <li>Zero-RTT resumption for returning visitors</li>
              <li>Simplified protocol (fewer options, easier to audit)</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Public Key Infrastructure (PKI) */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Public Key Infrastructure (PKI): The Web&apos;s Trust Framework</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          PKI is the system that issues, manages, validates, and revokes digital certificates. HTTPS websites trust browsers because browsers trust Certificate Authorities (CAs) that have audited and signed the website&apos;s certificate.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Certificate Chain of Trust</h3>
            <div className="space-y-3">
              {[
                { name: 'Root CA', desc: 'Top of trust hierarchy. Self-signed. Pre-installed in OS/browser trust store. Offline for security.', color: 'cyber-red' },
                { name: 'Intermediate CA', desc: 'Issued by Root. Used to sign end-entity certificates. Multiple layers common. Revocable.', color: 'cyber-amber' },
                { name: 'End Entity Certificate', desc: 'Actual certificate for website (example.com). Signed by Intermediate. Contains public key, validity, SANs.', color: 'cyber-green' },
              ].map((level) => (
                <div key={level.name} className={`flex items-center gap-3 p-3 rounded-lg bg-${level.color}/5 border border-${level.color}/10`}>
                  <i className="ri-shield-keyhole-line text-${level.color}" />
                  <div>
                    <p className="text-xs font-semibold text-white">{level.name}</p>
                    <p className="text-xs text-cyber-text leading-relaxed">{level.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Callout type="warning" className="mt-4">
              <strong>Trust Anchor:</strong> Root CA certificates are the ultimate trust anchors. If a Root CA is compromised (DigiNotar 2011, Symantec 2017), every certificate it signed is suspect. Browsers remove compromised root CAs via updates.
            </Callout>
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">X.509 Certificate Contents</h3>
            <CodeBlock code={`Subject: CN=example.com, O=Company, C=US\nIssuer: CN=Let\'s Encrypt Authority X3, O=Let\'s Encrypt\nValidity: Jan 1 00:00:00 2024 - Mar 31 23:59:59 2024\nPublic Key Algorithm: RSA-2048\nSignature Algorithm: SHA256-RSA\nExtensions:
- Subject Alt Names: example.com, www.example.com
- Key Usage: Digital Signature, Key Encipherment
- Extended Key Usage: TLS Web Server Authentication`} />
            <Callout type="info" className="mt-4">
              <strong>Certificate Pinning:</strong> Mobile apps hardcode expected certificate/public key fingerprint. Prevents MITM even if CA is compromised or malicious certificate issued.
            </Callout>
          </div>
        </div>
      </motion.section>

      {/* Cryptography in Practice: Real-World Scenarios */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Cryptography in Practice: Real-World Scenarios</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          See how cryptographic primitives combine to secure everyday systems.
        </p>

        <div className="mt-6 space-y-4">
          {encryptionScenarios.map((scenario, i) => (
            <div key={scenario.scenario} className="cyber-card p-5 border-l-4 border-cyber-green">
              <h3 className="text-sm font-semibold text-white mb-2">{scenario.scenario}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-2 rounded bg-cyber-cyan/5">
                  <p className="text-xs font-semibold text-cyber-cyan">Symmetric</p>
                  <p className="text-xs text-cyber-text mt-1 font-mono">{scenario.symmetric}</p>
                </div>
                <div className="p-2 rounded bg-cyber-purple/5">
                  <p className="text-xs font-semibold text-cyber-purple">Asymmetric</p>
                  <p className="text-xs text-cyber-text mt-1 font-mono">{scenario.asymmetric}</p>
                </div>
                <div className="p-2 rounded bg-cyber-amber/5">
                  <p className="text-xs font-semibold text-cyber-amber">Hashing</p>
                  <p className="text-xs text-cyber-text mt-1 font-mono">{scenario.hashing}</p>
                </div>
                <div className="p-2 rounded bg-cyber-green/5">
                  <p className="text-xs font-semibold text-cyber-green">Result</p>
                  <p className="text-xs text-cyber-text mt-1">{scenario.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Cryptographic Attack Vectors */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Cryptographic Attack Vectors</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Cryptography is hard. Misuse or implementation flaws completely break security. These attacks target implementations, not the mathematical algorithms.
        </p>

        <div className="mt-6 space-y-5">
          {cryptoAttacks.map((attack, i) => (
            <div key={attack.attack} className="cyber-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyber-red/10 border-2 border-cyber-red flex items-center justify-center shrink-0">
                  <span className="text-cyber-red font-bold font-mono">#{i + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-cyber-red mb-2">{attack.attack}</h3>
                  <p className="text-xs text-cyber-text mb-3"><strong>Method:</strong> {attack.method}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-white mb-1">Feasibility / Real-World:</p>
                      <p className="text-xs text-cyber-text leading-relaxed">{attack.feasibility}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-cyber-green mb-1">Mitigation:</p>
                      <p className="text-xs text-cyber-text leading-relaxed">{attack.defense}</p>
                    </div>
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
            <span><strong>Symmetric encryption</strong> (AES) is fast for bulk data but needs secure key exchange.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Asymmetric encryption</strong> (RSA/ECC) solves key exchange but is slow; used for certificates and signatures.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Hashing</strong> (SHA-256) is one-way verification; never reverse. Use with salt for passwords.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Hybrid</strong> combines both: asymmetric exchanges symmetric session key, symmetric encrypts data.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>PKI</strong> (X.509 certificates, CAs) enables trust on the internet through chain of trust.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Implementation flaws</strong> (weak RNG, side-channels) break crypto more often than algorithm breaks.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>AES-256 and SHA-256</strong> are currently secure. MD5, SHA-1, DES, 3DES are deprecated.</span>
          </li>
        </ul>
      </motion.section>

      {/* Further Reading */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Further Reading & Resources</DocHeading>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { title: 'Cryptography Engineering (Ferguson)', desc: 'Practical guide to building real-world crypto systems by recognized experts. Essential reading.', link: '#' },
            { title: 'Applied Cryptography (Schneier)', desc: 'Comprehensive textbook covering algorithms, protocols, and real-world applications.', link: '#' },
            { title: 'NIST FIPS Publications', desc: 'Official standards for AES, SHA, RSA PKCS, and other cryptographic algorithms.', link: 'https://csrc.nist.gov/publications/fips' },
            { title: 'TLS 1.3 RFC 8446', desc: 'The official specification for Transport Layer Security version 1.3.', link: 'https://www.rfc-editor.org/rfc/rfc8446.txt' },
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
            <i className="ri-book-open-line" /> Module 3 of 20
          </div>
          <div className="flex gap-3">
            <a href="/cybersecurity/networking-osi-fundamentals" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Networking
            </a>
            <a href="/cybersecurity/authentication-authorization" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Auth & Access <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
