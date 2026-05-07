'use client'
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import Callout from '@/components/base/Callout';

const comparisonOps = [
  { op: '==', desc: 'Equal' },
  { op: '!=', desc: 'Not equal' },
  { op: '>', desc: 'Greater than' },
  { op: '<', desc: 'Less than' },
  { op: '>=', desc: 'Greater than or equal' },
  { op: '<=', desc: 'Less than or equal' },
];

const logicalOps = [
  { op: 'and', desc: 'Both conditions must be true', example: 'ip.src == 192.168.1.1 and tcp.port == 80' },
  { op: 'or', desc: 'Either condition can be true', example: 'tcp.port == 80 or tcp.port == 443' },
  { op: 'not', desc: 'Negate the condition', example: 'not arp' },
  { op: 'in', desc: 'Check if value is in a set', example: 'tcp.port in {80 443 8080}' },
];

const commonFilters = [
  { syntax: 'ip.addr == 192.168.1.1', desc: 'Any packet involving IP 192.168.1.1' },
  { syntax: 'ip.src == 10.0.0.0/8', desc: 'Source is in 10.0.0.0/8 subnet' },
  { syntax: 'tcp.port == 443', desc: 'TCP traffic on port 443 (HTTPS)' },
  { syntax: 'udp.port == 53', desc: 'UDP traffic on port 53 (DNS)' },
  { syntax: 'dns', desc: 'All DNS traffic' },
  { syntax: 'http.request.method == "GET"', desc: 'HTTP GET requests' },
  { syntax: 'ssl.handshake.type == 1', desc: 'SSL/TLS Client Hello' },
  { syntax: 'frame.len > 1000', desc: 'Frames larger than 1000 bytes' },
  { syntax: 'tcp.analysis.retransmission', desc: 'TCP retransmissions' },
  { syntax: 'icmp.type == 8', desc: 'ICMP Echo Request (ping)' },
  { syntax: 'arp', desc: 'All ARP packets' },
  { syntax: 'ipv6', desc: 'All IPv6 traffic' },
];

