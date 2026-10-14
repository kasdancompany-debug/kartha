import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { ReducedMotionProvider } from "@/components/system/ReducedMotionProvider";
import { MotionProvider } from "@/components/system/MotionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Katha — A land of a million stories. Now one is theirs.",
  description:
    "Katha is a personalised, illustrated children's story, written with your child as the hero.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <MotionProvider>
          <ReducedMotionProvider>{children}</ReducedMotionProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
