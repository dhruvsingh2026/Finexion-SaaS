import React, { useState } from 'react'

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fallbackText?: string
  aspectRatio?: string
  className?: string
  priority?: boolean
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackText = 'Finexa Media',
  aspectRatio = '16/9',
  className = '',
  priority = false,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#129FE3] to-[#0B77B0] text-white p-6 rounded-2xl select-none ${className}`}
        style={{ aspectRatio }}
      >
        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center mb-2">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="text-xs font-medium text-white/90">{fallbackText}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? undefined : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setHasError(true)}
      className={`w-full h-full object-cover transition-opacity duration-300 ${className}`}
      style={{ aspectRatio }}
      {...rest}
    />
  )
}
