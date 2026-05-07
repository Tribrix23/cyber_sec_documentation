'use client'
import { useEffect, useState } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import InlineCode from '@/components/base/InlineCode';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const timingTemplates = [
  {
    flag: '-T0',
    name: 'Paranoid',
    speed: 'One port every 5+ minutes',
    parallelism: 1,
    timeout: 'Very long',
    detail: 'Paranoid mode is designed for maximum stealth. It sends only one probe at a time and waits at least 5 minutes between sending probes to the same target. This is so slow that most IDS systems will not flag the scan as suspicious because the traffic appears completely normal. However, a full port scan at this speed can take days or weeks. Paranoid mode also inserts random delays to further evade pattern detection.',
    useCases: ['Scanning high-security government or military networks with active IDS/IPS monitoring.', 'Testing whether an IDS can detect extremely slow scans.', 'Red team exercises where detection must be avoided at all costs.'],
    tradeoffs: ['A full 65,535 port scan takes approximately 227 days on a single target.', 'Not practical for any time-sensitive engagement.', 'Connection timeouts may cause false positives.'],
  },
  {
    flag: '-T1',
    name: 'Sneaky',
    speed: 'One port every 15 seconds',
    parallelism: 'Very low',
    timeout: 'Long',
    detail: 'Sneaky mode is slightly faster than Paranoid while still maintaining a very low profile. It sends probes at approximately 15-second intervals. While still extremely slow, it is occasionally practical for small port ranges or specific target ports when stealth is paramount. Like Paranoid mode, it randomizes timing to avoid predictable patterns.',
    useCases: ['Networks where you suspect IDS monitoring but need results faster than T0.', 'Scanning a small subset of critical ports (22, 80, 443, 445) on sensitive targets.', 'Initial slow reconnaissance before escalating to faster scans.'],
    tradeoffs: ['A 1000-port scan takes over 4 hours.', 'Still too slow for most practical engagements.', 'Target systems may change state during the scan.'],
  },
  {
    flag: '-T2',
    name: 'Polite',
    speed: 'Slower than normal',
    parallelism: 'Low',
    timeout: 'Moderate',
    detail: 'Polite mode reduces bandwidth usage and target CPU load. It uses less parallelism and longer timeouts than the default, making it less likely to overwhelm fragile targets or trigger rate limiting. This is a good middle ground when you want to avoid disrupting the target while still getting reasonably timely results.',
    useCases: ['Scanning production servers during business hours.', 'Targeting embedded devices or IoT with limited CPU/network resources.', 'Networks with strict rate limiting or QoS policies.'],
    tradeoffs: ['Approximately 2-3x slower than Normal mode.', 'May still trigger some IDS depending on configuration.', 'Not suitable for large-scale scans.'],
  },
  {
    flag: '-T3',
    name: 'Normal',
    speed: 'Default balance',
    parallelism: 'Moderate',
    timeout: 'Standard',
    detail: 'Normal mode is the default Nmap timing template. It provides a reasonable balance between speed, reliability, and network load for most scanning scenarios. Nmap dynamically adjusts parallelism based on network conditions, RTT measurements, and response rates. This is the template used when no -T flag is specified.',
    useCases: ['General scanning on stable corporate networks.', 'Default choice for most penetration tests.', 'When you are unsure which template to use.'],
    tradeoffs: ['May trigger basic IDS signatures on sensitive networks.', 'Not optimized for speed or stealth — a jack of all trades.', 'Can be slow on high-latency WAN links.'],
  },
  {
    flag: '-T4',
    name: 'Aggressive',
    speed: 'Fast',
    parallelism: 'High',
    timeout: 'Short',
    detail: 'Aggressive mode assumes a reliable network and responsive target. It increases parallelism, reduces timeouts, and sends probes more frequently. On fast local networks, -T4 can complete scans in a fraction of the time Normal takes. However, it is louder and more likely to trigger IDS alerts or cause packet loss on congested networks.',
    useCases: ['CTF competitions and lab environments where speed matters.', 'Internal network scanning on fast, reliable infrastructure.', 'Scanning known-stable targets during time-boxed engagements.'],
    tradeoffs: ['Significantly more visible to IDS and network monitoring.', 'May miss results on slow or congested networks due to short timeouts.', 'Can overwhelm low-resource targets.'],
  },
  {
    flag: '-T5',
    name: 'Insane',
    speed: 'Extremely fast',
    parallelism: 'Maximum',
    timeout: 'Very short',
    detail: 'Insane mode pushes Nmap to its speed limits. It assumes a perfect network with zero packet loss and ignores most timeout mechanisms. While it can produce results almost instantly on local networks, it is unreliable on anything but the most pristine connections. Packet loss, retransmissions, and false negatives are common.',
    useCases: ['Local network scans during internal assessments.', 'Quick sanity checks in controlled lab environments.', 'When you need immediate results and accuracy is secondary.'],
    tradeoffs: ['Highly unreliable on WANs, VPNs, or congested networks.', 'Extremely visible to any network monitoring.', 'Often produces incomplete or inaccurate results.', 'Not recommended for production scanning.'],
  },
];

