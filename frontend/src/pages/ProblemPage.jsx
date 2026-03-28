import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";
import { executeCode } from "../lib/piston";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";

import {
  SparklesIcon, ChevronLeftIcon, PlayIcon, ChevronRightIcon,
  Code2Icon, LayoutPanelLeftIcon, TerminalIcon, ZapIcon,
  CircleCheckBigIcon, ClockIcon, BarChart3Icon,
} from "lucide-react";
import { Link } from "react-router";
import { UserButton } from "@clerk/clerk-react";

/* ─── CSS ──────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,800;1,9..144,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

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
    --green-dim: rgba(62,207,142,0.12);
    --red:       #F87171;
    --red-dim:   rgba(248,113,113,0.12);
    --amber:     #FBBF24;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; }

  body {
    background: var(--ink);
    color: var(--text);
    font-family: 'Plus Jakarta Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }

  /* Grain */
  body::after {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.025; pointer-events: none; z-index: 9999;
  }

  /* ── TOPBAR ── */
  .pb-topbar {
    height: 52px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 1rem;
    background: rgba(7,7,12,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
    gap: 1rem;
    position: relative;
    z-index: 100;
  }

  /* Gold line on top */
  .pb-topbar::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent 0%, var(--gold-dk) 30%, var(--gold) 50%, var(--gold-dk) 70%, transparent 100%);
    opacity: 0.6;
  }

  .pb-logo {
    display: flex; align-items: center; gap: 0.6rem;
    text-decoration: none; flex-shrink: 0;
  }
  .pb-logo-gem {
    width: 28px; height: 28px; border-radius: 8px;
    background: linear-gradient(145deg, var(--gold-lt), var(--gold-dk));
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 14px rgba(200,164,90,0.3);
  }
  .pb-logo-name {
    font-family: 'Fraunces', serif; font-weight: 700; font-size: 1rem;
    letter-spacing: -0.01em; color: var(--text);
  }
  .pb-logo-name span { color: var(--gold); }

  /* Center — problem selector */
  .pb-center {
    display: flex; align-items: center; gap: 0.5rem;
    flex: 1; justify-content: center; max-width: 520px; margin: 0 auto;
  }

  .pb-nav-btn {
    display: flex; align-items: center; justify-content: center;
    width: 28px; height: 28px; border-radius: 7px;
    background: var(--card2); border: 1px solid var(--border);
    color: var(--text-sub); cursor: pointer; transition: all 0.18s;
    flex-shrink: 0;
  }
  .pb-nav-btn:hover { border-color: var(--border-h); color: var(--text); background: var(--card); }

  .pb-problem-select {
    background: var(--card2); border: 1px solid var(--border);
    border-radius: 9px; color: var(--text);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.8rem; font-weight: 600;
    padding: 0.3rem 0.85rem;
    outline: none; cursor: pointer; transition: border-color 0.2s;
    max-width: 260px;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.6rem center;
    padding-right: 2rem;
  }
  .pb-problem-select:focus { border-color: rgba(200,164,90,0.35); }
  .pb-problem-select option { background: var(--card2); color: var(--text); }

  /* Difficulty pill */
  .diff-pill {
    display: inline-flex; align-items: center;
    padding: 0.18rem 0.6rem; border-radius: 100px;
    font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
    flex-shrink: 0;
  }
  .dp-easy   { background: var(--green-dim); color: var(--green); }
  .dp-medium { background: rgba(251,191,36,0.1); color: var(--amber); }
  .dp-hard   { background: var(--red-dim);   color: var(--red); }

  /* Right — run button + status */
  .pb-right {
    display: flex; align-items: center; gap: 0.65rem; flex-shrink: 0;
  }

  .pb-run-btn {
    display: inline-flex; align-items: center; gap: 0.45rem;
    padding: 0.45rem 1.15rem;
    background: linear-gradient(135deg, var(--gold-lt), var(--gold));
    color: #07070C;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 800; font-size: 0.78rem; letter-spacing: 0.02em;
    border: none; border-radius: 8px; cursor: pointer;
    box-shadow: 0 2px 14px rgba(200,164,90,0.28);
    transition: all 0.2s;
  }
  .pb-run-btn:hover:not(:disabled) {
    transform: translateY(-1px); box-shadow: 0 5px 22px rgba(200,164,90,0.42);
  }
  .pb-run-btn:disabled {
    opacity: 0.65; cursor: not-allowed; transform: none;
  }

  .pb-status-chip {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.35rem 0.75rem; border-radius: 7px;
    font-size: 0.72rem; font-weight: 600;
    background: var(--card2); border: 1px solid var(--border);
    color: var(--text-sub);
  }
  .pb-status-chip.running { color: var(--gold); border-color: rgba(200,164,90,0.25); background: var(--gold-dim); }
  .pb-status-chip.passed  { color: var(--green); border-color: rgba(62,207,142,0.2); background: var(--green-dim); }
  .pb-status-chip.failed  { color: var(--red); border-color: rgba(248,113,113,0.2); background: var(--red-dim); }

  /* Spinning ring */
  .spin-ring {
    width: 13px; height: 13px; border-radius: 50%;
    border: 2px solid rgba(200,164,90,0.25);
    border-top-color: var(--gold);
    animation: pbspin 0.75s linear infinite;
    flex-shrink: 0;
  }
  @keyframes pbspin { to { transform: rotate(360deg); } }

  /* ── PANEL SHELL ── */
  .pb-root {
    display: flex; flex-direction: column;
    height: 100vh; background: var(--ink);
  }

  .pb-panels {
    flex: 1; overflow: hidden;
    min-height: 0;
  }

  /* Resize handles */
  [data-panel-resize-handle-id] {
    background: var(--border) !important;
    position: relative;
    transition: background 0.2s;
  }
  [data-panel-resize-handle-id]:hover,
  [data-panel-resize-handle-id][data-resize-handle-active] {
    background: rgba(200,164,90,0.2) !important;
  }
  [data-panel-resize-handle-id]::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(to right, transparent, rgba(200,164,90,0.12), transparent);
    opacity: 0; transition: opacity 0.2s;
  }
  [data-panel-resize-handle-id]:hover::after { opacity: 1; }

  /* Horizontal divider (col) */
  .pb-divider-col {
    width: 5px !important;
    cursor: col-resize;
    background: var(--border) !important;
    display: flex; align-items: center; justify-content: center;
  }
  .pb-divider-col::before {
    content: '';
    display: block; width: 2px; height: 32px; border-radius: 2px;
    background: rgba(200,164,90,0.2);
    transition: background 0.2s;
  }
  .pb-divider-col:hover::before { background: rgba(200,164,90,0.5); }

  /* Vertical divider (row) */
  .pb-divider-row {
    height: 5px !important;
    cursor: row-resize;
    background: var(--border) !important;
    display: flex; align-items: center; justify-content: center;
  }
  .pb-divider-row::before {
    content: '';
    display: block; height: 2px; width: 32px; border-radius: 2px;
    background: rgba(200,164,90,0.2);
    transition: background 0.2s;
  }
  .pb-divider-row:hover::before { background: rgba(200,164,90,0.5); }

  /* ── PANEL LABELS (mini header bars) ── */
  .panel-wrap {
    display: flex; flex-direction: column;
    height: 100%; background: var(--ink); overflow: hidden;
  }
  .panel-labelbar {
    display: flex; align-items: center; gap: 0.55rem;
    padding: 0 1rem;
    height: 36px; flex-shrink: 0;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    font-size: 0.72rem; font-weight: 600;
    color: var(--text-sub); letter-spacing: 0.04em; text-transform: uppercase;
  }
  .panel-labelbar svg { color: var(--gold); flex-shrink: 0; }
  .panel-content {
    flex: 1; overflow: hidden; min-height: 0;
  }

  /* Inner scrollable area override for sub-components */
  .panel-content > * {
    height: 100% !important;
    background: var(--ink) !important;
  }

  /* ── LANGUAGE BADGE in topbar ── */
  .lang-badge {
    display: inline-flex; align-items: center; gap: 0.35rem;
    padding: 0.28rem 0.7rem; border-radius: 7px;
    background: var(--card2); border: 1px solid var(--border);
    font-size: 0.7rem; font-weight: 600; color: var(--text-sub);
    letter-spacing: 0.04em;
  }
  .lang-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--gold); box-shadow: 0 0 6px rgba(200,164,90,0.5);
  }

  /* ── BACK LINK ── */
  .pb-back {
    display: inline-flex; align-items: center; gap: 0.35rem;
    font-size: 0.75rem; font-weight: 600; color: var(--text-sub);
    text-decoration: none; transition: color 0.18s;
    padding: 0.3rem 0.55rem; border-radius: 7px;
    border: 1px solid transparent;
  }
  .pb-back:hover { color: var(--text); border-color: var(--border); background: var(--card2); }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .pb-center { display: none; }
    .pb-status-chip { display: none; }
  }
