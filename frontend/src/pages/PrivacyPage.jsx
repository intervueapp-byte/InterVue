import { Link } from "react-router-dom";
import {
  SparklesIcon,
  ShieldCheckIcon,
  ChevronRightIcon,
  LockIcon,
  EyeIcon,
  ServerIcon,
  UserCheckIcon,
  MailIcon,
  CookieIcon,
  TrashIcon,
  ClockIcon,
} from "lucide-react";
import { BASE_CSS } from "./sharedStyles";
import { SignInButton } from "@clerk/clerk-react";

const EXTRA_CSS = `
  .privacy-toc {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.75rem 2rem;
    margin-bottom: 2.5rem;
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
  .toc-link svg { flex-shrink: 0; }

  .privacy-layout {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 2rem;
    align-items: start;
  }
  .privacy-main { min-width: 0; }

  .highlight-box {
    background: rgba(200,164,90,0.05);
    border: 1px solid rgba(200,164,90,0.18);
    border-radius: 12px;
    padding: 1.1rem 1.3rem;
    margin-top: 1rem;
  }
  .highlight-box p {
    font-size: 0.88rem; color: var(--text-sub); line-height: 1.7; margin: 0 !important;
  }
  .highlight-box strong { color: var(--gold-lt) !important; }

  @media(max-width: 900px) {
    .privacy-layout { grid-template-columns: 1fr; }
    .privacy-toc { position: static; }
  }
`;

const sections = [
  {
    id: "introduction",
    label: "Introduction",
    icon: <ShieldCheckIcon size={12} />,
  },
  {
    id: "data-collected",
    label: "Data We Collect",
    icon: <EyeIcon size={12} />,
  },
  { id: "data-use", label: "How We Use Data", icon: <ServerIcon size={12} /> },
  {
    id: "data-sharing",
    label: "Data Sharing",
    icon: <UserCheckIcon size={12} />,
  },
  { id: "cookies", label: "Cookies", icon: <CookieIcon size={12} /> },
  { id: "security", label: "Data Security", icon: <LockIcon size={12} /> },
  { id: "rights", label: "Your Rights", icon: <TrashIcon size={12} /> },
  { id: "retention", label: "Data Retention", icon: <ClockIcon size={12} /> },
  { id: "contact", label: "Contact Us", icon: <MailIcon size={12} /> },
];

