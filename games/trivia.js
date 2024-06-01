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

let themes = {
    geography: [
        { question: "What is the capital of Australia?", answers: ["Sydney", "Melbourne", "Canberra", "Perth"], correct: 2 },
        { question: "Which river runs through Baghdad?", answers: ["Euphrates", "Nile", "Danube", "Amazon"], correct: 0 },
        { question: "What is the largest country by land area in South America?", answers: ["Brazil", "Argentina", "Colombia", "Peru"], correct: 0 },
        { question: "Which African country was formerly known as Abyssinia?", answers: ["Egypt", "Nigeria", "Ethiopia", "Kenya"], correct: 2 },
        { question: "What is the smallest country in the world by land area?", answers: ["Monaco", "Nauru", "San Marino", "Vatican City"], correct: 3 },
        { question: "In which country would you find the Negev Desert?", answers: ["Israel", "Saudi Arabia", "Egypt", "Iraq"], correct: 0 },
        { question: "What is the longest river in Europe?", answers: ["Volga", "Danube", "Rhine", "Loire"], correct: 0 },
        { question: "Which mountain range stretches across seven countries in Southern Europe?", answers: ["Alps", "Pyrenees", "Apennines", "Carpathians"], correct: 0 },
        { question: "Which sea is the saltiest body of water in the world?", answers: ["Caspian Sea", "Dead Sea", "Red Sea", "Mediterranean Sea"], correct: 1 },
        { question: "What is the only sea without any coastlines?", answers: ["Sargasso Sea", "Celebes Sea", "Ligurian Sea", "Adriatic Sea"], correct: 0 },
        { question: "Which country is known as the 'Land of a Thousand Lakes'?", answers: ["Sweden", "Finland", "Norway", "Canada"], correct: 1 },
        { question: "Which country has the most natural lakes?", answers: ["Canada", "Russia", "United States", "China"], correct: 2 },
        { question: "What is the capital of New Zealand?", answers: ["Auckland", "Wellington", "Christchurch", "Queenstown"], correct: 1 },
        { question: "Which ocean is the largest and deepest on Earth?", answers: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], correct: 2 },
        { question: "In which country would you find Mount Kilimanjaro?", answers: ["Kenya", "Tanzania", "Uganda", "Rwanda"], correct: 1 },
        { question: "Which city is the southernmost capital city in the world?", answers: ["Wellington", "Buenos Aires", "Canberra", "Montevideo"], correct: 3 },
        { question: "What is the smallest country in Africa by land area?", answers: ["Gambia", "Swaziland", "Djibouti", "Seychelles"], correct: 3 },
        { question: "Which river forms part of the border between Mexico and the United States?", answers: ["Missouri River", "Rio Grande", "Mississippi River", "Colorado River"], correct: 1 },
        { question: "What is the largest island in the Mediterranean Sea?", answers: ["Cyprus", "Sardinia", "Sicily", "Crete"], correct: 2 },
        { question: "Which country is known as the 'Land of the Rising Sun'?", answers: ["China", "Korea", "Japan", "Vietnam"], correct: 2 },
        { question: "What is the capital of Brazil?", answers: ["Rio de Janeiro", "Sao Paulo", "Brasilia", "Salvador"], correct: 2 },
        { question: "Which country has the longest coastline in the world?", answers: ["Canada", "Australia", "United States", "Russia"], correct: 0 },
        { question: "What is the highest mountain peak in North America?", answers: ["Mount McKinley", "Mount Logan", "Mount St. Elias", "Mount Foraker"], correct: 0 },
        { question: "In which country would you find the ancient city of Petra?", answers: ["Turkey", "Greece", "Jordan", "Lebanon"], correct: 2 },
        { question: "Which city is located furthest south?", answers: ["Punta Arenas", "Ushuaia", "Hobart", "Cape Town"], correct: 1 },
        { question: "What is the capital of Egypt?", answers: ["Cairo", "Alexandria", "Luxor", "Aswan"], correct: 0 },
        { question: "Which African country is known as the 'Pearl of Africa'?", answers: ["Tanzania", "Uganda", "Kenya", "Rwanda"], correct: 1 },
        { question: "Which country has the largest population in Africa?", answers: ["Nigeria", "Ethiopia", "Egypt", "Democratic Republic of the Congo"], correct: 0 },
        { question: "What is the largest city in South Africa?", answers: ["Cape Town", "Durban", "Johannesburg", "Pretoria"], correct: 2 },
        { question: "Which river is the longest in the world?", answers: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"], correct: 1 },
        { question: "Which country is the smallest in the world by population?", answers: ["Vatican City", "Monaco", "Nauru", "Tuvalu"], correct: 0 },
        { question: "What is the only country in the world that is also a continent?", answers: ["Australia", "Antarctica", "Greenland", "Madagascar"], correct: 0 },
        { question: "Which African country is known as the 'Giant of Africa'?", answers: ["Nigeria", "South Africa", "Sudan", "Algeria"], correct: 0 },
        { question: "What is the largest city in New Zealand?", answers: ["Auckland", "Wellington", "Christchurch", "Hamilton"], correct: 0 },
        { question: "Which ocean is the warmest?", answers: ["Indian Ocean", "Atlantic Ocean", "Pacific Ocean", "Arctic Ocean"], correct: 0 },
        { question: "In which country would you find the ancient city of Machu Picchu?", answers: ["Brazil", "Argentina", "Chile", "Peru"], correct: 3 },
        { question: "Which mountain range stretches across six countries in Southeast Europe?", answers: ["Alps", "Pyrenees", "Apennines", "Balkan Mountains"], correct: 3 },
        { question: "Which sea is bordered by Europe to the north and Africa to the south?", answers: ["Mediterranean Sea", "BlackSea", "Caspian Sea", "Red Sea"], correct: 0 },
        { question: "What is the largest island in the Caribbean?", answers: ["Jamaica", "Cuba", "Hispaniola", "Puerto Rico"], correct: 1 },
        { question: "Which city is the capital of Canada?", answers: ["Toronto", "Vancouver", "Ottawa", "Montreal"], correct: 2 },
        { question: "What is the smallest country in Asia by land area?", answers: ["Maldives", "Singapore", "Brunei", "Lebanon"], correct: 1 },
        { question: "Which African country is known as the 'Rainbow Nation'?", answers: ["Nigeria", "Ghana", "South Africa", "Kenya"], correct: 2 },
        { question: "What is the largest city in Australia?", answers: ["Sydney", "Melbourne", "Brisbane", "Perth"], correct: 1 },
        { question: "Which country has the longest coastline in the world?", answers: ["Canada", "Russia", "United States", "Australia"], correct: 0 },
        { question: "What is the capital of South Korea?", answers: ["Seoul", "Busan", "Incheon", "Daegu"], correct: 0 },
        { question: "In which country would you find the ancient city of Timbuktu?", answers: ["Mali", "Niger", "Chad", "Burkina Faso"], correct: 0 },
        { question: "Which river forms part of the border between Mexico and the United States?", answers: ["Rio Grande", "Mississippi River", "Missouri River", "Colorado River"], correct: 0 },
        { question: "What is the largest island in Indonesia?", answers: ["Java", "Sumatra", "Borneo", "Papua"], correct: 0 },
        { question: "Which country is known as the 'Land of the Midnight Sun'?", answers: ["Sweden", "Norway", "Finland", "Russia"], correct: 1 },
        { question: "What is the capital of Argentina?", answers: ["Buenos Aires", "Cordoba", "Rosario", "Mendoza"], correct: 0 },
        { question: "Which city is the northernmost capital city in the world?", answers: ["Reykjavik", "Helsinki", "Oslo", "Tallinn"], correct: 0 },
        { question: "What is the largest city in Canada by population?", answers: ["Toronto", "Montreal", "Vancouver", "Calgary"], correct: 0 },
        { question: "Which river is the longest in Asia?", answers: ["Yangtze River", "Yellow River", "Mekong River", "Ganges River"], correct: 0 },
        { question: "What is the capital of Turkey?", answers: ["Istanbul", "Ankara", "Izmir", "Bursa"], correct: 1 },
        { question: "In which country would you find the city of Marrakech?", answers: ["Morocco", "Algeria", "Tunisia", "Libya"], correct: 0 },
        { question: "Which country is known as the 'Land of a Thousand Islands'?", answers: ["Indonesia", "Philippines", "Malaysia", "Japan"], correct: 0 },
        { question: "What is the largest city in India?", answers: ["Delhi", "Mumbai", "Kolkata", "Chennai"], correct: 1 },
        { question: "Which African country is known as the 'Land of a Thousand Hills'?", answers: ["Rwanda", "Uganda", "Burundi", "Tanzania"], correct: 0 },
        { question: "What is the capital of Saudi Arabia?", answers: ["Riyadh", "Jeddah", "Mecca", "Medina"], correct: 0 },
        { question: "Which country is known as the 'Land of the Pharaohs'?", answers: ["Egypt", "Syria", "Iraq", "Jordan"], correct: 0 },
        { question: "What is the largest city in South America by population?", answers: ["Sao Paulo", "Buenos Aires", "Rio de Janeiro", "Lima"], correct: 0 },
        { question: "Which sea is bordered by Italy, Croatia, Montenegro, and Albania?", answers: ["Adriatic Sea", "Aegean Sea", "Ionian Sea", "Tyrrhenian Sea"], correct: 0 },
        { question: "What is the capital of Spain?", answers: ["Barcelona", "Madrid", "Valencia", "Seville"], correct: 1 },
        { question: "Which country is the largest producer of coffee in the world?", answers: ["Brazil", "Colombia", "Vietnam", "Ethiopia"], correct: 0 },
        { question: "In which country would you find the city of Casablanca?", answers: ["Morocco", "Algeria", "Tunisia", "Libya"], correct: 0 },
        { question: "What is the largest city in South Korea?", answers: ["Seoul", "Busan", "Incheon", "Daegu"], correct: 0 },
        { question: "Which country is known as the 'Land of Fire and Ice'?", answers: ["Norway", "Iceland", "Greenland", "Finland"], correct: 1 },
        { question: "What is the capital of Peru?", answers: ["Lima", "Cusco", "Arequipa", "Trujillo"], correct: 0 },
        { question: "Which city is the capital of Australia?", answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correct: 2 },
        { question: "What is the largest island in Japan?", answers: ["Hokkaido", "Honshu", "Shikoku", "Kyushu"], correct: 1 },
        { question: "Which river flows through Paris?", answers: ["Seine River", "Loire River", "Rhone River", "Garonne River"], correct: 0 },
        { question: "What is the capital of Portugal?", answers: ["Lisbon", "Porto", "Faro", "Coimbra"], correct: 0 },
        { question: "Which country is known as the 'Land of Smiles'?", answers: ["Thailand", "Vietnam", "Laos", "Cambodia"], correct: 0 },
        { question: "What is the largest city in Vietnam?", answers: ["Hanoi", "Ho Chi Minh City", "Haiphong", "Da Nang"], correct: 1 },
        { question: "Which country is known as the 'Land of a Million Elephants'?", answers: ["Thailand", "Vietnam", "Laos", "Cambodia"], correct: 2 },
        { question: "What is the capital of Venezuela?", answers: ["Caracas", "Maracaibo", "Valencia", "Barquisimeto"], correct: 0 },
        { question: "Which city is located at the mouth of the Amazon River?", answers: ["Manaus", "Belem", "Santarem", "Macapá"], correct: 1 },
        { question: "What is the smallest country in Central America by land area?", answers: ["El Salvador", "Honduras", "Costa Rica", "Panama"], correct: 2 },
        { question: "Which river forms part of the border between the United States and Mexico?", answers: ["Rio Grande", "Colorado River", "Missouri River", "Mississippi River"], correct: 0 },
        { question: "What is the largest city in Poland?", answers: ["Warsaw", "Krakow", "Wroclaw", "Poznan"], correct: 0 },
        { question: "Which country is known as the 'Land of the Long White Cloud'?", answers: ["Australia", "New Zealand", "Fiji", "Papua New Guinea"], correct: 1 },
        { question: "What is the capital of Austria?", answers: ["Vienna", "Salzburg", "Innsbruck", "Graz"], correct: 0 },
        { question: "Which river flows through Vienna?", answers: ["Danube River", "Rhine River", "Elbe River", "Main River"], correct: 0 },
        { question: "What is the largest city in Sweden?", answers: ["Stockholm", "Gothenburg", "Malmo", "Uppsala"], correct: 0 },
        { question: "Which country is known as the 'Cradle of Civilization'?", answers: ["Greece", "Egypt", "Iraq", "Iran"], correct: 2 },
        { question: "What is the capital of South Africa?", answers: ["Cape Town", "Durban", "Johannesburg", "Pretoria"], correct: 3 },
        { question: "Which country is known as the 'Land of the Rising Sun'?", answers: ["China", "Korea", "Japan", "Vietnam"], correct: 2 },
        { question: "What is the largest city in New Zealand?", answers: ["Auckland", "Wellington", "Christchurch", "Hamilton"], correct: 0 },
        { question: "Which ocean is the warmest?", answers: ["Indian Ocean", "Atlantic Ocean", "Pacific Ocean", "Arctic Ocean"], correct: 0 },
        { question: "In which country would you find the ancient city of Machu Picchu?", answers: ["Brazil", "Argentina", "Chile", "Peru"], correct: 3 },
        { question: "Which mountain range stretches across six countries in Southeast Europe?", answers: ["Alps", "Pyrenees", "Apennines", "Balkan Mountains"], correct: 3 },
        { question: "Which sea is bordered by Europe to the north and Africa to the south?", answers: ["Mediterranean Sea", "Black Sea", "Caspian Sea", "Red Sea"], correct: 0 },
        { question: "What is the largest island in the Caribbean?", answers: ["Jamaica", "Cuba", "Hispaniola", "Puerto Rico"], correct: 1 },
        { question: "Which city is the capital of Canada?", answers: ["Toronto", "Vancouver", "Ottawa", "Montreal"], correct: 2 },
        { question: "What is the smallest country in Asia by land area?", answers: ["Maldives", "Singapore", "Brunei", "Lebanon"], correct: 1 },
        { question: "Which African country is known as the 'Rainbow Nation'?", answers: ["Nigeria", "Ghana", "South Africa", "Kenya"], correct: 2 },
        { question: "What is the largest city in Australia?", answers: ["Sydney", "Melbourne", "Brisbane", "Perth"], correct: 1 },
        { question: "Which country has the longest coastline in the world?", answers: ["Canada", "Russia", "United States", "Australia"], correct: 0 },
        { question: "What is the capital of South Korea?", answers: ["Seoul", "Busan", "Incheon", "Daegu"], correct: 0 },
        { question: "In which country would you find the ancient city of Timbuktu?", answers: ["Mali", "Niger", "Chad", "Burkina Faso"], correct: 0 },
        { question: "Which river forms part of the border between Mexico and the United States?", answers: ["Rio Grande", "Mississippi River", "Missouri River", "Colorado River"], correct: 0 },
        { question: "What is the largest island in Indonesia?", answers: ["Java", "Sumatra", "Borneo", "Papua"], correct: 0 },
        { question: "Which country is known as the 'Land of the Midnight Sun'?", answers: ["Sweden", "Norway", "Finland", "Russia"], correct: 1 },
        { question: "What is the capital of Argentina?", answers: ["Buenos Aires", "Cordoba", "Rosario", "Mendoza"], correct: 0 },
        { question: "Which city is the southernmost capital city in the world?", answers: ["Wellington", "Buenos Aires", "Canberra", "Montevideo"], correct: 3 },
        { question: "What is the smallest country in Africa by land area?", answers: ["Gambia", "Swaziland", "Djibouti", "Seychelles"], correct: 3 },
        { question: "Which river is the longest in the world?", answers: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"], correct: 1 },
        { question: "Which country is the smallest in the world by population?", answers: ["Vatican City", "Monaco", "Nauru", "Tuvalu"], correct: 0 },
        { question: "What is the only country in the world that is also a continent?", answers: ["Australia", "Antarctica", "Greenland", "Madagascar"], correct: 0 },
        { question: "Which African country is known as the 'Giant of Africa'?", answers: ["Nigeria", "South Africa", "Sudan", "Algeria"], correct: 0 },
        { question: "What is the largest city in New Zealand?", answers: ["Auckland", "Wellington", "Christchurch", "Hamilton"], correct: 0 },
        { question: "Which ocean is the warmest?", answers: ["Indian Ocean", "Atlantic Ocean", "Pacific Ocean", "Arctic Ocean"], correct: 0 },
        { question: "In which country would you find the ancient city of Machu Picchu?", answers: ["Brazil", "Argentina", "Chile", "Peru"], correct: 3 },
        { question: "Which mountain range stretches across six countries in Southeast Europe?", answers: ["Alps", "Pyrenees", "Apennines", "Balkan Mountains"], correct: 3 },
        { question: "Which sea is bordered by Europe to the north and Africa to the south?", answers: ["Mediterranean Sea", "Black Sea", "Caspian Sea", "Red Sea"], correct: 0 },
        { question: "What is the largest island in the Caribbean?", answers: ["Jamaica", "Cuba", "Hispaniola","Puerto Rico"], correct: 1 },
        { question: "Which city is the capital of Canada?", answers: ["Toronto", "Vancouver", "Ottawa", "Montreal"], correct: 2 },
        { question: "What is the smallest country in Asia by land area?", answers: ["Maldives", "Singapore", "Brunei", "Lebanon"], correct: 1 },
        { question: "Which African country is known as the 'Rainbow Nation'?", answers: ["Nigeria", "Ghana", "South Africa", "Kenya"], correct: 2 },
        { question: "What is the largest city in Australia?", answers: ["Sydney", "Melbourne", "Brisbane", "Perth"], correct: 1 },
        { question: "Which country has the longest coastline in the world?", answers: ["Canada", "Russia", "United States", "Australia"], correct: 0 },
        { question: "What is the capital of South Korea?", answers: ["Seoul", "Busan", "Incheon", "Daegu"], correct: 0 },
        { question: "In which country would you find the ancient city of Timbuktu?", answers: ["Mali", "Niger", "Chad", "Burkina Faso"], correct: 0 },
        { question: "Which river forms part of the border between Mexico and the United States?", answers: ["Rio Grande", "Mississippi River", "Missouri River", "Colorado River"], correct: 0 },
        { question: "What is the largest island in Indonesia?", answers: ["Java", "Sumatra", "Borneo", "Papua"], correct: 0 },
        { question: "Which country is known as the 'Land of the Midnight Sun'?", answers: ["Sweden", "Norway", "Finland", "Russia"], correct: 1 },
        { question: "What is the capital of Argentina?", answers: ["Buenos Aires", "Cordoba", "Rosario", "Mendoza"], correct: 0 },
        { question: "Which city is the southernmost capital city in the world?", answers: ["Wellington", "Buenos Aires", "Canberra", "Montevideo"], correct: 3 },
        { question: "What is the smallest country in Africa by land area?", answers: ["Gambia", "Swaziland", "Djibouti", "Seychelles"], correct: 3 },
        { question: "Which river is the longest in the world?", answers: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"], correct: 1 },
        { question: "Which country is the smallest in the world by population?", answers: ["Vatican City", "Monaco", "Nauru", "Tuvalu"], correct: 0 },
        { question: "What is the only country in the world that is also a continent?", answers: ["Australia", "Antarctica", "Greenland", "Madagascar"], correct: 0 },
        { question: "Which African country is known as the 'Giant of Africa'?", answers: ["Nigeria", "South Africa", "Sudan", "Algeria"], correct: 0 },
        { question: "What is the largest city in New Zealand?", answers: ["Auckland", "Wellington", "Christchurch", "Hamilton"], correct: 0 },
        { question: "Which ocean is the warmest?", answers: ["Indian Ocean", "Atlantic Ocean", "Pacific Ocean", "Arctic Ocean"], correct: 0 },
        { question: "In which country would you find the ancient city of Machu Picchu?", answers: ["Brazil", "Argentina", "Chile", "Peru"], correct: 3 },
        { question: "Which mountain range stretches across six countries in Southeast Europe?", answers: ["Alps", "Pyrenees", "Apennines", "Balkan Mountains"], correct: 3 },
        { question: "Which sea is bordered by Europe to the north and Africa to the south?", answers: ["Mediterranean Sea", "Black Sea", "Caspian Sea", "Red Sea"], correct: 0 },
        { question: "What is the largest island in the Caribbean?", answers: ["Jamaica", "Cuba", "Hispaniola", "Puerto Rico"], correct: 1 },
        { question: "Which city is the capital of Canada?", answers: ["Toronto", "Vancouver", "Ottawa", "Montreal"], correct: 2 },
        { question: "What is the smallest country in Asia by land area?", answers: ["Maldives", "Singapore", "Brunei", "Lebanon"], correct: 1 },
        { question: "Which African country is known as the 'Rainbow Nation'?", answers: ["Nigeria", "Ghana", "South Africa", "Kenya"], correct: 2 },
        { question: "What is the largest city in Australia?", answers: ["Sydney", "Melbourne", "Brisbane", "Perth"], correct: 1 },
        { question: "Which country has the longest coastline in the world?", answers: ["Canada", "Russia", "United States", "Australia"], correct: 0 },
        { question: "What is the capital of South Korea?", answers: ["Seoul", "Busan", "Incheon", "Daegu"], correct: 0 },
        { question: "In which country would you find the ancient city of Timbuktu?", answers: ["Mali", "Niger", "Chad", "Burkina Faso"], correct: 0 },
        { question: "Which river forms part of the border between Mexico and the United States?", answers: ["Rio Grande", "Mississippi River", "Missouri River", "Colorado River"], correct: 0 },
        { question: "What is the largest island in Indonesia?", answers: ["Java", "Sumatra", "Borneo", "Papua"], correct: 0 },
        { question: "Which country is known as the 'Land of the Midnight Sun'?", answers: ["Sweden", "Norway", "Finland", "Russia"], correct: 1 },
        { question: "What is the capital of Argentina?", answers: ["Buenos Aires", "Cordoba", "Rosario", "Mendoza"], correct: 0 },
        { question: "Which city is the southernmost capital city in the world?", answers: ["Wellington", "Buenos Aires", "Canberra", "Montevideo"], correct: 3 },
        { question: "What is the smallest country in Africa by land area?", answers: ["Gambia", "Swaziland", "Djibouti", "Seychelles"], correct: 3 },
        { question: "Which river is the longest in the world?", answers: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"], correct: 1 },
        { question: "Which country is the smallest in the world by population?", answers: ["Vatican City", "Monaco", "Nauru", "Tuvalu"], correct: 0 },
        { question: "What is the only country in the world that is also a continent?", answers: ["Australia", "Antarctica", "Greenland", "Madagascar"], correct: 0 },
        { question: "Which African country is known as the 'Giant of Africa'?", answers: ["Nigeria", "South Africa", "Sudan", "Algeria"], correct: 0 },
        { question: "What is the largest city in New Zealand?", answers: ["Auckland", "Wellington", "Christchurch", "Hamilton"], correct: 0 },
        { question: "Which ocean is the warmest?", answers: ["Indian Ocean", "Atlantic Ocean", "Pacific Ocean", "Arctic Ocean"], correct: 0 },
        { question: "In which country would you find the ancient city of Machu Picchu?", answers: ["Brazil", "Argentina", "Chile", "Peru"], correct: 3 },
        { question: "Which mountain range stretches across six countries in Southeast Europe?", answers: ["Alps", "Pyrenees", "Apennines", "Balkan Mountains"], correct: 3 },
        { question: "Which sea is bordered by Europe to the north and Africa to the south?", answers: ["Mediterranean Sea", "Black Sea", "Caspian Sea", "Red Sea"], correct: 0 },
        { question: "What is the largest island in the Caribbean?", answers: ["Jamaica", "Cuba", "Hispaniola", "Puerto Rico"], correct: 1 },
        { question: "Which city is the capital of Canada?", answers: ["Toronto", "Vancouver", "Ottawa", "Montreal"], correct: 2 },
        { question: "What is the smallest country in Asia by land area?", answers: ["Maldives", "Singapore", "Brunei", "Lebanon"], correct: 1 },
        { question: "Which African country is known as the 'Rainbow Nation'?", answers: ["Nigeria", "Ghana", "South Africa", "Kenya"], correct: 2 },
        { question: "What is the largest city in Australia?", answers: ["Sydney", "Melbourne", "Brisbane", "Perth"], correct: 1 },
        { question: "Which country has the longest coastline in the world?", answers: ["Canada", "Russia", "United States", "Australia"], correct: 0 },
        { question: "What is the capital of South Korea?", answers: ["Seoul", "Busan", "Incheon", "Daegu"], correct: 0 },
        { question: "In which country would you find the ancient city of Timbuktu?", answers: ["Mali", "Niger", "Chad", "Burkina Faso"], correct: 0 },
        { question: "Which river forms part of the border between Mexico and the United States?", answers: ["Rio Grande", "Mississippi River", "Missouri River", "Colorado River"], correct: 0 },
        { question: "What is the largest island in Indonesia?", answers: ["Java", "Sumatra", "Borneo", "Papua"], correct: 0 },
        { question: "Which country is known as the 'Land of the Midnight Sun'?", answers: ["Sweden", "Norway", "Finland", "Russia"], correct: 1 },
        { question: "What is the capital of Argentina?", answers: ["Buenos Aires", "Cordoba", "Rosario", "Mendoza"], correct: 0 },
        { question: "Which city is the southernmost capital city in the world?", answers: ["Wellington", "Buenos Aires", "Canberra", "Montevideo"], correct: 3 },
        { question: "What is the smallest country in Africa by land area?", answers: ["Gambia", "Swaziland", "Djibouti", "Seychelles"], correct: 3 },
        { question: "Which river is the longest in the world?", answers: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"], correct: 1 },
        { question: "Which country is the smallest in the world by population?", answers: ["Vatican City", "Monaco", "Nauru", "Tuvalu"], correct: 0 },
        { question: "What is the only country in the world that is also a continent?", answers: ["Australia", "Antarctica", "Greenland", "Madagascar"], correct: 0 },
        { question: "Which African country is known as the 'Giant of Africa'?", answers: ["Nigeria", "South Africa", "Sudan", "Algeria"], correct: 0 },
        { question: "What is the largest city in New Zealand?", answers: ["Auckland", "Wellington", "Christchurch", "Hamilton"], correct: 0 },
        { question: "Which ocean is the warmest?", answers: ["Indian Ocean", "Atlantic Ocean", "Pacific Ocean", "Arctic Ocean"], correct: 0 },
        { question: "In which country would you find the ancient city of Machu Picchu?", answers: ["Brazil", "Argentina", "Chile", "Peru"], correct: 3 },
        { question: "Which mountain range stretches across six countries in Southeast Europe?", answers: ["Alps", "Pyrenees", "Apennines", "Balkan Mountains"], correct: 3 },
        { question: "Which sea is bordered by Europe to the north and Africa to the south?", answers: ["Mediterranean Sea", "Black Sea", "Caspian Sea", "Red Sea"], correct: 0 },
        { question: "What is the largest island in the Caribbean?", answers: ["Jamaica", "Cuba", "Hispaniola", "Puerto Rico"], correct: 1 },
        { question: "Which city is the capital of Canada?", answers: ["Toronto", "Vancouver", "Ottawa", "Montreal"], correct: 2 },
        { question: "What is the smallest country in Asia by land area?", answers: ["Maldives", "Singapore", "Brunei", "Lebanon"], correct: 1 },
        { question: "Which African country is known as the 'Rainbow Nation'?", answers: ["Nigeria", "Ghana", "South Africa", "Kenya"], correct: 2 },
        { question: "What is the largest city in Australia?", answers: ["Sydney", "Melbourne", "Brisbane", "Perth"], correct: 1 },
        { question: "Which country has the longest coastline in the world?", answers: ["Canada", "Russia", "United States", "Australia"], correct: 0 },
        { question: "What is the capital of South Korea?", answers: ["Seoul", "Busan", "Incheon", "Daegu"], correct: 0 },
        { question: "In which country would you find the ancient city of Timbuktu?", answers: ["Mali", "Niger", "Chad", "Burkina Faso"], correct: 0 },
        { question: "Which river forms part of the border between Mexico and the United States?", answers: ["Rio Grande", "Mississippi River", "Missouri River", "Colorado River"], correct: 0 },
    ],
    popculture: [
        { question: "Which TV show features characters named Ross, Rachel, Chandler, Monica, Joey, and Phoebe?", answers: ["Friends", "The Office", "How I Met Your Mother", "Seinfeld"], correct: 0 },
        { question: "Who is the lead vocalist of the band 'Queen'?", answers: ["Freddie Mercury", "David Bowie", "Elton John", "Mick Jagger"], correct: 0 },
        { question: "Which movie features a talking pig named Babe?", answers: ["Babe", "Charlotte's Web", "Piglet's Big Movie", "Animal Farm"], correct: 0 },
        { question: "Which artist released the album '25', featuring the hit single 'Hello'?", answers: ["Adele", "Taylor Swift", "Beyoncé", "Rihanna"], correct: 0 },
        { question: "What is the highest-grossing film of all time (as of 2024)?", answers: ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"], correct: 1 },
        { question: "Which animated TV series follows the adventures of a boy named Finn and his magical dog Jake?", answers: ["Adventure Time", "Regular Show", "Steven Universe", "Gravity Falls"], correct: 0 },
        { question: "Who played the character of Tony Stark/Iron Man in the Marvel Cinematic Universe?", answers: ["Chris Hemsworth", "Chris Evans", "Robert Downey Jr.", "Mark Ruffalo"], correct: 2 },
        { question: "Which video game franchise features a plumber named Mario?", answers: ["Zelda", "Metroid", "Super Mario", "Donkey Kong"], correct: 2 },
        { question: "Which British author wrote the 'Harry Potter' book series?", answers: ["J.K. Rowling", "Roald Dahl", "C.S. Lewis", "J.R.R. Tolkien"], correct: 0 },
        { question: "Which TV series features a character named Walter White, who starts manufacturing methamphetamine?", answers: ["Breaking Bad", "The Sopranos", "Mad Men", "The Wire"], correct: 0 },
        { question: "Who played the character of Katniss Everdeen in 'The Hunger Games' film series?", answers: ["Emma Stone", "Jennifer Lawrence", "Emma Watson", "Scarlett Johansson"], correct: 1 },
        { question: "Which band is known for their hit song 'Stairway to Heaven'?", answers: ["The Rolling Stones", "Led Zeppelin", "The Beatles", "Pink Floyd"], correct: 1 },
        { question: "Which film won the Academy Award for Best Picture in 2020?", answers: ["Parasite", "1917", "Joker", "Once Upon a Time in Hollywood"], correct: 0 },
        { question: "Which animated film features a young lion named Simba?", answers: ["Finding Nemo", "The Lion King", "Toy Story", "Frozen"], correct: 1 },
        { question: "Which TV series is set in the fictional continents of Westeros and Essos?", answers: ["The Walking Dead", "Game of Thrones", "Stranger Things", "Westworld"], correct: 1 },
        { question: "Who played the character of Jack Dawson in the film 'Titanic'?", answers: ["Tom Cruise", "Leonardo DiCaprio", "Brad Pitt", "Johnny Depp"], correct: 1 },
        { question: "Which artist released the album 'Lemonade' in 2016?", answers: ["Beyoncé", "Rihanna", "Taylor Swift", "Adele"], correct: 0 },
        { question: "Which fictional character lives in a pineapple under the sea?", answers: ["SpongeBob SquarePants", "Patrick Star", "Squidward Tentacles", "Mr. Krabs"], correct: 0 },
        { question: "Which film features a group of seniors who start a successful internship at a tech company?", answers: ["The Intern", "The Social Network", "The Internship", "The Founder"], correct: 2 },
        { question: "Who directed the film 'Jurassic Park'?", answers: ["Steven Spielberg", "James Cameron", "George Lucas", "Peter Jackson"], correct: 0 },
        { question: "Which TV series features a high school chemistry teacher turned methamphetamine manufacturer?", answers: ["Breaking Bad", "The Walking Dead", "Dexter", "Lost"], correct: 0 },
        { question: "Which artist released the album '1989', featuring the hit single 'Shake It Off'?", answers: ["Taylor Swift", "Ariana Grande", "Katy Perry", "Selena Gomez"], correct: 0 },
        { question: "Which film features a young boy named Kevin who is accidentally left behind by his family during Christmas?", answers: ["Home Alone", "Elf", "The Santa Clause", "A Christmas Story"], correct: 0 },
        { question: "Who played the character of Batman in 'The Dark Knight' trilogy?", answers: ["Christian Bale", "Michael Keaton", "Ben Affleck", "George Clooney"], correct: 0 },
        { question: "Which animated film features a robot named WALL-E?", answers: ["Finding Nemo", "The Incredibles", "Ratatouille", "WALL-E"], correct: 3 }    
        
    ]
}

function loadQuestions(theme) {
    questions = themes[theme];
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
    teamsCorrectDiv.innerHTML = '<h3>Who got it right?</h3>';
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
