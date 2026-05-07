'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import ModuleQuiz from '@/components/base/ModuleQuiz';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const burpQuizQuestions = [
  {
    id: 1,
    question: 'What is Burp Suite primarily used for?',
    options: ['Network scanning', 'Web application security testing', 'Password cracking', 'Source code analysis'],
    correct: 1,
    explanation: 'Burp Suite is a web application security testing platform used to intercept, modify, and analyze HTTP/HTTPS traffic.',
  },
  {
    id: 2,
    question: 'Which Burp component sits between your browser and the target, intercepting all traffic?',
    options: ['Repeater', 'Intruder', 'Proxy', 'Scanner'],
    correct: 2,
    explanation: 'The Proxy tool is the intercepting component. All HTTP/S traffic flows through it by default on 127.0.0.1:8080.',
  },
  {
    id: 3,
    question: 'What does the "Intercept is on" button do?',
    options: ['Blocks all traffic', 'Pauses each request for manual review/editing', 'Enables SSL decryption', 'Starts automated scan'],
    correct: 1,
    explanation: 'When Intercept is ON, each request pauses before leaving Burp, allowing you to inspect, edit, forward, or drop it.',
  },
  {
    id: 4,
    question: 'How do you send a request from Proxy to Repeater?',
    options: ['Drag and drop', 'Right-click → Send to Repeater', 'Ctrl+V', 'Action → Forward'],
    correct: 1,
    explanation: 'Right-click any request in Proxy history → "Send to Repeater" (shortcut: Ctrl+R).',
  },
  {
    id: 5,
    question: 'Which Intruder attack type tries all combinations of multiple payload sets?',
    options: ['Sniper', 'Battering Ram', 'Pitchfork', 'Cluster Bomb'],
    correct: 3,
    explanation: 'Cluster bomb tests every combination across multiple payload sets. If set1 has 10 items and set2 has 100, total combos = 1,000 requests.',
  },
  {
    id: 6,
    question: 'What is the purpose of the Grep — Match feature in Intruder?',
    options: ['Search within responses', 'Flag responses matching a pattern', 'Count requests', 'Filter by MIME type'],
    correct: 1,
    explanation: 'Grep — Match flags responses containing specific strings or regex patterns (e.g., "SQL error") — useful for finding injection success.',
  },
  {
    id: 7,
    question: 'Which Burp tab shows all traffic even when intercept is off?',
    options: ['Intercept', 'HTTP history', 'Logger', 'Dashboard'],
    correct: 1,
    explanation: 'HTTP history logs all requests whether intercepted or not. Intercept tab only shows paused requests.',
  },
  {
    id: 8,
    question: 'Where do you install Burp extensions?',
    options: ['Settings → Extensions', 'Extender tab → BApp Store', 'Scanner → Options', 'Proxy → Intercept'],
    correct: 1,
    explanation: 'Go to Extender tab → BApp Store to browse and install official Burp Suite extensions.',
  },
  {
    id: 9,
    question: 'Which extension provides high-speed fuzzing (byasses Community throttling)?',
    options: ['Logger++', 'Turbo Intruder', 'Autorize', 'JWT Editor'],
    correct: 1,
    explanation: 'Turbo Intruder extension sends thousands of requests/sec, bypassing Community edition\'s 1 req/sec limit.',
  },
  {
    id: 10,
    question: 'What does the Decoder tool do?',
    options: ['Encrypts data', 'Encodes/decodes data in various formats', 'Captures packets', 'Scans for vulnerabilities'],
    correct: 1,
    explanation: 'Decoder handles URL, Base64, HTML, Hex, Octal, Binary encoding/decoding. Can chain operations to peel obfuscation layers.',
  },
  {
    id: 11,
    question: 'How do you compare two responses side-by-side to spot differences?',
    options: ['Use Scanner', 'Use Comparer tool', 'Use Decoder', 'Use Intruder'],
    correct: 1,
    explanation: 'Comparer (Window → Comparer) shows word-level or byte-level differences between two pieces of data.',
  },
  {
    id: 12,
    question: 'Which tool automatically modifies requests to test for IDOR vulnerabilities?',
    options: ['Repeater', 'Intruder', 'Autorize', 'Scanner'],
    correct: 2,
    explanation: 'Autorize extension automatically tests if different users can access each others resources (IDOR).',
  },
  {
    id: 13,
    question: 'What port does Burp Proxy listen on by default?',
    options: ['80', '443', '8080', '9999'],
    correct: 2,
    explanation: 'Burp listens locally on 127.0.0.1:8080 by default. Configure your browser to use this proxy.',
  },
  {
    id: 14,
    question: 'Before HTTPS interception works, what must you install?',
    options: ['Java JRE', 'Burp CA certificate', 'Python', 'Chrome extension'],
    correct: 1,
    explanation: 'Install Burp\'s CA certificate in your browser/OS to trust Burp as an HTTPS proxy, otherwise SSL errors block traffic.',
  },
  {
    id: 15,
    question: 'Which scan mode analyzes captured traffic without sending new requests?',
    options: ['Active', 'Passive', 'Intrusive', 'Aggressive'],
    correct: 1,
    explanation: 'Passive scanning analyzes only existing captured requests. It is safe (no risk of detection) but limited to observed traffic.',
  },
  {
    id: 16,
    question: 'What does the Scanner tab (Pro only) detect?',
    options: ['Network ping', 'Vulnerabilities like SQLi, XSS, SSRF', 'SSL certificate expiry', 'Server uptime'],
    correct: 1,
    explanation: 'Burp Scanner runs hundreds of automated checks for OWASP Top 10 and other web application vulnerabilities.',
  },
  {
    id: 17,
    question: 'Which Burp component is best for manually tweaking and re-sending individual requests?',
    options: ['Proxy', 'Repeater', 'Intruder', 'Decoder'],
    correct: 1,
    explanation: 'Repeater is the manual testing workbench. Send a request there, edit parameters, headers, resend repeatedly.',
  },
  {
    id: 18,
    question: 'What is the purpose of Scope in Burp?',
    options: ['Define targets to attack', 'Set SSL/TLS versions', 'Configure intruder speed', 'Select extensions'],
    correct: 0,
    explanation: 'Scope (Target → Scope) defines which hosts/paths are in-scope for testing. Out-of-scope items are grayed out and ignored by some tools.',
  },
  {
    id: 19,
    question: 'Which feature helps detect blind SSRF or XXE by generating unique URLs?',
    options: ['Scanner', 'Collaborator', 'Comparer', 'Spider'],
    correct: 1,
    explanation: 'Collaborator generates unique subdomains (abcd1234.burpcollaborator.net). If target makes request to it, you know you triggered SSRF/XXE.',
  },
  {
    id: 20,
    question: 'True or false: The Community edition of Burp Suite includes the Scanner without any limitations.',
    options: ['True', 'False'],
    correct: 1,
    explanation: 'False. The Scanner is a Pro/Enterprise feature. Community edition has basic passive scanning only; active scanning requires extension like Active Scan++.',
  },
];

export default function BurpSuiteQuizPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-4xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-questionnaire-line" />
          Knowledge Check
        </div>
        <DocHeading level={1}>Burp Suite Quiz</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Test your understanding of Burp Suite tools, workflows, and attack methods. 20 questions covering Proxy, Repeater, Intruder, Scanner, and extensions. You need 80% to pass.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <ModuleQuiz title="Burp Suite Knowledge Check" questions={burpQuizQuestions} />
      </motion.section>

      <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/burp-suite/lab" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Lab Exercises <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/burp-suite/pro-tips" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
