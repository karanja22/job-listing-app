// Simulates real API calls
import { jobs } from "../data/jobs";
import { categories } from "../data/categories";
import { users } from "../data/users";
import { proposals } from "../data/proposals";

// Toggle to true to test the error state UI (Q14a)
const SIMULATE_ERROR = false;

// Fetches all job listings with each jobs's category name and client info

export async function fetchJobs() {
  if (SIMULATE_ERROR) {
    throw new Error("Failed to fetch jobs. Server returned 500.");
  }

  // Join jobs with category and client data — mimics a backend JOIN
  return jobs.map((job) => {
    const category = categories.find((c) => c.category_id === job.category_id);
    const client = users.find((u) => u.user_id === job.client_id);
    const jobProposals = proposals.filter((p) => p.job_id === job.job_id);

    return {
      ...job,
      categoryName: category?.name ?? "Uncategorized",
      clientName: client?.full_name ?? "Unknown Client",
      clientEmail: client?.email ?? "",
      proposalCount: jobProposals.length,
    };
  });
}

/**
 * Fetches all categories for the filter dropdown.
 */
export async function fetchCategories() {
  return categories;
}

/**
 * Submits a mocked proposal and returns a fake confirmation 

 */
export async function submitProposal(proposalData) {
  return {
    success: true,
    proposal_id: Math.floor(Math.random() * 9000) + 1000,
    proposalData,
    submitted_at: new Date().toISOString(),
    message: "Your proposal has been submitted successfully!",
  };
}
