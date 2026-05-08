'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function NetcatPortScanningPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-target-line" />
          Netcat Section 4 of 14
        </div>
        <DocHeading level={1}>Port Scanning</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          While not as feature-rich as dedicated port scanners like Nmap, Netcat can perform basic port scanning to identify open ports and services on a target host.
        </p>
        
        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Basic Port Scanning</DocHeading>
          <p className="text-cyber-text mb-4">
            Use the -z flag for zero-I/O mode (scan only, no data transfer) and -v for verbose output to see which ports are open.
          </p>
          <div className="space-y-4">
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Scan a Single Port</h3>
              <p className="text-xs text-cyber-text mb-2">
                Check if a specific port is open:
              </p>
              <div className="font-mono text-cyber-green text-xs">
                nc -zv example.com 80
              </div>
              <p className="text-xs text-cyber-text mt-2">
                Output shows connection succeeded if port is open
              </p>
            </div>
            
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Scan Multiple Ports</h3>
              <p className="text-xs text-cyber-text mb-2">
                Check several specific ports:
              </p>
              <div className="font-mono text-cyber-green text-xs">
                nc -zv example.com 22 80 443 8080
              </div>
            </div>
            
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Scan a Port Range</h3>
              <p className="text-xs text-cyber-text mb-2">
                Scan a range of ports using hyphen notation:
              </p>
              <div className="font-mono text-cyber-green text-xs">
                nc -zv example.com 1-1000
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>UDP Port Scanning</DocHeading>
          <p className="text-cyber-text mb-4">
            UDP scanning is less reliable than TCP scanning because UDP is connectionless and doesn't guarantee responses. However, Netcat can still attempt UDP scans.
          </p>
          <div className="space-y-4">
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">UDP Scan</h3>
              <p className="text-xs text-cyber-text mb-2">
                Scan UDP ports (less reliable):
              </p>
              <div className="font-mono text-cyber-green text-xs">
                nc -zu example.com 53
              </div>
              <p className="text-xs text-cyber-text mt-2">
                No response might mean open, filtered, or no service
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Service Banner Grabbing</DocHeading>
          <p className="text-cyber-text mb-4">
            After identifying an open port, you can connect to grab the service banner to identify what's running:
          </p>
          <div className="space-y-4">
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Grab HTTP Banner</h3>
              <p className="text-xs text-cyber-text mb-2">
                Connect and manually send an HTTP request:
              </p>
               <div className="font-mono text-cyber-green text-xs">
                 {'nc example.com 80'}
                {" <!-- Then type: -->"}
                 {'GET / HTTP/1.1'}
                 {'Host: example.com'}
               </div>
            </div>
            
            <div className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Grab SSH Banner</h3>
              <p className="text-xs text-cyber-text mb-2">
                SSH services often send a banner immediately upon connection:
              </p>
              <div className="font-mono text-cyber-green text-xs">
                nc -v example.com 22
              </div>
              <p className="text-xs text-cyber-text mt-2">
                Look for the SSH version string in the output
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="flex gap-3">
            <a href="/netcat/banner-grabbing" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Banner Grabbing <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}