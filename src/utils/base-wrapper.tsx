import React from 'react';

interface WrapperProps {
    children: React.ReactNode;
}

const BaseWrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="p-4 border rounded-md shadow-md text-center text-text">
      {children}
    </div>
  );
};

export default BaseWrapper;
