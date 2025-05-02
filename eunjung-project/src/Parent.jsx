import { useState } from 'react'
import Child from './Child.jsx'

export default function Parent() {

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

