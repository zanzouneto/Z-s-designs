document.addEventListener('DOMContentLoaded', function() {

const tasks = {
    fun: [
        "Sing a song",
        "Do a funny dance",
        "Tell a joke",
        "Speak in an accent for the next 3 minutes.",
        "Do your best impression of a celebrity.",
        "Walk like a duck for 1 minute.",
        "Make up a song about the person to your left.",
        "Tell a joke and try to make everyone laugh.",
        "Do the chicken dance.",
        "Act like your favorite animal until your next turn.",
        "Say the alphabet backwards.",
        "Try to lick your elbow.",
        "Sing everything you say for the next 5 minutes.",
        "Create a new handshake with another player.",
        "Make up a story using three random words given by other players.",
        "Invent a new word and define it.",
        "Play a quick game of charades.",
        "Form a conga line and dance around the room.",
        "Close your eyes and identify an object by touch.",
        "Describe the plot of an origional movie in 10 seconds.",
        "Truth or Dare: Choose truth or dare. The group will determine your task"
    ],
    Strip: [
        "Remove one article of clothing.",
        "Swap a piece of clothing with another player.",
        "Take off your socks.",
        "Unbutton your shirt halfway.",
        "Wear your shirt backward for the next round.",
        "Remove an accessory (e.g., hat, belt, watch).",
        "Take off a shoe and give it to another player.",
        "Roll up your pant legs to your knees.",
        "Swap shirts with another player.",
        "Flip, Sip, or Strip: Players flip a coin. If it lands on heads, they can either take a sip of their drink or strip off an item of clothing. If it lands on tails, they must do both."
    ],
    social: [
        "Compliment the person to your left",
        "Share an embarrassing story",
        "Ask someone a personal question",
        "Answer a personal question asked by the group",
        "Do a trust fall with another player.",
        "Share a random fact about yourself.",
        "Make a funny face and hold it for 10 seconds.",
        "Choose a dance move. Everyone must do it before taking their next turn."
    ],
    physical: [
        "Hold your breath for 30 seconds",
        "Run around the room",
        "Do 10 push-ups.",
        "Hold a plank for 1 minute.",
        "Perform 15 jumping jacks.",
        "Balance on one foot for 1 minute.",
        "Run in place for 2 minutes.",
        "Do a handstand against the wall.",
        "Jump as high as you can 10 times.",
        "Perform a dance move for 30 seconds.",
        "Do 10 burpees."
    ],
    trivia: [
        "Name 5 capital cities.",
        "Recite a famous quote and name its source.",
        "List 10 countries in alphabetical order.",
        "Name the seven continents.",
        "Name 5 elements from the periodic table.",
        "Answer a random trivia question from the group.",
        "Pick a player, give them a trivia question",
        "Name 3 books by the same author.",
        "List 5 breeds of dogs.",
        "Name 3 movies released in the last year.",
        "Name 5 famous historical figures.",
        "List 5 types of musical instruments.",
        "Name 5 planets in our solar system.",
        "Recite the first line of a poem and name the poet.",
        "List 10 cities in Asia.",
        "List 10 countries in Africa.",
        "Name 5 different cuisines.",
        "List 5 animals that can fly.",
        "Name 5 famous landmarks.",
    ],
    drinking: [
        "Truth or Shot: Choose between answering a personal question truthfully or taking a shot.",
        "Never Have I Ever: Say something you've never done. Anyone who has done it must take a drink.",
        "Take a shot.",
        "Pick a player to take a shot",
        "Make a drinking rule that everyone must follow until the end of the game.",
        "Categories: Name items in a category. First one who can't think of an item drinks.",
        "Finish someone else's drink.",
        "Take a drink for each letter in your name.",
        "Rhyme time: Say a word, and everyone else has to say a word that rhymes. First one who can't think of a rhyme drinks."
    ]
};

let selectedTasks = [];
let usedTaskIndices = {};

document.getElementById('start-game-btn').addEventListener('click', function() {
    const selectedCategories = Array.from(document.querySelectorAll('.category:checked')).map(checkbox => checkbox.value);
    if (selectedCategories.length === 0) {
        alert("Please select at least one category.");
        return;
    }

    const gameSection = document.getElementById('game-section');
    gameSection.style.display = 'block';

    const filterSection = document.getElementById('filter-section');
    filterSection.style.display = 'none';

    selectedTasks = selectedCategories.flatMap(category => tasks[category]);

    // Shuffle the tasks at the start of the game
    shuffleArray(selectedTasks);

    // Reset used task indices
    usedTaskIndices = {};
});

let currentNumber = '';

document.querySelectorAll('.keypad-btn').forEach(button => {
    button.addEventListener('click', function() {
        const number = this.getAttribute('data-number');
        currentNumber += number;
        document.getElementById('number-display').textContent = currentNumber;
    });
});

document.getElementById('get-task-btn').addEventListener('click', function() {
    if (currentNumber === '') {
        alert("Please enter a piece number.");
        return;
    }

    const pieceNumber = parseInt(currentNumber);

    // Initialize the usedTaskIndices for the piece number if not already done
    if (!usedTaskIndices[pieceNumber]) {
        usedTaskIndices[pieceNumber] = [];
    }

    // Check if all tasks for this piece number have been used
    if (usedTaskIndices[pieceNumber].length === selectedTasks.length) {
        alert("All tasks for this piece number have been used.");
        return;
    }

    // Get the current index for the piece number and cycle through the tasks
    let taskIndex;
    do {
        taskIndex = Math.floor(Math.random() * selectedTasks.length);
    } while (usedTaskIndices[pieceNumber].includes(taskIndex));

    // Add the used task index for this piece number
    usedTaskIndices[pieceNumber].push(taskIndex);

    // Get the task based on the taskIndex
    const task = selectedTasks[taskIndex];

    // Animate the task display
    animateTaskDisplay(pieceNumber, task);

    // Reset the number display and currentNumber variable
    currentNumber = '';
    document.getElementById('number-display').textContent = '0';
});

function animateTaskDisplay(pieceNumber, task) {
    const taskDisplay = document.getElementById('task-display');
    taskDisplay.innerHTML = `<div style="text-align: center; font-size: 24px;">${pieceNumber}</div>`; // Display the piece number with a line break

    let index = 0;
    const intervalId = setInterval(() => {
        if (index < task.length) {
            taskDisplay.innerHTML += task.charAt(index);
            index++;
        } else {
            clearInterval(intervalId); // Stop the interval
            taskDisplay.innerHTML += '</div>'; // Close the left-aligned task display
        }
    }, 20); // Adjust the interval speed as needed
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
});