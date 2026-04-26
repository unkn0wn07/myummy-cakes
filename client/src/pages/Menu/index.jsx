import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import ProductCard from '../../components/ui/ProductCard';

const CATEGORIES = [
  { value: 'all', label: '✨ All' },
  { value: 'birthday', label: '🎂 Birthday' },
  { value: 'wedding', label: '💍 Wedding' },
  { value: 'cupcakes', label: '🧁 Cupcakes' },
  { value: 'seasonal', label: '🌸 Seasonal' },
  { value: 'anniversary', label: '💕 Anniversary' },
  { value: 'other', label: '🍰 Other' },
];

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');

  // Filter directly from hardcoded data — instant, no loading state needed
  const products = useMemo(() => {
    let filtered = PRODUCTS;
    if (category !== 'all') filtered = filtered.filter(p => p.category === category);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [category, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    const params = {};
    if (searchInput) params.search = searchInput;
    if (category !== 'all') params.category = category;
    setSearchParams(params);
  };

  const handleCategory = (cat) => {
    setCategory(cat);
    const params = {};
    if (search) params.search = search;
    if (cat !== 'all') params.category = cat;
    setSearchParams(params);
  };

  const clearAll = () => {
    setCategory('all');
    setSearch('');
    setSearchInput('');
    setSearchParams({});
  };

  return (
    <div className="bg-cream-300 min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-cream-300 to-rose-100 py-14">
        <div className="container-custom text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="accent-script text-3xl text-gold-400 mb-2"
          >
            Our Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl font-bold text-mocha-500 mb-4"
          >
            Cake Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-mocha-400 max-w-lg mx-auto"
          >
            Every cake is lovingly handcrafted. Browse by occasion or search for your favourite flavour.
          </motion.p>
        </div>
      </div>

      <div className="container-custom py-10">
        {/* Search bar */}
        <div className="mb-8 mt-8">
          <form onSubmit={handleSearch} className="relative w-full mx-auto">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search cakes, flavours..."
              className="form-input pl-4 pr-12"
              aria-label="Search cakes"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {searchInput && (
                <button
                  type="button"
                  onClick={() => { setSearchInput(''); setSearch(''); }}
                  className="text-mocha-300 hover:text-mocha-500 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="text-mocha-400 hover:text-mocha-500 transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.value}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCategory(cat.value)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${category === cat.value
                  ? 'bg-mocha-500 text-cream-300 shadow-lg'
                  : 'bg-white text-mocha-400 hover:bg-rose-100 shadow-sm'
                }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-mocha-400 text-sm mb-6">
          {products.length} cake{products.length !== 1 ? 's' : ''} found
          {search && ` for "${search}"`}
          {category !== 'all' && ` in ${CATEGORIES.find(c => c.value === category)?.label}`}
        </p>

        {/* Product Grid */}
        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🎂</div>
            <h3 className="font-display text-2xl text-mocha-500 mb-2">No cakes found</h3>
            <p className="text-mocha-400 mb-6">Try a different search or category</p>
            <button onClick={clearAll} className="btn btn-primary">Show All Cakes</button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${category}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
