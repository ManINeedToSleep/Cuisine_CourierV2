export default function BrowseLoading() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="animate-pulse">
        {/* Header Placeholder */}
        <div className="h-32 bg-[var(--wood-dark)]" />
        
        <main className="max-w-7xl mx-auto py-8 px-4">
          {/* Categories Placeholder */}
          <div className="mb-12">
            <div className="h-6 w-48 bg-[var(--wood-medium)]/20 rounded mb-6" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-16 cabin-border opacity-50" />
              ))}
            </div>
          </div>

          {/* Recipes Grid Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="cabin-border overflow-hidden">
                <div className="aspect-video bg-[var(--wood-medium)]/20" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 bg-[var(--wood-medium)]/20 rounded" />
                  <div className="h-3 w-1/2 bg-[var(--wood-medium)]/20 rounded" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
} 