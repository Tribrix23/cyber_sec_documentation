'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const authFactors = [
  {
    factor: 'Something You Know',
    examples: ['Passwords', 'PINs', 'Security questions', 'Memorized secrets'],
    strength: 'Weakest factor. Vulnerable to phishing, keyloggers, shoulder surfing, data breaches.',
    bestPractices: ['12+ characters minimum', 'Unique per site (password manager)', 'No dictionary words or personal info', 'Regular rotation (if breach suspected)', 'Multi-factor compensates for weak passwords'],
    icon: 'ri-key-line',
    color: 'cyber-red',
  },
  {
    factor: 'Something You Have',
    examples: ['Hardware tokens (YubiKey)', 'Smart cards', 'Mobile authenticator apps (Google Authenticator, Authy)', 'SMS/Voice OTP (weak)', 'Phone-based push notifications'],
    strength: 'Medium. Physical possession required. Vulnerable to theft, SIM swapping, or device compromise.',
    bestPractices: ['Use hardware security keys (U2F/FIDO2) over SMS', 'Keep authenticator app on separate device from login', 'Enable biometric lock on phone authenticator', 'Backup codes stored securely offline'],
    icon: 'ri-smartphone-line',
    color: 'cyber-amber',
  },
  {
    factor: 'Something You Are',
    examples: ['Fingerprint', 'Facial recognition', 'Voice recognition', 'Iris scan', 'Behavioral biometrics (typing rhythm, mouse movement)'],
    strength: 'Strong but not infallible. Vulnerable to spoofing (fake fingerprints, photos, voice recordings). Liveness detection crucial.',
    bestPractices: ['Combine with other factors (MFA)', 'Use multi-modal biometrics (fingerprint + face)', 'Liveness detection (blink detection, pulse detection)', 'Template storage in secure enclave (not transmitted)'],
    icon: 'ri-user-smile-line',
    color: 'cyber-green',
  },
  {
    factor: 'Somewhere You Are',
    examples: ['GPS location', 'IP geolocation', 'Wi-Fi SSID/BSSID fingerprinting', 'Network proximity'],
    strength: 'Contextual factor. Used for risk-based authentication, not standalone MFA.',
    useCases: ['Block login from high-risk countries', 'Require additional factors when login from new device/location', 'Geofencing for corporate resources'],
    icon: 'ri-map-pin-line',
    color: 'cyber-cyan',
  },
  {
    factor: 'Something You Do',
    examples: ['Typing cadence', 'Mouse movement patterns', 'Touchscreen gesture dynamics', 'Behavioral analytics'],
    strength: 'Continuous authentication. Passive and unobtrusive. Used for detecting session hijacking or account takeover.',
    technologies: ['Risk-based authentication platforms (Behavioral biometrics)', 'User and Entity Behavior Analytics (UEBA)', 'Machine learning models trained on user patterns'],
    icon: 'ri-pulse-line',
    color: 'cyber-purple',
  },
];

