import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import "../styles/signup.css";


export default function Signup({ setUser }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/signup', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      nav(res.data.user.role === 'admin' ? '/admin' : '/student');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };
  return (
    <form className="signup-form" onSubmit={submit}>
      <h2>Signup</h2>
      
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <button type="submit">Sign up</button>
    </form>
  );
}
