import React, { useEffect, useState } from "react";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos, setVideos] = useState<video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<video | null>(null);

  useEffect(() => {
    axios
      .get(`/api/videos`)
      .then((res) => {
        setVideos(res.data.videosResources);
      })
      .catch((err) => {});
  }, []);

  const itemsPerView =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : 1;
  const mobileRule = itemsPerView === 1 ? 3 : 1;

  const maxIndex = Math.max(0, videos?.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 3, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 3, 0));
  };

  if (videos?.length === 0 || !videos) return null;

  const sortedVideos = [...videos].sort((a, b) => {
    const aFalsy = !a.display_order;
    const bFalsy = !b.display_order;

    // If both are falsy, keep their relative order
    if (aFalsy && bFalsy) return 0;
    // If only a is falsy, put a after b
    if (aFalsy) return 1;
    // If only b is falsy, put b after a
    if (bFalsy) return -1;

    // Both have display_order -> sort ascending
    return a.display_order! - b.display_order!;
  });

  return (
    <section className="bg-stone-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vídeos Educativos
          </h2>
          <p className="text-gray-600 text-lg">
            Aprenda visualmente com nossa seleção de conteúdos.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative ">
          {/* Navigation Buttons - Desktop/Tablet only */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Slides */}
          <div className="overflow-hidden px-3 p-3 ">
            <motion.div
              className="flex gap-3"
              animate={{
                x: `-${currentIndex * (100 / videos.length)}%`,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{
                width: `calc(${videos.length * (100 / itemsPerView)}% - ${videos.length * 12 * mobileRule}px)`,
              }}
            >
              {sortedVideos.map((video) => (
                <div
                  id="snap"
                  key={video.documentId}
                  style={{ width: `${100 / videos.length}%` }}
                  className="flex-shrink-0 pr-3"
                >
                  <button
                    onClick={() => setSelectedVideo(video)}
                    className="group w-full text-left bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail.url}
                        alt={video.thumbnail.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div
                          className="flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: "#06342a" }}
                        >
                          <Play className="w-6 h-6 ml-1" fill="white" />
                        </div>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </button>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots - Mobile only */}
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${i === currentIndex ? "w-8" : "w-2 bg-gray-300"}`}
                style={i === currentIndex ? { backgroundColor: "#06342a" } : {}}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtube_video_id}?autoplay=1`}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {selectedVideo.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedVideo.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
