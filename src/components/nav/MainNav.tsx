import Link from 'next/link'
import { getSession } from '@/lib/auth'

export default async function MainNav() {
  const session = await getSession()

  return (
    <nav className="bg-[var(--wood-dark)] text-[var(--wood-light)] py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Cozy Kitchen
        </Link>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/browse" className="hover:text-[var(--sunlight)]">
                Browse
              </Link>
              <Link href="/dashboard" className="hover:text-[var(--sunlight)]">
                Dashboard
              </Link>
            </>
          ) : (
            <Link 
              href="/auth" 
              className="cabin-button text-sm"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
} 