const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "budget-high", label: "Budget: High → Low" },
  { value: "budget-low", label: "Budget: Low → High" },
  { value: "most-proposals", label: "Most Proposals" },
];

export default function SortDropdown({ sortOption, setSortOption }) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort-select"
        className="text-sm text-stone-400 whitespace-nowrap"
      >
        Sort by
      </label>
      <select
        id="sort-select"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="px-3 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent appearance-none cursor-pointer"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
