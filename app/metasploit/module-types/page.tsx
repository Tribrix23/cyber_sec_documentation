'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const moduleTypes = [
  {
    type: 'exploit',
    name: 'Exploit',
    icon: 'ri-bug-line',
    color: 'text-cyber-red',
    desc: 'Code that takes advantage of a vulnerability to gain control of a target.',
    examples: ['exploit/windows/smb/ms17_010_eternalblue', 'exploit/multi/http/struts2_content_type_ognl'],
  },
  {
    type: 'payload',
    name: 'Payload',
    icon: 'ri-rocket-line',
    color: 'text-cyber-amber',
    desc: 'Code that executes after a successful exploit — reverse shell, meterpreter, etc.',
    examples: ['windows/meterpreter/reverse_tcp', 'linux/x64/shell/reverse_tcp'],
  },
  {
    type: 'auxiliary',
    name: 'Auxiliary',
    icon: 'ri-radar-line',
    color: 'text-cyber-cyan',
    desc: 'Scanner, fuzzer, or DoS tool that does not directly exploit vulnerabilities.',
    examples: ['scanner/http/dir_scanner', 'scanner/smb/smb_version'],
  },
  {
    type: 'post',
    name: 'Post-Exploitation',
    icon: 'ri-terminal-box-line',
    color: 'text-cyber-green',
    desc: 'Modules for actions after compromise — hashdump, keylogging, persistence.',
    examples: ['windows/gather/credentials/mimikatz', 'linux/gather/enum_system'],
  },
  {
    type: 'encoder',
    name: 'Encoder',
    icon: 'ri-code-s-slash-line',
    color: 'text-cyber-text',
    desc: 'Transforms payloads to evade antivirus and signature detection.',
    examples: ['x86/shikata_ga_nai', 'cmd/powershell_base64'],
  },
  {
    type: 'nop',
    name: 'NOP',
    icon: 'ri-box-3-line',
    color: 'text-cyber-text-dim',
    desc: 'No-operation sled for buffer overflow exploits to ensure reliable payload execution.',
    examples: ['x86/opty2', 'x64/simple'],
  },
  {
    type: 'evasion',
    name: 'Evasion',
    icon: 'ri-shield-keyhole-line',
    color: 'text-cyber-amber',
    desc: 'Advanced anti-virus evasion beyond simple encoders.',
    examples: ['windows/windows_defender_exe', 'windows/amsi_bypass'],
  },
];

export default function MetasploitModuleTypesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-box-3-line" />
          Metasploit Section 2 of 10
        </div>
        <DocHeading level={1}>Module Types</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Metasploit is built around a modular architecture. Understanding each module type is essential for effective use.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moduleTypes.map((m) => (
            <div key={m.type} className="cyber-card p-4">
              <div className="flex items-start gap-3 mb-2">
                <span className={`w-10 h-10 rounded-lg bg-cyber-bg border border-cyber-border flex items-center justify-center ${m.color}`}>
                  <i className={`${m.icon} text-xl`} />
                </span>
                <div>
                  <h3 className={`text-base font-semibold ${m.color}`}>{m.name}</h3>
                  <p className="text-xs text-cyber-text mt-1">{m.desc}</p>
                </div>
              </div>
              {m.examples && (
                <div className="mt-3 pt-3 border-t border-cyber-border">
                  <p className="text-xs text-cyber-text-dim mb-1">Examples:</p>
                  {m.examples.map((ex, i) => (
                    <code key={i} className="block text-xs font-mono text-cyber-cyan">{ex}</code>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      <Callout type="tip" className="mt-6">
        Use <code className="text-cyber-amber">show modules</code> in msfconsole to list all available modules of each type.
      </Callout>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="mt-8 flex gap-3">
          <a href="/metasploit/commands" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Commands <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/metasploit/installation" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}