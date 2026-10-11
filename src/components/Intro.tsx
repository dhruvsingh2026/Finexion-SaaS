import React from 'react'
import { Eyebrow } from './Eyebrow'
import { FinexaLogo } from './FinexaLogo'

export const Intro: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F5F6F7] pb-6 mb-10 sm:mb-14">
        <Eyebrow label="About Finexa" />
        <div className="text-right sm:text-right text-xs text-[#5B6470] flex items-center justify-between sm:justify-end gap-4">
          <span className="font-semibold text-[#080D16]">© 2026</span>
          <span className="hidden md:inline text-[#5B6470]">
            Empowering smarter financial decisions for individuals and businesses worldwide.
          </span>
        </div>
      </div>

      {/* Editorial Statement with Inline Logo */}
      <div className="max-w-4xl">
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] leading-[1.3] sm:leading-[1.28] font-medium tracking-tight">
          <span className="inline-flex items-baseline align-baseline mr-3 -translate-y-0.5">
            <FinexaLogo size="md" className="align-middle inline-flex" />
          </span>
          <span className="text-[#303640]">
            is an AI-powered finance platform designed to simplify how you manage, move, and grow your money.{' '}
          </span>
          <span className="text-[#5B6470]">
            From everyday transactions to advanced financial insights, we turn complex processes into seamless experiences.
          </span>
        </p>
      </div>
    </section>
  )
}
