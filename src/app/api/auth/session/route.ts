import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getSession()
    
    if (!session) {
      return new NextResponse(null, { status: 401 })
    }

    return NextResponse.json({
      user: {
        id: session.id,
        name: session.name,
        email: session.email
      }
    })
  } catch {
    return new NextResponse(null, { status: 401 })
  }
} 