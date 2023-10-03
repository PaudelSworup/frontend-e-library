import React from "react";
import { Link } from "react-router-dom";
import LandingComponents from "./LandingComponents";

const LandingPage = () => {
  return (
    <div
      className="min-h-screen bg-gray-100"
      style={{
        backgroundImage:
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("https://images.pexels.com/photos/3847620/pexels-photo-3847620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <nav className="flex flex-wrap items-center justify-between bg-black p-4">
        <div className="flex items-center">
          <h3 className="text-3xl font-bold text-shadow-lg italic animate-pulse text-white">
            bookNest
          </h3>
        </div>
        <div className="flex items-center mt-4 sm:mt-0">
          <Link
            to="/register"
            className="mr-2 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded"
          >
            Login
          </Link>
        </div>
      </nav>
      <div className="container flex-grow mx-auto py-16 px-5">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Get your favorite Books with some recommendation
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <LandingComponents
            h2="Account Feature"
            p="With your account, you can request up to three books in a day.
            Once a book is approved, there's no need for book returns; you can simply download it directly and receive notifications for your approved books. Enjoy hassle-free access to your titles!"
          />

          <LandingComponents
            h2="Recommendations"
            p=" Discover personalized book recommendations based on your choosed categories and ratings preferences. Our recommendation system ensures you find books
            that match your interests."
          />

          <LandingComponents
            h2="Discover Genres"
            p=" Discover Your favorite genres books and search for your book with binary search algorithm"
          />

          <LandingComponents
            h2="Strong Recommendations Algorithms"
            p="Our system ensures you get recommendation based on your ratings, your choosed categories and some of the strong recommendations technique used are KNN, Cosine similarity, Naive bayes classifier from NLP and Binary search for searching"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
