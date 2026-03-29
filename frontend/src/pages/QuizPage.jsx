import { useState, useEffect } from "react";
import { Link } from "react-router";
import { UserButton } from "@clerk/clerk-react";
import {
  SparklesIcon, BrainIcon, CheckCircle2Icon, XCircleIcon,
  ChevronRightIcon, RotateCcwIcon, TrophyIcon, ZapIcon,
  ArrowRightIcon, CircleDotIcon,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════
   CSS
══════════════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,800;0,9..144,900;1,9..144,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --ink:         #07070C;
    --surface:     #0B0B14;
    --card:        #0F0F1B;
    --card2:       #131321;
    --glass:       rgba(15,15,27,0.72);
    --border:      rgba(255,255,255,0.06);
    --border-h:    rgba(255,255,255,0.11);
    --border-gold: rgba(200,164,90,0.22);
    --gold:        #C8A45A;
    --gold-lt:     #E2C07A;
    --gold-dk:     #7A5F28;
    --gold-dim:    rgba(200,164,90,0.09);
    --text:        #ECEDF4;
    --text-sub:    #64748B;
    --text-dim:    #2C3444;
    --green:       #3ECF8E;
    --green-dim:   rgba(62,207,142,0.1);
    --green-b:     rgba(62,207,142,0.22);
    --red:         #F87171;
    --red-dim:     rgba(248,113,113,0.1);
    --red-b:       rgba(248,113,113,0.22);
    --amber:       #FBBF24;
    --amber-dim:   rgba(251,191,36,0.1);
    --amber-b:     rgba(251,191,36,0.22);
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
  .qnav {
    position: sticky; top: 0; z-index: 200;
    height: 60px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem;
    background: rgba(7,7,12,0.88);
    backdrop-filter: blur(24px) saturate(180%);
    border-bottom: 1px solid var(--border);
  }
  .qnav::after {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200,164,90,0.45) 40%, var(--gold) 50%, rgba(200,164,90,0.45) 60%, transparent);
  }
  .q-logo { display:flex; align-items:center; gap:0.6rem; text-decoration:none; }
  .q-gem {
    width:30px; height:30px; border-radius:9px;
    background: linear-gradient(145deg, var(--gold-lt), var(--gold-dk));
    display:flex; align-items:center; justify-content:center;
    box-shadow: 0 0 16px rgba(200,164,90,0.3), inset 0 1px 0 rgba(255,255,255,0.14);
  }
  .q-brand {
    font-family:'Fraunces',serif; font-weight:700; font-size:1.1rem;
    letter-spacing:-0.01em; color:var(--text);
  }
  .q-brand em { font-style:normal; color:var(--gold); }

  .q-nav-links { display:flex; align-items:center; gap:2rem; }
  .q-nav-link { font-size:0.85rem; font-weight:500; color:var(--text-sub); text-decoration:none; transition:color 0.18s; }
  .q-nav-link:hover { color:var(--text); }
  .q-nav-link.active { color:var(--gold-lt); }

  /* ── OUTER LAYOUT ── */
  .qz-outer {
    min-height: calc(100vh - 60px);
    display: flex; align-items: center; justify-content: center;
    padding: 3rem 1.5rem;
    position: relative;
  }

  /* Ambient glow */
  .qz-outer::before {
    content: '';
    position: fixed; top: -180px; left: 50%; transform: translateX(-50%);
    width: 900px; height: 600px;
    background: radial-gradient(ellipse at 50% 0%, rgba(200,164,90,0.045) 0%, transparent 65%);
    pointer-events: none; z-index: 0;
  }

  /* Grid lines */
  .qz-outer::after {
    content: '';
    position: fixed; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 100%);
    pointer-events: none; z-index: 0;
  }

  /* ── QUIZ CARD ── */
  .qz-card {
    position: relative; z-index: 1;
    width: 100%; max-width: 560px;
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 22px;
    backdrop-filter: blur(20px);
    box-shadow:
      0 1px 0 rgba(255,255,255,0.05) inset,
      0 32px 80px rgba(0,0,0,0.5);
    overflow: hidden;
    animation: cardIn 0.45s cubic-bezier(0.16,1,0.3,1);
  }
  @keyframes cardIn {
    from { opacity:0; transform: translateY(24px); }
    to   { opacity:1; transform: translateY(0); }
  }

  /* Gold top edge */
  .qz-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }

  /* ── CARD HEADER ── */
  .qz-header {
    background: linear-gradient(135deg, #12101E, #1A1630);
    border-bottom: 1px solid var(--border);
    padding: 1.6rem 2rem 1.4rem;
    position: relative; overflow: hidden;
  }
  .qz-header-glow {
    position: absolute; top: -80px; right: -60px;
    width: 220px; height: 220px;
    background: radial-gradient(circle, rgba(200,164,90,0.08), transparent 70%);
    pointer-events: none;
  }
  .qz-header-top {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 1rem; position: relative;
  }
  .qz-eyebrow {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--gold);
  }
  .qz-counter {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem; color: var(--text-sub);
    background: var(--card2); border: 1px solid var(--border);
    padding: 0.22rem 0.65rem; border-radius: 7px;
  }
  .qz-counter em { color: var(--gold-lt); font-style: normal; font-weight: 600; }

  /* Progress bar */
  .qz-progress-track {
    height: 3px; border-radius: 2px; background: var(--card2);
    position: relative; overflow: hidden;
  }
  .qz-progress-fill {
    height: 100%; border-radius: 2px;
    background: linear-gradient(90deg, var(--gold-dk), var(--gold-lt));
    transition: width 0.4s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 0 8px rgba(200,164,90,0.4);
  }

  /* ── QUESTION ── */
  .qz-body { padding: 2rem 2rem 1.5rem; }

  .qz-question {
    font-family: 'Fraunces', serif;
    font-weight: 700; font-size: 1.1rem; letter-spacing: -0.015em;
    line-height: 1.5; color: var(--text);
    margin-bottom: 1.5rem;
  }

  /* ── OPTIONS ── */
  .qz-options { display: flex; flex-direction: column; gap: 0.55rem; }

  .qz-opt {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.85rem 1.1rem;
    background: var(--card2); border: 1.5px solid var(--border);
    border-radius: 12px; cursor: pointer;
    font-size: 0.875rem; font-weight: 500; color: var(--text-sub);
    transition: all 0.18s; user-select: none;
    position: relative; overflow: hidden;
  }

  /* Hover state */
  .qz-opt:hover:not(.selected):not(.correct):not(.wrong) {
    border-color: var(--border-h);
    background: rgba(255,255,255,0.03);
    color: var(--text);
  }

  /* Selected (before answer revealed) */
  .qz-opt.selected {
    border-color: var(--border-gold);
    background: var(--gold-dim);
    color: var(--gold-lt);
  }

  /* Correct answer */
  .qz-opt.correct {
    border-color: var(--green-b);
    background: var(--green-dim);
    color: var(--green);
  }

  /* Wrong selection */
  .qz-opt.wrong {
    border-color: var(--red-b);
    background: var(--red-dim);
    color: var(--red);
  }

  /* Option letter badge */
  .qz-opt-letter {
    width: 26px; height: 26px; border-radius: 7px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem; font-weight: 600;
    background: var(--card); border: 1px solid var(--border);
    color: var(--text-dim); transition: all 0.18s;
  }
  .qz-opt.selected .qz-opt-letter { background: var(--gold-dim); border-color: var(--border-gold); color: var(--gold-lt); }
  .qz-opt.correct  .qz-opt-letter { background: var(--green-dim); border-color: var(--green-b); color: var(--green); }
  .qz-opt.wrong    .qz-opt-letter { background: var(--red-dim); border-color: var(--red-b); color: var(--red); }

  .qz-opt-text { flex: 1; }

  .qz-opt-check { margin-left: auto; flex-shrink: 0; }

  /* ── FOOTER ── */
  .qz-footer {
    padding: 1.25rem 2rem 2rem;
    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    border-top: 1px solid var(--border);
    background: rgba(7,7,12,0.4);
  }

  .qz-score-chip {
    display: inline-flex; align-items: center; gap: 0.45rem;
    padding: 0.35rem 0.85rem; border-radius: 8px;
    background: var(--gold-dim); border: 1px solid var(--border-gold);
    font-size: 0.72rem; font-weight: 700; color: var(--gold-lt);
    font-family: 'JetBrains Mono', monospace;
  }

  .qz-next-btn {
    display: inline-flex; align-items: center; gap: 0.45rem;
    padding: 0.6rem 1.5rem;
    background: linear-gradient(135deg, var(--gold-lt), var(--gold));
    color: #07070C; border: none; border-radius: 10px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 800; font-size: 0.82rem; letter-spacing: 0.02em;
    cursor: pointer; transition: all 0.22s;
    box-shadow: 0 2px 16px rgba(200,164,90,0.28), inset 0 1px 0 rgba(255,255,255,0.15);
  }
  .qz-next-btn:hover:not(:disabled) {
    transform: translateY(-1px); box-shadow: 0 5px 24px rgba(200,164,90,0.42);
  }
  .qz-next-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  /* ── RESULT SCREEN ── */
  .qz-result {
    padding: 3rem 2rem 2.5rem;
    text-align: center; position: relative; z-index: 1;
  }
  .qz-result-icon {
    width: 72px; height: 72px; border-radius: 50%;
    margin: 0 auto 1.5rem;
    display: flex; align-items: center; justify-content: center;
    animation: popIn 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  @keyframes popIn { from{transform:scale(0.6);opacity:0}to{transform:scale(1);opacity:1} }
  .qz-result-icon.great { background: var(--gold-dim); border: 1px solid var(--border-gold); }
  .qz-result-icon.good  { background: var(--green-dim); border: 1px solid var(--green-b); }
  .qz-result-icon.low   { background: var(--red-dim);   border: 1px solid var(--red-b); }

  .qz-result-title {
    font-family: 'Fraunces', serif;
    font-weight: 900; font-size: 1.75rem; letter-spacing: -0.025em;
    margin-bottom: 0.35rem;
  }
  .qz-result-sub { font-size: 0.88rem; color: var(--text-sub); font-weight: 300; line-height: 1.6; margin-bottom: 2rem; }

  /* Big score display */
  .qz-big-score {
    display: inline-flex; align-items: baseline; gap: 0.25rem;
    font-family: 'Fraunces', serif; font-weight: 900;
    font-size: 4rem; letter-spacing: -0.04em; line-height: 1;
    background: linear-gradient(135deg, var(--gold-lt), var(--gold));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    margin-bottom: 0.25rem;
  }
  .qz-big-score-denom {
    font-size: 1.8rem; opacity: 0.5;
  }

  .qz-pct {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.82rem; color: var(--text-sub); margin-bottom: 2rem;
  }

  /* Result breakdown pills */
  .qz-breakdown {
    display: flex; justify-content: center; gap: 0.75rem;
    margin-bottom: 2.25rem; flex-wrap: wrap;
  }
  .qz-bd-pill {
    display: inline-flex; align-items: center; gap: 0.45rem;
    padding: 0.45rem 1rem; border-radius: 10px;
    font-size: 0.75rem; font-weight: 700;
  }
  .bdp-correct { background: var(--green-dim); color: var(--green); border: 1px solid var(--green-b); }
  .bdp-wrong   { background: var(--red-dim);   color: var(--red);   border: 1px solid var(--red-b); }

  /* Action buttons */
  .qz-result-actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }

  .qz-btn-primary {
    display: inline-flex; align-items: center; gap: 0.45rem;
    padding: 0.72rem 1.75rem;
    background: linear-gradient(135deg, var(--gold-lt), var(--gold));
    color: #07070C; border: none; border-radius: 11px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 800; font-size: 0.88rem; letter-spacing: 0.02em;
    cursor: pointer; transition: all 0.22s;
    box-shadow: 0 3px 20px rgba(200,164,90,0.3), inset 0 1px 0 rgba(255,255,255,0.15);
    text-decoration: none;
  }
  .qz-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 28px rgba(200,164,90,0.45); }

  .qz-btn-ghost {
    display: inline-flex; align-items: center; gap: 0.45rem;
    padding: 0.72rem 1.5rem;
    background: var(--glass); color: var(--text);
    border: 1px solid var(--border); border-radius: 11px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 600; font-size: 0.88rem;
    cursor: pointer; transition: all 0.18s;
    text-decoration: none;
  }
  .qz-btn-ghost:hover { border-color: var(--border-h); background: rgba(255,255,255,0.04); }

  @media(max-width:640px) {
    .qnav { padding: 0 1.25rem; }
    .q-nav-links { display: none; }
    .qz-body { padding: 1.5rem 1.25rem 1.25rem; }
    .qz-header { padding: 1.25rem 1.25rem 1.1rem; }
    .qz-footer { padding: 1rem 1.25rem 1.5rem; }
    .qz-result { padding: 2.25rem 1.25rem 1.75rem; }
  }
