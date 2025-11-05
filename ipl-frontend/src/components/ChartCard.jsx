import React from 'react';
import { styles } from '../styles/styles';

const ChartCard = ({ title, colorStyle, description, children }) => (
  <div style={styles.card}>
    <div style={{ ...styles.cardHeader, ...colorStyle }}>{title}</div>
    <div style={styles.cardBody}>
      {description && <p style={styles.cardText}>{description}</p>}
      {children}
    </div>
  </div>
);

export default ChartCard;
