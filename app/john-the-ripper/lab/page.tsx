'use client'
import { useEffect, useState } from 'react';
import DocHeading from '@/components/base/DocHeading';
import LabExercise from '@/components/base/LabExercise';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const johnLabTasks = [
  {
    id: 1,
    title: 'Basic Wordlist Attack',
    description: 'Crack SHA256 hashes using rockyou.txt. Write the exact command.',
    expectedAnswer: 'john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt',
    hint: 'Format: john --wordlist=<path> <hashfile>',
  },
  {
    id: 2,
    title: 'Wordlist with Jumbo Rules',
    description: 'Crack sha512crypt hashes with rockyou.txt plus Jumbo rules. Write the full command.',
    expectedAnswer: 'john --wordlist=rockyou.txt --rules=Jumbo --format=sha512crypt hashes.txt',
    hint: 'Combine --wordlist, --rules=Jumbo, and --format=sha512crypt.',
  },
  {
    id: 3,
    title: 'Single Crack Mode First',
    description: 'Run single mode on hashes.txt using user info for candidates.',
    expectedAnswer: 'john --single hashes.txt',
    hint: 'Single mode does not require a wordlist; it uses GECOS fields.',
  },
  {
    id: 4,
    title: 'Save and Restore Session',
    description: 'Start a cracking session with the name "crackjob" using rockyou.txt with Wordlist rules. Write the command.',
    expectedAnswer: 'john --wordlist=rockyou.txt --rules=Wordlist --session=crackjob hashes.txt',
    hint: 'Use --session=name to save progress; later restore with --restore=name.',
  },
  {
    id: 5,
    title: 'Incremental Brute Force — Digits Only',
    description: 'Crack remaining hashes using only digits 0-9, max length 4 (PINs). Write the command.',
    expectedAnswer: 'john --incremental=Digits --max-length=4 hashes.txt',
    hint: 'Charset Digits for 0-9 only, limit length to 4 for PINs.',
  },
  {
    id: 6,
    title: 'Incremental — Lowercase + Numbers (6 chars)',
    description: 'Brute force 6-character passwords using lowercase letters and digits only.',
    expectedAnswer: 'john --incremental=LowerNum --max-length=6 hashes.txt',
    hint: 'Use LowerNum charset; restrict length to 6 with --max-length.',
  },
  {
    id: 7,
    title: 'Multi-Core Parallel Cracking',
    description: 'Run John with 8 parallel processes (fork) on NTLM hashes.',
    expectedAnswer: 'john --fork=8 --format=NT hashes.txt',
    hint: '--fork=N spawns N processes to use multiple CPU cores.',
  },
  {
    id: 8,
    title: 'Crack Windows LM Hashes',
    description: 'Crack legacy LAN Manager hashes using LanMan incremental mode.',
    expectedAnswer: 'john --format=LM --incremental=LanMan hashes.txt',
    hint: 'LM hashes are upper-case only 7-char passwords; use --format=LM and --incremental=LanMan.',
  },
  {
    id: 9,
    title: 'ZIP Archive Password',
    description: 'Extract and crack a password-protected ZIP archive named "files.zip". Write both commands.',
    expectedAnswer: 'zip2john files.zip > zip_hash.txt\njohn --wordlist=rockyou.txt zip_hash.txt',
    hint: 'First extract with zip2john, then crack with John.',
  },
  {
    id: 10,
    title: 'RAR Archive Password',
    description: 'Extract and crack "secret.rar" using rockyou.txt.',
    expectedAnswer: 'rar2john secret.rar > rar_hash.txt\njohn --wordlist=rockyou.txt rar_hash.txt',
    hint: 'Use rar2john for RAR files before cracking.',
  },
  {
    id: 11,
    title: 'SSH Private Key Passphrase',
    description: 'Crack the passphrase of an encrypted SSH private key "id_rsa".',
    expectedAnswer: 'ssh2john id_rsa > ssh_hash.txt\njohn --wordlist=rockyou.txt ssh_hash.txt',
    hint: 'ssh2john extracts the encrypted blob; then crack with wordlist.',
  },
  {
    id: 12,
    title: 'KeePass Database Cracking',
    description: 'Crack a KeePass 2.x database "vault.kdbx" using a wordlist with rules.',
    expectedAnswer: 'keepass2john vault.kdbx > kp_hash.txt\njohn --wordlist=rockyou.txt --rules=Jumbo kp_hash.txt',
    hint: 'Extract with keepass2john, apply --rules and a strong wordlist for slow hashes.',
  },
  {
    id: 13,
    title: 'PDF Document Password',
    description: 'Crack "report.pdf" which uses 128-bit RC4 encryption.',
    expectedAnswer: 'pdf2john.pl report.pdf > pdf_hash.txt\njohn --wordlist=rockyou.txt --rules=Jumbo pdf_hash.txt',
    hint: 'pdf2john.pl extracts hash; very slow, so use strong wordlist with rules.',
  },
  {
    id: 14,
    title: 'Microsoft Office Document',
    description: 'Crack "document.docx" password with a wordlist and Extra rules.',
    expectedAnswer: 'office2john document.docx > office_hash.txt\njohn --wordlist=rockyou.txt --rules=Extra office_hash.txt',
    hint: 'office2john handles doc, docx, xls, xlsx, ppt, pptx; rules help against Office password generators.',
  },
  {
    id: 15,
    title: 'WPA2 WiFi Handshake',
    description: 'Crack "capture.hccapx" WPA2 handshake using rockyou.txt. Write the command.',
    expectedAnswer: 'john --wordlist=rockyou.txt --rules --format=hccapx capture.hccapx',
    hint: 'WPA2 uses the hccapx format; slow (~100-1000 guesses/sec), requires patience.',
  },
  {
    id: 16,
    title: 'Custom External Mode',
    description: 'Use external Alnum4 mode (4-char alphanumeric) to brute force a raw MD5 hash.',
    expectedAnswer: 'john --external=Alnum4 --format=raw-md5 hashes.txt',
    hint: 'External mode replaces the generator; Alnum4 tries all 4-char alphanumeric combos.',
  },
  {
    id: 17,
    title: 'Session Restore',
    description: 'You stopped a session named "job1" abruptly. Write the command to resume it.',
    expectedAnswer: 'john --restore=job1',
    hint: '--restore= resumes a previously saved session by its name.',
  },
  {
    id: 18,
    title: 'Show Cracked Passwords Only',
    description: 'List all cracked passwords from hashes.txt without recracking.',
    expectedAnswer: 'john --show hashes.txt',
    hint: 'john --show displays only successfully cracked hashes with passwords.',
  },
  {
    id: 19,
    title: 'Test With Incremental Fallback',
    description: 'Wordlist first, then switch to incremental for leftovers. Write the command.',
    expectedAnswer: 'john --wordlist=rockyou.txt --incremental=All hashes.txt',
    hint: 'Specify both --wordlist and --incremental in the same command.',
  },
  {
    id: 20,
    title: 'Filter Out Short Words',
    description: 'Use only wordlist words with at least 8 characters when cracking.',
    expectedAnswer: 'john --wordlist=rockyou.txt --min-length=8 hashes.txt',
    hint: '--min-length=N skips wordlist entries shorter than N characters.',
  },
];

export default function JohnTheRipperLabPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-flask-line" />
          Hands-On Practice
        </div>
        <DocHeading level={1}>John the Ripper Lab</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Apply everything you learned. Type the exact John the Ripper commands for each scenario. Tasks cover wordlist attacks, single mode, incremental, hash extraction, sessions, format selection, rules, and common file types.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <LabExercise title="John the Ripper Hand-On Lab" tasks={johnLabTasks} />
      </motion.section>

      <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-2">How to Practice for Real</h3>
          <p className="text-sm text-cyber-text leading-relaxed">
            To gain hands-on experience, set up a vulnerable web app like DVWA, or use crackable hash files from CTF platforms such as TryHackMe, HackTheBox, or OverTheWire. Extract hashes from local files you own (PDFs, ZIPs) to practice extraction. Remember: only crack hashes you legally own or have explicit permission to audit.
          </p>
        </div>
        <div className="mt-6 flex gap-3">
          <a href="/john-the-ripper" className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg text-sm font-semibold hover:bg-cyber-cyan-dim transition-all whitespace-nowrap">
            <i className="ri-home-line mr-1" /> Back to John the Ripper Module
          </a>
        </div>
      </motion.section>
    </div>
  );
}
