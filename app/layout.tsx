import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rewatchr | Track. Rate. Rewatch.",
  description: "A dark anime tracker for watchlists, ratings, rewatch picks, and mock AI recommendations."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
