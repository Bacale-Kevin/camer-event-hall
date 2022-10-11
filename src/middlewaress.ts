import { NextRequest, NextResponse } from "next/server";

import { includes } from "lodash";
import { verifyToken } from "../utils/verifyToken";

const isAdminRoute = (pathname: string) => {
  return pathname.startsWith("/api/admin");
};

const isManagerRoute = (pathname: string) => {
  return pathname.startsWith("/api/users");
};

export async function middleware(req: NextRequest) {
  const token = await req.cookies.get("token");
  const { role } = await verifyToken(token!);
  const { pathname } = req.nextUrl;

  if (isManagerRoute(pathname) && !includes(["manager", "admin"], role)) {
    return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
  }

  if (isAdminRoute(pathname) && role !== "admin") {
    return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/manager/:path*", "/api/admin/:path*"],
};
