'use client'
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import Callout from '@/components/base/Callout';

export default function AdvancedFeatures() {
  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-4xl">
        <DocHeading level={1}>Advanced Features</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed text-lg">
          Once you are comfortable with basic captures and filters, Wireshark offers powerful advanced tools for deep analysis: stream reconstruction, expert info, statistics, and custom dissectors.
        </p>

        <DocHeading level={2} id="follow-streams">Follow TCP/UDP/SSL Streams</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed">
          Wireshark can reassemble the full payload of a conversation. Right-click any packet and select <strong>Follow &gt; TCP Stream</strong> (or UDP/SSL).
        </p>

        <div className="mt-4 cyber-card p-5">
          <h4 className="text-white font-semibold mb-3">Stream View Options</h4>
          <ul className="space-y-2 text-sm text-cyber-text-muted">
            <li className="flex items-start gap-2">
              <i className="ri-arrow-right-s-line text-cyber-cyan mt-0.5 flex-shrink-0" />
              <span><strong>Entire conversation</strong> — Both directions combined</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-arrow-right-s-line text-cyber-cyan mt-0.5 flex-shrink-0" />
              <span><strong>One direction</strong> — Client to server or server to client only</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-arrow-right-s-line text-cyber-cyan mt-0.5 flex-shrink-0" />
              <span><strong>ASCII / Hex / Raw</strong> — Switch between readable text and raw bytes</span>
            </li>
          </ul>
        </div>

        <CodeBlock
          code={`# Filter for a specific TCP stream
tcp.stream eq 5

# Filter for SSL stream (decrypted if keys provided)
ssl.stream eq 2`}
          language="wireshark"
          filename="Stream Filters"
        />

        <DocHeading level={2} id="expert-info">Expert Information</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed">
          <strong>Analyze &gt; Expert Information</strong> shows a categorized summary of anomalies: errors, warnings, notes, and chats. This is incredibly useful for spotting issues at a glance.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-cyber-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-cyber-cyan/10">
                <th className="text-left px-4 py-3 text-cyber-cyan font-semibold border-b border-cyber-border">Severity</th>
                <th className="text-left px-4 py-3 text-cyber-cyan font-semibold border-b border-cyber-border">Examples</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border">
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 text-cyber-red font-semibold">Error</td>
                <td className="px-4 py-3 text-cyber-text-muted">Malformed packets, checksum errors</td>
              </tr>
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 text-cyber-amber font-semibold">Warning</td>
                <td className="px-4 py-3 text-cyber-text-muted">Retransmissions, out-of-order packets, duplicate ACKs</td>
              </tr>
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 text-cyber-cyan font-semibold">Note</td>
                <td className="px-4 py-3 text-cyber-text-muted">TCP window full, zero-window probes</td>
              </tr>
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 text-cyber-green font-semibold">Chat</td>
                <td className="px-4 py-3 text-cyber-text-muted">Regular TCP segments, keep-alives</td>
              </tr>
            </tbody>
          </table>
        </div>

        <DocHeading level={2} id="io-graphs">IO Graphs</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed">
          <strong>Statistics &gt; IO Graphs</strong> lets you visualize traffic over time. You can plot packets per second, bytes per second, or apply custom display filters to each graph line.
        </p>

        <div className="cyber-card p-5 mt-4">
          <h4 className="text-white font-semibold mb-3">Graph Configuration Tips</h4>
          <ul className="space-y-2 text-sm text-cyber-text-muted">
            <li className="flex items-start gap-2">
              <i className="ri-arrow-right-s-line text-cyber-cyan mt-0.5 flex-shrink-0" />
              <span>Add multiple lines with different colors for different protocols</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-arrow-right-s-line text-cyber-cyan mt-0.5 flex-shrink-0" />
              <span>Use <InlineCode>tcp.analysis.retransmission</InlineCode> line to spot retransmission spikes</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-arrow-right-s-line text-cyber-cyan mt-0.5 flex-shrink-0" />
              <span>Change the Y-axis unit to bytes, packets, or logarithmic scale</span>
            </li>
          </ul>
        </div>

        <DocHeading level={2} id="statistics">Statistics Menu</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed">
          Wireshark provides built-in statistics for high-level overview. Here is a quick reference:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {[
            { name: 'Protocol Hierarchy', desc: 'Breakdown of protocols by packet count and bytes' },
            { name: 'Conversations', desc: 'Unique connections between endpoints' },
            { name: 'Endpoints', desc: 'All unique IPs, MACs, or ports seen' },
            { name: 'HTTP', desc: 'Request/response statistics, status codes, hosts' },
            { name: 'DNS', desc: 'Query/response statistics, RTT times' },
            { name: 'Flow Graph', desc: 'Visual timeline of a single TCP connection' },
            { name: 'TCP Stream Graphs', desc: 'Round-trip time, throughput, window scaling' },
            { name: 'Packet Lengths', desc: 'Distribution of packet sizes' },
          ].map((stat) => (
            <div key={stat.name} className="cyber-card p-4">
              <h4 className="text-white font-semibold text-sm">{stat.name}</h4>
              <p className="text-sm text-cyber-text-muted mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>

        <DocHeading level={2} id="decrypt-ssl">Decrypting SSL/TLS</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed">
          Wireshark can decrypt SSL/TLS if you provide the session keys. This requires capturing the (pre)-master secret.
        </p>

        <CodeBlock
          code={`# On the client machine, set environment variable before starting browser
export SSLKEYLOGFILE=/tmp/ssl-keys.log

# In Wireshark: Edit > Preferences > Protocols > TLS
# Point "(Pre)-Master-Secret log filename" to /tmp/ssl-keys.log`}
          language="bash"
          filename="SSL Decryption Setup"
        />

        <Callout type="danger">
          Only decrypt traffic you own or have explicit permission to analyze. Storing SSL keys creates a significant security risk — handle key log files with extreme care.
        </Callout>

        <DocHeading level={2} id="custom-dissectors">Custom Dissectors (Lua)</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed">
          For proprietary or unsupported protocols, you can write Lua dissectors. Place them in your Wireshark plugins directory.
        </p>

        <CodeBlock
          code={`-- Simple Lua dissector example
local my_proto = Proto("myproto", "My Protocol")
local f_type = ProtoField.uint8("myproto.type", "Type", base.DEC)
local f_data = ProtoField.bytes("myproto.data", "Data")
my_proto.fields = { f_type, f_data }

function my_proto.dissector(buffer, pinfo, tree)
    local subtree = tree:add(my_proto, buffer())
    subtree:add(f_type, buffer(0,1))
    subtree:add(f_data, buffer(1))
    pinfo.cols.protocol = "MYPROTO"
end

local udp_table = DissectorTable.get("udp.port")
udp_table:add(9999, my_proto)`}
          language="lua"
          filename="custom_dissector.lua"
        />
      </div>
  );
}