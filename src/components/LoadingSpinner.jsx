import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="inline-flex items-center space-x-2">
      <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-500 border-t-transparent"></div>
      <span className="text-sm text-gray-600">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;