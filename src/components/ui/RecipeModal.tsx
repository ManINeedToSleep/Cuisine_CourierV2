'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MealDBRecipe } from '@/lib/mealdb'

interface RecipeModalProps {
  recipe: MealDBRecipe
  onClose: () => void
  isFavorited: boolean
  onFavorite: () => void
}

export default function RecipeModal({ recipe, onClose, isFavorited, onFavorite }: RecipeModalProps) {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients')

  // Get ingredients and measurements
  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ingredient = recipe[`strIngredient${i + 1}` as keyof MealDBRecipe]
    const measure = recipe[`strMeasure${i + 1}` as keyof MealDBRecipe]
    if (ingredient && ingredient.trim()) {
      return { ingredient, measure }
    }
    return null
  }).filter((item): item is { ingredient: string; measure: string | undefined } => item !== null)

  function formatInstructions(instructions: string) {
    return instructions
      .split(/\r?\n/)
      .filter(step => step.trim())
      .map(step => step.trim())
      .map(step => {
        if (/^\d+\./.test(step)) return step
        return step.split('.')
          .filter(s => s.trim())
          .map(s => s.trim())
      })
      .flat()
      .filter(step => step)
  }

  return (
    <div className="fixed inset-0 bg-[var(--wood-dark)]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--background)] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--wood-dark)] hover:text-[var(--spice-red)] 
                   transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Recipe header */}
        <div className="relative h-64">
          <Image
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--wood-dark)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[var(--wood-light)]">{recipe.strMeal}</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFavorite();
                  }}
                  className="cabin-button text-sm relative group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isFavorited ? '❤️ Favorited' : '🤍 Add to Favorites'}
                  </span>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-1 rounded-full bg-[var(--wood-light)]/10 text-[var(--wood-light)] text-sm">
                {recipe.strCategory}
              </span>
              <span className="px-2 py-1 rounded-full bg-[var(--wood-light)]/10 text-[var(--wood-light)] text-sm">
                {recipe.strArea}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[var(--wood-medium)]/20">
          <div className="flex gap-4 p-4">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'ingredients'
                  ? 'bg-[var(--wood-medium)] text-[var(--wood-light)]'
                  : 'text-[var(--wood-dark)] hover:bg-[var(--wood-light)]/20'
              }`}
            >
              Ingredients
            </button>
            <button
              onClick={() => setActiveTab('instructions')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'instructions'
                  ? 'bg-[var(--wood-medium)] text-[var(--wood-light)]'
                  : 'text-[var(--wood-dark)] hover:bg-[var(--wood-light)]/20'
              }`}
            >
              Instructions
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-theme(space.64)-theme(space.16))]">
          {activeTab === 'ingredients' ? (
            <div className="cabin-border p-6 bg-gradient-to-b from-[var(--wood-medium)] to-[var(--wood-dark)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ingredients.map(({ ingredient, measure }, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg bg-[var(--wood-light)]/10 
                             border border-[var(--wood-light)]/20 hover:bg-[var(--wood-light)]/15 
                             transition-colors group"
                  >
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden border-2 border-[var(--wood-light)]/20">
                      <Image
                        src={`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`}
                        alt={ingredient}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-[var(--wood-light)]">{ingredient}</div>
                      <div className="text-sm text-[var(--wood-light)] opacity-80">{measure}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="cabin-border p-6 bg-gradient-to-b from-[var(--wood-medium)] to-[var(--wood-dark)]">
              <div className="space-y-4">
                {formatInstructions(recipe.strInstructions).map((step, index) => (
                  <div 
                    key={index}
                    className="flex gap-4 p-4 rounded-lg bg-[var(--wood-light)]/10 
                             border border-[var(--wood-light)]/20 hover:bg-[var(--wood-light)]/15 
                             transition-colors group"
                  >
                    <div className="flex-shrink-0">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full 
                                   bg-[var(--wood-light)]/10 border-2 border-[var(--wood-light)]/20 
                                   text-[var(--wood-light)] text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-[var(--wood-light)] text-lg leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* YouTube link if available */}
          {recipe.strYoutube && (
            <div className="mt-6 cabin-border p-6 bg-gradient-to-b from-[var(--wood-medium)] to-[var(--wood-dark)]">
              <h3 className="text-lg font-medium text-[var(--wood-light)] mb-4">Watch Tutorial</h3>
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="cabin-button inline-flex items-center gap-2"
              >
                <span>Watch on YouTube</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 