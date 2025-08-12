import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/navbar.css"

const Navbar = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    nav('/');
    setMenuOpen(false); // close menu after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Examify</div>

      {/* Hamburger Toggle Button */}
      <div 
        className={`hamburger ${menuOpen ? "active" : ""}`} 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/leaderboard" onClick={() => setMenuOpen(false)}>Leaderboard</Link>
        {user ? (
          <>
            {user.role === 'admin' && <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>}
            <Link to="/student" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link to="/result" >Result</Link>
            <span className="nav-user">Hi, {user.name}</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
            <Link to="/" onClick={() => setMenuOpen(false)}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
