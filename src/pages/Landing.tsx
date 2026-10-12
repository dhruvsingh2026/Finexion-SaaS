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
import { AuthModal } from '../components/AuthModal'
import { AccountModal } from '../components/AccountModal'

export default function Landing() {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [authPlan, setAuthPlan] = useState<'Starter' | 'Pro' | 'Enterprise'>('Pro')
  const [accountModalOpen, setAccountModalOpen] = useState(false)

  const handleDemoAction = (msg: string) => {
    setToastMessage(msg)
  }

  const handleOpenAuth = (mode: 'login' | 'signup', plan: 'Starter' | 'Pro' | 'Enterprise' = 'Pro') => {
    setAuthMode(mode)
    setAuthPlan(plan)
    setAuthModalOpen(true)
  }

  const handleOpenAccount = () => {
    setAccountModalOpen(true)
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
        <Hero
          onDemoAction={handleDemoAction}
          onOpenAuth={handleOpenAuth}
          onOpenAccount={handleOpenAccount}
        />

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
        <Pricing
          onDemoAction={handleDemoAction}
          onOpenAuth={handleOpenAuth}
        />

        {/* Section 9 — Frequently Asked Questions */}
        <FAQ onDemoAction={handleDemoAction} />

        {/* Section 10 — Final conversion CTA */}
        <FinalCTA onDemoAction={handleDemoAction} />
      </main>

      {/* Section 11 — Dark footer */}
      <Footer onDemoAction={handleDemoAction} />

      {/* Interactive Auth Modal (Sign Up & Log In) */}
      <AuthModal
        key={authModalOpen ? `${authMode}-${authPlan}` : 'auth-modal'}
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        initialPlan={authPlan}
        onSuccessToast={handleDemoAction}
      />

      {/* Interactive Account & Wallet Modal */}
      <AccountModal
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        onToast={handleDemoAction}
      />

      {/* Interactive Toast Notifications */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  )
}
