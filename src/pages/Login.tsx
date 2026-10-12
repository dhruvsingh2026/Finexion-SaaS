import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { FinexaLogo } from '../components/FinexaLogo'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    setTimeout(() => {
      const res = login(email, password)
      if (res.success) {
        navigate('/')
      } else {
        setError(res.error || 'Login failed.')
      }
      setIsLoading(false)
    }, 350)
  }

  const handleQuickDemo = () => {
    setError(null)
    setIsLoading(true)
    setTimeout(() => {
      login('alex@finexa.finance', 'demo1234')
      navigate('/')
    }, 300)
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
            Log In to Finexa
          </h1>
          <p className="text-xs text-white/70 mt-1">
            Access your unified accounts, AI insights, and transfers.
          </p>

          <div className="grid grid-cols-2 bg-white/10 p-1 rounded-2xl mt-5 border border-white/10">
            <span className="py-2 text-xs font-semibold rounded-xl bg-white text-[#080D16] text-center shadow-sm">
              Log In
            </span>
            <Link
              to="/signup"
              className="py-2 text-xs font-semibold rounded-xl text-white/70 hover:text-white text-center transition-colors"
            >
              Sign Up
            </Link>
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
                <button
                  type="button"
                  onClick={() => {
                    setEmail('alex@finexa.finance')
                    setPassword('demo1234')
                  }}
                  className="text-[11px] text-[#0B77B0] hover:underline"
                >
                  Use demo password
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#080D16] hover:bg-black text-white font-semibold text-sm py-3.5 rounded-2xl transition-all shadow-md active:scale-98 cursor-pointer mt-2 flex items-center justify-center gap-2"
            >
              {isLoading ? <span>Logging in...</span> : <span>Log In to Finexa ↗</span>}
            </button>
          </form>

          {/* Quick Demo Button */}
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

          <div className="mt-6 text-center text-xs text-[#5B6470]">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#080D16] font-bold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
