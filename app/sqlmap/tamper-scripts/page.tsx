'use client'
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const tamperScripts = [
  { name: 'space2comment', desc: 'Replaces spaces with SQL comments', category: 'Basic' },
  { name: 'space2dash', desc: 'Replaces spaces with dash comments --', category: 'Basic' },
  { name: 'space2hash', desc: 'Replaces spaces with hash comments #', category: 'Basic' },
  { name: 'space2multi', desc: 'Replaces spaces with multi-line comments', category: 'Basic' },
  { name: 'randomcase', desc: 'Randomizes case of SQL keywords (SeLeCt)', category: 'Basic' },
  { name: 'between', desc: 'Replaces > with NOT BETWEEN 0 AND, evades numeric filters', category: 'Basic' },
  { name: 'charencode', desc: 'URL-encodes all characters', category: 'Encoding' },
  { name: 'base64encode', desc: 'Base64-encodes the payload', category: 'Encoding' },
  { name: 'unicode', desc: 'Unicode-encodes characters', category: 'Encoding' },
  { name: 'apostrophemask', desc: 'Replaces apostrophes with UTF-8 full-width equivalent', category: 'Quote' },
  { name: 'apostrophenullencode', desc: 'Replaces apostrophes with %00%27', category: 'Quote' },
  { name: 'apostropheunicodeencode', desc: 'Unicodes apostrophes', category: 'Quote' },
  { name: 'equaltolike', desc: 'Replaces = with LIKE operator', category: 'Operator' },
  { name: 'greatest', desc: 'Replaces > with GREATEST() function', category: 'Operator' },
  { name: 'least', desc: 'Replaces < with LEAST() function', category: 'Operator' },
  { name: 'modsecurityversioned', desc: 'Wraps queries in versioned comments for MySQL', category: 'WAF' },
  { name: 'modsecurityzeroversioned', desc: 'ModSecurity zero-versioned technique', category: 'WAF' },
  { name: 'versionedkeywords', desc: 'Encloses SQL keywords with versioned comments', category: 'WAF' },
  { name: 'versionedmorekeywords', desc: 'Encloses more keywords with versioned comments', category: 'WAF' },
  { name: 'virgule', desc: 'Adds virgule backslash before quotes', category: 'WAF' },
  { name: 'percentage', desc: 'Adds percentage sign before quotes', category: 'WAF' },
  { name: 'halfversionedmorekeywords', desc: 'Half-versioned keywords for MySQL', category: 'WAF' },
  { name: 'xforwardedfor', desc: 'Tamper for X-Forwarded-For header injection', category: 'Header' },
  { name: 'xforwardedhostname', desc: 'Tamper for X-Forwarded-Hostname header injection', category: 'Header' },
  { name: 'xforwardedserver', desc: 'Tamper for X-Forwarded-Server header injection', category: 'Header' },
  { name: 'referer', desc: 'Tamper for Referer header injection', category: 'Header' },
  { name: 'refererurl', desc: 'Tamper for Referer URL injection', category: 'Header' },
];

export default function TamperScriptsPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-shield-keyhole-line" />
          SQLMap Section 2 of 13
        </div>
        <DocHeading level={1}>Tamper Scripts (WAF Bypass)</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Tamper scripts modify SQLMap payloads to bypass Web Application Firewalls (WAFs), IDS, and input filters.
          Use <InlineCode>--tamper=script1,script2</InlineCode> to apply one or more scripts.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">Chaining Multiple Tamper Scripts</h3>
        <p className="text-cyber-text text-sm mb-3">
          You can combine multiple tamper scripts for stronger WAF bypass:
        </p>
        <CodeBlock code="sqlmap -u 'http://target.com/page?id=1' --tamper=space2comment,randomcase,charencode" />
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="text-sm font-semibold text-white mb-3">All Tamper Scripts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tamperScripts.map((t) => (
            <div key={t.name} className="cyber-card p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-amber">{t.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyber-bg-card border border-cyber-border text-cyber-cyan">{t.category}</span>
              </div>
              <p className="text-xs text-cyber-text mt-1">{t.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/sqlmap/detection" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Detection & Enumeration <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sqlmap/injection-techniques" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}