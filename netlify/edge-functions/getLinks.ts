import { getStore } from "@netlify/blobs";
import { apiTokenSalt, netlifyBaseUrl } from "./base";

export default async (request: Request, context: Context) => {
  const uploadsStore = getStore("file-uploads");
  let cached = await uploadsStore.get("Links");

  if (cached) {
    return new Response(cached, {
      headers: { "content-type": "application/json" },
    });
  }
  try {
    const query = `
    query DescriptionsOfLinks {
    descriptionsOfLinks {
        documentId
        title
        description
        thumbnail {
            name
            url
        }
        external_link_text {
            documentId
               label
            external_link_address
        }
    }
}
    `;

    const response = await fetch(`${netlifyBaseUrl}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=600",
        Authorization: `Bearer ${apiTokenSalt}`,
      },
      body: JSON.stringify({ query }),
    });

    let result;
    result = await response.json();
    const videos = result.data;
    const data = JSON.stringify(videos);

    await uploadsStore.set("Links", data, {
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
