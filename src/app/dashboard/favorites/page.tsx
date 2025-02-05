import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function FavoritesPage() {
  const session = await getSession()
  if (!session) redirect('/auth')

  return (
    <div className="min-h-screen bg-[var(--background)] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[var(--wood-dark)]">
            Your Favorites
          </h1>
          <Link 
            href="/dashboard" 
            className="cabin-button text-sm"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Coming Soon Message */}
        <div className="cabin-border p-12 text-center">
          <h2 className="text-xl font-bold text-[var(--wood-dark)] mb-4">
            Coming Soon!
          </h2>
          <p className="text-[var(--wood-medium)] mb-6">
            We&apos;re working on making your favorites even better.
            Check back soon for a full view of all your favorite recipes!
          </p>
          <Link 
            href="/browse" 
            className="cabin-button text-sm inline-flex"
          >
            Browse More Recipes
          </Link>
        </div>
      </div>
    </div>
  )
} 