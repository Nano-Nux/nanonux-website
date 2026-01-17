import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NANO NUX | Premium Tech Solutions & Software Development",
  description: "Transform your business with cutting-edge software development, AI solutions, IoT systems, and premium tech consulting. Custom web apps, SaaS platforms, mobile development, and enterprise automation.",
  keywords: "software development, web development, mobile app development, SaaS, AI solutions, IoT, automation, consulting, tech solutions, custom software",
  authors: [{ name: "NANO NUX" }],
  openGraph: {
    title: "NANO NUX | Premium Tech Solutions & Software Development",
    description: "Transform your business with cutting-edge software development, AI solutions, IoT systems, and premium tech consulting.",
    type: "website",
    locale: "en_US",
    siteName: "NANO NUX",
  },
  twitter: {
    card: "summary_large_image",
    title: "NANO NUX | Premium Tech Solutions",
    description: "Transform your business with cutting-edge software development and AI solutions.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
