'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getFeaturedRecipes, getCategories, searchRecipes, type MealDBRecipe, getAreas } from '@/lib/mealdb'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import RecipeImage from '@/components/ui/RecipeImage'
import RecipeModal from '@/components/ui/RecipeModal'

// Add interface at the top of the file
interface Favorite {
  id: string;
  userId: string;
  recipeId: string;
  createdAt: Date;
}

export default function BrowsePage() {
  const [recipes, setRecipes] = useState<MealDBRecipe[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [areas, setAreas] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const recipesPerPage = 20
  const [pageLoading, setPageLoading] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<MealDBRecipe | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [recipesData, categoriesData, areasData] = await Promise.all([
          getFeaturedRecipes(),
          getCategories(),
          getAreas()
        ])
        setRecipes(recipesData)
        setCategories(categoriesData)
        setAreas(areasData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadInitialData()
  }, [])

  useEffect(() => {
    // Load user's favorites
    fetch('/api/favorites')
      .then(res => res.json())
      .then(data => {
        setFavorites(data.favorites.map((f: Favorite) => f.recipeId))
      })
      .catch(console.error)
  }, [])

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    setShowFilters(false)
  }

  const handleAreaChange = (area: string | null) => {
    setSelectedArea(area)
    setCurrentPage(1)
    setShowFilters(false)
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
    
    if (query.length > 2) {
      setLoading(true)
      try {
        const results = await searchRecipes(query)
        setRecipes(results)
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setLoading(false)
      }
    } else if (query.length === 0) {
      const featured = await getFeaturedRecipes()
      setRecipes(featured)
    }
  }

  const handleFavorite = async (recipeId: string) => {
    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId })
      })
      const data = await res.json()
      
      if (data.success) {
        if (data.isFavorited) {
          setFavorites(prev => [...prev, recipeId])
        } else {
          setFavorites(prev => prev.filter(id => id !== recipeId))
        }
        
        // Refresh dashboard stats if we're on the dashboard
        if (window.location.pathname.includes('/dashboard')) {
          window.location.reload()
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  const filteredRecipes = recipes
    .filter(recipe => !selectedCategory || recipe.strCategory === selectedCategory)
    .filter(recipe => !selectedArea || recipe.strArea === selectedArea)

  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  )

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage)

  const handlePageChange = async (newPage: number) => {
    setPageLoading(true)
    setCurrentPage(newPage)
    // Simulate a small delay for smooth transition
    await new Promise(resolve => setTimeout(resolve, 300))
    setPageLoading(false)
  }

  function PaginationControls() {
    if (totalPages <= 1) return null

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1 || pageLoading}
          className="cabin-button text-sm px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>
        
        <div className="flex items-center gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              disabled={pageLoading}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                        ${currentPage === i + 1 
                          ? 'bg-[var(--wood-dark)] text-[var(--wood-light)]' 
                          : 'text-[var(--wood-dark)] hover:bg-[var(--wood-light)]/20'
                        }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || pageLoading}
          className="cabin-button text-sm px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] relative">
      {/* Ambient Light Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--sunlight)] opacity-20 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--sunlight)] opacity-20 blur-[100px]" />
      </div>

      {/* Browse Header */}
      <header className="bg-[var(--wood-dark)] text-[var(--wood-light)] py-6 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--sunlight)]/5 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="cabin-button text-sm flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>

            {/* Center the title */}
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-bold">
                Browse Recipes
                <div className="h-1 w-20 bg-gradient-to-r from-[var(--sunlight)] to-transparent mt-2 mx-auto" />
              </h1>
              <p className="text-[var(--wood-light)] opacity-90 mt-1">Discover new flavors for your kitchen</p>
            </div>
            
            {/* Search and Filter */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <input 
                  type="search"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-[var(--wood-light)]/10 border-2 border-[var(--wood-medium)]
                           text-[var(--wood-light)] placeholder-[var(--wood-light)]/50
                           focus:outline-none focus:border-[var(--sunlight)]
                           min-w-[200px]"
                />
              </div>
              <div className="relative">
                <button 
                  className="cabin-button text-sm relative group"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <span className="relative z-10">Filter</span>
                  <div className="absolute inset-0 bg-[var(--sunlight)]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                </button>
                
                {/* Filter Dropdown */}
                {showFilters && (
                  <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-[var(--wood-light)] border-2 border-[var(--wood-medium)] z-50">
                    <div className="p-2">
                      <div className="mb-4">
                        <h3 className="text-[var(--wood-dark)] font-medium px-4 py-2">Categories</h3>
                        <button
                          onClick={() => handleCategoryChange(null)}
                          className={`w-full text-left px-4 py-2 rounded-md text-sm ${
                            !selectedCategory ? 'bg-[var(--wood-medium)] text-[var(--wood-light)]' : 'text-[var(--wood-dark)] hover:bg-[var(--wood-medium)]/10'
                          }`}
                        >
                          All Categories
                        </button>
                        {categories.map(category => (
                          <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`w-full text-left px-4 py-2 rounded-md text-sm ${
                              selectedCategory === category ? 'bg-[var(--wood-medium)] text-[var(--wood-light)]' : 'text-[var(--wood-dark)] hover:bg-[var(--wood-medium)]/10'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>

                      <div className="border-t border-[var(--wood-medium)]/20 mb-4" />

                      <div>
                        <h3 className="text-[var(--wood-dark)] font-medium px-4 py-2">Cuisines</h3>
                        <button
                          onClick={() => handleAreaChange(null)}
                          className={`w-full text-left px-4 py-2 rounded-md text-sm ${
                            !selectedArea ? 'bg-[var(--wood-medium)] text-[var(--wood-light)]' : 'text-[var(--wood-dark)] hover:bg-[var(--wood-medium)]/10'
                          }`}
                        >
                          All Cuisines
                        </button>
                        {areas.map(area => (
                          <button
                            key={area}
                            onClick={() => handleAreaChange(area)}
                            className={`w-full text-left px-4 py-2 rounded-md text-sm ${
                              selectedArea === area ? 'bg-[var(--wood-medium)] text-[var(--wood-light)]' : 'text-[var(--wood-dark)] hover:bg-[var(--wood-medium)]/10'
                            }`}
                          >
                            {area}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Browse Content */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Categories */}
            <section className="mb-12">
              <h2 className="text-lg font-bold text-[var(--wood-dark)] mb-6 flex items-center gap-2">
                Popular Categories
                <div className="h-px flex-1 bg-gradient-to-r from-[var(--wood-medium)] to-transparent" />
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.slice(0, 4).map((category) => (
                  <button 
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`cabin-border p-4 text-center cursor-pointer hover:scale-105 transition-transform ${
                      selectedCategory === category ? 'border-[var(--spice-red)]' : ''
                    }`}
                  >
                    <h3 className="text-[var(--wood-dark)] font-medium">{category}</h3>
                  </button>
                ))}
              </div>
            </section>

            {/* Recipes Grid */}
            <section className="mb-12">
              <h2 className="text-lg font-bold text-[var(--wood-dark)] mb-6 flex items-center gap-2">
                {searchQuery 
                  ? 'Search Results' 
                  : `${selectedCategory || 'All'} ${selectedArea ? `• ${selectedArea}` : ''} Recipes`}
                <div className="h-px flex-1 bg-gradient-to-r from-[var(--wood-medium)] to-transparent" />
              </h2>
              {filteredRecipes.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedRecipes.map((recipe) => (
                      <div 
                        key={recipe.idMeal}
                        onClick={() => setSelectedRecipe(recipe)}
                        className="group cabin-border overflow-hidden cursor-pointer transform transition-all duration-300 
                                   hover:scale-[1.02] hover:-translate-y-1 flex flex-col h-full"
                      >
                        <RecipeImage
                          src={recipe.strMealThumb}
                          alt={recipe.strMeal}
                          className="group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="p-4 bg-gradient-to-b from-[var(--wood-medium)] to-[var(--wood-dark)] flex-1 flex flex-col">
                          <h3 className="font-medium text-[var(--wood-light)] group-hover:text-[var(--sunlight)] 
                                         transition-colors line-clamp-1">
                            {recipe.strMeal}
                          </h3>
                          <p className="text-sm text-[var(--wood-light)] mt-1 line-clamp-1 font-medium opacity-90">
                            {recipe.strCategory}
                          </p>
                          <div className="flex items-center gap-2 mt-auto pt-3 flex-wrap">
                            <span className="text-xs px-2 py-1 rounded-full bg-[var(--wood-light)]/10 
                                           border border-[var(--wood-light)]/20 text-[var(--wood-light)] 
                                           flex items-center gap-1 transition-all duration-300
                                           group-hover:bg-[var(--wood-light)]/15">
                              🌍 {recipe.strArea}
                            </span>
                            {recipe.strTags && recipe.strTags.split(',').map(tag => (
                              <span 
                                key={tag}
                                className="text-xs px-2 py-1 rounded-full bg-[var(--wood-light)]/10 
                                         border border-[var(--wood-light)]/20 text-[var(--wood-light)] 
                                         flex items-center gap-1 transition-all duration-300
                                         group-hover:bg-[var(--wood-light)]/15"
                              >
                                🏷️ {tag.trim()}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleFavorite(recipe.idMeal)
                            }}
                            className="absolute top-2 right-2 z-20"
                          >
                            {favorites.includes(recipe.idMeal) ? '❤️' : '🤍'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <PaginationControls />
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-[var(--wood-dark)]">No recipes found</p>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* Add loading overlay for page changes */}
      {pageLoading && (
        <div className="absolute inset-0 bg-[var(--wood-dark)]/20 backdrop-blur-sm 
                        flex items-center justify-center z-50">
          <LoadingSpinner />
        </div>
      )}

      {/* Add modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          isFavorited={favorites.includes(selectedRecipe.idMeal)}
          onFavorite={() => handleFavorite(selectedRecipe.idMeal)}
        />
      )}
    </div>
  )
}
