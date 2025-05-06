import { useState, useEffect } from 'react'
import Child from './Child.jsx'

export default function Parent() {

    // 마운트 시 실행 (componentDidMount)
    useEffect(() => {
      console.log('Parent 컴포넌트가 마운트됨');
  
      return () => {
        console.log('Parent 컴포넌트가 언마운트됨');
      };
    }, []);

  const [counter, setCounter] = useState(0);

  return (
    <>
      <div>
        <p>{counter}</p>
        <Child counter={counter} setCounter={setCounter}></Child>
      </div>
    </>
  )
}

