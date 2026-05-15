export default function LoadingSkeleton() {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10"
      aria-label="Loading jobs"
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <article
          key={i}
          className="bg-stone-900 border border-stone-800 rounded-2xl p-5 flex flex-col gap-4 animate-pulse"
        >
          {/* TOP: category + status */}
          <div className="flex items-start justify-between gap-2">
            <div className="h-5 w-20 bg-stone-800 rounded-full" />
            <div className="h-5 w-16 bg-stone-800 rounded-full" />
          </div>

          {/* TITLE + EMPLOYER */}
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-stone-800 rounded-md" />
            <div className="h-3 w-1/2 bg-stone-800 rounded-md" />
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-stone-800 rounded-md" />
            <div className="h-3 w-5/6 bg-stone-800 rounded-md" />
          </div>

          {/* SKILLS */}
          <div className="flex flex-wrap gap-2">
            <div className="h-5 w-14 bg-stone-800 rounded-md" />
            <div className="h-5 w-16 bg-stone-800 rounded-md" />
            <div className="h-5 w-12 bg-stone-800 rounded-md" />
          </div>

          {/* FOOTER */}
          <footer className="mt-auto pt-3 border-t border-stone-800 flex flex-col gap-3">
            {/* budget + location */}
            <div className="flex items-center justify-between">
              <div className="h-5 w-24 bg-stone-800 rounded-md" />
              <div className="h-4 w-20 bg-stone-800 rounded-md" />
            </div>

            {/* meta */}
            <div className="flex items-center justify-between">
              <div className="h-3 w-16 bg-stone-800 rounded-md" />
              <div className="h-3 w-20 bg-stone-800 rounded-md" />
            </div>

            {/* button */}
            <div className="h-9 w-full bg-stone-800 rounded-xl" />
          </footer>
        </article>
      ))}
    </section>
  );
}
