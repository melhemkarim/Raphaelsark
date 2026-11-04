import { BRAND } from "@/data/content";
import Reveal from "./Reveal";

export default function BrandCard() {
  return (
    <section className="sec" id="brand">
      <Reveal>
        <div className="brand">
          <span className="brand-e" aria-hidden="true">👕</span>
          <div>
            <p className="eyebrow">Raphael’s clothing brand</p>
            <h2>{BRAND.name}</h2>
            <p className="brand-line">{BRAND.line}</p>
          </div>
          <div className="brand-actions">
            <a className="btn dark" href={BRAND.shop} target="_blank" rel="noopener noreferrer">
              Shop now
            </a>
            <a className="btn ghost" href={BRAND.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
