import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto">
        <div className="cabin-border p-8 sm:p-12 text-center sm:text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-6xl font-bold text-[var(--wood-dark)]">
                Welcome to Our
                <span className="block text-[var(--spice-red)]">Cozy Kitchen</span>
              </h1>
              <p className="text-lg sm:text-xl text-[var(--wood-dark)]">
                Where every recipe feels like a warm hug from grandma&apos;s kitchen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/auth" 
                  className="cabin-button text-[var(--wood-light)] inline-flex items-center justify-center"
                >
                  Join Our Kitchen
                </Link>
              </div>
            </div>
            
            {/* Replace placeholder with actual image */}
            <div className="relative h-64 sm:h-96">
              <div className="cabin-border w-full h-full relative overflow-hidden">
                <Image
                  src="/AiCabinKitchen.jpg"
                  alt="Cozy pixel art cabin kitchen with wooden cabinets and sunlight"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Comfort Food', desc: 'Soul-warming dishes for cozy nights' },
            { name: 'Seasonal Recipes', desc: 'Fresh flavors of the season' },
            { name: 'Family Favorites', desc: 'Time-tested recipes with love' }
          ].map((category) => (
            <div key={category.name} className="recipe-card">
              <h3 className="text-xl font-bold text-[var(--spice-red)]">
                {category.name}
              </h3>
              <p className="mt-2 text-[var(--wood-medium)]">
                {category.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-16 cabin-border p-8">
          <h2 className="text-2xl font-bold text-[var(--wood-dark)] mb-6">
            Popular Right Now
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Soups', 'Breads', 'Stews', 'Desserts'].map((item) => (
              <button key={item} className="cabin-button text-[var(--wood-light)]">
                {item}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
