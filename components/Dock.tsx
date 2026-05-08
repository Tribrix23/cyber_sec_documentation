'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { navSections } from '@/lib/navData'

export default function Dock() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault()
        setIsOpen(true)
        setTimeout(() => inputRef.current?.focus(), 100)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const filteredSections = navSections
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          section.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0)

  return (
    <>
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-2 bg-cyber-bg-light border border-cyber-border rounded-lg hover:bg-cyber-bg transition-colors"
        >
          <i className="ri-command-line text-cyber-text" />
          <input
            type="text"
            placeholder="Search..."
            readOnly
            className="w-32 bg-transparent text-sm text-cyber-text-dim placeholder:text-cyber-text-dim focus:outline-none cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
          <div className="flex items-center gap-1 text-xs text-cyber-text-dim">
            <i className="ri-information-line text-white" />
            <span className='text-white'>Info</span>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="w-full max-w-2xl bg-cyber-bg-light border border-cyber-border rounded-xl shadow-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text text-sm" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg pl-9 pr-3 py-2 text-sm text-cyber-text placeholder:text-cyber-text focus:outline-none focus:border-cyber-cyan transition-colors"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 text-xs text-cyber-text-dim hover:text-cyber-cyan"
              >
                ESC
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {filteredSections.map((section) => (
                <div key={section.title} className="mb-4">
                  <h3 className="text-[11px] font-semibold text-cyber-text-dim uppercase tracking-wider px-2 mb-2">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.path}>
                        <Link
                          href={item.path}
                          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-cyber-text hover:bg-cyber-bg hover:text-cyber-cyan transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="w-5 h-5 flex items-center justify-center shrink-0">
                            <i className={item.icon} />
                          </span>
                          <span className="truncate">{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}