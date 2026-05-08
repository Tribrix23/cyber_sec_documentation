'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const incidentResponseStages = [
  {
    stage: 'Preparation',
    desc: 'Building capabilities before incidents occur: policies, tools, training, and communication plans.',
    actions: 'IR team formation, tool procurement, tabletop exercises, vendor contacts.',
    example: 'Target (2013): Lack of preparation led to 3-week dwell time before detection.',
  },
  {
    stage: 'Identification',
    desc: 'Detecting and determining whether an incident has occurred, its scope and impact.',
    actions: 'SIEM alerts, log analysis, user reports, anomaly detection.',
    example: 'SolarWinds (2020): Identified through FireEye\'s internal security monitoring.',
  },
  {
    stage: 'Containment',
    desc: 'Limiting damage by isolating affected systems while preserving evidence.',
    actions: 'Network segmentation, disabling accounts, taking systems offline.',
    example: 'Colonial Pipeline (2021): Shut down pipeline operations to prevent spread.',
  },
  {
    stage: 'Eradication',
    desc: 'Removing threat elements and vulnerabilities from systems.',
    actions: 'Malware removal, credential resets, patch application, configuration fixes.',
    example: 'Equifax (2017): Removed vulnerable Struts component after breach discovery.',
  },
  {
    stage: 'Recovery',
    desc: 'Restoring systems to normal operation and verifying integrity.',
    actions: 'System rebuilds, data restoration, monitoring for reinfection.',
    example: 'Maersk (NotPetya 2017): Rebuilt 45,000 devices from scratch over 10 days.',
  },
  {
    stage: 'Lessons Learned',
    desc: 'Reviewing incident response effectiveness and updating procedures.',
    actions: 'Post-mortem analysis, policy updates, additional training.',
    example: 'After WannaCry: Organizations updated patch management processes globally.',
  },
];

const forensicsArtifacts = [
  {
    artifact: 'File System',
    description: 'Deleted files, timestamps, file access patterns, hidden data.',
    tools: 'Autopsy, EnCase, FTK, sleuthkit',
    importance: 'Timeline reconstruction, deleted malicious files, data exfiltration evidence.',
  },
  {
    artifact: 'Registry (Windows)',
    description: 'System configuration, installed software, user activity, persistence mechanisms.',
    tools: 'RegRipper, RECmd, Registry Explorer',
    importance: 'Startup entries, malware persistence, user activity reconstruction.',
  },
  {
    artifact: 'Event Logs',
    description: 'System events, login attempts, process creation, service changes.',
    tools: 'EventLog Explorer, LogParser, Splunk',
    importance: 'Account compromises, lateral movement, malicious activity timeline.',
  },
  {
    artifact: 'Network Traffic',
    description: 'Connections, DNS queries, protocol anomalies, data exfiltration.',
    tools: 'Wireshark, Zeek, NetworkMiner',
    importance: 'C2 communication, data theft, attack vector identification.',
  },
  {
    artifact: 'Memory',
    description: 'Running processes, network connections, injected code, encryption keys.',
    tools: 'Volatility, Rekall, DumpIt',
    importance: 'Fileless malware, process hollowing, in-memory payloads.',
  },
];

const chainOfCustody = [
  'Document collector name, date/time, and method of collection',
  'Assign unique identifier to each evidence item',
  'Document every person who handled the evidence',
  'Store evidence in secure, access-controlled environment',
  'Calculate and verify cryptographic hashes at each transfer',
];

const incidentSeverity = [
  { level: 'Level 1 - Low', examples: 'False positives, policy violations, minor anomalies', response: 'Document and monitor' },
  { level: 'Level 2 - Medium', examples: 'Malware infection, unauthorized access attempts', response: 'Contain and investigate' },
  { level: 'Level 3 - High', examples: 'Data breach, system compromise, ransomware', response: 'Activate IR team, executive notification' },
  { level: 'Level 4 - Critical', examples: 'Nation-state attack, critical infrastructure impact', response: 'Legal notification, law enforcement, regulatory bodies' },
];

