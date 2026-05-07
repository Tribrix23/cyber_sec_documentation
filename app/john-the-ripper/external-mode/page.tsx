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

export default function JohnExternalModePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-code-s-slash-line" />
          Cracking Mode
        </div>
        <DocHeading level={1}>External Mode</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          <strong className="text-cyber-green">External mode</strong> allows you to plug in custom password generation code written in a C-like scripting language. It is for advanced users who need algorithms beyond John's built-in modes — for example, generating passwords from specific patterns, implementing custom hash append/prepend logic, or deriving candidates from contextual information like a target's pet names or employee lists.
        </p>
        <p className="text-cyber-text leading-relaxed mt-2">
          External modules are shared C code compiled into John or loaded at runtime. The Jumbo distribution ships with many pre-built external modes for common scenario variations.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>When to Use External Mode</DocHeading>
        <div className="mt-4 space-y-3">
          {[
            { title: 'Custom Pattern Cracking', desc: 'You know the password pattern (e.g., "CompanyName" + 2-4 digits + special char) and need to generate only that structure.' },
            { title: 'Hybrid Dictionary+Transform', desc: 'Combine two wordlists (first name + last name) or apply transforms based on external data sources.' },
            { title: 'Context-Aware Generation', desc: 'Passwords derived from specific domain knowledge: product codes, internal jargon, employee IDs.' },
            { title: 'Algorithmic Bruteforce', desc: 'Generate passwords according to a mathematical sequence or encoding that rules cannot achieve.' },
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
        <DocHeading level={2}>Usage</DocHeading>
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Use a built-in external mode</h4>
            <CodeBlock code="john --external=Alnum4 hashes.txt" />
            <p className="text-xs text-cyber-text mt-2">
              Alnum4 generates all 4-character alphanumeric combinations; useful for short PINs.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">List available external mode formats</h4>
            <CodeBlock code="john --list=external" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Combine with wordlist</h4>
            <CodeBlock code="john --wordlist=names.txt --external=MyMutator hashes.txt" />
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Common Built-in External Modes</DocHeading>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: 'AlnumN', desc: 'N-character alphanumeric brute force.' },
            { name: 'LowerN', desc: 'N-character lowercase brute force.' },
            { name: 'Mask', desc: 'Pattern-based with placeholders (e.g., ?y?y?d?d?d).' },
            { name: 'Kstats', desc: 'Keyboard patterns for keywalk attacks.' },
            { name: 'DigitsN', desc: 'N-digit PIN brute force.' },
            { name: 'dMOF', desc: 'Custom format output for certain hash modules.' },
            { name: 'Regex', desc: 'Generate candidates matching a regular expression.' },
            { name: 'Python', desc: 'Embedded Python scripting (if built with Python support).' },
          ].map((m, i) => (
            <div key={i} className="cyber-card p-4">
              <h4 className="text-sm font-semibold text-cyber-cyan">{m.name}</h4>
              <p className="text-xs text-cyber-text mt-1">{m.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Creating Custom External Modes</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          External modes are C functions compiled into a shared library (.so) that John loads. This is an advanced topic requiring C knowledge and John source familiarity.
        </p>
        <div className="mt-4 p-4 rounded-lg bg-cyber-bg border border-cyber-border font-mono text-xs text-cyber-green">
          <div className="mb-2 text-cyber-amber">Basic skeleton (external_MyMode.c):</div>
          <pre>{`#include "external.h"
#include "memory.h"

extern char *password;
extern int eaindex, eacount;

void init() {
  // Initialize your generator state
}

void generate() {
  // Set 'password' to the next candidate
  // Use get_next_*() functions from external.h
}

void restrict() {
  // Optional: implement charset restrictions
}`}</pre>
        </div>
        <Callout type="warning">
          Writing external modes requires building John from source and familiarity with C programming. Most users should stick to <InlineCode>--rules</InlineCode> and <InlineCode>--incremental</InlineCode>.
        </Callout>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/john-the-ripper/hash-formats" className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg text-sm font-semibold hover:bg-cyber-cyan-dim transition-all whitespace-nowrap">
            Next: Hash Formats <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/john-the-ripper/incremental-mode" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-cyan hover:text-cyber-cyan transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
