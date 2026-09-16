// Link previews for shared events.
//
// The share id used to live in the URL fragment (#id) — which browsers never transmit,
// so iMessage/Slack/Twitter could only ever read the static <title> ("OVD — Event").
// Links now carry ?e=<id>, which IS server-visible, and this injects the real title and
// OpenGraph tags before the HTML reaches the crawler.
//
// Only the event NAME is exposed — never totals, items or the password.

export default async (request, context) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("e");
  const res = await context.next();
  if (!id) return res;

  let name = null;
  try {
    const r = await fetch(
      "https://bvftcotmjmoijunnpjdh.supabase.co/functions/v1/ovd-budget?id=" + encodeURIComponent(id),
      { headers: { "Content-Type": "application/json" } },
    );
    if (r.ok) name = (await r.json())?.name || null;
  } catch (_) { /* fall through to the static title */ }
  if (!name) return res;

  const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const title = "OVD — " + esc(name);
  const desc = "Shared event sheet · WHATHAPPENEDTOGOD";

  let html = await res.text();
  html = html.replace(/<title>[\s\S]*?<\/title>/i, "<title>" + title + "</title>");
  html = html.replace(
    /<\/head>/i,
    '<meta property="og:title" content="' + title + '">' +
    '<meta property="og:description" content="' + desc + '">' +
    '<meta property="og:type" content="website">' +
    '<meta property="og:url" content="' + esc(url.href) + '">' +
    '<meta property="og:image" content="https://whathappenedtogod.dev/icon-512.png">' +
    '<meta name="twitter:card" content="summary">' +
    '<meta name="twitter:title" content="' + title + '">' +
    '<meta name="twitter:description" content="' + desc + '">' +
    "</head>",
  );
  return new Response(html, {
    status: res.status,
    headers: { ...Object.fromEntries(res.headers), "content-type": "text/html; charset=utf-8" },
  });
};

export const config = { path: "/budget.html" };
