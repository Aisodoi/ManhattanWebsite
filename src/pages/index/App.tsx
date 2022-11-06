import React from "react";
import logo from "../../logo.svg";
import "./App.css";
import styles from "./Body.module.css";
import orwelloimage from "../../orwelloserver.png";
import etherimage from "../../ether.png";
import convoimage from "../../convo.png";

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
  return (
    <div className={styles.body_wrapper}>
      <div className={styles.body_header}>Features</div>
      <div className={styles.body_feature_wrapper}>
        <div className={styles.body_feature_widget_text_wrapper}>
          1. Add Orwello to your server with one click
        </div>
        <img src={orwelloimage} className={styles.image}></img>
      </div>
      <div className={styles.body_feature_wrapper}>
        <div className={styles.body_feature_widget_text_wrapper}>
          2. Connect your ETH wallet to enable minting for your Discord account
          <div className={styles.smalltext}>(see Guide for more details)</div>
        </div>
        <img src={etherimage} className={styles.image}></img>
      </div>
      <div className={styles.body_feature_wrapper}>
        <div className={styles.body_feature_widget_text_wrapper}>
          3. Right-click any message on your server to mint it for all eternity
        </div>
        <img src={convoimage} className={styles.image}></img>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}
