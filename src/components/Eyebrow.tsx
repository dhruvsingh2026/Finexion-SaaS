import React from 'react'

interface EyebrowProps {
  label: string
  centered?: boolean
  light?: boolean
  className?: string
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  label,
  centered = false,
  light = false,
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center text-xs sm:text-sm font-medium tracking-wide font-body select-none ${
        centered ? 'justify-center mx-auto' : ''
      } ${light ? 'text-white/85' : 'text-[#5B6470]'} ${className}`}
    >
      <span className="opacity-70 mr-1">[</span>
      <span>{label}</span>
      <span className="opacity-70 ml-1">]</span>
    </div>
  )
}
