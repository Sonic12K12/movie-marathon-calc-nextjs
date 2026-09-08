import { Inter, Outfit } from "next/font/google";
import "./globals.css";

// Initialize the Inter font with latin subset and custom CSS variable
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Initialize the Outfit font with latin subset and custom CSS variable
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// Global metadata for the application
export const metadata = {
  title: "WatchTime",
  description: "Movie Marathon Calculator",
  // This object replaces the vanilla HTML <meta name="robots" content="noindex, nofollow">
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
