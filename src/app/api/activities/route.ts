import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export type ActivityType = 'view' | 'favorite' | 'collection'

export async function POST(req: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { type, recipeId, details } = await req.json()
    
    const activity = await db.activity.create({
      data: {
        user_id: session.id,
        type,
        recipe_id: recipeId,
        details
      }
    })

    return NextResponse.json({ activity })
  } catch {
    return NextResponse.json({ error: 'Error recording activity' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const activities = await db.activity.findMany({
      where: {
        user_id: session.id
      },
      orderBy: {
        created_at: 'desc'
      },
      take: 10
    })

    return NextResponse.json({ activities })
  } catch {
    return NextResponse.json({ error: 'Error fetching activities' }, { status: 500 })
  }
} 