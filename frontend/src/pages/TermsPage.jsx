import { Link } from "react-router-dom";
import {
  SparklesIcon,
  ScrollTextIcon,
  ChevronRightIcon,
  ShieldAlertIcon,
  UserCheckIcon,
  VideoIcon,
  BanIcon,
  TriangleAlertIcon,
  LogOutIcon,
  RefreshCwIcon,
  ScaleIcon,
  CheckCircle2Icon,
} from "lucide-react";
import { BASE_CSS } from "./sharedStyles";
import { SignInButton } from "@clerk/clerk-react";

const EXTRA_CSS = `
  .terms-layout {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 2rem;
    align-items: start;
  }
  .terms-toc {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.75rem 2rem;
    position: sticky;
    top: 84px;
  }
  .toc-title {
    font-family: 'Fraunces', serif;
    font-weight: 700; font-size: 0.88rem;
    color: var(--text); margin-bottom: 1rem;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .toc-link {
    display: flex; align-items: center; gap: 0.5rem;
    font-size: 0.8rem; font-weight: 500; color: var(--text-sub);
    text-decoration: none; padding: 0.38rem 0;
    border-bottom: 1px solid var(--border);
    transition: color 0.2s;
  }
  .toc-link:last-child { border-bottom: none; }
  .toc-link:hover { color: var(--gold); }

  .terms-main { min-width: 0; }

  .warning-box {
    background: rgba(248,113,113,0.05);
    border: 1px solid rgba(248,113,113,0.18);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    margin-top: 1rem;
    font-size: 0.88rem; color: var(--text-sub); line-height: 1.7;
  }
  .warning-box strong { color: var(--red) !important; }

  .ok-box {
    background: rgba(62,207,142,0.05);
    border: 1px solid rgba(62,207,142,0.18);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    margin-top: 1rem;
    font-size: 0.88rem; color: var(--text-sub); line-height: 1.7;
  }
  .ok-box strong { color: var(--green) !important; }

  .highlight-box {
    background: rgba(200,164,90,0.05);
    border: 1px solid rgba(200,164,90,0.18);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    margin-top: 1rem;
    font-size: 0.88rem; color: var(--text-sub); line-height: 1.7;
  }
  .highlight-box strong { color: var(--gold-lt) !important; }

  .two-col-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem 1.5rem;
    margin-top: 0.75rem;
  }
  .two-col-list li {
    display: flex; align-items: flex-start; gap: 0.6rem;
    font-size: 0.88rem; font-weight: 300; color: var(--text-sub); line-height: 1.65;
    list-style: none;
  }
  .two-col-list li::before {
    content: '';
    display: block; flex-shrink: 0;
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--gold); margin-top: 0.52rem;
    box-shadow: 0 0 5px rgba(200,164,90,0.4);
  }
  .two-col-list li strong { color: var(--text); font-weight: 600; }

  @media(max-width:900px) {
    .terms-layout { grid-template-columns: 1fr; }
    .terms-toc { position: static; }
    .two-col-list { grid-template-columns: 1fr; }
  }
`;

const sections = [
  {
    id: "acceptance",
    label: "Acceptance of Terms",
    icon: <CheckCircle2Icon size={12} />,
  },
  {
    id: "who-can-use",
    label: "Who Can Use InterVue",
    icon: <UserCheckIcon size={12} />,
  },
  {
    id: "responsibilities",
    label: "User Responsibilities",
    icon: <ShieldAlertIcon size={12} />,
  },
  {
    id: "allowed",
    label: "Allowed Usage",
    icon: <CheckCircle2Icon size={12} />,
  },
  { id: "prohibited", label: "Prohibited Usage", icon: <BanIcon size={12} /> },
  {
    id: "accounts",
    label: "Accounts & Auth",
    icon: <UserCheckIcon size={12} />,
  },
  { id: "sessions", label: "Session Rules", icon: <VideoIcon size={12} /> },
  { id: "ip", label: "Intellectual Property", icon: <ScaleIcon size={12} /> },
  {
    id: "liability",
    label: "Limitation of Liability",
    icon: <TriangleAlertIcon size={12} />,
  },
  { id: "termination", label: "Termination", icon: <LogOutIcon size={12} /> },
  {
    id: "changes",
    label: "Changes to Terms",
    icon: <RefreshCwIcon size={12} />,
  },
];