const authMethods = [
  {
    name: 'Password-Based Authentication',
    howItWorks: 'User enters username + password. Server hashes stored password (with salt) and compares to hash of input.',
    vulnerabilities: ['Password reuse across sites', 'Dictionary/brute force attacks', 'Phishing', 'Keyloggers', 'Shoulder surfing', 'Database breach exposes hashes if unsalted or weak hash'],
    recentBreach: 'LinkedIn (2012, disclosed 2016): 117 million password hashes stolen. 11 million were unsalted SHA-1 hashes cracked in days. Led to credential stuffing attacks on other sites.',
    improvements: ['Password strength meters', ' breached password detection (HaveIBeenPwned API)', 'Rate limiting and account lockouts', 'CAPTCHAs'],
  },
  {
    name: 'Multi-Factor Authentication (MFA)',
    howItWorks: 'Requires two or more independent factors: knowledge + possession, or possession + inherence. Eliminates single point of failure.',
    methods: ['TOTP (Time-based OTP, RFC 6238): Google Authenticator, Authy', 'Push notifications: Duo, Microsoft Authenticator approve/deny', 'Hardware security keys: YubiKey (U2F/FIDO2)', 'SMS OTP (weak, deprecated by NIST)', 'Email OTP (weak, interceptible)'],
    effectiveness: 'Microsoft reports MFA blocks 99.9% of automated account compromise attacks. Despite this, only ~20% of accounts have MFA enabled.',
    recentBreach: 'Twitter (2020): Social engineering of employees gave attacker access to internal tools, bypassing MFA. Demonstrated that MFA alone isn\u2019t enough—need defense-in-depth.',
  },
  {
    name: 'Single Sign-On (SSO) & Federation',
    howItWorks: 'One identity provider (IdP) authenticates user once. Service providers (SPs) trust IdP. Uses protocols: SAML 2.0, OpenID Connect, OAuth 2.0.',
    benefits: ['Reduced password fatigue', 'Centralized access control and revocation', 'Automated provisioning/deprovisioning', 'Single audit trail'],
    risks: ['Single point of failure—IdP compromise gives access to all federated services', 'Complex configuration errors', 'Session hijacking across SPs'],
    recentBreach: 'Okta (2022): Lapsus$ social-engineered Okta support to reset MFA for employee account. Access to Okta admin console gave access to 2,700+ customer environments including Breach, T-Mobile, and many others.',
  },
  {
    name: 'Certificate-Based Authentication',
    howItWorks: 'Client presents X.509 certificate signed by trusted CA. Server validates certificate chain. Used for machine-to-machine, VPNs, and high-assurance user auth.',
    useCases: ['VPN client certificates', 'IoT device authentication', 'Code signing', 'Smart card login (CAC, PIV)', 'Mutual TLS (mTLS)'],
    benefits: ['Cryptographically strong, phishing-resistant', 'No passwords to steal', 'Can be hardware-backed (TPM, TEE)', 'Supports non-repudiation'],
    adoption: 'Limited by complexity of PKI management. Most common in enterprise, government, and high-security environments.',
  },
  {
    name: 'Passwordless Authentication',
    howItWorks: 'Eliminates passwords entirely. Uses FIDO2/WebAuthn: cryptographic key pair stored on authenticator (security key or platform authenticator like Windows Hello, Touch ID).',
    technologies: ['FIDO2/WebAuthn (W3C standard)', 'Passkeys (Apple/Google/1Password implementation)', 'Biometric-only login', 'Magic links (email)'],
    advantages: ['No passwords to crack, phish, or reuse', 'Phishing-resistant (cryptographic challenge-response)', 'Seamless user experience'],
    adoption: 'Google, Microsoft, Apple pushing passkeys. Gaining mainstream adoption but legacy systems still need passwords.',
  },
];

const accessControlModels = [
  {
    model: 'Discretionary Access Control (DAC)',
    principle: 'Resource owner decides who can access.',
    example: 'Unix file permissions: owner rwx, group r-x, others r-x. Owner sets ACLs.',
    pros: 'Flexible, decentralized, easy to understand',
    cons: 'Owner mistakes propagate. No central control. Hard to audit at scale.',
  },
  {
    model: 'Mandatory Access Control (MAC)',
    principle: 'System enforces policy based on security labels. Users cannot override.',
    example: 'SELinux, AppArmor, Trusted Solaris. Mandatory compartmentalization in military/intel (Top Secret, Secret).',
    pros: 'Centralized, non-bypassable. Prevents privilege escalation.',
    cons: 'Complex to configure. Inflexible. High administrative overhead.',
  },
  {
    model: 'Role-Based Access Control (RBAC)',
    principle: 'Assign permissions to roles, users assigned to roles. \u201cLeast privilege\u201d implementation.',
    example: 'Active Directory: User → Role (Sales) → Permissions (read CRM, edit contacts). Separation of Duties (SoD) prevents conflicts.',
    pros: 'Scalable, manageable, aligns with organizational structure, follows least privilege',
    cons: 'Role explosion (thousands of roles). Static. May not handle dynamic/contextual access.',
  },
  {
    model: 'Attribute-Based Access Control (ABAC)',
    principle: 'Dynamic access decisions based on attributes of user, resource, environment, and action.',
    example: 'Policy: \u201cAllow access to financial reports IF user.department=Finance AND resource.sensitivity=Confidential AND time.business_hours\u201d',
    technical: 'XACML (eXtensible Access Control Markup Language) standard. Policies evaluated by Policy Decision Point (PDP).',
    pros: 'Fine-grained, contextual (time, location, device), flexible',
    cons: 'Complex policy management. Hard to debug. Performance overhead.',
  },
  {
    model: 'Policy-Based Access Control (PBAC)',
    principle: 'Combines RBAC and ABAC with real-time policy engine.',
    example: 'Google&apos;s BeyondCorp Zero Trust model: Access based on device health, user identity, and context—not network location.',
    trend: 'Modern identity providers (Okta, Azure AD) moving toward PBAC for cloud and remote workforce security.',
  },
];

