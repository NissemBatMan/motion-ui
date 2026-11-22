/**
 * Every animation in the gallery. Each one is self-contained: its CSS only uses classes that start
 * with its own prefix (checked by test/animations.test.js), so a snippet can be pasted anywhere.
 * `--mu-accent` can be overridden by the host page; each snippet falls back to its own colour.
 */
export const animations = [
  {
    id: "ring-spinner",
    title: "Ring spinner",
    category: "Loaders",
    html: `<div class="ring-spinner" role="status" aria-label="Loading"></div>`,
    css: `.ring-spinner {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 4px solid color-mix(in srgb, var(--mu-accent, #6d5dfc) 20%, transparent);
  border-top-color: var(--mu-accent, #6d5dfc);
  animation: ring-spinner-turn 0.8s linear infinite;
}
@keyframes ring-spinner-turn {
  to { transform: rotate(1turn); }
}`,
  },
  {
    id: "dot-wave",
    title: "Dot wave",
    category: "Loaders",
    html: `<div class="dot-wave" role="status" aria-label="Loading"><span></span><span></span><span></span></div>`,
    css: `.dot-wave {
  display: flex;
  gap: 8px;
}
.dot-wave span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--mu-accent, #6d5dfc);
  animation: dot-wave-jump 1s ease-in-out infinite;
}
.dot-wave span:nth-child(2) { animation-delay: 0.15s; }
.dot-wave span:nth-child(3) { animation-delay: 0.3s; }
@keyframes dot-wave-jump {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-12px); opacity: 1; }
}`,
  },
  {
    id: "bar-equalizer",
    title: "Equalizer bars",
    category: "Loaders",
    html: `<div class="bar-equalizer" role="status" aria-label="Loading"><i></i><i></i><i></i><i></i><i></i></div>`,
    css: `.bar-equalizer {
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 40px;
}
.bar-equalizer i {
  width: 6px;
  height: 100%;
  border-radius: 3px;
  background: var(--mu-accent, #6d5dfc);
  transform-origin: bottom;
  animation: bar-equalizer-bounce 1.1s ease-in-out infinite;
}
.bar-equalizer i:nth-child(2) { animation-delay: -0.9s; }
.bar-equalizer i:nth-child(3) { animation-delay: -0.6s; }
.bar-equalizer i:nth-child(4) { animation-delay: -0.3s; }
.bar-equalizer i:nth-child(5) { animation-delay: -0.75s; }
@keyframes bar-equalizer-bounce {
  0%, 100% { transform: scaleY(0.25); }
  50% { transform: scaleY(1); }
}`,
  },
  {
    id: "pulse-ring",
    title: "Pulse ring",
    category: "Loaders",
    html: `<div class="pulse-ring" aria-hidden="true"></div>`,
    css: `.pulse-ring {
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--mu-accent, #6d5dfc);
}
.pulse-ring::before,
.pulse-ring::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid var(--mu-accent, #6d5dfc);
  animation: pulse-ring-out 1.8s ease-out infinite;
}
.pulse-ring::after { animation-delay: 0.9s; }
@keyframes pulse-ring-out {
  from { transform: scale(1); opacity: 0.9; }
  to { transform: scale(3.4); opacity: 0; }
}`,
  },
  {
    id: "shine-button",
    title: "Shine button",
    category: "Buttons",
    html: `<button class="shine-button" type="button">Get started</button>`,
    css: `.shine-button {
  position: relative;
  overflow: hidden;
  padding: 12px 26px;
  border: 0;
  border-radius: 12px;
  background: var(--mu-accent, #6d5dfc);
  color: #fff;
  font: 600 15px/1 system-ui, sans-serif;
  cursor: pointer;
  transition: transform 0.15s;
}
.shine-button::after {
  content: "";
  position: absolute;
  inset: 0 auto 0 -60%;
  width: 40%;
  background: linear-gradient(100deg, transparent, rgb(255 255 255 / 0.45), transparent);
  transform: skewX(-20deg);
  animation: shine-button-sweep 2.8s ease-in-out infinite;
}
.shine-button:hover { transform: translateY(-2px); }
.shine-button:active { transform: translateY(0) scale(0.97); }
@keyframes shine-button-sweep {
  0%, 55% { left: -60%; }
  100% { left: 130%; }
}`,
  },
  {
    id: "gradient-border",
    title: "Rotating gradient border",
    category: "Buttons",
    html: `<button class="gradient-border" type="button">Upgrade to Pro</button>`,
    css: `@property --gradient-border-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
.gradient-border {
  padding: 12px 26px;
  border: 2px solid transparent;
  border-radius: 12px;
  background:
    linear-gradient(#11131a, #11131a) padding-box,
    conic-gradient(from var(--gradient-border-angle), #6d5dfc, #22d3ee, #f472b6, #6d5dfc) border-box;
  color: #fff;
  font: 600 15px/1 system-ui, sans-serif;
  cursor: pointer;
  animation: gradient-border-spin 3s linear infinite;
}
@keyframes gradient-border-spin {
  to { --gradient-border-angle: 360deg; }
}`,
  },
  {
    id: "arrow-button",
    title: "Sliding arrow",
    category: "Buttons",
    html: `<a class="arrow-button" href="#">Read more <span aria-hidden="true">→</span></a>`,
    css: `.arrow-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: 1px solid currentColor;
  border-radius: 999px;
  color: var(--mu-accent, #6d5dfc);
  font: 600 15px/1 system-ui, sans-serif;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.arrow-button span {
  transition: transform 0.25s cubic-bezier(0.3, 1.5, 0.6, 1);
}
.arrow-button:hover {
  background: var(--mu-accent, #6d5dfc);
  color: #fff;
}
.arrow-button:hover span { transform: translateX(5px); }`,
  },
  {
    id: "toggle-switch",
    title: "Toggle switch",
    category: "Inputs",
    html: `<label class="toggle-switch"><input type="checkbox" checked /><span></span> Notifications</label>`,
    css: `.toggle-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font: 500 15px/1 system-ui, sans-serif;
  cursor: pointer;
}
.toggle-switch input {
  position: absolute;
  opacity: 0;
}
.toggle-switch span {
  position: relative;
  width: 46px;
  height: 26px;
  border-radius: 999px;
  background: #9aa0b4;
  transition: background 0.25s;
}
.toggle-switch span::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
  transition: transform 0.25s cubic-bezier(0.3, 1.4, 0.6, 1);
}
.toggle-switch input:checked + span { background: var(--mu-accent, #6d5dfc); }
.toggle-switch input:checked + span::after { transform: translateX(20px); }
.toggle-switch input:focus-visible + span { outline: 2px solid var(--mu-accent, #6d5dfc); outline-offset: 2px; }`,
  },
  {
    id: "float-label",
    title: "Floating label",
    category: "Inputs",
    html: `<label class="float-label"><input placeholder=" " /><span>E-mail address</span></label>`,
    css: `.float-label {
  position: relative;
  display: block;
  width: min(220px, 100%);
  font: 15px/1 system-ui, sans-serif;
}
.float-label input {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 12px 8px;
  border: 1.5px solid #9aa0b4;
  border-radius: 10px;
  background: transparent;
  color: inherit;
  font: inherit;
  outline: none;
  transition: border-color 0.2s;
}
.float-label span {
  position: absolute;
  left: 13px;
  top: 15px;
  color: #8a90a4;
  pointer-events: none;
  transform-origin: left;
  transition: transform 0.2s, color 0.2s;
}
.float-label input:focus { border-color: var(--mu-accent, #6d5dfc); }
.float-label input:focus + span,
.float-label input:not(:placeholder-shown) + span {
  transform: translateY(-10px) scale(0.75);
  color: var(--mu-accent, #6d5dfc);
}`,
  },
  {
    id: "check-draw",
    title: "Success check",
    category: "Feedback",
    html: `<svg class="check-draw" viewBox="0 0 52 52" role="img" aria-label="Done"><circle cx="26" cy="26" r="24" /><path d="M15 27l7 7 15-16" /></svg>`,
    css: `.check-draw {
  width: 64px;
  height: 64px;
  fill: none;
  stroke: #22c55e;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.check-draw circle {
  stroke-dasharray: 151;
  stroke-dashoffset: 151;
  animation: check-draw-line 0.6s ease-out forwards, check-draw-loop 3s 1.6s infinite;
}
.check-draw path {
  stroke-dasharray: 36;
  stroke-dashoffset: 36;
  animation: check-draw-line 0.35s 0.55s ease-out forwards, check-draw-loop 3s 1.6s infinite;
}
@keyframes check-draw-line {
  to { stroke-dashoffset: 0; }
}
@keyframes check-draw-loop {
  0%, 80% { opacity: 1; }
  90% { opacity: 0; }
}`,
  },
  {
    id: "bell-shake",
    title: "Notification bell",
    category: "Feedback",
    html: `<span class="bell-shake" role="img" aria-label="3 notifications">🔔<b>3</b></span>`,
    css: `.bell-shake {
  position: relative;
  display: inline-block;
  font-size: 36px;
  transform-origin: 50% 10%;
  animation: bell-shake-ring 2.5s ease-in-out infinite;
}
.bell-shake b {
  position: absolute;
  top: -4px;
  right: -8px;
  min-width: 20px;
  padding: 2px 5px;
  border-radius: 999px;
  background: #ef4444;
  color: #fff;
  font: 700 12px/16px system-ui, sans-serif;
  text-align: center;
}
@keyframes bell-shake-ring {
  0%, 60%, 100% { transform: rotate(0); }
  64% { transform: rotate(16deg); }
  70% { transform: rotate(-14deg); }
  76% { transform: rotate(10deg); }
  82% { transform: rotate(-6deg); }
  88% { transform: rotate(2deg); }
}`,
  },
  {
    id: "skeleton-shimmer",
    title: "Skeleton shimmer",
    category: "Feedback",
    html: `<div class="skeleton-shimmer" aria-hidden="true"><i class="skeleton-shimmer-avatar"></i><div><i></i><i></i></div></div>`,
    css: `.skeleton-shimmer {
  display: flex;
  gap: 12px;
  width: min(220px, 100%);
  --skeleton-shimmer-base: color-mix(in srgb, currentColor 12%, transparent);
}
.skeleton-shimmer div {
  flex: 1;
  display: grid;
  gap: 8px;
  align-content: center;
}
.skeleton-shimmer i {
  display: block;
  height: 12px;
  border-radius: 6px;
  background: linear-gradient(90deg, var(--skeleton-shimmer-base) 30%, color-mix(in srgb, currentColor 24%, transparent) 50%, var(--skeleton-shimmer-base) 70%) 0 0 / 300% 100%;
  animation: skeleton-shimmer-move 1.4s linear infinite;
}
.skeleton-shimmer div i:last-child { width: 60%; }
.skeleton-shimmer .skeleton-shimmer-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
@keyframes skeleton-shimmer-move {
  from { background-position: 100% 0; }
  to { background-position: 0 0; }
}`,
  },
  {
    id: "gradient-text",
    title: "Flowing gradient text",
    category: "Text",
    html: `<h3 class="gradient-text">Make it move.</h3>`,
    css: `.gradient-text {
  margin: 0;
  font: 800 30px/1.1 system-ui, sans-serif;
  white-space: nowrap;
  letter-spacing: -0.03em;
  background: linear-gradient(90deg, #6d5dfc, #22d3ee, #f472b6, #6d5dfc) 0 0 / 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradient-text-flow 4s linear infinite;
}
@keyframes gradient-text-flow {
  to { background-position: 300% 0; }
}`,
  },
  {
    id: "typewriter",
    title: "Typewriter",
    category: "Text",
    html: `<p class="typewriter">Hello, world_</p>`,
    css: `.typewriter {
  margin: 0;
  width: 13ch;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid var(--mu-accent, #6d5dfc);
  font: 600 22px/1.3 ui-monospace, monospace;
  animation:
    typewriter-type 2.6s steps(13) infinite alternate,
    typewriter-caret 0.7s step-end infinite;
}
@keyframes typewriter-type {
  0%, 15% { width: 0; }
  85%, 100% { width: 13ch; }
}
@keyframes typewriter-caret {
  50% { border-color: transparent; }
}`,
  },
  {
    id: "underline-link",
    title: "Growing underline",
    category: "Text",
    html: `<a class="underline-link" href="#">Hover this link</a>`,
    css: `.underline-link {
  color: inherit;
  font: 600 18px/1.4 system-ui, sans-serif;
  text-decoration: none;
  background: linear-gradient(var(--mu-accent, #6d5dfc), var(--mu-accent, #6d5dfc)) 0 100% / 0 2px no-repeat;
  transition: background-size 0.3s ease;
}
.underline-link:hover,
.underline-link:focus-visible {
  background-size: 100% 2px;
}`,
  },
  {
    id: "lift-card",
    title: "Lift & glow card",
    category: "Cards",
    html: `<article class="lift-card"><b>Pro plan</b><span>Everything, unlimited.</span></article>`,
    css: `.lift-card {
  display: grid;
  gap: 6px;
  width: 200px;
  padding: 20px;
  border: 1px solid color-mix(in srgb, currentColor 15%, transparent);
  border-radius: 16px;
  font: 15px/1.4 system-ui, sans-serif;
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s, border-color 0.3s;
}
.lift-card span { opacity: 0.7; }
.lift-card:hover {
  transform: translateY(-6px);
  border-color: var(--mu-accent, #6d5dfc);
  box-shadow: 0 18px 40px -12px color-mix(in srgb, var(--mu-accent, #6d5dfc) 55%, transparent);
}`,
  },
  {
    id: "flip-card",
    title: "3D flip card",
    category: "Cards",
    html: `<div class="flip-card" tabindex="0"><div class="flip-card-inner"><div class="flip-card-front">Hover me</div><div class="flip-card-back">Hello 👋</div></div></div>`,
    css: `.flip-card {
  width: 180px;
  height: 110px;
  perspective: 800px;
  font: 600 17px/1 system-ui, sans-serif;
  outline: none;
}
.flip-card-inner {
  position: relative;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.3, 1.3, 0.5, 1);
}
.flip-card:hover .flip-card-inner,
.flip-card:focus-visible .flip-card-inner {
  transform: rotateY(180deg);
}
.flip-card-front,
.flip-card-back {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  border-radius: 14px;
  backface-visibility: hidden;
}
.flip-card-front {
  border: 1.5px dashed color-mix(in srgb, currentColor 35%, transparent);
}
.flip-card-back {
  background: var(--mu-accent, #6d5dfc);
  color: #fff;
  transform: rotateY(180deg);
}`,
  },
  {
    id: "orbit",
    title: "Orbit",
    category: "Decorative",
    html: `<div class="orbit" aria-hidden="true"><i></i><i></i></div>`,
    css: `.orbit {
  position: relative;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 1px dashed color-mix(in srgb, currentColor 30%, transparent);
}
.orbit::before {
  content: "";
  position: absolute;
  inset: 32px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ffd27a, #f59e0b);
}
.orbit i {
  position: absolute;
  inset: 0;
  animation: orbit-spin 3s linear infinite;
}
.orbit i::after {
  content: "";
  position: absolute;
  top: -6px;
  left: calc(50% - 6px);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--mu-accent, #6d5dfc);
}
.orbit i:nth-child(2) {
  inset: 16px;
  animation-duration: 1.8s;
  animation-direction: reverse;
}
.orbit i:nth-child(2)::after {
  width: 8px;
  height: 8px;
  top: -4px;
  left: calc(50% - 4px);
  background: #22d3ee;
}
@keyframes orbit-spin {
  to { transform: rotate(1turn); }
}`,
  },
];

/** Adds the reduced-motion rule every snippet should ship with. */
export function withReducedMotion(css, id) {
  return `${css}
@media (prefers-reduced-motion: reduce) {
  .${id}, .${id} * , .${id}::before, .${id}::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`;
}
