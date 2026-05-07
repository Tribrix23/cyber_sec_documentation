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

const scriptCategories = [
  {
    name: 'auth',
    desc: 'Tests authentication credentials and bypasses. Attempts to find weak or default credentials on services.',
    examples: ['ftp-anon', 'mongodb-databases', 'mysql-empty-password'],
  },
  {
    name: 'broadcast',
    desc: 'Discovers hosts not directly targetable by broadcasting on the local network segment.',
    examples: ['broadcast-ping', 'broadcast-netbios-master-browser'],
  },
  {
    name: 'brute',
    desc: 'Performs brute-force password guessing against services using wordlists.',
    examples: ['ssh-brute', 'ftp-brute', 'snmp-brute', 'telnet-brute'],
  },
  {
    name: 'default',
    desc: 'Run with -sC. Safe, non-intrusive scripts that provide useful information without risk.',
    examples: ['banner', 'smb-os-discovery', 'snmp-sysdescr'],
  },
  {
    name: 'discovery',
    desc: 'Enumerates network resources: users, shares, services, routes, and more.',
    examples: ['dns-brute', 'http-enum', 'smb-enum-shares', 'snmp-interfaces'],
  },
  {
    name: 'dos',
    desc: 'Tests for denial of service vulnerabilities. May crash services — use with caution.',
    examples: ['http-slowloris-check', 'dns-flood'],
  },
  {
    name: 'exploit',
    desc: 'Attempts to actively exploit vulnerabilities. High risk — only on authorized targets.',
    examples: ['ms-sql-shell', 'samba-vuln-cve-2012-1182'],
  },
  {
    name: 'external',
    desc: 'May send data to third-party databases or services (e.g., whois, geolocation).',
    examples: ['whois-ip', 'http-google-safe-browsing'],
  },
  {
    name: 'fuzzer',
    desc: 'Sends unexpected or malformed data to services to find parsing vulnerabilities.',
    examples: ['dns-fuzz', 'http-form-fuzzer'],
  },
  {
    name: 'intrusive',
    desc: 'Cannot be classified as safe. May crash services, consume resources, or modify data.',
    examples: ['memcached-info', 'ms-sql-empty-password'],
  },
  {
    name: 'malware',
    desc: 'Checks if the target is infected with malware or backdoors.',
    examples: ['smtp-strangeport', 'auth-spoof'],
  },
  {
    name: 'safe',
    desc: 'Designed not to crash services, consume excessive resources, or exploit security holes.',
    examples: ['http-title', 'ssl-cert', 'ssh-hostkey'],
  },
  {
    name: 'version',
    desc: 'Extension to version detection. Active probing for version info beyond nmap-service-probes.',
    examples: ['http-php-version', 'mysql-info'],
  },
  {
    name: 'vuln',
    desc: 'Checks for specific known vulnerabilities and reports CVE identifiers.',
    examples: ['vulners', 'ssl-heartbleed', 'http-csrf', 'smb-vuln-ms17-010'],
  },
];

