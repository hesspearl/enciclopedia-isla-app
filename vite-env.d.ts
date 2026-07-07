interface ImportMetaEnv {
  readonly VITE_API_TOKEN_SALT: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_WHATSAPP_COMMUNITY: string;
  // add other env vars here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Card {
  documentId: string;
  card_id: string;
  subject: {
    subject_id: string;
    documentId?: string;
  };
  title: string;
  short_description: string;
  main_description?: string;
  content_blocks?: Card_Blocks[];
  cover_image: {
    url: string;
  };
}

interface Subject {
  documentId: string;
  subject_id: string;
  title: string;
  description: string;
  icon?: string;
}

type Card_Blocks = {
  title: string;
  documentId: string;
  image_url: {
    url: string;
  };
  content_rich_text: [];
  sequence_marker: "none" | "number";
  card: {
    card_id: string;
  };
};

type subjectProps = {
  subject_id: string;
  cards: {
    documentId: string;
    title: string;
  }[];
};

type video = {
  documentId: string;
  title: string;
  description: string;
  youtube_video_id: string;
  thumbnail: {
    url: string;
    name: string;
  };
};

type link = {
  documentId: string;
  title: string;
  description: string;
  thumbnail: {
    name: string;
    url: string;
  };
  external_link_text: {
    documentId: string;
    label: string;
    external_link_address: string;
  }[];
};
