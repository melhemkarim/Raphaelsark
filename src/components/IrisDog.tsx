import type { CSSProperties } from "react";
import { IRIS_LOOK } from "@/data/content";

interface IrisDogProps {
  /** Treats given so far, she gets more excited as it grows. */
  count: number;
  /** Changes on every treat so the hop and chomp replay. */
  burst: number;
  asleep: boolean;
  /** The treat that flies into her mouth. */
  treat: string;
}

/** A fluffy, bumpy-edged ellipse so her coat looks like fur. */
function fluff(cx: number, cy: number, rx: number, ry: number, n: number, amp: number): string {
  const pt = (a: number, k: number) =>
    `${(cx + Math.cos(a) * rx * k).toFixed(1)} ${(cy + Math.sin(a) * ry * k).toFixed(1)}`;
  let d = `M${pt(0, 1)}`;
  for (let i = 0; i < n; i++) {
    const a0 = (2 * Math.PI * i) / n;
    const a1 = (2 * Math.PI * (i + 1)) / n;
    d += ` Q${pt((a0 + a1) / 2, 1 + amp)} ${pt(a1, 1)}`;
  }
  return `${d} Z`;
}

const HEAD = fluff(120, 114, 66, 58, 18, 0.15);
const BODY = fluff(120, 228, 74, 58, 16, 0.09);
const CHEST = fluff(120, 236, 40, 50, 12, 0.08);
const RUFF = fluff(120, 182, 62, 27, 14, 0.18);

/** Dark cap: everything above the line that runs from the blaze, past the eyes, out to the cheeks. */
const CAP = "M26 26 H214 V142 C200 114 178 100 141 93 C128 88 121 74 120 54 C119 74 112 88 99 93 C62 100 40 114 26 142 Z";
/** White face: the blaze, the cheeks and the muzzle. */
const MASK = "M120 54 C119 74 112 88 99 93 C62 100 40 114 26 142 V190 H214 V142 C200 114 178 100 141 93 C128 88 121 74 120 54 Z";

