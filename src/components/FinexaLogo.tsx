import React from 'react'

interface FinexaLogoProps {
  size?: 'sm' | 'md' | 'lg'
  markOnly?: boolean
  className?: string
  textColor?: string
}

export const FinexaLogo: React.FC<FinexaLogoProps> = ({
  size = 'md',
  markOnly = false,
  className = '',
  textColor = 'text-[#080D16]',
}) => {
  const markDimensions = {
    sm: 'w-6 h-6 rounded-md',
    md: 'w-8 h-8 rounded-lg',
    lg: 'w-10 h-10 rounded-xl',
  }[size]

  const textSize = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size]

  return (
    <div className={`inline-flex items-center gap-2.5 font-semibold tracking-tight select-none ${className}`}>
      {/* Lime Rounded-Square Mark with Dark Arrow */}
      <div
        className={`${markDimensions} bg-[#D8FF4F] flex items-center justify-center shrink-0 shadow-xs transition-transform hover:scale-105`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-4/7 h-4/7 text-[#080D16]"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </div>

      {!markOnly && (
        <span className={`${textSize} ${textColor} font-semibold font-body tracking-tight`}>
          Finexa
        </span>
      )}
    </div>
  )
}
