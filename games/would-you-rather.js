let players = [];
let selectedThemes = [];
let usedQuestions = new Set();
let isDrinkingGame = false;
// document.getElementById('card').addEventListener('touchmove', handleTouchMove, false);

const questions = {
    general: [
        "Would you rather have the ability to fly or be invisible?",
        "Would you rather always be 10 minutes late or 20 minutes early?",
        "Would you rather have the ability to fly or be invisible?",
        "Would you rather always be 10 minutes late or 20 minutedfhzdfhs early?",

    ],
    funny: [
        "Would you rather have permanent clown makeup or a permanent red nose?",
        "Would you rather have a personal theme song that plays whenever you enter a room or have a spotlight follow you everywhere?",
        "Would you rather only be able to communicate through interpretive dance or have everything you say be in rhyme?",
        "Would you rather have to always wear a full clown costume or a tutu everywhere you go?",
        "Would you rather have a pet dinosaur or a pet dragon?",
        "Would you rather only be able to speak in puns or have to wear a chicken suit every Friday?",
        "Would you rather be able to talk to animals but they all gossip about you or be able to speak all foreign languages but none of them fluently?",
        "Would you rather have a magical unicorn horn or fairy wings?",
        "Would you rather have a bottomless bowl of guacamole or a lifetime supply of tacos?",
        "Would you rather have to eat a stick of butter every morning or a bowl of mayonnaise every night?",
        "Would you rather have spaghetti for hair or sweat maple syrup?",
        "Would you rather have everything you touch turn into glitter or have to always wear a beekeeper suit?",
        "Would you rather have a constantly itchy nose or constantly sticky fingers?",
        "Would you rather have to wear clown shoes wherever you go or a nose that honks every time you speak?",
        "Would you rather have to wear a mustache made of tape or eyebrows made of candy?",
        "Would you rather have a permanent unibrow or a permanent unibrow?",
        "Would you rather sneeze confetti or burp glitter?",
        "Would you rather have to hop everywhere you go or crawl like a baby?",
        "Would you rather have a tiny elephant as a pet or a giant hamster?",
        "Would you rather have to wear a beard of bees or a crown of thorns?",
        "Would you rather have to wear a tutu to work every day or a bathing suit in the snow?",
        "Would you rather have to walk backward everywhere you go or only be able to skip?",
        "Would you rather have a talking parrot on your shoulder at all times repeating everything you say or a monkey that follows you around and mimics your every move?",
        "Would you rather have to wear a tutu to the grocery store or a wedding dress to the gym?",
        "Would you rather have to wear a chicken suit every time it rains or a swimsuit in the snow?",
        "Would you rather have a personal theme song that plays every time you enter a room or a laugh track that plays after everything you say?",
        "Would you rather have to speak in rhyme for the rest of your life or only be able to communicate through interpretive dance?",
        "Would you rather have a permanent clown nose or a permanent clown wig?",
        "Would you rather have a pet dinosaur that's always cranky or a pet dragon that's afraid of heights?",
        "Would you rather have to wear a tutu to work every day or a superhero costume under your clothes?",
        "Would you rather have to eat a bowl of live worms or a jar of expired mayonnaise?",
        "Would you rather have to always wear a full clown costume or a full-body chicken suit?",
        "Would you rather have a bottomless bowl of guacamole or an endless supply of tacos?",
        "Would you rather have spaghetti for hair or sweat spaghetti sauce?",
        "Would you rather have everything you touch turn into glitter or have everything you say be in rhyme?",
        "Would you rather have a magic wand that can only summon rubber chickens or a magic carpet that can only fly a foot off the ground?",
        "Would you rather have to hop everywhere you go or crawl like a baby?",
        "Would you rather have to wear a mustache made of tape or eyebrows made of candy?",
        "Would you rather sneeze confetti or burp bubbles?",
        "Would you rather have to walk backward everywhere you go or only be able to skip?",
        "Would you rather have a talking parrot on your shoulder that repeats everything you say or a monkey that mimics your every move?",
        "Would you rather have a permanent unibrow or permanent clown makeup?",
        "Would you rather have to wear a beard of bees or a crown of thorns?",
        "Would you rather have a tiny elephant as a pet or a giant hamster?",
        "Would you rather have to wear a tutu to the grocery store or a wedding dress to the gym?",
        "Would you rather have to wear a clown nose that honks every time you speak or a tutu that lights up and plays music when you dance?",
        "Would you rather have a pet dinosaur that's always cranky or a pet dragon that's afraid of heights?",
        "Would you rather have to eat a bowl of live worms or a jar of expired mayonnaise?",
        "Would you rather have to always wear a full clown costume or a full-body chicken suit?",
        "Would you rather have a bottomless bowl of guacamole or an endless supply of tacos?",
        "Would you rather have spaghetti for hair or sweat spaghetti sauce?",
        "Would you rather have everything you touch turn into glitter or have everything you say be in rhyme?",
        "Would you rather have a magic wand that can only summon rubber chickens or a magic carpet that can only fly a foot off the ground?",
        "Would you rather have to hop everywhere you go or crawl like a baby?",
        "Would you rather have to wear a mustache made of tape or eyebrows made of candy?",
        "Would you rather sneeze confetti or burp bubbles?",
        "Would you rather have to walk backward everywhere you go or only be able to skip?",
        "Would you rather have a talking parrot on your shoulder that repeats everything you say or a monkey that mimics your every move?",
        "Would you rather have a permanent unibrow or permanent clown makeup?",
        "Would you rather have to wear a beard of bees or a crown of thorns?",
        "Would you rather have a tiny elephant as a pet or a giant hamster?",
        "Would you rather have to wear a tutu to the grocery store or a wedding dress to the gym?",
        "Would you rather have to wear a clown nose that honks every time you speak or a tutu that lights up and plays music when you dance?",
        "Would you rather have a pet dinosaur that's always cranky or a pet dragon that's afraid of heights?",
        "Would you rather have to eat a bowl of live worms or a jar of expired mayonnaise?",
        "Would you rather have to always wear a full clown costume or a full-body chicken suit?",
        "Would you rather have a bottomless bowl of guacamole or an endless supply of tacos?",
        "Would you rather have spaghetti for hair or sweat spaghetti sauce?",
        "Would you rather have everything you touch turn into glitter or have everything you say be in rhyme?",
        "Would you rather have a magic wand that can only summon rubber chickens or a magic carpet that can only fly a foot off the ground?",
        "Would you rather have to hop everywhere you go or crawl like a baby?",
        "Would you rather have to wear a mustache made of tape or eyebrows made of candy?",
        "Would you rather sneeze confetti or burp bubbles?",
    ],
    serious: [
        "Would you rather lose the ability to read or lose the ability to speak?",
        "Would you rather have a high-profile job with no family life or a low-profile job with a happy family life?",
        "Would you rather always speak your mind or never speak again?",
        "Would you rather have the power to heal others or the power to heal yourself?",
        "Would you rather know the date of your death or the cause of your death?",
        "Would you rather be able to see one year into the future or change one decision from your past?",
        "Would you rather live forever but be forgotten by everyone or live a normal lifespan with lasting memories?",
        "Would you rather have the ability to change the past or see into the future?",
        "Would you rather be able to control your dreams or be able to control time?",
        "Would you rather have the power to eliminate hunger and disease worldwide or bring peace to all nations?",
        "Would you rather know the history of every object you touched or be able to talk to animals?",
        "Would you rather have the ability to change your appearance at will or teleport anywhere in the world?",
        "Would you rather be able to erase your memories or view the memories of others?",
        "Would you rather always be able to tell when someone is lying or never be able to lie yourself?",
        "Would you rather have the ability to see the world in black and white or see everything in slow motion?",
        "Would you rather have the power to stop time or skip it forward?",
        "Would you rather be able to read minds or accurately predict the future?",
        "Would you rather have unlimited knowledge or unlimited wealth?",
        "Would you rather be able to control the elements (fire, water, air, earth) or control animals?",
        "Would you rather be able to speak all languages or communicate with machines?",
        "Would you rather be able to experience the beginning of the universe or the end of the universe?",
        "Would you rather be able to cure all illnesses but shorten your lifespan or live a long life without the ability to cure any illnesses?",
        "Would you rather have the power to bring someone back to life or prevent a disaster from happening?",
        "Would you rather be able to teleport anywhere or be able to instantly learn any skill?",
        "Would you rather have perfect health for the rest of your life or a guaranteed peaceful death?",
        "Would you rather have the ability to control people's emotions or their actions?",
        "Would you rather have the power to change the past or control the future?",
        "Would you rather be able to speak with the dead or see into the future?",
        "Would you rather have the ability to never feel fear or never feel sadness?",
        "Would you rather be able to control the weather or the outcome of sporting events?",
        "Would you rather have the ability to change the outcome of any decision you've made or be able to see the outcome of any decision before you make it?",
        "Would you rather have the power to bring peace to the world or end world hunger?",
        "Would you rather have the ability to fly or breathe underwater?",
        "Would you rather be able to travel to any point in time or any place in the world?",
        "Would you rather have the ability to change your appearance at will or be able to teleport short distances?",
        "Would you rather be able to communicate with animals or speak all foreign languages?",
        "Would you rather have the power to heal any wound or never feel physical pain?",
        "Would you rather have the ability to control minds or manipulate matter?",
        "Would you rather be able to travel to parallel universes or have unlimited wealth in this one?",
        "Would you rather have the ability to see in complete darkness or see miles away like binoculars?",
        "Would you rather have the power to bring back extinct species or prevent future species from going extinct?",
        "Would you rather have the ability to see the world in slow motion or speed up time at will?",
        "Would you rather have the power to control fire or water?",
        "Would you rather have the ability to fly at the speed of sound or be able to breathe underwater?",
        "Would you rather be able to talk to animals or speak all human languages?",
        "Would you rather have the ability to teleport anywhere or be able to read minds?",
        "Would you rather have the power to change the past or see the future?",
        "Would you rather have the ability to change your appearance at will or be able to teleport?",
        "Would you rather be able to control the weather or control luck?",
        "Would you rather have the power to heal any wound or heal any illness?",
        "Would you rather have the ability to travel through time or space?",
        "Would you rather have the power to control minds or manipulate time?",
        "Would you rather be able to control electricity or magnetism?",
        "Would you rather have the ability to fly or be able to turn invisible?",
        "Would you rather have the power to control animals or control the elements (fire, water, air, earth)?",
        "Would you rather have the ability to communicate with plants or with the dead?",
        "Would you rather have the power to stop time or rewind it?",
        "Would you rather have the ability to control the outcome of sporting events or political elections?",
        "Would you rather have the ability to see into the future or change the past?",
        "Would you rather have the power to control minds or control the weather?",
        "Would you rather have the ability to teleport anywhere or be able to fly?",
        "Would you rather be able to speak all languages or have perfect knowledge of history?",
        "Would you rather have the power to heal any wound or bring peace to all conflicts?",
        "Would you rather have the ability to change your appearance at will or have unlimited wealth?",
        "Would you rather have the power to control time or space?",
        "Would you rather have the ability to see in complete darkness or have superhuman strength?",
        "Would you rather have the power to control fire or ice?",
        "Would you rather have the ability to teleport anywhere or be able to breathe underwater?",
        "Would you rather have the power to control minds or control the elements (fire, water, air, earth)?",
        "Would you rather have the ability to communicate with animals or speak all human languages?",
        "Would you rather have the ability to teleport anywhere or be able to read minds?",
        "Would you rather have the power to change the past or see the future?",
        "Would you rather have the ability to change your appearance at will or be able to teleport?",
        "Would you rather be able to control the weather or control luck?",
        "Would you rather have the power to heal any wound or heal any illness?",
        "Would you rather have the ability to travel through time or space?",
        "Would you rather have the power to control minds or manipulate time?",
        "Would you rather be able to control electricity or magnetism?",
        "Would you rather have the ability to fly or be able to turn invisible?",
        "Would you rather have the power to control animals or control the elements (fire, water, air, earth)?",
        "Would you rather have the ability to communicate with plants or with the dead?",
        "Would you rather have the power to stop time or rewind it?",
        "Would you rather have the ability to control the outcome of sporting events or political elections?",
        "Would you rather have the ability to see into the future or change the past?",
        "Would you rather have the power to control minds or control the weather?",

    ],
    adults: [
        "Would you rather have sex in a public place or have sex in your parents' house?",
        "Would you rather accidentally send a naughty picture to your boss or your parents?",
        "Would you rather have a threesome with your partner and a stranger or cheat on your partner?",
        "Would you rather have loud sex or silent sex?",
        "Would you rather walk in on your parents having sex or have them walk in on you?",
        "Would you rather only be able to have sex in the shower or only be able to have sex on the bed?",
        "Would you rather never be able to orgasm or always have to fake an orgasm?",
        "Would you rather be dominant or submissive in the bedroom?",
        "Would you rather have sex with the lights on or off?",
        "Would you rather give up oral sex or give up intercourse?",
        "Would you rather have sex with someone who never showers or someone who never brushes their teeth?",
        "Would you rather have sex with a celebrity of your choice or have sex with the hottest person you know?",
        "Would you rather only be able to have sex in one position or only be able to have sex once a year?",
        "Would you rather have sex with your best friend or never have sex again?",
        "Would you rather have sex in complete darkness or in front of a big mirror?",
        "Would you rather be caught having sex in public or catch someone else having sex in public?",
        "Would you rather be on top or bottom during sex?",
        "Would you rather have sex with someone who is too quiet or someone who is too loud?",
        "Would you rather have sex with a partner who always wants to try new things or a partner who is comfortable with a routine?",
        "Would you rather have sex in a car or in a tent?",
        "Would you rather have a partner who is too aggressive or too passive?",
        "Would you rather have sex with someone you hate or with someone who hates you?",
        "Would you rather be with someone who is terrible at kissing or terrible at oral sex?",
        "Would you rather have sex with the first person you ever had sex with again or never have sex again?",
        "Would you rather have sex in the morning or at night?",
        "Would you rather watch your partner have sex with someone else or have your partner watch you have sex with someone else?",
        "Would you rather never masturbate again or never have sex again?",
        "Would you rather have sex with your ex or your ex's best friend?",
        "Would you rather have a partner who is only interested in foreplay or only interested in intercourse?",
        "Would you rather have sex with the same person for the rest of your life or have sex with a different person every time?",
        "Would you rather have a one-night stand with someone really attractive or a long-term relationship with someone average-looking?",
        "Would you rather receive a sensual massage or give one?",
        "Would you rather never kiss anyone again or never touch anyone again?",
        "Would you rather have a sexy boss or sexy co-worker?",
        "Would you rather have sex in the same position for the rest of your life or never be able to repeat the same position?",
        "Would you rather have sex in a swimming pool or in the ocean?",
        "Would you rather have sex with the lights on or in complete darkness?",
        "Would you rather be able to only have quickies or only have marathon sex sessions?",
        "Would you rather be blindfolded or handcuffed during sex?",
        "Would you rather have a one-night stand with a stranger or a one-night stand with a friend?",
        "Would you rather have sex on the beach or in the forest?",
        "Would you rather have a partner who is very vocal or one who is completely silent?",
        "Would you rather have sex in a place where you can get caught or in a completely private place?",
        "Would you rather have sex with someone older or younger than you?",
        "Would you rather be spanked or do the spanking?",
        "Would you rather make a sex tape that gets leaked or have your parents make a sex tape that gets leaked?",
        "Would you rather have sex with a coworker or a neighbor?",
        "Would you rather have a partner who is too kinky or too vanilla?",
        "Would you rather have a partner who is great in bed but bad at everything else or bad in bed but great at everything else?",
        "Would you rather be tied up or tie someone else up during sex?",
        "Would you rather have sex while someone is watching or watch someone else have sex?",
        "Would you rather have sex with someone who talks dirty or someone who is silent?",
        "Would you rather have sex with someone who never showers or someone who never brushes their teeth?",
        "Would you rather give up sex for a year or give up masturbating for a year?",
        "Would you rather have a threesome with strangers or with friends?",
        "Would you rather have sex with your best friend’s partner or your partner’s best friend?",
        "Would you rather have sex on a first date or wait until the third date?",
        "Would you rather have a partner who is a sex addict or a partner who is a germaphobe?",
        "Would you rather have sex in your office or in your boss’s office?",
        "Would you rather have sex in a moving car or a moving train?",
        "Would you rather have sex with someone who is into BDSM or someone who is into role-playing?",
        "Would you rather have sex in a public restroom or in a changing room?",
        "Would you rather have sex while camping or while staying in a luxury hotel?",
        "Would you rather have a partner who is very experienced or a partner who is a virgin?",
        "Would you rather have sex with your partner while your friends watch or have sex with your friends while your partner watches?",
        "Would you rather have sex in a hot tub or on a waterbed?",
        "Would you rather have sex with someone who is always horny or someone who is never horny?",
        "Would you rather have sex with your best friend’s sibling or your sibling’s best friend?",
        "Would you rather have sex in your childhood bedroom or in your boss’s office?",
        "Would you rather have sex in a hammock or on a trampoline?",
        "Would you rather have a partner who always initiates sex or one who never does?",
        "Would you rather have sex on the floor or on a kitchen counter?",
        "Would you rather have a partner who is a moaner or a screamer?",
        "Would you rather have sex in a car or in a plane?",
        "Would you rather have a partner who is always late or one who is always early?",
        "Would you rather have sex with someone who is too fast or someone who is too slow?",
        "Would you rather have a partner who is into feet or a partner who is into hands?",
        "Would you rather have sex in a graveyard or in a church?",
        "Would you rather have sex with someone who is always serious or someone who is always joking?",
        "Would you rather have a partner who is into spanking or one who is into biting?",
        "Would you rather have sex in a tent or in a treehouse?",
        "Would you rather have a partner who is obsessed with foreplay or one who skips it altogether?",
        "Would you rather have sex with someone who is always sweaty or someone who is always cold?",
        "Would you rather have sex with a stranger or with an ex?",
        "Would you rather have sex with the first person you see in the morning or the last person you see at night?",
        "Would you rather have sex with someone who talks dirty or someone who is completely silent?",
        "Would you rather have a partner who is always on top or always on bottom?",
        "Would you rather have sex in a hot tub or on a boat?",
        "Would you rather have a partner who likes to cuddle or one who doesn’t?",
        "Would you rather have sex with someone who never showers or someone who never brushes their teeth?",
        "Would you rather have sex in a field or in a barn?",
        "Would you rather have sex with a neighbor or a coworker?",
        "Would you rather have a partner who is a sex addict or a partner who is a virgin?",
        "Would you rather have sex with someone who has bad breath or someone who has bad body odor?",
        "Would you rather have a partner who is always horny or one who is never horny?",
        "Would you rather have sex in a sauna or in a steam room?",
        "Would you rather have sex with someone who is into BDSM or someone who is into role-playing?",
        "Would you rather have sex with someone who is very experienced or someone who is a virgin?",
        "Would you rather have sex with someone who is always late or someone who is always early?",
        "Would you rather have sex with someone who is very talkative or someone who is very quiet?",
    ]
};

