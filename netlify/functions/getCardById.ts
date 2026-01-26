import { graphqlClient } from "../../src/data/graphClient";

exports.handler = async (event) => {
  const { documentId } = event.queryStringParameters;

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
  });

  return JSON.stringify(response.data);
};
