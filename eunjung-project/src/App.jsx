import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstPage from './first_study/FirstPage';
import Course from './1주차과제/Course';

function App() {

  return (
    <>
      <div>
        {/* <FirstPage></FirstPage> */}
        <Course></Course>
      </div>
    </>
  )
}

export default App
