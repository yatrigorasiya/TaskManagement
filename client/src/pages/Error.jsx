import React from "react";
import { useNavigate } from "react-router-dom";


export const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl font-semibold text-gray-800 mb-2">Page Not Found</p>
        <p className="text-gray-600 mb-6">Sorry, the page you are looking for doesn't exist.</p>
        <button
          onClick={() => navigate("/register")}
          className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 px-4 py-2 rounded-xl"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};


