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
      <div className="fixed top-3 right-3 z-40 flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-cyber-bg-light border border-cyber-border rounded-lg hover:bg-cyber-bg transition-colors"
        >
          <i className="ri-command-line text-cyber-text text-sm sm:text-base" />
          <input
            type="text"
            placeholder="Search..."
            readOnly
            className="w-24 sm:w-32 bg-transparent text-xs sm:text-sm text-cyber-text-dim placeholder:text-cyber-text-dim focus:outline-none cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
          <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-cyber-text-dim">
            <i className="ri-information-line text-white text-xs" />
            <span className='text-white hidden sm:inline'>Info</span>
          </div>
        </button>
      </div>

{isOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
           <div
             ref={modalRef}
             className="w-full max-w-lg sm:max-w-2xl bg-cyber-bg-light border border-cyber-border rounded-xl shadow-2xl p-3 sm:p-4"
           >
             <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
               <div className="relative flex-1">
                 <i className="ri-search-line absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-cyber-text text-xs sm:text-sm" />
                 <input
                   ref={inputRef}
                   type="text"
                   placeholder="Search documentation..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full bg-cyber-bg border border-cyber-border rounded-lg pl-8 sm:pl-9 pr-2.5 sm:pr-3 py-1.5 sm:py-2 text-xs sm:text-sm text-cyber-text placeholder:text-cyber-text focus:outline-none focus:border-cyber-cyan transition-colors"
                 />
               </div>
               <button
                 type="button"
                 onClick={() => setIsOpen(false)}
                 className="px-2 sm:px-3 py-1 sm:py-2 text-[10px] sm:text-xs text-cyber-text-dim hover:text-cyber-cyan"
               >
                 ESC
               </button>
             </div>

             <div className="max-h-80 sm:max-h-96 overflow-y-auto">
               {filteredSections.map((section) => (
                 <div key={section.title} className="mb-3 sm:mb-4">
                   <h3 className="text-[10px] sm:text-[11px] font-semibold text-cyber-text-dim uppercase tracking-wider px-2 mb-1.5 sm:mb-2">
                     {section.title}
                   </h3>
                   <ul className="space-y-0.5 sm:space-y-1">
                     {section.items.map((item) => (
                       <li key={item.path}>
                         <Link
                           href={item.path}
                           className="flex items-center gap-2.5 sm:gap-3 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm text-cyber-text hover:bg-cyber-bg hover:text-cyber-cyan transition-colors"
                           onClick={() => setIsOpen(false)}
                         >
                           <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shrink-0">
                             <i className={item.icon} />
                           </span>
                           <span className="truncate text-xs sm:text-sm">{item.label}</span>
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