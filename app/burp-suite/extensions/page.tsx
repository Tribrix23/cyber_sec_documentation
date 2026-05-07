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

const essentialExtensions = [
  {
    name: 'Turbo Intruder',
    author: 'PortSwigger',
    desc: "High-speed HTTP fuzzing engine that bypasses Community edition's 1 req/sec throttle. Essential for brute-force attacks and massive parameter fuzzing.",
    install: 'BApp Store â†’ Turbo Intruder',
    tip: 'Attack speed limited only by your CPU/network, not Burp throttle.',
    icon: 'ri-rocket-line',
  },
  {
    name: 'Logger++',
    author: 'NetSPI',
    desc: 'Advanced logging with filtering, regex search, color highlighting, and grep capabilities. Much more powerful than the built-in HTTP history.',
    install: 'BApp Store â†’ Logger++',
    tip: 'Set filters to capture only relevant traffic; can handle millions of entries without slowing down.',
    icon: 'ri-file-list-3-line',
  },
  {
    name: 'Autorize',
    author: ' securityless',
    desc: 'Automated authorization testing. Detects IDOR and privilege escalation by automatically testing multiple user contexts on the same endpoint.',
    install: 'BApp Store â†’ Autorize',
    tip: 'Configure two or more user sessions; Autorize tests if lower-priv user can access higher-priv resources.',
    icon: 'ri-shield-keyhole-line',
  },
  {
    name: 'JWT Editor',
    author: 'PortSwigger',
    desc: 'Decode, modify, and sign JSON Web Tokens. Test for "none" algorithm, weak secrets, and token tampering vulnerabilities.',
    install: 'BApp Store â†’ JWT Editor',
    tip: 'Use the "Sign" tab to re-sign tampered tokens with your own secret if you discover weak signing keys.',
    icon: 'ri-key-line',
  },
  {
  name: 'Active Scan++',
  author: 'PortSwigger',
  desc: "Enhances Burp's built-in scanner with additional vulnerability checks not included in Pro by default.",
  install: 'BApp Store → Active Scan++',
  tip: 'Community edition users: this partially replaces the missing automated scanner.',
  icon: 'ri-search-eye-line',
},
{
  name: 'Param Miner',
  author: 'PortSwigger',
  desc: "Automatically discovers hidden parameters (including HTTP headers) by guessing common names. Finds parameters that affect application behavior.",
  install: 'BApp Store → Param Miner',
  tip: "Use wordlists like 'params.txt' from SecLists to attack hidden parameters like ?admin=true or X-Forwarded-For.",
  icon: 'ri-mine-line',
},
{
  name: 'Retire.js',
  author: 'Retire.js team',
  desc: 'Scans for outdated and vulnerable JavaScript libraries in web pages. Identifies known CVEs in client-side libraries.',
  install: 'BApp Store → Retire.js',
  tip: 'Great for finding jQuery, Angular, React vulnerabilities during spidering.',
  icon: 'ri-javascript-line',
},
{
  name: 'JSON Web Tokens',
  author: 'PortSwigger',
  desc: 'Comprehensive JWT analysis: decode, verify signatures, test "none" algorithm, weak secrets, and more.',
  install: 'BApp Store → JSON Web Tokens',
  tip: 'Different from JWT Editor — this extension focuses on analysis; JWT Editor on modification.',
  icon: 'ri-code-box-line',
},
{
  name: 'Hackvertor',
  author: 'securityenvoy',
  desc: 'Advanced encoding/decoding with custom tags. Chains multiple transforms and creates reusable payload templates.',
  install: 'BApp Store → Hackvertor',
  tip: 'Create custom payloads that automatically apply complex encoding chains before sending.',
  icon: 'ri-magic-line',
},
{
  name: 'Turbo Repeater',
  author: 'James Kettle',
  desc: 'Enhanced Repeater for rapid parameter enumeration. Batches multiple requests and processes responses automatically.',
  install: 'BApp Store → Turbo Repeater',
  tip: 'Alternative to Intruder for some fuzzing tasks with more flexible payload processing.',
  icon: 'ri-repeat-2-line',
},
{
  name: "How's MySSL?",
  author: 'Scott Helme',
  desc: 'Analyzes SSL/TLS configuration, prints cipher suites, certificate details, and security grades.',
  install: "BApp Store → How's MySSL?",
  tip: 'Quickly assess SSL strength without leaving Burp.',
  icon: 'ri-shield-check-line',
},
{
  name: 'Collaborator Everywhere',
  author: 'PortSwigger',
  desc: 'Injects Collaborator payloads into all out-of-band detection points automatically during scans.',
  install: 'BApp Store → Collaborator Everywhere',
  tip: 'Detects blind SSRF, XXE, and other OAST vulnerabilities without manual injection.',
  icon: 'ri-radar-line',
},
];

