import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:4000');

function App() {
  const [name, setName] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [players, setPlayers] = useState([]);
  const [caption, setCaption] = useState('');
  const [captions, setCaptions] = useState([]);
  const [votes, setVotes] = useState({});
  const [meme, setMeme] = useState('https://i.imgflip.com/1bij.jpg'); // Example meme URL
  const [round, setRound] = useState(1);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    socket.on('player-joined', player => setPlayers(prev => [...prev, player]));
    socket.on('new-caption', newCaption => setCaptions(prev => [...prev, newCaption]));
    socket.on('new-vote', vote => setVotes(prev => ({ ...prev, [vote]: (prev[vote] || 0) + 1 })));
    socket.on('new-round', () => {
      setRound(prev => prev + 1);
      setCaptions([]);
      setVotes({});
      setIsGameStarted(true);
    });
    socket.on('game-started', ({ gameCode }) => {
      setGameCode(gameCode);
      setIsGameStarted(true);
    });
  }, []);

  useEffect(() => {
    let countdown;
    if (isGameStarted && timer > 0) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    }
    return () => clearTimeout(countdown);
  }, [timer, isGameStarted]);

  const startGame = () => {
    socket.emit('start-game', { name });
  };

  const joinGame = () => {
    socket.emit('join-game', { name, gameCode });
  };

  const submitCaption = () => {
    socket.emit('submit-caption', { gameCode, caption });
    setCaption('');
  };

  const submitVote = (caption) => {
    socket.emit('submit-vote', { gameCode, caption });
  };

  const startNextRound = () => {
    socket.emit('next-round', { gameCode });
    setTimer(60);
  };

  const endGame = () => {
    socket.emit('end-game', { gameCode });
  };

  return (
    <div className="App">
      {!isGameStarted ? (
        <div>
          <h1>What Do You Meme?</h1>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
          <button onClick={startGame}>Start Game</button>
          <input type="text" value={gameCode} onChange={(e) => setGameCode(e.target.value)} placeholder="Enter game code" />
          <button onClick={joinGame}>Join Game</button>
        </div>
      ) : (
        <div>
          <h2>Game Code: {gameCode}</h2>
          <h3>Players:</h3>
          <ul>
            {players.map(player => <li key={player}>{player}</li>)}
          </ul>
          <h2>Round {round}</h2>
          <img src={meme} alt="meme" />
          <div>
            <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Enter caption" />
            <button onClick={submitCaption}>Submit Caption</button>
          </div>
          <h2>Captions</h2>
          <ul>
            {captions.map((cap, index) => (
              <li key={index} onClick={() => submitVote(cap)}>{cap}</li>
            ))}
          </ul>
          <h2>Votes</h2>
          <ul>
            {Object.keys(votes).map((vote, index) => (
              <li key={index}>{vote}: {votes[vote]}</li>
            ))}
          </ul>
          <h2>Timer: {timer}</h2>
          <button onClick={startNextRound}>Next Round</button>
          <button onClick={endGame}>End Game</button>
        </div>
      )}
    </div>
  );
}

export default App;
