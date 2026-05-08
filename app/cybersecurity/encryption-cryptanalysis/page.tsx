'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const encryptionAlgorithms = [
  {
    category: 'Symmetric',
    algorithms: [
      { name: 'AES', bits: '128/192/256', status: 'Secure', desc: 'Advanced Encryption Standard, NIST selection.' },
      { name: 'ChaCha20', bits: '256', status: 'Secure', desc: 'Stream cipher, mobile-friendly alternative to AES.' },
      { name: '3DES', bits: '112', status: 'Deprecated', desc: 'Triple DES, vulnerable to Sweet32 attacks.' },
    ],
  },
  {
    category: 'Asymmetric',
    algorithms: [
      { name: 'RSA', bits: '2048/3072/4096', status: 'Secure', desc: 'Rivest-Shamir-Adleman, widely used for key exchange.' },
      { name: 'ECC', bits: '256', status: 'Secure', desc: 'Elliptic Curve Cryptography, smaller keys same security.' },
      { name: 'DSA', bits: '2048/3072', status: 'Legacy', desc: 'Digital Signature Algorithm, less common now.' },
    ],
  },
  {
    category: 'Hash',
    algorithms: [
      { name: 'SHA-2', bits: '256/512', status: 'Secure', desc: 'SHA-256/SHA-512, widely trusted.' },
      { name: 'SHA-3', bits: '256/512', status: 'Secure', desc: 'Latest SHA standard, different construction than SHA-2.' },
      { name: 'MD5', bits: '128', status: 'Broken', desc: 'Collisions trivial, never use for security.' },
    ],
  },
];

const cryptanalysisTechniques = [
  {
    technique: 'Brute Force',
    desc: 'Try all possible keys until plaintext is found.',
    complexity: 'O(2^n) where n is key length.',
    prevention: 'Use 256-bit keys (exhaustive search infeasible with current physics).',
  },
  {
    technique: 'Rainbow Tables',
    desc: 'Precomputed hash chains for rapid password cracking.',
    complexity: 'Reduced to O(1) lookup time after precomputation.',
    prevention: 'Salting defeats rainbow tables. PBKDF2, bcrypt, scrypt use salt.',
  },
  {
    technique: 'Side-Channel',
    desc: 'Extract information from power consumption, timing, EM emissions.',
    complexity: 'Varies by implementation weakness.',
    prevention: 'Constant-time implementations, hardware shielding, masking.',
  },
  {
    technique: 'Differential Cryptanalysis',
    desc: 'Analyze differences in input/output pairs to find key bits.',
    complexity: 'Depends on cipher structure, requires many chosen plaintexts.',
    prevention: 'Modern ciphers designed with resistance to this attack.',
  },
  {
    technique: 'Quantum Shor\'s Algorithm',
    desc: 'Polynomial-time factoring on quantum computers breaks RSA/ECC.',
    complexity: 'O((log N)^3) for factoring N.',
    prevention: 'Post-quantum cryptography (lattice, hash-based signatures).',
  },
];

const quantumThreats = [
  {
    algorithm: 'RSA-2048',
    qubits: '~20 million',
    timeline: '20+ years (optimistic)',
  },
  {
    algorithm: 'ECC-256',
    qubits: '~10 million',
    timeline: '20+ years (optimistic)',
  },
  {
    algorithm: 'AES-128',
    qubits: '~2^64',
    timeline: 'Grover\'s algorithm requires 2^64 qubits impossible',
  },
];

const pqcStandards = [
  {
    standard: 'CRYSTALS-Kyber',
    type: 'Key Encapsulation',
    status: 'NIST PQC finalist, selected for standardization.',
  },
  {
    standard: 'CRYSTALS-Dilithium',
    type: 'Digital Signature',
    status: 'NIST PQC selected for standardization.',
  },
  {
    standard: 'SPHINCS+',
    type: 'Stateless Hash-Based Signature',
    status: 'NIST PQC alternate selection.',
  },
];

export default function EncryptionCryptanalysisPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-code-s-slash-line" />
          Module 15 of 20 — Advanced Domains
        </div>
        <DocHeading level={1}>Encryption & Cryptanalysis</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Cryptography protects data confidentiality, integrity, and authenticity.
          Cryptographic algorithms age—from quantum threats to implementation flaws.
          Understanding encryption fundamentals and cryptanalysis prepares you for
          emerging challenges in secure system design.
        </p>
      </motion.div>

      {/* Encryption Algorithms */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Encryption Algorithms & Status</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Different cryptographic primitives serve different purposes. Key length and
          algorithm choice determine security margins.
        </p>

        <div className="mt-6 space-y-6">
          {encryptionAlgorithms.map((category) => (
            <div key={category.category}>
              <h3 className="text-sm font-semibold text-cyber-amber mb-3">{category.category} Algorithms</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {category.algorithms.map((algo) => (
                  <div key={algo.name} className="cyber-card p-4">
                    <h4 className="text-sm font-semibold text-white">{algo.name} ({algo.bits})</h4>
                    <span className={`text-xs px-2 py-0.5 rounded bg-cyber-${algo.status === 'Secure' ? 'green' : algo.status === 'Deprecated' ? 'red' : 'amber'}/10 text-cyber-${algo.status === 'Secure' ? 'green' : algo.status === 'Deprecated' ? 'red' : 'amber'} mt-1 inline-block`}>
                      {algo.status}
                    </span>
                    <p className="text-xs text-cyber-text mt-2">{algo.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Cryptanalysis Techniques */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Cryptanalysis Techniques</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Cryptanalysis studies algorithms to find weaknesses. Defenses must address
          both mathematical and implementation-level attacks.
        </p>

        <div className="mt-6 space-y-4">
          {cryptanalysisTechniques.map((tech) => (
            <div key={tech.technique} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-red mb-2">{tech.technique}</h3>
              <p className="text-xs text-cyber-text mb-2">{tech.desc}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-cyber-bg border border-cyber-border">
                  <span className="font-semibold text-white">Complexity:</span> {tech.complexity}
                </div>
                <div className="p-2 rounded bg-cyber-green/5 border border-cyber-green/10">
                  <span className="font-semibold text-cyber-green">Prevention:</span> {tech.prevention}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Quantum Threats */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Quantum Computing Threats</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Quantum computers threaten public-key cryptography. Symmetric encryption
          is weakened but recoverable with larger keys.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border border-cyber-border rounded-lg overflow-hidden">
            <thead className="bg-cyber-bg-card">
              <tr>
                <th className="text-left px-4 py-3 text-cyber-text font-semibold">Algorithm</th>
                <th className="text-left px-4 py-3 text-cyber-text font-semibold">Qubits Needed</th>
                <th className="text-left px-4 py-3 text-cyber-text font-semibold">Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border">
              {quantumThreats.map((qt) => (
                <tr key={qt.algorithm} className="hover:bg-cyber-bg-card/50 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-cyan-400">{qt.algorithm}</td>
                  <td className="px-4 py-2.5 text-cyber-text">{qt.qubits}</td>
                  <td className="px-4 py-2.5 text-cyber-text">{qt.timeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Post-Quantum Cryptography */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Post-Quantum Cryptography (PQC)</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          NIST is standardizing quantum-resistant algorithms. Prepare for migration
          by understanding the new primitives.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          {pqcStandards.map((pqc) => (
            <div key={pqc.standard} className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-purple mb-1">{pqc.standard}</h3>
              <p className="text-xs text-cyber-text mb-1">{pqc.type}</p>
              <p className="text-xs text-cyber-green">{pqc.status}</p>
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
            <span><strong>AES-256 and SHA-256 remain secure</strong> against classical attacks.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Quantum computers threaten RSA/ECC</strong> but require millions of qubits.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Side-channel attacks target implementations</strong>, not algorithms directly.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Post-quantum migration</strong> will be required in the next decade.</span>
          </li>
        </ul>
      </motion.section>

      {/* Navigation */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="flex gap-3 justify-between items-center">
                <div className="text-sm text-cyber-text">
                  <i className="ri-book-open-line" /> Module 15 of 20
                </div>
                <div className="flex gap-3">
                  <a href="/cybersecurity/social-engineering" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
                    <i className="ri-arrow-left-line mr-1" /> Social Engineering
                  </a>
                  <a href="/cybersecurity/security-architecture" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
                    Next: Security Architecture <i className="ri-arrow-right-line ml-1" />
                  </a>
                </div>
              </div>
            </motion.section>
    </div>
  );
}