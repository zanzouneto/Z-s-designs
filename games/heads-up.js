let recognition;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onresult = function(event) {
        const result = event.results[0][0].transcript.toLowerCase();
        console.log('Speech Recognition Result:', result);
        if (result.includes('next')) {
            handleNext();
        } else if (result.includes('pass')) {
            handlePass();
        }
    };
    recognition.onerror = function(event) {
        console.error('Speech Recognition Error:', event.error);
    };
} else {
    console.error('Speech Recognition API not supported');
}

function startVoiceRecognition() {
    if (recognition) {
        recognition.start();
        console.log('Voice recognition started');
    }
}

function stopVoiceRecognition() {
    if (recognition) {
        recognition.stop();
        console.log('Voice recognition stopped');
    }
}

document.getElementById('start-game').addEventListener('click', () => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    startGame();
                } else {
                    alert('Permission to access device orientation was denied.');
                }
            })
            .catch(console.error);
    } else {
        startGame(); // For browsers that do not require permission
    }
});

document.getElementById('new-round').addEventListener('click', startNewRound);

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
    isGameRunning = true;

    startVoiceRecognition(); // Start voice recognition when the game starts
}

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

// Rest of your existing code
