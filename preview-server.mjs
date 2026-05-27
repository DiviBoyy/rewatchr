import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "preview");
const publicRoot = join(process.cwd(), "public");
const port = Number(process.env.PORT || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://localhost:${port}`);
    const pathname = decodeURIComponent(url.pathname);
    const base = pathname.startsWith("/rewatchr-logo.png") || pathname.startsWith("/home-characters.png") ? publicRoot : root;
    const file = pathname === "/" ? "index.html" : pathname === "/login" ? "login/index.html" : pathname === "/anime" ? "anime/index.html" : pathname.replace(/^\/+/, "");
    const target = normalize(join(base, file));
    const body = await readFile(target);
    response.writeHead(200, { "Content-Type": types[extname(target)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(port, () => {
  console.log(`Rewatchr preview running at http://localhost:${port}`);
});
