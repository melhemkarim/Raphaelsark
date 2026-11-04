"use client";

import { useState } from "react";
import { APPS, VERDICTS } from "@/data/content";
import { useCountUp } from "@/hooks/useCountUp";
import Reveal from "./Reveal";

const BASE_FEE = 25;
const BASE_RATE = 0.35;
const DAYS = 30;

export default function GeneratorBill() {
  const [hours, setHours] = useState(6);
  const [on, setOn] = useState<boolean[]>(() => APPS.map((a) => a.on));

  const rate = APPS.reduce((total, app, i) => total + (on[i] ? app.r : 0), 0);
  const bill = Math.round(BASE_FEE + hours * DAYS * (BASE_RATE + rate));
  const shownBill = useCountUp(bill);

  const pct = Math.min(bill / 1000, 1);
  const verdictIndex = VERDICTS.findIndex((v) => bill < v.max);
  const verdict = VERDICTS[verdictIndex === -1 ? VERDICTS.length - 1 : verdictIndex];
  const hot = pct >= 0.5;

  return (
    <section className="sec" id="moteur">
      <Reveal>
        <h2>Fatoret el moteur</h2>
        <p className="intro">
          The generator bill. Pick how long it runs and what’s plugged in. Made-up numbers, real
          feelings.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="gen">
          <div className={`gauge ${hot ? "hot" : ""}`}>
            <svg viewBox="0 0 240 140" role="img" aria-label="Bill gauge from low to high">
              <path d="M20 120 A100 100 0 0 1 220 120" fill="none" stroke="var(--line)" strokeWidth="34" strokeLinecap="round" />
              <path d="M20 120 A100 100 0 0 1 69.2 33.8" fill="none" stroke="#2FD08A" strokeWidth="22" />
              <path d="M69.2 33.8 A100 100 0 0 1 168.2 32.4" fill="none" stroke="#FFD21F" strokeWidth="22" />
              <path d="M168.2 32.4 A100 100 0 0 1 220 120" fill="none" stroke="#FF4132" strokeWidth="22" />
              <g className="needle" style={{ transform: `rotate(${-90 + pct * 180}deg)` }}>
                <g className="needle-shake">
                  <line x1="120" y1="120" x2="120" y2="38" stroke="var(--line)" strokeWidth="6" strokeLinecap="round" />
                </g>
              </g>
              <circle cx="120" cy="120" r="12" fill="var(--line)" />
            </svg>
            <output className={`bill ${hot ? "hot" : ""}`} htmlFor="hours">
              ${shownBill.toLocaleString("en-US")}
            </output>
            <p className="fine">per month, including a $25 fixed fee, because of course.</p>
          </div>

          <div className="controls">
            <label htmlFor="hours">
              Kam sa3a bel yom? (generator hours): <span>{hours}</span>
            </label>
            <input
              id="hours"
              type="range"
              min={0}
              max={16}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
            />

            <fieldset>
              <legend>Shu 3am yeshteghel? (what’s plugged in)</legend>
              <div className="togs">
                {APPS.map((app, i) => (
                  <button
                    key={app.n}
                    type="button"
                    className="tog"
                    aria-pressed={on[i]}
                    onClick={() => setOn((s) => s.map((v, j) => (j === i ? !v : v)))}
                  >
                    {app.n}
                    <small>{app.g}</small>
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="verdict" aria-live="polite" key={verdict.a}>
              <span className="e">{verdict.e}</span>
              <span>
                <span className="vm" lang="ar-Latn">{verdict.a}</span>
                <span className="vg">{verdict.g}</span>
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