/** A hand-drawn, animated cartoon Iris, a husky. Colors come from IRIS_LOOK. */
export default function IrisDog({ count, burst, asleep, treat }: IrisDogProps) {
  const excited = count >= 5 && !asleep;
  const eating = burst > 0 && count > 0 && !asleep;
  const judgy = count === 0 && !asleep;
  const hop = burst === 0 ? "" : burst % 2 ? "hop-a" : "hop-b";
  const speed = asleep ? "slow" : count >= 5 ? "faster" : count > 0 ? "fast" : "";

  const style = {
    "--fur": IRIS_LOOK.fur,
    "--cap": IRIS_LOOK.cap,
    "--ear": IRIS_LOOK.ear,
    "--muz": IRIS_LOOK.muzzle,
  } as CSSProperties;

  return (
    <svg
      className={`dog ${speed} ${asleep ? "asleep" : ""}`}
      style={style}
      viewBox="0 0 240 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={asleep ? "Iris the husky, asleep" : "Iris the husky"}
    >
      <defs>
        <radialGradient id="iris-eye">
          <stop offset=".35" stopColor="#F4FBFF" />
          <stop offset="1" stopColor={IRIS_LOOK.eye} />
        </radialGradient>
        <clipPath id="iris-eyeL">
          <ellipse cx="97" cy="109" rx="12" ry="10" transform="rotate(8 97 109)" />
        </clipPath>
        <clipPath id="iris-eyeR">
          <ellipse cx="143" cy="109" rx="12" ry="10" transform="rotate(-8 143 109)" />
        </clipPath>
        <clipPath id="iris-head">
          <path d={HEAD} />
        </clipPath>
      </defs>
      <rect width="240" height="300" fill="#8FA3FF" />
      <ellipse cx="120" cy="285" rx="90" ry="10" fill="#17142B" opacity=".18" />

      <g className={hop}>
        {/* bushy curled tail, gray on top and white underneath */}
        <g className="d-tail">
          <path d="M154 256 C208 258 224 210 192 176" fill="none" className="ol-line" strokeWidth="40" />
          <path d="M154 256 C208 258 224 210 192 176" fill="none" className="fur-line" strokeWidth="30" />
          <path d="M158 258 C200 258 214 224 190 192" fill="none" className="white-line" strokeWidth="10" />
        </g>

        {/* chubby fluffy body, white chest, white legs */}
        <path className="ol fur" d={BODY} />
        <path className="muz" d={CHEST} />
        <rect className="ol muz" x="82" y="242" width="28" height="38" rx="14" />
        <rect className="ol muz" x="130" y="242" width="28" height="38" rx="14" />
        <ellipse className="ol muz" cx="96" cy="280" rx="21" ry="9" />
        <ellipse className="ol muz" cx="144" cy="280" rx="21" ry="9" />
        <path d="M90 281 V275 M97 282 V276 M103 281 V275 M138 281 V275 M145 282 V276 M152 281 V275" stroke="#17142B" strokeWidth="2" strokeLinecap="round" opacity=".45" />

        {/* thick white ruff around her neck, like a real husky */}
        <path className="ol muz" d={RUFF} />

        {/* collar */}
        <path d="M82 188 Q120 205 158 188" fill="none" className="ol-line" strokeWidth="15" />
        <path d="M82 188 Q120 205 158 188" fill="none" stroke="#FF4132" strokeWidth="8" strokeLinecap="round" />
        <circle cx="120" cy="206" r="6.5" fill="#FFD21F" stroke="#17142B" strokeWidth="3" />

        {/* head */}
        <g className="d-head">
          {/* tall, pointed husky ears with white fluff inside */}
          <g className="d-earL">
            <path className="ol ear" d="M58 86 C48 60 50 32 62 10 C86 16 106 42 114 72 Z" />
            <path className="muz" d="M67 76 C60 58 61 40 66 25 C80 31 93 48 100 66 Z" />
          </g>
          <g className="d-earR">
            <path className="ol ear" d="M182 86 C192 60 190 32 178 10 C154 16 134 42 126 72 Z" />
            <path className="muz" d="M173 76 C180 58 179 40 174 25 C160 31 147 48 140 66 Z" />
          </g>

          <path className="ol fur" d={HEAD} />
          <g clipPath="url(#iris-head)">
            <path className="cap" d={CAP} />
            <path className="muz" d={MASK} />
          </g>

          {/* dark mask around the eyes */}
          <ellipse className="cap" cx="97" cy="109" rx="17" ry="13.5" transform="rotate(8 97 109)" />
          <ellipse className="cap" cx="143" cy="109" rx="17" ry="13.5" transform="rotate(-8 143 109)" />

          {/* the white eyebrow spots: they tilt when she is judging you */}
          <ellipse className="muz" cx="88" cy={judgy ? 83 : 79} rx="7.5" ry="4.4" transform={`rotate(${judgy ? 14 : -6} 88 ${judgy ? 83 : 79})`} />
          <ellipse className="muz" cx="152" cy={judgy ? 83 : 79} rx="7.5" ry="4.4" transform={`rotate(${judgy ? -14 : 6} 152 ${judgy ? 83 : 79})`} />

          {asleep ? (
            <>
              <path d="M85 111 Q97 121 109 111" fill="none" stroke="#EAF4FF" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M131 111 Q143 121 155 111" fill="none" stroke="#EAF4FF" strokeWidth="3.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <g className="d-eye">
                <ellipse cx="97" cy="109" rx="12" ry="10" transform="rotate(8 97 109)" fill="url(#iris-eye)" stroke="#17142B" strokeWidth="2.5" />
                <circle cx="97" cy="109" r="5.2" fill="#17142B" />
                <circle cx="99.5" cy="106.5" r="2.6" fill="#fff" />
              </g>
              <g className="d-eye">
                <ellipse cx="143" cy="109" rx="12" ry="10" transform="rotate(-8 143 109)" fill="url(#iris-eye)" stroke="#17142B" strokeWidth="2.5" />
                <circle cx="143" cy="109" r="5.2" fill="#17142B" />
                <circle cx="145.5" cy="106.5" r="2.6" fill="#fff" />
              </g>
              {/* half-closed, unimpressed eyelids until she gets a treat */}
              {judgy && (
                <>
                  <path className="cap" clipPath="url(#iris-eyeL)" d="M80 98 L113 110 L113 86 L80 86 Z" />
                  <path className="cap" clipPath="url(#iris-eyeR)" d="M160 98 L127 110 L127 86 L160 86 Z" />
                  <path d="M84 101 L110 110 M156 101 L130 110" fill="none" stroke="#17142B" strokeWidth="3.5" strokeLinecap="round" />
                </>
              )}
            </>
          )}

          <path d={HEAD} fill="none" className="ol" />

          {count >= 10 && !asleep && (
            <>
              <ellipse cx="74" cy="136" rx="9" ry="6" fill="#FF9AC1" opacity=".75" />
              <ellipse cx="166" cy="136" rx="9" ry="6" fill="#FF9AC1" opacity=".75" />
            </>
          )}

          <ellipse className="ol muz" cx="120" cy="141" rx="28" ry="22" />
          <path d="M103 139 h.1 M108 144 h.1 M101 145 h.1 M137 139 h.1 M132 144 h.1 M139 145 h.1" stroke="#17142B" strokeWidth="3" strokeLinecap="round" opacity=".45" />

          {/* nose: charcoal with a pink middle */}
          <ellipse cx="120" cy="129" rx="13" ry="9.5" fill="#3A3440" />
          <ellipse cx="120" cy="131" rx="6" ry="3.5" fill="#C98FA0" opacity=".85" />
          <ellipse cx="115.5" cy="126" rx="3.5" ry="2" fill="#fff" opacity=".55" />

          {excited && (
            <path className="d-pant" d="M112 150 Q120 176 128 150 Z" fill="#FF6B8A" stroke="#17142B" strokeWidth="3" strokeLinejoin="round" />
          )}
          <path d="M120 138 V147 M105 149 Q120 162 135 149" fill="none" stroke="#17142B" strokeWidth="4" strokeLinecap="round" />

          {eating && (
            <g key={burst} className="d-chomp">
              <path d="M102 144 Q120 184 138 144 Z" fill="#17142B" stroke="#17142B" strokeWidth="3" strokeLinejoin="round" />
              <ellipse cx="120" cy="162" rx="10" ry="7" fill="#FF6B8A" />
            </g>
          )}
        </g>

        {asleep && (
          <g aria-hidden="true">
            <text className="d-z" x="178" y="64" style={{ animationDelay: "0s" }}>z</text>
            <text className="d-z" x="192" y="46" style={{ animationDelay: ".8s" }}>z</text>
            <text className="d-z" x="206" y="28" style={{ animationDelay: "1.6s" }}>z</text>
          </g>
        )}
      </g>

      {eating && (
        <text key={burst} className="d-treat" x="108" y="154" aria-hidden="true">
          {treat}
        </text>
      )}
    </svg>
  );
}
