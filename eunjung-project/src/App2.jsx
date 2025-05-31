import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HelloAbout from './third_study/HelloAbout';
import Counter from './third_study/Counter';
import Test from './third_study/Test';

function App2() {

  return (
    <>
        <Router>
            <div className="App">
                <Test />
                <HelloAbout/>
                <nav>
                <Link to="/">link</Link> | &nbsp;
                <Link to="/about">about link</Link> | &nbsp;
                <Link to="/count">count link</Link>
                </nav>
                <Routes>
                <Route path="/" element={<Test />} />
                <Route path="/about" element={<HelloAbout/>} />
                <Route path="/count" element={<Counter/>} />
                </Routes>
            </div>
        </Router>
    </>
  )
}

export default App2
