import { useNavigate } from "react-router";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useActiveSessions, useCreateSession, useMyRecentSessions } from "../hooks/useSessions";
import { useEffect, useState } from "react";
import {
  Trophy, Plus, Video, Code2, Clock, Users, ChevronRight,
  Zap, LayoutDashboard, Settings, Sparkles, ArrowUpRight,
  Calendar, CheckCircle2, Circle, Play, X, Loader2,
} from "lucide-react";

// ── Original sub-components (all buttons preserved) ──────────────────
import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import StatsCards from "../components/StatsCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";

/* ─────────────────────────────────────────────────────────────────────
   PREMIUM OVERRIDE CSS
   Only touches the page shell / layout / background.
   Does NOT break component internals.
────────────────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,800;0,9..144,900;1,9..144,700;1,9..144,800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  :root {
    --ink:       #07070C;
    --surface:   #0C0C15;
    --card:      #0F0F1A;
    --card2:     #131320;
    --border:    rgba(255,255,255,0.07);
    --border-h:  rgba(255,255,255,0.12);
    --gold:      #C8A45A;
    --gold-lt:   #E2C07A;
    --gold-dk:   #7A5F28;
    --gold-dim:  rgba(200,164,90,0.12);
    --text:      #ECEDF4;
    --text-sub:  #6B7280;
    --text-dim:  #3D4451;
    --accent:    #5B8FF9;
    --green:     #3ECF8E;
    --green-dim: rgba(62,207,142,0.12);
    --red:       #F87171;
    --red-dim:   rgba(248,113,113,0.12);
    --amber:     #FBBF24;
    --amber-dim: rgba(251,191,36,0.12);
    --sidebar-w: 230px;
  }

  *, *::before, *::after { box-sizing: border-box; }
  html, body { height: 100%; }

  body {
    background: var(--ink) !important;
    color: var(--text) !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    -webkit-font-smoothing: antialiased;
  }

  /* Grain overlay */
  body::after {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.025; pointer-events: none; z-index: 9999;
  }

  /* ── SHELL ── */
  .dash-shell {
    display: flex;
    min-height: 100vh;
    background: var(--ink);
  }

  /* ── SIDEBAR ── */
  .dash-sidebar {
    width: var(--sidebar-w);
    flex-shrink: 0;
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 200;
  }

  .sb-logo {
    display: flex; align-items: center; gap: 0.7rem;
    padding: 1.4rem 1.35rem 1.25rem;
    border-bottom: 1px solid var(--border);
    text-decoration: none;
  }
  .sb-gem {
    width: 32px; height: 32px; border-radius: 9px;
    background: linear-gradient(145deg, var(--gold-lt), var(--gold-dk));
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 20px rgba(200,164,90,0.3), inset 0 1px 0 rgba(255,255,255,0.15);
    flex-shrink: 0;
  }
  .sb-brand {
    font-family: 'Fraunces', serif;
    font-weight: 700; font-size: 1.15rem; letter-spacing: -0.01em;
    color: var(--text);
  }
  .sb-brand span { color: var(--gold); }

  .sb-nav { flex: 1; padding: 1rem 0.7rem; display: flex; flex-direction: column; gap: 2px; overflow-y: auto; }

  .sb-section-label {
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--text-dim); padding: 0.75rem 0.6rem 0.4rem;
  }

  .sb-item {
    display: flex; align-items: center; gap: 0.65rem;
    padding: 0.6rem 0.75rem; border-radius: 9px;
    font-size: 0.81rem; font-weight: 500; color: var(--text-sub);
    cursor: pointer; border: none; background: none; width: 100%; text-align: left;
    transition: all 0.15s; text-decoration: none;
  }
  .sb-item:hover { background: rgba(255,255,255,0.04); color: var(--text); }
  .sb-item.sb-active { background: var(--gold-dim); color: var(--gold-lt); }

  .sb-footer {
    padding: 0.9rem 0.9rem 1.1rem;
    border-top: 1px solid var(--border);
  }
  .sb-user {
    display: flex; align-items: center; gap: 0.7rem;
    padding: 0.55rem 0.5rem; border-radius: 9px;
    transition: background 0.15s; cursor: pointer;
  }
  .sb-user:hover { background: rgba(255,255,255,0.04); }
  .sb-user-info { flex: 1; min-width: 0; }
  .sb-user-name { font-size: 0.78rem; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sb-user-plan { font-size: 0.68rem; color: var(--text-sub); margin-top: 1px; }

  /* ── MAIN AREA ── */
  .dash-main {
    margin-left: var(--sidebar-w);
    flex: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--ink);
  }

  /* ── TOPBAR ── */
  .dash-topbar {
    height: 58px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem;
    background: rgba(7,7,12,0.75);
    backdrop-filter: blur(18px);
    position: sticky; top: 0; z-index: 100;
  }
  .topbar-breadcrumb { font-size: 0.76rem; color: var(--text-sub); }
  .topbar-breadcrumb strong { color: var(--text); font-weight: 600; }
  .topbar-right { display: flex; align-items: center; gap: 0.75rem; }

  .topbar-time {
    display: flex; align-items: center; gap: 0.4rem;
    font-size: 0.73rem; color: var(--text-sub);
    background: var(--card); border: 1px solid var(--border);
    padding: 0.4rem 0.85rem; border-radius: 7px;
  }

  .topbar-new-btn {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.52rem 1.1rem;
    background: linear-gradient(135deg, var(--gold-lt), var(--gold));
    color: #07070C;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700; font-size: 0.78rem; letter-spacing: 0.01em;
    border: none; border-radius: 8px; cursor: pointer;
    box-shadow: 0 2px 14px rgba(200,164,90,0.28);
    transition: all 0.2s;
  }
  .topbar-new-btn:hover { transform: translateY(-1px); box-shadow: 0 5px 22px rgba(200,164,90,0.42); }

  /* ── PAGE CONTENT ── */
  .dash-content {
    padding: 2rem 2.25rem 3rem;
    flex: 1;
  }

  /* ── WELCOME ── */
  .dash-welcome {
    margin-bottom: 1.75rem;
  }
  .welcome-heading {
    font-family: 'Fraunces', serif;
    font-weight: 800; font-size: 1.7rem; letter-spacing: -0.025em; line-height: 1.1;
    color: var(--text);
  }
  .welcome-heading em {
    font-style: italic;
    background: linear-gradient(100deg, var(--gold-lt), var(--gold));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .welcome-sub {
    font-size: 0.84rem; color: var(--text-sub); margin-top: 0.4rem; font-weight: 400;
  }

  /* ── STAT CARDS ── */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1.75rem;
  }

  .stat-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1.4rem 1.5rem;
    position: relative; overflow: hidden;
    transition: border-color 0.2s, transform 0.2s;
  }
  .stat-card:hover { border-color: var(--border-h); transform: translateY(-2px); }
  .stat-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--gold), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .stat-card:hover::before { opacity: 1; }

  .stat-card-glow {
    position: absolute; top: -40px; right: -20px;
    width: 130px; height: 130px; border-radius: 50%; pointer-events: none;
  }
  .glow-gold  { background: radial-gradient(circle, rgba(200,164,90,0.08), transparent 70%); }
  .glow-green { background: radial-gradient(circle, rgba(62,207,142,0.07), transparent 70%); }
  .glow-blue  { background: radial-gradient(circle, rgba(91,143,249,0.07), transparent 70%); }
  .glow-amber { background: radial-gradient(circle, rgba(251,191,36,0.07), transparent 70%); }

  .stat-icon {
    width: 36px; height: 36px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1rem;
  }
  .si-gold  { background: var(--gold-dim);           border: 1px solid rgba(200,164,90,0.2); }
  .si-green { background: var(--green-dim);          border: 1px solid rgba(62,207,142,0.2); }
  .si-blue  { background: rgba(91,143,249,0.1);      border: 1px solid rgba(91,143,249,0.2); }
  .si-amber { background: var(--amber-dim);          border: 1px solid rgba(251,191,36,0.2); }

  .stat-value {
    font-family: 'Fraunces', serif;
    font-weight: 800; font-size: 1.9rem; line-height: 1;
    letter-spacing: -0.02em; color: var(--text); margin-bottom: 0.3rem;
  }
  .stat-label { font-size: 0.73rem; font-weight: 500; color: var(--text-sub); letter-spacing: 0.01em; }
  .stat-delta {
    margin-top: 0.55rem;
    display: inline-flex; align-items: center; gap: 0.3rem;
    font-size: 0.68rem; font-weight: 600;
    padding: 0.18rem 0.5rem; border-radius: 100px;
  }
  .delta-up   { background: var(--green-dim); color: var(--green); }
  .delta-flat { background: rgba(107,114,128,0.1); color: var(--text-sub); }

  /* ── MAIN GRID ── */
  .dash-grid {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 1.25rem;
    margin-bottom: 1.25rem;
  }

  /* ── CARD SHELL ── */
  .d-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }
  .d-card-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.1rem 1.4rem;
    border-bottom: 1px solid var(--border);
  }
  .d-card-title {
    font-family: 'Fraunces', serif;
    font-weight: 700; font-size: 0.93rem; letter-spacing: -0.01em;
    display: flex; align-items: center; gap: 0.5rem;
    color: var(--text);
  }
  .d-card-badge {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: 20px; height: 20px; border-radius: 6px; padding: 0 5px;
    background: var(--gold-dim); color: var(--gold);
    font-size: 0.65rem; font-weight: 700;
  }
  .d-card-action {
    display: inline-flex; align-items: center; gap: 0.3rem;
    font-size: 0.71rem; font-weight: 600; color: var(--text-sub);
    background: none; border: none; cursor: pointer; transition: color 0.2s;
  }
  .d-card-action:hover { color: var(--gold); }

  /* ── ACTIVE SESSIONS ── */
  .session-list { padding: 0.65rem; display: flex; flex-direction: column; gap: 0.45rem; }

  .session-row {
    display: flex; align-items: center; gap: 0.9rem;
    padding: 0.85rem 0.95rem;
    background: var(--card2);
    border: 1px solid var(--border);
    border-radius: 11px;
    cursor: pointer;
    transition: all 0.18s;
  }
  .session-row:hover { border-color: var(--border-h); background: #151528; transform: translateX(2px); }

  .s-live-dot {
    width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
  }
  .s-live   { background: var(--green); box-shadow: 0 0 8px var(--green); animation: sdot 2s infinite; }
  .s-wait   { background: var(--amber); box-shadow: 0 0 7px var(--amber); }
  @keyframes sdot { 0%,100%{opacity:1}50%{opacity:0.4} }

  .s-info { flex: 1; min-width: 0; }
  .s-problem { font-weight: 600; font-size: 0.81rem; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .s-meta { font-size: 0.69rem; color: var(--text-sub); margin-top: 0.2rem; display: flex; align-items: center; gap: 0.45rem; }

  .diff-pill {
    display: inline-flex; align-items: center;
    padding: 0.12rem 0.5rem; border-radius: 100px;
    font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
  }
  .dp-easy   { background: var(--green-dim); color: var(--green); }
  .dp-medium { background: var(--amber-dim); color: var(--amber); }
  .dp-hard   { background: var(--red-dim);   color: var(--red); }

  .s-join-btn {
    display: inline-flex; align-items: center; gap: 0.3rem;
    padding: 0.38rem 0.8rem;
    border-radius: 7px; font-size: 0.7rem; font-weight: 700;
    flex-shrink: 0; cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.18s;
  }
  .s-join-default { background: var(--gold-dim); color: var(--gold-lt); border: 1px solid rgba(200,164,90,0.2); }
  .s-join-default:hover { background: rgba(200,164,90,0.2); }
  .s-join-mine    { background: rgba(91,143,249,0.1); color: var(--accent); border: 1px solid rgba(91,143,249,0.2); }
  .s-join-mine:hover { background: rgba(91,143,249,0.18); }

  /* ── EMPTY STATE ── */
  .empty-box {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 3.5rem 1.5rem; gap: 0.65rem; text-align: center;
  }
  .empty-icon-wrap {
    width: 48px; height: 48px; border-radius: 13px;
    background: var(--card2); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 0.25rem;
  }
  .empty-title { font-family: 'Fraunces', serif; font-weight: 700; font-size: 0.93rem; color: var(--text); }
  .empty-sub { font-size: 0.76rem; color: var(--text-sub); max-width: 210px; line-height: 1.6; }
  .empty-create-btn {
    margin-top: 0.4rem;
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.5rem 1.1rem;
    background: linear-gradient(135deg, var(--gold-lt), var(--gold));
    color: #07070C; border: none; border-radius: 8px; cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700; font-size: 0.78rem;
    box-shadow: 0 2px 12px rgba(200,164,90,0.25);
    transition: all 0.2s;
  }
  .empty-create-btn:hover { transform: translateY(-1px); box-shadow: 0 5px 20px rgba(200,164,90,0.4); }

  /* ── RIGHT COLUMN ── */
  .right-col { display: flex; flex-direction: column; gap: 1.25rem; }

  /* Quiz card */
  .quiz-card {
    background: var(--card);
    border: 1px solid rgba(200,164,90,0.18);
    border-radius: 16px; overflow: hidden;
    position: relative;
  }
  .quiz-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }

  .quiz-body { padding: 1.35rem 1.4rem; }
  .quiz-ring {
    width: 68px; height: 68px; border-radius: 50%;
    background: conic-gradient(var(--gold) calc(var(--p, 0) * 1%), var(--card2) 0%);
    display: flex; align-items: center; justify-content: center;
    position: relative; margin-bottom: 1rem;
  }
  .quiz-ring::before {
    content: ''; position: absolute; inset: 6px;
    border-radius: 50%; background: var(--card);
  }
  .quiz-pct {
    position: relative; z-index: 1;
    font-family: 'Fraunces', serif; font-weight: 800; font-size: 1.05rem;
    color: var(--gold-lt);
  }
  .quiz-score-txt { font-family: 'Fraunces', serif; font-weight: 700; font-size: 0.88rem; margin-bottom: 0.2rem; }
  .quiz-date-txt  { font-size: 0.71rem; color: var(--text-sub); }

  /* Quick actions */
  .qa-list { padding: 0.65rem; display: flex; flex-direction: column; gap: 0.45rem; }
  .qa-row {
    display: flex; align-items: center; gap: 0.7rem;
    padding: 0.75rem 0.85rem;
    background: var(--card2); border: 1px solid var(--border);
    border-radius: 10px; cursor: pointer;
    transition: all 0.18s;
  }
  .qa-row:hover { border-color: var(--border-h); background: #151528; }
  .qa-icon-wrap {
    width: 30px; height: 30px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .qa-texts { flex: 1; }
  .qa-title { font-size: 0.78rem; font-weight: 600; color: var(--text); }
  .qa-sub   { font-size: 0.67rem; color: var(--text-sub); margin-top: 1px; }

  /* ── RECENT TABLE ── */
  .recent-wrap {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px; overflow: hidden;
  }
  .table-scroll { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; }
  thead tr { border-bottom: 1px solid var(--border); }
  thead th {
    padding: 0.7rem 1.4rem;
    font-size: 0.67rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--text-dim); text-align: left; white-space: nowrap;
  }
  tbody tr { border-bottom: 1px solid var(--border); transition: background 0.15s; cursor: pointer; }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: rgba(255,255,255,0.02); }
  tbody td { padding: 0.85rem 1.4rem; font-size: 0.79rem; color: var(--text); }

  .td-prob { font-weight: 600; display: flex; align-items: center; gap: 0.5rem; }
  .td-secondary { color: var(--text-sub); font-size: 0.73rem; }

  .status-chip {
    display: inline-flex; align-items: center; gap: 0.32rem;
    padding: 0.22rem 0.6rem; border-radius: 100px;
    font-size: 0.66rem; font-weight: 700;
  }
  .sc-live    { background: var(--amber-dim); color: var(--amber); }
  .sc-done    { background: var(--green-dim); color: var(--green); }
  .sc-ended   { background: rgba(107,114,128,0.1); color: var(--text-sub); }

  /* ── SKELETON ── */
  @keyframes shimmer { 0%,100%{opacity:0.35}50%{opacity:0.6} }
  .skel { background: var(--card2); border-radius: 5px; animation: shimmer 1.5s ease-in-out infinite; }

  /* ── MODAL ── */
  .modal-backdrop {
    position: fixed; inset: 0; z-index: 500;
    background: rgba(0,0,0,0.72);
    backdrop-filter: blur(7px);
    display: flex; align-items: center; justify-content: center;
    padding: 1.5rem;
    animation: mfade 0.2s ease;
  }
  @keyframes mfade { from{opacity:0}to{opacity:1} }

  .modal-panel {
    background: var(--card);
    border: 1px solid var(--border-h);
    border-radius: 20px;
    width: 100%; max-width: 460px;
    overflow: hidden;
    box-shadow: 0 40px 100px rgba(0,0,0,0.7);
    animation: mup 0.25s cubic-bezier(0.16,1,0.3,1);
  }
  @keyframes mup { from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)} }

  .modal-hd {
    background: linear-gradient(135deg, #12101E, #1A1630);
    border-bottom: 1px solid var(--border);
    padding: 1.6rem 1.6rem 1.35rem;
    position: relative; overflow: hidden;
  }
  .modal-hd::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .modal-hd-glow {
    position: absolute; top: -80px; right: -60px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(200,164,90,0.08), transparent 70%);
    pointer-events: none;
  }
  .modal-hd-row { display: flex; align-items: flex-start; justify-content: space-between; }
  .modal-title { font-family: 'Fraunces', serif; font-weight: 800; font-size: 1.15rem; letter-spacing: -0.02em; position: relative; }
  .modal-subtitle { font-size: 0.78rem; color: var(--text-sub); margin-top: 0.3rem; position: relative; }
  .modal-close-btn {
    background: rgba(255,255,255,0.06); border: 1px solid var(--border);
    color: var(--text-sub); border-radius: 8px; padding: 0.38rem;
    cursor: pointer; transition: all 0.18s;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .modal-close-btn:hover { background: rgba(255,255,255,0.1); color: var(--text); }

  .modal-bd { padding: 1.4rem 1.6rem; display: flex; flex-direction: column; gap: 1.15rem; }

  .field-lbl { display: block; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--text-sub); margin-bottom: 0.55rem; }

  .field-inp {
    width: 100%; padding: 0.75rem 0.95rem;
    background: var(--card2); border: 1px solid var(--border);
    border-radius: 10px; color: var(--text);
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.84rem;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
  }
  .field-inp::placeholder { color: var(--text-dim); }
  .field-inp:focus { border-color: rgba(200,164,90,0.38); box-shadow: 0 0 0 3px rgba(200,164,90,0.08); }

  .diff-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.55rem; }
  .diff-opt {
    padding: 0.7rem 0.5rem; text-align: center;
    background: var(--card2); border: 1.5px solid var(--border);
    border-radius: 10px; cursor: pointer;
    font-size: 0.76rem; font-weight: 700;
    transition: all 0.18s; user-select: none; color: var(--text-sub);
  }
  .diff-opt:hover { border-color: var(--border-h); color: var(--text); }
  .diff-opt.sel-easy   { background: var(--green-dim); border-color: rgba(62,207,142,0.4); color: var(--green); }
  .diff-opt.sel-medium { background: var(--amber-dim); border-color: rgba(251,191,36,0.4); color: var(--amber); }
  .diff-opt.sel-hard   { background: var(--red-dim);   border-color: rgba(248,113,113,0.4); color: var(--red); }

  .diff-dot { width: 6px; height: 6px; border-radius: 50%; margin: 0 auto 0.35rem; }
  .dd-easy   { background: var(--green); box-shadow: 0 0 6px var(--green); }
  .dd-medium { background: var(--amber); box-shadow: 0 0 6px var(--amber); }
  .dd-hard   { background: var(--red);   box-shadow: 0 0 6px var(--red); }

  .modal-ft { display: flex; gap: 0.7rem; padding: 0 1.6rem 1.6rem; }
  .btn-cancel-m {
    flex: 1; padding: 0.75rem;
    background: transparent; border: 1px solid var(--border);
    color: var(--text-sub); border-radius: 10px;
    font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; font-size: 0.83rem;
    cursor: pointer; transition: all 0.18s;
  }
  .btn-cancel-m:hover { background: rgba(255,255,255,0.04); color: var(--text); }
  .btn-submit-m {
    flex: 2; padding: 0.75rem;
    background: linear-gradient(135deg, var(--gold-lt), var(--gold));
    color: #07070C; border: none; border-radius: 10px;
    font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 0.83rem;
    cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 0.45rem;
    box-shadow: 0 3px 18px rgba(200,164,90,0.28);
  }
  .btn-submit-m:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 26px rgba(200,164,90,0.42); }
  .btn-submit-m:disabled { opacity: 0.55; cursor: not-allowed; }

  /* ── RESPONSIVE ── */
  @media(max-width:1200px) {
    .stats-row { grid-template-columns: repeat(2,1fr); }
    .dash-grid { grid-template-columns: 1fr; }
  }
  @media(max-width:768px) {
    :root { --sidebar-w: 0px; }
    .dash-sidebar { display: none; }
    .dash-content { padding: 1.25rem 1rem 3rem; }
    .dash-topbar { padding: 0 1rem; }
    .stats-row { grid-template-columns: 1fr 1fr; }
  }

  /* ── ENTRY ANIMS ── */
  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
  .au { opacity:0; animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
  .au1{animation-delay:.05s} .au2{animation-delay:.13s} .au3{animation-delay:.22s}
  .au4{animation-delay:.31s} .au5{animation-delay:.4s}
  @keyframes spin { to { transform: rotate(360deg); } }
`;

/* ── helpers ── */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function diffClass(d = "") {
  const v = d.toLowerCase();
  if (v === "easy") return "dp-easy";
  if (v === "medium") return "dp-medium";
  return "dp-hard";
}
function statusInfo(s) {
  if (s.status === "active")    return { label: "Live",      cls: "sc-live" };
  if (s.status === "completed") return { label: "Completed", cls: "sc-done" };
  return { label: "Ended", cls: "sc-ended" };
}

/* ── skeleton ── */
function SkelRows({ n = 3 }) {
  return (
    <div className="session-list">
      {[...Array(n)].map((_, i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:"0.9rem", padding:"1rem", background:"var(--card2)", borderRadius:11, border:"1px solid var(--border)" }}>
          <div className="skel" style={{ width:8, height:8, borderRadius:"50%", flexShrink:0 }} />
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:"0.4rem" }}>
            <div className="skel" style={{ height:11, width:"58%", borderRadius:4 }} />
            <div className="skel" style={{ height:9,  width:"32%", borderRadius:4 }} />
          </div>
          <div className="skel" style={{ height:27, width:58, borderRadius:7 }} />
        </div>
      ))}
    </div>
  );
}

/* ── modal (self-contained, preserves all original logic) ── */
function NewRoomModal({ isOpen, onClose, roomConfig, setRoomConfig, onCreateRoom, isCreating }) {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel">
        <div className="modal-hd">
          <div className="modal-hd-glow" />
          <div className="modal-hd-row">
            <div>
              <div className="modal-title">New Interview Room</div>
              <div className="modal-subtitle">Configure a problem and start a live session</div>
            </div>
            <button className="modal-close-btn" onClick={onClose}><X size={14} /></button>
          </div>
        </div>

        <div className="modal-bd">
          <div>
            <label className="field-lbl">Problem / Topic</label>
            <input
              className="field-inp"
              placeholder="e.g. Two Sum, System Design, Binary Trees…"
              value={roomConfig.problem}
              onChange={e => setRoomConfig(p => ({ ...p, problem: e.target.value }))}
            />
          </div>
          <div>
            <label className="field-lbl">Difficulty</label>
            <div className="diff-grid">
              {["Easy","Medium","Hard"].map(d => {
                const v = d.toLowerCase();
                const sel = roomConfig.difficulty === v;
                return (
                  <div
                    key={d}
                    className={`diff-opt ${sel ? `sel-${v}` : ""}`}
                    onClick={() => setRoomConfig(p => ({ ...p, difficulty: v }))}
                  >
                    <div className={`diff-dot dd-${v}`} />
                    {d}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="modal-ft">
          <button className="btn-cancel-m" onClick={onClose}>Cancel</button>
          <button
            className="btn-submit-m"
            onClick={onCreateRoom}
            disabled={!roomConfig.problem || !roomConfig.difficulty || isCreating}
          >
            {isCreating
              ? <><Loader2 size={14} style={{ animation:"spin 1s linear infinite" }} /> Creating…</>
              : <><Zap size={14} /> Launch Room</>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   DASHBOARD PAGE
══════════════════════════════════════════ */
export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });
  const [quizScore, setQuizScore] = useState(null);
  const [now, setNow] = useState(new Date());

  const createSessionMutation = useCreateSession();
  const { data: activeSessionsData, isLoading: loadingActiveSessions } = useActiveSessions();
  const { data: recentSessionsData, isLoading: loadingRecentSessions } = useMyRecentSessions();

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  useEffect(() => {
    const stored = localStorage.getItem("latestQuizScore");
    if (stored) setQuizScore(JSON.parse(stored));
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  // ── original handler — unchanged ──
  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;
    createSessionMutation.mutate(
      { problem: roomConfig.problem, difficulty: roomConfig.difficulty.toLowerCase() },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          navigate(`/session/${data.session._id}`);
        },
      }
    );
  };

  // ── original helper — unchanged ──
  const isUserInSession = (session) =>
    user?.id && (session.host?.clerkId === user.id || session.participant?.clerkId === user.id);

  const firstName = user?.firstName || user?.username || "there";
  const quizPct   = quizScore ? Math.round((quizScore.score / quizScore.total) * 100) : 0;
  const timeStr   = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  const dateStr   = now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

  return (
    <>
      <style>{css}</style>

      <div className="dash-shell">

        {/* ── SIDEBAR ── */}
        <aside className="dash-sidebar">
          <a href="/" className="sb-logo">
            <div className="sb-gem">
              <Sparkles size={15} color="#07070C" strokeWidth={2.5} />
            </div>
            <span className="sb-brand">Inter<span>Vue</span></span>
          </a>

          <nav className="sb-nav">
            <span className="sb-section-label">Menu</span>
            <div className="sb-item sb-active">
              <LayoutDashboard size={14} /> Dashboard
            </div>
            <div className="sb-item" style={{ cursor:"pointer" }} onClick={() => setShowCreateModal(true)}>
              <Video size={14} /> Interviews
            </div>
            <div className="sb-item" style={{ cursor:"pointer" }}>
              <Code2 size={14} /> Practice
            </div>
            <div className="sb-item" style={{ cursor:"pointer" }}>
              <Trophy size={14} /> Quizzes
            </div>

            <span className="sb-section-label" style={{ marginTop:"0.75rem" }}>Account</span>
            <div className="sb-item" style={{ cursor:"pointer" }}>
              <Settings size={14} /> Settings
            </div>
          </nav>

          <div className="sb-footer">
            <div className="sb-user">
              <UserButton afterSignOutUrl="/" />
              <div className="sb-user-info">
                <div className="sb-user-name">{user?.fullName || firstName}</div>
                <div className="sb-user-plan">Free plan</div>
              </div>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="dash-main">

          {/* Topbar */}
          <div className="dash-topbar">
            <span className="topbar-breadcrumb">InterVue / <strong>Dashboard</strong></span>
            <div className="topbar-right">
              <div className="topbar-time">
                <Clock size={11} /> {timeStr} · {dateStr}
              </div>
              <button className="topbar-new-btn" onClick={() => setShowCreateModal(true)}>
                <Plus size={13} /> New Room
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="dash-content">

            {/* Welcome */}
            <div className="dash-welcome au au1">
              <div className="welcome-heading">
                {getGreeting()}, <em>{firstName}.</em>
              </div>
              <div className="welcome-sub">
                {activeSessions.length > 0
                  ? `${activeSessions.length} session${activeSessions.length > 1 ? "s" : ""} running right now.`
                  : "No active sessions. Ready to start your next interview?"}
              </div>
            </div>

            {/* Stats */}
            <div className="stats-row au au2">
              <div className="stat-card">
                <div className="stat-card-glow glow-gold" />
                <div className="stat-icon si-gold"><Video size={15} color="var(--gold)" /></div>
                <div className="stat-value">{activeSessions.length}</div>
                <div className="stat-label">Active Sessions</div>
                <div className={`stat-delta ${activeSessions.length > 0 ? "delta-up" : "delta-flat"}`}>
                  {activeSessions.length > 0 ? <><Zap size={8} /> Live now</> : "None running"}
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-glow glow-green" />
                <div className="stat-icon si-green"><CheckCircle2 size={15} color="var(--green)" /></div>
                <div className="stat-value">{recentSessions.length}</div>
                <div className="stat-label">Total Sessions</div>
                <div className="stat-delta delta-up"><ArrowUpRight size={8} /> All time</div>
              </div>

              <div className="stat-card">
                <div className="stat-card-glow glow-blue" />
                <div className="stat-icon si-blue"><Trophy size={15} color="var(--accent)" /></div>
                <div className="stat-value">{quizScore ? `${quizScore.score}/${quizScore.total}` : "—"}</div>
                <div className="stat-label">Latest Quiz</div>
                {quizScore && <div className="stat-delta delta-up"><Zap size={8} /> {quizPct}% correct</div>}
              </div>

              <div className="stat-card">
                <div className="stat-card-glow glow-amber" />
                <div className="stat-icon si-amber"><Users size={15} color="var(--amber)" /></div>
                <div className="stat-value">{recentSessions.filter(s => s.participant).length}</div>
                <div className="stat-label">Candidates Seen</div>
                <div className="stat-delta delta-flat"><Calendar size={8} /> All time</div>
              </div>
            </div>

            {/* Main grid */}
            <div className="dash-grid au au3">

              {/* Active rooms */}
              <div className="d-card">
                <div className="d-card-header">
                  <div className="d-card-title">
                    <Video size={14} color="var(--gold)" />
                    Active Rooms
                    {activeSessions.length > 0 && <span className="d-card-badge">{activeSessions.length}</span>}
                  </div>
                  <button className="d-card-action" onClick={() => setShowCreateModal(true)}>
                    <Plus size={11} /> New room
                  </button>
                </div>

                {loadingActiveSessions ? <SkelRows /> : activeSessions.length === 0 ? (
                  <div className="empty-box">
                    <div className="empty-icon-wrap"><Video size={19} color="var(--text-dim)" /></div>
                    <div className="empty-title">No active rooms</div>
                    <div className="empty-sub">Create a room to start a live interview session.</div>
                    <button className="empty-create-btn" onClick={() => setShowCreateModal(true)}>
                      <Plus size={12} /> Create room
                    </button>
                  </div>
                ) : (
                  <div className="session-list">
                    {activeSessions.map(s => {
                      const mine = isUserInSession(s);
                      return (
                        <div key={s._id} className="session-row" onClick={() => navigate(`/session/${s._id}`)}>
                          <span className={`s-live-dot ${s.participant ? "s-live" : "s-wait"}`} />
                          <div className="s-info">
                            <div className="s-problem">{s.problem || "Untitled problem"}</div>
                            <div className="s-meta">
                              <span className={`diff-pill ${diffClass(s.difficulty)}`}>{s.difficulty || "N/A"}</span>
                              <span>·</span>
                              <span>{s.participant ? "In progress" : "Waiting for candidate"}</span>
                            </div>
                          </div>
                          <button className={`s-join-btn ${mine ? "s-join-mine" : "s-join-default"}`}
                            onClick={e => { e.stopPropagation(); navigate(`/session/${s._id}`); }}>
                            <Play size={9} /> {mine ? "Rejoin" : "Join"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right column */}
              <div className="right-col">

                {/* Quiz card */}
                {quizScore && (
                  <div className="quiz-card">
                    <div className="d-card-header" style={{ borderBottom:"1px solid rgba(200,164,90,0.12)" }}>
                      <div className="d-card-title"><Trophy size={14} color="var(--gold)" /> Latest Quiz</div>
                    </div>
                    <div className="quiz-body">
                      <div className="quiz-ring" style={{ "--p": quizPct }}>
                        <span className="quiz-pct">{quizPct}%</span>
                      </div>
                      <div className="quiz-score-txt">{quizScore.score} / {quizScore.total} correct</div>
                      <div className="quiz-date-txt">{quizScore.date}</div>
                    </div>
                  </div>
                )}

                {/* Quick actions */}
                <div className="d-card">
                  <div className="d-card-header">
                    <div className="d-card-title"><Zap size={14} color="var(--gold)" /> Quick Actions</div>
                  </div>
                  <div className="qa-list">
                    {[
                      { icon:<Plus size={14} color="var(--gold)"/>,   cls:"si-gold",  title:"New Interview Room", sub:"Start a live session",  action:() => setShowCreateModal(true) },
                      { icon:<Code2 size={14} color="var(--accent)"/>, cls:"si-blue", title:"Practice Problems",   sub:"Solve on your own",     action:() => {} },
                      { icon:<Trophy size={14} color="var(--amber)"/>, cls:"si-amber",title:"Take a Quiz",         sub:"Test your knowledge",   action:() => {} },
                    ].map(({ icon, cls, title, sub, action }) => (
                      <div key={title} className="qa-row" onClick={action}>
                        <div className={`qa-icon-wrap ${cls}`}>{icon}</div>
                        <div className="qa-texts">
                          <div className="qa-title">{title}</div>
                          <div className="qa-sub">{sub}</div>
                        </div>
                        <ChevronRight size={12} color="var(--text-dim)" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent sessions */}
            <div className="recent-wrap au au4">
              <div className="d-card-header">
                <div className="d-card-title">
                  <Clock size={14} color="var(--gold)" />
                  Recent Sessions
                  {recentSessions.length > 0 && <span className="d-card-badge">{recentSessions.length}</span>}
                </div>
                {recentSessions.length > 5 && (
                  <button className="d-card-action">View all <ChevronRight size={11} /></button>
                )}
              </div>

              {loadingRecentSessions ? (
                <div style={{ padding:"0.75rem 1rem" }}>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} style={{ display:"flex", gap:"1rem", padding:"0.8rem 0.4rem", borderBottom:"1px solid var(--border)", alignItems:"center" }}>
                      <div className="skel" style={{ height:11, width:"26%", borderRadius:4 }} />
                      <div className="skel" style={{ height:11, width:"10%", borderRadius:4 }} />
                      <div className="skel" style={{ height:11, width:"13%", borderRadius:4, marginLeft:"auto" }} />
                      <div className="skel" style={{ height:21, width:66, borderRadius:100 }} />
                    </div>
                  ))}
                </div>
              ) : recentSessions.length === 0 ? (
                <div className="empty-box">
                  <div className="empty-icon-wrap"><Clock size={19} color="var(--text-dim)" /></div>
                  <div className="empty-title">No sessions yet</div>
                  <div className="empty-sub">Past interview sessions will show up here.</div>
                </div>
              ) : (
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Problem</th>
                        <th>Difficulty</th>
                        <th>Role</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentSessions.slice(0, 8).map(s => {
                        const { label, cls } = statusInfo(s);
                        const isHost = s.host?.clerkId === user?.id;
                        return (
                          <tr key={s._id} onClick={() => navigate(`/session/${s._id}`)}>
                            <td><div className="td-prob"><Code2 size={12} color="var(--text-sub)" />{s.problem || "Untitled"}</div></td>
                            <td><span className={`diff-pill ${diffClass(s.difficulty)}`}>{s.difficulty || "—"}</span></td>
                            <td><span className="td-secondary">{isHost ? "Interviewer" : "Candidate"}</span></td>
                            <td><span className="td-secondary">{formatDate(s.createdAt)}</span></td>
                            <td>
                              <span className={`status-chip ${cls}`}>
                                <Circle size={5} fill="currentColor" /> {label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>

      {/* Modal — self-contained, all original logic preserved */}
      <NewRoomModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
}