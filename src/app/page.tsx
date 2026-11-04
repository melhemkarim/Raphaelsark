import BottomNav from "@/components/BottomNav";
import BrandCard from "@/components/BrandCard";
import Collab from "@/components/Collab";
import ElMoteur from "@/components/ElMoteur";
import FamilyQuiz from "@/components/FamilyQuiz";
import HeroIntro from "@/components/HeroIntro";
import IrisTreat from "@/components/IrisTreat";
import Marquee from "@/components/Marquee";
import MomTranslator from "@/components/MomTranslator";
import TikTokWall from "@/components/TikTokWall";
import TopBar from "@/components/TopBar";
import { MARQUEE_BOTTOM } from "@/data/content";

export default function Home() {
  return (
    <>
      <TopBar />
      <main className="wrap" id="top">
        <section className="hero">
          <HeroIntro />
        </section>


        <div className="bands" aria-hidden="true">
          <Marquee items={MARQUEE_BOTTOM} tone="ink" reverse speed={40} />
        </div>

        <TikTokWall />
        <ElMoteur />
        <MomTranslator />
        <FamilyQuiz />
        <IrisTreat />
        <BrandCard />
        <Collab />
      </main>

      <footer>A concept site by <a href="https://linkylb.netlify.app" target="_blank" rel="noopener noreferrer">Linky. </a>
          We make digital website gifts 
      </footer>
      <BottomNav />
    </>
  );
}
