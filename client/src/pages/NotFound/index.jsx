import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ShoppingBag } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-cream-300 flex items-center justify-center">
      <div className="container-custom py-20 text-center max-w-lg">
        {/* Animated cake */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-8xl mb-8"
        >
          🎂
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <p className="accent-script text-3xl text-gold-400">Oops!</p>
          <h1 className="font-display text-6xl font-bold text-mocha-500">404</h1>
          <h2 className="font-display text-2xl font-bold text-mocha-400">
            This cake got eaten!
          </h2>
          <p className="text-mocha-400 leading-relaxed">
            The page you're looking for seems to have been devoured. 
            Don't worry — there are plenty more delicious cakes where that came from!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link to="/" className="btn btn-primary px-8 py-3">
              <Home className="w-4 h-4" /> Back to Home
            </Link>
            <Link to="/menu" className="btn btn-outline px-8 py-3">
              <ShoppingBag className="w-4 h-4" /> Browse Cakes
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
