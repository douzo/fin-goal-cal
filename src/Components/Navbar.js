// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import About from './About';
import Calculation from './Calculation';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Financial Goal Calculator</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
