
import { useEffect } from 'react'


export default function NextPage() {

    // 마운트 시 실행 (componentDidMount)
    useEffect(() => {
      console.log('NextPage 컴포넌트가 마운트됨');
  
      return () => {
        console.log('NextPage 컴포넌트가 언마운트됨');
      };
    }, []);

  return (
    <>
      <div>
            I am in NextPage!!!
      </div>
    </>
  )
}

