/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { 
  Phone, 
  Menu as MenuIcon, 
  X, 
  Utensils, 
  Compass, 
  Sparkles, 
  Image as ImageIcon, 
  Star, 
  Clock, 
  MapPin, 
  MessageSquare,
  Flame,
  PhoneCall
} from 'lucide-react';
import { BUSINESS_INFO } from '../data';

// Safe AudioContext manager to generate high-fidelity, premium tactile click sounds without external asset dependencies
let audioCtx: AudioContext | null = null;

const playTactileClick = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    
    // Resume context if suspended (browser security policy)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const now = audioCtx.currentTime;
    
    // Core click component: tight high-frequency sine tick
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.type = 'sine';
    
    // High premium wooden/metallic click frequency contour
    osc.frequency.setValueAtTime(1600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.015);
    
    // Fast, ultra-short envelope decay to keep it extremely crisp
    gainNode.gain.setValueAtTime(0.04, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);
    
    osc.start(now);
    osc.stop(now + 0.02);
  } catch (e) {
    // Graceful fallback for environments blocking audio or inside frames
    console.debug('Tactile audio feedback skipped:', e);
  }
};

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mouse position-based motion values for subtle 3D tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Smooth springs for a tactile, responsive 3D parallax effect
  const rotateXSpring = useSpring(rotateX, { stiffness: 120, damping: 20 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    // Only apply tilt in desktop widescreen (1024px and up)
    if (window.innerWidth < 1024) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates around the center of the navbar container
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    
    // Subtle tilt degree angles (horizontal limits: -5.5deg to +5.5deg, vertical limits: -14deg to +14deg with higher scale offset for narrow bars)
    rotateX.set(-relativeY * 16);
    rotateY.set(relativeX * 750 / (width / 15)); // scale rotation according to aspect ratio
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'photos', label: 'Photos' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'hours', label: 'Hours' },
    { id: 'location', label: 'Location' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  // Animation variants for beautiful staggers
  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.02,
        duration: 0.35,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
        duration: 0.25,
        ease: "easeIn"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -16, scale: 0.97 },
    show: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 350, damping: 26 } },
    exit: { opacity: 0, x: -12, scale: 0.97, transition: { duration: 0.15 } }
  };

  const navVariants = {
    top: {
      y: 0,
      opacity: 1,
      backgroundColor: 'rgba(28, 25, 23, 0)',
      backdropFilter: 'blur(0px)',
      WebkitBackdropFilter: 'blur(0px)',
      paddingTop: '20px',
      paddingBottom: '20px',
      borderBottomColor: 'rgba(120, 113, 108, 0)',
      boxShadow: '0 0px 0px rgba(0, 0, 0, 0)'
    },
    scrolled: {
      y: 0,
      opacity: 1,
      backgroundColor: 'rgba(28, 25, 23, 0.95)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      paddingTop: '12px',
      paddingBottom: '12px',
      borderBottomColor: 'rgba(41, 37, 36, 0.5)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }
  };

  const getLinkIcon = (id: string) => {
    switch (id) {
      case 'hero': return <Compass className="w-4 h-4" />;
      case 'about': return <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400/10" />;
      case 'menu': return <Utensils className="w-4 h-4" />;
      case 'photos': return <ImageIcon className="w-4 h-4" />;
      case 'reviews': return <Star className="w-4 h-4 text-amber-400 fill-amber-400/10" />;
      case 'hours': return <Clock className="w-4 h-4" />;
      case 'location': return <MapPin className="w-4 h-4 text-rose-400" />;
      case 'contact': return <MessageSquare className="w-4 h-4 text-emerald-400" />;
      default: return <Compass className="w-4 h-4" />;
    }
  };

  return (
    <>
      <motion.nav
        id="main-navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={isScrolled ? "scrolled" : "top"}
        whileHover={{ rotateX: 5, rotateY: 5, scale: 1.02 }}
        variants={navVariants}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={playTactileClick}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: 'preserve-3d',
          perspective: 1200,
        }}
        transition={{
          y: {
            type: "spring",
            stiffness: 140,
            damping: 22,
          },
          opacity: {
            duration: 0.6,
            ease: "easeOut"
          },
          backdropFilter: {
            duration: 0.5,
            ease: "easeInOut"
          },
          default: {
            duration: 0.4,
            ease: "easeInOut"
          }
        }}
        className={`fixed top-0 left-0 right-0 z-50 border-b ${
          isScrolled ? 'text-white' : 'text-stone-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.button
              id="navbar-logo-btn"
              onClick={() => handleLinkClick('hero')}
              style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}
              className="flex items-center space-x-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950 shadow-md shadow-amber-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Utensils className="w-5.5 h-5.5 text-stone-950 fill-stone-950/20" />
              </div>
              <div style={{ transform: "translateZ(8px)" }}>
                <span className={`block font-display font-black text-lg leading-tight transition-colors duration-300 ${isScrolled ? 'text-white group-hover:text-amber-400' : 'text-stone-950 group-hover:text-amber-600'}`}>
                  Roadrunner Café
                </span>
                <span className={`block text-[10px] font-mono font-bold tracking-wider uppercase leading-none mt-0.5 transition-colors ${isScrolled ? 'text-stone-400' : 'text-stone-500'}`}>
                  UTSA Dining
                </span>
              </div>
            </motion.button>

            {/* Desktop Navigation Links */}
            <motion.div 
              style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
              className={`hidden lg:flex items-center space-x-1.5 p-1.5 rounded-full border transition-all ${isScrolled ? 'bg-stone-800/60 border-stone-700/50' : 'bg-stone-100/60 border-stone-200/50'}`}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    id={`nav-link-${link.id}`}
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative px-4 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'text-stone-950'
                        : isScrolled
                          ? 'text-stone-300 hover:text-white hover:bg-stone-800/40'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/40'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBackground"
                        className="absolute inset-0 bg-amber-400 rounded-full shadow-md shadow-amber-400/20"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                );
              })}
            </motion.div>

            {/* CTA Option with pulse anchor */}
            <motion.div 
              style={{ transform: "translateZ(30px)" }}
              className="hidden lg:block"
            >
              <a
                id="desktop-call-btn"
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-mono font-black uppercase tracking-wider text-xs px-5 py-3 rounded-full shadow-lg shadow-amber-500/15 hover:scale-103 active:scale-97 transition-all duration-300 group"
              >
                <span className="relative flex h-2 w-2 mr-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stone-950 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-stone-950"></span>
                </span>
                <Phone className="w-3.5 h-3.5 text-stone-950" />
                <span>Call Café</span>
              </a>
            </motion.div>

            {/* Mobile Menu Hamburger */}
            <div className="flex lg:hidden">
              <button
                id="mobile-hamburger-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl bg-amber-100 text-amber-800 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <MenuIcon className="w-5.5 h-5.5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-x-0 top-[68px] z-40 bg-stone-950/98 backdrop-blur-xl border-b border-stone-850 shadow-2xl lg:hidden max-h-[calc(100vh-68px)] overflow-y-auto"
          >
            <div className="px-4.5 pt-5 pb-8 space-y-5 text-left">
              {/* Drawer Identity header */}
              <div className="px-3 py-1 border-b border-stone-850/60 pb-3 flex items-center justify-between">
                <div>
                  <span className="block text-[9px] font-mono font-bold text-amber-500 uppercase tracking-widest leading-none mb-1">Rowdy Dining Hall</span>
                  <span className="block text-xs font-bold text-stone-400">Main Campus, 1 UTSA Circle</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-stone-900 border border-stone-800 px-2 py-0.5 rounded-lg text-[9px] font-mono text-emerald-400">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
                  <span>Serving Hot Items</span>
                </div>
              </div>

              {/* Staggered Navigation Buttons list */}
              <div className="space-y-1.5">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.button
                      id={`mobile-nav-link-${link.id}`}
                      key={link.id}
                      variants={itemVariants}
                      onClick={() => handleLinkClick(link.id)}
                      className={`w-full text-left px-5 py-3 rounded-2xl font-display font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-between ${
                        isActive
                          ? 'bg-amber-400 text-stone-950 shadow-lg shadow-amber-400/10 font-black'
                          : 'text-stone-300 hover:bg-stone-900 hover:text-amber-400'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-stone-950/10 text-stone-950' : 'bg-stone-900 text-stone-400'}`}>
                          {getLinkIcon(link.id)}
                        </div>
                        <span>{link.label}</span>
                      </div>
                      
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-950" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Bottom utilities and Call triggers */}
              <motion.div variants={itemVariants} className="pt-5 border-t border-stone-850 space-y-4 px-2">
                <div className="bg-stone-900/60 rounded-2xl p-4 border border-stone-850 flex items-start space-x-3 text-left">
                  <Flame className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-display font-bold text-stone-200">Door Rates ($10–$20)</h5>
                    <p className="text-[10px] text-stone-500 font-sans leading-relaxed mt-0.5">
                      Open registration welcomes all students, visitor families, &amp; staff without standard dining plans.
                    </p>
                  </div>
                </div>

                <a
                  id="mobile-drawer-call-btn"
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="flex items-center justify-center space-x-2.5 w-full bg-amber-500 hover:bg-amber-600 text-stone-950 py-4.5 rounded-2xl font-mono font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-amber-500/10"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Direct Hotline Dial</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
