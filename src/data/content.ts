export const HANDLE = "raphaelsark";

export const LINKS = {
  tiktok: `https://www.tiktok.com/@${HANDLE}`,
  instagram: `https://www.instagram.com/${HANDLE}/`,
} as const;

/** Business email listed in Raphael's TikTok bio. */
export const CONTACT_EMAIL = "Raphaelsarkissian555@gmail.com";

/**
 * Put an approved photo of Raphael in /public (for example /public/raphael.jpg)
 * and set this to "/raphael.jpg". Leave empty to show the placeholder.
 */
export const PHOTO_SRC = "/raphael.webp";

export const CHIPS: readonly string[] = [
  "El mama", "El madrase", "El moteur", "El dekkene", "El sheta", "El as3ar",
];

export const MARQUEE_BOTTOM: readonly string[] = [
  "El mama 👩", "El madrase 🎒", "El moteur ⚡", "El dekkene 🛍️", "El shta 🌧️",
  "El as3ar 💸", "El teta 👵", "El nerd 🤓", "Iris 🐶", "Lebnen 🇱🇧",
];

/* ---------- confetti ---------- */



/* ---------- mom translator ---------- */
export interface Mom { ar: string; q: string; m: string }
export const MOMS: readonly Mom[] = [
  { ar: "Ma fi shi", q: "“There’s nothing wrong.”", m: "There is everything wrong. Ask again in five minutes." },
  { ar: "Khod jacket ma3ak", q: "“Take a jacket.”", m: "It’s 32° outside. Take the jacket anyway." },
  { ar: "Ma tet2akhar", q: "“Don’t be late.”", m: "Call when you leave, call when you arrive, call just because." },
  { ar: "Mnehke lamma terja3", q: "“We’ll talk when you’re back.”", m: "You’re in trouble. She’s been rehearsing since lunch." },
  { ar: "Ana ma bedakhal bi shi", q: "“I don’t get involved in anything.”", m: "She’s already involved. She called your aunt." },
  { ar: "Ta3a kol", q: "“Come eat.”", m: "You have four seconds before it’s cold. And it’s your fault." },
];

/* ---------- family quiz ---------- */
export type FamilyKey = "mama" | "teta" | "nerd";

export interface FamilyResult { key: FamilyKey; e: string; who: string; g: string; ar: string; blurb: string }
export const FAMILY_RESULTS: readonly FamilyResult[] = [
  { key: "mama", e: "👩", who: "Emmak", g: "The mom", ar: "Ta3a kol!", blurb: "You feed everyone, worry about everyone and somehow know everything already." },
  { key: "teta", e: "👵", who: "El teta", g: "The grandma", ar: "Ahla w sahla!", blurb: "Calm, legendary, and nobody leaves your house hungry or without advice." },
  { key: "nerd", e: "🤓", who: "El nerd", g: "The class nerd", ar: "Ana bas kent bes2al.", blurb: "Highlighters in four colors. You will not be sharing the answers." },
];

export interface FamilyOption { t: string; k: FamilyKey }
export interface FamilyQuestion { q: string; o: readonly FamilyOption[] }
export const FAMILY_QUIZ: readonly FamilyQuestion[] = [
  {
    q: "Friday night. What’s the plan?",
    o: [
      { t: "Cook for twelve people nobody invited", k: "mama" },
      { t: "Boss everyone around from the couch", k: "teta" },
      { t: "Revise for Monday’s exam", k: "nerd" },
    ],
  },
  {
    q: "A friend asks for help with homework.",
    o: [
      { t: "Sit down, eat something first, then help", k: "mama" },
      { t: "Tell them how it was in my day", k: "teta" },
      { t: "Sorry, the rules are the rules", k: "nerd" },
    ],
  },
  {
    q: "Your phone is at 1%.",
    o: [
      { t: "Call everyone to say I’m fine", k: "mama" },
      { t: "Who needs a phone? I have a flashlight from 1998", k: "teta" },
      { t: "Impossible. I charged it to 100% this morning", k: "nerd" },
    ],
  },
  {
    q: "Pick a snack.",
    o: [
      { t: "Anything, but you’re eating double", k: "mama" },
      { t: "Tea and something sweet, always", k: "teta" },
      { t: "A granola bar, tracked in an app", k: "nerd" },
    ],
  },
];

