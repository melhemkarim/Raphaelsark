"use client";

import { useState } from "react";
import { BURST_EMOJIS, MOMS } from "@/data/content";
import Confetti from "./Confetti";
import Reveal from "./Reveal";

export default function MomTranslator() {
  const [flipped, setFlipped] = useState<boolean[]>(() => MOMS.map(() => false));
  const [seen, setSeen] = useState<ReadonlySet<number>>(() => new Set<number>());
  const [burst, setBurst] = useState(0);

  const toggle = (i: number) => {
    const turningOn = !flipped[i];
    setFlipped((f) => f.map((v, j) => (j === i ? !v : v)));
    if (turningOn && !seen.has(i)) {
      const nextSeen = new Set(seen);
      nextSeen.add(i);
      setSeen(nextSeen);
      if (nextSeen.size === MOMS.length) setBurst((b) => b + 1);
    }
  };

  const allDone = seen.size === MOMS.length;

  return (
    <section className="sec relative" id="mom">
      <Confetti burst={burst} emojis={BURST_EMOJIS} />
      <Reveal>
        <h2>Tarjemet el mama</h2>
        <p className="intro">Mom translator. Tap a sentence to hear what she actually means.</p>
      </Reveal>

      <div className="moms">
        {MOMS.map((m, i) => (
          <Reveal key={m.ar} delay={i * 90}>
            <button
              type="button"
              className={`flip c${i} ${flipped[i] ? "on" : ""}`}
              aria-pressed={flipped[i]}
              onClick={() => toggle(i)}
            >
              <span className="flip-inner">
                <span className="face front">
                  <span className="ar" lang="ar-Latn">{m.ar}</span>
                  <span className="q">{m.q}</span>
                  <span className="hint">Tap to translate</span>
                </span>
                <span className="face back">
                  <span className="lbl">What she really means</span>
                  <span className="meaning">{m.m}</span>
                  <span className="hint">Tap to flip back</span>
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <p className="decoded" aria-live="polite">
        {allDone
          ? `Decoded ${seen.size} of ${MOMS.length}. You’re fluent in mom. Bravo!`
          : `Decoded ${seen.size} of ${MOMS.length}`}
      </p>
    </section>
  );
}
