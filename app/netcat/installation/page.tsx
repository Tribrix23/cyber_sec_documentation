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
        title: 'Install netcat-openbsd (Recommended)',
        desc: 'The OpenBSD version is most common on Debian-based systems. It provides the classic nc command with modern security.',
        code: 'sudo apt update && sudo apt install netcat-openbsd',
      },
      {
        title: 'Install ncat (Nmap project)',
        desc: 'Ncat is the Nmap version — feature-rich with SSL, proxy, and --exec support. Install from the nmap package.',
        code: 'sudo apt update && sudo apt install ncat',
      },
      {
        title: 'Install traditional netcat (legacy)',
        desc: 'GNU netcat-traditional includes the -e flag for shell execution but is no longer default on Debian/Ubuntu.',
        code: 'sudo apt update && sudo apt install netcat-traditional',
      },
      {
        title: 'Verify Installation',
        desc: 'Check which netcat variant is installed and its version.',
        code: 'nc -h 2>&1 | head -n 5',
      },
    ],
  },
  {
    name: 'Kali Linux',
    icon: 'ri-linux-line',
    methods: [
      {
        title: 'Netcat is Preinstalled',
        desc: 'Kali ships with OpenBSD netcat (nc) and Ncat (ncat) by default. No installation needed.',
        code: 'which nc && which ncat',
      },
      {
        title: 'Install if missing',
        desc: 'If for some reason netcat is not present, install both variants.',
        code: 'sudo apt update && sudo apt install netcat-openbsd ncat',
      },
    ],
  },
  {
    name: 'macOS',
    icon: 'ri-apple-line',
    methods: [
      {
        title: 'Using Homebrew (Recommended)',
        desc: 'macOS includes a BSD netcat, but Homebrew provides updated versions and ncat.',
        code: 'brew install netcat',
      },
      {
        title: 'Install Ncat via Homebrew',
        desc: 'Nmap includes ncat; install via brew for SSL and proxy support.',
        code: 'brew install nmap',
      },
      {
        title: 'Verify Installation',
        desc: 'macOS ships with BSD nc at /usr/bin/nc. Confirm with --help.',
        code: 'nc -h',
      },
    ],
  },
  {
    name: 'Windows',
    icon: 'ri-windows-line',
    methods: [
      {
        title: 'Using Nmap for Windows',
        desc: 'Download Nmap for Windows — it includes Ncat (ncat.exe). Add to PATH manually.',
        code: '# Download: https://nmap.org/download.html',
      },
      {
        title: 'Using WSL2',
        desc: 'If using Windows Subsystem for Linux, install the Linux netcat within WSL.',
        code: 'sudo apt install netcat-openbsd  # inside WSL',
      },
    ],
  },
  {
    name: 'Docker',
    icon: 'ri-ship-line',
    methods: [
      {
        title: 'Run netcat in container',
        desc: 'Use the alpine/netcat image to quickly spin up a test listener.',
        code: 'docker run --rm alpine/netcat -l -p 4444',
      },
      {
        title: 'Test connection from another container',
        desc: 'Run a second netcat client container to connect to the listener.',
        code: 'docker run --rm alpine/netcat CONTAINER_IP 4444',
      },
    ],
  },
];

export default function NetcatInstallationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-download-line" />
          Netcat Section 2 of 14
        </div>
        <DocHeading level={1}>Installation</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Netcat is available on nearly every operating system. Different implementations exist — OpenBSD netcat, GNU netcat, and Ncat (from the Nmap project) have slightly different features. This guide covers installation on Linux, macOS, Windows, and Docker.
        </p>
      </motion.div>

      {platforms.map((plat) => (
        <motion.section key={plat.name} className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>{plat.name}</DocHeading>
          <div className="mt-4 space-y-4">
            {plat.methods.map((method) => (
              <div key={method.title}>
                <h3 className="text-sm font-semibold text-white mb-2">{method.title}</h3>
                <p className="text-xs text-cyber-text mb-2">{method.desc}</p>
                <CodeBlock code={method.code} />
              </div>
            ))}
          </div>
        </motion.section>
      ))}

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Which Netcat Should I Use?</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Understanding the variants helps you choose the right tool:
        </p>
        <div className="mt-6 space-y-3">
          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-white mb-1">OpenBSD netcat (recommended for general use)</h3>
            <p className="text-xs text-cyber-text">
              Most Linux distributions and macOS include this by default. Secure, lightweight, but lacks <InlineCode>-e</InlineCode> for shell execution. Use <InlineCode>ncat</InlineCode> or <InlineCode>netcat-traditional</InlineCode> when you need <InlineCode>-e</InlineCode>.
            </p>
          </div>
          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-white mb-1">Ncat (Nmap project)</h3>
            <p className="text-xs text-cyber-text">
              Feature-rich: SSL, proxy, --exec (replaces -e), keep-open for multi-connection, and more. Best for penetration testing and advanced scenarios. Install by installing Nmap.
            </p>
          </div>
          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-white mb-1">GNU netcat-traditional (legacy)</h3>
            <p className="text-xs text-cyber-text">
              The original netcat with <InlineCode>-e</InlineCode> support. Not installed by default on modern Debian/Ubuntu due to security concerns. Explicitly install if you need shell execution with classic nc.
            </p>
          </div>
        </div>

        <Callout type="tip" className="mt-6">
          On most modern Linux distros, <InlineCode>nc</InlineCode> points to OpenBSD netcat. If you need <InlineCode>-e</InlineCode>, install <InlineCode>netcat-traditional</InlineCode> or use <InlineCode>ncat --exec</InlineCode> instead.
        </Callout>

        <div className="mt-8 flex gap-3">
          <a href="/netcat/basic-usage" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Basic Usage <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  );
}
