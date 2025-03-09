import React from 'react';
import AppHeader from '../components/features/common/app-header';

interface WrapperProps {
    children: React.ReactNode;
}

const BaseWrapper: React.FC<WrapperProps> = ({ children }: WrapperProps) => {
  return (
    <div>
      <AppHeader />
      <div>
        {children}
      </div>
    </div>
  );
};

export default BaseWrapper;
