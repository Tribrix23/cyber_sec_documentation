'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import ModuleQuiz from '@/components/base/ModuleQuiz';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const sslscanQuizQuestions = [
  {
    id: 1,
    question: 'What is SSLScan primarily used for?',
    options: ['Network scanning', 'SSL/TLS service testing', 'Password cracking', 'Port scanning'],
    correct: 1,
    explanation: 'SSLScan is an SSL/TLS scanner that tests protocol versions, cipher suites, and vulnerabilities.',
  },
  {
    id: 2,
    question: 'Which flag tests for the Heartbleed vulnerability?',
    options: ['--heartbleed', '--vuln-heartbleed', '--test-heart', '--bleed'],
    correct: 0,
    explanation: '--heartbleed tests for CVE-2014-0160 in OpenSSL.',
  },
  {
    id: 3,
    question: 'What does --no-failed do?',
    options: ['Exits on first failure', 'Hides rejected ciphers', 'Skips certificate check', 'Stops on weak ciphers'],
    correct: 1,
    explanation: '--no-failed hides rejected cipher suites for cleaner output.',
  },
  {
    id: 4,
    question: 'Which TLS version is considered secure?',
    options: ['TLS 1.0', 'TLS 1.1', 'TLS 1.2', 'SSL 3.0'],
    correct: 2,
    explanation: 'TLS 1.2 and 1.3 are considered secure. TLS 1.0 and 1.1 are deprecated.',
  },
  {
    id: 5,
    question: 'How do you specify a custom port?',
    options: ['-p', '--port', '-P', '--custom-port'],
    correct: 1,
    explanation: 'Use --port=PORT to specify a non-standard port.',
  },
];

export default function SSLScanQuizPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-medium font-mono mb-4">
          <i className="ri-questionnaire-line" />
          SSLScan Section 9 of 10
        </div>
        <DocHeading level={1}>SSLScan Quiz</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Test your knowledge of SSLScan with 5 multiple-choice questions.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
         <ModuleQuiz title="SSLScan Knowledge Check" questions={sslscanQuizQuestions} />
      </motion.section>

      <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <a href="/sslscan/lab" className="px-5 py-2.5 rounded-lg bg-cyber-green text-white text-sm font-semibold hover:bg-cyber-green/80 transition-all whitespace-nowrap">
          Next: Lab Exercises <i className="ri-arrow-right-line ml-1" />
        </a>
      </motion.section>
    </div>
  );
}