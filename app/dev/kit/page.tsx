import type { Metadata } from "next";
import { Lockup } from "@/components/brand/Lockup";
import { Wordmark } from "@/components/brand/Wordmark";
import { ThresholdMark } from "@/components/brand/ThresholdMark";
import { worldList } from "@/content/worlds";
import { companionList } from "@/content/companions";
import { themeList } from "@/content/themes";
import { DropCap } from "@/components/book/DropCap";

export const metadata: Metadata = {
  title: "Katha — Brand system",
  robots: { index: false, follow: false },
};

const colorTokens: { token: string; hex: string; inspiration: string }[] = [
  { token: "--paper", hex: "#F3EAD8", inspiration: "handmade cotton-rag paper" },
  { token: "--paper-shade", hex: "#E4D6BC", inspiration: "page shadow / fold" },
  { token: "--ink", hex: "#1C1A17", inspiration: "lamp-black ink" },
  { token: "--kattha", hex: "#6B3A2A", inspiration: "catechu brown (a quiet pun on the name)" },
  { token: "--indigo", hex: "#22305A", inspiration: "indigo dye, night skies" },
  { token: "--turmeric", hex: "#E0A526", inspiration: "turmeric yellow, highlights, gold-foil stand-in" },
  { token: "--laterite", hex: "#B5452B", inspiration: "laterite red earth" },
  { token: "--leaf", hex: "#3F6B3A", inspiration: "leaf green" },
  { token: "--peacock", hex: "#14646B", inspiration: "deep teal" },
  { token: "--night", hex: "#0F1424", inspiration: "landing sky" },
];

const typeScale: { label: string; token: string; sample: string; sampleHi: string }[] = [
  { label: "Display", token: "--fs-display", sample: "Every story", sampleHi: "हर कहानी" },
  { label: "H1", token: "--fs-h1", sample: "Every story is waiting", sampleHi: "हर कहानी इंतज़ार कर रही है" },
  { label: "H2", token: "--fs-h2", sample: "Who will yours be?", sampleHi: "तुम्हारी कौन होगी?" },
  { label: "Body", token: "--fs-body", sample: "Tonight, Lochlan begins an adventure.", sampleHi: "आज रात, लोचलन का सफ़र शुरू होता है।" },
  { label: "Label", token: "--fs-label", sample: "Launch price · ₹199", sampleHi: "लॉन्च मूल्य · ₹१९९" },
];

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="mb-8 border-b border-ink/15 pb-4">
      <p className="text-[var(--fs-label)] uppercase tracking-label text-kattha">{eyebrow}</p>
      <h2 className="font-serif text-[var(--fs-h1)]">{title}</h2>
    </header>
  );
}

