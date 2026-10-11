import React from 'react'
import { Eyebrow } from './Eyebrow'

interface FinalCTAProps {
  onDemoAction: (msg: string) => void
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onDemoAction }) => {
  return (
    <div className="px-3 sm:px-6 py-12 sm:py-16">
      <div
        className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-[#129FE3] min-h-[580px] sm:min-h-[640px] flex flex-col justify-between shadow-xl max-w-6xl mx-auto"
        style={{
          backgroundImage: `url('/images/cta-sky.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
        }}
      >
        {/* Scrim Overlay */}
        <div className="absolute inset-0 cta-photo-scrim pointer-events-none" />

        {/* Content Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16 h-full flex-1">
          
          {/* Left Column (6 Cols): Typography & App Store Buttons */}
          <div className="lg:col-span-6 flex flex-col justify-center text-white">
            <Eyebrow label="Download App For Free" light className="mb-4" />
            
            <h2 className="font-display uppercase text-white text-[2.75rem] sm:text-[3.75rem] md:text-[4.75rem] leading-[0.92] tracking-[0.015em] mb-4" style={{ textWrap: 'balance' }}>
              Achieve Your Financial Goals With Confidence
            </h2>

            <p className="text-sm sm:text-base text-white/90 max-w-md mb-8 leading-relaxed">
              Track your money, review insights and plan your goals from one app — available soon on iOS and Android.
            </p>

            {/* Store Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              {/* App Store Button */}
              <button
                onClick={() => onDemoAction('Finexa iOS App coming soon to Apple App Store (Demo preview)')}
                className="bg-[#080D16] hover:bg-black text-white px-5 py-3 rounded-2xl flex items-center gap-3 transition-all shadow-md active:scale-98 cursor-pointer border border-white/10"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.13.64-2.79 1.43-.58.68-1.1 1.77-1.01 2.82 1.07.08 2.18-.54 2.79-1.38z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-white/70">Download on the</div>
                  <div className="text-xs sm:text-sm font-bold font-body leading-none mt-0.5">App Store</div>
                </div>
              </button>

              {/* Google Play Button */}
              <button
                onClick={() => onDemoAction('Finexa Android App coming soon to Google Play (Demo preview)')}
                className="bg-[#080D16] hover:bg-black text-white px-5 py-3 rounded-2xl flex items-center gap-3 transition-all shadow-md active:scale-98 cursor-pointer border border-white/10"
              >
                <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186c-.352-.363-.564-.897-.564-1.538V3.352c0-.641.212-1.175.563-1.538zm11.233 11.234l2.42 2.42-12.07 6.898 9.65-9.318zm0-2.096L5.192 1.634l12.07 6.898-2.42 2.42zm1.48 1.048l3.666 2.095c.87.497.87 1.309 0 1.806l-3.666 2.095-2.096-2.096 2.096-2.1z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-white/70">GET IT ON</div>
                  <div className="text-xs sm:text-sm font-bold font-body leading-none mt-0.5">Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column (6 Cols): Cropped Large Phone Mockup with Right Now Widget */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end overflow-hidden lg:overflow-visible">
            
            {/* Phone Frame */}
            <div className="relative w-[300px] sm:w-[330px] rounded-[44px] bg-[#080D16] p-3 shadow-2xl border-4 border-[#129FE3]/40 select-none -mb-16 sm:-mb-24 lg:translate-x-8">
              <div className="w-full h-[520px] rounded-[36px] bg-gradient-to-b from-[#0E78B7] via-[#129FE3] to-[#0D6DA6] p-5 text-white flex flex-col justify-between overflow-hidden">
                
                {/* Notch & Status */}
                <div className="flex justify-between items-center text-[10px] text-white/80">
                  <span>9:41</span>
                  <div className="w-20 h-4 bg-[#080D16] rounded-full mx-auto" />
                  <span>5G 100%</span>
                </div>

                {/* Balance & Actions */}
                <div className="mt-4 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/25">
                  <span className="text-[11px] text-white/80 font-medium block">Total Balance</span>
                  <div className="font-display text-4xl text-white mt-1">$56,893.30</div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => onDemoAction('Mobile deposit shortcut')}
                      className="flex-1 bg-[#D8FF4F] text-[#080D16] text-xs font-bold py-2 rounded-xl text-center"
                    >
                      + Deposit
                    </button>
                    <button
                      onClick={() => onDemoAction('Mobile transfer shortcut')}
                      className="flex-1 bg-white/20 text-white text-xs font-semibold py-2 rounded-xl text-center"
                    >
                      Transfer
                    </button>
                  </div>
                </div>

                {/* Overlapping Floating Card: Right Now Telemetry */}
                <div className="bg-white text-[#080D16] rounded-2xl p-3.5 shadow-xl border border-white/60 my-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span>Right Now</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Live
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="font-mono font-bold text-base">289</span>
                    <span className="text-[11px] text-[#5B6470]">Active Users Today</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F5F6F7] rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-[#129FE3] w-[45%]" />
                  </div>
                </div>

                {/* Recent Contacts Avatars */}
                <div className="bg-white/10 rounded-2xl p-3 border border-white/15">
                  <span className="text-[10px] font-medium text-white/70 block mb-2">Recent Contacts</span>
                  <div className="flex justify-between">
                    {['Noah', 'Mason', 'Oliver', 'Lucas'].map((n, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                          {n[0]}
                        </div>
                        <span className="text-[9px] text-white/70 mt-0.5">{n}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-24 h-1 bg-white/40 rounded-full mx-auto" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
