import React from 'react';
import { Gift } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <Gift className="w-16 h-16 text-purple-600 mx-auto mb-4" />
      <h3 className="text-xl font-medium text-gray-900 mb-2">No wishes yet</h3>
      <p className="text-gray-500">
        Create your first wish by filling out the form above.
      </p>
    </div>
  );
};