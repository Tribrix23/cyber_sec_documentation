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

export default function BurpSuiteInstallationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-download-line" />
          Getting Started
        </div>
        <DocHeading level={1}>Installation & Setup</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Get Burp Suite up and running: download, install, configure your browser proxy, and install the Burp CA certificate to intercept HTTPS traffic.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Download Burp Suite</DocHeading>
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Official Download</h4>
            <p className="text-sm text-cyber-text mb-2">
              Download the latest version from <a href="https://portswigger.net/burp/releases" target="_blank" rel="noopener noreferrer nofollow" className="text-cyber-cyan hover:underline">portswigger.net/burp/releases</a>. Available for Windows, macOS, and Linux.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Editions</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { name: 'Community', price: 'Free', highlights: ['Proxy, Repeater, Decoder', 'Intruder (throttled)', 'Basic Scanner', 'Extensions (limited)'] },
                { name: 'Professional', price: '$449/yr', highlights: ['Full Intruder speed', 'Automated Scanner', 'Collaborator', 'All extensions', 'Project files'] },
                { name: 'Enterprise', price: 'Custom', highlights: ['CI/CD integration', 'Scheduled scans', 'Team management', 'API access', 'DAST platform'] },
              ].map((ed) => (
                <div key={ed.name} className="cyber-card p-4 border border-cyber-border">
                  <h4 className="text-sm font-semibold text-cyber-amber">{ed.name}</h4>
                  <p className="text-xs text-cyber-text-dim mt-1">{ed.price}</p>
                  <ul className="mt-2 space-y-1">
                    {ed.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-xs text-cyber-text">
                        <i className="ri-check-line text-cyber-green" /> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Installation</DocHeading>
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Linux (Kali / apt)</h4>
            <CodeBlock code="sudo apt update && sudo apt install burpsuite" />
            <p className="text-xs text-cyber-text mt-1">Kali Linux includes both Community and Professional editions.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">macOS (Homebrew)</h4>
            <CodeBlock code="brew install --cask burp-suite" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Windows ( executable )</h4>
            <p className="text-sm text-cyber-text mb-2">Download the .exe installer from the official site and run it.</p>
            <CodeBlock code="burpsuite_pro.exe" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Portable (any OS)</h4>
            <p className="text-sm text-cyber-text mb-2">Download the JAR file and run with Java:</p>
            <CodeBlock code="java -jar burpsuite_pro.jar" />
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Initial Configuration</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          After installation, you need to configure your browser to route traffic through Burp and trust its CA certificate for HTTPS interception.
        </p>
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Step 1: Start Burp Suite</h4>
            <p className="text-sm text-cyber-text">Launch Burp Suite from your applications menu or command line. It starts with the default temporary project.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Step 2: Configure Browser Proxy</h4>
            <CodeBlock code={`# Firefox: Settings > Network Settings > Manual Proxy Configuration
HTTP Proxy: 127.0.0.1
Port: 8080
Check "Also use this proxy for HTTPS"

# Or use FoxyProxy extension for quick switching`} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Step 3: Install Burp CA Certificate</h4>
            <p className="text-sm text-cyber-text mb-2">
              To intercept HTTPS, your browser must trust Burp's CA. Burp generates a self-signed certificate that you must install:
            </p>
            <CodeBlock code={`# Method 1: Navigate to http://burpsuite
# Click "CA Certificate" to download
# Firefox: Settings > Privacy > Certificates > View Certificates > Import
# Check "Trust this CA to identify websites"

# Method 2: Use the pre-generated cert file
# 1. Go to http://burpsuite/cert
# 2. Download the certificate
# 3. Import into browser/OS certificate store`} />
          </div>
        </div>
        <Callout type="tip" className="mt-4">
          Use the <strong>FoxyProxy</strong> browser extension to quickly switch between Burp proxy (127.0.0.1:8080) and direct connection without changing system settings each time.
        </Callout>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Verify Your Setup</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Test that Burp is properly intercepting traffic:
        </p>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">1. Enable Intercept</h4>
            <p className="text-xs text-cyber-text">In the Proxy tab, ensure "Intercept is on" is highlighted in red.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">2. Browse to an HTTP site</h4>
            <p className="text-xs text-cyber-text">Visit <InlineCode>http://example.com</InlineCode>. The request should appear in Burp's Intercept tab, waiting for your action.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">3. Forward the request</h4>
            <p className="text-xs text-cyber-text">Click "Forward" to let the request reach the server. The page loads in your browser.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">4. Check HTTP History</h4>
            <p className="text-xs text-cyber-text">Switch to the "HTTP history" tab to see all captured requests, including the one you just forwarded.</p>
          </div>
        </div>
        <Callout type="success">
          If you see the request in Intercept, Burp is working correctly! You are now ready to start testing.
        </Callout>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Common Issues</DocHeading>
        <div className="mt-4 space-y-3">
          {[
            { title: 'Cannot intercept HTTPS', desc: 'CA certificate not installed or not trusted. Install cert in browser and restart browser.' },
            { title: 'No requests appear in Proxy', desc: 'Browser proxy not configured. Check proxy settings point to 127.0.0.1:8080.' },
            { title: 'Burp not starting on port 8080', desc: 'Port already in use. Change proxy port in User Options > Connections.' },
            { title: 'SSLHandshake errors', desc: 'Target uses certificate pinning. You may need to disable pinning or use Burps SSL pass-through.' },
          ].map((issue, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
              <span className="w-6 h-6 rounded-full bg-cyber-red/10 border border-cyber-red/20 flex items-center justify-center text-cyber-red text-xs flex-shrink-0">{i + 1}</span>
              <div>
                <h4 className="text-sm font-semibold text-white">{issue.title}</h4>
                <p className="text-xs text-cyber-text mt-0.5">{issue.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/burp-suite/proxy" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Proxy Tool <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  );
}
