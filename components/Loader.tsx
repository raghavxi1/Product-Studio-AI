import React from 'react';

interface LoaderProps {
    progressText?: string;
}

export const Loader: React.FC<LoaderProps> = ({ progressText }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col justify-center items-center">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin"></div>
      {progressText && (
        <p className="mt-4 text-white text-lg font-semibold">{progressText}</p>
      )}
    </div>
  );
};