# Cuisine Courier

Cuisine Courier is a modern recipe browsing and management application built with Next.js, featuring a cozy cabin kitchen aesthetic. The app allows users to discover recipes, save favorites, create collections, and manage their culinary adventures.

![Cuisine Courier](public/AiCabinKitchen.jpg)

## Features

- **User Authentication**: Secure user registration and login system
- **Recipe Browsing**: Search and browse recipes from TheMealDB API
- **Personalized Dashboard**: User-specific dashboard showing recent activities, favorites, and collections
- **Favorites**: Save and manage favorite recipes
- **Collections**: Create custom collections to organize recipes
- **Responsive Design**: Beautiful UI that works on all devices

## Technology Stack

- **Frontend**: 
  - Next.js 15 (App Router)
  - React 19
  - TypeScript
  - Tailwind CSS for styling

- **Backend**:
  - Next.js API Routes
  - Prisma ORM with PostgreSQL (Neon Database)
  - JWT/Jose for authentication

- **APIs**:
  - Integration with TheMealDB for recipe data

- **Deployment**:
  - Ready for deployment on Vercel

## Project Structure

```
cuisine_courierv2/
├── prisma/                    # Database schema and seed data
│   ├── schema.prisma          # Database models and relationships
│   └── seed.mjs               # Seed script for initial data
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router structure
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── browse/            # Recipe browsing pages
│   │   ├── dashboard/         # User dashboard pages
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable components
│   │   ├── auth/              # Authentication components
│   │   ├── nav/               # Navigation components
│   │   └── ui/                # UI components
│   ├── lib/                   # Core functionality
│   │   ├── auth.ts            # Authentication logic
│   │   ├── db.ts              # Database connection
│   │   ├── mealdb.ts          # TheMealDB API integration
│   │   └── favorites.ts       # Favorites management
│   └── utils/                 # Utility functions
```

## Database Schema

The application uses a PostgreSQL database with the following models:

- **User**: User accounts and profiles
- **Favorite**: User's favorite recipes
- **Collection**: Custom recipe collections
- **CollectionRecipe**: Junction table for recipes in collections
- **Activity**: User activity tracking

## Getting Started

First, set up your environment variables by creating a `.env` file in the root directory:

```
DATABASE_URL=your_neon_database_connection_string
DIRECT_URL=your_direct_neon_connection_string
JWT_SECRET=your_jwt_secret
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Seed Data

To populate the database with initial data:

```bash
npm run seed
```

This creates a test user:
- Email: test@example.com
- Password: password123

## Build and Deployment

To build the application:

```bash
npm run build
```

The project is configured for easy deployment on Vercel with automatic Prisma migrations.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TheMealDB API](https://www.themealdb.com/api.php)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
