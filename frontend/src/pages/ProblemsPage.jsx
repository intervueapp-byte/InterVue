import { Link } from "react-router";
import { PROBLEMS } from "../data/problems";
import {
  SparklesIcon, ChevronRightIcon, Code2Icon, ZapIcon,
  TrophyIcon, TargetIcon, BarChart3Icon, SearchIcon, FilterIcon,
} from "lucide-react";
import { useState } from "react";
import { UserButton } from "@clerk/clerk-react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,800;0,9..144,900;1,9..144,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  :root {
    --ink:         #07070C;
    --surface:     #0B0B14;
    --card:        #0F0F1B;
    --card2:       #131321;
    --glass:       rgba(15,15,27,0.7);
    --border:      rgba(255,255,255,0.06);
    --border-h:    rgba(255,255,255,0.11);
    --border-gold: rgba(200,164,90,0.2);
    --gold:        #C8A45A;
    --gold-lt:     #E2C07A;
    --gold-dk:     #7A5F28;
    --gold-dim:    rgba(200,164,90,0.09);
    --text:        #ECEDF4;
    --text-sub:    #64748B;
    --text-dim:    #2C3444;
    --green:       #3ECF8E;
    --green-dim:   rgba(62,207,142,0.1);
    --green-b:     rgba(62,207,142,0.2);
    --red:         #F87171;
    --red-dim:     rgba(248,113,113,0.1);
    --red-b:       rgba(248,113,113,0.2);
    --amber:       #FBBF24;
    --amber-dim:   rgba(251,191,36,0.1);
    --amber-b:     rgba(251,191,36,0.2);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    background: var(--ink);
    color: var(--text);
    font-family: 'Plus Jakarta Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  }

  body::after {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.022; pointer-events: none; z-index: 9999;
  }

  /* ── NAV ── */
  .plnav {
    position: sticky; top: 0; z-index: 200;
    height: 60px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem;
    background: rgba(7,7,12,0.88);
    backdrop-filter: blur(24px) saturate(180%);
    border-bottom: 1px solid var(--border);
  }
  .plnav::after {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200,164,90,0.45) 40%, var(--gold) 50%, rgba(200,164,90,0.45) 60%, transparent);
  }
  .pl-logo { display:flex; align-items:center; gap:0.6rem; text-decoration:none; }
  .pl-gem {
    width:30px; height:30px; border-radius:9px;
    background: linear-gradient(145deg, var(--gold-lt), var(--gold-dk));
    display:flex; align-items:center; justify-content:center;
    box-shadow: 0 0 16px rgba(200,164,90,0.3), inset 0 1px 0 rgba(255,255,255,0.14);
  }
  .pl-brand {
    font-family:'Fraunces',serif; font-weight:700; font-size:1.1rem;
    letter-spacing:-0.01em; color:var(--text);
  }
  .pl-brand em { font-style:normal; color:var(--gold); }

  .pl-nav-links { display:flex; align-items:center; gap:2rem; }
  .pl-nav-link {
    font-size:0.85rem; font-weight:500; color:var(--text-sub);
    text-decoration:none; transition:color 0.18s;
  }
  .pl-nav-link:hover { color:var(--text); }
  .pl-nav-link.active { color:var(--gold-lt); }

  .pl-nav-btn {
    display:inline-flex; align-items:center; gap:0.4rem;
    padding:0.5rem 1.1rem;
    background: linear-gradient(135deg, var(--gold-lt), var(--gold));
    color:#07070C; border:none; border-radius:9px; cursor:pointer;
    font-family:'Plus Jakarta Sans',sans-serif;
    font-weight:800; font-size:0.78rem; letter-spacing:0.02em;
    box-shadow:0 2px 16px rgba(200,164,90,0.28);
    transition:all 0.2s; text-decoration:none;
  }
  .pl-nav-btn:hover { transform:translateY(-1px); box-shadow:0 5px 24px rgba(200,164,90,0.42); }

  /* ── PAGE WRAPPER ── */
  .pl-page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 3.5rem 2rem 5rem;
    position: relative;
  }

  /* Ambient glow */
  .pl-page::before {
    content: '';
    position: fixed; top: -200px; left: 50%; transform: translateX(-50%);
    width: 900px; height: 600px;
    background: radial-gradient(ellipse at 50% 0%, rgba(200,164,90,0.045) 0%, transparent 65%);
    pointer-events: none; z-index: 0;
  }

  /* ── HERO STRIP ── */
  .pl-hero {
    position: relative; z-index: 1;
    margin-bottom: 2.75rem;
    display: flex; align-items: flex-end; justify-content: space-between;
    flex-wrap: wrap; gap: 1.5rem;
  }
  .pl-hero-eyebrow {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 0.75rem;
  }
  .pl-hero-eyebrow::before {
    content: ''; display: block; width: 18px; height: 1.5px;
    background: var(--gold); border-radius: 2px;
  }
  .pl-hero-title {
    font-family: 'Fraunces', serif;
    font-weight: 900; font-size: clamp(2rem, 3.5vw, 2.8rem);
    letter-spacing: -0.03em; line-height: 1.05; color: var(--text);
    margin-bottom: 0.6rem;
  }
  .pl-hero-title em {
    font-style: italic;
    background: linear-gradient(100deg, var(--gold-lt), var(--gold));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .pl-hero-sub {
    font-size: 0.95rem; font-weight: 300; color: var(--text-sub); line-height: 1.7;
  }

  /* ── STAT PILLS ── */
  .pl-stats {
    display: flex; gap: 0.6rem; flex-wrap: wrap;
    align-items: center;
  }
  .pl-stat-pill {
    display: inline-flex; align-items: center; gap: 0.55rem;
    padding: 0.65rem 1.1rem;
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 14px;
    backdrop-filter: blur(12px);
    transition: border-color 0.2s, transform 0.2s;
  }
  .pl-stat-pill:hover { border-color: var(--border-h); transform: translateY(-2px); }
  .pl-stat-icon {
    width: 30px; height: 30px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }
  .spi-total  { background: var(--gold-dim); border: 1px solid var(--border-gold); }
  .spi-easy   { background: var(--green-dim); border: 1px solid var(--green-b); }
  .spi-medium { background: var(--amber-dim); border: 1px solid var(--amber-b); }
  .spi-hard   { background: var(--red-dim);   border: 1px solid var(--red-b); }
  .pl-stat-num {
    font-family: 'Fraunces', serif; font-weight: 800; font-size: 1.3rem;
    line-height: 1; letter-spacing: -0.02em;
  }
  .sn-total  { color: var(--gold-lt); }
  .sn-easy   { color: var(--green); }
  .sn-medium { color: var(--amber); }
  .sn-hard   { color: var(--red); }
  .pl-stat-lbl { font-size: 0.68rem; font-weight: 600; color: var(--text-sub); text-transform: uppercase; letter-spacing: 0.06em; }

  /* ── TOOLBAR ── */
  .pl-toolbar {
    position: relative; z-index: 1;
    display: flex; align-items: center; gap: 0.75rem;
    margin-bottom: 1.25rem; flex-wrap: wrap;
  }
  .pl-search-wrap {
    flex: 1; min-width: 200px;
    position: relative;
  }
  .pl-search-icon {
    position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%);
    color: var(--text-dim); pointer-events: none;
  }
  .pl-search {
    width: 100%; padding: 0.65rem 1rem 0.65rem 2.4rem;
    background: var(--glass); border: 1px solid var(--border);
    border-radius: 11px; color: var(--text);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.85rem; outline: none; transition: border-color 0.2s;
    backdrop-filter: blur(12px);
  }
  .pl-search::placeholder { color: var(--text-dim); }
  .pl-search:focus { border-color: var(--border-gold); }

  .pl-filter-btn {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.6rem 1rem;
    background: var(--glass); border: 1px solid var(--border);
    border-radius: 10px; color: var(--text-sub);
    font-size: 0.78rem; font-weight: 600; cursor: pointer;
    transition: all 0.18s; backdrop-filter: blur(12px);
  }
  .pl-filter-btn:hover { border-color: var(--border-h); color: var(--text); }
  .pl-filter-btn.active { background: var(--gold-dim); border-color: var(--border-gold); color: var(--gold-lt); }

  /* ── PROBLEM CARD ── */
  .pl-list {
    position: relative; z-index: 1;
    display: flex; flex-direction: column; gap: 0.65rem;
  }

  .pl-card {
    display: flex; align-items: center; gap: 1.25rem;
    padding: 1.25rem 1.5rem;
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 16px;
    text-decoration: none; color: inherit;
    backdrop-filter: blur(14px);
    box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 28px rgba(0,0,0,0.28);
    transition: all 0.22s;
    position: relative; overflow: hidden;
  }

  /* Gold sweep on hover */
  .pl-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .pl-card:hover::before { opacity: 1; }
  .pl-card:hover {
    border-color: rgba(255,255,255,0.1);
    transform: translateX(4px);
    box-shadow: 0 1px 0 rgba(255,255,255,0.06) inset, 0 12px 40px rgba(0,0,0,0.38);
  }

  /* Problem icon */
  .pl-card-icon {
    width: 46px; height: 46px; border-radius: 12px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: var(--gold-dim); border: 1px solid var(--border-gold);
    transition: box-shadow 0.2s;
  }
  .pl-card:hover .pl-card-icon { box-shadow: 0 0 18px rgba(200,164,90,0.18); }

  /* Card body */
  .pl-card-body { flex: 1; min-width: 0; }
  .pl-card-top {
    display: flex; align-items: center; gap: 0.6rem;
    margin-bottom: 0.35rem; flex-wrap: wrap;
  }
  .pl-card-title {
    font-family: 'Fraunces', serif; font-weight: 700; font-size: 1rem;
    letter-spacing: -0.01em; color: var(--text);
  }
  .pl-card-category {
    font-size: 0.7rem; color: var(--text-sub); margin-top: 0.1rem;
    font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase;
  }
  .pl-card-desc {
    font-size: 0.84rem; font-weight: 300; color: var(--text-sub);
    line-height: 1.65; margin-top: 0.45rem;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }

  /* Difficulty pill */
  .dp {
    display: inline-flex; align-items: center;
    padding: 0.12rem 0.52rem; border-radius: 100px;
    font-size: 0.6rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.08em; flex-shrink: 0;
  }
  .dp-easy   { background: var(--green-dim); color: var(--green);  border: 1px solid var(--green-b); }
  .dp-medium { background: var(--amber-dim); color: var(--amber);  border: 1px solid var(--amber-b); }
  .dp-hard   { background: var(--red-dim);   color: var(--red);    border: 1px solid var(--red-b); }

  /* Solve CTA */
  .pl-card-cta {
    display: inline-flex; align-items: center; gap: 0.35rem;
    padding: 0.48rem 1rem; flex-shrink: 0;
    background: var(--gold-dim); border: 1px solid var(--border-gold);
    border-radius: 9px; color: var(--gold-lt);
    font-size: 0.76rem; font-weight: 700;
    transition: all 0.18s;
  }
  .pl-card:hover .pl-card-cta {
    background: rgba(200,164,90,0.16);
    border-color: rgba(200,164,90,0.35);
    box-shadow: 0 0 16px rgba(200,164,90,0.12);
  }

  /* Row number */
  .pl-card-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem; color: var(--text-dim);
    width: 24px; text-align: right; flex-shrink: 0;
  }

  /* ── EMPTY STATE ── */
  .pl-empty {
    text-align: center; padding: 4rem 1rem;
    color: var(--text-sub); font-size: 0.9rem;
    font-weight: 300; line-height: 1.7;
  }
  .pl-empty strong { color: var(--text); font-weight: 600; }

  /* ── FOOTER ── */
  .pl-footer {
    border-top: 1px solid var(--border);
    max-width: 1100px; margin: 0 auto;
    padding: 2rem 2rem;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 1rem;
    position: relative; z-index: 1;
  }
  .pl-footer-copy { font-size: 0.75rem; color: var(--text-sub); }
  .pl-footer-links { display: flex; gap: 2rem; }
  .pl-footer-link { font-size: 0.75rem; color: var(--text-sub); text-decoration: none; transition: color 0.18s; }
  .pl-footer-link:hover { color: var(--text); }

  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
  .au { opacity:0; animation: fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) forwards; }
  .au1{animation-delay:.05s} .au2{animation-delay:.12s} .au3{animation-delay:.2s}

  @media(max-width:768px) {
    .plnav { padding: 0 1.25rem; }
    .pl-nav-links { display: none; }
    .pl-page { padding: 2.5rem 1.25rem 4rem; }
    .pl-hero { flex-direction: column; align-items: flex-start; }
    .pl-card { padding: 1rem 1.1rem; gap: 0.9rem; }
    .pl-card-icon { width: 38px; height: 38px; border-radius: 10px; }
  }
