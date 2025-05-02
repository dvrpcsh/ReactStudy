import { useState } from 'react'
import ChildCallBack from './ChildCallBack.jsx'

function ParentCallBack() {

  const [counter, setCounter] = useState(0);

  const handleIncrement = () => setCounter(counter + 1);

  return (
    <>
      <div>
        <p>{counter}</p>
        <ChildCallBack handleIncrement={handleIncrement}></ChildCallBack>
      </div>
    </>
  )
}
export default ParentCallBack