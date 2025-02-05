'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '../ui/LoadingSpinner'
import { signIn } from '@/lib/auth-client'

interface SignInFormProps {
  formData: {
    email: string;
    password: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function SignInForm({ formData, onChange }: SignInFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Use formData instead of local state
  const { email, password } = formData

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      await signIn(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-[var(--wood-dark)] mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onChange('email', e.target.value)}
          className="w-full px-4 py-2 rounded-md border-2 border-[var(--wood-medium)] 
                   bg-[var(--background)] text-[var(--wood-dark)]
                   focus:outline-none focus:border-[var(--spice-red)]
                   placeholder:text-[var(--wood-medium)]
                   disabled:opacity-50"
          placeholder="your@email.com"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label 
          htmlFor="password" 
          className="block text-sm font-medium text-[var(--wood-dark)] mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => onChange('password', e.target.value)}
          className="w-full px-4 py-2 rounded-md border-2 border-[var(--wood-medium)] 
                   bg-[var(--background)] text-[var(--wood-dark)]
                   focus:outline-none focus:border-[var(--spice-red)]
                   placeholder:text-[var(--wood-medium)]
                   disabled:opacity-50"
          placeholder="••••••••"
          required
          disabled={loading}
        />
      </div>

      <button 
        type="submit"
        disabled={loading}
        className="cabin-button text-[var(--wood-light)] w-full justify-center
                 disabled:opacity-50 flex items-center gap-2"
      >
        {loading ? (
          <>
            <LoadingSpinner />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  )
} 