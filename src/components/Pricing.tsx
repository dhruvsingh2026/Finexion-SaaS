import React, { useState } from 'react'
import { Eyebrow } from './Eyebrow'
import { SectionHeading } from './SectionHeading'
import { PRICING_DATA } from '../data/pricing'

interface PricingProps {
  onDemoAction: (msg: string) => void
}

export const Pricing: React.FC<PricingProps> = ({ onDemoAction }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <section id="pricing" className="bg-[#F5F6F7] py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <Eyebrow label={PRICING_DATA.eyebrow} centered className="mb-4" />
          <SectionHeading
            as="h2"
            leadText={PRICING_DATA.headingLead}
            accentText={PRICING_DATA.headingAccent}
            centered
            className="mb-4"
          />
          <p className="text-sm sm:text-base text-[#5B6470] font-normal leading-relaxed">
            {PRICING_DATA.subparagraph}
          </p>

          {/* Billing Cycle Segmented Control */}
          <div className="inline-flex items-center gap-1 bg-white p-1.5 rounded-full shadow-xs border border-black/5 mt-8" role="radiogroup" aria-label="Billing frequency">
            <button
              onClick={() => setBillingCycle('monthly')}
              aria-checked={billingCycle === 'monthly'}
              role="radio"
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#080D16] text-white shadow-xs'
                  : 'text-[#5B6470] hover:text-[#080D16]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              aria-checked={billingCycle === 'yearly'}
              role="radio"
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-[#080D16] text-white shadow-xs'
                  : 'text-[#5B6470] hover:text-[#080D16]'
              }`}
            >
              <span>Yearly</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                billingCycle === 'yearly' ? 'bg-[#D8FF4F] text-[#080D16]' : 'bg-emerald-100 text-emerald-800'
              }`}>
                Save 15%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {PRICING_DATA.plans.map((plan) => {
            const isYearly = billingCycle === 'yearly'
            const price = isYearly ? plan.yearlyPricePerMonth : plan.monthlyPrice

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-md relative transition-transform hover:-translate-y-1 ${
                  plan.isPopular ? 'border-2 border-[#D8FF4F] shadow-xl' : 'border border-black/5'
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D8FF4F] text-[#080D16] text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
                    Most Popular
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg sm:text-xl text-[#080D16]">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5B6470] min-h-[38px] mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="font-display text-5xl sm:text-6xl text-[#080D16] leading-none">
                      ${price}
                    </span>
                    <span className="text-xs text-[#5B6470] font-medium">/month</span>
                  </div>

                  {/* Yearly Billing Total Note */}
                  <div className="text-[11px] text-[#5B6470] h-4 mb-6">
                    {isYearly && plan.yearlyBilledTotal > 0 ? (
                      <span>Billed ${plan.yearlyBilledTotal.toLocaleString()} yearly</span>
                    ) : (
                      <span>Billed monthly</span>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div className="border-t border-[#F5F6F7] pt-6 mb-8">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#080D16] block mb-3">
                      What's included:
                    </span>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#303640]">
                          <svg
                            className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div>
                  {plan.isPopular ? (
                    <button
                      onClick={() => onDemoAction(`Selected Pro plan with ${billingCycle} billing (Demo only)`)}
                      className="w-full bg-[#D8FF4F] hover:brightness-105 text-[#080D16] font-bold text-sm py-3.5 rounded-2xl transition-all shadow-md active:scale-98 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#080D16]"
                    >
                      {plan.cta}
                    </button>
                  ) : (
                    <button
                      onClick={() => onDemoAction(`Selected ${plan.name} plan (Demo only)`)}
                      className="w-full bg-[#080D16] hover:bg-black text-white font-semibold text-sm py-3.5 rounded-2xl transition-all shadow-xs active:scale-98 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#080D16]"
                    >
                      {plan.cta}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
