import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { sidebarItems } from "@/data";
import { getInboxByUserId } from "@/data/inbox";
import { auth as getSession } from "@/auth";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);

import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  webHooks,
} from "@/routes";
const defaultInboxCategories = sidebarItems.map((item) => item.type);
export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isWebhookRoute = webHooks.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const inboxType = nextUrl.searchParams.get("type");
  // const session = await getSession();
  // if (!session) {
  //   return NextResponse.redirect(new URL("/auth/login", nextUrl));
  // }
  // const inboxIds = session.user.inboxIds;
  // if (inboxIds.length === 0 && nextUrl.pathname === "/inbox") {
  //   return NextResponse.redirect(new URL("/add-inbox", nextUrl));
  // }

  if (isWebhookRoute) {
    return NextResponse.next();
  }
  if (inboxType) {
    const isNotDefaultInboxCategory =
      inboxType.length === 0 || !defaultInboxCategories.includes(inboxType);
    if (isNotDefaultInboxCategory) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  } else if (nextUrl.search.includes("?type")) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  } else if (
    nextUrl.pathname === "/inbox" &&
    !nextUrl.searchParams.get("label") &&
    !nextUrl.searchParams.get("query")
  ) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }
  if (isApiAuthRoute) {
    return NextResponse.next();
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }
  if (isLoggedIn && isPublicRoute) {
    return NextResponse.next();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
