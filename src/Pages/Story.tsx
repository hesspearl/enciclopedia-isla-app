import React, { useRef, useEffect, useState } from "react";
import { ArrowLeft, LoaderPinwheel } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollRestoration } from "react-router-dom";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import HeroSection from "../components/storytelling/HeroSection";
import ContentBlock from "../components/storytelling/ContentBlock";
import NavigationFooter from "../components/storytelling/NavigationFooter";
import { fetchSelectedSubject } from "../data/GetSubjects";
import axios from "axios";
import { handleCurrentCard } from "../data/CurrentCardData";

export default function Storytelling() {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const pathname = useLocation();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const currentCardData = handleCurrentCard(cardId ?? "");

  const [showBackButton, setShowBackButton] = useState(false);
  const [messages, setMessages] = useState<string[]>([
    "Abrindo o conteúdo... Um momento!",
  ]);
  const [subject, setSubjects] = useState<{
    data: subjectProps;
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
    data: currentCardData,
    isLoading: true,
  });

  /*api calls*/

  useEffect(() => {
    if (cardId) {
      axios
        .get(`/api/${cardId}`)
        .then((res) =>
          setCard({
            isLoading: false,
            data: { ...currentCard.data, ...res.data },
          }),
        )
        .catch((err) => console.warn(err));
    }
  }, [cardId]);

  useEffect(() => {
    if (!currentCard.isLoading && currentCard?.data?.subject?.documentId) {
      fetchSelectedSubject(currentCard?.data?.subject?.documentId)
        .then((res) => setSubjects({ isLoading: false, data: res }))
        .catch((err) => console.warn(err));
    }
  }, [currentCard]);

  /*next cards handlers*/

  const currentIndex = subject.data.cards.findIndex(
    (c) => c.documentId === currentCard?.data.documentId,
  );
  // check if no cards after
  const checkIsLastCard = () => {
    if (currentIndex === subject.data.cards.length - 1) {
      return true;
    }
    return false;
  };
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

  /*scrolls handlers*/

  //scroll to top
  useEffect(() => {
    buttonRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  // Scroll to top when card changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [cardId]);

  // scroll to content
  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // scroll when press back button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackButton(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /*timeout*/

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setMessages((prev) => [...prev, "Estamos com muito fluxo de dados..."]);
    }, 1000 * 5);

    const timer2 = setTimeout(() => {
      setMessages(() => ["Por favor, atualize a página."]);
    }, 1000 * 10);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!currentCard.data?.content_blocks) {
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
      {
        <div ref={contentRef} className="bg-white">
          {currentCard?.data?.content_blocks?.length > 0 ? (
            currentCard.data.content_blocks.map((block, index) => (
              <ContentBlock key={index} block={block} index={index} />
            ))
          ) : (
            <div className="py-32 text-center text-gray-500">
              {messages.map((m, i) => (
                <p key={i}>{m}</p>
              ))}
            </div>
          )}
        </div>
      }

      {/* Navigation Footer */}
      {currentCard?.data?.content_blocks?.length > 0 ? (
        <NavigationFooter
          nextCard={nextCard}
          checkIsLastCard={checkIsLastCard}
        />
      ) : (
        <div />
      )}
      <ScrollRestoration />
    </div>
  );
}
