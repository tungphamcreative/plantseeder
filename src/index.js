import React from 'react';
import ReactDOM from "react-dom";
import Firebase, { FirebaseContext } from "./components/Firebase";
import App from "./components/App.js";
import './styles/Common.scss';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>
  , document.getElementById("index"));