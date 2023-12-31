// start screen appears after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    let toggleAll = document.getElementsByClassName("toggle");

    for (let i = 0; i < toggleAll.length; i++) {
        toggleAll[i].style.display = "none";

        startScreen.style.display = "flex";
    }
});

// global variables
let gameMode = "normal"; // default game mode

let colorButton = document.getElementsByClassName("buttons");
let colorButtons = Array.from(colorButton);
let goButton = document.getElementById("go-button");

let cpuSequenceArray = [];
let playerSequence = [];

let highestScore = 0;
let storedJsonBestScore = localStorage.getItem("bestScoreArray");
let storedBestScoreArray = JSON.parse(storedJsonBestScore) || [];

// variables for divs to be clicked in navigation menu
let openGame = document.getElementById("start-game");
let openInstructions = document.getElementById("instructions");
let openScores = document.getElementById("scores");
let openCredits = document.getElementById("credits");

// variables for screens to appear in navigation menu
let startScreen = document.getElementById("start-screen");
let difficultyScreen = document.getElementById("difficulty-screen");
let gameNormal = document.getElementById("game-screen");
let losingScreen = document.getElementById("losing-screen");
let instructionsScreen = document.getElementById("instructions-screen");
let scoresScreen = document.getElementById("scores-screen");
let creditsScreen = document.getElementById("credits-screen");

// variables for divs to be clicked others
let backToMenu = document.getElementById("back-to-menu");
let difficultyNormal = document.getElementById("difficulty-normal");
let difficultyHard = document.getElementById("difficulty-hard");
let colorNameButton = document.getElementById("side-color-name");

// variables for divs to appear others
let infoScreen = document.getElementById("info-screen");
let sideMenu = document.getElementById("side-menu");

/**
 * open the difficulty menu to start the game
 * infoScreen and backToMenu appears
 * infoScreen text changes to current screen name
 */
function startTheGame() {
    difficultyScreen.style.display = "flex";
    infoScreen.style.display = "flex";
    backToMenu.style.display = "flex";
    startScreen.style.display = "none";
    document.getElementById("info-text").textContent = "Difficulty Selection";
}

/**
 * open the instructions
 * infoScreen and backToMenu appears
 * infoScreen text changes to current screen name
 */
function openTheInstructions() {
    instructionsScreen.style.display = "flex";
    infoScreen.style.display = "flex";
    backToMenu.style.display = "flex";
    startScreen.style.display = "none";
    document.getElementById("info-text").textContent = "Instructions";
}

/**
 * open the scores
 * infoScreen and backToMenu appears
 * infoScreen text changes to current screen name
 */
function openTheScores() {
    scoresScreen.style.display = "flex";
    infoScreen.style.display = "flex";
    backToMenu.style.display = "flex";
    startScreen.style.display = "none";
    document.getElementById("info-text").textContent = "Scores";

    showBestScores();
}

/**
 * open the credits
 * infoScreen and backToMenu appears
 * infoScreen text changes to current screen name
 */
function openTheCredits() {
    creditsScreen.style.display = "flex";
    infoScreen.style.display = "flex";
    backToMenu.style.display = "flex";
    startScreen.style.display = "none";
    document.getElementById("info-text").textContent = "Credits";
}

// event listeners for menu navigation
openGame.addEventListener("click", startTheGame);
openInstructions.addEventListener("click", openTheInstructions);
openScores.addEventListener("click", openTheScores);
openCredits.addEventListener("click", openTheCredits);

/**
 * Back to the Menu function, only appears outside the start-screen
 * refreshes the page
 */
function backToTheMenu() {
    window.location.reload();
}

// event listener for the back to menu div
backToMenu.addEventListener("click", backToTheMenu);

/**
 * choosing 'normal' difficulty
 * intervals will be changed in function playSequence()
 */
function chooseDifficulty(difficulty) {
    difficultyScreen.style.display = "none";
    gameNormal.style.display = "flex";
    sideMenu.style.display = "flex";
    document.getElementById("info-text").textContent = "Press 'GO!' to start the Game!";

    if (difficulty == "normal") {
        gameMode = "normal";
    } else {
        gameMode = "hard";
    }
}

// event listeners for choosing difficulty
difficultyNormal.addEventListener("click", function () {
    chooseDifficulty("normal");
});
difficultyHard.addEventListener("click", function () {
    chooseDifficulty("hard");
});

/**
 * shows the current score while playing and in the end card
 */
function showCurrentScore() {
    let newScore = playerSequence.length;
    let insertScore = document.getElementsByClassName("current-score");

    for (let i = 0; i < insertScore.length; i++) {
        insertScore[i].textContent = newScore;
    }

    if (newScore > highestScore) {
        highestScore = newScore;
    }
}


/**
 * when clicked the color names will display on the game pad and the "On" span will change to "Off", and the other way around
 */
function turnColorNameOption() {
    let colorNames = document.getElementsByClassName("color-names");
    let colorNameOption = document.getElementById("color-name-option");

    for (let i = 0; i < colorNames.length; i++) {
        if (colorNames[i].style.display === "none" || colorNames[i].style.display === "") {
            colorNames[i].style.display = "flex";
            colorNameOption.innerText = "Off";
        } else {
            colorNames[i].style.display = "none";
            colorNameOption.innerText = "On";
        }
    }
}