`;

function dc(d = "") {
  const v = d.toLowerCase();
  return v === "easy" ? "dp-easy" : v === "medium" ? "dp-medium" : "dp-hard";
}

const FILTERS = ["All", "Easy", "Medium", "Hard"];

export default function ProblemsPage() {
  const problems = Object.values(PROBLEMS);
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("All");

  const easy   = problems.filter(p => p.difficulty === "Easy").length;
  const medium = problems.filter(p => p.difficulty === "Medium").length;
  const hard   = problems.filter(p => p.difficulty === "Hard").length;

  const visible = problems.filter(p => {
    const matchDiff = filter === "All" || p.difficulty === filter;
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.category || "").toLowerCase().includes(search.toLowerCase());
    return matchDiff && matchSearch;
  });

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="plnav">
        <Link to="/" className="pl-logo">
          <div className="pl-gem">
            <SparklesIcon size={15} color="#07070C" strokeWidth={2.5} />
          </div>
          <span className="pl-brand">Inter<em>Vue</em></span>
        </Link>
        <div className="pl-nav-links">
          <Link to="/"          className="pl-nav-link">Home</Link>
          <Link to="/dashboard" className="pl-nav-link">Dashboard</Link>
          <Link to="/problems"  className="pl-nav-link active">Problems</Link>
          <Link to="/quiz"      className="pl-nav-link">Quiz</Link>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>

      <div className="pl-page">

        {/* HERO */}
        <div className="pl-hero au au1">
          <div>
            <div className="pl-hero-eyebrow"><Code2Icon size={12} /> Practice Arena</div>
            <h1 className="pl-hero-title">Practice <em>Problems</em></h1>
            <p className="pl-hero-sub">Sharpen your coding skills with curated interview-grade problems.</p>
          </div>

          {/* Stat pills */}
          <div className="pl-stats">
            {[
              { icon:<BarChart3Icon size={15} color="var(--gold)"/>, cls:"spi-total",  num:problems.length, nc:"sn-total",  lbl:"Total" },
              { icon:<ZapIcon       size={15} color="var(--green)"/>, cls:"spi-easy",  num:easy,           nc:"sn-easy",   lbl:"Easy"  },
              { icon:<TargetIcon    size={15} color="var(--amber)"/>, cls:"spi-medium",num:medium,         nc:"sn-medium", lbl:"Medium"},
              { icon:<TrophyIcon    size={15} color="var(--red)"/>,   cls:"spi-hard",  num:hard,           nc:"sn-hard",   lbl:"Hard"  },
            ].map(({ icon, cls, num, nc, lbl }) => (
              <div key={lbl} className="pl-stat-pill">
                <div className={`pl-stat-icon ${cls}`}>{icon}</div>
                <div>
                  <div className={`pl-stat-num ${nc}`}>{num}</div>
                  <div className="pl-stat-lbl">{lbl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TOOLBAR */}
        <div className="pl-toolbar au au2">
          <div className="pl-search-wrap">
            <SearchIcon size={14} className="pl-search-icon" />
            <input
              className="pl-search"
              placeholder="Search problems…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {FILTERS.map(f => (
            <button
              key={f}
              className={`pl-filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* PROBLEM LIST */}
        <div className="pl-list au au3">
          {visible.length === 0 ? (
            <div className="pl-empty">
              <strong>No problems found</strong><br />
              Try adjusting your search or filter.
            </div>
          ) : visible.map((p, i) => (
            <Link key={p.id} to={`/problem/${p.id}`} className="pl-card">
              <span className="pl-card-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="pl-card-icon">
                <Code2Icon size={20} color="var(--gold)" />
              </div>
              <div className="pl-card-body">
                <div className="pl-card-top">
                  <span className="pl-card-title">{p.title}</span>
                  <span className={`dp ${dc(p.difficulty)}`}>{p.difficulty}</span>
                </div>
                {p.category && <div className="pl-card-category">{p.category}</div>}
                {p.description?.text && (
                  <p className="pl-card-desc">{p.description.text}</p>
                )}
              </div>
              <div className="pl-card-cta">
                Solve <ChevronRightIcon size={13} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop:"1px solid var(--border)" }}>
        <div className="pl-footer">
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
            <div className="pl-gem" style={{ width:26, height:26, borderRadius:8 }}>
              <SparklesIcon size={13} color="#07070C" strokeWidth={2.5} />
            </div>
            <span className="pl-footer-copy">© 2025 InterVue · Final Year Project</span>
          </div>
          <div className="pl-footer-links">
            <Link to="/privacy" className="pl-footer-link">Privacy</Link>
            <Link to="/terms"   className="pl-footer-link">Terms</Link>
            <Link to="/contact" className="pl-footer-link">Contact</Link>
          </div>
        </div>
      </footer>
    </>
  );
}