export default function DevKitPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="paper-texture pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />

      {/* Cover */}
      <section className="flex flex-col gap-6 px-6 py-20 sm:px-12 lg:px-20">
        <Lockup variant="full" size={56} />
        <h1 className="font-serif text-[var(--fs-display)] leading-[1.05]">Brand system</h1>
        <p className="max-w-[48ch] text-[var(--fs-h2)] font-serif italic text-ink/80">
          A land of a million stories. Now one is theirs.
        </p>
        <p className="max-w-[60ch] text-[var(--fs-body)] text-ink/70">
          India has always told children extraordinary stories. Katha puts the child inside them. This page is the
          living reference for every token, typeface, texture and mark used across the product — not a component
          library, a publisher&rsquo;s style guide.
        </p>
      </section>

      {/* Logo states */}
      <section className="px-6 py-16 sm:px-12 lg:px-20">
        <SectionHeading eyebrow="Part B.2" title="The Threshold — logo states" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <figure className="flex flex-col items-center gap-4 border border-ink/15 p-8">
            <ThresholdMark size={64} />
            <figcaption className="text-[var(--fs-label)] uppercase tracking-label text-ink/60">
              Symbol — static
            </figcaption>
          </figure>
          <figure className="flex flex-col items-center gap-4 border border-ink/15 bg-night p-8 text-turmeric">
            <ThresholdMark size={64} loop />
            <figcaption className="text-[var(--fs-label)] uppercase tracking-label text-paper/60">
              Symbol — weaving loader
            </figcaption>
          </figure>
          <figure className="flex flex-col items-center justify-center gap-4 border border-ink/15 p-8">
            <Wordmark lang="en" className="text-[var(--fs-h1)]" />
            <figcaption className="text-[var(--fs-label)] uppercase tracking-label text-ink/60">
              Wordmark — Latin
            </figcaption>
          </figure>
          <figure className="flex flex-col items-center justify-center gap-4 border border-ink/15 p-8">
            <Wordmark lang="hi" className="text-[var(--fs-h1)]" />
            <figcaption className="text-[var(--fs-label)] uppercase tracking-label text-ink/60">
              Secondary lockup — Devanagari
            </figcaption>
          </figure>
        </div>
        <div className="mt-8 flex flex-col gap-6 border border-ink/15 bg-ink p-10 text-paper sm:flex-row sm:items-center sm:gap-10">
          <ThresholdMark size={88} className="shrink-0" />
          <div className="flex flex-col gap-2">
            <Wordmark lang="en" className="text-[var(--fs-h1)]" />
            <Wordmark lang="hi" className="text-[var(--fs-h2)] opacity-70" />
          </div>
        </div>
        <p className="mt-4 max-w-[60ch] text-[var(--fs-label)] text-ink/60">
          The crossbar of the second A is a hand-drawn thin line, not the live glyph&rsquo;s bar — the character
          itself stays in the DOM (text-transparent) so the word is still real, accessible, indexable text.
        </p>
      </section>

      {/* Colour */}
      <section className="px-6 py-16 sm:px-12 lg:px-20">
        <SectionHeading eyebrow="Part B.3" title="Natural pigments" />
        <div className="grid grid-cols-2 gap-px bg-ink/10 sm:grid-cols-3 lg:grid-cols-5">
          {colorTokens.map((c) => (
            <div key={c.token} className="flex flex-col gap-3 bg-paper p-6">
              <div className="h-16 w-full border border-ink/15" style={{ background: c.hex }} />
              <div>
                <p className="font-serif text-[var(--fs-body)]">{c.token}</p>
                <p className="text-[var(--fs-label)] uppercase tracking-label text-ink/50">{c.hex}</p>
                <p className="mt-1 text-[var(--fs-label)] text-ink/60">{c.inspiration}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-[60ch] text-[var(--fs-label)] text-ink/60">
          Gradients only ever represent real light (a lantern, dawn) — never UI decoration. No purple/blue
          gradients, no glassmorphism, no glowing orbs (Part 0.2).
        </p>
      </section>

      {/* Typography */}
      <section className="px-6 py-16 sm:px-12 lg:px-20">
        <SectionHeading eyebrow="Part B.4" title="Type scale — Latin + Devanagari ready" />
        <div className="flex flex-col divide-y divide-ink/10 border-y border-ink/15">
          {typeScale.map((t) => (
            <div key={t.token} className="grid grid-cols-1 gap-2 py-6 lg:grid-cols-[120px_1fr]">
              <p className="text-[var(--fs-label)] uppercase tracking-label text-kattha">
                {t.label}
                <span className="block text-ink/40">{t.token}</span>
              </p>
              <div className="flex flex-col gap-2">
                <p className="font-serif" style={{ fontSize: `var(${t.token})` }}>
                  {t.sample}
                </p>
                <p lang="hi" className="font-serif" style={{ fontSize: `var(${t.token})` }}>
                  {t.sampleHi}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <p className="text-[var(--fs-label)] uppercase tracking-label text-ink/50">Story / display serif</p>
            <p className="font-serif text-[var(--fs-h2)]">Tiro Devanagari Hindi</p>
          </div>
          <div>
            <p className="text-[var(--fs-label)] uppercase tracking-label text-ink/50">Supporting sans</p>
            <p className="font-sans text-[var(--fs-h2)]">Anek Latin / Anek Devanagari</p>
          </div>
          <div>
            <p className="text-[var(--fs-label)] uppercase tracking-label text-ink/50">
              Handwriting accent <span className="italic">(placeholder, one use only)</span>
            </p>
            <p className="text-[var(--fs-body)] text-ink/70">
              Caveat — reserved for &ldquo;Created especially for ___&rdquo; on the cover and share card (Part E.2,
              Phase 5). Not loaded here: this page only ships the fonts it actually renders.
            </p>
          </div>
        </div>
        <p className="mt-6 max-w-[60ch] text-[var(--fs-label)] text-ink/60">
          Body text is set like a real book: max 34ch, a drop cap in <span className="text-kattha">--kattha</span> on
          the first word of each chapter. Devanagari runs ~1.15× the line-height of Latin and carries no added
          letter-spacing.
        </p>
        <DropCap className="mt-2 max-w-[34ch] border-l-2 border-kattha pl-4 font-serif text-[var(--fs-body)]">
          Tonight, Lochlan begins an adventure, the first page of a book that has never existed before and will never
          exist again &mdash; because it was written for one hero only.
        </DropCap>
      </section>

      {/* Texture & material */}
      <section className="px-6 py-16 sm:px-12 lg:px-20">
        <SectionHeading eyebrow="Part B.5" title="Texture & material" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <figure className="flex flex-col gap-3">
            <div className="relative h-40 w-full border border-ink/15 bg-paper">
              <div className="paper-texture absolute inset-0" />
            </div>
            <figcaption className="text-[var(--fs-label)] uppercase tracking-label text-ink/60">
              Paper fibre — tiled 256×256 PNG, multiply @ 0.35
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-3">
            <div className="relative flex h-40 w-full items-center justify-center overflow-hidden border border-ink/15 bg-paper">
              <span
                className="absolute h-24 w-24 rounded-full bg-laterite"
                style={{ transform: "translate(6px, 8px)" }}
                aria-hidden="true"
              />
              <span className="absolute h-24 w-24 rounded-full border-[2.5px] border-ink" aria-hidden="true" />
            </div>
            <figcaption className="text-[var(--fs-label)] uppercase tracking-label text-ink/60">
              Print misregistration — fill sits 1&ndash;2px off the line-art
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-3">
            <div
              className="h-40 w-full border border-ink/15 bg-turmeric"
              style={{
                clipPath:
                  "polygon(2% 4%, 12% 0%, 30% 3%, 48% 0%, 64% 2%, 80% 0%, 94% 3%, 100% 10%, 97% 30%, 100% 55%, 96% 78%, 100% 96%, 85% 100%, 60% 97%, 40% 100%, 18% 97%, 0% 100%, 3% 70%, 0% 45%, 3% 20%)",
              }}
            />
            <figcaption className="text-[var(--fs-label)] uppercase tracking-label text-ink/60">
              Deckled edge — torn-paper clipPath (no rounded rectangles)
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Content pipeline: companions, worlds, themes */}
      <section className="px-6 py-16 sm:px-12 lg:px-20">
        <SectionHeading eyebrow="Part B.6 - B.8" title="Companions, worlds & themes" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div>
            <p className="mb-3 text-[var(--fs-label)] uppercase tracking-label text-ink/50">
              Companions ({companionList.length})
            </p>
            <ul className="flex flex-col gap-3">
              {companionList.map((c) => (
                <li key={c.id} className="border-l-2 border-kattha pl-3">
                  <p className="font-serif text-[var(--fs-body)]">{c.name}</p>
                  <p className="text-[var(--fs-label)] text-ink/60">{c.personalityLine}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[var(--fs-label)] uppercase tracking-label text-ink/50">
              Worlds ({worldList.length})
            </p>
            <ul className="flex flex-col gap-3">
              {worldList.map((w) => (
                <li key={w.id} className="border-l-2 border-peacock pl-3">
                  <p className="font-serif text-[var(--fs-body)]">{w.name}</p>
                  <p className="text-[var(--fs-label)] text-ink/60">{w.tradition}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[var(--fs-label)] uppercase tracking-label text-ink/50">
              Themes ({themeList.length})
            </p>
            <ul className="flex flex-col gap-3">
              {themeList.map((t) => (
                <li key={t.id} className="border-l-2 border-leaf pl-3">
                  <p className="font-serif text-[var(--fs-body)]">{t.name}</p>
                  <p className="text-[var(--fs-label)] text-ink/60">{t.sealMotif}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 max-w-[70ch] text-[var(--fs-label)] text-ink/60">
          Every world and companion carries{" "}
          <code className="text-kattha">{"// INDIAN CULTURAL CONSULTANT REVIEW REQUIRED"}</code> notes where the art
          touches a specific tradition, region or symbol — logged in{" "}
          <code className="text-kattha">/content/CULTURAL_REVIEW.md</code> and signed off before any asset ships to
          real customers.
        </p>
      </section>

      <footer className="border-t border-ink/15 px-6 py-10 text-[var(--fs-label)] text-ink/50 sm:px-12 lg:px-20">
        Made in India with Indian artists. Phase 1 — foundations.
      </footer>
    </main>
  );
}
