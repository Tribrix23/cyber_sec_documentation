'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Codeblock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const outputFormats = [
  {
    format: 'table',
    extension: '.txt',
    description: 'Human-readable console table output (default). Best for interactive terminal viewing.',
    example: `cloudsploit scan aws --output table`,
    pros: ['Easy to read in terminal', 'Color-coded by severity', 'No post-processing needed'],
    cons: ['Not machine-parseable', 'Hard to import to other tools', 'Not suitable for reports'],
  },
  {
    format: 'json',
    extension: '.json',
    description: 'Complete structured data including all finding details, resources, and remediation. Best for automation.',
    example: `cloudsploit scan aws --output json --outfile results.json`,
    pros: ['Machine-readable', 'Full detail preservation', 'Easy to parse with jq', 'API-friendly'],
    cons: ['Harder for humans to read', 'Larger file sizes', 'Requires tooling to analyze'],
  },
  {
    format: 'csv',
    extension: '.csv',
    description: 'Comma-separated values for spreadsheet analysis. Flattened finding data only.',
    example: `cloudsploit scan aws --output csv --outfile findings.csv`,
    pros: ['Import to Excel/Sheets', 'Easy filtering/sorting', 'Pivot table analysis', 'Widely supported'],
    cons: ['Loses nested structure', 'Limited detail', 'Remediation truncated', 'No resource relationships'],
  },
  {
    format: 'html',
    extension: '.html',
    description: 'Interactive web report with filtering, sorting, and pretty formatting. Best for sharing with stakeholders.',
    example: `cloudsploit scan aws --output html --outfile report.html`,
    pros: ['Beautiful formatting', 'Interactive filtering', 'Easy sharing (email/upload)', 'Can embed screenshots'],
    cons: ['Not automation-friendly', 'Single-view only', 'Requires web browser', 'Hard to merge reports'],
  },
  {
    format: 'junit',
    extension: '.xml',
    description: 'JUnit XML format for CI/CD integration. Reports pass/fail per-detector for test pipelines.',
    example: `cloudsploit scan aws --output junit --outfile results.xml`,
    pros: ['CI/CD native format', 'Jenkins/GitLab/Azure understand it', 'Test pass/fail tracking', 'Historical trendable'],
    cons: ['Very verbose XML', 'Hard to read manually', 'Limited human context', 'Tool-specific quirks'],
  },
];

export default function CloudsploitOutputFormats() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
          <i className="ri-file-list-3-line" />
          Export & Reporting
        </div>
        <DocHeading level={1}>Output Formats</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Cloudsploit supports multiple output formats for different use cases: interactive terminal viewing, automated parsing, executive reporting, and CI/CD integration.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Basic Usage</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Specify output format with <code className="text-cyber-cyan">--output</code> (or <code className="text-cyber-cyan">-o</code>) and destination with <code className="text-cyber-cyan">--outfile</code>:
        </p>
        <Codeblock
          language="bash"
          code={`cloudsploit scan aws --output <format> --outfile /path/to/file`}
        />
        <p className="text-cyber-text mt-4">
          If <code className="text-cyber-cyan">--outfile</code> is omitted, table output goes to console, JSON goes to <code className="text-cyber-cyan">~/.cloudsploit/results/</code> by default.
        </p>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Format Comparison</DocHeading>
        <div className="space-y-6 mt-4">
          {outputFormats.map((format) => (
            <div key={format.format} className="cyber-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-cyber-cyan">{format.format.toUpperCase()}</h3>
                  <p className="text-sm text-cyber-text mt-1">{format.description}</p>
                </div>
                <code className="text-xs px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-cyber-amber">
                  {format.extension}
                </code>
              </div>

              <div className="mt-4">
                <span className="text-xs text-cyber-text-dim uppercase tracking-wider">Example</span>
                <Codeblock
                  language="bash"
                  code={format.example}
                />
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-cyber-green mb-2">Use When</h4>
                  <ul className="space-y-1">
                    {format.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-cyber-text">
                        <i className="ri-checkbox-line text-cyber-green mt-0.5" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-cyber-red mb-2">Avoid When</h4>
                  <ul className="space-y-1">
                    {format.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-cyber-text">
                        <i className="ri-close-line text-cyber-red mt-0.5" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Post-Processing Examples</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Combine Cloudsploit with command-line tools for custom analysis:
        </p>

        <div className="space-y-4">
          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Count Findings by Severity</h3>
            <Codeblock
              language="bash"
              code={`cloudsploit scan aws --output json | jq '.findings | group_by(.severity) | map({severity: .[0].severity, count: length})'`}
            />
          </div>

          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Extract Only Critical Issues</h3>
            <Codeblock
              language="bash"
              code={`cloudsploit scan aws --output json | jq '.findings[] | select(.severity=="CRITICAL")'`}
            />
          </div>

          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Get Unique Resource Types</h3>
            <Codeblock
              language="bash"
              code={`cloudsploit scan aws --output json | jq '.resources[].type' | sort | uniq -c | sort -nr`}
            />
          </div>

          <div className="cyber-card p-4">
            <h3 className="text-sm font-semibold text-cyber-cyan mb-2">Convert JSON to Markdown Table</h3>
            <Codeblock
              language="bash"
              code={`cloudsploit scan aws --output json | jq -r '.findings[] | "| \(.severity) | \(.title) | \(.resource_id) |"' > report.md`}
            />
          </div>
        </div>
      </motion.section>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Multi-Account Combined Output</DocHeading>
        <p className="text-cyber-text mt-3 mb-4">
          Merge results from multiple cloud accounts into a single report:
        </p>
        <Codeblock
          language="bash"
          code={`# Scan multiple accounts and combine
cloudsploit scan aws --profile account1 --output json > acc1.json
cloudsploit scan aws --profile account2 --output json > acc2.json
cloudsploit scan azure --output json > azure.json

# Merge all JSON files
jq -s 'add' acc1.json acc2.json azure.json > combined.json

# Generate single HTML report
cloudsploit scan --input combined.json --output html --outfile full-report.html`}
        />
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="mt-8 flex gap-3">
            <a href="/cloudsploit/examples" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Review: Examples <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
      </motion.section>
    </div>
  );
}
