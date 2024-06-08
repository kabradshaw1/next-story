// import { NextResponse, type NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   // return NextResponse.redirect(new URL("/", request.url));
//   // if (request.nextUrl.pathname === "/time") {
//   //   return NextResponse.redirect(new URL("/hello", request.url));
//   // }
//   const response = NextResponse.next();
//   const themePreference = request.cookies.get('theme');
//   if (!themePreference) {
//     response.cookies.set('theme', 'dark');
//   }
//   response.headers.set('custom-header', 'custom-value');
//   return response;
// }

// // export const config = {
// //   matcher: "/time",
// // };
