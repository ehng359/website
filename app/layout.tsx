import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const inter = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edward Ng: Website & Portfolio",
  description: "What's new with Edward Ng?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
