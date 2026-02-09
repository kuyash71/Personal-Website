import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "./src/i18n/config";

const LEGACY_SEGMENT_MAP: Record<string, string> = {
  "gunes-uclemesi": "sun-trilogy",
  "projeler": "projects",
  "iletisim": "contact"
};

function mapLegacySegment(value: string): string {
  return LEGACY_SEGMENT_MAP[value] ?? value;
}

function normalizePath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${defaultLocale}`;
  }

  if (isLocale(segments[0])) {
    if (segments[1]) {
      segments[1] = mapLegacySegment(segments[1]);
    }

    return `/${segments.join("/")}`;
  }

  segments[0] = mapLegacySegment(segments[0]);
  return `/${defaultLocale}/${segments.join("/")}`;
}

export function middleware(request: NextRequest): NextResponse {
  const pathname = request.nextUrl.pathname;
  const normalized = normalizePath(pathname);

  if (normalized !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = normalized;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"]
};
