import { useState } from 'react';

export default function UseStateExample() {
  const [count, setCount] = useState(0);

  const handleNonFunctionalUpdate = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  const handleFunctionalUpdate = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h2>Count: {count}</h2>
      <button onClick={handleNonFunctionalUpdate}>
        Add 3 (Non-Functional setCount)
      </button>
      <button onClick={handleFunctionalUpdate} style={{ marginLeft: '10px' }}>
        Add 3 (Functional setCount)
      </button>
    </div>
  );
}
