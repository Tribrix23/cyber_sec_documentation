import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import Callout from '@/components/base/Callout';

const tsharkOpts = [
  { flag: '-i <iface>', desc: 'Capture on specified interface' },
  { flag: '-f <filter>', desc: 'Capture filter (BPF syntax)' },
  { flag: '-Y <filter>', desc: 'Display filter after capture' },
  { flag: '-w <file>', desc: 'Write packets to file' },
  { flag: '-r <file>', desc: 'Read packets from file' },
  { flag: '-c <count>', desc: 'Stop after N packets' },
  { flag: '-a duration:<sec>', desc: 'Stop after N seconds' },
  { flag: '-T fields', desc: 'Output specified fields (use -e)' },
  { flag: '-e <field>', desc: 'Field to print with -T fields' },
  { flag: '-t <fmt>', desc: 'Time format (a=absolute, r=relative, d=delta)' },
  { flag: '-q', desc: 'Quiet mode (less output)' },
  { flag: '-V', desc: 'Verbose protocol tree' },
  { flag: '-x', desc: 'Print packet hex dump' },
  { flag: '-l', desc: 'Line-buffered output' },
];

const dumpcapOpts = [
  { flag: '-i <iface>', desc: 'Interface to capture on' },
  { flag: '-f <filter>', desc: 'Capture filter' },
  { flag: '-w <file>', desc: 'Output file' },
  { flag: '-b <opt>', desc: 'Ring buffer (multiple files)' },
  { flag: '-a <opt>', desc: 'Stop condition (filesize, duration, packets)' },
  { flag: '-B <size>', desc: 'Buffer size (in MB)' },
  { flag: '-p', desc: 'Don\'t capture in promiscuous mode' },
  { flag: '-s <snaplen>', desc: 'Snapshot length (bytes per packet)' },
];

const editcapOpts = [
  { flag: '-r', desc: 'Reverse selection (keep instead of delete)' },
  { flag: '-A <time>', desc: 'Start time for packet selection' },
  { flag: '-B <time>', desc: 'End time for packet selection' },
  { flag: '-c <count>', desc: 'Split file every N packets' },
  { flag: '-i <sec>', desc: 'Split file every N seconds' },
  { flag: '-F <fmt>', desc: 'Output format (pcap, pcapng, etc.)' },
  { flag: '-t <time>', desc: 'Adjust timestamps by offset' },
  { flag: '-E <err>', desc: 'Inject errors (for testing)' },
  { flag: '-d <dup>', desc: 'Remove duplicate packets within window' },
];

