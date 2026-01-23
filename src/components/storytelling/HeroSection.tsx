import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { serverBaseUrl } from "../../data/server";

export default function HeroSection({
  card,
  onStart,
}: {
  card: Card;
  onStart: () => void;
}) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <motion.img
          src={
            card.cover_image.url ||
            "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1920"
          }
          alt={card.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Decorative Element */}
          <motion.div
            className="w-20 h-0.5 mx-auto mb-8"
            style={{
              background:
                "linear-gradient(to right, transparent, #06342a, transparent)",
            }}
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.8 }}
          />

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            {card.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-12 leading-relaxed max-w-2xl mx-auto">
            {card.main_description || card.short_description}
          </p>

          <motion.button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white font-medium hover:bg-white hover:text-gray-900 transition-all duration-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg">Começar</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
