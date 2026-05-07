import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import InlineCode from '@/components/base/InlineCode';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const portStates = [
  {
    state: 'open',
    color: 'text-cyber-green',
    bg: 'bg-cyber-green/10',
    border: 'border-cyber-green/20',
    definition: 'An application is actively accepting TCP connections, UDP datagrams, or SCTP associations on this port.',
    behavior: 'For TCP scans, the target responds with SYN-ACK. For UDP, the service may send application data or remain silent. For SCTP, the target sends INIT-ACK.',
    meaning: 'This is the most important result in any scan. An open port means a service is listening and can potentially be exploited, accessed, or further enumerated.',
    example: 'Port 80/tcp open http Apache httpd 2.4.41',
  },
  {
    state: 'closed',
    color: 'text-cyber-red',
    bg: 'bg-cyber-red/10',
    border: 'border-cyber-red/20',
    definition: 'The port is accessible (receiving and sending packets) but no application is listening on it.',
    behavior: 'For TCP, the target responds with RST (reset) to any connection attempt. For UDP, the target sends ICMP "port unreachable." For SCTP, ABORT is sent.',
    meaning: 'Closed ports are not directly exploitable but still reveal information. They confirm the host is alive, the port is not filtered by a firewall, and the IP stack is functioning normally.',
    example: 'Port 443/tcp closed https',
  },
  {
    state: 'filtered',
    color: 'text-cyber-amber',
    bg: 'bg-cyber-amber/10',
    border: 'border-cyber-amber/20',
    definition: 'Nmap cannot determine whether the port is open because packet filtering prevents probes from reaching it.',
    behavior: 'No response is received from the target. The probe may have been dropped by a firewall, ACL, or network device. Some firewalls send no response; others may send ICMP admin-prohibited.',
    meaning: 'Filtered ports strongly suggest a firewall or security device is in place. This is valuable intelligence for mapping network defenses. Nmap cannot tell if the port is open behind the filter.',
    example: 'Port 22/tcp filtered ssh',
  },
  {
    state: 'unfiltered',
    color: 'text-cyber-text-muted',
    bg: 'bg-cyber-bg-card',
    border: 'border-cyber-border',
    definition: 'The port is accessible but Nmap cannot determine if it is open or closed.',
    behavior: 'Only seen with ACK scans (-sA). The target responds to ACK probes, indicating the port is not filtered, but ACK scans cannot determine if the service is actually listening.',
    meaning: 'Unfiltered ports appear during firewall mapping. They tell you that no filter blocks ACK packets to that port, but you need a different scan type to determine the actual port state.',
    example: 'Port 80/tcp unfiltered',
  },
  {
    state: 'open|filtered',
    color: 'text-cyber-text-muted',
    bg: 'bg-cyber-bg-card',
    border: 'border-cyber-border',
    definition: 'Nmap cannot distinguish between an open port and a filtered port.',
    behavior: 'This ambiguous state occurs with UDP scans, IP protocol scans, FIN scans, NULL scans, and Xmas scans when no response is received. Open UDP ports often do not respond. Filtered ports also do not respond.',
    meaning: 'This is a common and frustrating result. It means you need additional scanning techniques: try a SYN scan for TCP ports, or use version detection (-sV) to trigger a service response.',
    example: 'Port 53/udp open|filtered domain',
  },
  {
    state: 'closed|filtered',
    color: 'text-cyber-text-muted',
    bg: 'bg-cyber-bg-card',
    border: 'border-cyber-border',
    definition: 'Nmap cannot distinguish between a closed port and a filtered port.',
    behavior: 'Only seen with idle scans (-sI). The IPID increment analysis produces ambiguous results when the zombie host is not truly idle or when the target behavior is unusual.',
    meaning: 'This is the rarest state. It suggests issues with the idle scan technique itself rather than the target. Try a different scan type or a different zombie host.',
    example: 'Port 22/tcp closed|filtered ssh',
  },
];

const stateTransitions = [
  {
    scenario: 'TCP SYN Scan (-sS)',
    open: 'SYN → SYN-ACK → RST',
    closed: 'SYN → RST',
    filtered: 'SYN → [no response]',
  },
  {
    scenario: 'TCP Connect (-sT)',
    open: 'SYN → SYN-ACK → ACK',
    closed: 'SYN → RST',
    filtered: 'SYN → [timeout]',
  },
  {
    scenario: 'UDP Scan (-sU)',
    open: 'UDP → [silence or data]',
    closed: 'UDP → ICMP unreachable',
    filtered: 'UDP → [no response]',
  },
  {
    scenario: 'FIN/NULL/Xmas (-sF/sN/sX)',
    open: 'Probe → [no response]',
    closed: 'Probe → RST',
    filtered: 'Probe → [no response]',
  },
];

