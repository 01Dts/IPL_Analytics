import React from 'react';
import { styles } from '../styles/styles';

const Navbar = ({ activeTab, setActiveTab }) => (
  <nav style={styles.navbar}>
    <div style={styles.navContainer}>
      <h1 style={styles.brand}>🏏 IPL Analytics Dashboard</h1>
      <ul style={styles.navLinks}>
        {['home', 'year-stats'].map(tab => (
          <li key={tab}>
            <a
              style={{
                ...styles.navLink,
                ...(activeTab === tab ? styles.navLinkActive : {}),
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'home' ? 'Home' : 'Year Statistics'}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

export default Navbar;
