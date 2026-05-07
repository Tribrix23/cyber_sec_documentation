import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import Callout from '@/components/base/Callout';

const basicFilters = [
  { syntax: 'host 192.168.1.1', desc: 'Traffic to or from host 192.168.1.1' },
  { syntax: 'net 192.168.1.0/24', desc: 'Traffic to or from the 192.168.1.0/24 subnet' },
  { syntax: 'port 80', desc: 'Traffic on port 80 (HTTP)' },
  { syntax: 'portrange 1000-2000', desc: 'Traffic on ports 1000 through 2000' },
  { syntax: 'src host 10.0.0.1', desc: 'Traffic originating from 10.0.0.1' },
  { syntax: 'dst host 10.0.0.1', desc: 'Traffic destined for 10.0.0.1' },
  { syntax: 'src port 53', desc: 'Traffic from source port 53' },
  { syntax: 'dst port 443', desc: 'Traffic to destination port 443' },
];

const protocolFilters = [
  { syntax: 'tcp', desc: 'Only TCP traffic' },
  { syntax: 'udp', desc: 'Only UDP traffic' },
  { syntax: 'icmp', desc: 'Only ICMP (ping) traffic' },
  { syntax: 'arp', desc: 'Only ARP traffic' },
  { syntax: 'ip6', desc: 'Only IPv6 traffic' },
  { syntax: 'not arp', desc: 'Exclude ARP traffic' },
  { syntax: 'tcp or udp', desc: 'TCP or UDP traffic' },
  { syntax: 'not tcp port 80', desc: 'All traffic except TCP port 80' },
];

const advancedFilters = [
  { syntax: 'tcp[13] & 2 != 0', desc: 'TCP SYN packets only' },
  { syntax: 'tcp[13] & 16 != 0', desc: 'TCP ACK packets only' },
  { syntax: 'icmp[icmptype] == icmp-echo', desc: 'ICMP echo request (ping)' },
  { syntax: 'ether host 00:11:22:33:44:55', desc: 'Traffic to/from MAC address' },
  { syntax: 'len > 100', desc: 'Packets larger than 100 bytes' },
  { syntax: 'ip[2:2] > 576', desc: 'IP packets with total length > 576' },
];

