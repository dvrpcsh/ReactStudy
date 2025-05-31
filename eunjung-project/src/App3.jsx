import {
  BrowserRouter, Routes, Route, Link,
  useNavigate, useParams, useLocation
} from 'react-router-dom';

function App3() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/user/123" state={{ from: 'nav' }}>User 123</Link>
      </nav>
      <Routes>
        <Route path="/user/:id" element={<User />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App3

function User() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <h2>유저 ID: {id}</h2>
      <p>이동해온 경로: {JSON.stringify(location.state)}</p>
      <button onClick={() => navigate('/dashboard')}>
        대시보드로 이동
      </button>
    </div>
  );
}

function Dashboard() {
  return <h2>대시보드</h2>;
}
