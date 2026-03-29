/* ══════════════════════════════════════════════════════════════════
   ProblemDescription.jsx  —  Redesigned for InterVue
   Design: Editorial dark workspace — Linear / Vercel aesthetic
   Typography: Fraunces (display) + Plus Jakarta Sans (body) + JetBrains Mono (code)
══════════════════════════════════════════════════════════════════ */

const descCss = `
  .pd-root {
    height: 100%;
    overflow-y: auto;
    background: transparent;
    scroll-behavior: smooth;
  }
  .pd-root::-webkit-scrollbar { width: 3px; }
  .pd-root::-webkit-scrollbar-track { background: transparent; }
  .pd-root::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }
  .pd-root::-webkit-scrollbar-thumb:hover { background: rgba(200,164,90,0.35); }

  /* ── HEADER ── */
  .pd-header {
    padding: 1.6rem 1.6rem 1.2rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    position: sticky;
    top: 0;
    background: rgba(11,11,20,0.96);
    backdrop-filter: blur(20px);
    z-index: 10;
  }

  .pd-header-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.6rem;
  }

  .pd-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 600;
    color: rgba(200,164,90,0.55);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 0.35rem;
  }

  .pd-title {
    font-family: 'Fraunces', serif;
    font-size: 1.45rem;
    font-weight: 800;
    letter-spacing: -0.025em;
    line-height: 1.2;
    color: #ECEDF4;
  }

  .pd-meta-row {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin-top: 0.75rem;
    flex-wrap: wrap;
  }

  /* difficulty chip */
  .pd-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.32rem;
    padding: 0.2rem 0.65rem;
    border-radius: 100px;
    font-size: 0.62rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    border: 1px solid;
  }
  .pd-chip::before {
    content: '';
    width: 5px; height: 5px; border-radius: 50%;
    background: currentColor;
    opacity: 0.7;
  }
  .pd-chip.easy   { background: rgba(62,207,142,0.09); color: #3ECF8E; border-color: rgba(62,207,142,0.22); }
  .pd-chip.medium { background: rgba(251,191,36,0.09); color: #FBBF24; border-color: rgba(251,191,36,0.22); }
  .pd-chip.hard   { background: rgba(248,113,113,0.09); color: #F87171; border-color: rgba(248,113,113,0.22); }

  .pd-category {
    font-size: 0.68rem;
    font-weight: 500;
    color: rgba(100,116,139,0.8);
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 6px;
    padding: 0.18rem 0.55rem;
  }

  /* ── BODY ── */
  .pd-body {
    padding: 1.5rem 1.6rem 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* ── SECTION ── */
  .pd-section {
    padding: 1.4rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    animation: fadeSlideIn 0.35s ease both;
  }
  .pd-section:last-child { border-bottom: none; }

  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .pd-section-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.9rem;
  }
  .pd-label-text {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(200,164,90,0.65);
  }
  .pd-label-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(200,164,90,0.15), transparent);
  }

  /* ── DESCRIPTION TEXT ── */
  .pd-desc-text {
    font-size: 0.88rem;
    line-height: 1.8;
    color: rgba(236,237,244,0.75);
    font-weight: 400;
  }
  .pd-desc-text + .pd-desc-text { margin-top: 0.65rem; }
  .pd-desc-note {
    margin-top: 0.65rem;
    font-size: 0.85rem;
    line-height: 1.75;
    color: rgba(100,116,139,0.85);
  }

  /* ── EXAMPLE CARDS ── */
  .pd-example {
    background: rgba(255,255,255,0.018);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 0.75rem;
    transition: border-color 0.2s;
  }
  .pd-example:last-child { margin-bottom: 0; }
  .pd-example:hover { border-color: rgba(255,255,255,0.1); }

  .pd-example-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 0.85rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    background: rgba(255,255,255,0.015);
  }
  .pd-example-badge {
    width: 18px; height: 18px;
    border-radius: 5px;
    background: rgba(200,164,90,0.12);
    border: 1px solid rgba(200,164,90,0.2);
    display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.58rem;
    font-weight: 700;
    color: rgba(200,164,90,0.8);
  }
  .pd-example-title {
    font-size: 0.68rem;
    font-weight: 600;
    color: rgba(236,237,244,0.5);
    letter-spacing: 0.04em;
  }

  .pd-example-body {
    padding: 0.85rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .pd-io-row {
    display: flex;
    align-items: baseline;
    gap: 0.55rem;
  }
  .pd-io-key {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 600;
    min-width: 56px;
    flex-shrink: 0;
    padding: 0.18rem 0.45rem;
    border-radius: 4px;
    text-align: center;
  }
  .pd-io-key.input  { background: rgba(91,143,249,0.1); color: #7BAAF7; border: 1px solid rgba(91,143,249,0.18); }
  .pd-io-key.output { background: rgba(62,207,142,0.09); color: #56DFA0; border: 1px solid rgba(62,207,142,0.18); }

  .pd-io-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.82rem;
    color: rgba(236,237,244,0.88);
    line-height: 1.5;
    word-break: break-word;
  }

  .pd-explanation {
    margin-top: 0.45rem;
    padding-top: 0.6rem;
    border-top: 1px solid rgba(255,255,255,0.04);
    font-size: 0.78rem;
    color: rgba(100,116,139,0.9);
    line-height: 1.6;
  }
  .pd-explanation strong {
    color: rgba(236,237,244,0.45);
    font-weight: 600;
  }

  /* ── CONSTRAINTS ── */
  .pd-constraints-list {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }
  .pd-constraint-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.45rem 0.75rem;
    background: rgba(255,255,255,0.015);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 8px;
    transition: border-color 0.18s, background 0.18s;
  }
  .pd-constraint-item:hover {
    border-color: rgba(255,255,255,0.09);
    background: rgba(255,255,255,0.025);
  }
  .pd-constraint-dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: rgba(200,164,90,0.5);
    flex-shrink: 0;
  }
  .pd-constraint-code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
    color: rgba(236,237,244,0.72);
    line-height: 1.4;
  }

  /* ═══════════════════════════════════════════════════
   REFINEMENT PASS — spacing + hierarchy + calm
═══════════════════════════════════════════════════ */

/* 1. Sticky header — cleaner background, more breathing room */
.pd-header {
  background: #0C0C18;
  backdrop-filter: none;
  padding: 1.75rem 1.75rem 1.25rem;
  border-bottom-color: rgba(255,255,255,0.05);
}

/* 2. Problem number — slightly bolder signal */
.pd-num {
  font-size: 0.6rem;
  color: rgba(200,164,90,0.4);
  margin-bottom: 0.4rem;
}

/* 3. Title — more weight, better size */
.pd-title {
  font-size: 1.5rem;
  letter-spacing: -0.03em;
  line-height: 1.18;
  color: #F0F1F7;
}

/* 4. Body — more generous spacing */
.pd-body {
  padding: 0.5rem 1.75rem 3rem;
}

/* 5. Sections — more air between them */
.pd-section {
  padding: 1.75rem 0;
  border-bottom-color: rgba(255,255,255,0.04);
  animation: none; /* remove animation jitter on tab switch */
}

/* 6. Section labels — quieter, cleaner */
.pd-label-text {
  font-size: 0.58rem;
  color: rgba(200,164,90,0.45);
  letter-spacing: 0.12em;
}
.pd-label-line {
  background: linear-gradient(90deg, rgba(255,255,255,0.05), transparent);
}

/* 7. Description text — slightly more readable */
.pd-desc-text {
  font-size: 0.875rem;
  line-height: 1.85;
  color: rgba(236,237,244,0.68);
}
.pd-desc-note {
  margin-top: 0.85rem;
  font-size: 0.84rem;
  line-height: 1.8;
  color: rgba(100,116,139,0.7);
}

/* 8. Example cards — remove hover lift, simpler border */
.pd-example {
  background: rgba(255,255,255,0.016);
  border-color: rgba(255,255,255,0.06);
  border-radius: 10px;
  margin-bottom: 0.65rem;
}
.pd-example:hover {
  border-color: rgba(255,255,255,0.09);
  transform: none; /* no lift */
}

/* Example header — quieter */
.pd-example-header {
  background: rgba(255,255,255,0.012);
  border-bottom-color: rgba(255,255,255,0.04);
  padding: 0.5rem 0.9rem;
}
.pd-example-badge {
  background: transparent;
  border-color: rgba(200,164,90,0.15);
  color: rgba(200,164,90,0.55);
}
.pd-example-title {
  color: rgba(236,237,244,0.3);
  font-size: 0.65rem;
}

/* 9. IO rows — tighter, cleaner keys */
.pd-example-body { padding: 0.9rem; gap: 0.55rem; }

.pd-io-key {
  font-size: 0.62rem; padding: 0.14rem 0.4rem;
  border-radius: 4px; min-width: 52px;
}
.pd-io-key.input  { background: rgba(91,143,249,0.07); color: rgba(123,170,247,0.8); border-color: rgba(91,143,249,0.12); }
.pd-io-key.output { background: rgba(62,207,142,0.06); color: rgba(86,223,160,0.8); border-color: rgba(62,207,142,0.12); }

.pd-io-val { font-size: 0.8rem; color: rgba(236,237,244,0.78); }

/* 10. Explanation — slightly smaller, more muted */
.pd-explanation {
  font-size: 0.76rem;
  color: rgba(100,116,139,0.75);
  padding-top: 0.65rem;
  margin-top: 0.5rem;
}
.pd-explanation strong { color: rgba(236,237,244,0.3); }

/* 11. Constraints — flatter items */
.pd-constraint-item {
  background: transparent;
  border-color: rgba(255,255,255,0.05);
  border-radius: 7px;
  padding: 0.42rem 0.7rem;
}
.pd-constraint-item:hover {
  background: rgba(255,255,255,0.018);
  border-color: rgba(255,255,255,0.08);
}
.pd-constraint-dot { background: rgba(200,164,90,0.35); }
.pd-constraint-code { font-size: 0.76rem; color: rgba(236,237,244,0.6); }

/* 12. Difficulty chip — flatter */
.pd-chip {
  font-size: 0.58rem; letter-spacing: 0.1em;
  padding: 0.16rem 0.6rem;
}
.pd-chip::before { width: 4px; height: 4px; }
.pd-chip.easy   { background: transparent; border-color: rgba(62,207,142,0.25); }
.pd-chip.medium { background: transparent; border-color: rgba(251,191,36,0.25); }
.pd-chip.hard   { background: transparent; border-color: rgba(248,113,113,0.25); }

/* ═══════════════════════════════════════
   FINAL POLISH — readability perfection
═══════════════════════════════════════ */

/* 1. SECTION SEPARATION — subtle depth */
.pd-section {
  position: relative;
}

/* add subtle divider spacing */
.pd-section:not(:last-child)::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255,255,255,0.03);
}

/* 2. TITLE — make it feel premium */
.pd-title {
  font-weight: 800;
  color: #F5F6FB;
}

/* 3. DESCRIPTION TEXT — slightly softer */
.pd-desc-text {
  color: rgba(236,237,244,0.72);
}

/* 4. EXAMPLE CARDS — refined */
.pd-example {
  transition: border-color 0.15s;
}

.pd-example:hover {
  border-color: rgba(255,255,255,0.12);
}

/* 5. CONSTRAINTS — better spacing */
.pd-constraint-item {
  margin-bottom: 0.35rem;
}

/* 6. IMPROVE SCANNING */
.pd-label {
  margin-bottom: 0.4rem;
}

/* 7. REDUCE VISUAL FATIGUE */
.pd-body {
  max-width: 680px;
}
`;

