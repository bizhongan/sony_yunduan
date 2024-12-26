import type { Metadata } from "next";
import "./globals.css";
import AudioPlayer from './components/AudioPlayer'

export const metadata: Metadata = {
  title: "Sony α7 III Gallery",
  description: "A photography portfolio showcasing moments captured with Sony α7 III",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body suppressHydrationWarning>
        <AudioPlayer />
        {children}
      </body>
    </html>
  )
}
