'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import ModuleQuiz from '@/components/base/ModuleQuiz';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const metasploitQuizQuestions = [
  {
    id: 1,
    question: 'What is the primary function of Metasploit Framework?',
    options: ['Network scanning', 'Password cracking', 'Exploit development and execution', 'Web application scanning'],
    correct: 2,
    explanation: 'Metasploit Framework is a penetration testing platform for developing, testing, and executing exploit code against remote targets.',
  },
  {
    id: 2,
    question: 'Which module type takes advantage of a vulnerability to gain control?',
    options: ['auxiliary', 'exploit', 'payload', 'post'],
    correct: 1,
    explanation: 'Exploit modules contain code that takes advantage of a vulnerability to gain control of a target system.',
  },
  {
    id: 3,
    question: 'What does the Meterpreter payload run entirely in?',
    options: ['Disk', 'Memory', 'Registry', 'Network'],
    correct: 1,
    explanation: 'Meterpreter is a fileless payload that runs entirely in memory, making it harder to detect by antivirus software.',
  },
  {
    id: 4,
    question: 'Which command lists all available modules?',
    options: ['show modules', 'list modules', 'show all', 'module list'],
    correct: 0,
    explanation: 'The `show modules` command lists all available modules in the current context.',
  },
  {
    id: 5,
    question: 'What does the -g flag do with the set command?',
    options: ['Sets a global value', 'Sets a guessed value', 'Sets a group value', 'Sets a generated value'],
    correct: 0,
    explanation: 'setg sets a global option that persists across module changes. set sets a module-specific value.',
  },
  {
    id: 6,
    question: 'Which payload type gives you the most post-exploitation capabilities?',
    options: ['shell', 'meterpreter', 'cmd', 'exec'],
    correct: 1,
    explanation: 'Meterpreter provides the most extensive post-exploitation capabilities including file operations, keylogging, screenshots, and more.',
  },
  {
    id: 7,
    question: 'What is the purpose of the check command?',
    options: ['Verify target scope', 'Check if target is vulnerable', 'Check database connection', 'Check session status'],
    correct: 1,
    explanation: 'The check command attempts to verify if a target is vulnerable without actually exploiting it (though not all modules support this).',
  },
  {
    id: 8,
    question: 'Which database command imports nmap results into Metasploit?',
    options: ['nmap_import', 'import_nmap', 'db_nmap', 'nmap_db'],
    correct: 2,
    explanation: 'db_nmap runs nmap and automatically imports the results into Metasploit\'s database.',
  },
  {
    id: 9,
    question: 'How do you interact with session ID 2?',
    options: ['session -i 2', 'sessions -i 2', 'interact 2', 'session 2'],
    correct: 1,
    explanation: 'sessions -i 2 is the correct syntax to interact with session ID 2.',
  },
  {
    id: 10,
    question: 'What does the background command do in Meterpreter?',
    options: ['Kill the session', 'Return to msfconsole keeping session alive', 'Background the exploit', 'Sleep the session'],
    correct: 1,
    explanation: 'background returns you to the msfconsole prompt while keeping your Meterpreter session active.',
  },
];

export default function MetasploitQuizPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-4xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-questionnaire-line" />
          Metasploit Section 9 of 10
        </div>
        <DocHeading level={1}>Metasploit Quiz</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Test your understanding of Metasploit with 10 multiple-choice questions covering modules, commands, payloads, and workflow.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <ModuleQuiz title="Metasploit Knowledge Check" questions={metasploitQuizQuestions} />
      </motion.section>

      <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/metasploit/lab" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Lab Exercises <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/metasploit/pro-tips" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}