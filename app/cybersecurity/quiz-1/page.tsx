'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import ModuleQuiz from '@/components/base/ModuleQuiz';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const cybersecurityQuiz1Questions = [
  {
    id: 1,
    question: 'What is the primary goal of cybersecurity?',
    options: ['To make systems completely unhackable', 'To protect information and systems from unauthorized access, use, disclosure, disruption, modification, or destruction', 'To prevent all cyber attacks', 'To eliminate the need for passwords'],
    correct: 1,
    explanation: 'Cybersecurity aims to protect information and systems from various threats, though it recognizes that perfect security is unattainable. It focuses on risk management and defense-in-depth strategies.',
  },
  {
    id: 2,
    question: 'Which of the following BEST describes the CIA triad in cybersecurity?',
    options: ['Confidentiality, Integrity, Availability', 'Central Intelligence Agency', 'Computer Intrusion Analysis', 'Certification, Identification, Authentication'],
    correct: 0,
    explanation: 'The CIA triad is a foundational model in cybersecurity representing Confidentiality (keeping data secret), Integrity (ensuring data is accurate and unaltered), and Availability (ensuring data is accessible when needed).',
  },
  {
    id: 3,
    question: 'In the OSI model, which layer is responsible for logical addressing and routing?',
    options: ['Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer'],
    correct: 2,
    explanation: 'The Network Layer (Layer 3) handles logical addressing (IP addresses) and determines the best path for routing packets between different networks.',
  },
  {
    id: 4,
    question: 'What is the main difference between symmetric and asymmetric encryption?',
    options: ['Symmetric uses one key, asymmetric uses two keys', 'Symmetric is faster but less secure', 'Asymmetric is only used for digital signatures', 'Symmetric is for data at rest, asymmetric for data in transit'],
    correct: 0,
    explanation: 'Symmetric encryption uses the same key for both encryption and decryption, while asymmetric encryption uses a pair of keys: a public key for encryption and a private key for decryption.',
  },
  {
    id: 5,
    question: 'Which authentication factor is something you HAVE?',
    options: ['Password', 'Fingerprint', 'Smart card', 'Voice pattern'],
    correct: 2,
    explanation: 'Authentication factors are categorized as: something you know (password), something you have (smart card, token), and something you are (biometrics like fingerprints or voice patterns).',
  },
  {
    id: 6,
    question: 'What does the principle of least privilege mean?',
    options: ['Users should have maximum access to perform their jobs', 'Users should have the minimum access necessary to perform their job functions', 'All users should have the same access level', 'Privileges should be granted based on seniority'],
    correct: 1,
    explanation: 'The principle of least privilege states that users and processes should operate with the minimum levels of access (or permissions) needed to perform their job functions, reducing the potential damage from accidents or misuse.',
  },
  {
    id: 7,
    question: 'Which of the following is an example of multi-factor authentication (MFA)?',
    options: ['Password and security question', 'Password and fingerprint scan', 'Two different passwords', 'Username and password'],
    correct: 1,
    explanation: 'Multi-factor authentication requires two or more different types of authentication factors. A password (something you know) and fingerprint scan (something you are) constitutes MFA.',
  },
  {
    id: 8,
    question: 'What is the main purpose of a firewall in network security?',
    options: ['To encrypt all network traffic', 'To monitor and control incoming and outgoing network traffic based on security rules', 'To detect viruses in email attachments', 'To provide wireless network access'],
    correct: 1,
    explanation: 'A firewall acts as a barrier between trusted and untrusted networks, monitoring and controlling network traffic based on predetermined security rules to prevent unauthorized access.',
  },
  {
    id: 9,
    question: 'Which cryptographic algorithm is commonly used for securing web traffic (HTTPS)?',
    options: ['RSA', 'AES', 'DES', 'MD5'],
    correct: 0,
    explanation: 'While AES is used for encrypting the actual data in HTTPS, RSA (or more commonly ECC - Elliptic Curve Cryptography) is used for the initial key exchange and authentication in the TLS handshake that establishes HTTPS connections.',
  },
  {
    id: 10,
    question: 'What is social engineering in the context of cybersecurity?',
    options: ['Engineering secure social media platforms', 'Using technical exploits to gain unauthorized access', 'Manipulating people into divulging confidential information or performing actions', 'Engineering social networks for better connectivity'],
    correct: 2,
    explanation: 'Social engineering involves manipulating individuals into performing actions or divulging confidential information, rather than using technical hacking techniques. It exploits human psychology rather than system vulnerabilities.',
  },
  {
    id: 11,
    question: 'Which of the following BEST describes defense in depth?',
    options: ['Using only the strongest security measure available', 'Having multiple layers of security controls throughout an IT system', 'Focusing security efforts only on the network perimeter', 'Using the same security solution everywhere'],
    correct: 1,
    explanation: 'Defense in depth is a security approach that uses multiple layers of defense throughout an IT system. If one layer fails, others still provide protection, much like the concentric walls of a medieval castle.',
  },
  {
    id: 12,
    question: 'What is the main difference between a virus and a worm?',
    options: ['Viruses are harmless, worms are dangerous', 'Viruses require human action to spread, worms can spread autonomously', 'Worms only infect Mac computers, viruses only infect PCs', 'There is no difference; the terms are interchangeable'],
    correct: 1,
    explanation: 'A virus requires human action (like opening an infected file) to spread and typically attaches itself to legitimate programs. A worm is standalone malware that can replicate and spread autonomously across networks without human intervention.',
  },
];

export default function CybersecurityQuiz1Page() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-questionnaire-line" />
            Cybersecurity Modules 1-4 Quiz
          </div>
          <DocHeading level={1}>Cybersecurity Fundamentals Quiz</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3 text-lg">
            Test your understanding of Modules 1-4 with 12 multiple-choice questions covering cybersecurity fundamentals, networking basics, cryptography, and access control. You need 80% to pass.
          </p>
        </motion.div>

        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <ModuleQuiz title="Cybersecurity Knowledge Check" questions={cybersecurityQuiz1Questions} />
        </motion.section>

        <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="flex gap-3">
            <a href="/cybersecurity/" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Security Operations <i className="ri-arrow-left-line ml-1" />
            </a>
            <a href="/cybersecurity/web-app-security" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
              <i className="ri-arrow-right-line mr-1" /> Previous Module
            </a>
          </div>
        </motion.section>
      </div>
  );
}