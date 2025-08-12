import React, { useEffect, useState } from 'react';
import API from '../api';
import "../styles/leaderboard.css"
export default function Leaderboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await API.get('/results/leaderboard');
        setData(res.data);
      } catch (err) {
        // possible 403 if not admin — show message
        setData([]);
      }
    })();
  }, []);

  return (
    <div className='leaderboader'>
      <h2>Leaderboard (Admin view required)</h2>
      <ul>
        {data.length ? data.map((r, i) => (
          <li key={i}>
            {r.student?.name || 'Unknown'} — Avg score: {r.avgScore.toFixed(2)} — Attempts: {r.attempts}
          </li>
        )) : <li>No data or admin permission required. Login as admin to view full leaderboard (or ask for admin seed user).</li>}
      </ul>
    </div>
  );
}
