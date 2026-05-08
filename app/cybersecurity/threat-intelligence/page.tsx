'use client'
import { useEffect } from 'react'
import DocHeading from '@/components/base/DocHeading'
import Callout from '@/components/base/Callout'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const attackTactics = [
  {
    tactic: 'Initial Access',
    description: 'Techniques to gain foothold in target environment.',
    techniques: ['Phishing (T1566)', 'Valid Accounts (T1078)', 'External Remote Services (T1133)', 'Supply Chain Compromise (T1195)'],
    example: 'SolarWinds SUNBURST used supply chain compromise to distribute backdoored updates.',
  },
  {
    tactic: 'Execution',
    description: 'Run malicious code on target systems.',
    techniques: ['Command and Scripting Interpreter (T1059)', 'User Execution (T1204)', 'Native API (T1106)', 'Scheduled Task/Job (T1053)'],
    example: 'Malware executing PowerShell scripts with encoded commands to evade detection.',
  },
  {
    tactic: 'Persistence',
    description: 'Maintain presence across reboots and credential changes.',
    techniques: ['Account Manipulation (T1098)', 'Create or Modify System Process (T1543)', 'Web Shell (T1505)', 'External Remote Services (T1133)'],
    example: 'APT28 creates Windows scheduled tasks to ensure malware restarts after reboot.',
  },
  {
    tactic: 'Privilege Escalation',
    description: 'Gain higher-level permissions on systems.',
    techniques: ['Process Injection (T1055)', 'DLL Search Order Hijacking (T1574)', 'Unquoted Service Path (T1574)', 'Access Token Manipulation (T1134)'],
    example: 'EternalBlue exploited Windows SMB vulnerability to gain SYSTEM privileges.',
  },
  {
    tactic: 'Defense Evasion',
    description: 'Avoid detection and hide activity.',
    techniques: ['Obfuscated Files/Information (T1027)', 'Disable Security Tools (T1562)', 'Process Hollowing (T1055)', 'File Deletion (T1070)'],
    example: 'Maze ransomware used process injection and AMSI bypass to avoid EDR detection.',
  },
  {
    tactic: 'Credential Access',
    description: 'Steal account credentials for later use.',
    techniques: ['OS Credential Dumping (T1003)', 'Keylogging (T1056)', 'Brute Force (T1110)', 'Two-Factor Authentication Interception (T1111)'],
    example: 'APT41 used Mimikatz to dump credentials from LSASS memory.',
  },
  {
    tactic: 'Discovery',
    description: 'Gather information about victim environment.',
    techniques: ['System Information Discovery (T1082)', 'Network Share Discovery (T1135)', 'Account Discovery (T1087)', 'Process Discovery (T1057)'],
    example: 'Attackers enumerate AD domain controllers, user accounts, group memberships.',
  },
  {
    tactic: 'Lateral Movement',
    description: 'Move through network to reach target systems.',
    techniques: ['Remote Services (T1021)', 'Pass the Hash (T1075)', 'Internal Spearphishing (T1534)', 'Remote Execution (T1050)'],
    example: 'NotPetya used PsExec and WMI to spread laterally across corporate networks.',
  },
  {
    tactic: 'Collection',
    description: 'Gather data of interest from target.',
    techniques: ['Data from Local System (T1005)', 'Screen Capture (T1113)', 'Audio Capture (T1125)', 'Email Collection (T1114)'],
    example: 'Ransomware exfiltrates data before encryption for double extortion.',
  },
  {
    tactic: 'Exfiltration',
    description: 'Steal data from target environment.',
    techniques: ['Exfiltration Over C2 Channel (T1041)', 'Automated Exfiltration (T1020)', 'Transfer via Removable Media (T1052)'],
    example: 'FIN7 used HTTP/HTTPS C2 channels to slowly exfiltrate credit card data.',
  },
  {
    tactic: 'Impact',
    description: 'Disrupt availability or integrity of systems.',
    techniques: ['Data Encrypted for Impact (T1486)', 'Service Stop (T1489)', 'Network Denial of Service (T1498)', 'Resource Hijacking (T1496)'],
    example: 'Colonial Pipeline DarkSide ransomware forced shutdown of fuel pipeline operations.',
  },
]

