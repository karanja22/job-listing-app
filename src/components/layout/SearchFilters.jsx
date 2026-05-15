// All filter changes immediately update the parent's filter state,
// which in turn updates the displayed job listings
export default function SearchFilters({
  filters,
  setFilters,
  categories,
  locations,
}) {
  const update = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return (
    <section aria-label="Job search filters" className="space-y-3">
      {/* Search bar — full width on its own row */}
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="search"
          placeholder="Search by title, employer, or skill..."
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          aria-label="Search jobs"
          className="w-full pl-10 pr-4 py-3 bg-stone-900 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-sm"
        />
      </div>

      {/* Filter row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Category */}
        <div>
          <label htmlFor="filter-category" className="sr-only">
            Filter by category
          </label>
          <select
            id="filter-category"
            value={filters.category}
            onChange={(e) => update("category", e.target.value)}
            className="w-full px-3 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent appearance-none cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.category_id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="filter-location" className="sr-only">
            Filter by location
          </label>
          <select
            id="filter-location"
            value={filters.location}
            onChange={(e) => update("location", e.target.value)}
            className="w-full px-3 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent appearance-none cursor-pointer"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Budget min */}
        <div>
          <label htmlFor="filter-budget-min" className="sr-only">
            Minimum budget (KES)
          </label>
          <input
            id="filter-budget-min"
            type="number"
            placeholder="Min budget (KES)"
            value={filters.budgetMin}
            onChange={(e) => update("budgetMin", e.target.value)}
            min="0"
            className="w-full px-3 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          />
        </div>

        {/* Budget max */}
        <div>
          <label htmlFor="filter-budget-max" className="sr-only">
            Maximum budget (KES)
          </label>
          <input
            id="filter-budget-max"
            type="number"
            placeholder="Max budget (KES)"
            value={filters.budgetMax}
            onChange={(e) => update("budgetMax", e.target.value)}
            min="0"
            className="w-full px-3 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          />
        </div>
      </div>

      {/* Clear filters — only shows when filters are active  */}
      {hasActiveFilters && (
        <button
          onClick={() =>
            setFilters({
              search: "",
              category: "",
              location: "",
              budgetMin: "",
              budgetMax: "",
            })
          }
          className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </section>
  );
}
