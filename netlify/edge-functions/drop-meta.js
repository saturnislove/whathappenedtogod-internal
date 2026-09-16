// Link previews for factory drop links.
//
// Drop ids used to ride the URL fragment (#id), which crawlers never see —
// every shared link previewed as a bare "OVD — Production Schedule". Links now
// carry ?d=<id>; this injects the drop's real name, date and cover photo into
// the HTML before it reaches iMessage/WeChat/Slack.
//
// Exposes only the drop NAME, DATE and cover image — no quantities or notes.

export default async (request, context) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("d");
  const res = await context.next();
  if (!id) return res;

  let drop = null;
  try {
    const r = await fetch(
      "https://bvftcotmjmoijunnpjdh.supabase.co/functions/v1/ovd-drop?id=" + encodeURIComponent(id),
      { headers: { "Content-Type": "application/json" } },
    );
    if (r.ok) drop = await r.json();
  } catch (_) { /* fall through to the static tags */ }
  if (!drop || !drop.title) return res;

  const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const title = esc(drop.title) + " — OVD";
  let when = "";
  if (drop.date) {
    try {
      when = new Date(drop.date + "T12:00:00").toLocaleDateString("en-US",
        { month: "short", day: "numeric" }).toUpperCase() + " · ";
    } catch (_) {}
  }
  const desc = when + "production schedule · WHATHAPPENEDTOGOD";
  const photos = Array.isArray(drop.photos) ? drop.photos : [];
  const cover = (photos[0] && photos[0].url) || "https://whathappenedtogod.dev/icon-512.png";
  const cardType = photos[0] && photos[0].url ? "summary_large_image" : "summary";

  let html = await res.text();
  html = html.replace(/<title>[\s\S]*?<\/title>/i, "<title>" + title + "</title>");
  html = html
    .replace(/<meta property="og:title" content="[^"]*">/i,
      '<meta property="og:title" content="' + title + '">')
    .replace(/<meta property="og:description" content="[^"]*">/i,
      '<meta property="og:description" content="' + esc(desc) + '">')
    .replace(/<meta property="og:image" content="[^"]*">/i,
      '<meta property="og:image" content="' + esc(cover) + '">')
    .replace(/<meta name="twitter:card" content="[^"]*">/i,
      '<meta name="twitter:card" content="' + cardType + '">');
  html = html.replace(/<\/head>/i,
    '<meta property="og:type" content="website">' +
    '<meta property="og:url" content="' + esc(url.origin + url.pathname + "?d=" + id) + '">' +
    '<meta name="twitter:title" content="' + title + '">' +
    '<meta name="twitter:description" content="' + esc(desc) + '">' +
    '<meta name="twitter:image" content="' + esc(cover) + '">' +
    "</head>");
  return new Response(html, {
    status: res.status,
    headers: { ...Object.fromEntries(res.headers), "content-type": "text/html; charset=utf-8" },
  });
};

export const config = { path: "/drop.html" };
