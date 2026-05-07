import Layout from '@/components/feature/Layout';
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/CodeBlock';
import InlineCode from '@/components/base/InlineCode';
import Callout from '@/components/base/Callout';

const faqs = [
  {
    q: 'Wireshark says "No interfaces found"',
    a: 'On Linux, run Wireshark with sudo or add your user to the wireshark group. On Windows, make sure Npcap/WinPcap is installed. On macOS, you may need to grant network permissions in System Preferences.',
  },
  {
    q: 'Captures are dropping packets',
    a: 'Increase the kernel buffer size with dumpcap -B 500. Disable DNS resolution (Edit > Preferences > Name Resolution). Use capture filters to reduce traffic volume.',
  },
  {
    q: 'Large capture files are slow to open',
    a: 'Use editcap to split large files: editcap -c 100000 big.pcap chunk.pcap. Or use ring buffers with dumpcap to keep files small.',
  },
  {
    q: 'Display filters are not working',
    a: 'Make sure you are using display filter syntax (ip.addr == x.x.x.x), not BPF syntax. Check for typos in field names — use auto-complete. Verify the protocol is actually present in your capture.',
  },
  {
    q: 'Cannot decrypt HTTPS traffic',
    a: 'Ensure you set SSLKEYLOGFILE before the TLS handshake happened. Wireshark cannot decrypt traffic without the key log or private key. The key file must be readable by your user.',
  },
  {
    q: 'Packets show as "Malformed"',
    a: 'This usually means the dissector is interpreting a packet incorrectly (e.g., wrong encapsulation type). Try changing the link-layer type: Edit > Preferences > Protocols > Data > "Dissector for data" or use "Decode As".',
  },
];

export default function Troubleshooting() {
  return (
    <Layout>
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-4xl">
        <DocHeading level={1}>Troubleshooting</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed text-lg">
          Common issues, solutions, and performance tips when working with Wireshark in production environments.
        </p>

        <DocHeading level={2} id="performance">Performance Optimization</DocHeading>

        <div className="space-y-4 mt-4">
          <div className="cyber-card p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded bg-cyber-cyan/10 flex items-center justify-center text-cyber-cyan flex-shrink-0">
                <i className="ri-speed-line" />
              </div>
              <h4 className="text-white font-semibold">Reduce Capture Load</h4>
            </div>
            <ul className="space-y-1.5 text-sm text-cyber-text-muted">
              <li>Use capture filters (BPF) to limit what enters the buffer</li>
              <li>Disable name resolution: <InlineCode>-n</InlineCode> flag or Preferences</li>
              <li>Use dumpcap instead of Wireshark GUI for long captures</li>
              <li>Set snapshot length to capture only headers: <InlineCode>-s 96</InlineCode></li>
            </ul>
          </div>

          <div className="cyber-card p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded bg-cyber-green/10 flex items-center justify-center text-cyber-green flex-shrink-0">
                <i className="ri-hard-drive-2-line" />
              </div>
              <h4 className="text-white font-semibold">Disk & Memory</h4>
            </div>
            <ul className="space-y-1.5 text-sm text-cyber-text-muted">
              <li>Write captures to fast SSDs, not network drives</li>
              <li>Use ring buffers to limit total file count and size</li>
              <li>Increase Wireshark memory limits for large captures</li>
              <li>Close unused capture files to free memory</li>
            </ul>
          </div>

          <div className="cyber-card p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded bg-cyber-amber/10 flex items-center justify-center text-cyber-amber flex-shrink-0">
                <i className="ri-eye-line" />
              </div>
              <h4 className="text-white font-semibold">Display Speed</h4>
            </div>
            <ul className="space-y-1.5 text-sm text-cyber-text-muted">
              <li>Use display filters to reduce visible packets</li>
              <li>Disable unnecessary columns in the packet list</li>
              <li>Turn off coloring rules if they slow rendering</li>
              <li>Use tshark for batch processing instead of GUI</li>
            </ul>
          </div>
        </div>

        <DocHeading level={2} id="common-errors">Common Errors & Fixes</DocHeading>
        <CodeBlock
          code={`# Permission denied on Linux — add user to wireshark group
sudo usermod -aG wireshark $USER
newgrp wireshark

# Npcap not found on Windows — reinstall with WinPcap compatibility
# Download from https://npcap.com

# Interface missing on macOS
sudo chmod o+r /dev/bpf*
sudo chown $USER /dev/bpf*

# Wireshark crashes with large file
# Split with editcap first, then open smaller chunks
editcap -c 50000 huge.pcap chunk.pcap`}
          language="bash"
          filename="Fixes"
        />

        <DocHeading level={2} id="faq">Frequently Asked Questions</DocHeading>
        <div className="space-y-4 mt-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="cyber-card p-5">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyber-cyan/10 flex items-center justify-center text-cyber-cyan font-bold font-mono text-xs flex-shrink-0 mt-0.5">
                  Q
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">{faq.q}</h4>
                  <p className="text-sm text-cyber-text-muted mt-2 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Callout type="info" title="Still Stuck?">
          The Wireshark community is incredibly active. Visit the <a href="https://ask.wireshark.org" target="_blank" rel="noopener noreferrer nofollow" className="text-cyber-cyan hover:underline">Ask Wireshark</a> forum or check the <a href="https://wiki.wireshark.org" target="_blank" rel="noopener noreferrer nofollow" className="text-cyber-cyan hover:underline">official wiki</a> for detailed guides.
        </Callout>
      </div>
    </Layout>
  );
}
