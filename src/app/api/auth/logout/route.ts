import { NextResponse } from 'next/server'
import { getSession, logout } from '@/lib/auth'

export async function POST() {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Not logged in' }, { status: 401 })
    }

    await logout(session.id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error logging out' }, { status: 500 })
  }
} 