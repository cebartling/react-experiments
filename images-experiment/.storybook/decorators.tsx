import React from 'react';
import '../src/index.css'; // Your global styles

export const withContainer = (Story: React.ComponentType) => (
  <div className="p-4">
    <Story />
  </div>
);
