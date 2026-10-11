import React, { useState } from 'react'
import { Eyebrow } from './Eyebrow'
import { SectionHeading } from './SectionHeading'
import { WorldMap } from './WorldMap'
import { GLOBAL_FINANCE_DATA } from '../data/global'

interface GlobalFinanceProps {
  onDemoAction: (msg: string) => void
}

export const GlobalFinance: React.FC<GlobalFinanceProps> = ({ onDemoAction }) => {
  const { conversion, schedule, dailyActiveUsers } = GLOBAL_FINANCE_DATA

  // Interactive Live Currency Conversion
  const [fromAmount, setFromAmount] = useState<number>(conversion.defaultFrom)
  const toAmount = (fromAmount * conversion.rateUsdEur).toFixed(2)

  // Interactive Week Schedule Day Selection
  const [selectedDay, setSelectedDay] = useState<string>(schedule.defaultSelectedDay)

  return (
    <section id="global-finance" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background Soft Dotted World Map */}
      <WorldMap />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Centered Heading Block */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <Eyebrow label={GLOBAL_FINANCE_DATA.eyebrow} centered className="mb-4" />
          
          <SectionHeading
            as="h2"
            leadText={GLOBAL_FINANCE_DATA.headingLead}
            accentText={GLOBAL_FINANCE_DATA.headingAccent}
            centered
            className="mb-4"
          />

          <p className="text-sm sm:text-base md:text-lg text-[#5B6470] max-w-xl mx-auto font-normal leading-relaxed">
            {GLOBAL_FINANCE_DATA.subparagraph}
          </p>
        </div>

        {/* 2-Column Responsive Dashboard Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 Cols): Real-Time Conversion Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-black/6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-base sm:text-lg text-[#080D16]">
                  {conversion.title}
                </h3>
                <span className="text-xs text-[#5B6470]">
                  {conversion.subtitle}
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Live ECB
              </span>
            </div>

            {/* From Input */}
            <div className="space-y-3">
              <div className="bg-[#F5F6F7] rounded-2xl p-4 border border-black/5 focus-within:border-[#129FE3] transition-colors">
                <span className="text-[11px] font-medium text-[#5B6470] block">From</span>
                <div className="flex items-center justify-between mt-1">
                  <input
                    type="number"
                    min="1"
                    step="10"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(Math.max(0, Number(e.target.value)))}
                    className="bg-transparent font-display text-2xl sm:text-3xl text-[#080D16] focus:outline-hidden w-36"
                  />
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-xs border border-black/5 shrink-0">
                    <span className="w-4 h-4 rounded-full bg-[#002868] flex items-center justify-center text-[9px] text-white font-bold">
                      🇺🇸
                    </span>
                    <span className="text-xs font-bold text-[#080D16]">USD</span>
                  </div>
                </div>
              </div>

              {/* Conversion Switch Indicator */}
              <div className="flex justify-center -my-2 relative z-10">
                <div className="w-8 h-8 rounded-full bg-white shadow-md border border-black/8 flex items-center justify-center text-[#129FE3]">
                  ↓
                </div>
              </div>

              {/* To Output */}
              <div className="bg-[#F5F6F7] rounded-2xl p-4 border border-black/5">
                <span className="text-[11px] font-medium text-[#5B6470] block">To (Sample rate 0.9214)</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-display text-2xl sm:text-3xl text-[#080D16] tabular-nums">
                    {toAmount}
                  </span>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-xs border border-black/5 shrink-0">
                    <span className="w-4 h-4 rounded-full bg-[#0055A4] flex items-center justify-center text-[9px] text-white font-bold">
                      🇪🇺
                    </span>
                    <span className="text-xs font-bold text-[#080D16]">EUR</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Network Fees Info */}
            <div className="flex justify-between items-center text-xs text-[#5B6470] mt-4 px-1">
              <span>Network fees</span>
              <span className="font-medium text-[#080D16]">2.09 USD</span>
            </div>

            {/* Exchange Button */}
            <button
              onClick={() => onDemoAction(`Simulated exchange: Converted $${fromAmount} USD to €${toAmount} EUR successfully!`)}
              className="mt-5 w-full bg-[#080D16] hover:bg-black text-white font-semibold text-sm py-3.5 rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#080D16]"
            >
              Exchange Money
            </button>
          </div>

          {/* Right Column (7 Cols): Daily Active Users + Schedule Widget */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Top Metric Card: Daily Active Users */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-black/6 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#5B6470] block">
                  Daily active users
                </span>
                <div className="font-display text-5xl sm:text-6xl text-[#080D16] mt-1 leading-none">
                  {dailyActiveUsers}
                </div>
              </div>

              {/* Verified Platform Badge */}
              <div className="w-12 h-12 rounded-2xl bg-[#D8FF4F] flex items-center justify-center text-[#080D16]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>

            {/* Bottom Widget: Schedule (Employee salary, payments) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-black/6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-base sm:text-lg text-[#080D16]">
                    {schedule.title}
                  </h4>
                  <span className="text-xs text-[#5B6470]">
                    {schedule.subtitle}
                  </span>
                </div>

                <span className="text-xs font-semibold text-[#0B77B0] bg-sky-50 px-3 py-1 rounded-full">
                  Automated
                </span>
              </div>

              {/* Week Strip Selector */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 bg-[#F5F6F7] p-2 rounded-2xl my-4">
                {schedule.days.map((item) => {
                  const isSelected = selectedDay === item.day

                  return (
                    <button
                      key={item.day}
                      onClick={() => setSelectedDay(item.day)}
                      aria-pressed={isSelected}
                      className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#080D16] text-white shadow-sm'
                          : 'text-[#5B6470] hover:text-[#080D16] hover:bg-white/60'
                      }`}
                    >
                      <span className="text-[10px] font-medium">{item.day}</span>
                      <span className="text-xs sm:text-sm font-bold mt-0.5">{item.date}</span>
                    </button>
                  )
                })}
              </div>

              {/* Timeline Items */}
              <div className="space-y-3 mt-4">
                {schedule.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F5F6F7] border border-black/5 hover:border-black/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-[#080D16]">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-[#5B6470]">
                          {item.timestamp}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
