'use client'
import { usePathname } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

// Fully deterministic positions using integer math — no floating point variance
const PARTICLE_COUNT = 20;
// Simple LCG pseudo-random generator with fixed seed
class SeededRandom {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next(): number {
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
    return this.seed / 4294967296;
  }
}
const rng = new SeededRandom(12345);
const particlePositions = Array.from({ length: PARTICLE_COUNT }, () => ({
  top: rng.next(),
  left: rng.next(),
}));

const toolSections = [
  {
    title: 'Network Scanning',
    tools: [
      { name: 'Nmap', href: '/nmap', icon: 'ri-radar-line', color: 'cyan', desc: 'Port scanner & network mapper' },
      { name: 'Netcat', href: '/netcat', icon: 'ri-terminal-box-line', color: 'amber', desc: 'TCP/UDP Swiss army knife' },
    ],
  },
  {
    title: 'Web Enumeration',
    tools: [
      { name: 'Gobuster', href: '/gobuster', icon: 'ri-folder-open-line', color: 'red', desc: 'Directory & DNS brute force' },
      { name: 'Burp Suite', href: '/burp-suite', icon: 'ri-bug-line', color: 'purple', desc: 'Web application testing' },
    ],
  },
  {
    title: 'Analysis & Cracking',
    tools: [
      { name: 'Wireshark', href: '/wireshark', icon: 'ri-shield-check-line', color: 'green', desc: 'Packet analysis & capture' },
      { name: 'John the Ripper', href: '/john-the-ripper', icon: 'ri-lock-unlock-line', color: 'orange', desc: 'Password cracking' },
      { name: 'SQLMap', href: '/sqlmap', icon: 'ri-database-2-line', color: 'blue', desc: 'SQL injection automation' },
    ],
  },
  {
    title: 'Protocol & SSL',
    tools: [
      { name: 'SSLScan', href: '/sslscan', icon: 'ri-shield-keyhole-line', color: 'pink', desc: 'SSL/TLS security scanner' },
      { name: 'Metasploit', href: '/metasploit', icon: 'ri-fire-line', color: 'yellow', desc: 'Exploitation framework' },
    ],
  },
];

const colorClasses = {
  cyan: 'text-cyber-cyan border-cyber-cyan/20 bg-cyber-cyan/10 hover:bg-cyber-cyan/20',
  amber: 'text-cyber-amber border-cyber-amber/20 bg-cyber-amber/10 hover:bg-cyber-amber/20',
  red: 'text-cyber-red border-cyber-red/20 bg-cyber-red/10 hover:bg-cyber-red/20',
  purple: 'text-cyber-purple border-cyber-purple/20 bg-cyber-purple/10 hover:bg-cyber-purple/20',
  green: 'text-cyber-green border-cyber-green/20 bg-cyber-green/10 hover:bg-cyber-green/20',
  orange: 'text-cyber-orange border-cyber-orange/20 bg-cyber-orange/10 hover:bg-cyber-orange/20',
  blue: 'text-cyber-blue border-cyber-blue/20 bg-cyber-blue/10 hover:bg-cyber-blue/20',
  pink: 'text-cyber-pink border-cyber-pink/20 bg-cyber-pink/10 hover:bg-cyber-pink/20',
  yellow: 'text-cyber-yellow border-cyber-yellow/20 bg-cyber-yellow/10 hover:bg-cyber-yellow/20',
};

