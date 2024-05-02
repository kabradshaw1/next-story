import { headers } from "next/headers";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const headersList = headers();
  console.log(headersList.get("Authorization"));
  console.log(requestHeaders.get("Authorization"));
  return new Response("Hello, world!");
}
