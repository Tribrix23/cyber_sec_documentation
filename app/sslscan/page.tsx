'use client'
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

const cipherStrengths = [
  { strength: 'Preferred', color: 'text-cyber-green', desc: 'Strong modern cipher — recommended' },
  { strength: 'Accepted', color: 'text-cyber-amber', desc: 'Acceptable but not ideal' },
  { strength: 'Weak', color: 'text-cyber-red', desc: 'Weak cipher — should be disabled' },
  { strength: 'Broken', color: 'text-cyber-red', desc: 'Cryptographically broken — must be disabled immediately' },
];

const vulnerabilities = [
  { name: 'Heartbleed', cve: 'CVE-2014-0160', desc: 'OpenSSL memory disclosure bug. Allows reading server memory including private keys.', flag: '--heartbleed' },
  { name: 'POODLE', cve: 'CVE-2014-3566', desc: 'SSLv3 padding oracle attack. Requires SSLv3 to be enabled.', flag: 'Detected via SSLv3 support' },
  { name: 'BEAST', cve: 'CVE-2011-3389', desc: 'CBC mode attack against TLS 1.0. Mitigated by TLS 1.1+.', flag: 'Detected via TLS 1.0 + CBC ciphers' },
  { name: 'CRIME', cve: 'CVE-2012-4929', desc: 'Compression-based attack. Disable TLS compression to mitigate.', flag: 'Detected via compression support' },
  { name: 'DROWN', cve: 'CVE-2016-0800', desc: 'SSLv2 cross-protocol attack. Disable SSLv2 on all servers.', flag: 'Detected via SSLv2 support' },
  { name: 'LOGJAM', cve: 'CVE-2015-4000', desc: 'Weak Diffie-Hellman parameters. Use 2048-bit+ DH groups.', flag: 'Detected via weak DH params' },
];

const commonFlags = [
  { flag: '--tls1', desc: 'Only test TLS 1.0' },
  { flag: '--tls1_1', desc: 'Only test TLS 1.1' },
  { flag: '--tls1_2', desc: 'Only test TLS 1.2' },
  { flag: '--tls1_3', desc: 'Only test TLS 1.3' },
  { flag: '--ssl2', desc: 'Test SSLv2 (deprecated)' },
  { flag: '--ssl3', desc: 'Test SSLv3 (deprecated)' },
  { flag: '--heartbleed', desc: 'Test for Heartbleed vulnerability' },
  { flag: '--no-failed', desc: 'Do not show rejected ciphers' },
  { flag: '--show-certificate', desc: 'Show full certificate details' },
  { flag: '--show-client-cas', desc: 'Show trusted client CAs' },
  { flag: '--xml=<file>', desc: 'Save output to XML file' },
  { flag: '--json=<file>', desc: 'Save output to JSON file' },
  { flag: '-p <port>', desc: 'Specify port (default: 443)' },
  { flag: '--starttls-smtp', desc: 'Use STARTTLS for SMTP' },
  { flag: '--starttls-ftp', desc: 'Use STARTTLS for FTP' },
  { flag: '--starttls-imap', desc: 'Use STARTTLS for IMAP' },
  { flag: '--starttls-pop3', desc: 'Use STARTTLS for POP3' },
  { flag: '--ipv4', desc: 'Force IPv4 connection' },
  { flag: '--ipv6', desc: 'Force IPv6 connection' },
];

const examples = [
  { title: 'Basic scan of a website', cmd: 'sslscan target.com' },
  { title: 'Scan on non-standard port', cmd: 'sslscan --port=8443 target.com' },
  { title: 'Test for Heartbleed', cmd: 'sslscan --heartbleed target.com' },
  { title: 'Show only accepted ciphers', cmd: 'sslscan --no-failed target.com' },
  { title: 'Show full certificate details', cmd: 'sslscan --show-certificate target.com' },
  { title: 'Save results to XML', cmd: 'sslscan --xml=results.xml target.com' },
  { title: 'Scan SMTP with STARTTLS', cmd: 'sslscan --starttls-smtp mail.target.com:25' },
  { title: 'Scan IMAP with STARTTLS', cmd: 'sslscan --starttls-imap mail.target.com:143' },
  { title: 'Test only TLS 1.2 and 1.3', cmd: 'sslscan --tls1_2 --tls1_3 target.com' },
  { title: 'Full scan with all options', cmd: 'sslscan --heartbleed --show-certificate --no-failed target.com' },
];