export default function PrivacyPage() {
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
          <Link to="/contact" className="iv-nav-link">
            Contact
          </Link>
          <Link to="/terms" className="iv-nav-link">
            Terms
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
          <ShieldCheckIcon size={12} /> Privacy Policy
        </div>
        <h1 className="page-hero-title">
          Your privacy is our <em>priority.</em>
        </h1>
        <p className="page-hero-sub">
          We believe privacy is a right, not a feature. This document explains
          exactly what data InterVue collects, why, and how we protect it.
        </p>
      </div>

      {/* CONTENT */}
      <div className="iv-container-wide">
        <div className="privacy-layout au au2">
          {/* TOC sidebar */}
          <aside>
            <div className="privacy-toc">
              <div className="toc-title">
                <ShieldCheckIcon size={14} color="var(--gold)" /> Contents
              </div>
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="toc-link">
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <div className="privacy-main">
            <div className="last-updated">
              Last updated: <span>January 15, 2025</span>
            </div>

            {/* 1. Introduction */}
            <div id="introduction" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">1</div>
                Introduction
              </div>
              <div className="section-body">
                <p>
                  Welcome to <strong>InterVue</strong> — an online technical
                  interview platform that enables candidates and interviewers to
                  collaborate in real time through a shared code editor, HD
                  video, and live code execution. InterVue is developed as an
                  academic final year project.
                </p>
                <p>
                  This Privacy Policy describes how InterVue ("we", "us", or
                  "our") collects, uses, stores, and protects information when
                  you use our platform at <strong>intervue.app</strong> (the
                  "Service"). By using InterVue, you agree to the practices
                  described in this policy.
                </p>
                <p>
                  We are committed to handling your personal data with
                  transparency, integrity, and care. If you have any questions,
                  please reach out to us at{" "}
                  <a href="mailto:intervueofficial@gmail.com">
                    intervueofficial@gmail.com
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* 2. Data Collected */}
            <div id="data-collected" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">2</div>
                Data We Collect
              </div>
              <div className="section-body">
                <p>
                  We collect minimal data necessary to provide and improve the
                  Service. Here is what we may collect:
                </p>

                <p>
                  <strong>Account &amp; Authentication Data (via Clerk)</strong>
                </p>
                <ul className="iv-list">
                  <li>Full name and email address provided at sign-up</li>
                  <li>Profile picture (if provided via OAuth provider)</li>
                  <li>OAuth tokens when you sign in via Google or GitHub</li>
                  <li>
                    Clerk user ID used to associate your sessions and activity
                  </li>
                </ul>

                <p style={{ marginTop: "1.1rem" }}>
                  <strong>Session &amp; Usage Data</strong>
                </p>
                <ul className="iv-list">
                  <li>
                    Interview sessions you create or join (problem name,
                    difficulty, timestamps)
                  </li>
                  <li>
                    Code written during sessions (stored for session replay
                    purposes)
                  </li>
                  <li>Quiz scores stored in your browser's local storage</li>
                  <li>
                    Basic usage logs: pages visited, features used, session
                    duration
                  </li>
                </ul>

                <p style={{ marginTop: "1.1rem" }}>
                  <strong>Technical Data</strong>
                </p>
                <ul className="iv-list">
                  <li>IP address (used for fraud prevention and analytics)</li>
                  <li>Browser type, operating system, and device type</li>
                  <li>
                    Referring URL and general geographic region (country/city
                    level)
                  </li>
                </ul>

                <div className="highlight-box">
                  <p>
                    ⚡ <strong>We do not collect</strong> payment information,
                    government IDs, biometric data, or any sensitive personal
                    information beyond what is listed above.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. How We Use Data */}
            <div id="data-use" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">3</div>
                How We Use Your Data
              </div>
              <div className="section-body">
                <p>We use the data we collect for the following purposes:</p>
                <ul className="iv-list">
                  <li>
                    <strong>To provide the Service:</strong> Authenticate your
                    identity, manage interview sessions, display your history,
                    and enable real-time collaboration.
                  </li>
                  <li>
                    <strong>To improve the platform:</strong> Understand which
                    features are used, identify bugs, and prioritize development
                    based on actual usage patterns.
                  </li>
                  <li>
                    <strong>To communicate with you:</strong> Send essential
                    service notifications (e.g. password reset, session
                    invites). We do not send marketing emails without your
                    explicit consent.
                  </li>
                  <li>
                    <strong>For safety and integrity:</strong> Detect and
                    prevent abuse, fraud, or violations of our Terms of Service.
                  </li>
                  <li>
                    <strong>For analytics:</strong> Aggregate, anonymised usage
                    statistics to understand overall platform health. Individual
                    users are never identified in analytics reports.
                  </li>
                </ul>
                <p style={{ marginTop: "1rem" }}>
                  We process your data on the legal basis of{" "}
                  <strong>contract performance</strong> (to provide the Service
                  you signed up for), <strong>legitimate interests</strong> (to
                  improve and secure the platform), and where required,{" "}
                  <strong>your consent</strong>.
                </p>
              </div>
            </div>

            {/* 4. Data Sharing */}
            <div id="data-sharing" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">4</div>
                Data Sharing Policy
              </div>
              <div className="section-body">
                <p>
                  <strong>
                    We do not sell, rent, or trade your personal data.
                  </strong>{" "}
                  Full stop. Your data is not a product. We share it only in the
                  following limited circumstances:
                </p>
                <ul className="iv-list">
                  <li>
                    <strong>Clerk (Authentication Provider):</strong> Your
                    identity data is managed by Clerk, Inc. Their privacy policy
                    governs how they store and protect your auth credentials.
                    See{" "}
                    <a
                      href="https://clerk.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      clerk.com/privacy
                    </a>
                    .
                  </li>
                  <li>
                    <strong>Cloud Infrastructure:</strong> We use third-party
                    hosting providers (e.g. Vercel, MongoDB Atlas) to store
                    data. These providers are contractually required to protect
                    your data.
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose data if
                    required by law, court order, or to protect the rights,
                    property, or safety of InterVue, its users, or the public.
                  </li>
                  <li>
                    <strong>Business Transfer:</strong> In the unlikely event of
                    a merger or acquisition, your data may be transferred. We
                    will notify you and honour this policy.
                  </li>
                </ul>
                <div className="highlight-box">
                  <p>
                    🔒{" "}
                    <strong>
                      No advertising networks, data brokers, or marketing
                      companies
                    </strong>{" "}
                    ever receive your personal information.
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Cookies */}
            <div id="cookies" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">5</div>
                Cookies &amp; Local Storage
              </div>
              <div className="section-body">
                <p>
                  InterVue uses cookies and browser storage technologies to make
                  the platform work reliably.
                </p>
                <p>
                  <strong>Essential Cookies</strong>
                </p>
                <ul className="iv-list">
                  <li>
                    Authentication session tokens set by Clerk to keep you
                    logged in
                  </li>
                  <li>
                    CSRF tokens to protect against cross-site request forgery
                    attacks
                  </li>
                </ul>
                <p style={{ marginTop: "1rem" }}>
                  <strong>Local Storage</strong>
                </p>
                <ul className="iv-list">
                  <li>
                    Quiz scores and recent preferences are stored in your
                    browser's local storage. This data never leaves your device
                    unless you are logged in and we sync it to your account.
                  </li>
                </ul>
                <p style={{ marginTop: "1rem" }}>
                  <strong>Analytics Cookies</strong>
                </p>
                <ul className="iv-list">
                  <li>
                    We may use privacy-respecting analytics (no third-party ad
                    tracking) to understand usage patterns. These cookies do not
                    identify you personally.
                  </li>
                </ul>
                <p style={{ marginTop: "1rem" }}>
                  You can clear cookies at any time through your browser
                  settings. Disabling essential cookies will prevent you from
                  logging in.
                </p>
              </div>
            </div>

            {/* 6. Security */}
            <div id="security" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">6</div>
                Data Security
              </div>
              <div className="section-body">
                <p>
                  We take security seriously and implement industry-standard
                  measures to protect your data:
                </p>
                <ul className="iv-list">
                  <li>
                    <strong>Encryption in transit:</strong> All data transmitted
                    between your browser and our servers is encrypted via
                    HTTPS/TLS.
                  </li>
                  <li>
                    <strong>Authentication security:</strong> Passwords are
                    never stored by InterVue. Authentication is fully delegated
                    to Clerk, which uses bcrypt hashing and supports MFA.
                  </li>
                  <li>
                    <strong>Sandboxed code execution:</strong> Code run during
                    sessions executes in isolated containers with no access to
                    our infrastructure or other users' data.
                  </li>
                  <li>
                    <strong>Access control:</strong> Only authorised team
                    members have access to production systems, governed by the
                    principle of least privilege.
                  </li>
                  <li>
                    <strong>Regular reviews:</strong> We periodically review our
                    security practices and update them as threats evolve.
                  </li>
                </ul>
                <p style={{ marginTop: "1rem" }}>
                  While we implement strong protections, no system is 100%
                  immune. If you discover a security vulnerability, please
                  responsibly disclose it to{" "}
                  <a href="mailto:intervueofficial@gmail.com">
                    intervueofficial@gmail.com
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* 7. Your Rights */}
            <div id="rights" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">7</div>
                Your Rights
              </div>
              <div className="section-body">
                <p>
                  Depending on your location, you may have the following rights
                  regarding your personal data:
                </p>
                <ul className="iv-list">
                  <li>
                    <strong>Access:</strong> Request a copy of the personal data
                    we hold about you.
                  </li>
                  <li>
                    <strong>Rectification:</strong> Ask us to correct inaccurate
                    or incomplete data.
                  </li>
                  <li>
                    <strong>Erasure:</strong> Request deletion of your account
                    and associated data ("right to be forgotten").
                  </li>
                  <li>
                    <strong>Portability:</strong> Receive your data in a
                    structured, machine-readable format.
                  </li>
                  <li>
                    <strong>Restriction:</strong> Request that we limit
                    processing of your data in certain circumstances.
                  </li>
                  <li>
                    <strong>Objection:</strong> Object to processing based on
                    our legitimate interests.
                  </li>
                  <li>
                    <strong>Withdraw Consent:</strong> Where processing is based
                    on consent, withdraw it at any time.
                  </li>
                </ul>
                <p style={{ marginTop: "1rem" }}>
                  To exercise any of these rights, email us at{" "}
                  <a href="mailto:intervueofficial@gmail.com">
                    intervueofficial@gmail.com
                  </a>
                  . We will respond within 30 days.
                </p>
              </div>
            </div>

            {/* 8. Retention */}
            <div id="retention" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">8</div>
                Data Retention
              </div>
              <div className="section-body">
                <p>
                  We retain your data only as long as necessary to provide the
                  Service or as required by law:
                </p>
                <ul className="iv-list">
                  <li>
                    <strong>Account data:</strong> Retained while your account
                    is active. Deleted within 30 days of account deletion
                    request.
                  </li>
                  <li>
                    <strong>Session data:</strong> Interview session records are
                    retained for 12 months from the session date, then
                    automatically purged.
                  </li>
                  <li>
                    <strong>Usage logs:</strong> Aggregated and anonymised after
                    90 days. Raw logs are deleted after 30 days.
                  </li>
                  <li>
                    <strong>Local storage:</strong> Managed by your browser.
                    Clear it at any time through browser settings.
                  </li>
                </ul>
              </div>
            </div>

            {/* 9. Contact */}
            <div id="contact" className="iv-section-card">
              <div className="section-heading">
                <div className="section-num">9</div>
                Privacy Contact
              </div>
              <div className="section-body">
                <p>
                  For any questions, requests, or concerns about this Privacy
                  Policy or your personal data, please contact our privacy team:
                </p>
                <ul className="iv-list">
                  <li>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:intervueofficial@gmail.com">
                      intervueofficial@gmail.com
                    </a>
                  </li>
                  <li>
                    <strong>Response time:</strong> We aim to respond to all
                    privacy enquiries within 5 business days.
                  </li>
                  <li>
                    <strong>Mailing address:</strong> InterVue, Final Year
                    Project — available on request.
                  </li>
                </ul>
                <p style={{ marginTop: "1rem" }}>
                  We may update this Privacy Policy from time to time. We will
                  notify registered users of material changes via email.
                  Continued use of the Service after changes constitutes
                  acceptance of the updated policy.
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