// event listener to turn on/off color names option
colorNameButton.addEventListener("click", turnColorNameOption);

/**
 * Creates a random number between 0 and 3 and assigns a color (0 = red, 1 = blue, 2 = yellow, 3 = green)
 * when the Go Button is clicked, the random color will light up for a short time
 * the player has to repeat the sequence by clicking on the colored buttons
 */
function runGame() {
    let playerTurn = false;

    cpuSequenceArray = [];
    playerSequence = [];
    playerTurn = false;
    addToSequence();
    playSequence();
    gameInfo();

    let goText = document.getElementById("go-text");
    goText.style.display = "none";


    /**
     * create a random number and assign it to the correct colored div
     * @returns a random number from 0 to the 4 (length of the array)
     */
    function getRandomColor() {
        let colors = ["0", "1", "2", "3"];
        let randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    /**
     * adds a new random number to the cpuSequenceArray after every round
     */
    function addToSequence() {
        let color = getRandomColor();
        cpuSequenceArray.push(color);
    }

    /**
     * lights up a button, in form of a backgroudncolor change, for a short duration, .3 seconds
     * @param {*} buttons 
     */
    function lightUpButton(buttons) {
        let originalColor = buttons.style.backgroundColor;
        buttons.style.backgroundColor = "white";
        setTimeout(function () {
            buttons.style.backgroundColor = originalColor;
        }, 250); // Remove the light-up effect after .25 seconds
    }

    /**
     * plays the sequence of colors in two different game difficultys
     * normal = intervalDuration is 600ms
     * hard = intervalDuration is 350ms
     */
    function playSequence() {
        let index = 0;
        let intervalDuration = (gameMode === "normal") ? 600 : 350; // interval duration based on game mode

        let interval = setInterval(function () {
            if (index >= cpuSequenceArray.length) {
                clearInterval(interval);
                playerTurn = true;
                gameInfo();
            } else {
                let buttonToLightUp = document.querySelector(`[data-color="${cpuSequenceArray[index]}"]`);
                lightUpButton(buttonToLightUp);
                index++;
            }
        }, intervalDuration); // Interval between lighting up each color

        if (gameMode === "normal") {
        } else if (gameMode === "hard") {
        }
        gameInfo();
    }

    // Event listener for the color button click for the player's turn
    colorButtons.forEach(function (buttons) {
        buttons.addEventListener("click", function () {
            if (playerTurn) {
                let color = this.dataset.color;
                playerSequence.push(color);
                lightUpButton(this);

                if (checkPlayerSequence()) {
                    if (playerSequence.length === cpuSequenceArray.length) {
                        playerTurn = false;
                        setTimeout(function () {
                            addToSequence();
                            playerSequence = [];
                            playSequence();
                        }, 2000); // Delay before starting the next round, 2 seconds
                        showCurrentScore();
                    }
                } else {
                    gameEndCard();
                }
            }
        });
    });

    /**
     * check if the player's sequence matches the generated sequence
     * @returns true if sequence was correct and false it sequence was incorrect
     */
    function checkPlayerSequence() {
        for (let i = 0; i < playerSequence.length; i++) {
            if (playerSequence[i] !== cpuSequenceArray[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * a game info displayed above the game pad to signal to the user:
     * if a new color is beign added to the sequence
     * if it's the users turn to play
     */
    function gameInfo() {
        let infoText = document.getElementById("info-text");

        if (playerTurn) {
            infoText.textContent = "Do you remember the correct sequence?";
        } else {
            infoText.textContent = "Remember the sequence!";

        }
    }
}

// Event listener for the go button click
goButton.addEventListener("click", runGame);

/**
 * displays and end card if the user does not repeat the correct sequence
 */
function gameEndCard() {
    let gameNormal = document.getElementById("game-screen");
    let infoText = document.getElementById("info-text");

    infoText.textContent = "Oops...";
    losingScreen.style.display = "flex";
    gameNormal.style.display = "none";

    saveScore();
}

/**
 * saves scores in a local storage and pushes new highscores to array
 */
function saveScore() {
    storedBestScoreArray.push(highestScore);

    let uniqueScoresSet = new Set(storedBestScoreArray);

    let uniqueScoresArray = Array.from(uniqueScoresSet);

    uniqueScoresArray.sort((a, b) => b - a);

    let jsonBestScore = JSON.stringify(uniqueScoresArray);
    localStorage.setItem("bestScoreArray", jsonBestScore);
}

/**
 * shows the highest three scores in the scores tab
 */
function showBestScores() {
    let bestScore = document.getElementById("best-score");
    let secondBestScore = document.getElementById("second-best-score");
    let thirdBestScore = document.getElementById("third-best-score");

    storedJsonBestScore = localStorage.getItem("bestScoreArray");
    storedBestScoreArray = JSON.parse(storedJsonBestScore);

    bestScore.innerText = storedBestScoreArray[0] || "0";
    secondBestScore.innerText = storedBestScoreArray[1] || "0";
    thirdBestScore.innerText = storedBestScoreArray[2] || "0";
}