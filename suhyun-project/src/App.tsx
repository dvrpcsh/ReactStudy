import React, { useState } from 'react';
import Counter from './Counter';
import Info from './Info';

// Virtual Dom 예시
const App: React.FC = () => {
  const [count, setCount] = useState(0);

  const increase = () => setCount((prev) => prev + 1);

  return (
    <div>
      <button onClick={increase}>Increase</button>
      <Counter count={count} />
      <Info />
    </div>
  );
};

export default App;
