// const players = [];
// let playerIndex = 0;
// let captions = [];
// let voted = [];
// let round = 1;
// let gameId;

// const urlParams = new URLSearchParams(window.location.search);
// const gameIdParam = urlParams.get('game');

// if (gameIdParam) {
//     gameId = gameIdParam;
//     document.getElementById('setup-container').style.display = 'none';
//     document.getElementById('game-container').style.display = 'block';
// } else {
//     document.getElementById('setup-container').style.display = 'block';
//     document.getElementById('game-container').style.display = 'none';
// }

// function startOrJoinGame() {
//     const playerName = document.getElementById('player-name').value.trim();
//     if (playerName) {
//         if (gameId) {
//             // Joining existing game
//             players.push(playerName);
//             document.getElementById('setup-container').style.display = 'none';
//             document.getElementById('game-container').style.display = 'block';
//             updateCaptionList();
//         } else {
//             // Starting new game
//             players.push(playerName);
//             gameId = generateGameId();
//             const gameLinkInfo = document.getElementById('game-link-info');
//             const gameLink = `${window.location.href.split('?')[0]}?game=${gameId}`;
//             gameLinkInfo.innerHTML = `Share this link with your friends to join: <a href="${gameLink}">${gameLink}</a>`;
//             gameLinkInfo.style.display = 'block';
//             document.getElementById('setup-container').style.display = 'none';
//             document.getElementById('game-container').style.display = 'block';
//         }
//     }
// }

// function generateGameId() {
//     return Math.random().toString(36).substr(2, 6); // Generate a random 6-character game ID
// }


// function startGame() {
//     const playerName = document.getElementById('player-name').value.trim();
//     if (playerName) {
//         players.push(playerName);
//         gameId = generateGameId();
//         document.getElementById('setup-container').style.display = 'none';
//         document.getElementById('game-container').style.display = 'block';
//         updateCaptionList();
//         updateGameLink();
//     }
// }

// function generateGameId() {
//     return Math.random().toString(36).substr(2, 6); // Generate a random 6-character game ID
// }

// function updateGameLink() {
//     const gameLink = window.location.href.split('?')[0] + `?game=${gameId}`;
//     document.getElementById('game-link').innerText = gameLink;
// }

// function submitCaption() {
//     const captionInput = document.getElementById('caption-input');
//     const caption = captionInput.value.trim();
//     if (caption) {
//         captions.push({ player: getCurrentPlayer(), caption });
//         updateCaptionList();
//         captionInput.value = '';
//         if (captions.length === players.length) {
//             revealCaptions();
//         }
//     }
// }

// function getCurrentPlayer() {
//     return players[playerIndex];
// }

// function updateCaptionList() {
//     const captionList = document.getElementById('caption-list');
//     captionList.innerHTML = '';
//     captions.forEach((item, index) => {
//         captionList.innerHTML += `<p>${item.player}: ${item.caption}</p>`;
//     });
// }

// function revealCaptions() {
//     const voteButtons = document.getElementById('vote-buttons');
//     captions.forEach((item, index) => {
//         voteButtons.innerHTML += `<button onclick="vote(${index})">${item.caption}</button>`;
//     });
// }

// function vote(index) {
//     if (!voted.includes(index)) {
//         voted.push(index);
//         if (voted.length === captions.length) {
//             endRound();
//         }
//     }
// }

// function endRound() {
//     const winningIndex = getWinningIndex();
//     const winner = captions[winningIndex].player;
//     document.getElementById('winner').innerText = `Winner of round ${round}: ${winner}`;
//     document.getElementById('next-round').style.display = 'block';
//     round++;
// }

// function getWinningIndex() {
//     const voteCounts = new Array(captions.length).fill(0);
//     voted.forEach(index => {
//         voteCounts[index]++;
//     });
//     return voteCounts.indexOf(Math.max(...voteCounts));
// }

// function nextRound() {
//     playerIndex = (playerIndex + 1) % players.length;
//     captions = [];
//     voted = [];
//     document.getElementById('vote-buttons').innerHTML = '';
//     document.getElementById('winner').innerText = '';
//     document.getElementById('next-round').style.display = 'none';
//     updateCaptionList();
// }

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let games = {};

io.on('connection', (socket) => {
  socket.on('start-game', ({ name }) => {
    const gameCode = uuidv4();
    games[gameCode] = { players: [{ name, score: 0 }], captions: [], votes: {}, round: 1 };
    socket.join(gameCode);
    io.to(gameCode).emit('game-started', { gameCode });
  });

  socket.on('join-game', ({ name, gameCode }) => {
    if (games[gameCode]) {
      games[gameCode].players.push({ name, score: 0 });
      socket.join(gameCode);
      io.to(gameCode).emit('player-joined', name);
    } else {
      socket.emit('error', 'Game not found');
    }
  });

  socket.on('submit-caption', ({ gameCode, caption }) => {
    if (games[gameCode]) {
      games[gameCode].captions.push(caption);
      io.to(gameCode).emit('new-caption', caption);
    }
  });

  socket.on('submit-vote', ({ gameCode, caption }) => {
    if (games[gameCode]) {
      if (!games[gameCode].votes[caption]) {
        games[gameCode].votes[caption] = 0;
      }
      games[gameCode].votes[caption]++;
      io.to(gameCode).emit('new-vote', caption);
    }
  });

  socket.on('next-round', ({ gameCode }) => {
    if (games[gameCode]) {
      games[gameCode].round++;
      games[gameCode].captions = [];
      games[gameCode].votes = {};
      io.to(gameCode).emit('new-round');
    }
  });

  socket.on('end-game', ({ gameCode }) => {
    if (games[gameCode]) {
      io.to(gameCode).emit('game-ended', games[gameCode].players);
      delete games[gameCode];
    }
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
