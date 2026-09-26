import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LangProvider } from "@/i18n/LangContext";

export const metadata: Metadata = {
  title: "Truck Trip Khata",
  description: "Every Trip. Every Rupee. Clearly Tracked.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Truck Trip Khata" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1A1D35",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased"><LangProvider>{children}</LangProvider></body>
    </html>
  );
}
