'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const sections = [
  {
    path: '/burp-suite/installation',
    title: 'Installation & Setup',
    desc: 'Download, install, configure proxy, and install CA certificate for HTTPS interception.',
    icon: 'ri-download-line',
  },
  {
    path: '/burp-suite/proxy',
    title: 'Proxy',
    desc: 'Intercept, view, and modify HTTP/HTTPS traffic between browser and target. The core of Burp Suite.',
    icon: 'ri-exchange-line',
  },
  {
    path: '/burp-suite/repeater',
    title: 'Repeater',
    desc: 'Manually edit and resend individual requests. Essential for testing parameters, headers, and payloads.',
    icon: 'ri-repeat-line',
  },
  {
    path: '/burp-suite/intruder',
    title: 'Intruder',
    desc: 'Automated fuzzing and brute forcing with four attack modes: Sniper, Battering Ram, Pitchfork, Cluster Bomb.',
    icon: 'ri-sword-line',
  },
  {
    path: '/burp-suite/scanner',
    title: 'Scanner',
    desc: 'Automated vulnerability detection for OWASP Top 10 issues. Active and passive scanning modes (Pro feature).',
    icon: 'ri-scan-line',
  },
  {
    path: '/burp-suite/decoder',
    title: 'Decoder',
    desc: 'Encode and decode data: URL, Base64, HTML, Hex, Gzip. Chain operations for complex obfuscation.',
    icon: 'ri-code-box-line',
  },
  {
    path: '/burp-suite/comparer',
    title: 'Comparer',
    desc: 'Visually compare two responses to spot differences. Useful for blind injection detection.',
    icon: 'ri-arrow-left-right-line',
  },
  {
    path: '/burp-suite/extensions',
    title: 'Extensions',
    desc: 'Must-have BApps: Turbo Intruder, Logger++, Autorize, JWT Editor, Active Scan++, Param Miner, and more.',
    icon: 'ri-apps-line',
  },
  {
    path: '/burp-suite/workflow',
    title: 'Testing Workflow',
    desc: 'Systematic approach: proxy → reconnaissance → manual testing (Repeater) → automated attacks (Intruder) → scan.',
    icon: 'ri-road-map-line',
  },
  {
    path: '/burp-suite/command-builder',
    title: 'Configuration Builder',
    desc: 'Interactive tool to configure proxy settings, scope, and generate ready-to-use setup commands.',
    icon: 'ri-tools-line',
  },
  {
    path: '/burp-suite/examples',
    title: 'Examples',
    desc: 'Real-world testing scenarios: SQL injection, XSS, authentication bypass, SSRF with step-by-step commands.',
    icon: 'ri-file-list-line',
  },
  {
    path: '/burp-suite/pro-tips',
    title: 'Pro Tips',
    desc: 'Expert advice on scope management, Collaborator, session handling, bypassing WAFs, and efficient testing strategies.',
    icon: 'ri-lightbulb-line',
  },
  {
    path: '/burp-suite/quiz',
    title: 'Burp Suite Quiz',
    desc: 'Test your knowledge with 20 multiple-choice questions covering all Burp Suite tools and workflows.',
    icon: 'ri-questionnaire-line',
  },
  {
    path: '/burp-suite/lab',
    title: 'Burp Suite Lab',
    desc: 'Hands-on exercises where you configure Burp, intercept requests, fuzz parameters, and identify vulnerabilities.',
    icon: 'ri-flask-line',
  },
];

export default function BurpSuiteLandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-bug-line" />
            Web Application Security Testing
          </div>
          <DocHeading level={1}>Burp Suite</DocHeading>
          <p className="text-cyber-text leading-relaxed mt-3 text-lg">
            <strong className="text-cyber-cyan">Burp Suite</strong> by PortSwigger is the industry-standard platform for web application security testing. It acts as an intercepting proxy between your browser and the target, allowing you to inspect, modify, and replay HTTP/HTTPS traffic to discover vulnerabilities like SQL injection, XSS, SSRF, and more.
          </p>
          <p className="text-cyber-text leading-relaxed mt-3 text-lg">
            Burp Suite combines a powerful proxy, an automated scanner, a manual testing workbench (Repeater), a brute-forcing engine (Intruder), and hundreds of extensions into a unified platform used by penetration testers, bug bounty hunters, and security researchers worldwide.
          </p>
        </motion.div>

        <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-lg font-semibold text-white mb-4">Module Sections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sections.map((s) => (
              <a
                key={s.path}
                href={s.path}
                className="cyber-card p-4 hover:border-cyber-amber/50 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-cyber-bg-card border border-cyber-border flex items-center justify-center flex-shrink-0 text-cyber-amber group-hover:bg-cyber-amber/10 transition-colors">
                    <i className={s.icon} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-cyber-amber transition-colors">{s.title}</h3>
                    <p className="text-xs text-cyber-text mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </motion.section>

        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Start</h2>
          <div className="cyber-card p-5">
            <p className="text-sm text-cyber-text mb-3">
              New to Burp Suite? Start with these three sections in order:
            </p>
            <ol className="space-y-2">
              {[
                { num: '1', title: 'Installation & Setup', desc: 'Download, install, configure proxy, and trust the CA certificate.', path: '/burp-suite/installation' },
                { num: '2', title: 'Proxy Tool', desc: 'Learn to intercept, view, and modify HTTP/HTTPS traffic in real time.', path: '/burp-suite/proxy' },
                { num: '3', title: 'Repeater', desc: 'Master manual request editing and response analysis for vulnerability testing.', path: '/burp-suite/repeater' },
              ].map((step) => (
                <li key={step.num}>
                  <a href={step.path} className="flex items-center gap-3 p-3 rounded-lg bg-cyber-bg border border-cyber-border hover:border-cyber-amber/50 transition-all">
                    <span className="w-7 h-7 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 flex items-center justify-center text-cyber-amber text-xs font-bold flex-shrink-0">
                      {step.num}
                    </span>
                    <div>
                      <span className="text-sm font-semibold text-white">{step.title}</span>
                      <p className="text-xs text-cyber-text">{step.desc}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </motion.section>

        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Callout type="warning">
            Only test web applications you own or have explicit written permission to test. Unauthorized security testing is illegal.
          </Callout>
        </motion.section>

        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/burp-suite/installation" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Installation & Setup <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
        </motion.section>
      </div>
  );
}
