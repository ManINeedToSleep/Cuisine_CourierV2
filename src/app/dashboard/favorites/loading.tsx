export default function FavoritesLoading() {
  return (
    <div className="min-h-screen bg-[var(--background)] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-[var(--wood-medium)]/20 rounded mb-8" />
          <div className="cabin-border p-12">
            <div className="h-6 w-64 bg-[var(--wood-medium)]/20 rounded mx-auto mb-4" />
            <div className="h-4 w-96 bg-[var(--wood-medium)]/20 rounded mx-auto" />
          </div>
        </div>
      </div>
    </div>
  )
} 