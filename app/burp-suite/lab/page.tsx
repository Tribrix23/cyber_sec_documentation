'use client'
import { useEffect, useState } from 'react';
import DocHeading from '@/components/base/DocHeading';
import LabExercise from '@/components/base/LabExercise';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const burpLabTasks = [
  {
    id: 1,
    title: 'Install & Configure Proxy',
    description: 'Install Burp Suite (or use pre-installed) and configure browser proxy to 127.0.0.1:8080. Verify HTTPS interception works by browsing to http://example.com and http://burpsuite.',
    expectedAnswer: 'Set browser proxy → install CA cert → browse to http://example.com → verify request appears in Proxy Intercept.',
    hint: 'Firefox: Settings → Network Settings → Manual proxy. Install cert from http://burpsuite/cert.',
  },
  {
    id: 2,
    title: 'Intercept and Modify a Request',
    description: 'Intercept a request, modify the User-Agent header to "BurpHacker", and forward it. What is the modified request that reaches the server?',
    expectedAnswer: 'In Proxy Intercept tab, click "Intercept is on". Modify User-Agent header in raw request → click Forward.',
    hint: 'Right-click intercepted request → "Do intercept" → "Response to this request". Edit header in the request editor.',
  },
  {
    id: 3,
    title: 'Send to Repeater and Replay',
    description: 'From Proxy history, send a request to Repeater. Then resend it 5 times with different query parameters. Show the URL modifications you tested.',
    expectedAnswer: 'Use Repeater: modify URL parameter (e.g., ?id=1 → ?id=2 → ?id=3) and click Send each time.',
    hint: 'Click between requests in Repeater to compare responses. Note differences in response length or content.',
  },
  {
    id: 4,
    title: 'Detect SQL Injection via Repeater',
    description: 'On a test parameter (e.g., ?id=1), inject a single quote (\') and observe the response. Does an error appear or the behavior change?',
    expectedAnswer: 'Inject \' in parameter → server error like "SQL syntax" or custom error page appears → possible SQLi.',
    hint: 'Try \' OR 1=1 -- for boolean-based. Check if response length or content significantly differs from normal response.',
  },
  {
    id: 5,
    title: 'Brute Force Login with Intruder — Cluster Bomb',
    description: 'Configure an Intruder attack using Cluster Bomb mode. Use a small username list (admin, root) and password list (123456, password). Show the attack configuration.',
    expectedAnswer: 'Send login POST → mark username and password positions → Cluster Bomb → set payload sets → start attack.',
    hint: 'Mark payload positions with §username§ and §password§. Set two payload sets: Simple list with usernames, Simple list with passwords.',
  },
  {
    id: 6,
    title: 'Intruder Sniper Attack — Directory Traversal',
    description: 'Set up Sniper attack on a file parameter to fuzz for common sensitive files (e.g., ../../../etc/passwd).',
    expectedAnswer: 'Mark file path parameter → Sniper mode → payload list contains traversal strings → start attack. Look for 200 OK vs 404.',
    hint: 'Payload list can include: ../../../etc/passwd, ..%2F..%2F..%2Fetc%2Fpasswd, ....//etc/passwd, etc.',
  },
  {
    id: 7,
    title: 'Set Target Scope',
    description: 'Configure Burp scope to only include http://target.com and http://api.target.com. Verify that other domains are grayed out in Site map.',
    expectedAnswer: 'Target tab → Scope → Include: http://target.com/*, http://api.target.com/*. Exclude everything else.',
    hint: 'Add target pattern with wildcard. Scope-aware tools will only attack URLs matching included patterns.',
  },
  {
    id: 8,
    title: 'Compare Two Responses',
    description: 'Send two different requests to the same endpoint (e.g., ?id=1 and ?id=2). Send both to Comparer and identify at least one difference.',
    expectedAnswer: 'Select both requests in history → right-click → Compare. Word diff highlights differing words/phrases.',
    hint: 'IDOR often shows subtle differences: different user names, emails, or resource names when accessing another user resource.',
  },
  {
    id: 9,
    title: 'Encode/Decode with Decoder',
    description: 'Take the string &lt;script&gt;alert(1)&lt;/script&gt;, URL-encode it, then HTML-decode it back. Document each transformation.',
    expectedAnswer: 'Open Decoder tab. Input: &lt;script&gt;alert(1)&lt;/script&gt; → URL Encode → %3Cscript%3Ealert(1)%3C/script%3E. Then decode back.',
    hint: 'You can chain encodings: first decode HTML entities, then URL-decode the result.',
  },
  {
    id: 10,
    title: 'Use Match & Replace Rule',
    description: 'Create a Match & Replace rule to automatically replace a specific header value in all outgoing requests.',
    expectedAnswer: 'Proxy → Options → Match and Replace → Add rule: Replace "User-Agent: Chrome" with "User-Agent: BurpHacker".',
    hint: 'Rules can use regex. Test with preview to ensure replacement works before saving.',
  },
  {
    id: 11,
    title: 'Extract Data with Logger++',
    description: 'Install Logger++ extension, configure it to log all requests containing the parameter "token", and demonstrate that it captures those requests.',
    expectedAnswer: 'Install from BApp Store → Open Logger++ tab → Set filter: Request contains "token" → all matching requests appear in Logger.',
    hint: 'Logger++ filter syntax: Request contains "keyword". You can filter by status code, content type, etc.',
  },
  {
    id: 12,
    title: 'Spider a Target',
    description: 'Use Spider to automatically discover pages on http://target-site.com. What is the maximum depth you would set for a small site?',
    expectedAnswer: 'Target → Site map → right-click target domain → "Spider this host". Set max depth to 2-3 for small sites (20-50 pages).',
    hint: 'High depth can create excessive traffic; low depth misses content. For small sites, depth 3 is usually enough.',
  },
  {
    id: 13,
    title: 'Test for XSS with Intruder',
    description: 'Mark a single parameter position and fuzz with common XSS payloads from a wordlist. Which payload type and filter would you use?',
    expectedAnswer: 'Sniper attack → Simple list payload → load XSS wordlist (SecLists/Discovery/XSS). Use Grep — Match for "&lt;script&gt;" in response.',
    hint: 'XSS wordlist includes: &lt;script&gt;alert(1)&lt;/script&gt;, "&gt;&lt;script&gt;alert(1)&lt;/script&gt;, etc. Grep for "script" or "onerror=" to detect reflections.',
  },
  {
    id: 14,
    title: 'Manual CSRF Testing',
    description: 'Capture a state-changing request (POST /transfer), remove the CSRF token, and resend. What is the expected server behavior if CSRF protection exists?',
    expectedAnswer: 'Server should reject request (403/400) if CSRF token validation is enforced. If request succeeds → CSRF vulnerability.',
    hint: 'Also test by removing Referer header or changing Origin header to different domain.',
  },
  {
    id: 15,
    title: 'Benefit of Using Repeater Over Intruder',
    description: 'When would you choose Repeater instead of Intruder for testing a parameter?',
    expectedAnswer: 'Repeater for manual iterative testing, when you need to carefully examine each response for context and adjust payloads based on results.',
    hint: 'Repeater is interactive; Intruder automates hundreds/thousands. Use Repeater for initial exploration and validation.',
  },
  {
    id: 16,
    title: 'Identify Hidden Parameters with Param Miner',
    description: 'Use Param Miner to discover hidden parameters on a request endpoint. What wordlist would you typically load?',
    expectedAnswer: 'Install Param Miner → Send request to Repeater → right-click → Param Miner → Discover parameters → load params.txt wordlist.',
    hint: 'Wordlists: SecLists/Discovery/Web-Content/burp-parameter-names.txt, or params.txt containing common names like admin, debug, key, secret.',
  },
  {
    id: 17,
    title: 'Find JWT Weaknesses',
    description: 'Capture a JWT from an Authorization header. Decode it, change the role claim from "user" to "admin", re-encode, and resend. What happens?',
    expectedAnswer: 'If server does not verify signature (or uses "none" algorithm), modified token is accepted → privilege escalation.',
    hint: 'Also test weak secrets: try common passwords as JWT signing secret using jwt-cracker or jwt_tool.',
  },
  {
    id: 18,
    title: 'Out-of-Band (OAST) Detection with Collaborator',
    description: 'How would you use Burp to detect an SSRF vulnerability that triggers an external HTTP request?',
    expectedAnswer: 'Collaborator (Pro) generates unique subdomain → inject into parameter → if Collaborator logs HTTP request/DNS lookup → SSRF confirmed.',
    hint: 'Collaborator URL format: http://abcd1234.burpcollaborator.net. Inject it into URL parameters, headers, XML, SSRF payloads.',
  },
  {
    id: 19,
    title: 'Active vs Passive Scan Difference',
    description: 'What is the main difference between passive and active scanning in Burp Scanner?',
    expectedAnswer: 'Passive analyzes existing traffic without sending requests; safe but limited. Active sends crafted requests to test for vulnerabilities; detectable but comprehensive.',
    hint: 'Passive runs automatically; active must be manually triggered on in-scope endpoints.',
  },
  {
    id: 20,
    title: 'Why Install Burp CA Certificate?',
    description: 'What problem does installing the Burp CA certificate into your browser solve?',
    expectedAnswer: 'Allows Burp to decrypt HTTPS traffic without certificate warnings. The browser trusts Burp as a local CA, enabling MITM interception of TLS.',
    hint: 'Without the CA cert, HTTPS sites fail with SSL errors or refuse to load.',
  },
];

export default function BurpSuiteLabPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-flask-line" />
          Hands-On Practice
        </div>
        <DocHeading level={1}>Burp Suite Lab</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Apply what you learned with these hands-on exercises. You will configure proxy, intercept traffic, brute force login forms, fuzz parameters, and detect injection vulnerabilities. Use intentionally vulnerable applications like dvwa, WebGoat, or PortSwigger Web Security Academy labs.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <LabExercise title="Burp Suite Hand-On Lab" tasks={burpLabTasks} />
      </motion.section>

      <motion.section className="mt-8 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-2">How to Practice for Real</h3>
          <p className="text-sm text-cyber-text leading-relaxed">
            Use PortSwigger's free <strong>Web Security Academy</strong> (academy.portswigger.net) — it provides dozens of interactive labs with built-in targets and step-by-step guidance. Also try DVWA (Damn Vulnerable Web App), bWAPP, or HackTheBox web challenges. Always test only on systems you are authorized to test.
          </p>
        </div>
        <div className="mt-6 flex gap-3">
          <a href="/burp-suite" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            <i className="ri-home-line mr-1" /> Back to Burp Suite Module
          </a>
        </div>
      </motion.section>
    </div>
  );
}
