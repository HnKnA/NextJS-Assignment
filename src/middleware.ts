import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAdmin = req.cookies.get("isAdmin")?.value;

  if (!isAdmin || isAdmin !== "true") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

// Define the protected routes
export const config = {
  matcher: ["/admin/response"],
};
