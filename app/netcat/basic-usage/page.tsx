'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function NetcatBasicUsagePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-terminal-line" />
          Netcat Section 1 of 14
        </div>
        <DocHeading level={1}>Basic Usage</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Netcat (nc) is a simple yet powerful networking utility that reads and writes data across network connections using TCP or UDP protocols. It's often called the "Swiss Army knife" of networking tools due to its versatility.
        </p>
        
        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Basic Syntax</DocHeading>
          <p className="text-cyber-text mb-4">
            The basic syntax for Netcat is:
          </p>
          <div className="cyber-card p-4">
            <div className="font-mono text-cyber-green text-sm">
              nc [options] host port
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-cyber-text mb-2"><strong>host:</strong> Target hostname or IP address</p>
            <p className="text-sm text-cyber-text mb-2"><strong>port:</strong> Target port number</p>
            <p className="text-sm text-cyber-text"><strong>[options:</strong> Various flags to modify behavior</p>
          </div>
        </motion.section>

        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Connection Modes</DocHeading>
          <p className="text-cyber-text mb-4">
            Netcat operates in two primary modes:
          </p>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Client Mode (Default)</h3>
              <p className="text-xs text-cyber-text">
                Connects to a remote host and port. This is the default behavior when you specify a host and port.
              </p>
              <div className="mt-2">
                <div className="font-mono text-cyber-green text-xs">
                  nc example.com 80
                </div>
              </div>
            </div>
            
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Listen Mode (-l)</h3>
              <p className="text-xs text-cyber-text">
                Listens for incoming connections on a specified port. Use the -l flag to enable listen mode.
              </p>
              <div className="mt-2">
                <div className="font-mono text-cyber-green text-xs">
                  nc -l 4444
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Simple Examples</DocHeading>
          <div className="space-y-4">
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Connect to a Web Server</h3>
              <p className="text-xs text-cyber-text mb-2">
                Establish a TCP connection to a web server on port 80:
              </p>
              <div className="font-mono text-cyber-green text-xs">
                nc example.com 80
              </div>
              <p className="text-xs text-cyber-text mt-2">
                After connecting, you can manually type HTTP requests:
              </p>
              <div className="mt-1 space-x-2">
                <span className="px-2 py-0.5 bg-cyber-bg-card text-xs rounded">GET / HTTP/1.1</span>
                <span className="px-2 py-0.5 bg-cyber-bg-card text-xs rounded">Host: example.com</span>
                <span className="px-2 py-0.5 bg-cyber-bg-card text-xs rounded">&lt;Enter&gt;&lt;Enter&gt;</span>
              </div>
            </div>
            
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Listen for Connections</h3>
              <p className="text-xs text-cyber-text mb-2">
                Listen for incoming TCP connections on port 4444:
              </p>
              <div className="font-mono text-cyber-green text-xs">
                nc -l 4444
              </div>
            </div>
            
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">UDP Connection</h3>
              <p className="text-xs text-cyber-text mb-2">
                Use UDP instead of TCP with the -u flag:
              </p>
              <div className="font-mono text-cyber-green text-xs">
                nc -u example.com 53
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="flex gap-3">
            <a href="/netcat/connection-types" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Connection Types <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}