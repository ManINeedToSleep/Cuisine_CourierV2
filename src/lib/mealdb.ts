const MEALDB_API = 'https://www.themealdb.com/api/json/v1/1'
const CACHE_DURATION = 1000 * 60 * 60 // 1 hour

// Cache interface
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

// In-memory cache
const cache: {
  [key: string]: CacheItem<unknown>;
} = {}

// Cache helper functions
function getCached<T>(key: string): T | null {
  const item = cache[key]
  if (!item) return null
  
  const isExpired = Date.now() - item.timestamp > CACHE_DURATION
  if (isExpired) {
    delete cache[key]
    return null
  }
  
  return item.data as T
}

function setCache<T>(key: string, data: T): void {
  cache[key] = {
    data,
    timestamp: Date.now()
  }
}

// Error handling wrapper
async function fetchWithRetry<T>(
  url: string,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay))
      return fetchWithRetry(url, retries - 1, delay * 2)
    }
    throw error
  }
}

export interface MealDBRecipe {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strTags?: string
  strYoutube?: string
  [key: string]: string | undefined // For dynamic ingredient/measure properties
}

export type MealDBArea = {
  strArea: string;
}

export async function getFeaturedRecipes(): Promise<MealDBRecipe[]> {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
  const data = await res.json()
  return data.meals || []
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
  const data = await res.json()
  return data.meals.map((meal: { strCategory: string }) => meal.strCategory)
}

export async function searchRecipes(query: string): Promise<MealDBRecipe[]> {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
  const data = await res.json()
  return data.meals || []
}

// Alternative approach using categories
export async function getAllRecipes(): Promise<MealDBRecipe[]> {
  const cached = getCached<MealDBRecipe[]>('all')
  if (cached) return cached

  try {
    const categories = await getCategories()
    const recipes = await Promise.all(
      categories.map(async category => {
        try {
          const data = await fetchWithRetry<{ meals: MealDBRecipe[] }>(
            `${MEALDB_API}/filter.php?c=${category}`
          )
          return data.meals || []
        } catch (error) {
          console.error(`Error fetching recipes for category ${category}:`, error)
          return []
        }
      })
    )

    const allRecipes = recipes.flat()
    setCache('all', allRecipes)
    return allRecipes
  } catch (error) {
    console.error('Error in getAllRecipes:', error)
    return []
  }
}

export async function getAreas(): Promise<string[]> {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
  const data = await res.json()
  return data.meals.map((meal: { strArea: string }) => meal.strArea)
} 