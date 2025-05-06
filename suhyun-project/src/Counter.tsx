// Counter.tsx
import React from 'react';

type CounterProps = {
  count: number;
};

const Counter: React.FC<CounterProps> = ({ count }) => {
  console.log('🔄 Counter rendered');
  return <h1>Count: {count}</h1>;
};

export default Counter;
