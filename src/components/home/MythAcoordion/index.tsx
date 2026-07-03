import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

const faqItems = [
  {
    question: "O Islam é uma religião violenta?",
    answer:
      "Não. A palavra 'Islam' vem da raiz árabe 'salam', que significa paz. O Islam condena a violência contra inocentes. O Alcorão estabelece que matar uma pessoa inocente é como matar toda a humanidade (Alcorão 5:32). Infelizmente, a imagem do Islam foi distorcida pelas ações de uma minoria que não representa os mais de 1,9 bilhão de muçulmanos no mundo.",
  },
  {
    question: "As mulheres têm direitos no Islam?",
    answer:
      "Sim. O Islam concedeu direitos às mulheres há mais de 1.400 anos, incluindo o direito à educação, ao trabalho, à herança, ao divórcio e ao consentimento no casamento — direitos que no Ocidente só surgiram séculos depois. A mulher muçulmana tem o direito de manter seu próprio dinheiro e propriedade, sem obrigação de gastá-lo com a família.",
  },
  {
    question: "Muçulmanos adoram uma divindade diferente?",
    answer:
      "Não. Muçulmanos adoram o mesmo Deus de Abraão, Moisés e Jesus (que a paz esteja com eles). A palavra 'Allah' é simplesmente 'Deus' em árabe — os cristãos árabes também chamam Deus de 'Allah'. O Islam é uma religião monoteísta pura, sem associação de parceiros a Deus.",
  },
  {
    question: "O Islam obriga a conversão?",
    answer:
      "Não. O Alcorão é claro: 'Não há compulsão na religião' (Alcorão 2:256). A fé deve ser uma escolha sincera do coração. Historicamente, comunidades judias e cristãs viveram em paz sob governança islâmica por séculos, mantendo suas religiões.",
  },
  {
    question: "O que o Islam diz sobre Jesus?",
    answer:
      "Muçulmanos amam e reverenciam Jesus (que a paz esteja com ele), chamado de 'Isa' em árabe. Ele é um dos maiores profetas de Deus, nascido de uma virgem (Maria/Mariam), que realizou milagres com a permissão de Deus. A diferença é que o Islam não o considera divino, mas sim um servo e mensageiro de Deus.",
  },
  {
    question: "O que é a jihad?",
    answer:
      "A palavra 'jihad' significa 'esforço' ou 'luta'. A 'jihad maior' é a luta interior contra o ego e as más inclinações — o esforço diário para ser uma pessoa melhor. A 'jihad menor' refere-se à legítima defesa contra agressão, com regras éticas estritas que proíbem atacar civis, destruir colheitas ou árvores.",
  },
];

export default function MythAccordion() {
  return (
    <section className="bg-gradient-to-b from-white to-stone-50 py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
            style={{ backgroundColor: "#d1f0e8" }}
          >
            <HelpCircle className="w-7 h-7" style={{ color: "#06342a" }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Desmistificando o Islam
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Tire suas dúvidas e quebre preconceitos comuns sobre a fé islâmica.
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-xl px-5 hover:border-gray-300 transition-colors"
              style={{ borderWidth: "1px" }}
            >
              <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline py-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
