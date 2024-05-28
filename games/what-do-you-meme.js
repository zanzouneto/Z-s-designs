const players = [];
let playerIndex = 0;
let captions = [];
let voted = [];
let round = 1;
let gameId;

const urlParams = new URLSearchParams(window.location.search);
const gameIdParam = urlParams.get('game');

if (gameIdParam) {
    gameId = gameIdParam;
    document.getElementById('setup-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
} else {
    document.getElementById('setup-container').style.display = 'block';
    document.getElementById('game-container').style.display = 'none';
}

function startOrJoinGame() {
    const playerName = document.getElementById('player-name').value.trim();
    if (playerName) {
        if (gameId) {
            // Joining existing game
            players.push(playerName);
            document.getElementById('setup-container').style.display = 'none';
            document.getElementById('game-container').style.display = 'block';
            updateCaptionList();
        } else {
            // Starting new game
            players.push(playerName);
            gameId = generateGameId();
            const gameLinkInfo = document.getElementById('game-link-info');
            const gameLink = `${window.location.href.split('?')[0]}?game=${gameId}`;
            gameLinkInfo.innerHTML = `Share this link with your friends to join: <a href="${gameLink}">${gameLink}</a>`;
            gameLinkInfo.style.display = 'block';
            document.getElementById('setup-container').style.display = 'none';
            document.getElementById('game-container').style.display = 'block';
        }
    }
}

function generateGameId() {
    return Math.random().toString(36).substr(2, 6); // Generate a random 6-character game ID
}

// Other functions remain the same...

// Other functions remain the same...


function startGame() {
    const playerName = document.getElementById('player-name').value.trim();
    if (playerName) {
        players.push(playerName);
        gameId = generateGameId();
        document.getElementById('setup-container').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        updateCaptionList();
        updateGameLink();
    }
}

function generateGameId() {
    return Math.random().toString(36).substr(2, 6); // Generate a random 6-character game ID
}

function updateGameLink() {
    const gameLink = window.location.href.split('?')[0] + `?game=${gameId}`;
    document.getElementById('game-link').innerText = gameLink;
}

// Other functions remain the same...

function submitCaption() {
    const captionInput = document.getElementById('caption-input');
    const caption = captionInput.value.trim();
    if (caption) {
        captions.push({ player: getCurrentPlayer(), caption });
        updateCaptionList();
        captionInput.value = '';
        if (captions.length === players.length) {
            revealCaptions();
        }
    }
}

function getCurrentPlayer() {
    return players[playerIndex];
}

function updateCaptionList() {
    const captionList = document.getElementById('caption-list');
    captionList.innerHTML = '';
    captions.forEach((item, index) => {
        captionList.innerHTML += `<p>${item.player}: ${item.caption}</p>`;
    });
}

function revealCaptions() {
    const voteButtons = document.getElementById('vote-buttons');
    captions.forEach((item, index) => {
        voteButtons.innerHTML += `<button onclick="vote(${index})">${item.caption}</button>`;
    });
}

function vote(index) {
    if (!voted.includes(index)) {
        voted.push(index);
        if (voted.length === captions.length) {
            endRound();
        }
    }
}

function endRound() {
    const winningIndex = getWinningIndex();
    const winner = captions[winningIndex].player;
    document.getElementById('winner').innerText = `Winner of round ${round}: ${winner}`;
    document.getElementById('next-round').style.display = 'block';
    round++;
}

function getWinningIndex() {
    const voteCounts = new Array(captions.length).fill(0);
    voted.forEach(index => {
        voteCounts[index]++;
    });
    return voteCounts.indexOf(Math.max(...voteCounts));
}

function nextRound() {
    playerIndex = (playerIndex + 1) % players.length;
    captions = [];
    voted = [];
    document.getElementById('vote-buttons').innerHTML = '';
    document.getElementById('winner').innerText = '';
    document.getElementById('next-round').style.display = 'none';
    updateCaptionList();
}
