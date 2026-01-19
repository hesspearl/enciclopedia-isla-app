import { motion } from "framer-motion";
//import SubjectCard from './SubjectCard';
import { BookOpen } from "lucide-react";
import SubjectCard from "./SubjectsCard";

type SubjectProps = {
  subject: {
    id: string;
    icon: string;
    title: string;
    description?: string;
  };
  cards: {
    id: string;
    title: string;
    short_description: string;
    cover_image?: string;
  }[];
};

const SubjectSection = ({ subject, cards }: SubjectProps) => {
  const IconComponent = subject.icon || BookOpen;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="mb-20"
    >
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-10">
        <motion.div
          className="flex items-center justify-center w-14 h-14 rounded-2xl shadow-sm"
          style={{
            background: "linear-gradient(to bottom right, #d1f0e8, #e6f7f3)",
          }}
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <IconComponent className="w-7 h-7" style={{ color: "#06342a" }} />
        </motion.div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            {subject.title}
          </h2>
          {subject.description && (
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              {subject.description}
            </p>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      {cards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <SubjectCard key={card.id} card={card} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p>Conteúdos em breve...</p>
        </div>
      )}
    </motion.section>
  );
};

export default SubjectSection;
