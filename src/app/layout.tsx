import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Testdebug — Production Frontend",
    template: "%s · Testdebug",
  },
  description:
    "Full production-ready frontend application with modules, services, auth scaffolding, and live Vercel deployment readiness.",
  keywords: ["Next.js", "React", "Vercel", "frontend", "Testdebug"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 py-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <div className="mx-auto max-w-7xl px-4">
            Testdebug · Production-ready Next.js frontend · Built for autonomous deployment on Vercel
          </div>
        </footer>
      </body>
    </html>
  );
}