const popularScripts = [
  {
    name: 'vulners',
    category: 'vuln',
    desc: 'Queries the Vulners.com vulnerability database using detected service versions to find matching CVEs. One of the most valuable scripts for quick vulnerability assessment.',
    usage: 'nmap --script vuln 10.0.0.1',
  },
  {
    name: 'ssl-enum-ciphers',
    category: 'safe',
    desc: 'Enumerates all SSL/TLS cipher suites supported by a target and grades them A through F. Essential for assessing SSL/TLS configuration strength.',
    usage: 'nmap --script ssl-enum-ciphers -p 443 10.0.0.1',
  },
  {
    name: 'http-title',
    category: 'safe',
    desc: 'Fetches the HTML title element from web servers. Simple but surprisingly useful for quick service identification and finding exposed admin panels.',
    usage: 'nmap --script http-title -p 80,8080 10.0.0.1',
  },
  {
    name: 'smb-os-discovery',
    category: 'default',
    desc: 'Discovers OS version, computer name, domain, and workgroup from SMB services. Works even when -O fails.',
    usage: 'nmap --script smb-os-discovery -p 445 10.0.0.1',
  },
  {
    name: 'dns-brute',
    category: 'discovery',
    desc: 'Brute-forces DNS hostnames using a wordlist. Excellent for subdomain enumeration during reconnaissance.',
    usage: 'nmap --script dns-brute --script-args dns-brute.domain=example.com',
  },
  {
    name: 'ftp-anon',
    category: 'safe',
    desc: 'Checks whether an FTP server allows anonymous login without credentials. Still surprisingly common on misconfigured servers.',
    usage: 'nmap --script ftp-anon -p 21 10.0.0.1',
  },
  {
    name: 'ssh-hostkey',
    category: 'safe',
    desc: 'Retrieves the SSH host key and shows its fingerprint, bit length, and type. Useful for tracking hosts and detecting man-in-the-middle risks.',
    usage: 'nmap --script ssh-hostkey -p 22 10.0.0.1',
  },
  {
    name: 'snmp-brute',
    category: 'brute',
    desc: 'Brute-forces SNMP community strings. Many organizations still use "public" or "private" — this script finds them fast.',
    usage: 'nmap --script snmp-brute -p 161 10.0.0.1',
  },
  {
    name: 'mysql-info',
    category: 'version',
    desc: 'Gathers MySQL server version, protocol info, thread count, and capability flags without authentication.',
    usage: 'nmap --script mysql-info -p 3306 10.0.0.1',
  },
  {
    name: 'http-enum',
    category: 'discovery',
    desc: 'Enumerates directories and applications on web servers by testing common URLs. A lightweight alternative to Gobuster for quick checks.',
    usage: 'nmap --script http-enum -p 80 10.0.0.1',
  },
  {
    name: 'smb-vuln-ms17-010',
    category: 'vuln',
    desc: 'Detects the EternalBlue vulnerability (MS17-010) in SMBv1. This was the exploit behind WannaCry and NotPetya ransomware outbreaks.',
    usage: 'nmap --script smb-vuln-ms17-010 -p 445 10.0.0.1',
  },
  {
    name: 'ssl-heartbleed',
    category: 'vuln',
    desc: 'Tests for the Heartbleed vulnerability (CVE-2014-0160) in OpenSSL. One of the most infamous bugs in TLS history.',
    usage: 'nmap --script ssl-heartbleed -p 443 10.0.0.1',
  },
];

const scriptPhases = [
  {
    phase: 'prerule',
    desc: 'Run before any host is scanned. Used for setup, validating arguments, or making external queries.',
    example: 'Pre-scan: whois lookup, wordlist loading',
  },
  {
    phase: 'hostrule',
    desc: 'Run after host discovery but before port scanning. Evaluates whether to scan the host at all.',
    example: 'Skip hosts that do not match a pattern',
  },
  {
    phase: 'portrule',
    desc: 'Run after port scanning against matching ports. The most common phase — most scripts use this.',
    example: 'Run http-title against all open HTTP ports',
  },
  {
    phase: 'postrule',
    desc: 'Run after all hosts and ports are scanned. Used for aggregation, reporting, and correlation.',
    example: 'Compare results across all scanned hosts',
  },
];

