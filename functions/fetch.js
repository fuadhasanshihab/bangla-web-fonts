export async function onRequestGet(context) {
  const { request } = context;

  const { searchParams } = new URL(request.url);
  const target = searchParams.get("url");
  if (!target) return new Response("Missing ?url", { status: 400 });

  try {
    const res = await fetch(target, { redirect: "follow" });
    const html = await res.text();

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response("Failed to fetch target site.", { status: 500 });
  }
}
