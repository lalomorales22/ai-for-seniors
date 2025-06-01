import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { features } from '../data/features';
import { Send, ArrowLeft, Calendar, Search, FolderOpen, Download, Clock, Bot } from 'lucide-react';
import ChatMessage from '../components/ChatMessage';
import { callAI } from '../services/aiService';

interface Message {
  text: string;
  isUser: boolean;
}

interface SavedFile {
  name: string;
  content: string;
}

const FeatureChat: React.FC = () => {
  const { featureId } = useParams<{ featureId: string }>();
  const { userName } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [savedFiles, setSavedFiles] = useState<SavedFile[]>([]);
  const [songLength, setSongLength] = useState('2:00');
  const [savedSongs, setSavedSongs] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const feature = features.find(f => f.id === featureId);

  useEffect(() => {
    if (!userName) {
      navigate('/name');
      return;
    }
    
    if (!feature) {
      navigate('/dashboard');
      return;
    }

    setMessages([{ text: `Hi ${userName}! ${feature.greeting}`, isUser: false }]);
  }, [featureId, userName, navigate, feature]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const renderFeatureContent = () => {
    switch (featureId) {
      case 'create-videos':
        return (
          <div className="flex gap-8">
            <div className="w-64 bg-indigo-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-indigo-800 mb-4">Video Types</h3>
              <div className="space-y-2">
                {['Tutorial', 'Story', 'Animation', 'Presentation'].map(category => (
                  <button
                    key={category}
                    className={`w-full p-3 rounded-lg text-left flex items-center gap-2 ${
                      selectedCategory === category ? 'bg-indigo-200 text-indigo-800' : 'hover:bg-indigo-100'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <FolderOpen size={20} />
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-grow bg-white p-6 rounded-xl">
              <textarea
                className="w-full h-40 text-xl p-4 rounded-xl border-2 border-indigo-200 focus:border-indigo-400 mb-4"
                placeholder="Describe the video you'd like to create..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button className="bg-indigo-500 text-white px-6 py-3 rounded-xl text-xl">
                Generate Video
              </button>
            </div>
          </div>
        );

      case 'create-software':
        return (
          <div className="flex gap-8">
            <div className="w-1/2 bg-orange-50 p-6 rounded-xl">
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <ChatMessage 
                    key={index} 
                    text={message.text} 
                    isUser={message.isUser} 
                    userName={userName}
                  />
                ))}
                {isLoading && (
                  <div className="flex items-center text-gray-500 text-xl">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    Thinking...
                  </div>
                )}
              </div>
              <div className="mt-6">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Describe what you'd like to create..."
                  className="w-full text-xl p-4 rounded-xl border-2 border-orange-200 focus:border-orange-400 min-h-[100px]"
                />
                <button
                  onClick={handleSendMessage}
                  className="mt-4 bg-orange-500 text-white px-6 py-3 rounded-xl text-xl"
                >
                  Send
                </button>
              </div>
            </div>
            <div className="w-1/2 bg-white p-6 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Generated Files</h3>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <Download size={20} />
                  Download All
                </button>
              </div>
              <div className="space-y-4">
                {savedFiles.map((file, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">{file.name}</span>
                      <button className="text-blue-500 hover:text-blue-600">
                        <Download size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'create-songs':
        return (
          <div className="space-y-8">
            <div className="bg-pink-50 p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-pink-800 mb-6">Create a New Song</h3>
              <div className="space-y-6">
                <textarea
                  className="w-full h-40 text-xl p-4 rounded-xl border-2 border-pink-200 focus:border-pink-400"
                  placeholder="Describe the song you'd like to create..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <div className="flex items-center gap-4">
                  <label className="text-xl text-pink-800">Length:</label>
                  <select
                    value={songLength}
                    onChange={(e) => setSongLength(e.target.value)}
                    className="text-xl p-2 rounded-lg border-2 border-pink-200"
                  >
                    <option>1:00</option>
                    <option>2:00</option>
                    <option>3:00</option>
                    <option>4:00</option>
                  </select>
                  <button className="bg-pink-500 text-white px-6 py-3 rounded-xl text-xl ml-auto">
                    Generate Song
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {savedSongs.map((song, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow">
                  <h4 className="text-xl font-semibold mb-2">{song}</h4>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={20} />
                    <span>2:30</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'health-questions':
        return (
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <Bot size={64} className="text-emerald-600" />
            </div>
            <div className="w-full max-w-2xl">
              <div className="space-y-6 mb-6">
                {messages.map((message, index) => (
                  <ChatMessage 
                    key={index} 
                    text={message.text} 
                    isUser={message.isUser} 
                    userName={userName}
                  />
                ))}
                {isLoading && (
                  <div className="flex items-center text-gray-500 text-xl">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    Thinking...
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask your health question here..."
                  className="flex-grow text-xl p-4 rounded-xl border-2 border-emerald-200 focus:border-emerald-400 min-h-[100px]"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-emerald-500 text-white p-4 rounded-xl self-end"
                >
                  <Send size={28} />
                </button>
              </div>
            </div>
          </div>
        );

      case 'idea-generator':
        return (
          <div className="flex flex-col items-center max-w-2xl mx-auto">
            <div className="w-full bg-yellow-50 p-8 rounded-xl text-center">
              <h3 className="text-3xl font-bold text-yellow-800 mb-8">Enter One Word</h3>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your word here..."
                className="w-full text-2xl p-6 rounded-xl border-2 border-yellow-200 focus:border-yellow-400 text-center mb-8"
              />
              <button
                onClick={handleSendMessage}
                className="bg-red-500 hover:bg-red-600 text-white text-2xl font-bold px-12 py-6 rounded-xl transform transition-transform hover:scale-105"
              >
                Generate Ideas
              </button>
            </div>
            <div className="w-full mt-8">
              {messages.map((message, index) => (
                <ChatMessage 
                  key={index} 
                  text={message.text} 
                  isUser={message.isUser} 
                  userName={userName}
                />
              ))}
            </div>
          </div>
        );

      case 'good-news':
        return (
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-green-100 p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Good News</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-xl">Local community plants 1000 trees in city park</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-100 p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Better News</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-xl">Scientists discover breakthrough in renewable energy</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'hobby-ideas':
        return (
          <div className="bg-purple-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">Brainstorm Your Hobby Ideas</h3>
            <textarea
              className="w-full h-40 text-xl p-4 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:ring focus:ring-purple-200"
              placeholder="Take a minute to write down all your hobby ideas... Press Enter when you're ready!"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
        );

      case 'recipe-finder':
        return (
          <div className="space-y-8">
            <div className="flex gap-4">
              <input
                type="search"
                className="flex-grow text-xl p-4 rounded-xl border-2 border-orange-200 focus:border-orange-400"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-orange-500 text-white p-4 rounded-xl">
                <Search size={24} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-xl shadow">
                <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" alt="Recipe" className="w-full h-48 object-cover rounded-lg mb-4" />
                <h4 className="text-xl font-semibold">Easy Vegetable Soup</h4>
              </div>
            </div>
          </div>
        );

      case 'daily-planner':
        return (
          <div className="bg-blue-50 p-8 rounded-xl">
            <div className="flex items-center gap-4 mb-8">
              <Calendar size={32} className="text-blue-600" />
              <h3 className="text-2xl font-bold text-blue-800">Your Daily Schedule</h3>
            </div>
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="w-full text-xl p-4 rounded-xl border-2 border-blue-200 focus:border-blue-400 mb-6"
            />
          </div>
        );

      case 'create-images':
        return (
          <div className="flex gap-8">
            <div className="w-64 bg-cyan-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-cyan-800 mb-4">Categories</h3>
              <div className="space-y-2">
                {['Nature', 'Animals', 'Landscapes', 'Art', 'People'].map(category => (
                  <button
                    key={category}
                    className={`w-full p-3 rounded-lg text-left flex items-center gap-2 ${
                      selectedCategory === category ? 'bg-cyan-200 text-cyan-800' : 'hover:bg-cyan-100'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <FolderOpen size={20} />
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-grow bg-white p-6 rounded-xl">
              <textarea
                className="w-full h-40 text-xl p-4 rounded-xl border-2 border-cyan-200 focus:border-cyan-400 mb-4"
                placeholder="Describe the image you'd like to create..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button className="bg-cyan-500 text-white px-6 py-3 rounded-xl text-xl">
                Generate Image
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {messages.map((message, index) => (
              <ChatMessage 
                key={index} 
                text={message.text} 
                isUser={message.isUser} 
                userName={userName}
              />
            ))}
            {isLoading && (
              <div className="flex items-center text-gray-500 text-xl">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        );
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;
    
    const userMessage = { text: inputText, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    try {
      const response = await callAI(featureId || '', userName, inputText);
      setTimeout(() => {
        setMessages(prev => [...prev, { text: response, isUser: false }]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "I'm having trouble thinking right now. Could you try again in a moment?", 
        isUser: false 
      }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className={`py-4 shadow-md ${feature?.color} ${feature?.textColor}`}>
        <div className="container mx-auto px-4 flex items-center">
          <button 
            onClick={() => navigate('/dashboard')}
            className="mr-4 p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Go back to dashboard"
          >
            <ArrowLeft size={32} />
          </button>
          <h1 className="text-3xl font-bold">{feature?.title}</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          {renderFeatureContent()}
        </div>

        {!['good-news', 'daily-planner', 'create-images'].includes(featureId || '') && (
          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="flex items-end gap-4">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message here..."
                className="flex-grow text-xl p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 min-h-[100px] resize-none"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-4 rounded-xl transition-colors"
                aria-label="Send message"
              >
                <Send size={28} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FeatureChat;