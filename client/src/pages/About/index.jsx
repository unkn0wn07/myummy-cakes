import { motion } from 'framer-motion';
import { Heart, Award, Users, Leaf } from 'lucide-react';

// ====== ANIMATION VARIANTS ======
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
const cardChild = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const team = [
  {
    name: 'Priya Nair',
    role: 'Founder & Head Baker',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
    bio: 'Trained patissière with 12 years of experience. Passionate about creating edible art.',
  },
  {
    name: 'Rahul Patel',
    role: 'Cake Artist & Designer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    bio: 'Fondant maestro who transforms concepts into breathtaking sugar sculptures.',
  },
  {
    name: 'Meera Joshi',
    role: 'Flavour Specialist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
    bio: 'Food scientist and baker who has crafted over 50 unique flavour combinations.',
  },
];

const values = [
  { icon: <Heart className="w-6 h-6" />, title: 'Made with Love', desc: 'Every cake is handcrafted with genuine care and passion.' },
  { icon: <Leaf className="w-6 h-6" />, title: 'Fresh Ingredients', desc: 'Premium, locally-sourced ingredients. Zero preservatives, always.' },
  { icon: <Award className="w-6 h-6" />, title: 'Quality First', desc: 'FSSAI certified kitchen with the highest hygiene standards.' },
  { icon: <Users className="w-6 h-6" />, title: 'Community Driven', desc: 'Supporting local farmers and artisan suppliers across Maharashtra.' },
];

export default function AboutPage() {
  return (
    <div className="bg-cream-300 overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-20 pt-24 md:pt-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #3B1F14 0%, #5a3020 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-20 w-80 h-80 bg-gold-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-60 h-60 bg-rose-300 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="accent-script text-3xl text-gold-400 mb-3"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold text-cream-300 mb-5"
          >
            About MYummy Cakes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-cream-500 max-w-2xl mx-auto text-lg"
          >
            Born from a love of baking and a dream to make every celebration taste extraordinary.
          </motion.p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image — slides in from left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideLeft}
            >
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-card-hover">
                  <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80"
                    alt="MYummy Cakes bakery kitchen"
                    className="w-full h-96 object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-card-hover">
                  <div className="text-3xl font-display font-bold text-mocha-500">8+</div>
                  <div className="text-sm text-mocha-400">Years of baking</div>
                </div>
              </div>
            </motion.div>

            {/* Text — slides in from right */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideRight}
            >
              <p className="accent-script text-2xl text-gold-400 mb-3">How it started</p>
              <h2 className="font-display text-4xl font-bold text-mocha-500 mb-5">
                From a Small Kitchen to Your Heart
              </h2>
              <div className="space-y-4 text-mocha-400 leading-relaxed">
                <p>
                  MYummy Cakes was born in 2016 from Priya Nair's home kitchen in Bandra, Mumbai.
                  What started as baking for friends and family quickly became a word-of-mouth sensation
                  across the neighbourhood.
                </p>
                <p>
                  Trained at Le Cordon Bleu Paris, Priya brought world-class patisserie techniques
                  to Mumbai's doorsteps — but always with a distinctly Indian warmth and flavour sensibility.
                </p>
                <p>
                  Today, MYummy Cakes has served over 5,000 happy customers with handcrafted cakes
                  that balance stunning visual artistry with flavours that make you close your eyes and smile.
                </p>
              </div>

              {/* Stats — scale pop */}
              <motion.div
                className="grid grid-cols-3 gap-4 mt-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
              >
                {[
                  { value: '5,000+', label: 'Happy Customers' },
                  { value: '250+', label: 'Custom Designs' },
                  { value: '4.9★', label: 'Average Rating' },
                ].map(stat => (
                  <motion.div key={stat.label} variants={scalePop} className="bg-rose-50 rounded-2xl p-4 text-center">
                    <div className="font-display text-2xl font-bold text-gold-500">{stat.value}</div>
                    <div className="text-xs text-mocha-400 mt-0.5">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-mocha-500">
        <div className="container-custom">
          <div className="text-center mb-12 overflow-hidden">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="accent-script text-2xl text-gold-400 mb-2"
            >
              What we stand for
            </motion.p>
            <motion.h2
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="font-display text-4xl font-bold text-cream-300 inline-block"
            >
              Our Values
            </motion.h2>
          </div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={cardChild}
                whileHover={{ y: -6 }}
                className="bg-mocha-400/50 border border-white/10 rounded-3xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-gold-gradient rounded-2xl flex items-center justify-center text-mocha-500 mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-cream-300 mb-2">{v.title}</h3>
                <p className="text-cream-500 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12 overflow-hidden">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="accent-script text-2xl text-gold-400 mb-2"
            >
              The people behind the magic
            </motion.p>
            <motion.h2
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="font-display text-4xl font-bold text-mocha-500 inline-block"
            >
              Meet Our Team
            </motion.h2>
          </div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={cardChild}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(59,31,20,0.15)' }}
                className="bg-white rounded-3xl overflow-hidden shadow-card text-center"
              >
                <div className="h-64 overflow-hidden img-zoom">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-mocha-500">{member.name}</h3>
                  <p className="text-gold-500 text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-mocha-400 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Kitchen photos */}
      <section className="section-padding-sm bg-rose-50">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-bold text-mocha-500 text-center mb-8"
          >
            Inside Our Kitchen 🍳
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
              'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80',
              'https://images.unsplash.com/photo-1611174743420-3d7df880ce32?w=400&q=80',
              'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400&q=80',
            ].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden img-zoom aspect-square"
              >
                <img src={src} alt={`Kitchen ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