export default function NmapNseScriptsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-code-s-slash-line" />
            Nmap Section 7 of 13
          </div>
          <DocHeading level={1}>Nmap Scripting Engine (NSE)</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            The <strong className="text-white">Nmap Scripting Engine (NSE)</strong> is one of Nmap's most powerful features. It allows users to write and execute Lua scripts that interact with target services for vulnerability detection, service enumeration, brute forcing, and custom reconnaissance tasks. Hundreds of scripts ship with Nmap by default.
          </p>
        </motion.div>

        {/* What is NSE */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>What is NSE</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            NSE transforms Nmap from a port scanner into a full reconnaissance and vulnerability assessment platform. Scripts are written in Lua — a lightweight, embeddable scripting language — and can perform virtually any network interaction you can imagine.
          </p>
          <div className="mt-4 space-y-3">
            <Callout type="info">
              NSE scripts can run at four different phases of an Nmap scan: prerule (before scanning), hostrule (after host discovery), portrule (after port scanning), and postrule (after all scanning completes).
            </Callout>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {scriptPhases.map((sp) => (
              <div key={sp.phase} className="cyber-card p-4">
                <h3 className="text-sm font-semibold text-cyber-cyan mb-1">{sp.phase}</h3>
                <p className="text-xs text-cyber-text-muted leading-relaxed">{sp.desc}</p>
                <p className="text-xs text-cyber-amber mt-2"><i className="ri-lightbulb-line mr-1" />{sp.example}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Categories */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Script Categories</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            NSE scripts are organized into 14 categories. Understanding these categories helps you choose the right scripts for your engagement and avoid accidentally running dangerous scripts on production systems.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            {scriptCategories.map((cat) => (
              <div key={cat.name} className="cyber-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-green">{cat.name}</span>
                </div>
                <p className="text-xs text-cyber-text-muted leading-relaxed">{cat.desc}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {cat.examples.map((ex) => (
                    <span key={ex} className="text-[10px] px-1.5 py-0.5 rounded bg-cyber-bg-card text-cyber-text-dim">{ex}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Popular Scripts */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Essential NSE Scripts</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            These twelve scripts are the ones you will use most often in real-world engagements. Each includes a full description, category, and usage example.
          </p>
          <div className="mt-6 space-y-4">
            {popularScripts.map((script) => (
              <div key={script.name} className="cyber-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-green">{script.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyber-amber/10 text-cyber-amber border border-cyber-amber/20">{script.category}</span>
                </div>
                <p className="text-xs text-cyber-text-muted leading-relaxed">{script.desc}</p>
                <div className="mt-3 bg-cyber-bg border border-cyber-border rounded-lg p-3">
                  <span className="text-[10px] text-cyber-text-dim font-mono uppercase tracking-wider">Usage</span>
                  <code className="block text-xs font-mono text-cyber-green mt-1">{script.usage}</code>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Running Scripts */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Running NSE Scripts</DocHeading>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Run default scripts</h3>
              <CodeBlock code="nmap -sC 10.0.0.1" />
              <p className="text-xs text-cyber-text-muted mt-2">Equivalent to <InlineCode>--script=default</InlineCode>. Runs safe, non-intrusive scripts that provide useful information.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Run a specific script</h3>
              <CodeBlock code="nmap --script http-title 10.0.0.1" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Run all scripts in a category</h3>
              <CodeBlock code='nmap --script "vuln" 10.0.0.1' />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Run multiple scripts</h3>
              <CodeBlock code="nmap --script http-title,ssl-enum-ciphers,ftp-anon 10.0.0.1" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Run scripts with arguments</h3>
              <CodeBlock code='nmap --script dns-brute --script-args dns-brute.domain=example.com,dns-brute.threads=5' />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Update the script database</h3>
              <CodeBlock code="nmap --script-updatedb" />
            </div>
          </div>
        </motion.section>

        {/* Writing Scripts */}
        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Writing Custom NSE Scripts</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            NSE scripts are written in Lua. They follow a standard structure with descriptive fields, rule functions that determine when to run, and action functions that perform the actual work. Custom scripts are stored in <InlineCode>/usr/share/nmap/scripts/</InlineCode> or <InlineCode>~/.nmap/scripts/</InlineCode>.
          </p>
          <div className="mt-4">
            <CodeBlock code={`description = [[
  Custom script example that checks for a specific banner
]]

author = "Your Name"
license = "Same as Nmap"
categories = {"safe", "discovery"}

portrule = function(host, port)
  return port.number == 80 and port.protocol == "tcp"
end

action = function(host, port)
  local socket = nmap.new_socket()
  socket:connect(host, port)
  socket:send("HEAD / HTTP/1.0\\r\\n\\r\\n")
  local response = socket:receive_lines(1)
  socket:close()
  return response
end`} language="lua" filename="custom-script.nse" />
          </div>

          <Callout type="warning" className="mt-4">
            Always test custom scripts in a lab environment before using them on production systems. Poorly written scripts can crash services, generate excessive traffic, or produce false positives.
          </Callout>

          <div className="mt-8 flex gap-3">
            <a href="/nmap/installation" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Installation <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/nmap/flags" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text-muted hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
  );
}
