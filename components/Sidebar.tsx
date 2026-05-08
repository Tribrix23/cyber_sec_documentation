'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navSections, NavItem } from '@/lib/navData'

export default function Sidebar() {
  const pathname = usePathname();
  const navigate = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(
    navSections.map((s) => s.title)
  );

  // Ref to store nav item DOM elements for scrolling
  const navItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Auto-expand section containing active route on path change
  useEffect(() => {
    setExpandedSections((prev) => {
      const activeSection = navSections.find((section) =>
        section.items.some((item) => item.path === pathname)
      );
      if (activeSection && !prev.includes(activeSection.title)) {
        return [...prev, activeSection.title];
      }
      return prev;
    });
  }, [pathname]);

  // Auto-scroll to active nav item after navigation
  useEffect(() => {
    // Small delay to allow DOM to update after expansion
    const timer = setTimeout(() => {
      const activeElement = navItemRefs.current[pathname];
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  const isActivePath = (path: string) => {
    return pathname === path;
  };

  const isSectionActive = (sectionItems: NavItem[]) => {
    return sectionItems.some((item) => isActivePath(item.path));
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
        ref={(el) => {
          navItemRefs.current[item.path] = el;
        }}
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
              className="object-contain"
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

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {navSections.map((section) => {
            const sectionIsActive = isSectionActive(section.items);
            const isExpanded = expandedSections.includes(section.title);
            
            return (
              <div key={section.title} className="mb-3">
                <button
                  type="button"
                  onClick={() => toggleSection(section.title)}
                  className={`flex items-center justify-between w-full px-3 py-2 text-[11px] font-semibold tracking-wider transition-colors ${
                    sectionIsActive
                      ? 'text-cyber-cyan'
                      : 'text-cyber-text hover:text-cyber-cyan'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {sectionIsActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan flex-shrink-0" />
                    )}
                    {section.title}
                  </span>
                  <i
                    className={`ri-arrow-down-s-line text-sm transition-transform ${
                      isExpanded ? '' : '-rotate-90'
                    }`}
                  />
                </button>
                {isExpanded && (
                  <ul className="mt-1 space-y-0.5">
                    {section.items.map((item) => (
                      <li key={item.path}>
                        {renderNavItem(item)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
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
  )
}