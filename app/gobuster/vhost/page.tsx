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

export default function GobusterVhostPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
            <i className="ri-server-line" />
            Gobuster Section 3 of 13
          </div>
          <DocHeading level={1}>Virtual Host Bruteforce</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3 text-lg">
            The <strong className="text-white">vhost</strong> mode tests different <InlineCode>Host</InlineCode> HTTP headers against a target IP to discover virtual hosts configured on shared hosting, load balancers, and reverse proxies.
          </p>
        </motion.div>

        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>What are Virtual Hosts</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Virtual hosting allows multiple websites to share a single IP address. The web server (Apache, Nginx, etc.) decides which site to serve based on the <InlineCode>Host</InlineCode> header in the HTTP request. When you visit <InlineCode>example.com</InlineCode>, your browser sends <InlineCode>Host: example.com</InlineCode>. If you send <InlineCode>Host: admin.example.com</InlineCode> to the same IP, you might get a completely different website.
          </p>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            This is extremely common in cloud environments, shared hosting, and CDNs. A single load balancer might route traffic for dozens of different domains and subdomains. Virtual host enumeration helps you discover these hidden websites that share the same infrastructure.
          </p>

          <div className="mt-6 cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">How Vhost Scanning Works</h3>
            <div className="space-y-3">
              {[
                { step: '1. Target IP', desc: 'You specify the IP address (not the domain name) as the target. Gobuster sends HTTP requests directly to this IP.' },
                { step: '2. Host Header Rotation', desc: 'For each word in the wordlist, Gobuster sends an HTTP request with Host: word.target.com' },
                { step: '3. Response Comparison', desc: 'Gobuster compares the response to a baseline request. Different responses indicate a different virtual host.' },
                { step: '4. Result Filtering', desc: 'Responses matching the baseline are filtered out. Unique responses are reported as discovered virtual hosts.' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg border border-cyber-border">
                  <span className="text-xs font-bold text-cyber-red font-mono flex-shrink-0">{s.step.split('.')[0]}</span>
                  <div>
                    <span className="text-xs font-semibold text-white">{s.step.split('. ')[1]}</span>
                    <p className="text-xs text-cyber-text-muted mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Vhost Scanning Commands</DocHeading>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Basic Virtual Host Scan</h3>
              <CodeBlock code="gobuster vhost -u http://10.0.0.1/ -w /usr/share/wordlists/vhosts.txt" />
              <p className="text-xs text-cyber-text-muted mt-2">Tests each word from vhosts.txt as a Host header against 10.0.0.1.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">With Automatic Domain Appending</h3>
              <CodeBlock code="gobuster vhost -u http://10.0.0.1/ -w /usr/share/wordlists/common.txt --append-domain -d example.com" />
              <p className="text-xs text-cyber-text-muted mt-2">The --append-domain flag adds .example.com to each wordlist entry automatically.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Higher Thread Count</h3>
              <CodeBlock code="gobuster vhost -u http://10.0.0.1/ -w vhosts.txt -t 50" />
              <p className="text-xs text-cyber-text-muted mt-2">Increases parallelism for faster scanning against responsive targets.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Save Results</h3>
              <CodeBlock code="gobuster vhost -u http://10.0.0.1/ -w vhosts.txt -o vhosts-found.txt" />
              <p className="text-xs text-cyber-text-muted mt-2">Saves discovered virtual hosts to a file for further investigation.</p>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <DocHeading level={2}>Tips & Considerations</DocHeading>
          <div className="mt-4 space-y-3">
            <Callout type="tip">
              Always use <InlineCode>--append-domain</InlineCode> when your wordlist contains bare words like "admin", "api", "dev". Without it, Gobuster sends <InlineCode>Host: admin</InlineCode> which is usually wrong.
            </Callout>
            <Callout type="warning">
              Some CDNs and WAFs return the same response for every Host header. If all responses look identical, the target may not use virtual hosting or may be using a CDN that ignores the Host header.
            </Callout>
            <Callout type="info">
              Combine vhost scanning with DNS enumeration. First find subdomains with <InlineCode>gobuster dns</InlineCode>, then verify they resolve to the same IP and test with <InlineCode>gobuster vhost</InlineCode>.
            </Callout>
          </div>

          <div className="mt-8 flex gap-3">
            <a href="/gobuster/s3" className="px-5 py-2.5 rounded-lg bg-cyber-red text-white text-sm font-semibold hover:bg-cyber-red/80 transition-all whitespace-nowrap">
              Next: S3 Buckets <i className="ri-arrow-right-line ml-1" />
            </a>
            <a href="/gobuster/dns" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text-muted hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Back
            </a>
          </div>
        </motion.section>
      </div>
  );
}
