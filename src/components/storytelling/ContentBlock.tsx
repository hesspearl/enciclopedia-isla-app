import React from "react";
import { motion } from "framer-motion";
import { serverBaseUrl } from "../../data/server";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function ContentBlock({
  block,
  index,
}: {
  block: Card_Blocks;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-16 md:py-24"
    >
      <div
        className={`max-w-6xl mx-auto px-6 flex flex-col ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } items-center gap-12 lg:gap-20`}
      >
        {/* Image */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <motion.img
              src={
                block.image_url.url ||
                "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800"
              }
              alt={block.title}
              className="w-full h-72 md:h-96 object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Step Number */}
          <motion.div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-lg mb-6 shadow-lg"
            style={{
              background: "linear-gradient(to bottom right, #06342a, #08493a)",
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {index + 1}
          </motion.div>

          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {block.title}
          </h3>

          <div
            className="w-16 h-1 rounded-full mb-6"
            style={{
              background: "linear-gradient(to right, #06342a, #08493a)",
            }}
          />

          <p className="text-gray-600 text-lg leading-relaxed">
            <BlocksRenderer content={block.description} />
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
