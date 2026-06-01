/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquareDot, UserCheck, Flame, ArrowUpRight } from 'lucide-react';
import { REVIEWS_LIST, BUSINESS_INFO } from '../data';

export default function ReviewsSection() {
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);

  const roles = ['All', 'Student', 'Faculty', 'Parent'];

  // Distribution calculation
  const reviewScoreBreakdown = [
    { score: 5, percentage: '48%', count: 167 },
    { score: 4, percentage: '31%', count: 108 },
    { score: 3, percentage: '12%', count: 42 },
    { score: 2, percentage: '6%', count: 20 },
    { score: 1, percentage: '3%', count: 10 }
  ];

  const filteredReviews = useMemo(() => {
    let reviews = REVIEWS_LIST;
    if (selectedRole !== 'All') {
      reviews = REVIEWS_LIST.filter((r) => r.role === selectedRole);
    }
    return showAllReviews ? reviews : reviews.slice(0, 4);
  }, [selectedRole, showAllReviews]);

  return (
    <section id="reviews" className="py-24 bg-stone-50/20 relative overflow-hidden">
      {/* Visual Background Accents */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-amber-200/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-amber-100/65 text-amber-805 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <MessageSquareDot className="w-3.5 h-3.5" />
            <span>Campus Consensus</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-none mb-4">
            Honest Reviews From Our Rowdy Community
          </h2>
          <p className="text-base sm:text-lg text-stone-605 font-sans leading-relaxed">
            We hold ourselves to a transparent campus benchmark. Here is a balanced view of our value, flavors, convenience, and occasional rush-hour crowd dynamic.
          </p>
        </div>

        {/* Aggregate Ratings Grid Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          
          {/* Left Block - General Rating Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-md border border-stone-200/60 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-semibold text-stone-400 uppercase tracking-widest block mb-4">
                COMMUNITY OVERALL
              </span>
              <div className="flex items-baseline space-x-3 mb-3">
                <span className="text-6xl sm:text-7xl font-display font-black text-stone-950">3.9</span>
                <span className="text-lg font-bold font-sans text-stone-400">out of 5</span>
              </div>
              
              {/* Star graphics representation */}
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="w-6 h-6 fill-amber-400 text-amber-400" />
                ))}
                {/* 3.9 representation: final star partially colored or outline */}
                <div className="relative w-6 h-6">
                  <Star className="absolute inset-0 w-6 h-6 text-stone-300" />
                  <div className="absolute inset-0 overflow-hidden w-[90%]">
                    <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                  </div>
                </div>
              </div>
              <p className="text-sm text-stone-500 font-sans leading-relaxed">
                Based on <strong className="text-stone-850">{BUSINESS_INFO.reviewCount} verified UTSA campus feedbacks</strong> and local Google guides reports.
              </p>
            </div>

            <div className="pt-6 border-t border-stone-100 mt-8">
              <div className="flex items-center justify-between text-xs font-mono font-semibold text-stone-500">
                <span>Value Rating: High (3.9)</span>
                <span>Speed Rating: Excellent</span>
              </div>
            </div>
          </div>

          {/* Right Block - Breakdown Distributions */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-md border border-stone-200/60 flex flex-col justify-center">
            <span className="text-xs font-mono font-semibold text-stone-400 uppercase tracking-widest block mb-6">
              RATING DISTRIBUTIONS
            </span>
            <div className="space-y-4">
              {reviewScoreBreakdown.map((row) => (
                <div key={row.score} className="flex items-center space-x-4">
                  <span className="w-3 text-xs font-mono font-bold text-stone-600 pl-0.5">{row.score}</span>
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                  <div className="flex-1 h-3 bg-stone-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: row.percentage }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-amber-500 rounded-full"
                    />
                  </div>
                  <span className="w-10 text-right text-xs font-mono font-bold text-stone-500">{row.percentage}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Review Filtering bar */}
        <div id="reviews-board" className="flex items-center justify-between border-b border-stone-200 pb-5 mb-10 flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none text-left">
            {roles.map((role) => (
              <button
                id={`review-role-btn-${role.toLowerCase()}`}
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                  selectedRole === role
                    ? 'bg-amber-400 text-stone-950 font-black shadow-md shadow-amber-400/10'
                    : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                {role === 'All' ? 'All Roles' : `${role}s`}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-stone-500 shrink-0">
            Showing {filteredReviews.length} genuine local reflections
          </span>
        </div>

        {/* Reviews Grid */}
        <div className="relative">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredReviews.map((rev) => (
                <motion.div
                  id={`review-card-${rev.id}`}
                  key={rev.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-3xl p-6.5 border border-slate-200/50 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Stars and Role */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-0.5">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                        {Array.from({ length: 5 - rev.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-slate-300" />
                        ))}
                      </div>
                      <span className="inline-flex items-center space-x-1 bg-slate-100 border border-slate-200/40 text-slate-500 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase leading-none">
                        <UserCheck className="w-3 h-3 text-orange-500 mr-0.5" />
                        {rev.role}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-slate-700 italic font-sans font-medium leading-relaxed mb-6">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="font-display font-bold text-sm text-slate-900">{rev.author}</span>
                    <span className="text-xs font-mono text-slate-400">{rev.date}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View Expand Button */}
        <div className="text-center mt-12">
          <button
            id="read-more-reviews-btn"
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="inline-flex items-center justify-center space-x-2 bg-slate-900 border border-slate-300 hover:bg-orange-600 hover:border-orange-600 hover:text-white text-slate-50 font-semibold px-6 py-3.5 rounded-2xl shadow-md transition-all duration-300 cursor-pointer"
          >
            <span>{showAllReviews ? "Show Featured Reviews" : "Show All Reviews"}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
