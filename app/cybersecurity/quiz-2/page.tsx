'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import ModuleQuiz from '@/components/base/ModuleQuiz';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const cybersecurityAdvancedQuizQuestions = [
  {
    id: 1,
    question: 'What does OWASP stand for?',
    options: ['Open Web Application Security Project', 'Open Wireless Application Security Protocol', 'Office of Web Application Safety Procedures', 'Online Web Access Security Protection'],
    correct: 0,
    explanation: 'OWASP stands for Open Web Application Security Project, a nonprofit foundation that works to improve the security of software.',
  },
  {
    id: 2,
    question: 'What is the #1 vulnerability in the OWASP Top 10 (2021)?',
    options: ['Broken Access Control', 'Cryptographic Failures', 'Injection', 'Insecure Design'],
    correct: 0,
    explanation: 'Broken Access Control moved up from #5 in 2017 to #1 in the 2021 OWASP Top 10, occurring when restrictions on what authenticated users are allowed to do are not properly enforced.',
  },
  {
    id: 3,
    question: 'What is SQL injection?',
    options: ['A database optimization technique', 'An attack that inserts malicious SQL code into input fields', 'A method to secure database connections', 'A type of encryption'],
    correct: 1,
    explanation: 'SQL injection is a code injection technique that exploits vulnerabilities in input validation to insert malicious SQL statements into entry fields for execution.',
  },
  {
    id: 4,
    question: 'What is Cross-Site Scripting (XSS)?',
    options: ['A server-side attack', 'A client-side attack that injects malicious scripts into web pages', 'A network scanning technique', 'A type of firewall'],
    correct: 1,
    explanation: 'Cross-Site Scripting (XSS) is a client-side vulnerability where attackers inject malicious scripts into web pages viewed by other users.',
  },
  {
    id: 5,
    question: 'What is the primary characteristic of a virus?',
    options: ['It replicates by attaching itself to legitimate programs', 'It spreads without user interaction', 'It only infects mobile devices', 'It is always visible to the user'],
    correct: 0,
    explanation: 'A computer virus is a type of malicious software that, when executed, replicates by inserting copies of itself into other computer programs, data files, or the boot sector of the hard drive.',
  },
  {
    id: 6,
    question: 'What is the difference between a worm and a virus?',
    options: ['Worms require human action to spread, viruses do not', 'Viruses require human action to spread, worms do not', 'There is no difference', 'Worms only infect Mac systems'],
    correct: 1,
    explanation: 'Unlike viruses, worms are standalone malware that replicate themselves to spread to other computers without requiring human action or attaching to a software program.',
  },
  {
    id: 7,
    question: 'What is ransomware?',
    options: ['Software that encrypts files and demands payment for decryption', 'Software that steals passwords', 'Software that displays unwanted advertisements', 'Software that monitors network traffic'],
    correct: 0,
    explanation: 'Ransomware is a type of malware that encrypts a victim\'s files and demands a ransom payment in exchange for the decryption key.',
  },
  {
    id: 8,
    question: 'What is the first step in the incident response lifecycle?',
    options: ['Containment', 'Eradication', 'Preparation', 'Recovery'],
    correct: 2,
    explanation: 'The incident response lifecycle begins with Preparation, which involves establishing policies, procedures, and capabilities to respond effectively to incidents.',
  },
  {
    id: 9,
    question: 'What does the acronym "ER" stand for in incident response?',
    options: ['Event Recognition', 'Eradication and Recovery', 'Evidence Retrieval', 'Escalation and Reporting'],
    correct: 1,
    explanation: 'In incident response, ER stands for Eradication and Recovery, which involves removing the threat and restoring normal operations.',
  },
  {
    id: 10,
    question: 'What is the primary purpose of digital forensics?',
    options: ['To prevent cyber attacks', 'To collect, preserve, and analyze digital evidence', 'To encrypt sensitive data', 'To monitor network traffic in real-time'],
    correct: 1,
    explanation: 'Digital forensics is the process of collecting, preserving, analyzing, and presenting digital evidence in a manner that is legally admissible.',
  },
  {
    id: 11,
    question: 'What is the "order of volatility" in digital forensics?',
    options: ['The sequence in which evidence should be collected based on how quickly it changes', 'The importance ranking of different types of evidence', 'The chronological order of events in an attack', 'The priority of interviewing witnesses'],
    correct: 0,
    explanation: 'The order of volatility refers to collecting evidence in sequence from most volatile (changes fastest) to least volatile, such as memory, network connections, and then disk storage.',
  },
  {
    id: 12,
    question: 'What is a SOC (Security Operations Center)?',
    options: ['A type of firewall', 'A centralized unit that deals with security issues on an organizational and technical level', 'A password management system', 'A network monitoring tool'],
    correct: 1,
    explanation: 'A Security Operations Center (SOC) is a centralized function within an organization employing people, processes, and technology to continuously monitor and improve an organization\'s security posture.',
  },
  {
    id: 13,
    question: 'What is SIEM and what does it do?',
    options: ['Security Information and Event Management - collects and analyzes security-related data', 'System Intrusion Elimination Mechanism - blocks all incoming traffic', 'Secure Internet Encryption Module - encrypts web traffic', 'System Infrastructure Enhancement Manager - optimizes network performance'],
    correct: 0,
    explanation: 'SIEM (Security Information and Event Management) is a technology that provides real-time analysis of security alerts generated by applications and network hardware.',
  },
  {
    id: 14,
    question: 'What is threat hunting in a SOC context?',
    options: ['Waiting for alerts to occur', 'Proactively searching for threats that may have evaded existing security controls', 'Blocking all incoming traffic', 'Updating antivirus signatures'],
    correct: 1,
    explanation: 'Threat hunting is a proactive search through networks, endpoints, and datasets to hunt for malicious, suspicious, or risky activities that have evaded detection by existing security controls.',
  },
  {
    id: 15,
    question: 'What is the difference between a vulnerability and an exploit?',
    options: ['A vulnerability is a weakness, an exploit is the method used to take advantage of that weakness', 'They are the same thing', 'A vulnerability is malware, an exploit is a firewall', 'A vulnerability is intentional, an exploit is accidental'],
    correct: 0,
    explanation: 'A vulnerability is a weakness in a system that can be exploited, while an exploit is a piece of code or technique that takes advantage of a vulnerability to cause unintended behavior.',
  },
];

export default function CybersecurityAdvancedQuizPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-questionnaire-line" />
          Cybersecurity Advanced Section 2 of 4
        </div>
        <DocHeading level={1}>Cybersecurity Advanced Quiz</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Test your understanding of advanced cybersecurity topics with 15 multiple-choice questions covering vulnerabilities, malware, incident response, and security operations. You need 80% to pass.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <ModuleQuiz title="Cybersecurity Advanced Knowledge Check" questions={cybersecurityAdvancedQuizQuestions} />
      </motion.section>

      <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/cybersecurity/security-operations-soc" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Security Operations
          </a>
          <a href="/cybersecurity/pentesting-methodologies" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Penetration Testing <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  );
}