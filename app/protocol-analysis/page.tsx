import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import Callout from '@/components/base/Callout';

const protocols = [
  {
    name: 'TCP',
    short: 'Transmission Control Protocol',
    filters: [
      { syntax: 'tcp', desc: 'All TCP traffic' },
      { syntax: 'tcp.port == 80', desc: 'TCP on port 80' },
      { syntax: 'tcp.flags.syn == 1', desc: 'TCP SYN packets' },
      { syntax: 'tcp.analysis.retransmission', desc: 'Retransmissions' },
      { syntax: 'tcp.analysis.lost_segment', desc: 'Lost segments' },
    ],
    fields: 'tcp.srcport, tcp.dstport, tcp.seq, tcp.ack, tcp.len, tcp.flags, tcp.window_size',
  },
  {
    name: 'UDP',
    short: 'User Datagram Protocol',
    filters: [
      { syntax: 'udp', desc: 'All UDP traffic' },
      { syntax: 'udp.port == 53', desc: 'UDP DNS traffic' },
      { syntax: 'udp.length > 100', desc: 'Large UDP packets' },
    ],
    fields: 'udp.srcport, udp.dstport, udp.length, udp.checksum',
  },
  {
    name: 'HTTP',
    short: 'Hypertext Transfer Protocol',
    filters: [
      { syntax: 'http', desc: 'All HTTP traffic' },
      { syntax: 'http.request', desc: 'HTTP requests only' },
      { syntax: 'http.response', desc: 'HTTP responses only' },
      { syntax: 'http.request.method == "GET"', desc: 'GET requests' },
      { syntax: 'http.response.code == 404', desc: '404 Not Found responses' },
    ],
    fields: 'http.host, http.uri, http.method, http.user_agent, http.cookie, http.referer',
  },
  {
    name: 'DNS',
    short: 'Domain Name System',
    filters: [
      { syntax: 'dns', desc: 'All DNS traffic' },
      { syntax: 'dns.qry.name contains "google"', desc: 'Queries containing "google"' },
      { syntax: 'dns.flags.response == 0', desc: 'DNS queries (not responses)' },
      { syntax: 'dns.flags.rcode != 0', desc: 'DNS errors' },
    ],
    fields: 'dns.qry.name, dns.qry.type, dns.resp.name, dns.a, dns.aaaa',
  },
  {
    name: 'SSL/TLS',
    short: 'Secure Sockets Layer / Transport Layer Security',
    filters: [
      { syntax: 'ssl', desc: 'All SSL/TLS traffic' },
      { syntax: 'ssl.handshake.type == 1', desc: 'Client Hello' },
      { syntax: 'ssl.handshake.type == 2', desc: 'Server Hello' },
      { syntax: 'tls.handshake.extensions_sni', desc: 'SNI extension present' },
    ],
    fields: 'ssl.handshake.version, tls.handshake.ciphersuite, ssl.record.content_type',
  },
  {
    name: 'ICMP',
    short: 'Internet Control Message Protocol',
    filters: [
      { syntax: 'icmp', desc: 'All ICMP traffic' },
      { syntax: 'icmp.type == 8', desc: 'Echo Request (ping)' },
      { syntax: 'icmp.type == 0', desc: 'Echo Reply (ping reply)' },
      { syntax: 'icmp.type == 3', desc: 'Destination Unreachable' },
    ],
    fields: 'icmp.type, icmp.code, icmp.data_time, icmp.checksum',
  },
];

export default function ProtocolAnalysis() {
  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-4xl">
        <DocHeading level={1}>Protocol Analysis</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed text-lg">
          Wireshark dissects over 3,000 protocols. Understanding the most common ones — TCP, UDP, HTTP, DNS, and SSL/TLS — is essential for effective network troubleshooting and security analysis.
        </p>

        <Callout type="tip">
          To see all dissectors installed, go to <strong>Help &gt; About Wireshark &gt; Plugins</strong>. You can also write custom Lua dissectors for proprietary protocols.
        </Callout>

        {protocols.map((proto) => (
          <section key={proto.name} className="mt-10">
            <DocHeading level={2} id={proto.name.toLowerCase()}>
              {proto.name} — {proto.short}
            </DocHeading>

            <p className="text-cyber-text-muted leading-relaxed">
              Common display filters for {proto.name} analysis:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {proto.filters.map((f) => (
                <div key={f.syntax} className="cyber-card p-4">
                  <CodeBlock code={f.syntax} language="wireshark" showLineNumbers={false} />
                  <p className="text-sm text-cyber-text-muted mt-2">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 cyber-card p-4">
              <h4 className="text-sm font-semibold text-cyber-amber mb-2">Key Fields</h4>
              <p className="text-sm text-cyber-text-muted font-mono">{proto.fields}</p>
            </div>
          </section>
        ))}

        <DocHeading level={2} id="tcp-handshake">TCP Three-Way Handshake</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed">
          Understanding the TCP handshake is fundamental. Here is how Wireshark shows it:
        </p>

        <div className="mt-6 space-y-3">
          <div className="cyber-card p-4 flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-cyber-cyan/10 flex items-center justify-center text-cyber-cyan font-bold font-mono text-sm flex-shrink-0">1</div>
            <div>
              <h4 className="text-white font-semibold">SYN</h4>
              <p className="text-sm text-cyber-text-muted mt-1">Client sends a SYN packet to initiate connection. Filter: <InlineCode>tcp.flags.syn == 1 and tcp.flags.ack == 0</InlineCode></p>
            </div>
          </div>
          <div className="cyber-card p-4 flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-cyber-amber/10 flex items-center justify-center text-cyber-amber font-bold font-mono text-sm flex-shrink-0">2</div>
            <div>
              <h4 className="text-white font-semibold">SYN-ACK</h4>
              <p className="text-sm text-cyber-text-muted mt-1">Server responds with SYN and ACK flags. Filter: <InlineCode>tcp.flags.syn == 1 and tcp.flags.ack == 1</InlineCode></p>
            </div>
          </div>
          <div className="cyber-card p-4 flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-cyber-green/10 flex items-center justify-center text-cyber-green font-bold font-mono text-sm flex-shrink-0">3</div>
            <div>
              <h4 className="text-white font-semibold">ACK</h4>
              <p className="text-sm text-cyber-text-muted mt-1">Client sends final ACK. Connection established. Filter: <InlineCode>tcp.flags.syn == 0 and tcp.flags.ack == 1</InlineCode></p>
            </div>
          </div>
        </div>

        <DocHeading level={2} id="analyzing-conversations">Analyzing Conversations</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed">
          Use <strong>Statistics &gt; Conversations</strong> to see all unique connections between endpoints, sorted by packet count or bytes.
        </p>

        <Callout type="warning">
          When following a TCP stream (<strong>Right-click &gt; Follow &gt; TCP Stream</strong>), the display filter is automatically set to that stream. Click Clear to remove it.
        </Callout>
      </div>
  );
}