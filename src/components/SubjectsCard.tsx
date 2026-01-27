import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { serverBaseUrl } from "../data/server";

export default function SubjectCard({
  card,
  index,
}: {
  card: Card;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/story/${card.documentId}`}>
        <motion.div
          className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
          whileHover={{ y: -8 }}
        >
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={
                serverBaseUrl + card.cover_image.url ||
                "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800"
              }
              alt={card.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6">
            <h3
              className="hover-text text-lg font-semibold text-gray-900 mb-2 transition-colors duration-300"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#06342a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              {card.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {card.short_description}
            </p>
          </div>

          {/* Hover Indicator */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
            style={{
              background: "linear-gradient(to right, #06342a, #08493a)",
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
