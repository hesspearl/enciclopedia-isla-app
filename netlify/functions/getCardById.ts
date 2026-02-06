import { HandlerEvent } from "@netlify/functions";
import axios from "axios";
const netlifyBaseUrl = process.env.VITE_BASE_URL;

exports.handler = async (event: HandlerEvent) => {
  const { cardId } = event.queryStringParameters as { cardId: string };

  try {
    const response = await axios.post(`${netlifyBaseUrl}/graphql`, {
      query: `
      query Cards($filters: CardFiltersInput) {
  cards(filters: $filters) {
    card_id
    documentId
    title
    subject {
      documentId
    }
    content_blocks {
      title
      image_url {
        url
      }
      content_rich_text
      card {
        card_id
      }
    }
    cover_image {
      url
    }
    main_description
  }
}
    `,
      variables: {
        filters: {
          card_id: {
            eq: cardId,
          },
        },
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VITE_API_TOKEN_SALT}`,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.data.cards[0]),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
