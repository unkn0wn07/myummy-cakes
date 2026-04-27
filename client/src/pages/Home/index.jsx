import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Sparkles, Clock, Truck, ArrowRight, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { PRODUCTS } from '../../data/products';
import ProductCard from '../../components/ui/ProductCard';

// ====== MOBILE DETECTION ======
const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

// ====== ANIMATION VARIANTS ======
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.1 },
  }),
};

const fadeUpMobile = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.08 },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardChild = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const scalePop = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: 'spring', stiffness: 120 } },
};

// ====== TESTIMONIALS DATA ======
const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
    text: 'Ordered a custom cake for my daughter\'s first birthday — it was absolutely breathtaking AND delicious! The team went above and beyond.',
    cake: 'Custom Princess Tier',
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
    text: 'The Biscoff Lotus Crunch is hands down the best cake I\'ve ever tasted. Delivered on time, beautifully packaged. Will definitely order again!',
    cake: 'Biscoff Lotus Crunch',
  },
  {
    id: 3,
    name: 'Ananya Krishnan',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
    text: 'Got the Royal Wedding Tier for our anniversary — it was a showstopper! Guests couldn\'t stop complimenting it. Thank you MYummy!',
    cake: 'Royal Wedding Tier',
  },
  {
    id: 4,
    name: 'Kartik Joshi',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    rating: 5,
    text: 'Best Red Velvet this side of Mumbai! Moist, perfect cream cheese ratio. The piñata cake was a massive party hit!',
    cake: 'Piñata Party Cake',
  },
];

// ====== INSTA GRID IMAGES ======
const instaImages = [
  'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=400&q=80',
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
  'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&q=80',
  'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&q=80',
  'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&q=80',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80',
];

// ====== WHY MYUMMY DATA ======
const features = [
  {
    icon: <Sparkles className="w-7 h-7" />,
    title: 'Fresh Daily',
    description: 'Every cake is baked fresh to order using premium, locally-sourced ingredients. No preservatives, ever.',
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: 'Custom Orders',
    description: 'From flavours to fondant art — your cake, your vision. Our artisans bring your dream cake to life.',
  },
  {
    icon: <Truck className="w-7 h-7" />,
    title: 'Free Delivery ₹999+',
    description: 'Order above ₹999 and we deliver free to your doorstep. Careful packaging ensures perfect presentation.',
  },
];

// ====== WAVE DIVIDER ======
function WaveDivider({ fill = '#FDF6EE', flip = false }) {
  return (
    <div className="wave-divider" style={flip ? { transform: 'rotate(180deg)' } : {}}>
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill={fill} />
      </svg>
    </div>
  );
}

