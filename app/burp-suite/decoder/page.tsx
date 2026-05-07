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

const supportedEncodings = [
  { name: 'URL Encode', decode: 'decode URL-encoded text', encode: 'URL-encode text', example: '%20%3C%3E' },
  { name: 'HTML Encode', decode: 'decode HTML entities', encode: 'HTML-encode special chars', example: '&lt;script&gt;' },
  { name: 'Base64', decode: 'decode Base64 to raw bytes', encode: 'encode to Base64', example: 'SGVsbG8gV29ybGQ=' },
  { name: 'Hex', decode: 'hex → ASCII/UTF-8', encode: 'ASCII/UTF-8 → hex', example: '48656c6c6f' },
  { name: 'ASCII Hex', decode: 'hex chars representing ASCII bytes', encode: 'ASCII bytes to hex chars', example: '0x48 0x65 0x6c 0x6c 0x6f' },
  { name: 'Octal', decode: 'octal → text', encode: 'text → octal', example: '110 145 154 154 157' },
  { name: 'Binary', decode: 'binary string → text', encode: 'text → binary string', example: '01001000 01100101' },
  { name: 'Gzip Compress', decode: 'decompress gzipped data', encode: 'compress with gzip', example: 'compressed blob' },
];

const commonUseCases = [
  {
    title: 'Decode obfuscated JavaScript',
    desc: 'Web applications often obfuscate malicious payloads. Use Decoder to reverse encoding chains.',
    steps: 'Paste obfuscated code → try Base64 decode → try URL decode → try HTML decode. Repeat until readable.',
  },
  {
    title: 'Decode JWT tokens',
    desc: 'JWTs use Base64URL encoding. Decode the payload to read claims before tampering.',
    steps: 'Copy JWT → Base64 decode (URL-safe variant) → JSON pretty-print → modify claims → re-encode.',
  },
  {
    title: 'Convert CSRF token to hex',
    desc: 'Some APIs require token in hexadecimal instead of raw. Use Encoder to convert.',
    steps: 'Paste token string → Hex encode → use hex value in request.',
  },
  {
    title: 'Decompress gzipped response',
    desc: 'Some servers gzip responses. View raw content by decompressing.',
    steps: 'Copy gzipped blob (from raw response view) → Gzip decompress → view clear text.',
  },
];

export default function BurpSuiteDecoderPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-code-box-line" />
          Data Encoding & Decoding
        </div>
        <DocHeading level={1}>Decoder</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          The <strong className="text-cyber-cyan">Decoder</strong> tool encodes and decodes data in various formats: URL, HTML, Base64, Hex, Octal, Binary, and Gzip. It also supports chaining multiple encoding operations, which is essential for decoding multi-layer obfuscated payloads.
        </p>
        <p className="text-cyber-text leading-relaxed mt-2">
          Encoded data hides malicious payloads from simple signature-based detection. The Decoder helps you see through the obfuscation during manual testing.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Using the Decoder</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Open Decoder from the top menu or the Window menu. Paste your data into the input field, choose the operation, and see the output live.
        </p>
        <div className="mt-4 space-y-4">
          {[
            { action: 'Decode', desc: 'Convert encoded data back to its original form. Use when you find suspicious encoded strings in requests/responses.' },
            { action: 'Encode', desc: 'Convert raw data into a specific format. Useful when you need to generate a payload that matches the target encoding.' },
            { action: 'Smart Decode', desc: 'Attempts multiple decode operations automatically to peel layers of obfuscation.' },
            { action: 'Smart Encode', desc: 'Auto-applies appropriate encoding based on context (URL, HTML, both).' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
              <span className="w-6 h-6 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 flex items-center justify-center text-cyber-amber text-xs flex-shrink-0">{i + 1}</span>
              <div>
                <h4 className="text-sm font-semibold text-white">{item.action}</h4>
                <p className="text-xs text-cyber-text mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Supported Encodings</DocHeading>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cyber-border">
                <th className="text-left py-2 px-3 text-cyber-text font-semibold">Encoding</th>
                <th className="text-left py-2 px-3 text-cyber-text font-semibold">Decode</th>
                <th className="text-left py-2 px-3 text-cyber-text font-semibold">Encode</th>
                <th className="text-left py-2 px-3 text-cyber-text font-semibold">Example</th>
              </tr>
            </thead>
            <tbody>
              {supportedEncodings.map((enc) => (
                <tr key={enc.name} className="border-b border-cyber-border/50">
                  <td className="py-2 px-3 text-cyber-cyan font-semibold">{enc.name}</td>
                  <td className="py-2 px-3 text-cyber-text text-xs">{enc.decode}</td>
                  <td className="py-2 px-3 text-cyber-text text-xs">{enc.encode}</td>
                  <td className="py-2 px-3 font-mono text-cyber-green text-xs">{enc.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Common Use Cases</DocHeading>
        <div className="mt-4 space-y-3">
          {commonUseCases.map((use, i) => (
            <div key={i} className="cyber-card p-4">
              <h4 className="text-sm font-semibold text-white">{use.title}</h4>
              <p className="text-xs text-cyber-text mt-1">{use.desc}</p>
              <div className="mt-2 p-2 rounded bg-cyber-bg border border-cyber-border">
                <span className="text-[10px] text-cyber-text-dim font-mono">STEPS</span>
                <p className="text-xs text-cyber-green mt-1">{use.steps}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Chaining Encodings</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Some payloads are encoded multiple times. The chain feature lets you apply several encodings in sequence:
        </p>
        <div className="mt-4 p-4 rounded-lg bg-cyber-bg border border-cyber-border font-mono text-xs text-cyber-green">
          <div className="mb-2 text-cyber-amber">Example: Double-encoded XSS payload</div>
          <div>Original: &lt;script&gt;alert(1)&lt;/script&gt;</div>
          <div>Step 1 (HTML encode): &amp;lt;script&amp;gt;alert(1)&amp;lt;/script&amp;gt;</div>
          <div>Step 2 (URL encode): %26lt%3Bscript%26gt%3Balert(1)%26lt%3B/script%26gt%3B</div>
          <div className="mt-2 text-cyber-text">To decode: paste double-encoded → URL decode → HTML decode → clean XSS.</div>
        </div>
        <Callout type="tip">
          Always try <strong>Smart Decode</strong> first — it automatically attempts common encoding layers and often reveals the underlying payload in one click.
        </Callout>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/burp-suite/comparer" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Comparer <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/burp-suite/scanner" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
