import React, {useState} from 'react';
import './App.css';
import Joke from './components/Joke';
import axios from 'axios';

function App() {

  const[joke, setJoke] = useState("")

  const addJoke = (e) => {
    e.preventDefault();
    fetch('https://v2.jokeapi.dev/joke/Programming')
    .then(res => {
      if(res.ok === true)  {
        return res.json();
      }
      throw res;
    })
    .then(data => {
      if(data.type === 'single'){
        setJoke(data.joke);
      } else{
        setJoke(data.setup)
        setTimeout(()=>{setJoke(data.delivery)}, 3000);
      }
    })
    .catch(err => {console.error(err);});
  }
  
  return (
    <div className="App">
      <h1>J2G Joke Generator</h1>
      <div className="joke">
        <Joke joke={joke}/> 
      </div>
      <div className="generate">
        <button onClick={addJoke}>Generate Joke</button>
      </div>
    </div>
  );
}

export default App;
