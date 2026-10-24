import { useMemo } from "react";

/**
 * A small 2D scene drawn in SVG: an illustrated dog walks in from the left, stops for a moment
 * (tail wagging, head tilted) and walks off to the right. The timeline is generated here so the
 * legs only move while the dog is walking.
 */
const TOTAL = 15; // seconds
const WALK1 = { from: 0, to: 6 };
const WALK2 = { from: 9, to: 15 };
const STEP = 0.3; // seconds per half stride

function frames(sel: (t: number, walking: boolean) => string) {
  const stops: string[] = [];
  for (let t = 0; t <= TOTAL + 1e-6; t += STEP / 2) {
    const walking = (t >= WALK1.from && t <= WALK1.to) || (t >= WALK2.from && t <= WALK2.to);
    stops.push(`${((t / TOTAL) * 100).toFixed(3)}%{${sel(t, walking)}}`);
  }
  return stops.join("");
}

export function DogWalk({ label }: { label: string }) {
  const css = useMemo(() => {
    const swing = (phase: number, amp: number) => (t: number, walking: boolean) => {
      const a = walking ? Math.sin((t / STEP) * Math.PI + phase) * amp : 0;
      return `transform:rotate(${a.toFixed(1)}deg)`;
    };
    const bob = (t: number, walking: boolean) => `transform:translateY(${walking ? (Math.abs(Math.sin((t / STEP) * Math.PI)) * -3).toFixed(1) : 0}px)`;
    return `
      @keyframes dog-x{0%{transform:translateX(-120%)}40%{transform:translateX(120%)}60%{transform:translateX(120%)}100%{transform:translateX(420%)}}
      @keyframes dog-fl{${frames(swing(0, 26))}}
      @keyframes dog-fr{${frames(swing(Math.PI * 0.5, 26))}}
      @keyframes dog-bl{${frames(swing(Math.PI, 26))}}
      @keyframes dog-br{${frames(swing(Math.PI * 1.5, 26))}}
      @keyframes dog-bob{${frames(bob)}}
      @keyframes dog-tail{0%,100%{transform:rotate(8deg)}50%{transform:rotate(-14deg)}}
      @keyframes dog-wag{0%,100%{transform:rotate(22deg)}50%{transform:rotate(-26deg)}}
      @keyframes dog-head{0%,39%{transform:rotate(0)}43%,57%{transform:rotate(-9deg)}61%,100%{transform:rotate(0)}}
      @keyframes dog-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(0.1)}}
      @keyframes dog-shadow{${frames((t, w) => `transform:scaleX(${w ? (1 - Math.abs(Math.sin((t / STEP) * Math.PI)) * 0.06).toFixed(3) : 1})`)}}
    `;
  }, []);
  const d = `${TOTAL}s`;
  const leg = (name: string) => ({ animation: `${name} ${d} linear infinite` });
  return (
    <figure className="dog-scene relative mx-auto aspect-[16/6] w-full max-w-[900px] overflow-hidden" role="img" aria-label={label}>
      <style>{css}</style>
      <div className="absolute inset-x-0 bottom-[14%] h-px bg-border" aria-hidden />
      <div className="dog-layer absolute bottom-[12%] left-0 w-[28%]" style={{ animation: `dog-x ${d} linear infinite` }} aria-hidden>
        <svg viewBox="0 0 300 210" className="block w-full overflow-visible">
          <ellipse cx="150" cy="196" rx="92" ry="9" fill="#0c032c" opacity=".14" style={{ transformOrigin: "150px 196px", ...leg("dog-shadow") }} />
          <g style={leg("dog-bob")}>
            <g style={{ transformOrigin: "100px 130px", ...leg("dog-bl") }}><rect x="92" y="122" width="16" height="64" rx="8" fill="#d9b48a" /><ellipse cx="102" cy="186" rx="12" ry="6" fill="#a8744a" /></g>
            <g style={{ transformOrigin: "186px 130px", ...leg("dog-fl") }}><rect x="178" y="122" width="16" height="64" rx="8" fill="#d9b48a" /><ellipse cx="188" cy="186" rx="12" ry="6" fill="#a8744a" /></g>
            <g className="dog-tail" style={{ transformOrigin: "74px 92px", animation: `dog-tail .7s ease-in-out infinite` }}>
              <path d="M76 96 C52 90 40 66 46 44 C50 36 58 40 56 50 C54 66 64 80 82 84 Z" fill="#a8744a" />
            </g>
            <rect x="68" y="72" width="140" height="68" rx="34" fill="#f4d9b8" />
            <path d="M118 76 h56 a34 34 0 0 1 0 64 h-56 a34 34 0 0 1 0 -64z" fill="#fff" opacity=".18" />
            <rect x="188" y="92" width="22" height="30" fill="#f37e7d" transform="rotate(8 199 107)" />
            <g style={{ transformOrigin: "200px 96px", ...leg("dog-head") }}>
              <circle cx="228" cy="76" r="32" fill="#f4d9b8" />
              <rect x="244" y="72" width="44" height="28" rx="14" fill="#f4d9b8" />
              <ellipse cx="286" cy="78" rx="8" ry="6.5" fill="#2a1a1a" />
              <path d="M262 100 q10 14 22 0" fill="#f37e7d" />
              <g style={{ transformOrigin: "238px 66px", animation: `dog-blink 4s infinite` }}>
                <circle cx="238" cy="66" r="4.6" fill="#2a1a1a" /><circle cx="239.6" cy="64.4" r="1.4" fill="#fff" />
              </g>
              <ellipse cx="214" cy="84" rx="13" ry="28" fill="#a8744a" transform="rotate(14 214 84)" />
            </g>
            <g style={{ transformOrigin: "112px 130px", ...leg("dog-br") }}><rect x="104" y="122" width="16" height="64" rx="8" fill="#f4d9b8" /><ellipse cx="114" cy="186" rx="12" ry="6" fill="#c08a58" /></g>
            <g style={{ transformOrigin: "198px 130px", ...leg("dog-fr") }}><rect x="190" y="122" width="16" height="64" rx="8" fill="#f4d9b8" /><ellipse cx="200" cy="186" rx="12" ry="6" fill="#c08a58" /></g>
          </g>
        </svg>
      </div>
    </figure>
  );
}
