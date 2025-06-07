import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    const token = req.nextauth.token;

    if (pathname.startsWith("/teacher") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, 
    },
  }
);

export const config = {
  matcher: [
    "/((?!login|register|api/uploadthing(?:.*)?|api/pagos(?:.*)?|api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
