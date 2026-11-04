"use client";

import { useEffect, useRef, useState } from "react";
import { BURST_EMOJIS, FACE, HASHTAGS, SAY, WHO, type Face, type Say, type Who } from "@/data/content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import Confetti from "./Confetti";
import { useToast } from "./Toast";

type Status = "idle" | "spinning" | "landed";

interface Shown {
  who: Who;
  say: Say;
  face: Face;
}

const rand = <T,>(list: readonly T[]): T => list[Math.floor(Math.random() * list.length)];

const pick = <T,>(list: readonly T[], not: T): T => {
  let v = rand(list);
  while (v === not && list.length > 1) v = rand(list);
  return v;
};

export default function SkitMachine() {
  const reduce = usePrefersReducedMotion();
  const toast = useToast();

  const [shown, setShown] = useState<Shown>({ who: WHO[0], say: SAY[0], face: FACE[0] });
  const [status, setStatus] = useState<Status[]>(["idle", "idle", "idle"]);
  const [spinning, setSpinning] = useState(false);
  const [spins, setSpins] = useState(0);
  const [burst, setBurst] = useState(0);

  const timers = useRef<number[]>([]);
  const ticker = useRef<number>(0);
  const locked = useRef<boolean[]>([false, false, false]);

  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      window.clearInterval(ticker.current);
    },
    [],
  );

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setStatus(["spinning", "spinning", "spinning"]);
    locked.current = [false, false, false];

    const next: Shown = {
      who: pick(WHO, shown.who),
      say: pick(SAY, shown.say),
      face: pick(FACE, shown.face),
    };

    if (!reduce) {
      ticker.current = window.setInterval(() => {
        setShown((s) => ({
          who: locked.current[0] ? s.who : rand(WHO),
          say: locked.current[1] ? s.say : rand(SAY),
          face: locked.current[2] ? s.face : rand(FACE),
        }));
      }, 70);
    }

    const stops = reduce ? [0, 0, 0] : [800, 1400, 2000];
    timers.current = stops.map((ms, i) =>
      window.setTimeout(() => {
        locked.current[i] = true;
        setShown((s) => (i === 0 ? { ...s, who: next.who } : i === 1 ? { ...s, say: next.say } : { ...s, face: next.face }));
        setStatus((st) => st.map((x, j) => (j === i ? "landed" : x)));
        if (locked.current.every(Boolean)) {
          window.clearInterval(ticker.current);
          setSpinning(false);
          setSpins((n) => n + 1);
          setBurst((n) => n + 1);
        }
      }, ms),
    );
  };

  const caption = `${shown.who.w}: “${shown.say.q}” ${shown.face.e}`;
  const gloss = `In English: ${shown.who.g} says “${shown.say.g}”`;

  const copy = async () => {
    const text = `${caption} ${HASHTAGS}`;
    const ok = "Copied. Yalla, go film it.";
    try {
      await navigator.clipboard.writeText(text);
      toast(ok);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      let good = false;
      try {
        good = document.execCommand("copy");
      } catch {
        good = false;
      }
      ta.remove();
      toast(good ? ok : "Could not copy. Select the text and copy it.");
    }
  };

  const cells = [
    { label: "Who talks", m: shown.who.w, g: shown.who.g },
    { label: "What they say", m: `“${shown.say.q}”`, g: shown.say.g },
    { label: "Your face", m: `${shown.face.e} ${shown.face.t}`, g: shown.face.g },
  ];

  return (
    <div className="machine" id="spin">
      <Confetti burst={burst} emojis={BURST_EMOJIS} />
      <h2>Yalla, spin a skit</h2>

      <div className="reels">
        {cells.map((c, i) => (
          <div key={c.label} className={`reel r${i + 1} ${status[i]}`}>
            <span className="reel-label">{c.label}</span>
            <div className="reel-win">
              <span className="m" lang="ar-Latn">{c.m}</span>
              <span className="g">{c.g}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={`cap-block ${spinning ? "dim" : ""}`} aria-live="polite">
        <p className="caption" lang="ar-Latn">{caption}</p>
        <p className="capgloss">{gloss}</p>
        <p className="tags">{HASHTAGS}</p>
      </div>

      <div className="actions">
        <button className="btn red" type="button" onClick={spin} disabled={spinning}>
          {spinning ? "Spinning…" : spins === 0 ? "Yalla, spin" : "Kamen marra"}
        </button>
        <button className="btn ghost" type="button" onClick={copy}>
          Copy caption
        </button>
      </div>
      <p className="count">Spins: {spins}</p>
    </div>
  );
}
