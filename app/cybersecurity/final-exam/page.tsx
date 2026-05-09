'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import ModuleQuiz from '@/components/base/ModuleQuiz';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const finalExamQuestions = [
  // Multiple Choice Questions
  {
    id: 1,
    question: 'What is the primary goal of defense in depth in cybersecurity?',
    options: [
      'To rely on a single strong security measure',
      'To implement multiple layers of security controls',
      'To focus only on network security',
      'To eliminate the need for user training'
    ],
    correct: 1,
    explanation: 'Defense in depth is a security strategy that uses multiple layers of defense throughout an information system. These layers can include technical, procedural, and physical controls, ensuring that if one layer fails, others still provide protection.',
    type: 'multiple-choice'
  },
  {
    id: 2,
    question: 'Which of the following best describes the principle of least privilege?',
    options: [
      'Give users maximum access for convenience',
      'Give users only the access they need to perform their job functions',
      'Remove all user privileges periodically',
      'Grant privileges based on seniority level'
    ],
    correct: 1,
    explanation: 'The principle of least privilege states that users and processes should only have the minimum levels of access (or permissions) needed to perform their job functions. This reduces the attack surface and limits potential damage from security breaches.',
    type: 'multiple-choice'
  },
  {
    id: 3,
    question: 'What does the acronym "CIA" stand for in cybersecurity?',
    options: [
      'Central Intelligence Agency',
      'Confidentiality, Integrity, Availability',
      'Cyber Incident Analysis',
      'Computer Information Architecture'
    ],
    correct: 1,
    explanation: 'In cybersecurity, CIA stands for Confidentiality, Integrity, and Availability - the three fundamental principles of information security. Confidentiality ensures data is accessible only to authorized users, Integrity ensures data is accurate and complete, and Availability ensures data is accessible when needed.',
    type: 'multiple-choice'
  },
  {
    id: 4,
    question: 'Which wireless security protocol is currently considered the most secure for Wi-Fi networks?',
    options: ['WEP', 'WPA', 'WPA2', 'WPA3'],
    correct: 3,
    explanation: 'WPA3 (Wi-Fi Protected Access 3) is the latest and most secure wireless security protocol, offering improved encryption and protection against brute-force attacks through Simultaneous Authentication of Equals (SAE) and stronger cryptographic algorithms.',
    type: 'multiple-choice'
  },
  {
    id: 5,
    question: 'What is the main difference between a virus and a worm?',
    options: [
      'Viruses require human action to spread, worms do not',
      'Worms require human action to spread, viruses do not',
      'There is no difference',
      'Worms only infect Mac systems'
    ],
    correct: 1,
    explanation: 'Unlike viruses, worms are standalone malware that replicate themselves to spread to other computers without requiring human action or attaching to a software program. Viruses need to attach themselves to legitimate programs and require some form of human action to spread.',
    type: 'multiple-choice'
  },
  
  // True/False Questions (adapted to multiple choice format)
  {
    id: 6,
    question: 'Encryption ensures data confidentiality by converting plaintext into ciphertext that can only be read with the correct key.',
    options: ['True', 'False'],
    correct: 0,
    explanation: 'Encryption is the process of converting plaintext into ciphertext using an algorithm and a key. Only those with the correct decryption key can convert the ciphertext back to readable plaintext, ensuring data confidentiality.',
    type: 'true-false'
  },
  {
    id: 7,
    question: 'A firewall can protect against all types of cyber attacks including social engineering and zero-day exploits.',
    options: ['True', 'False'],
    correct: 1,
    explanation: 'While firewalls are essential network security devices that monitor and control incoming and outgoing network traffic, they cannot protect against all types of attacks. Firewalls are ineffective against social engineering attacks (which target humans) and may not catch zero-day exploits (which exploit previously unknown vulnerabilities).',
    type: 'true-false'
  },
  {
    id: 8,
    question: 'Phishing attacks typically involve sending fraudulent emails that appear to come from legitimate sources to trick recipients into revealing sensitive information.',
    options: ['True', 'False'],
    correct: 0,
    explanation: 'This statement is true. Phishing is a social engineering technique where attackers send fraudulent communications, often emails, that appear to come from reputable sources to trick people into revealing sensitive information like passwords, credit card numbers, or installing malware.',
    type: 'true-false'
  },
  
  // Identification/Fill-in-the-blank style questions (adapted to multiple choice)
  {
    id: 9,
    question: 'What is the term for a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules?',
    options: [
      'Intrusion Detection System (IDS)',
      'Firewall',
      'Virtual Private Network (VPN)',
      'Antivirus Software'
    ],
    correct: 1,
    explanation: 'A firewall is a network security device that monitors and filters incoming and outgoing network traffic based on an organization\'s previously established security policies. It establishes a barrier between a trusted internal network and untrusted external networks, such as the internet.',
    type: 'identification'
  },
  {
    id: 10,
    question: 'What is the term for the practice of distributing computing resources across multiple locations to reduce latency and improve performance, while also introducing security considerations?',
    options: [
      'Virtualization',
      'Cloud Computing',
      'Load Balancing',
      'Edge Computing'
    ],
    correct: 1,
    explanation: 'Cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the Internet to offer faster innovation, flexible resources, and economies of scale. It introduces unique security challenges related to data privacy, compliance, and shared responsibility models.',
    type: 'identification'
  },
  {
    id: 11,
    question: 'What is the term for a security assessment where ethical hackers simulate real-world attacks to identify vulnerabilities in systems and networks?',
    options: [
      'Vulnerability Assessment',
      'Security Audit',
      'Penetration Testing',
      'Risk Assessment'
    ],
    correct: 2,
    explanation: 'Penetration testing, or pen testing, is a simulated cyber attack against a computer system to check for exploitable vulnerabilities. Ethical hackers use the same tools and techniques as malicious actors but with permission to identify weaknesses before criminals can exploit them.',
    type: 'identification'
  },
  
  // Scenario-based questions
  {
    id: 12,
    question: 'An employee receives an urgent email from what appears to be the company\'s IT department asking for their login credentials to "fix a security issue." What type of attack is this most likely to be?',
    options: [
      'Malware infection',
      'Denial of Service attack',
      'Phishing attack',
      'Man-in-the-middle attack'
    ],
    correct: 2,
    explanation: 'This is a classic phishing attack where the attacker impersonates a trusted entity (IT department) to trick the employee into revealing sensitive information (login credentials). The urgency and fear tactics are common in social engineering attacks.',
    type: 'scenario'
  },
  {
    id: 13,
    question: 'A company wants to ensure that only authorized devices can connect to their wireless network. Which security measure would be most effective?',
    options: [
      'Disabling SSID broadcast',
      'Using WEP encryption',
      'Implementing MAC address filtering',
      'Reducing wireless transmission power'
    ],
    correct: 2,
    explanation: 'MAC address filtering allows network administrators to create a whitelist of approved device MAC addresses that are permitted to connect to the wireless network. While not foolproof (as MAC addresses can be spoofed), it provides an additional layer of access control beyond just encryption.',
    type: 'scenario'
  },
  {
    id: 14,
    question: 'After a security breach, an organization wants to improve their ability to detect and respond to future incidents. Which combination of measures would be most effective?',
    options: [
      'Installing antivirus software and updating passwords',
      'Implementing a SIEM solution and establishing an incident response plan',
      'Increasing firewall rules and disabling USB ports',
      'Conducting phishing simulations and updating the company logo'
    ],
    correct: 1,
    explanation: 'A SIEM (Security Information and Event Management) system provides real-time analysis of security alerts generated by applications and network hardware. Combined with a well-defined incident response plan, this significantly improves an organization\'s ability to detect, investigate, and respond to security incidents effectively.',
    type: 'scenario'
  },
  
    // Additional multiple choice to round out the exam
    {
      id: 15,
      question: 'What is the primary purpose of a digital signature in cryptography?',
      options: [
        'To encrypt documents for confidentiality',
        'To verify the authenticity and integrity of digital documents',
        'To compress files for storage efficiency',
        'To convert documents to PDF format'
      ],
      correct: 1,
      explanation: 'A digital signature is a mathematical scheme for verifying the authenticity of digital messages or documents. It provides proof that the message was created by a known sender (authenticity) and was not altered in transit (integrity). Digital signatures use asymmetric cryptography where the sender signs with their private key and receivers verify with the sender\'s public key.',
      type: 'multiple-choice'
    },
    {
      id: 16,
      question: 'In the OSI model, which layer is responsible for logical addressing and routing?',
      options: [
        'Physical Layer',
        'Data Link Layer',
        'Network Layer',
        'Transport Layer'
      ],
      correct: 2,
      explanation: 'The Network Layer (Layer 3) of the OSI model is responsible for logical addressing (IP addresses), routing, and determining the best path for data to travel from source to destination across multiple networks. Routers operate at this layer.',
      type: 'multiple-choice'
    },
    {
      id: 17,
      question: 'Which of the following is NOT one of the OWASP Top 10 web application security risks?',
      options: [
        'Broken Access Control',
        'Cryptographic Failures',
        'Denial of Service',
        'Injection'
      ],
      correct: 2,
      explanation: 'While Denial of Service (DoS) attacks are serious security threats, they are not part of the OWASP Top 10, which focuses specifically on web application security risks. The current OWASP Top 10 includes Broken Access Control, Cryptographic Failures, Injection, Insecure Design, Security Misconfiguration, Vulnerable and Outdated Components, Identification and Authentication Failures, Software and Data Integrity Failures, Security Logging and Monitoring Failures, and Server-Side Request Forgery.',
      type: 'multiple-choice'
    },
    {
      id: 18,
      question: 'What is the main security concern with using default credentials on network devices?',
      options: [
        'They are too difficult to remember',
        'They are widely known and easily exploitable by attackers',
        'They cause network performance issues',
        'They are incompatible with modern security protocols'
      ],
      correct: 1,
      explanation: 'Default credentials (like admin/admin or root/password) are publicly documented and widely known. Attackers routinely scan for devices using default credentials as they provide an easy entry point into systems. Changing default credentials is one of the most basic and important security practices.',
      type: 'multiple-choice'
    },
    {
      id: 19,
      question: 'What does the term "air gap" mean in cybersecurity?',
      options: [
        'A wireless network with no password',
        'Physically isolating a computer or network from untrusted networks',
        'A gap in firewall rules',
        'The space between network cables'
      ],
      correct: 1,
      explanation: 'An air gap is a security measure where a computer or network is physically isolated from untrusted networks, such as the internet or an unsecured local area network. This prevents remote attacks since there is no network connection to exploit. Data transfer typically requires physical media like USB drives.',
      type: 'multiple-choice'
    },
    {
      id: 20,
      question: 'Which of the following best describes ransomware?',
      options: [
        'Software that encrypts files and demands payment for decryption',
        'Software that steals passwords from web browsers',
        'Software that displays unwanted advertisements',
        'Software that monitors network traffic for performance analysis'
      ],
      correct: 0,
      explanation: 'Ransomware is a type of malware that encrypts a victim\'s files and demands a ransom payment in exchange for the decryption key. Some variants also threaten to publish the victim\'s data if the ransom is not paid. It is one of the most prevalent and damaging types of cyber attacks today.',
      type: 'multiple-choice'
    },
    {
      id: 21,
      question: 'What is the main difference between symmetric and asymmetric encryption?',
      options: [
        'Symmetric is faster, asymmetric is slower',
        'Symmetric uses one key, asymmetric uses a key pair',
        'Symmetric is for files, asymmetric is for networks',
        'There is no difference'
      ],
      correct: 1,
      explanation: 'Symmetric encryption uses the same key for both encryption and decryption, while asymmetric encryption uses a public key for encryption and a private key for decryption.',
      type: 'multiple-choice'
    },
    {
      id: 22,
      question: 'What is multi-factor authentication (MFA) and why is it important?',
      options: [
        'Using multiple passwords for the same account',
        'Requiring two or more verification methods to gain access',
        'Changing passwords frequently',
        'Using antivirus and firewall together'
      ],
      correct: 1,
      explanation: 'Multi-factor authentication (MFA) requires users to provide two or more verification factors to gain access to a resource, such as a password plus a fingerprint or security token. This significantly increases security by making it harder for attackers to gain access even if they obtain one factor.',
      type: 'multiple-choice'
    },
    {
      id: 23,
      question: 'In the context of OWASP, what is "broken access control"?',
      options: [
        'When users cannot access the system at all',
        'When restrictions on what authenticated users are allowed to do are not properly enforced',
        'When access control systems are physically broken',
        'When users have too much access to the system'
      ],
      correct: 1,
      explanation: 'Broken Access Control occurs when restrictions on what authenticated users are allowed to do are not properly enforced. This can allow attackers to access unauthorized functionality or data, such as accessing other users\' accounts, viewing sensitive files, or modifying data.',
      type: 'multiple-choice'
    },
    {
      id: 24,
      question: 'What is a Trojan horse in malware terminology?',
      options: [
        'Malware that replicates itself rapidly',
        'Malware that disguises itself as legitimate software',
        'Malware that only infects USB drives',
        'Malware that creates denial of service attacks'
      ],
      correct: 1,
      explanation: 'A Trojan horse is a type of malware that disguises itself as legitimate software to trick users into installing it. Unlike viruses and worms, Trojans do not replicate themselves but instead create a backdoor for attackers to access the infected system.',
      type: 'multiple-choice'
    },
    {
      id: 25,
      question: 'What is the primary goal of digital forensics in incident response?',
      options: [
        'To prevent future attacks',
        'To collect, preserve, and analyze digital evidence',
        'To recover encrypted files',
        'To track down attackers in real-time'
      ],
      correct: 1,
      explanation: 'The primary goal of digital forensics is to collect, preserve, analyze, and present digital evidence in a manner that is legally admissible. This helps organizations understand what happened during an incident, who was responsible, and how to prevent similar incidents in the future.',
      type: 'multiple-choice'
    },
    {
      id: 26,
      question: 'What is the main function of a Security Operations Center (SOC)?',
      options: [
        'To develop security software',
        'To continuously monitor and improve an organization\'s security posture',
        'To manufacture network hardware',
        'To provide internet connectivity'
      ],
      correct: 1,
      explanation: 'A Security Operations Center (SOC) is a centralized function within an organization employing people, processes, and technology to continuously monitor and improve an organization\'s security posture while preventing, detecting, analyzing, and responding to cybersecurity incidents.',
      type: 'multiple-choice'
    },
    {
      id: 27,
      question: 'What is the primary security risk associated with outdated IoT device firmware?',
      options: [
        'Increased power consumption',
        'Known vulnerabilities that can be exploited by attackers',
        'Reduced device functionality',
        'Incompatibility with mobile apps'
      ],
      correct: 1,
      explanation: 'Outdated IoT device firmware often contains known vulnerabilities that attackers can exploit. Manufacturers regularly release firmware updates to patch security holes, and failing to update leaves devices exposed to attacks that could compromise the device or use it as a pivot point to attack other systems on the network.',
      type: 'multiple-choice'
    },
    {
      id: 28,
      question: 'What is tailgating in the context of social engineering and physical security?',
      options: [
        'Following someone too closely while driving',
        'An unauthorized person following an authorized person into a restricted area',
        'A type of network attack',
        'A malware distribution method'
      ],
      correct: 1,
      explanation: 'Tailgating is a physical social engineering attack where an unauthorized person follows an authorized person into a restricted area without proper authentication. This exploits the human tendency to hold doors open for others or avoid confrontation.',
      type: 'multiple-choice'
    },
    {
      id: 29,
      question: 'What is the difference between encryption and hashing in cryptography?',
      options: [
        'Encryption is reversible, hashing is not',
        'Hashing is reversible, encryption is not',
        'Both are reversible',
        'Both are irreversible'
      ],
      correct: 0,
      explanation: 'Encryption is a two-way function: data can be encrypted with a key and later decrypted with the correct key. Hashing is a one-way function: data is converted to a fixed-length hash value that cannot be reversed to obtain the original data. Hashing is used for verifying data integrity, while encryption is used for confidentiality.',
      type: 'multiple-choice'
    },
    {
      id: 30,
      question: 'In DevSecOps, what does "shift left" mean in terms of security testing?',
      options: [
        'Moving security testing to the end of development',
        'Performing security testing less frequently',
        'Integrating security testing early in the development lifecycle',
        'Outsourcing all security testing to third parties'
      ],
      correct: 2,
      explanation: '"Shift left" in DevSecOps means integrating security practices early in the software development lifecycle rather than treating it as an afterthought at the end. This includes activities like threat modeling, code reviews, and automated security testing during development rather than after deployment.',
      type: 'multiple-choice'
    }
];

export default function FinalExamPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-questionnaire-line" />
          Final Exam - All Modules
        </div>
        <DocHeading level={1}>Cybersecurity Final Exam</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Comprehensive final exam covering all cybersecurity modules. This exam includes multiple choice, true/false, identification, and scenario-based questions. You need 80% to pass and earn your certification.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <ModuleQuiz title="Cybersecurity Final Examination" questions={finalExamQuestions} />
      </motion.section>

      <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/cybersecurity/career-paths-future" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Cybersecurity Careers
          </a>
          <a href="/wireshark" className="px-5 py-2.5 border border-cyber-amber text-cyber-amber font-semibold rounded-lg hover:bg-cyber-amber/10 transition-all whitespace-nowrap">
                <i className="ri-radar-line mr-2" />
                Begin with Wireshark
          </a>
        </div>
      </motion.section>
    </div>
  );
}