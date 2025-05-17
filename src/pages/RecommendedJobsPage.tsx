// src/pages/RecommendedJobsPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchRecommendedJobsAPI, type Job } from "../services/mockApi";
import JobCard from "../components/JobCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { ArrowLeft } from "lucide-react";

const RecommendedJobsPage: React.FC = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resumeId) {
      setError("Invalid session.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    fetchRecommendedJobsAPI(resumeId)
      .then(setJobs)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [resumeId]);

  if (isLoading)
    return (
      <div className="container mx-auto p-4">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto p-4">
        <ErrorAlert message={error} />
      </div>
    );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Recommended Jobs
        </h1>
        <Link
          to={`/resume/${resumeId}`}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <ArrowLeft size={20} className="mr-1" /> Back to Feedback
        </Link>
      </div>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">
          No recommended jobs found at this time.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} resumeId={resumeId!} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedJobsPage;
