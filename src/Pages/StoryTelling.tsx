import React, { useRef, useEffect, useState } from "react";
import { ArrowLeft, LoaderPinwheel } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollRestoration } from "react-router-dom";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import HeroSection from "../components/storytelling/HeroSection";
import ContentBlock from "../components/storytelling/ContentBlock";
import NavigationFooter from "../components/storytelling/NavigationFooter";
import { fetchSelectedCard } from "../data/GetCards";
import { fetchSelectedSubject } from "../data/GetSubjects";

export default function Storytelling() {
  const { cardId } = useParams();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [showBackButton, setShowBackButton] = useState(false);
  const navigate = useNavigate();
  const pathname = useLocation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [subject, setSubjects] = useState<{
    data: {
      subject_id: string;
      cards: {
        documentId: string;
        title: string;
      }[];
    };
    isLoading: boolean;
  }>({
    data: {
      subject_id: "",
      cards: [],
    },
    isLoading: true,
  });
  const [currentCard, setCard] = useState<{
    data: Card;
    isLoading: boolean;
  }>({
    data: {} as Card,
    isLoading: true,
  });

  useEffect(() => {
    if (cardId) {
      fetchSelectedCard(cardId)
        .then((res) => setCard({ isLoading: false, data: res }))
        .catch((err) => console.warn(err));
    }
  }, [cardId]);

  useEffect(() => {
    if (!currentCard.isLoading) {
      fetchSelectedSubject(currentCard.data.subject.documentId)
        .then((res) => setSubjects({ isLoading: false, data: res }))
        .catch((err) => console.warn(err));
    }
  }, [currentCard]);

  useEffect(() => {
    buttonRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const currentIndex = subject.data.cards.findIndex(
    (c) => c.documentId === currentCard?.data.documentId,
  );
  // Find next card in the same subject
  const nextCard = React.useMemo(() => {
    if (!currentCard || !subject.data.cards.length) return null;

    if (currentIndex < subject.data.cards.length - 1) {
      return subject.data.cards[currentIndex + 1];
    }

    if (subject.data.cards.length < 2) {
      return null;
    }

    return subject.data.cards[0] || null;
  }, [currentCard, subject.data.cards]);

  const checkIsLastCard = () => {
    if (currentIndex === subject.data.cards.length - 1) {
      return true;
    }
    return false;
  };

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackButton(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top when card changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [cardId]);

  if (currentCard.isLoading || subject.isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <LoaderPinwheel className="w-8 h-8" style={{ color: "#06342a" }} />
        </motion.div>
      </div>
    );
  }

  if (!currentCard.data.content_blocks.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Conteúdo não encontrado
        </h1>
        <Link to={"/"}>
          <motion.button
            className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Início
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: showBackButton ? 1 : 0,
          x: showBackButton ? 0 : -20,
        }}
        className="fixed top-6 left-6 z-50"
      >
        <motion.button
          className="hover-border  flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full text-gray-700 font-medium hover:bg-white transition-all shadow-lg"
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#06342a")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Voltar</span>
        </motion.button>
      </motion.div>

      {/* Hero Section */}
      <HeroSection card={currentCard.data} onStart={scrollToContent} />

      {/* Content Blocks */}
      <div ref={contentRef} className="bg-white">
        {currentCard.data.content_blocks?.length > 0 ? (
          currentCard.data.content_blocks.map((block, index) => (
            <ContentBlock key={index} block={block} index={index} />
          ))
        ) : (
          <div className="py-32 text-center text-gray-500">
            <p>Conteúdo em desenvolvimento...</p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <NavigationFooter nextCard={nextCard} checkIsLastCard={checkIsLastCard} />
      <ScrollRestoration />

      {/* WhatsApp Button */}
      {/* <WhatsAppButton /> */}
    </div>
  );
}
