"use client";

import { useState } from "react";
import { FAMILY_QUIZ, FAMILY_RESULTS, type FamilyKey } from "@/data/content";
import Reveal from "./Reveal";
import { useToast } from "./Toast";

export default function FamilyQuiz() {
  const [answers, setAnswers] = useState<FamilyKey[]>([]);
  const toast = useToast();

  const step = answers.length;
  const done = step === FAMILY_QUIZ.length;

  const result = (() => {
    if (!done) return null;
    const score = new Map<FamilyKey, number>();
    answers.forEach((k) => score.set(k, (score.get(k) ?? 0) + 1));
    return FAMILY_RESULTS.reduce((best, r) => ((score.get(r.key) ?? 0) > (score.get(best.key) ?? 0) ? r : best));
  })();

  const share = async () => {
    if (!result) return;
    const text = `I’m ${result.who} (${result.g}) in a Lebanese family. Who are you?`;
    const url = window.location.href.split("#")[0];
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

  return (
    <section className="sec" id="quiz">
      <Reveal>
        <h2>Meen enta bel 3ayle?</h2>
        <p className="intro">Who are you in a Lebanese family? Four questions, no pressure.</p>
      </Reveal>

      <Reveal delay={100}>
        <div className="quiz" aria-live="polite">
          {result ? (
            <div className="qres">
              <div className="big" aria-hidden="true">{result.e}</div>
              <p className="qstep">You are</p>
              <h3>{result.who}</h3>
              <p className="ar" lang="ar-Latn">{result.ar}</p>
              <p className="qblurb">{result.blurb}</p>
              <div className="actions" style={{ justifyContent: "center" }}>
                <button className="btn red" type="button" onClick={share}>
                  Share my result
                </button>
                <button className="btn ghost" type="button" onClick={() => setAnswers([])}>
                  Play again
                </button>
              </div>
            </div>
          ) : (
            <div key={step}>
              <p className="qstep">
                Question {step + 1} of {FAMILY_QUIZ.length}
              </p>
              <div className="qdots" aria-hidden="true">
                {FAMILY_QUIZ.map((_, i) => (
                  <i key={i} className={i <= step ? "on" : ""} />
                ))}
              </div>
              <h3 className="qtext">{FAMILY_QUIZ[step].q}</h3>
              <div className="opts">
                {FAMILY_QUIZ[step].o.map((opt) => (
                  <button key={opt.t} type="button" className="opt" onClick={() => setAnswers((a) => [...a, opt.k])}>
                    {opt.t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
