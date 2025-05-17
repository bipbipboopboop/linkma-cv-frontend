// src/components/JobCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { type Job } from "../services/mockApi";
import { Briefcase, MapPin, Clock, Users } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw"; // To render HTML in job description

interface JobCardProps {
  job: Job;
  resumeId: string;
}

const JobCard: React.FC<JobCardProps> = ({ job, resumeId }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start space-x-4">
        <img
          src={job.company_logo}
          alt={`${job.company_name} logo`}
          className="w-16 h-16 rounded-md object-contain border"
        />
        <div className="flex-1">
          <Link to={`/resume/${resumeId}/jobs/${job.id}`} className="block">
            <h3 className="text-xl font-semibold text-blue-600 hover:underline">
              {job.title}
            </h3>
          </Link>
          <p className="text-md text-gray-700">{job.company_name}</p>
          <p className="text-sm text-gray-500">
            Posted: {new Date(job.posted_date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 space-y-1">
        <p>
          <Briefcase size={16} className="inline mr-2 text-blue-500" />
          {job["Seniority level"]} • {job["Employment type"]}
        </p>
        <p>
          <MapPin size={16} className="inline mr-2 text-blue-500" />
          {job["Industries"]}
        </p>
        {job.applicants && (
          <p>
            <Users size={16} className="inline mr-2 text-blue-500" />
            {job.applicants}
          </p>
        )}
      </div>

      <div className="mt-4 prose prose-sm max-w-none text-gray-700 max-h-28 overflow-hidden relative">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {job.job_description.length > 200
            ? job.job_description.substring(0, 200) + "..."
            : job.job_description}
        </ReactMarkdown>
        {job.job_description.length > 200 && (
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent"></div>
        )}
      </div>

      <Link
        to={`/resume/${resumeId}/jobs/${job.id}`}
        className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors"
      >
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
