export default function Footer() {
  return (
    <footer className="border-t border-stone-800 bg-stone-950 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-lg font-bold text-stone-100">FreelanceHub</h2>
            <p className="text-sm text-stone-500 mt-3 leading-relaxed">
              A quiet marketplace where builders meet problems that actually
              matter. No noise. Just work.
            </p>
          </div>

          {/* For Freelancers */}
          <div>
            <h3 className="text-sm font-semibold text-stone-300 mb-4">
              For Freelancers
            </h3>
            <ul className="space-y-2 text-sm text-stone-500">
              <li className="hover:text-stone-200 transition">Browse Jobs</li>
              <li className="hover:text-stone-200 transition">
                Submit Proposals
              </li>
              <li className="hover:text-stone-200 transition">
                Track Earnings
              </li>
              <li className="hover:text-stone-200 transition">
                Build Portfolio
              </li>
            </ul>
          </div>

          {/* For Clients */}
          <div>
            <h3 className="text-sm font-semibold text-stone-300 mb-4">
              For Clients
            </h3>
            <ul className="space-y-2 text-sm text-stone-500">
              <li className="hover:text-stone-200 transition">Post a Job</li>
              <li className="hover:text-stone-200 transition">
                Review Proposals
              </li>
              <li className="hover:text-stone-200 transition">Hire Talent</li>
              <li className="hover:text-stone-200 transition">
                Manage Contracts
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-stone-300 mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-stone-500">
              <li className="hover:text-stone-200 transition">About</li>
              <li className="hover:text-stone-200 transition">Careers</li>
              <li className="hover:text-stone-200 transition">Support</li>
              <li className="hover:text-stone-200 transition">
                Privacy Policy
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-600">
            © {new Date().getFullYear()} FreelanceHub. Built for people who ship
            things.
          </p>

          <div className="flex items-center gap-4 text-xs text-stone-500">
            <span className="hover:text-stone-200 transition cursor-pointer">
              Terms
            </span>
            <span className="hover:text-stone-200 transition cursor-pointer">
              Privacy
            </span>
            <span className="hover:text-stone-200 transition cursor-pointer">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
