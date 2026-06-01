/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  Star,
  Sparkles,
  CheckCircle2,
  Copy,
  Compass,
  Calendar,
  Layers,
  HeartHandshake,
  Send,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Map,
  UtensilsCrossed,
  ShieldAlert
} from 'lucide-react';

// Import local components and static structures
import Navbar from './components/Navbar';
import MenuSection from './components/MenuSection';
import GourmetTicker from './components/GourmetTicker';
import GallerySection from './components/GallerySection';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import { BUSINESS_INFO, OPERATING_HOURS, POPULAR_TIMES } from './data';

export default function App() {
  // Navigation scrolling state
  const [activeSection, setActiveSection] = useState<string>('hero');
  
  // Hero Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);
  
  // Busy times indicator state
  const [hoveredTimeIdx, setHoveredTimeIdx] = useState<number | null>(null);

  // Copy success feedback state
  const [addressCopied, setAddressCopied] = useState(false);

  // Contact Form States
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Status computation (computed dynamically based on 2026 calendar settings)
  const [cafeStatus, setCafeStatus] = useState({ isOpen: true, message: 'Open • Closes 10:00 PM' });

  const carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1000&q=80',
      title: 'Our Signature Breakfast Stations',
      tagline: 'Fresh Belgian Waffles Baked Daily'
    },
    {
      url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=80',
      title: 'Flame-Grilled Burgers & Fries',
      tagline: 'Hot, fresh, satisfying university standard'
    },
    {
      url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
      title: 'Fresh Hot Stone Pepperoni Pizza',
      tagline: 'Delicious cheesy slices with UTSA green jalapeños'
    },
    {
      url: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1000&q=80',
      title: 'Tex-Mex Soft Taco Buffets',
      tagline: 'Fresh ground beef and spicy buffalo tacos'
    }
  ];

  // Auto carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Compute live open status based on current UTSA Main campus timezone (Central Standard Time)
  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      // UTSA main campus in San Antonio operates in US Central Time (UTC-5 or UTC-6)
      // Let's approximate the local UTSA hour
      // Standard local hour tracking:
      const currentHour = now.getUTCHours() - 5; // Central timezone rough calculation
      const normalizedHour = currentHour < 0 ? currentHour + 24 : currentHour;
      
      const dayOfWeek = now.getUTCDay(); // 0: Sunday, 6: Saturday
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      const openHour = isWeekend ? 10 : 7;
      const closeHour = 22; // 10 PM
      
      if (normalizedHour >= openHour && normalizedHour < closeHour) {
        setCafeStatus({
          isOpen: true,
          message: `Open Now • Closes at 10:00 PM`
        });
      } else {
        setCafeStatus({
          isOpen: false,
          message: `Closed Now • Opens at ${openHour}:00 AM`
        });
      }
    };

    updateStatus();
    const statusInterval = setInterval(updateStatus, 60000); // refresh every minute
    return () => clearInterval(statusInterval);
  }, []);

  // Scrollspy logic to automatically highlight navbar corresponding to scroll depth
  useEffect(() => {
    const sections = ['hero', 'about', 'menu', 'photos', 'reviews', 'hours', 'location', 'contact'];
    
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 120;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Soft/Smooth navigate dispatcher
  const handleScrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 85,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Address copy trigger
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(BUSINESS_INFO.address);
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 3000);
  };

  // Form submission handler
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="font-sans min-h-screen relative bg-stone-50 overflow-x-hidden selection:bg-amber-500 selection:text-stone-950">
      
      {/* Dynamic Header Navbar */}
      <Navbar activeSection={activeSection} onNavigate={handleScrollToSection} />

      {/* Hero Section */}
      <section
        id="hero"
        className="pt-28 pb-20 sm:pb-24 lg:pt-36 lg:pb-32 bg-gradient-to-br from-stone-50 via-amber-50/15 to-stone-100/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-stone-550/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column (Sizing: 7 cols) */}
            <div className="lg:col-span-7 space-y-7 text-left">
              
              {/* Trust Badge Chips */}
              <div className="flex flex-wrap gap-2.5 items-center">
                <span className="inline-flex items-center space-x-1.5 bg-amber-50 border border-amber-100 text-amber-805 px-3 py-1 rounded-full text-xs font-mono font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{BUSINESS_INFO.rating} Rating</span>
                  <span className="text-amber-300">|</span>
                  <span>{BUSINESS_INFO.reviewCount} Reviews</span>
                </span>
                
                <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                  cafeStatus.isOpen 
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                    : 'bg-rose-50 border-rose-100 text-rose-600'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${cafeStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                  <span>{cafeStatus.message}</span>
                </span>

                <span className="inline-flex items-center space-x-1.5 bg-stone-100 border border-stone-200 text-stone-600 px-3 py-1 rounded-full text-xs font-mono font-bold">
                  <span>💲 {BUSINESS_INFO.priceRange}</span>
                </span>
              </div>

              {/* Majestic Headline - High-contrast display typography */}
              <div className="space-y-4">
                <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-tight">
                  Fuel Up at <span className="text-amber-500 underline decoration-amber-500/30 decoration-4">Roadrunner Café</span>
                </h1>
                <h2 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl text-stone-800 leading-snug">
                  Quick Meals. Big Value. Right on Campus.
                </h2>
                <p className="text-stone-600 font-sans text-base sm:text-lg leading-relaxed max-w-2xl">
                  UTSA’s campus hub for all-day convenience. Enjoy hot Belgian waffles, juicy burgers, crispy chicken wings, fresh-fired jalapeño pizza, and specialty coffee drinks perfectly tailored for student life.
                </p>
              </div>

              {/* Action Buttons Hub */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                <button
                  id="hero-view-menu-btn"
                  onClick={() => handleScrollToSection('menu')}
                  className="inline-flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black px-7 py-4 rounded-2xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 hover:-translate-y-0.5 transition-all duration-300 text-sm cursor-pointer"
                >
                  <span>View Today's Menu</span>
                  <ArrowRight className="w-4 h-4 ml-1 text-stone-950" />
                </button>
                
                <a
                  id="hero-directions-lnk"
                  href="https://maps.google.com/?q=1+UTSA+Circle,+San+Antonio,+TX+78249"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-bold px-7 py-4 rounded-2xl shadow-sm hover:shadow transition-colors text-sm"
                >
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>Get Directions</span>
                </a>

                <a
                  id="hero-call-lnk"
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="inline-flex items-center justify-center space-x-2 bg-stone-900/5 hover:bg-stone-900/10 text-stone-700 font-bold px-5 py-4 rounded-2xl text-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-stone-500" />
                  <span>Call: (210) 458-7683</span>
                </a>
              </div>

              {/* Micro trust verification */}
              <div className="flex items-center space-x-2 text-xs font-sans text-slate-500 pt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Open to all UTSA students, visitors, staff, and cash door-rate guests.</span>
              </div>

            </div>

            {/* Right Interactive Carousel Column (Sizing: 5 cols) */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              
              {/* Backing decorative frame to denote craft */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-amber-300 rounded-[36px] rotate-3 scale-102 opacity-15 blur-sm" />
              
              <div className="relative overflow-hidden bg-white rounded-[32px] shadow-2xl shadow-stone-900/10 border border-stone-200/45 aspect-4/3 sm:aspect-video lg:aspect-square flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={carouselIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={carouselImages[carouselIndex].url}
                      alt={carouselImages[carouselIndex].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none"
                    />
                    
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
                    
                    {/* Card overlay labels */}
                    <div className="absolute bottom-6 left-6 right-6 text-left">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-amber-400 uppercase block mb-1">
                        {carouselImages[carouselIndex].tagline}
                      </span>
                      <h3 className="font-display font-black text-lg sm:text-xl text-white">
                        {carouselImages[carouselIndex].title}
                      </h3>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Left/Right manual click triggers */}
                <div className="absolute bottom-6 right-6 flex space-x-1.5 z-20">
                  {carouselImages.map((_, idx) => (
                    <button
                      id={`hero-carousel-indicator-${idx}`}
                      key={idx}
                      onClick={() => setCarouselIndex(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        carouselIndex === idx ? 'w-6 bg-amber-500' : 'w-2.5 bg-white/40 hover:bg-white'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Little Floating Organic HUD element */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-3.5 shadow-xl border border-stone-100 flex items-center space-x-2.5 rotate-3 hover:rotate-0 transition-transform hidden sm:flex">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-750 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4 fill-amber-300 text-amber-650" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] font-mono font-bold text-stone-400 tracking-wider leading-none uppercase">Door Rate Deals</span>
                  <span className="block text-xs font-bold text-stone-900">$10–$20 Meals</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Quick Actions Strip Just Below Hero */}
      <section className="bg-white border-y border-stone-200 py-6 relative z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
            
            <button
              id="instant-hours-btn"
              onClick={() => handleScrollToSection('hours')}
              className="flex items-center space-x-3.5 p-3.5 rounded-2xl hover:bg-stone-50 border border-transparent hover:border-stone-100 transition-all text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5 text-amber-700" />
              </div>
              <div className="overflow-hidden">
                <span className="block text-xs font-mono font-bold text-stone-400 uppercase tracking-wide leading-none mb-1 text-left">Today's Hours</span>
                <span className="block text-xs sm:text-sm font-bold text-stone-900 truncate">7:00 AM – 10:00 PM</span>
              </div>
            </button>

            <a
              id="instant-call-link"
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center space-x-3.5 p-3.5 rounded-2xl hover:bg-stone-50 border border-transparent hover:border-stone-100 transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-105/70 text-blue-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5 text-blue-700" />
              </div>
              <div className="overflow-hidden">
                <span className="block text-xs font-mono font-bold text-stone-400 uppercase tracking-wide leading-none mb-1 text-left">Quick Contact</span>
                <span className="block text-xs sm:text-sm font-bold text-stone-900 truncate">{BUSINESS_INFO.phone}</span>
              </div>
            </a>

            <a
              id="instant-directions-link"
              href="https://maps.google.com/?q=1+UTSA+Circle,+San+Antonio,+TX+78249"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3.5 p-3.5 rounded-2xl hover:bg-stone-50 border border-transparent hover:border-stone-100 transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-105 border border-amber-200/50 text-amber-755 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5 text-amber-600" />
              </div>
              <div className="overflow-hidden">
                <span className="block text-xs font-mono font-bold text-stone-400 uppercase tracking-wide leading-none mb-1 text-left">Our Location</span>
                <span className="block text-xs sm:text-sm font-bold text-stone-900 truncate">1 UTSA Circle, SA</span>
              </div>
            </a>

            <button
              id="instant-menu-btn"
              onClick={() => handleScrollToSection('menu')}
              className="flex items-center space-x-3.5 p-3.5 rounded-2xl hover:bg-stone-50 border border-transparent hover:border-stone-100 transition-all text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className="block text-xs font-mono font-bold text-stone-400 uppercase tracking-wide leading-none mb-1 text-left">Browse Specialties</span>
                <span className="block text-xs sm:text-sm font-bold text-stone-950 truncate">Popular Waffles &amp; Pizza</span>
              </div>
            </button>

          </div>
        </div>
      </section>

      {/* About Section - What to Expect Bento Grid */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-black text-amber-600 uppercase tracking-widest block mb-3">
              WHAT TO EXPECT
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight leading-none mb-4">
              Convenient Eating, Crafted for Students
            </h2>
            <p className="text-base sm:text-lg text-stone-600 font-sans max-w-2xl mx-auto leading-relaxed">
              We skip the complicated dining rules to offer UTSA a reliable, welcoming environment to grab quick energy and study food.
            </p>
          </div>

          {/* Bento Grid Styling */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Box 1 (Span 4) - Value Focus */}
            <div className="md:col-span-4 bg-stone-50 border border-stone-200/60 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-705 flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-stone-950 mb-3 block">
                  Affordable Walk-In Rates
                </h3>
                <p className="text-stone-620 text-sm sm:text-base leading-relaxed font-sans">
                  No pre-purchased UTSA meal plan? No worries! Our flexible door rates average only $10–$20, so you can eat to your heart's content.
                </p>
              </div>
              <button
                id="about-learn-menu-1"
                onClick={() => handleScrollToSection('menu')}
                className="inline-flex items-center text-xs font-mono font-bold text-amber-550 hover:text-amber-700 transition-colors uppercase tracking-wider mt-8 group cursor-pointer text-left font-semibold"
              >
                <span>Examine Menu Prices</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Box 2 (Span 8) - Huge Campus Hub Banner */}
            <div className="md:col-span-8 bg-gradient-to-r from-stone-900 to-stone-950 text-white rounded-3xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden text-left">
              <div className="absolute right-0 bottom-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="max-w-md">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block mb-4">UTSA CAMPUS CIRCLE</span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-4 leading-snug">
                  Your Home Away from Home Inside UTSA
                </h3>
                <p className="text-stone-300 text-sm sm:text-base font-sans leading-relaxed">
                  Located directly within Main Campus coordinates at 1 UTSA Circle. Our spacious high tables are equipped with charging outlets, cozy dynamic dining booths, and fast campus Wi-Fi.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 items-center justify-start mt-8">
                <span className="flex items-center text-xs font-mono font-medium text-stone-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mr-2" />
                  Fast Walk-in Speed
                </span>
                <span className="flex items-center text-xs font-mono font-medium text-stone-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mr-2" />
                  Study Lounge Friendly
                </span>
                <span className="flex items-center text-xs font-mono font-medium text-stone-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mr-2" />
                  Rowdy Atmosphere
                </span>
              </div>
            </div>

            {/* Box 3 (Span 8) - Interactive Food Consistency */}
            <div className="md:col-span-8 bg-amber-50/40 border border-amber-200/50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-widest block mb-4">TRANSPARENT IMPROVEMENTS</span>
                <h3 className="font-display font-extrabold text-2xl text-stone-900 mb-3 leading-tight">
                  Our Commitment to Safe, Delicious Food Standards
                </h3>
                <p className="text-stone-700 text-sm sm:text-base font-sans leading-relaxed">
                  We hear student feedback and continuously upgrade. We strictly audit our kitchens for safety, focus on fresh morning waffle mixes, and maintain high standards of hospitality.
                </p>
              </div>
              <div className="flex items-center space-x-6 mt-8">
                <div className="flex -space-x-2">
                  <div className="w-8.5 h-8.5 rounded-full bg-stone-200 border-2 border-amber-50 text-[10px] font-bold flex items-center justify-center font-mono">UT</div>
                  <div className="w-8.5 h-8.5 rounded-full bg-amber-500 border-2 border-amber-50 text-[10px] font-black flex items-center justify-center text-stone-950 font-mono">RC</div>
                </div>
                <p className="text-xs text-amber-805 font-sans font-bold leading-none">
                  Approved UTSA Dining standards.
                </p>
              </div>
            </div>

            {/* Box 4 (Span 4) - Coffee Counter Highlight */}
            <div className="md:col-span-4 bg-stone-50 border border-stone-200/65 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-stone-950 mb-3 block">
                  Local Organic Espresso
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
                  Sip on hand-prepared double espressos and sweet caramel macchiatos made to order. Perfect companion for late-night exams.
                </p>
              </div>
              <button
                id="about-learn-menu-2"
                onClick={() => handleScrollToSection('menu')}
                className="inline-flex items-center text-xs font-mono font-semibold text-amber-550 hover:text-amber-700 transition-colors uppercase tracking-wider mt-8 group cursor-pointer text-left"
              >
                <span>Read Beverage Selections</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Infinite Looping Gourmet Food Loop */}
      <GourmetTicker />

      {/* Interactive Menu Section */}
      <MenuSection />

      {/* Photo Gallery Section */}
      <GallerySection />

      {/* Reviews & Social Feedbacks Section */}
      <ReviewsSection />

      {/* Hours Section - Includes Popular Times Seating Anxiety charts */}
      <section id="hours" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Box (Sizing: 5 cols) - Tabular Hours */}
            <div className="lg:col-span-5 space-y-7">
              <div>
                <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block mb-3">
                  STREAKING CALENDAR
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-stone-900 tracking-tight leading-none">
                  Operating Hours &amp; Times
                </h2>
                <p className="text-stone-500 font-sans text-sm sm:text-base leading-relaxed mt-4">
                  Planning your schedule? Check our hours, designed to support you from early breakfasts to late-night snacking sessions.
                </p>
              </div>

              {/* Hour Grid List */}
              <div className="bg-stone-50 border border-stone-200/60 rounded-3xl p-6 space-y-3.5 shadow-sm text-left">
                {OPERATING_HOURS.map((oh) => (
                  <div key={oh.day} className="flex justify-between items-center text-sm">
                    <span className="font-display font-bold text-stone-800">{oh.day}</span>
                    <span className="font-mono text-stone-600 font-medium bg-white px-3 py-1 rounded-lg border border-stone-200/40">{oh.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Box (Sizing: 7 cols) - Interactive Best Times To Visit Charts */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-stone-200/80 shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-100 pb-5 mb-6 gap-3">
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-stone-950">
                    Alleviate Seating Anxiety
                  </h3>
                  <p className="text-xs text-stone-500 font-sans mt-1">
                    Check visitor volume thresholds and plan your ideal dining hours.
                  </p>
                </div>
                <div className="inline-flex items-center space-x-1.5 bg-amber-50 border border-amber-100 text-amber-805 px-3 py-1 rounded-full text-xs font-mono font-bold">
                  <Clock className="w-3 h-3 text-amber-550" />
                  <span>Avg visit: {BUSINESS_INFO.timeSpentRange}</span>
                </div>
              </div>

              {/* Bar interactive visualization */}
              <div className="space-y-6">
                <div className="flex items-end justify-between h-48 pt-6 px-2 sm:px-4">
                  {POPULAR_TIMES.map((time, index) => {
                    const isHovered = hoveredTimeIdx === index;
                    return (
                      <div
                        id={`popular-bar-container-${index}`}
                        key={time.label}
                        className="flex flex-col items-center flex-1 group cursor-pointer"
                        onMouseEnter={() => setHoveredTimeIdx(index)}
                        onMouseLeave={() => setHoveredTimeIdx(null)}
                      >
                        {/* Interactive tooltip hovering */}
                        <div className="relative w-full flex justify-center mb-2">
                          <AnimatePresence>
                            {isHovered && (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                className="absolute bottom-0 bg-slate-950 text-white text-[10px] font-sans px-2 py-1 rounded-md shadow-lg text-center z-10 w-24 mb-1 pointer-events-none"
                              >
                                <span className="block font-bold">{time.desc}</span>
                                <span className="block text-[8px] font-mono text-slate-400">{time.value}% capacity</span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Bar graphics depth wrapper */}
                        <div className="w-8.5 sm:w-11 bg-stone-100 hover:bg-stone-200 rounded-lg h-32 flex items-end overflow-hidden relative">
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${time.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className={`w-full rounded-t-sm ${
                              time.value > 80 
                                ? 'bg-amber-500' 
                                : time.value > 50 
                                ? 'bg-amber-400/80' 
                                : 'bg-amber-300/45'
                            } transition-colors group-hover:bg-amber-500`}
                          />
                        </div>

                        {/* Label name */}
                        <span className="text-[10px] font-mono font-bold text-slate-600 mt-2.5">
                          {time.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-stone-100 flex flex-wrap gap-4 items-center justify-between text-xs font-mono font-medium text-stone-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center"><span className="w-3 h-3 bg-amber-500 rounded mr-1.5" /> Peak Rush</span>
                    <span className="flex items-center"><span className="w-3 h-3 bg-amber-300/45 rounded mr-1.5" /> Optimal Dining</span>
                  </div>
                  <p className="italic">
                    *Tip: Mid-afternoons (2 PM - 4 PM) are ideal for quiet studying.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Location (Map + Directions) Section */}
      <section id="location" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Sizing: 5 - Location Info Card */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
              <div className="space-y-6 text-left">
                <div>
                  <span className="text-xs font-mono font-black text-amber-600 uppercase tracking-widest block mb-3">
                    CAMPUS GEOGRAPHY
                  </span>
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-stone-900 tracking-tight leading-none">
                    Where to Find Us
                  </h2>
                  <p className="text-stone-500 font-sans text-sm sm:text-base leading-relaxed mt-4">
                    Located on UTSA's Main campus. Follow major campus pathways near residential parking for hassle-free entry.
                  </p>
                </div>

                {/* Copiable Address Indicator block */}
                <div
                  id="copy-address-card"
                  onClick={handleCopyAddress}
                  className="bg-white hover:bg-stone-50 border border-stone-200 rounded-3xl p-6.5 shadow-sm hover:shadow transition-all duration-300 cursor-pointer group relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className="block text-[10px] font-mono font-bold text-stone-400 tracking-wider">OFFICIAL ADDR</span>
                      <strong className="block text-stone-900 font-display text-base leading-tight font-black">
                        {BUSINESS_INFO.address}
                      </strong>
                    </div>
                    
                    <div className="p-3 bg-amber-50 rounded-xl text-amber-600 group-hover:bg-amber-550 group-hover:text-stone-950 transition-colors duration-300">
                      <Copy className="w-4 h-4" />
                    </div>
                  </div>

                  <AnimatePresence>
                    {addressCopied ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-3 left-6 right-6 flex items-center space-x-1.5 text-xs text-amber-600 font-mono font-black"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Address copied to clipboard!</span>
                      </motion.div>
                    ) : (
                      <span className="block text-[10px] font-mono text-stone-400 mt-4 italic group-hover:text-amber-600 transition-colors">
                        *Click card above to copy UTSA address instantly
                      </span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Action Coordinates */}
              <div className="space-y-4 pt-4 border-t border-stone-200 text-left">
                <div className="text-sm font-sans text-stone-605">
                  <strong>Parking guidance:</strong> Free 15-minute passenger pick-up spots are adjacent to the cafeteria, with UTSA standard guest garage options nearby.
                </div>
                
                <div className="flex gap-3">
                  <a
                    id="location-gmaps-link"
                    href="https://maps.google.com/?q=1+UTSA+Circle,+San+Antonio,+TX+78249"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center space-x-2 bg-stone-900 hover:bg-amber-500 hover:text-stone-950 font-black py-4 rounded-xl shadow-lg transition-colors text-sm"
                  >
                    <Map className="w-4 h-4 text-amber-500 group-hover:text-stone-950" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Sizing: 7 - Map Frame */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-4.5 border border-slate-200/80 shadow-md h-[350px] sm:h-[450px]">
              <div className="w-full h-full rounded-2xl overflow-hidden relative border border-slate-100 bg-slate-50">
                <iframe
                  id="utsa-map-frame"
                  title="Roadrunner Café Map coordinate"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3467.6258448834643!2d-98.61864!3d29.584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c5e0da0000001%3A0x6e9f000000000000!2s1%20UTSA%20Circle%2C%20San%20Antonio%2C%20TX%2078249!5e0!3m2!1sen!2sus!4v1716912000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Contact & Feedback section */}
      <section id="contact" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Column (5 Cols) - Large CTA and copy details */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-10 text-left">
              <div>
                <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block mb-3">
                  STAY CONNECTED
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-stone-900 tracking-tight leading-none mb-4">
                  We Love Hearing From Rowdy Patrons
                </h2>
                <p className="text-stone-500 font-sans text-sm sm:text-base leading-relaxed">
                  Have ideas to make roadrunner taste even better? Send our culinary coordinators private comments, dietary requests, or custom group catering orders.
                </p>
              </div>

              {/* Call Center Box */}
              <div className="bg-amber-50/40 border border-amber-200/50 rounded-3xl p-6 flex items-start space-x-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-750 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-stone-900 leading-none mb-2">UTSA Dining Hotline</h4>
                  <p className="text-stone-600 text-xs sm:text-sm font-sans mb-3.5 leading-relaxed">
                    Direct phone operator at Roadrunner Café main building. Call directly for immediate door-rate reservations.
                  </p>
                  <a
                    id="contact-call-now-lnk"
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="inline-flex items-center space-x-1.5 font-mono text-xs font-bold text-amber-600 hover:text-amber-700 underline"
                  >
                    <span>Dial {BUSINESS_INFO.phone}</span>
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column (7 Cols) - Clean Contact Form */}
            <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-8 border border-slate-200/60 shadow-sm relative">
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest block mb-6">
                SUBMIT DIRECT SECURE MESSAGE
              </span>

              {/* Success Notification overlay inside card */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-4 rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl p-6 flex flex-col justify-center items-center text-center z-10"
                  >
                    <div className="w-16 h-16 bg-emerald-150 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8.5 h-8.5" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-stone-900 mb-1">Message Sent Successfully!</h4>
                    <p className="text-stone-500 text-xs sm:text-sm font-sans max-w-sm">
                      Thank you for your valuable response. Our UTSA catering coordinators will review and reply within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-6 text-xs font-mono font-bold text-amber-600 hover:text-amber-700 underline cursor-pointer"
                    >
                      Write another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main HTML form */}
              <form id="contact-feedback-form" onSubmit={handleFormSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-name" className="block text-xs font-mono font-bold text-stone-600 uppercase mb-2">First &amp; Last Name</label>
                    <input
                      id="form-name"
                      type="text"
                      placeholder="e.g. Sam Rowdy"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white text-stone-900 border border-stone-200 rounded-xl focus:border-amber-550 focus:ring-4 focus:ring-amber-500/10 transition-all font-sans text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="form-email" className="block text-xs font-mono font-bold text-stone-600 uppercase mb-2">Email Address</label>
                    <input
                      id="form-email"
                      type="email"
                      placeholder="e.g. sam@utsa.edu"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white text-stone-900 border border-stone-200 rounded-xl focus:border-amber-550 focus:ring-4 focus:ring-amber-500/10 transition-all font-sans text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="form-message" className="block text-xs font-mono font-bold text-stone-600 uppercase mb-2">Your Feedback / Dietary Message</label>
                  <textarea
                    id="form-message"
                    rows={4}
                    placeholder="Tell us what you liked, or suggest food options you would love to see featured on campus..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white text-stone-900 border border-stone-200 rounded-xl focus:border-amber-550 focus:ring-4 focus:ring-amber-500/10 transition-all font-sans text-sm focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    id="form-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center space-x-2 bg-stone-900 hover:bg-amber-500 hover:text-stone-950 font-black px-6 py-3.5 rounded-xl shadow-lg hover:shadow transition-all w-full cursor-pointer disabled:bg-stone-300"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        <span>Sending secure transmission...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Secure Message</span>
                        <Send className="w-4 h-4 text-amber-400 group-hover:text-stone-950" />
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>

          </div>

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <FAQSection />

      {/* Global Clean Footer */}
      <Footer onNavigate={handleScrollToSection} />

      {/* --- MOBILE BOTOM STICKY ACTION TRAY (ESSENTIAL CONVERSIONS) --- */}
      <div
        id="mobile-sticky-dock"
        className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-amber-200/50 shadow-[0_-8px_30px_rgb(0,0,0,0.08)] py-3 sm:py-3.5 px-4 flex lg:hidden items-center justify-between animate-fade-in-up"
      >
        <div className="grid grid-cols-3 gap-2.5 w-full">
          
          <a
            id="mobile-dock-call"
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="flex flex-col items-center justify-center text-stone-600 hover:text-amber-600 active:scale-95 transition-all py-1"
          >
            <Phone className="w-5 h-5 text-amber-500 mb-1" />
            <span className="text-[10px] font-mono font-black uppercase tracking-wider leading-none">Call Café</span>
          </a>

          <a
            id="mobile-dock-directions"
            href="https://maps.google.com/?q=1+UTSA+Circle,+San+Antonio,+TX+78249"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center text-stone-600 hover:text-amber-600 active:scale-95 transition-all py-1 border-l border-r border-stone-100"
          >
            <Map className="w-5 h-5 text-amber-500 mb-1" />
            <span className="text-[10px] font-mono font-black uppercase tracking-wider leading-none">Directions</span>
          </a>

          <button
            id="mobile-dock-menu"
            onClick={() => handleScrollToSection('menu')}
            className="flex flex-col items-center justify-center text-stone-600 hover:text-amber-600 active:scale-95 transition-all py-1 cursor-pointer"
          >
            <UtensilsCrossed className="w-5 h-5 text-amber-500 mb-1" />
            <span className="text-[10px] font-mono font-black uppercase tracking-wider leading-none">Menu</span>
          </button>

        </div>
      </div>

    </div>
  );
}
