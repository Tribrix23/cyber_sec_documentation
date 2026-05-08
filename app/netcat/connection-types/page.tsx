'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function NetcatConnectionTypesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-link" />
          Netcat Section 2 of 14
        </div>
        <DocHeading level={1}>Connection Types</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Netcat supports both TCP and UDP protocols, and can operate in either client (connect) or server (listen) mode. Understanding these modes is crucial for effective usage.
        </p>
        
        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>TCP vs UDP</DocHeading>
          <div className="grid grid-cols-1 gap-4">
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">TCP (Transmission Control Protocol)</h3>
              <p className="text-xs text-cyber-text mb-2">
                Connection-oriented protocol that guarantees delivery, ordering, and error checking. Used for reliable communication.
              </p>
              <div className="mt-2">
                <div className="font-mono text-cyber-green text-xs">
                  nc example.com 80      # Default TCP
                  nc -v example.com 443  # Verbose TCP
                </div>
              </div>
              <p className="text-xs text-cyber-text mt-2">
                <strong>Common uses:</strong> HTTP/HTTPS, SSH, FTP, email services
              </p>
            </div>
            
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">UDP (User Datagram Protocol)</h3>
              <p className="text-xs text-cyber-text mb-2">
                Connectionless protocol with minimal overhead. No guarantee of delivery, ordering, or error checking. Used for speed-sensitive applications.
              </p>
              <div className="mt-2">
                <div className="font-mono text-cyber-green text-xs">
                  nc -u example.com 53   # UDP DNS query
                  nc -u -v example.com 123 # Verbose UDP NTP
                </div>
              </div>
              <p className="text-xs text-cyber-text mt-2">
                <strong>Common uses:</strong> DNS, DHCP, SNMP, VoIP, gaming
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Client vs Listen Mode</DocHeading>
          <div className="grid grid-cols-1 gap-4">
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Client Mode (Connect)</h3>
              <p className="text-xs text-cyber-text mb-2">
                Netcat initiates a connection to a remote host and port. This is the default behavior.
              </p>
              <div className="mt-2">
                <div className="font-mono text-cyber-green text-xs">
                  nc example.com 80          # Connect to web server
                  nc -u 8.8.8.8 53           # UDP DNS query
                  nc -v scanme.nmap.org 22   # Verbose SSH check
                </div>
              </div>
            </div>
            
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Listen Mode (-l)</h3>
              <p className="text-xs text-cyber-text mb-2">
                Netcat waits for incoming connections on a specified port. Acts as a simple server.
              </p>
              <div className="mt-2">
                <div className="font-mono text-cyber-green text-xs">
                  nc -l 4444                 # Listen for TCP connections
                  nc -u -l 53                # Listen for UDP packets
                  nc -l -v 8080              # Verbose TCP listener
                </div>
              </div>
              <p className="text-xs text-cyber-text mt-2">
                <strong>Note:</strong> In listen mode, don't specify a remote host.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Combining Protocol and Mode</DocHeading>
          <p className="text-cyber-text mb-4">
            You can combine protocol selection (-u) with listen mode (-l) for UDP listeners:
          </p>
          <div className="space-y-3">
            <div className="cyber-card p-4">
              <div className="font-mono text-cyber-green text-xs">
                nc -l 53         # TCP listener on port 53
              </div>
              <p className="text-xs text-cyber-text mt-2">
                Listens for TCP connections on port 53
              </p>
            </div>
            
            <div className="cyber-card p-4">
              <div className="font-mono text-cyber-green text-xs">
                nc -u -l 53      # UDP listener on port 53
              </div>
              <p className="text-xs text-cyber-text mt-2">
                Listens for UDP packets on port 53
              </p>
            </div>
            
            <div className="cyber-card p-4">
              <div className="font-mono text-cyber-green text-xs">
                nc -u example.com 53   # UDP client to port 53
              </div>
              <p className="text-xs text-cyber-text mt-2">
                Sends UDP packets to example.com port 53
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="flex gap-3">
            <a href="/netcat/file-transfer" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: File Transfer <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}