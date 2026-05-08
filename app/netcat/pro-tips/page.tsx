'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import InlineCode from '@/components/base/InlineCode';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const tips = [
  {
    title: 'Netcat is Not Encrypted',
    content: 'Standard Netcat provides no encryption. All data, including credentials and commands, is transmitted in plaintext. For encrypted connections, use tools like stunnel, sslwrap, or cryptcat as wrappers around Netcat.',
    command: 'stunnel nc -lvp 4444',
    type: 'danger' as const,
  },
  {
    title: 'Use -v for Troubleshooting',
    content: 'The -v (verbose) flag is invaluable when debugging connection issues. It shows connection establishment, data transfer amounts, and error messages that help identify problems.',
    command: 'nc -v example.com 80',
    type: 'tip' as const,
  },
  {
    title: 'Combine with Bash for Power',
    content:
      "Netcat's true power comes from combining it with Bash scripting, loops, and other command-line tools. Use it in pipelines, background processes, and automated scripts for complex tasks.",
    command: 'while true; do nc -l 8080 < backup.tar; done',
    type: 'info' as const,
  },
  {
    title: 'Listen on Specific Interface',
    content:
      'By default, Netcat listens on all available interfaces (0.0.0.0). To bind to a specific IP address (useful on multi-homed systems), use the -s flag to specify the source IP.',
    command: 'nc -l -s 192.168.1.100 4444',
    type: 'tip' as const,
  },
  {
    title: 'Handle Binary Data Safely',
    content:
      'When transferring binary files, be aware that some Netcat implementations may add or remove newline characters. Consider using base64 encoding for safer transport.',
    command: 'nc -l 4444 | base64 > file.bin',
    type: 'warning' as const,
  },
  {
    title: 'Use -q for Clean Exit',
    content:
      'Some Netcat variants hang waiting for EOF after input ends. The -q flag specifies seconds to wait after EOF before exiting. Use -q 0 to exit immediately after stdin closes.',
    command: 'nc example.com 80 -q 0 < request.txt',
    type: 'tip' as const,
  },
  {
    title: 'Combine with Port Knocking',
    content:
      'Netcat can be used as part of a port knocking sequence. Sending packets to specific ports in sequence can trigger firewall rules.',
    command:
      'nc -z host 7000 && nc -z host 8000 && nc -z host 9000 && nc host 10000',
    type: 'info' as const,
  },
  {
    title: 'HTTP Proxy Through Netcat',
    content:
      'You can tunnel HTTP traffic through Netcat by connecting to a proxy and sending raw HTTP requests. Useful for testing proxy chains or restricted networks.',
    command:
      'nc proxy.example.com 8080\nGET http://target.com/page HTTP/1.1\nHost: target.com\n\n',
    type: 'tip' as const,
  },
  {
    title: 'IPv6 Support',
    content:
      'Modern Netcat implementations support IPv6. Use the -6 flag to force IPv6 addressing.',
    command: 'nc -6 ipv6.example.com 80',
    type: 'info' as const,
  },
  {
    title: 'Audit Your Usage',
    content:
      'Since Netcat lacks built-in logging, wrap usage with script or tee to capture input and output for later review.',
    command: 'script -c "nc -lvp 4444" session.log',
    type: 'tip' as const,
  },
];

export default function NetcatProTipsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-lightbulb-line" />
          Netcat Section 11 of 14
        </div>
        <DocHeading level={1}>Pro Tips</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Expert guidance for getting the most out of Netcat while avoiding common mistakes. These tips cover encryption alternatives, troubleshooting, advanced usage, and responsible practices.
        </p>
      </motion.div>

      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Expert Recommendations</DocHeading>
        <div className="mt-6 space-y-4">
          {tips.map((tip) => (
            <div key={tip.title}>
              <Callout type={tip.type} title={tip.title}>
                <p className="text-xs text-cyber-text leading-relaxed mb-2">{tip.content}</p>
                <CodeBlock code={tip.command} />
              </Callout>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Legal & Ethical Considerations</DocHeading>
        <Callout type="danger">
          Unauthorized access to systems using Netcat (or any tool) is illegal in many jurisdictions and violates most terms of service. Always obtain explicit, written authorization before accessing any target system. Document your scope carefully.
        </Callout>
        <div className="mt-4 cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Rules of Engagement</h3>
          <ul className="space-y-2">
            {[
              'Never access targets outside your authorized scope',
              'Use the minimum privilege necessary to accomplish your task',
              'Do not leave Netcat listeners running longer than needed',
              'Report findings responsibly and do not exploit them without authorization',
              'Clean up any artifacts (files, listeners) when the engagement concludes',
            ].map((rule, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-cyber-text">
                <span className="w-1 h-1 rounded-full bg-cyber-red mt-1.5 flex-shrink-0" />
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex gap-3">
          <a href="/netcat/quiz" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Quiz <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/netcat/command-builder" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}