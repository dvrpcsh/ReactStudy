// Info.tsx
import React from 'react';

const Info: React.FC = React.memo(() => {
  console.log('✅ Info rendered');
  return <p>This component does not re-render when count changes.</p>;
});

export default Info;
