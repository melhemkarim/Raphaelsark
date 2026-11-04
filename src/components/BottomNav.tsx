"use client";

import { useActiveSection } from "@/hooks/useActiveSection";

interface Item {
  id: string;
  icon: string;
  label: string;
}

const ITEMS: readonly Item[] = [
  { id: "tiktok", icon: "🎬", label: "TikTok" },
  { id: "moteur", icon: "⚡", label: "Moteur" },
  { id: "mom", icon: "👩", label: "Mama" },
  { id: "quiz", icon: "🎯", label: "Quiz" },
  { id: "iris", icon: "🐶", label: "Iris" },
  { id: "collab", icon: "✉️", label: "Collab" },
];
const IDS = ITEMS.map((i) => i.id);

/** Thumb-reach navigation, only shown on phones. */
export default function BottomNav() {
  const active = useActiveSection(IDS);

  return (
    <nav className="bnav" aria-label="Quick links">
      {ITEMS.map((item) => (
        <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined}>
          <span className="ic" aria-hidden="true">
            {item.icon}
          </span>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
