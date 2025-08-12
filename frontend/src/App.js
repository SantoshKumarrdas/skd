import React, { useEffect, useState } from 'react';
import { Routes, Route   } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentDashboard from './pages/StudentDashboard';
import TakeExam from './pages/TakeExam';
import ResultPage from './pages/ResultPage';
import AdminDashboard from './pages/AdminDashboard';
import Leaderboard from './pages/Leaderboard';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/student" element={<PrivateRoute><StudentDashboard/></PrivateRoute>} />
          <Route path="/exam" element={<PrivateRoute><TakeExam/></PrivateRoute>} />
          <Route path="/result/:id" element={<PrivateRoute><ResultPage/></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute adminOnly><AdminDashboard/></PrivateRoute>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
          <Route path="/result" element={<ResultPage/>} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
