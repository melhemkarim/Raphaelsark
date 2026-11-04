interface MarqueeProps {
  items: readonly string[];
  tone: "red" | "ink";
  reverse?: boolean;
  /** Seconds for one full loop. */
  speed?: number;
}

export default function Marquee({ items, tone, reverse = false, speed = 32 }: MarqueeProps) {
  const group = (hidden: boolean) => (
    <div className="mq-group" aria-hidden={hidden || undefined}>
      {items.map((text, i) => (
        <span className="mq-item" key={i}>
          {text}
        </span>
      ))}
    </div>
  );

  return (
    <div className={`band ${tone}`}>
      <div className={`mq ${reverse ? "rev" : ""}`} style={{ animationDuration: `${speed}s` }}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
