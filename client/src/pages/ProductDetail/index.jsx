import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { PRODUCTS, getRelated } from '../../data/products';
import { StarRating } from '../../components/ui/StarRating';
import ProductCard from '../../components/ui/ProductCard';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [activeImage, setActiveImage] = useState(0);

  // Find product from hardcoded catalogue
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const related  = getRelated(slug);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied!');
    }
  };

  return (
    <div className="bg-cream-300 min-h-screen">
      {/* Breadcrumb */}
      <div className="container-custom py-4">
        <nav className="text-sm text-mocha-300" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/menu" className="hover:text-gold-400 transition-colors">Menu</Link>
          <span className="mx-2">/</span>
          <span className="text-mocha-500 font-medium truncate">{product.name}</span>
        </nav>
      </div>

      <div className="container-custom pb-16">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">

          {/* ===== IMAGE GALLERY ===== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Square main image */}
            <div
              className="relative overflow-hidden shadow-card-hover bg-white mb-4"
              style={{
                borderRadius: '1.5rem',
                aspectRatio: '1 / 1',
                width: '100%',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={product.images?.[activeImage] || product.images?.[0]}
                  alt={`${product.name} - view ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                aria-label="Share product"
              >
                <Share2 className="w-4 h-4 text-mocha-500" />
              </button>
            </div>

            {/* Thumbnail slider — always visible when there are multiple images */}
            {product.images?.length > 1 && (
              <div
                role="tablist"
                aria-label="Product image gallery"
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  overflowX: 'auto',
                  paddingBottom: '0.5rem',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'var(--color-rose) transparent',
                }}
              >
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={activeImage === i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      flexShrink: 0,
                      width: '72px',
                      height: '72px',
                      borderRadius: '0.75rem',
                      overflow: 'hidden',
                      border: activeImage === i
                        ? '2.5px solid var(--color-gold)'
                        : '2px solid transparent',
                      boxShadow: activeImage === i
                        ? '0 0 0 1px var(--color-gold), 0 4px 12px rgba(201,168,76,0.25)'
                        : '0 2px 8px rgba(59,31,20,0.08)',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      padding: 0,
                      background: 'none',
                      cursor: 'pointer',
                    }}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* ===== PRODUCT INFO ===== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
          >
            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              {product.badge   && <span className="badge badge-gold">{product.badge}</span>}
              {product.eggless && <span className="badge badge-green">🥚 Eggless</span>}
              <span className="badge badge-rose capitalize">{product.category}</span>
            </div>

            {/* Name */}
            <h1 className="font-display text-4xl font-bold text-mocha-500 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} size="md" />
              <span className="font-bold text-mocha-500">{product.rating}</span>
              <span className="text-mocha-400 text-sm">({product.reviewCount} reviews)</span>
            </div>

            {/* Description */}
            <p className="text-mocha-400 leading-relaxed">{product.longDescription || product.description}</p>

            {/* Available Sizes */}
            {product.weightOptions?.length > 0 && (
              <div>
                <p className="form-label">Available Sizes</p>
                <div className="flex gap-2 flex-wrap">
                  {product.weightOptions.map((w) => (
                    <span
                      key={w.label}
                      className="px-4 py-2 rounded-full border-2 border-rose-200 text-sm font-semibold text-mocha-400"
                    >
                      {w.label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Flavours */}
            {product.flavours?.length > 0 && (
              <div>
                <p className="form-label">Flavours</p>
                <div className="flex gap-2 flex-wrap">
                  {product.flavours.map((f) => (
                    <span key={f} className="px-4 py-2 rounded-full border-2 border-gold-200 text-sm font-semibold text-mocha-400">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick info pills */}
            <div className="flex gap-4 flex-wrap text-sm text-mocha-400">
              {product.servings && (
                <span className="flex items-center gap-1">👥 {product.servings}</span>
              )}
              {product.preparationTime && (
                <span className="flex items-center gap-1">⏱ {product.preparationTime}</span>
              )}
            </div>

            {/* Ingredients + Allergens */}
            {(product.ingredients || product.allergens?.length > 0) && (
              <div className="space-y-2 pt-2 border-t border-rose-100">
                {product.ingredients && (
                  <div>
                    <h4 className="font-semibold text-mocha-500 text-sm mb-1">Ingredients</h4>
                    <p className="text-mocha-400 text-xs leading-relaxed">{product.ingredients}</p>
                  </div>
                )}
                {product.allergens?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-mocha-500 text-sm mb-1">Allergens</h4>
                    <div className="flex gap-2 flex-wrap">
                      {product.allergens.map(a => (
                        <span key={a} className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
                          ⚠️ {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Order via Zomato / Swiggy CTA */}
            <div className="pt-2">
              <p className="text-sm text-mocha-400 mb-3">Order via your preferred platform:</p>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="https://www.zomato.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Order on Zomato
                </a>
                <a
                  href="https://www.swiggy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Order on Swiggy
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-rose-200" />
              <h2 className="font-display text-2xl font-bold text-mocha-500 text-center whitespace-nowrap">
                You May Also Love
              </h2>
              <div className="flex-1 h-px bg-rose-200" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {related.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
