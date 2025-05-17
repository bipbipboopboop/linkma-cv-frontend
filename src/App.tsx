// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import ResumeFeedbackPage from "./pages/ResumeFeedbackPage";
import RecommendedJobsPage from "./pages/RecommendedJobsPage";
import JobDetailPage from "./pages/JobDetailPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="font-sans">
        {" "}
        {/* Apply a default font family if needed */}
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/resume/:resumeId" element={<ResumeFeedbackPage />} />
          <Route
            path="/resume/:resumeId/jobs"
            element={<RecommendedJobsPage />}
          />
          <Route
            path="/resume/:resumeId/jobs/:jobId"
            element={<JobDetailPage />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />{" "}
          {/* Fallback route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
