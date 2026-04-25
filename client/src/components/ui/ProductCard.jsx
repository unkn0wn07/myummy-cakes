import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Eye } from 'lucide-react';

export default function ProductCard({ product }) {
  const imgSrc =
    product.images?.[0] ||
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80';

  const imgWebp = imgSrc.startsWith('http') ? `${imgSrc}&fm=webp` : imgSrc;

  return (
    <motion.article
      className="group bg-white rounded-3xl overflow-hidden shadow-card card-hover flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Strict square image — same size on every card */}
      <div className="relative w-full flex-shrink-0" style={{ paddingTop: '100%' }}>
        <div className="absolute inset-0 overflow-hidden">
          <Link
            to={`/products/${product.slug}`}
            aria-label={`View ${product.name}`}
            className="block w-full h-full"
          >
            <picture>
              <source srcSet={imgWebp} type="image/webp" />
              <img
                src={imgSrc}
                alt={`${product.name} — MYummy Cakes Mumbai`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                width="600"
                height="600"
                itemProp="image"
              />
            </picture>
          </Link>

          {/* Badges */}
          {product.badge && (
            <span className="absolute top-3 left-3 badge badge-gold shadow-sm">
              {product.badge}
            </span>
          )}
          {product.eggless && (
            <span className="absolute top-3 right-3 badge badge-green">Eggless</span>
          )}

          {/* Quick-view overlay */}
          <div className="quick-view-overlay" aria-hidden="true">
            <Link
              to={`/products/${product.slug}`}
              className="btn btn-gold text-sm px-4 py-2"
              tabIndex={-1}
            >
              <Eye className="w-4 h-4" />
              View Cake
            </Link>
          </div>
        </div>
      </div>

      {/* Content — grows to fill remaining card height, with vertical breathing room */}
      <div className="px-5 pt-4 pb-5 flex flex-col flex-1 gap-1.5">
        {/* Rating */}
        {product.reviewCount > 0 && (
          <div
            className="flex items-center gap-1"
            itemProp="aggregateRating"
            itemScope
            itemType="https://schema.org/AggregateRating"
          >
            <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" aria-hidden="true" />
            <span className="text-xs font-semibold text-mocha-500" itemProp="ratingValue">
              {product.rating}
            </span>
            <span className="text-xs text-mocha-300">
              (<span itemProp="reviewCount">{product.reviewCount}</span>)
            </span>
          </div>
        )}

        <Link to={`/products/${product.slug}`}>
          <h3
            className="font-display font-bold text-mocha-500 text-base leading-snug hover:text-gold-500 transition-colors line-clamp-2"
            itemProp="name"
          >
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-mocha-300 line-clamp-2 mt-auto leading-relaxed" itemProp="description">
          {product.description}
        </p>
      </div>
    </motion.article>
  );
}
