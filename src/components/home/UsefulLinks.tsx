import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import axios from "axios";

export default function UsefulLinks() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [links, setLinks] = useState<link[]>([]);

  const toggleItem = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    axios
      .get(`/api/links`)
      .then((res) => {
        setLinks(res.data.descriptionsOfLinks);
        setActiveId(res.data.descriptionsOfLinks[0].documentId);
      })
      .catch((err) => {});
  }, []);

  if (links?.length === 0 || !links) return null;
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Links Úteis
          </h2>
          <p className="text-gray-600 text-lg">
            Recursos selecionados para aprofundar seus estudos.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((item) => {
            const isActive = activeId === item.documentId;
            return (
              <motion.div
                key={item.description}
                layout
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`relative rounded-2xl overflow-hidden shadow-sm cursor-pointer ${
                  isActive
                    ? "lg:col-span-2 lg:row-span-2"
                    : activeId !== null
                      ? "opacity-60 hover:opacity-100"
                      : ""
                }`}
                onClick={() => toggleItem(item.documentId)}
              >
                {/* Image */}
                <motion.div
                  layout
                  className="relative overflow-hidden"
                  animate={{ height: isActive ? 320 : 220 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <img
                    src={item.thumbnail.url}
                    alt={item.thumbnail.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-semibold text-lg">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>

                {/* Expandable Footer - Green Background */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                      style={{ backgroundColor: "#06342a" }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="p-5"
                      >
                        <h4 className="text-white font-semibold mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed mb-4">
                          {item.description}
                        </p>
                        {/* Chips */}
                        <div className="flex flex-wrap gap-2">
                          {item.external_link_text.map((chip, idx) => {
                            return (
                              <a
                                key={idx}
                                href={chip.external_link_address}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-white transition-colors hover:bg-white/20"
                                style={{
                                  backgroundColor: "rgba(255,255,255,0.1)",
                                }}
                              >
                                {chip.label}
                                <ExternalLink className="w-3 h-3 opacity-60" />
                              </a>
                            );
                          })}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
