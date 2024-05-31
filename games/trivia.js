let teams = [];
let scores = {};
let currentQuestionIndex = 0;
let questions = [];
let usedQuestions = [];

function addTeam() {
    const teamName = document.getElementById('teamName').value;
    if (teamName && !teams.includes(teamName)) {
        teams.push(teamName);
        scores[teamName] = 0;
        document.getElementById('teamList').innerHTML += `<li>${teamName}</li>`;
        document.getElementById('teamName').value = '';
    }z
}

function startGame() {
    const theme = document.getElementById('theme').value;
    loadQuestions(theme);
    document.getElementById('intro-div').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    displayQuestion();
}

function loadQuestions(theme) {
    // Load questions based on the selected theme
    // For demo purposes, we're using static questions
    questions = [
        { question: "What is the capital of France?", answers: ["Paris", "London", "Berlin", "Madrid"], correct: 0 },
        { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1 },
        // Add more questions here
    ];
}

function displayQuestion() {
    let availableQuestions = questions.filter((q, index) => !usedQuestions.includes(index));
    if (availableQuestions.length === 0) {
        alert('No more questions available');
        return;
    }
    let randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestionIndex = questions.indexOf(availableQuestions[randomIndex]);
    usedQuestions.push(currentQuestionIndex);

    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    question.answers.forEach((answer, index) => {
        answersDiv.innerHTML += `<button onclick="selectAnswer(${index})">${answer}</button>`;
    });
    document.getElementById('next-question').style.display = 'none';
    document.getElementById('teams-correct').style.display = 'none';
    resetAnswerColors();
}

function selectAnswer(index) {
    // Handle answer selection logic
}

function showAnswer() {
    const correctAnswerIndex = questions[currentQuestionIndex].correct;
    document.getElementById('answers').children[correctAnswerIndex].style.backgroundColor = 'lightgreen';
    displayTeamsCorrect();
}

function displayTeamsCorrect() {
    const teamsCorrectDiv = document.getElementById('teams-correct');
    teamsCorrectDiv.innerHTML = '<h3>Select teams who got it right:</h3>';
    teams.forEach(team => {
        teamsCorrectDiv.innerHTML += `<label><input type="checkbox" value="${team}"> ${team}</label><br>`;
    });
    document.getElementById('next-question').style.display = 'block';
    teamsCorrectDiv.style.display = 'block';
}

function nextQuestion() {
    const teamsCorrect = document.querySelectorAll('#teams-correct input:checked');
    teamsCorrect.forEach(team => {
        scores[team.value]++;
    });
    updateScoreboard();
    clearTeamSelection();
    if (usedQuestions.length < questions.length) {
        displayQuestion();
    } else {
        alert('Game Over');
    }
}

function resetAnswerColors() {
    const answerButtons = document.querySelectorAll('#answers button');
    answerButtons.forEach(button => {
        button.style.backgroundColor = '';
    });
}

function clearTeamSelection() {
    document.getElementById('teams-correct').innerHTML = '';
}

function updateScoreboard() {
    const scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = '<h3></h3>';
    for (let team in scores) {
        scoreboard.innerHTML += `<p>${team}: ${scores[team]}</p>`;
    }
}