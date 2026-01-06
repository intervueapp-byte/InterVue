export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <h2 className="text-xl font-semibold text-white">InterVue</h2>
          <p className="mt-3 text-sm text-gray-400">
            Smarter interviews. Real insights. Better hiring.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
            Product
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Live Interviews</li>
            <li>AI Interview Monitoring</li>
            <li>Code Collaboration</li>
            <li>Interview Analytics</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
            Company
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
            Contact
          </h3>
          <p className="mt-4 text-sm text-gray-400">
            support@intervue.app
          </p>
        </div>

      </div>

      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} InterVue. All rights reserved.
      </div>
    </footer>
  );
}
