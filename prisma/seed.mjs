import { PrismaClient } from '@prisma/client'
import { randomBytes, createHash } from 'crypto'

const prisma = new PrismaClient()

// Helper function to hash password (similar to what Lucia would do)
function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex')
}

async function main() {
  // Clean up existing data
  await prisma.key.deleteMany()
  await prisma.session.deleteMany()
  await prisma.collectionRecipe.deleteMany()
  await prisma.collection.deleteMany()
  await prisma.favorite.deleteMany()
  await prisma.user.deleteMany()

  // Create test user
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
      auth_key: {
        create: {
          id: `email:test@example.com`,
          hashed_password: hashPassword('password123')
        }
      },
      // Create a sample collection
      collections: {
        create: {
          name: 'My Favorite Dishes',
          description: 'A collection of my most loved recipes',
          isPublic: true
        }
      }
    }
  })

  console.log('Created test user:', {
    id: testUser.id,
    email: testUser.email,
    name: testUser.name
  })

  console.log('\nTest credentials:')
  console.log('Email: test@example.com')
  console.log('Password: password123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 