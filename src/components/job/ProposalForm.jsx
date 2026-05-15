import { useState } from "react";
import { submitProposal } from "../../services/api";

const INITIAL_FORM = {
  coverLetter: "",
  budget: "",
  timeline: "",
  portfolioUrl: "",
};

const INITIAL_ERRORS = {
  coverLetter: "",
  budget: "",
  timeline: "",
  portfolioUrl: "",
};

// URL validation
function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export default function ProposalForm({ jobId }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear the error for this field as the user corrects it
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // Validates all fields and returns true if form is clean
  const validate = () => {
    const newErrors = { ...INITIAL_ERRORS };
    let valid = true;

    if (form.coverLetter.trim().length < 100) {
      newErrors.coverLetter = `Cover letter must be at least 100 characters (currently ${form.coverLetter.trim().length})`;
      valid = false;
    }

    if (
      !form.budget ||
      isNaN(Number(form.budget)) ||
      Number(form.budget) <= 0
    ) {
      newErrors.budget = "Please enter a valid budget amount";
      valid = false;
    }

    if (
      !form.timeline ||
      isNaN(Number(form.timeline)) ||
      Number(form.timeline) < 1
    ) {
      newErrors.timeline = "Please enter a timeline of at least 1 day";
      valid = false;
    }

    if (form.portfolioUrl && !isValidUrl(form.portfolioUrl)) {
      newErrors.portfolioUrl =
        "Please enter a valid URL (e.g. https://yourportfolio.com)";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await submitProposal({ jobId, ...form });
      setConfirmation(result);
      setSubmitted(true);
    } catch {
      setErrors((prev) => ({
        ...prev,
        coverLetter: "Submission failed. Please try again.",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  // Success state — shown after successful mock submission
  if (submitted && confirmation) {
    return (
      <div className="bg-emerald-900/30 border border-emerald-700 rounded-2xl p-6 text-center space-y-3">
        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h4 className="text-lg font-bold text-emerald-400">
          Proposal Submitted!
        </h4>
        <p className="text-sm text-stone-400">{confirmation.message}</p>
        <p className="text-xs text-stone-500">
          Reference ID:{" "}
          <span className="font-mono text-stone-300">
            #{confirmation.proposal_id}
          </span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Cover Letter */}
      <div>
        <label
          htmlFor="cover-letter"
          className="block text-sm font-medium text-stone-300 mb-1.5"
        >
          Cover Letter <span className="text-red-400">*</span>
          <span className="text-stone-500 font-normal ml-2 text-xs">
            (min. 100 characters)
          </span>
        </label>
        <textarea
          id="cover-letter"
          value={form.coverLetter}
          onChange={(e) => update("coverLetter", e.target.value)}
          rows={5}
          aria-required="true"
          aria-describedby={
            errors.coverLetter ? "cover-letter-error" : undefined
          }
          aria-invalid={!!errors.coverLetter}
          placeholder="Describe your relevant experience and why you're the right fit for this job..."
          className={`w-full px-3 py-2.5 bg-stone-800 border rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none transition-colors ${
            errors.coverLetter ? "border-red-500" : "border-stone-700"
          }`}
        />
        <div className="flex items-start justify-between mt-1">
          {errors.coverLetter ? (
            <p
              id="cover-letter-error"
              role="alert"
              className="text-xs text-red-400"
            >
              {errors.coverLetter}
            </p>
          ) : (
            <span />
          )}
          <span
            className={`text-xs shrink-0 ${form.coverLetter.length < 100 ? "text-stone-500" : "text-emerald-500"}`}
          >
            {form.coverLetter.length} / 100
          </span>
        </div>
      </div>

      {/* Budget + Timeline row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Proposed Budget */}
        <div>
          <label
            htmlFor="proposed-budget"
            className="block text-sm font-medium text-stone-300 mb-1.5"
          >
            Proposed Budget (KES) <span className="text-red-400">*</span>
          </label>
          <input
            id="proposed-budget"
            type="number"
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
            min="1"
            aria-required="true"
            aria-describedby={errors.budget ? "budget-error" : undefined}
            aria-invalid={!!errors.budget}
            placeholder="e.g. 55000"
            className={`w-full px-3 py-2.5 bg-stone-800 border rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors ${
              errors.budget ? "border-red-500" : "border-stone-700"
            }`}
          />
          {errors.budget && (
            <p
              id="budget-error"
              role="alert"
              className="text-xs text-red-400 mt-1"
            >
              {errors.budget}
            </p>
          )}
        </div>

        {/* Timeline */}
        <div>
          <label
            htmlFor="timeline"
            className="block text-sm font-medium text-stone-300 mb-1.5"
          >
            Timeline (days) <span className="text-red-400">*</span>
          </label>
          <input
            id="timeline"
            type="number"
            value={form.timeline}
            onChange={(e) => update("timeline", e.target.value)}
            min="1"
            aria-required="true"
            aria-describedby={errors.timeline ? "timeline-error" : undefined}
            aria-invalid={!!errors.timeline}
            placeholder="e.g. 14"
            className={`w-full px-3 py-2.5 bg-stone-800 border rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors ${
              errors.timeline ? "border-red-500" : "border-stone-700"
            }`}
          />
          {errors.timeline && (
            <p
              id="timeline-error"
              role="alert"
              className="text-xs text-red-400 mt-1"
            >
              {errors.timeline}
            </p>
          )}
        </div>
      </div>

      {/* Portfolio URL (optional) */}
      <div>
        <label
          htmlFor="portfolio-url"
          className="block text-sm font-medium text-stone-300 mb-1.5"
        >
          Portfolio URL{" "}
          <span className="text-stone-500 font-normal text-xs">(optional)</span>
        </label>
        <input
          id="portfolio-url"
          type="url"
          value={form.portfolioUrl}
          onChange={(e) => update("portfolioUrl", e.target.value)}
          aria-describedby={errors.portfolioUrl ? "portfolio-error" : undefined}
          aria-invalid={!!errors.portfolioUrl}
          placeholder="https://yourportfolio.com"
          className={`w-full px-3 py-2.5 bg-stone-800 border rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors ${
            errors.portfolioUrl ? "border-red-500" : "border-stone-700"
          }`}
        />
        {errors.portfolioUrl && (
          <p
            id="portfolio-error"
            role="alert"
            className="text-xs text-red-400 mt-1"
          >
            {errors.portfolioUrl}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 font-semibold text-stone-950 bg-amber-400 rounded-xl hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-stone-900"
      >
        {submitting ? "Submitting…" : "Submit Proposal"}
      </button>
    </form>
  );
}