export default function DisplayFilters() {
  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-4xl">
        <DocHeading level={1}>Display Filters</DocHeading>
        <p className="text-cyber-text leading-relaxed text-lg">
          Display filters control which packets are shown in the Wireshark GUI after capture. Unlike capture filters, they are incredibly flexible — you can filter by protocol fields, byte values, string matches, and even expressions.
        </p>

        <Callout type="info" title="Key Difference">
          Display filters operate on already-captured data. They do not affect what is recorded. Use the filter bar at the top of the packet list pane.
        </Callout>

        <DocHeading level={2} id="syntax">Filter Syntax</DocHeading>
        <p className="text-cyber-text leading-relaxed">
          A display filter expression consists of one or more primitives combined with logical operators.
        </p>

        <CodeBlock
          code={`[protocol].[field] [operator] [value]`}
          language="wireshark"
          filename="Syntax"
        />

        <DocHeading level={3}>Comparison Operators</DocHeading>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-cyber-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-cyber-cyan/10">
                <th className="text-left px-4 py-3 text-cyber-cyan font-semibold border-b border-cyber-border">Operator</th>
                <th className="text-left px-4 py-3 text-cyber-cyan font-semibold border-b border-cyber-border">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border">
              {comparisonOps.map((op) => (
                <tr key={op.op} className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                  <td className="px-4 py-3 font-mono text-cyber-text">{op.op}</td>
                  <td className="px-4 py-3 text-cyber-text">{op.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DocHeading level={3}>Logical Operators</DocHeading>
        <div className="space-y-3 my-6">
          {logicalOps.map((op) => (
            <div key={op.op} className="cyber-card p-4">
              <div className="flex items-center gap-3 mb-1">
                <code className="text-cyber-cyan font-mono font-semibold">{op.op}</code>
                <span className="text-sm text-cyber-text-dim">{op.desc}</span>
              </div>
              <CodeBlock code={op.example} language="wireshark" showLineNumbers={false} />
            </div>
          ))}
        </div>

        <DocHeading level={2} id="common-filters">Common Display Filters</DocHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
          {commonFilters.map((f) => (
            <div key={f.syntax} className="cyber-card p-4">
              <CodeBlock code={f.syntax} language="wireshark" showLineNumbers={false} />
              <p className="text-sm text-cyber-text mt-2">{f.desc}</p>
            </div>
          ))}
        </div>

        <DocHeading level={2} id="string-matching">String Matching</DocHeading>
        <p className="text-cyber-text leading-relaxed">
          You can match strings in packet payloads using <InlineCode>contains</InlineCode>, <InlineCode>matches</InlineCode>, or <InlineCode>~</InlineCode> (regex).
        </p>

        <CodeBlock
          code={`# Find HTTP requests containing "password"
http.request.method == "POST" and http contains "password"

# Match a regex in the payload
tcp.payload matches "(?i)login"

# DNS query containing a domain
dns.qry.name contains "google"

# Search any frame data for a string
frame contains "GET /admin"`}
          language="wireshark"
          filename="String Matching"
        />

        <DocHeading level={2} id="protocol-fields">Protocol Field Reference</DocHeading>
        <p className="text-cyber-text leading-relaxed">
          Wireshark exposes thousands of protocol fields. Use <strong>View &gt; Internals &gt; Supported Protocols</strong> or right-click any field in the packet details pane and select <strong>Prepare as Filter</strong>.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-cyber-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-cyber-cyan/10">
                <th className="text-left px-4 py-3 text-cyber-cyan font-semibold border-b border-cyber-border">Protocol</th>
                <th className="text-left px-4 py-3 text-cyber-cyan font-semibold border-b border-cyber-border">Useful Fields</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border">
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-text">ip</td>
                <td className="px-4 py-3 text-cyber-text">ip.src, ip.dst, ip.addr, ip.proto, ip.len, ip.ttl</td>
              </tr>
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-text">tcp</td>
                <td className="px-4 py-3 text-cyber-text">tcp.srcport, tcp.dstport, tcp.port, tcp.flags, tcp.seq, tcp.ack</td>
              </tr>
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-text">udp</td>
                <td className="px-4 py-3 text-cyber-text">udp.srcport, udp.dstport, udp.port, udp.length</td>
              </tr>
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-text">http</td>
                <td className="px-4 py-3 text-cyber-text">http.request, http.response, http.host, http.uri, http.method</td>
              </tr>
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-text">dns</td>
                <td className="px-4 py-3 text-cyber-text">dns.qry.name, dns.qry.type, dns.resp.name, dns.flags.response</td>
              </tr>
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-text">ssl / tls</td>
                <td className="px-4 py-3 text-cyber-text">ssl.handshake.type, tls.handshake.extensions_sni, ssl.record.content_type</td>
              </tr>
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-text">icmp</td>
                <td className="px-4 py-3 text-cyber-text">icmp.type, icmp.code, icmp.data_time</td>
              </tr>
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-text">frame</td>
                <td className="px-4 py-3 text-cyber-text">frame.number, frame.time, frame.len, frame.protocols</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="tip" title="Auto-Complete">
          Wireshark has excellent auto-complete for display filters. Start typing a protocol name and press Tab to see available fields.
        </Callout>

        <DocHeading level={2} id="coloring-rules">Coloring Rules with Filters</DocHeading>
        <p className="text-cyber-text leading-relaxed">
          You can colorize packets in the list using display filters via <strong>View &gt; Coloring Rules</strong>. For example:
        </p>
        <CodeBlock
          code={`# Color HTTP errors red
http.response.code >= 400

# Color DNS queries cyan
dns.flags.response == 0

# Color TCP retransmissions orange
tcp.analysis.retransmission`}
          language="wireshark"
          filename="Coloring"
        />
      </div>
  );
}