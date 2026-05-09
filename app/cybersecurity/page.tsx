'use client'
import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const modules = [
  {
    path: '/cybersecurity/foundations-security-mindset',
    title: 'Foundations of Cybersecurity & Security Mindset',
    desc: 'Core security principles, CIA triad, threat modeling, defense in depth, and cultivating a security-first mentality.',
    icon: 'ri-shield-check-line',
  },
  {
    path: '/cybersecurity/networking-osi-fundamentals',
    title: 'Networking Fundamentals & OSI Model Deep Dive',
    desc: 'TCP/IP stack, subnetting, routing, switching, firewalls, and how data flows through networks.',
    icon: 'ri-network-line',
  },
  {
    path: '/cybersecurity/cryptography-basics',
    title: 'Cryptography Basics & Encryption Principles',
    desc: 'Symmetric vs asymmetric encryption, hashing, digital signatures, PKI, SSL/TLS, and real-world applications.',
    icon: 'ri-lock-password-line',
  },
  {
    path: '/cybersecurity/authentication-authorization',
    title: 'Authentication, Authorization & Access Control',
    desc: 'Multi-factor authentication, RBAC, ABAC, least privilege, session management, and identity federation.',
    icon: 'ri-key-line',
  },
  {
    path: '/cybersecurity/quiz-1',
    title: 'Quiz 1: Foundations & Core Concepts',
    desc: 'Test your knowledge of cybersecurity fundamentals, networking, cryptography, and access control (Modules 1-4).',
    icon: 'ri-questionnaire-line',
    quiz: true,
  },
  {
    path: '/cybersecurity/common-vulnerabilities-owasp',
    title: 'Common Vulnerabilities & OWASP Top 10',
    desc: 'Injection attacks, XSS, CSRF, broken authentication, SSRF, XXE, and secure coding practices.',
    icon: 'ri-bug-line',
  },
  {
    path: '/cybersecurity/malware-threat-landscape',
    title: 'Malware Analysis & Threat Landscape',
    desc: 'Viruses, worms, trojans, ransomware, APTs, malware analysis techniques, and threat intelligence.',
    icon: 'ri-virus-line',
  },
  {
    path: '/cybersecurity/incident-response-forensics',
    title: 'Incident Response & Digital Forensics',
    desc: 'IR lifecycle, detection, containment, eradication, recovery, evidence handling, and chain of custody.',
    icon: 'ri-search-eye-line',
  },
  {
    path: '/cybersecurity/security-operations-soc',
    title: 'Security Operations & Monitoring (SOC)',
    desc: 'SIEM, log management, threat hunting, SOAR, EDR, IDS/IPS, and security metrics/KPIs.',
    icon: 'ri-dashboard-3-line',
  },
  {
    path: '/cybersecurity/quiz-2',
    title: 'Quiz 2: Threats, Response & Operations',
    desc: 'Test your knowledge of vulnerabilities, malware, incident response, and security operations (Modules 5-8).',
    icon: 'ri-questionnaire-line',
    quiz: true,
  },
  {
    path: '/cybersecurity/pentesting-methodologies',
    title: 'Penetration Testing Methodologies',
    desc: 'PTES, OSSTMM, NIST, ATT&CK framework, reconnaissance, scanning, exploitation, post-exploitation.',
    icon: 'ri-magic-line',
  },
  {
    path: '/cybersecurity/web-app-security',
    title: 'Web Application Security Deep Dive',
    desc: 'Input validation, session management, API security, secure headers, code review, and penetration testing.',
    icon: 'ri-global-line',
  },
  {
    path: '/cybersecurity/wireless-network-security',
    title: 'Wireless & Network Security',
    desc: 'WPA2/WPA3, rogue APs, evil twin attacks, Bluetooth security, NFC, and wireless penetration testing.',
    icon: 'ri-wifi-line',
  },
  {
    path: '/cybersecurity/cloud-devops-security',
    title: 'Cloud Security & DevOps Security',
    desc: 'CIS benchmarks, CSPM, container security, Kubernetes security, IaC scanning, and shared responsibility.',
    icon: 'ri-cloud-line',
  },
  {
    path: '/cybersecurity/quiz-3',
    title: 'Quiz 3: Advanced Attack & Defense',
    desc: 'Test your knowledge of penetration testing, web security, wireless, and cloud security (Modules 9-12).',
    icon: 'ri-questionnaire-line',
    quiz: true,
  },
  {
    path: '/cybersecurity/mobile-iot-security',
    title: 'Mobile & IoT Security',
    desc: 'Android/iOS security models, app reverse engineering, IoT protocols, embedded device vulnerabilities.',
    icon: 'ri-smartphone-line',
  },
  {
    path: '/cybersecurity/social-engineering',
    title: 'Social Engineering & The Human Factor',
    desc: 'Phishing, vishing, tailgating, pretexting, psychological manipulation, security awareness training.',
    icon: 'ri-user-smile-line',
  },
  {
    path: '/cybersecurity/encryption-cryptanalysis',
    title: 'Encryption & Cryptanalysis',
    desc: 'Advanced encryption algorithms, hash collisions, side-channel attacks, quantum cryptography threats.',
    icon: 'ri-code-s-slash-line',
  },
  {
    path: '/cybersecurity/security-architecture',
    title: 'Security Architecture & Design Principles',
    desc: 'Zero trust, defense in depth, fail-safe defaults, secure by design, and security patterns.',
    icon: 'ri-building-2-line',
  },
  {
    path: '/cybersecurity/quiz-4',
    title: 'Quiz 4: Emerging Domains & Architecture',
    desc: 'Test your knowledge of mobile/IoT, social engineering, cryptanalysis, and security architecture (Modules 13-16).',
    icon: 'ri-questionnaire-line',
    quiz: true,
  },
  {
    path: '/cybersecurity/compliance-legal-ethics',
    title: 'Compliance, Legal & Ethics in Cybersecurity',
    desc: 'GDPR, HIPAA, PCI-DSS, SOX, cybercrime laws, responsible disclosure, ethical hacking principles.',
    icon: 'ri-gavel-line',
  },
  {
    path: '/cybersecurity/devsecops-secure-sdlc',
    title: 'DevSecOps & Secure SDLC',
    desc: 'Security requirements, threat modeling, SAST, DAST, SCA, dependency scanning, CI/CD security gates.',
    icon: 'ri-git-branch-line',
  },
  {
    path: '/cybersecurity/threat-intelligence',
    title: 'Threat Intelligence & Analysis',
    desc: 'ATT&CK framework, threat feeds, TTPs, IOC management, OSINT, and intelligence-driven defense.',
    icon: 'ri-radar-line',
  },
  {
    path: '/cybersecurity/career-paths-future',
    title: 'Career Paths & The Future of Cybersecurity',
    desc: 'Industry roles, certifications, specializations, emerging technologies, and building a cybersecurity career.',
    icon: 'ri-compass-3-line',
  },
  {
    path: '/cybersecurity/final-exam',
    title: 'Final Comprehensive Exam',
    desc: 'Comprehensive assessment covering all 20 modules. Test your complete cybersecurity knowledge.',
    icon: 'ri-file-list-3-line',
    exam: true,
  },
];

