// src/pages/ResumeFeedbackPage.tsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  fetchResumeFeedbackAPI,
  type ResumeFeedback,
} from "../services/mockApi";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import ReactMarkdown from "react-markdown";
import * as Diff from "diff"; // Import all from 'diff'

const ResumeFeedbackPage: React.FC = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<ResumeFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resumeId) {
      setError("No resume ID provided.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    fetchResumeFeedbackAPI(resumeId)
      .then(setFeedback)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [resumeId]);

  // Memoize the diff calculation
  const diffResult = useMemo(() => {
    if (!feedback) return [];
    // Using diffChars for more granular, GitHub-like diff
    return Diff.diffChars(feedback.original_resume, feedback.corrected_resume);
  }, [feedback]);

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
  if (!feedback)
    return (
      <div className="container mx-auto p-4 text-center">
        No feedback data found.
      </div>
    );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Resume Feedback
        </h1>
        <Link
          to={`/resume/${resumeId}/jobs`}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Find Recommended Jobs
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Corrected Resume with Changes Highlighted
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          <span className="bg-green-100 px-1 rounded">Green highlight</span>{" "}
          indicates additions or improvements.
          <span className="bg-red-100 px-1 rounded line-through ml-2">
            Red highlight with strikethrough
          </span>{" "}
          (if shown by diff logic) indicates removals from original.
          <br />
          Note: This basic diff highlights characters. For precise line-by-line
          like GitHub, more complex logic or libraries are needed. Here, we
          primarily show additions to the corrected resume.
        </p>

        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none border p-4 rounded-md bg-gray-50 whitespace-pre-wrap font-mono text-xs sm:text-sm">
          {diffResult.map((part, index) => {
            const style: React.CSSProperties = {};
            let content = part.value;
            if (part.added) {
              style.backgroundColor = "rgba(200, 255, 200, 0.7)"; // Light green
              style.textDecoration = "none";
            } else if (part.removed) {
              // We are displaying the corrected_resume, so 'removed' parts (from original) won't be directly visible unless we also show original.
              // To emulate GitHub, you'd show removed lines here from original.
              // For now, we'll just skip rendering them or make them very subtle if we were showing a combined view.
              // Since we only display corrected_resume, skip removed parts.
              return null;
            }
            // Render the content using ReactMarkdown if it's not just whitespace
            // For finer control, one might parse markdown and apply diffs on the AST
            // Here, we're diffing text and then rendering the parts.
            return (
              <span key={index} style={style}>
                <ReactMarkdown
                  components={{
                    p: React.Fragment,
                    ul: "ul",
                    li: "li",
                    h1: "h1",
                    h2: "h2",
                    h3: "h3" /* add more as needed */,
                  }}
                >
                  {content}
                </ReactMarkdown>
              </span>
            );
          })}
        </div>

        {/* Optionally, display original and corrected side-by-side or just one */}
        {/* <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Original Resume (for reference)</h3>
          <div className="prose prose-sm max-w-none border p-4 rounded-md bg-gray-50 whitespace-pre-wrap">
            <ReactMarkdown>{feedback.original_resume}</ReactMarkdown>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ResumeFeedbackPage;
