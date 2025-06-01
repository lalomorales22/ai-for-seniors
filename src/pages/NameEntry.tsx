import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { SmilePlus } from 'lucide-react';

const NameEntry: React.FC = () => {
  const { setUserName } = useContext(UserContext);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setUserName(name.trim());
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-xl w-full">
        <div className="text-center mb-8">
          <SmilePlus className="mx-auto text-blue-500 mb-4" size={64} />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Hello!</h1>
          <p className="text-2xl text-gray-600 mt-2">What's your first name?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-2xl px-4 py-6 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your first name"
              aria-label="Your first name"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white text-2xl font-semibold py-4 rounded-xl transition-colors duration-300"
            disabled={!name.trim()}
          >
            That's Me!
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameEntry;