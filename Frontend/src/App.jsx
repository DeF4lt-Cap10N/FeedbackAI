import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import { useEffect, useState } from "react";
import axios from "axios";
import { Home as HomeIcon } from "lucide-react";

function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
  const navigate = useNavigate();

  const fetchFeedbacks = async () => {
    setLoadingFeedbacks(true);
    try {
      const res = await axios.get("http://localhost:8080/api/feedback");
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Failed to fetch feedbacks:", err);
    } finally {
      setLoadingFeedbacks(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
          Customer Feedback
        </h1>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 transform hover:scale-105 active:scale-95 group"
        >
          <HomeIcon className="h-5 w-5 mr-2" />
          Back to Home
        </button>
      </header>

      <section className="mb-16">
        <div className="max-w-3xl mx-auto">
          <FeedbackForm onSubmitSuccess={fetchFeedbacks} />
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto">
          {loadingFeedbacks ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-xl border border-indigo-100">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-dashed border-indigo-500 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading feedback...</p>
            </div>
          ) : (
            <FeedbackList feedbacks={feedbacks} />
          )}
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
