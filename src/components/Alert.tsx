import React from 'react';
import { AlertCircle, XCircle } from 'lucide-react';

interface AlertProps {
  message: string;
  type?: 'error' | 'success';
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ 
  message, 
  type = 'error',
  onClose 
}) => {
  const styles = {
    error: {
      container: 'bg-red-50 border-red-400 text-red-700',
      icon: 'text-red-400',
    },
    success: {
      container: 'bg-green-50 border-green-400 text-green-700',
      icon: 'text-green-400',
    },
  };

  return (
    <div className={`p-4 mb-4 rounded-md border ${styles[type].container}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className={`h-5 w-5 ${styles[type].icon}`} />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className={`inline-flex ${styles[type].icon} hover:opacity-75`}
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};