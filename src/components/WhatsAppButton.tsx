import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const sessionHideBubble = sessionStorage.getItem("hideBubble");

  const [isExpanded, setIsExpanded] = useState(false);
  const [hideBubble, setIsHideBubble] = useState(() =>
    sessionHideBubble ? JSON.parse(sessionHideBubble) : false,
  );

  const whatsappUrl = import.meta.env.VITE_WHATSAPP_COMMUNITY;

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex flex-row items-end  gap-4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Tooltip */}

        <AnimatePresence>
          {hideBubble ||
            (!isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: 20,
                  transition: { delay: 0.3 },
                }}
                transition={{ delay: 2 }}
                className=" flex  items-center justify-center"
              >
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <button
                    title="Fechar"
                    onClick={() => {
                      (setIsHideBubble(true),
                        sessionStorage.setItem("hideBubble", "true"));
                    }}
                    className="relative top-0 left-3 w-6 h-6 rounded-full z-10 bg-slate-900 flex items-center justify-center hover:bg-slate-200 transition-colors shadow-xl"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-100 " />
                  </button>
                </motion.div>

                <motion.div className="relative bg-slate-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl pointer-events-none">
                  Converse conosco! 💬
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-slate-900" />
                </motion.div>
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Floating Button */}
        <div className="flex items-end justify-center flex-col gap-4">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="absolute bottom-20 right-0 w-72 bg-white rounded-2xl shadow-2xl p-6 border border-emerald-100"
              >
                <button
                  onClick={() => setIsExpanded(false)}
                  className="relative top-0 left-55 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-600" />
                </button>

                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      Conheça o Islã, estamos aqui.
                    </h3>
                    <p className="text-sm text-slate-600">
                      Um espaço aberto para conhecer o Islã com clareza,
                      respeito e tranquilidade.
                    </p>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-center py-3 rounded-xl font-medium hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl"
                >
                  Iniciar Conversa
                </a>

                <p className="text-xs text-slate-500 text-center mt-3">
                  Clique para abrir no WhatsApp
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full shadow-2xl flex items-center justify-center hover:from-emerald-600 hover:to-emerald-800 transition-all group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle className="w-7 h-7 text-white" />

            {/* Pulse Animation */}
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20" />

            {/* Notification Badge */}
            {!isExpanded && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
              >
                1
              </motion.span>
            )}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
