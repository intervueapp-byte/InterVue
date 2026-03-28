import { Link } from "react-router-dom";
import { useState } from "react";
import {
  SparklesIcon, ChevronRightIcon, MailIcon, MessageSquareIcon,
  SendIcon, CheckCircle2Icon, GithubIcon, LinkedinIcon,
  ZapIcon, HeadphonesIcon, ShieldCheckIcon, ClockIcon,
} from "lucide-react";
import { BASE_CSS } from "./sharedStyles";
import { SignInButton } from "@clerk/clerk-react";

const EXTRA_CSS = `
  /* ── CONTACT LAYOUT ── */
  .contact-layout {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 2.5rem;
    align-items: start;
  }

  /* ── FORM CARD ── */
  .form-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(0,0,0,0.4);
  }

  .form-card-header {
    background: linear-gradient(135deg, #12101E, #1A1630);
    border-bottom: 1px solid var(--border);
    padding: 2rem 2.25rem 1.75rem;
    position: relative; overflow: hidden;
  }
  .form-card-header::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .form-card-glow {
    position: absolute; top: -80px; right: -60px;
    width: 250px; height: 250px;
    background: radial-gradient(circle, rgba(200,164,90,0.07), transparent 70%);
    pointer-events: none;
  }
  .form-card-title {
    font-family: 'Fraunces', serif;
    font-weight: 800; font-size: 1.3rem; letter-spacing: -0.02em;
    margin-bottom: 0.4rem; position: relative;
  }
  .form-card-sub {
    font-size: 0.83rem; color: var(--text-sub); font-weight: 400;
    position: relative; line-height: 1.6;
  }

  .form-body {
    padding: 2rem 2.25rem 2.25rem;
    display: flex; flex-direction: column; gap: 1.25rem;
  }

  /* Row with 2 inputs side by side */
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .field-group { display: flex; flex-direction: column; gap: 0.5rem; }

  .field-label {
    font-size: 0.73rem; font-weight: 700; letter-spacing: 0.06em;
    text-transform: uppercase; color: var(--text-sub);
  }

  .field-input {
    width: 100%; padding: 0.85rem 1rem;
    background: var(--card2); border: 1px solid var(--border);
    border-radius: 11px; color: var(--text);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.88rem; font-weight: 400;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    resize: none;
  }
  .field-input::placeholder { color: var(--text-dim); }
  .field-input:focus {
    border-color: rgba(200,164,90,0.4);
    box-shadow: 0 0 0 3px rgba(200,164,90,0.08);
  }
  textarea.field-input { min-height: 130px; line-height: 1.65; }

  /* Subject select */
  .subject-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.55rem;
  }
  .subject-opt {
    padding: 0.65rem 0.5rem; text-align: center;
    background: var(--card2); border: 1.5px solid var(--border);
    border-radius: 10px; cursor: pointer;
    font-size: 0.75rem; font-weight: 600; color: var(--text-sub);
    transition: all 0.18s; user-select: none;
  }
  .subject-opt:hover { border-color: var(--border-h); color: var(--text); }
  .subject-opt.selected {
    background: var(--gold-dim);
    border-color: rgba(200,164,90,0.4);
    color: var(--gold-lt);
  }

  /* Submit button */
  .submit-btn {
    width: 100%; padding: 0.95rem;
    background: linear-gradient(135deg, var(--gold-lt), var(--gold));
    color: #07070C;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 800; font-size: 0.92rem; letter-spacing: 0.02em;
    border: none; border-radius: 12px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 0.55rem;
    box-shadow: 0 4px 22px rgba(200,164,90,0.3);
    transition: all 0.25s;
  }
  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(200,164,90,0.45);
  }
  .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

  /* ── SUCCESS STATE ── */
  .success-state {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; text-align: center;
    padding: 3.5rem 2.25rem;
    gap: 1rem;
  }
  .success-icon {
    width: 64px; height: 64px; border-radius: 50%;
    background: var(--green-dim); border: 1px solid rgba(62,207,142,0.25);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 0.5rem;
    animation: pop 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  @keyframes pop { from{transform:scale(0.7);opacity:0}to{transform:scale(1);opacity:1} }
  .success-title {
    font-family: 'Fraunces', serif; font-weight: 800; font-size: 1.3rem;
    letter-spacing: -0.02em; color: var(--text);
  }
  .success-sub { font-size: 0.88rem; color: var(--text-sub); max-width: 300px; line-height: 1.7; }
  .success-back {
    margin-top: 0.5rem;
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.6rem 1.4rem;
    background: var(--gold-dim); color: var(--gold-lt);
    border: 1px solid rgba(200,164,90,0.22); border-radius: 9px;
    font-size: 0.82rem; font-weight: 700; cursor: pointer;
    transition: all 0.2s; font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .success-back:hover { background: rgba(200,164,90,0.18); }

  /* ── RIGHT COLUMN ── */
  .contact-right { display: flex; flex-direction: column; gap: 1.25rem; }

  /* Info card */
  .info-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 2rem 2rem;
    transition: border-color 0.25s;
  }
  .info-card:hover { border-color: var(--border-h); }

  .info-card-title {
    font-family: 'Fraunces', serif;
    font-weight: 700; font-size: 1rem; letter-spacing: -0.01em;
    margin-bottom: 1.25rem;
    display: flex; align-items: center; gap: 0.6rem;
  }

  .contact-item {
    display: flex; align-items: flex-start; gap: 0.9rem;
    padding: 0.85rem 0;
    border-bottom: 1px solid var(--border);
  }
  .contact-item:last-child { border-bottom: none; padding-bottom: 0; }
  .contact-item-icon {
    width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: var(--gold-dim); border: 1px solid rgba(200,164,90,0.18);
  }
  .contact-item-label { font-size: 0.72rem; color: var(--text-sub); font-weight: 500; margin-bottom: 0.2rem; letter-spacing: 0.04em; text-transform: uppercase; }
  .contact-item-value { font-size: 0.875rem; font-weight: 600; color: var(--text); }
  .contact-item-value a { color: var(--gold); text-decoration: none; transition: color 0.2s; }
  .contact-item-value a:hover { color: var(--gold-lt); }

  /* Social links */
  .social-row { display: flex; gap: 0.75rem; margin-top: 0.25rem; }
  .social-btn {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.65rem 1.1rem;
    background: var(--card2); border: 1px solid var(--border);
    border-radius: 10px; cursor: pointer;
    font-size: 0.78rem; font-weight: 600; color: var(--text-sub);
    text-decoration: none; transition: all 0.2s; flex: 1; justify-content: center;
  }
  .social-btn:hover { border-color: var(--border-h); color: var(--text); background: #131320; }

  /* FAQ mini */
  .faq-item {
    padding: 1rem 0;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
  }
  .faq-item:last-child { border-bottom: none; padding-bottom: 0; }
  .faq-q { font-size: 0.82rem; font-weight: 600; color: var(--text); margin-bottom: 0.35rem; }
  .faq-a { font-size: 0.78rem; font-weight: 300; color: var(--text-sub); line-height: 1.65; }

  /* Response time card */
  .response-strip {
    display: flex; align-items: center; gap: 1rem;
    background: var(--card);
    border: 1px solid rgba(62,207,142,0.15);
    border-radius: 14px;
    padding: 1.1rem 1.4rem;
  }
  .response-dot {
    width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0;
    background: var(--green); box-shadow: 0 0 10px var(--green);
    animation: rpulse 2.5s infinite;
  }
  @keyframes rpulse { 0%,100%{opacity:1}50%{opacity:0.45} }
  .response-text { font-size: 0.8rem; font-weight: 500; color: var(--text); }
  .response-sub  { font-size: 0.72rem; color: var(--text-sub); margin-top: 1px; }

  @media(max-width:960px) {
    .contact-layout { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .subject-grid { grid-template-columns: repeat(2,1fr); }
  }
  @media(max-width:480px) {
    .form-body { padding: 1.5rem; }
    .form-card-header { padding: 1.5rem; }
    .subject-grid { grid-template-columns: 1fr 1fr; }
  }
`;

