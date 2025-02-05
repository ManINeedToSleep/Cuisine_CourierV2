export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[var(--background)] relative">
      <div className="animate-pulse">
        {/* Similar layout to dashboard but with loading placeholders */}
        <div className="h-24 bg-[var(--wood-dark)]" />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
            <aside className="space-y-6">
              <div className="cabin-border p-6">
                <div className="h-6 w-32 bg-[var(--wood-medium)]/20 rounded mb-4" />
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="h-4 w-24 bg-[var(--wood-medium)]/20 rounded" />
                      <div className="h-4 w-8 bg-[var(--wood-medium)]/20 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
} 