import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { FinexaLogo } from '../components/FinexaLogo'

export default function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuthStore()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'Starter' | 'Pro' | 'Enterprise'>('Pro')
  const [termsAgreed, setTermsAgreed] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!termsAgreed) {
      setError('Please accept the Terms of Service to continue.')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      const res = signup(name, email, password, selectedPlan)
      if (res.success) {
        navigate('/')
      } else {
        setError(res.error || 'Sign up failed.')
      }
      setIsLoading(false)
    }, 400)
  }

  return (
    <div className="min-h-screen bg-[#F5F6F7] flex flex-col justify-center items-center p-4 sm:p-6 font-body">
      <div className="mb-6">
        <Link to="/" className="inline-block">
          <FinexaLogo size="lg" />
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-[32px] shadow-xl border border-black/8 overflow-hidden">
        {/* Header */}
        <div className="bg-[#080D16] text-white p-7 sm:p-8">
          <h1 className="font-display uppercase text-3xl sm:text-4xl text-white tracking-wide">
            Create an Account
          </h1>
          <p className="text-xs text-white/70 mt-1">
            Start managing and growing your money with AI guidance.
          </p>

          <div className="grid grid-cols-2 bg-white/10 p-1 rounded-2xl mt-5 border border-white/10">
            <Link
              to="/login"
              className="py-2 text-xs font-semibold rounded-xl text-white/70 hover:text-white text-center transition-colors"
            >
              Log In
            </Link>
            <span className="py-2 text-xs font-semibold rounded-xl bg-[#D8FF4F] text-[#080D16] text-center shadow-sm">
              Sign Up
            </span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-7 sm:p-8">
          {error && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#080D16] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. David Martinez"
                className="w-full bg-[#F5F6F7] border border-black/10 focus:border-[#129FE3] focus:bg-white px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#080D16] placeholder:text-[#5B6470] focus:outline-hidden transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#080D16] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#F5F6F7] border border-black/10 focus:border-[#129FE3] focus:bg-white px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#080D16] placeholder:text-[#5B6470] focus:outline-hidden transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#080D16] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 4 characters"
                  className="w-full bg-[#F5F6F7] border border-black/10 focus:border-[#129FE3] focus:bg-white px-4 py-3 pr-11 rounded-2xl text-xs sm:text-sm text-[#080D16] placeholder:text-[#5B6470] focus:outline-hidden transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5B6470] hover:text-[#080D16] text-xs p-1"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#080D16] mb-1.5">
                Choose Plan
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Starter', 'Pro', 'Enterprise'] as const).map((plan) => (
                  <button
                    key={plan}
                    type="button"
                    onClick={() => setSelectedPlan(plan)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      selectedPlan === plan
                        ? 'bg-[#080D16] text-white border-[#080D16] shadow-xs'
                        : 'bg-[#F5F6F7] text-[#5B6470] border-black/5 hover:border-black/15'
                    }`}
                  >
                    {plan}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-[#5B6470] pt-1">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="rounded text-[#080D16] focus:ring-0 mt-0.5"
                />
                <span>
                  I agree to Finexa's Terms of Service and Privacy Policy.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#080D16] hover:bg-black text-white font-semibold text-sm py-3.5 rounded-2xl transition-all shadow-md active:scale-98 cursor-pointer mt-2 flex items-center justify-center gap-2"
            >
              {isLoading ? <span>Creating account...</span> : <span>Create Account ({selectedPlan}) ↗</span>}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-[#5B6470]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#080D16] font-bold hover:underline">
              Log in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
