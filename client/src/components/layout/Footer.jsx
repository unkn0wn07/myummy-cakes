import { Link } from 'react-router-dom';
import { Cake, MapPin, Phone, Mail, Heart } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import lottie from 'lottie-web';

import instaData from '../../assets/animations/instagram-animation.json';
import facebookData from '../../assets/animations/facebook-animation.json';
import twitterData from '../../assets/animations/twitter-animation.json';

const footerLinks = {
    shop: [
        { to: '/menu', label: 'All Cakes' },
        { to: '/menu?category=birthday', label: 'Birthday Cakes' },
        { to: '/menu?category=wedding', label: 'Wedding Cakes' },
        { to: '/menu?category=cupcakes', label: 'Cupcakes' },
    ],
    company: [
        { to: '/about', label: 'Our Story' },
        { to: '/contact', label: 'Contact Us' },
        { to: '/about#team', label: 'Our Team' },
    ],
    support: [
        { to: '/contact', label: 'FAQs' },
        { to: '/contact', label: 'Delivery Info' },
        { to: '/contact', label: 'Returns Policy' },
    ],
};

const socialLinks = [
    { label: 'Instagram', href: '#', animationData: instaData },
    { label: 'Facebook', href: '#', animationData: facebookData },
    { label: 'X (Twitter)', href: '#', animationData: twitterData },
];

/** Lottie social icon using lottie-web directly — plays on hover */
function SocialLottieIcon({ label, href, animationData }) {
    const containerRef = useRef(null);
    const animRef = useRef(null);
    const [hovered, setHovered] = useState(false);

    const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        if (!containerRef.current) return;
        animRef.current = lottie.loadAnimation({
            container: containerRef.current,
            animationData,
            renderer: 'svg',
            loop: false,
            autoplay: false,
        });
        return () => animRef.current?.destroy();
    }, [animationData]);

    const handleEnter = () => {
        setHovered(true);
        if (!prefersReduced) {
            animRef.current?.goToAndPlay(0, true);
        }
    };

    const handleLeave = () => {
        setHovered(false);
        animRef.current?.stop();
    };

    return (
        <motion.a
            href={href}
            aria-label={label}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            whileTap={prefersReduced ? {} : { scale: 0.95 }}
            className="footer-social-icon"
        >
            {/* lottie-web renders into this div */}
            <div
                ref={containerRef}
                style={{
                    width: 18,
                    height: 18,
                    // Invert black animation → cream on dark bg; on gold hover → dark
                    filter: hovered
                        ? 'brightness(0)'
                        : 'brightness(0) invert(1)',
                    transition: 'filter 0.2s ease',
                }}
            />
        </motion.a>
    );
}

export default function Footer() {

    return (
        <footer role="contentinfo" className="bg-mocha-500 text-cream-300" style={{ borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem' }}>
            {/* Main Footer Body */}
            <div className="footer-container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                <div className="footer-grid">
                    {/* Brand Column */}
                    <div className="footer-brand-col">
                        <Link to="/" className="footer-logo-link">
                            <Cake className="w-10 h-10 text-gold-400" />
                            <div>
                                <div className="font-display text-3xl font-bold text-cream-300 leading-none">MYummy</div>
                                <div className="text-xs text-gold-400 tracking-widest uppercase mt-0.5">Cakes</div>
                            </div>
                        </Link>

                        <p className="footer-tagline">Baked with love, since 2016</p>

                        <p className="text-cream-500 text-sm leading-relaxed mb-6 max-w-xs">
                            Handcrafted with the finest ingredients and baked with love.
                            Making every celebration sweeter, one cake at a time.
                        </p>

                        {/* Contact info */}
                        <div className="space-y-2.5 text-sm text-cream-500">
                            <div className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                                <span>Shop No. 1, Ground Floor, Qamar Castle CSC Ltd,<br />Plot No. 51/53, Dockyard Road, Mazgaon,<br />Mumbai — 400010</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                                <a href="tel:+917070333107" className="hover:text-gold-400 transition-colors">+91 7070 333107</a>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                                <a href="mailto:hello@myummy.in" className="hover:text-gold-400 transition-colors">hello@myummy.in</a>
                            </div>
                        </div>

                        {/* Lottie Social Icons */}
                        <div className="flex gap-3 mt-6">
                            {socialLinks.map(({ label, href, animationData }) => (
                                <SocialLottieIcon
                                    key={label}
                                    label={label}
                                    href={href}
                                    animationData={animationData}
                                />
                            ))}
                        </div>

                        <p className="footer-fresh-line">Baked fresh daily in Mazgaon, Mumbai 🎂</p>
                    </div>

                    {/* Link Columns */}
                    {[
                        { title: 'Shop', links: footerLinks.shop },
                        { title: 'Company', links: footerLinks.company },
                        { title: 'Support', links: footerLinks.support },
                    ].map(({ title, links }) => (
                        <div key={title}>
                            <h4 className="footer-col-heading">{title}</h4>
                            <nav aria-label={`${title} links`}>
                                <ul className="space-y-3">
                                    {links.map((link) => (
                                        <li key={link.label}>
                                            <Link to={link.to} className="footer-link">{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom-bar">
                <div className="footer-container footer-bottom-inner">
                    <p className="text-cream-600 text-xs">
                        © {new Date().getFullYear()} MYummy Cakes. All rights reserved.
                    </p>
                    <p className="text-cream-600 text-xs flex items-center gap-1">
                        Made with <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> in Mazgaon, Mumbai
                    </p>
                    <div className="flex gap-4 text-xs text-cream-600">
                        <a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gold-400 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