export default function TermsPage() {
  return (
    <>
      <style>{BASE_CSS + EXTRA_CSS}</style>

      {/* NAV */}
      <nav className="iv-nav">
        <Link to="/" className="iv-logo">
          <div className="iv-logo-gem">
            <SparklesIcon size={18} color="#07070C" strokeWidth={2.5} />
          </div>
          <span className="iv-logo-name">
            Inter<span>Vue</span>
          </span>
        </Link>
        <div className="iv-nav-links">
          <Link to="/" className="iv-nav-link">
            Home
          </Link>
          <Link to="/privacy" className="iv-nav-link">
            Privacy
          </Link>
          <Link to="/contact" className="iv-nav-link">
            Contact
          </Link>
        </div>
        <SignInButton mode="modal">
          <button className="iv-nav-btn">
            Get Started <ChevronRightIcon size={13} />
          </button>
        </SignInButton>
      </nav>

      {/* HERO */}
      <div className="page-hero au au1">
        <div className="page-hero-grid" />
        <div className="page-hero-eyebrow">
          <ScrollTextIcon size={12} /> Terms of Service
        </div>
        <h1 className="page-hero-title">
          Clear rules, <em>fair play.</em>
        </h1>
        <p className="page-hero-sub">
          These terms govern your use of InterVue. Please read them carefully.
          By using the platform you agree to be bound by these terms.
        </p>
      </div>

      {/* CONTENT */}
      <div className="iv-container-wide">
        <div className="terms-layout au au2">
          {/* TOC */}
          <aside>
            <div className="terms-toc">
              <div className="toc-title">
                <ScrollTextIcon size={14} color="var(--gold)" /> Contents
              </div>
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="toc-link">
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </aside>

          {/* Main */}
          <div className="terms-main">
            <div className="last-updated">
              Last updated: <span>January 15, 2025</span>
            </div>

            {/* 1 */}
            <div id="acceptance" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">1</div>
                Acceptance of Terms
              </div>
              <div className="section-body">
                <p>
                  By accessing or using InterVue ("the Service", "the
                  Platform"), you confirm that you have read, understood, and
                  agree to be bound by these Terms of Service ("Terms") and our
                  <Link
                    to="/privacy"
                    style={{ color: "var(--gold)", textDecoration: "none" }}
                  >
                    {" "}
                    Privacy Policy
                  </Link>
                  , which is incorporated by reference.
                </p>
                <p>
                  If you are using InterVue on behalf of an organisation, you
                  represent that you have the authority to bind that
                  organisation to these Terms.
                </p>
                <p>
                  If you do not agree to these Terms, please discontinue use of
                  the Service immediately. These Terms constitute a legally
                  binding agreement between you and InterVue.
                </p>
                <div className="highlight-box">
                  <p>
                    ⚡ <strong>TL;DR:</strong> Use InterVue for legitimate
                    technical interviews and practice. Treat other users with
                    respect. Don't abuse the platform.
                  </p>
                </div>
              </div>
            </div>

            {/* 2 */}
            <div id="who-can-use" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">2</div>
                Who Can Use InterVue
              </div>
              <div className="section-body">
                <p>
                  You may use InterVue if you meet all of the following
                  criteria:
                </p>
                <ul className="iv-list">
                  <li>
                    You are at least 13 years of age (or the minimum age in your
                    jurisdiction for digital services).
                  </li>
                  <li>
                    You have the legal capacity to enter into a binding
                    agreement.
                  </li>
                  <li>
                    You are not prohibited from using the Service under
                    applicable law.
                  </li>
                  <li>
                    You have not previously been suspended or removed from
                    InterVue.
                  </li>
                </ul>
                <p style={{ marginTop: "1rem" }}>
                  InterVue is intended for use by software engineers, hiring
                  teams, students, and anyone engaged in technical skill
                  development or assessment.
                </p>
              </div>
            </div>

            {/* 3 */}
            <div id="responsibilities" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">3</div>
                User Responsibilities
              </div>
              <div className="section-body">
                <p>By using the platform you agree to:</p>
                <ul className="iv-list">
                  <li>
                    Provide accurate information when creating your account and
                    keep it up to date.
                  </li>
                  <li>
                    Maintain the confidentiality of your login credentials and
                    be responsible for all activity under your account.
                  </li>
                  <li>
                    Notify us immediately at{" "}
                    <a href="mailto:intervueofficial@gmail.com">
                      intervueofficial@gmail.com
                    </a>{" "}
                    if you suspect unauthorised access to your account.
                  </li>
                  <li>
                    Treat all other users — candidates, interviewers, and
                    observers — with respect and professionalism.
                  </li>
                  <li>
                    Use the platform in compliance with all applicable local,
                    national, and international laws and regulations.
                  </li>
                  <li>
                    Not attempt to circumvent, disable, or interfere with
                    security features of the Service.
                  </li>
                </ul>
              </div>
            </div>

            {/* 4 */}
            <div id="allowed" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">4</div>
                Allowed Usage
              </div>
              <div className="section-body">
                <p>
                  The following are explicitly permitted and encouraged uses of
                  InterVue:
                </p>
                <ul className="two-col-list">
                  <li>Conducting technical coding interviews</li>
                  <li>Practising DSA and system design problems</li>
                  <li>Hosting pair programming sessions</li>
                  <li>Taking and administering coding quizzes</li>
                  <li>Recording sessions for personal review</li>
                  <li>Using the platform for academic projects</li>
                  <li>Evaluating candidates for engineering roles</li>
                  <li>Learning new programming languages collaboratively</li>
                </ul>
                <div className="ok-box">
                  <p>
                    ✅ <strong>You are encouraged</strong> to share your
                    experience with InterVue and provide feedback to help us
                    improve the platform.
                  </p>
                </div>
              </div>
            </div>

            {/* 5 */}
            <div id="prohibited" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">5</div>
                Prohibited Usage
              </div>
              <div className="section-body">
                <p>
                  The following actions are strictly prohibited on InterVue:
                </p>
                <ul className="iv-list">
                  <li>
                    <strong>Academic dishonesty:</strong> Using the platform to
                    cheat on exams, assessments, or competitions you are not
                    authorised to collaborate on.
                  </li>
                  <li>
                    <strong>Harassment:</strong> Threatening, abusing, or
                    harassing any other user through video, chat, or code
                    comments.
                  </li>
                  <li>
                    <strong>Malicious code:</strong> Writing or executing code
                    designed to harm systems, exfiltrate data, mine
                    cryptocurrency, or disrupt services.
                  </li>
                  <li>
                    <strong>Unauthorised scraping:</strong> Automated scraping
                    of content, user profiles, or session data without our
                    written consent.
                  </li>
                  <li>
                    <strong>Impersonation:</strong> Pretending to be another
                    person, company, or entity in a deceptive or harmful manner.
                  </li>
                  <li>
                    <strong>Circumventing limits:</strong> Using technical means
                    to bypass usage limits, authentication, or access controls.
                  </li>
                  <li>
                    <strong>Reselling:</strong> Selling access to InterVue or
                    creating derivative products without authorisation.
                  </li>
                  <li>
                    <strong>Illegal content:</strong> Sharing, transmitting, or
                    executing code or content that violates any law.
                  </li>
                </ul>
                <div className="warning-box">
                  <p>
                    ⚠️ <strong>Violations</strong> of these prohibitions may
                    result in immediate account suspension, permanent ban, and
                    where appropriate, reporting to law enforcement.
                  </p>
                </div>
              </div>
            </div>

            {/* 6 */}
            <div id="accounts" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">6</div>
                Accounts &amp; Authentication
              </div>
              <div className="section-body">
                <p>
                  InterVue uses <strong>Clerk</strong> as its authentication
                  provider. By creating an account, you also agree to Clerk's
                  Terms of Service and Privacy Policy. Authentication may be
                  performed via email/password or OAuth providers (e.g. Google,
                  GitHub).
                </p>
                <ul className="iv-list">
                  <li>
                    One person may maintain one primary account. Creating
                    multiple accounts to circumvent restrictions is prohibited.
                  </li>
                  <li>
                    You are responsible for all actions taken under your
                    account, whether or not authorised by you.
                  </li>
                  <li>
                    We reserve the right to disable or terminate accounts that
                    violate these Terms.
                  </li>
                  <li>
                    You may delete your account at any time through your profile
                    settings. Data deletion follows our{" "}
                    <Link
                      to="/privacy"
                      style={{ color: "var(--gold)", textDecoration: "none" }}
                    >
                      Privacy Policy
                    </Link>
                    .
                  </li>
                </ul>
              </div>
            </div>

            {/* 7 */}
            <div id="sessions" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">7</div>
                Session &amp; Video Call Rules
              </div>
              <div className="section-body">
                <p>
                  InterVue sessions include a shared code editor, real-time
                  video/audio, and a live code execution environment. The
                  following rules apply to all sessions:
                </p>
                <ul className="iv-list">
                  <li>
                    <strong>Consent to recording:</strong> By starting or
                    joining a session, you acknowledge that the session may be
                    recorded. Ensure all participants are aware of and consent
                    to recording.
                  </li>
                  <li>
                    <strong>Professional conduct:</strong> Maintain professional
                    behaviour throughout video calls. Harassment, offensive
                    language, or inappropriate content is not tolerated.
                  </li>
                  <li>
                    <strong>Code execution:</strong> The sandbox environment is
                    provided as-is for evaluation purposes. Do not attempt to
                    exploit or break out of the sandbox.
                  </li>
                  <li>
                    <strong>Session links:</strong> Session URLs should only be
                    shared with intended participants. You are responsible for
                    who you grant access to your sessions.
                  </li>
                  <li>
                    <strong>Data in sessions:</strong> Do not paste sensitive
                    information (API keys, passwords, personal data) into the
                    shared code editor.
                  </li>
                </ul>
              </div>
            </div>

            {/* 8 */}
            <div id="ip" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">8</div>
                Intellectual Property
              </div>
              <div className="section-body">
                <p>
                  <strong>InterVue's IP:</strong> The InterVue platform —
                  including its code, design, branding, logos, and content — is
                  owned by the InterVue team and protected by applicable
                  intellectual property laws. You may not copy, reproduce, or
                  distribute any part of the platform without written
                  permission.
                </p>
                <p>
                  <strong>Your content:</strong> Code you write during sessions
                  remains yours. By using the platform, you grant InterVue a
                  limited, non-exclusive licence to store and display your code
                  solely for the purpose of providing the Service (e.g. session
                  replay).
                </p>
                <p>
                  <strong>Feedback:</strong> Any suggestions or feedback you
                  provide about InterVue may be used by us to improve the
                  platform without obligation to you.
                </p>
              </div>
            </div>

            {/* 9 */}
            <div id="liability" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">9</div>
                Limitation of Liability
              </div>
              <div className="section-body">
                <p>
                  InterVue is provided <strong>"as is"</strong> and{" "}
                  <strong>"as available"</strong> without warranties of any
                  kind, express or implied, including but not limited to
                  warranties of merchantability, fitness for a particular
                  purpose, or non-infringement.
                </p>
                <ul className="iv-list">
                  <li>
                    We do not guarantee uninterrupted, error-free, or secure
                    access to the Service.
                  </li>
                  <li>
                    We are not liable for any indirect, incidental, special,
                    consequential, or punitive damages arising from your use of
                    the Service.
                  </li>
                  <li>
                    We are not responsible for the conduct of any user during a
                    session, including interviewers or candidates you interact
                    with.
                  </li>
                  <li>
                    Our total liability, if any, shall not exceed the amount you
                    have paid us in the 12 months preceding the claim (which,
                    for free users, is zero).
                  </li>
                </ul>
                <div className="warning-box">
                  <p>
                    ⚠️ Some jurisdictions do not allow limitation of liability
                    clauses. In those jurisdictions, our liability is limited to
                    the maximum extent permitted by law.
                  </p>
                </div>
              </div>
            </div>

            {/* 10 */}
            <div id="termination" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">10</div>
                Termination
              </div>
              <div className="section-body">
                <p>Either party may terminate this agreement at any time:</p>
                <ul className="iv-list">
                  <li>
                    <strong>By you:</strong> Delete your account through your
                    profile settings. Your data will be removed per our Privacy
                    Policy.
                  </li>
                  <li>
                    <strong>By us:</strong> We may suspend or terminate your
                    account immediately and without notice if we believe you
                    have violated these Terms, engaged in harmful behaviour, or
                    if required by law.
                  </li>
                  <li>
                    <strong>Effect of termination:</strong> Upon termination,
                    your right to use the Service ceases immediately. Sections
                    on intellectual property, liability, and dispute resolution
                    survive termination.
                  </li>
                </ul>
                <p style={{ marginTop: "1rem" }}>
                  If you believe your account was terminated in error, contact
                  us at{" "}
                  <a href="mailto:intervueofficial@gmail.com">
                    intervueofficial@gmail.com
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* 11 */}
            <div id="changes" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">11</div>
                Changes to These Terms
              </div>
              <div className="section-body">
                <p>
                  We may modify these Terms at any time. When we make material
                  changes, we will:
                </p>
                <ul className="iv-list">
                  <li>
                    Update the "Last updated" date at the top of this page.
                  </li>
                  <li>
                    Notify registered users via email at least 7 days before
                    major changes take effect.
                  </li>
                  <li>Display a notice on the platform dashboard.</li>
                </ul>
                <p style={{ marginTop: "1rem" }}>
                  Your continued use of InterVue after the effective date of any
                  changes constitutes your acceptance of the revised Terms. If
                  you do not agree to the updated Terms, you must stop using the
                  Service and may delete your account.
                </p>
                <p>
                  Questions about these Terms? Email us at{" "}
                  <a href="mailto:intervueofficial@gmail.com">
                    intervueofficial@gmail.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border)" }}>
        <div className="iv-footer">
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <div
              className="iv-logo-gem"
              style={{ width: 28, height: 28, borderRadius: 8 }}
            >
              <SparklesIcon size={13} color="#07070C" strokeWidth={2.5} />
            </div>
            <span className="iv-footer-copy">
              © 2025 InterVue · Final Year Project
            </span>
          </div>
          <div className="iv-footer-links">
            <Link to="/privacy" className="iv-footer-link">
              Privacy
            </Link>
            <Link to="/terms" className="iv-footer-link">
              Terms
            </Link>
            <Link to="/contact" className="iv-footer-link">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
