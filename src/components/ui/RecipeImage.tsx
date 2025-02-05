'use client'

import { useState } from 'react'
import Image from 'next/image'
import LoadingSpinner from './LoadingSpinner'

interface RecipeImageProps {
  src: string
  alt: string
  className?: string
}

export default function RecipeImage({ src, alt, className = '' }: RecipeImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <div className="relative aspect-video">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--wood-light)]/10">
          <LoadingSpinner />
        </div>
      )}
      <Image
        src={error ? '/AiCabinKitchen.jpg' : src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setError(true)
          setIsLoading(false)
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
        loading="lazy"
      />
    </div>
  )
} 