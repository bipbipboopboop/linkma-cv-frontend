// src/components/ErrorAlert.tsx
import React from "react";
import { AlertTriangle } from "lucide-react";

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4"
      role="alert"
    >
      <strong className="font-bold mr-1">
        <AlertTriangle size={20} className="inline-block mr-2" />
        Error:
      </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorAlert;
