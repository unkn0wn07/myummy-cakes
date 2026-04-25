import { Star } from 'lucide-react';

export function StarRating({ rating, max = 5, size = 'sm' }) {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6';
  
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < Math.floor(rating)
              ? 'text-gold-400 fill-gold-400'
              : i < rating
              ? 'text-gold-400 fill-gold-200'
              : 'text-rose-200 fill-rose-100'
          }`}
        />
      ))}
    </div>
  );
}

export function InteractiveStarRating({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          className="focus:outline-none"
          aria-label={`Rate ${i + 1} stars`}
        >
          <Star
            className={`w-7 h-7 transition-colors ${
              i < value ? 'text-gold-400 fill-gold-400' : 'text-rose-200 hover:text-gold-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
