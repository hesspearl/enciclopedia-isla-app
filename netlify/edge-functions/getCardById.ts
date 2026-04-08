import fs from "fs";
const netlifyBaseUrl = Netlify.env.get("VITE_BASE_URL");

export default async (request: Request, context: Context) => {
  const { cardId } = context.params;
  const body = await request.json(); // parse JSON body
  const { subjectId } = body;
  const folderPath = `./src/data/stories/${subjectId}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  console.log("fetching from strapi");
  if (request.method === "POST") {
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
        signal: controller.signal,
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
      console.log(response, "response from strapi");

      clearTimeout(timeout);
      const result = await response.json();
      const data = JSON.stringify(result.data.cards[0]);
      console.log(result);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });

        fs.writeFileSync(
          `./src/data/stories/${subjectId}/${cardId}.json`,
          data,
        );
      } else {
        fs.writeFileSync(
          `./src/data/stories/${subjectId}/${cardId}.json`,
          data,
        );
      }

      return new Response(data, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error, "error fetching from strapi");
      if (fs.existsSync(folderPath)) {
        const raw = fs.readFileSync(
          `./src/data/stories/${subjectId}/${cardId}.json`,
          "utf-8",
        );
        const fallbackData = JSON.parse(raw);

        return new Response(JSON.stringify(fallbackData), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        console.log(error);

        return new Response(JSON.stringify(error), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }
  }
  console.log("fallback");

  const raw = fs.readFileSync(
    `./src/data/stories/${subjectId}/${cardId}.json`,
    "utf-8",
  );
  const fallbackData = JSON.parse(raw);

  return new Response(JSON.stringify(fallbackData), {
    headers: { "Content-Type": "application/json" },
  });
};
