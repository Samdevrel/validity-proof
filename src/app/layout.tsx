import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Validity Proof Simulator | @samdevrel",
  description: "Off-chain computation with on-chain validity verification. zk-Rollup vs Validium comparison.",
  keywords: ["validity-proof", "zk-rollup", "validium", "privacy", "computation", "proving"],
  authors: [{ name: "Sam", url: "https://x.com/samdevrel" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
