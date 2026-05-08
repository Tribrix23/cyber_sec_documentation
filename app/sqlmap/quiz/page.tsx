'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import ModuleQuiz from '@/components/base/ModuleQuiz';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const sqlmapQuizQuestions = [
  {
    id: 1,
    question: 'What language is SQLMap written in?',
    options: ['Go', 'Python', 'Ruby', 'C'],
    correct: 1,
    explanation: 'SQLMap is written in Python, making it cross-platform and easy to extend.',
  },
  {
    id: 2,
    question: 'What does the -u flag specify?',
    options: ['User agent', 'URL target', 'Upload file', 'Unix timestamp'],
    correct: 1,
    explanation: '-u specifies the target URL with the parameter to test for SQL injection.',
  },
  {
    id: 3,
    question: 'Which injection technique uses response timing to infer data?',
    options: ['Boolean-based', 'Error-based', 'UNION-based', 'Time-based Blind'],
    correct: 3,
    explanation: 'Time-based Blind injection uses SLEEP() or WAITFOR DELAY to infer data based on response timing.',
  },
  {
    id: 4,
    question: 'What is the maximum risk level in SQLMap?',
    options: ['2', '3', '4', '5'],
    correct: 1,
    explanation: 'Risk levels range from 1 (safe) to 3 (aggressive).',
  },
  {
    id: 5,
    question: 'What does --tamper=space2comment do?',
    options: ['Encodes the payload in base64', 'Replaces spaces with comments', 'Randomizes letter case', 'Adds URL encoding'],
    correct: 1,
    explanation: 'space2comment replaces spaces with SQL comments /* */ to bypass basic WAFs.',
  },
  {
    id: 6,
    question: 'Which flag dumps all databases?',
    options: ['--dump-all', '--all-dbs', '--list-dbs', '--dump'],
    correct: 0,
    explanation: '--dump-all extracts data from all databases on the target.',
  },
  {
    id: 7,
    question: 'What does --os-shell require?',
    options: ['Admin access to the web app', 'Stacked queries support', 'HTTPS connection', 'Cookie authentication'],
    correct: 1,
    explanation: '--os-shell requires the database to support stacked queries for executing OS commands.',
  },
  {
    id: 8,
    question: 'How do you load a request from Burp Suite?',
    options: ['--burp request.txt', '-b request.txt', '-r request.txt', '--request request.txt'],
    correct: 2,
    explanation: '-r loads an HTTP request from a file, commonly exported from Burp Suite.',
  },
  {
    id: 9,
    question: 'What does --batch do?',
    options: ['Runs in batch mode without prompts', 'Saves output to batch file', 'Processes multiple URLs', 'Uses less memory'],
    correct: 0,
    explanation: '--batch runs SQLMap non-interactively, accepting all defaults automatically.',
  },
  {
    id: 10,
    question: 'Which technique code represents UNION-based injection?',
    options: ['B', 'E', 'U', 'T'],
    correct: 2,
    explanation: 'U is the technique code for UNION-based injection, which appends results to the original query.',
  },
  {
    id: 11,
    question: 'What is the default thread count?',
    options: ['5', '10', '20', '50'],
    correct: 1,
    explanation: 'SQLMap defaults to 10 concurrent threads for HTTP requests.',
  },
  {
    id: 12,
    question: 'How do you specify a specific table to dump?',
    options: ['--table name', '-T name', '--dump name', '-t name'],
    correct: 1,
    explanation: '-T specifies the table name for enumeration or dumping operations.',
  },
  {
    id: 13,
    question: 'What does the -v 3 flag control?',
    options: ['Verbosity level', 'Vulnerability level', 'Version number', 'Vector type'],
    correct: 0,
    explanation: '-v sets the verbosity level (0-6) controlling output detail.',
  },
  {
    id: 14,
    question: 'Which databases does SQLMap NOT support?',
    options: ['MySQL', 'Oracle', 'MongoDB', 'PostgreSQL'],
    correct: 2,
    explanation: 'SQLMap supports SQL databases. MongoDB is NoSQL and not supported.',
  },
  {
    id: 15,
    question: 'What does --file-read do?',
    options: ['Upload a file', 'Read a server file', 'Delete a file', 'Create a file'],
    correct: 1,
    explanation: '--file-read retrieves files from the target server through SQL injection.',
  },
];

export default function SQLMapQuizPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-questionnaire-line" />
          SQLMap Section 12 of 13
        </div>
        <DocHeading level={1}>SQLMap Quiz</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Test your understanding of SQLMap with 15 multiple-choice questions covering injection techniques, flags, and practical usage. You need 80% to pass.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <ModuleQuiz title="SQLMap Knowledge Check" questions={sqlmapQuizQuestions} />
      </motion.section>

      <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/sqlmap/lab" className="px-5 py-2.5 rounded-lg bg-cyber-red text-white text-sm font-semibold hover:bg-cyber-red/80 transition-all whitespace-nowrap">
            Next: Lab Exercises <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sqlmap/pro-tips" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}