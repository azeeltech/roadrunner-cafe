/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GALLERY_IMAGES } from '../data';

export default function GallerySection() {
  const [activePhotoId, setActivePhotoId] = useState<string | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!activePhotoId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePhotoId(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoId]);

  const activePhotoIndex = GALLERY_IMAGES.findIndex((img) => img.id === activePhotoId);
  const activePhotoObj = activePhotoIndex !== -1 ? GALLERY_IMAGES[activePhotoIndex] : null;

  const handleNext = () => {
    if (activePhotoIndex !== -1) {
      const nextIndex = (activePhotoIndex + 1) % GALLERY_IMAGES.length;
      setActivePhotoId(GALLERY_IMAGES[nextIndex].id);
    }
  };

  const handlePrev = () => {
    if (activePhotoIndex !== -1) {
      const prevIndex = (activePhotoIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
      setActivePhotoId(GALLERY_IMAGES[prevIndex].id);
    }
  };

  return (
    <section id="photos" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 text-orange-400 px-4 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Digital Dining Snapshot</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            See the Vibe, Taste the Quality
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed mt-4">
            Take a visual tour of Roadrunner Café. From our vibrant waffle grills inside UTSA, to freshly hand-tossed pepperoni pizzas and coffee lounges.
          </p>
        </div>

        {/* Masonry-Like responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img) => (
            <motion.div
              id={`gallery-thumb-${img.id}`}
              key={img.id}
              whileHover={{ y: -6 }}
              onClick={() => setActivePhotoId(img.id)}
              className="group cursor-pointer relative rounded-3xl overflow-hidden bg-slate-800 border border-white/5 aspect-4/3 sm:aspect-auto"
            >
              {/* Image element with required no-referrer attribute */}
              <img
                src={img.url}
                alt={img.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 hover:brightness-105"
                loading="lazy"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-sans font-medium text-white/95 mr-4">
                    {img.caption}
                  </p>
                  <div className="w-9 h-9 bg-orange-600 rounded-xl flex items-center justify-center shrink-0">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activePhotoObj && (
          <motion.div
            id="lightbox-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button / Background Click */}
            <div
              className="absolute inset-0 cursor-zoom-out"
              onClick={() => setActivePhotoId(null)}
            />

            <button
              id="lightbox-close-btn"
              onClick={() => setActivePhotoId(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-orange-600 rounded-full text-white transition-colors cursor-pointer z-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav Button */}
            <button
              id="lightbox-prev-btn"
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-orange-500 rounded-full text-white transition-all cursor-pointer z-50 focus:ring-2 focus:ring-orange-500"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Lightbox Content wrapper */}
            <motion.div
              layoutId={`gallery-modal-${activePhotoObj.id}`}
              className="max-w-4xl w-full max-h-[80vh] flex flex-col justify-center items-center relative z-10"
            >
              <img
                src={activePhotoObj.url}
                alt={activePhotoObj.caption}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
              />
              <div className="w-full text-center mt-6 px-4">
                <p className="text-base sm:text-lg font-sans font-medium text-slate-100">
                  {activePhotoObj.caption}
                </p>
                <div className="mt-2.5 inline-flex items-center space-x-2 text-xs font-mono text-slate-400">
                  <span>Photo {activePhotoIndex + 1} of {GALLERY_IMAGES.length}</span>
                  <span>•</span>
                  <span>Press Arrow keys to browse</span>
                </div>
              </div>
            </motion.div>

            {/* Right Nav Button */}
            <button
              id="lightbox-next-btn"
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-orange-500 rounded-full text-white transition-all cursor-pointer z-50 focus:ring-2 focus:ring-orange-500"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
