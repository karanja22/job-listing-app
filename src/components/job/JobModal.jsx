import { useEffect, useRef, useState } from "react";
import ProposalForm from "./ProposalForm";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Star rating
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

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* HEADER */}
        <div className="sticky top-0 bg-stone-900 border-b border-stone-800 px-6 py-4 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-stone-100">{job.title}</h2>
            <p className="text-sm text-stone-400 mt-1">{job.location}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 space-y-8">
          {/* JOB SNAPSHOT */}
          <section>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-stone-800/60 rounded-xl p-3">
                <p className="text-xs text-stone-500">Budget</p>
                <p className="text-amber-400 font-bold">
                  {formatCurrency(job.salary)}
                </p>
              </div>

              <div className="bg-stone-800/60 rounded-xl p-3">
                <p className="text-xs text-stone-500">Posted</p>
                <p className="text-stone-100 font-semibold text-sm">
                  {new Date(job.created_at).toLocaleDateString("en-KE")}
                </p>
              </div>

              <div className="bg-stone-800/60 rounded-xl p-3">
                <p className="text-xs text-stone-500">Status</p>
                <p className="text-stone-100 font-semibold capitalize text-sm">
                  {job.status.replace("_", " ")}
                </p>
              </div>
            </div>
          </section>

          <div className="h-px bg-stone-800" />

          {/* ABOUT CLIENT */}
          <section>
            <h3 className="text-sm font-semibold text-stone-200 mb-3">
              About the Client
            </h3>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-stone-950 font-bold">
                {job.clientName?.charAt(0) || "C"}
              </div>

              <div>
                <p className="text-stone-100 font-semibold">
                  {job.clientName || "Anonymous Client"}
                </p>
                <StarRating rating={employerRating} />
              </div>
            </div>
          </section>

          {/* DESCRIPTION */}
          <section>
            <h3 className="text-sm font-semibold text-stone-200 mb-3">
              Description
            </h3>
            <p className="text-sm text-stone-400 leading-relaxed">
              {job.description}
            </p>
          </section>

          {/* SKILLS */}
          {job.skills?.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-stone-200 mb-3">
                Required Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-stone-800 text-stone-200 border border-stone-700 px-3 py-1 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          <div className="h-px bg-stone-800" />

          {/* PROPOSAL SECTION (NOW EMPHASIZED) */}
          <section>
            <div className="mb-5">
              <h3 className="text-lg font-bold text-stone-100">
                Submit a Proposal
              </h3>

              <p className="text-sm text-stone-500 mt-1 leading-relaxed">
                Fill in the details below to send your proposal to the client.
                Make sure to highlight how your skills and experience make you a
                great fit for this job!
              </p>
            </div>

            <ProposalForm jobId={job.job_id} />
          </section>
        </div>
      </div>
    </div>
  );
}
