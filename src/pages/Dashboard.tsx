import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import FeatureCard from '../components/FeatureCard';
import { features } from '../data/features';

const Dashboard: React.FC = () => {
  const { userName } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userName) {
      navigate('/name');
    }
  }, [userName, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-6 mb-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              AIforSeniors
            </h1>
            <div className="text-xl text-gray-600">
              Welcome, {userName}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pb-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl text-gray-700">
            How can I help you today?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              id={feature.id}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              hoverColor={feature.hoverColor}
              textColor={feature.textColor}
              icon={feature.icon}
            />
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-6">
          <div className="flex justify-center space-x-8 text-gray-600">
            <button className="hover:text-gray-900 transition-colors">About</button>
            <button className="hover:text-gray-900 transition-colors">Privacy</button>
            <button className="hover:text-gray-900 transition-colors">Terms</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;