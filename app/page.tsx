'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const tools = [
  {
    name: 'Wireshark',
    tagline: 'Network Protocol Analyzer',
    description: 'Master packet capture, filters, protocol analysis, and command-line tools. From your first capture to advanced forensics.',
    icon: 'ri-radar-line',
    color: 'text-cyber-cyan',
    bg: 'bg-cyber-cyan/10',
    border: 'border-cyber-cyan/20',
    link: '/getting-started',
    sections: ['Capture Filters', 'Display Filters', 'Protocol Analysis', 'Tshark CLI'],
  },
  {
    name: 'Nmap',
    tagline: 'Network Scanner',
    description: 'Discover hosts, scan ports, detect versions, fingerprint OS, and run NSE scripts. The industry standard for reconnaissance.',
    icon: 'ri-shield-check-line',
    color: 'text-cyber-amber',
    bg: 'bg-cyber-amber/10',
    border: 'border-cyber-amber/20',
    link: '/nmap',
    sections: ['Scan Types', 'NSE Scripts', 'Stealth Scans', 'Command Builder'],
  },
  {
    name: 'Gobuster',
    tagline: 'Directory & Subdomain Bruteforcer',
    description: 'Find hidden directories, subdomains, virtual hosts, and S3 buckets. Fast Go-powered enumeration for pentesters.',
    icon: 'ri-folder-open-line',
    color: 'text-cyber-red',
    bg: 'bg-cyber-red/10',
    border: 'border-cyber-red/20',
    link: '/gobuster',
    sections: ['Dir Mode', 'DNS Mode', 'Vhost Mode', 'S3 & Fuzz'],
  },
  {
    name: 'John the Ripper',
    tagline: 'Password Cracker',
    description: 'Crack hashes, archives, documents, and passwords with wordlists, rules, and incremental brute force.',
    icon: 'ri-lock-unlock-line',
    color: 'text-cyber-green',
    bg: 'bg-cyber-green/10',
    border: 'border-cyber-green/20',
    link: '/john-the-ripper',
    sections: ['Single Mode', 'Wordlist', 'Incremental', 'Hash Extraction'],
  },
  {
    name: 'Burp Suite',
    tagline: 'Web App Security',
    description: 'Intercept, inspect, and modify HTTP/HTTPS traffic. Proxy, Repeater, Intruder, Scanner, and Decoder for web pentesting.',
    icon: 'ri-bug-line',
    color: 'text-cyber-amber',
    bg: 'bg-cyber-amber/10',
    border: 'border-cyber-amber/20',
    link: '/burp-suite',
    sections: ['Proxy', 'Repeater', 'Intruder', 'Scanner'],
  },
  {
    name: 'SQLMap',
    tagline: 'SQL Injection Tool',
    description: 'Automated SQL injection detection and exploitation. Enumerate databases, dump tables, and gain OS access.',
    icon: 'ri-database-2-line',
    color: 'text-cyber-red',
    bg: 'bg-cyber-red/10',
    border: 'border-cyber-red/20',
    link: '/sqlmap',
    sections: ['Techniques', 'Enumeration', 'Tamper Scripts', 'OS Shell'],
  },
  {
    name: 'SSLScan',
    tagline: 'SSL/TLS Scanner',
    description: 'Analyze SSL/TLS configurations, cipher suites, certificate chains, and detect vulnerabilities like Heartbleed.',
    icon: 'ri-shield-keyhole-line',
    color: 'text-cyber-green',
    bg: 'bg-cyber-green/10',
    border: 'border-cyber-green/20',
    link: '/sslscan',
    sections: ['Protocols', 'Ciphers', 'Certificates', 'Vulnerabilities'],
  },
  {
    name: 'Netcat',
    tagline: 'Networking Swiss Army Knife',
    description: 'Port scanning, banner grabbing, file transfer, reverse shells, bind shells, and network debugging with a single tool.',
    icon: 'ri-terminal-box-line',
    color: 'text-cyber-cyan',
    bg: 'bg-cyber-cyan/10',
    border: 'border-cyber-cyan/20',
    link: '/netcat',
    sections: ['Connect', 'Listen', 'Shells', 'Transfer'],
  },
  {
    name: 'Metasploit',
    tagline: 'Pentest Framework',
    description: 'The industry-standard framework for exploit development and execution. Thousands of modules, Meterpreter, and database integration.',
    icon: 'ri-fire-line',
    color: 'text-cyber-amber',
    bg: 'bg-cyber-amber/10',
    border: 'border-cyber-amber/20',
    link: '/metasploit',
    sections: ['Exploits', 'Payloads', 'Meterpreter', 'Database'],
  },
];

