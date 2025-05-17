// src/pages/ResumeFeedbackPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchResumeFeedbackAPI,
  type FullResumeFeedback,
} from "../services/mockApi";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import FeedbackSection from "../components/FeedbackSection";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm"; // <--- IMPORT THIS
import {
  FileText,
  Edit3,
  BookOpen,
  BarChart2,
  ShoppingBag,
} from "lucide-react";

const ResumeFeedbackPage: React.FC = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const [feedback, setFeedback] = useState<FullResumeFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"summary" | "resume">("resume");

  useEffect(() => {
    if (!resumeId) {
      setError("No resume ID provided.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    fetchResumeFeedbackAPI(resumeId)
      .then((data) => {
        setFeedback(data);
        setError(null);
      })
      .catch((err) => {
        setError(
          err instanceof Error
            ? err.message
            : "An unknown error occurred during feedback fetch."
        );
        setFeedback(null);
      })
      .finally(() => setIsLoading(false));
  }, [resumeId]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <ErrorAlert message={error} />
      </div>
    );
  if (!feedback)
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 text-center text-gray-600">
        No feedback data found for this resume.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Resume Analysis Report
            </h1>
            <Link
              to={`/resume/${resumeId}/jobs`}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center text-sm"
            >
              <ShoppingBag size={18} className="mr-2" /> View Recommended Jobs
            </Link>
          </div>
        </header>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("resume")}
              className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === "resume"
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              <FileText size={16} className="inline mr-1.5" /> Improved Resume
            </button>
            <button
              onClick={() => setActiveTab("summary")}
              className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === "summary"
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              <BarChart2 size={16} className="inline mr-1.5" /> Feedback Summary
            </button>{" "}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "resume" && (
            <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8">
              <div className="flex items-center mb-4">
                <span className="p-2 bg-blue-100 text-blue-600 rounded-full mr-3">
                  <FileText size={22} />
                </span>
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Enhanced Resume (with Edits)
                </h2>
              </div>
              <p className="mb-6 text-sm text-gray-600">
                This is your resume showing suggested edits.
                <span className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded mx-1 text-xs">
                  Highlighted text
                </span>{" "}
                indicates additions.
                <span className="line-through text-red-600 bg-red-50 px-1.5 py-0.5 rounded mx-1 text-xs">
                  Strikethrough text
                </span>{" "}
                indicates deletions.
              </p>
              <div className="prose prose-sm sm:prose max-w-none border border-gray-200 p-4 sm:p-6 rounded-md bg-gray-50/50 whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]} // <--- ADD THIS
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    ),
                    del: ({ node, ...props }) => (
                      <del
                        {...props}
                        className="text-red-500 bg-red-50 px-0.5"
                      />
                    ),
                    h1: ({ node, children, ...props }) => (
                      <h1
                        {...props}
                        className="text-2xl sm:text-3xl font-bold mt-6 mb-3 pb-2 border-b border-gray-300"
                      >
                        {children}
                      </h1>
                    ),
                    // Override h2 rendering
                    h2: ({ node, children, ...props }) => (
                      <h2
                        {...props}
                        className="text-xl sm:text-2xl font-semibold mt-5 mb-2 pb-2 border-b border-gray-300"
                      >
                        {children}
                      </h2>
                    ),
                    // Override h3 rendering
                    h3: ({ node, children, ...props }) => (
                      <h3
                        {...props}
                        className="text-lg sm:text-xl font-semibold mt-4 mb-2"
                      >
                        {children}
                      </h3>
                    ),
                    // Override p rendering
                    p: ({ node, children, ...props }) => (
                      <p
                        {...props}
                        className="text-sm sm:text-base mb-4 text-gray-700"
                      >
                        {children}
                      </p>
                    ),
                  }}
                >
                  {feedback.resumes.displayed_markdown}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {activeTab === "summary" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FeedbackSection
                title="Content Analysis"
                categoryData={feedback.content}
                icon={<BookOpen size={22} />}
              />
              <FeedbackSection
                title="Presentation Review"
                categoryData={feedback.presentation}
                icon={<Edit3 size={22} />}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeFeedbackPage;
