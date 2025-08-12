import React, { useEffect, useState } from 'react';
import API from '../api';
import "../styles/admin.css"

export default function AdminDashboard() {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({ question: '', options: ['', '', '', ''], answerIndex: 0 });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const res = await API.get('/questions/admin/all');
    setQuestions(res.data);
  };

  const add = async (e) => {
    e.preventDefault();
    try {
      await API.post('/questions', form);
      setForm({ question: '', options: ['', '', '', ''], answerIndex: 0 });
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete?')) return;
    await API.delete(`/questions/${id}`);
    fetchAll();
  };

  return (
    <div className='admin'>
      <h2>Admin Dashboard - Manage Questions</h2>
      <form className='admin-form' onSubmit={add}>
        <h4>Write Questions & Delete Questions</h4>
        <input placeholder="Write Question" value={form.question} onChange={e=>setForm({...form, question: e.target.value})} required /><br />
        {form.options.map((opt, idx) => (
          <div key={idx}>
            <input placeholder={`Option ${idx+1}`} value={opt} onChange={e => {
              const newOpts = [...form.options]; newOpts[idx] = e.target.value; setForm({...form, options: newOpts});
            }} required />
            <label>
              <input type="radio" name="ans" checked={form.answerIndex===idx} onChange={()=>setForm({...form, answerIndex: idx})}/>
              Correct
            </label>
          </div>
        ))}
        <button type="submit">Add</button>
      </form>

      <h3>Questions</h3>
      <ul>
        {questions.map(q => (
          <li key={q._id}>
            <b>{q.question}</b>
            <ul>{q.options.map((o,i)=><li key={i}>{o}{q.answerIndex===i ? ' (A)' : ''}</li>)}</ul>
            <button onClick={() => remove(q._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
