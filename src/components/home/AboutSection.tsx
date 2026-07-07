import React from "react";
import { motion } from "framer-motion";

const quranImage =
  "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200";
const dawahLogo =
  "https://media.base44.com/images/public/6966e09faaf1b33541cf08b1/bb2295f8d_image.png";

export default function AboutSection() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-stretch">
      {/* Fixed Background Image (Quran) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${quranImage})` }}
      />

      {/* Split Overlay - Light left, Dark right */}
      <div className="absolute inset-0 flex">
        <div className="w-full md:w-1/2 bg-white/85 backdrop-blur-sm" />
        <div
          className="w-full md:w-1/2 absolute md:relative inset-0 md:inset-auto"
          style={{ backgroundColor: "rgba(6, 52, 42, 0.92)" }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 px-6 py-20 md:py-32 gap-12 items-center">
        {/* Light Side - Quran Visual */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="hidden md:block"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={quranImage}
              alt="Alcorão Sagrado"
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </motion.div>

        {/* Dark Side - About Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white"
        >
          {/* DAWAH Logo */}
          <div className="mb-8">
            <img
              src={dawahLogo}
              alt="DAWAH BRASIL"
              className="w-32 h-32 rounded-2xl object-cover shadow-xl"
            />
          </div>

          <div className="text-2xl md:text-3xl lg:text-5xl text-amber-300 font-bold mb-6 leading-tight">
            Quem somos <br /> e o que Fazemos
          </div>

          <div
            className="w-20 h-1 rounded-full mb-6"
            style={{ backgroundColor: "#f2f2f2" }}
          />

          <p className="text-lg text-amber-300 leading-relaxed mb-4">
            Somos uma iniciativa dedicada a ensinar o Islã acessível aos
            brasileiros, acolhendo novos muçulmanos e curiosos com clareza,
            respeito e conhecimento autêntico.
          </p>

          <p className="text-lg text-amber-300 leading-relaxed mb-4">
            Nossa missão é desmistificar a fé islâmica, fornecer materiais
            educativos acessíveis e construir uma comunidade que apoia cada
            passo da jornada de quem busca se aproximar do Criador de todos os
            mundos.
          </p>

          <p className="text-lg text-amber-300 leading-relaxed">
            Através de conteúdo organizado, responsável e em português, queremos
            ser uma ponte entre o conhecimento e todos os brasileiros que
            desejam aprender sobre o Islam ou que desejam se integrar à
            irmandade muçulmana.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