function DiffChip({ difficulty = "" }) {
  const cls = difficulty.toLowerCase();
  return (
    <span className={`pd-chip ${cls}`}>
      {difficulty}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="pd-section-label">
      <span className="pd-label-text">{children}</span>
      <span className="pd-label-line" />
    </div>
  );
}

function ExampleCard({ example, index }) {
  return (
    <div className="pd-example">
      <div className="pd-example-header">
        <div className="pd-example-badge">{index + 1}</div>
        <span className="pd-example-title">Example {index + 1}</span>
      </div>
      <div className="pd-example-body">
        <div className="pd-io-row">
          <span className="pd-io-key input">Input</span>
          <span className="pd-io-val">{example.input}</span>
        </div>
        <div className="pd-io-row">
          <span className="pd-io-key output">Output</span>
          <span className="pd-io-val">{example.output}</span>
        </div>
        {example.explanation && (
          <div className="pd-explanation">
            <strong>Explanation: </strong>{example.explanation}
          </div>
        )}
      </div>
    </div>
  );
}

function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
  const idx = allProblems.findIndex(p => p.id === currentProblemId);

  return (
    <>
      <style>{descCss}</style>
      <div className="pd-root">

        {/* ── STICKY HEADER ── */}
        <div className="pd-header">
          <div className="pd-header-top">
            <div>
              <div className="pd-num">Problem {String(idx + 1).padStart(2, "0")}</div>
              <h1 className="pd-title">{problem.title}</h1>
            </div>
            <DiffChip difficulty={problem.difficulty} />
          </div>

          <div className="pd-meta-row">
            {problem.category && (
              <span className="pd-category">{problem.category}</span>
            )}
          </div>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div className="pd-body">

          {/* Description */}
          <div className="pd-section">
            <SectionLabel>Description</SectionLabel>
            <p className="pd-desc-text">{problem.description.text}</p>
            {problem.description.notes?.map((note, i) => (
              <p key={i} className="pd-desc-note">{note}</p>
            ))}
          </div>

          {/* Examples */}
          {problem.examples?.length > 0 && (
            <div className="pd-section">
              <SectionLabel>Examples</SectionLabel>
              {problem.examples.map((ex, i) => (
                <ExampleCard key={i} example={ex} index={i} />
              ))}
            </div>
          )}

          {/* Constraints */}
          {problem.constraints?.length > 0 && (
            <div className="pd-section">
              <SectionLabel>Constraints</SectionLabel>
              <div className="pd-constraints-list">
                {problem.constraints.map((c, i) => (
                  <div key={i} className="pd-constraint-item">
                    <span className="pd-constraint-dot" />
                    <code className="pd-constraint-code">{c}</code>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default ProblemDescription;