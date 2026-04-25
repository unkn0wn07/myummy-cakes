import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import lottie from 'lottie-web';
import whatsappData from '../../assets/animations/whatsapp-animation.json';

export default function WhatsAppFAB() {
  const phoneNumber = '+917070333107';
  const message = encodeURIComponent("Hi! I saw your website and I'd like to enquire about a cake 🎂");
  const url = `https://wa.me/${phoneNumber}?text=${message}`;

  const containerRef = useRef(null);
  const animRef      = useRef(null);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!containerRef.current) return;
    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      animationData: whatsappData,
      renderer: 'svg',
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
      },
      loop: false,
      autoplay: false,
    });
    return () => animRef.current?.destroy();
  }, []);

  const handleEnter = () => {
    if (!prefersReduced) animRef.current?.goToAndPlay(0, true);
  };

  const handleLeave = () => {
    animRef.current?.stop();
  };

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
      style={{ background: '#25D366' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 300 }}
      whileTap={prefersReduced ? {} : { scale: 0.95 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* 28×28 inner container — centered inside the 56×56 button */}
      <div
        ref={containerRef}
        style={{
          width: 28,
          height: 28,
          flexShrink: 0,
          filter: 'brightness(0) invert(1)',
        }}
      />
    </motion.a>
  );
}
