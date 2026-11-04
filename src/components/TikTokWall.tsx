"use client";

import { useState } from "react";
import { LINKS } from "@/data/content";
import { VIDEOS, type Video } from "@/data/videos";
import { tiktokEmbedSrc, tiktokId } from "@/lib/tiktok";
import Reveal from "./Reveal";

interface CardProps {
  video: Video;
  playing: boolean;
  onPlay: () => void;
}

function VideoCard({ video, playing, onPlay }: CardProps) {
  const id = tiktokId(video.url);

  return (
    <article className={`vcard vc-${video.color}`}>
      <div className={`vframe ${playing ? "on" : ""}`}>
        {playing && id ? (
          <>
            <span className="vload">Loading TikTok…</span>
            <iframe
              src={tiktokEmbedSrc(id)}
              title={video.title}
              loading="lazy"
              allow="encrypted-media; fullscreen"
              allowFullScreen
            />
          </>
        ) : (
          <button className="vplay" type="button" onClick={onPlay} disabled={!id}>
            <span className="big-e" aria-hidden="true">{video.emoji}</span>
            <span className="tri" aria-hidden="true">▶</span>
            <span className="vplay-t">Tap to play here</span>
          </button>
        )}
      </div>
      <h3 className="vtitle">{video.title}</h3>
      <div className="vmeta">
        <span className="vtag">#{video.tag}</span>
        <a className="vlink" href={video.url} target="_blank" rel="noopener noreferrer">
          Open on TikTok
        </a>
      </div>
    </article>
  );
}

export default function TikTokWall() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="sec" id="tiktok">
      <Reveal>
        <h2>Shuf el videos</h2>
        <p className="intro">
          Watch the chaos. Tap a card to play it right here, or open it on TikTok. Swipe for more.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="rail">
          {VIDEOS.map((video) => (
            <VideoCard
              key={video.url}
              video={video}
              playing={active === video.url}
              onPlay={() => setActive(video.url)}
            />
          ))}
          <a className="vcta" href={LINKS.tiktok} target="_blank" rel="noopener noreferrer">
            <span className="vcta-e" aria-hidden="true">🎬</span>
            <span className="vcta-t">Kamen videos 3ala TikTok</span>
            <span className="vcta-g">More videos on @raphaelsark</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
