import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/** 
 * For First Study
*/
 import Parent from './first_study/Parent.jsx'
 import NextPage from './first_study/NextPage.jsx'
//import ParentCallBack from './first_study/ParentCallBack.jsx'
//import LifeCycleDemo from './first_study/LifeCycleDemo.jsx'
import TimerComponent from './first_study/TimerComponent.jsx'
//import ClickEventListener from './first_study/ClickEventListener.jsx'
//import LayoutVsEffect from './first_study/LayoutVsEffect.jsx'

function App() {

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

export default App
