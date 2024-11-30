import React from 'react';
import { Circle } from 'lucide-react';

interface PriorityDotsProps {
  priority: number;
}

export const PriorityDots: React.FC<PriorityDotsProps> = ({ priority }) => {
  const getColor = (index: number) => {
    if (index >= priority) return 'text-gray-200';
    switch (priority) {
      case 1: return 'text-purple-200';
      case 2: return 'text-purple-300';
      case 3: return 'text-purple-400';
      case 4: return 'text-purple-500';
      case 5: return 'text-purple-600';
      default: return 'text-gray-200';
    }
  };

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => (
        <Circle
          key={index}
          className={`w-3 h-3 fill-current ${getColor(index)}`}
        />
      ))}
    </div>
  );
};