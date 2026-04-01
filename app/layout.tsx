import Providers from "@/components/Providers";
import type { Metadata } from "next";
import { Lato, Merriweather } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Rubaya Nasrin Shejuti | Climate & Development Professional",
  description:
    "Rubaya Nasrin Shejuti is a development professional specializing in climate change adaptation, environmental research, and disaster risk management across South Asia.",
  keywords: [
    "Rubaya Nasrin Shejuti",
    "Climate Change",
    "Climate Change Adaptation",
    "Environmental Research",
    "Disaster Risk Management",
    "Sustainability",
    "Bangladesh",
    "Development Professional",
    "GIS",
  ],
  authors: [{ name: "Rubaya Nasrin Shejuti" }],
  creator: "Rubaya Nasrin Shejuti",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rubaya-portfolio.vercel.app",
    title: "Rubaya Nasrin Shejuti | Climate & Development Professional",
    description:
      "Bridging rigorous environmental science with on-the-ground development practice. Explore my work in climate resilience and sustainability.",
    siteName: "Rubaya Nasrin Shejuti Portfolio",
    images: [
      {
        url: "https://rubaya-portfolio.vercel.app/profile.jpg",
        width: 800,
        height: 600,
        alt: "Rubaya Nasrin Shejuti",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rubaya Nasrin Shejuti | Climate & Development Professional",
    description:
      "Bridging rigorous environmental science with on-the-ground development practice. Explore my work in climate resilience and sustainability.",
    images: ["https://rubaya-portfolio.vercel.app/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${merriweather.variable}`}>
      <head>
        <link rel="canonical" href="https://rubaya-portfolio.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
