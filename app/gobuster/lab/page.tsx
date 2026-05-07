'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import LabExercise from '@/components/base/LabExercise';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const gobusterLabTasks = [
  {
    id: 1,
    title: 'Basic Directory Scan',
    description: 'Scan http://10.0.0.1/ for directories using the common.txt wordlist. Write the full command.',
    command: 'gobuster dir -u http://10.0.0.1/ -w /usr/share/wordlists/dirb/common.txt',
    expectedAnswer: 'gobuster dir -u http://10.0.0.1/ -w /usr/share/wordlists/dirb/common.txt',
    hint: 'Use dir mode with -u for the URL and -w for the wordlist.',
  },
  {
    id: 2,
    title: 'Directory Scan with Extensions',
    description: 'Scan http://10.0.0.1/ for directories and files, appending php, txt, and html extensions.',
    command: 'gobuster dir -u http://10.0.0.1/ -w common.txt -x php,txt,html',
    expectedAnswer: 'gobuster dir -u http://10.0.0.1/ -w common.txt -x php,txt,html',
    hint: 'Use -x to specify file extensions to append.',
  },
  {
    id: 3,
    title: 'DNS Subdomain Enumeration',
    description: 'Enumerate subdomains of example.com using a subdomain wordlist. Write the exact command.',
    command: 'gobuster dns -d example.com -w /usr/share/wordlists/subdomains-top1million-5000.txt',
    expectedAnswer: 'gobuster dns -d example.com -w /usr/share/wordlists/subdomains-top1million-5000.txt',
    hint: 'dns mode uses -d for domain and -w for wordlist.',
  },
  {
    id: 4,
    title: 'Virtual Host Discovery',
    description: 'Discover virtual hosts on http://10.0.0.1/ using a vhosts wordlist. Write the command.',
    command: 'gobuster vhost -u http://10.0.0.1/ -w /usr/share/wordlists/vhosts.txt',
    expectedAnswer: 'gobuster vhost -u http://10.0.0.1/ -w /usr/share/wordlists/vhosts.txt',
    hint: 'vhost mode uses -u for the target URL and -w for the wordlist.',
  },
  {
    id: 5,
    title: 'S3 Bucket Enumeration',
    description: 'Brute force S3 bucket names using s3-buckets.txt. Write the command.',
    command: 'gobuster s3 -w /usr/share/wordlists/s3-buckets.txt',
    expectedAnswer: 'gobuster s3 -w /usr/share/wordlists/s3-buckets.txt',
    hint: 's3 mode only requires a wordlist with -w. No URL needed.',
  },
  {
    id: 6,
    title: 'Fuzz URL Paths',
    description: 'Fuzz URL paths on http://10.0.0.1/ using the FUZZ keyword and common.txt.',
    command: 'gobuster fuzz -u "http://10.0.0.1/FUZZ" -w /usr/share/wordlists/common.txt',
    expectedAnswer: 'gobuster fuzz -u "http://10.0.0.1/FUZZ" -w /usr/share/wordlists/common.txt',
    hint: 'fuzz mode replaces FUZZ in the URL with wordlist entries.',
  },
  {
    id: 7,
    title: 'Authenticated Directory Scan',
    description: 'Scan http://10.0.0.1/ with a session cookie "session=abc123" for authentication.',
    command: 'gobuster dir -u http://10.0.0.1/ -w common.txt -c "session=abc123"',
    expectedAnswer: 'gobuster dir -u http://10.0.0.1/ -w common.txt -c "session=abc123"',
    hint: 'Use -c to add a cookie string to every request.',
  },
  {
    id: 8,
    title: 'Scan with Custom Header',
    description: 'Scan http://10.0.0.1/ with an Authorization header containing "Bearer token123".',
    command: 'gobuster dir -u http://10.0.0.1/ -w common.txt -H "Authorization: Bearer token123"',
    expectedAnswer: 'gobuster dir -u http://10.0.0.1/ -w common.txt -H "Authorization: Bearer token123"',
    hint: 'Use -H to add custom HTTP headers.',
  },
  {
    id: 9,
    title: 'Follow Redirects',
    description: 'Scan http://10.0.0.1/ while following HTTP redirects.',
    command: 'gobuster dir -u http://10.0.0.1/ -w common.txt -r',
    expectedAnswer: 'gobuster dir -u http://10.0.0.1/ -w common.txt -r',
    hint: '-r tells Gobuster to follow redirects.',
  },
  {
    id: 10,
    title: 'Save Output to File',
    description: 'Scan http://10.0.0.1/ and save results to results.txt.',
    command: 'gobuster dir -u http://10.0.0.1/ -w common.txt -o results.txt',
    expectedAnswer: 'gobuster dir -u http://10.0.0.1/ -w common.txt -o results.txt',
    hint: 'Use -o to specify an output file.',
  },
  {
    id: 11,
    title: 'Scan with More Threads',
    description: 'Scan http://10.0.0.1/ using 50 threads for faster enumeration.',
    command: 'gobuster dir -u http://10.0.0.1/ -w common.txt -t 50',
    expectedAnswer: 'gobuster dir -u http://10.0.0.1/ -w common.txt -t 50',
    hint: '-t controls the number of concurrent threads.',
  },
  {
    id: 12,
    title: 'Skip TLS Verification',
    description: 'Scan https://10.0.0.1/ while skipping TLS certificate verification.',
    command: 'gobuster dir -u https://10.0.0.1/ -w common.txt -k',
    expectedAnswer: 'gobuster dir -u https://10.0.0.1/ -w common.txt -k',
    hint: '-k skips TLS certificate verification for self-signed certs.',
  },
  {
    id: 13,
    title: 'Vhost with Domain Append',
    description: 'Scan virtual hosts on http://10.0.0.1/ using common.txt with the domain automatically appended to each word.',
    command: 'gobuster vhost -u http://10.0.0.1/ -w common.txt --append-domain -d example.com',
    expectedAnswer: 'gobuster vhost -u http://10.0.0.1/ -w common.txt --append-domain -d example.com',
    hint: '--append-domain adds the domain suffix. -d specifies the domain.',
  },
  {
    id: 14,
    title: 'DNS with IP Display',
    description: 'Enumerate subdomains of example.com and show resolved IP addresses.',
    command: 'gobuster dns -d example.com -w subdomains.txt -i',
    expectedAnswer: 'gobuster dns -d example.com -w subdomains.txt -i',
    hint: '-i in dns mode shows the resolved IP for each subdomain.',
  },
  {
    id: 15,
    title: 'Fuzz POST Data',
    description: 'Fuzz the password field in a POST login request to http://10.0.0.1/login using passwords.txt.',
    command: 'gobuster fuzz -u "http://10.0.0.1/login" -w passwords.txt -d "username=admin&password=FUZZ" -X POST',
    expectedAnswer: 'gobuster fuzz -u "http://10.0.0.1/login" -w passwords.txt -d "username=admin&password=FUZZ" -X POST',
    hint: 'Use -d for POST data with FUZZ, and -X POST for the HTTP method.',
  },
];

export default function GobusterLabPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
            <i className="ri-flask-line" />
            Gobuster Section 13 of 13
          </div>
          <DocHeading level={1}>Gobuster Lab</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3 text-lg">
            Apply everything you learned. Type the exact Gobuster command for each of these 15 scenarios. Use hints if you get stuck, but try to solve each task from memory first.
          </p>
        </motion.div>

        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <LabExercise title="Gobuster Hands-On Lab" tasks={gobusterLabTasks} />
        </motion.section>

        <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">How to Practice for Real</h3>
            <p className="text-xs text-cyber-text leading-relaxed">
              These exercises test your command syntax knowledge. For hands-on practice with real targets, set up a vulnerable web application like DVWA, Metasploitable, or a local Apache/Nginx server. Use scanme.nmap.org for safe HTTP testing.
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <a href="/gobuster" className="px-5 py-2.5 rounded-lg bg-cyber-red text-white text-sm font-semibold hover:bg-cyber-red/80 transition-all whitespace-nowrap">
              <i className="ri-home-line mr-1" /> Back to Gobuster Module
            </a>
          </div>
        </motion.section>
      </div>
  );
}
