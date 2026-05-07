'use client'
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

const platforms = [
  {
    name: 'Linux (Debian/Ubuntu/Kali)',
    icon: 'ri-ubuntu-line',
    methods: [
      {
        title: 'Using apt (Recommended)',
        desc: 'The standard package manager on Debian-based systems. Kali Linux includes Gobuster by default.',
        code: 'sudo apt update && sudo apt install gobuster',
      },
      {
        title: 'Verify Installation',
        desc: 'Check that Gobuster is installed correctly and view its version.',
        code: 'gobuster --version',
      },
    ],
  },
  {
    name: 'macOS',
    icon: 'ri-apple-line',
    methods: [
      {
        title: 'Using Homebrew (Recommended)',
        desc: 'Homebrew is the most popular package manager for macOS.',
        code: 'brew install gobuster',
      },
      {
        title: 'Verify Installation',
        desc: 'Confirm the installation works.',
        code: 'gobuster --version',
      },
    ],
  },
  {
    name: 'Windows',
    icon: 'ri-windows-line',
    methods: [
      {
        title: 'Download Prebuilt Binary',
        desc: 'Download the latest Windows binary from GitHub Releases. Extract and add to your PATH.',
        code: '# Download from: https://github.com/OJ/gobuster/releases',
      },
      {
        title: 'Using Chocolatey',
        desc: 'If you have Chocolatey installed, Gobuster can be installed via command line.',
        code: 'choco install gobuster',
      },
    ],
  },
  {
    name: 'Docker',
    icon: 'ri-ship-line',
    methods: [
      {
        title: 'Official Docker Image',
        desc: 'Run Gobuster in a container without installing it on your host.',
        code: 'docker run --rm ghcr.io/oj/gobuster dir -u http://10.0.0.1/ -w /wordlists/common.txt',
      },
    ],
  },
  {
    name: 'Build from Source',
    icon: 'ri-code-line',
    methods: [
      {
        title: 'Using Go Install',
        desc: 'If you have Go installed, you can install Gobuster directly from the source repository.',
        code: 'go install github.com/OJ/gobuster/v3@latest',
      },
      {
        title: 'Clone and Build',
        desc: 'Clone the repository and build manually for the latest development version.',
        code: 'git clone https://github.com/OJ/gobuster.git && cd gobuster && go build -o gobuster',
      },
    ],
  },
];

export default function GobusterInstallationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
            <i className="ri-download-line" />
            Gobuster Section 8 of 13
          </div>
          <DocHeading level={1}>Installation</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            Gobuster runs on all major operating systems. This guide covers installation on Linux, macOS, Windows, Docker, and building from source.
          </p>
        </motion.div>

        {platforms.map((plat) => (
          <motion.section key={plat.name} className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <DocHeading level={2}>{plat.name}</DocHeading>
            <div className="mt-4 space-y-4">
              {plat.methods.map((method) => (
                <div key={method.title}>
                  <h3 className="text-sm font-semibold text-white mb-2">{method.title}</h3>
                  <p className="text-xs text-cyber-text-muted mb-2">{method.desc}</p>
                  <CodeBlock code={method.code} />
                </div>
              ))}
            </div>
          </motion.section>
        ))}

        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>First Run</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            After installation, verify Gobuster works with a simple help command, then try your first scan.
          </p>
          <div className="mt-4 space-y-3">
            <CodeBlock code="gobuster --help" />
            <CodeBlock code="gobuster dir -u http://scanme.nmap.org/ -w /usr/share/wordlists/dirb/common.txt" />
          </div>

          <Callout type="info" className="mt-4">
            <InlineCode>gobuster --help</InlineCode> shows all available modes and flags. It is the fastest way to check what features your installed version supports.
          </Callout>

          <div className="mt-8 flex gap-3">
            <a href="/gobuster/examples" className="px-5 py-2.5 rounded-lg bg-cyber-red text-white text-sm font-semibold hover:bg-cyber-red/80 transition-all whitespace-nowrap">
              Next: Usage Examples <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/gobuster/wordlists" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text-muted hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
  );
}