`;

/* ─── Helpers ──────────────────────────────────────────────────────── */
function getDiffClass(d = "") {
  const v = d.toLowerCase();
  if (v === "easy")   return "dp-easy";
  if (v === "medium") return "dp-medium";
  return "dp-hard";
}

function getLangDot(lang) {
  const map = {
    javascript: "#F7DF1E",
    typescript: "#3178C6",
    python:     "#3776AB",
    java:       "#ED8B00",
    cpp:        "#00599C",
    go:         "#00ADD8",
    rust:       "#CE422B",
  };
  return map[lang] || "var(--gold)";
}

/* ─── Component ────────────────────────────────────────────────────── */
function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage]  = useState("javascript");
  const [code, setCode]       = useState(PROBLEMS[currentProblemId].starterCode.javascript);
  const [output, setOutput]   = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [runStatus, setRunStatus] = useState(null); // null | 'running' | 'passed' | 'failed'

  const currentProblem = PROBLEMS[currentProblemId];
  const allProblems    = Object.values(PROBLEMS);
  const currentIndex   = allProblems.findIndex(p => p.id === currentProblemId);

  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
      setRunStatus(null);
    }
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(currentProblem.starterCode[newLang]);
    setOutput(null);
    setRunStatus(null);
  };

  const handleProblemChange = (newProblemId) => {
    setRunStatus(null);
    navigate(`/problem/${newProblemId}`);
  };

  const goToPrev = () => {
    if (currentIndex > 0) handleProblemChange(allProblems[currentIndex - 1].id);
  };
  const goToNext = () => {
    if (currentIndex < allProblems.length - 1) handleProblemChange(allProblems[currentIndex + 1].id);
  };

  const normalizeOutput = (output) =>
    output.trim().split("\n").map(line =>
      line.trim()
        .replace(/\[\s+/g, "[")
        .replace(/\s+\]/g, "]")
        .replace(/\s*,\s*/g, ",")
    ).filter(l => l.length > 0).join("\n");

  const checkIfTestsPassed = (actual, expected) =>
    normalizeOutput(actual) === normalizeOutput(expected);

  const triggerConfetti = () => {
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.2, y: 0.6 } });
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.8, y: 0.6 } });
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    setRunStatus("running");

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    if (result.success) {
      const expected   = currentProblem.expectedOutput[selectedLanguage];
      const passed     = checkIfTestsPassed(result.output, expected);
      setRunStatus(passed ? "passed" : "failed");
      if (passed) { triggerConfetti(); toast.success("All tests passed! Great job!"); }
      else toast.error("Tests failed. Check your output!");
    } else {
      setRunStatus("failed");
      toast.error("Code execution failed!");
    }
  };

  /* Status chip content */
  const statusChip = () => {
    if (!runStatus) return null;
    if (runStatus === "running") return (
      <div className="pb-status-chip running">
        <div className="spin-ring" /> Running…
      </div>
    );
    if (runStatus === "passed") return (
      <div className="pb-status-chip passed">
        <CircleCheckBigIcon size={12} /> Accepted
      </div>
    );
    return (
      <div className="pb-status-chip failed">
        <ZapIcon size={12} /> Wrong Answer
      </div>
    );
  };

  return (
    <>
      <style>{css}</style>

      <div className="pb-root">

        {/* ── TOPBAR ── */}
        <header className="pb-topbar">

          {/* Left */}
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", flexShrink:0 }}>
            <Link to="/" className="pb-logo">
              <div className="pb-logo-gem">
                <SparklesIcon size={14} color="#07070C" strokeWidth={2.5} />
              </div>
              <span className="pb-logo-name">Inter<span>Vue</span></span>
            </Link>

            <div style={{ width:1, height:20, background:"var(--border)" }} />

            <Link to="/dashboard" className="pb-back">
              <ChevronLeftIcon size={13} /> Dashboard
            </Link>
          </div>

          {/* Center — problem picker */}
          <div className="pb-center">
            <button className="pb-nav-btn" onClick={goToPrev} disabled={currentIndex <= 0}
              title="Previous problem">
              <ChevronLeftIcon size={13} />
            </button>

            <select
              className="pb-problem-select"
              value={currentProblemId}
              onChange={e => handleProblemChange(e.target.value)}
            >
              {allProblems.map((p, i) => (
                <option key={p.id} value={p.id}>
                  {i + 1}. {p.title}
                </option>
              ))}
            </select>

            <span className={`diff-pill ${getDiffClass(currentProblem.difficulty)}`}>
              {currentProblem.difficulty}
            </span>

            <button className="pb-nav-btn" onClick={goToNext}
              disabled={currentIndex >= allProblems.length - 1}
              title="Next problem">
              <ChevronRightIcon size={13} />
            </button>
          </div>

          {/* Right */}
          <div className="pb-right">
            {/* Language badge */}
            <div className="lang-badge">
              <div className="lang-dot" style={{ background: getLangDot(selectedLanguage) }} />
              {selectedLanguage}
            </div>

            {statusChip()}

            <button
              className="pb-run-btn"
              onClick={handleRunCode}
              disabled={isRunning}
            >
              {isRunning
                ? <><div className="spin-ring" style={{ borderTopColor:"#07070C", borderColor:"rgba(0,0,0,0.2)" }} />Running</>
                : <><PlayIcon size={13} />Run Code</>
              }
            </button>

            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* ── PANELS ── */}
        <div className="pb-panels">
          <PanelGroup direction="horizontal" style={{ height:"100%" }}>

            {/* LEFT — Problem Description */}
            <Panel defaultSize={40} minSize={25}>
              <div className="panel-wrap">
                <div className="panel-labelbar">
                  <LayoutPanelLeftIcon size={13} />
                  Problem
                  <span style={{ marginLeft:"auto", fontSize:"0.65rem", color:"var(--text-dim)", fontWeight:500, textTransform:"none", letterSpacing:0 }}>
                    {currentIndex + 1} / {allProblems.length}
                  </span>
                </div>
                <div className="panel-content">
                  <ProblemDescription
                    problem={currentProblem}
                    currentProblemId={currentProblemId}
                    onProblemChange={handleProblemChange}
                    allProblems={allProblems}
                  />
                </div>
              </div>
            </Panel>

            <PanelResizeHandle className="pb-divider-col" />

            {/* RIGHT — Editor + Output */}
            <Panel defaultSize={60} minSize={30}>
              <PanelGroup direction="vertical" style={{ height:"100%" }}>

                {/* Editor */}
                <Panel defaultSize={68} minSize={30}>
                  <div className="panel-wrap">
                    <div className="panel-labelbar">
                      <Code2Icon size={13} />
                      Code Editor
                      <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:"0.5rem" }}>
                        <select
                          style={{
                            background:"var(--card2)", border:"1px solid var(--border)",
                            borderRadius:7, color:"var(--text-sub)",
                            fontFamily:"'Plus Jakarta Sans',sans-serif",
                            fontSize:"0.68rem", fontWeight:600, padding:"0.18rem 1.6rem 0.18rem 0.55rem",
                            outline:"none", cursor:"pointer",
                            appearance:"none",
                            backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                            backgroundRepeat:"no-repeat",
                            backgroundPosition:"right 0.4rem center",
                          }}
                          value={selectedLanguage}
                          onChange={handleLanguageChange}
                        >
                          {Object.keys(currentProblem.starterCode).map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="panel-content">
                      <CodeEditorPanel
                        selectedLanguage={selectedLanguage}
                        code={code}
                        isRunning={isRunning}
                        onLanguageChange={handleLanguageChange}
                        onCodeChange={setCode}
                        onRunCode={handleRunCode}
                      />
                    </div>
                  </div>
                </Panel>

                <PanelResizeHandle className="pb-divider-row" />

                {/* Output */}
                <Panel defaultSize={32} minSize={20}>
                  <div className="panel-wrap">
                    <div className="panel-labelbar">
                      <TerminalIcon size={13} />
                      Output
                      {runStatus === "passed" && (
                        <span style={{
                          marginLeft:"0.5rem", fontSize:"0.62rem", fontWeight:700,
                          color:"var(--green)", background:"var(--green-dim)",
                          border:"1px solid rgba(62,207,142,0.2)",
                          padding:"0.1rem 0.5rem", borderRadius:"100px",
                          textTransform:"none", letterSpacing:0,
                        }}>
                          Accepted
                        </span>
                      )}
                      {runStatus === "failed" && (
                        <span style={{
                          marginLeft:"0.5rem", fontSize:"0.62rem", fontWeight:700,
                          color:"var(--red)", background:"var(--red-dim)",
                          border:"1px solid rgba(248,113,113,0.2)",
                          padding:"0.1rem 0.5rem", borderRadius:"100px",
                          textTransform:"none", letterSpacing:0,
                        }}>
                          Wrong Answer
                        </span>
                      )}
                      {isRunning && (
                        <span style={{ marginLeft:"0.5rem" }}>
                          <div className="spin-ring" />
                        </span>
                      )}
                    </div>
                    <div className="panel-content">
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

export default ProblemPage;