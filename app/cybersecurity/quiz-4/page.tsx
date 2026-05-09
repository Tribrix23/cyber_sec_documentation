'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import ModuleQuiz from '@/components/base/ModuleQuiz';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const cybersecurityExpertQuizQuestions = [
  {
    id: 1,
    question: 'What does IoT stand for?',
    options: ['Internet of Things', 'Intranet of Technology', 'International Organization for Telecommunications', 'Integrated Operational Technology'],
    correct: 0,
    explanation: 'IoT stands for Internet of Things, which refers to the network of physical objects embedded with sensors, software, and other technologies to connect and exchange data with other devices and systems over the internet.',
  },
  {
    id: 2,
    question: 'What is a common security issue with IoT devices?',
    options: ['Too much processing power', 'Default passwords that are never changed', 'Excessive battery life', 'Too many security updates'],
    correct: 1,
    explanation: 'Many IoT devices ship with default passwords that users never change, making them easy targets for attackers who can find these defaults online.',
  },
  {
    id: 3,
    question: 'What is mobile device management (MDM)?',
    options: ['A type of mobile malware', 'Software that helps administrators secure and manage mobile devices', 'A mobile gaming platform', 'A cellular network protocol'],
    correct: 1,
    explanation: 'Mobile device management (MDM) is software that allows IT administrators to control, secure, and enforce policies on smartphones, tablets, and other endpoints.',
  },
  {
    id: 4,
    question: 'What is the primary risk of jailbreaking or rooting a mobile device?',
    options: ['It improves battery life', 'It voids the warranty and removes security protections', 'It makes the device faster', 'It increases storage capacity'],
    correct: 1,
    explanation: 'Jailbreaking (iOS) or rooting (Android) removes manufacturer-imposed restrictions but also eliminates many built-in security protections, making the device more vulnerable to malware and attacks.',
  },
  {
    id: 5,
    question: 'What is phishing?',
    options: ['A type of fishing sport', 'A social engineering attack that uses fraudulent communications to steal sensitive data', 'A network protocol', 'A type of encryption'],
    correct: 1,
    explanation: 'Phishing is a social engineering technique where attackers send fraudulent messages designed to trick people into revealing sensitive information or installing malware.',
  },
  {
    id: 6,
    question: 'What is spear phishing?',
    options: ['Fishing with a spear', 'A highly targeted phishing attack aimed at specific individuals or organizations', 'A type of network scanning', 'A wireless security protocol'],
    correct: 1,
    explanation: 'Spear phishing is a more sophisticated form of phishing where attackers customize their messages for specific targets, often using personal information to increase credibility.',
  },
  {
    id: 7,
    question: 'What is pretexting in social engineering?',
    options: ['A type of firewall', 'Creating a fabricated scenario to obtain information', 'A network encryption method', 'A type of virus'],
    correct: 1,
    explanation: 'Pretexting is a social engineering technique where an attacker creates a false scenario or pretext to persuade a victim to release information or perform an action they would not normally do.',
  },
  {
    id: 8,
    question: 'What is baiting in social engineering?',
    options: ['Using lures like free downloads to trick users into installing malware', 'A type of network attack', 'A database query technique', 'A wireless frequency'],
    correct: 0,
    explanation: 'Baiting is a social engineering attack that promises something enticing to the victim, such as free music or movie downloads, to lure them into a trap that steals their information or infects their system.',
  },
  {
    id: 9,
    question: 'What is the main difference between symmetric and asymmetric encryption?',
    options: ['Symmetric is faster, asymmetric is slower', 'Symmetric uses one key, asymmetric uses a key pair', 'Symmetric is for files, asymmetric is for networks', 'There is no difference'],
    correct: 1,
    explanation: 'Symmetric encryption uses the same key for both encryption and decryption, while asymmetric encryption uses a public key for encryption and a private key for decryption.',
  },
  {
    id: 10,
    question: 'What is AES and what is it used for?',
    options: ['Advanced Encryption Standard - a symmetric encryption algorithm', 'Automated Email System - for sending emails', 'Application Error System - for debugging', 'Audio Enhancement System - for sound quality'],
    correct: 0,
    explanation: 'AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used to secure sensitive data. It is considered highly secure and efficient.',
  },
  {
    id: 11,
    question: 'What is a hash function in cryptography?',
    options: ['A function that encrypts data with a key', 'A function that converts data of any size to a fixed-size output', 'A function that decrypts passwords', 'A function that increases data size'],
    correct: 1,
    explanation: 'A hash function takes input data of any size and produces a fixed-size string of bytes. It is deterministic, meaning the same input always produces the same output, and it is designed to be a one-way function.',
  },
  {
    id: 12,
    question: 'What is a digital signature?',
    options: ['A scanned image of a handwritten signature', 'A cryptographic technique that verifies the authenticity and integrity of digital documents', 'A type of email signature', 'A username and password combination'],
    correct: 1,
    explanation: 'A digital signature is a mathematical scheme for verifying the authenticity of digital messages or documents. It provides proof that the message was created by a known sender and was not altered in transit.',
  },
  {
    id: 13,
    question: 'What is defense in depth in security architecture?',
    options: ['Building very deep fortifications', 'Using multiple layers of security controls throughout an IT system', 'Increasing the depth of network packets', 'Creating deep backups'],
    correct: 1,
    explanation: 'Defense in depth is a security approach that uses multiple layers of defense throughout an information system. These layers can include technical, procedural, and physical controls.',
  },
  {
    id: 14,
    question: 'What is zero trust architecture?',
    options: ['Trusting no one at all', 'A security model that requires verification for everyone trying to access resources', 'A network with zero traffic', 'An architecture with no firewalls'],
    correct: 1,
    explanation: 'Zero trust is a security model based on the principle of maintaining strict access controls and not trusting anyone by default, even those already inside the network perimeter.',
  },
  {
    id: 15,
    question: 'What is a DMZ in network security?',
    options: ['A demilitarized zone between networks', 'A type of malware', 'A data management zone', 'A direct memory zone'],
    correct: 0,
    explanation: 'A DMZ (demilitarized zone) is a physical or logical subnetwork that contains and exposes an organization\'s external-facing services to an untrusted network, usually the internet.',
  },
];

export default function CybersecurityExpertQuizPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-questionnaire-line" />
          Cybersecurity Expert Section 4 of 4
        </div>
        <DocHeading level={1}>Cybersecurity Expert Quiz</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Test your understanding of mobile & IoT security, social engineering, encryption & cryptanalysis, and security architecture with 15 multiple-choice questions. You need 80% to pass.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <ModuleQuiz title="Cybersecurity Expert Knowledge Check" questions={cybersecurityExpertQuizQuestions} />
      </motion.section>

      <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/cybersecurity/security-architecture" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Security Architecture
          </a>
          <a href="/cybersecurity/compliance-legal-ethics" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Ethics <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  );
}