// we observed that with the build and start production, the cacheing prevents the time from updating
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ time: new Date().toLocaleTimeString() });
}
