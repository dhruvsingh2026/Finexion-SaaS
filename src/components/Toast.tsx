import React, { useEffect } from 'react'

interface ToastProps {
  message: string | null
  onClose: () => void
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => {
      onClose()
    }, 3600)
    return () => clearTimeout(timer)
  }, [message, onClose])

  if (!message) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm flex items-center gap-3 bg-[#080D16] text-white px-4 py-3 rounded-xl shadow-2xl border border-white/10 animate-fade-in"
    >
      <div className="w-5 h-5 rounded-full bg-[#D8FF4F] flex items-center justify-center shrink-0">
        <svg className="w-3.5 h-3.5 text-[#080D16]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-xs sm:text-sm font-medium text-white/95 leading-snug">{message}</p>
      <button
        onClick={onClose}
        className="ml-auto text-white/60 hover:text-white p-1 rounded-sm text-sm"
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  )
}
