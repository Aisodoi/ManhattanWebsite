import React from 'react';
import logo from './logo.svg';
import './App.css';
import styles from './Body.module.css';

export function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}



export function Body() {
  return(
    <div className={styles.body_wrapper}>Test</div>
  );
}





