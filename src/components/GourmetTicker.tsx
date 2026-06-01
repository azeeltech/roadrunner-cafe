/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, ArrowUpRight } from 'lucide-react';

const TICKER_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=500&q=80",
    label: "Artisan Espresso",
    category: "Brewer's Special"
  },
  {
    url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80",
    label: "Gourmet Pastries",
    category: "Freshly Baked"
  },
  {
    url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80",
    label: "Butter Croissant",
    category: "Baked on Campus"
  },
  {
    url: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80",
    label: "Rowdy Beef Burger",
    category: "Hot off flat-top"
  },
  {
    url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=80",
    label: "Avocado Sunny Toast",
    category: "High Protein Breakfast"
  },
  {
    url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80",
    label: "Traditional Fired Pizza",
    category: "Hand-tossed Dough"
  },
  {
    url: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=500&q=80",
    label: "Tex-Mex Chips & Salsa",
    category: "Zesty Campus Favorite"
  },
  {
    url: "https://images.unsplash.com/photo-1519996521430-02b798c1d881?auto=format&fit=crop&w=500&q=80",
    label: "Assorted Garden Fruit",
    category: "Healthy & Cold"
  }
];

export default function GourmetTicker() {
  // To allow seamless endless loop, we duplicate the list
  const doubleList = [...TICKER_IMAGES, ...TICKER_IMAGES];

  return (
    <div className="py-10 bg-stone-900 border-y border-stone-800 overflow-hidden relative">
      {/* Dynamic Glow and text headers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2.5">
          <Sparkles className="w-4.5 h-4.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
          <h3 className="font-display font-black text-sm uppercase tracking-widest text-stone-200">
            Infinite Hot-Plate Appetites
          </h3>
        </div>
        <div className="text-xs font-mono text-stone-400 flex items-center space-x-1.5">
          <span>Looping Live Kitchen Streams</span>
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
        </div>
      </div>

      {/* Endless scroll container */}
      <div className="relative flex items-center w-full select-none overflow-hidden hover:[&>.animate-marquee]:paused hover:[&>.animate-marquee-reverse]:paused">
        <div className="flex space-x-6 shrink-0 animate-marquee">
          {doubleList.map((item, idx) => (
            <div 
              key={`ticker-card-${idx}`} 
              className="w-64 h-72 rounded-3xl overflow-hidden relative border border-stone-800/80 shadow-lg bg-stone-950 shrink-0 group"
            >
              <img 
                src={item.url} 
                alt={item.label}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent flex flex-col justify-end p-5 text-left" />
              
              <div className="absolute bottom-5 left-5 right-5 z-10 text-left">
                <span className="text-[9px] font-mono font-bold text-amber-500 uppercase tracking-widest block mb-1">
                  {item.category}
                </span>
                <span className="font-display font-bold text-base text-white block group-hover:text-amber-400 transition-colors">
                  {item.label}
                </span>
              </div>

              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm p-2 rounded-xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4 text-amber-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ribbon Banner */}
      <div className="mt-8 bg-amber-500 py-3 rotate-1 scale-102 flex overflow-hidden w-full select-none justify-center border-y border-stone-900 shadow-md">
        <div className="flex space-x-12 shrink-0 font-mono font-black text-[11px] text-stone-950 uppercase tracking-widest">
          <span>⚡️ NO MEAL PLAN REQUIRED</span>
          <span>•</span>
          <span>🎓 UTSA DOOR RATES ACCEPTED</span>
          <span>•</span>
          <span>🍔 COOKED ON LAND GRIDS</span>
          <span>•</span>
          <span>☕️ ARABICA LOCAL ESPRESSO COFFEES</span>
          <span>•</span>
          <span>🍕 CLASSIC GOURMET BRUNCH BUFFETS</span>
        </div>
      </div>
    </div>
  );
}