export default function CybersecurityLandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const regularModules = modules.filter(m => !m.quiz && !m.exam);
  const quizzes = modules.filter(m => m.quiz);
  const exam = modules.filter(m => m.exam);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
          <i className="ri-shield-check-line" />
          Complete Cybersecurity Curriculum
        </div>
        <DocHeading level={1}>Cybersecurity — From Fundamentals to Mastery</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          <strong className="text-cyber-cyan">20 comprehensive modules</strong> covering everything from cybersecurity foundations to advanced topics. Each module includes detailed explanations, real-world incident analysis, practical analogies, hands-on examples, and knowledge checks. Progress through modules 1–4, complete Quiz 1, then continue through the full curriculum with three more quizzes and a final comprehensive exam.
        </p>
      </motion.div>

      {/* Course Structure Overview */}
      <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Course Structure</DocHeading>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {[
            { title: 'Modules 1–4', subtitle: 'Foundations', desc: 'Security mindset, networking, cryptography, and access control fundamentals.', color: 'cyber-cyan' },
            { title: 'Modules 5–8', subtitle: 'Threats & Response', desc: 'Vulnerabilities, malware analysis, incident response, and SOC operations.', color: 'cyber-red' },
            { title: 'Modules 9–12', subtitle: 'Offensive Security', desc: 'Penetration testing, web app security, wireless security, and cloud security.', color: 'cyber-amber' },
            { title: 'Modules 13–16', subtitle: 'Advanced Domains', desc: 'Mobile/IoT, social engineering, cryptanalysis, and security architecture.', color: 'cyber-green' },
            { title: 'Modules 17–20', subtitle: 'Professional Practice', desc: 'Compliance, DevSecOps, threat intelligence, and career development.', color: 'cyber-purple' },
          ].map((block) => (
            <div key={block.title} className="cyber-card p-4">
              <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full bg-${block.color}/10 border border-${block.color}/20 text-${block.color} text-xs font-medium font-mono mb-2`}>
                {block.subtitle}
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{block.title}</h3>
              <p className="text-xs text-cyber-text leading-relaxed">{block.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Regular Modules */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-white mb-4">Learning Modules (1–20)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {regularModules.map((m) => (
            <a
              key={m.path}
              href={m.path}
              className="cyber-card p-4 hover:border-cyber-amber/50 transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyber-bg-card border border-cyber-border flex items-center justify-center shrink-0 text-cyber-amber group-hover:bg-cyber-amber/10 transition-colors">
                  <i className={m.icon} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-cyber-amber transition-colors">{m.title}</h3>
                  <p className="text-xs text-cyber-text mt-1 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </motion.section>

      {/* Knowledge Checks */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-lg font-semibold text-white mb-4">Knowledge Checks & Assessments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quizzes.map((q) => (
            <a
              key={q.path}
              href={q.path}
              className="cyber-card p-4 hover:border-cyber-red/50 transition-all group border-cyber-red/20"
            >
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyber-red/10 border border-cyber-red/20 flex items-center justify-center shrink-0 text-cyber-red group-hover:bg-cyber-red/20 transition-colors">
                  <i className={q.icon} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-cyber-red transition-colors">{q.title}</h3>
                  <p className="text-xs text-cyber-text mt-1 leading-relaxed">{q.desc}</p>
                </div>
              </div>
            </a>
          ))}
          {exam.map((e) => (
            <a
              key={e.path}
              href={e.path}
              className="cyber-card p-4 hover:border-cyber-green/50 transition-all group border-cyber-green/20 sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyber-green/10 border border-cyber-green/20 flex items-center justify-center shrink-0 text-cyber-green group-hover:bg-cyber-green/20 transition-colors">
                  <i className={e.icon} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-cyber-green transition-colors">{e.title}</h3>
                  <p className="text-xs text-cyber-text mt-1 leading-relaxed">{e.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </motion.section>

      {/* Recommended Learning Path */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Recommended Learning Path</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Follow this sequence for optimal learning progression. Each module builds on previous knowledge.
        </p>
        <div className="mt-6 space-y-3">
          {[
            { num: '1', title: 'Start with Modules 1–4 (Foundations)', desc: 'Build essential cybersecurity mental models before advancing.', path: '/cybersecurity/foundations-security-mindset' },
            { num: '2', title: 'Complete Quiz 1', desc: 'Validate your understanding of core concepts.', path: '/cybersecurity/quiz-1' },
            { num: '3', title: 'Progress through Modules 5–8 (Threats & Response)', desc: 'Learn to recognize and respond to real-world attacks.', path: '/cybersecurity/common-vulnerabilities-owasp' },
            { num: '4', title: 'Complete Quiz 2', desc: 'Test your threat intelligence and operational knowledge.', path: '/cybersecurity/quiz-2' },
            { num: '5', title: 'Advance through Modules 9–12 (Offensive Security)', desc: 'Master penetration testing and web/cloud security techniques.', path: '/cybersecurity/pentesting-methodologies' },
            { num: '6', title: 'Complete Quiz 3', desc: 'Assess your offensive security capabilities.', path: '/cybersecurity/quiz-3' },
            { num: '7', title: 'Study Modules 13–16 (Advanced Domains)', desc: 'Explore mobile security, human factors, cryptography, and architecture.', path: '/cybersecurity/mobile-iot-security' },
            { num: '8', title: 'Complete Quiz 4', desc: 'Verify your advanced topic comprehension.', path: '/cybersecurity/quiz-4' },
            { num: '9', title: 'Finish Modules 17–20 (Professional Practice)', desc: 'Understand compliance, DevSecOps, threat intelligence, and career planning.', path: '/cybersecurity/compliance-legal-ethics' },
            { num: '10', title: 'Take Final Exam', desc: 'Comprehensive assessment of your cybersecurity mastery.', path: '/cybersecurity/final-exam' },
          ].map((step) => (
            <div key={step.num} className="flex gap-4 p-3 rounded-lg bg-cyber-bg border border-cyber-border hover:border-cyber-amber/30 transition-all">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-7 h-7 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 flex items-center justify-center text-cyber-amber text-xs font-bold font-mono">
                  {step.num}
                </div>
                {parseInt(step.num) < 10 && (
                  <div className="w-px flex-1 bg-cyber-border mt-1" />
                )}
              </div>
              <div className="flex-1">
                <a href={step.path} className="text-sm font-semibold text-cyber-cyan hover:text-cyber-amber transition-colors">
                  {step.title}
                </a>
                <p className="text-xs text-cyber-text mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* How to Use This Course */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>How to Use This Course</DocHeading>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'For Beginners',
              desc: 'Start with Module 1 and progress sequentially. Focus on understanding concepts before moving on. Take notes, use the provided real-world examples, and complete recommended hands-on exercises with tools like Nmap, Wireshark, and Burp Suite.',
            },
            {
              title: 'For IT Professionals',
              desc: 'Skim familiar topics but pay attention to security-specific perspectives. Use this as a reference framework and focus on modules relevant to your target certification path (CISSP, OSCP, CEH, etc.).',
            },
            {
              title: 'For Security Practitioners',
              desc: 'Use advanced modules to deepen specialized knowledge. Reference real incident case studies and threat intelligence examples for your organization&apos;s security program development.',
            },
            {
              title: 'For Students & Career Changers',
              desc: 'Follow the complete learning path. Use Module 20 for certification roadmap planning. Join cybersecurity communities, attend meetups, and build a home lab to practice skills.',
            },
          ].map((item) => (
            <div key={item.title} className="cyber-card p-5">
              <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-cyber-text leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Learning Philosophy */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Our Learning Philosophy</DocHeading>
        <div className="mt-6 space-y-4">
          <Callout type="info">
            <strong className="text-cyber-cyan">Real-World Incidents:</strong> Each module analyzes actual cybersecurity events (Target breach, Equifax, SolarWinds, Colonial Pipeline) to illustrate concepts in concrete, memorable ways.
          </Callout>
          <Callout type="success">
            <strong className="text-cyber-cyan">Practical Analogies:</strong> Complex topics are explained through everyday metaphors (castle moats for defense-in-depth, locked diaries for encryption) to build intuitive understanding.
          </Callout>
          <Callout type="warning">
            <strong className="text-cyber-cyan">Progressive Difficulty:</strong> Modules build from fundamental principles (CIA triad) to advanced topics (quantum cryptanalysis), ensuring no knowledge gaps.
          </Callout>
          <Callout type="danger">
            <strong className="text-cyber-cyan">Ethical Emphasis:</strong> Every module reinforces legal boundaries, responsible disclosure, and the ethical responsibilities of security professionals.
          </Callout>
        </div>
      </motion.section>

      {/* Start Learning CTA */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-6 text-center">
          <h2 className="text-lg font-semibold text-white mb-2">Begin Your Cybersecurity Journey</h2>
          <p className="text-sm text-cyber-text mb-6">
            Start with <span className="text-cyber-cyan font-semibold">Module 1: Foundations of Cybersecurity & Security Mindset</span> and take the first step toward cybersecurity mastery.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <a href="/cybersecurity/foundations-security-mindset" className="px-6 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              Start Learning <i className="ri-arrow-right-line ml-1" />
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
