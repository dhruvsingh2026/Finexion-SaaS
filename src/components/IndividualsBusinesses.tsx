import React, { useState } from 'react'
import { Eyebrow } from './Eyebrow'
import { SectionHeading } from './SectionHeading'
import { CORE_FEATURES, TRANSFER_ROWS } from '../data/transfers'

interface IndividualsBusinessesProps {
  onDemoAction: (msg: string) => void
}

export const IndividualsBusinesses: React.FC<IndividualsBusinessesProps> = ({
  onDemoAction,
}) => {
  const [expandedId, setExpandedId] = useState<string>('feat-1')

  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Column (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <Eyebrow label="Core Features" className="mb-4" />
          
          <SectionHeading
            as="h2"
            leadText="Built for Individuals "
            accentText="and Businesses"
            className="mb-8"
          />

          {/* Interactive Feature Accordion Rows */}
          <div className="space-y-4 mb-8">
            {CORE_FEATURES.map((feat) => {
              const isExpanded = expandedId === feat.id

              return (
                <div
                  key={feat.id}
                  className="border-b border-[#F5F6F7] pb-4 transition-all"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? '' : feat.id)}
                    aria-expanded={isExpanded}
                    className="w-full text-left flex items-center justify-between gap-3 group py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#080D16] rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isExpanded ? 'bg-[#080D16] text-[#D8FF4F]' : 'bg-[#F5F6F7] text-[#5B6470] group-hover:text-[#080D16]'
                      }`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <span className="font-semibold text-sm sm:text-base text-[#080D16]">
                        {feat.title}
                      </span>
                    </div>

                    <span className="text-[#5B6470] text-sm group-hover:text-[#080D16] transition-transform">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </button>

                  {isExpanded && (
                    <p className="mt-2 text-xs sm:text-sm text-[#5B6470] pl-11 leading-relaxed animate-fade-in">
                      {feat.description}
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          {/* Action Button */}
          <div>
            <button
              onClick={() => onDemoAction('Explore Finexa enterprise accounts and multi-tier workspaces')}
              className="bg-[#080D16] text-white hover:bg-black text-xs font-semibold px-6 py-3 rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#080D16]"
            >
              <span>Explore More</span>
              <span>↗</span>
            </button>
          </div>
        </div>

        {/* Right Column (7 Cols): Blue-Outlined Transfer Mockup + Non-Obscuring Floating Card */}
        <div className="lg:col-span-7 relative">
          
          {/* Main Transfer Table Container */}
          <div className="rounded-[36px] bg-gradient-to-br from-[#E1F2FB] to-[#CDE9F8] p-6 sm:p-8 border-2 border-[#129FE3] shadow-lg relative">
            
            <div className="space-y-3.5">
              {TRANSFER_ROWS.map((row) => (
                <div
                  key={row.id}
                  className="bg-white/95 rounded-2xl p-4 sm:p-5 shadow-xs border border-white/60 flex items-center justify-between gap-3 hover:shadow-md transition-shadow"
                >
                  {/* Left: Code, Flag, Country */}
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    {/* Invoice Badge */}
                    <span className="bg-[#F5F6F7] text-[#5B6470] font-mono text-xs px-2.5 py-1 rounded-lg shrink-0 font-medium">
                      {row.code}
                    </span>

                    {/* Circular Flag Icon */}
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-xs border border-black/5 flex items-center justify-center bg-slate-100">
                      {row.flag === 'us' && (
                        <svg viewBox="0 0 32 32" className="w-full h-full">
                          <rect width="32" height="32" fill="#B22234" />
                          <path d="M0 4h32v4H0zm0 8h32v4H0zm0 8h32v4H0zm0 8h32v4H0z" fill="#FFFFFF" />
                          <rect width="14" height="16" fill="#3C3B6E" />
                        </svg>
                      )}
                      {row.flag === 'fr' && (
                        <svg viewBox="0 0 32 32" className="w-full h-full">
                          <rect width="11" height="32" fill="#0055A4" />
                          <rect x="11" width="10" height="32" fill="#FFFFFF" />
                          <rect x="21" width="11" height="32" fill="#EF4135" />
                        </svg>
                      )}
                      {row.flag === 'gb' && (
                        <svg viewBox="0 0 32 32" className="w-full h-full">
                          <rect width="32" height="32" fill="#012169" />
                          <path d="M0 0l32 32m0-32L0 32" stroke="#FFFFFF" strokeWidth="6" />
                          <path d="M0 0l32 32m0-32L0 32" stroke="#C8102E" strokeWidth="2.5" />
                          <path d="M16 0v32M0 16h32" stroke="#FFFFFF" strokeWidth="10" />
                          <path d="M16 0v32M0 16h32" stroke="#C8102E" strokeWidth="6" />
                        </svg>
                      )}
                    </div>

                    {/* Country & Currency Label */}
                    <div className="min-w-0">
                      <div className="font-semibold text-sm sm:text-base text-[#080D16] truncate">
                        {row.country}
                      </div>
                      <div className="text-[11px] text-[#5B6470] font-medium">
                        {row.currency}
                      </div>
                    </div>
                  </div>

                  {/* Right: Amount & Optional Status */}
                  <div className="text-right shrink-0">
                    <div className="font-display text-xl sm:text-2xl text-[#080D16] tracking-tight">
                      {row.amount}
                    </div>
                    {row.status === 'Pending' ? (
                      <span className="inline-block text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mt-0.5">
                        Pending
                      </span>
                    ) : (
                      <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mt-0.5">
                        Cleared
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Card: Performance Analytics */}
            {/* Positioned at bottom-left corner with carefully configured margin to leave country text completely clear! */}
            <div className="mt-5 sm:mt-0 sm:absolute sm:-bottom-6 sm:-left-6 w-52 bg-white rounded-2xl p-4 shadow-xl border-2 border-[#D8FF4F] z-20 transition-transform hover:-translate-y-1">
              <div className="text-[11px] font-semibold text-[#5B6470]">
                Performance analytics
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="font-display text-3xl text-[#080D16]">35%</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                  ↑ +12.4%
                </span>
              </div>
              {/* Mini Green Sparkline */}
              <div className="mt-2 h-7 w-full">
                <svg viewBox="0 0 160 30" className="w-full h-full" fill="none">
                  <path
                    d="M0 22 Q30 25 50 15 T100 18 T140 5 T160 8"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="text-[10px] font-semibold text-[#0B77B0] mt-1">
                ★ Best Insights
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
