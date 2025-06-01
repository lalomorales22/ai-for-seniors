import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  text: string;
  isUser: boolean;
  userName: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, isUser, userName }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`
        flex max-w-[80%] ${isUser 
          ? 'bg-blue-100 text-blue-800' 
          : 'bg-gray-100 text-gray-800'
        } rounded-2xl p-4 shadow-sm
      `}>
        <div className={`mr-3 ${isUser ? 'order-last ml-3 mr-0' : ''}`}>
          {isUser ? (
            <div className="bg-blue-200 p-2 rounded-full">
              <User className="text-blue-700\" size={24} />
            </div>
          ) : (
            <div className="bg-gray-200 p-2 rounded-full">
              <Bot className="text-gray-700" size={24} />
            </div>
          )}
        </div>
        
        <div>
          <div className="font-medium text-lg mb-1">
            {isUser ? userName : 'AI Helper'}
          </div>
          <div className="text-xl whitespace-pre-wrap">{text}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;