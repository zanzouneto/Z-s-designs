
let words = [];
let currentWordIndex = 0;
let correctWords = [];
let passedWords = [];
let timerInterval;
let isGameRunning = false;
let wakeLock = null;
let clickTimeout = null;

function startGame() {
    const time = parseInt(document.getElementById('time').value);
    const theme = document.getElementById('theme').value;

    words = getWordsForTheme(theme); // Replace with actual word fetching logic
    words = shuffleArray(words); // Shuffle the words array
    currentWordIndex = 0;
    correctWords = [];
    passedWords = [];

    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';

    displayWord();
    startTimer(time);
    requestWakeLock();

    setTimeout(() => {
        document.addEventListener('click', handleClick, { passive: false });
        document.addEventListener('dblclick', handleDoubleClick, { passive: false });
        isGameRunning = true;
    }, 300); // Delay to prevent immediate click handling
}

function handleClick(event) {
    if (clickTimeout !== null) {
        clearTimeout(clickTimeout);
        clickTimeout = null;
    }

    clickTimeout = setTimeout(() => {
        if (isGameRunning) {
            handleNext();
        }
    }, 300); // Wait 300ms to distinguish single click
}

function handleDoubleClick(event) {
    if (clickTimeout !== null) {
        clearTimeout(clickTimeout);
        clickTimeout = null;
    }

    if (isGameRunning) {
        handlePass();
    }
}

function handleNext() {
    if (isGameRunning) {
        correctWords.push(words[currentWordIndex]);
        currentWordIndex++;
        displayWord();
    }
}

function handlePass() {
    if (isGameRunning) {
        passedWords.push(words[currentWordIndex]);
        currentWordIndex++;
        displayWord();
    }
}

function displayWord() {
    if (currentWordIndex < words.length) {
        document.getElementById('word-display').innerText = words[currentWordIndex];
    }
}

function startTimer(time) {
    let remainingTime = time;
    document.getElementById('timer').innerText = `${remainingTime} seconds`;

    timerInterval = setInterval(() => {
        remainingTime--;
        document.getElementById('timer').innerText = `${remainingTime} seconds`;
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    isGameRunning = false;
    releaseWakeLock();
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('score-screen').style.display = 'block';

    const scoreList = document.getElementById('score-list');
    scoreList.innerHTML = '';
    correctWords.forEach(word => {
        const li = document.createElement('li');
        li.innerText = word;
        li.classList.add('correct');
        scoreList.appendChild(li);
    });
    passedWords.forEach(word => {
        const li = document.createElement('li');
        li.innerText = word;
        li.classList.add('passed');
        scoreList.appendChild(li);
    });

    document.removeEventListener('click', handleClick);
    document.removeEventListener('dblclick', handleDoubleClick);
}

function getWordsForTheme(theme) {
    if (theme === 'animals') {
        return ['Cat', 'Dog', 'Elephant', 'Lion', 'Tiger'];
    } else if (theme === 'movies') {
        return ['Inception', 'Titanic', 'Avatar', 'Joker', 'Avengers'];
    } else if (theme === 'celebrities') {
        return ['Brad Pitt', 'Angelina Jolie', 'Tom Cruise', 'Beyonce', 'Elon Musk'];
    }
    return [];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => {
            console.log('Screen Wake Lock was released');
        });
        console.log('Screen Wake Lock is active');
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
}

function releaseWakeLock() {
    if (wakeLock !== null) {
        wakeLock.release().then(() => {
            wakeLock = null;
        });
    }
}

function startNewRound() {
    document.getElementById('score-screen').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';
}

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('new-round').addEventListener('click', startNewRound);
