'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import ModuleQuiz from '@/components/base/ModuleQuiz';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const gobusterQuizQuestions = [
  {
    id: 1,
    question: 'What language is Gobuster written in?',
    options: ['Python', 'Ruby', 'Go', 'C'],
    correct: 2,
    explanation: 'Gobuster is written in Go (Golang), which gives it significant performance advantages over Python-based alternatives like dirb or dirbuster due to Go\'s concurrency model.',
  },
  {
    id: 2,
    question: 'Which Gobuster mode is used to discover hidden directories and files?',
    options: ['dns', 'dir', 'vhost', 's3'],
    correct: 1,
    explanation: 'The dir mode discovers hidden directories and files by appending wordlist entries to a target URL and checking HTTP responses.',
  },
  {
    id: 3,
    question: 'What does the -x flag do in Gobuster dir mode?',
    options: ['Sets the number of threads', 'Specifies file extensions to append', 'Sets a proxy', 'Excludes certain status codes'],
    correct: 1,
    explanation: 'The -x flag appends file extensions to each wordlist entry. For example, -x php,txt tests both /admin and /admin.php, /admin.txt.',
  },
  {
    id: 4,
    question: 'Which mode discovers subdomains by DNS resolution?',
    options: ['dir', 'dns', 'fuzz', 's3'],
    correct: 1,
    explanation: 'The dns mode performs DNS A record lookups for wordlist entries appended to a target domain, discovering valid subdomains.',
  },
  {
    id: 5,
    question: 'What does the -t flag control in Gobuster?',
    options: ['Timeout duration', 'Number of concurrent threads', 'Target URL', 'TLS verification'],
    correct: 1,
    explanation: '-t sets the number of concurrent threads. Default is 10. Higher values speed up scanning but may trigger rate limiting or WAF blocks.',
  },
  {
    id: 6,
    question: 'Which flag skips TLS certificate verification?',
    options: ['-s', '-k', '-n', '-i'],
    correct: 1,
    explanation: '-k skips TLS certificate verification, allowing Gobuster to scan HTTPS sites with self-signed or invalid certificates.',
  },
  {
    id: 7,
    question: 'What does the --append-domain flag do in vhost mode?',
    options: ['Appends the domain to each wordlist entry', 'Appends the wordlist to the domain', 'Appends a random string', 'Appends the target IP'],
    correct: 0,
    explanation: '--append-domain automatically appends the domain suffix to each wordlist entry. For example, "admin" becomes "admin.example.com".',
  },
  {
    id: 8,
    question: 'Which mode is used to discover AWS S3 buckets?',
    options: ['dir', 'dns', 's3', 'fuzz'],
    correct: 2,
    explanation: 'The s3 mode brute forces S3 bucket names to find publicly exposed buckets with misconfigured permissions.',
  },
  {
    id: 9,
    question: 'What does the FUZZ keyword do in fuzz mode?',
    options: ['Stops the scan', 'Marks the target as fuzzable', 'Acts as a placeholder replaced by wordlist entries', 'Enables fuzzy matching'],
    correct: 2,
    explanation: 'FUZZ is a placeholder keyword that Gobuster replaces with each wordlist entry. It can be placed anywhere in the URL, headers, or POST data.',
  },
  {
    id: 10,
    question: 'Which flag adds a cookie to requests?',
    options: ['-H', '-c', '-a', '-d'],
    correct: 1,
    explanation: '-c adds a cookie string to every request. This is essential for scanning authenticated areas of web applications.',
  },
  {
    id: 11,
    question: 'What does -r do in dir mode?',
    options: ['Reverses the wordlist', 'Recursively scans subdirectories', 'Follows redirects', 'Resumes a previous scan'],
    correct: 2,
    explanation: '-r tells Gobuster to follow HTTP redirects (301/302 responses) to their final destination.',
  },
  {
    id: 12,
    question: 'How do you save Gobuster output to a file?',
    options: ['--save', '-o', '-f', '--output-file'],
    correct: 1,
    explanation: '-o <file> saves Gobuster results to the specified file. This is recommended for all scans to preserve findings.',
  },
  {
    id: 13,
    question: 'Which wordlist source ships with Kali Linux by default?',
    options: ['SecLists', 'RockYou', 'Dirb', 'All of the above'],
    correct: 3,
    explanation: 'Kali Linux includes Dirb wordlists, RockYou password list, and SecLists can be installed via apt install seclists.',
  },
  {
    id: 14,
    question: 'What should you do if Gobuster reports every word as a hit?',
    options: ['Increase threads', 'Use --exclude-length or --wildcard', 'Change the target', 'Use a smaller wordlist'],
    correct: 1,
    explanation: 'This indicates a wildcard response where the server returns the same page for every request. Use --exclude-length or --wildcard to filter false positives.',
  },
  {
    id: 15,
    question: 'Which flag shows the resolved IP in dns mode?',
    options: ['-p', '-i', '-n', '-d'],
    correct: 1,
    explanation: '-i in dns mode displays the resolved IP address for each discovered subdomain, helping identify infrastructure patterns.',
  },
  {
    id: 16,
    question: 'What is the default number of threads in Gobuster?',
    options: ['5', '10', '20', '50'],
    correct: 1,
    explanation: 'The default thread count is 10. This provides a reasonable balance between speed and network load for most targets.',
  },
  {
    id: 17,
    question: 'Which mode tests different Host headers against a target IP?',
    options: ['dir', 'dns', 'vhost', 'fuzz'],
    correct: 2,
    explanation: 'The vhost mode sends different Host headers to a target IP to discover virtual hosts configured on shared hosting or load balancers.',
  },
];

export default function GobusterQuizPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
            <i className="ri-questionnaire-line" />
            Gobuster Section 12 of 13
          </div>
          <DocHeading level={1}>Gobuster Quiz</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3 text-lg">
            Test your understanding of Gobuster with 17 multiple-choice questions covering modes, flags, wordlists, and practical usage. You need 80% to pass.
          </p>
        </motion.div>

        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <ModuleQuiz title="Gobuster Knowledge Check" questions={gobusterQuizQuestions} />
        </motion.section>

        <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="flex gap-3">
            <a href="/gobuster/lab" className="px-5 py-2.5 rounded-lg bg-cyber-red text-white text-sm font-semibold hover:bg-cyber-red/80 transition-all whitespace-nowrap">
              Next: Lab Exercises <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/gobuster/pro-tips" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
  );
}