import { useState, useEffect, useMemo } from "react";
import { fetchJobs, fetchCategories } from "./services/api";

import Header from "./components/layout/Header";
import SearchFilters from "./components/layout/SearchFilters";
import SortDropdown from "./components/layout/SortDropdown";
import JobList from "./components/job/JobList";
import JobModal from "./components/job/JobModal";
import LoadingSkeleton from "./components/common/LoadingSkeleton";
import ErrorState from "./components/common/ErrorState";
import Footer from "./components/layout/Footer";

// Top-level imports and service helpers

export default function App() {
  // Component state: jobs, categories, loading/error and filters
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedJob, setSelectedJob] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    location: "",
    budgetMin: "",
    budgetMax: "",
  });

  const [sortOption, setSortOption] = useState("newest");

  // loadData: fetch and set jobs/categories with error handling
  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const delay = new Promise((res) => setTimeout(res, 1500));

      const [jobData, categoryData] = await Promise.all([
        fetchJobs(),
        fetchCategories(),
        delay,
      ]);

      setJobs(jobData);
      setCategories(categoryData);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger data load on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      loadData();
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  // Compute filtered and sorted jobs based on current filters and sort option
  const filteredAndSortedJobs = useMemo(() => {
    let result = [...jobs];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.clientName.toLowerCase().includes(q) ||
          j.skills?.some((s) => s.toLowerCase().includes(q)),
      );
    }

    if (filters.category) {
      result = result.filter((j) => j.categoryName === filters.category);
    }

    if (filters.location) {
      result = result.filter((j) =>
        j.location.toLowerCase().includes(filters.location.toLowerCase()),
      );
    }

    if (filters.budgetMin !== "") {
      result = result.filter((j) => j.salary >= Number(filters.budgetMin));
    }

    if (filters.budgetMax !== "") {
      result = result.filter((j) => j.salary <= Number(filters.budgetMax));
    }

    switch (sortOption) {
      case "newest":
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "budget-high":
        result.sort((a, b) => b.salary - a.salary);
        break;
      case "budget-low":
        result.sort((a, b) => a.salary - b.salary);
        break;
      case "most-proposals":
        result.sort((a, b) => b.proposalCount - a.proposalCount);
        break;
    }

    return result;
  }, [jobs, filters, sortOption]);

  const locations = useMemo(
    () => [...new Set(jobs.map((j) => j.location))].sort(),
    [jobs],
  );

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans flex flex-col">
      <Header />

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchFilters
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          locations={locations}
        />

        {!loading && !error && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 my-6">
            <p className="text-sm text-stone-400">
              Showing{" "}
              <span className="text-amber-400 font-semibold">
                {filteredAndSortedJobs.length}
              </span>{" "}
              of{" "}
              <span className="text-stone-300 font-semibold">
                {jobs.length}
              </span>{" "}
              jobs
            </p>

            <SortDropdown
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </div>
        )}

        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={loadData} />
        ) : (
          <JobList jobs={filteredAndSortedJobs} onSelectJob={setSelectedJob} />
        )}
      </main>

      {/* FOOTER  */}
      <Footer />

      {/* MODAL */}
      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}
