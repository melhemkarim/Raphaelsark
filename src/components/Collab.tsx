"use client";

import { useState } from "react";
import { CONTACT_EMAIL, LINKS } from "@/data/content";
import Reveal from "./Reveal";

export default function Collab() {
  const [who, setWho] = useState("");
  const [idea, setIdea] = useState("");

  const subject = encodeURIComponent(`Collab idea${who.trim() ? ` from ${who.trim()}` : ""}`);
  const body = encodeURIComponent(
    `${idea.trim() || "Hi Raphael, I have an idea for you."}${who.trim() ? `\n\n${who.trim()}` : ""}`,
  );
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  return (
    <section className="sec" id="collab">
      <Reveal>
        <div className="collab">
          <h2>3endak fekra?</h2>
          <p className="intro">
            Got an idea? Brands and creators, tell Raphael what you have in mind. The button opens
            your email app with the message ready to send.
          </p>

          <div className="fields">
            <label htmlFor="who">
              Your name or brand
              <input
                id="who"
                type="text"
                autoComplete="organization"
                placeholder="Who are you?"
                value={who}
                onChange={(e) => setWho(e.target.value)}
              />
            </label>
            <label htmlFor="idea">
              Your idea
              <textarea
                id="idea"
                placeholder="Skit, giveaway, collab, anything."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
              />
            </label>
          </div>

          <div className="actions">
            <a className="btn dark" href={mailto}>
              Email Raphael
            </a>
            <a className="btn ghost" href={LINKS.tiktok} target="_blank" rel="noopener noreferrer">
              TikTok
            </a>
            <a className="btn ghost" href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
