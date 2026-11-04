"use client";

import { useState } from "react";
import { SKITS, SKIT_WHAT, SKIT_WHO, type SkitWhat, type SkitWho } from "@/data/content";
import Reveal from "./Reveal";
import { useToast } from "./Toast";

export default function SkitMaker() {
  const [who, setWho] = useState<SkitWho>("mama");
  const [what, setWhat] = useState<SkitWhat>("moteur");
  const [shown, setShown] = useState(0);
  const toast = useToast();

  const skit = SKITS[`${who}-${what}`];
  const w = SKIT_WHO.find((x) => x.id === who)!;
  const t = SKIT_WHAT.find((x) => x.id === what)!;

  const pickWho = (id: SkitWho) => { setWho(id); setShown((n) => n + 1); };
  const pickWhat = (id: SkitWhat) => { setWhat(id); setShown((n) => n + 1); };

  const surprise = () => {
    let nw = who;
    let nt = what;
    while (nw === who && nt === what) {
      nw = SKIT_WHO[Math.floor(Math.random() * SKIT_WHO.length)].id;
      nt = SKIT_WHAT[Math.floor(Math.random() * SKIT_WHAT.length)].id;
    }
    setWho(nw);
    setWhat(nt);
    setShown((n) => n + 1);
  };

  const share = async () => {
    const url = window.location.href.split("#")[0];
    const text = `${skit.pov}\n${skit.ar} (${skit.g})`;
    try {
      if (navigator.share) {
        await navigator.share({ text, url });
      } else {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        toast("Copied. Send it to your group chat.");
      }
    } catch {
      /* the share sheet was closed, nothing to do */
    }
  };

  return (
    <section className="sec" id="skit">
      <Reveal>
        <h2>Sawwi skit</h2>
        <p className="intro">Pick who’s in it and what’s going wrong. We write the skit.</p>
      </Reveal>

      <Reveal delay={100}>
        <div className="skit">
          <div className="picker">
            <h3 id="skit-who">Who’s in it?</h3>
            <div className="pills" role="group" aria-labelledby="skit-who">
              {SKIT_WHO.map((o) => (
                <button key={o.id} type="button" className="pill" aria-pressed={who === o.id} onClick={() => pickWho(o.id)}>
                  {o.e} {o.t}
                </button>
              ))}
            </div>
            <h3 id="skit-what">What’s going wrong?</h3>
            <div className="pills" role="group" aria-labelledby="skit-what">
              {SKIT_WHAT.map((o) => (
                <button key={o.id} type="button" className="pill" aria-pressed={what === o.id} onClick={() => pickWhat(o.id)}>
                  {o.e} {o.t}
                </button>
              ))}
            </div>
            <button className="btn ghost" type="button" onClick={surprise}>
              Surprise me 🎲
            </button>
          </div>

          <article className="skitcard" data-who={who} key={`${who}-${what}-${shown}`} aria-live="polite">
            <div className="skit-head">
              <span className="big" aria-hidden="true">{w.e} {t.e}</span>
              <span>{w.t} and {t.t}</span>
            </div>
            <div className="skit-body">
              <p className="skit-pov">{skit.pov}</p>
              <p>
                <span className="ar skit-ar" lang="ar-Latn">“{skit.ar}”</span>
              </p>
              <p className="skit-g">{skit.g}</p>
              <div className="skit-actions">
                <button className="btn red" type="button" onClick={share}>
                  Copy this skit
                </button>
              </div>
            </div>
          </article>
        </div>
      </Reveal>
    </section>
  );
}
