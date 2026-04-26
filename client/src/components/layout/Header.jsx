import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { Menu, X, Cake } from 'lucide-react';

const navLinks = [
  { to: '/menu', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const prefersReduced = useReducedMotion();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80);
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <motion.header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          background: scrolled ? 'rgba(253,246,238,0.97)' : 'rgba(253,246,238,0.97)', // ← Always show background
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          boxShadow: scrolled ? '0 2px 24px rgba(59,31,20,0.09)' : 'none',
          transition: 'background 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease',
          borderBottomLeftRadius: '1.5rem',
          borderBottomRightRadius: '1.5rem',
        }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Cake className="w-7 h-7 text-gold-400" />
              </motion.div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl font-bold text-mocha-500">
                  MYummy
                </span>
                <span className="text-xs text-gold-400 tracking-widest uppercase font-semibold -mt-0.5">
                  Cakes
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-link-enhanced text-sm font-semibold ${isActive ? 'nav-link-active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-rose-100 transition-colors"
                aria-label="Search"
                style={{ color: 'var(--color-mocha)' }}
              >
                {/* Themed search icon — animates on toggle */}
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                  className="w-5 h-5"
                  animate={prefersReduced ? {} : {
                    rotate: searchOpen ? 90 : 0,
                    scale: searchOpen ? 1.15 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                >
                  <motion.circle
                    cx="11" cy="11" r="7"
                    stroke="var(--color-mocha)" strokeWidth="2"
                    animate={prefersReduced ? {} : { scale: searchOpen ? 1.08 : 1, opacity: searchOpen ? 1 : 0.85 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{ originX: '11px', originY: '11px' }}
                  />
                  <motion.circle
                    cx="11" cy="11" r="4.5"
                    stroke="var(--color-gold)" strokeWidth="0.8"
                    animate={prefersReduced ? {} : { opacity: searchOpen ? 1 : 0.7, scale: searchOpen ? 1.15 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{ originX: '11px', originY: '11px' }}
                  />
                  <line x1="16.5" y1="16.5" x2="22" y2="22" stroke="var(--color-mocha)" strokeWidth="2.2" />
                </motion.svg>
              </motion.button>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 rounded-full hover:bg-rose-100 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <X className="w-5 h-5 text-mocha-500" />
                ) : (
                  <Menu className="w-5 h-5 text-mocha-500" />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="overflow-hidden pb-3"
              >
                <form onSubmit={handleSearch} className="relative" role="search">
                  <label htmlFor="header-search" className="sr-only">Search cakes and flavours</label>
                  <input
                    id="header-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search cakes, flavours..."
                    autoFocus
                    className="form-input pr-4"
                    aria-label="Search cakes and flavours"
                  />
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="md:hidden fixed inset-0 z-50 bg-cream-300"
            >
              <div className="flex items-center justify-between p-4 border-b border-rose-200">
                <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                  <Cake className="w-6 h-6 text-gold-400" />
                  <span className="font-display text-xl font-bold text-mocha-500">MYummy Cakes</span>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-2" aria-label="Close menu">
                  <X className="w-6 h-6 text-mocha-500" />
                </button>
              </div>
              <nav className="p-6 space-y-6" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block text-2xl font-display font-semibold transition-colors ${isActive ? 'text-gold-400' : 'text-mocha-500 hover:text-gold-400'}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to push content below fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
}