const advancedTiming = [
  {
    flag: '--min-parallelism <num>',
    desc: 'Minimum number of probes sent in parallel. Overrides the dynamic timing system.',
  },
  {
    flag: '--max-parallelism <num>',
    desc: 'Maximum number of probes sent in parallel. Prevents overwhelming the network.',
  },
  {
    flag: '--min-rtt-timeout <time>',
    desc: 'Minimum RTT timeout. Nmap will never wait less than this for a response.',
  },
  {
    flag: '--max-rtt-timeout <time>',
    desc: 'Maximum RTT timeout. Nmap gives up waiting after this duration.',
  },
  {
    flag: '--initial-rtt-timeout <time>',
    desc: 'Starting RTT timeout before Nmap has gathered enough data to estimate properly.',
  },
  {
    flag: '--max-retries <tries>',
    desc: 'Maximum number of retransmissions for a probe. Set to 0 to disable retries.',
  },
  {
    flag: '--host-timeout <time>',
    desc: 'Give up on a target if the total scan time exceeds this limit.',
  },
  {
    flag: '--scan-delay <time>',
    desc: 'Minimum delay between each probe sent to a single target.',
  },
  {
    flag: '--max-scan-delay <time>',
    desc: 'Maximum allowed delay between probes. Overrides dynamic delays.',
  },
];

