import JobCard from "./JobCard";
import EmptyState from "../common/EmptyState";

export default function JobList({ jobs, onSelectJob }) {
  if (jobs.length === 0) {
    return <EmptyState />;
  }

  return (
    // Responsive grid: 1-col mobile → 2-col tablet → 3-col desktop (Q12 requirement)
    <section
      aria-label="Job listings"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {jobs.map((job) => (
        <JobCard key={job.job_id} job={job} onClick={() => onSelectJob(job)} />
      ))}
    </section>
  );
}
