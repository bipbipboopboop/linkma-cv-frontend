// src/pages/JobDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchJobDetailsAPI, type Job } from "../services/mockApi";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  Users,
  Building,
  ExternalLink,
} from "lucide-react";

const JobDetailPage: React.FC = () => {
  const { resumeId, jobId } = useParams<{ resumeId: string; jobId: string }>();
  const [job, setJob] = useState<Job | null | undefined>(null); // undefined for not found
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resumeId || !jobId) {
      setError("Invalid parameters.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    fetchJobDetailsAPI(resumeId, parseInt(jobId))
      .then(setJob)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [resumeId, jobId]);

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
  if (!job)
    return (
      <div className="container mx-auto p-4 text-center text-xl">
        Job not found.
      </div>
    );

  // Extract apply link from description if available
  const applyLinkMatch = job.job_description.match(
    /\[Apply now at (https?:\/\/[^\s\]]+)\]/
  )!;
  const applyLink = applyLinkMatch ? applyLinkMatch[1] : null;
  const cleanDescription = applyLink
    ? job.job_description.replace(applyLinkMatch[0], "")
    : job.job_description;

  const handleNavigateLinkedin = () => {
    if (job) {
      window.location.href = job.job_url
    }
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <Link
        to={`/resume/${resumeId}/jobs`}
        className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Recommended Jobs
      </Link>

      <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:space-x-6 mb-6">
          <img
            src={job.company_logo}
            alt={`${job.company_name} logo`}
            className="w-24 h-24 rounded-lg object-contain border mb-4 sm:mb-0"
          />
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
              {job.title}
            </h1>
            <p className="text-lg text-gray-700 flex items-center">
              <Building size={20} className="mr-2 text-gray-500" />
              {job.company_name}
            </p>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <Clock size={16} className="mr-2 text-gray-400" />
              Posted: {new Date(job.posted_date).toLocaleDateString()}
            </p>
          </div>
          {applyLink && (
            <a
              href={applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 sm:mt-0 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              Apply Now <ExternalLink size={18} className="ml-2" />
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm">
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-semibold text-blue-700 mb-1">Role Details</h3>
            <p>
              <Briefcase size={16} className="inline mr-2 text-blue-600" />
              <strong>Seniority:</strong> {job["Seniority level"]}
            </p>
            <p>
              <Briefcase size={16} className="inline mr-2 text-blue-600" />
              <strong>Type:</strong> {job["Employment type"]}
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-md">
            <h3 className="font-semibold text-indigo-700 mb-1">
              Industry & Function
            </h3>
            <p>
              <MapPin size={16} className="inline mr-2 text-indigo-600" />
              <strong>Industries:</strong> {job["Industries"]}
            </p>
            <p>
              <MapPin size={16} className="inline mr-2 text-indigo-600" />
              <strong>Function:</strong> {job["Job function"]}
            </p>
          </div>
        </div>

        {job.applicants && (
          <p className="mb-6 text-sm text-gray-600 flex items-center">
            <Users size={18} className="mr-2 text-gray-500" /> {job.applicants}
          </p>
        )}

        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Job Description
        </h2>
        <div className="prose prose-sm sm:prose-base max-w-none text-gray-700">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {cleanDescription}
          </ReactMarkdown>
        </div>
        <button onClick={handleNavigateLinkedin} className="bg-blue-500 p-3 rounded text-white my-10 cursor-pointer">View Job In Linkedin</button>
      </div>
    </div>
  );
};

export default JobDetailPage;
