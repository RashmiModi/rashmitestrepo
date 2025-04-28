// components/ClientOnlyComponent.tsx
'use client';

import { useState, useEffect } from 'react';

const ClientOnlyComponent = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Only runs on the client
  }, []);

  if (!isClient) return null; // Render nothing on the server

  return <>{children}</>; // Render children only on the client
};

export default ClientOnlyComponent; // Ensure this is a default export