// Featured products — first 6 from the hardcoded catalogue
const FALLBACK_FEATURED = PRODUCTS.slice(0, 6);

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();

  const heroRef = useRef(null);
  const { scrollY } = useScroll();

  const heroImgY = useTransform(scrollY, [0, 500], [0, isMobile() ? 0 : 120]);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroTextY = useTransform(heroProgress, [0, 1], ['0%', prefersReducedMotion || isMobile() ? '0%' : '30%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  // Featured = first 6 products from hardcoded catalogue
  const products = FALLBACK_FEATURED;

  return (
    <div className="overflow-x-hidden">
      {/* ============ HERO SECTION ============ */}
      <section
        ref={heroRef}
        aria-label="Hero — Artisan Cakes by MYummy"
        className="relative min-h-[90vh] flex items-center overflow-hidden grain-overlay pt-16 md:pt-20"
        style={{ background: 'linear-gradient(135deg, #FDF6EE 0%, #f7e8d8 40%, #f0d9c0 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-gold-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Text Block */}
            <motion.div
              style={{ y: heroTextY, opacity: heroOpacity }}
              className="py-16 lg:py-0"
            >
              <motion.div initial="hidden" animate="visible" variants={stagger}>
                <motion.p variants={fadeUp} className="accent-script text-3xl mb-3 block">
                  Made with love
                </motion.p>

                {/* Clip-path reveal on headline */}
                <motion.h1
                  variants={fadeUp}
                  className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-mocha-500 leading-tight mb-6"
                >
                  Baked to
                  <motion.span
                    className="block text-transparent bg-clip-text"
                    style={{ backgroundImage: 'linear-gradient(135deg, #C9A84C, #e8c56a)' }}
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    animate={{ clipPath: 'inset(0 0% 0 0)' }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 }}
                  >
                    Perfection
                  </motion.span>
                </motion.h1>

                <motion.p variants={fadeUp} className="text-mocha-400 text-lg leading-relaxed mb-8 max-w-lg">
                  Artisan cakes crafted with premium ingredients, designed to make your
                  every celebration unforgettable. From classic birthday tiers to dreamy
                  wedding masterpieces.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Link to="/menu" className="btn btn-primary text-base px-8 py-4">
                      Order Now <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Link to="/custom" className="btn btn-outline text-base px-8 py-4">
                      Custom Cake
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Stats — scale pop */}
                <motion.div variants={stagger} className="flex gap-8 mt-10">
                  {[
                    { value: '5000+', label: 'Happy Customers' },
                    { value: '4.9★', label: 'Average Rating' },
                    { value: '100%', label: 'Fresh Baked' },
                  ].map((stat) => (
                    <motion.div key={stat.label} variants={scalePop}>
                      <div className="font-display text-2xl font-bold text-gold-500">{stat.value}</div>
                      <div className="text-xs text-mocha-400 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Hero Image — with parallax on desktop only */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              className="relative hidden lg:flex justify-center items-center"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <motion.div
                  style={{ y: heroImgY }}
                  className="w-[420px] h-[420px] rounded-full overflow-hidden border-4 border-white/50 shadow-2xl"
                >
                  <picture>
                    <source
                      srcSet="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=85&fm=webp"
                      type="image/webp"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=85"
                      alt="Artisan layered birthday cake by MYummy Cakes Mumbai"
                      className="w-full h-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                      width="800"
                      height="800"
                    />
                  </picture>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
                  transition={{ delay: 1, duration: 0.5, rotate: { duration: 3, repeat: Infinity } }}
                  className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-card-hover px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gold-gradient rounded-xl flex items-center justify-center text-lg">🎂</div>
                    <div>
                      <div className="font-semibold text-mocha-500 text-sm">Custom Cake</div>
                      <div className="text-xs text-mocha-300">Your dream, our craft</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating review badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.3 }}
                  className="absolute -top-4 -right-4 bg-mocha-500 text-cream-300 rounded-2xl px-4 py-2 shadow-lg"
                >
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                    <span className="font-bold">4.9</span>
                    <span className="text-cream-500 text-xs ml-1">5000+ reviews</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Wave divider at bottom */}
        <div className="absolute bottom-0 left-0 w-full wave-divider">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FDF6EE" />
          </svg>
        </div>
      </section>

      {/* ============ WHY MYUMMY ============ */}
      <section className="section-padding section-alt-1" aria-labelledby="why-heading">
        <div className="container-custom">
          {/* Heading slides in from left */}
          <div className="text-center mb-14 overflow-hidden">
            <motion.p
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="accent-script text-2xl text-gold-400 mb-2"
            >
              Why choose us?
            </motion.p>
            <motion.h2
              id="why-heading"
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="font-display text-4xl md:text-5xl font-bold text-mocha-500 inline-block"
            >
              The MYummy Difference
            </motion.h2>
          </div>

          {/* Staggered feature cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={cardChild}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(59,31,20,0.15)' }}
                className="bg-white rounded-3xl p-8 text-center shadow-card group cursor-default"
              >
                <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-gold-400 mx-auto mb-5 group-hover:bg-gold-gradient group-hover:text-mocha-500 transition-all duration-300">
                  {f.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-mocha-500 mb-3">{f.title}</h3>
                <p className="text-mocha-400 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Wave between sections */}
      <WaveDivider fill="#f9f2e8" />

      {/* ============ FEATURED CAKES ============ */}
      <section className="section-padding section-alt-2" aria-labelledby="featured-heading">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <motion.p
                variants={slideLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="accent-script text-2xl text-gold-400 mb-1"
              >
                Our Bestsellers
              </motion.p>
              <motion.h2
                id="featured-heading"
                initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                className="font-display text-4xl font-bold text-mocha-500 inline-block"
              >
                Featured Cakes
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/menu" className="btn btn-outline text-sm px-6 py-2.5 gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

            <motion.ul
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0 items-stretch"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={stagger}
            >
              {products.map((product) => (
                <motion.li key={product._id} variants={cardChild} className="h-full">
                  <ProductCard product={product} />
                </motion.li>
              ))}
            </motion.ul>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section-padding bg-mocha-500 relative overflow-hidden" aria-label="Customer reviews">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-80 h-80 bg-gold-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-300 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="accent-script text-3xl text-gold-400 mb-2"
            >
              What our customers say
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl font-bold text-cream-300"
            >
              Sweet Reviews 🎂
            </motion.h2>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="pb-12"
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={t.id}>
                <motion.div
                  initial={{ opacity: 0, x: 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-mocha-400/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 h-full"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                    ))}
                  </div>
                  <p className="text-cream-400 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <picture>
                      <source
                        srcSet={`${t.avatar}&fm=webp`}
                        type="image/webp"
                      />
                      <img
                        src={t.avatar}
                        alt={`${t.name} — MYummy Cakes customer`}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gold-400"
                        loading="lazy"
                        width="40"
                        height="40"
                      />
                    </picture>
                    <div>
                      <div className="text-cream-300 font-semibold text-sm">{t.name}</div>
                      <div className="text-cream-600 text-xs">{t.cake}</div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Wave before Instagram */}
      <WaveDivider fill="#FDF6EE" flip />

      {/* ============ INSTAGRAM GRID ============ */}
      <section className="section-padding-sm section-alt-1" aria-label="Instagram gallery">
        <div className="container-custom">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex items-center justify-center gap-2 mb-2"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold-400 fill-current">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="accent-script text-2xl text-gold-400">@myummy.cakes</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl font-bold text-mocha-500"
            >
              Follow Our Sweet Journey
            </motion.h2>
          </div>

          <div className="insta-grid">
            {instaImages.map((src, i) => (
              <motion.a
                key={i}
                href="https://www.instagram.com/myummycakes"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="group relative aspect-square overflow-hidden rounded-2xl"
                aria-label={[
                  'Floral tiered cake by MYummy Cakes Mumbai',
                  'Layered chocolate ganache cake — MYummy Cakes',
                  'Strawberry fresh cream birthday cake Mumbai',
                  'Red velvet cupcake box Mumbai — MYummy Cakes',
                  'Fondant sculpted detail cake Mazgaon Mumbai',
                  'Macaron tower celebration cake — MYummy Cakes',
                ][i] || `MYummy Cakes Instagram post ${i + 1}`}
              >
                <picture>
                  <source
                    srcSet={`${src}&fm=webp`}
                    type="image/webp"
                  />
                  <img
                    src={src}
                    alt={[
                      'Floral tiered cake by MYummy Cakes Mumbai',
                      'Layered chocolate ganache cake — MYummy Cakes',
                      'Strawberry fresh cream birthday cake Mumbai',
                      'Red velvet cupcake box Mumbai — MYummy Cakes',
                      'Fondant sculpted detail cake Mazgaon Mumbai',
                      'Macaron tower celebration cake — MYummy Cakes',
                    ][i] || `MYummy Cakes Instagram`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    width="400"
                    height="400"
                  />
                </picture>
                <div className="absolute inset-0 bg-mocha-500/0 group-hover:bg-mocha-500/30 transition-all duration-300 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ORDER ONLINE — Zomato & Swiggy ============ */}
      <section
        className="section-padding relative overflow-hidden"
        aria-label="Order online via Zomato and Swiggy"
        style={{ background: 'linear-gradient(135deg, #3B1F14 0%, #5a3020 60%, #7a4030 100%)' }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gold-300 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-rose-300 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="accent-script text-3xl text-gold-400 mb-3"
            >
              Craving something sweet?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold text-cream-300 mb-4"
            >
              Order Online Now
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-cream-500 mb-10"
            >
              Get our freshly baked cakes delivered right to your door — from Mazgaon, Mumbai with love.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="https://www.zomato.com/mumbai/myumy-the-cake-artist-mazgaon"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-3 px-10 py-4 rounded-full font-bold text-base"
                style={{ background: '#E23744', color: '#fff', boxShadow: '0 8px 30px rgba(226,55,68,0.4)' }}
                aria-label="Order on Zomato"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 16.5h-11l7.5-9H6.5V6h11L10 15h7.5v1.5z"/>
                </svg>
                Order on Zomato
              </motion.a>
              <motion.a
                href="https://www.swiggy.com/search?query=myumy+cake+artist+mazgaon+mumbai"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-3 px-10 py-4 rounded-full font-bold text-base"
                style={{ background: '#FC8019', color: '#fff', boxShadow: '0 8px 30px rgba(252,128,25,0.4)' }}
                aria-label="Order on Swiggy"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M12 2C8.5 2 6 5 6 8c0 2.5 1.5 4.5 3 6 .5.5 1 1.2 1 2 0 .6-.4 1-1 1s-1-.5-1-1H6c0 1.7 1.3 3 3 3s3-1.3 3-3c0-1.2-.7-2.2-1.4-3C9.2 11.5 8 10 8 8c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2-1.2 3.5-2.6 4.9-.7.8-1.4 1.8-1.4 3.1 0 1.7 1.3 3 3 3s3-1.3 3-3h-2c0 .6-.4 1-1 1s-1-.4-1-1c0-.8.5-1.5 1-2 1.5-1.5 3-3.5 3-6 0-3-2.5-6-6-6z"/>
                </svg>
                Order on Swiggy
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
}
