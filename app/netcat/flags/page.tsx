'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import InlineCode from '@/components/base/InlineCode';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const flagCategories = [
  {
    title: 'Connection & Listening Flags',
    flags: [
      { flag: '-l', desc: 'Listen mode — accept incoming connections (server)', example: 'nc -l -p 4444' },
      { flag: '-p <port>', desc: 'Specify local port (for listening or source port)', example: 'nc -l -p 4444' },
      { flag: '-s <address>', desc: 'Set source IP address', example: 'nc -s 10.0.0.1 10.0.0.2 4444' },
      { flag: '-u', desc: 'Use UDP instead of TCP', example: 'nc -u 10.0.0.1 4444' },
    ],
  },
  {
    title: 'Data Transfer Flags',
    flags: [
      { flag: '-e <program>', desc: 'Execute program after connection (rare in modern netcat)', example: 'nc -l -p 4444 -e /bin/bash' },
      { flag: '-c <command>', desc: 'Execute shell command (ncat only)', example: 'ncat -l -p 4444 --exec "whoami"' },
      { flag: '-i <interval>', desc: 'Wait interval between lines of text sent', example: 'nc -i 2 10.0.0.1 4444' },
      { flag: '-w <timeout>', desc: 'Timeout for connections and final net read', example: 'nc -w 5 10.0.0.1 4444' },
    ],
  },
  {
    title: 'Input/Output Flags',
    flags: [
      { flag: '-i <file>', desc: 'Read from file instead of stdin', example: 'nc 10.0.0.1 4444 < payload.txt' },
      { flag: '-o <file>', desc: 'Save all output to file', example: 'nc 10.0.0.1 4444 > output.txt' },
      { flag: '-q <seconds>', desc: 'Quit after EOF on stdin and delay', example: 'echo "test" | nc 10.0.0.1 4444 -q 1' },
      { flag: '-v', desc: 'Verbose — show detailed connection info', example: 'nc -v 10.0.0.1 4444' },
      { flag: '-vv', desc: 'Even more verbose', example: 'nc -vv 10.0.0.1 4444' },
    ],
  },
  {
    title: 'DNS & Proxy Flags (ncat / netcat-openbsd)',
    flags: [
      { flag: '--proxy <host:port>', desc: 'Connect via SOCKS4/5 or HTTP proxy', example: 'nc --proxy 10.0.0.1:8080 10.0.0.2 80' },
      { flag: '--proxy-type <type>', desc: 'Proxy type: socks4, socks5, or http', example: 'nc --proxy 10.0.0.1:8080 --proxy-type http example.com 80' },
      { flag: '-X <version>', desc: 'Connect via SOCKS version (4 or 5)', example: 'nc -X 5 -x 10.0.0.1:1080 target.com 80' },
      { flag: '-x <address:port>', desc: 'Set proxy server (SOCKS)', example: 'nc -x 10.0.0.1:1080 target.com 80' },
    ],
  },
  {
    title: 'SSL/TLS Flags (ncat)',
    flags: [
      { flag: '--ssl', desc: 'Enable SSL/TLS encryption', example: 'nc --ssl 10.0.0.1 443' },
      { flag: '--ssl-verify', desc: 'Verify SSL certificate', example: 'nc --ssl --ssl-verify 10.0.0.1 443' },
      { flag: '--ssl-cert <file>', desc: 'Client certificate file', example: 'nc --ssl --ssl-cert client.crt 10.0.0.1 443' },
      { flag: '--ssl-key <file>', desc: 'Client private key file', example: 'nc --ssl --ssl-key client.key 10.0.0.1 443' },
      { flag: '--ssl-cafile <file>', desc: 'CA certificate bundle', example: 'nc --ssl --ssl-cafile ca.crt 10.0.0.1 443' },
    ],
  },
];

export default function NetcatFlagsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-flag-line" />
          Netcat Section 7 of 14
        </div>
        <DocHeading level={1}>Flags & Options</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Netcat offers a range of flags for controlling connections, data transfer, timeouts, and encryption. Different implementations (OpenBSD netcat, GNU netcat, Ncat) support slightly different flags. Below is a curated reference of the most useful flags with examples.
        </p>
      </motion.div>

      {/* Flag Categories */}
      {flagCategories.map((cat, index) => (
        <motion.section key={cat.title} className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>{cat.title}</DocHeading>
          <div className="mt-4 space-y-3">
            {cat.flags.map((f) => (
              <div key={f.flag} className="cyber-card p-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                  <code className="text-xs font-mono text-cyber-cyan bg-cyber-bg border border-cyber-border rounded px-2 py-1 flex-shrink-0 whitespace-nowrap">
                    {f.flag}
                  </code>
                  <div className="flex-1">
                    <p className="text-sm text-cyber-text">{f.desc}</p>
                    <code className="block text-xs font-mono text-cyber-green mt-2">{f.example}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      ))}

      {/* Implementation Differences */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Implementation Differences</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Different distributions ship different netcat versions with varying flag support:
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border border-cyber-border rounded-lg overflow-hidden">
            <thead className="bg-cyber-bg-card">
              <tr>
                <th className="text-left px-4 py-3 text-cyber-text font-semibold">Version</th>
                <th className="text-left px-4 py-3 text-cyber-text font-semibold">Commonly Found On</th>
                <th className="text-left px-4 py-3 text-cyber-text font-semibold">Key Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border">
              <tr className="hover:bg-cyber-bg-card/50 transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-red text-xs">OpenBSD netcat</td>
                <td className="px-4 py-3 text-cyber-text text-xs">macOS, FreeBSD, Debian/Ubuntu</td>
                <td className="px-4 py-3 text-cyber-text text-xs">No <InlineCode>-e</InlineCode> flag. Use <InlineCode>ncat</InlineCode> or other tools for shell access.</td>
              </tr>
              <tr className="hover:bg-cyber-bg-card/50 transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-red text-xs">GNU netcat (traditional)</td>
                <td className="px-4 py-3 text-cyber-text text-xs">Older Linux distros, Kali</td>
                <td className="px-4 py-3 text-cyber-text text-xs">Has <InlineCode>-e</InlineCode> flag but has known security issues.</td>
              </tr>
              <tr className="hover:bg-cyber-bg-card/50 transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-red text-xs">Ncat (Nmap project)</td>
                <td className="px-4 py-3 text-cyber-text text-xs">Kali, Parrot, manual install</td>
                <td className="px-4 py-3 text-cyber-text text-xs">Enhanced, supports SSL, proxy, <InlineCode>--exec</InlineCode>, and <InlineCode>--keep-open</InlineCode>.</td>
              </tr>
              <tr className="hover:bg-cyber-bg-card/50 transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-red text-xs">netcat-traditional</td>
                <td className="px-4 py-3 text-cyber-text text-xs">Ubuntu/Debian (installable via apt)</td>
                <td className="px-4 py-3 text-cyber-text text-xs">Classic version with <InlineCode>-e</InlineCode>. Install explicitly on newer distros.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Tips */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Callout type="info">
          Always test flag availability on your target system: <InlineCode>nc -h</InlineCode> or <InlineCode>man nc</InlineCode>. Some flags like <InlineCode>-e</InlineCode> are intentionally omitted from secure implementations.
        </Callout>

        <div className="mt-8 flex gap-3">
          <a href="/netcat/examples" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Usage Examples <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/netcat/remote-shell" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