/* ---------- iris (Raphael's dog) ---------- */
/** Iris's colors (she is a husky). Any hex color works. Both eyes are icy blue, fading from white in the middle. */
export const IRIS_LOOK = {
  fur: "#8B92A1",
  cap: "#4F5565",
  ear: "#4F5565",
  muzzle: "#F8FAFC",
  eye: "#63B7EE",
} as const;

export const BURST_EMOJIS: readonly string[] = ["😂", "💀", "🗿", "🔥", "🇱🇧", "✨"];
export const TREAT_EMOJIS: readonly string[] = ["🦴", "🍖", "🐾", "🥓", "🦴", "🐶"];

/** After this many treats Iris falls asleep and the button wakes her up. */
export const IRIS_FULL_AT = 15;

export interface IrisLine { a: string; g: string }
export const IRIS_LINES: readonly IrisLine[] = [
  { a: "Haw haw!", g: "Translation: thank you." },
  { a: "Haw haw haw!", g: "Translation: again." },
  { a: "Haw haw!", g: "Come on, one more." },
  { a: "Haw haw!", g: "She ate it. Nobody saw." },
  { a: "Haw haw haw!", g: "Dying of happiness." },
];

export interface IrisMood { upTo: number; e: string; t: string }
export const IRIS_MOODS: readonly IrisMood[] = [
  { upTo: 0, e: "🐶", t: "Iris is waiting. Patiently. Not really." },
  { upTo: 4, e: "🐕", t: "Iris is happy." },
  { upTo: 9, e: "🤩", t: "Iris thinks you’re her favorite human." },
  { upTo: 14, e: "🥹", t: "Iris would like to adopt you." },
  { upTo: Infinity, e: "😴", t: "Iris is full and asleep. Let her rest." },
];

/* ---------- clothing brand ---------- */
export interface Brand { name: string; line: string; shop: string; instagram: string }
/** Verified from Raphael's TikTok and Instagram bios and the brand's shop page. */
export const BRAND: Brand = {
  name: "DoubleXX Collection",
  line: "Premium oversized streetwear made in Lebanon. Hoodies, tees and more, founded by Raphael.",
  shop: "https://doublexxcollection.com/?srsltid=AYCX9vL-tA3V8x9ntan7cbwVDgVUzPCVwhruncQxNb8iVzr2LAs6VQ-o",
  instagram: "https://www.instagram.com/doublexxcollection/",
};

/* ---------- el moteur (blackout game) ---------- */
export const MOTEUR_ROUNDS = 5;
/** If you haven't tapped after this many ms, mom does it herself. */
export const MOTEUR_TIMEOUT = 3000;
export const MOTEUR_ROOM: readonly string[] = ["💡", "📺", "🌀", "🧊"];

export interface MoteurLine { a: string; g: string }
export const MOTEUR_DARK: readonly MoteurLine[] = [
  { a: "Wen el moteur?!", g: "Where is the generator?!" },
  { a: "YALLAA!", g: "COME ON!" },
  { a: "SHIL L AZAN", g: "The heater is on!" },
  { a: "Khalesna!", g: "come on!" },
];
export const MOTEUR_SLOW: MoteurLine = { a: "Khalas, ana bi3melha.", g: "Fine, I’ll do it myself." };
export const MOTEUR_REACT: readonly (MoteurLine & { upTo: number })[] = [
  { upTo: 450, a: "M3awadddd", g: "Wow. Fast hands." },
  { upTo: 800, a: "Mashi l7al.", g: "Fine. Not great." },
  { upTo: Infinity, a: "Bati2", g: "Were you asleep?" },
];

/** Ranked by your average time in ms. */
export interface MoteurRank { upTo: number; e: string; t: string; g: string }
export const MOTEUR_RANKS: readonly MoteurRank[] = [
  { upTo: 400, e: "👑", t: "El moteur whisperer", g: "The generator guy wants to hire you." },
  { upTo: 550, e: "⚡", t: "Moteur master", g: "Emak fakhoura fik!" },
  { upTo: 800, e: "😅", t: "Mashi l7al", g: "Bte2ta33" },
  { upTo: 1200, e: "🕯️", t: "Candle enjoyer", g: "Shu zelehfe?" },
  { upTo: Infinity, e: "😴", t: "Sit in the dark", g: "Emmak taket l disjoncteur herself." },
];
