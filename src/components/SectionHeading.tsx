import React from 'react'

interface SectionHeadingProps {
  as?: 'h1' | 'h2' | 'h3'
  leadText: string
  accentText?: string
  tailText?: string
  centered?: boolean
  onPhoto?: boolean
  className?: string
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  as: Component = 'h2',
  leadText,
  accentText,
  tailText,
  centered = false,
  onPhoto = false,
  className = '',
}) => {
  const sizeClasses =
    Component === 'h1'
      ? 'text-[2.75rem] sm:text-[3.75rem] md:text-[5rem] lg:text-[5.75rem] leading-[0.92] tracking-[0.015em]'
      : 'text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.25rem] leading-[0.95] tracking-[0.015em]'

  const textColor = onPhoto ? 'text-white' : 'text-[#080D16]'
  const accentColor = onPhoto ? 'text-white italic font-serif' : 'text-[#0B77B0] italic font-serif'

  return (
    <Component
      className={`font-display uppercase ${sizeClasses} ${textColor} ${
        centered ? 'text-center mx-auto' : 'text-left'
      } ${className}`}
      style={{ textWrap: 'balance' }}
    >
      <span>{leadText}</span>
      {accentText && (
        <span className={`inline-block font-normal lowercase tracking-normal ${accentColor} px-1.5`}>
          {accentText}
        </span>
      )}
      {tailText && <span>{tailText}</span>}
    </Component>
  )
}
