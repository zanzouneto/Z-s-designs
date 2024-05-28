let words = [];
let currentWordIndex = 0;
let correctWords = [];
let passedWords = [];
let timerInterval;
let isGameRunning = false;
let wakeLock = null;
let clickStartTime = 0;

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

    window.addEventListener('deviceorientation', handleOrientation);
    document.addEventListener('click', handleClick);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    isGameRunning = true;
}

function handleClick() {
    if (isGameRunning) {
        handleNext();
    }
}

// function handleMouseDown(event) {
//     clickStartTime = Date.now();
// }

// function handleMouseUp(event) {
//     const clickDuration = Date.now() - clickStartTime;
//     if (clickDuration >= 1000) { // Long click duration threshold (1 second)
//         handlePass();
//     }
// }

function handleNext() {
    if (isGameRunning) {
        correctWords.push(words[currentWordIndex]);
        currentWordIndex++;
        displayWord();
        // Debounce to prevent multiple detections
        isGameRunning = false;
        setTimeout(() => isGameRunning = true, 1000);
    }
}

function handlePass() {
    if (isGameRunning) {
        passedWords.push(words[currentWordIndex]);
        currentWordIndex++;
        displayWord();
        // Debounce to prevent multiple detections
        isGameRunning = false;
        setTimeout(() => isGameRunning = true, 1000);
    }
}

// Button controls
document.getElementById('next-button').addEventListener('click', handleNext);
document.getElementById('pass-button').addEventListener('click', handlePass);

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
    window.removeEventListener('deviceorientation', handleOrientation);
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
}

function getWordsForTheme(theme) {
    // Replace this with actual words for the selected theme
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

document.getElementById('start-game').addEventListener('click', () => {
    startGame();
});
