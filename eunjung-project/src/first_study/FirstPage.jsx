import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Parent from './Parent.jsx'
import NextPage from './NextPage.jsx'
import ParentCallBack from './ParentCallBack.jsx'
import LifeCycleDemo from './LifeCycleDemo.jsx'
import TimerComponent from './TimerComponent.jsx'
import ClickEventListener from './ClickEventListener.jsx'
import LayoutVsEffect from './LayoutVsEffect.jsx'

function FirstPage() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Parent/>} />
        <Route path="/TimerComponent" element={<TimerComponent/>} />
        <Route path="/next" element={<NextPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default FirstPage