export default function NmapPortStatesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-door-open-line" />
            Nmap Section 4 of 13
          </div>
          <DocHeading level={1}>Understanding Port States</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            Nmap classifies every tested port into one of six possible states. Reading Nmap output correctly is a fundamental skill — misinterpreting a "filtered" port as "closed" could mean missing a critical attack vector.
          </p>
        </motion.div>

        {/* State Cards */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>The Six Port States</DocHeading>
          <div className="mt-6 space-y-4">
            {portStates.map((s) => (
              <div key={s.state} className={`cyber-card p-5 border-l-[3px] ${s.border} ${s.bg}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`font-mono text-sm font-bold ${s.color}`}>{s.state}</span>
                  <div className={`px-2 py-0.5 rounded text-[10px] font-semibold ${s.bg} ${s.color} border ${s.border}`}>
                    {s.state === 'open' ? 'Exploitable' : s.state === 'closed' ? 'Informational' : 'Ambiguous'}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-cyber-text-muted leading-relaxed"><strong className="text-white">Definition:</strong> {s.definition}</p>
                  <p className="text-xs text-cyber-text-muted leading-relaxed"><strong className="text-white">Behavior:</strong> {s.behavior}</p>
                  <p className="text-xs text-cyber-text-muted leading-relaxed"><strong className="text-white">What it means:</strong> {s.meaning}</p>
                  <code className="block text-xs font-mono text-cyber-green bg-cyber-bg border border-cyber-border rounded px-2 py-1 mt-2">
                    {s.example}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* State Transition Table */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>How Scan Types Produce Different States</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            The same port can produce different states depending on which scan technique you use. This table shows how Nmap classifies responses from each scan type.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm border border-cyber-border rounded-lg overflow-hidden">
              <thead className="bg-cyber-bg-card">
                <tr>
                  <th className="text-left px-4 py-3 text-cyber-text font-semibold">Scan Type</th>
                  <th className="text-left px-4 py-3 text-cyber-text font-semibold text-cyber-green">Open Response</th>
                  <th className="text-left px-4 py-3 text-cyber-text font-semibold text-cyber-red">Closed Response</th>
                  <th className="text-left px-4 py-3 text-cyber-text font-semibold text-cyber-amber">Filtered Response</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-border">
                {stateTransitions.map((st) => (
                  <tr key={st.scenario} className="hover:bg-cyber-bg-card/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-cyber-amber text-xs">{st.scenario}</td>
                    <td className="px-4 py-3 text-cyber-green text-xs font-mono">{st.open}</td>
                    <td className="px-4 py-3 text-cyber-red text-xs font-mono">{st.closed}</td>
                    <td className="px-4 py-3 text-cyber-amber text-xs font-mono">{st.filtered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Reading Output */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Reading Nmap Output</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Nmap output follows a consistent format. Learning to read it quickly is essential during time-sensitive engagements like CTFs and live penetration tests.
          </p>

          <div className="mt-6 cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Output Format Breakdown</h3>
            <div className="space-y-3">
              <div className="p-3 rounded bg-cyber-bg border border-cyber-border">
                <code className="text-xs font-mono text-cyber-green block">
                  PORT    STATE    SERVICE    VERSION
                </code>
                <code className="text-xs font-mono text-cyber-text-muted block mt-1">
                  22/tcp  open     ssh        OpenSSH 8.2p1 Ubuntu 4ubuntu0.5
                </code>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-cyber-text-muted">
                <div><strong className="text-white">PORT:</strong> Protocol (tcp/udp/sctp) and port number</div>
                <div><strong className="text-white">STATE:</strong> One of the six port states</div>
                <div><strong className="text-white">SERVICE:</strong> Best guess from nmap-services database</div>
                <div><strong className="text-white">VERSION:</strong> Only shown with -sV or -A enabled</div>
              </div>
            </div>
          </div>

          <Callout type="info" className="mt-4">
            The <strong className="text-white">service</strong> column is a best-effort guess based on the port number and the <InlineCode>nmap-services</InlineCode> file. It is often wrong if a service runs on a non-standard port. Always use <InlineCode>-sV</InlineCode> to confirm the actual service.
          </Callout>
        </motion.section>

        {/* Tips */}
        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Practical Tips</DocHeading>
          <div className="mt-4 space-y-3">
            <Callout type="tip">
              When you see <InlineCode>open|filtered</InlineCode>, try using <InlineCode>-sV</InlineCode> or <InlineCode>-sS</InlineCode> to get a more definitive result. Version detection sends application probes that often trigger responses from open services.
            </Callout>
            <Callout type="warning">
              Do not assume a <InlineCode>filtered</InlineCode> port is closed. It may be open behind a firewall. Document filtered ports separately — they represent potential attack surface that could become exploitable if the firewall rules change.
            </Callout>
            <Callout type="info">
              Use <InlineCode>--reason</InlineCode> to see exactly why Nmap classified each port the way it did. This flag shows responses like "syn-ack", "reset", "no-response", or "admin-prohibited" for every port.
            </Callout>
          </div>

          <div className="mt-8 flex gap-3">
            <a href="/nmap/timing" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Timing Templates <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/nmap/scan-types" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text-muted hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
  );
}
