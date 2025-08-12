import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import "../styles/studentDashboard.css"

export default function StudentDashboard() {
  const [questions, setQuestions] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await API.get('/questions');
      setQuestions(res.data);
    })();
  }, []);

  return (
  <div className="student-dashboard">
    <h2>Student Dashboard</h2>
    <p>Total questions available: {questions.length}</p>
    <button className="start-exam-btn" onClick={() => nav('/exam')}>
      Start Exam
    </button>
  </div>
);

}