export default function CommandLine() {
  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-4xl">
        <DocHeading level={1}>Command Line Tools</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed text-lg">
          Wireshark includes powerful command-line utilities: <InlineCode>tshark</InlineCode> for capture and analysis, <InlineCode>dumpcap</InlineCode> for lightweight capture, and <InlineCode>editcap</InlineCode> for manipulating capture files.
        </p>

        <Callout type="info">
          Command-line tools are essential for automation, remote capture on headless servers, and processing very large capture files where GUI performance would suffer.
        </Callout>

        <DocHeading level={2} id="tshark">tshark — The CLI Wireshark</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed">
          tshark is the terminal version of Wireshark. It supports the same display filters, dissectors, and output formats.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-cyber-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-cyber-cyan/10">
                <th className="text-left px-4 py-3 text-cyber-cyan font-semibold border-b border-cyber-border">Flag</th>
                <th className="text-left px-4 py-3 text-cyber-cyan font-semibold border-b border-cyber-border">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border">
              {tsharkOpts.map((opt) => (
                <tr key={opt.flag} className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                  <td className="px-4 py-3 font-mono text-cyber-text whitespace-nowrap">{opt.flag}</td>
                  <td className="px-4 py-3 text-cyber-text-muted">{opt.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DocHeading level={3}>tshark Examples</DocHeading>
        <CodeBlock
          code={`# Capture on eth0, write to file
tshark -i eth0 -w capture.pcap

# Read file, apply display filter, show packet list
tshark -r capture.pcap -Y "http.request.method == \"GET\""

# Extract specific fields as CSV
tshark -r capture.pcap -T fields -e ip.src -e ip.dst -e tcp.port -E header=y -E separator=,

# Capture 100 packets and stop
tshark -i eth0 -c 100 -w test.pcap

# Capture for 60 seconds
tshark -i eth0 -a duration:60 -w timed.pcap

# Show protocol tree for a single packet
tshark -r capture.pcap -V -c 1

# Real-time DNS monitoring
tshark -i eth0 -f "udp port 53" -l`}
          language="bash"
          filename="tshark Examples"
        />

        <DocHeading level={2} id="dumpcap">dumpcap — Lightweight Capture</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed">
          dumpcap is a minimal capture tool without dissection capabilities. It is faster and uses less memory than tshark, making it ideal for long-running captures.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-cyber-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-cyber-green/10">
                <th className="text-left px-4 py-3 text-cyber-green font-semibold border-b border-cyber-border">Flag</th>
                <th className="text-left px-4 py-3 text-cyber-green font-semibold border-b border-cyber-border">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border">
              {dumpcapOpts.map((opt) => (
                <tr key={opt.flag} className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                  <td className="px-4 py-3 font-mono text-cyber-text whitespace-nowrap">{opt.flag}</td>
                  <td className="px-4 py-3 text-cyber-text-muted">{opt.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CodeBlock
          code={`# Continuous capture with ring buffer (10 files, 100MB each)
dumpcap -i eth0 -b filesize:100000 -b files:10 -w /var/cap/ring.pcap

# Capture only first 100 bytes of each packet (snaplen)
dumpcap -i eth0 -s 100 -w small.pcap

# Stop after 1GB
dumpcap -i eth0 -a filesize:1000000 -w big.pcap

# List available interfaces
dumpcap -D`}
          language="bash"
          filename="dumpcap Examples"
        />

        <DocHeading level={2} id="editcap">editcap — File Manipulation</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed">
          editcap manipulates pcap and pcapng files: split, merge, time-shift, deduplicate, and convert formats.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-cyber-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-cyber-amber/10">
                <th className="text-left px-4 py-3 text-cyber-amber font-semibold border-b border-cyber-border">Flag</th>
                <th className="text-left px-4 py-3 text-cyber-amber font-semibold border-b border-cyber-border">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border">
              {editcapOpts.map((opt) => (
                <tr key={opt.flag} className="bg-cyber-bg-card hover:bg-cyber-bg-hover transition-colors">
                  <td className="px-4 py-3 font-mono text-cyber-text whitespace-nowrap">{opt.flag}</td>
                  <td className="px-4 py-3 text-cyber-text-muted">{opt.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CodeBlock
          code={`# Remove first 1000 packets from a file
editcap capture.pcap trimmed.pcap 1-1000

# Keep only packets 100-200
editcap -r capture.pcap subset.pcap 100-200

# Split by time (1 hour per file)
editcap -i 3600 capture.pcap hourly.pcap

# Remove duplicates within 5-second window
editcap -d capture.pcap dedup.pcap

# Convert pcapng to classic pcap
editcap -F pcap capture.pcapng capture.pcap

# Adjust timestamps by +2 hours
editcap -t 7200 capture.pcap shifted.pcap`}
          language="bash"
          filename="editcap Examples"
        />

        <DocHeading level={2} id="mergecap">mergecap — Combine Files</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed">
          mergecap combines multiple capture files into one, sorting packets by timestamp.
        </p>
        <CodeBlock
          code={`# Merge all pcap files in directory
mergecap -w combined.pcap *.pcap

# Merge specific files with verbose output
mergecap -v -w out.pcap file1.pcap file2.pcap file3.pcap

# Merge without sorting (faster, preserves original order)
mergecap -a -w unsorted.pcap *.pcap`}
          language="bash"
          filename="mergecap"
        />

        <Callout type="tip" title="Performance Tip">
          For 24/7 production capture, use dumpcap with ring buffers. Then use tshark or editcap for post-processing. This pattern minimizes dropped packets and disk usage.
        </Callout>
      </div>
  );
}