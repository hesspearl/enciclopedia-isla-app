import { graphqlClient } from "./graphClient";

export const fetchCards = async () => {
  const response = await graphqlClient.post("", {
    query: `
    query  {
  cards {
  documentId
    title
    short_description
    cover_image {
      url
    }
    subject {
      subject_id
    }
   
  }
}
    `,
  });

  return response.data.data.cards;
};

export const fetchSelectedCard = async (documentId: string) => {
  const response = await graphqlClient.post("", {
    query: `
      query Card($documentId: ID!) {
        card(documentId: $documentId) {
           subject {
            documentId
          }
          content_blocks {
            title
            image_url {
              url
            }
            description
            card {
              card_id
            }
          }
          cover_image {
            url
          }
          documentId
          title
          main_description
        }
      }
    `,
    variables: {
      documentId,
    },
  });

  return response.data.data.card;
};