const sessionManagement = [
  {
    concept: 'Session Tokens',
    description: 'Randomly generated unique identifier stored server-side (session store) and client-side (cookie).',
    example: 'Session ID: a7f4e9b2-8c3d-4a1f-9e2b-5c6d7e8f9a0b (128 bits of entropy)',
    security: 'Use cryptographically secure RNG. Set HttpOnly, Secure, SameSite=Strict/Lax flags. Regenerate on privilege escalation.',
  },
  {
    concept: 'JWT (JSON Web Token)',
    description: 'Self-contained token with payload (claims), signed with HMAC or RSA. No server-side session store needed.',
    structure: 'Header.{Algorithm}.Payload.{Claims}.Signature',
    pros: 'Stateless (no session DB), works across domains, REST-friendly',
    cons: 'Cannot revoke before expiry (unless maintain blocklist). XSS risk if stored in localStorage.',
  },
  {
    vulnerability: 'Session Fixation',
    description: 'Attacker sets victim&apos;s session ID before login (via link or app vulnerability). Victim logs in, attacker uses same session ID to hijack authenticated session.',
    fix: 'Regenerate session ID on authentication. Never accept session ID from URL parameter.',
  },
  {
    vulnerability: 'Session Hijacking',
    description: 'Steal session cookie via XSS, packet sniffing (unencrypted HTTP), or side-channel. Attacker presents stolen cookie to impersonate user.',
    defenses: ['HttpOnly cookies (not accessible to JavaScript)', 'Secure flag (HTTPS only)', 'SameSite attribute (CSRF protection)', 'Short session timeout and inactivity logout', 'IP/User-Agent binding (controversial, can break legitimate users)'],
  },
  {
    vulnerability: 'Session Expiry',
    description: 'Sessions must expire. Inactivity timeout (30 min), absolute timeout (8 hours). Refresh tokens for long-lived but revocable sessions.',
    bestPractice: 'OAuth 2.0: Access tokens short-lived (5-15 min), refresh tokens long-lived but require re-authentication periodically.',
  },
];

const realWorldIncidents = [
  {
    title: 'SolarWinds Supply Chain Compromise (2020)',
    summary: 'Attackers compromised SolarWinds build system, inserted backdoor into Orion updates signed with legitimate certificate. Distributed to 18,000+ customers including US federal agencies.',
    authFailure: 'Default credentials in build server, excessive trust in code signing certificates without additional verification, lack of network segmentation between build and signing systems.',
    lessons: ['Implement code signing with hardware security modules (HSM)', 'Enforce least privilege with zero standing access', 'Multi-party approval for production releases', 'Supply chain risk assessment mandatory'],
  },
  {
    title: 'Twitter Bitcoin Scam (2020)',
    summary: 'Attackers socially engineered Twitter employees using phone-based vishing, gained access to internal admin panel, posted fake Bitcoin giveaway from verified accounts (Obama, Musk, Gates).',
    authFailure: 'No MFA on admin panel for internal tools, weak internal verification processes for privileged access, lack of separation between support staff and production systems.',
    lessons: ['MFA mandatory for all admin access, especially privilege escalation', 'Implement privilege access management (PAM)', 'Segregation of duties\u2014support cannot access production directly', 'User behavior analytics to detect anomalous admin actions'],
  },
  {
    title: 'Capital One Data Breach (2019)',
    summary: 'Former AWS employee exploited misconfigured WAF rule to gain access to Capital One S3 bucket via SSRF vulnerability. Exposed 100M+ customer records.',
    authFailure: 'Overly permissive IAM role attached to web application firewall allowed SSRF to access internal metadata service, excessive privileges on S3 bucket (public read), no network segmentation between web and storage.',
    lessons: ['Principle of least privilege\u2014IAM roles scoped to minimum required', 'Defense in depth\u2014WAF shouldn\u2019t access internal metadata service', 'Cloud security posture management (CSPM) to detect misconfigurations', 'Network segmentation even in cloud'],
  },
];