const goodPractices = [
  { title: 'Disable SSLv2 and SSLv3', desc: 'Both are cryptographically broken. No modern server should support them.' },
  { title: 'Disable TLS 1.0 and 1.1', desc: 'Deprecated by RFC 8996. Use TLS 1.2 minimum, prefer TLS 1.3.' },
  { title: 'Use strong cipher suites', desc: 'Prefer ECDHE for key exchange and AES-GCM or ChaCha20 for encryption.' },
  { title: 'Enable HSTS', desc: 'HTTP Strict Transport Security prevents protocol downgrade attacks.' },
  { title: 'Use 2048-bit+ RSA or ECDSA keys', desc: 'Minimum 2048-bit RSA or 256-bit ECDSA for certificate keys.' },
  { title: 'Enable OCSP Stapling', desc: 'Improves certificate revocation checking performance and privacy.' },
];

export default function SSLScanPage() {
  const [builderTarget, setBuilderTarget] = useState('target.com');
  const [builderPort, setBuilderPort] = useState('443');
  const [builderFlags, setBuilderFlags] = useState<string[]>([]);
  const [builderStarttls, setBuilderStarttls] = useState('');
  const [builderOutput, setBuilderOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFlag = (flag: string) => {
    setBuilderFlags((prev) =>
      prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag]
    );
  };

  const getGeneratedCommand = () => {
    let cmd = 'sslscan';
    builderFlags.forEach((f) => { cmd += ` ${f}`; });
    if (builderStarttls) cmd += ` --starttls-${builderStarttls}`;
    if (builderOutput) cmd += ` --xml=${builderOutput}`;
    if (builderPort !== '443') cmd += ` --port=${builderPort}`;
    cmd += ` ${builderTarget}`;
    return cmd;
  };

  const copyCmd = () => {
    navigator.clipboard.writeText(getGeneratedCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-medium font-mono mb-4">
            <i className="ri-shield-keyhole-line" />
            SSL/TLS Scanner
          </div>
          <DocHeading level={1}>SSLScan</DocHeading>
           <p className="text-cyber-text leading-relaxed mt-3">
             <strong className="text-cyber-cyan">SSLScan</strong> is a fast SSL/TLS scanner that queries SSL/TLS services and reports the protocol versions, cipher suites, key exchange parameters, and certificate details.
            It also tests for known vulnerabilities like Heartbleed, POODLE, and BEAST.
            Essential for security audits and compliance checks.
          </p>
        </motion.div>

        {/* What it checks */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="overview">What SSLScan Checks</DocHeading>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Supported SSL/TLS protocol versions',
              'Accepted cipher suites and their strength',
              'Certificate details (issuer, expiry, SANs)',
              'Key exchange parameters (DH group size)',
              'Heartbleed vulnerability (CVE-2014-0160)',
              'Compression support (CRIME attack vector)',
              'Session renegotiation support',
              'STARTTLS support for email protocols',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-cyber-text">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-green flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Installation */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="installation">Installation</DocHeading>
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Linux (apt / Kali)</h4>
              <CodeBlock code="sudo apt install sslscan" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">macOS (Homebrew)</h4>
              <CodeBlock code="brew install sslscan" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">From Source</h4>
              <CodeBlock code={"git clone https://github.com/rbsec/sslscan.git\ncd sslscan\nmake static"} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Verify Installation</h4>
              <CodeBlock code="sslscan --version" />
            </div>
          </div>
        </motion.section>

        {/* Cipher Strength */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="ciphers">Cipher Strength Ratings</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3">
            SSLScan color-codes cipher suites by strength. Here is what each rating means:
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cipherStrengths.map((c) => (
              <div key={c.strength} className="cyber-card p-4">
                <span className={`text-sm font-bold ${c.color}`}>{c.strength}</span>
                <p className="text-xs text-cyber-text mt-1">{c.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Vulnerabilities */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="vulnerabilities">SSL/TLS Vulnerabilities Detected</DocHeading>
          <div className="mt-4 space-y-3">
            {vulnerabilities.map((v) => (
              <div key={v.name} className="cyber-card p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-cyber-red">{v.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyber-red/10 text-cyber-red border border-cyber-red/20 font-mono">{v.cve}</span>
                </div>
                <p className="text-xs text-cyber-text">{v.desc}</p>
                <p className="text-xs text-cyber-amber mt-1.5">
                  <i className="ri-information-line mr-1" />
                  Detection: {v.flag}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Common Flags */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="flags">Common Flags Reference</DocHeading>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {commonFlags.map((f) => (
              <div key={f.flag} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
                <span className="font-mono text-xs px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-cyber-cyan flex-shrink-0 whitespace-nowrap">{f.flag}</span>
                <span className="text-sm text-cyber-text">{f.desc}</span>
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

        {/* Best Practices */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="best-practices">SSL/TLS Best Practices</DocHeading>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {goodPractices.map((p) => (
              <div key={p.title} className="cyber-card p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <i className="ri-check-double-line text-cyber-green" />
                  <h4 className="text-sm font-semibold text-white">{p.title}</h4>
                </div>
                <p className="text-xs text-cyber-text">{p.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Interactive Builder */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="builder">Interactive Command Builder</DocHeading>
          <div className="mt-5 cyber-card p-5 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-semibold text-white block mb-2">Target Host</label>
                <input type="text" value={builderTarget} onChange={(e) => setBuilderTarget(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-green"
                  placeholder="target.com" />
              </div>
              <div>
                <label className="text-sm font-semibold text-white block mb-2">Port</label>
                <input type="text" value={builderPort} onChange={(e) => setBuilderPort(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-green"
                  placeholder="443" />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Options (click to toggle)</label>
              <div className="flex flex-wrap gap-2">
                {['--heartbleed', '--no-failed', '--show-certificate', '--tls1_2', '--tls1_3', '--ssl3', '--ipv4', '--ipv6'].map((f) => (
                  <button key={f} type="button" onClick={() => toggleFlag(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${builderFlags.includes(f) ? 'bg-cyber-green/10 border-cyber-green text-cyber-green' : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-green/50'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">STARTTLS Protocol (optional)</label>
              <div className="flex flex-wrap gap-2">
                {['', 'smtp', 'ftp', 'imap', 'pop3'].map((p) => (
                  <button key={p || 'none'} type="button" onClick={() => setBuilderStarttls(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${builderStarttls === p ? 'bg-cyber-green/10 border-cyber-green text-cyber-green' : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-green/50'}`}>
                    {p || 'None'}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-5">
              <label className="text-sm font-semibold text-white block mb-2">Output XML File (optional)</label>
              <input type="text" value={builderOutput} onChange={(e) => setBuilderOutput(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-green"
                placeholder="results.xml" />
            </div>
            <div className="bg-cyber-bg border border-cyber-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-cyber-green">Generated Command</span>
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
            <Callout type="tip">Use <InlineCode>--no-failed</InlineCode> to hide rejected ciphers and focus on what the server actually accepts.</Callout>
            <Callout type="info">SSLScan works on any TCP service with TLS — not just HTTPS. Use <InlineCode>--starttls-smtp</InlineCode> for mail servers.</Callout>
            <Callout type="tip">Export results to XML with <InlineCode>--xml=results.xml</InlineCode> for automated parsing and reporting.</Callout>
            <Callout type="warning">A server supporting TLS 1.0 or 1.1 is a finding in most compliance frameworks (PCI-DSS, HIPAA, SOC2).</Callout>
          </div>
        </motion.section>
      </div>
  );
}
