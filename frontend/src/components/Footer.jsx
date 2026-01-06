import { Github, Linkedin, Mail } from "lucide-react";


export default function footer() {
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
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
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
            <li className="hover:text-primary cursor-pointer">Live Interviews</li>
            <li className="hover:text-primary cursor-pointer">AI Interview Monitoring</li>
            <li className="hover:text-primary cursor-pointer">Code Collaboration</li>
            <li className="hover:text-primary cursor-pointer">Interview Analytics</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-base-content/70">
            <li className="hover:text-primary cursor-pointer">About</li>
            <li className="hover:text-primary cursor-pointer">Careers</li>
            <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
            <li className="hover:text-primary cursor-pointer">Terms of Service</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide">
            Contact
          </h3>

          <div className="flex items-center gap-2 text-sm text-base-content/70">
            <Mail className="size-4" />
            <span>support@intervue.app</span>
          </div>

          <div className="flex gap-4">
            <Github className="size-5 cursor-pointer hover:text-primary transition" />
            <Linkedin className="size-5 cursor-pointer hover:text-primary transition" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
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
