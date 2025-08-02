import { useState } from "react";
import axios from "axios";

const FeedbackForm = ({ onSubmitSuccess }) => {
  const [form, setForm] = useState({ username: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmissionStatus(null);

    try {
      await axios.post("http://localhost:8080/api/feedback", form);
      setForm({ username: "", message: "" });
      setSubmissionStatus("success");

      setTimeout(() => {
        onSubmitSuccess && onSubmitSuccess();
      }, 1500);
    } catch (err) {
      console.error("Feedback submission error:", err);
      setSubmissionStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-purple-100 transform transition-all duration-500 ease-in-out hover:scale-[1.01]">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-800">
        Share Your Thoughts
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="sr-only">
            Your Name
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 shadow-sm text-gray-800 placeholder-gray-400"
            placeholder="Your Name (Optional)"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="message" className="sr-only">
            Your Message
          </label>
          <textarea
            id="message"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 shadow-sm text-gray-800 placeholder-gray-400 min-h-[120px]"
            placeholder="Your valuable feedback helps us improve..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-lg px-6 py-3 rounded-xl shadow-lg transition duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Sending Feedback...</span>
            </>
          ) : (
            <span>Submit Feedback</span>
          )}
        </button>

        {submissionStatus === "success" && (
          <div className="mt-4 text-center text-green-700 bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-center animate-fade-in">
            <svg
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Feedback submitted successfully! Thanks!
          </div>
        )}

        {submissionStatus === "error" && (
          <div className="mt-4 text-center text-red-700 bg-red-50 border border-red-200 rounded-xl p-3 flex items-center justify-center animate-fade-in">
            <svg
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Failed to submit feedback. Please try again.
          </div>
        )}
      </form>
    </div>
  );
};

export default FeedbackForm;
