import { headers, cookies } from "next/headers";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const headersList = headers();
  const Cookies = cookies().set("resultsPerPage", "20");
  const theme = request.cookies.get("theme");
  console.log(theme);
  console.log(headersList.get("Authorization"));
  console.log(requestHeaders.get("Authorization"));
  console.log(Cookies.get("resultsPerPage"));
  return new Response("Hello, world!", {
    headers: { "Content-Type": "text/html", "Set-Cookie": "theme=dark" },
  });
}
