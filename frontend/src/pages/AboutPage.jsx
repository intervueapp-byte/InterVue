import Navbar from "../components/Navbar";


export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            About InterVue
          </h1>
          <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
            InterVue is built to transform technical interviews into seamless,
            real-time collaborative experiences.
          </p>
        </section>

        {/* Mission */}
        <section className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-base-content/70 leading-relaxed">
              We aim to simplify hiring by enabling companies to conduct smarter,
              faster, and more insightful interviews. With real-time video,
              collaborative coding, and analytics, InterVue helps teams make
              better decisions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
            <ul className="space-y-2 text-base-content/70">
              <li>✔ Live video interviews</li>
              <li>✔ Real-time code collaboration</li>
              <li>✔ AI-powered insights</li>
              <li>✔ Interview performance analytics</li>
            </ul>
          </div>
        </section>

        {/* Vision */}
        <section className="text-center mb-16">
          <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
          <p className="text-base-content/70 max-w-3xl mx-auto">
            To become the go-to platform for modern hiring by combining
            communication, coding, and intelligence into a single powerful tool.
          </p>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to experience smarter interviews?
          </h2>
          <button
            onClick={() => (window.location.href = "/")}
            className="btn btn-primary"
          >
            Get Started
          </button>
        </section>

      </main>
    </div>
  );
}
