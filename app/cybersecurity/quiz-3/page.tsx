'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import ModuleQuiz from '@/components/base/ModuleQuiz';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const cybersecurityIntermediateQuizQuestions = [
  {
    id: 1,
    question: 'What is the primary goal of penetration testing?',
    options: ['To cause damage to systems', 'To identify vulnerabilities before attackers do', 'To test network speed', 'To install security patches'],
    correct: 1,
    explanation: 'The primary goal of penetration testing is to identify and exploit vulnerabilities in a controlled manner to improve security before malicious actors can exploit them.',
  },
  {
    id: 2,
    question: 'Which phase of penetration testing involves gathering information about the target?',
    options: ['Exploitation', 'Reconnaissance', 'Reporting', 'Cleanup'],
    correct: 1,
    explanation: 'Reconnaissance is the first phase of penetration testing where information about the target is gathered through passive and active techniques.',
  },
  {
    id: 3,
    question: 'What is the difference between white-box and black-box penetration testing?',
    options: ['White-box tests networks, black-box tests applications', 'White-box testers have internal knowledge, black-box testers have no prior knowledge', 'White-box is legal, black-box is illegal', 'There is no difference'],
    correct: 1,
    explanation: 'In white-box testing, the tester has full knowledge of the system internals, while in black-box testing, the tester has no prior knowledge and must discover everything from scratch.',
  },
  {
    id: 4,
    question: 'What does OWASP ZAP primarily help with in web application security?',
    options: ['Network packet analysis', 'Web application vulnerability scanning', 'Password cracking', 'Firewall configuration'],
    correct: 1,
    explanation: 'OWASP ZAP (Zed Attack Proxy) is an open-source web application security scanner that helps find vulnerabilities in web applications during development and testing.',
  },
  {
    id: 5,
    question: 'Which HTTP security header helps prevent clickjacking attacks?',
    options: ['X-Content-Type-Options', 'X-Frame-Options', 'X-XSS-Protection', 'Strict-Transport-Security'],
    correct: 1,
    explanation: 'The X-Frame-Options HTTP header helps prevent clickjacking attacks by controlling whether a browser should be allowed to render a page in a frame, iframe, embed, or object.',
  },
  {
    id: 6,
    question: 'What is the main security concern with WEP encryption in wireless networks?',
    options: ['It is too slow', 'It uses weak encryption that is easily cracked', 'It requires too much bandwidth', 'It is not compatible with modern devices'],
    correct: 1,
    explanation: 'WEP (Wired Equivalent Privacy) uses weak RC4 encryption with small initialization vectors that can be cracked in minutes using readily available tools.',
  },
  {
    id: 7,
    question: 'Which wireless security protocol is currently considered the most secure for Wi-Fi networks?',
    options: ['WEP', 'WPA', 'WPA2', 'WPA3'],
    correct: 3,
    explanation: 'WPA3 (Wi-Fi Protected Access 3) is the latest and most secure wireless security protocol, offering improved encryption and protection against brute-force attacks.',
  },
  {
    id: 8,
    question: 'What is the principle of least privilege in cloud security?',
    options: ['Give users maximum access for convenience', 'Give users only the access they need to perform their job functions', 'Remove all user privileges periodically', 'Grant privileges based on seniority'],
    correct: 1,
    explanation: 'The principle of least privilege states that users and processes should only have the minimum levels of access (or permissions) needed to perform their job functions.',
  },
  {
    id: 9,
    question: 'In DevSecOps, what does "shifting left" mean?',
    options: ['Moving security testing to the end of development', 'Integrating security early in the development lifecycle', 'Removing security from the development process', 'Outsourcing security to third parties'],
    correct: 1,
    explanation: 'Shifting left in DevSecOps means integrating security practices early in the software development lifecycle rather than treating it as an afterthought at the end.',
  },
  {
    id: 10,
    question: 'What is infrastructure as code (IaC) security primarily concerned with?',
    options: ['Encrypting infrastructure data', 'Ensuring infrastructure templates are free from security vulnerabilities', 'Increasing infrastructure speed', 'Reducing infrastructure costs'],
    correct: 1,
    explanation: 'IaC security focuses on ensuring that infrastructure-as-code templates (like Terraform or CloudFormation) are free from security vulnerabilities and misconfigurations before deployment.',
  },
  {
    id: 11,
    question: 'What is a man-in-the-middle (MitM) attack in wireless security?',
    options: ['An attack that floods a network with traffic', 'An attack where the attacker intercepts and potentially alters communication between two parties', 'An attack that physically damages wireless equipment', 'An attack that changes wireless frequencies'],
    correct: 1,
    explanation: 'A man-in-the-middle attack occurs when an attacker secretly intercepts and possibly alters the communication between two parties who believe they are directly communicating with each other.',
  },
  {
    id: 12,
    question: 'Which of the following is NOT a common web application security testing methodology?',
    options: ['Static Application Security Testing (SAST)', 'Dynamic Application Security Testing (DAST)', 'Manual Application Security Testing (MAST)', 'Interactive Application Security Testing (IAST)'],
    correct: 2,
    explanation: 'While SAST, DAST, and IAST are established methodologies, MAST is not a standard term. Manual testing is typically performed as part of other methodologies.',
  },
  {
    id: 13,
    question: 'What is the purpose of network segmentation in wireless security?',
    options: ['To increase wireless signal strength', 'To isolate sensitive systems from less secure areas of the network', 'To reduce wireless network costs', 'To make network troubleshooting easier'],
    correct: 1,
    explanation: 'Network segmentation divides a network into smaller parts to isolate sensitive systems, limit the spread of attacks, and improve security monitoring and performance.',
  },
  {
    id: 14,
    question: 'Which cloud service model places the most security responsibility on the customer?',
    options: ['Software as a Service (SaaS)', 'Platform as a Service (PaaS)', 'Infrastructure as a Service (IaaS)', 'Function as a Service (FaaS)'],
    correct: 2,
    explanation: 'In IaaS, the customer is responsible for securing the operating system, applications, and data, while the cloud provider secures only the underlying infrastructure.',
  },
  {
    id: 15,
    question: 'What is container security primarily focused on in DevSecOps?',
    options: ['Making containers run faster', 'Ensuring container images are free from vulnerabilities and properly configured', 'Increasing container storage capacity', 'Reducing container memory usage'],
    correct: 1,
    explanation: 'Container security focuses on scanning container images for vulnerabilities, ensuring proper configuration, and implementing runtime protection to prevent exploitation.',
  },
];

export default function CybersecurityIntermediateQuizPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-questionnaire-line" />
          Cybersecurity Intermediate Section 3 of 4
        </div>
        <DocHeading level={1}>Cybersecurity Intermediate Quiz</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Test your understanding of penetration testing, web app security, wireless/network security, and cloud/devops security with 15 multiple-choice questions. You need 80% to pass.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <ModuleQuiz title="Cybersecurity Intermediate Knowledge Check" questions={cybersecurityIntermediateQuizQuestions} />
      </motion.section>

      <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/cybersecurity/cloud-devops-security" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Cloud & DevOps
          </a>
          <a href="/cybersecurity/mobile-iot-security" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Mobile & IoT Security <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  );
}