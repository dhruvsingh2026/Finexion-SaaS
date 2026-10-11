import React, { useState } from 'react'
import { FOOTER_DATA } from '../data/footer'

interface FooterProps {
  onDemoAction: (msg: string) => void
}

export const Footer: React.FC<FooterProps> = ({ onDemoAction }) => {
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<{
    type: 'error' | 'success' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()

    if (!trimmed) {
      setNewsletterStatus({
        type: 'error',
        message: 'Please enter your email address.',
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmed)) {
      setNewsletterStatus({
        type: 'error',
        message: 'Please enter a valid email address.',
      })
      return
    }

    setNewsletterStatus({
      type: 'success',
      message: 'Thanks — this is a demo, no email was saved.',
    })
    setEmail('')
    onDemoAction('Newsletter subscribed! (Simulated)')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="px-3 sm:px-6 pb-6 pt-4">
      <div className="bg-[#080D16] text-white rounded-[32px] sm:rounded-[44px] p-8 sm:p-12 lg:p-16 max-w-6xl mx-auto shadow-2xl border border-white/5">
        
        {/* Top Header Row with Giant Brand Wordmark */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/10 pb-6 mb-12">
          {/* Giant Wordmark in Inter 600-700, tight tracking */}
          <h2 className="font-body font-bold text-5xl sm:text-7xl md:text-8xl tracking-tight text-white select-none">
            {FOOTER_DATA.brand}
          </h2>

          <div className="font-mono text-sm sm:text-base text-white/60 font-medium">
            © {FOOTER_DATA.year}
          </div>
        </div>

        {/* 4-Column Grid: Newsletter + Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-14">
          
          {/* Newsletter Column (5 Cols) */}
          <div className="lg:col-span-5">
            <h3 className="font-semibold text-lg text-white mb-2">
              {FOOTER_DATA.newsletter.title}
            </h3>
            <p className="text-xs text-white/60 mb-5 leading-relaxed">
              Join 40,000+ investors and get our weekly briefing on AI-driven wealth strategy.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (newsletterStatus.type) setNewsletterStatus({ type: null, message: '' })
                    }}
                    placeholder="Enter your email"
                    className="flex-1 bg-white/10 border border-white/15 focus:border-[#D8FF4F] px-4 py-3 rounded-2xl text-sm text-white placeholder:text-white/40 focus:outline-hidden transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#D8FF4F] hover:brightness-105 text-[#080D16] font-bold text-sm px-6 py-3 rounded-2xl transition-all cursor-pointer shrink-0 shadow-xs"
                  >
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Status Message */}
              {newsletterStatus.message && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`text-xs font-medium ${
                    newsletterStatus.type === 'error' ? 'text-rose-400' : 'text-[#D8FF4F]'
                  }`}
                >
                  {newsletterStatus.message}
                </div>
              )}

              <p className="text-[11px] text-white/50">
                {FOOTER_DATA.newsletter.disclaimer}
              </p>
            </form>
          </div>

          {/* Navigation Links (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60">
              {FOOTER_DATA.navigation.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60">
              {FOOTER_DATA.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">
              Social Media
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {FOOTER_DATA.socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={soc.name}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D8FF4F] hover:text-[#080D16] text-white flex items-center justify-center text-xs font-bold transition-all"
                >
                  {soc.name[0]}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Contact Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-white/10 text-xs text-white/70">
          <div>
            <span className="block text-white/40 text-[10px] uppercase tracking-wider mb-1">Phone Number</span>
            <span className="font-mono text-white/90">{FOOTER_DATA.contact.phone}</span>
          </div>
          <div>
            <span className="block text-white/40 text-[10px] uppercase tracking-wider mb-1">Address</span>
            <span className="text-white/90">{FOOTER_DATA.contact.address}</span>
          </div>
          <div>
            <span className="block text-white/40 text-[10px] uppercase tracking-wider mb-1">Office Hours</span>
            <span className="text-white/90">{FOOTER_DATA.contact.hours}</span>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 text-xs text-white/50">
          <div className="space-y-1">
            <div>{FOOTER_DATA.legal.copyright}</div>
            <div className="text-[11px] text-white/40 font-normal">
              {FOOTER_DATA.legal.disclaimer}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {FOOTER_DATA.legal.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  onDemoAction(`${link.label} modal preview`)
                }}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Back to Top Circular Button */}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#080D16] text-white flex items-center justify-center transition-colors cursor-pointer ml-2"
            >
              ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}
