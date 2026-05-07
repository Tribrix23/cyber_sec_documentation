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

export default function BurpSuiteCommandBuilderPage() {
  const [proxyHost, setProxyHost] = useState('127.0.0.1');
  const [proxyPort, setProxyPort] = useState('8080');
  const [intercept, setIntercept] = useState('on');
  const [scope, setScope] = useState('https://target.com/*');
  const [browser, setBrowser] = useState('chrome');
  const [installed, setInstalled] = useState(false);
  const [copied, setCopied] = useState(false);

  const config = `# Burp Suite Proxy Configuration
Proxy: ${proxyHost}:${proxyPort}
Intercept: ${intercept}
Target Scope: ${scope}

# Browser setup (${browser})
# ${browser === 'chrome' ? 'Launch Chrome with proxy:' : 'Firefox proxy settings:'}
# ${browser === 'chrome' ? 'chromium.exe --proxy-server=http://' + proxyHost + ':' + proxyPort : 'Settings → Network → Manual: ' + proxyHost + ':' + proxyPort}

# Install CA Certificate
# 1. Browse to http://burpsuite
# 2. Download CA certificate
# 3. Import into browser/OS certificate store
# 4. Trust for website identification`;

  const copyConfig = () => {
    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-tools-line" />
          Interactive Tool
        </div>
        <DocHeading level={1}>Configuration Builder</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Configure your Burp Suite proxy setup interactively and copy ready-to-use configuration commands. Set proxy address, intercept mode, target scope, and browser-specific instructions.
        </p>
        <Callout type="info">
          This tool generates configuration summaries for documentation and setup scripts — not actual command-line arguments for launching Burp.
        </Callout>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="text-sm font-semibold text-white block mb-2">Proxy Host</label>
                <input
                  type="text"
                  value={proxyHost}
                  onChange={(e) => setProxyHost(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-amber"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm font-semibold text-white block mb-2">Proxy Port</label>
                <input
                  type="text"
                  value={proxyPort}
                  onChange={(e) => setProxyPort(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-amber"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm font-semibold text-white block mb-2">Intercept Mode</label>
                <div className="flex gap-2">
                  {['on', 'off'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setIntercept(m)}
                      className={`px-4 py-2 rounded-lg text-xs font-mono border transition-all whitespace-nowrap uppercase ${
                        intercept === m
                          ? 'bg-cyber-amber/10 border-cyber-amber text-cyber-amber'
                          : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-amber/50'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-cyber-text mt-1">"on" = intercept requests; "off" = pass through silently</p>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="text-sm font-semibold text-white block mb-2">Target Scope</label>
                <input
                  type="text"
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-amber"
                />
                <p className="text-xs text-cyber-text mt-1">Use * wildcard; exclude unwanted hosts</p>
              </div>
              <div className="mb-4">
                <label className="text-sm font-semibold text-white block mb-2">Browser</label>
                <div className="flex gap-2">
                  {['Chrome', 'Firefox', 'Edge'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBrowser(b.toLowerCase())}
                      className={`px-4 py-2 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${
                        browser === b.toLowerCase()
                          ? 'bg-cyber-amber/10 border-cyber-amber text-cyber-amber'
                          : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-amber/50'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="text-sm font-semibold text-white block mb-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={installed}
                    onChange={(e) => setInstalled(e.target.checked)}
                    className="w-4 h-4 rounded border-cyber-border bg-cyber-bg text-cyber-amber focus:ring-0"
                  />
                  CA certificate installed
                </label>
              </div>
            </div>
          </div>

          <div className="bg-cyber-bg border border-cyber-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-cyber-amber">Generated Configuration</span>
              <button
                type="button"
                onClick={copyConfig}
                className={`text-xs flex items-center gap-1 transition-colors ${copied ? 'text-cyber-green' : 'text-cyber-amber hover:text-cyber-amber-dim'}`}
              >
                <i className={copied ? 'ri-check-line' : 'ri-file-copy-line'} />
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <pre className="text-sm font-mono text-cyber-green whitespace-pre-wrap">{config}</pre>
          </div>

          {!installed && (
            <Callout type="warning" className="mt-4">
              <strong>Reminder:</strong> You still need to install the Burp CA certificate before HTTPS interception works. Follow link in the generated config.
            </Callout>
          )}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Quick Start Commands</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Common one-liners for Burp setup:
        </p>
        <div className="mt-4 space-y-3">
          {[
            {
              title: 'Launch Burp from CLI (Linux/macOS)',
              cmd: 'java -jar /path/to/burpsuite_pro.jar',
              note: 'Replace with actual path to your .jar file',
            },
            {
              title: 'Open Chrome with Burp proxy',
              cmd: 'chrome.exe --proxy-server="http://127.0.0.1:8080" --ignore-certificate-errors',
              note: 'Windows; disable cert errors for testing only',
            },
          ].map((ex, i) => (
            <div key={i} className="cyber-card p-4">
              <h4 className="text-sm font-semibold text-white">{ex.title}</h4>
              <div className="mt-2 p-2 bg-cyber-bg border border-cyber-border rounded">
                <CodeBlock code={ex.cmd} />
              </div>
              {ex.note && <p className="text-xs text-cyber-amber mt-2"><i className="ri-lightbulb-line mr-1" />{ex.note}</p>}
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/burp-suite/examples" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Examples <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/burp-suite/workflow" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
