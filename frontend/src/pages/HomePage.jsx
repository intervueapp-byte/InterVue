import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
  ChevronRightIcon,
  StarIcon,
  ShieldCheckIcon,
  ClockIcon,
  BarChart3Icon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;0,9..144,800;0,9..144,900;1,9..144,300;1,9..144,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  :root {
    --ink:      #07070C;
    --card:     #0E0E18;
    --card2:    #111120;
    --border:   rgba(255,255,255,0.07);
    --border-h: rgba(255,255,255,0.13);
    --gold:     #C8A45A;
    --gold-lt:  #E2C07A;
    --gold-dk:  #7A5F28;
    --text:     #ECEDF4;
    --text-sub: #72788A;
    --accent:   #5B8FF9;
    --green:    #3ECF8E;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--ink);
    color: var(--text);
    font-family: 'Plus Jakarta Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
  }

  /* Grain */
  body::after {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.028; pointer-events: none; z-index: 9999;
  }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: 72px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 3rem;
    background: rgba(7,7,12,0.6);
    backdrop-filter: blur(24px) saturate(180%);
    border-bottom: 1px solid var(--border);
    transition: background 0.3s;
  }

  .logo-wrap { display: flex; align-items: center; gap: 0.8rem; text-decoration: none; }
  .logo-gem {
    width: 38px; height: 38px; border-radius: 11px;
    background: linear-gradient(145deg, var(--gold-lt), var(--gold-dk));
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 24px rgba(200,164,90,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
  }
  .logo-name {
    font-family: 'Fraunces', serif;
    font-weight: 700; font-size: 1.35rem;
    letter-spacing: -0.01em;
    color: var(--text);
  }
  .logo-name span { color: var(--gold); }

  .nav-links { display: flex; align-items: center; gap: 2.5rem; }
  .nav-link {
    font-size: 0.875rem; font-weight: 500; color: var(--text-sub);
    text-decoration: none; letter-spacing: 0.01em;
    transition: color 0.2s;
  }
  .nav-link:hover { color: var(--text); }

  .nav-cta {
    display: inline-flex; align-items: center; gap: 0.45rem;
    padding: 0.6rem 1.35rem;
    background: var(--gold);
    color: #07070C;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700; font-size: 0.85rem; letter-spacing: 0.02em;
    border: none; border-radius: 9px; cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 16px rgba(200,164,90,0.28);
  }
  .nav-cta:hover { background: var(--gold-lt); box-shadow: 0 4px 24px rgba(200,164,90,0.4); transform: translateY(-1px); }

  /* ── HERO ── */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: center;
    padding: 120px 3rem 80px;
    overflow: hidden;
  }

  /* Background atmosphere */
  .hero-bg {
    position: absolute; inset: 0; pointer-events: none;
  }
  .hero-bg::before {
    content: '';
    position: absolute;
    width: 900px; height: 900px;
    top: -200px; right: -250px;
    background: radial-gradient(circle, rgba(200,164,90,0.09) 0%, transparent 65%);
    border-radius: 50%;
  }
  .hero-bg::after {
    content: '';
    position: absolute;
    width: 700px; height: 700px;
    bottom: -200px; left: -150px;
    background: radial-gradient(circle, rgba(91,143,249,0.07) 0%, transparent 65%);
    border-radius: 50%;
  }
  .grid-overlay {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: radial-gradient(ellipse 75% 75% at 60% 40%, black 30%, transparent 100%);
  }

  .hero-inner {
    position: relative; z-index: 2;
    max-width: 1240px; margin: 0 auto; width: 100%;
    display: grid; grid-template-columns: 55% 45%; gap: 4rem; align-items: center;
  }

  /* Eyebrow pill */
  .eyebrow {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.4rem 1.1rem;
    background: rgba(200,164,90,0.08);
    border: 1px solid rgba(200,164,90,0.25);
    border-radius: 100px;
    font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--gold);
    margin-bottom: 1.75rem;
  }
  .eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); box-shadow: 0 0 8px var(--gold); }

  /* Hero headline */
  .hero-h1 {
    font-family: 'Fraunces', serif;
    font-weight: 900;
    font-size: clamp(3.2rem, 5.5vw, 5rem);
    line-height: 1.02;
    letter-spacing: -0.03em;
    margin-bottom: 1.75rem;
    color: var(--text);
  }
  .hero-h1 em {
    font-style: italic;
    background: linear-gradient(100deg, var(--gold-lt) 10%, var(--gold) 90%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .hero-h1 .dim { color: rgba(236,237,244,0.45); }

  .hero-body {
    font-size: 1.1rem; font-weight: 300; line-height: 1.8;
    color: var(--text-sub); max-width: 500px; margin-bottom: 2.75rem;
    letter-spacing: 0.01em;
  }

  /* CTA row */
  .cta-row { display: flex; align-items: center; gap: 1.25rem; margin-bottom: 3.5rem; flex-wrap: wrap; }

  .btn-hero-primary {
    display: inline-flex; align-items: center; gap: 0.6rem;
    padding: 1rem 2.25rem;
    background: linear-gradient(135deg, var(--gold-lt), var(--gold));
    color: #07070C;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 800; font-size: 0.95rem; letter-spacing: 0.01em;
    border: none; border-radius: 12px; cursor: pointer;
    box-shadow: 0 6px 28px rgba(200,164,90,0.35), inset 0 1px 0 rgba(255,255,255,0.2);
    transition: all 0.25s;
  }
  .btn-hero-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(200,164,90,0.5); }

  .btn-hero-ghost {
    display: inline-flex; align-items: center; gap: 0.6rem;
    padding: 1rem 2rem;
    background: transparent; color: var(--text);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 600; font-size: 0.95rem;
    border: 1px solid var(--border-h); border-radius: 12px; cursor: pointer;
    transition: all 0.2s;
  }
  .btn-hero-ghost:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.2); }

  /* Stats */
  .hero-stats { display: flex; gap: 0; }
  .stat-block { padding-right: 2.5rem; margin-right: 2.5rem; border-right: 1px solid var(--border); }
  .stat-block:last-child { border-right: none; padding-right: 0; margin-right: 0; }
  .stat-num {
    font-family: 'Fraunces', serif; font-weight: 700; font-size: 2.1rem;
    line-height: 1;
    background: linear-gradient(135deg, var(--gold-lt), var(--gold));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .stat-label { font-size: 0.78rem; font-weight: 500; color: var(--text-sub); margin-top: 0.3rem; letter-spacing: 0.05em; text-transform: uppercase; }

  /* ── HERO VISUAL (right side) ── */
  .hero-visual { position: relative; }

  .mock-window {
    background: var(--card);
    border: 1px solid var(--border-h);
    border-radius: 18px;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.04),
      0 40px 100px rgba(0,0,0,0.7),
      0 10px 30px rgba(0,0,0,0.4);
  }

  .mock-titlebar {
    display: flex; align-items: center; gap: 0.55rem;
    padding: 0.85rem 1.2rem;
    background: rgba(255,255,255,0.025);
    border-bottom: 1px solid var(--border);
  }
  .td { width: 11px; height: 11px; border-radius: 50%; }
  .td-r { background: #FF5F57; } .td-y { background: #FEBC2E; } .td-g { background: #28C840; }
  .mock-tab {
    margin-left: 0.75rem;
    background: rgba(255,255,255,0.07);
    border-radius: 6px;
    padding: 0.25rem 0.85rem;
    font-size: 0.7rem; color: var(--text-sub); font-family: monospace;
  }

  .mock-split { display: grid; grid-template-columns: 1fr 0.85fr; }

  .mock-code {
    padding: 1.4rem 1.25rem;
    border-right: 1px solid var(--border);
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.7rem; line-height: 2;
    color: #64748B;
    min-height: 220px;
  }
  .kw { color: #C792EA; } .fn { color: #7EC8E3; } .str { color: #A8CC8C; }
  .cmt { color: #3D5166; } .num { color: var(--gold-lt); } .op { color: #89DDFF; }

  .mock-cam { padding: 1rem; display: flex; flex-direction: column; gap: 0.8rem; }
  .cam-tile {
    flex: 1; border-radius: 10px; min-height: 85px;
    background: linear-gradient(135deg, #0d1829, #111827);
    border: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .cam-tile::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 35% 35%, rgba(91,143,249,0.1), transparent 55%); }
  .cam-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    border: 2px solid var(--gold);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Fraunces', serif; font-size: 0.85rem; font-weight: 700;
    color: #C8C8D8; background: linear-gradient(135deg, #1a2f50, #111827);
    box-shadow: 0 0 20px rgba(200,164,90,0.2); z-index: 1;
  }
  .cam-name { position: absolute; bottom: 7px; left: 9px; font-size: 0.62rem; font-weight: 600; color: rgba(255,255,255,0.55); background: rgba(0,0,0,0.55); padding: 2px 7px; border-radius: 100px; }

  .mock-statusbar {
    padding: 0.65rem 1.2rem;
    border-top: 1px solid var(--border);
    display: flex; align-items: center; gap: 0.6rem;
    background: rgba(255,255,255,0.015);
  }
  .status-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); box-shadow: 0 0 8px var(--green); }
  .status-text { font-size: 0.68rem; color: var(--text-sub); font-family: monospace; }

  /* Floating badges on hero visual */
  .badge-float {
    position: absolute;
    display: flex; align-items: center; gap: 0.45rem;
    background: var(--card2);
    border: 1px solid var(--border-h);
    border-radius: 12px;
    padding: 0.55rem 1rem;
    font-size: 0.73rem; font-weight: 600; color: var(--text);
    box-shadow: 0 12px 32px rgba(0,0,0,0.5);
    white-space: nowrap;
  }
  .badge-float.b1 { bottom: -16px; left: -32px; animation: bfloat 5s ease-in-out infinite; }
  .badge-float.b2 { top: 48px; right: -28px; animation: bfloat 5s ease-in-out infinite 2s; }
  @keyframes bfloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
  .live-pip { width: 7px; height: 7px; border-radius: 50%; background: var(--green); box-shadow: 0 0 8px var(--green); animation: pip 2s infinite; }
  @keyframes pip { 0%,100%{opacity:1}50%{opacity:0.4} }

  /* Live banner */
  .live-banner {
    position: absolute; top: -14px; right: 18px;
    display: flex; align-items: center; gap: 0.45rem;
    background: var(--card2); border: 1px solid rgba(200,164,90,0.3); border-radius: 100px;
    padding: 0.35rem 0.85rem;
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
    color: var(--gold-lt);
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  }

  /* ── MARQUEE ── */
  .marquee-wrap { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 1.6rem 0; overflow: hidden; }
  .marquee-inner { display: flex; align-items: center; gap: 0; }
  .marquee-label { flex-shrink: 0; padding: 0 2.5rem; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-sub); border-right: 1px solid var(--border); margin-right: 3rem; }
  .marquee-track { display: flex; gap: 4rem; align-items: center; }
  .marquee-co { font-family: 'Fraunces', serif; font-weight: 700; font-size: 1rem; color: rgba(255,255,255,0.16); white-space: nowrap; transition: color 0.2s; }
  .marquee-co:hover { color: rgba(255,255,255,0.38); }

  /* ── SECTION SHARED ── */
  .section { max-width: 1240px; margin: 0 auto; padding: 8rem 3rem; }

  .s-eyebrow {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.25rem;
  }
  .s-eyebrow::before { content: ''; display: inline-block; width: 20px; height: 1.5px; background: var(--gold); border-radius: 2px; }

  .s-title {
    font-family: 'Fraunces', serif;
    font-weight: 800; font-size: clamp(2.1rem, 3.5vw, 3rem);
    letter-spacing: -0.025em; line-height: 1.1;
    margin-bottom: 1.25rem;
  }
  .s-sub { font-size: 1.05rem; font-weight: 300; color: var(--text-sub); line-height: 1.8; max-width: 500px; margin-bottom: 4rem; }

  /* ── FEATURES ── */
  .feat-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    border: 1px solid var(--border); border-radius: 20px; overflow: hidden;
    gap: 1px; background: var(--border);
  }
  .feat-cell {
    background: var(--card); padding: 2.75rem 2.25rem;
    position: relative; overflow: hidden;
    transition: background 0.25s;
  }
  .feat-cell::after {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--gold-lt), var(--gold-dk));
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.35s ease;
  }
  .feat-cell:hover { background: #121222; }
  .feat-cell:hover::after { transform: scaleX(1); }

  .feat-icon {
    width: 50px; height: 50px; border-radius: 14px;
    background: rgba(200,164,90,0.09);
    border: 1px solid rgba(200,164,90,0.18);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.6rem;
    transition: box-shadow 0.3s;
  }
  .feat-cell:hover .feat-icon { box-shadow: 0 0 24px rgba(200,164,90,0.18); }

  .feat-h { font-family: 'Fraunces', serif; font-weight: 700; font-size: 1.05rem; margin-bottom: 0.75rem; letter-spacing: -0.01em; }
  .feat-p { font-size: 0.875rem; font-weight: 300; color: var(--text-sub); line-height: 1.75; }

  /* ── HOW IT WORKS ── */
  .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
  .step { text-align: center; padding: 2.5rem 1.5rem; }
  .step-n {
    width: 68px; height: 68px; border-radius: 50%;
    background: rgba(200,164,90,0.08);
    border: 1px solid rgba(200,164,90,0.22);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.75rem;
    font-family: 'Fraunces', serif; font-weight: 900; font-size: 1.5rem; color: var(--gold);
    box-shadow: 0 0 40px rgba(200,164,90,0.08);
    transition: box-shadow 0.3s;
  }
  .step:hover .step-n { box-shadow: 0 0 50px rgba(200,164,90,0.2); }
  .step-h { font-family: 'Fraunces', serif; font-weight: 700; font-size: 1.1rem; margin-bottom: 0.85rem; letter-spacing: -0.01em; }
  .step-p { font-size: 0.875rem; font-weight: 300; color: var(--text-sub); line-height: 1.8; }

  /* ── TESTIMONIALS ── */
  .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .testi {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 18px; padding: 2.25rem;
    transition: border-color 0.3s, transform 0.3s;
  }
  .testi:hover { border-color: rgba(200,164,90,0.22); transform: translateY(-5px); }
  .stars { display: flex; gap: 4px; margin-bottom: 1.25rem; }
  .quote {
    font-size: 0.925rem; font-weight: 300; font-style: italic;
    color: var(--text-sub); line-height: 1.8; margin-bottom: 1.75rem;
  }
  .quote b { color: var(--text); font-weight: 600; font-style: normal; }
  .testi-person { display: flex; align-items: center; gap: 0.8rem; }
  .t-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    background: linear-gradient(135deg, #1a2f50, #111827);
    border: 1.5px solid rgba(200,164,90,0.28);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Fraunces', serif; font-weight: 700; font-size: 0.85rem; color: #B0B8CC;
  }
  .t-name { font-family: 'Fraunces', serif; font-weight: 700; font-size: 0.9rem; letter-spacing: -0.01em; }
  .t-role { font-size: 0.73rem; color: var(--text-sub); margin-top: 0.15rem; }

  /* ── CTA SECTION ── */
  .cta-wrap { max-width: 1240px; margin: 0 auto 8rem; padding: 0 3rem; }
  .cta-box {
    background: linear-gradient(140deg, #12101E, #1A1630);
    border: 1px solid rgba(200,164,90,0.18);
    border-radius: 28px; padding: 6rem 3rem;
    text-align: center; position: relative; overflow: hidden;
  }
  .cta-box::before {
    content: '';
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 55%; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .cta-glow {
    position: absolute; top: -180px; left: 50%; transform: translateX(-50%);
    width: 600px; height: 500px;
    background: radial-gradient(ellipse, rgba(200,164,90,0.07), transparent 70%);
    pointer-events: none;
  }
  .cta-h {
    font-family: 'Fraunces', serif; font-weight: 900;
    font-size: clamp(2.25rem, 4vw, 3.5rem);
    letter-spacing: -0.03em; line-height: 1.05;
    margin-bottom: 1.25rem; position: relative;
  }
  .cta-h em {
    font-style: italic;
    background: linear-gradient(100deg, var(--gold-lt), var(--gold));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .cta-p { font-size: 1.05rem; font-weight: 300; color: var(--text-sub); margin-bottom: 3rem; position: relative; line-height: 1.75; }
  .cta-btns { display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; position: relative; }

  /* ── FOOTER ── */
  footer {
    border-top: 1px solid var(--border);
    max-width: 1240px; margin: 0 auto;
    padding: 2.5rem 3rem;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.25rem;
  }
  .foot-copy { font-size: 0.78rem; color: var(--text-sub); }
  .foot-links { display: flex; gap: 2.25rem; }
  .foot-link { font-size: 0.78rem; color: var(--text-sub); text-decoration: none; transition: color 0.2s; }
  .foot-link:hover { color: var(--text); }

  /* ── ENTRY ANIMS ── */
  @keyframes up { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  .a { opacity:0; animation: up 0.75s cubic-bezier(0.16,1,0.3,1) forwards; }
  .d1{animation-delay:.08s} .d2{animation-delay:.2s} .d3{animation-delay:.34s}
  .d4{animation-delay:.48s} .d5{animation-delay:.62s}

  /* ── RESPONSIVE ── */
  @media(max-width:1024px){
    .hero-inner { grid-template-columns: 1fr; }
    .feat-grid { grid-template-columns: 1fr 1fr; }
    .steps { grid-template-columns: 1fr; }
    .testi-grid { grid-template-columns: 1fr; }
    .mock-split { grid-template-columns: 1fr; }
    .mock-code { border-right: none; border-bottom: 1px solid var(--border); }
  }
  @media(max-width:768px){
    .nav { padding: 0 1.5rem; }
    .nav-links { display: none; }
    .hero { padding: 100px 1.5rem 60px; }
    .section, .cta-wrap { padding-left: 1.5rem; padding-right: 1.5rem; }
    .feat-grid { grid-template-columns: 1fr; }
    .cta-box { padding: 4rem 1.75rem; }
    footer { padding: 2rem 1.5rem; flex-direction: column; align-items: flex-start; }
    .hero-stats { flex-wrap: wrap; gap: 1.5rem; }
    .stat-block { border-right: none; margin-right: 0; padding-right: 0; }
    .badge-float { display: none; }
  }
`;

export default function HomePage() {
  return (
    <>
      <style>{css}</style>
      <div style={{ background: "var(--ink)", minHeight: "100vh" }}>

        {/* NAV */}
        <nav className="nav">
          <Link to="/" className="logo-wrap">
            <div className="logo-gem">
              <SparklesIcon size={18} color="#07070C" strokeWidth={2.5} />
            </div>
            <span className="logo-name">Inter<span>Vue</span></span>
          </Link>

          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#process" className="nav-link">How it works</a>
            <a href="#reviews" className="nav-link">Reviews</a>
          </div>

          <SignInButton mode="modal">
            <button className="nav-cta">
              Get Started <ChevronRightIcon size={13} />
            </button>
          </SignInButton>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="grid-overlay" />

          <div className="hero-inner">
            {/* Left */}
            <div>
              <div className="eyebrow a d1">
                <span className="eyebrow-dot" />
                Real-time Interview Platform
              </div>

              <h1 className="hero-h1 a d2">
                Interview<br />
                <em>smarter.</em><br />
                <span className="dim">Hire better.</span>
              </h1>

              <p className="hero-body a d3">
                InterVue is a live technical interview platform where candidates and
                interviewers share a real-time code editor, HD video, and instant execution
                — everything needed to assess real engineering skill.
              </p>

              <div className="cta-row a d4">
                <SignInButton mode="modal">
                  <button className="btn-hero-primary">
                    Start for free <ArrowRightIcon size={16} />
                  </button>
                </SignInButton>
                <button className="btn-hero-ghost">
                  <VideoIcon size={16} />
                  Watch demo
                </button>
              </div>

              <div className="hero-stats a d5">
                <div className="stat-block">
                  <div className="stat-num">10K+</div>
                  <div className="stat-label">Active Users</div>
                </div>
                <div className="stat-block">
                  <div className="stat-num">50K+</div>
                  <div className="stat-label">Sessions Held</div>
                </div>
                <div className="stat-block">
                  <div className="stat-num">99.9%</div>
                  <div className="stat-label">Uptime</div>
                </div>
              </div>
            </div>

            {/* Right — mock window */}
            <div className="hero-visual a d3">
              <div className="live-banner">
                <span className="live-pip" /> Live
              </div>

              <div className="mock-window">
                <div className="mock-titlebar">
                  <div className="td td-r"/><div className="td td-y"/><div className="td td-g"/>
                  <span className="mock-tab">solution.js</span>
                </div>
                <div className="mock-split">
                  <div className="mock-code">
                    <div><span className="cmt">// Two Sum · O(n) solution</span></div>
                    <div><span className="kw">function</span> <span className="fn">twoSum</span><span className="op">(</span>nums, target<span className="op">) {"{"}</span></div>
                    <div>&nbsp;&nbsp;<span className="kw">const</span> map <span className="op">=</span> <span className="kw">new</span> <span className="fn">Map</span>();</div>
                    <div>&nbsp;&nbsp;<span className="kw">for</span> (<span className="kw">let</span> i <span className="op">=</span> <span className="num">0</span>; i <span className="op">&lt;</span> nums.length; i++) {"{"}</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">const</span> diff <span className="op">=</span> target <span className="op">-</span> nums[i];</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">if</span> (map.<span className="fn">has</span>(diff)) {"{"}</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">return</span> [map.<span className="fn">get</span>(diff), i];</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;{"}"}</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;map.<span className="fn">set</span>(nums[i], i);</div>
                    <div>&nbsp;&nbsp;{"}"}</div>
                    <div>{"}"}</div>
                  </div>
                  <div className="mock-cam">
                    <div className="cam-tile">
                      <div className="cam-avatar">AK</div>
                      <span className="cam-name">Aryan K.</span>
                    </div>
                    <div className="cam-tile">
                      <div className="cam-avatar" style={{ borderColor: "var(--accent)" }}>SR</div>
                      <span className="cam-name">Interviewer</span>
                    </div>
                  </div>
                </div>
                <div className="mock-statusbar">
                  <span className="status-dot"/>
                  <span className="status-text">All tests passing · JS · 64ms · Memory: 42.1 MB</span>
                </div>
              </div>

              <div className="badge-float b1">
                <CheckIcon size={12} color="var(--green)" />
                JS · Python · Go · Java · C++
              </div>
              <div className="badge-float b2">
                <ShieldCheckIcon size={12} color="var(--gold)" />
                Sandboxed & Secure
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee-wrap">
          <div className="marquee-inner">
            <span className="marquee-label">Used by engineers at</span>
            <div className="marquee-track">
              {["Google","Microsoft","Amazon","Meta","Stripe","Atlassian","Uber","Airbnb","Razorpay","PhonePe"].map(c => (
                <span key={c} className="marquee-co">{c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div id="features" className="section">
          <span className="s-eyebrow">Platform</span>
          <h2 className="s-title">Built for how real<br />interviews happen</h2>
          <p className="s-sub">
            No fluff, no friction. Every feature exists to make the interview itself
            clearer, faster, and more revealing of true engineering ability.
          </p>

          <div className="feat-grid">
            {[
              { icon: <VideoIcon size={22} color="var(--gold)" />, h: "HD Video & Audio", p: "Adaptive streaming with noise cancellation keeps the conversation natural, even on unstable connections." },
              { icon: <Code2Icon size={22} color="var(--gold)" />, h: "Collaborative Editor", p: "Monaco-powered, real-time synced editor with syntax highlighting across 40+ languages and a shared terminal." },
              { icon: <ZapIcon size={22} color="var(--gold)" />, h: "Instant Code Execution", p: "Sandboxed runner returns stdout, stderr, and test results in milliseconds — zero configuration needed." },
              { icon: <UsersIcon size={22} color="var(--gold)" />, h: "Interviewer Dashboard", p: "Build question banks, rate candidates live, add private notes, and export full session summaries." },
              { icon: <BarChart3Icon size={22} color="var(--gold)" />, h: "Performance Analytics", p: "Keystroke replay, complexity heatmaps, and AI-assisted scoring give you objective, defensible assessments." },
              { icon: <ClockIcon size={22} color="var(--gold)" />, h: "Session Recordings", p: "Every session is recorded automatically. Share with your team, review edge cases, or audit fairness." },
            ].map(({ icon, h, p }) => (
              <div key={h} className="feat-cell">
                <div className="feat-icon">{icon}</div>
                <div className="feat-h">{h}</div>
                <p className="feat-p">{p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div id="process" className="section" style={{ paddingTop: 0 }}>
          <span className="s-eyebrow">Process</span>
          <h2 className="s-title">Three steps to a<br />great interview</h2>
          <p className="s-sub">From invite to decision in under an hour.</p>

          <div className="steps">
            {[
              { n: "01", h: "Create a Room", p: "One click generates a secure, expiring room link. Your candidate joins with no account, no download, no friction." },
              { n: "02", h: "Code Together", p: "Editor, video, and sandbox launch instantly for both participants. Focus entirely on the problem — not the tooling." },
              { n: "03", h: "Review & Decide", p: "Post-session playback, scoring rubrics, and team notes make hiring decisions fast, fair, and documented." },
            ].map(({ n, h, p }) => (
              <div key={n} className="step">
                <div className="step-n">{n}</div>
                <div className="step-h">{h}</div>
                <p className="step-p">{p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div id="reviews" className="section" style={{ paddingTop: 0 }}>
          <span className="s-eyebrow">Reviews</span>
          <h2 className="s-title">Engineers and hiring teams<br />love InterVue</h2>

          <div className="testi-grid">
            {[
              { q: <>"The editor is <b>buttery smooth</b>. I've used CoderPad and HackerRank — InterVue is a level above in terms of feel and reliability."</>, name: "Priya Sharma", role: "SWE · ex-Flipkart", init: "PS" },
              { q: <>"We cut screening time by <b>40%</b>. The question bank and session replay changed how our entire hiring pipeline works."</>, name: "James O'Brien", role: "Eng Manager · Fintech", init: "JO" },
              { q: <>"As a candidate I <b>actually enjoyed</b> the session. Clean, zero lag. Got the offer right after my InterVue interview."</>, name: "Arjun Menon", role: "Full-stack Engineer", init: "AM" },
            ].map(({ q, name, role, init }) => (
              <div key={name} className="testi">
                <div className="stars">
                  {[...Array(5)].map((_,i) => <StarIcon key={i} size={13} fill="var(--gold)" color="var(--gold)" />)}
                </div>
                <p className="quote">{q}</p>
                <div className="testi-person">
                  <div className="t-avatar">{init}</div>
                  <div>
                    <div className="t-name">{name}</div>
                    <div className="t-role">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-wrap">
          <div className="cta-box">
            <div className="cta-glow" />
            <h2 className="cta-h">Start your first<br /><em>interview today.</em></h2>
            <p className="cta-p">
              Join thousands of engineers and hiring teams on InterVue.<br />
              Free to start — no credit card required.
            </p>
            <div className="cta-btns">
              <SignInButton mode="modal">
                <button className="btn-hero-primary">
                  Get started free <ArrowRightIcon size={16} />
                </button>
              </SignInButton>
              <button className="btn-hero-ghost">Schedule a demo</button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div className="logo-gem" style={{ width: 28, height: 28, borderRadius: 8 }}>
              <SparklesIcon size={13} color="#07070C" strokeWidth={2.5} />
            </div>
            <span className="foot-copy">© 2025 InterVue · Final Year Project</span>
          </div>
          <div className="foot-links">
            <a href="#" className="foot-link">Privacy</a>
            <a href="#" className="foot-link">Terms</a>
            <a href="#" className="foot-link">Contact</a>
          </div>
        </footer>

      </div>
    </>
  );
}