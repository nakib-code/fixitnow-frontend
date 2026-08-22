import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "sonner";

import QueryProvider from "@/providers/query-provider";
import ThemeProvider from "@/providers/theme-provider";
import AuthProvider from "@/providers/auth-provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "FixItNow",
  description: "Home Service Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <body suppressHydrationWarning>
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>
              <ThemeProvider>{children}</ThemeProvider>
              <Toaster richColors position="top-right" />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
