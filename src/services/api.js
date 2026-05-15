import { jobs } from "../data/jobs";
import { categories } from "../data/job-categories";
import { users } from "../data/users";
import { proposals } from "../data/proposals";

export async function fetchJobs() {
  return jobs.map((job) => {
    const category = categories.find((c) => c.category_id === job.category_id);
    const client = users.find((u) => u.user_id === job.client_id);
    const jobProposals = proposals.filter((p) => p.job_id === job.job_id);

    return {
      ...job,
      categoryName: category?.name ?? "Uncategorized",
      clientName: client?.full_name ?? "Unknown",
      proposalCount: jobProposals.length,
    };
  });
}

export async function fetchCategories() {
  return categories;
}

export async function submitProposal(data) {
  return {
    success: true,
    proposal_id: Math.floor(Math.random() * 9000),
    submitted_at: new Date().toISOString(),
    data,
  };
}