export default function NotFound() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [showConsole, setShowConsole] = useState(false);
  const [terminalLines] = useState([
    { type: 'output', text: 'cybersec.devctr v3.1.0 — Documentation Node Explorer' },
    { type: 'output', text: '────────────────────────────────────────────────────────' },
    { type: 'input', text: `NODE_QUERY "${pathname}"` },
    { type: 'error', text: '✗ ERROR: NODE_NOT_FOUND in knowledge_base' },
    { type: 'output', text: '> SCANNING ALTERNATIVE ROUTES...' },
    { type: 'output', text: '✓ Found 15 active documentation nodes' },
    { type: 'output', text: '' },
    { type: 'input', text: 'SUGGEST_NODE' },
  ]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(useTransform(mouseX, [0, 1], [0, 20]), springConfig);
  const y = useSpring(useTransform(mouseY, [0, 1], [0, 20]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const allTools = toolSections.flatMap((s) => s.tools);
  const filteredTools = searchQuery ? allTools.filter((tool) => tool.name.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  const handleToolClick = () => {
    setSearchQuery('');
    setShowConsole(false);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-cyber-bg relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(cyber-cyan 1px, transparent 1px), linear-gradient(90deg, cyber-cyan 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite',
        }} />
        <style jsx>{`
          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 50px 50px; }
          }
        `}</style>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyber-red/40"
            style={{
              top: `${pos.top * 100}%`,
              left: `${pos.left * 100}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              x: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + (rng.next() * 2),
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Corner Brackets */}
      <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-cyber-red/30 rounded-tl-lg" />
      <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-cyber-red/30 rounded-tr-lg" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-cyber-red/30 rounded-bl-lg" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-cyber-red/30 rounded-br-lg" />

      <motion.div
        ref={containerRef}
        className="relative w-full max-w-7xl"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6 }}
      >
        {/* Main Error Display */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-cyber-red/10 border-2 border-cyber-red/30 mb-8 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <i className="ri-close-circle-line text-5xl text-cyber-red" />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyber-red"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Glitch 404 Text */}
          <div className="relative inline-block mb-6">
            <motion.span
              className="text-[8rem] md:text-[12rem] font-black text-cyber-red/15 select-none block"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              404
            </motion.span>
            <motion.div
              className="absolute inset-0 text-[8rem] md:text-[12rem] font-black text-cyber-red/20 select-none block -z-10 blur-xl"
              style={{ x, y }}
            >
              404
            </motion.div>
          </div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Knowledge Node Not Found
          </motion.h1>

          <motion.p
            className="text-xl text-cyber-text max-w-2xl mx-auto mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            The documentation node <code className="px-3 py-1 bg-cyber-red/10 border border-cyber-red/30 rounded text-cyber-cyan font-mono text-sm font-semibold">{pathname}</code> does not exist in the current knowledge base.
          </motion.p>

          <motion.p
            className="text-sm text-cyber-text/60 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            This could mean the page was moved, deleted, or never created. Use search below or navigate to an existing tool.
          </motion.p>
        </div>

        {/* Search Bar with Toggle */}
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="relative">
            <i className="ri-search-line absolute left-5 top-1/2 -translate-y-1/2 text-cyber-red text-xl" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) setShowConsole(false);
              }}
              onFocus={() => setShowConsole(false)}
              placeholder="Search tools, topics, or commands..."
              className="w-full bg-cyber-bg border border-cyber-border rounded-xl pl-14 pr-12 py-5 text-base text-cyber-text placeholder:text-cyber-text/50 focus:outline-none focus:border-cyber-red focus:ring-2 focus:ring-cyber-red/25 transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cyber-text/50 hover:text-cyber-red transition-colors"
              >
                <i className="ri-close-line text-xl" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          {!searchQuery && (
            <motion.div
              className="mt-4 flex flex-wrap gap-2 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {['nmap', 'netcat', 'gobuster', 'wireshark'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1.5 rounded-full bg-cyber-bg border border-cyber-border text-xs text-cyber-text hover:border-cyber-cyan hover:text-cyber-cyan transition-all uppercase tracking-wide"
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Search Results / Quick Tools */}
        {(searchQuery || showConsole) && (
          <motion.div
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {filteredTools.length > 0 ? (
              <div className="bg-cyber-bg-card border border-cyber-border rounded-xl overflow-hidden divide-y divide-cyber-border">
                <div className="px-4 py-3 bg-cyber-bg text-xs font-semibold text-cyber-red uppercase tracking-wider">
                  Search Results ({filteredTools.length})
                </div>
                {filteredTools.map((tool, i) => (
                  <motion.a
                    key={tool.href}
                    href={tool.href}
                    onClick={handleToolClick}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-cyber-bg transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span className={`w-12 h-12 rounded-lg border flex items-center justify-center shrink-0 text-lg ${colorClasses[tool.color as keyof typeof colorClasses].split(' ').slice(0, 3).join(' ')}`}>
                      <i className={tool.icon} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{tool.name}</p>
                      <p className="text-xs text-cyber-text/70 font-mono truncate">{tool.href}</p>
                    </div>
                    <i className="ri-arrow-right-line text-cyber-text/30 text-lg" />
                  </motion.a>
                ))}
              </div>
            ) : searchQuery && (
              <div className="bg-cyber-bg-card border border-cyber-border rounded-xl p-6 text-center">
                <i className="ri-search-eye-line text-3xl text-cyber-text/30 mb-2" />
                <p className="text-sm text-cyber-text/70">No results for "{searchQuery}"</p>
                <p className="text-xs text-cyber-text/50 mt-1">Try browsing categories below instead.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Terminal Console Toggle */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowConsole(!showConsole)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-bg border border-cyber-border text-xs text-cyber-text hover:border-cyber-cyan hover:text-cyber-cyan transition-all font-mono"
          >
            <i className={`ri-terminal-box-line ${showConsole ? 'text-cyber-cyan' : ''}`} />
            {showConsole ? 'Hide' : 'Show'} Debug Console
          </button>
        </div>

        {/* Terminal Output */}
        {showConsole && (
          <motion.div
            className="max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-black/80 border border-cyber-border rounded-xl overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="bg-cyber-bg-card border-b border-cyber-border px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-cyber-red" />
                  <span className="w-3 h-3 rounded-full bg-cyber-amber" />
                  <span className="w-3 h-3 rounded-full bg-cyber-green" />
                </div>
                <span className="text-xs text-cyber-text/60 font-mono ml-2">diagnostic_terminal — bash — 80×24</span>
              </div>
              {/* Terminal Body */}
              <div className="p-4 font-mono text-sm space-y-1">
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`
                      ${line.type === 'error' ? 'text-cyber-red' : line.type === 'input' ? 'text-cyber-cyan' : 'text-cyber-text'}
                    `}
                  >
                    <span className="text-cyber-text/40 mr-2">[{i + 1}]</span>
                    {line.text}
                  </motion.div>
                ))}
                <motion.span
                  className="text-cyber-green block mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                >
                  <span className="text-cyber-text/40">[8]</span> █
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tool Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12"
          variants={stagger}
          initial="hidden"
          animate="visible"
          transition={{ delay: showConsole ? 1.0 : 0.9 }}
        >
          {toolSections.map((section) => (
            <div key={section.title} className="cyber-card p-5 group">
              <h2 className="text-xs font-semibold text-cyber-red uppercase tracking-wider mb-4 flex items-center gap-2">
                <i className="ri-folder-3-line" />
                {section.title}
              </h2>
              <div className="space-y-2">
                {section.tools.map((tool) => {
                  const colors = colorClasses[tool.color as keyof typeof colorClasses];
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={handleToolClick}
                      className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg border border-cyber-border hover:border-cyber-cyan/60 hover:bg-cyber-bg-card hover:shadow-lg hover:shadow-cyber-cyan/10 transition-all group/tool"
                    >
                      <span className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 group-hover/tool:scale-110 transition-transform ${colors.split(' ').slice(0, 3).join(' ')}`}>
                        <i className={tool.icon} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{tool.name}</p>
                        <p className="text-xs text-cyber-text/70 truncate mt-0.5">{tool.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Link
            href="/"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyber-red to-cyber-red/80 text-white text-sm font-bold hover:from-cyber-red/90 hover:to-cyber-red/70 transition-all shadow-lg shadow-cyber-red/25 whitespace-nowrap group"
          >
            <i className="ri-home-4-line mr-2 group-hover:scale-110 transition-transform inline-block" />
            Home Base
          </Link>
          <Link
            href="/getting-started"
            className="px-8 py-3.5 rounded-xl bg-cyber-bg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-cyan hover:text-cyber-cyan hover:bg-cyber-bg-card transition-all whitespace-nowrap group"
          >
            <i className="ri-compass-3-line mr-2 group-hover:rotate-12 transition-transform inline-block" />
            Browse All
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3.5 rounded-xl border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber hover:bg-cyber-amber/5 transition-all whitespace-nowrap group"
          >
            <i className="ri-arrow-left-line mr-2 group-hover:-translate-x-1 transition-transform inline-block" />
            Go Back
          </button>
        </motion.div>

        {/* Status Footer */}
        <motion.div
          className="mt-16 pt-8 border-t border-cyber-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-cyber-text/50 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            SYSTEM ONLINE — cybersec.devctr v3.1.0
          </div>
          <div className="flex items-center gap-4">
            <span>NODES ACTIVE: 15</span>
            <span className="text-cyber-text/30">●</span>
            <span>STATUS: SCANNING</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
