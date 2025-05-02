export default function Child({counter, setCounter}){

    const handleIncrement = () => setCounter(counter + 1);

    return(
      <>
        <div>
          
          <button onClick={handleIncrement}>Increase</button>
        </div>
      </>
    )
  }

  