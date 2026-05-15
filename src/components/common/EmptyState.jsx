export default function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 text-center text-stone-400"
      role="status"
      aria-live="polite"
    >
      <h2 className="text-xl font-semibold text-stone-200">No jobs found</h2>

      <p className="mt-2 text-sm text-stone-500 max-w-md">
        Nothing matches your filters right now. Either the universe is empty or
        your search terms are too ambitious.
      </p>
    </div>
  );
}
