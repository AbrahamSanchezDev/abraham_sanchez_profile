import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Barlow, Orbitron, Share_Tech_Mono } from "next/font/google";
import { getProfile, isLang, LANGS } from "../lib/data";
import { applyTheme, defaults, STORAGE_KEY, type Nav } from "../lib/theme";
import "../globals.css";

const body = Barlow({ variable: "--nf-body", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const display = Orbitron({ variable: "--nf-display", subsets: ["latin"], weight: ["500", "700", "900"] });
const mono = Share_Tech_Mono({ variable: "--nf-mono", subsets: ["latin"], weight: "400" });

export const dynamicParams = false; // only /en and /es exist
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const { person } = getProfile(lang);
  const title = `${person.name} — ${person.headline}`;
  return {
    title,
    description: person.tagline,
    openGraph: { title, description: person.tagline, type: "profile" },
    alternates: { languages: Object.fromEntries(LANGS.map((l) => [l, `/${l}`])) },
  };
}

// Runs before paint so saved theme/nav never flash.
const themeScript = `try{var t=JSON.parse(localStorage.getItem(${JSON.stringify(STORAGE_KEY)})||"null");if(t)(${applyTheme.toString()})(t)}catch(e){}`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const { site } = getProfile(lang);
  const initial = defaults(site.defaultTheme, site.defaultNav as Nav);

  return (
    <html
      lang={lang}
      data-mode={initial.mode}
      data-nav={initial.nav}
      data-motion="on"
      style={{ "--accent": initial.accent, "--accent-2": initial.accent2 } as React.CSSProperties}
      className={`${body.variable} ${display.variable} ${mono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