export default function NmapTimingPage() {
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-time-line" />
            Nmap Section 5 of 13
          </div>
          <DocHeading level={1}>Timing Templates</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            Timing templates control how fast Nmap scans and how much network load it generates. The right choice depends on your network conditions, target resilience, and whether you need to evade detection. Nmap offers six templates from Paranoid to Insane.
          </p>
        </motion.div>

        {/* Templates */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>The Six Timing Templates</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Click any template to expand and see its full technical behavior, ideal use cases, and tradeoffs.
          </p>

          <div className="mt-6 space-y-4">
            {timingTemplates.map((t) => (
              <button
                key={t.flag}
                type="button"
                onClick={() => setActiveTemplate(activeTemplate === t.flag ? null : t.flag)}
                className={`w-full cyber-card p-5 text-left cursor-pointer transition-all ${activeTemplate === t.flag ? 'border-cyber-amber' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyber-amber/10 border border-cyber-amber/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-cyber-amber font-mono">{t.flag}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-white">{t.name}</h3>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${t.flag === '-T0' || t.flag === '-T1' ? 'bg-cyber-green/10 text-cyber-green border-cyber-green/20' : t.flag === '-T5' ? 'bg-cyber-red/10 text-cyber-red border-cyber-red/20' : 'bg-cyber-bg-card text-cyber-text-muted border-cyber-border'}`}>
                        {t.flag === '-T0' || t.flag === '-T1' ? 'Stealth' : t.flag === '-T5' ? 'Loud' : 'Balanced'}
                      </span>
                    </div>
                    <p className="text-xs text-cyber-text-dim mt-1">Speed: {t.speed}</p>

                    {activeTemplate === t.flag && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 space-y-3 text-left"
                      >
                        <p className="text-xs text-cyber-text-muted leading-relaxed">{t.detail}</p>
                        <div>
                          <span className="text-[10px] font-semibold text-cyber-text-dim uppercase tracking-wider">Best For</span>
                          <ul className="mt-1 space-y-1">
                            {t.useCases.map((uc, i) => (
                              <li key={i} className="text-xs text-cyber-text-muted flex items-start gap-2">
                                <span className="w-1 h-1 rounded-full bg-cyber-amber mt-1.5 flex-shrink-0" />
                                {uc}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold text-cyber-text-dim uppercase tracking-wider">Tradeoffs</span>
                          <ul className="mt-1 space-y-1">
                            {t.tradeoffs.map((tr, i) => (
                              <li key={i} className="text-xs text-cyber-text-muted flex items-start gap-2">
                                <span className="w-1 h-1 rounded-full bg-cyber-red mt-1.5 flex-shrink-0" />
                                {tr}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Visual Speed Comparison */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Speed Comparison</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Relative speed of each template when scanning 1000 ports on a local network with a responsive target.
          </p>
          <div className="mt-6 space-y-3">
            {[
              { label: 'Paranoid (-T0)', pct: 2, time: '~25 hours', color: 'bg-cyber-green' },
              { label: 'Sneaky (-T1)', pct: 5, time: '~4 hours', color: 'bg-cyber-green' },
              { label: 'Polite (-T2)', pct: 25, time: '~15 minutes', color: 'bg-cyber-cyan' },
              { label: 'Normal (-T3)', pct: 50, time: '~3 minutes', color: 'bg-cyber-cyan' },
              { label: 'Aggressive (-T4)', pct: 85, time: '~30 seconds', color: 'bg-cyber-amber' },
              { label: 'Insane (-T5)', pct: 100, time: '~15 seconds', color: 'bg-cyber-red' },
            ].map((bar) => (
              <div key={bar.label} className="flex items-center gap-3">
                <span className="text-xs font-mono text-cyber-text-muted w-24 flex-shrink-0 text-right">{bar.label}</span>
                <div className="flex-1 h-6 bg-cyber-bg-card rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${bar.color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <span className="text-xs text-cyber-text-dim w-20 flex-shrink-0">{bar.time}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Advanced Timing */}
        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Advanced Timing Controls</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            For fine-grained control beyond the six templates, Nmap offers individual timing flags that let you precisely tune scan behavior.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            {advancedTiming.map((at) => (
              <div key={at.flag} className="cyber-card p-4">
                <code className="text-xs font-mono text-cyber-cyan">{at.flag}</code>
                <p className="text-xs text-cyber-text-muted mt-2 leading-relaxed">{at.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Tips */}
        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Recommendations</DocHeading>
          <div className="mt-4 space-y-3">
            <Callout type="tip">
              For 95% of real-world engagements, use <InlineCode>-T4</InlineCode> on internal networks and <InlineCode>-T3</InlineCode> (default) on external/WAN targets. Only use <InlineCode>-T0</InlineCode> or <InlineCode>-T1</InlineCode> when you have confirmed IDS monitoring and stealth is critical.
            </Callout>
            <Callout type="warning">
              On CTFs, <InlineCode>-T5</InlineCode> seems tempting but often produces incomplete results. <InlineCode>-T4</InlineCode> is almost as fast and significantly more reliable.
            </Callout>
            <Callout type="info">
              Combine <InlineCode>--max-retries 1</InlineCode> with <InlineCode>-T4</InlineCode> for faster scans on reliable networks. This reduces retransmissions without sacrificing much accuracy.
            </Callout>
          </div>

          <div className="mt-8 flex gap-3">
            <a href="/nmap/flags" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Common Flags <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/nmap/port-states" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text-muted hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
  );
}
