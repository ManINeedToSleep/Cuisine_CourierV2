import { SignJWT, jwtVerify, JWTPayload } from 'jose'
import bcrypt from 'bcryptjs'
import { db } from './db'
import { cookies } from 'next/headers'

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

export async function comparePasswords(plainPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

interface TokenPayload extends JWTPayload {
  sub: string;
  email: string;
  name?: string;
}

export async function generateToken(payload: TokenPayload) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(secret)
}

export async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  
  if (!token) return null
  
  try {
    const payload = await verifyToken(token)
    if (!payload) return null

    const user = await db.user.findUnique({
      where: { id: payload.sub as string },
      select: {
        id: true,
        email: true,
        name: true,
        image: true
      }
    })

    return user
  } catch {
    return null
  }
}

export async function createSession(userId: string) {
  const session = await db.session.create({
    data: {
      id: crypto.randomUUID(),
      user_id: userId,
      active_expires: BigInt(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      idle_expires: BigInt(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    }
  })
  return session
}

export async function logout(sessionId: string) {
  await db.session.delete({
    where: { id: sessionId }
  })
} 