import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { FinexaLogo } from './FinexaLogo'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'signup'
  initialPlan?: 'Starter' | 'Pro' | 'Enterprise'
  onSuccessToast?: (msg: string) => void
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  initialPlan = 'Pro',
  onSuccessToast,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedPlan, setSelectedPlan] = useState<'Starter' | 'Pro' | 'Enterprise'>(initialPlan)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [termsAgreed, setTermsAgreed] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { login, signup } = useAuthStore()


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    setTimeout(() => {
      if (mode === 'login') {
        const res = login(email, password)
        if (res.success) {
          onSuccessToast?.(`Welcome back! Successfully logged in.`)
          onClose()
        } else {
          setError(res.error || 'Login failed.')
        }
      } else {
        if (!termsAgreed) {
          setError('Please accept the Terms of Service to create an account.')
          setIsLoading(false)
          return
        }
        const res = signup(name, email, password, selectedPlan)
        if (res.success) {
          onSuccessToast?.(`Welcome to Finexa, ${name}! Your ${selectedPlan} account is now active.`)
          onClose()
        } else {
          setError(res.error || 'Sign up failed.')
        }
      }
      setIsLoading(false)
    }, 400)
  }

  const handleQuickDemo = () => {
    setError(null)
    setIsLoading(true)
    setTimeout(() => {
      const res = login('alex@finexa.finance', 'demo1234')
      if (res.success) {
        onSuccessToast?.('Logged in as Alex Vance (Demo Pro Account)')
        onClose()
      }
      setIsLoading(false)
    }, 300)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-[32px] shadow-2xl border border-black/10 overflow-hidden relative"
      >
        {/* Header Bar */}
        <div className="bg-[#080D16] text-white p-6 sm:p-7 relative">
          <div className="flex items-center justify-between mb-4">
            <FinexaLogo size="sm" textColor="text-white" />
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          <h2 id="auth-modal-title" className="font-display uppercase text-2xl sm:text-3xl text-white tracking-wide">
            {mode === 'login' ? 'Welcome Back to Finexa' : 'Create Your Finexa Account'}
          </h2>
          <p className="text-xs text-white/70 mt-1">
            {mode === 'login'
              ? 'Access your balances, transactions, and AI financial models.'
              : 'Start taking control of your financial future today.'}
          </p>

          {/* Toggle Switch */}
          <div className="grid grid-cols-2 bg-white/10 p-1 rounded-2xl mt-5 border border-white/10">
            <button
              type="button"
              onClick={() => {
                setMode('login')
                setError(null)
              }}
              className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-[#080D16] shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup')
                setError(null)
              }}
              className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-[#D8FF4F] text-[#080D16] shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7">
          {error && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
              <span className="text-rose-500 font-bold">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#080D16] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-[#F5F6F7] border border-black/10 focus:border-[#129FE3] focus:bg-white px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#080D16] placeholder:text-[#5B6470] focus:outline-hidden transition-all"
                />
              </div>
            )}

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
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-[#080D16]">
                  Password
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('alex@finexa.finance')
                      setPassword('demo1234')
                      setError(null)
                    }}
                    className="text-[11px] text-[#0B77B0] hover:underline"
                  >
                    Use demo password
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'At least 4 characters' : 'Enter your password'}
                  className="w-full bg-[#F5F6F7] border border-black/10 focus:border-[#129FE3] focus:bg-white px-4 py-3 pr-11 rounded-2xl text-xs sm:text-sm text-[#080D16] placeholder:text-[#5B6470] focus:outline-hidden transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5B6470] hover:text-[#080D16] text-xs p-1"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Plan selection for Signup */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#080D16] mb-1.5">
                  Select Plan
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
            )}

            {/* Remember Me / Terms */}
            {mode === 'login' ? (
              <div className="flex items-center justify-between text-xs text-[#5B6470] pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-[#080D16] focus:ring-0"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('alex@finexa.finance')
                    setPassword('demo1234')
                  }}
                  className="text-[#0B77B0] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            ) : (
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
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#080D16] hover:bg-black text-white font-semibold text-sm py-3.5 rounded-2xl transition-all shadow-md active:scale-98 cursor-pointer mt-2 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Processing...</span>
              ) : mode === 'login' ? (
                <>
                  <span>Log In to Finexa</span>
                  <span>↗</span>
                </>
              ) : (
                <>
                  <span>Create Account ({selectedPlan})</span>
                  <span>↗</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-5 pt-4 border-t border-[#F5F6F7]">
            <button
              type="button"
              onClick={handleQuickDemo}
              disabled={isLoading}
              className="w-full bg-[#D8FF4F] hover:brightness-105 text-[#080D16] font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <span>⚡ Quick Demo Login (Alex Vance — Pro)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
