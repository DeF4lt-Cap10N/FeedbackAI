import React from "react";

const FeedbackItem = ({ feedback }) => {
  
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <li className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-indigo-100 flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <p className="font-bold text-lg text-indigo-700 break-words pr-4">
          {feedback.username || "Anonymous User"}
        </p>

        <p className="text-xs text-gray-500 flex-shrink-0">
          {formatDate(feedback.createdAt)}
        </p>
      </div>

      <p className="text-gray-800 leading-relaxed mb-4 flex-grow">
        {feedback.message}
      </p>

      {feedback.analysis && (
        <div className="mt-auto pt-4 border-t border-gray-100">
          <p className="text-sm font-medium text-green-600 flex items-center">
            AI Insight:
          </p>
          <p className="text-sm italic text-green-700 mt-1">
            {feedback.analysis}
          </p>
        </div>
      )}
    </li>
  );
};

export default FeedbackItem;
