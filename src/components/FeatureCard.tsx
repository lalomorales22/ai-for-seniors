import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle, 
  PenTool, 
  Sun, 
  BookOpen, 
  Heart, 
  Utensils, 
  Calendar,
  Image,
  Video,
  Package,
  Music,
  Lightbulb,
  Brain
} from 'lucide-react';

interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  color: string;
  hoverColor: string;
  textColor: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  id, 
  title, 
  description, 
  color, 
  hoverColor,
  textColor,
  icon 
}) => {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (icon) {
      case 'HelpCircle':
        return <HelpCircle size={32} />;
      case 'PenTool':
        return <PenTool size={32} />;
      case 'Sun':
        return <Sun size={32} />;
      case 'BookOpen':
        return <BookOpen size={32} />;
      case 'Heart':
        return <Heart size={32} />;
      case 'Utensils':
        return <Utensils size={32} />;
      case 'Calendar':
        return <Calendar size={32} />;
      case 'Image':
        return <Image size={32} />;
      case 'Video':
        return <Video size={32} />;
      case 'Package':
        return <Package size={32} />;
      case 'Music':
        return <Music size={32} />;
      case 'Lightbulb':
        return <Lightbulb size={32} />;
      case 'Brain':
        return <Brain size={32} />;
      default:
        return <HelpCircle size={32} />;
    }
  };

  const handleClick = () => {
    navigate(`/feature/${id}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        ${color} 
        hover:${hoverColor} 
        ${textColor} 
        p-6 
        rounded-2xl 
        shadow-sm
        hover:shadow-md 
        transition-all 
        duration-300 
        transform 
        hover:scale-102 
        w-full 
        text-left
        flex
        flex-col
        items-center
        text-center
        min-h-[200px]
        justify-center
      `}
      aria-label={`Open ${title} feature`}
    >
      <div className="mb-4 p-3 bg-white/30 rounded-xl">
        {getIcon()}
      </div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-lg opacity-90">{description}</p>
    </button>
  );
};

export default FeatureCard;