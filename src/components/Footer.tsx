/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Utensils, MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO, OPERATING_HOURS } from '../data';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-stone-950 text-stone-400 border-t border-stone-850 pt-20 pb-28 md:pb-16 relative overflow-hidden text-left">
      
      {/* Decorative Blur and Mascot Cue */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info (Span 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2.5 mb-5 cursor-pointer" onClick={() => onNavigate('hero')}>
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-amber-500/25">
                  <Utensils className="w-5.5 h-5.5" />
                </div>
                <div>
                  <span className="block font-display font-black text-lg text-white tracking-tight leading-none">
                    Roadrunner Café
                  </span>
                  <span className="block text-[10px] font-mono font-bold tracking-widest text-amber-500 uppercase leading-none mt-1">
                    UTSA Dining Hall
                  </span>
                </div>
              </div>
              <p className="text-sm font-sans leading-relaxed text-stone-400 mb-6 pr-4">
                Grab hot Belgian waffles, burgers, custom build tacos, and organic gourmet coffee on the go. Fuel your collegiate study streak.
              </p>
            </div>

            <p className="text-xs font-mono text-stone-500 hidden lg:block">
              © {currentYear} Roadrunner Café. Approved UTSA dining partner.
            </p>
          </div>

          {/* Quick Links (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-sm text-stone-200 tracking-wider uppercase mb-5">
              Explore
            </h4>
            <ul className="space-y-3 font-sans text-sm text-stone-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors duration-200 text-left cursor-pointer">
                  About Roadrunner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:text-amber-400 transition-colors duration-200 text-left cursor-pointer">
                  Interactive Menu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('photos')} className="hover:text-amber-400 transition-colors duration-200 text-left cursor-pointer">
                  Cafeteria Photos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-amber-400 transition-colors duration-200 text-left cursor-pointer">
                  Rowdy Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contacts Info (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-sm text-stone-200 tracking-wider uppercase mb-5">
              Info & Utilities
            </h4>
            <ul className="space-y-4 font-sans text-sm text-stone-400">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-amber-500 mr-3 mt-0.5 shrink-0" />
                <span>
                  1 UTSA Circle,<br />San Antonio, TX 78249
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 text-amber-500 mr-3 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-white underline decoration-amber-500 decoration-2 transition-colors">
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Clock className="w-4 h-4 text-amber-500 mr-3 shrink-0" />
                <button onClick={() => onNavigate('hours')} className="hover:text-amber-400 transition-colors duration-200 text-left">
                  Mon-Sun: 7 AM – 10 PM
                </button>
              </li>
            </ul>
          </div>

          {/* UTSA Official partner links (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-sm text-stone-200 tracking-wider uppercase mb-5">
              Official Hub
            </h4>
            <p className="text-xs text-stone-450 mb-4">
              Looking for meal plan signups, dining funds, or group reservations? Consult UTSA's designated catering service.
            </p>
            <a
              href={BUSINESS_INFO.officialInfoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-stone-900 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-850 text-white text-xs font-semibold px-4.5 py-3 rounded-xl transition-all w-full md:w-auto"
            >
              <span>Visit mydininghub.com</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-500" />
            </a>
          </div>

        </div>

        {/* Divider & Mobile copyright block */}
        <div className="pt-8 border-t border-stone-900 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-stone-500 gap-4">
          <p className="lg:hidden">
            © {currentYear} Roadrunner Café. Approved UTSA dining partner.
          </p>
          <div className="flex items-center space-x-5">
            <a href="#menu" className="hover:text-amber-400 transition-colors">Door Rates ($10-20)</a>
            <span>•</span>
            <a href="#about" className="hover:text-amber-400 transition-colors">Open to Everyone</a>
            <span>•</span>
            <a href="https://mydininghub.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Rowdy Campus</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
