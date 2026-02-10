import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SELECT_ROLE_PATH = "/select-role";
const LOGIN_PATH = "/login";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/usaha",
  "/karyawan",
  "/jadwal",
  "/leave",
  "/tim",
  "/performa",
  "/account",
  "/select-role",
];

const buildRedirect = (request: NextRequest, path: string, error?: string) => {
  const url = request.nextUrl.clone();
  url.pathname = path;
  if (error) {
    url.searchParams.set("error", error);
  } else {
    url.searchParams.delete("error");
  }
  return NextResponse.redirect(url);
};

const shouldProtect = (pathname: string) =>
  PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

const getApiBaseUrl = (request: NextRequest) =>
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? request.nextUrl.origin;

const fetchContext = async (request: NextRequest) => {
  const baseUrl = getApiBaseUrl(request);
  const url = new URL("/api/context", baseUrl);
  const response = await fetch(url, {
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
  });

  if (!response.ok) {
    return { status: response.status, data: null as null };
  }

  return { status: response.status, data: (await response.json()) as any };
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (!shouldProtect(pathname)) {
    return NextResponse.next();
  }

  // If there are no cookies on the frontend request, we cannot validate backend session here.
  // Allow the request and let client-side guard handle it after hydration.
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) {
    return NextResponse.next();
  }

  const context = await fetchContext(request);
  if (context.status === 401) {
    return buildRedirect(request, LOGIN_PATH, "unauthenticated");
  }

  if (!context.data) {
    return buildRedirect(request, LOGIN_PATH, "unauthenticated");
  }

  const roles = Array.isArray(context.data.roles) ? context.data.roles : [];
  const roleCodes = roles.map((role: { role_code: string }) => role.role_code);
  const activeRole = context.data.active_role ?? null;

  if (pathname.startsWith(SELECT_ROLE_PATH)) {
    if (!roleCodes.length && request.nextUrl.searchParams.get("error") !== "no_roles") {
      return buildRedirect(request, SELECT_ROLE_PATH, "no_roles");
    }
    return NextResponse.next();
  }

  if (!activeRole) {
    return buildRedirect(request, SELECT_ROLE_PATH, "no_active_role");
  }

  if (!roleCodes.includes(activeRole)) {
    return buildRedirect(request, SELECT_ROLE_PATH, "invalid_role");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/usaha/:path*",
    "/karyawan/:path*",
    "/jadwal/:path*",
    "/leave/:path*",
    "/tim/:path*",
    "/performa/:path*",
    "/account/:path*",
    "/select-role",
  ],
};
