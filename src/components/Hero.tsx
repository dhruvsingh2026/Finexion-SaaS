import React from 'react'
import { Header } from './Header'
import { PhoneMockup } from './PhoneMockup'
import { HERO_DATA } from '../data/hero'

interface HeroProps {
  onDemoAction: (msg: string) => void
}

export const Hero: React.FC<HeroProps> = ({ onDemoAction }) => {
  const { savingsCard, transactionsCard } = HERO_DATA

  return (
    <div className="px-3 sm:px-6 pt-3 sm:pt-4">
      {/* Outer Inset Rounded Panel with Photographic Sky/Grass Canvas */}
      <div
        id="hero"
        className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-[#129FE3] min-h-[820px] sm:min-h-[880px] lg:min-h-[960px] flex flex-col justify-between shadow-xl"
        style={{
          backgroundImage: `url('/images/hero-sky.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
        }}
      >
        {/* Contrast Scrim / Dark Gradient Overlay to ensure AA text contrast */}
        <div className="absolute inset-0 hero-photo-scrim pointer-events-none" />

        {/* Floating Capsule Header */}
        <Header onDemoAction={onDemoAction} />

        {/* Hero Copy & Headline Container */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 text-center flex flex-col items-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#080D16] shadow-sm mb-5 border border-white/50">
            <span className="text-[#0B77B0]">✨</span>
            <span>{HERO_DATA.badge}</span>
          </div>

          {/* Headline (Bebas Neue) */}
          <h1 className="font-display uppercase text-white text-[2.75rem] sm:text-[4rem] md:text-[5.25rem] lg:text-[6.25rem] leading-[0.92] tracking-[0.015em] max-w-3xl drop-shadow-xs" style={{ textWrap: 'balance' }}>
            <span>Manage Your </span>
            <span className="italic font-serif font-normal lowercase tracking-normal text-white px-1">
              Money Smarter,
            </span>
            <br className="hidden sm:inline" />
            <span>Powered by Real Insights</span>
          </h1>

          {/* Supporting Paragraph */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/95 max-w-xl font-normal leading-relaxed drop-shadow-xs">
            {HERO_DATA.subparagraph}
          </p>

          {/* CTAs Side by Side */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <a
              href="#pricing"
              className="bg-[#D8FF4F] text-[#080D16] font-semibold text-sm sm:text-base px-6 sm:px-7 py-3 rounded-full hover:brightness-105 transition-all shadow-md hover:shadow-lg flex items-center gap-2 group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>{HERO_DATA.ctaPrimary.label}</span>
              <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
            </a>

            <button
              onClick={() => onDemoAction('Interactive Demo tour: Watch how Finexa automatically categorises your transactions.')}
              className="bg-white/90 hover:bg-white text-[#080D16] font-semibold text-sm sm:text-base px-5 sm:px-6 py-3 rounded-full transition-all shadow-sm flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#080D16]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>{HERO_DATA.ctaSecondary.label}</span>
            </button>
          </div>
        </div>

        {/* Mockups Stage (Center Phone + Overlapping Floating Cards) */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-4 mt-8 sm:mt-12 flex items-end justify-center">
          
          {/* Overlapping Stage Container */}
          <div className="relative flex items-end justify-center w-full pb-0 -mb-6 sm:-mb-10">
            
            {/* Left Floating Card: My Savings Plan */}
            <div className="hidden lg:block absolute left-2 xl:left-8 bottom-16 w-64 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/70 z-30 transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-[#080D16]">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <span>{savingsCard.title}</span>
                </div>
                <button
                  onClick={() => onDemoAction('Savings plan settings modal')}
                  className="text-[#5B6470] hover:text-[#080D16] text-xs font-bold p-0.5"
                  aria-label="Savings options"
                >
                  •••
                </button>
              </div>

              <div className="space-y-3">
                {savingsCard.items.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-medium">
                      <span className="text-[#303640]">{item.label}</span>
                      <span className="font-semibold text-[#080D16]">{item.pct}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-[#F5F6F7] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-[#5B6470]">
                      <span>{item.current}</span>
                      <span>Target: {item.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Center Phone Mockup (Clipped by bottom container boundary) */}
            <PhoneMockup onDemoAction={onDemoAction} />

            {/* Right Floating Card: Transaction History */}
            <div className="hidden lg:block absolute right-2 xl:right-8 bottom-16 w-68 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/70 z-30 transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-[#080D16]">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <span>{transactionsCard.title}</span>
                </div>
                <button
                  onClick={() => onDemoAction('Search transactions demo')}
                  className="text-[#5B6470] hover:text-[#080D16]"
                  aria-label="Search transactions"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2.5">
                {transactionsCard.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-[#F5F6F7] last:border-0">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#F5F6F7] flex items-center justify-center text-[10px] font-bold text-[#303640]">
                        {item.title.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-[#080D16] text-[11px]">{item.title}</div>
                        <div className="text-[10px] text-[#5B6470]">{item.subtitle}</div>
                      </div>
                    </div>
                    <span
                      className={`font-semibold tabular-nums text-[11px] ${
                        item.type === 'positive' ? 'text-emerald-700' : 'text-[#080D16]'
                      }`}
                    >
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Natural Lush Grass Foreground Edge visible at bottom */}
        <div className="w-full h-8 sm:h-12 bg-transparent pointer-events-none" />
      </div>
    </div>
  )
}
