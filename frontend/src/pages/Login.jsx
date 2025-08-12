import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import "../styles/login.css";

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      nav(res.data.user.role === 'admin' ? '/admin' : '/student');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };
return (
  <div className="login-container">
    <form className="login-card" onSubmit={submit}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        type="email"
        required
      />
      <input
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        type="password"
        required
      />
      <button type="submit">Login</button>
    </form>
  </div>
);

}
