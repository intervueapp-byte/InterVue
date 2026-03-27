import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-base-100/80 backdrop-blur-md border-t border-primary/20">
      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6
          py-10
          grid
          grid-cols-1
          gap-10
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        {/* Brand */}
        <div className="space-y-3">
          <h2
            onClick={() => (window.location.href = "/")}
            className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent cursor-pointer"
          >
            InterVue
          </h2>
          <p className="text-sm text-base-content/70 leading-relaxed">
            Smarter interviews. Real insights. Better hiring.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">
            Product
          </h3>
          <ul className="space-y-2 text-sm text-base-content/70">
            <li onClick={() => (window.location.href = "/sessions")} className="hover:text-primary cursor-pointer">
              Live Interviews
            </li>
            <li onClick={() => alert("Coming Soon")} className="hover:text-primary cursor-pointer">
              AI Interview Monitoring
            </li>
            <li onClick={() => (window.location.href = "/problems")} className="hover:text-primary cursor-pointer">
              Code Collaboration
            </li>
            <li onClick={() => alert("Coming Soon")} className="hover:text-primary cursor-pointer">
              Interview Analytics
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-base-content/70">
<li onClick={() => (window.location.href = "/about")} className="hover:text-primary cursor-pointer">
  About
</li>
            <li onClick={() => alert("Careers coming soon")} className="hover:text-primary cursor-pointer">
              Careers
            </li>
            <li onClick={() => alert("Privacy Policy coming soon")} className="hover:text-primary cursor-pointer">
              Privacy Policy
            </li>
            <li onClick={() => alert("Terms coming soon")} className="hover:text-primary cursor-pointer">
              Terms of Service
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide">
            Contact
          </h3>

          <div
            onClick={() => (window.location.href = "mailto:support@intervue.app")}
            className="flex items-center gap-2 text-sm text-base-content/70 cursor-pointer hover:text-primary"
          >
            <Mail className="size-4" />
            <span>support@intervue.app</span>
          </div>

          <div className="flex gap-4">
            <Github
              onClick={() => window.open("https://github.com", "_blank")}
              className="size-5 cursor-pointer hover:text-primary transition"
            />
            <Linkedin
              onClick={() => window.open("https://www.linkedin.com/in/raj-posture-3a0621372/", "_blank")}
              className="size-5 cursor-pointer hover:text-primary transition"
            />
          </div>
        </div>
      </div>

      <div
        className="
          border-t border-primary/10
          text-center
          py-4
          text-xs
          text-base-content/60
          px-4
        "
      >
        © {new Date().getFullYear()} InterVue. All rights reserved.
      </div>
    </footer>
  );
}