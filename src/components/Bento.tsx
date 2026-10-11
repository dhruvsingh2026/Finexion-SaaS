import React from 'react'
import { FinexaLogo } from './FinexaLogo'
import { ImageWithFallback } from './ImageWithFallback'
import { BENTO_DATA } from '../data/bento'

interface BentoProps {
  onDemoAction: (msg: string) => void
}

export const Bento: React.FC<BentoProps> = ({ onDemoAction }) => {
  const { cardA, cardB, cardC } = BENTO_DATA

  return (
    <section className="py-8 sm:py-14 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* Card A: Photo with Bottom Overlay Panel */}
        <div className="relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[420px] flex flex-col justify-end p-5 shadow-sm border border-black/5 bg-[#129FE3]">
          <ImageWithFallback
            src="/images/person-phone.svg"
            alt={cardA.imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Subtle contrast gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Bottom Floating White Panel */}
          <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/60">
            <span className="font-display text-4xl sm:text-5xl text-[#080D16] block leading-none">
              {cardA.metric}
            </span>
            <p className="text-xs sm:text-sm text-[#5B6470] mt-2 font-medium leading-snug">
              {cardA.text}
            </p>
          </div>
        </div>

        {/* Card B: Client Satisfaction 100% */}
        <div className="rounded-3xl bg-[#F5F6F7] p-7 sm:p-8 flex flex-col justify-between border border-black/5 min-h-[380px] sm:min-h-[420px]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5B6470]">
              {cardB.kicker}
            </span>
            <div className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#080D16] mt-2 leading-none">
              {cardB.metric}
            </div>

            {/* Row of 4 Overlapping Avatar Circles */}
            <div className="flex items-center -space-x-2 mt-6">
              {cardB.avatars.map((av, idx) => (
                <div
                  key={idx}
                  className={`w-9 h-9 rounded-full ${av.bg} flex items-center justify-center text-xs font-bold ring-2 ring-[#F5F6F7] shadow-xs`}
                  title={av.name}
                >
                  {av.initials}
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Quote */}
          <blockquote className="mt-8 text-sm sm:text-base text-[#303640] font-medium leading-relaxed italic">
            {cardB.quote}
          </blockquote>
        </div>

        {/* Card C: Split Metric Card (Earnings & Deep-Navy Strip) */}
        <div className="rounded-3xl overflow-hidden flex flex-col justify-between border border-black/5 min-h-[380px] sm:min-h-[420px] shadow-sm">
          
          {/* Upper Panel (Light Gray) */}
          <div className="bg-[#F5F6F7] p-7 sm:p-8 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <FinexaLogo size="sm" />
              <button
                onClick={() => onDemoAction('Explore earnings telemetry')}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#080D16] hover:bg-black hover:text-white transition-colors shadow-xs"
                aria-label="View earnings"
              >
                ↗
              </button>
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <span className="text-xs font-semibold text-[#5B6470] block">{cardC.label}</span>
                <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#080D16] leading-none mt-1">
                  {cardC.metricPrimary}
                </div>
              </div>

              <span className="bg-[#080D16] text-[#D8FF4F] font-bold text-xs px-2.5 py-1 rounded-full mb-1">
                {cardC.badge}
              </span>
            </div>

            {/* Lime Arc / Semicircle Gauge Visual */}
            <div className="mt-6 w-full flex justify-center">
              <svg viewBox="0 0 200 80" className="w-48 h-20" fill="none">
                <path
                  d="M20 70 A 80 80 0 0 1 180 70"
                  stroke="#E2E6EA"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <path
                  d="M20 70 A 80 80 0 0 1 150 25"
                  stroke="#D8FF4F"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Lower Panel (Deep-Navy Strip) */}
          <div className="bg-[#080D16] p-6 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-semibold text-white/60 tracking-wider block">
                Total Volume
              </span>
              <span className="font-display text-3xl sm:text-4xl text-white leading-none">
                {cardC.metricSecondary}
              </span>
            </div>

            <a
              href="#pricing"
              className="bg-[#D8FF4F] hover:brightness-105 text-[#080D16] text-xs font-bold px-4 py-2.5 rounded-full transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>{cardC.cta}</span>
              <span>↗</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  )
}
