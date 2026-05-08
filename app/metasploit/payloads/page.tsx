'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const payloads = [
  { name: 'windows/meterpreter/reverse_tcp', type: 'Windows', desc: 'Meterpreter over TCP reverse shell. Feature-rich with built-in commands.' },
  { name: 'windows/meterpreter/reverse_https', type: 'Windows', desc: 'Meterpreter over HTTPS reverse shell. Blends with normal HTTPS traffic.' },
  { name: 'windows/shell/reverse_tcp', type: 'Windows', desc: 'Basic Windows command shell via TCP reverse connection.' },
  { name: 'linux/x86/shell/reverse_tcp', type: 'Linux', desc: 'Linux x86 command shell via TCP reverse connection.' },
  { name: 'linux/x64/meterpreter/reverse_tcp', type: 'Linux', desc: 'Linux x64 Meterpreter reverse TCP shell.' },
  { name: 'php/meterpreter/reverse_tcp', type: 'Web', desc: 'PHP Meterpreter reverse TCP shell for web servers.' },
  { name: 'java/jsp_shell_reverse_tcp', type: 'Java', desc: 'JSP reverse shell for Java web applications.' },
  { name: 'android/meterpreter/reverse_tcp', type: 'Android', desc: 'Android Meterpreter reverse TCP payload.' },
  { name: 'python/shell_reverse_tcp', type: 'Python', desc: 'Python-based reverse shell over TCP.' },
];

export default function MetasploitPayloadsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-rocket-line" />
          Metasploit Section 4 of 10
        </div>
        <DocHeading level={1}>Common Payloads</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Payloads determine what happens after a successful exploit. Choose the right one for your target OS and network conditions.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {payloads.map((p) => (
            <div key={p.name} className="cyber-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-text-dim">{p.type}</span>
              </div>
              <code className="text-sm font-mono text-cyber-cyan block mb-1">{p.name}</code>
              <p className="text-xs text-cyber-text">{p.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-white mb-4">Meterpreter vs Shell Payloads</h2>
        <div className="cyber-card p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-cyber-amber mb-2">Meterpreter</h3>
              <ul className="text-xs text-cyber-text space-y-1">
                <li>• Runs entirely in memory (fileless)</li>
                <li>• Supports process migration</li>
                <li>• Built-in post-exploitation commands</li>
                <li>• Better stealth capabilities</li>
                <li>• Encrypted communication</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Shell Payloads</h3>
              <ul className="text-xs text-cyber-text space-y-1">
                <li>• Basic command execution</li>
                <li>• No meterpreter features</li>
                <li>• Smaller footprint</li>
                <li>• More likely to be detected</li>
                <li>• Unencrypted traffic</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="mt-8 flex gap-3">
          <a href="/metasploit/meterpreter" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Meterpreter <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/metasploit/commands" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}