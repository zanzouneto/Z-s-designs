document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('guessed').addEventListener('click', guessedWord);
document.getElementById('pass').addEventListener('click', passWord);
document.getElementById('new-game').addEventListener('click', startNewRound);
document.getElementById('card').addEventListener('touchstart', handleTouchStart, false);
document.getElementById('card').addEventListener('touchmove', handleTouchMove, false);

let timerInterval;
let score = 0;
let currentWords = [];
let currentWordIndex = 0;
let passedWords = [];


const themes = {
    tv: [
        { word: 'Inception', taboo: ['Movie', 'Dream', 'Leonardo DiCaprio', 'Mind', 'Christopher Nolan'] },
        { word: 'Titanic', taboo: ['Ship', 'Iceberg', 'Leonardo DiCaprio', 'Rose', 'Sinking'] },
        { word: 'Action', taboo: ['Adventure', 'Exciting', 'Thrilling', 'Stunts', 'Fight'] },
        { word: 'Comedy', taboo: ['Funny', 'Humor', 'Laughter', 'Jokes', 'Sitcom'] },
        { word: 'Drama', taboo: ['Serious', 'Emotional', 'Intense', 'Conflict', 'Tension'] },
        { word: 'Horror', taboo: ['Scary', 'Fear', 'Thriller', 'Gore', 'Monster'] },
        { word: 'Romance', taboo: ['Love', 'Relationship', 'Affection', 'Couple', 'Heart'] },
        { word: 'Sci-Fi', taboo: ['Science', 'Futuristic', 'Space', 'Technology', 'Alien'] },
        { word: 'Fantasy', taboo: ['Magic', 'Imaginary', 'Mythical', 'Creatures', 'Epic'] },
        { word: 'Thriller', taboo: ['Suspense', 'Tension', 'Excitement', 'Mystery', 'Action'] },
        { word: 'Animation', taboo: ['Cartoon', 'Animated', 'Drawing', 'Kids', 'Disney'] },
        { word: 'Documentary', taboo: ['Real', 'Factual', 'Non-fiction', 'Informational', 'Truth'] },
        { word: 'Musical', taboo: ['Music', 'Song', 'Dance', 'Broadway', 'Performance'] },
        { word: 'Western', taboo: ['Cowboy', 'Wild West', 'Gunfight', 'Saloon', 'Frontier'] },
        { word: 'Mystery', taboo: ['Secret', 'Puzzle', 'Unknown', 'Detective', 'Clue'] },
        { word: 'Crime', taboo: ['Criminal', 'Police', 'Investigation', 'Murder', 'Detective'] },
        { word: 'Biography', taboo: ['Life', 'Story', 'History', 'True', 'Autobiography'] },
        { word: 'History', taboo: ['Past', 'Historical', 'Events', 'Timeline', 'Ancient'] },
        { word: 'War', taboo: ['Conflict', 'Battle', 'Soldier', 'Combat', 'Military'] },
        { word: 'Family', taboo: ['Parents', 'Children', 'Love', 'Home', 'Together'] },
        { word: 'Superhero', taboo: ['Hero', 'Power', 'Comic', 'Marvel', 'DC'] },
        { word: 'Spy', taboo: ['Secret', 'Espionage', 'Investigation', 'Agent', 'Covert'] },
        { word: 'Zombie', taboo: ['Undead', 'Apocalypse', 'Horror', 'Survival', 'Epidemic'] },
        { word: 'Alien', taboo: ['Extraterrestrial', 'Space', 'Creature', 'Sci-Fi', 'Unknown'] },
        { word: 'Apocalyptic', taboo: ['End', 'World', 'Doomsday', 'Disaster', 'Survival'] },
        { word: 'Art House', taboo: ['Independent', 'Alternative', 'Experimental', 'Cinema', 'Avant-garde'] },
        { word: 'Blockbuster', taboo: ['Big-budget', 'Success', 'Hit', 'Popular', 'Box Office'] },
        { word: 'Cult', taboo: ['Following', 'Devoted', 'Obscure', 'Niche', 'Fan'] },
        { word: 'Direct-to-Video', taboo: ['DVD', 'Release', 'Bypass', 'Cinema', 'Straight-to-Video'] },
        { word: 'Epic', taboo: ['Grand', 'Spectacular', 'Legendary', 'Saga', 'Adventure'] },
        { word: 'Film Noir', taboo: ['Dark', 'Gritty', 'Crime', 'Black-and-white', 'Mystery'] },
        { word: 'Independent', taboo: ['Indie', 'Alternative', 'Small', 'Non-mainstream', 'Autonomous'] },
        { word: 'Mockumentary', taboo: ['Spoof', 'Parody', 'Fake', 'Satire', 'Faux'] },
        { word: 'Noir', taboo: ['Dark', 'Black', 'Gloomy', 'Mystery', 'Shadow'] },
        { word: 'Short Film', taboo: ['Brief', 'Short-length', 'Movie', 'Clip', 'Mini'] },
        { word: 'Silent Film', taboo: ['Mute', 'No Sound', 'Black-and-white', 'Old', 'Classic'] },
        { word: 'Surreal', taboo: ['Dreamlike', 'Fantasy', 'Abstract', 'Bizarre', 'Unreal'] },
        { word: 'Tragedy', taboo: ['Sad', 'Unfortunate', 'Drama', 'Catastrophe', 'Death'] },
        { word: 'Urban', taboo: ['City', 'Metropolitan', 'Contemporary', 'Modern', 'Downtown'] },
        { word: 'Adventure', taboo: ['Journey', 'Exciting', 'Exploration', 'Quest', 'Travel'] },
        { word: 'Comics', taboo: ['Comic Books', 'Superheroes', 'Graphic Novels', 'Cartoon', 'Illustrated'] },
        { word: 'Dialogue', taboo: ['Conversation', 'Discussion', 'Script', 'Lines', 'Words'] },
        { word: 'Entertainment', taboo: ['Amusement', 'Enjoyment', 'Fun', 'Performance', 'Show'] },
        { word: 'Fiction', taboo: ['Imaginary', 'Made-up', 'Story', 'Fantasy', 'Novel'] },
        { word: 'Genre', taboo: ['Category', 'Type', 'Style', 'Kind', 'Group'] },
        { word: 'Hollywood', taboo: ['Film Industry', 'Entertainment', 'Movies', 'California', 'Studio'] },
        { word: 'Improvisation', taboo: ['Spontaneous', 'Unrehearsed', 'Ad-lib', 'Acting', 'Performance'] },
        { word: 'Juxtaposition', taboo: ['Comparison', 'Contrast', 'Side-by-side', 'Placement', 'Together'] },
        { word: 'Kaiju', taboo: ['Monster', 'Giant', 'Creature', 'Tokusatsu', 'Godzilla'] },
        { word: 'Lighting', taboo: ['Illuminate', 'Brighten', 'Lamp', 'Light Source', 'Illuminate'] },
        { word: 'Masterpiece', taboo: ['Magnum Opus', 'Work of Art', 'Creation', 'Perfection', 'Best'] },
        { word: 'Narrative', taboo: ['Story', 'Tale', 'Account', 'Chronicle', 'Narration'] },
        { word: 'Oscar', taboo: ['Academy Award', 'Award', 'Film', 'Best', 'Nomination'] },
        { word: 'Premiere', taboo: ['Debut', 'First', 'Opening', 'Release', 'Launch'] },
        { word: 'Quirky', taboo: ['Unconventional', 'Offbeat', 'Unique', 'Eccentric', 'Individual'] },
        { word: 'Reboot', taboo: ['Restart', 'Revamp', 'Remake', 'Reinvent', 'New Version'] },
        { word: 'Soundtrack', taboo: ['Music', 'Score', 'Songs', 'Film', 'Background'] },
        { word: 'Talent', taboo: ['Skill', 'Ability', 'Gifted', 'Talented', 'Artistic'] },
        { word: 'Universal', taboo: ['Global', 'Worldwide', 'International', 'Common', 'Ubiquitous'] },
        { word: 'Villain', taboo: ['Bad Guy', 'Antagonist', 'Evil', 'Enemy', 'Adversary'] },
        { word: 'Wardrobe', taboo: ['Clothes', 'Costumes', 'Outfits', 'Attire', 'Garments'] },
        { word: 'Xylophone', taboo: ['Instrument', 'Music', 'Percussion', 'Wooden', 'Bars'] },
        { word: 'Zany', taboo: ['Comical', 'Wacky', 'Crazy', 'Foolish', 'Silly'] },
        { word: 'Audience', taboo: ['Viewers', 'Spectators', 'Crowd', 'Public', 'Fans'] },
        { word: 'Casting', taboo: ['Selection', 'Choosing', 'Actors', 'Roles', 'Casting Call'] },
        { word: 'Director', taboo: ['Filmmaker', 'Leader', 'Supervisor', 'Guidance', 'Captain'] },
        { word: 'Emotion', taboo: ['Feeling', 'Sentiment', 'Passion', 'Heart', 'Soul'] },
        { word: 'Festival', taboo: ['Event', 'Celebration', 'Occasion', 'Gathering', 'Party'] },
        { word: 'Genre', taboo: ['Category', 'Type', 'Style', 'Kind', 'Group'] },
        { word: 'Iconic', taboo: ['Symbolic', 'Legendary', 'Famous', 'Recognizable', 'Memorable'] },
        { word: 'Journey', taboo: ['Adventure', 'Travel', 'Trip', 'Quest', 'Expedition'] },
        { word: 'Killer', taboo: ['Murderer', 'Assassin', 'Death', 'Deadly', 'Homicide'] },
        { word: 'Landscape', taboo: ['Scenery', 'View', 'Terrain', 'Outdoors', 'Nature'] },
        { word: 'Makeup', taboo: ['Cosmetics', 'Beauty', 'Foundation', 'Powder', 'Lipstick'] },
        { word: 'Narrative', taboo: ['Story', 'Tale', 'Account', 'Chronicle', 'Narration'] },
        { word: 'Opening Scene', taboo: ['Beginning', 'Start', 'First Scene', 'Intro', 'Initial'] },
        { word: 'Plot Twist', taboo: ['Unexpected', 'Surprise', 'Turn', 'Twist', 'Revelation'] },
        { word: 'Quest', taboo: ['Journey', 'Adventure', 'Mission', 'Search', 'Expedition'] },
        { word: 'Rivalry', taboo: ['Competition', 'Conflict', 'Opposition', 'Contest', 'Rival'] },
        { word: 'Trailer', taboo: ['Preview', 'Teaser', 'Promotion', 'Clip', 'Sneak Peek'] },
        { word: 'Villain', taboo: ['Bad Guy', 'Antagonist', 'Evil', 'Enemy', 'Adversary'] },
        { word: 'Wardrobe', taboo: ['Clothes', 'Costumes', 'Outfits', 'Attire', 'Garments'] },
        { word: 'Xylophone', taboo: ['Instrument', 'Music', 'Percussion', 'Wooden', 'Bars'] },
        { word: 'Zany', taboo: ['Comical', 'Wacky', 'Crazy', 'Foolish', 'Silly'] },
        { word: 'Audience', taboo: ['Viewers', 'Spectators', 'Crowd', 'Public', 'Fans'] },
        { word: 'Casting', taboo: ['Selection', 'Choosing', 'Actors', 'Roles', 'Casting Call'] },
        { word: 'Director', taboo: ['Filmmaker', 'Leader', 'Supervisor', 'Guidance', 'Captain'] },
        { word: 'Emotion', taboo: ['Feeling', 'Sentiment', 'Passion', 'Heart', 'Soul'] },
        { word: 'Festival', taboo: ['Event', 'Celebration', 'Occasion', 'Gathering', 'Party'] },
        { word: 'Genre', taboo: ['Category', 'Type', 'Style', 'Kind', 'Group'] },
        { word: 'Iconic', taboo: ['Symbolic', 'Legendary', 'Famous', 'Recognizable', 'Memorable'] },
        { word: 'Journey', taboo: ['Adventure', 'Travel', 'Trip', 'Quest', 'Expedition'] },
        { word: 'Killer', taboo: ['Murderer', 'Assassin', 'Death', 'Deadly', 'Homicide'] },
        { word: 'Landscape', taboo: ['Scenery', 'View', 'Terrain', 'Outdoors', 'Nature'] },
        { word: 'Makeup', taboo: ['Cosmetics', 'Beauty', 'Foundation', 'Powder', 'Lipstick'] },
        { word: 'Narrative', taboo: ['Story', 'Tale', 'Account', 'Chronicle', 'Narration'] },
        { word: 'Visual Effects', taboo: ['Special Effects', 'CGI', 'Computer-generated', 'Visuals', 'Graphics'] },
        { word: 'Widescreen', taboo: ['Aspect Ratio', 'Screen', 'Wide', 'Cinemascope', 'Panavision'] },
        { word: 'Xenophobia', taboo: ['Fear', 'Hatred', 'Dislike', 'Prejudice', 'Foreign'] },
        { word: 'Yearbook', taboo: ['School', 'Memories', 'Photos', 'Students', 'Year'] },
        { word: 'Zombie Apocalypse', taboo: ['Undead', 'Horror', 'Survival', 'End of the World', 'Doomsday'] },
        { word: 'Auteur', taboo: ['Director', 'Filmmaker', 'Author', 'Creator', 'Visionary'] },
        { word: 'Bloopers', taboo: ['Outtakes', 'Mistakes', 'Errors', 'Gag Reel', 'Blunders'] },
        { word: 'Cameo', taboo: ['Appearance', 'Brief Role', 'Guest Appearance', 'Star', 'Scene'] },
        { word: 'Dialogue', taboo: ['Conversation', 'Discussion', 'Script', 'Lines', 'Words'] },
        { word: 'Entertainment', taboo: ['Amusement', 'Enjoyment', 'Fun', 'Performance', 'Show'] },
        { word: 'Film Festival', taboo: ['Cinema', 'Event', 'Movies', 'Gathering', 'Celebration'] },
        { word: 'Genre', taboo: ['Category', 'Type', 'Style', 'Kind', 'Group'] },
        { word: 'Hollywood', taboo: ['Film Industry', 'Entertainment', 'Movies', 'California', 'Studio'] },
        { word: 'Improvisation', taboo: ['Spontaneous', 'Unrehearsed', 'Ad-lib', 'Acting', 'Performance'] },
        { word: 'Juxtaposition', taboo: ['Comparison', 'Contrast', 'Side-by-side', 'Placement', 'Together'] },
        { word: 'Kaiju', taboo: ['Monster', 'Giant', 'Creature', 'Tokusatsu', 'Godzilla'] },
        { word: 'Lighting', taboo: ['Illuminate', 'Brighten', 'Lamp', 'Light Source', 'Illuminate'] },
        { word: 'Masterpiece', taboo: ['Magnum Opus', 'Work of Art', 'Creation', 'Perfection', 'Best'] },
        { word: 'Narrative', taboo: ['Story', 'Tale', 'Account', 'Chronicle', 'Narration'] },
        { word: 'Oscar', taboo: ['Academy Award', 'Award', 'Film', 'Best', 'Nomination'] },
        { word: 'Premiere', taboo: ['Debut', 'First', 'Opening', 'Release', 'Launch'] },
        { word: 'Quirky', taboo: ['Unconventional', 'Offbeat', 'Unique', 'Eccentric', 'Individual'] },
        { word: 'Reboot', taboo: ['Restart', 'Revamp', 'Remake', 'Reinvent', 'New Version'] },
        { word: 'Soundtrack', taboo: ['Music', 'Score', 'Songs', 'Film', 'Background'] },
        { word: 'Talent', taboo: ['Skill', 'Ability', 'Gifted', 'Talented', 'Artistic'] },
        { word: 'Universal', taboo: ['Global', 'Worldwide', 'International', 'Common', 'Ubiquitous'] },
        { word: 'Villain', taboo: ['Bad Guy', 'Antagonist', 'Evil', 'Enemy', 'Adversary'] },
        { word: 'Wardrobe', taboo: ['Clothes', 'Costumes', 'Outfits', 'Attire', 'Garments'] },
        { word: 'Xylophone', taboo: ['Instrument', 'Music', 'Percussion', 'Wooden', 'Bars'] },
        { word: 'Yearning', taboo: ['Longing', 'Desire', 'Craving', 'Wish', 'Want'] },
        { word: 'Zany', taboo: ['Comical', 'Wacky', 'Crazy', 'Foolish', 'Silly'] },
        { word: 'Audience', taboo: ['Viewers', 'Spectators', 'Crowd', 'Public', 'Fans'] },
        { word: 'Casting', taboo: ['Selection', 'Choosing', 'Actors', 'Roles', 'Casting Call'] },
        { word: 'Director', taboo: ['Filmmaker', 'Leader', 'Supervisor', 'Guidance', 'Captain'] },
        { word: 'Emotion', taboo: ['Feeling', 'Sentiment', 'Passion', 'Heart', 'Soul'] },
        { word: 'Festival', taboo: ['Event', 'Celebration', 'Occasion', 'Gathering', 'Party'] },
        { word: 'Genre', taboo: ['Category', 'Type', 'Style', 'Kind', 'Group'] },
        { word: 'Iconic', taboo: ['Symbolic', 'Legendary', 'Famous', 'Recognizable', 'Memorable'] },
        { word: 'Journey', taboo: ['Adventure', 'Travel', 'Trip', 'Quest', 'Expedition'] },
        { word: 'Killer', taboo: ['Murderer', 'Assassin', 'Death', 'Deadly', 'Homicide'] },
        { word: 'Landscape', taboo: ['Scenery', 'View', 'Terrain', 'Outdoors', 'Nature'] },
        { word: 'Makeup', taboo: ['Cosmetics', 'Beauty', 'Foundation', 'Powder', 'Lipstick'] },
        { word: 'Narrative', taboo: ['Story', 'Tale', 'Account', 'Chronicle', 'Narration'] },
        { word: 'Opening Scene', taboo: ['Beginning', 'Start', 'First Scene', 'Intro', 'Initial'] },
        { word: 'Plot Twist', taboo: ['Unexpected', 'Surprise', 'Turn', 'Twist', 'Revelation'] },
        { word: 'Rivalry', taboo: ['Competition', 'Conflict', 'Opposition', 'Contest', 'Rival'] },
        { word: 'Sequel', taboo: ['Follow-up', 'Next', 'Second Part', 'Continuation', 'Series'] },
        { word: 'Trailer', taboo: ['Preview', 'Teaser', 'Promotion', 'Clip', 'Sneak Peek'] },
        { word: 'Unique', taboo: ['Special', 'Distinctive', 'One-of-a-kind', 'Individual', 'Different'] },
        { word: 'Visual Effects', taboo: ['Special Effects', 'CGI', 'Computer-generated', 'Visuals', 'Graphics'] },
        { word: 'Widescreen', taboo: ['Aspect Ratio', 'Screen', 'Wide', 'Cinemascope', 'Panavision'] },
        { word: 'Xenophobia', taboo: ['Fear', 'Hatred', 'Dislike', 'Prejudice', 'Foreign'] },
        { word: 'Yearbook', taboo: ['School', 'Memories', 'Photos', 'Students', 'Year'] },
        { word: 'Zombie Apocalypse', taboo: ['Undead', 'Horror', 'Survival', 'End of the World', 'Doomsday'] },
        { word: 'Auteur', taboo: ['Director', 'Filmmaker', 'Author', 'Creator', 'Visionary'] },
        { word: 'Bloopers', taboo: ['Outtakes', 'Mistakes', 'Errors', 'Gag Reel', 'Blunders'] },
        { word: 'Cameo', taboo: ['Appearance', 'Brief Role', 'Guest Appearance', 'Star', 'Scene'] },
        { word: 'Dialogue', taboo: ['Conversation', 'Discussion', 'Script', 'Lines', 'Words'] },
        { word: 'Entertainment', taboo: ['Amusement', 'Enjoyment', 'Fun', 'Performance', 'Show'] },
        { word: 'Film Festival', taboo: ['Cinema', 'Event', 'Movies', 'Gathering', 'Celebration'] },
        { word: 'Genre', taboo: ['Category', 'Type', 'Style', 'Kind', 'Group'] },
        { word: 'Hollywood', taboo: ['Film Industry', 'Entertainment', 'Movies', 'California', 'Studio'] },
        { word: 'Improvisation', taboo: ['Spontaneous', 'Unrehearsed', 'Ad-lib', 'Acting', 'Performance'] },
        { word: 'Juxtaposition', taboo: ['Comparison', 'Contrast', 'Side-by-side', 'Placement', 'Together'] },
        { word: 'Kaiju', taboo: ['Monster', 'Giant', 'Creature', 'Tokusatsu', 'Godzilla'] },
        { word: 'Lighting', taboo: ['Illuminate', 'Brighten', 'Lamp', 'Light Source', 'Illuminate'] },
        { word: 'Narrative', taboo: ['Story', 'Tale', 'Account', 'Chronicle', 'Narration'] },
        { word: 'Oscar', taboo: ['Academy Award', 'Award', 'Film', 'Best', 'Nomination'] },
        { word: 'Premiere', taboo: ['Debut', 'First', 'Opening', 'Release', 'Launch'] },
        { word: 'Quirky', taboo: ['Unconventional', 'Offbeat', 'Unique', 'Eccentric', 'Individual'] },
        { word: 'Reboot', taboo: ['Restart', 'Revamp', 'Remake', 'Reinvent', 'New Version'] },
        { word: 'Soundtrack', taboo: ['Music', 'Score', 'Songs', 'Film', 'Background'] },
        { word: 'Talent', taboo: ['Skill', 'Ability', 'Gifted', 'Talented', 'Artistic'] },
        { word: 'Universal', taboo: ['Global', 'Worldwide', 'International', 'Common', 'Ubiquitous'] },
        { word: 'Villain', taboo: ['Bad Guy', 'Antagonist', 'Evil', 'Enemy', 'Adversary'] },
        { word: 'Wardrobe', taboo: ['Clothes', 'Costumes', 'Outfits', 'Attire', 'Garments'] },
        { word: 'Xylophone', taboo: ['Instrument', 'Music', 'Percussion', 'Wooden', 'Bars'] },
        { word: 'Zany', taboo: ['Comical', 'Wacky', 'Crazy', 'Foolish', 'Silly'] },
        { word: 'Audience', taboo: ['Viewers', 'Spectators', 'Crowd', 'Public', 'Fans'] },
        { word: 'Box Office', taboo: ['Revenue', 'Sales', 'Earnings', 'Success', 'Hit'] },
        { word: 'Casting', taboo: ['Selection', 'Choosing', 'Actors', 'Roles', 'Casting Call'] },
        { word: 'Director', taboo: ['Filmmaker', 'Leader', 'Supervisor', 'Guidance', 'Captain'] },
        { word: 'Emotion', taboo: ['Feeling', 'Sentiment', 'Passion', 'Heart', 'Soul'] },
        { word: 'Festival', taboo: ['Event', 'Celebration', 'Occasion', 'Gathering', 'Party'] },
        { word: 'Genre', taboo: ['Category', 'Type', 'Style', 'Kind', 'Group'] },
        { word: 'Hero', taboo: ['Protagonist', 'Good Guy', 'Main Character', 'Lead', 'Heroine'] },
        { word: 'Iconic', taboo: ['Symbolic', 'Legendary', 'Famous', 'Recognizable', 'Memorable'] },
        { word: 'Journey', taboo: ['Adventure', 'Travel', 'Trip', 'Quest', 'Expedition'] },
        { word: 'Killer', taboo: ['Murderer', 'Assassin', 'Death', 'Deadly', 'Homicide'] },
        { word: 'Landscape', taboo: ['Scenery', 'View', 'Terrain', 'Outdoors', 'Nature'] },
        { word: 'Makeup', taboo: ['Cosmetics', 'Beauty', 'Foundation', 'Powder', 'Lipstick'] },

    ],
    adult: [
        { word: 'Affair', taboo: ['Cheating', 'Secret', 'Marriage', 'Spouse', 'Lover'] },
        { word: 'Alcohol', taboo: ['Drink', 'Beer', 'Wine', 'Spirits', 'Liquor'] },
        { word: 'Bondage', taboo: ['Rope', 'Tie', 'Kinky', 'Restraint', 'Sex'] },
        { word: 'Cannabis', taboo: ['Weed', 'Marijuana', 'Joint', 'Pot', 'Smoke'] },
        { word: 'Condom', taboo: ['Protection', 'Sex', 'Safe', 'Latex', 'Prevent'] },
        { word: 'Ecstasy', taboo: ['Drug', 'Pill', 'Party', 'High', 'MDMA'] },
        { word: 'Escort', taboo: ['Prostitute', 'Service', 'Date', 'Sex', 'Paid'] },
        { word: 'Fantasy', taboo: ['Dream', 'Imaginary', 'Desire', 'Erotic', 'Story'] },
        { word: 'Foreplay', taboo: ['Tease', 'Before', 'Sex', 'Touch', 'Arousal'] },
        { word: 'Infidelity', taboo: ['Cheating', 'Adultery', 'Affair', 'Spouse', 'Unfaithful'] },
        { word: 'Libido', taboo: ['Sex', 'Drive', 'Desire', 'Horny', 'Arousal'] },
        { word: 'Lingerie', taboo: ['Underwear', 'Sexy', 'Bra', 'Panties', 'Seductive'] },
        { word: 'Masturbation', taboo: ['Self', 'Sex', 'Pleasure', 'Touch', 'Solo'] },
        { word: 'Mistress', taboo: ['Affair', 'Woman', 'Secret', 'Lover', 'Cheating'] },
        { word: 'Orgasm', taboo: ['Climax', 'Sex', 'Pleasure', 'Ejaculation', 'Peak'] },
        { word: 'Pornography', taboo: ['Porn', 'Sex', 'Adult', 'Video', 'XXX'] },
        { word: 'Prostitution', taboo: ['Sex', 'Paid', 'Service', 'Escort', 'Illegal'] },
        { word: 'Roleplay', taboo: ['Acting', 'Fantasy', 'Costume', 'Sex', 'Scenario'] },
        { word: 'Seduction', taboo: ['Tempt', 'Lure', 'Attract', 'Sex', 'Charm'] },
        { word: 'Stripper', taboo: ['Dance', 'Naked', 'Club', 'Pole', 'Sex'] },
        { word: 'Threesome', taboo: ['Sex', 'Three', 'Partners', 'Group', 'Ménage'] },
        { word: 'Viagra', taboo: ['Pill', 'Erectile', 'Dysfunction', 'Sex', 'Blue'] },
        { word: 'Whiskey', taboo: ['Drink', 'Alcohol', 'Spirits', 'Bar', 'Bourbon'] },
        { word: 'Xanax', taboo: ['Drug', 'Pill', 'Anxiety', 'Prescription', 'Calm'] },
        { word: 'Erotica', taboo: ['Story', 'Sex', 'Literature', 'Fantasy', 'Adult'] },
        { word: 'Fetish', taboo: ['Kink', 'Obsession', 'Sex', 'Desire', 'Fantasy'] },
        { word: 'Handcuffs', taboo: ['Restraint', 'Police', 'Bondage', 'Metal', 'Arrest'] },
        { word: 'Intimacy', taboo: ['Close', 'Personal', 'Sex', 'Relationship', 'Affection'] },
        { word: 'Kama Sutra', taboo: ['Sex', 'Book', 'Positions', 'India', 'Ancient'] },
        { word: 'Lap Dance', taboo: ['Stripper', 'Club', 'Naked', 'Dance', 'Sex'] },
        { word: 'One-night stand', taboo: ['Sex', 'Single', 'Night', 'Casual', 'Hookup'] },
        { word: 'Sensual', taboo: ['Touch', 'Sex', 'Feel', 'Pleasure', 'Soft'] },
        { word: 'Tantric', taboo: ['Sex', 'Meditation', 'Spiritual', 'Yoga', 'Connection'] },
        { word: 'Vibrator', taboo: ['Sex', 'Toy', 'Pleasure', 'Battery', 'Buzz'] },
        { word: 'Aphrodisiac', taboo: ['Food', 'Sex', 'Desire', 'Stimulate', 'Horny'] },
        { word: 'Blindfold', taboo: ['Eyes', 'Cover', 'Blind', 'Dark', 'Sex'] },
        { word: 'Champagne', taboo: ['Drink', 'Alcohol', 'Wine', 'Sparkling', 'Celebration'] },
        { word: 'Club', taboo: ['Dance', 'Music', 'Night', 'Party', 'Drink'] },
        { word: 'Cougar', taboo: ['Older', 'Woman', 'Younger', 'Man', 'Sex'] },
        { word: 'Flirt', taboo: ['Tease', 'Attract', 'Interest', 'Sex', 'Playful'] },
        { word: 'Hangover', taboo: ['Alcohol', 'Drink', 'Morning', 'Sick', 'Headache'] },
        { word: 'Kiss', taboo: ['Lips', 'Mouth', 'Touch', 'Love', 'Affection'] },
        { word: 'Lust', taboo: ['Desire', 'Sex', 'Want', 'Passion', 'Attraction'] },
        { word: 'Massage', taboo: ['Rub', 'Relax', 'Touch', 'Therapy', 'Muscles'] },
        { word: 'Naughty', taboo: ['Bad', 'Sex', 'Mischief', 'Behavior', 'Playful'] },
        { word: 'Orgasmic', taboo: ['Pleasure', 'Climax', 'Sex', 'Intense', 'Feeling'] },
        { word: 'Passion', taboo: ['Love', 'Desire', 'Sex', 'Intensity', 'Emotion'] },
        { word: 'Seduce', taboo: ['Attract', 'Lure', 'Tempt', 'Sex', 'Charm'] },
        { word: 'Shot', taboo: ['Drink', 'Alcohol', 'Small', 'Glass', 'Bar'] },
        { word: 'Spice', taboo: ['Flavor', 'Hot', 'Seasoning', 'Taste', 'Food'] },
        { word: 'Sultry', taboo: ['Hot', 'Sexy', 'Alluring', 'Seductive', 'Steamy'] },
        { word: 'Tequila', taboo: ['Drink', 'Alcohol', 'Shot', 'Mexico', 'Lime'] },
        { word: 'Temptation', taboo: ['Desire', 'Attract', 'Lure', 'Sex', 'Want'] },
        { word: 'Tryst', taboo: ['Secret', 'Meeting', 'Lovers', 'Affair', 'Romance'] },
        { word: 'Unfaithful', taboo: ['Cheating', 'Spouse', 'Affair', 'Betrayal', 'Lover'] },
        { word: 'Voyeur', taboo: ['Watch', 'Spy', 'Sex', 'Secret', 'Peep'] },
        { word: 'Wine', taboo: ['Drink', 'Alcohol', 'Red', 'White', 'Grapes'] },
        { word: 'X-rated', taboo: ['Adult', 'Movie', 'Sex', 'Explicit', 'Porn'] },
        { word: 'Bedroom', taboo: ['Sleep', 'Bed', 'Room', 'Sex', 'House'] },
        { word: 'Burlesque', taboo: ['Show', 'Dance', 'Sexy', 'Performance', 'Strip'] },
        { word: 'Caress', taboo: ['Touch', 'Gentle', 'Affection', 'Soft', 'Love'] },
        { word: 'Couple', taboo: ['Two', 'Pair', 'Relationship', 'Love', 'Partners'] },
        { word: 'Desire', taboo: ['Want', 'Wish', 'Longing', 'Passion', 'Sex'] },
        { word: 'Erotic', taboo: ['Sexual', 'Exciting', 'Arousing', 'Story', 'Desire'] },
        { word: 'Fantasy', taboo: ['Dream', 'Imaginary', 'Desire', 'Erotic', 'Story'] },
        { word: 'G-spot', taboo: ['Orgasm', 'Sex', 'Pleasure', 'Female', 'Sensitive'] },
        { word: 'Hookup', taboo: ['Casual', 'Sex', 'One-night', 'Meeting', 'Date'] },
        { word: 'Intimate', taboo: ['Close', 'Personal', 'Sex', 'Relationship', 'Affection'] },
        { word: 'Juicy', taboo: ['Wet', 'Lush', 'Ripe', 'Succulent', 'Delicious'] },
        { word: 'Kinky', taboo: ['Unusual', 'Sexual', 'Fetish', 'BDSM', 'Roleplay'] },
        { word: 'Lubricant', taboo: ['Oil', 'Grease', 'Wet', 'Sex', 'Friction'] },
        { word: 'Moan', taboo: ['Sound', 'Pleasure', 'Sex', 'Emit', 'Arousal'] },
        { word: 'Nude', taboo: ['Naked', 'Bare', 'Body', 'Art', 'Figure'] },
        { word: 'Pleasure', taboo: ['Enjoyment', 'Satisfaction', 'Sex', 'Delight', 'Joy'] },
        { word: 'Quiver', taboo: ['Tremble', 'Shake', 'Shiver', 'Fear', 'Excitement'] },
        { word: 'Risque', taboo: ['Daring', 'Bold', 'Provocative', 'Risk', 'Sexy'] },
        { word: 'Seductive', taboo: ['Attractive', 'Alluring', 'Charming', 'Sex', 'Desire'] },
        { word: 'Tease', taboo: ['Taunt', 'Flirt', 'Provocation', 'Sex', 'Foreplay'] },
        { word: 'Underwear', taboo: ['Lingerie', 'Garment', 'Clothing', 'Intimate', 'Briefs'] },
        { word: 'Vibrant', taboo: ['Energetic', 'Colorful', 'Lively', 'Dynamic', 'Bright'] },
        { word: 'Wild', taboo: ['Untamed', 'Savage', 'Uncontrolled', 'Animalistic', 'Crazy'] },
        { word: 'Yummy', taboo: ['Delicious', 'Tasty', 'Savory', 'Food', 'Yum'] },
        { word: 'Zesty', taboo: ['Lively', 'Energetic', 'Vibrant', 'Flavorful', 'Spicy'] },
        { word: 'Anal', taboo: ['Sex', 'Intercourse', 'Anus', 'Penetration', 'Backdoor'] },
        { word: 'BDSM', taboo: ['Bondage', 'Discipline', 'Dominance', 'Submission', 'Sadism'] },
        { word: 'Cocaine', taboo: ['Drug', 'White', 'Powder', 'Nose', 'High'] },
        { word: 'Dildo', taboo: ['Sex', 'Toy', 'Penis', 'Vibrator', 'Insert'] },
        { word: 'Erection', taboo: ['Penis', 'Hard', 'Stiff', 'Arousal', 'Sex'] },
        { word: 'Fellatio', taboo: ['Oral', 'Sex', 'Blowjob', 'Mouth', 'Penis'] },
        { word: 'Gangbang', taboo: ['Group', 'Sex', 'Multiple', 'Partners', 'Orgy'] },
        { word: 'Hentai', taboo: ['Anime', 'Cartoon', 'Porn', 'Japanese', 'Explicit'] },
        { word: 'Incest', taboo: ['Family', 'Taboo', 'Relative', 'Sexual', 'Forbidden'] },
        { word: 'Jizz', taboo: ['Semen', 'Ejaculate', 'Fluid', 'Sex', 'Cum'] },
        { word: 'Kink', taboo: ['Unusual', 'Fetish', 'BDSM', 'Sexual', 'Desire'] },
        { word: 'Lesbian', taboo: ['Woman', 'Female', 'Gay', 'Homosexual', 'Love'] },
        { word: 'Ménage à trois', taboo: ['Three', 'Sex', 'Threesome', 'Group', 'Partners'] },
        { word: 'Nipple', taboo: ['Breast', 'Erect', 'Sensitive', 'Touch', 'Sex'] },
        { word: 'Orgy', taboo: ['Sex', 'Group', 'Partners', 'Groupsex', 'Swingers'] },
        { word: 'Penetration', taboo: ['Sex', 'Enter', 'Insert', 'Deep', 'Intercourse'] },
        { word: 'Queef', taboo: ['Vaginal', 'Noise', 'Air', 'Embarrassing', 'Pussy'] },
        { word: 'Rape', taboo: ['Sexual', 'Assault', 'Forced', 'Non-consensual', 'Violent'] },
        { word: 'Semen', taboo: ['Fluid', 'Ejaculate', 'Male', 'Sperm', 'Sex'] },
        { word: 'Tits', taboo: ['Breasts', 'Boobs', 'Chest', 'Female', 'Sexual'] },
        { word: 'Urination', taboo: ['Pee', 'Piss', 'Toilet', 'Bladder', 'Fluid'] },
        { word: 'Vagina', taboo: ['Female', 'Genitals', 'Sex', 'Intercourse', 'Pussy'] },
        { word: 'Wet Dream', taboo: ['Sleep', 'Sex', 'Dream', 'Ejaculation', 'Night'] },
        { word: 'X-rated', taboo: ['Adult', 'Explicit', 'Movie', 'Film', 'Rating'] },
        { word: 'Yiff', taboo: ['Furry', 'Porn', 'Animal', 'Sex', 'Roleplay'] },
        { word: 'Zoophilia', taboo: ['Animal', 'Sex', 'Bestiality', 'Taboo', 'Illegal'] },
        { word: 'Anilingus', taboo: ['Oral', 'Sex', 'Anal', 'Lick', 'Rim'] },
        { word: 'Bukkake', taboo: ['Porn', 'Sex', 'Japanese', 'Multiple', 'Men'] },
        { word: 'Cunnilingus', taboo: ['Oral', 'Sex', 'Lick', 'Vagina', 'Pleasure'] },
        { word: 'Doggystyle', taboo: ['Sex', 'Position', 'Rear', 'Behind', 'Animalistic'] },
        { word: 'Erotic Massage', taboo: ['Sensual', 'Touch', 'Body', 'Pleasure', 'Massage'] },
        { word: 'Fetishism', taboo: ['Kink', 'Object', 'Part', 'Sex', 'Arousal'] },
        { word: 'Glory Hole', taboo: ['Sex', 'Anonymous', 'Hole', 'Wall', 'Oral'] },
        { word: 'Hymen', taboo: ['Virginity', 'Tear', 'Vagina', 'Intercourse', 'First Time'] },
        { word: 'Intersex', taboo: ['Gender', 'Identity', 'Biological', 'Ambiguous', 'Sex'] },
        { word: 'Jerk Off', taboo: ['Masturbate', 'Penis', 'Hand', 'Self', 'Ejaculate'] },
        { word: 'Kegel Exercises', taboo: ['Pelvic', 'Muscle', 'Strengthen', 'Sex', 'Health'] },
        { word: 'Lustful', taboo: ['Desire', 'Sex', 'Want', 'Passion', 'Attraction'] },
        { word: 'Mature', taboo: ['Adult', 'Grown', 'Developed', 'Responsible', 'Sexually'] },
        { word: 'Naked', taboo: ['Nude', 'Bare', 'Undressed', 'Clothes', 'Body'] },
        { word: 'Orgasmic', taboo: ['Pleasure', 'Climax', 'Sex', 'Intense', 'Feeling'] },
        { word: 'Panties', taboo: ['Underwear', 'Women', 'Briefs', 'Sexy', 'Clothing'] },
        { word: 'Quickie', taboo: ['Fast', 'Short', 'Sex', 'Brief', 'Quick'] },
        { word: 'Raunchy', taboo: ['Dirty', 'Vulgar', 'Obscene', 'Crude', 'Sexually'] },
        { word: 'Sexual Fantasy', taboo: ['Desire', 'Imaginary', 'Sex', 'Dream', 'Scenario'] },
        { word: 'Threesome', taboo: ['Sex', 'Three', 'Partners', 'Group', 'Ménage'] },
        { word: 'Uninhibited', taboo: ['Free', 'Free-spirited', 'Sexually', 'Open-minded'] },
        { word: 'Voyeurism', taboo: ['Watch', 'Spy', 'Sexual', 'Pleasure', 'Secret'] },
        { word: 'Wet', taboo: ['Moist', 'Damp', 'Soggy', 'Water', 'Fluid'] },
        { word: 'Xenophilia', taboo: ['Attraction', 'Foreign', 'Alien', 'Strange', 'Different'] },
        { word: 'Yearning', taboo: ['Longing', 'Desire', 'Craving', 'Wish', 'Want'] },
        { word: 'Zoetrophilia', taboo: ['Sexual', 'Arousal', 'Attraction', 'Animals', 'Taboo'] },
        { word: 'Aphrodisiac', taboo: ['Stimulate', 'Sex', 'Desire', 'Food', 'Drug'] },
        { word: 'Blowjob', taboo: ['Oral', 'Sex', 'Mouth', 'Penis', 'Suck'] },
        { word: 'Carnal', taboo: ['Fleshly', 'Physical', 'Sexual', 'Desire', 'Appetite'] },
        { word: 'Dirty Talk', taboo: ['Sex', 'Talk', 'Erotic', 'Words', 'Sensual'] },
        { word: 'Erogenous Zone', taboo: ['Body', 'Sensitive', 'Area', 'Sexual', 'Touch'] },
        { word: 'Fornicate', taboo: ['Sex', 'Intercourse', 'Copulate', 'Mate', 'Animalistic'] },
        { word: 'Gigolo', taboo: ['Male', 'Escort', 'Paid', 'Sex', 'Prostitute'] },
        { word: 'Hickey', taboo: ['Mark', 'Neck', 'Suck', 'Bite', 'Skin'] },
        { word: 'Innuendo', taboo: ['Hint', 'Suggestive', 'Sexual', 'Imply', 'Indirect'] },
        { word: 'Jockstrap', taboo: ['Underwear', 'Athletic', 'Supportive', 'Sport', 'Male'] },
        { word: 'Kissable', taboo: ['Lips', 'Touchable', 'Attractive', 'Desirable', 'Mouth'] },
        { word: 'Lascivious', taboo: ['Lustful', 'Lecherous', 'Sexual', 'Desire', 'Wanton'] },
        { word: 'Masochism', taboo: ['Pain', 'Suffering', 'Sexual', 'Pleasure', 'BDSM'] },
        { word: 'Nymphomaniac', taboo: ['Sex', 'Desire', 'Woman', 'Excessive', 'Drive'] },
        { word: 'Orgiastic', taboo: ['Orgy', 'Sexual', 'Intense', 'Pleasure', 'Group'] },
        { word: 'Pheromones', taboo: ['Chemical', 'Scent', 'Attract', 'Sexual', 'Arousal'] },
        { word: 'Quim', taboo: ['Vulva', 'Vagina', 'Cunt', 'Genitals', 'Female'] },
        { word: 'Raunchy', taboo: ['Dirty', 'Vulgar', 'Obscene', 'Crude', 'Sexually'] },
        { word: 'Sado-masochism', taboo: ['BDSM', 'Sexual', 'Pain', 'Dominance', 'Submission'] },
        { word: 'Tease', taboo: ['Taunt', 'Flirt', 'Provocation', 'Sex', 'Foreplay'] },
        { word: 'Uncensored', taboo: ['Unrestricted', 'Unedited', 'Full', 'Complete', 'Explicit'] },
        { word: 'Vixen', taboo: ['Female', 'Fox', 'Sexy', 'Attractive', 'Woman'] },
        { word: 'Wet Dream', taboo: ['Sleep', 'Sex', 'Dream', 'Ejaculation', 'Night'] },
        { word: 'XXX', taboo: ['Porn', 'Adult', 'Explicit', 'Rating', 'Content'] },
        { word: 'Yearn', taboo: ['Long', 'Desire', 'Want', 'Crave', 'Wish'] },
        { word: 'Zesty', taboo: ['Energetic', 'Lively', 'Flavorful', 'Spicy', 'Exciting'] }    
    ],
};



