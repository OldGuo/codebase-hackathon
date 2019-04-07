import React from "react";
import logo from "./assets/logo.svg";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import Calendar from "./Calendar";
import "./styles/App.css";

function App() {
  return (
    <html lang="en">
      <Header />
      <body>
        <NavigationBar />
        <Calendar />
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </body>
    </html>
  );
}

export default App;
