'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const socialEngineeringTypes = [
  {
    type: 'Phishing',
    desc: 'Mass emails or messages designed to trick recipients into revealing credentials or downloading malware.',
    example: 'Google Docs sharing scam that redirects to fake login page.',
    defense: 'Security awareness training, DMARC/SPF/DKIM, email filtering.',
  },
  {
    type: 'Spear Phishing',
    desc: 'Targeted attacks using personal information to increase credibility.',
    example: 'Business email compromise (BEC) requesting wire transfer.',
    defense: 'Domain monitoring, transaction verification processes, email authentication.',
  },
  {
    type: 'Whaling',
    desc: 'Phishing targeting high-value individuals like executives.',
    example: 'Fake legal subpoena sent to CEO from spoofed law firm.',
    defense: 'Executive protection services, domain shadowing detection.',
  },
  {
    type: 'Vishing',
    desc: 'Voice phishing using phone calls to extract information.',
    example: 'Tech support scam claiming computer infected, requests remote access.',
    defense: 'Caller verification procedures, employee training.',
  },
  {
    type: 'Smishing',
    desc: 'SMS-based phishing with malicious links or requests.',
    example: 'Package delivery notification with fake tracking link.',
    defense: 'SMS filtering, mobile device management policies.',
  },
  {
    type: 'Pretexting',
    desc: 'Creating fabricated scenario to obtain information.',
    example: 'Impersonating IT support calling for password reset.',
    defense: 'Password reset procedures, verification of authority.',
  },
];

const psychologicalPrinciples = [
  {
    principle: 'Authority',
    desc: 'People comply with requests from perceived authority figures.',
    example: 'Attacker claims to be CEO or law enforcement demanding urgent action.',
    counter: 'Verify authority through independent channels. Challenge unexpected requests.',
  },
  {
    principle: 'Urgency',
    desc: 'Time pressure reduces critical thinking and leads to hasty decisions.',
    example: 'Email claiming account will be closed unless password changed immediately.',
    counter: 'Take time to verify. Legitimate requests allow verification time.',
  },
  {
    principle: 'Social Proof',
    desc: 'People follow what others appear to be doing.',
    example: 'Fake LinkedIn connection requests from compromised accounts.',
    counter: 'Verify independently. Recognize when social proof is manufactured.',
  },
  {
    principle: 'Reciprocity',
    desc: 'People feel obligated to return favors.',
    example: 'Free gift or discount offered before request for sensitive information.',
    counter: 'Recognize manipulation attempts. No obligation for unsolicited offers.',
  },
  {
    principle: 'Consistency',
    desc: 'People prefer to remain consistent with previous commitments.',
    example: 'Small initial commitment leads to larger requests.',
    counter: 'Question whether commitments were made freely.',
  },
];

const redFlags = [
  'Unexpected requests for credentials, payments, or sensitive data',
  'Urgency combined with unusual payment methods or destinations',
  'Sender domain differs subtly from legitimate domain (typosquatting)',
  'Unusual language, grammar errors, or inconsistent branding',
  'Suspicious attachments or links, especially to cloud storage',
  'Requests to bypass normal procedures or verify through alternate channels',
];

const securityAwareness = [
  {
    program: 'Phishing Simulations',
    desc: 'Regular controlled phishing exercises to train recognition skills.',
    bestPractice: 'Gradual difficulty increase. Immediate education on failures.',
  },
  {
    program: 'Security Champions',
    desc: 'Identify enthusiastic employees to promote security culture.',
    bestPractice: 'Cross-departmental representation. Recognition and rewards.',
  },
  {
    program: 'Incident Sharing',
    desc: 'Share anonymized real attack examples with staff.',
    bestPractice: 'Regular newsletters. Highlight new attack patterns.',
  },
  {
    program: 'Gamification',
    desc: 'Points, badges, leaderboards for security behaviors.',
    bestPractice: 'Meaningful rewards. Avoid punitive scoring.',
  },
];

export default function SocialEngineeringPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-user-smile-line" />
          Module 14 of 20 — Advanced Domains
        </div>
        <DocHeading level={1}>Social Engineering & The Human Factor</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          People are the most exploited attack surface. Social engineering manipulates psychological
          principles to bypass technical controls. Understanding attack methods, psychological
          triggers, and defense strategies is essential for comprehensive security.
        </p>
      </motion.div>

      {/* Social Engineering Types */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Social Engineering Attack Types</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Each attack type leverages different communication channels and psychological triggers.
          Recognizing patterns helps identify and prevent attacks.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialEngineeringTypes.map((se) => (
            <div key={se.type} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-amber mb-2">{se.type}</h3>
              <p className="text-xs text-cyber-text mb-2">{se.desc}</p>
              <div className="p-2 rounded bg-cyber-bg border border-cyber-border mb-2">
                <span className="text-xs font-semibold text-cyber-red">Example:</span>
                <span className="text-xs text-cyber-text"> {se.example}</span>
              </div>
              <div className="p-2 rounded bg-cyber-green/5 border border-cyber-green/10">
                <span className="text-xs font-semibold text-cyber-green">Defense:</span>
                <span className="text-xs text-cyber-text"> {se.defense}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Psychological Principles */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Psychological Principles Used</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Understanding manipulation principles helps identify when they're being used against you.
        </p>

        <div className="mt-6 space-y-4">
          {psychologicalPrinciples.map((principle) => (
            <div key={principle.principle} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-white mb-2">{principle.principle}</h3>
              <p className="text-xs text-cyber-text mb-2">{principle.desc}</p>
              <div className="p-2 rounded bg-cyber-red/5 border border-cyber-red/10 mb-2">
                <span className="text-xs font-semibold text-cyber-red">Tactic:</span>
                <span className="text-xs text-cyber-text"> {principle.example}</span>
              </div>
              <div className="p-2 rounded bg-cyber-green/5 border border-cyber-green/10">
                <span className="text-xs font-semibold text-cyber-green">Counter:</span>
                <span className="text-xs text-cyber-text"> {principle.counter}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Red Flags */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Recognizing Red Flags</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Social engineering attempts often display warning signs. Training these observations
          builds collective defense.
        </p>

        <div className="mt-4 space-y-2">
          {redFlags.map((flag, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-cyber-text">
              <span className="w-5 h-5 rounded bg-cyber-red/10 border border-cyber-red/20 flex items-center justify-center shrink-0 text-cyber-red text-xs font-bold mt-0.5">
                !
              </span>
              {flag}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Security Awareness Programs */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Security Awareness Program Design</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Effective awareness programs engage participants and measure improvement.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityAwareness.map((program) => (
            <div key={program.program} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">{program.program}</h3>
              <p className="text-xs text-cyber-text mb-2">{program.desc}</p>
              <div className="p-2 rounded bg-cyber-bg border border-cyber-border">
                <span className="text-xs font-semibold text-cyber-green">Best Practice:</span>
                <span className="text-xs text-cyber-text"> {program.bestPractice}</span>
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
            <span><strong>Authority and urgency</strong> are the most exploited psychological principles.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Multi-factor verification</strong> stops most social engineering attempts.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Regular training and simulations</strong> build recognition skills.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Security culture</strong> starts with leadership modeling behaviors.</span>
          </li>
        </ul>
      </motion.section>

      {/* Navigation */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3 justify-between items-center">
          <a href="/cybersecurity/mobile-iot-security" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Module 13
          </a>
          <a href="/cybersecurity/encryption-cryptanalysis" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Cryptanalysis <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  );
}