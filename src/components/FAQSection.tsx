/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ_LIST } from '../data';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-blue-50/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-stone-100 border border-stone-200 text-stone-850 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4 animate-fade-in">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Frictionless Answers</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-none mb-4">
            Answers for Hungry Students
          </h2>
          <p className="text-sm sm:text-base text-stone-500 font-sans leading-relaxed max-w-2xl mx-auto">
            Got questions about door rates without meal plans, parking, or popular signature dishes? We've answered them all.
          </p>
        </div>

        {/* FAQ Accordion Lists */}
        <div className="space-y-4">
          {FAQ_LIST.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                id={`faq-item-${faq.id}`}
                key={faq.id}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-amber-500/30 bg-amber-50/20 shadow-md shadow-amber-500/[0.02]'
                    : 'border-stone-200/70 bg-white hover:border-stone-300'
                }`}
              >
                <button
                  id={`faq-toggle-btn-${faq.id}`}
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left px-6 py-5 sm:py-6 flex items-center justify-between cursor-pointer focus:outline-none"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-stone-900 pr-5">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                    isOpen ? 'bg-amber-500 text-stone-950 font-black' : 'bg-stone-100 text-stone-605'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-slate-600 font-sans text-sm sm:text-base leading-relaxed border-t border-slate-100/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
