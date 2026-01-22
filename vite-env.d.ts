interface ImportMetaEnv {
  readonly VITE_API_TOKEN_SALT: string;
  readonly VITE_BASE_URL: string;
  // add other env vars here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Card {
  documentId: string;
  subject: {
    subject_id: string;
    documentId: string;
  };
  title: string;
  short_description: string;
  main_description?: string;
  content_blocks: Card_Blocks[];
  cover_image: {
    url: string;
  };
}

interface Subject {
  documentId: string;
  subject_id: string;
  title: string;
  description: string;
  icon: string;
}

type Card_Blocks = {
  title: string;
  documentId: string;
  image_url: {
    url: string;
  };
  description: string;
  card: {
    card_id: string;
  };
};
