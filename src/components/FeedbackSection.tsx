// src/components/FeedbackSection.tsx
import React from "react";
import { type FeedbackCategory } from "../services/mockApi";
import { AlertTriangle, Lightbulb, CheckCircle } from "lucide-react";

interface FeedbackSectionProps {
  title: string;
  categoryData: FeedbackCategory;
  icon: React.ReactNode;
}

const RatingBar: React.FC<{ rating: number }> = ({ rating }) => {
  const percentage = Math.max(0, Math.min(100, Math.round(rating))); // Ensure 0-100
  let barColor = "bg-red-500";
  if (percentage >= 75) {
    barColor = "bg-green-500";
  } else if (percentage >= 50) {
    barColor = "bg-yellow-500";
  }

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">Overall Score</span>
        <span
          className={`text-lg font-bold ${
            percentage >= 75
              ? "text-green-600"
              : percentage >= 50
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {percentage} / 100
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`${barColor} h-3 rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const FeedbackList: React.FC<{
  items: string[];
  type: "critique" | "suggestion";
}> = ({ items, type }) => {
  const Icon = type === "critique" ? AlertTriangle : Lightbulb;
  const iconColor = type === "critique" ? "text-red-500" : "text-green-500";
  const title =
    type === "critique" ? "Areas for Improvement" : "Actionable Suggestions";

  return (
    <div className="mt-4">
      <h4 className="text-md font-semibold text-gray-700 mb-2 flex items-center">
        <Icon size={18} className={`${iconColor} mr-2`} />
        {title}
      </h4>
      <ul className="space-y-2 pl-1">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-gray-600 flex">
            <CheckCircle
              size={16}
              className="text-gray-400 mr-2 mt-0.5 flex-shrink-0"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  title,
  categoryData,
  icon,
}) => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-6">
      <div className="flex items-center mb-5">
        <span className="p-2 bg-blue-100 text-blue-600 rounded-full mr-3">
          {icon}
        </span>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <RatingBar rating={categoryData.rating} />
      <hr className="my-4" />
      {categoryData.critique && categoryData.critique.length > 0 && (
        <FeedbackList items={categoryData.critique} type="critique" />
      )}
      {categoryData.suggestions && categoryData.suggestions.length > 0 && (
        <FeedbackList items={categoryData.suggestions} type="suggestion" />
      )}
    </div>
  );
};

export default FeedbackSection;
