import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center">
      <header className="w-full bg-white shadow-md py-16 mb-16">
        <div className="container mx-auto px-4 flex justify-center">
          <h1 className="text-7xl md:text-8xl font-bold text-blue-700 flex items-center gap-8">
            <Heart className="text-red-500" size={96} />
            AIforSeniors
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 flex-grow">
        <section className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">Your Friendly AI Helper</h2>
          <p className="text-3xl md:text-4xl text-gray-600 max-w-4xl mx-auto mb-16">
            We've made artificial intelligence simple and helpful, designed especially for you.
          </p>
          
          <Link 
            to="/name" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-4xl font-bold py-8 px-16 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            Click Here to Start
          </Link>
        </section>

        <section className="mb-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Is AIforSeniors free to use?</h3>
              <p className="text-2xl text-gray-600">Yes, it's completely free!</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Do I need to create an account?</h3>
              <p className="text-2xl text-gray-600">No account needed. Just enter your first name to start.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Is it hard to use?</h3>
              <p className="text-2xl text-gray-600">If you can click a button, you can use our app!</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">What can I do with this app?</h3>
              <p className="text-2xl text-gray-600">Ask questions, write messages, find recipes, create art, and much more!</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-white shadow-inner py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl text-gray-600">
            AIforSeniors — Made with care for you
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;