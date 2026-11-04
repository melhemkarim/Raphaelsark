"use client";

import { useReducer } from "react";
import {
  VIRAL_COMMENTS,
  VIRAL_EMOJIS,
  VIRAL_GOAL,
  VIRAL_LEVELS,
  VIRAL_POSTS,
  VIRAL_WIN_EMOJIS,
  type ViralComment,
} from "@/data/content";
import Confetti from "./Confetti";

export interface ViralStats { posts: number; views: number; likes: number; followers: number }
interface ShownComment extends ViralComment { id: number }
interface State { stats: ViralStats; comments: ShownComment[]; burst: number; nextId: number }

const EMPTY: ViralStats = { posts: 0, views: 0, likes: 0, followers: 0 };
const INITIAL: State = { stats: EMPTY, comments: [], burst: 0, nextId: 1 };

/** The random numbers are picked in the click handler so the reducer stays predictable. */
type Action = { type: "post"; gain: number; first: number; second: number };

function reducer(s: State, a: Action): State {
  // Every post fires the confetti. Posting after 1M starts a fresh run.
  const burst = s.burst + 1;
  if (s.stats.views >= VIRAL_GOAL) return { ...INITIAL, burst, nextId: s.nextId };

  const { gain } = a;
  const stats: ViralStats = {
    posts: s.stats.posts + 1,
    views: s.stats.views + gain,
    likes: s.stats.likes + Math.round(gain * 0.09),
    followers: s.stats.followers + Math.round(gain * 0.012),
  };
  const fresh: ShownComment[] = [
    { ...VIRAL_COMMENTS[a.first], id: s.nextId },
    { ...VIRAL_COMMENTS[a.second], id: s.nextId + 1 },
  ];
  return { stats, comments: [...fresh, ...s.comments].slice(0, 4), burst, nextId: s.nextId + 2 };
}

const fmt = (n: number): string => {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(n >= 1e4 ? 0 : 1).replace(/\.0$/, "")}K`;
  return String(n);
};

interface ViewProps {
  stats: ViralStats;
  comments: readonly ShownComment[];
  burst: number;
  onPost: () => void;
}

/** The presentational part, so it can be rendered with any numbers. */
export function ViralView({ stats, comments, burst, onPost }: ViewProps) {
  const done = stats.views >= VIRAL_GOAL;
  const post = stats.posts > 0 ? VIRAL_POSTS[(stats.posts - 1) % VIRAL_POSTS.length] : null;

  const levelIdx = VIRAL_LEVELS.reduce((best, l, i) => (stats.views >= l.at ? i : best), 0);
  const level = VIRAL_LEVELS[levelIdx];
  const next = VIRAL_LEVELS[levelIdx + 1];
  const progress = next ? (stats.views - level.at) / (next.at - level.at) : 1;

  return (
    <div className="board viral" id="viral">
      <h2>Go viral</h2>
      <p className="intro">
        Post a video and see what happens. Spoiler: the comments are all Lebanese moms. Reach 1M views.
      </p>

      <div className="viral-grid">
        <div className="vleft">
          <div className="vphone-wrap">
            <Confetti burst={burst} emojis={done ? VIRAL_WIN_EMOJIS : VIRAL_EMOJIS} />
            <div className="phone" role="img" aria-label="A phone showing Raphael’s latest video">
              <div className="screen">
                <span className="notch" />
                <span key={burst} className="thumb-in">
                  <span className="thumb">{post ? post.e : "🎬"}</span>
                </span>
                <div className="vrail" aria-hidden="true">
                  <span>❤️<b>{fmt(stats.likes)}</b></span>
                  <span>💬<b>{fmt(Math.round(stats.likes * 0.05))}</b></span>
                  <span>↗️<b>{fmt(Math.round(stats.likes * 0.02))}</b></span>
                </div>
                <div className="vcap">
                  <b>@raphaelsark</b>
                  <span>{post ? post.t : "Your first video is waiting"}</span>
                </div>
              </div>
            </div>
          </div>

          <button className={`btn vpost ${done ? "dark" : "red"}`} type="button" onClick={onPost}>
            {done ? "Start again" : "Post a video 🎬"}
          </button>
        </div>

        <div className="vside">
          <div className="vstats">
            <div><strong>{fmt(stats.views)}</strong><span>Views</span></div>
            <div><strong>{fmt(stats.likes)}</strong><span>Likes</span></div>
            <div><strong>{fmt(stats.followers)}</strong><span>Followers</span></div>
          </div>

          <p className="vlevel">
            {level.e} {level.t}
          </p>
          <div className="meter" aria-hidden="true">
            <i style={{ width: `${Math.min(progress, 1) * 100}%` }} />
          </div>
          <p className="vgoal">{next ? `Next: ${next.e} ${next.t} at ${fmt(next.at)} views` : "1M views. Now do part 2."}</p>

          <ul className="vcomments" aria-live="polite">
            {comments.length === 0 && <li className="vempty">No comments yet. Post something.</li>}
            {comments.map((c) => (
              <li key={c.id}>
                <b>@{c.u}</b> {c.t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ViralPhone() {
  const [state, dispatch] = useReducer(reducer, INITIAL);

  const onPost = () => {
    const posts = state.stats.posts;
    const gain = Math.round((12_000 + Math.random() * 50_000) * (1 + posts * 0.25));
    const first = Math.floor(Math.random() * VIRAL_COMMENTS.length);
    const second = (first + 1 + Math.floor(Math.random() * (VIRAL_COMMENTS.length - 1))) % VIRAL_COMMENTS.length;
    dispatch({ type: "post", gain, first, second });
  };

  return <ViralView stats={state.stats} comments={state.comments} burst={state.burst} onPost={onPost} />;
}