const SUBJECTS = ["General", "Bug Report", "Feature Request", "Interview Help", "Account", "Other"];

export default function ContactPage() {
  const [form, setForm]       = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [errors, setErrors]   = useState({});

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject)        e.subject = "Please choose a subject";
    if (!form.message.trim()) e.message = "Message cannot be empty";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSending(true);
    // Simulated send (replace with real API call / EmailJS / Formspree)
    await new Promise(r => setTimeout(r, 1800));
    setSending(false);
    setSent(true);
  };

  return (
    <>
      <style>{BASE_CSS + EXTRA_CSS}</style>

      {/* NAV */}
      <nav className="iv-nav">
        <Link to="/" className="iv-logo">
          <div className="iv-logo-gem">
            <SparklesIcon size={18} color="#07070C" strokeWidth={2.5} />
          </div>
          <span className="iv-logo-name">Inter<span>Vue</span></span>
        </Link>
        <div className="iv-nav-links">
          <Link to="/"        className="iv-nav-link">Home</Link>
          <Link to="/privacy" className="iv-nav-link">Privacy</Link>
          <Link to="/terms"   className="iv-nav-link">Terms</Link>
        </div>
        <SignInButton mode="modal">
          <button className="iv-nav-btn">Get Started <ChevronRightIcon size={13} /></button>
        </SignInButton>
      </nav>

      {/* HERO */}
      <div className="page-hero au au1">
        <div className="page-hero-grid" />
        <div className="page-hero-eyebrow"><MessageSquareIcon size={12} /> Get in Touch</div>
        <h1 className="page-hero-title">We'd love to <em>hear from you.</em></h1>
        <p className="page-hero-sub">
          Have a question, found a bug, or just want to say hi? Fill out the form and
          we'll get back to you as soon as possible.
        </p>
      </div>

      {/* CONTENT */}
      <div className="iv-container-wide">
        <div className="contact-layout au au2">

          {/* LEFT — FORM */}
          <div className="form-card">
            {sent ? (
              <div className="success-state">
                <div className="success-icon">
                  <CheckCircle2Icon size={30} color="var(--green)" />
                </div>
                <div className="success-title">Message sent!</div>
                <p className="success-sub">
                  Thanks for reaching out. We'll reply to <strong style={{ color:"var(--text)" }}>{form.email}</strong> within 1–2 business days.
                </p>
                <button className="success-back" onClick={() => { setSent(false); setForm({ name:"", email:"", subject:"", message:"" }); }}>
                  <MailIcon size={13} /> Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="form-card-header">
                  <div className="form-card-glow" />
                  <div className="form-card-title">Send us a message</div>
                  <div className="form-card-sub">All fields marked are required. We read every message.</div>
                </div>

                <div className="form-body">
                  {/* Name + Email */}
                  <div className="form-row">
                    <div className="field-group">
                      <label className="field-label">Your name *</label>
                      <input
                        className="field-input"
                        placeholder="Aryan Kumar"
                        value={form.name}
                        onChange={e => update("name", e.target.value)}
                        style={errors.name ? { borderColor: "var(--red)" } : {}}
                      />
                      {errors.name && <span style={{ fontSize:"0.7rem", color:"var(--red)" }}>{errors.name}</span>}
                    </div>
                    <div className="field-group">
                      <label className="field-label">Email address *</label>
                      <input
                        className="field-input"
                        type="email"
                        placeholder="aryan@example.com"
                        value={form.email}
                        onChange={e => update("email", e.target.value)}
                        style={errors.email ? { borderColor:"var(--red)" } : {}}
                      />
                      {errors.email && <span style={{ fontSize:"0.7rem", color:"var(--red)" }}>{errors.email}</span>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="field-group">
                    <label className="field-label">Subject *</label>
                    <div className="subject-grid">
                      {SUBJECTS.map(s => (
                        <div
                          key={s}
                          className={`subject-opt ${form.subject === s ? "selected" : ""}`}
                          onClick={() => update("subject", s)}
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                    {errors.subject && <span style={{ fontSize:"0.7rem", color:"var(--red)", marginTop:"0.25rem" }}>{errors.subject}</span>}
                  </div>

                  {/* Message */}
                  <div className="field-group">
                    <label className="field-label">Message *</label>
                    <textarea
                      className="field-input"
                      placeholder="Describe your question or issue in detail. The more context you provide, the faster we can help."
                      value={form.message}
                      onChange={e => update("message", e.target.value)}
                      style={errors.message ? { borderColor:"var(--red)" } : {}}
                    />
                    {errors.message && <span style={{ fontSize:"0.7rem", color:"var(--red)" }}>{errors.message}</span>}
                    <span style={{ fontSize:"0.7rem", color:"var(--text-dim)", textAlign:"right" }}>
                      {form.message.length} / 1000 characters
                    </span>
                  </div>

                  {/* Submit */}
                  <button className="submit-btn" onClick={handleSubmit} disabled={sending}>
                    {sending
                      ? <><span style={{ width:16, height:16, border:"2px solid rgba(0,0,0,0.3)", borderTopColor:"#07070C", borderRadius:"50%", animation:"spin 0.8s linear infinite", display:"inline-block" }} />Sending…</>
                      : <><SendIcon size={15} />Send Message</>
                    }
                  </button>
                </div>
              </>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="contact-right">

            {/* Response time */}
            <div className="response-strip">
              <div className="response-dot" />
              <div>
                <div className="response-text">Typically replies within 24 hours</div>
                <div className="response-sub">Mon – Fri, 9am – 6pm IST</div>
              </div>
            </div>

            {/* Contact info */}
            <div className="info-card">
              <div className="info-card-title">
                <HeadphonesIcon size={16} color="var(--gold)" /> Contact Info
              </div>
              <div className="contact-item">
                <div className="contact-item-icon"><MailIcon size={16} color="var(--gold)" /></div>
                <div>
                  <div className="contact-item-label">Email</div>
                  <div className="contact-item-value">
                    <a href="mailto:intervueofficial@gmail.com">intervueofficial@gmail.com</a>
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon"><ClockIcon size={16} color="var(--gold)" /></div>
                <div>
                  <div className="contact-item-label">Response time</div>
                  <div className="contact-item-value">1 – 2 business days</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon"><ShieldCheckIcon size={16} color="var(--gold)" /></div>
                <div>
                  <div className="contact-item-label">Security issues</div>
                  <div className="contact-item-value">
                    <a href="mailto:intervueofficial@gmail.com">intervueofficial@gmail.com</a>
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon"><ZapIcon size={16} color="var(--gold)" /></div>
                <div>
                  <div className="contact-item-label">Platform</div>
                  <div className="contact-item-value">intervue.app</div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="info-card">
              <div className="info-card-title">
                <MessageSquareIcon size={16} color="var(--gold)" /> Find us online
              </div>
              <div className="social-row">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                >
                  <GithubIcon size={15} /> GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                >
                  <LinkedinIcon size={15} /> LinkedIn
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="info-card">
              <div className="info-card-title">
                <ZapIcon size={16} color="var(--gold)" /> Quick Answers
              </div>
              {[
                {
                  q: "Is InterVue free to use?",
                  a: "Yes, InterVue is currently completely free. No credit card required."
                },
                {
                  q: "Does a candidate need an account to join?",
                  a: "No — candidates can join any session via a shared link without creating an account."
                },
                {
                  q: "What languages does the editor support?",
                  a: "JavaScript, TypeScript, Python, Java, C++, Go, Rust, and 35+ more via our Monaco editor."
                },
                {
                  q: "How do I report a bug?",
                  a: "Use this form with subject 'Bug Report', or email us directly with reproduction steps."
                },
              ].map(({ q, a }) => (
                <div key={q} className="faq-item">
                  <div className="faq-q">{q}</div>
                  <div className="faq-a">{a}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop:"1px solid var(--border)" }}>
        <div className="iv-footer">
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
            <div className="iv-logo-gem" style={{ width:28, height:28, borderRadius:8 }}>
              <SparklesIcon size={13} color="#07070C" strokeWidth={2.5} />
            </div>
            <span className="iv-footer-copy">© 2025 InterVue · Final Year Project</span>
          </div>
          <div className="iv-footer-links">
            <Link to="/privacy" className="iv-footer-link">Privacy</Link>
            <Link to="/terms"   className="iv-footer-link">Terms</Link>
            <Link to="/contact" className="iv-footer-link">Contact</Link>
          </div>
        </div>
      </footer>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}