document.getElementById('player-name').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addPlayer();
    }
});

document.getElementById('new-player-name').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addPlayer();
    }
});

function setGameType(type) {
    isDrinkingGame = (type === 'drinking');
    document.getElementById('drinking-game-section').style.display = 'none';
    document.getElementById('theme-section').style.display = 'block';
    if (isDrinkingGame) {
        document.getElementById('player-section').style.display = 'none';
    }
}

function continueToPlayerSection() {
    const themeCheckboxes = document.querySelectorAll('#theme-section input[type="checkbox"]');
    selectedThemes = Array.from(themeCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    if (selectedThemes.length === 0) {
        alert('Please select at least one theme.');
        return;
    }

    if (isDrinkingGame) {
        startGame();
    } else {
        document.getElementById('theme-section').style.display = 'none';
        document.getElementById('player-section').style.display = 'block';
    }
}

function addPlayer() {
    const playerNameInput = document.getElementById('player-name');
    const editPlayerNameInput = document.getElementById('new-player-name');
    let playerName = '';

    if (playerNameInput && playerNameInput.value.trim() !== '') {
        playerName = playerNameInput.value.trim();
        playerNameInput.value = '';
    } else if (editPlayerNameInput && editPlayerNameInput.value.trim() !== '') {
        playerName = editPlayerNameInput.value.trim();
        editPlayerNameInput.value = '';
    }

    if (playerName) {
        players.push(playerName);
        const playerList = document.getElementById('player-list');
        const editPlayerList = document.getElementById('edit-player-list');
        const listItem = document.createElement('li');
        listItem.textContent = playerName;

        if (playerList) {
            playerList.appendChild(listItem);
        }

        if (editPlayerList) {
            const editListItem = document.createElement('li');
            editListItem.textContent = playerName;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removePlayer(playerName);
            editListItem.appendChild(removeButton);
            editPlayerList.appendChild(editListItem);
        }
    }
}

function startGame() {
    if (!isDrinkingGame && players.length === 0) {
        alert('Please add at least one player.');
        return;
    }
    
    document.getElementById('player-section').style.display = 'none';
    document.getElementById('theme-section').style.display = 'none';
    let introDivs = document.getElementsByClassName('start-screen');
    for (let i = 0; i < introDivs.length; i++) {
        introDivs[i].style.display = 'none';
    }
    document.getElementById('game-section').style.display = 'block';
    document.getElementById('edit-player-section').style.display = 'none';
    document.getElementById('edit-filter-section').style.display = 'none';

    usedQuestions.clear();
    askQuestion();
}

function getCombinedQuestions() {
    let combinedQuestions = [];
    selectedThemes.forEach(theme => {
        combinedQuestions = combinedQuestions.concat(questions[theme]);
    });
    return combinedQuestions;
}

function askQuestion() {
    const combinedQuestions = getCombinedQuestions();
    if (usedQuestions.size >= combinedQuestions.length) {
        alert('All questions have been asked. Restarting the game.');
        usedQuestions.clear();
    }

    const availableQuestions = combinedQuestions.filter(q => !usedQuestions.has(q));

    if (availableQuestions.length === 0) {
        usedQuestions.clear();
        askQuestion();
        return;
    }

    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    usedQuestions.add(randomQuestion);

    if (!isDrinkingGame && players.length > 0) {
        const randomPlayer = players[Math.floor(Math.random() * players.length)];
        document.getElementById('player').textContent = `Hey ${randomPlayer},`;
    } else {
        // document.getElementById('player').textContent = 'Would you rather...';
    }
    document.getElementById('question').textContent = randomQuestion;

    const [firstPart, secondPart] = randomQuestion.split(' or ');
    document.getElementById('question').innerHTML = `
        <div class="question-part green">${firstPart}</div>
        <div class="question-part or">OR</div>
        <div class="question-part red">${secondPart}</div>
    `;
}

function nextQuestion() {
    askQuestion();
}

function editPlayers() {
    document.getElementById('game-section').style.display = 'none';
    document.getElementById('edit-player-section').style.display = 'block';
}

function removePlayer(playerName) {
    players = players.filter(player => player !== playerName);
    const playerList = document.getElementById('edit-player-list');
    const items = Array.from(playerList.children);
    items.forEach(item => {
        if (item.textContent.includes(playerName)) {
            playerList.removeChild(item);
        }
    });
}

function editFilters() {
    const themeCheckboxes = document.querySelectorAll('#edit-filter-section input[type="checkbox"]');
    themeCheckboxes.forEach(checkbox => {
        checkbox.checked = selectedThemes.includes(checkbox.value);
    });
    document.getElementById('game-section').style.display = 'none';
    document.getElementById('edit-filter-section').style.display = 'block';
}

function applyFilters() {
    const themeCheckboxes = document.querySelectorAll('#edit-filter-section input[type="checkbox"]');
    selectedThemes = Array.from(themeCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    if (selectedThemes.length === 0) {
        alert('Please select at least one theme.');
        return;
    }
    returnToGame();
}

function returnToGame() {
    document.getElementById('edit-filter-section').style.display = 'none';
    document.getElementById('edit-player-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
}

// // Variables to track touch position and card movement
// let xDown = null;
// let yDown = null;
// let card = document.getElementById('card');

// function handleTouchStart(event) {
//     xDown = event.touches[0].clientX;
//     yDown = event.touches[0].clientY;
// }


// function handleTouchMove(event) {
//     if (!xDown || !yDown) {
//         return;
//     }

//     let xDiff = xDown - event.touches[0].clientX;
//     let yDiff = yDown - event.touches[0].clientY;

//     if (Math.abs(xDiff) > Math.abs(yDiff)) {
//         if (xDiff > 0) {
//             // Swipe left
//             card.classList.add('swipe-left');
//             setTimeout(() => {
//                 passWord();
//                 card.style.transform = '';
//                 card.classList.remove('swipe-left');
//             }, 100); // Adjust the duration to match your CSS transition duration
//         } 
//     }

//     // Reset touch position
//     xDown = null;
//     yDown = null;
// }
let xDown = null;
let yDown = null;
const card = document.getElementById('card');

card.addEventListener('touchstart', handleTouchStart, false);
card.addEventListener('touchmove', handleTouchMove, false);

function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(event) {
    if (!xDown || !yDown) {
        return;
    }

    const xUp = event.touches[0].clientX;
    const yUp = event.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            // Swipe left
            card.classList.add('swipe-left');
            setTimeout(() => {
                nextQuestion();
                card.classList.remove('swipe-left');
            }, 300); // Adjust the duration to match your CSS transition duration
        }
    }

    // Reset touch position
    xDown = null;
    yDown = null;
}

