import { motion } from "framer-motion";
import { Link, replace, useNavigate } from "react-router-dom";
import { Home, ArrowRight, Sparkles, Undo2 } from "lucide-react";

export default function NavigationFooter({
  nextCard,
  checkIsLastCard,
}: {
  nextCard: {
    title: string;
    documentId: string;
  } | null;
  checkIsLastCard: () => boolean;
}) {
  const navigate = useNavigate();
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20 md:py-32 bg-gradient-to-b from-white to-teal-50"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Decorative Element */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="flex justify-center mb-8"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(to bottom right, #d1f0e8, #b8e6d7)",
            }}
          >
            <Sparkles className="w-8 h-8" style={{ color: "#06342a" }} />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          Parabéns pela sua jornada!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 text-lg mb-12 max-w-xl mx-auto"
        >
          Continue sua busca pelo conhecimento e aproxime-se cada vez mais da
          Luz de Allah.
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Return Home Button */}

          <motion.button
            className="hover-border hover-text group flex items-center gap-3 px-8 py-4 bg-white border-2 border-gray-200 rounded-full text-gray-700 font-medium transition-all duration-300 shadow-sm hover:shadow-md"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#06342a";
              e.currentTarget.style.color = "#06342a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "";
              e.currentTarget.style.color = "";
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              (navigate("/"),
                window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
            }}
          >
            <Home className="w-5 h-5" />
            <span>Voltar ao Início</span>
          </motion.button>

          {/* Next Card Button */}
          {nextCard && (
            <Link to={`/Storytelling/${nextCard.documentId}`}>
              <motion.button
                className="group flex items-center gap-3 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{
                  background: "linear-gradient(to right, #06342a, #08493a)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "linear-gradient(to right, #08493a, #0a5e4a)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    "linear-gradient(to right, #06342a, #08493a)")
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {checkIsLastCard() ? (
                  <span>Inicio: {nextCard.title}</span>
                ) : (
                  <span>Próximo: {nextCard.title}</span>
                )}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {checkIsLastCard() ? (
                    <Undo2 className="w-5 h-5" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </motion.div>
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.section>
  );
}
