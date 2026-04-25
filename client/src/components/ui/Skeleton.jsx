// Product grid skeleton
export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-card">
      <div className="skeleton aspect-square" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-4/5" />
        <div className="flex justify-between items-center">
          <div className="skeleton h-6 w-16" />
          <div className="skeleton h-8 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Text block skeleton
export function TextSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-4"
          style={{ width: `${Math.random() * 30 + 60}%` }}
        />
      ))}
    </div>
  );
}

// Banner skeleton
export function BannerSkeleton() {
  return (
    <div className="skeleton w-full h-64 rounded-2xl" />
  );
}
