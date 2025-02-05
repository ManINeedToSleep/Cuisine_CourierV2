import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  
  if (!session) {
    return new NextResponse(null, { status: 401 })
  }

  return NextResponse.json({ authenticated: true })
} 