const threatIntelLifecycle = [
  {
    stage: 'Planning & Direction',
    desc: 'Define intelligence requirements based on business risk and threat landscape.',
    questions: ['What assets are high-value?', 'Which threat actors target our sector?', 'What TTPs should we detect?'],
  },
  {
    stage: 'Collection',
    desc: 'Gather raw data from internal logs, external feeds, OSINT, sensors.',
    sources: ['Network traffic (Zeek, Suricata)', 'Endpoint telemetry (EDR)', 'Threat feeds (FireEye, Mandiant, AlienVault)', 'Dark web monitoring', 'Honeypots'],
  },
  {
    stage: 'Processing',
    desc: 'Normalize, enrich, correlate data to make it usable.',
    activities: ['Parse logs to common schema (STIX/TAXII)', 'Enrich IOCs with geo/reputation', 'De-duplicate, normalize timestamps'],
  },
  {
    stage: 'Analysis',
    desc: 'Identify patterns, assess relevance, produce actionable intelligence.',
    outputs: ['Threat bulletins', 'Indicator lists (IOCs)', 'TTP profiles', 'Campaign reports'],
  },
  {
    stage: 'Dissemination',
    desc: 'Deliver intelligence to stakeholders in usable formats.',
    formats: ['SIEM rules', 'EDR/YARA detection', 'Firewall blocks', 'Threat hunts', 'Executive summaries'],
  },
  {
    stage: 'Feedback',
    desc: 'Measure effectiveness, refine requirements, close loop.',
    metrics: ['Detection rate improvement', 'False positive reduction', 'MTTD/MTTR impact'],
  },
]

const threatFeeds = [
  {
    name: 'AlienVault OTX',
    type: 'Open-source',
    format: 'STIX/TAXII',
    coverage: 'Broad, community-contributed IOCs',
    useCase: 'Small teams, general threat awareness, blocking known bad IPs/domains.',
  },
  {
    name: 'MISP (Malware Information Sharing Platform)',
    type: 'Open-source platform',
    format: 'MISP format, STIX',
    coverage: 'Customizable—share within org or trusted community.',
    useCase: 'ISAC/ISAO sharing, building internal threat intel platform.',
  },
  {
    name: 'Mandiant Advantage / FireEye',
    type: 'Commercial (premium)',
    format: 'API, reports, TTP analysis',
    coverage: 'APT-level intel, deep attribution analysis, vulnerability impact.',
    useCase: 'Enterprises facing sophisticated adversaries, board-level reporting.',
  },
  {
    name: 'Recorded Future',
    type: 'Commercial',
    format: 'API, dashboards, alerts',
    coverage: 'Real-time dark web, geopolitical, technical intel.',
    useCase: 'Proactive risk monitoring, brand protection, supply chain risk.',
  },
  {
    name: 'CISA Known Exploited Vulnerabilities (KEV) Catalog',
    type: 'Government',
    format: 'CSV, JSON feed',
    coverage: 'Vulnerabilities actively exploited in the wild.',
    useCase: 'Prioritize patching—CISA binding operational directive requires federal agencies remediate KEV within specific SLAs.',
  },
]

const intelTypes = [
  {
    type: 'Strategic Intelligence',
    audience: 'Executives, board members',
    format: 'Briefings, risk dashboards, trend reports',
    purpose: 'Inform business decisions, investment priorities, risk acceptance.',
    example: 'Quarterly threat landscape report showing increased ransomware targeting healthcare.',
  },
  {
    type: 'Operational Intelligence',
    audience: 'SOC analysts, incident responders',
    format: 'IOCs, TTP profiles, alert rules, hunt hypotheses',
    purpose: 'Enable detection, hunting, and incident response.',
    example: 'YARA rules for new malware family, Sigma detection rules for specific ATT&CK techniques.',
  },
  {
    type: 'Technical Intelligence',
    audience: 'Security engineers, forensics teams',
    format: 'Malware hashes, C2 infrastructure, exploit code samples',
    purpose: 'Technical implementation: block, detect, analyze.',
    example: 'List of IPs, domains, SHA256 hashes from recent phishing campaign.',
  },
  {
    type: 'Tactical Intelligence',
    audience: 'SOC, threat hunters',
    format: 'ATT&CK technique mappings, behavioral analytics',
    purpose: 'Improve detection coverage across MITRE framework.',
    example: 'Mapping BlueAlpha group to ATT&CK T1078 (Valid Accounts) and associated detection hypotheses.',
  },
]

