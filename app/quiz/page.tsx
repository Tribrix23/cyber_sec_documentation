'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import ModuleQuiz from '@/components/base/ModuleQuiz';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const nmapQuizQuestions = [
  {
    id: 1,
    question: 'What is Nmap primarily used for?',
    options: ['Encrypting network traffic', 'Network discovery and security auditing', 'Writing firewall rules', 'Managing domain names'],
    correct: 1,
    explanation: 'Nmap (Network Mapper) is the industry-standard tool for network discovery and security auditing. It discovers hosts, services, operating systems, and open ports.',
  },
  {
    id: 2,
    question: 'Which Nmap scan type does NOT complete the TCP three-way handshake?',
    options: ['TCP Connect (-sT)', 'TCP SYN (-sS)', 'TCP ACK (-sA)', 'TCP NULL (-sN)'],
    correct: 1,
    explanation: 'The SYN scan (-sS) sends a SYN packet and upon receiving SYN-ACK, sends RST instead of ACK. It never completes the handshake, making it stealthier and faster.',
  },
  {
    id: 3,
    question: 'What does the -A flag enable in Nmap?',
    options: ['Aggressive timing only', 'OS detection, version detection, script scanning, and traceroute', 'All ports scan', 'Anonymous scan mode'],
    correct: 1,
    explanation: '-A enables Aggressive mode, combining -O (OS detection), -sV (version detection), --script (NSE scripts), and --traceroute in one flag.',
  },
  {
    id: 4,
    question: 'Which timing template is the slowest and best for IDS evasion?',
    options: ['-T1 (Sneaky)', '-T0 (Paranoid)', '-T2 (Polite)', '-T5 (Insane)'],
    correct: 1,
    explanation: '-T0 (Paranoid) waits at least 5 minutes between probes. It is designed specifically for IDS evasion at the cost of extreme slowness.',
  },
  {
    id: 5,
    question: 'What does the port state "filtered" mean in Nmap output?',
    options: ['The port is open but hidden', 'Nmap cannot determine if the port is open due to a firewall or ACL', 'The port is closed by the target', 'The port responds with RST packets'],
    correct: 1,
    explanation: '"filtered" means a firewall, ACL, or network obstacle is blocking Nmap from determining whether the port is open or closed.',
  },
  {
    id: 6,
    question: 'Which flag skips host discovery and treats all targets as online?',
    options: ['-Pn', '-n', '-sP', '--skip-ping'],
    correct: 0,
    explanation: '-Pn skips the host discovery phase entirely, treating all specified targets as online. This is essential when ICMP ping is blocked by firewalls.',
  },
  {
    id: 7,
    question: 'What language are Nmap NSE scripts written in?',
    options: ['Python', 'Ruby', 'Lua', 'Perl'],
    correct: 2,
    explanation: 'NSE (Nmap Scripting Engine) scripts are written in Lua. They can perform vulnerability detection, service enumeration, brute forcing, and more.',
  },
  {
    id: 8,
    question: 'How do you scan only the top 100 most common ports?',
    options: ['-p 100', '--top-ports 100', '-F', '--common-ports 100'],
    correct: 1,
    explanation: '--top-ports 100 scans the 100 most frequently open ports according to Nmap\'s Internet-wide research. -F also scans top 100 but is less explicit.',
  },
  {
    id: 9,
    question: 'What does fragmenting packets with -f help with?',
    options: ['Speeding up the scan', 'Bypassing simple packet filters and IDS signatures', 'Encrypting the scan traffic', 'Scanning UDP ports only'],
    correct: 1,
    explanation: '-f fragments packets into tiny 8-byte fragments after the IP header. This can evade simple packet filters and some IDS signatures that do not reassemble fragments.',
  },
  {
    id: 10,
    question: 'What is the difference between -sV and -sS?',
    options: ['-sV is stealthier than -sS', '-sV performs version detection; -sS performs a stealth SYN scan', 'They are the same thing', '-sV only scans UDP ports'],
    correct: 1,
    explanation: '-sV probes open ports to determine service versions. -sS is a stealth TCP SYN scan. They are commonly used together: nmap -sS -sV target.',
  },
  {
    id: 11,
    question: 'Which command runs all vulnerability detection scripts?',
    options: ['nmap --script vuln target', 'nmap -sV --vuln target', 'nmap --vulnerability-scan target', 'nmap -A --vuln target'],
    correct: 0,
    explanation: '--script vuln runs all scripts in the "vuln" category, which detect known vulnerabilities like CVEs based on version banners and behavior.',
  },
  {
    id: 12,
    question: 'What does a decoy scan with -D RND:10 do?',
    options: ['Scans 10 random ports', 'Sends scan traffic from 10 random spoofed IP addresses', 'Uses 10 different scan types', 'Scans 10 random targets'],
    correct: 1,
    explanation: '-D RND:10 generates 10 random decoy IP addresses. The target sees traffic from multiple IPs, making it harder to identify the real scanner in logs.',
  },
  {
    id: 13,
    question: 'What is the default Nmap timing template?',
    options: ['-T0', '-T3', '-T4', '-T5'],
    correct: 1,
    explanation: '-T3 (Normal) is the default timing template. It provides a reasonable balance between speed and stealth for most networks.',
  },
  {
    id: 14,
    question: 'Which scan type is best for discovering UDP services like DNS and SNMP?',
    options: ['-sS', '-sT', '-sU', '-sA'],
    correct: 2,
    explanation: '-sU performs UDP scanning. Since UDP is connectionless, it sends UDP packets and interprets ICMP "port unreachable" as closed.',
  },
  {
    id: 15,
    question: 'What does -n do in an Nmap scan?',
    options: ['Scans only the top 1000 ports', 'Never performs DNS resolution', 'Enables network discovery', 'Sets the number of retries'],
    correct: 1,
    explanation: '-n tells Nmap to never perform reverse DNS resolution on IP addresses. This significantly speeds up scans on large networks.',
  },
  {
    id: 16,
    question: 'What does the NSE script "ssl-enum-ciphers" do?',
    options: ['Enumerates SSL certificates', 'Lists all supported SSL/TLS cipher suites and grades their strength', 'Checks for Heartbleed vulnerability', 'Downloads SSL certificates'],
    correct: 1,
    explanation: 'ssl-enum-ciphers enumerates all SSL/TLS cipher suites a server supports and grades them (A-F) based on their cryptographic strength.',
  },
  {
    id: 17,
    question: 'What is the purpose of the --reason flag in Nmap?',
    options: ['Explains why a port is in a particular state', 'Provides a reason for the scan duration', 'Gives legal justification for scanning', 'Shows the reasoning behind timing choices'],
    correct: 0,
    explanation: '--reason displays why Nmap classified a port as open, closed, or filtered (e.g., "syn-ack", "reset", "no-response").',
  },
];

export default function NmapQuizPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-questionnaire-line" />
            Nmap Section 12 of 13
          </div>
          <DocHeading level={1}>Nmap Quiz</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            Test your understanding of Nmap with 17 multiple-choice questions covering scan types, flags, port states, timing, NSE scripts, and practical usage. You need 80% to pass.
          </p>
        </motion.div>

        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <ModuleQuiz title="Nmap Knowledge Check" questions={nmapQuizQuestions} />
        </motion.section>

        <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="flex gap-3">
            <a href="/nmap/lab" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Lab Exercises <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/nmap/pro-tips" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text-muted hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
  );
}