export default function BurpSuiteExtensionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-apps-line" />
          BApp Store
        </div>
        <DocHeading level={1}>Essential Extensions</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Burp Suite's power multiplies with extensions from the BApp Store (Extender tab). They add new features, improve workflows, and fill gaps in the base product. Community edition users can install many extensions (though some Pro-only features are restricted).
        </p>
        <Callout type="info">
          To install: <strong>Extender tab → BApp Store</strong>. Search for extension name, click Install, then the "Close" button appears → restart Burp to activate.
        </Callout>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Must-Have Extensions</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          These 12 extensions are essential for serious web application testing. Install them for every engagement:
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {essentialExtensions.map((ext, i) => (
            <div key={ext.name} className="cyber-card p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyber-bg border border-cyber-border flex items-center justify-center text-cyber-amber flex-shrink-0">
                  <i className={ext.icon} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-cyber-amber">{ext.name}</h4>
                    <span className="text-[10px] px-1 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-text-dim font-mono">{ext.author}</span>
                  </div>
                  <p className="text-xs text-cyber-text mt-1">{ext.desc}</p>
                  <div className="mt-2 p-2 rounded bg-cyber-bg border border-cyber-border">
                    <span className="text-[10px] text-cyber-text-dim font-mono block mb-1">INSTALL</span>
                    <InlineCode>{ext.install}</InlineCode>
                  </div>
                  <p className="text-xs text-cyber-amber mt-2">
                    <i className="ri-lightbulb-line mr-1" />
                    {ext.tip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Extension Categories</DocHeading>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { cat: 'Automation', exts: ['Turbo Intruder', 'Active Scan++', 'Autorize', 'Param Miner'] },
            { cat: 'Analysis', exts: ['Decoder enhanced', 'JSON Web Tokens', 'Hackvertor', 'Retire.js'] },
            { cat: 'Logging', exts: ['Logger++', 'HTTP Request Smuggler', 'SSL Detective'] },
            { cat: 'Collaboration', exts: ['Collaborator Everywhere', 'Cloud Scanner', 'Issue Hunter'] },
          ].map((cat) => (
            <div key={cat.cat} className="cyber-card p-4">
              <h4 className="text-sm font-semibold text-cyber-cyan">{cat.cat}</h4>
              <ul className="mt-2 space-y-1">
                {cat.exts.map((e) => (
                  <li key={e} className="text-xs text-cyber-text">
                    <i className="ri-check-line text-cyber-green mr-1" /> {e}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Managing Extensions</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Keep extensions organized and updated:
        </p>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Update Extension</h4>
            <p className="text-sm text-cyber-text">BApp Store shows updates. Click "Update" next to extension name.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Disable/Uninstall</h4>
            <p className="text-sm text-cyber-text">Extender tab â†’ Installed. Select extension â†’ "Disable" or "Uninstall".</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Manual Install</h4>
            <p className="text-sm text-cyber-text">Download .jar file â†’ Extender â†’ "Add" â†’ select file â†’ install.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Extension conflicts</h4>
            <p className="text-sm text-cyber-text">
              Some extensions interfere with each other. If behavior is odd, disable all, re-enable one by one to isolate.
            </p>
          </div>
        </div>
        <Callout type="warning">
          Only install extensions from trusted sources (BApp Store or official repos). Malicious extensions can steal your data or compromise your system.
        </Callout>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/burp-suite/workflow" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Testing Workflow <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/burp-suite/decoder" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
