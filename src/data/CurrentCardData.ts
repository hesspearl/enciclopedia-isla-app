import { cards } from "./getCards.json";

export const handleCurrentCard = (cardId: string) => {
  const currentCardData = cards.find((card) => card.card_id === cardId);
  return {
    documentId: currentCardData?.documentId ?? "",
    card_id: currentCardData?.card_id ?? "",
    subject: currentCardData?.subject ?? {
      subject_id: "",
      documentId: "",
    },
    title: currentCardData?.title ?? "",
    short_description: currentCardData?.short_description ?? "",
    main_description: currentCardData?.main_description ?? "",
    content_blocks: [],
    cover_image: currentCardData?.cover_image ?? {
      url: "",
    },
  };
};
