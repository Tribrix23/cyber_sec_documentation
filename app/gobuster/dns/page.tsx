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

const concepts = [
  {
    title: 'DNS Resolution Basics',
    desc: 'The Domain Name System (DNS) translates human-readable domain names (like example.com) into IP addresses. Subdomains (like api.example.com, mail.example.com) are separate DNS records that point to different services, often on different servers.',
  },
  {
    title: 'Why Subdomain Enumeration Matters',
    desc: 'Subdomains represent the full attack surface of an organization. A company might secure their main website but leave a staging environment, old API endpoint, or forgotten service exposed on a subdomain. These are prime targets for penetration testers and bug bounty hunters.',
  },
  {
    title: 'How Gobuster DNS Works',
    desc: 'Gobuster takes each word from your wordlist and appends it to the target domain (word.example.com), then performs a DNS A record lookup. If the DNS server returns an IP address, the subdomain exists. If it returns NXDOMAIN, the subdomain does not exist.',
  },
];

const commands = [
  {
    title: 'Basic Subdomain Enumeration',
    cmd: 'gobuster dns -d example.com -w /usr/share/wordlists/subdomains-top1million-5000.txt',
    desc: 'Enumerates subdomains of example.com using a list of 5,000 common subdomains. This is a fast initial reconnaissance step that often reveals interesting targets.',
  },
  {
    title: 'Large-Scale Enumeration',
    cmd: 'gobuster dns -d example.com -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt -t 50',
    desc: 'Uses a 20,000-word wordlist with 50 threads for broader coverage. Larger wordlists find more subdomains but take longer.',
  },
  {
    title: 'Save Results to File',
    cmd: 'gobuster dns -d example.com -w subdomains.txt -o dns-results.txt',
    desc: 'Saves discovered subdomains to a file for further processing. The output file can be fed into other tools like Nmap, EyeWitness, or httpx for service identification.',
  },
  {
    title: 'Show IP Addresses',
    cmd: 'gobuster dns -d example.com -w common.txt -i',
    desc: 'The -i flag shows the resolved IP address for each discovered subdomain. This helps you map the network infrastructure and identify cloud providers or CDNs.',
  },
  {
    title: 'Custom DNS Server',
    cmd: 'gobuster dns -d example.com -w common.txt --resolver 8.8.8.8',
    desc: 'Specifies a custom DNS resolver. Using Google DNS (8.8.8.8) or Cloudflare (1.1.1.1) can bypass local DNS caching and provide more consistent results.',
  },
];

export default function GobusterDnsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
            <i className="ri-earth-line" />
            Gobuster Section 2 of 13
          </div>
          <DocHeading level={1}>DNS Subdomain Bruteforce</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            The <strong className="text-white">dns</strong> mode discovers subdomains by performing DNS resolution using a wordlist. It is one of the most important reconnaissance techniques for mapping an organization&apos;s full online presence.
          </p>
        </motion.div>

        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Core Concepts</DocHeading>
          <div className="mt-6 space-y-4">
            {concepts.map((c) => (
              <div key={c.title} className="cyber-card p-5">
                <h3 className="text-sm font-semibold text-white mb-2">{c.title}</h3>
                <p className="text-xs text-cyber-text-muted leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>DNS Enumeration Commands</DocHeading>
          <div className="mt-6 space-y-4">
            {commands.map((cmd) => (
              <div key={cmd.title} className="cyber-card p-5">
                <h3 className="text-sm font-semibold text-white mb-2">{cmd.title}</h3>
                <p className="text-xs text-cyber-text-muted leading-relaxed mb-3">{cmd.desc}</p>
                <CodeBlock code={cmd.cmd} />
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Important Considerations</DocHeading>
          <div className="mt-4 space-y-3">
            <Callout type="tip">
              Combine Gobuster DNS with <InlineCode>amass</InlineCode> or <InlineCode>subfinder</InlineCode> for passive subdomain discovery via certificate transparency logs, then use Gobuster for active brute-forcing.
            </Callout>
            <Callout type="warning">
              Some DNS servers rate-limit queries. If you see many timeouts, reduce threads with <InlineCode>-t 5</InlineCode> or use a different resolver.
            </Callout>
            <Callout type="info">
              Wildcard DNS (where *.example.com resolves to the same IP) makes brute-forcing less useful. Use <InlineCode>dig any *.example.com</InlineCode> to check for wildcard records before scanning.
            </Callout>
          </div>

          <div className="mt-8 flex gap-3">
            <a href="/gobuster/vhost" className="px-5 py-2.5 rounded-lg bg-cyber-red text-white text-sm font-semibold hover:bg-cyber-red/80 transition-all whitespace-nowrap">
              Next: Virtual Hosts <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/gobuster/directory" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text-muted hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
  );
}