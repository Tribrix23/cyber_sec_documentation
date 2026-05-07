'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function JohnInstallationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-download-line" />
          Installation
        </div>
        <DocHeading level={1}>Installing John the Ripper</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          John the Ripper is available on most Unix-like systems via package managers, or you can build from source to get the latest Jumbo features and OpenCL GPU support.
        </p>
        <p className="text-cyber-text leading-relaxed mt-2">
          <strong className="text-cyber-green">Recommendation:</strong> For CTFs and password cracking competitions, always install the Jumbo version — it includes hundreds of additional hash formats and the full suite of extraction tools.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Linux (Kali / Debian / Ubuntu)</DocHeading>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">APT (Debian / Kali / Ubuntu)</h4>
            <CodeBlock code="sudo apt update && sudo apt install john" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Verify Installation</h4>
            <CodeBlock code="john --version" />
          </div>
          <Callout type="info">
            Kali Linux ships with <InlineCode>john</InlineCode> pre-installed and includes all hash extraction utilities.
          </Callout>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>macOS (Homebrew)</DocHeading>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Install via Homebrew</h4>
            <CodeBlock code="brew install john" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Run John</h4>
            <CodeBlock code="john --version" />
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Build from Source (Jumbo)</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Building from source gives you the most up-to-date Jumbo version with OpenCL GPU acceleration and the largest set of hash formats.
        </p>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Clone and Build</h4>
            <CodeBlock code={"git clone https://github.com/openwall/john.git\ncd john/src\n./configure && make -sj4"} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Quick Build with all optimizations</h4>
            <CodeBlock code={"cd john/src\n./configure --enable-opencl && make -s clean && make -sj$(nproc)"} />
          </div>
          <Callout type="tip">
            <InlineCode>--enable-opencl</InlineCode> enables GPU acceleration via OpenCL. You need OpenCL drivers installed for your GPU vendor.
          </Callout>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Windows</DocHeading>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Download Prebuilt Binaries</h4>
            <p className="text-sm text-cyber-text mb-2">
              Download John the Ripper Jumbo from the official site or use an automated binary release:
            </p>
            <CodeBlock code="https://www.openwall.com/john/k/john-1.9.0-jumbo-1.tar.xz" />
          </div>
          <Callout type="warning">
            The Windows version is distributed as a zip archive. Extract it to a folder (e.g., <InlineCode>C:\john</InlineCode>) and run <InlineCode>john.exe</InlineCode> from the command prompt.
          </Callout>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Verify Your Installation</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          After installation, verify that John is properly installed and see the build features:
        </p>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Show version and format count</h4>
            <CodeBlock code="john --version" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">List all supported hash formats</h4>
            <CodeBlock code="john --list=formats" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Show available cracking modes</h4>
            <CodeBlock code="john --list=modes" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">List external mode formats</h4>
            <CodeBlock code="john --list=external" />
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/john-the-ripper/single-crack-mode" className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg text-sm font-semibold hover:bg-cyber-cyan-dim transition-all whitespace-nowrap">
            Next: Single Crack Mode <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  );
}