export default function IncidentResponseForensicsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-search-eye-line" />
          Module 7 of 20 — Threats & Response
        </div>
        <DocHeading level={1}>Incident Response & Digital Forensics</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          When prevention fails, incident response determines how much damage occurs. Digital forensics
          provides the evidence to understand what happened and how to prevent recurrence.
          The difference between a minor incident and a catastrophic breach often lies in response speed.
        </p>
      </motion.div>

      {/* IR Lifecycle */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Incident Response Lifecycle</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          The NIST SP 800-61 four-phase model (Preparation, Detection & Analysis, Containment & Eradication,
          Post-Incident Activity) guides effective incident handling.
        </p>

        <div className="mt-6 space-y-4">
          {incidentResponseStages.map((stage, i) => (
            <div key={stage.stage} className="cyber-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 flex items-center justify-center shrink-0 text-cyber-amber font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-1">{stage.stage}</h3>
                  <p className="text-xs text-cyber-text mb-2">{stage.desc}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="font-semibold text-cyber-cyan">Actions:</span> {stage.actions}
                    </div>
                    <div className="p-2 rounded bg-cyber-red/5 border border-cyber-red/10">
                      <span className="font-semibold text-cyber-red">Case Study:</span> {stage.example}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Digital Forensics */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Digital Forensics Artifacts</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Digital forensics examines multiple artifact types to reconstruct attack timelines and identify
          attacker methods. Proper collection preserves evidence integrity for legal proceedings.
        </p>

        <div className="mt-6 space-y-4">
          {forensicsArtifacts.map((artifact) => (
            <div key={artifact.artifact} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">{artifact.artifact}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="font-semibold text-white">Description:</span>
                  <p className="text-cyber-text">{artifact.description}</p>
                </div>
                <div>
                  <span className="font-semibold text-white">Tools:</span>
                  <p className="text-cyber-text font-mono">{artifact.tools}</p>
                </div>
                <div>
                  <span className="font-semibold text-white">Importance:</span>
                  <p className="text-cyber-text">{artifact.importance}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Chain of Custody */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Chain of Custody</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Legal admissibility of digital evidence requires maintaining an unbroken chain of custody.
          Any break can render evidence inadmissible in court proceedings.
        </p>

        <div className="mt-4 space-y-2">
          {chainOfCustody.map((step, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-cyber-text">
              <span className="w-5 h-5 rounded bg-cyber-amber/10 border border-cyber-amber/20 flex items-center justify-center shrink-0 text-cyber-amber text-xs font-bold mt-0.5">
                {i + 1}
              </span>
              {step}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Incident Severity */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Incident Severity Classification</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Not all incidents require the same level of response. Proper classification ensures appropriate
          resources are allocated efficiently while maintaining stakeholder communication.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {incidentSeverity.map((sev) => (
            <div key={sev.level} className="cyber-card p-4">
              <h3 className="text-xs font-semibold text-cyber-amber mb-2">{sev.level}</h3>
              <div className="text-xs space-y-1">
                <p className="text-cyber-text"><strong>Examples:</strong> {sev.examples}</p>
                <p className="text-cyber-green"><strong>Response:</strong> {sev.response}</p>
              </div>
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
            <span><strong>IR is a process</strong>—preparation and lessons learned are as critical as active response.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Forensics artifacts</strong> tell the story of an attack—collect and preserve them properly.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Chain of custody</strong> ensures evidence admissibility in legal proceedings.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Severity classification</strong> enables appropriate response scaling and resource allocation.</span>
          </li>
        </ul>
      </motion.section>

      {/* Navigation */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3 justify-between items-center">
          <a href="/cybersecurity/malware-threat-landscape" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Module 6
          </a>
          <a href="/cybersecurity/security-operations-soc" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Security Operations <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  );
}