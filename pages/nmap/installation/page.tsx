import { useEffect } from 'react';
import Layout from '@/components/feature/Layout';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import InlineCode from '@/components/base/InlineCode';
import CodeBlock from '@/components/base/CodeBlock';
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
        desc: 'The standard package manager on Debian-based systems. Kali Linux includes Nmap by default.',
        code: 'sudo apt update && sudo apt install nmap',
      },
      {
        title: 'Verify Installation',
        desc: 'Check that Nmap is installed correctly and view its version.',
        code: 'nmap --version',
      },
      {
        title: 'Update Nmap',
        desc: 'Keep Nmap up to date for the latest scripts and features.',
        code: 'sudo apt update && sudo apt upgrade nmap',
      },
    ],
  },
  {
    name: 'Linux (RHEL/CentOS/Fedora)',
    icon: 'ri-server-line',
    methods: [
      {
        title: 'Using dnf/yum',
        desc: 'Fedora and newer RHEL/CentOS versions use dnf. Older CentOS versions use yum.',
        code: 'sudo dnf install nmap',
      },
      {
        title: 'Using yum (Legacy)',
        desc: 'For older CentOS and RHEL systems that do not have dnf.',
        code: 'sudo yum install nmap',
      },
    ],
  },
  {
    name: 'macOS',
    icon: 'ri-apple-line',
    methods: [
      {
        title: 'Using Homebrew (Recommended)',
        desc: 'Homebrew is the most popular package manager for macOS. If you do not have it, install from brew.sh first.',
        code: 'brew install nmap',
      },
      {
        title: 'Using MacPorts',
        desc: 'Alternative package manager for macOS.',
        code: 'sudo port install nmap',
      },
      {
        title: 'Install Nmap + Zenmap GUI',
        desc: 'Zenmap is the official Nmap GUI. It requires XQuartz on macOS.',
        code: 'brew install --cask nmap',
      },
    ],
  },
  {
    name: 'Windows',
    icon: 'ri-windows-line',
    methods: [
      {
        title: 'Download Installer',
        desc: 'Download the official Windows installer from nmap.org. The installer includes Nmap, Ncat, Ndiff, and Zenmap.',
        code: '# Download from: https://nmap.org/download.html',
      },
      {
        title: 'Using Chocolatey',
        desc: 'If you have Chocolatey package manager installed, you can install Nmap via command line.',
        code: 'choco install nmap',
      },
      {
        title: 'Using winget',
        desc: 'Windows Package Manager (winget) is built into Windows 10/11.',
        code: 'winget install Insecure.Nmap',
      },
    ],
  },
  {
    name: 'Docker',
    icon: 'ri-ship-line',
    methods: [
      {
        title: 'Official Nmap Docker Image',
        desc: 'Run Nmap in a container without installing it on your host system.',
        code: 'docker run --rm networkscanner/nmap -A scanme.nmap.org',
      },
      {
        title: 'Kali Linux Container',
        desc: 'Run Nmap from the official Kali Linux Docker image with all tools pre-installed.',
        code: 'docker run --rm -it kalilinux/kali-rolling nmap -A scanme.nmap.org',
      },
    ],
  },
];

const buildFromSource = [
  {
    step: '1. Install Dependencies',
    code: 'sudo apt install build-essential libssl-dev',
    desc: 'You need a C compiler, make, and the OpenSSL development libraries.',
  },
  {
    step: '2. Download Source',
    code: 'wget https://nmap.org/dist/nmap-7.94.tar.bz2',
    desc: 'Get the latest stable source tarball from nmap.org.',
  },
  {
    step: '3. Extract',
    code: 'tar -xjf nmap-7.94.tar.bz2 && cd nmap-7.94',
    desc: 'Extract the archive and enter the source directory.',
  },
  {
    step: '4. Configure',
    code: './configure',
    desc: 'Run the configure script to check your system and set build options.',
  },
  {
    step: '5. Compile',
    code: 'make',
    desc: 'Compile the source code. This may take several minutes.',
  },
  {
    step: '6. Install',
    code: 'sudo make install',
    desc: 'Install Nmap system-wide to /usr/local/bin and related directories.',
  },
];

export default function NmapInstallationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-download-line" />
            Nmap Section 8 of 13
          </div>
          <DocHeading level={1}>Installation</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            Nmap runs on all major operating systems. This guide covers installation on Linux distributions, macOS, Windows, Docker, and building from source.
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

        {/* Build from Source */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Build from Source</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Building from source gives you the latest features, custom compile options, and the ability to modify Nmap's behavior. This is recommended for developers and users who need cutting-edge features.
          </p>
          <div className="mt-6 space-y-4">
            {buildFromSource.map((bs) => (
              <div key={bs.step} className="cyber-card p-4">
                <h3 className="text-sm font-semibold text-white mb-2">{bs.step}</h3>
                <p className="text-xs text-cyber-text-muted mb-2">{bs.desc}</p>
                <CodeBlock code={bs.code} />
              </div>
            ))}
          </div>
          <Callout type="info" className="mt-4">
            After building from source, run <InlineCode>nmap --version</InlineCode> to confirm the installation. The output should show the version you compiled.
          </Callout>
        </motion.section>

        {/* Verify */}
        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Verification & First Scan</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            After installation, verify Nmap works by running a simple scan against scanme.nmap.org — a test server maintained by the Nmap project specifically for this purpose.
          </p>
          <div className="mt-4">
            <CodeBlock code="nmap scanme.nmap.org" />
          </div>
          <p className="text-sm text-cyber-text-muted mt-3">
            You should see output showing open ports, services, and possibly OS detection results. If this works, your Nmap installation is complete and functional.
          </p>

          <div className="mt-8 flex gap-3">
            <a href="/nmap/examples" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Usage Examples <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/nmap/nse-scripts" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text-muted hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}