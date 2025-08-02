import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDown } from "lucide-react";
export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-yellow-100 via-red-100 to-white px-6 py-16">
    
        <h1 className="relative z-10 text-4xl md:text-6xl font-extrabold mb-5 leading-tight text-gray-900 drop-shadow-sm max-w-4xl animate-fade-in-up">
          Turn Customer Words into{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-indigo-600">
            Actionable AI Insights
          </span>
        </h1>
        <p className="relative z-10 text-lg md:text-xl mb-8 max-w-xl text-gray-700 animate-fade-in-up animation-delay-300">
          Analyze feedback instantly with cutting-edge AI — no sign-up needed,
          just results.
        </p>

        <ArrowDown
          className="relative z-10 mt-20 animate-bounce text-violet-600"
          size={36}
        />
        <button
          onClick={() => navigate("/feedback")}
          className="relative z-10 bg-violet-600 hover:bg-violet-700 text-white text-lg px-8 py-4 rounded-full shadow-xl transition duration-300 transform hover:scale-105 active:scale-95 animate-fade-in-up animation-delay-600 group"
        >
          Try Now for Free
        </button>
      </section>
    </div>
  );
}
