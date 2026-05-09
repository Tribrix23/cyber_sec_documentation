'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import ModuleQuiz from '@/components/base/ModuleQuiz';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const cybersecurityFoundationsQuizQuestions = [
  {
    id: 1,
    question: 'What is the primary goal of cybersecurity?',
    options: ['To make systems completely unhackable', 'To protect information and systems from unauthorized access, use, disclosure, disruption, modification, or destruction', 'To encrypt all data', 'To monitor network traffic'],
    correct: 1,
    explanation: 'The primary goal of cybersecurity is to protect information and systems from unauthorized access, use, disclosure, disruption, modification, or destruction, ensuring confidentiality, integrity, and availability.',
  },
  {
    id: 2,
    question: 'What does the CIA triad stand for in cybersecurity?',
    options: ['Confidentiality, Integrity, Availability', 'Confidentiality, Identification, Authentication', 'Central Intelligence Agency', 'Control, Isolate, Audit'],
    correct: 0,
    explanation: 'The CIA triad stands for Confidentiality, Integrity, and Availability, which are the three core principles of information security.',
  },
  {
    id: 3,
    question: 'What is defense in depth?',
    options: ['Using multiple layers of security controls', 'Encrypting data twice', 'Using only firewalls for protection', 'Having a single strong security measure'],
    correct: 0,
    explanation: 'Defense in depth is a security approach that uses multiple layers of security controls throughout an IT system to provide redundancy and protect against various attack vectors.',
  },
  {
    id: 4,
    question: 'What is a zero-day exploit?',
    options: ['An exploit that works for zero seconds', 'An exploit targeting a vulnerability unknown to the vendor', 'An exploit that requires no user interaction', 'An exploit that only works on old systems'],
    correct: 1,
    explanation: 'A zero-day exploit targets a software vulnerability that is unknown to the vendor or antivirus companies, leaving zero days for a patch to be developed.',
  },
  {
    id: 5,
    question: 'How many layers are in the OSI model?',
    options: ['5 layers', '6 layers', '7 layers', '8 layers'],
    correct: 2,
    explanation: 'The OSI (Open Systems Interconnection) model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application.',
  },
  {
    id: 6,
    question: 'Which layer of the OSI model is responsible for logical addressing and routing?',
    options: ['Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer'],
    correct: 2,
    explanation: 'The Network Layer (Layer 3) is responsible for logical addressing (IP addresses) and routing packets between different networks.',
  },
  {
    id: 7,
    question: 'What protocol operates at the transport layer to provide reliable, connection-oriented communication?',
    options: ['UDP', 'TCP', 'HTTP', 'FTP'],
    correct: 1,
    explanation: 'TCP (Transmission Control Protocol) operates at the transport layer and provides reliable, connection-oriented communication with error checking and flow control.',
  },
  {
    id: 8,
    question: 'What is the purpose of a MAC address?',
    options: ['To provide logical addressing for routing', 'To uniquely identify network interfaces at the data link layer', 'To encrypt network traffic', 'To establish secure connections'],
    correct: 1,
    explanation: 'A MAC (Media Access Control) address is a unique identifier assigned to network interfaces for communication at the data link layer of a network segment.',
  },
  {
    id: 9,
    question: 'What is the main difference between symmetric and asymmetric encryption?',
    options: ['Symmetric uses one key, asymmetric uses two keys', 'Symmetric is slower than asymmetric', 'Asymmetric is only used for hashing', 'There is no difference'],
    correct: 0,
    explanation: 'Symmetric encryption uses the same key for both encryption and decryption, while asymmetric encryption uses a pair of keys (public and private) where one encrypts and the other decrypts.',
  },
  {
    id: 10,
    question: 'What is a hash function primarily used for in cryptography?',
    options: ['To encrypt data for confidentiality', 'To create a fixed-size unique fingerprint of data', 'To establish secure key exchange', 'To decrypt encrypted messages'],
    correct: 1,
    explanation: 'A hash function takes input data and produces a fixed-size string of bytes (hash) that is unique to the input. It is used for data integrity verification, password storage, and digital signatures.',
  },
  {
    id: 11,
    question: 'What is the purpose of a digital signature?',
    options: ['To encrypt emails', 'To verify the authenticity and integrity of a message or document', 'To create a secure tunnel', 'To compress data'],
    correct: 1,
    explanation: 'A digital signature provides authenticity (verifies the sender) and integrity (ensures the content has not been altered) of a digital message or document.',
  },
  {
    id: 12,
    question: 'What is the difference between a block cipher and a stream cipher?',
    options: ['Block ciphers encrypt data in blocks, stream ciphers encrypt data bit by bit or byte by byte', 'Block ciphers are slower', 'Stream ciphers are more secure', 'There is no practical difference'],
    correct: 0,
    explanation: 'Block ciphers encrypt data in fixed-size blocks (e.g., 64 or 128 bits), while stream ciphers encrypt data continuously one bit or byte at a time.',
  },
  {
    id: 13,
    question: 'What is the difference between authentication and authorization?',
    options: ['Authentication is proving who you are, authorization is what you are allowed to do', 'Authentication is encryption, authorization is decryption', 'They are the same thing', 'Authentication is for networks, authorization is for applications'],
    correct: 0,
    explanation: 'Authentication verifies the identity of a user or system (who you are), while authorization determines what resources or actions that authenticated entity is permitted to access or perform.',
  },
  {
    id: 14,
    question: 'What is multi-factor authentication (MFA)?',
    options: ['Using multiple passwords', 'Using two or more verification methods from different categories', 'Using the same factor multiple times', 'Using only biometric factors'],
    correct: 1,
    explanation: 'Multi-factor authentication requires two or more verification methods from different categories: something you know (password), something you have (token), or something you are (biometric).',
  },
  {
    id: 15,
    question: 'What is the principle of least privilege?',
    options: ['Give users maximum access for convenience', 'Give users only the access they need to perform their job functions', 'Give all users administrator access', 'Remove all user privileges'],
    correct: 1,
    explanation: 'The principle of least privilege states that users and processes should only have the minimum levels of access (permissions) necessary to perform their required tasks.',
  },
  {
    id: 16,
    question: 'What is role-based access control (RBAC)?',
    options: ['Access control based on user location', 'Access control based on user roles within an organization', 'Access control based on time of day', 'Access control based on IP address'],
    correct: 1,
    explanation: 'Role-based access control (RBAC) restricts system access to authorized users based on their roles within an organization, where permissions are associated with roles and users are assigned to appropriate roles.',
  },
];

export default function CybersecurityFoundationsQuizPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-questionnaire-line" />
          Cybersecurity Foundations Section 1 of 4
        </div>
        <DocHeading level={1}>Cybersecurity Foundations Quiz</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Test your understanding of cybersecurity foundations with 16 multiple-choice questions covering core concepts, networking, cryptography, and access control. You need 80% to pass.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <ModuleQuiz title="Cybersecurity Foundations Knowledge Check" questions={cybersecurityFoundationsQuizQuestions} />
      </motion.section>

      <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/cybersecurity/authentication-authorization" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Authentication & Authorization
          </a>
          <a href="/cybersecurity/common-vulnerabilities-owasp" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Vulanerabilitites & OWASP <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  );
}