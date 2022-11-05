import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App, Body} from './App';
import {Banner} from './Banner';
import {Hero} from './Hero';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Banner />
    <Hero />
    <Body />
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
