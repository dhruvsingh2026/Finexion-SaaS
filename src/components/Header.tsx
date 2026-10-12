import React, { useState, useRef, useEffect } from 'react'
import { FinexaLogo } from './FinexaLogo'
import { NAV_ITEMS } from '../data/nav'
import { useAuthStore } from '../store/authStore'

interface HeaderProps {
  onDemoAction: (msg: string) => void
  onOpenAuth?: (mode: 'login' | 'signup') => void
  onOpenAccount?: () => void
}

export const Header: React.FC<HeaderProps> = ({
  onDemoAction,
  onOpenAuth,
  onOpenAccount,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const { user, isAuthenticated, logout } = useAuthStore()

  // Close dropdown on outside click or escape
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setDropdownOpen(false)
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleLoginClick = () => {
    if (onOpenAuth) {
      onOpenAuth('login')
    } else {
      onDemoAction('Opening Login dialog')
    }
  }

  const handleSignupClick = () => {
    if (onOpenAuth) {
      onOpenAuth('signup')
    } else {
      onDemoAction('Opening Sign Up dialog')
    }
  }

  return (
    <header className="w-full relative z-40 pt-4 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Capsule container */}
        <div className="bg-white/95 backdrop-blur-md rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-lg shadow-black/5 border border-white/60 flex items-center justify-between transition-all">
          
          {/* Brand Wordmark & Logo */}
          <a href="#hero" className="flex items-center focus-visible:outline-2 focus-visible:outline-[#080D16] rounded-lg">
            <FinexaLogo size="md" />
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#303640]" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                return (
                  <div key={item.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                          e.preventDefault()
                          setDropdownOpen(true)
                        }
                      }}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                      className="inline-flex items-center gap-1.5 hover:text-[#0B77B0] transition-colors py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#080D16] rounded-sm"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Features Dropdown Menu */}
                    {dropdownOpen && (
                      <div
                        role="menu"
                        className="absolute left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-black/6 p-2 z-50 flex flex-col gap-1 animate-fade-in"
                      >
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            role="menuitem"
                            onClick={() => setDropdownOpen(false)}
                            className="p-2.5 rounded-xl hover:bg-[#F5F6F7] transition-colors text-left group"
                          >
                            <div className="font-semibold text-xs text-[#080D16] group-hover:text-[#0B77B0]">
                              {child.label}
                            </div>
                            {child.description && (
                              <div className="text-[11px] text-[#5B6470] mt-0.5 leading-tight">
                                {child.description}
                              </div>
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-[#0B77B0] transition-colors py-1 focus-visible:outline-2 focus-visible:outline-[#080D16] rounded-sm whitespace-nowrap"
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          {/* Desktop Right Actions: Login & Sign Up OR Logged In Profile */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAccount}
                  className="flex items-center gap-2 bg-[#F5F6F7] hover:bg-[#EAEFF4] border border-black/8 px-3.5 py-1.5 rounded-full transition-all text-xs font-semibold text-[#080D16] cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-[#080D16] text-[#D8FF4F] flex items-center justify-center text-[10px] font-bold">
                    {user.avatar || 'AV'}
                  </span>
                  <span>{user.name}</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md font-bold">
                    ${user.balance.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </span>
                </button>
                <button
                  onClick={() => {
                    logout()
                    onDemoAction('Signed out successfully.')
                  }}
                  title="Sign Out"
                  className="text-xs text-[#5B6470] hover:text-rose-600 px-2 py-1 transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="text-sm font-medium text-[#303640] hover:text-[#080D16] px-2.5 py-1 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#080D16] rounded-sm"
                >
                  Login
                </button>
                <button
                  onClick={handleSignupClick}
                  className="bg-[#080D16] text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-black transition-all hover:shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#080D16]"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="p-2 rounded-full hover:bg-black/5 text-[#080D16] focus-visible:outline-2 focus-visible:outline-[#080D16]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            ref={mobileMenuRef}
            className="md:hidden mt-2 bg-white rounded-3xl shadow-2xl border border-black/8 p-5 z-50 flex flex-col gap-3 animate-fade-in"
          >
            <div className="flex flex-col gap-2 border-b border-black/5 pb-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-sm font-medium text-[#303640] hover:bg-[#F5F6F7] hover:text-[#0B77B0] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            <div className="flex flex-col gap-2 pt-1">
              {isAuthenticated && user ? (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      onOpenAccount?.()
                    }}
                    className="w-full text-left p-3 rounded-2xl bg-[#F5F6F7] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-[#080D16] text-[#D8FF4F] flex items-center justify-center text-xs font-bold">
                        {user.avatar || 'AV'}
                      </span>
                      <span className="font-semibold text-xs text-[#080D16]">{user.name}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">
                      ${user.balance.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      logout()
                      onDemoAction('Signed out successfully.')
                    }}
                    className="w-full text-center py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleLoginClick()
                    }}
                    className="w-full text-center py-2.5 rounded-xl text-sm font-medium text-[#303640] hover:bg-[#F5F6F7]"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleSignupClick()
                    }}
                    className="w-full text-center py-3 rounded-full text-sm font-semibold bg-[#080D16] text-white hover:bg-black"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
