import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchSubjects } from "../data/GetSubjects.js";
import { fetchCards } from "../data/GetCards.js";
import SubjectSection from "../components/SubjectsSection.js";
import { Sun, Loader2 } from "lucide-react";

function Home() {
  const [subjects, setSubjects] = useState<{
    data: Subject[];
    isLoading: boolean;
  }>({
    data: [],
    isLoading: true,
  });
  const [cards, setCards] = useState<{ data: Card[]; isLoading: boolean }>({
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    fetchSubjects()
      .then((res) => setSubjects({ isLoading: false, data: res }))
      .catch((err) => console.warn(err));
    fetchCards()
      .then((res) => setCards({ isLoading: false, data: res }))
      .catch((err) => console.warn(err));
  }, []);

  console.log(cards.data);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-stone-50" />

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Logo/Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl shadow-xl mb-8"
              style={{
                background:
                  "linear-gradient(to bottom right, #06342a, #08493a)",
              }}
            >
              <Sun className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight"
            >
              Enciclopédia da{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #06342a, #08493a)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                Luz de Allah
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Sua jornada de conhecimento começa aqui. Aprenda sobre o Islam de
              forma guiada, clara e acolhedora.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center gap-2 mt-8 text-sm"
              style={{ color: "#06342a" }}
            >
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#06342a" }}
              />
              <span>Ambiente para novos muçulmanos e curiosos</span>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        {cards.isLoading && subjects.isLoading ? (
          <div className="flex items-center justify-center py-32">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-8 h-8" style={{ color: "#06342a" }} />
            </motion.div>
          </div>
        ) : subjects.data.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <div
              className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#d1f0e8" }}
            >
              {/* <Sun className="w-12 h-12" style={{ color: '#06342a' }} /> */}
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Em breve, novos conteúdos!
            </h2>
            <p className="text-gray-500">
              Estamos preparando materiais especiais para você.
            </p>
          </motion.div>
        ) : (
          subjects.data.map((subject) => (
            <SubjectSection
              key={subject.subject_id}
              subject={subject}
              cards={cards.data.filter(
                (card) => card.subject.subject_id === subject.subject_id,
              )}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default Home;
