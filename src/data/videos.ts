export type VideoColor = "red" | "blue" | "green";

export interface Video {
  /** Full TikTok video URL. Add more here and they show up in the wall. */
  url: string;
  title: string;
  tag: string;
  color: VideoColor;
  emoji: string;
}

export const VIDEOS: readonly Video[] = [
  {
    url: "https://www.tiktok.com/@raphaelsark/video/7695393337485970709",
    title: "Sherte l ser bi lebnen",
    tag: "police",
    color: "red",
    emoji: "👮",
  },
  {
    url: "https://www.tiktok.com/@raphaelsark/video/7688334896443444500",
    title: "ALIENS",
    tag: "Aliens",
    color: "green",
    emoji: "👽",
  },
  {
    url: "https://www.tiktok.com/@raphaelsark/video/7478306871686761736",
    title: "When your parents believe the teacher over you",
    tag: "parents",
    color: "blue",
    emoji: "🧑‍🏫",
  },
];
