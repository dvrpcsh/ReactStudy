import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Child({counter, setCounter}){

  const navigate = useNavigate();

    const handleIncrement = () => setCounter(counter + 1);

        // 마운트 시 실행 (componentDidMount)
        useEffect(() => {
          console.log('Child 컴포넌트가 마운트됨');
      
          return () => {
            console.log('Child 컴포넌트가 언마운트됨');
          };
        }, []);

    const changePage = () => {
      navigate('/next');
    }

    return(
      <>
        <div>
          
          <button onClick={handleIncrement}>Increase</button>
          <button onClick={changePage}>Next Page</button>
        </div>
      </>
    )
  }

  