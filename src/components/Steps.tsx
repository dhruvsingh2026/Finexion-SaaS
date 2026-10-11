import React, { useState } from 'react'
import { Eyebrow } from './Eyebrow'
import { SectionHeading } from './SectionHeading'
import { STEPS_DATA } from '../data/steps'

interface StepsProps {
  onDemoAction: (msg: string) => void
}

export const Steps: React.FC<StepsProps> = ({ onDemoAction }) => {
  const [selectedPlanStep, setSelectedPlanStep] = useState<'starter' | 'pro'>('pro')

  return (
    <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <Eyebrow label={STEPS_DATA.eyebrow} className="mb-4" />
          <SectionHeading
            as="h2"
            leadText={STEPS_DATA.headingLead}
            accentText={STEPS_DATA.headingAccent}
          />
        </div>

        <p className="max-w-md text-sm sm:text-base text-[#5B6470] font-normal leading-relaxed">
          {STEPS_DATA.subparagraph}
        </p>
      </div>

      {/* 3 Step Cards Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        
        {/* Step 01: Smart Wallet Overview */}
        <div className="bg-[#F5F6F7] rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-black/5 hover:shadow-md transition-shadow">
          {/* Mockup on Top */}
          <div className="bg-white rounded-2xl p-5 border-2 border-[#129FE3] shadow-sm mb-6">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#5B6470] mb-2">
              <span className="bg-[#D8FF4F] text-[#080D16] px-2 py-0.5 rounded-full font-bold">Finexa Cash</span>
              <span>•••• 5324</span>
            </div>
            
            <div className="mt-2">
              <span className="text-[10px] text-[#5B6470] block font-medium">Main Balance</span>
              <div className="font-display text-3xl sm:text-4xl text-[#080D16] leading-none mt-0.5">
                $1,389.00
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => onDemoAction('Smart Wallet: Transfer initiated')}
                className="bg-[#080D16] text-white text-xs font-semibold py-2 rounded-xl text-center hover:bg-black"
              >
                Transfer
              </button>
              <button
                onClick={() => onDemoAction('Smart Wallet: Withdraw modal opened')}
                className="bg-[#F5F6F7] text-[#080D16] text-xs font-semibold py-2 rounded-xl text-center hover:bg-slate-200"
              >
                Withdraw
              </button>
            </div>
          </div>

          {/* Copy Block */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B77B0] block mb-1">
              {STEPS_DATA.steps[0].step}
            </span>
            <h3 className="font-semibold text-lg sm:text-xl text-[#080D16] mb-1.5">
              {STEPS_DATA.steps[0].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6470] leading-relaxed">
              {STEPS_DATA.steps[0].description}
            </p>
          </div>
        </div>

        {/* Step 02: Financial Performance Insights */}
        <div className="bg-[#F5F6F7] rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-black/5 hover:shadow-md transition-shadow">
          {/* Mockup on Top */}
          <div className="bg-white rounded-2xl p-5 border-2 border-[#129FE3] shadow-sm mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-[#080D16] mb-3">
              <span>Statistics</span>
              <span className="text-[11px] text-[#5B6470] bg-[#F5F6F7] px-2 py-0.5 rounded-md font-medium">
                This Week ▾
              </span>
            </div>

            {/* Smooth Two-Line Inline SVG Chart */}
            <div className="h-28 w-full">
              <svg viewBox="0 0 240 85" className="w-full h-full" fill="none">
                {/* Grid lines */}
                <line x1="0" y1="20" x2="240" y2="20" stroke="#F0F2F5" strokeWidth="1" />
                <line x1="0" y1="50" x2="240" y2="50" stroke="#F0F2F5" strokeWidth="1" />
                <line x1="0" y1="80" x2="240" y2="80" stroke="#F0F2F5" strokeWidth="1" />
                
                {/* Lime Line */}
                <path
                  d="M0 65 Q40 30 80 50 T160 20 T240 35"
                  stroke="#D8FF4F"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Dark/Teal Line */}
                <path
                  d="M0 45 Q40 60 80 35 T160 55 T240 25"
                  stroke="#080D16"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#5B6470] mt-1 pt-1 border-t border-[#F5F6F7]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D8FF4F]" /> Income
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#080D16]" /> Spending
              </span>
            </div>
          </div>

          {/* Copy Block */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B77B0] block mb-1">
              {STEPS_DATA.steps[1].step}
            </span>
            <h3 className="font-semibold text-lg sm:text-xl text-[#080D16] mb-1.5">
              {STEPS_DATA.steps[1].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6470] leading-relaxed">
              {STEPS_DATA.steps[1].description}
            </p>
          </div>
        </div>

        {/* Step 03: Flexible Pricing Plans */}
        <div className="bg-[#F5F6F7] rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-black/5 hover:shadow-md transition-shadow">
          {/* Mockup on Top */}
          <div className="bg-white rounded-2xl p-5 border-2 border-[#129FE3] shadow-sm mb-6">
            <div className="space-y-2">
              {/* Starter Row */}
              <div
                onClick={() => setSelectedPlanStep('starter')}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedPlanStep === 'starter'
                    ? 'border-[#080D16] bg-[#F5F6F7]'
                    : 'border-black/5 hover:border-black/10'
                }`}
              >
                <div>
                  <span className="font-semibold text-xs text-[#080D16] block">Starter</span>
                  <span className="text-[10px] text-[#5B6470]">Basic Insights</span>
                </div>
                <span className="font-display text-xl text-[#080D16]">$0</span>
              </div>

              {/* Pro Row (Selected with Lime Highlight) */}
              <div
                onClick={() => setSelectedPlanStep('pro')}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedPlanStep === 'pro'
                    ? 'border-[#080D16] bg-[#D8FF4F]/20 ring-1 ring-[#D8FF4F]'
                    : 'border-black/5 hover:border-black/10'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs text-[#080D16]">Pro</span>
                    <span className="text-[9px] font-bold bg-[#D8FF4F] px-1.5 py-0.2 rounded-sm text-[#080D16]">
                      Popular
                    </span>
                  </div>
                  <span className="text-[10px] text-[#5B6470]">AI Predictor + Telemetry</span>
                </div>
                <span className="font-display text-xl text-[#080D16]">$99</span>
              </div>
            </div>

            <button
              onClick={() => onDemoAction(`Selected step plan: ${selectedPlanStep.toUpperCase()}`)}
              className="mt-3 w-full bg-[#080D16] text-white text-xs font-semibold py-2 rounded-xl text-center hover:bg-black"
            >
              Choose {selectedPlanStep === 'pro' ? 'Pro' : 'Starter'}
            </button>
          </div>

          {/* Copy Block */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B77B0] block mb-1">
              {STEPS_DATA.steps[2].step}
            </span>
            <h3 className="font-semibold text-lg sm:text-xl text-[#080D16] mb-1.5">
              {STEPS_DATA.steps[2].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6470] leading-relaxed">
              {STEPS_DATA.steps[2].description}
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
