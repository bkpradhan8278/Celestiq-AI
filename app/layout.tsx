/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata, Viewport } from "next";
import { Inter, PT_Sans } from "next/font/google";
import { cookies } from "next/headers";

import TanstackProvider from "@/components/providers/tanstack-query-provider";
import "@/assets/globals.css";
import { Toaster } from "@/components/ui/sonner";
import MY_TOKEN_KEY from "@/lib/get-cookie-name";
import { apiServer } from "@/lib/api";
import AppContext from "@/components/contexts/app-context";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  variable: "--font-ptSans-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "App Builder | Build with AI ✨",
  description:
    "App Builder is a web development tool that helps you build websites with AI, no code required. Let's deploy your website with App Builder and enjoy the magic of AI.",
  openGraph: {
    title: "App Builder | Build with AI ✨",
    description:
      "App Builder is a web development tool that helps you build websites with AI, no code required. Let's deploy your website with App Builder and enjoy the magic of AI.",
    url: "https://app-builder.com",
    siteName: "App Builder",
    images: [
      {
  url: "/favicon.svg",
        width: 1200,
        height: 630,
        alt: "App Builder Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "App Builder | Build with AI ✨",
    description:
      "App Builder is a web development tool that helps you build websites with AI, no code required. Let's deploy your website with App Builder and enjoy the magic of AI.",
  images: ["/favicon.svg"],
  },
  appleWebApp: {
    capable: true,
    title: "App Builder",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

async function getMe() {
  const cookieStore = await cookies();
  const token = cookieStore.get(MY_TOKEN_KEY())?.value;
  if (!token) return { user: null, errCode: null };
  try {
    const res = await apiServer.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { user: res.data.user, errCode: null };
  } catch (err: any) {
    return { user: null, errCode: err.status };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getMe();
  return (
    <html lang="en">
      <body className={`min-h-screen antialiased bg-black ${inter.variable} ${ptSans.variable}`}>
        <TanstackProvider>
          <AppContext me={data}>{children}</AppContext>
        </TanstackProvider>
        <Toaster richColors position="bottom-center" />
      </body>
    </html>
  );
}