export default function AuthenticationAuthorizationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-book-open-line" />
          Module 4 of 20 — Core Infrastructure
        </div>
        <DocHeading level={1}>Authentication, Authorization & Access Control</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          <strong className="text-cyber-cyan">Authentication</strong> (who you are) and <strong className="text-cyber-cyan">Authorization</strong> (what you can do) form the bedrock of security. These controls determine who accesses systems, data, and functions. Weak auth mechanisms are the top attack vector\u2014over 80% of breaches involve stolen or weak credentials.
        </p>
      </motion.div>

      {/* Authentication Factors */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>The Five Authentication Factors</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          True multi-factor authentication (MFA) requires two or more <em className="text-cyber-amber">independent</em> factors from different categories. Using two passwords isn\u2019t MFA\u2014same factor twice doesn\u2019t add security.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {authFactors.map((factor) => (
            <div key={factor.factor} className="cyber-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg bg-${factor.color}/10 border border-${factor.color}/20 flex items-center justify-center`}>
                  <i className={`${factor.icon} text-${factor.color}`} />
                </div>
                <h3 className="text-sm font-semibold text-white">{factor.factor}</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-cyber-cyan mb-1">Examples:</p>
                  <div className="flex flex-wrap gap-1">
                    {factor.examples.map((ex) => (
                      <span key={ex} className="px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-xs font-mono text-cyber-text">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-cyber-red mb-1">Security Profile:</p>
                  <p className="text-xs text-cyber-text leading-relaxed">{factor.strength}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-cyber-green mb-1">Best Practices:</p>
                  <ul className="text-xs text-cyber-green space-y-1 list-disc list-inside">
                    {factor.bestPractices?.map((practice) => (
                      <li key={practice}>{practice}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Callout type="danger" className="mt-6">
          <strong>NIST Guidelines (2024):</strong> SMS and voice OTP are <em>deprecated</em> for MFA due to SIM-swapping attacks. Use authenticator apps or hardware security keys. Passkeys and FIDO2 are now recommended as phishing-resistant credentials.
        </Callout>
      </motion.section>

      {/* Authentication Methods Deep Dive */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Authentication Methodologies</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          From primitive passwords to advanced passkeys, authentication systems have evolved dramatically. Each method balances security, usability, and deployment complexity.
        </p>

        <div className="mt-6 space-y-5">
          {authMethods.map((method, i) => (
            <div key={method.name} className="cyber-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyber-purple/10 border border-cyber-purple/20 flex items-center justify-center shrink-0">
                  <span className="text-cyber-purple font-bold font-mono">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-white">{method.name}</h3>
                    {method.methods && (
                      <span className="px-2 py-0.5 rounded bg-cyber-purple/10 text-cyber-purple text-xs font-mono">
                        {method.methods.join(', ')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-cyber-text mb-2"><strong>How it works:</strong> {method.howItWorks}</p>

                  {method.benefits && (
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-cyber-green mb-1">Key Benefits:</p>
                      <ul className="text-xs text-cyber-green list-disc list-inside">
                        {method.benefits.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {method.risks && (
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-cyber-red mb-1">Risks:</p>
                      <ul className="text-xs text-cyber-red list-disc list-inside">
                        {method.risks.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {method.vulnerabilities && (
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-cyber-red mb-1">Vulnerabilities:</p>
                      <ul className="text-xs text-cyber-red list-disc list-inside">
                        {method.vulnerabilities.map((v) => (
                          <li key={v}>{v}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-3 p-3 rounded-lg bg-cyber-red/5 border border-cyber-red/10">
                    <p className="text-xs text-cyber-red">
                      <strong>Breach Example:</strong> {method.recentBreach}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Access Control Models */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Access Control Models: Managing Who Does What</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Once authenticated, users need appropriate access to resources. Access control models define how permissions are structured and enforced. Modern systems use hybrid approaches combining multiple models.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4">
          {accessControlModels.map((model, i) => (
            <div key={model.model} className="cyber-card p-5">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-lg bg-cyber-green/10 border border-cyber-green/20 flex items-center justify-center shrink-0 text-cyber-green font-bold font-mono">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-white">{model.model}</h3>
                    <span className="px-2 py-0.5 rounded bg-cyber-green/10 text-cyber-green text-xs font-mono">
                      {model.principle}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-cyber-cyan mb-1">Example:</p>
                      <p className="text-xs text-cyber-text leading-relaxed p-2 bg-cyber-bg rounded">{model.example}</p>
                      {model.technical && (
                        <p className="text-xs text-cyber-amber mt-2"><strong>Standard:</strong> {model.technical}</p>
                      )}
                    </div>
                    <div>
<p className="text-xs font-semibold text-cyber-green mb-1">Pros:</p>
                       <ul className="text-xs text-cyber-green list-disc list-inside">
                         {model.pros?.split('. ').map((p) => p && <li key={p}>{p}</li>)}
                       </ul>
                       <p className="text-xs font-semibold text-cyber-red mt-2 mb-1">Cons:</p>
                       <ul className="text-xs text-cyber-red list-disc list-inside">
                         {model.cons?.split('. ').map((c) => c && <li key={c}>{c}</li>)}
                       </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Callout type="info" className="mt-6">
          <strong>Modern Trend:</strong> Large enterprises (Google BeyondCorp, Microsoft Zero Trust) are adopting <strong>Policy-Based Access Control</strong> with real-time context (device health, user risk, location) rather than static network-based trust.
        </Callout>
      </motion.section>

      {/* Session Management & Vulnerabilities */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Session Management & Common Vulnerabilities</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          After authentication, session management maintains the authenticated state across multiple requests. Broken session management leads to account takeover.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Token Types</h3>
            <div className="space-y-3">
              {sessionManagement.slice(0, 2).map((token) => (
                <div key={token.concept} className="p-3 rounded bg-cyber-bg border border-cyber-border">
                  <h4 className="text-xs font-semibold text-cyber-cyan">{token.concept}</h4>
                  <p className="text-xs text-cyber-text mt-1 mb-2">{token.description}</p>
                  {token.structure && (
                    <p className="text-xs text-cyber-amber font-mono">{token.structure}</p>
                  )}
                  {token.pros && (
                    <div className="mt-2 text-xs">
                      <span className="text-cyber-green">✓ {token.pros}</span>
                    </div>
                  )}
                  {token.cons && (
                    <div className="mt-1 text-xs">
                      <span className="text-cyber-red">✗ {token.cons}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Session Vulnerabilities</h3>
            <div className="space-y-3">
              {sessionManagement.slice(2).map((vuln) => (
                <div key={vuln.vulnerability}>
                  <h4 className="text-xs font-semibold text-cyber-red">{vuln.vulnerability}</h4>
                  <p className="text-xs text-cyber-text mt-1">{vuln.description}</p>
{vuln.fix && (
                     <div className="mt-1">
                       <p className="text-xs font-semibold text-cyber-green">Fix:</p>
                       <ul className="text-xs text-cyber-green list-disc list-inside">
                         {(vuln.defenses || []).map((def: string) => (
                           <li key={def}>{def}</li>
                         ))}
                       </ul>
                     </div>
                   )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Real-World Incidents */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Real-World Authentication & Access Control Failures</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          These incidents demonstrate the catastrophic impact of weak authentication and excessive privileges.
        </p>

        <div className="mt-6 space-y-4">
          {realWorldIncidents.map((incident, i) => (
            <div key={incident.title} className="cyber-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyber-red/10 border border-cyber-red/20 flex items-center justify-center shrink-0">
                  <span className="text-cyber-red font-bold text-sm">#{i + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-1">{incident.title}</h3>
                  <p className="text-xs text-cyber-text mb-3">{incident.summary}</p>

                  <div className="p-3 rounded bg-cyber-red/5 border border-cyber-red/10 mb-3">
                    <p className="text-xs text-cyber-red">
                      <strong>Authentication/Authorization Failure:</strong> {incident.authFailure}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-cyber-green mb-2">Lessons Learned:</p>
                    <ul className="text-xs text-cyber-green list-disc list-inside space-y-1">
                      {incident.lessons.map((lesson) => (
                        <li key={lesson}>{lesson}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Zero Trust */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Zero Trust: Never Trust, Always Verify</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Traditional perimeter security assumes everything inside the network is trusted. <strong>Zero Trust</strong> assumes breach and verifies every request, regardless of origin.
        </p>

        <div className="mt-6 cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Zero Trust Core Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Verify Explicitly',
                desc: 'Authenticate and authorize based on all available data points: identity, device health, location, service, data classification.',
              },
              {
                title: 'Use Least Privileged Access',
                desc: 'Just-in-time and just-enough access. Limiting user access with Just-In-Time and Just-Enough-Access policies.',
              },
              {
                title: 'Assume Breach',
                desc: 'Segment networks, use end-to-end encryption, monitor for anomalies. Treat every access request as potentially malicious.',
              },
            ].map((principle) => (
              <div key={principle.title} className="p-3 rounded-lg bg-cyber-bg border border-cyber-border">
                <h4 className="text-xs font-semibold text-cyber-cyan mb-1">{principle.title}</h4>
                <p className="text-xs text-cyber-text leading-relaxed">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Callout type="success" className="mt-6">
          <strong>Implementation:</strong> Zero Trust requires identity as primary perimeter, device health verification, microsegmentation, and continuous monitoring. Microsoft, Google, and major cloud providers have adopted Zero Trust architectures after recognizing that traditional perimeter security is obsolete in cloud/mobile era.
        </Callout>
      </motion.section>

      {/* Key Takeaways */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Key Takeaways</DocHeading>
        <ul className="mt-4 space-y-2 text-cyber-text text-sm">
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>MFA is non-negotiable</strong> for any privileged or remote access. Blocks 99.9% of automated attacks.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Passwords alone are broken</strong>. Credential stuffing, phishing, and breaches make password-only auth unacceptable.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>RBAC scales; ABAC contextualizes</strong>. RBAC for static roles, ABAC when access depends on dynamic attributes (time, location, risk).</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Least privilege lifecycle</strong>: access granted for specific duration, revoked when no longer needed. Not permanent entitlements.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Session security</strong>: secure cookies (HttpOnly, Secure, SameSite), short timeouts, regeneration on privilege change.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="ri-checkbox-circle-fill text-cyber-green mt-0.5" />
            <span><strong>Zero Trust is the future</strong>: perimeter is everywhere, identity is the control plane, continuous verification replaces trust.</span>
          </li>
        </ul>
      </motion.section>

      {/* Further Reading */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Further Reading & Resources</DocHeading>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { title: 'NIST SP 800-63B (Digital Identity Guidelines)', desc: 'Comprehensive federal guidelines on authentication and lifecycle management including MFA requirements.', link: '#' },
            { title: 'OWASP Authentication Cheat Sheet', desc: 'Practical guide to implementing secure authentication in applications, covering MFA, session management, password storage.', link: '#' },
            { title: 'FIDO Alliance Specifications', desc: 'Open standards for passwordless authentication using public key cryptography and hardware authenticators.', link: '#' },
            { title: 'Zero Trust Architecture (NIST SP 800-207)', desc: 'Official NIST guidance on implementing Zero Trust principles across enterprise environments.', link: '#' },
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
            <i className="ri-book-open-line" /> Module 4 of 20
          </div>
          <div className="flex gap-3">
            <a href="/cybersecurity/cryptography-basics" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
              <i className="ri-arrow-left-line mr-1" /> Cryptography
            </a>
            <a href="/cybersecurity/quiz-1" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Next: Quiz 1 <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
