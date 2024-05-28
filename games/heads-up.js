let words = [];
let currentWordIndex = 0;
let correctWords = [];
let passedWords = [];
let timerInterval;

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('new-round').addEventListener('click', startNewRound);

function startGame() {
    const time = parseInt(document.getElementById('time').value);
    const theme = document.getElementById('theme').value;

    words = getWordsForTheme(theme); // Replace with actual word fetching logic
    currentWordIndex = 0;
    correctWords = [];
    passedWords = [];

    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    
    displayWord();
    startTimer(time);

    window.addEventListener('deviceorientation', handleOrientation);
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

function handleOrientation(event) {
    const { beta } = event;
    if (beta > 45) {
        // Tilt forward
        correctWords.push(words[currentWordIndex]);
        currentWordIndex++;
        displayWord();
    } else if (beta < -45) {
        // Tilt backward
        passedWords.push(words[currentWordIndex]);
        currentWordIndex++;
        displayWord();
    }
}

function endGame() {
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

function startNewRound() {
    document.getElementById('score-screen').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';
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
