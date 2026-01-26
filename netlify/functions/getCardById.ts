import axios from "axios";
const netlifyBaseUrl = process.env.VITE_BASE_URL;

exports.handler = async (event) => {
  const { documentId } = event.queryStringParameters;
  try {
    const response = await axios.post(`${netlifyBaseUrl}/graphql`, {
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
            content_rich_text
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VITE_API_TOKEN_SALT}`,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
