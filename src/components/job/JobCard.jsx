// Maps job status to colours for badge styling
const STATUS_STYLES = {
  open: "bg-emerald-900/50 text-emerald-400 border border-emerald-800",
  in_progress: "bg-blue-900/50 text-blue-400 border border-blue-800",
  closed: "bg-stone-800 text-stone-400 border border-stone-700",
};

const CATEGORY_COLORS = {
  Frontend: "bg-violet-900/60 text-violet-300",
  Backend: "bg-cyan-900/60 text-cyan-300",
  "UI/UX": "bg-pink-900/60 text-pink-300",
};

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

export default function JobCard({ job, onClick }) {
  const statusStyle = STATUS_STYLES[job.status] ?? STATUS_STYLES.closed;

  const categoryColor =
    CATEGORY_COLORS[job.categoryName] ?? "bg-stone-800 text-stone-300";

  const proposalCount = job.proposalCount ?? 0;

  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`${job.title} at ${job.clientName} — ${formatCurrency(job.salary)}`}
      className="group bg-stone-900 border border-stone-800 rounded-2xl p-5 cursor-pointer hover:border-amber-400/50 hover:bg-stone-800/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-stone-950 flex flex-col gap-4"
    >
      {/* TOP: category + status */}
      <div className="flex items-start justify-between gap-2">
        <span className={`text-xs px-2.5 py-1 rounded-full ${categoryColor}`}>
          {job.categoryName ?? "General"}
        </span>

        <span className={`text-xs px-2.5 py-1 rounded-full ${statusStyle}`}>
          {job.status.replace("_", " ")}
        </span>
      </div>

      {/* TITLE + EMPLOYER */}
      <div>
        <h2 className="text-base font-bold text-stone-100 group-hover:text-amber-400 transition-colors leading-snug">
          {job.title}
        </h2>

        <p className="text-sm text-stone-400 mt-1">
          {job.clientName ?? "Anonymous Employer"}
        </p>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-stone-500 line-clamp-2">{job.description}</p>

      {/* SKILLS */}
      <div className="flex flex-wrap gap-1.5">
        {(job.skills ?? []).map((skill) => (
          <span
            key={skill}
            className="text-xs bg-stone-800 text-stone-300 border border-stone-700 px-2 py-0.5 rounded-md"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="mt-auto pt-3 border-t border-stone-800 flex flex-col gap-2">
        {/* budget + location */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-amber-400">
            {formatCurrency(job.salary)}
          </span>

          <span className="text-xs text-stone-500">{job.location}</span>
        </div>

        {/* meta */}
        <div className="flex items-center justify-between text-xs text-stone-500">
          <time dateTime={job.created_at}>{timeAgo(job.created_at)}</time>

          <span>
            {proposalCount} proposal{proposalCount !== 1 ? "s" : ""}
          </span>
        </div>

        {/* APPLY BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="w-full mt-1 py-2 text-sm font-semibold bg-amber-400 text-stone-950 rounded-xl hover:bg-amber-300 active:scale-95 transition-all"
        >
          Apply Now
        </button>
      </footer>
    </article>
  );
}
