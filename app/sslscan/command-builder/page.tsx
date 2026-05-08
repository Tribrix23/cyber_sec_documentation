'use client'
import React, { useState, useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const protocolFlags = [
  { value: '--tls1', label: 'TLS 1.0' },
  { value: '--tls1_1', label: 'TLS 1.1' },
  { value: '--tls1_2', label: 'TLS 1.2' },
  { value: '--tls1_3', label: 'TLS 1.3' },
  { value: '--ssl2', label: 'SSLv2' },
  { value: '--ssl3', label: 'SSLv3' },
];

const vulnerabilityFlags = [
  { value: '--heartbleed', label: 'Heartbleed' },
  { value: '--show-certificate', label: 'Show Certificate' },
];

const outputFlags = [
  { value: '--no-failed', label: 'No Failed' },
];

const starttlsOpts = [
  { value: '--starttls-ftp', label: 'FTP' },
  { value: '--starttls-smtp', label: 'SMTP' },
  { value: '--starttls-imap', label: 'IMAP' },
  { value: '--starttls-pop3', label: 'POP3' },
  { value: '--starttls-xmpp', label: 'XMPP' },
  { value: '--starttls-xmpp-server', label: 'XMPP Server' },
  { value: '--starttls-ldap', label: 'LDAP' },
  { value: '--starttls-mysql', label: 'MySQL' },
  { value: '--starttls-postgres', label: 'PostgreSQL' },
  { value: '--starttls-redis', label: 'Redis' },
];

export default function SSLScanCommandBuilderPage() {
  const [target, setTarget] = useState('target.com');
  const [port, setPort] = useState('');
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [selectedVulns, setSelectedVulns] = useState<string[]>([]);
  const [selectedOutput, setSelectedOutput] = useState<string[]>([]);
  const [starttls, setStarttls] = useState('');
  const [ipv4, setIpv4] = useState(false);
  const [ipv6, setIpv6] = useState(false);
  const [xmlFile, setXmlFile] = useState('');
  const [jsonFile, setJsonFile] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleArray = <T,>(setArr: React.Dispatch<React.SetStateAction<T[]>>, val: T) => {
    setArr((prev) =>
      (prev as T[]).includes(val) ? (prev as T[]).filter((f) => f !== val) : [...(prev as T[]), val]
    );
  };

  const getCommand = () => {
    const parts = ['sslscan'];

    selectedProtocols.forEach((p) => parts.push(p));
    selectedVulns.forEach((v) => parts.push(v));
    selectedOutput.forEach((o) => parts.push(o));

    if (port) {
      parts.push(`--port=${port}`);
    }

    if (ipv4) parts.push('--ipv4');
    if (ipv6) parts.push('--ipv6');

    if (starttls) {
      parts.push(starttls);
    }

    if (xmlFile) {
      parts.push(`--xml=${xmlFile}`);
    }
    if (jsonFile) {
      parts.push(`--json=${jsonFile}`);
    }

    parts.push(target);

    return parts.join(' ');
  };

  const copyCommand = () => {
    navigator.clipboard.writeText(getCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-medium font-mono mb-4">
          <i className="ri-tools-line" />
          SSLScan Section 7 of 10
        </div>
        <DocHeading level={1}>SSLScan Command Builder</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Select options to generate SSLScan commands interactively. Build complex scans for SSL/TLS services.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-5 md:p-6">
          <div className="mb-4">
            <label className="text-sm font-semibold text-white block mb-2">Target Host</label>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-green"
              placeholder="target.com"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold text-white block mb-2">Port</label>
            <input
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-green"
              placeholder="443 (default)"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold text-white block mb-2">Protocol Versions</label>
            <div className="flex flex-wrap gap-2">
              {protocolFlags.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => toggleArray(setSelectedProtocols, f.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${
                    selectedProtocols.includes(f.value)
                      ? 'bg-cyber-green/10 border-cyber-green text-cyber-green'
                      : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-green/50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold text-white block mb-2">Vulnerability Tests</label>
            <div className="flex flex-wrap gap-2">
              {vulnerabilityFlags.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => toggleArray(setSelectedVulns, f.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${
                    selectedVulns.includes(f.value)
                      ? 'bg-cyber-green/10 border-cyber-green text-cyber-green'
                      : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-green/50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold text-white block mb-2">Output Options</label>
            <div className="flex flex-wrap gap-2">
              {outputFlags.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => toggleArray(setSelectedOutput, f.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${
                    selectedOutput.includes(f.value)
                      ? 'bg-cyber-green/10 border-cyber-green text-cyber-green'
                      : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-green/50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold text-white block mb-2">STARTTLS</label>
            <select
              value={starttls}
              onChange={(e) => setStarttls(e.target.value)}
              className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-green"
            >
              <option value="">None</option>
              {starttlsOpts.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold text-white block mb-2">Network</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-cyber-text cursor-pointer">
                <input
                  type="checkbox"
                  checked={ipv4}
                  onChange={(e) => setIpv4(e.target.checked)}
                  className="w-4 h-4 accent-cyber-green"
                />
                IPv4
              </label>
              <label className="flex items-center gap-2 text-sm text-cyber-text cursor-pointer">
                <input
                  type="checkbox"
                  checked={ipv6}
                  onChange={(e) => setIpv6(e.target.checked)}
                  className="w-4 h-4 accent-cyber-green"
                />
                IPv6
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold text-white block mb-2">XML Output File</label>
            <input
              type="text"
              value={xmlFile}
              onChange={(e) => setXmlFile(e.target.value)}
              className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-green"
              placeholder="results.xml"
            />
          </div>

          <div className="mb-5">
            <label className="text-sm font-semibold text-white block mb-2">JSON Output File</label>
            <input
              type="text"
              value={jsonFile}
              onChange={(e) => setJsonFile(e.target.value)}
              className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-green"
              placeholder="results.json"
            />
          </div>

          <div className="bg-cyber-bg border border-cyber-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-cyber-green uppercase tracking-wider">Generated Command</span>
              <button
                type="button"
                onClick={copyCommand}
                className="text-xs text-cyber-cyan hover:text-cyber-cyan-dim transition-colors flex items-center gap-1"
              >
                <i className={copied ? 'ri-check-line text-cyber-green' : 'ri-file-copy-line'} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <code className="text-sm font-mono text-cyber-green break-all">{getCommand()}</code>
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Callout type="tip">
          Combine <strong className="text-cyber-cyan">--tls1_2 --tls1_3</strong> to test only modern protocols. Use <strong className="text-cyber-cyan">--heartbleed</strong> to check for the Heartbleed vulnerability.
        </Callout>

        <div className="mt-8 flex gap-3">
          <a href="/sslscan/pro-tips" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Pro Tips <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sslscan/examples" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-green hover:text-cyber-green transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}