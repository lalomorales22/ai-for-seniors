import React from 'react';
import { 
  HelpCircle, 
  PenTool, 
  Sun, 
  BookOpen, 
  Heart, 
  Utensils, 
  Calendar, 
  Music 
} from 'lucide-react';

interface FeaturePreviewProps {
  title: string;
  description: string;
  color: string;
  textColor: string;
  icon: string;
}

const FeaturePreview: React.FC<FeaturePreviewProps> = ({ 
  title, 
  description, 
  color, 
  textColor,
  icon 
}) => {
  // Map string icon names to actual Lucide icons
  const getIcon = () => {
    switch (icon) {
      case 'HelpCircle':
        return <HelpCircle size={36} />;
      case 'PenTool':
        return <PenTool size={36} />;
      case 'Sun':
        return <Sun size={36} />;
      case 'BookOpen':
        return <BookOpen size={36} />;
      case 'Heart':
        return <Heart size={36} />;
      case 'Utensils':
        return <Utensils size={36} />;
      case 'Calendar':
        return <Calendar size={36} />;
      case 'Music':
        return <Music size={36} />;
      default:
        return <HelpCircle size={36} />;
    }
  };

  return (
    <div className={`${color} ${textColor} p-6 rounded-xl shadow-md transition-transform duration-300 hover:scale-105`}>
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">
          {getIcon()}
        </div>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-xl">{description}</p>
      </div>
    </div>
  );
};

export default FeaturePreview;