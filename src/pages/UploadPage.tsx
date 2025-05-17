// src/pages/UploadPage.tsx
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { UploadCloud, FileText } from "lucide-react";
import { uploadResumeAPI } from "../services/mockApi";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const currentFile = acceptedFiles[0];
      if (currentFile.type === "application/pdf") {
        setFile(currentFile);
        setError(null); // Clear previous errors
      } else {
        setError("Invalid file type. Please upload a PDF.");
        setFile(null);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, you'd send `file` to Alibaba OSS
      // For now, we use a mock API that just needs the file object for its console log
      const response = await uploadResumeAPI(file);
      navigate(`/resume/${response.resumeId}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">LinkmaCV</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-8">
          Upload Your Resume
        </h2>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-10 mb-6 cursor-pointer transition-colors
            ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
        >
          <input {...getInputProps()} />
          <UploadCloud size={48} className="mx-auto text-gray-400 mb-3" />
          {isDragActive ? (
            <p className="text-blue-600">Drop the PDF here ...</p>
          ) : (
            <p className="text-gray-500">
              Drag 'n' drop a PDF file here, or click to select file
            </p>
          )}
        </div>

        {file && (
          <div className="mb-6 p-3 bg-gray-100 rounded-md flex items-center justify-between">
            <div className="flex items-center">
              <FileText size={24} className="text-blue-500 mr-2" />
              <span className="text-gray-700">{file.name}</span>
            </div>
            <button
              onClick={() => setFile(null)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        )}

        {isLoading && <LoadingSpinner />}
        <ErrorAlert message={error || ""} />

        <button
          onClick={handleUpload}
          disabled={!file || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-opacity
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : "Get Feedback"}
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
