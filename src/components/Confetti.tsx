"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Particle {
  id: number;
  e: string;
  x: number;
  y: number;
  r: number;
  dl: number;
}

interface ConfettiProps {
  /** Increase this number to fire a new burst. */
  burst: number;
  emojis: readonly string[];
}

export default function Confetti({ burst, emojis }: ConfettiProps) {
  const reduce = usePrefersReducedMotion();
  const [parts, setParts] = useState<Particle[]>([]);

  useEffect(() => {
    if (burst === 0 || reduce) return;
    const count = 18;
    const next: Particle[] = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const dist = 110 + Math.random() * 130;
      return {
        id: burst * 100 + i,
        e: emojis[i % emojis.length],
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 40,
        r: (Math.random() - 0.5) * 540,
        dl: Math.random() * 120,
      };
    });
    setParts(next);
    const t = window.setTimeout(() => setParts([]), 1500);
    return () => window.clearTimeout(t);
  }, [burst, emojis, reduce]);

  if (parts.length === 0) return null;

  return (
    <div className="confetti" aria-hidden="true">
      {parts.map((p) => (
        <i
          key={p.id}
          style={
            { "--x": `${p.x}px`, "--y": `${p.y}px`, "--r": `${p.r}deg`, "--dl": `${p.dl}ms` } as CSSProperties
          }
        >
          {p.e}
        </i>
      ))}
    </div>
  );
}