function startGame() {
    const timeInterval = document.getElementById('time-interval').value;
    const theme = document.getElementById('theme').value;
    currentWords = themes[theme].slice(); // Copy the array to avoid modifying the original
    shuffleArray(currentWords); // Shuffle the words for randomness
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';
    document.getElementById('time').textContent = timeInterval;
    score = 0;
    currentWordIndex = 0;
    passedWords = [];
    startTimer(timeInterval);
    showWord();
}

function startTimer(duration) {
    let timer = duration;
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('time').textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function showWord() {
    const currentWord = currentWords[currentWordIndex];
    document.getElementById('word').textContent = currentWord.word;
    const tabooList = document.getElementById('taboo-words');
    tabooList.innerHTML = '';
    currentWord.taboo.forEach(taboo => {
        const li = document.createElement('li');
        li.textContent = taboo;
        tabooList.appendChild(li);
    });
}

function guessedWord() {
    score++;
    nextWord();
}

function passWord() {
    passedWords.push(currentWords[currentWordIndex].word);
    nextWord();
}

function nextWord() {
    currentWordIndex++;
    if (currentWordIndex >= currentWords.length) {
        endGame();
    } else {
        showWord();
    }
}

function endGame() {
    document.getElementById('game-board').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
    document.getElementById('score').textContent = score;
}

function startNewRound() {
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';
    startGame();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
// Variables to track touch position and card movement
let xDown = null;
let yDown = null;
let card = document.getElementById('card');

function handleTouchStart(event) {
    xDown = event.touches[0].clientX;
    yDown = event.touches[0].clientY;
}

function handleTouchMove(event) {
    if (!xDown || !yDown) {
        return;
    }

    let xDiff = xDown - event.touches[0].clientX;
    let yDiff = yDown - event.touches[0].clientY;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            // Swipe left
            card.classList.add('swipe-left');
            setTimeout(() => {
                passWord();
                card.style.transform = '';
                card.classList.remove('swipe-left');
            }, 20); // Adjust the duration to match your CSS transition duration
        } else {
            // Swipe right
            card.classList.add('swipe-right');
            setTimeout(() => {
                guessedWord();
                card.style.transform = '';
                card.classList.remove('swipe-right');
            }, 20); // Adjust the duration to match your CSS transition duration
        }
    }

    // Reset touch position
    xDown = null;
    yDown = null;
}
