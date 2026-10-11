import { useState } from 'react'
import { Hero } from '../components/Hero'
import { Intro } from '../components/Intro'
import { Bento } from '../components/Bento'
import { IndividualsBusinesses } from '../components/IndividualsBusinesses'
import { GlobalFinance } from '../components/GlobalFinance'
import { Steps } from '../components/Steps'
import { Testimonials } from '../components/Testimonials'
import { Pricing } from '../components/Pricing'
import { FAQ } from '../components/FAQ'
import { FinalCTA } from '../components/FinalCTA'
import { Footer } from '../components/Footer'
import { Toast } from '../components/Toast'

export default function Landing() {
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleDemoAction = (msg: string) => {
    setToastMessage(msg)
  }

  return (
    <div className="min-h-screen bg-white font-body selection:bg-[#D8FF4F] selection:text-[#080D16]">
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#080D16] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-hidden"
      >
        Skip to content
      </a>

      {/* Main Semantic Landmark */}
      <main id="main-content">
        {/* Section 1 — Header + Hero */}
        <Hero onDemoAction={handleDemoAction} />

        {/* Section 2 — Brand introduction */}
        <Intro />

        {/* Section 3 — Three-card bento */}
        <Bento onDemoAction={handleDemoAction} />

        {/* Section 4 — Built for Individuals and Businesses */}
        <IndividualsBusinesses onDemoAction={handleDemoAction} />

        {/* Section 5 — Achieve Your Financial Goals With Confidence */}
        <GlobalFinance onDemoAction={handleDemoAction} />

        {/* Section 6 — Simple Steps to Smarter Finance */}
        <Steps onDemoAction={handleDemoAction} />

        {/* Section 7 — Real Stories Shared by Our Customers */}
        <Testimonials onDemoAction={handleDemoAction} />

        {/* Section 8 — Simple and Transparent Pricing */}
        <Pricing onDemoAction={handleDemoAction} />

        {/* Section 9 — Frequently Asked Questions */}
        <FAQ onDemoAction={handleDemoAction} />

        {/* Section 10 — Final conversion CTA */}
        <FinalCTA onDemoAction={handleDemoAction} />
      </main>

      {/* Section 11 — Dark footer */}
      <Footer onDemoAction={handleDemoAction} />

      {/* Interactive Toast Notifications */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  )
}