`;

/* ══════════════════════════════════════════════════════════════════
   QUESTIONS
══════════════════════════════════════════════════════════════════ */
const questions = [
  { question: "What is the output of 2 + '2' in JavaScript?",              options: ["4", "22", "NaN", "Error"],                                                  answer: 1 },
  { question: "Which hook is used for state in React?",                     options: ["useData", "useState", "useEffect", "useRef"],                               answer: 1 },
  { question: "Which keyword is used to define a constant?",                options: ["var", "let", "const", "static"],                                            answer: 2 },
  { question: "What does CSS stand for?",                                   options: ["Computer Style Sheets", "Creative Style System", "Cascading Style Sheets", "Color Style Sheets"], answer: 2 },
  { question: "Which company developed React?",                             options: ["Google", "Microsoft", "Facebook", "Amazon"],                                answer: 2 },
  { question: "Which method converts JSON to a JavaScript object?",        options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "parse.JSON()"],        answer: 0 },
  { question: "Which HTML tag is used to include JavaScript?",             options: ["<js>", "<javascript>", "<script>", "<code>"],                              answer: 2 },
  { question: "What is the default development port for React?",           options: ["3000", "5000", "8080", "4200"],                                            answer: 0 },
  { question: "Which operator checks both value and type?",                options: ["==", "=", "===", "!="],                                                    answer: 2 },
  { question: "Which useEffect syntax runs only once on mount?",           options: ["useEffect(fn)", "useEffect(fn, [])", "useEffect([], fn)", "useEffect(fn, [fn])"], answer: 1 },
];

const LETTERS = ["A", "B", "C", "D"];

function getResultTier(pct) {
  if (pct >= 80) return { tier:"great", label:"Outstanding!", sub:"You absolutely crushed it. Top-tier performance." };
  if (pct >= 50) return { tier:"good",  label:"Good Job!",    sub:"Solid score. A bit more practice and you'll be unstoppable." };
  return               { tier:"low",   label:"Keep Going!",   sub:"Every expert was once a beginner. Review and try again!" };
}

/* ══════════════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════════════ */
export default function QuizPage() {
  const [current,  setCurrent]  = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score,    setScore]    = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const pct = Math.round((score / questions.length) * 100);
  const progress = ((current + (revealed ? 1 : 0)) / questions.length) * 100;
  const { tier, label, sub } = getResultTier(Math.round((score / questions.length) * 100));

  const handleSelect = (idx) => {
    if (revealed) return;
    setSelected(idx);
  };

  const handleNext = () => {
    if (!revealed) {
      // First click: reveal answer
      setRevealed(true);
      if (selected === q.answer) setScore(s => s + 1);
      return;
    }
    // Second click: advance
    setSelected(null);
    setRevealed(false);
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
    } else {
      setFinished(true);
      // Persist to localStorage for dashboard widget
      localStorage.setItem("latestQuizScore", JSON.stringify({
        score: score + (selected === q.answer ? 1 : 0),
        total: questions.length,
        date:  new Date().toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" }),
      }));
    }
  };

  const handleRestart = () => {
    setCurrent(0); setSelected(null); setRevealed(false);
    setScore(0);   setFinished(false);
  };

  const optClass = (idx) => {
    if (!revealed) return selected === idx ? "selected" : "";
    if (idx === q.answer) return "correct";
    if (idx === selected && selected !== q.answer) return "wrong";
    return "";
  };

  const nextLabel = finished ? "See Results" :
    !revealed ? "Check Answer" :
    current === questions.length - 1 ? "Finish Quiz" : "Next Question";

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="qnav">
        <Link to="/" className="q-logo">
          <div className="q-gem">
            <SparklesIcon size={15} color="#07070C" strokeWidth={2.5} />
          </div>
          <span className="q-brand">Inter<em>Vue</em></span>
        </Link>
        <div className="q-nav-links">
          <Link to="/"          className="q-nav-link">Home</Link>
          <Link to="/dashboard" className="q-nav-link">Dashboard</Link>
          <Link to="/problems"  className="q-nav-link">Problems</Link>
          <Link to="/quiz"      className="q-nav-link active">Quiz</Link>
        </div>
        <UserButton afterSignOutUrl="/" />
      </nav>

      <div className="qz-outer">

        {!finished ? (
          <div className="qz-card">
            {/* Header */}
            <div className="qz-header">
              <div className="qz-header-glow" />
              <div className="qz-header-top">
                <div className="qz-eyebrow"><BrainIcon size={13} /> Quiz Challenge</div>
                <div className="qz-counter">
                  Q<em>{current + 1}</em> / {questions.length}
                </div>
              </div>
              {/* Progress bar */}
              <div className="qz-progress-track">
                <div className="qz-progress-fill" style={{ width:`${progress}%` }} />
              </div>
            </div>

            {/* Question */}
            <div className="qz-body">
              <div className="qz-question">{q.question}</div>

              <div className="qz-options">
                {q.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className={`qz-opt ${optClass(idx)}`}
                    onClick={() => handleSelect(idx)}
                  >
                    <div className="qz-opt-letter">{LETTERS[idx]}</div>
                    <span className="qz-opt-text">{opt}</span>
                    {revealed && idx === q.answer && (
                      <div className="qz-opt-check">
                        <CheckCircle2Icon size={16} color="var(--green)" />
                      </div>
                    )}
                    {revealed && idx === selected && selected !== q.answer && (
                      <div className="qz-opt-check">
                        <XCircleIcon size={16} color="var(--red)" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="qz-footer">
              <div className="qz-score-chip">
                <TrophyIcon size={12} />
                {score} / {current + (revealed ? 1 : 0)}
              </div>
              <button
                className="qz-next-btn"
                onClick={handleNext}
                disabled={selected === null && !revealed}
              >
                {nextLabel}
                {revealed ? <ArrowRightIcon size={14} /> : <ChevronRightIcon size={14} />}
              </button>
            </div>
          </div>
        ) : (
          /* ── RESULT SCREEN ── */
          <div className="qz-card">
            <div className="qz-result">
              {/* Icon */}
              <div className={`qz-result-icon ${tier}`}>
                <TrophyIcon size={30} color={tier === "great" ? "var(--gold)" : tier === "good" ? "var(--green)" : "var(--red)"} />
              </div>

              <div className="qz-result-title">{label}</div>
              <div className="qz-result-sub">{sub}</div>

              {/* Big score */}
              <div className="qz-big-score">
                {score}
                <span className="qz-big-score-denom">/{questions.length}</span>
              </div>
              <div className="qz-pct">{pct}% correct</div>

              {/* Breakdown */}
              <div className="qz-breakdown">
                <div className="qz-bd-pill bdp-correct">
                  <CheckCircle2Icon size={13} /> {score} correct
                </div>
                <div className="qz-bd-pill bdp-wrong">
                  <XCircleIcon size={13} /> {questions.length - score} wrong
                </div>
              </div>

              {/* Actions */}
              <div className="qz-result-actions">
                <button className="qz-btn-primary" onClick={handleRestart}>
                  <RotateCcwIcon size={15} /> Retake Quiz
                </button>
                <Link to="/problems" className="qz-btn-ghost">
                  <ZapIcon size={15} /> Practice Problems
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}