export default function CaptureFilters() {
  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-4xl">
        <DocHeading level={1}>Capture Filters</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed text-lg">
          Capture filters are applied before Wireshark records packets. They use the Berkeley Packet Filter (BPF) syntax and are much faster than display filters because they drop packets at the kernel level.
        </p>

        <Callout type="info" title="Capture vs Display Filters">
          Capture filters decide what gets saved to disk. Display filters decide what you see on screen. Use capture filters when you know what you want and need to reduce file size or CPU load.
        </Callout>

        <DocHeading level={2} id="where-to-set">Where to Set Capture Filters</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed">
          Before starting a capture, enter your filter in the <strong>Capture Filter</strong> field at the top of the main window, next to the interface list. You can also set them via the command line.
        </p>

        <DocHeading level={2} id="basic-syntax">Basic Syntax</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed">
          BPF expressions consist of one or more primitives. Primitives usually consist of an identifier (name or number) preceded by one or more qualifiers.
        </p>

        <CodeBlock
          code="[qualifier] [identifier]"
          language="bpf"
          filename="BPF Syntax"
        />

        <DocHeading level={3}>Common Qualifiers</DocHeading>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-cyber-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-cyber-cyan/10">
                <th className="text-left px-4 py-3 text-cyber-cyan font-semibold border-b border-cyber-border">Qualifier</th>
                <th className="text-left px-4 py-3 text-cyber-cyan font-semibold border-b border-cyber-border">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border">
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-text">host</td>
                <td className="px-4 py-3 text-cyber-text-muted">IP or hostname</td>
              </tr>
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-text">net</td>
                <td className="px-4 py-3 text-cyber-text-muted">Network with optional mask (e.g., /24)</td>
              </tr>
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-text">port</td>
                <td className="px-4 py-3 text-cyber-text-muted">TCP or UDP port number</td>
              </tr>
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-text">portrange</td>
                <td className="px-4 py-3 text-cyber-text-muted">Range of ports</td>
              </tr>
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-text">src</td>
                <td className="px-4 py-3 text-cyber-text-muted">Source qualifier (can prefix host/port)</td>
              </tr>
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-text">dst</td>
                <td className="px-4 py-3 text-cyber-text-muted">Destination qualifier (can prefix host/port)</td>
              </tr>
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-text">ether</td>
                <td className="px-4 py-3 text-cyber-text-muted">Ethernet (MAC) address</td>
              </tr>
              <tr className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                <td className="px-4 py-3 font-mono text-cyber-text">proto</td>
                <td className="px-4 py-3 text-cyber-text-muted">Protocol (ip, ip6, arp, rarp, tcp, udp, icmp)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <DocHeading level={2} id="host-port-filters">Host & Port Filters</DocHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
          {basicFilters.map((f) => (
            <div key={f.syntax} className="cyber-card p-4 group">
              <CodeBlock code={f.syntax} language="bpf" showLineNumbers={false} />
              <p className="text-sm text-cyber-text-muted mt-2">{f.desc}</p>
            </div>
          ))}
        </div>

        <DocHeading level={2} id="protocol-filters">Protocol Filters</DocHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
          {protocolFilters.map((f) => (
            <div key={f.syntax} className="cyber-card p-4 group">
              <CodeBlock code={f.syntax} language="bpf" showLineNumbers={false} />
              <p className="text-sm text-cyber-text-muted mt-2">{f.desc}</p>
            </div>
          ))}
        </div>

        <DocHeading level={2} id="advanced-bpf">Advanced BPF Expressions</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed">
          You can combine primitives with logical operators: <InlineCode>and</InlineCode>, <InlineCode>or</InlineCode>, <InlineCode>not</InlineCode>, and <InlineCode>()</InlineCode> for grouping. You can also inspect raw packet bytes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
          {advancedFilters.map((f) => (
            <div key={f.syntax} className="cyber-card p-4 group">
              <CodeBlock code={f.syntax} language="bpf" showLineNumbers={false} />
              <p className="text-sm text-cyber-text-muted mt-2">{f.desc}</p>
            </div>
          ))}
        </div>

        <Callout type="tip" title="TCP Flags Cheat Sheet">
          TCP flags are in byte 13 of the TCP header: FIN=1, SYN=2, RST=4, PSH=8, ACK=16, URG=32. So <InlineCode>tcp[13] & 18 != 0</InlineCode> matches SYN-ACK packets.
        </Callout>

        <DocHeading level={2} id="common-examples">Common Real-World Examples</DocHeading>
        <CodeBlock
          code="# Capture only HTTP traffic from a specific host
tcp port 80 and host 192.168.1.50

# Capture DNS queries (UDP port 53) excluding a server
udp port 53 and not host 8.8.8.8

# Capture SSH traffic to or from any host
port 22

# Capture all traffic except your own machine
not host $(hostname -I | awk '{print $1}')

# Capture ICMP echo requests only
icmp[icmptype] == icmp-echo

# Capture all non-ARP traffic on a subnet
not arp and net 10.0.0.0/8

# Capture TCP traffic with the SYN flag set
tcp[13] & 2 != 0

# Capture traffic on multiple specific ports
port 80 or port 443 or port 22"
          language="bpf"
          filename="Examples"
        />

        <DocHeading level={2} id="cli-capture-filters">Using with tshark / dumpcap</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed">
          Capture filters work identically in command-line tools:
        </p>
        <CodeBlock
          code={`# tshark with capture filter
tshark -f "port 80" -i eth0

# dumpcap with capture filter
dumpcap -f "host 192.168.1.1" -i eth0 -w capture.pcap

# tcpdump (uses same BPF syntax)
tcpdump -i eth0 "tcp port 443 and host 10.0.0.5"`}
          language="bash"
          filename="CLI"
        />

        <Callout type="danger" title="Important Limitation">
          Capture filters cannot filter based on application-layer protocols (like HTTP method, DNS query name, or SSL certificate). For those, use display filters after capture.
        </Callout>
      </div> 
  );
}