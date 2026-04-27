import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from 'lucide-react';

const BUSINESS_HOURS = [
  { day: 'Monday — Friday', hours: '9:00 AM — 9:00 PM' },
  { day: 'Saturday',        hours: '8:00 AM — 10:00 PM' },
  { day: 'Sunday',          hours: '10:00 AM — 8:00 PM' },
];

const CONTACT_INFO = [
  {
    icon: <MapPin className="w-5 h-5" />,
    title: 'Visit Us',
    content: [
      'Shop No. 1, Ground Floor, Qamar Castle CSC Ltd,',
      'Plot No. 51/53, Dockyard Road, Mazgaon,',
      'Mumbai, Maharashtra — 400010',
    ],
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: 'Call or WhatsApp',
    content: ['+91 7070 333107'],
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: 'Email Us',
    content: ['hello@myummy.in'],
  },
];

const waUrl =
  'https://wa.me/917070333107?text=' +
  encodeURIComponent("Hi! I'd like to enquire about a cake from MYummy 🎂");

const mailUrl = 'mailto:shaikh.nofil.07@gmail.com?subject=Enquiry%20from%20MYummy%20Website';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export default function ContactPage() {
  return (
    <div className="bg-cream-300 overflow-x-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-cream-300 to-rose-50 py-14 pt-20 md:pt-24">
        <div className="container-custom text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="accent-script text-3xl text-gold-400 mb-2"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl font-bold text-mocha-500 mb-3"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-mocha-400 max-w-lg mx-auto"
          >
            Have a question, a cake idea, or just want to say hi? Reach us directly — we'd love to hear from you!
          </motion.p>
        </div>
      </div>

      <div className="container-custom py-14">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Direct Contact Panel */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* WhatsApp CTA */}
            <div className="bg-white rounded-3xl p-8 shadow-card flex flex-col items-center text-center gap-5">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#25D366' }}>
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-mocha-500 mb-2">Chat on WhatsApp</h2>
                <p className="text-mocha-400 text-sm max-w-xs mx-auto">
                  The fastest way to reach us. Get a reply within minutes during business hours.
                </p>
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-full py-4 text-base font-semibold rounded-2xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                style={{ background: '#25D366', color: '#fff' }}
              >
                <MessageCircle className="w-5 h-5" />
                Message us on WhatsApp
              </a>
            </div>

            {/* Email CTA */}
            <div className="bg-white rounded-3xl p-8 shadow-card flex flex-col items-center text-center gap-5">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-gold-500" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-mocha-500 mb-2">Send us an Email</h2>
                <p className="text-mocha-400 text-sm max-w-xs mx-auto">
                  For orders, inquiries, or feedback. We reply within 24 hours.
                </p>
              </div>
              <a
                href={mailUrl}
                className="btn btn-outline w-full py-4 text-base font-semibold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
              >
                <ExternalLink className="w-4 h-4" />
                Open Email Client
              </a>
              <p className="text-xs text-mocha-300">shaikh.nofil.07@gmail.com</p>
            </div>
          </motion.div>

          {/* Contact Info + Map */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="space-y-6"
          >
            {/* Info Cards */}
            {CONTACT_INFO.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-5 shadow-card flex gap-4">
                <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center text-gold-500 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-mocha-500 mb-1">{item.title}</h3>
                  {item.content.map((line) => (
                    <p key={line} className="text-mocha-400 text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Business Hours */}
            <div className="bg-white rounded-2xl p-5 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-gold-500" />
                <h3 className="font-semibold text-mocha-500">Business Hours</h3>
              </div>
              <div className="space-y-2">
                {BUSINESS_HOURS.map((h) => (
                  <div key={h.day} className="flex justify-between text-sm">
                    <span className="text-mocha-400">{h.day}</span>
                    <span className="font-medium text-mocha-500">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.0!2d72.8427!3d18.9588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce8a2d31c4f5%3A0x6b2c5c7b8e4a3d1f!2sDockyard%20Road%2C%20Mazgaon%2C%20Mumbai%2C%20Maharashtra%20400010!5e0!3m2!1sen!2sin!4v1713400000000"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MYummy Cakes location map — Dockyard Road, Mazgaon, Mumbai"
                aria-label="Google Maps - MYummy Cakes, Dockyard Road, Mazgaon"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
