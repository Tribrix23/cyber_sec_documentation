'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function JohnSingleCrackModePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-user-line" />
          Cracking Mode
        </div>
        <DocHeading level={1}>Single Crack Mode</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          <strong className="text-cyber-green">Single crack mode</strong> is John's fastest attack. It uses personal information from the login name (GECOS fields) — such as full name, home directory, shell, and other user account metadata — to generate a small set of candidate passwords for that specific user.
        </p>
        <p className="text-cyber-text leading-relaxed mt-2">
          The mode applies simple transformations: reversing the name, appending numbers, capitalizing, swapping first/last name order, etc. Because it is tailored to each user's information and runs with minimal computational overhead, it often cracks passwords that dictionary attacks miss.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>How Single Crack Works</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          John inspects each hash's associated username and GECOS field (which often contains the user's real name, office, phone, etc.) from the password file. It then generates passwords based on:
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'Full name (e.g., JohnDoe, doeJohn)',
            'First name only',
            'Last name only',
            'Username variations',
            'Reversed versions',
            'Appended years (1980-2029)',
            'Capitalization variations',
            'Combined name + common suffixes',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-cyber-text">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <Callout type="tip" className="mt-4">
          Single mode only needs a few seconds to minutes per hash, compared to hours or days for wordlist or incremental modes. Always run it first.
        </Callout>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Usage</DocHeading>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Basic Command</h4>
            <CodeBlock code="john --single hashes.txt" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Single mode with specific format</h4>
            <CodeBlock code="john --single --format=sha512crypt hashes.txt" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">With session save</h4>
            <CodeBlock code="john --single --session=firstpass hashes.txt" />
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Example Hash File with GECOS</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          John can extract user information from standard Unix password files. Here's how it generates candidates from user data:
        </p>
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-white mb-2">Sample /etc/passwd entry</h4>
          <div className="cyber-card p-4 font-mono text-xs text-cyber-green">
            <div>alice:$6$saltsalt$hash123...:1000:1000:Alice Smith,/home/alice,/bin/bash</div>
          </div>
          <p className="text-xs text-cyber-text-dim mt-2">
            GECOS field shows "Alice Smith" — John generates candidates like alice, Alice, Smith, aliceSmith, AliceSmith, smithAlice, etc.
          </p>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>When to Use Single Mode</DocHeading>
        <div className="mt-4 space-y-2">
          {[
            { title: 'First Pass', desc: 'Always run --single at the start of any cracking session. It is almost free and often yields results.' },
            { title: 'User-Based Passwords', desc: 'Organizations sometimes use standardized password templates like FirstNameYear (Alice2020) or FirstLast (AliceSmith). Single mode catches these.' },
            { title: 'CTF Challenges', desc: 'CTF password hashes are often derived from usernames or names. Single mode cracks them in seconds.' },
            { title: 'Audit Baseline', desc: 'Establish a quick baseline before committing significant compute resources.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
              <span className="w-6 h-6 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan text-xs flex-shrink-0">{i + 1}</span>
              <div>
                <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                <p className="text-xs text-cyber-text mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Limitations</DocHeading>
        <div className="mt-4 space-y-2">
          {[
            'Only effective if users base passwords on their personal information.',
            'May miss passwords unrelated to user identity (random strings, common wordlists).',
            'Relies on GECOS fields being populated and useful.',
            'Does not try large wordlists or complex mutations.',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-cyber-text">
              <i className="ri-close-circle-line text-cyber-red" />
              {item}
            </div>
          ))}
        </div>
        <Callout type="info" className="mt-4">
          Combine <InlineCode>--single</InlineCode> with <InlineCode>--wordlist</InlineCode> and <InlineCode>--rules</InlineCode> to leverage both personal info and large dictionary mutations.
        </Callout>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/john-the-ripper/wordlist-mode" className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg text-sm font-semibold hover:bg-cyber-cyan-dim transition-all whitespace-nowrap">
            Next: Wordlist Mode <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/john-the-ripper/installation" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-cyan hover:text-cyber-cyan transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
