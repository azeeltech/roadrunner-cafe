/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Flame, 
  Coffee, 
  Sparkles, 
  Check, 
  RefreshCw, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Trash2, 
  PhoneCall, 
  Info, 
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';
import { MENU_ITEMS, MenuItem, BUSINESS_INFO } from '../data';

interface TrayItem {
  item: MenuItem;
  quantity: number;
}

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showOnlyPopular, setShowOnlyPopular] = useState<boolean>(false);
  
  // Tray State
  const [tray, setTray] = useState<TrayItem[]>([]);
  const [isTrayDrawerOpen, setIsTrayDrawerOpen] = useState<boolean>(false);

  const categories = [
    'All',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Grill',
    'Pizza',
    'Tacos & Wings',
    'Salads',
    'Desserts',
    'Coffee Drinks',
    'Sides & Fruits'
  ];

  // Filter logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      const matchesPopular = !showOnlyPopular || item.isPopular;

      return matchesCategory && matchesSearch && matchesPopular;
    });
  }, [selectedCategory, searchQuery, showOnlyPopular]);

  // Highlights / Signatures to showcase
  const popularHighlightItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => item.isPopular).slice(0, 4);
  }, []);

  // Tray helper functions
  const handleAddToTray = (item: MenuItem) => {
    setTray(prevTray => {
      const existing = prevTray.find(i => i.item.id === item.id);
      if (existing) {
        return prevTray.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prevTray, { item, quantity: 1 }];
    });
  };

  const handleRemoveFromTray = (itemId: string) => {
    setTray(prevTray => {
      const existing = prevTray.find(i => i.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prevTray.map(i => i.item.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prevTray.filter(i => i.item.id !== itemId);
    });
  };

  const handleClearTray = () => {
    setTray([]);
  };

  const getItemQuantityInTray = (itemId: string) => {
    const found = tray.find(i => i.item.id === itemId);
    return found ? found.quantity : 0;
  };

  // Calculations
  const trayStats = useMemo(() => {
    let totalPrice = 0;
    let totalCalories = 0;
    let totalCount = 0;

    tray.forEach(i => {
      totalPrice += i.item.price * i.quantity;
      totalCount += i.quantity;
      
      const calMatch = i.item.calories ? parseInt(i.item.calories.replace(/[^0-9]/g, '')) : 0;
      totalCalories += calMatch * i.quantity;
    });

    return {
      totalPrice: Number(totalPrice.toFixed(2)),
      totalCalories,
      totalCount
    };
  }, [tray]);

  return (
    <section id="menu" className="py-24 bg-gradient-to-b from-stone-50 via-amber-50/20 to-white relative overflow-hidden">
      {/* Dynamic Ambient Café Ornaments */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-amber-200/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-10 top-1/2 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Gourmet Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-amber-100/65 border border-amber-200/60 text-amber-800 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4 animate-pulse">
            <Flame className="w-3.5 h-3.5 fill-amber-700/20 text-amber-700" />
            <span>EXECUTIVE GOURMET COFFEE &amp; FOODS ON UTSA CAMPUS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            Curated Culinary Hotspots
          </h2>
          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Freshly prepared daily with hand-picked premium items. Mix and match your favorites, customize your calorie budgets, and calculate your cost instantly.
          </p>
        </div>

        {/* --- DYNAMIC HIGHLIGHT CARDS (POPULAR TODAY) --- */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-200/60">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-5.5 h-5.5 text-amber-500" />
              <h3 className="font-display font-bold text-xl sm:text-2xl text-stone-900">
                Signature Student Favorites
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full">
              Highly Rated On Campus
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularHighlightItems.map((item) => {
              const count = getItemQuantityInTray(item.id);
              return (
                <motion.div
                  id={`highlight-card-${item.id}`}
                  key={`highlight-${item.id}`}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-150 hover:border-amber-500/40 hover:shadow-xl hover:shadow-stone-200/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative h-44 overflow-hidden bg-stone-100">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm shadow text-[10px] font-mono font-black text-amber-700 uppercase tracking-wider px-3 py-1 rounded-lg">
                      {item.category}
                    </div>

                    <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg flex items-center space-x-1 shadow-md">
                      <Sparkles className="w-3 h-3 fill-white" />
                      <span>Signature</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <span className="text-xs font-mono font-bold bg-black/45 backdrop-blur-sm px-2 py-0.5 rounded-md">
                        {item.calories}
                      </span>
                      <span className="font-display font-black text-base drop-shadow-md">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-bold text-base text-stone-900 group-hover:text-amber-600 transition-colors mb-1.5 leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-stone-50 flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1">
                        {item.tags?.slice(0, 1).map((t) => (
                          <span key={t} className="bg-stone-50 text-[9px] font-mono text-stone-500 px-2 py-0.5 rounded border border-stone-100">
                            {t}
                          </span>
                        ))}
                      </div>

                      {count > 0 ? (
                        <div className="flex items-center space-x-2 bg-amber-500 text-white rounded-xl px-2.5 py-1.5 shadow-sm">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleRemoveFromTray(item.id); }}
                            className="p-0.5 hover:bg-amber-605 rounded cursor-pointer"
                          >
                            <Minus className="w-3 h-3 text-white" />
                          </button>
                          <span className="text-xs font-mono font-bold">{count}</span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleAddToTray(item); }}
                            className="p-0.5 hover:bg-amber-605 rounded cursor-pointer"
                          >
                            <Plus className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToTray(item)}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-stone-900 hover:bg-amber-600 text-white font-mono font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer hover:shadow"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* --- INTERACTIVE MENU EXPLORER CONTROLS --- */}
        <div id="menu-explorer" className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 mb-12">
          
          {/* Search, filters & direct clear option */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400" />
              <input
                id="menu-search-input"
                type="text"
                placeholder="Search premium coffee, dinners, breakfasts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-5 py-3.5 bg-stone-50 hover:bg-stone-100/50 focus:bg-white text-stone-900 placeholder:text-stone-400 border border-stone-200/80 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 rounded-2xl transition-all font-sans text-sm outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-stone-400 hover:text-stone-700 underline"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
              <button
                id="menu-popular-filter-btn"
                onClick={() => setShowOnlyPopular(!showOnlyPopular)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-2xl border transition-all text-sm font-medium cursor-pointer ${
                  showOnlyPopular
                    ? 'bg-amber-600 border-amber-600 text-white shadow-md shadow-amber-600/10'
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Flame className={`w-4 h-4 ${showOnlyPopular ? 'fill-white' : 'text-amber-500'}`} />
                <span>Popular Only</span>
              </button>

              {(searchQuery || selectedCategory !== 'All' || showOnlyPopular) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setShowOnlyPopular(false);
                  }}
                  className="p-3 text-stone-500 hover:text-amber-600 bg-stone-100 hover:bg-amber-50 rounded-2xl border border-stone-200/50 transition-colors"
                  title="Reset filters"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Horizontal scrollable category ribbon */}
          <div className="relative">
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none lg:hidden" />
            <div className="flex items-center space-x-2 overflow-x-auto pb-3 scrollbar-none scroll-smooth">
              {categories.map((cat) => {
                const isCatSelected = selectedCategory === cat;
                return (
                  <button
                    id={`menu-category-btn-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-4.5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isCatSelected
                        ? 'bg-stone-900 text-white font-medium shadow-md shadow-stone-950/20'
                        : 'bg-stone-100 hover:bg-stone-200/60 text-stone-600 border border-transparent hover:border-slate-300/30'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* --- DYNAMIC MENU GRID --- */}
        <div className="relative min-h-[350px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredItems.map((item) => {
                  const count = getItemQuantityInTray(item.id);
                  return (
                    <motion.div
                      id={`menu-item-card-${item.id}`}
                      key={item.id}
                      layoutId={`menu-card-${item.id}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white rounded-3xl overflow-hidden border border-stone-150 hover:border-amber-500/35 hover:shadow-xl hover:shadow-stone-200/30 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="relative h-48 bg-stone-100 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent" />
                        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[9px] font-mono font-black text-stone-700 px-2.5 py-1 rounded-lg shadow-sm">
                          {item.category}
                        </span>
                        
                        {item.isPopular && (
                          <span className="absolute top-3 right-3 bg-amber-500 text-white text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg shadow-sm">
                            POPULAR
                          </span>
                        )}

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                          <span className="text-xs font-mono font-medium bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
                            {item.calories || "Est. 350 kcal"}
                          </span>
                          <span className="font-display font-black text-base block">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="font-display font-bold text-base sm:text-lg text-stone-900 group-hover:text-amber-600 transition-colors duration-300 leading-snug mb-1">
                            {item.name}
                          </h4>
                          <p className="text-xs text-stone-500 font-sans leading-relaxed mb-4 line-clamp-3">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-stone-50 flex items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-1">
                            {item.tags?.map((tag) => (
                              <span
                                key={tag}
                                className="bg-stone-50 border border-stone-100 text-[9px] font-mono text-stone-500 px-2 py-0.5 rounded-md"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {count > 0 ? (
                            <div className="flex items-center space-x-2 bg-amber-500 text-white rounded-xl px-2.5 py-1.5 shadow-sm shrink-0">
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleRemoveFromTray(item.id); }}
                                className="p-0.5 hover:bg-amber-605 rounded cursor-pointer"
                              >
                                <Minus className="w-3 h-3 text-white" />
                              </button>
                              <span className="text-xs font-mono font-bold">{count}</span>
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleAddToTray(item); }}
                                className="p-0.5 hover:bg-amber-605 rounded cursor-pointer"
                              >
                                <Plus className="w-3 h-3 text-white" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleAddToTray(item)}
                              className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-900 hover:bg-amber-605 text-white font-mono font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 px-4 bg-white/50 backdrop-blur-sm rounded-3xl border border-stone-200"
              >
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mx-auto mb-4 border border-amber-100/60">
                  <Coffee className="w-7 h-7" />
                </div>
                <h3 className="font-display font-semibold text-lg text-stone-900 mb-1">No items match your search</h3>
                <p className="text-sm text-stone-500 max-w-sm mx-auto mb-6">
                  Try adjusting your keywords (like pizza, waffle, macchiato) or resetting filter rules.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setShowOnlyPopular(false);
                  }}
                  className="bg-stone-900 text-white font-mono font-bold text-xs px-5 py-2.5 rounded-full shadow-lg hover:bg-amber-600 transition-colors duration-300 cursor-pointer"
                >
                  Reset Explorer
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* --- FLOATING SECURE GOURMET TRAY WIDGET (SPECTACULAR PERSISTENT COST ESTIMATOR) --- */}
      <AnimatePresence>
        {tray.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-18 lg:bottom-6 right-4 left-4 sm:left-auto sm:right-6 lg:right-6 z-40 bg-stone-900 text-white p-4.5 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.35)] border border-stone-800 flex flex-col w-auto sm:w-[360px]"
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-stone-800">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-white">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-stone-400 uppercase leading-none mb-0.5">Campus Meal Tray</span>
                  <span className="block font-display font-extrabold text-sm text-stone-100 leading-none">{trayStats.totalCount} Selected Items</span>
                </div>
              </div>
              <button 
                onClick={() => setIsTrayDrawerOpen(!isTrayDrawerOpen)}
                className="text-xs font-mono font-bold text-amber-500 hover:text-amber-400 underline cursor-pointer"
              >
                {isTrayDrawerOpen ? "Hide Bill" : "View Bill"}
              </button>
            </div>

            {/* Expanded Itemized Receipt Drawer */}
            <AnimatePresence>
              {isTrayDrawerOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-y-auto max-h-[220px] divide-y divide-stone-800 py-3 text-left scrollbar-thin"
                >
                  {tray.map((i) => (
                    <div key={`tray-item-${i.item.id}`} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-stone-100">{i.item.name}</span>
                        <div className="flex space-x-2 text-[10px] text-stone-400 mt-0.5 font-mono">
                          <span>${i.item.price.toFixed(2)} ea</span>
                          {i.item.calories && <span>• {i.item.calories}</span>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        <button 
                          onClick={() => handleRemoveFromTray(i.item.id)}
                          className="w-5 h-5 bg-stone-800 hover:bg-stone-700/80 rounded flex items-center justify-center cursor-pointer text-stone-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-stone-100 min-w-[12px] text-center">{i.quantity}</span>
                        <button 
                          onClick={() => handleAddToTray(i.item)}
                          className="w-5 h-5 bg-stone-800 hover:bg-stone-700/80 rounded flex items-center justify-center cursor-pointer text-stone-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Live Subtotal calculations and Calorie tracking gauges */}
            <div className="pt-3.5 space-y-2 text-left">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400">Door Cost Estimate</span>
                <span className="font-extrabold text-amber-400 text-sm">${trayStats.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400 flex items-center gap-1">
                  Total Calories
                  <Info className="w-3 h-3 text-stone-500" title="Calculated based on standard single serving servings." />
                </span>
                <span className="font-medium text-emerald-400">{trayStats.totalCalories} kcal</span>
              </div>

              {/* Dynamic Student Health Energy Indicator */}
              <div className="bg-stone-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-amber-500 h-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (trayStats.totalCalories / 2000) * 100)}%` }} 
                />
              </div>
              <span className="block text-[9px] font-mono text-stone-500 leading-tight">
                *Estimated {Math.min(100, Math.round((trayStats.totalCalories / 2000) * 100))}% of daily student 2k calorie benchmark.
              </span>

              {/* Multi-Channel Interactive CTA (Direct Action button to DIAL numbers) */}
              <div className="grid grid-cols-2 gap-2 pt-2.5">
                <button
                  onClick={handleClearTray}
                  className="flex items-center justify-center space-x-1 py-3 px-2 rounded-xl text-stone-400 hover:text-white bg-stone-800 hover:bg-stone-750 transition-colors text-xs font-mono font-bold cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset Tray</span>
                </button>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="flex items-center justify-center space-x-1 py-3 px-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-mono font-black text-xs transition-colors shadow-lg shadow-amber-500/10"
                >
                  <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                  <span>Call to Check</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