const stats = [
  { value: '9', label: 'Core Tools' },
  { value: '50+', label: 'Documentation Pages' },
  { value: '9', label: 'Command Builders' },
  { value: '90+', label: 'Quiz Questions' },
];

const quickLinks = [
  { id: 'getting-started', label: 'Getting Started', path: '/getting-started', desc: 'Install Wireshark and capture your first packets' },
  { id: 'nmap-builder', label: 'Nmap Command Builder', path: '/nmap', desc: 'Generate Nmap commands interactively' },
  { id: 'filter-builder', label: 'Filter Builder', path: '/filter-builder', desc: 'Build Wireshark display filters visually' },
  { id: 'sqlmap', label: 'SQLMap Interactive', path: '/sqlmap', desc: 'Configure SQL injection commands with builder' },
  { id: 'netcat', label: 'Netcat Builder', path: '/netcat', desc: 'Generate netcat connect/listen/shell commands' },
  { id: 'metasploit', label: 'Metasploit Workflow', path: '/metasploit', desc: 'Build exploit resource scripts step by step' },
  { id: 'wireshark-quiz', label: 'Wireshark Quiz', path: '/wireshark-quiz', desc: 'Test your Wireshark knowledge with 17 questions' },
  { id: 'nmap-quiz', label: 'Nmap Quiz', path: '/nmap/quiz', desc: 'Test your Nmap knowledge inline on the docs page' },
];

const typewriterLines = [
  'nmap -sS -T4 10.0.0.1',
  'gobuster dir -u http://target/ -w common.txt',
  'john --wordlist=rockyou.txt hashes.txt',
  'sqlmap -u "http://target.com/?id=1" --dbs',
  'nc -lvp 4444 -e /bin/bash',
  'msfconsole -q -r exploit.rc',
];

