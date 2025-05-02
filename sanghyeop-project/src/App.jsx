import './App.css'
import MemoContainer from './components/MemoContainer';
import SideBar from './components/SideBar';
import MyComponent from './presentationExample/MyComponent'
import { useState } from 'react';

function App() {

    //const [value, setValue] = useState(0);

    return (
    /* props */
        /* 1.기본으로 props불러오기
        <MyComponent name="최상협" age="29" />
        */

        /* 2.비구조화 할당기법
        <MyComponent name="최상협" age="29" />
        */

         /*3.props 값이 없을 경우 디폴트값 설정
        <MyComponent />
        */

    /* state */
        <div>
            <h1>value: {value}</h1>
            <button onClick={() => {
                console.log('Increase value');
                setValue(value+1);
            }}
            >Increase value </button>
            <button onClick={() => {
                setValue(0);
            }}>Reset</button>
        </div>
    )
}


export default App





/* 2025-04-30 메모장프로젝트 베이직 프레임워크
function App() {
  const [memos, setMemos] = useState([
      {
        title: 'Memo1',
        content: 'This is memo 1',
        createdAt: 0, // 생성일시
        updatedAt: 0, // 수정일시
      },
      {
         title: 'Memo2',
         content: 'This is memo 1',
         createdAt: 0, // 생성일시
         updatedAt: 0, // 수정일시
      }
  ])

  return (
    <SideBar memos={memos}/>
    <MemoContainer />
  )
}
*/


