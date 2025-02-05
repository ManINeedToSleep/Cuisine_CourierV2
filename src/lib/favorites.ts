import { db } from './db'

export async function getFavorites(userId: string) {
  return await db.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  })
}

export async function toggleFavorite(userId: string, recipeId: string) {
  const existing = await db.favorite.findUnique({
    where: {
      userId_recipeId: {
        userId,
        recipeId
      }
    }
  })

  if (existing) {
    // Remove favorite
    await db.favorite.delete({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    })
    return false // Not favorited anymore
  } else {
    // Add favorite
    await db.favorite.create({
      data: {
        userId,
        recipeId
      }
    })
    return true // Now favorited
  }
}

export async function isFavorited(userId: string, recipeId: string) {
  const favorite = await db.favorite.findUnique({
    where: {
      userId_recipeId: {
        userId,
        recipeId
      }
    }
  })
  return !!favorite
} 