export default function Home() {
  const navigate = useRouter();
  const [typedLine, setTypedLine] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentLine = typewriterLines[typedLine];
    const speed = isDeleting ? 30 : 60;

    if (!isDeleting && typingIndex <= currentLine.length) {
      const timeout = setTimeout(() => {
        setTypedText(currentLine.slice(0, typingIndex));
        setTypingIndex((i) => i + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && typingIndex > currentLine.length) {
      const pause = setTimeout(() => setIsDeleting(true), 1500);
      return () => clearTimeout(pause);
    }

    if (isDeleting && typingIndex >= 0) {
      const timeout = setTimeout(() => {
        setTypedText(currentLine.slice(0, typingIndex));
        setTypingIndex((i) => i - 1);
      }, speed);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && typingIndex < 0) {
      setIsDeleting(false);
      setTypedLine((l) => (l + 1) % typewriterLines.length);
      setTypingIndex(0);
    }
  }, [typedLine, typingIndex, isDeleting]);

  return (
      <div>
        {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,217,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-cyber-cyan/5 blur-[100px]" />
        <div className="absolute bottom-10 left-40 w-48 h-48 rounded-full bg-cyber-green/5 blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-cyber-amber/3 blur-[120px] -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10">
              {/* Left Content */}
              <motion.div
                className="flex-1 max-w-2xl"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
                  Interactive Cybersecurity Documentation
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                  Master{' '}
                  <span className="text-cyber-cyan">Cybersecurity</span>
                  <br />
                  Tools & Techniques
                </h1>

                <p className="mt-5 text-lg text-cyber-text-muted leading-relaxed max-w-xl">
                  Comprehensive interactive documentation for 9 essential cybersecurity tools: Wireshark, Nmap, Gobuster, John the Ripper, Burp Suite, SQLMap, SSLScan, Netcat, and Metasploit.
                  Learn with command builders, live examples, hands-on quizzes, and lab exercises.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => navigate.push('/getting-started')}
                    className="px-6 py-3 bg-cyber-cyan text-cyber-bg font-semibold rounded-lg hover:bg-cyber-cyan-dim transition-all duration-200 flex items-center gap-2 whitespace-nowrap glow-cyan"
                  >
                    Get Started
                    <i className="ri-arrow-right-line" />
                  </button>
                </div>

                {/* Animated Stats */}
                <motion.div
                  className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {stats.map((stat, i) => (
                    <motion.div key={stat.label} variants={fadeUp}>
                      <motion.div
                        className="text-xl md:text-2xl font-bold text-white font-mono"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 200 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-xs text-cyber-text-dim mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right - Terminal visual */}
              <motion.div
                className="hidden lg:block flex-shrink-0 w-[480px]"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="code-block p-4 text-xs font-mono">
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-cyber-border">
                    <div className="w-3 h-3 rounded-full bg-cyber-red" />
                    <div className="w-3 h-3 rounded-full bg-cyber-amber" />
                    <div className="w-3 h-3 rounded-full bg-cyber-green" />
                    <span className="ml-2 text-cyber-text-dim">cybersec@devctr:~$</span>
                  </div>
                  <div className="space-y-1 text-cyber-text-muted min-h-[220px]">
                    <p><span className="text-cyber-cyan">cybersec@devctr</span>:<span className="text-cyber-amber">~</span>$ {typedText}<span className="inline-block w-2 h-4 bg-cyber-cyan ml-0.5 animate-pulse" /></p>
                    <p className="text-cyber-text-dim mt-4"># Tool Overview</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {tools.map((t) => (
                        <div key={t.name} className="flex items-center gap-2 p-2 rounded bg-cyber-bg/50 border border-cyber-border/50">
                          <i className={`${t.icon} ${t.color}`} />
                          <span className="text-cyber-text text-xs">{t.name}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-cyber-text-dim mt-3"># Interactive Features</p>
                    <p className="text-cyber-green mt-1"><i className="ri-check-line mr-1" />Command Builders</p>
                    <p className="text-cyber-green"><i className="ri-check-line mr-1" />Live Examples</p>
                    <p className="text-cyber-green"><i className="ri-check-line mr-1" />Knowledge Quizzes</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Showcase */}
      <section className="px-6 md:px-12 lg:px-16 py-16 border-t border-cyber-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-cyber-amber/10 text-cyber-amber text-xs font-medium font-mono mb-3">
              DOCUMENTED TOOLS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Nine Essential Tools</h2>
            <p className="mt-3 text-cyber-text-muted max-w-2xl mx-auto">
              Every tool documented from installation basics to advanced techniques, with interactive command builders and real-world examples.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {tools.map((tool) => (
              <motion.button
                key={tool.name}
                type="button"
                onClick={() => navigate.push(tool.link)}
                className="cyber-card p-6 text-left group cursor-pointer relative overflow-hidden"
                variants={fadeUp}
                whileHover={{ scale: 1.01, y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Hover glow effect */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${tool.bg} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-cyber-bg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${tool.color} ${tool.border} border`}>
                    <i className={`${tool.icon} text-2xl`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white group-hover:text-cyber-cyan transition-colors">
                        {tool.name}
                      </h3>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${tool.bg} ${tool.color} border ${tool.border}`}>
                        {tool.tagline}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-cyber-text-muted leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tool.sections.map((s) => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-text-dim">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs text-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore docs <i className="ri-arrow-right-line" />
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Features Banner */}
      <section className="px-6 md:px-12 lg:px-16 py-16 border-t border-cyber-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="cyber-card p-8 md:p-12 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-cyber-green/10 text-cyber-green text-xs font-medium font-mono mb-3">
                    INTERACTIVE
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Command Builders & Quizzes</h2>
                  <p className="mt-3 text-cyber-text-muted max-w-xl leading-relaxed">
                    Toggle flags, set targets, and generate ready-to-use commands for Nmap, Gobuster, John the Ripper, SQLMap, Netcat, SSLScan, and more.
                    Then test your knowledge with tool-specific quizzes and hands-on lab exercises.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => navigate.push('/nmap#builder')}
                      className="px-4 py-2 rounded-lg bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-sm font-medium hover:bg-cyber-amber/20 transition-all whitespace-nowrap"
                    >
                      <i className="ri-shield-check-line mr-1" />
                      Nmap Builder
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate.push('/sqlmap#builder')}
                      className="px-4 py-2 rounded-lg bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-sm font-medium hover:bg-cyber-red/20 transition-all whitespace-nowrap"
                    >
                      <i className="ri-database-2-line mr-1" />
                      SQLMap Builder
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate.push('/netcat#builder')}
                      className="px-4 py-2 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-sm font-medium hover:bg-cyber-cyan/20 transition-all whitespace-nowrap"
                    >
                      <i className="ri-terminal-box-line mr-1" />
                      Netcat Builder
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate.push('/sslscan#builder')}
                      className="px-4 py-2 rounded-lg bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-sm font-medium hover:bg-cyber-green/20 transition-all whitespace-nowrap"
                    >
                      <i className="ri-shield-keyhole-line mr-1" />
                      SSLScan Builder
                    </button>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-cyber-cyan/10 flex items-center justify-center">
                    <i className="ri-terminal-window-line text-3xl text-cyber-cyan" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Start Links */}
      <section className="px-6 md:px-12 lg:px-16 py-16 border-t border-cyber-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col lg:flex-row gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="lg:w-1/3">
              <span className="inline-block px-3 py-1 rounded-full bg-cyber-cyan/10 text-cyber-cyan text-xs font-medium font-mono mb-3">
                QUICK ACCESS
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Jump Right In</h2>
              <p className="mt-3 text-cyber-text-muted leading-relaxed">
                Pick a topic and start learning immediately. Each guide includes real examples, interactive builders, and hands-on quizzes.
              </p>
            </div>

            <motion.div
              className="lg:w-2/3 space-y-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {quickLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => navigate.push(link.path)}
                  className="w-full cyber-card px-5 py-4 flex items-center gap-4 text-left group cursor-pointer"
                  variants={fadeUp}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="text-cyber-text-dim font-mono text-sm w-6">{String(idx + 1).padStart(2, '0')}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium group-hover:text-cyber-cyan transition-colors">
                      {link.label}
                    </h4>
                    <p className="text-sm text-cyber-text-dim mt-0.5">{link.desc}</p>
                  </div>
                  <i className="ri-arrow-right-line text-cyber-text-dim group-hover:text-cyber-cyan transition-colors" />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 md:px-12 lg:px-16 py-16 border-t border-cyber-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="cyber-card p-8 md:p-12 text-center relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Start Your Cybersecurity Journey</h2>
              <p className="mt-3 text-cyber-text-muted max-w-xl mx-auto">
                Learn the fundamentals, master 9 essential tools, test your knowledge with quizzes, and practice with hands-on lab exercises.
              </p>
              <button
                type="button"
                onClick={() => navigate.push('/getting-started')}
                className="mt-6 px-6 py-3 bg-cyber-green text-cyber-bg font-semibold rounded-lg hover:bg-cyber-green-dim transition-all duration-200 flex items-center gap-2 mx-auto whitespace-nowrap glow-green"
              >
                <i className="ri-book-open-line" />
                Get Started
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 lg:px-16 py-8 border-t border-cyber-border bg-cyber-bg">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded overflow-hidden">
              <img
                src="https://public.readdy.ai/ai/img_res/cc10aa5d-f92d-40c5-8eda-b47e5becc5dd.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm text-cyber-text-dim">
              cybersec.devctr.com — Interactive Security Tool Docs
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-cyber-text-dim">
            <span>Not affiliated with any vendor</span>
            <span className="hidden sm:inline">|</span>
            <a href="https://www.wireshark.org" target="_blank" rel="noopener noreferrer nofollow" className="hover:text-cyber-cyan transition-colors">
              Wireshark
            </a>
            <a href="https://nmap.org" target="_blank" rel="noopener noreferrer nofollow" className="hover:text-cyber-cyan transition-colors">
              Nmap
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
