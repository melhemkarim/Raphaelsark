"use client";

import { useState } from "react";
import {
  IRIS_FULL_AT,
  IRIS_LINES,
  IRIS_MOODS,
  TREAT_EMOJIS,
} from "@/data/content";
import Confetti from "./Confetti";
import IrisDog from "./IrisDog";
import Reveal from "./Reveal";

export default function IrisTreat() {
  const [count, setCount] = useState(0);
  const [burst, setBurst] = useState(0);

  const full = count >= IRIS_FULL_AT;
  const mood = IRIS_MOODS.find((m) => count <= m.upTo) ?? IRIS_MOODS[IRIS_MOODS.length - 1];
  const line = count > 0 && !full ? IRIS_LINES[(count - 1) % IRIS_LINES.length] : null;

  const onTreat = () => {
    if (full) {
      setCount(0);
      setBurst((b) => b + 1);
      return;
    }
    setCount((c) => c + 1);
    setBurst((b) => b + 1);
  };

  return (
    <section className="sec" id="iris">
      <Reveal>
        <h2>Iris</h2>
        <p className="intro">
          Meet Raphael’s dog, and the real boss of the house. Tap the button to give her a treat.
          She will accept all of them.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="iris">
          <div className="iris-photo">
            <Confetti burst={burst} emojis={TREAT_EMOJIS} />
            <figure className="polaroid">
              <div className="shot">
                <IrisDog count={count} burst={burst} asleep={full} treat={TREAT_EMOJIS[burst % TREAT_EMOJIS.length]} />
              </div>
              <figcaption>
                Iris <span key={mood.e} className="iris-e">{mood.e}</span>
              </figcaption>
            </figure>
          </div>

          <div className="iris-side">
            <p className="treats">
              Treats given: <strong>{count}</strong>
            </p>
            <div className="meter" aria-hidden="true">
              <i style={{ width: `${Math.min(count / IRIS_FULL_AT, 1) * 100}%` }} />
            </div>

            <div className="iris-say" aria-live="polite">
              <p className="mood">{mood.t}</p>
              {line && (
                <p className="bubble" key={count}>
                  <span className="vm" lang="ar-Latn">{line.a}</span>
                  <span className="vg">{line.g}</span>
                </p>
              )}
            </div>

            <button className={`btn ${full ? "dark" : "red"}`} type="button" onClick={onTreat}>
              {full ? "Wake Iris up" : "Give Iris a treat 🦴"}
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
