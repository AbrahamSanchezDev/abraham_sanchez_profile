import { NextResponse, type NextRequest } from "next/server";

/** "/" -> "/es" when the browser prefers Spanish, otherwise "/en". */
export function proxy(request: NextRequest) {
  // ponytail: first-language check only; use a locale matcher if more languages are added
  const lang = request.headers.get("accept-language")?.trim().toLowerCase().startsWith("es") ? "es" : "en";
  return NextResponse.redirect(new URL(`/${lang}`, request.url));
}

export const config = { matcher: "/" };