export default function ThreatIntelligencePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple text-xs font-medium font-mono mb-4">
          <i className="ri-radar-line" />
          Module 19 of 20 — Professional Practice
        </div>
        <DocHeading level={1}>Threat Intelligence & Analysis</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Threat intelligence transforms raw data into actionable security insights.
          Understanding attacker TTPs, leveraging intelligence feeds, and applying
          structured analysis enables proactive defense against known and emerging threats.
        </p>
      </motion.div>

      {/* MITRE ATT&CK Framework */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>MITRE ATT&CK Framework</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          ATT&CK catalogs real-world adversary behaviors as a matrix of tactics and techniques.
          Use it to map detections, identify gaps, and benchmark defenses.
        </p>

        <div className="mt-6 space-y-3">
          {attackTactics.map((tactic) => (
            <div key={tactic.tactic} className="cyber-card p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyber-red/10 border border-cyber-red/20 flex items-center justify-center shrink-0">
                  <i className="ri-sword-line text-cyber-red" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-1">{tactic.tactic}</h3>
                  <p className="text-xs text-cyber-text mb-2">{tactic.description}</p>
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-cyber-amber">Key Techniques:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {tactic.techniques.map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-xs text-cyber-cyan font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-2 rounded bg-cyber-red/5 border border-cyber-red/10">
                    <span className="text-xs font-semibold text-cyber-red">Example:</span>
                    <span className="text-xs text-cyber-text ml-1">{tactic.example}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Threat Intelligence Lifecycle */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Threat Intelligence Lifecycle</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Intelligence is a cycle, not a one-time effort. Each stage adds value and feeds the next.
        </p>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {threatIntelLifecycle.map((stage) => (
            <div key={stage.stage} className="cyber-card p-4">
              <h3 className="text-xs font-semibold text-cyber-cyan mb-1">{stage.stage}</h3>
              <p className="text-xs text-cyber-text mb-2">{stage.desc}</p>
              {'questions' in stage && (
                <ul className="text-xs text-cyber-green space-y-0.5 list-disc list-inside">
                  {stage.questions?.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              )}
              {'sources' in stage && (
                <ul className="text-xs text-cyber-green space-y-0.5 list-disc list-inside">
                  {stage.sources?.map((src, i) => (
                    <li key={i}>{src}</li>
                  ))}
                </ul>
              )}
              {'activities' in stage && (
                <ul className="text-xs text-cyber-green space-y-0.5 list-disc list-inside">
                  {stage.activities?.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Threat Feeds Comparison */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Threat Intelligence Sources</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Select feeds based on coverage, timeliness, format compatibility, and cost.
        </p>

        <div className="mt-6 space-y-4">
          {threatFeeds.map((feed) => (
            <div key={feed.name} className="cyber-card p-5">
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-semibold text-white">{feed.name}</h3>
                <span className="px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-xs text-cyber-cyan">{feed.type}</span>
              </div>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-semibold text-white">Format:</span>
                  <span className="text-cyber-text ml-1">{feed.format}</span>
                </div>
                <div>
                  <span className="font-semibold text-white">Coverage:</span>
                  <span className="text-cyber-text ml-1">{feed.coverage}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="font-semibold text-cyber-green">Use Case:</span>
                  <span className="text-cyber-text ml-1">{feed.useCase}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Types of Intelligence */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Types of Threat Intelligence</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Intelligence serves different audiences. Tailor format and content to consumers.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {intelTypes.map((intel) => (
            <div key={intel.type} className="cyber-card p-5 border-l-4 border-cyber-green">
              <h3 className="text-sm font-semibold text-cyber-green mb-2">{intel.type}</h3>
              <div className="text-xs space-y-2">
                <div><span className="font-semibold text-white">Audience:</span> {intel.audience}</div>
                <div><span className="font-semibold text-white">Format:</span> {intel.format}</div>
                <div><span className="font-semibold text-white">Purpose:</span> {intel.purpose}</div>
                <div className="p-2 rounded bg-cyber-red/5 border border-cyber-red/10">
                  <span className="font-semibold text-cyber-red">Example:</span> {intel.example}
                </div>
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
            <span><strong>MITRE ATT&CK maps TTPs</strong>—use it to assess detection coverage and threat actor behavior.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Intelligence lifecycle</strong> (plan→collect→process→analyze→disseminate→feedback) structures delivery.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Strategic vs. technical intel</strong> serves different audiences—tailor outputs accordingly.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Actionable intelligence</strong> drives concrete security actions: blocks, hunts, patches, tool tuning.</span>
          </li>
        </ul>
      </motion.section>

      {/* Navigation */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3 justify-between items-center">
          <a href="/cybersecurity/devsecops-secure-sdlc" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Module 18
          </a>
          <a href="/cybersecurity/quiz-4" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Quiz 4 <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  )
}
