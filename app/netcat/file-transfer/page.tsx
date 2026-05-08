'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function NetcatFileTransferPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-file-copy-line" />
          Netcat Section 3 of 14
        </div>
        <DocHeading level={1}>File Transfer</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Netcat can transfer files between systems by treating the network connection as a simple data pipeline. One system listens while the other connects and sends data.
        </p>
        
        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Basic File Transfer</DocHeading>
          <p className="text-cyber-text mb-4">
            To transfer a file, set up a listener on the receiving system, then connect from the sending system and redirect the file as input.
          </p>
          
          <div className="space-y-4">
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Receiver (Listening)</h3>
              <p className="text-xs text-cyber-text mb-2">
                On the system that will receive the file:
              </p>
              <div className="font-mono text-cyber-green text-xs">
                {"nc -l 4444 > received_file.txt"}
              </div>
              <p className="text-xs text-cyber-text mt-2">
                Listens on port 4444 and saves all received data to received_file.txt
              </p>
            </div>
            
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Sender (Connecting)</h3>
              <p className="text-xs text-cyber-text mb-2">
                On the system that has the file to send:
              </p>
              <div className="font-mono text-cyber-green text-xs">
                 nc &lt;receiver_ip&gt; 4444 &lt; secret_document.pdf
              </div>
              <p className="text-xs text-cyber-text mt-2">
                Connects to the receiver and sends secret_document.pdf as input
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Receiving Compressed Archives</DocHeading>
          <p className="text-cyber-text mb-4">
            You can combine Netcat with compression tools for efficient transfer of large files or directories.
          </p>
          
          <div className="space-y-4">
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Transfer a Directory</h3>
              <p className="text-xs text-cyber-text mb-2">
                Using tar to package and compress a directory before transfer:
              </p>
              <div className="font-mono text-cyber-green text-xs">
                # On receiver:
                nc -l 4444 | tar -xz
              </div>
              <div className="font-mono text-cyber-green text-xs mt-2">
                # On sender:
                 tar -cz /path/to/directory | nc &lt;receiver_ip&gt; 4444
              </div>
            </div>
            
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Transfer with Progress Monitoring</h3>
              <p className="text-xs text-cyber-text mb-2">
                Using pv (pipe viewer) to monitor transfer progress:
              </p>
              <div className="font-mono text-cyber-green text-xs">
                # On receiver:
                {"nc -l 4444 > backup.tar"}
              </div>
              <div className="font-mono text-cyber-green text-xs mt-2">
                # On sender:
                 pv backup.tar | nc &lt;receiver_ip&gt; 4444
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Bidirectional Communication</DocHeading>
          <p className="text-cyber-text mb-4">
            Netcat can also facilitate two-way communication for simple chat or command execution:
          </p>
          
          <div className="space-y-4">
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Simple Chat Setup</h3>
              <p className="text-xs text-cyber-text mb-2">
                Two systems can chat by each listening on a port and connecting to the other:
              </p>
              <div className="font-mono text-cyber-green text-xs">
                # On both systems:
                nc -l 5555
              </div>
              <p className="text-xs text-cyber-text mt-2">
                Each system types messages that appear on the other's screen
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="flex gap-3">
            <a href="/netcat/port-scanning" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Port Scanning <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}