let words = [];
let currentWordIndex = 0;
let correctWords = [];
let passedWords = [];
let timerInterval;
let isGameRunning = false;
let wakeLock = null;
let clickTimeout = null;
let gameWords = [];

function startGame() {
    const time = parseInt(document.getElementById('time').value);
    const theme = document.getElementById('theme').value;

    words = getWordsForTheme(theme); // Replace with actual word fetching logic
    words = shuffleArray(words); // Shuffle the words array
    currentWordIndex = 0;
    correctWords = [];
    passedWords = [];
    gameWords = []; // Reset gameWords

    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';

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
        const word = words[currentWordIndex];
        correctWords.push(word);
        recordWord(word, 'correct');
        currentWordIndex++;
        displayWord();
    }
}

function handlePass() {
    if (isGameRunning) {
        const word = words[currentWordIndex];
        passedWords.push(word);
        recordWord(word, 'passed');
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
    document.getElementById('timer').innerText = `${remainingTime}`;

    timerInterval = setInterval(() => {
        remainingTime--;
        document.getElementById('timer').innerText = `${remainingTime}`;
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function recordWord(word, status) {
    gameWords.push({ word: word, status: status });
}

function endGame() {
    isGameRunning = false;
    releaseWakeLock();
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('score-screen').style.display = 'flex';

    const scoreList = document.getElementById('score-list');
    scoreList.innerHTML = '';
    
    const scoreHeader = document.createElement('li');
    scoreHeader.innerHTML = `<span class="correct">${correctWords.length}</span> : <span class="passed">${passedWords.length}</span><br><br>`;
    scoreList.appendChild(scoreHeader);

    gameWords.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item.word;
        li.classList.add(item.status);
        scoreList.appendChild(li);
    });

    document.removeEventListener('click', handleClick);
    document.removeEventListener('dblclick', handleDoubleClick);
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


function getWordsForTheme(theme) {
    if (theme === 'animals') {
        return [
            'Cat', 'Dog', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Wolf', 'Giraffe', 'Zebra', 'Monkey', 
            'Kangaroo', 'Panda', 'Leopard', 'Cheetah', 'Horse', 'Cow', 'Sheep', 'Goat', 'Pig', 'Rabbit', 
            'Deer', 'Fox', 'Hippopotamus', 'Rhinoceros', 'Crocodile', 'Alligator', 'Bat', 'Squirrel', 'Hedgehog', 
            'Otter', 'Koala', 'Opossum', 'Raccoon', 'Skunk', 'Armadillo', 'Porcupine', 'Moose', 'Antelope', 
            'Buffalo', 'Camel', 'Chinchilla', 'Dolphin', 'Seal', 'Walrus', 'Whale', 'Shark', 'Penguin', 'Owl', 
            'Eagle', 'Falcon', 'Parrot', 'Sparrow', 'Peacock', 'Flamingo', 'Swan', 'Duck', 'Goose', 'Pigeon', 
            'Turkey', 'Chicken', 'Rooster', 'Crow', 'Raven', 'Magpie', 'Woodpecker', 'Seagull', 'Heron', 'Pelican', 
            'Toucan', 'Vulture', 'Ostrich', 'Emu', 'Albatross', 'Kookaburra', 'Crane', 'Stork', 'Robin', 'Bluejay', 
            'Cardinal', 'Hummingbird', 'Canary', 'Finch', 'Goldfinch', 'Swallow', 'Lark', 'Nightingale', 'Thrush', 
            'Cuckoo', 'Kiwi', 'Kingfisher', 'Lynx', 'Bobcat', 'Jaguar', 'Cougar', 'Panther', 'Hyena', 'Mongoose', 
            'Meerkat', 'Badger', 'Weasel', 'Ferret', 'Mole', 'Vole', 'Hamster', 'Guinea Pig', 'Gerbil', 
            'Mouse', 'Rat', 'Beaver', 'Capybara', 'Platypus', 'Echidna', 'Sloth', 'Anteater', 'Aardvark', 'Iguana', 
            'Chameleon', 'Gecko', 'Lizard', 'Komodo Dragon', 'Tortoise', 'Turtle', 'Python', 'Boa', 'Anaconda', 
            'Viper', 'Cobra', 'Rattlesnake', 'Frog', 'Toad', 'Newt', 'Salamander', 'Starfish', 'Sea Urchin', 'Jellyfish', 
            'Octopus', 'Squid', 'Crab', 'Lobster', 'Shrimp', 'Clam', 'Oyster', 'Scallop', 'Coral', 'Seahorse'
        ];
    } else if (theme === 'movies') {
        return [
            'Inception', 'Titanic', 'Avatar', 'Joker', 'Avengers: Endgame', 
            'The Dark Knight', 'Pulp Fiction', 'Forrest Gump', 'The Godfather',
            'Star Wars', 'The Shawshank Redemption', 'The Matrix', 'Gladiator', 
            'Jurassic Park', 'Back to the Future', 'The Lion King', 'Toy Story', 
            'Finding Nemo', 'Frozen',  'Lord of the Rings', 
            'Game of Thrones', 'Breaking Bad', 'Stranger Things', 'The Office',
            'Friends', 'The Simpsons', 'Seinfeld', 'Sherlock', 'Black Mirror', 
            'The Crown', 'Peaky Blinders', 'Chernobyl', 'Westworld', 
            'The Mandalorian', 'The Witcher', 'Better Call Saul', 
            'The Big Bang Theory', 'How I Met Your Mother', 'Dexter', 
            'Mad Men', 'House of Cards', 'Suits', 'The Walking Dead', 
            'The Sopranos', 'Fargo', 'True Detective', 'Rick and Morty', 
            'The Marvelous Mrs. Maisel',  'Ozark', 
            'Lucifer', 'BoJack Horseman', 'Fleabag', 'Brooklyn Nine-Nine', 
            'The Boys', 'Mindhunter', 'Hannibal', 'Lost', 
            'West Wing', 'Prison Break', 'Homeland', 'ER', 
            'Grey\'s Anatomy', 'Buffy the Vampire Slayer', 'Supernatural', 
            'Arrow', 'The Flash', 'Agents of S.H.I.E.L.D.', 'Daredevil', 
            'Jessica Jones', 'Luke Cage', 'Iron Fist', 'The Punisher', 
            'Riverdale', '13 Reasons Why', 'Teen Wolf', 
            'Pretty Little Liars', 'The 100', 'Gossip Girl', 'Vampire Diaries', 
            'Gilmore Girls', 'Veronica Mars', 'One Tree Hill', 'Smallville', 
            'House', 'Scrubs', 'Modern Family', 'Parks and Recreation', 
            '30 Rock', 'Community', 'New Girl', 'Arrested Development', 
            'That \'70s Show', 'Malcolm in the Middle', 'The Goldbergs', 
            'Fresh Off the Boat', 'Big Little Lies', 'Euphoria', 'Succession', 
            'Pose', 'This Is Us', 'Mr. Robot', 'American Horror Story', 
            'True Blood', 'Sons of Anarchy', 'Boardwalk Empire', 
            'The Leftovers', 'The Man in the High Castle', 'Sense8', 
            'Alias', 'Desperate Housewives', 'Castle', 'Revenge', 
            'Once Upon a Time', 'The Good Wife', 'The Blacklist', 
            'Person of Interest', 'Elementary', 'Scandal', 'How to Get Away with Murder', 
            'Empire', 'Power', 'Outlander', 'The Americans', 
            'Orphan Black', 'Shameless', 'Atlanta', 'The Expanse', 
            'The Umbrella Academy', 'Legion', 'Killing Eve', 'Watchmen', 
            'Dead to Me', 'Sex Education', 'Schitt\'s Creek', 'Russian Doll', 
            'Unbreakable Kimmy Schmidt', 'Glow', 'Dear White People', 'You', 
            'Big Mouth', 'The Haunting of Hill House', 'Locke & Key', 
            'The OA', 'The End of the F***ing World', 'Altered Carbon', 
            'The Queen\'s Gambit', 'Money Heist', 'Elite', 
            'Narcos', 'Dark',  'Mindhunter'
        ];
    } else if (theme === 'celebrities') {
        return ['Brad Pitt', 'Angelina Jolie', 'Tom Cruise', 'Beyonce', 'Elon Musk',
        'Leonardo DiCaprio', 'Jennifer Aniston', 'Robert Downey Jr.', 'Scarlett Johansson', 'Johnny Depp',
        'Meryl Streep', 'Denzel Washington', 'Rihanna', 'Chris Hemsworth', 'Taylor Swift',
        'Will Smith', 'Kim Kardashian', 'Kanye West', 'Lady Gaga', 'Emma Watson',
        'George Clooney', 'Julia Roberts', 'Chris Evans', 'Ariana Grande', 'Dwayne Johnson',
        'Jennifer Lawrence', 'Ryan Reynolds', 'Natalie Portman', 'Bruno Mars', 'Keanu Reeves',
        'Selena Gomez', 'Tom Hanks', 'Charlize Theron', 'Katy Perry', 'Matthew McConaughey',
        'Jessica Alba', 'Hugh Jackman', 'Nicki Minaj', 'Vin Diesel', 'Sandra Bullock',
        'Justin Bieber', 'Mila Kunis', 'Mark Wahlberg', 'Shakira', 'Jake Gyllenhaal',
        'Nicole Kidman', 'Ben Affleck', 'Gal Gadot', 'Drake', 'Reese Witherspoon',
        'Daniel Radcliffe', 'Megan Fox', 'Adam Sandler', 'Cardi B', 'Anne Hathaway',
        'Michael B. Jordan', 'Chris Pratt', 'Gigi Hadid', 'Zac Efron',
        'Kendall Jenner', 'Jason Momoa', 'Priyanka Chopra', 'Liam Hemsworth', 'Adele',
        'Blake Lively', 'Chris Pine', 'Post Malone', 'Channing Tatum', 'Sophie Turner',
        'Miley Cyrus', 'Ed Sheeran', 'Dakota Johnson', 'John Legend', 'Emily Blunt',
        'Ryan Gosling', 'Salma Hayek', 'Billie Eilish', 'Tom Holland', 'Alicia Keys',
        'Margot Robbie', 'Idris Elba', 'Ariana DeBose', 'Pedro Pascal', 
        'Hailey Baldwin', 'Timothée Chalamet', 'Cara Delevingne', 'Olivia Rodrigo',
        'Harry Styles', 'Hailee Steinfeld', 'Millie Bobby Brown', 'Taron Egerton', 'Saoirse Ronan',
        'Eddie Redmayne', 'Florence Pugh', 'Shawn Mendes', 'Anya Taylor-Joy',
        'Joe Alwyn', 'Maisie Williams', 'Halsey', 'Josh O\'sConnor', 'Bella Hadid',
        'Rami Malek', 'Lili Reinhart', 'Yara Shahidi', 'Noah Centineo', 'Finn Wolfhard',
        'Daisy Ridley', 'Mena Massoud', 'KJ Apa', 'Zazie Beetz', 'Lana Condor',
        'Jacob Elordi', 'Madelyn Cline', 'Logan Lerman', 'Kiernan Shipka', 'Ross Lynch',
        'Gaten Matarazzo', 'Sadie Sink', 'Caleb McLaughlin', 'Natalia Dyer', 'Charlie Heaton',
        'Maya Hawke', 'Dacre Montgomery', 'Cameron Boyce', 'Debby Ryan', 'Katherine Langford',
        'Asa Butterfield', 'Freddie Highmore', 'Sabrina Carpenter', 'Amandla Stenberg', 'Zendaya',
        'Jacob Tremblay', 'Storm Reid', 'McKenna Grace', 'Isabela Merced', 'Sofia Carson'
        ]; 
    } else if (theme === 'sports') {
        return [
            'Soccer', 'Basketball', 'Baseball', 'Football', 'Tennis',
            'Golf', 'Swimming', 'Running', 'Cycling', 'Boxing',
            'Gymnastics', 'Skating', 'Surfing', 'Skiing', 'Snowboarding',
            'Hiking', 'Rock Climbing', 'Yoga', 'Martial Arts', 'Karate',
            'Judo', 'Taekwondo', 'Wrestling', 'Rugby', 'Cricket',
            'Badminton', 'Table Tennis', 'Volleyball', 'Archery',
            'Shooting', 'Fencing', 'Rowing', 'Sailing', 'Diving',
            'Water Polo', 'Canoeing', 'Kayaking', 'Horse Riding', 'Equestrian',
            'Skateboarding', 'Rollerblading', 'BMX', 'Motocross', 'Mountain Biking',
            'Triathlon', 'Ironman', 'Dodgeball', 'Lacrosse', 'Softball',
            'Cheerleading', 'Dance', 'Ballet', 'Jazz', 'Hip Hop',
            'Breakdancing', 'Ballroom Dancing', 'Salsa', 'Tango', 'Zumba',
            'Pilates', 'Aerobics', 'Bodybuilding', 'Weightlifting', 'Powerlifting',
            'CrossFit', 'Spinning', 'Rowing Machine', 'Elliptical', 'Treadmill',
            'Parkour', 'Free Running', 'Orienteering', 'Geocaching', 'Fishing',
            'Hunting', 'Paintball', 'Laser Tag', 'Airsoft', 'Bowling',
            'Billiards', 'Pool', 'Snooker', 'Darts', 'Table Soccer',
            'Foosball', 'Ping Pong', 'Paddle Tennis', 'Pickleball', 'Squash',
            'Racquetball', 'Netball', 'Handball', 'Kickball', 'Ultimate Frisbee',
            'Frisbee Golf', 'Disc Golf', 'Spikeball', 'Cornhole', 'Bocce Ball',
            'Petanque', 'Croquet', 'Horseshoes', 'Tug of War', 
            'Three-Legged Race', 'Egg and Spoon Race', 'Sack Race', 
            'Obstacle Course', 'Relay Race', 'Tag', 'Hide and Seek', 'Capture the Flag',
            'Simon Says', 'Musical Chairs', 'Duck Duck Goose', 'Red Light Green Light', 'Hopscotch',
            'Jacks', 'Marbles', 'Skipping Rope', 'Jump Rope', 'Double Dutch',
            'Hula Hoop', 'Yo-Yo', 'Kite Flying', 'Model Rocketry', 'RC Cars',
            'RC Planes', 'RC Boats', 'RC Helicopters', 'Drone Racing', 'Gliding',
            'Hang Gliding', 'Paragliding', 'Skydiving', 'Bungee Jumping', 'Base Jumping',
            'Windsurfing', 'Kitesurfing', 'Bodyboarding', 'Wakeboarding', 'Water Skiing',
            'Jet Skiing', 'Parasailing', 'Stand-Up Paddleboarding', 'White Water Rafting', 'Scuba Diving'
        ];
    } else if (theme === 'books') {
        return [
            'Pride and Prejudice', 'Moby Dick', '1984', 'The Great Gatsby', 'War and Peace',
            'To Kill a Mockingbird', 'The Catcher in the Rye', 'The Hobbit', 'The Lord of the Rings', 'Harry Potter',
            'The Da Vinci Code', 'The Alchemist', 'The Kite Runner', 'Life of Pi', 'The Book Thief',
            'The Hunger Games', 'Twilight', 'Percy Jackson', 'Divergent', 'The Maze Runner',
            'The Chronicles of Narnia', 'The Fault in Our Stars', 'Gone Girl', 'The Girl on the Train', 'Fifty Shades of Grey',
            'A Song of Ice and Fire', 'The Handmaid\'s Tale', 'Brave New World', 'Fahrenheit 451', 'Jane Eyre',
            'Wuthering Heights', 'Little Women', 'The Adventures of Sherlock Holmes', 'Dracula', 'Frankenstein',
            'The Picture of Dorian Gray', 'Catch-22', 'Slaughterhouse-Five', 'One Hundred Years of Solitude',
            'Beloved', 'Invisible Man', 'The Grapes of Wrath', 'Of Mice and Men', 'East of Eden',
            'The Old Man and the Sea', 'For Whom the Bell Tolls', 'The Sun Also Rises', 'A Farewell to Arms', 'The Call of the Wild',
            'White Fang', 'The Jungle', 'The Road', 'Blood Meridian', 'All the Pretty Horses',
            'No Country for Old Men', 'The Bell Jar', 'The Metamorphosis', 'The Trial', 'Crime and Punishment',
            'The Brothers Karamazov', 'Anna Karenina', 'Madame Bovary', 'Les Misérables', 'The Count of Monte Cristo',
            'Don Quixote', 'The Three Musketeers', 'A Tale of Two Cities', 'Great Expectations', 'David Copperfield',
            'Oliver Twist', 'A Christmas Carol', 'The Secret Garden', 'Alice\'s Adventures in Wonderland', 'Through the Looking-Glass',
            'Peter Pan', 'Treasure Island', 'The Strange Case of Dr Jekyll and Mr Hyde', 'The War of the Worlds', 'The Time Machine',
            'Journey to the Center of the Earth', 'Twenty Thousand Leagues Under the Sea', 'Around the World in Eighty Days', 'The Phantom of the Opera', 'The Hunchback of Notre-Dame',
            'The Man in the Iron Mask', 'The Odyssey', 'The Iliad', 'The Aeneid', 'The Divine Comedy', 'Paradise Lost',
            'Beowulf', 'The Canterbury Tales', 'The Faerie Queene', 'The Pilgrim\'s Progress', 'Gulliver\'s Travels',
            'Robinson Crusoe', 'Moll Flanders', 'Pamela', 'Clarissa', 'Tristram Shandy',
            'Candide', 'The Sorrows of Young Werther', 'Faust', 'The Red and the Black', 'Sentimental Education', 'Doctor Zhivago',
            'Love in the Time of Cholera', 'Chronicle of a Death Foretold', 'Of Love and Other Demons', 'The Autumn of the Patriarch'
        ];
    } else if (theme === 'songs') {
        return [
            'Bohemian Rhapsody', 'Hey Jude', 'Imagine', 'Hotel California', 'Like a Rolling Stone',
            'Smells Like Teen Spirit', 'Stairway to Heaven', 'Let It Be', 'Billie Jean', 'I Will Always Love You',
            'Rolling in the Deep', 'Purple Rain', 'Thriller', 'Born to Run', 'Yesterday',
            'Good Vibrations', 'What\'s Going On', 'My Generation', 'Sweet Child o\' Mine', 'London Calling',
            'I Want to Hold Your Hand', 'Johnny B. Goode', 'Hound Dog', 'Dancing Queen', 'Like a Prayer',
            'Every Breath You Take', 'Help!', 'Crazy', 'Waterloo', 'All Along the Watchtower',
            'Baba O\'Riley', 'Blowin\' in the Wind', 'Summertime Blues', 'The Twist', 'Sweet Caroline',
            'Wonderwall', 'Piano Man', 'Everyday People', 'I\'ll Be There', 'Crazy in Love',
            'Just My Imagination', 'Space Oddity', 'Ain\'t No Mountain High Enough', 'American Pie', 'Suspicious Minds',
            'Fire and Rain', 'Superstition', 'Light My Fire', 'My Girl', 'Firework',
            'California Dreamin\'', 'Eleanor Rigby', 'Black Dog', 'Moondance', 'Help Me',
            'No Woman, No Cry', 'Brown Eyed Girl', 'Doo Wop (That Thing)', 'Dream On', 'Gimme Shelter',
            'Let\'s Stay Together', 'Stand By Me', 'I Feel Good', 'You Send Me', 'I Heard It Through the Grapevine',
            'Ode to Billie Joe', 'Stayin\' Alive', 'Eight Miles High', 'Heartbreak Hotel', 'I Got You (I Feel Good)',
            'Go Your Own Way', 'Layla', 'Purple Haze', 'All I Have to Do Is Dream', 'Stand!',
            'Proud Mary', 'You Really Got Me', 'Thunder Road', 'Brown Sugar', 'Blue Monday',
            'Rapper\'s Delight', 'Suite: Judy Blue Eyes', 'Smoke on the Water', 'That\'s All Right', 'Papa Was a Rollin\' Stone',
            'I Want You Back', 'O-o-h Child', 'Sweet Home Alabama', 'Rock Around the Clock', 'Ruby Tuesday',
            'Everyday I Write the Book', 'Sunshine of Your Love', 'Sympathy for the Devil', 'Sultans of Swing', 'Walk This Way',
            'Rock Lobster', 'In My Life', 'Tiny Dancer', 'Wish You Were Here',
            'Walk on the Wild Side', 'September Gurls', 'The Message', 'The End', 'Born in the U.S.A.', 'Good Times', 'With or Without You', 'Runaway', 'Tumbling Dice',
            'Bye Bye Love', 'Move On Up', 'Little Wing', 'Ohio', 'I Wanna Be Your Dog',
            'Sweet Little Sixteen', 'Rockin\' in the USA', 'Time Is on My Side', 'Whole Lotta Love', 'Boogie Chillen', 'Love Me Do',
            'Black Magic Woman', 'The Weight', 'Son of a Preacher Man', 'Free Fallin\'', 'Wild Horses',
            'Let\'s Get It On', 'Born to Be Wild', 'Don\'t Stop Believin\'', 'Gloria', 'Tangled Up in Blue',
            'More Than a Feeling', 'Sweet Jane', 'All You Need Is Love', 'Bad Moon Rising',
            'Desperado', 'The Boys of Summer', 'With a Little Help from My Friends', 'Heart of Gold', 'Good Lovin\'', 'Landslide', 'Miss You', 'Can\'t Buy Me Love',
            'Roxanne', 'Alison', 'Sweet Child O\' Mine', 'Maggie May',
            'Radio Free Europe', 'American Girl', 'Stand Back', 'Enter Sandman', 'Rhiannon',
            'Comfortably Numb', 'Dancing in the Dark', 'People Get Ready', 'For What It\'s Worth', 'Black',
            'All I Want Is You', 'The Night They Drove Old Dixie Down', 'Lay Lady Lay', 'It\'s Too Late',
            'River Deep, Mountain High', 'Fortunate Son', 'Your Song', 'Don\'t Think Twice, It\'s All Right', 'Nothing Compares 2 U', 
            'Subterranean Homesick Blues', 'We Will Rock You', 'My Sweet Lord',
            'Back in Black', 'Kashmir', 'Free Bird', 'Respect', 'When Doves Cry', 'I Walk the Line',
            'Beat It', 'Hey Ya!', 'Kiss', 'Super Freak',
            'Tainted Love', 'Sweet Dreams (Are Made of This)', 'Don\'t You Want Me', 'Like a Virgin', 'Hungry Like the Wolf', 'Pour Some Sugar on Me', 'Livin\' on a Prayer',
            'Straight Outta Compton', 'Losing My Religion',
            'Sabotage', 'No Diggity', 'I Want It That Way', 'Wannabe', 'Genie in a Bottle',
            'Livin\' la Vida Loca', 'Bills, Bills, Bills', 'Smooth', 'Bye Bye Bye', 'Oops!... I Did It Again',
            'Yeah!', 'Gold Digger', 'Irreplaceable',
            'Umbrella', 'Single Ladies (Put a Ring on It)', 'I Gotta Feeling', 'Poker Face', 'Empire State of Mind',
            'Party Rock Anthem', 'Somebody That I Used to Know', 'Call Me Maybe', 'Thrift Shop',
            'Blurred Lines', 'Happy', 'Uptown Funk', 'Shape of You', 'Despacito',
            'Sicko Mode', 'Old Town Road', 'Dance Monkey', 'Blinding Lights', 'WAP',
            'Drivers License', 'Levitating', 'Montero (Call Me by Your Name)', 'Peaches', 'Save Your Tears',
            'Kiss Me More', 'Good 4 U', 'Stay', 'Butter', 'Industry Baby',
            'Bad Habits', 'Take My Breath', 'Heat Waves', 'Deja Vu', 'Permission to Dance',
            'Happier Than Ever', 'Ghost', 'Way 2 Sexy', 'Need to Know',
            'Bad Boy', 'Traitor', 'Meet Me at Our Spot', 'Thot Shit', 'Heartbreak Anniversary',
            'Astronaut in the Ocean', 'Fancy Like', 'Knife Talk', 'Tombstone', 'Essence',
            'Famous Friends', 'Waves', 'You Right', 'Happier', 'Monsters',
            'One Right Now', 'The Joker And The Queen', 'I Hate U', 'My Universe', 'Love Again', 'The Beatles', 'Elvis Presley', 'Michael Jackson', 'Madonna', 'Led Zeppelin',
            'Bob Dylan', 'Prince', 'The Rolling Stones', 'David Bowie', 'Queen',
            'The Beach Boys', 'Jimi Hendrix', 'Stevie Wonder', 'Nirvana', 'The Who',
            'Pink Floyd', 'Bruce Springsteen', 'The Eagles', 'U2', 'Aretha Franklin',
            'Bob Marley', 'Frank Sinatra', 'James Brown', 'The Doors', 'Janis Joplin',
            'Johnny Cash', 'Miles Davis', 'Ray Charles', 'Eric Clapton', 'The Supremes',
            'The Temptations', 'Marvin Gaye', 'The Four Seasons', 'Buddy Holly', 'The Velvet Underground',
            'Elton John', 'The Police', 'The Cure', 'Radiohead', 'AC/DC',
            'Metallica', 'Guns N\' Roses', 'Pearl Jam', 'The Clash', 'R.E.M.',
            'Bon Jovi', 'Red Hot Chili Peppers', 'The Ramones', 'Talking Heads', 'Fleetwood Mac',
            'The Kinks', 'Cream', 'The Byrds', 'Simon & Garfunkel', 'The Grateful Dead',
            'The Yardbirds', 'The Band', 'Deep Purple', 'KISS', 'Genesis',
            'The Bee Gees', 'The Hollies', 'The Everly Brothers', 'The Monkees', 'The Mamas & The Papas',
            'The Ronettes', 'The Shirelles', 'The Chiffons', 'The Crystals',
            'Chuck Berry', 'Little Richard', 'B.B. King', 'Muddy Waters', 'John Lee Hooker',
            'Howlin\' Wolf', 'Bo Diddley', 'Fats Domino', 'Louis Armstrong',
            'Duke Ellington', 'Benny Goodman', 'Count Basie', 'Charlie Parker', 'Dizzy Gillespie',
        ];
    } else if (theme === 'food') {
        return [
            'Pizza', 'Burger', 'Pasta', 'Sushi', 'Steak',
            'Tacos', 'Burritos', 'Salad', 'Fried Chicken', 'Ice Cream',
            'Chocolate', 'Cake', 'Cookies', 'Brownies', 'Muffins',
            'Sandwich', 'Hot Dog', 'French Fries', 'Onion Rings', 'Nachos',
            'Spaghetti', 'Lasagna', 'Ravioli', 'Mac and Cheese', 'Risotto',
            'Paella', 'Tapas', 'Fajitas', 'Quesadilla', 'Enchilada',
            'Guacamole', 'Hummus', 'Falafel', 'Shawarma', 'Kebab',
            'Pizza Margherita', 'Pizza Pepperoni', 'Pizza Hawaiian', 'Pizza BBQ Chicken', 'Pizza Veggie',
            'Burger Cheese', 'Burger Bacon', 'Burger Mushroom Swiss', 'Burger BBQ', 'Burger Veggie',
            'Pasta Carbonara', 'Pasta Alfredo', 'Pasta Marinara', 'Pasta Bolognese', 'Pasta Pesto',
            'Sushi Rolls', 'Sashimi', 'Nigiri', 'Tempura', 'Miso Soup',
            'Steak Ribeye', 'Steak T-Bone', 'Steak Sirloin', 'Steak Filet Mignon', 'Steak Porterhouse',
            'Tacos Beef', 'Tacos Chicken', 'Tacos Fish', 'Tacos Shrimp', 'Tacos Veggie',
            'Burritos Beef', 'Burritos Chicken', 'Burritos Pork', 'Burritos Veggie', 'Burritos Breakfast',
            'Salad Caesar', 'Salad Greek', 'Salad Cobb', 'Salad Garden', 'Salad Caprese',
            'Fried Chicken Wings', 'Fried Chicken Tenders', 'Fried Chicken Drumsticks', 'Fried Chicken Thighs', 'Fried Chicken Sandwich',
            'Ice Cream Vanilla', 'Ice Cream Chocolate', 'Ice Cream Strawberry', 'Ice Cream Mint Chocolate Chip', 'Ice Cream Cookie Dough',
            'Chocolate Dark', 'Chocolate Milk', 'Chocolate White', 'Chocolate Truffle', 'Chocolate Fudge',
            'Cake Chocolate', 'Cake Vanilla', 'Cake Red Velvet', 'Cake Carrot', 'Cake Cheesecake',
            'Cookies Chocolate Chip', 'Cookies Oatmeal Raisin', 'Cookies Peanut Butter', 'Cookies Sugar', 'Cookies Snickerdoodle',
            'Brownies Fudge', 'Brownies Nut', 'Brownies Blonde', 'Brownies Cheesecake', 'Brownies Gluten-Free',
            'Muffins Blueberry', 'Muffins Chocolate Chip', 'Muffins Banana Nut', 'Muffins Lemon Poppy Seed', 'Muffins Bran',
            'Sandwich BLT', 'Sandwich Turkey', 'Sandwich Ham', 'Sandwich Club', 'Sandwich Grilled Cheese',
            'Hot Dog Classic', 'Hot Dog Chili', 'Hot Dog Chicago', 'Hot Dog New York', 'Hot Dog Veggie',
            'French Fries Classic', 'French Fries Curly', 'French Fries Sweet Potato', 'French Fries Waffle', 'French Fries Cheese',
            'Onion Rings Beer Battered', 'Onion Rings Panko', 'Onion Rings Tempura', 'Onion Rings Gluten-Free', 'Onion Rings Spicy',
            'Nachos Beef', 'Nachos Chicken', 'Nachos Veggie', 'Nachos Cheese', 'Nachos Supreme'
        ];
    } else if (theme === 'occupations') {
        return [
            'Doctor', 'Nurse', 'Teacher', 'Engineer', 'Lawyer',
            'Scientist', 'Chef', 'Police Officer', 'Firefighter', 'Pilot',
            'Architect', 'Accountant', 'Artist', 'Musician', 'Actor',
            'Writer', 'Journalist', 'Photographer', 'Designer', 'Plumber',
            'Electrician', 'Carpenter', 'Mechanic', 'Driver', 'Farmer',
            'Gardener', 'Dentist', 'Veterinarian', 'Pharmacist', 'Therapist',
            'Psychologist', 'Librarian', 'Historian', 'Curator', 'Archaeologist',
            'Anthropologist', 'Sociologist', 'Economist', 'Geographer', 'Political Scientist',
            'Mathematician', 'Statistician', 'Astronomer', 'Physicist', 'Chemist',
            'Biologist', 'Geologist', 'Ecologist', 'Meteorologist', 'Oceanographer',
            'Botanist', 'Zoologist', 'Microbiologist', 'Geneticist', 'Immunologist',
            'Cardiologist', 'Dermatologist', 'Neurologist', 'Oncologist', 'Pediatrician',
            'Surgeon', 'Radiologist', 'Anesthesiologist', 'Optometrist', 'Orthodontist',
            'Endodontist', 'Periodontist', 'Prosthodontist', 'Chiropractor', 'Physical Therapist',
            'Occupational Therapist', 'Speech Therapist', 'Respiratory Therapist', 'Dietitian', 'Nutritionist',
            'Health Educator', 'Community Health Worker', 'Social Worker', 'Counselor', 'Marriage and Family Therapist',
            'Clinical Psychologist', 'School Psychologist', 'Industrial-Organizational Psychologist', 'Sports Psychologist', 'Forensic Psychologist',
            'Human Resources Specialist', 'Training and Development Specialist', 'Labor Relations Specialist', 'Compensation and Benefits Specialist', 'Recruiter',
            'Sales Representative', 'Sales Manager', 'Marketing Manager', 'Public Relations Specialist', 'Market Research Analyst',
            'Advertising Sales Agent', 'Real Estate Agent', 'Insurance Agent', 'Financial Advisor', 'Loan Officer',
            'Bank Teller', 'Bookkeeper', 'Credit Analyst', 'Tax Preparer', 'Budget Analyst',
            'Financial Analyst', 'Investment Banker', 'Personal Banker', 'Mortgage Broker', 'Actuary',
            'Auditor', 'Claims Adjuster', 'Underwriter', 'Risk Manager', 'Compliance Officer',
            'Fundraiser', 'Event Planner', 'Meeting Coordinator', 'Convention Organizer', 'Travel Agent',
            'Hotel Manager', 'Concierge', 'Tour Guide', 'Cruise Director', 'Airline Attendant',
            'Bartender', 'Barista', 'Waiter', 'Host', 'Dishwasher',
            'Cashier', 'Retail Salesperson', 'Stock Clerk', 'Customer Service Representative', 'Telemarketer',
            'Call Center Representative', 'Dispatcher', 'Office Clerk', 'Secretary', 'Administrative Assistant',
            'Executive Assistant', 'Office Manager', 'File Clerk', 'Data Entry Clerk', 'Receptionist'
        ];
    } else if (theme === 'fairytales') {
        return [
            'Cinderella', 'Snow White', 'Sleeping Beauty', 'Ariel', 'Belle',
            'Rapunzel', 'Mulan', 'Pocahontas', 'Elsa', 'Anna',
            'Moana', 'Jasmine', 'Tiana', 'Merida', 'Maui',
            'Aladdin', 'Genie', 'Jafar', 'Maleficent', 'Ursula',
            'Captain Hook', 'Wendy', 'Tinker Bell', 'The Lost Boys',
            'The Little Mermaid', 'The Evil Queen', 'Prince Charming', 'The Beast', 'Gaston',
            'The Fairy Godmother', 'The Seven Dwarfs', 'King Triton', 'Sebastian', 'Flounder',
            'Mufasa', 'Simba', 'Scar', 'Timon', 'Pumbaa',
            'Nala', 'Rafiki', 'Zazu', 'The Hyenas', 'The Three Little Pigs',
            'The Big Bad Wolf', 'Red Riding Hood', 'The Huntsman', 'The Woodcutter', 'The Gingerbread Man',
            'Hansel', 'Gretel', 'The Wicked Witch', 'Rumpelstiltskin', 'Jack and the Beanstalk',
            'The Giant', 'The Golden Goose', 'The Magic Harp', 'The Frog Prince', 'The Princess and the Pea',
            'The Snow Queen', 'The Ice Queen', 'The Little Match Girl', 'Thumbelina', 'The Ugly Duckling',
            'The Emperor', 'The Nightingale', 'The Steadfast Tin Soldier', 'The Emperor\'s New Clothes',
            'The Nightingale',
        ];    
    }    return [];
}