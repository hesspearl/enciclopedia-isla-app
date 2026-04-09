import { getStore } from "@netlify/blobs";
const netlifyBaseUrl = Netlify.env.get("VITE_BASE_URL");

export default async (request: Request, context: Context) => {
  const { cardId } = context.params;
  const uploadsStore = getStore("file-uploads");
  const key = cardId;
  let cached = await uploadsStore.get(key);

  if (cached) {
    return new Response(cached, {
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const query = `
      query Cards($filters: CardFiltersInput) {
  cards(filters: $filters) {
    card_id
      subject {
      subject_id
    
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

    let result;
    result = await response.json();
    const card = result.data.cards[0];
    const data = JSON.stringify(card);

    await uploadsStore.set(key, data, {
      metadata: { country: context.geo.country.name },
    });

    return new Response(data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
