'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import LabExercise from '@/components/base/LabExercise';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const netcatLabTasks = [
  {
    id: 1,
    title: 'Basic TCP Connection',
    description: 'Connect to example.com on port 80 using Netcat. Write the command.',
    expectedAnswer: 'nc example.com 80',
    hint: 'Basic syntax: nc <host> <port>',
  },
  {
    id: 2,
    title: 'Listen for TCP Connections',
    description: 'Listen for incoming TCP connections on port 4444. Write the command.',
    expectedAnswer: 'nc -l 4444',
    hint: 'Use -l flag to listen mode.',
  },
  {
    id: 3,
    title: 'UDP Connection Test',
    description: 'Test UDP connectivity to a server on port 53. Write the command.',
    expectedAnswer: 'nc -u example.com 53',
    hint: 'Use -u flag for UDP mode.',
  },
  {
    id: 4,
    title: 'File Transfer (Receiver)',
    description: 'Set up Netcat to receive a file and save it as received.txt on port 5555. Write the command.',
    expectedAnswer: 'nc -l 5555 > received.txt',
    hint: 'Redirect output to a file using >.',
  },
  {
    id: 5,
    title: 'File Transfer (Sender)',
    description: 'Send a file named secret.doc to a listener on port 5555. Write the command.',
    expectedAnswer: 'nc <receiver_ip> 5555 < secret.doc',
    hint: 'Use < to redirect file as input.',
  },
  {
    id: 6,
    title: 'HTTP Banner Grab',
    description: 'Grab the banner from a web server on port 80. Write the command sequence.',
    expectedAnswer: 'nc example.com 80\nGET / HTTP/1.1\nHost: example.com\n\n',
    hint: 'Connect first, then manually type the HTTP request.',
  },
  {
    id: 7,
    title: 'Port Scan Single Port',
    description: 'Check if port 22 is open on host 192.168.1.100. Write the command.',
    expectedAnswer: 'nc -zv 192.168.1.100 22',
    hint: 'Use -z for zero-I/O mode and -v for verbose output.',
  },
  {
    id: 8,
    title: 'Port Scan Range',
    description: 'Scan ports 1-1000 on localhost. Write the command.',
    expectedAnswer: 'nc -zv localhost 1-1000',
    hint: 'Specify port range with hyphen.',
  },
  {
    id: 9,
    title: 'Chat Server Setup',
    description: 'Set up a simple chat server on port 7777. Write the command.',
    expectedAnswer: 'nc -l 7777',
    hint: 'Two instances can chat when both listen on same port.',
  },
  {
    id: 10,
    title: 'Reverse Shell Preparation',
    description: 'Prepare a listener for a reverse shell on port 4444. Write the command.',
    expectedAnswer: 'nc -lvp 4444',
    hint: 'Use -l to listen, -v for verbose, -p for port (though redundant with -l).',
  },
  {
    id: 11,
    title: 'Bind Shell Setup',
    description: 'Set up a bind shell on port 31337 on the target system. Write the command.',
    expectedAnswer: 'nc -lvp 31337 -e /bin/bash',
    hint: 'Use -e to execute /bin/bash when connection is made.',
  },
  {
    id: 12,
    title: 'Timeout Connection',
    description: 'Attempt to connect to a host with a 3-second timeout. Write the command.',
    expectedAnswer: 'nc -w3 host.example.com 80',
    hint: 'Use -w flag to set timeout in seconds.',
  },
  {
    id: 13,
    title: 'Stay Listening After Disconnect',
    description: 'Listen on port 8080 and accept multiple connections sequentially. Write the command.',
    expectedAnswer: 'nc -lk 8080',
    hint: 'Use -k flag to keep listening after client disconnects.',
  },
  {
    id: 14,
    title: 'Specify Source Port',
    description: 'Connect to example.com port 80 using source port 8080. Write the command.',
    expectedAnswer: 'nc -p 8080 example.com 80',
    hint: 'Use -p flag to set source port.',
  },
  {
    id: 15,
    title: 'Disable DNS Resolution',
    description: 'Connect to an IP address without DNS lookup. Write the command.',
    expectedAnswer: 'nc -n 8.8.8.8 53',
    hint: 'Use -n flag to disable DNS resolution.',
  },
];

export default function NetcatLabPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-flask-line" />
          Netcat Section 13 of 14
        </div>
        <DocHeading level={1}>Netcat Lab</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Apply everything you learned. Type the exact Netcat command for each of these 15 scenarios. Use hints if you get stuck, but try to solve each task from memory first.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <LabExercise title="Netcat Hands-On Lab" tasks={netcatLabTasks} />
      </motion.section>

      <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-2">How to Practice for Real</h3>
          <p className="text-xs text-cyber-text leading-relaxed">
            These exercises test your command syntax knowledge. For hands-on practice, set up two machines (or use VMs) and try file transfers, port scanning, and basic chatting. Always practice in a legal, authorized environment like your home lab.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <a href="/netcat" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            <i className="ri-home-line mr-1" /> Back to Netcat Module
          </a>
        </div>
      </motion.section>
    </div>
  );
}