import './App.css';
import { useState,useEffect } from 'react';
import laugh from './laugh.jpg';
function App() {
  const [joke, setJoke] = useState('');
  const [topic, setTopic] = useState('');

  const fetchJoke = async () => {
    const response = await fetch(
      `https://v2.jokeapi.dev/joke/Any?contains=${topic}`
    );
    const data = await response.json();

    if (data.error) {
      setJoke("Sorry, we couldn't find a joke for that topic.");
    } else {
      if (data.type === 'twopart') {
        setJoke(`${data.setup}\n${data.delivery}`);
      } else {
        setJoke(data.joke);
      }
    }
  };
  return (
    <div className="App">
      <div className="home-container">
        <div className="home-left">
          {' '}
          <div className="home-left-top">
            {' '}
            <h1>Joke Generator</h1>
            <div>
              <label htmlFor="topic">Enter a topic:</label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="E.g) Programming, Python, etc..."
                className="home-input"
              />
            </div>
            <button onClick={fetchJoke} className="home-button">
              Get Joke
            </button>
          </div>
          <div className="home-left-bottom">{joke}</div>
        </div>
        <img src={laugh} alt="" className="home-right" />
      </div>
    </div>
  );
}

export default App;
