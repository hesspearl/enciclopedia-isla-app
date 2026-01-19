const subjects = [
  {
    id: "practice-islam",
    title: "Prática do Islã",
    description: "Os cinco pilares fundamentais da prática islâmica.",
  },
  {
    id: "hadith",
    title: "Hadith Studies",
    description:
      "Sayings and traditions of Prophet Muhammad (peace be upon him).",
  },
  {
    id: "history",
    title: "Islamic History",
    description: "Important events and figures in Islamic civilization.",
  },
];

export default subjects;

export const cards: Card[] = [
  {
    id: "card-practice-islam.1",
    subject_id: "practice-islam",
    title: "Como fazer o Salat",
    short_description: "Orientações sobre a oração islâmica diária.",
    main_description:
      "Detalhes completos sobre os rituais, posturas e significados do Salat.",
    content_blocks: [
      {
        title: "TITLE",
        description: "DESCRIPTION",
        image_url:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      },
      {
        title: "TITLE",
        description: "DESCRIPTION",
        image_url:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      },
      {
        title: "TITLE",
        description: "DESCRIPTION",
        image_url:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      },
      {
        title: "TITLE",
        description: "DESCRIPTION",
        image_url:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      },
    ],
    cover_image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
  },
  {
    id: "card-practice-islam.2",
    title: "Como jejuar",
    subject_id: "practice-islam",
    content_blocks: [
      {
        title: "TITLE",
        description: "DESCRIPTION",
        image_url:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      },
    ],
    short_description:
      "Princípios e práticas do jejum durante o mês de Ramadã.",
    main_description:
      "Instruções detalhadas sobre como observar o jejum, suas regras e benefícios espirituais.",
    cover_image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800",
  },
  {
    id: "card-practice-islam.3",
    title: "Como pagar o Zakat",
    subject_id: "practice-islam",
    content_blocks: [
      {
        title: "TITLE",
        description: "DESCRIPTION",
        image_url:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      },
    ],
    short_description:
      "Explicação sobre a caridade obrigatória e sua importância.",
    cover_image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
  },
  {
    id: "card-practice-islam.4",
    title: "Como performar no Hajj",
    subject_id: "practice-islam",
    content_blocks: [
      {
        title: "TITLE",
        description: "DESCRIPTION",
        image_url:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      },
    ],
    short_description: "Passos essenciais para realizar a peregrinação a Meca.",
    cover_image:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=800",
  },
  {
    id: "card-practice-islam.5",
    title: "Como fazer a Shahada",
    subject_id: "practice-islam",
    content_blocks: [
      {
        title: "TITLE",
        description: "DESCRIPTION",
        image_url:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      },
    ],
    short_description: "A declaração de fé e sua centralidade no Islã.",
    cover_image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
  },
  {
    id: "card-hadith.1",
    title: "Hadith on Kindness",
    subject_id: "hadith",
    content_blocks: [
      {
        title: "TITLE",
        description: "DESCRIPTION",
        image_url:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      },
    ],
    short_description:
      "The Prophet said: 'The best among you are those who have the best manners.'",
    cover_image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
  },
  {
    id: "card-hadith.2",
    subject_id: "hadith",
    title: "Hadith on Charity",
    content_blocks: [
      {
        title: "TITLE",
        description: "DESCRIPTION",
        image_url:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      },
    ],
    short_description:
      "Charity does not decrease wealth, but increases blessings.",
    cover_image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
  },
  {
    id: "card-history.1",
    subject_id: "history",
    title: "Battle of Badr",
    content_blocks: [
      {
        title: "TITLE",
        description: "DESCRIPTION",
        image_url:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      },
    ],
    short_description:
      "The first major battle in Islamic history, symbolizing faith and perseverance.",
    cover_image:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=800",
  },
  {
    id: "card-history.2",
    subject_id: "history",
    content_blocks: [
      {
        title: "TITLE",
        description: "DESCRIPTION",
        image_url:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      },
    ],
    title: "Hijrah to Medina",
    short_description:
      "The migration of Muslims from Makkah to Medina, marking a turning point in Islam.",
    cover_image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
  },
];

export interface Card {
  id: string;
  subject_id: string;
  title: string;
  short_description: string;
  main_description?: string;
  content_blocks: {
    title: string;
    description: string;
    image_url: string;
  }[];
  cover_image: string;
}
