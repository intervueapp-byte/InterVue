
export const BASE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,800;0,9..144,900;1,9..144,700;1,9..144,800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  :root {
    --ink:       #07070C;
    --surface:   #0C0C15;
    --card:      #0F0F1A;
    --card2:     #131320;
    --border:    rgba(255,255,255,0.07);
    --border-h:  rgba(255,255,255,0.13);
    --gold:      #C8A45A;
    --gold-lt:   #E2C07A;
    --gold-dk:   #7A5F28;
    --gold-dim:  rgba(200,164,90,0.1);
    --text:      #ECEDF4;
    --text-sub:  #6B7280;
    --text-dim:  #3D4451;
    --accent:    #5B8FF9;
    --green:     #3ECF8E;
    --green-dim: rgba(62,207,142,0.1);
    --red:       #F87171;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    background: var(--ink);
    color: var(--text);
    font-family: 'Plus Jakarta Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 15px;
    line-height: 1.6;
  }

  body::after {
  content: '';
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at center, rgba(255,255,255,0.02), transparent 70%);
  pointer-events: none;
  z-index: 9999;
}

  /* ── NAV ── */
  .iv-nav {
    position: sticky; top: 0; z-index: 200;
    height: 68px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem;
    background: rgba(7,7,12,0.75);
    backdrop-filter: blur(24px) saturate(180%);
    border-bottom: 1px solid var(--border);
  }
  .iv-logo {
    display: flex; align-items: center; gap: 0.75rem;
    text-decoration: none;
  }
  .iv-logo-gem {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(145deg, var(--gold-lt), var(--gold-dk));
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 20px rgba(200,164,90,0.3), inset 0 1px 0 rgba(255,255,255,0.15);
  }
  .iv-logo-name {
    font-family: 'Fraunces', serif;
    font-weight: 700; font-size: 1.25rem; letter-spacing: -0.01em;
    color: var(--text);
  }
  .iv-logo-name span { color: var(--gold); }

  .iv-nav-links { display: flex; align-items: center; gap: 2.25rem; }
  .iv-nav-link {
    font-size: 0.875rem; font-weight: 500; color: var(--text-sub);
    text-decoration: none; transition: color 0.2s;
  }
  .iv-nav-link:hover { color: var(--text); }

  .iv-nav-btn {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.6rem 1.35rem;
    background: var(--gold);
    color: #07070C;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700; font-size: 0.85rem; letter-spacing: 0.02em;
    border: none; border-radius: 9px; cursor: pointer;
    box-shadow: 0 2px 16px rgba(200,164,90,0.25);
    transition: all 0.2s; text-decoration: none;
  }
  .iv-nav-btn:hover { background: var(--gold-lt); transform: translateY(-1px); box-shadow: 0 4px 24px rgba(200,164,90,0.38); }

  /* ── PAGE HERO ── */
  .page-hero {
    position: relative;
    padding: 5.5rem 2.5rem 4rem;
    text-align: center;
    overflow: hidden;
  }
  .page-hero::before {
    content: '';
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 700px; height: 500px;
    background: radial-gradient(ellipse, rgba(200,164,90,0.07) 0%, transparent 65%);
    pointer-events: none;
  }
  .page-hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
  }
  .page-hero-eyebrow {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.35rem 1rem;
    background: rgba(200,164,90,0.07);
    border: 1px solid rgba(200,164,90,0.22);
    border-radius: 100px;
    font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.5rem;
    position: relative;
  }
  .page-hero-title {
    font-family: 'Fraunces', serif;
    font-weight: 900; font-size: clamp(2.5rem, 5vw, 3.75rem);
    letter-spacing: -0.03em; line-height: 1.05;
    color: var(--text); margin-bottom: 1.25rem;
    position: relative;
  }
  .page-hero-title em {
    font-style: italic;
    background: linear-gradient(100deg, var(--gold-lt), var(--gold));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .page-hero-sub {
    font-size: 1.05rem; font-weight: 300; color: var(--text-sub);
    max-width: 540px; margin: 0 auto; line-height: 1.8;
    position: relative;
  }

  /* ── CONTAINER ── */
  .iv-container {
    max-width: 860px;
    margin: 0 auto;
    padding: 0 2.5rem 6rem;
  }
  .iv-container-wide {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2.5rem 6rem;
  }

  /* ── SECTION CARD ── */
  .iv-section-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 2.5rem 2.75rem;
    margin-bottom: 1.25rem;
    position: relative; overflow: hidden;
    transition: border-color 0.25s;
  }
  .iv-section-card:hover { border-color: var(--border-h); }
  .iv-section-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
    background: linear-gradient(90deg, var(--gold), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .iv-section-card:hover::before { opacity: 1; }

  .section-num {
    display: inline-flex; align-items: center; justify-content: center;
    width: 28px; height: 28px; border-radius: 8px;
    background: var(--gold-dim); border: 1px solid rgba(200,164,90,0.2);
    font-family: 'Fraunces', serif; font-weight: 800; font-size: 0.75rem;
    color: var(--gold); margin-bottom: 1rem; flex-shrink: 0;
  }

  .section-heading {
    font-family: 'Fraunces', serif;
    font-weight: 800; font-size: 1.2rem; letter-spacing: -0.02em;
    color: var(--text); margin-bottom: 1rem;
    display: flex; align-items: center; gap: 0.75rem;
  }

  .section-body {
    font-size: 0.92rem; font-weight: 300; color: var(--text-sub);
    line-height: 1.85;
  }
  .section-body p { margin-bottom: 0.9rem; }
  .section-body p:last-child { margin-bottom: 0; }
  .section-body strong { color: var(--text); font-weight: 600; }
  .section-body a { color: var(--gold); text-decoration: none; transition: color 0.2s; }
  .section-body a:hover { color: var(--gold-lt); }

  /* ── BULLET LIST ── */
  .iv-list {
    list-style: none;
    display: flex; flex-direction: column; gap: 0.6rem;
    margin-top: 0.75rem;
  }
  .iv-list li {
    display: flex; align-items: flex-start; gap: 0.65rem;
    font-size: 0.9rem; font-weight: 300; color: var(--text-sub); line-height: 1.7;
  }
  .iv-list li::before {
    content: '';
    display: block; flex-shrink: 0;
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--gold); margin-top: 0.55rem;
    box-shadow: 0 0 6px rgba(200,164,90,0.5);
  }
  .iv-list li strong { color: var(--text); font-weight: 600; }

  /* ── FOOTER ── */
  .iv-footer {
    border-top: 1px solid var(--border);
    padding: 2.5rem;
    max-width: 1240px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 1.25rem;
  }
  .iv-footer-copy { font-size: 0.78rem; color: var(--text-sub); }
  .iv-footer-links { display: flex; gap: 2.25rem; }
  .iv-footer-link {
    font-size: 0.78rem; color: var(--text-sub);
    text-decoration: none; transition: color 0.2s;
  }
  .iv-footer-link:hover { color: var(--text); }

  /* ── LAST UPDATED STRIP ── */
  .last-updated {
    display: inline-flex; align-items: center; gap: 0.5rem;
    margin-bottom: 2rem;
    font-size: 0.76rem; color: var(--text-sub);
    background: var(--card); border: 1px solid var(--border);
    padding: 0.4rem 1rem; border-radius: 8px;
  }
  .last-updated span { color: var(--gold); font-weight: 600; }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
  .au { opacity:0; animation: fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) forwards; }
  .au1{animation-delay:.06s} .au2{animation-delay:.14s} .au3{animation-delay:.22s}
  .au4{animation-delay:.3s}  .au5{animation-delay:.38s}

  /* ── RESPONSIVE ── */
  @media(max-width:768px) {
    .iv-nav { padding: 0 1.25rem; }
    .iv-nav-links { display: none; }
    .page-hero { padding: 4rem 1.25rem 3rem; }
    .iv-container, .iv-container-wide { padding: 0 1.25rem 4rem; }
    .iv-section-card { padding: 1.75rem 1.5rem; }
    .iv-footer { padding: 2rem 1.25rem; flex-direction: column; align-items: flex-start; }
  }
`