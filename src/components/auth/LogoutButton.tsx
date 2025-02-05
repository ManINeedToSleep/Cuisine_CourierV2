'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      router.push('/') // Redirect to home page after logout
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <button 
      onClick={handleLogout}
      className="w-full cabin-button bg-gradient-to-r from-[var(--spice-red)] to-[var(--wood-dark)] 
                 text-[var(--wood-light)] flex items-center justify-center gap-2 group"
    >
      <span>Sign Out</span>
      <svg 
        className="w-4 h-4 transition-transform group-hover:translate-x-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
        />
      </svg>
    </button>
  )
} 