//define protected routes

import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ["/admin"];

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const session = getSessionCookie(request, { cookiePrefix: "app" });

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathName === route || pathName.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !session) {
    //redirect the user to the auth page
    //because user is not logged in
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
