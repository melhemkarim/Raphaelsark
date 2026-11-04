"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { BURST_EMOJIS, FACE } from "@/data/content";
import Confetti from "./Confetti";
import { useToast } from "./Toast";

const COLORS = ["#FF4132", "#8FA3FF", "#2FD08A", "#FF9AC1", "#FFFFFF", "#FFD21F", "#8FA3FF", "#FF9A3C", "#2FD08A"];
const colorOf = (i: number): CSSProperties => ({ "--mc": COLORS[i % COLORS.length] }) as CSSProperties;

export default function MoodBoard() {
  const [idx, setIdx] = useState<number | null>(null);
  const [burst, setBurst] = useState(0);
  const [trail, setTrail] = useState<string[]>([]);
  const toast = useToast();

  const face = idx === null ? null : FACE[idx];
  const confetti = useMemo(() => (face ? [face.e, face.e, "✨"] : BURST_EMOJIS), [face]);

  const pick = async (i: number) => {
    const f = FACE[i];
    setIdx(i);
    setBurst((b) => b + 1);
    setTrail((t) => [...t, f.e].slice(-6));
    try {
      await navigator.clipboard.writeText(`${f.e} ${f.t}`);
      toast("Copied. Paste it in the group chat.");
    } catch {
      /* clipboard blocked, the sticker still shows */
    }
  };

  return (
    <div className="board" id="mood">
      <Confetti burst={burst} emojis={confetti} />
      <h2>Shu el mood?</h2>
      <p className="intro">Tap your mood. It lands on screen and gets copied, ready for the group chat.</p>

      <div className="sticker" aria-live="polite" data-on={face ? "1" : undefined} style={idx === null ? undefined : colorOf(idx)}>
        {face ? (
          <span key={burst} className="sticker-in" style={{ "--r": burst % 2 ? "-3deg" : "3deg" } as CSSProperties}>
            <span className="se" aria-hidden="true">{face.e}</span>
            <span className="st" lang="ar-Latn">{face.t}</span>
            <span className="sg">{face.g}</span>
          </span>
        ) : (
          <span className="sg">Pick a mood below 👇</span>
        )}
      </div>

      <div className="moods">
        {FACE.map((f, i) => (
          <button key={f.t} type="button" className="mbtn" style={colorOf(i)} onClick={() => pick(i)}>
            <span className="me" aria-hidden="true">{f.e}</span>
            <span lang="ar-Latn">{f.t}</span>
            <small>{f.g}</small>
          </button>
        ))}
      </div>

      {trail.length > 0 && (
        <p className="trail" aria-hidden="true">
          Your mood today: {trail.join(" ")}
        </p>
      )}
    </div>
  );
}
