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

export default function NetcatBannerGrabbingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-printer-line" />
          Netcat Section 4 of 14
        </div>
        <DocHeading level={1}>Banner Grabbing</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Banner grabbing is a technique to extract service information (software name, version, and sometimes configuration details) from network services. Netcat can connect to a port and display the banner that the server sends upon connection—often revealing version numbers and other reconnaissance data.
        </p>
      </motion.div>

      {/* How it works */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>How Banner Grabbing Works</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Many services (SSH, FTP, SMTP, HTTP, etc.) send an introductory message when a client connects. This banner often includes the software name and version number. Netcat simply opens a TCP connection and prints whatever the server sends back. This passive information gathering is often the first step in identifying potential vulnerabilities.
        </p>

        <div className="mt-6 cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Classic Banner Examples</h3>
          <div className="space-y-3">
            <CodeBlock code="nc -nv 10.0.0.1 22" />
            <p className="text-xs text-cyber-text">SSH banner — reveals OpenSSH version</p>
            <CodeBlock code="nc -nv 10.0.0.1 21" />
            <p className="text-xs text-cyber-text">FTP banner — reveals vsftpd or ProFTPD version</p>
            <CodeBlock code="nc -nv 10.0.0.1 25" />
            <p className="text-xs text-cyber-text">SMTP banner — reveals Postfix, Exim, or Sendmail version</p>
            <CodeBlock code="nc -nv 10.0.0.1 80" />
            <p className="text-xs text-cyber-text">HTTP banner — Server header or initial response</p>
          </div>
        </div>
      </motion.section>

      {/* Basic Examples */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Common Banner Grab Examples</DocHeading>
        <div className="mt-6 space-y-4">
          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Grab SSH Banner</h3>
            <CodeBlock code="nc -nv 10.0.0.1 22" />
            <p className="text-xs text-cyber-text mt-3">
              Connects to port 22 (SSH) and prints the version banner. Useful for identifying OpenSSH versions and potential CVEs.
            </p>
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Grab HTTP Server Banner</h3>
            <CodeBlock code={"echo -e \"HEAD / HTTP/1.1\\r\\nHost: 10.0.0.1\\r\\n\\r\\n\" | nc 10.0.0.1 80"} />
            <p className="text-xs text-cyber-text mt-3">
              Some HTTP servers do not send a banner upon connection. Sending a minimal HTTP HEAD request forces a response that includes the Server header.
            </p>
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Grab SMTP Banner</h3>
            <CodeBlock code="nc -nv 10.0.0.1 25" />
            <p className="text-xs text-cyber-text mt-3">
              Connects to port 25 (SMTP). The server typically responds with its mail server software and version. Follow up with <InlineCode>EHLO test</InlineCode> to gather further capabilities.
            </p>
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Grab POP3/IMAP Banner</h3>
            <CodeBlock code="nc -nv 10.0.0.1 110" />
            <p className="text-xs text-cyber-text mt-3">
              Port 110 (POP3) or 143 (IMAP) often reveal the mail server software. This helps determine if the server is running Dovecot, Courier, or another service with known vulnerabilities.
            </p>
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Multiple Ports with a Loop</h3>
            <CodeBlock code={`for port in {21,22,23,25,80,443,3306}; do
  echo -e "\\n-- Port $port --" | nc -nv -w 2 10.0.0.1 $port
done`} />
            <p className="text-xs text-cyber-text mt-3">
              Iterates over a set of common ports to quickly gather banners from multiple services. Adjust the port list based on your target's open ports (from a prior scan).
            </p>
          </div>
        </div>
      </motion.section>

      {/* Banner parsing */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Interpreting Banners</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          After capturing a banner, extract the software name and version number, then search for known exploits. Examples:
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border border-cyber-border rounded-lg overflow-hidden">
            <thead className="bg-cyber-bg-card">
              <tr>
                <th className="text-left px-4 py-3 text-cyber-text font-semibold">Banner Example</th>
                <th className="text-left px-4 py-3 text-cyber-text font-semibold">Interpretation</th>
                <th className="text-left px-4 py-3 text-cyber-text font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border">
              <tr className="hover:bg-cyber-bg-card/50 transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-green text-xs">SSH-2.0-OpenSSH_8.2p1</td>
                <td className="px-4 py-3 text-cyber-text text-xs">OpenSSH 8.2p1 on Ubuntu</td>
                <td className="px-4 py-3 text-cyber-text text-xs">Search: CVE OpenSSH 8.2p1</td>
              </tr>
              <tr className="hover:bg-cyber-bg-card/50 transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-green text-xs">220 mail.example.com ESMTP Postfix</td>
                <td className="px-4 py-3 text-cyber-text text-xs">Postfix SMTP server</td>
                <td className="px-4 py-3 text-cyber-text text-xs">Search: Postfix exploits 2024</td>
              </tr>
              <tr className="hover:bg-cyber-bg-card/50 transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-green text-xs">220 vsFTPd 3.0.3</td>
                <td className="px-4 py-3 text-cyber-text text-xs">vsftpd 3.0.3 (very old, likely vulnerable)</td>
                <td className="px-4 py-3 text-cyber-text text-xs">Search: vsFTPd 3.0.3 exploit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Tips */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Callout type="warning">
          Banners can be intentionally modified (obfuscated) by administrators to mislead attackers. Some services hide or change their version string. Always verify findings with additional enumeration techniques.
        </Callout>

        <div className="mt-8 flex gap-3">
          <a href="/netcat/chat" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Chat Application <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/netcat/port-scanning" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
