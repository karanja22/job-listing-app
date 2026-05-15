import { useEffect, useRef, useState } from "react";
import ProposalForm from "./ProposalForm";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Star rating display for employer rating
function StarRating({ rating = 4.5 }) {
  const stars = Math.round(rating);
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          className={`w-4 h-4 ${n <= stars ? "text-amber-400" : "text-stone-700"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-stone-400 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function JobModal({ job, onClose }) {
  const overlayRef = useRef(null);

  const [employerRating] = useState(() => 4.2 + Math.random() * 0.8);

  // Close on Escape key and prevent body scroll while modal is open
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Close when clicking the dark overlay (not the modal card itself)
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Modal header */}
        <div className="sticky top-0 bg-stone-900 border-b border-stone-800 px-6 py-4 flex items-start justify-between gap-4 z-10">
          <div>
            <h2
              id="modal-title"
              className="text-xl font-bold text-stone-100 leading-snug"
            >
              {job.title}
            </h2>
            <address className="not-italic text-sm text-stone-400 mt-0.5">
              {job.clientName}
            </address>
          </div>
          <button
            onClick={onClose}
            aria-label="Close job details"
            className="shrink-0 p-2 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Key details grid */}
          <section aria-label="Job details">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-stone-800/60 rounded-xl p-3">
                <p className="text-xs text-stone-500 mb-1">Budget</p>
                <p className="text-base font-bold text-amber-400">
                  {formatCurrency(job.salary)}
                </p>
              </div>
              <div className="bg-stone-800/60 rounded-xl p-3">
                <p className="text-xs text-stone-500 mb-1">Location</p>
                <p className="text-sm font-semibold text-stone-100">
                  {job.location}
                </p>
              </div>
              <div className="bg-stone-800/60 rounded-xl p-3">
                <div>
                  <p className="font-semibold text-stone-100">
                    {job.clientName}
                  </p>
                  <StarRating rating={employerRating} />
                </div>
              </div>
              <div className="bg-stone-800/60 rounded-xl p-3">
                <p className="text-xs text-stone-500 mb-1">Posted</p>
                <time
                  dateTime={job.created_at}
                  className="text-sm font-semibold text-stone-100"
                >
                  {new Date(job.created_at).toLocaleDateString("en-KE", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>
              <div className="bg-stone-800/60 rounded-xl p-3">
                <p className="text-xs text-stone-500 mb-1">Proposals</p>
                <p className="text-sm font-semibold text-stone-100">
                  {job.proposalCount}
                </p>
              </div>
              <div className="bg-stone-800/60 rounded-xl p-3">
                <p className="text-xs text-stone-500 mb-1">Status</p>
                <p className="text-sm font-semibold text-stone-100 capitalize">
                  {job.status.replace("_", " ")}
                </p>
              </div>
            </div>
          </section>

          {/* Employer info */}
          <section aria-label="Employer information">
            <h3 className="text-sm font-semibold text-stone-300 uppercase tracking-wider mb-3">
              Employer
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
                <span className="text-stone-950 font-bold text-sm">
                  {job.clientName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-stone-100">{job.clientName}</p>
                <StarRating rating={employerRating} />
              </div>
            </div>
          </section>

          {/* Job description */}
          <section aria-label="Job description">
            <h3 className="text-sm font-semibold text-stone-300 uppercase tracking-wider mb-3">
              Description
            </h3>
            <p className="text-sm text-stone-400 leading-relaxed">
              {job.description}
            </p>
          </section>

          {/* Skills required */}
          {job.skills?.length > 0 && (
            <section aria-label="Required skills">
              <h3 className="text-sm font-semibold text-stone-300 uppercase tracking-wider mb-3">
                Skills Required
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm bg-stone-800 text-stone-200 border border-stone-700 px-3 py-1 rounded-lg font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Proposal form */}
          <section aria-label="Submit a proposal">
            <h3 className="text-sm font-semibold text-stone-300 uppercase tracking-wider mb-4">
              Submit a Proposal
            </h3>
            <ProposalForm jobId={job.job_id} />
          </section>
        </div>
      </div>
    </div>
  );
}
