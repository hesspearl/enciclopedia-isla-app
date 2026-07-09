import { getStore } from "@netlify/blobs";
const netlifyBaseUrl = Netlify.env.get("BASE_URL");
const apiTokenSalt = Netlify.env.get("API_TOKEN_SALT");

export default async (request: Request, context: Context) => {
  const uploadsStore = getStore("file-uploads");
  let cached = await uploadsStore.get("videos");

  if (cached) {
    return new Response(cached, {
      headers: { "content-type": "application/json" },
    });
  }
  try {
    const query = `
     query VideosResources {
    videosResources {
        documentId
        title
        description
        youtube_video_id
        display_order
        thumbnail {
            url
            name
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

    await uploadsStore.set("videos", data, {
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
