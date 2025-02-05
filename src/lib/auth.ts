import { SignJWT, jwtVerify, JWTPayload } from 'jose'
import bcrypt from 'bcryptjs'
import { prisma } from './db'

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

export async function getSession(token: string | null) {
  if (!token) return null
  
  try {
    const payload = await verifyToken(token)
    if (!payload) return null

    const user = await prisma.user.findUnique({
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