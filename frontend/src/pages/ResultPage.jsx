// frontend/src/pages/ResultPage.jsx
import React, { useEffect, useState } from 'react';
import API from '../api';
import "../styles/result.css"

export default function ResultPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get('/results/my'); // endpoint for logged-in student's results
        setResults(res.data || []);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Failed to fetch results');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading your results...</p>;

  if (!results.length) {
    return <p>No results found. Attempt an exam to see your score here.</p>;
  }

return (
  <div className="result">
    <h2>My Exam Results</h2>
    {results.length > 0 ? (
      <table className="results-table">
        <thead>
          <tr>
            <th>Exam</th>
            <th>Score</th>
            <th>Total Questions</th>
            <th>Date Attempted</th>
          </tr>
        </thead>
        <tbody>
  {results.map((r, i) => (
    <tr key={i}>
      <td data-label="Exam">{r.exam?.title || 'Untitled Exam'}</td>
      <td data-label="Score">{r.score}</td>
      <td data-label="Total Questions">{r.totalQuestions}</td>
      <td data-label="Date Attempted">
        {new Date(r.attemptedAt).toLocaleString()}
      </td>
    </tr>
  ))}
</tbody>

      </table>
    ) : (
      <p className="no-results">No exam results found.</p>
    )}
  </div>
);

}
    