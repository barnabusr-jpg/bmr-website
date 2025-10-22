"use client";

import React, { useState, useEffect, ReactNode } from 'react';

interface NoSsrWrapperProps {
  children: ReactNode;
}

const NoSsrWrapper: React.FC<NoSsrWrapperProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Don't render anything on the server or initial client render
  }

  return <>{children}</>; // Render children only after mount
};

export default NoSsrWrapper;
