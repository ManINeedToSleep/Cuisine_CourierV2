'use client'

import { useState, useEffect } from 'react'
import Link from "next/link";
import SignInForm from '@/components/auth/SignInForm'
import RegisterForm from '@/components/auth/RegisterForm'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    fetch('/api/auth/session')
      .then(res => {
        if (res.ok) router.push('/dashboard')
      })
  }, [router])

  const [mode, setMode] = useState<'signin' | 'register'>('signin')
  
  // Shared form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  // Update form data
  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative z-10">
      <main className="max-w-md mx-auto">
        <div className="cabin-border p-8 sm:p-12">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--wood-dark)]">
              Welcome to
              <span className="block text-[var(--spice-red)]">Our Kitchen</span>
            </h2>
          </div>

          {/* Auth Forms */}
          <div className="space-y-6">
            {/* Form Toggle */}
            <div className="flex rounded-lg overflow-hidden border-2 border-[var(--wood-medium)]">
              <button
                onClick={() => setMode('signin')}
                className={`flex-1 py-2 text-sm font-medium transition-colors
                  ${mode === 'signin' 
                    ? 'bg-[var(--wood-medium)] text-[var(--wood-light)]' 
                    : 'bg-transparent text-[var(--wood-medium)] hover:bg-[var(--wood-medium)]/10'
                  }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setMode('register')}
                className={`flex-1 py-2 text-sm font-medium transition-colors
                  ${mode === 'register' 
                    ? 'bg-[var(--wood-medium)] text-[var(--wood-light)]' 
                    : 'bg-transparent text-[var(--wood-medium)] hover:bg-[var(--wood-medium)]/10'
                  }`}
              >
                Register
              </button>
            </div>

            {/* Forms with persisted data */}
            {mode === 'signin' ? (
              <SignInForm 
                formData={formData}
                onChange={handleFormChange}
              />
            ) : (
              <RegisterForm 
                formData={formData}
                onChange={handleFormChange}
              />
            )}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--wood-medium)]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[var(--background)] text-[var(--wood-medium)]">
                  Or continue as
                </span>
              </div>
            </div>

            {/* Guest Access */}
            <Link 
              href="/browse" 
              className="cabin-button text-[var(--wood-light)] w-full flex items-center justify-center gap-2 bg-[var(--wood-medium)]"
            >
              <span>Browse as Guest</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </Link>
          </div>

          {/* Terms */}
          <p className="mt-8 text-center text-sm text-[var(--wood-medium)]">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-[var(--spice-red)] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[var(--spice-red)] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
