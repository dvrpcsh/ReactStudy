import './App.css'
import MemoContainer from './components/MemoContainer';
import SideBar from './components/SideBar';
import MyComponent from './presentationExample/MyComponent'

function App() {
    return
    /* 1.기본으로 props불러오기
    <MyComponent name="최상협" age="29" />
    */

    /* 2.비구조화 할당기법
    <MyComponent name="최상협" age="29" />
    */

     //3.props 값이 없을 경우 디폴트값 설정
    <MyComponent name="최상협" />

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


