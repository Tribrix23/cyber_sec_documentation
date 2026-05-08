'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const socComponents = [
  {
    name: 'SIEM (Security Information & Event Management)',
    desc: 'Aggregates and analyzes log data from multiple sources to identify security events.',
    examples: 'Splunk, QRadar, Elastic Stack, Azure Sentinel, AWS Security Hub',
    useCase: 'Correlate firewall logs, authentication events, and endpoint alerts to detect intrusions.',
  },
  {
    name: 'SOAR (Security Orchestration, Automation & Response)',
    desc: 'Automates incident response workflows and integrates security tools.',
    examples: 'Palo Alto Cortex XSOAR, Splunk Phantom, IBM Resilient',
    useCase: 'Automate phishing response: quarantine email, reset credentials, notify users.',
  },
  {
    name: 'EDR (Endpoint Detection & Response)',
    desc: 'Provides real-time monitoring and response capabilities on endpoints.',
    examples: 'CrowdStrike, SentinelOne, Microsoft Defender ATP, Carbon Black',
    useCase: 'Detect fileless malware, live response to isolate infected endpoints.',
  },
  {
    name: 'IDS/IPS (Intrusion Detection/Prevention)',
    desc: 'Monitors network traffic for malicious signatures and anomalous behavior.',
    examples: 'Snort, Suricata, Zeek (Bro), Cisco Firepower',
    useCase: 'Block SQL injection attempts, detect port scans, alert on exploit patterns.',
  },
];

const socMetrics = [
  { metric: 'MTTR (Mean Time to Respond)', target: '< 1 hour for critical alerts', importance: 'Measures response efficiency' },
  { metric: 'MTTD (Mean Time to Detect)', target: '< 24 hours for breaches', importance: 'Reflects detection capability' },
  { metric: 'False Positive Rate', target: '< 5%', importance: 'Avoids analyst fatigue' },
  { metric: 'Alert Volume', target: 'Tuned to analyst capacity', importance: 'Prevents overload' },
  { metric: 'Incident Resolution Time', target: 'Tier-dependent (1-7 days)', importance: 'Tracks improvement' },
];

const threatHunting = [
  {
    phase: 'Hypothesis',
    desc: 'Based on threat intelligence, TTPs, or anomalous behavior, form hypotheses about potential compromise.',
    example: 'After learning of new APT backdoor, hypothesize it may exist in network.',
  },
  {
    phase: 'Investigation',
    desc: 'Use SIEM queries, EDR investigations, and log analysis to search for evidence.',
    example: 'Query for unusual PowerShell execution patterns matching TTPs.',
  },
  {
    phase: 'Analysis',
    desc: 'Analyze findings to confirm or refute hypotheses, identify scope of impact.',
    example: 'Identify 5 systems with matching IoCs indicating compromise.',
  },
  {
    phase: 'Response',
    desc: 'Contain, remediate, and document findings. Share intelligence with team.',
    example: 'Isolate affected endpoints, block malicious IPs, update detection rules.',
  },
];

const socTools = [
  { category: 'Log Aggregation', tools: 'Splunk, ELK Stack, Graylog', purpose: 'Centralize log collection and search' },
  { category: 'Packet Analysis', tools: 'Wireshark, Zeek, tcpdump', purpose: 'Deep network traffic inspection' },
  { category: 'Threat Intel', tools: 'MISP, ThreatConnect, OTX', purpose: 'Manage and share threat intelligence' },
  { category: 'Case Management', tools: 'TheHive, RTIR, JIRA', purpose: 'Track incidents through resolution' },
];

export default function SecurityOperationsSOCPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-dashboard-3-line" />
          Module 8 of 20 — Threats & Response
        </div>
        <DocHeading level={1}>Security Operations & Monitoring (SOC)</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Security Operations Centers are the nerve center of cybersecurity defense. They provide
          continuous monitoring, threat detection, and incident response capabilities. Modern SOCs
          leverage automation, threat intelligence, and advanced analytics to stay ahead of attackers.
        </p>
      </motion.div>

      {/* SOC Components */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Core SOC Components</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          A modern SOC relies on multiple integrated technologies working together to detect, analyze,
          and respond to threats efficiently.
        </p>

        <div className="mt-6 space-y-4">
          {socComponents.map((component) => (
            <div key={component.name} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-amber mb-2">{component.name}</h3>
              <p className="text-xs text-cyber-text mb-3">{component.desc}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-semibold text-white">Examples:</span>
                  <p className="text-cyber-cyan font-mono">{component.examples}</p>
                </div>
                <div>
                  <span className="font-semibold text-white">Use Case:</span>
                  <p className="text-cyber-text">{component.useCase}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SOC Metrics */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>SOC Performance Metrics</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Measuring SOC effectiveness requires tracking key performance indicators that reflect
          detection capability, response speed, and operational efficiency.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {socMetrics.map((metric) => (
            <div key={metric.metric} className="cyber-card p-4">
              <h3 className="text-xs font-semibold text-cyber-cyan mb-1">{metric.metric}</h3>
              <p className="text-xs text-white mb-1">{metric.target}</p>
              <p className="text-xs text-cyber-text">{metric.importance}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Threat Hunting */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Proactive Threat Hunting</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Threat hunting moves beyond reactive alert response to actively search for hidden threats.
          It assumes adversaries are already in the network and looks for evidence.
        </p>

        <div className="mt-6 space-y-4">
          {threatHunting.map((phase) => (
            <div key={phase.phase} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-white mb-2">{phase.phase}</h3>
              <p className="text-xs text-cyber-text mb-2">{phase.desc}</p>
              <div className="p-2 rounded bg-cyber-bg border border-cyber-border">
                <span className="text-xs font-semibold text-cyber-amber">Example:</span>
                <span className="text-xs text-cyber-text"> {phase.example}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SOC Tool Stack */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Essential SOC Tools</DocHeading>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {socTools.map((tool) => (
            <div key={tool.category} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-green mb-2">{tool.category}</h3>
              <p className="text-xs text-cyber-cyan font-mono mb-2">{tool.tools}</p>
              <p className="text-xs text-cyber-text">{tool.purpose}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Key Takeaways */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Key Takeaways</DocHeading>
        <ul className="mt-4 space-y-2 text-cyber-text text-sm">
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>SOC is technology + people + process</strong> working together for continuous defense.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>MTTR/MTTD metrics</strong> measure detection and response effectiveness.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Threat hunting</strong> assumes breach and proactively seeks hidden adversaries.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Tool integration</strong> through SOAR enables efficient, automated response.</span>
          </li>
        </ul>
      </motion.section>

      {/* Navigation */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="flex gap-3 justify-between items-center">
                <div className="text-sm text-cyber-text">
                  <i className="ri-book-open-line" /> Module 8 of 20
                </div>
                <div className="flex gap-3">
                  <a href="/cybersecurity/incident-response-forensics" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
                    <i className="ri-arrow-left-line mr-1" /> Incident Response
                  </a>
                  <a href="/cybersecurity/quiz-2" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
                    Next: Quiz 2 <i className="ri-arrow-right-line ml-1" />
                  </a>
                </div>
              </div>
            </motion.section>
    </div>
  );
}