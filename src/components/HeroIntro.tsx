import { CHIPS } from "@/data/content";
import PhotoSlot from "./PhotoSlot";

export default function HeroIntro() {
  return (
    <div className="hero-grid">
      <div className="hero-text">
        <h1 className="name">
          <span className="first">Raphael</span>
          <span className="last">Sark</span>
        </h1>

        <p className="lede">
          <span className="ar" lang="ar-Latn">
            3an el mama, el madrase, el moteur w kel shi bi Lebnen.
          </span>
          <span className="en">
            Skits about moms, school, generators and everything else Lebanon puts you through.
          </span>
        </p>
        <p className="bio">Just a city boy with big dreams.</p>

        <div className="chips" aria-hidden="true">
          {CHIPS.map((chip, idx) => (
            <span className="chip" key={chip} style={{ animationDelay: `${idx * 0.35}s` }}>
              {chip}
            </span>
          ))}
        </div>
      </div>

      <PhotoSlot />
    </div>
  );
}
