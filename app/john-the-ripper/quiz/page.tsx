'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import ModuleQuiz from '@/components/base/ModuleQuiz';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const johnQuizQuestions = [
  {
    id: 1,
    question: 'What is John the Ripper primarily used for?',
    options: ['Network scanning', 'Password cracking', 'Port enumeration', 'Web vulnerability scanning'],
    correct: 1,
    explanation: 'John the Ripper is a password-cracking tool designed to test password strength by trying millions of candidate passwords against hashes.',
  },
  {
    id: 2,
    question: 'Which cracking mode uses personal info from the /etc/passwd GECOS field?',
    options: ['Wordlist', 'Incremental', 'External', 'Single'],
    correct: 3,
    explanation: 'Single crack mode uses the login name, GECOS fields (real name, home directory, etc.) to generate candidate passwords like "JohnDoe" or "DoeJohn".',
  },
  {
    id: 3,
    question: 'What is the default cracking mode if none is specified and a wordlist is not given?',
    options: ['Incremental', 'Wordlist', 'Single', 'External'],
    correct: 0,
    explanation: 'By default (no options), John tries single mode first, then wordlist if a wordlist file is configured, and finally incremental as a fallback if specified.',
  },
  {
    id: 4,
    question: 'Which flag specifies a wordlist file in John?',
    options: ['--word', '--wordlist', '-w', '--dict'],
    correct: 1,
    explanation: 'The --wordlist flag tells John which wordlist file to use: john --wordlist=rockyou.txt hashes.txt',
  },
  {
    id: 5,
    question: 'What does the --rules flag do in wordlist mode?',
    options: ['Filters words by length', 'Mangles wordlist entries with mutations', 'Sets CPU affinity', 'Enables GPU mode'],
    correct: 1,
    explanation: 'Rules apply transformations like leet speak, capitalization, and appending/prepending to each wordlist entry, generating thousands of candidates per base word.',
  },
  {
    id: 6,
    question: 'Which built-in rule set is the most aggressive?',
    options: ['Single', 'Wordlist', 'Extra', 'Jumbo'],
    correct: 3,
    explanation: 'Jumbo rules apply thousands of mutations including case toggles, leet speak, doubling, vowel swapping, and complex sandwich patterns. Slowest but most thorough.',
  },
  {
    id: 7,
    question: 'What is the typical speed ranking from fastest to slowest for cracking MD5 vs bcrypt vs argon2 on CPU?',
    options: ['MD5 > bcrypt > argon2', 'bcrypt > MD5 > argon2', 'argon2 > bcrypt > MD5', 'MD5 > argon2 > bcrypt'],
    correct: 0,
    explanation: 'MD5 is extremely fast (billions/sec), bcrypt is slower (hundreds of thousands/sec), and argon2/scrypt are memory-hard and orders of magnitude slower (hundreds to thousands/sec).',
  },
  {
    id: 8,
    question: 'Which format flag would you use for Windows NTLM hashes?',
    options: ['--format=LM', '--format=NT', '--format=ntlm', '--format=windows'],
    correct: 1,
    explanation: 'NTLM hashes use the NT kernel in John. Specify --format=NT. LM hashes use --format=LM.',
  },
  {
    id: 9,
    question: 'What tool extracts password hashes from a ZIP archive for John?',
    options: ['zipcrack', 'zip2john', 'zip2hash', 'arch2john'],
    correct: 1,
    explanation: 'zip2john is the standard utility: zip2john secret.zip > hashes.txt, then john hashes.txt.',
  },
  {
    id: 10,
    question: 'What incremental charset limits candidates to uppercase letters and digits?',
    options: ['UpperNum', 'AlphaNum', 'Alnum', 'LanMan'],
    correct: 0,
    explanation: 'UpperNum is John\'s incremental charset for uppercase A-Z plus digits 0-9. LanMan also uses uppercase only but adds LM-specific optimizations.',
  },
  {
    id: 11,
    question: 'How do you save a cracking session and restore it later?',
    options: ['--save and --load', '--record and --playback', '--session and --restore', '--checkpoint and --resume'],
    correct: 2,
    explanation: 'Use --session=name to save progress; use john --restore=name to resume. This is critical for long-running incremental sessions.',
  },
  {
    id: 12,
    question: 'Which extraction tool handles SSH private key passphrases?',
    options: ['ssh2john', 'rsa2john', 'key2john', 'ssh-key-extract'],
    correct: 0,
    explanation: 'ssh2john extracts passphrase hashes from encrypted SSH private keys (RSA, DSA, ECDSA, Ed25519).',
  },
  {
    id: 13,
    question: 'What does the --fork flag control?',
    options: ['Number of threads/processes', 'Maximum wordlist size', 'Output verbosity', 'Network connections'],
    correct: 0,
    explanation: '--fork=N spawns N parallel John processes, distributing hashes across CPU cores for linear speedup.',
  },
  {
    id: 14,
    question: 'Which command limits the maximum password length tried during incremental mode?',
    options: ['--maxlen', '--max-length', '--limit-length', '--password-length'],
    correct: 1,
    explanation: '--max-length=N restricts incremental mode to passwords of at most N characters. Essential for practical brute force.',
  },
  {
    id: 15,
    question: 'What is the purpose of the --format flag?',
    options: ['Set output format', 'Specify hash algorithm module', 'Change wordlist format', 'Set rule format'],
    correct: 1,
    explanation: '--format tells John which hash algorithm kernel to use. It can speed up cracking by selecting an optimized code path and avoiding auto-detection overhead.',
  },
  {
    id: 16,
    question: 'Which tool extracts hashes from a KeePass .kdbx database?',
    options: ['keepassdump', 'keepass2john', 'kdbx2john', 'kp2john'],
    correct: 1,
    explanation: 'keepass2john extracts the master key hash from KeePass 1.x (.kdb) and 2.x (.kdbx) databases for John to crack.',
  },
  {
    id: 17,
    question: 'What does hccap2john convert?',
    options: ['Windows LM hashes', 'WPA/WPA2 handshake captures', 'RAR archives', 'PDF documents'],
    correct: 1,
    explanation: 'hccap2john converts a WPA/WPA2 handshake capture (from airodump-ng) into a format John can attempt to crack the PSK.',
  },
  {
    id: 18,
    question: 'Why are rules more effective than a larger wordlist?',
    options: ['Rules are faster', 'Rules generate candidates on-the-fly without disk space', 'Rules always crack first', 'Rules support more formats'],
    correct: 1,
    explanation: 'Rules mutate a base wordlist into billions of candidates without storing them all on disk. One 14M-word list with Jumbo rules can generate ~42B candidates dynamically.',
  },
  {
    id: 19,
    question: 'Which flag skips TLS verification during HTTPS scans (when using a wordlist) is irrelevant. For hash formats, what does the --min-length flag control in wordlist mode?',
    options: ['Minimum word length from wordlist', 'Minimum password length for output', 'Minimum word length to consider', 'Minimum GPU batch size'],
    correct: 2,
    explanation: '--min-length=N tells John to skip wordlist words shorter than N characters. Useful to filter out noise and focus on plausible password lengths.',
  },
  {
    id: 20,
    question: 'True or false: John can crack WPA/WPA2 WiFi passwords, but it is very slow (few hundred guesses/sec).',
    options: ['True', 'False'],
    correct: 0,
    explanation: 'WPA2 uses PBKDF2 with 4096 iterations of HMAC-SHA1, intentionally slow. Expect 100-1000 guesses/sec on a modern CPU; a GPU helps but it remains orders of magnitude slower than MD5/NTLM.',
  },
];

export default function JohnTheRipperQuizPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-4xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-questionnaire-line" />
          Knowledge Check
        </div>
        <DocHeading level={1}>John the Ripper Quiz</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Test your understanding of password cracking concepts, John modes, hash formats, extraction tools, and practical usage. You need 80% to pass.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <ModuleQuiz title="John the Ripper Knowledge Check" questions={johnQuizQuestions} />
      </motion.section>

      <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/john-the-ripper/lab" className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg text-sm font-semibold hover:bg-cyber-cyan-dim transition-all whitespace-nowrap">
            Next: Lab Exercises <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/john-the-ripper/pro-tips" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-cyan hover:text-cyber-cyan transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
