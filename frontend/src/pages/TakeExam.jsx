import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import "../styles/exam.css"

export default function TakeExam() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // questionId -> selectedIndex
  const [timeLeft, setTimeLeft] = useState(60 * 10); // 10 minutes default
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await API.get('/questions');
      setQuestions(res.data);
    })();
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(t);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  // eslint-disable-next-line
  }, [questions]);

  const select = (qId, idx) => {
    setAnswers(prev => ({ ...prev, [qId]: idx }));
  };

  const submitExam = async () => {
    try {
      const payload = Object.keys(answers).map(qId => ({ questionId: qId, selectedIndex: answers[qId] }));
      const res = await API.post('/results', { answers: payload });
      alert(`Submitted. Score: ${res.data.score}/${res.data.total}`);
      nav('/student');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

 return (
  <div className="exam-page">
    <h2>Exam</h2>
    <div className="timer">
      Time left: {Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2, '0')}
    </div>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitExam();
      }}
    >
      {questions.map((q, idx) => (
        <div className="question-card" key={q._id}>
          <div className="question-text">
            <b>Q{idx + 1}.</b> {q.question}
          </div>
          {q.options.map((opt, i) => (
            <div className="option" key={i}>
              <label>
                <input
                  type="radio"
                  name={q._id}
                  checked={answers[q._id] === i}
                  onChange={() => select(q._id, i)}
                />
                {opt}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button type="submit" className="submit-btn">
        Submit Exam
      </button>
    </form>
  </div>
);

}
