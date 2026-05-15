// Sticky Header to stay visible

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
              <span className="text-stone-950 font-black text-sm">H</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-stone-100">
              Homeland<span className="text-amber-400">Hub</span>
            </span>
          </div>

          {/* Nav links */}
          <nav aria-label="Main navigation">
            <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
              {["Home", "Jobs", "Post a Job"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="px-4 py-2 text-sm text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors duration-150"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sign In CTA */}
          <button className="px-4 py-2 text-sm font-semibold bg-amber-400 text-stone-950 rounded-lg hover:bg-amber-300 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-stone-950">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
