import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getFavorites, toggleFavorite } from '@/lib/favorites'

export async function POST(req: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { recipeId } = await req.json()
    const isFavorited = await toggleFavorite(session.id, recipeId)

    return NextResponse.json({ success: true, isFavorited })
  } catch {
    return NextResponse.json({ error: 'Error toggling favorite' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const favorites = await getFavorites(session.id)
    return NextResponse.json({ favorites })
  } catch {
    return NextResponse.json({ error: 'Error fetching favorites' }, { status: 500 })
  }
} 