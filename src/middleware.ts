import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROUTE_LIST_PROTECTED = ["/"];
const ROUTE_LIST = ["/auth/login", "/auth/signup"];
export async function middleware(request: NextRequest) {
  const token = await request.cookies.get("token");
  const url = request.nextUrl.clone();


  if (ROUTE_LIST_PROTECTED.includes(url.pathname)) {
    if (!token) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  if (ROUTE_LIST.includes(url.pathname)) {
    if (token) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
