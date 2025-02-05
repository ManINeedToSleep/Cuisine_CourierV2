'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '../ui/LoadingSpinner'
import { getPasswordStrength } from '@/utils/passwordStrength'
import { signIn, signUp } from '@/lib/auth-client'

interface RegisterFormProps {
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function RegisterForm({ formData, onChange }: RegisterFormProps) {
  const router = useRouter()
  const { name, email, password, confirmPassword } = formData
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: '',
    color: ''
  })

  useEffect(() => {
    if (password) {
      setPasswordStrength(getPasswordStrength(password))
    }
  }, [password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (passwordStrength.score < 2) {
      setError('Please choose a stronger password')
      return
    }

    setLoading(true)
    
    try {
      await signUp(name, email, password)
      await signIn(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
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
          htmlFor="name" 
          className="block text-sm font-medium text-[var(--wood-dark)] mb-1"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => onChange('name', e.target.value)}
          className="w-full px-4 py-2 rounded-md border-2 border-[var(--wood-medium)] 
                   bg-[var(--background)] text-[var(--wood-dark)]
                   focus:outline-none focus:border-[var(--spice-red)]
                   placeholder:text-[var(--wood-medium)]
                   disabled:opacity-50"
          placeholder="Your name"
          required
          disabled={loading}
        />
      </div>

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
        {password && (
          <div className="mt-1 text-sm" style={{ color: passwordStrength.color }}>
            Password strength: {passwordStrength.label}
            <div className="mt-1 h-1 w-full bg-[var(--wood-light)] rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-300"
                style={{ 
                  width: `${(passwordStrength.score / 4) * 100}%`,
                  backgroundColor: passwordStrength.color
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <label 
          htmlFor="confirmPassword" 
          className="block text-sm font-medium text-[var(--wood-dark)] mb-1"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => onChange('confirmPassword', e.target.value)}
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
            Creating Account...
          </>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  )
} 