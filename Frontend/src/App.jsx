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
import { HomeIcon } from "lucide-react";

function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
  const navigate = useNavigate();

  const fetchFeedbacks = async () => {
    setLoadingFeedbacks(true);
    try {
      const res = await axios.get("https://feedbackai-2.onrender.com/api/feedback");
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
      <h1 onClick={() => navigate("/") }>
        <HomeIcon
          className="relative animate-none text-violet-600 cursor-pointer"
          size={46}
        />
      </h1>
      <header className="max-w-6xl mx-auto flex justify-center items-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
          Customer Feedback
        </h1>
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
