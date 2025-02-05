import { db } from './db'

export async function getFavorites(userId: string) {
  return await db.favorite.findMany({
    where: { user_id: userId },
    orderBy: { created_at: 'desc' }
  })
}

export async function toggleFavorite(userId: string, recipeId: string) {
  const existing = await db.favorite.findUnique({
    where: {
      user_id_recipe_id: {
        user_id: userId,
        recipe_id: recipeId
      }
    }
  })

  if (existing) {
    // Remove favorite
    await db.favorite.delete({
      where: {
        user_id_recipe_id: {
          user_id: userId,
          recipe_id: recipeId
        }
      }
    })
    return false // Not favorited anymore
  } else {
    // Add favorite
    await db.favorite.create({
      data: {
        user_id: userId,
        recipe_id: recipeId
      }
    })
    return true // Now favorited
  }
}

export async function isFavorited(userId: string, recipeId: string) {
  const favorite = await db.favorite.findUnique({
    where: {
      user_id_recipe_id: {
        user_id: userId,
        recipe_id: recipeId
      }
    }
  })
  return !!favorite
} 