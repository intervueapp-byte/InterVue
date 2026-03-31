/* ══════════════════════════════════════════════════════════════════
   ProblemPage.jsx  —  Full Redesign for InterVue
   Design: Editorial dark workspace — Linear / Vercel aesthetic
   Fonts: Fraunces (brand) + Plus Jakarta Sans (UI) + JetBrains Mono (code/data)
══════════════════════════════════════════════════════════════════ */

import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import { UserButton } from "@clerk/clerk-react";

import { PROBLEMS } from "../data/problems";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";
import { useAxios } from "../lib/useAxios";
import { LANGUAGE_CONFIG } from "../data/problems";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

import {
  SparklesIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  PlayIcon,
  Loader2Icon,
  CheckCheck,
  XCircleIcon,
  ZapIcon,
  Code2Icon,
  TerminalIcon,
  BookOpenIcon,
  TimerIcon,
  BarChart3Icon,
  CircleCheckBigIcon,
  PauseIcon,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════
   GLOBAL CSS
══════════════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,800;0,9..144,900;1,9..144,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  :root {
    --ink:          #07070C;
    --surface:      #0B0B14;
    --card:         #0E0E1A;
    --card2:        #111120;
    --border:       rgba(255,255,255,0.06);
    --border-h:     rgba(255,255,255,0.1);
    --border-gold:  rgba(200,164,90,0.2);

    --gold:         #C8A45A;
    --gold-lt:      #DDB96E;
    --gold-dk:      #7A5F28;
    --gold-dim:     rgba(200,164,90,0.08);
    --gold-glow:    rgba(200,164,90,0.22);

    --text:         #ECEDF4;
    --text-sub:     rgba(236,237,244,0.45);
    --text-dim:     rgba(236,237,244,0.18);

    --green:        #3ECF8E;
    --green-dim:    rgba(62,207,142,0.08);
    --green-border: rgba(62,207,142,0.18);

    --red:          #F87171;
    --red-dim:      rgba(248,113,113,0.08);
    --red-border:   rgba(248,113,113,0.18);

    --amber:        #FBBF24;
    --amber-dim:    rgba(251,191,36,0.08);
    --amber-border: rgba(251,191,36,0.18);

    --accent:       #5B8FF9;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; overflow: hidden; }

  body {
    background: var(--ink);
    color: var(--text);
    font-family: 'Plus Jakarta Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
  }

  /* Subtle noise grain */
  body::after {
    content: '';
    position: fixed; inset: 0; pointer-events: none; z-index: 9999;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.018;
  }

  /* ═══════════════════════════════
     ROOT + AMBIENT
  ═══════════════════════════════ */
  .pp-root {
    display: flex; flex-direction: column;
    height: 100vh; background: var(--ink);
    overflow: hidden; position: relative;
  }

  /* Radial glow — top center */
  .pp-root::before {
    content: '';
    position: fixed; top: -200px; left: 50%; transform: translateX(-50%);
    width: 900px; height: 600px;
    background: radial-gradient(ellipse at 50% 0%,
      rgba(200,164,90,0.04) 0%,
      transparent 60%
    );
    pointer-events: none; z-index: 0;
  }

  /* ═══════════════════════════════
     TOPBAR
  ═══════════════════════════════ */
  .pp-topbar {
    position: relative; z-index: 200; flex-shrink: 0;
    height: 52px;
    display: flex; align-items: center;
    padding: 0 1rem; gap: 0;
    background: rgba(7,7,12,0.92);
    backdrop-filter: blur(32px) saturate(160%);
    border-bottom: 1px solid var(--border);
  }

  /* Gold shimmer at very top */
  .pp-topbar::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg,
      transparent 0%, rgba(200,164,90,0) 15%,
      rgba(200,164,90,0.5) 42%, var(--gold) 50%,
      rgba(200,164,90,0.5) 58%, rgba(200,164,90,0) 85%, transparent 100%
    );
  }

  /* Topbar sections */
  .tb-left   { display: flex; align-items: center; gap: 0.7rem; flex-shrink: 0; }
  .tb-center { flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0 1rem; min-width: 0; }
  .tb-right  { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }

  .tb-sep { width: 1px; height: 18px; background: var(--border); flex-shrink: 0; }

  /* Logo */
  .pp-logo {
    display: flex; align-items: center; gap: 0.5rem;
    text-decoration: none; flex-shrink: 0;
  }
  .pp-gem {
    width: 28px; height: 28px; border-radius: 8px;
    background: linear-gradient(145deg, var(--gold-lt), var(--gold-dk));
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 14px rgba(200,164,90,0.28), inset 0 1px 0 rgba(255,255,255,0.12);
    flex-shrink: 0;
  }
  .pp-brand {
    font-family: 'Fraunces', serif;
    font-weight: 700; font-size: 1rem;
    color: var(--text); line-height: 1;
    letter-spacing: -0.01em;
  }
  .pp-brand em { font-style: normal; color: var(--gold); }

  /* Back button */
  .pp-back {
    display: inline-flex; align-items: center; gap: 0.28rem;
    padding: 0.25rem 0.6rem; border-radius: 6px;
    font-size: 0.72rem; font-weight: 600;
    color: var(--text-sub); text-decoration: none;
    border: 1px solid transparent;
    transition: all 0.16s;
  }
  .pp-back:hover {
    color: var(--text); border-color: var(--border);
    background: var(--card2);
  }

  /* Problem picker */
  .pp-picker { position: relative; flex-shrink: 0; }
  .pp-picker-btn {
    display: inline-flex; align-items: center; gap: 0.45rem;
    padding: 0.28rem 0.72rem; max-width: 240px;
    background: var(--card2); border: 1px solid var(--border);
    border-radius: 8px; cursor: pointer;
    font-size: 0.78rem; font-weight: 600; color: var(--text);
    transition: all 0.16s;
  }
  .pp-picker-btn:hover { border-color: var(--border-h); background: var(--card); }
  .pp-picker-label { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  /* Arrow nav */
  .pp-arrow {
    width: 26px; height: 26px; border-radius: 6px;
    background: var(--card2); border: 1px solid var(--border);
    color: var(--text-sub);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.16s; flex-shrink: 0;
  }
  .pp-arrow:hover:not(:disabled) { border-color: var(--border-h); color: var(--text); }
  .pp-arrow:disabled { opacity: 0.25; cursor: not-allowed; }

  /* Dropdown */
  .pp-dropdown {
    position: absolute; top: calc(100% + 6px);
    left: 50%; transform: translateX(-50%);
    width: 280px; z-index: 400;
    background: #0E0E1A;
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.02);
    overflow: hidden;
    animation: ddIn 0.14s cubic-bezier(0.16,1,0.3,1);
  }
  @keyframes ddIn {
    from { opacity:0; transform:translateX(-50%) translateY(-6px) scale(0.98); }
    to   { opacity:1; transform:translateX(-50%) translateY(0) scale(1); }
  }
  .pp-dd-inner { max-height: 280px; overflow-y: auto; }
  .pp-dd-inner::-webkit-scrollbar { width: 3px; }
  .pp-dd-inner::-webkit-scrollbar-thumb { background: var(--border-h); border-radius: 2px; }

  .pp-dd-row {
    display: flex; align-items: center; gap: 0.55rem;
    padding: 0.6rem 0.9rem;
    border-bottom: 1px solid var(--border);
    cursor: pointer; transition: background 0.1s;
    font-size: 0.78rem;
  }
  .pp-dd-row:last-child { border-bottom: none; }
  .pp-dd-row:hover { background: rgba(255,255,255,0.02); }
  .pp-dd-row.on { background: var(--gold-dim); }
  .pp-dd-idx {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem; color: var(--text-dim); width: 18px; flex-shrink: 0;
  }
  .pp-dd-name { flex: 1; font-weight: 600; color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .pp-dd-row.on .pp-dd-name { color: var(--gold-lt); }

  /* Difficulty chips (shared) */
  .dc {
    display: inline-flex; align-items: center;
    padding: 0.1rem 0.48rem; border-radius: 100px;
    font-size: 0.58rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.08em;
    border: 1px solid; flex-shrink: 0;
  }
  .dc-easy   { background: var(--green-dim); color: var(--green);  border-color: var(--green-border); }
  .dc-medium { background: var(--amber-dim); color: var(--amber);  border-color: var(--amber-border); }
  .dc-hard   { background: var(--red-dim);   color: var(--red);    border-color: var(--red-border); }

  /* Timer */
  .pp-timer {
    display: inline-flex; align-items: center; gap: 0.35rem;
    padding: 0.24rem 0.65rem; border-radius: 6px;
    background: var(--card2); border: 1px solid var(--border);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem; font-weight: 500; color: var(--text-sub);
    cursor: pointer; transition: all 0.18s; letter-spacing: 0.06em;
    user-select: none;
  }
  .pp-timer:hover { border-color: var(--border-h); color: var(--text); }
  .pp-timer.ticking { color: var(--gold-lt); background: var(--gold-dim); border-color: var(--border-gold); }

  .t-pip { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
  .t-pip.go   { background: var(--green); box-shadow: 0 0 5px var(--green); animation: tpip 1.8s ease-in-out infinite; }
  .t-pip.stop { background: var(--amber); }
  @keyframes tpip { 0%,100%{opacity:1}50%{opacity:0.2} }

  /* Status badge */
  .pp-status {
    display: inline-flex; align-items: center; gap: 0.35rem;
    padding: 0.24rem 0.68rem; border-radius: 6px;
    font-size: 0.7rem; font-weight: 700;
    border: 1px solid; transition: all 0.2s;
    white-space: nowrap;
  }
  .ps-idle    { background: var(--card2);    border-color: var(--border);        color: var(--text-sub); }
  .ps-running { background: var(--gold-dim); border-color: var(--border-gold);   color: var(--gold-lt); }
  .ps-passed  { background: var(--green-dim); border-color: var(--green-border); color: var(--green); }
  .ps-failed  { background: var(--red-dim);   border-color: var(--red-border);   color: var(--red); }

  /* Run button */
  .pp-run {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.42rem 1.1rem;
    background: linear-gradient(135deg, var(--gold-lt) 0%, var(--gold) 100%);
    color: #07070C; border: none; border-radius: 8px; cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 800; font-size: 0.76rem; letter-spacing: 0.02em;
    box-shadow: 0 2px 16px rgba(200,164,90,0.25), inset 0 1px 0 rgba(255,255,255,0.18);
    transition: all 0.18s; position: relative; overflow: hidden;
    white-space: nowrap;
  }
  .pp-run::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent 55%);
    opacity: 0; transition: opacity 0.18s;
  }
  .pp-run:hover:not(:disabled)::after { opacity: 1; }
  .pp-run:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(200,164,90,0.4), inset 0 1px 0 rgba(255,255,255,0.22);
  }
  .pp-run:active:not(:disabled) { transform: none; }
  .pp-run:disabled { opacity: 0.45; cursor: not-allowed; }

  .spin { animation: rot 0.7s linear infinite; }
  @keyframes rot { to { transform: rotate(360deg); } }

  /* ═══════════════════════════════
     BODY + PANEL LAYOUT
  ═══════════════════════════════ */
  .pp-body {
    flex: 1; min-height: 0;
    position: relative; z-index: 1;
    padding: 0.7rem 0.8rem;
    display: flex; gap: 0.5rem;
  }

  /* ═══════════════════════════════
     GLASS CARD — shared panel shell
  ═══════════════════════════════ */
  .gc {
    background: rgba(11,11,20,0.75);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    display: flex; flex-direction: column;
    height: 100%;
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.035),
      0 12px 40px rgba(0,0,0,0.45);
    transition: border-color 0.22s;
    position: relative;
  }
  .gc:hover { border-color: rgba(255,255,255,0.09); }

  /* Inset top shimmer */
  .gc::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.04) 50%, transparent 90%);
    pointer-events: none; z-index: 1;
  }

  /* Card header */
  .gc-head {
    display: flex; align-items: center;
    height: 40px; flex-shrink: 0;
    background: rgba(7,7,12,0.7);
    border-bottom: 1px solid var(--border);
  }

  /* Tab style */
  .gc-tab {
    display: inline-flex; align-items: center; gap: 0.38rem;
    padding: 0 0.9rem; height: 100%;
    font-size: 0.66rem; font-weight: 700;
    letter-spacing: 0.07em; text-transform: uppercase;
    color: var(--text-sub); cursor: pointer;
    border-right: 1px solid var(--border);
    border-bottom: 2px solid transparent; margin-bottom: -1px;
    transition: all 0.14s;
  }
  .gc-tab:hover { color: var(--text); background: rgba(255,255,255,0.015); }
  .gc-tab.on {
    color: var(--gold-lt);
    background: rgba(200,164,90,0.035);
    border-bottom-color: var(--gold);
  }

  /* Active label (non-clickable) */
  .gc-label {
    display: inline-flex; align-items: center; gap: 0.38rem;
    padding: 0 0.9rem; height: 100%;
    font-size: 0.66rem; font-weight: 700;
    letter-spacing: 0.07em; text-transform: uppercase;
    color: var(--gold-lt);
    border-right: 1px solid var(--border);
    border-bottom: 2px solid var(--gold); margin-bottom: -1px;
    background: rgba(200,164,90,0.035);
  }

  .gc-head-r {
    margin-left: auto;
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0 0.85rem;
  }

  .gc-meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem; color: var(--text-dim);
  }

  /* Language selector */
  .gc-lang-sel {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 6px;
  color: rgba(236,237,244,0.75);
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.18rem 1.4rem 0.18rem 0.5rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.gc-lang-sel:hover {
  border-color: rgba(255,255,255,0.14);
}

.gc-lang-sel:focus {
  border-color: rgba(200,164,90,0.4);
  color: var(--text);
}
  .gc-lang-sel:focus { border-color: var(--border-gold); color: var(--text); }
  .gc-lang-sel option { background: #111120; }

  /* Lang pip */
  .lang-badge {
    display: inline-flex; align-items: center; gap: 0.32rem;
    font-size: 0.65rem; font-weight: 600; color: var(--text-sub);
    background: var(--card2); border: 1px solid var(--border);
    border-radius: 5px; padding: 0.14rem 0.5rem;
  }
  .l-pip { width: 6px; height: 6px; border-radius: 50%; }

  /* Keyboard hint */
  .kbhint {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.58rem; color: var(--text-dim);
    background: var(--card2); border: 1px solid var(--border);
    border-radius: 4px; padding: 0.06rem 0.28rem;
  }

  /* Panel body */
  .gc-body {
    flex: 1; min-height: 0; overflow: hidden;
  }

  /* ═══════════════════════════════
     OUTPUT STRIPE
  ═══════════════════════════════ */
  .out-stripe {
    display: flex; align-items: center; gap: 0.5rem;
    height: 36px; flex-shrink: 0;
    padding: 0 0.9rem;
    border-bottom: 1px solid var(--border);
    background: rgba(7,7,12,0.65);
    font-size: 0.71rem; font-weight: 600;
    transition: background 0.25s, border-color 0.25s;
  }
  .out-stripe.s-pass {
    background: linear-gradient(90deg, rgba(62,207,142,0.06), rgba(7,7,12,0.65) 65%);
    border-bottom-color: rgba(62,207,142,0.12);
  }
  .out-stripe.s-fail {
    background: linear-gradient(90deg, rgba(248,113,113,0.06), rgba(7,7,12,0.65) 65%);
    border-bottom-color: rgba(248,113,113,0.12);
  }
  .out-stripe.s-run {
    background: linear-gradient(90deg, rgba(200,164,90,0.05), rgba(7,7,12,0.65) 65%);
    border-bottom-color: rgba(200,164,90,0.1);
  }

  .out-icon {
    width: 22px; height: 22px; border-radius: 6px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .oi-idle { background: var(--card2); border: 1px solid var(--border); }
  .oi-run  { background: var(--gold-dim); border: 1px solid var(--border-gold); }
  .oi-pass { background: var(--green-dim); border: 1px solid var(--green-border); }
  .oi-fail { background: var(--red-dim); border: 1px solid var(--red-border); }

  .out-ms {
    margin-left: auto;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem; color: var(--text-dim);
  }

  /* ═══════════════════════════════
     RESIZE HANDLES
  ═══════════════════════════════ */
  .rh-v {
    width: 7px !important; cursor: col-resize;
    background: transparent !important;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .rh-v::after {
    content: '';
    display: block; width: 2px; height: 36px; border-radius: 2px;
    background: var(--border);
    transition: all 0.18s;
  }
  .rh-v:hover::after, .rh-v[data-resize-handle-active]::after {
    background: var(--gold); height: 52px;
    box-shadow: 0 0 8px var(--gold-glow);
  }

  .rh-h {
    height: 7px !important; cursor: row-resize;
    background: transparent !important;
    display: flex; align-items: center; justify-content: center;
  }
  .rh-h::after {
    content: '';
    display: block; height: 2px; width: 36px; border-radius: 2px;
    background: var(--border);
    transition: all 0.18s;
  }
  .rh-h:hover::after, .rh-h[data-resize-handle-active]::after {
    background: var(--gold); width: 52px;
    box-shadow: 0 0 8px var(--gold-glow);
  }

  /* ═══════════════════════════════
     RESPONSIVE
  ═══════════════════════════════ */
  @media (max-width: 860px) {
    .tb-center { display: none; }
    .pp-timer  { display: none; }
  }
  @media (max-width: 640px) {
    .pp-status { display: none; }
  }

  /* ═══════════════════════════════════════════════════
   REFINEMENT PASS — noise reduction + hierarchy
═══════════════════════════════════════════════════ */

/* 1. Kill the grain texture entirely */
body::after { display: none; }

/* 2. Remove the ambient radial glow — too much atmosphere */
.pp-root::before { display: none; }

/* 3. Topbar — flatten it, one clean line */
.pp-topbar {
  background: #08080F;
  backdrop-filter: none;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  height: 48px;
}

/* Gold shimmer at top — pull it way back */
.pp-topbar::before {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(200,164,90,0.18) 45%,
    rgba(200,164,90,0.18) 55%,
    transparent 100%
  );
  opacity: 0.6;
}

/* Logo gem — no glow, just the gradient */
.pp-gem {
  box-shadow: none;
  border-radius: 7px;
}

/* 4. Glass cards — quieter, less layered */
.gc {
  background: #0C0C18;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.4);
}
.gc:hover { border-color: rgba(255,255,255,0.1); }

/* Remove inset shimmer line — one less layer */
.gc::before { display: none; }

/* 5. Card headers — simpler, darker */
.gc-head {
  background: rgba(6,6,14,0.9);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  height: 38px;
}

/* Active tab — subtler gold underline */
.gc-tab.on {
  color: rgba(200,164,90,0.9);
  background: transparent;
  border-bottom-color: rgba(200,164,90,0.55);
}
.gc-label {
  color: rgba(200,164,90,0.85);
  background: transparent;
  border-bottom-color: rgba(200,164,90,0.45);
}

/* 6. Timer — remove ticking background flash */
.pp-timer.ticking {
  color: rgba(200,164,90,0.8);
  background: transparent;
  border-color: rgba(200,164,90,0.22);
}

/* Pulsing pip — much calmer */
.t-pip.go {
  box-shadow: none;
  animation: tpip 3s ease-in-out infinite;
}
@keyframes tpip { 0%,100%{opacity:1} 50%{opacity:0.35} }

/* 7. Run button — less glow */
.pp-run {
  box-shadow: none;
  border-radius: 7px;
}
.pp-run:hover:not(:disabled) {
  transform: none;
  box-shadow: none;
  opacity: 0.92;
}
.pp-run::after { display: none; }

/* 8. Status badge — flatten */
.ps-idle    { background: transparent; border-color: rgba(255,255,255,0.08); }
.ps-running { background: transparent; border-color: rgba(200,164,90,0.2); }
.ps-passed  { background: transparent; border-color: rgba(62,207,142,0.2); }
.ps-failed  { background: transparent; border-color: rgba(248,113,113,0.2); }

/* 9. Output panel — visually secondary */
/* Smaller, quieter header */
.out-stripe {
  height: 32px;
  font-size: 0.68rem;
  background: #08080F;
  border-bottom-color: rgba(255,255,255,0.05);
}
/* Remove colored gradient washes */
.out-stripe.s-pass,
.out-stripe.s-fail,
.out-stripe.s-run { background: #08080F; }
/* Keep only the border color as the signal */
.out-stripe.s-pass { border-bottom-color: rgba(62,207,142,0.2); }
.out-stripe.s-fail { border-bottom-color: rgba(248,113,113,0.2); }
.out-stripe.s-run  { border-bottom-color: rgba(200,164,90,0.18); }

/* Output icon — smaller, no border drama */
.out-icon {
  width: 20px; height: 20px; border-radius: 5px;
  background: transparent; border: none;
}

/* 10. Resize handles — thinner, more subtle */
.rh-v::after {
  width: 1px; height: 28px;
  background: rgba(255,255,255,0.08);
}
.rh-v:hover::after, .rh-v[data-resize-handle-active]::after {
  background: rgba(200,164,90,0.5);
  height: 40px; box-shadow: none;
}
.rh-h::after {
  height: 1px; width: 28px;
  background: rgba(255,255,255,0.08);
}
.rh-h:hover::after, .rh-h[data-resize-handle-active]::after {
  background: rgba(200,164,90,0.5);
  width: 40px; box-shadow: none;
}

/* 11. Body background — single flat tone */
.pp-body { background: #07070C; padding: 0.65rem 0.75rem; gap: 0.55rem; }

/* 12. Lang badge + kb hint — quieter */
.lang-badge {
  background: transparent; border-color: rgba(255,255,255,0.06);
  color: rgba(236,237,244,0.38);
}
.kbhint {
  background: transparent; border-color: rgba(255,255,255,0.05);
  color: rgba(236,237,244,0.2);
}

/* 13. Dropdown — cleaner */
.pp-dropdown {
  background: #0E0E1C;
  border-color: rgba(255,255,255,0.1);
  box-shadow: 0 16px 48px rgba(0,0,0,0.6);
  border-radius: 10px;
}
.pp-dd-row:hover { background: rgba(255,255,255,0.025); }
.pp-dd-row.on    { background: rgba(200,164,90,0.06); }

/* ═══════════════════════════════════════
   FINAL POLISH — depth + focus
═══════════════════════════════════════ */

/* 1. EDITOR = PRIMARY FOCUS */
.gc {
  transition: border-color 0.2s, box-shadow 0.2s;
}

/* Highlight editor panel slightly */
.gc:has(.CodeMirror), 
.gc:has(textarea) {
  border-color: rgba(200,164,90,0.18);
  box-shadow: 0 0 0 1px rgba(200,164,90,0.08);
}

/* Slight hover emphasis */
.gc:hover {
  border-color: rgba(255,255,255,0.12);
}

/* 2. LEFT PANEL — add subtle section depth */
.gc-body {
  padding-right: 4px;
}

/* softer inner scroll feel */
.gc-body::-webkit-scrollbar {
  width: 4px;
}
.gc-body::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.06);
}

/* 3. RESIZE HANDLE — make it feel smoother */
.rh-v::after,
.rh-h::after {
  opacity: 0.5;
  transition: all 0.2s ease;
}

/* 4. TOPBAR — spacing refinement */
.pp-topbar {
  padding: 0 1.25rem;
}

/* give breathing between groups */
.tb-left,
.tb-right {
  gap: 0.75rem;
}

/* center section tighter */
.tb-center {
  gap: 0.3rem;
}

/* 5. BUTTON INTERACTIONS — more premium feel */
.pp-arrow,
.pp-picker-btn,
.pp-back {
  transition: all 0.15s ease;
}

.pp-arrow:hover,
.pp-picker-btn:hover,
.pp-back:hover {
  background: rgba(255,255,255,0.025);
}

/* 6. EDITOR PANEL HEADER — clearer hierarchy */
.gc-head {
  font-size: 0.72rem;
}

/* editor label stronger */
.gc-label {
  font-weight: 800;
  letter-spacing: 0.08em;
}

/* 7. OUTPUT PANEL — even more secondary */
.gc:has(.out-stripe) {
  opacity: 0.95;
}

/* 8. TEXT SHARPNESS */
body {
  letter-spacing: -0.01em;
}

/* 9. SMALL MICRO-DETAIL — makes UI feel polished */
.gc,
.pp-topbar {
  backdrop-filter: blur(0px);
}
`;

/* ══════════════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════════════ */
const LANG_COLORS = {
  javascript: "#F7DF1E",
  typescript: "#3178C6",
  python: "#3776AB",
  java: "#ED8B00",
  cpp: "#00599C",
  go: "#00ADD8",
  rust: "#CE422B",
};

function diffClass(d = "") {
  const v = d.toLowerCase();
  return v === "easy" ? "dc-easy" : v === "medium" ? "dc-medium" : "dc-hard";
}

function fmtTime(s) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/* ══════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════════════════════════ */

/** Output stripe above the output panel */
function OutStripe({ status, runMs }) {
  if (status === "idle")
    return (
      <div className="out-stripe">
        <div className="out-icon oi-idle">
          <TerminalIcon size={12} color="var(--text-dim)" />
        </div>
        <span style={{ color: "var(--text-sub)" }}>
          Run your code to see results
        </span>
      </div>
    );
  if (status === "running")
    return (
      <div className="out-stripe s-run">
        <div className="out-icon oi-run">
          <Loader2Icon size={12} color="var(--gold)" className="spin" />
        </div>
        <span style={{ color: "var(--gold-lt)" }}>Executing…</span>
      </div>
    );
  if (status === "passed")
    return (
      <div className="out-stripe s-pass">
        <div className="out-icon oi-pass">
          <CircleCheckBigIcon size={12} color="var(--green)" />
        </div>
        <span style={{ color: "var(--green)", fontWeight: 700 }}>
          All tests passed
        </span>
        {runMs && <span className="out-ms">{runMs} ms</span>}
      </div>
    );
  return (
    <div className="out-stripe s-fail">
      <div className="out-icon oi-fail">
        <XCircleIcon size={12} color="var(--red)" />
      </div>
      <span style={{ color: "var(--red)", fontWeight: 700 }}>Wrong answer</span>
      {runMs && <span className="out-ms">{runMs} ms</span>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════ */
export default function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const allProblems = Object.values(PROBLEMS);

  const [probId, setProbId] = useState("two-sum");
  const [lang, setLang] = useState("javascript");
  const [code, setCode] = useState(PROBLEMS["two-sum"].starterCode.javascript);
  const [output, setOutput] = useState(null);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | running | passed | failed
  const [elapsed, setElapsed] = useState(0);
  const [ticking, setTicking] = useState(true);
  const [runMs, setRunMs] = useState(null);
  const [leftTab, setLeftTab] = useState("problem");
  const [ddOpen, setDdOpen] = useState(false);

  const timerRef = useRef(null);
  const ddRef = useRef(null);

  const prob = PROBLEMS[probId];
  const idx = allProblems.findIndex((p) => p.id === probId);
  const axios = useAxios();
  /* ── timer ── */
  useEffect(() => {
    clearInterval(timerRef.current);
    if (ticking)
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [ticking]);

  /* ── route sync ── */
  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setProbId(id);
      setCode(PROBLEMS[id].starterCode[lang]);
      setOutput(null);
      setStatus("idle");
      setElapsed(0);
      setTicking(true);
      setLeftTab("problem");
    }
  }, [id, lang]);

  /* ── close dropdown on outside click ── */
  useEffect(() => {
    const h = (e) => {
      if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const changeLang = (e) => {
    const l = e.target.value;
    setLang(l);
    setCode(prob.starterCode[l]);
    setOutput(null);
    setStatus("idle");
  };

  const changeProblem = (pid) => {
    setDdOpen(false);
    setStatus("idle");
    navigate(`/problem/${pid}`);
  };

  const normalize = (s) =>
    s
      .replace(/\r/g, "")
      .trim()
      .split("\n")
      .map((line) => line.trim().replace(/\s+/g, "").replace(/,\]/g, "]"))
      .join("\n");

  const runCode = async () => {
    setRunning(true);
    setOutput(null);
    setStatus("running");

    const t0 = Date.now();

    try {
      const res = await axios.post("/code/execute", {
        language: lang,
        code: code,
      });

      console.log("FULL RESPONSE:", res);
      console.log("DATA:", res.data);

      const ms = Date.now() - t0;
      setRunMs(ms);

      const result = res.data;

      setOutput({
        success: true,
        output: result.output || "No output",
      });

      setRunning(false);

      const pass =
        normalize(result.output) === normalize(prob.expectedOutput[lang]);

      setStatus(pass ? "passed" : "failed");

      if (pass) {
        confetti({ particleCount: 80, spread: 240 });
        toast.success("All tests passed! 🎉");
        setTicking(false);
      } else {
        toast.error("Tests failed. Check your output.");
      }
    } catch (error) {
      console.error("ERROR:", error);

      setRunning(false);
      setStatus("failed");

      setOutput({
        success: false,
        output: "Execution failed",
      });

      toast.error("Execution error");
    }
  };

  /* ── status config ── */
  const SP = {
    idle: { lbl: "Ready", Icon: ZapIcon, cls: "ps-idle" },
    running: {
      lbl: "Running…",
      Icon: Loader2Icon,
      cls: "ps-running",
      spin: true,
    },
    passed: { lbl: "Accepted", Icon: CheckCheck, cls: "ps-passed" },
    failed: { lbl: "Wrong Answer", Icon: XCircleIcon, cls: "ps-failed" },
  }[status];

  /* ══════════════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════════════ */
  return (
    <>
      <style>{css}</style>

      <div className="pp-root">
        {/* ══ TOPBAR ══ */}
        <header className="pp-topbar">
          {/* Left cluster */}
          <div className="tb-left">
            <Link to="/" className="pp-logo">
              <div className="pp-gem">
                <SparklesIcon size={14} color="#07070C" strokeWidth={2.5} />
              </div>
              <span className="pp-brand">
                Inter<em>Vue</em>
              </span>
            </Link>

            <div className="tb-sep" />

            <Link to="/dashboard" className="pp-back">
              <ChevronLeftIcon size={11} />
              Dashboard
            </Link>
          </div>

          {/* Center — problem navigator */}
          <div className="tb-center">
            <button
              className="pp-arrow"
              onClick={() => idx > 0 && changeProblem(allProblems[idx - 1].id)}
              disabled={idx <= 0}
              title="Previous problem"
            >
              <ChevronLeftIcon size={12} />
            </button>

            <div className="pp-picker" ref={ddRef}>
              <button
                className="pp-picker-btn"
                onClick={() => setDdOpen((o) => !o)}
              >
                <span className="pp-picker-label">
                  {idx + 1}. {prob.title}
                </span>
                <span className={`dc ${diffClass(prob.difficulty)}`}>
                  {prob.difficulty}
                </span>
                <ChevronDownIcon
                  size={10}
                  style={{ color: "var(--text-dim)", flexShrink: 0 }}
                />
              </button>

              {ddOpen && (
                <div className="pp-dropdown">
                  <div className="pp-dd-inner">
                    {allProblems.map((p, i) => (
                      <div
                        key={p.id}
                        className={`pp-dd-row ${p.id === probId ? "on" : ""}`}
                        onClick={() => changeProblem(p.id)}
                      >
                        <span className="pp-dd-idx">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="pp-dd-name">{p.title}</span>
                        <span className={`dc ${diffClass(p.difficulty)}`}>
                          {p.difficulty}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              className="pp-arrow"
              onClick={() =>
                idx < allProblems.length - 1 &&
                changeProblem(allProblems[idx + 1].id)
              }
              disabled={idx >= allProblems.length - 1}
              title="Next problem"
            >
              <ChevronRightIcon size={12} />
            </button>
          </div>

          {/* Right cluster */}
          <div className="tb-right">
            {/* Timer */}
            <button
              className={`pp-timer ${ticking ? "ticking" : ""}`}
              onClick={() => setTicking((t) => !t)}
              title={ticking ? "Pause timer" : "Resume timer"}
            >
              <span className={`t-pip ${ticking ? "go" : "stop"}`} />
              {fmtTime(elapsed)}
            </button>

            {/* Status */}
            <div className={`pp-status ${SP.cls}`}>
              <SP.Icon size={11} className={SP.spin ? "spin" : ""} />
              {SP.lbl}
            </div>

            {/* Run */}
            <button className="pp-run" onClick={runCode} disabled={running}>
              {running ? (
                <>
                  <Loader2Icon size={12} className="spin" /> Running
                </>
              ) : (
                <>
                  <PlayIcon size={12} /> Run Code
                </>
              )}
            </button>

            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* ══ BODY — horizontal resizable split ══ */}
        <div className="pp-body">
          <PanelGroup
            direction="horizontal"
            style={{ height: "100%", gap: "0" }}
          >
            {/* ── LEFT PANEL — problem description ── */}
            <Panel defaultSize={38} minSize={28} maxSize={55}>
              <div className="gc" style={{ height: "100%" }}>
                {/* Header */}
                <div className="gc-head">
                  <div
                    className={`gc-tab ${leftTab === "problem" ? "on" : ""}`}
                    onClick={() => setLeftTab("problem")}
                  >
                    <BookOpenIcon size={11} /> Problem
                  </div>
                  <div
                    className={`gc-tab ${leftTab === "stats" ? "on" : ""}`}
                    onClick={() => setLeftTab("stats")}
                  >
                    <BarChart3Icon size={11} /> Stats
                  </div>
                  <div className="gc-head-r">
                    <span className={`dc ${diffClass(prob.difficulty)}`}>
                      {prob.difficulty}
                    </span>
                    <span className="gc-meta">
                      {idx + 1} / {allProblems.length}
                    </span>
                  </div>
                </div>

                {/* Scrollable description */}
                <div className="gc-body">
                  <ProblemDescription
                    problem={prob}
                    currentProblemId={probId}
                    onProblemChange={changeProblem}
                    allProblems={allProblems}
                  />
                </div>
              </div>
            </Panel>

            {/* ── RESIZE HANDLE (horizontal) ── */}
            <PanelResizeHandle className="rh-v" />

            {/* ── RIGHT PANEL — editor + output stacked ── */}
            <Panel minSize={38}>
              <PanelGroup direction="vertical" style={{ height: "100%" }}>
                {/* Editor */}
                <Panel defaultSize={64} minSize={35}>
                  <div className="gc" style={{ height: "100%" }}>
                    <div className="gc-head">
                      <div className="gc-label">
                        <Code2Icon size={11} /> Editor
                      </div>
                      <div className="gc-head-r">
                        {/* Language color pip */}
                        <div className="lang-badge">
                          <div
                            className="l-pip"
                            style={{
                              background: LANG_COLORS[lang] || "var(--gold)",
                              boxShadow: `0 0 5px ${LANG_COLORS[lang] || "var(--gold)"}66`,
                            }}
                          />
                          {lang}
                        </div>
                        <span className="kbhint">⌘ ↵</span>
                        <select
                          className="gc-lang-sel"
                          value={lang}
                          onChange={changeLang}
                        >
                          {Object.keys(prob.starterCode).map((l) => (
                            <option key={l} value={l}>
                              {l}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="gc-body">
                      <CodeEditorPanel
                        selectedLanguage={LANGUAGE_CONFIG[lang].monacoLang}
                        code={code}
                        isRunning={running}
                        onCodeChange={setCode}
                      />
                    </div>
                  </div>
                </Panel>

                {/* ── RESIZE HANDLE (vertical) ── */}
                <PanelResizeHandle className="rh-h" />

                {/* Output */}
                <Panel minSize={18}>
                  <div className="gc" style={{ height: "100%" }}>
                    <OutStripe status={status} runMs={runMs} />
                    <div className="gc-body">
                      <OutputPanel output={output} />
                    </div>
                  </div>
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </>
  );
}
