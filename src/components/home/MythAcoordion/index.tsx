import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

const faqItems = [
  {
    question: "O Islã é uma religião violenta?",
    answer:
      'Não. O Islã não é uma religião violenta. A palavra "Islã" vem da raiz árabe relacionada à ideia de submissão a Deus, e é por meio dessa submissão ao Criador que se busca a paz. O Islã condena a violência contra pessoas inocentes, e o Alcorão afirma que quem mata uma pessoa inocente é como se tivesse matado toda a humanidade, enquanto quem salva uma vida é como se tivesse salvado toda a humanidade (Alcorão 5:32). Infelizmente, a imagem do Islã foi distorcida pelas ações de grupos extremistas que não representam os ensinamentos da religião nem a imensa maioria dos mais de 1,9 bilhão de muçulmanos em todo o mundo.',
  },
  {
    question: "As mulheres têm direitos no Islã?",
    answer:
      "Sim. O Islã concedeu direitos às mulheres há mais de 1.440 anos, no sétimo século (era comum), incluindo o direito à educação, à herança, ao divórcio, trabalho e ao consentimento no casamento — direitos que no Ocidente só surgiram muitos séculos depois. A mulher muçulmana tem o direito de manter seu próprio dinheiro e propriedade, sem obrigação de gastá-lo com a família.",
  },
  {
    question: "Muçulmanos adoram uma divindade diferente?",
    answer:
      'Não. Os muçulmanos adoram o mesmo Deus de Abraão, Moisés e Jesus (que a paz esteja com eles). A palavra "Allah" significa simplesmente "Deus" em árabe e é utilizada tanto por muçulmanos quanto por cristãos e judeus de língua árabe para se referirem ao Criador. O Islã é uma religião estritamente monoteísta, que ensina a adoração e obediência exclusiva de Deus, sem associar parceiros ou intermediários à Sua divindade. Dar o direito de adoração a qualquer outro ser ou coisa é considerado idolatria, o maior pecado no Islã.',
  },
  {
    question: "O Islã obriga a conversão?",
    answer:
      "Não. O Alcorão é claro: 'Não há compulsão na religião' (Alcorão 2:256). A fé deve ser uma escolha sincera do coração. Historicamente, comunidades judias e cristãs viveram em paz sob governança islâmica por séculos, mantendo suas religiões.",
  },
  {
    question: "O que o Islã diz sobre Jesus?",
    answer:
      "Muçulmanos amam e reverenciam Jesus (que a paz esteja com ele), chamado de 'Isa' em árabe. Ele é um dos maiores profetas de Deus, nascido de uma virgem (Maria/Mariam), que realizou milagres com a permissão de Deus. A diferença é que o Islã não o considera divino, mas sim um servo e mensageiro de Deus.",
  },
  {
    question: "O que é a jihad?",
    answer:
      "A palavra 'jihad' significa 'esforço' ou 'luta'. A 'jihad maior' é a luta interior contra o ego e as más inclinações — o esforço diário para ser uma pessoa melhor. A 'jihad menor' refere-se à legítima defesa contra agressão, com regras éticas estritas que proíbem atacar civis, destruir colheitas ou árvores.",
  },
  {
    question: "O Islã é compatível com a ciência?",
    answer:
      "Sim. O Islã incentiva a busca pelo conhecimento e a reflexão sobre o mundo natural. Muitos muçulmanos contribuíram significativamente para a ciência, matemática, medicina e filosofia durante a Idade de Ouro Islâmica. O Alcorão contém versículos que encorajam a observação da natureza e o estudo do universo como sinais da criação de Deus.",
  },
  {
    question: "Por que um cristão ou um judeu consideraria retornar ao Islã?",
    answer:
      "Porque, segundo o Islã, todos os seres humanos nascem em um estado natural de submissão a Deus (fitrah). Nesse sentido, quem abraça o Islã não está adotando uma nova religião, mas retornando à sua disposição original de adorar unicamente o Criador. Além disso, os muçulmanos acreditam que Abraão, Moisés, Jesus e Muhammad (que a paz esteja com todos eles) transmitiram a mesma mensagem fundamental: adorar somente a Deus e seguir Seus mensageiros. Por isso, o Islã convida cristãos, judeus e todas as pessoas a reconhecerem Muhammad como o último mensageiro e a retomarem essa fé monoteísta em sua forma completa.",
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
