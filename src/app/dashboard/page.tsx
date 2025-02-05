import Image from 'next/image'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/auth/LogoutButton'
import { db } from '@/lib/db'
import { getFeaturedRecipes, type MealDBRecipe } from '@/lib/mealdb'

const FAVORITES_PER_PAGE = 5

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect('/auth')

  // Get total count for pagination
  const totalFavorites = await db.favorite.count({
    where: { userId: session.id }
  })

  // Get paginated favorites
  const favorites = await db.favorite.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: 'desc' },
    take: FAVORITES_PER_PAGE
  })

  // Get recipe details for each favorite
  const favoriteRecipes = await Promise.all(
    favorites.map(async (fav) => {
      const recipeData = await getFeaturedRecipes()
      return recipeData.find(r => r.idMeal === fav.recipeId)
    })
  ).then(recipes => recipes.filter((r): r is MealDBRecipe => r !== undefined))

  const stats = {
    recipes: 0,
    collections: 0,
    favorites: totalFavorites // Use total count here
  }

  return (
    <div className="min-h-screen bg-[var(--background)] relative">
      {/* Ambient Light Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--sunlight)] opacity-20 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--sunlight)] opacity-20 blur-[100px]" />
      </div>

      {/* Dashboard Header */}
      <header className="bg-[var(--wood-dark)] text-[var(--wood-light)] py-6 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--sunlight)]/5 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {session.name}!
                <div className="h-1 w-20 bg-gradient-to-r from-[var(--sunlight)] to-transparent mt-2" />
              </h1>
              <p className="text-[var(--wood-light)] opacity-90 mt-1">Your cozy kitchen dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/browse" 
                className="cabin-button text-sm relative group"
              >
                <span className="relative z-10">Browse Recipes</span>
                <div className="absolute inset-0 bg-[var(--sunlight)]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </Link>
              <button className="cabin-button text-sm relative group">
                <span className="relative z-10">New Recipe</span>
                <div className="absolute inset-0 bg-[var(--sunlight)]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </button>
              <button className="cabin-button text-sm relative group">
                <span className="relative z-10">Create Collection</span>
                <div className="absolute inset-0 bg-[var(--sunlight)]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Quick Stats with glow effect */}
            <div className="cabin-border p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--sunlight)]/5 via-transparent to-transparent" />
              <h2 className="text-lg font-bold text-[var(--wood-dark)] mb-4">Your Kitchen</h2>
              <div className="space-y-3 relative">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--wood-dark)]">Saved Recipes</span>
                  <span className="text-[var(--spice-red)] font-bold">{stats.recipes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--wood-dark)]">Collections</span>
                  <span className="text-[var(--spice-red)] font-bold">{stats.collections}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--wood-dark)]">Favorites</span>
                  <span className="text-[var(--spice-red)] font-bold">{stats.favorites}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions with hover effects */}
            <nav className="cabin-border p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--sunlight)]/5 via-transparent to-transparent" />
              <h2 className="text-lg font-bold text-[var(--wood-dark)] mb-4">Quick Actions</h2>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/dashboard/recipes" 
                    className="flex items-center gap-2 p-2 hover:bg-[var(--wood-light)]/10 rounded-md text-[var(--wood-dark)]"
                  >
                    <span>📖</span> My Recipes
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/dashboard/collections" 
                    className="flex items-center gap-2 p-2 hover:bg-[var(--wood-light)]/10 rounded-md text-[var(--wood-dark)]"
                  >
                    <span>📚</span> Collections
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/dashboard/favorites" 
                    className="flex items-center gap-2 p-2 hover:bg-[var(--wood-light)]/10 rounded-md text-[var(--wood-dark)]"
                  >
                    <span>⭐</span> Favorites
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/dashboard/settings" 
                    className="flex items-center gap-2 p-2 hover:bg-[var(--wood-light)]/10 rounded-md text-[var(--wood-dark)]"
                  >
                    <span>⚙️</span> Settings
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Logout Section */}
            <section className="mb-8">
              <div className="cabin-border p-6">
                <LogoutButton />
              </div>
            </section>
          </aside>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Recent Favorites */}
            <section className="cabin-border p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--sunlight)]/5 via-transparent to-transparent" />
              <h2 className="text-lg font-bold text-[var(--wood-dark)] mb-4 flex items-center gap-2">
                Your Favorites
                <div className="h-px flex-1 bg-gradient-to-r from-[var(--wood-medium)] to-transparent" />
              </h2>
              <div className="space-y-4">
                {favoriteRecipes.length > 0 ? (
                  <>
                    {favoriteRecipes.map((recipe) => (
                      <div 
                        key={recipe.idMeal}
                        className="flex items-center gap-4 p-4 rounded-lg group transition-all duration-300
                                   border-2 border-[var(--wood-medium)]
                                   bg-gradient-to-b from-[var(--wood-medium)] to-[var(--wood-dark)]
                                   hover:scale-[1.02] hover:-translate-y-0.5"
                      >
                        <div className="h-12 w-12 relative rounded-full overflow-hidden border-2 border-[var(--wood-light)]">
                          <Image
                            src={recipe.strMealThumb}
                            alt={recipe.strMeal}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-[var(--wood-light)]">
                            {recipe.strMeal}
                          </h3>
                          <p className="text-sm text-[var(--wood-text)]">
                            {recipe.strCategory} • {recipe.strArea}
                          </p>
                        </div>
                      </div>
                    ))}
                    {totalFavorites > FAVORITES_PER_PAGE && (
                      <div className="text-center mt-4">
                        <Link 
                          href="/dashboard/favorites" 
                          className="cabin-button text-sm relative group inline-flex"
                        >
                          <span className="relative z-10">View All Favorites</span>
                          <div className="absolute inset-0 bg-[var(--sunlight)]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-[var(--wood-dark)] mb-2">No favorites yet!</div>
                    <p className="text-[var(--wood-text)] mb-4">
                      Start exploring recipes and save your favorites
                    </p>
                    <Link 
                      href="/browse" 
                      className="cabin-button text-sm relative group inline-flex"
                    >
                      <span className="relative z-10">Browse Recipes</span>
                      <div className="absolute inset-0 bg-[var(--sunlight)]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                    </Link>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
} 