const netlifyBaseUrl = Netlify.env.get("VITE_BASE_URL");

export default async (request: Request, context: Context) => {
  try {
    const { cardId } = context.params;

    const query = `
      query Cards($filters: CardFiltersInput) {
  cards(filters: $filters) {
    card_id
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
  }
}
    `;

    const response = await fetch(`${netlifyBaseUrl}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=600",
        Authorization: `Bearer ${Netlify.env.get("VITE_API_TOKEN_SALT")}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          filters: {
            card_id: { eq: cardId },
          },
        },
      }),
    });

    const result = await response.json();

    return new Response(JSON.stringify(result.data.cards[0]), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
