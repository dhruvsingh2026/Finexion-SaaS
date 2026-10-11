import React, { useState } from 'react'
import { Eyebrow } from './Eyebrow'
import { SectionHeading } from './SectionHeading'
import { FAQ_DATA } from '../data/faq'

interface FAQProps {
  onDemoAction: (msg: string) => void
}

export const FAQ: React.FC<FAQProps> = ({ onDemoAction }) => {
  // Item 02 is expanded by default
  const [openId, setOpenId] = useState<string>('faq-02')

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? '' : id)
  }

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column (5 Cols): Heading & Support Card */}
        <div className="lg:col-span-5">
          <Eyebrow label={FAQ_DATA.eyebrow} className="mb-4" />
          <SectionHeading
            as="h2"
            leadText={FAQ_DATA.headingLead}
            accentText={FAQ_DATA.headingAccent}
            className="mb-8"
          />

          {/* Support Assistance Card */}
          <div className="bg-[#F5F6F7] rounded-3xl p-6 sm:p-7 border border-black/5 mt-6">
            <h3 className="font-semibold text-base sm:text-lg text-[#080D16]">
              {FAQ_DATA.support.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6470] mt-1.5 mb-5 leading-relaxed">
              {FAQ_DATA.support.subtitle}
            </p>
            <button
              onClick={() => onDemoAction('Demo support contact: Email support@finexa.finance')}
              className="bg-[#080D16] text-white hover:bg-black text-xs font-semibold px-5 py-3 rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-sm focus-visible:outline-2 focus-visible:outline-[#080D16]"
            >
              <span>{FAQ_DATA.support.cta}</span>
              <span>↗</span>
            </button>
          </div>
        </div>

        {/* Right Column (7 Cols): 5 Accordion Panels */}
        <div className="lg:col-span-7 space-y-3.5">
          {FAQ_DATA.items.map((item) => {
            const isOpen = openId === item.id
            const panelId = `panel-${item.id}`
            const buttonId = `button-${item.id}`

            return (
              <div
                key={item.id}
                className="bg-[#F5F6F7] rounded-2xl overflow-hidden border border-black/5 transition-colors"
              >
                <button
                  id={buttonId}
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#080D16]"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="font-mono text-xs font-semibold text-[#5B6470] shrink-0">
                      {item.number}
                    </span>
                    <span className="font-semibold text-sm sm:text-base text-[#080D16]">
                      {item.question}
                    </span>
                  </div>

                  <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#080D16] font-bold text-sm shrink-0 shadow-2xs">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-[#5B6470] leading-relaxed pl-12 sm:pl-14 animate-fade-in"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
