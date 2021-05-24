import logo from './logo.svg';
import "./reset.css";
import "./style.css";
import {useState, useEffect} from "react";

function App() {
  useEffect(() => {
    grabSkills();
  }, []);
  
  function grabSkills() {
    fetch("/api/skills").then(response => response.json())
    .then(data => console.log(data));
  }

  return (
    <div className="App">
      <h1>Hellooooo</h1>
    </div>
  );
}

export default App;
