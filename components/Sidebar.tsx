'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Home', path: '/', icon: 'ri-home-4-line' },
      { label: 'CyberSec Fundamentals', path: '/getting-started', icon: 'ri-rocket-line' },
    ],
  },
  {
    title: 'WIRESHARK',
    items: [
      { label: 'Wireshark Overview', path: '/wireshark', icon: 'ri-shield-check-line' },
      { label: 'Capture Filters', path: '/wireshark/capture-filters', icon: 'ri-filter-3-line' },
      { label: 'Display Filters', path: '/wireshark/display-filters', icon: 'ri-search-line' },
      { label: 'Filter Builder', path: '/wireshark/filter-builder', icon: 'ri-tools-line' },
      { label: 'Protocol Analysis', path: '/wireshark/protocol-analysis', icon: 'ri-exchange-line' },
      { label: 'Advanced Features', path: '/wireshark/advanced-features', icon: 'ri-bar-chart-grouped-line' },
      { label: 'Command Line', path: '/wireshark/command-line', icon: 'ri-terminal-line' },
      { label: 'Troubleshooting', path: '/wireshark/troubleshooting', icon: 'ri-bug-line' },
      { label: 'Wireshark Quiz', path: '/wireshark/wireshark-quiz', icon: 'ri-questionnaire-line' },
      { label: 'Wireshark Lab', path: '/wireshark/wireshark-lab', icon: 'ri-flask-line' },
    ],
  },
  {
    title: 'NMAP',
    items: [
      { label: 'Nmap Overview', path: '/nmap', icon: 'ri-shield-check-line' },
      { label: 'What is Nmap', path: '/nmap/what-is-nmap', icon: 'ri-information-line' },
      { label: 'How Nmap Works', path: '/nmap/how-it-works', icon: 'ri-settings-3-line' },
      { label: 'Scan Types', path: '/nmap/scan-types', icon: 'ri-radar-line' },
      { label: 'Port States', path: '/nmap/port-states', icon: 'ri-door-open-line' },
      { label: 'Timing Templates', path: '/nmap/timing', icon: 'ri-time-line' },
      { label: 'Common Flags', path: '/nmap/flags', icon: 'ri-flag-line' },
      { label: 'NSE Scripts', path: '/nmap/nse-scripts', icon: 'ri-code-s-slash-line' },
      { label: 'Installation', path: '/nmap/installation', icon: 'ri-download-line' },
      { label: 'Usage Examples', path: '/nmap/examples', icon: 'ri-file-list-line' },
      { label: 'Command Builder', path: '/nmap/command-builder', icon: 'ri-tools-line' },
      { label: 'Pro Tips', path: '/nmap/pro-tips', icon: 'ri-lightbulb-line' },
      { label: 'Nmap Quiz', path: '/nmap/quiz', icon: 'ri-questionnaire-line' },
      { label: 'Nmap Lab', path: '/nmap/lab', icon: 'ri-flask-line' },
    ],
  },
  {
    title: 'GOBUSTER',
    items: [
      { label: 'Gobuster Overview', path: '/gobuster', icon: 'ri-folder-open-line' },
      { label: 'Directory Bruteforce', path: '/gobuster/directory', icon: 'ri-folder-3-line' },
      { label: 'DNS Subdomain', path: '/gobuster/dns', icon: 'ri-earth-line' },
      { label: 'Virtual Hosts', path: '/gobuster/vhost', icon: 'ri-server-line' },
      { label: 'S3 Buckets', path: '/gobuster/s3', icon: 'ri-cloud-line' },
      { label: 'Fuzzing', path: '/gobuster/fuzz', icon: 'ri-bug-line' },
      { label: 'Common Flags', path: '/gobuster/flags', icon: 'ri-flag-line' },
      { label: 'Wordlists', path: '/gobuster/wordlists', icon: 'ri-file-list-3-line' },
      { label: 'Installation', path: '/gobuster/installation', icon: 'ri-download-line' },
      { label: 'Usage Examples', path: '/gobuster/examples', icon: 'ri-file-list-line' },
      { label: 'Command Builder', path: '/gobuster/command-builder', icon: 'ri-tools-line' },
      { label: 'Pro Tips', path: '/gobuster/pro-tips', icon: 'ri-lightbulb-line' },
      { label: 'Gobuster Quiz', path: '/gobuster/quiz', icon: 'ri-questionnaire-line' },
      { label: 'Gobuster Lab', path: '/gobuster/lab', icon: 'ri-flask-line' },
    ],
  },
  {
    title: 'JOHN THE RIPPER',
    items: [
      { label: 'John the Ripper Overview', path: '/john-the-ripper', icon: 'ri-lock-unlock-line' },
      { label: 'Installation', path: '/john-the-ripper/installation', icon: 'ri-download-line' },
      { label: 'Single Crack Mode', path: '/john-the-ripper/single-crack-mode', icon: 'ri-user-line' },
      { label: 'Wordlist Mode', path: '/john-the-ripper/wordlist-mode', icon: 'ri-file-list-3-line' },
      { label: 'Incremental Mode', path: '/john-the-ripper/incremental-mode', icon: 'ri-speed-line' },
      { label: 'External Mode', path: '/john-the-ripper/external-mode', icon: 'ri-code-s-slash-line' },
      { label: 'Hash Formats', path: '/john-the-ripper/hash-formats', icon: 'ri-database-2-line' },
      { label: 'Rules', path: '/john-the-ripper/rules', icon: 'ri-magic-line' },
      { label: 'Hash Extraction', path: '/john-the-ripper/hash-extraction', icon: 'ri-fingerprint-line' },
      { label: 'Command Builder', path: '/john-the-ripper/command-builder', icon: 'ri-tools-line' },
      { label: 'Examples', path: '/john-the-ripper/examples', icon: 'ri-file-list-line' },
      { label: 'Pro Tips', path: '/john-the-ripper/pro-tips', icon: 'ri-lightbulb-line' },
      { label: 'John the Ripper Quiz', path: '/john-the-ripper/quiz', icon: 'ri-questionnaire-line' },
      { label: 'John the Ripper Lab', path: '/john-the-ripper/lab', icon: 'ri-flask-line' },
    ],
  },
  {
    title: 'BURP SUITE',
    items: [
      { label: 'Burp Suite Docs', path: '/burp-suite', icon: 'ri-bug-line' },
    ],
  },
  {
    title: 'SQLMAP',
    items: [
      { label: 'SQLMap Documentation', path: '/sqlmap', icon: 'ri-database-2-line' },
    ],
  },
  {
    title: 'SSLSCAN',
    items: [
      { label: 'SSLScan Documentation', path: '/sslscan', icon: 'ri-shield-keyhole-line' },
    ],
  },
  {
    title: 'NETCAT',
    items: [
      { label: 'Netcat Documentation', path: '/netcat', icon: 'ri-terminal-box-line' },
    ],
  },
  {
    title: 'METASPLOIT',
    items: [
      { label: 'Metasploit Documentation', path: '/metasploit', icon: 'ri-fire-line' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const navigate = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(
    navSections.map((s) => s.title)
  );

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const filteredSections = navSections
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          section.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const isActivePath = (path: string) => {
    return pathname === path;
  };

 const renderNavItem = (item: NavItem) => {
     const active = isActivePath(item.path);
     const classes = `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${
       active
         ? 'nav-active font-medium bg-cyber-cyan/15 text-cyber-cyan'
         : 'text-cyber-text hover:text-cyber-cyan'
     }`;

     return (
       <Link
         href={item.path}
         className={classes}
       >
         <span className="w-5 h-5 flex items-center justify-center shrink-0">
           <i className={item.icon} />
         </span>
         <span className="truncate">{item.label}</span>
       </Link>
     );
   };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        className="fixed top-4 left-4 z-50 md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-cyber-bg-card border border-cyber-border text-cyber-cyan"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle navigation"
      >
        <i className={isMobileOpen ? 'ri-close-line text-xl' : 'ri-menu-line text-xl'} />
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
          role="presentation"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-70 bg-cyber-bg-light border-r border-cyber-border flex flex-col transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-cyber-border">
          <div className="flex justify-center w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-cyber-bg-card">
            <img
              src="/icon.png"
              alt="CyberSec Documentation Logo"
              className="object-contain flex"
              width={30}
              height={30}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-cyber-text tracking-tight">
              cybersec.devctr
            </span>
            <span className="text-[11px] text-cyber-text font-mono">Security Tool Docs</span>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-4">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text text-sm" />
            <input
              type="text"
              placeholder="Search docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-cyber-bg border border-cyber-border rounded-lg pl-9 pr-3 py-2 text-sm text-cyber-text placeholder:text-cyber-text focus:outline-none focus:border-cyber-cyan transition-colors"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {filteredSections.map((section) => (
            <div key={section.title} className="mb-3">
               <button
                 type="button"
                 onClick={() => toggleSection(section.title)}
                 className="flex items-center justify-between w-full px-3 py-2 text-[11px] font-semibold tracking-wider text-cyber-text hover:text-cyber-cyan transition-colors"
               >
                <span>{section.title}</span>
                <i
                  className={`ri-arrow-down-s-line text-sm transition-transform ${
                    expandedSections.includes(section.title) ? '' : '-rotate-90'
                  }`}
                />
              </button>
              {expandedSections.includes(section.title) && (
                <ul className="mt-1 space-y-0.5">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      {renderNavItem(item)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-cyber-border">
          <div className="flex items-center justify-between text-xs text-cyber-text">
            <span className="font-mono">v3.1.0</span>
            <a
              href="https://nmap.org"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center gap-1.5 hover:text-cyber-cyan transition-colors"
            >
              <i className="ri-external-link-line" />
              nmap.org
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}