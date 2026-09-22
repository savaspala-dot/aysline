import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AysLine | Sınırları Aşan Lojistik",
  description: "Kara, hava ve deniz taşımacılığında güvenilir global çözüm ortağınız.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={`${dmSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
      lang="tr"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
