import React from 'react'
import { HERO_DATA } from '../data/hero'

interface PhoneMockupProps {
  onDemoAction?: (msg: string) => void
  className?: string
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  onDemoAction,
  className = '',
}) => {
  const { phone } = HERO_DATA

  return (
    <div
      className={`relative w-[285px] sm:w-[320px] md:w-[340px] rounded-[44px] bg-[#080D16] p-3 shadow-2xl border-4 border-[#129FE3]/40 select-none ${className}`}
    >
      {/* Outer Phone Bezel & Glass Reflection */}
      <div className="relative w-full h-[520px] sm:h-[560px] rounded-[36px] bg-gradient-to-b from-[#0E78B7] via-[#129FE3] to-[#0D6DA6] overflow-hidden flex flex-col text-white">
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#080D16] rounded-full z-30 flex items-center justify-between px-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#129FE3]/30" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>

        {/* Status Bar */}
        <div className="w-full flex items-center justify-between px-6 pt-3 text-[11px] font-semibold text-white/90 z-20">
          <span>{phone.time}</span>
          <div className="flex items-center gap-1.5">
            {/* Cellular */}
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="16" width="3" height="6" rx="1" />
              <rect x="7" y="12" width="3" height="10" rx="1" />
              <rect x="12" y="8" width="3" height="14" rx="1" />
              <rect x="17" y="4" width="3" height="18" rx="1" />
            </svg>
            {/* Wi-Fi */}
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
            </svg>
            {/* Battery */}
            <div className="w-4 h-2 border border-white/80 rounded-xs p-0.5 flex items-center">
              <div className="w-full h-full bg-white rounded-xs" />
            </div>
          </div>
        </div>

        {/* App Content */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          
          {/* Header Row: Greeting & Avatar */}
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-white/70 block font-medium">Good morning!</span>
              <span className="text-xs sm:text-sm font-semibold text-white">{phone.userName}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 backdrop-blur-xs flex items-center justify-center font-bold text-xs text-[#D8FF4F]">
              OS
            </div>
          </div>

          {/* Balance Widget Card */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/25 mt-3 shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-white/80 font-medium">
              <span>Total Balance</span>
              <span className="text-white/60 tracking-widest">{phone.maskedCard}</span>
            </div>
            
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-display text-3xl sm:text-4xl tracking-tight text-white">{phone.balance}</span>
              <span className="text-[10px] font-bold text-[#080D16] bg-[#D8FF4F] px-1.5 py-0.5 rounded-full">
                {phone.changePct}
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button
                onClick={() => onDemoAction?.('Sample deposit modal: Add funds instantly')}
                className="bg-[#D8FF4F] text-[#080D16] text-xs font-semibold py-2 rounded-xl flex items-center justify-center gap-1 hover:brightness-105 active:scale-98 transition-all"
              >
                <span>+</span> Deposit
              </button>
              <button
                onClick={() => onDemoAction?.('Sample transfer modal: Send money to contacts')}
                className="bg-white/20 hover:bg-white/30 text-white text-xs font-semibold py-2 rounded-xl flex items-center justify-center gap-1 active:scale-98 transition-all"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                Transfer
              </button>
            </div>
          </div>

          {/* Mini Performance Sparkline / Area Chart */}
          <div className="my-2 px-1">
            <div className="flex items-center justify-between text-[10px] text-white/70 mb-1">
              <span>Weekly Growth</span>
              <span className="text-[#D8FF4F] font-semibold">+18.4%</span>
            </div>
            <svg viewBox="0 0 260 48" className="w-full h-11" fill="none">
              <defs>
                <linearGradient id="chartG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D8FF4F" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#D8FF4F" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0 38 Q40 32 70 20 T140 28 T200 8 T260 16 L260 48 L0 48 Z"
                fill="url(#chartG)"
              />
              <path
                d="M0 38 Q40 32 70 20 T140 28 T200 8 T260 16"
                stroke="#D8FF4F"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Recent Contacts Row */}
          <div className="bg-white/10 rounded-2xl p-3 border border-white/15">
            <div className="flex items-center justify-between text-[10px] text-white/80 font-medium mb-2">
              <span>Recent Contacts</span>
              <button
                onClick={() => onDemoAction?.('Viewing all recent contacts')}
                className="text-[10px] text-[#D8FF4F] hover:underline"
              >
                See all ›
              </button>
            </div>
            <div className="flex items-center justify-between gap-1">
              {phone.contacts.map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full ${c.bg} flex items-center justify-center font-bold text-[10px] shadow-xs cursor-pointer hover:scale-110 transition-transform`}
                    onClick={() => onDemoAction?.(`Selected contact: ${c.name}`)}
                  >
                    {c.name.slice(0, 2)}
                  </div>
                  <span className="text-[9px] text-white/80 font-medium">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Home Indicator Bar */}
        <div className="w-28 h-1 bg-white/50 rounded-full mx-auto mb-2" />
      </div>
    </div>
  )
}
