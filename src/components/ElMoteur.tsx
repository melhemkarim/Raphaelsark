"use client";

import { useEffect, useRef, useState } from "react";
import {
  MOTEUR_DARK,
  MOTEUR_RANKS,
  MOTEUR_REACT,
  MOTEUR_ROOM,
  MOTEUR_ROUNDS,
  MOTEUR_SLOW,
  MOTEUR_TIMEOUT,
  type MoteurLine,
} from "@/data/content";
import Reveal from "./Reveal";
import { useToast } from "./Toast";

type Phase = "idle" | "wait" | "early" | "dark" | "result" | "done";

const rounds = Array.from({ length: MOTEUR_ROUNDS }, (_, i) => i);

export default function ElMoteur() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [times, setTimes] = useState<number[]>([]);
  const [line, setLine] = useState<MoteurLine | null>(null);
  const timers = useRef<number[]>([]);
  const timesRef = useRef<number[]>([]);
  const t0 = useRef(0);
  const skipClick = useRef(false);
  const toast = useToast();

  // These only touch refs and setters, so the timer callbacks never use stale state.
  const clear = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  useEffect(() => () => clear(), []);

  const arm = () => {
    setPhase("wait");
    setLine(null);
    later(() => {
      t0.current = performance.now();
      setLine(MOTEUR_DARK[Math.floor(Math.random() * MOTEUR_DARK.length)]);
      setPhase("dark");
      later(() => finish(MOTEUR_TIMEOUT, true), MOTEUR_TIMEOUT);
    }, 1300 + Math.random() * 2200);
  };

  const finish = (ms: number, timedOut = false) => {
    clear();
    const all = [...timesRef.current, ms];
    timesRef.current = all;
    setTimes(all);
    setLine(timedOut ? MOTEUR_SLOW : (MOTEUR_REACT.find((r) => ms <= r.upTo) ?? MOTEUR_REACT[MOTEUR_REACT.length - 1]));
    setPhase("result");
    later(() => (all.length >= MOTEUR_ROUNDS ? setPhase("done") : arm()), 1400);
  };

  const start = () => {
    clear();
    timesRef.current = [];
    setTimes([]);
    arm();
  };

  const onTap = () => {
    if (phase === "idle" || phase === "done") return start();
    if (phase === "wait") {
      clear();
      setLine(null);
      setPhase("early");
      later(arm, 1500);
      return;
    }
    if (phase === "dark") finish(Math.round(performance.now() - t0.current));
  };

  // Touch/pen react on press (not release) so the time is fair; click stays for keyboards.
  const onPress = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    skipClick.current = true;
    onTap();
  };
  const onClick = () => {
    if (skipClick.current) {
      skipClick.current = false;
      return;
    }
    onTap();
  };

  // A round where mom had to do it herself counts as 1.5 s, so one miss doesn't wreck the whole score.
  const avg = times.length ? Math.round(times.reduce((a, b) => a + Math.min(b, 1500), 0) / times.length) : 0;
  const rank = MOTEUR_RANKS.find((r) => avg <= r.upTo) ?? MOTEUR_RANKS[MOTEUR_RANKS.length - 1];
  const last = times[times.length - 1] ?? 0;

  const share = async () => {
    const url = window.location.href.split("#")[0];
    const text = `I started the moteur in ${avg} ms and I’m “${rank.t}” ${rank.e}. Can you beat me?`;
    try {
      if (navigator.share) {
        await navigator.share({ text, url });
      } else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        toast("Copied. Send it to your group chat.");
      }
    } catch {
      /* the share sheet was closed, nothing to do */
    }
  };

  const dark = phase === "dark";
  const busy = phase === "result" || phase === "early";
  const label =
    phase === "idle" ? "Start the blackout 💡"
    : phase === "done" ? "Play again"
    : busy ? "…"
    : "Moteur ⚡";

  return (
    <section className="sec" id="moteur">
      <Reveal>
        <h2>El moteur</h2>
        <p className="intro">
          The electricity just cut. Tek l disjoncteur before mom finds out. Five blackouts, fastest hand wins.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="moteur">
          <div className="mstage" data-phase={phase}>
            <div className="mroom" aria-hidden="true">
              {MOTEUR_ROOM.map((e) => (
                <span key={e}>{e}</span>
              ))}
              <span>{dark ? "🕯️" : "🔌"}</span>
            </div>

            <div className="mmsg" aria-live="polite">
              {phase === "idle" && (
                <>
                  <p className="mbig">Ready?</p>
                  <p className="msmall">When the lights go out, tap Moteur as fast as you can. Tap too early and the round starts over.</p>
                </>
              )}
              {phase === "wait" && (
                <>
                  <p className="mbig" lang="ar-Latn">El kahraba shaghale…</p>
                  <p className="msmall">The electricity is on. Wait for it.</p>
                </>
              )}
              {phase === "early" && (
                <>
                  <p className="mbig" lang="ar-Latn">Ba3ed ma 2at3et!</p>
                  <p className="msmall">Too early. The electricity is still on.</p>
                </>
              )}
              {dark && (
                <>
                  <p className="mbig" lang="ar-Latn">2ata3it l kahraba!</p>
                  <p className="msmall">Tap Moteur now!</p>
                </>
              )}
              {phase === "result" && (
                <>
                  <p className="mbig">{last >= MOTEUR_TIMEOUT ? "Too slow" : `${last} ms`}</p>
                  <p className="msmall">Round {times.length} of {MOTEUR_ROUNDS}</p>
                </>
              )}
              {phase === "done" && (
                <>
                  <p className="mbig">{rank.e} {rank.t}</p>
                  <p className="msmall">Average {avg} ms. {rank.g}</p>
                </>
              )}
            </div>

            <div className="mslot">
              {line && (phase === "dark" || phase === "result") && (
                <p className="mmom" key={`${times.length}-${phase}`}>
                  <b lang="ar-Latn">{line.a}</b>
                  <span>{line.g}</span>
                </p>
              )}
            </div>
          </div>

          <div className="mtimes" aria-label="Your times">
            {rounds.map((i) => {
              const v = times[i];
              return (
                <div key={i} className={v !== undefined ? "on" : ""}>
                  <small>R{i + 1}</small>
                  {v === undefined ? "–" : v >= MOTEUR_TIMEOUT ? "Slow" : `${v} ms`}
                </div>
              );
            })}
          </div>

          <div className="mctl">
            <button
              className={`btn mbtn ${dark ? "hot red" : phase === "done" ? "dark" : "red"}`}
              type="button"
              onPointerDown={onPress}
              onClick={onClick}
              disabled={busy}
            >
              {label}
            </button>
            {phase === "done" && (
              <button className="btn ghost mbtn" type="button" onClick={share}>
                Share my score
              </button>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
