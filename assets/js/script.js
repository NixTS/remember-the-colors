// start screen appears after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    let toggleAll = document.getElementsByClassName("toggle");
    let startScreen = document.getElementById("start-screen");

    for (let i = 0; 1 < toggleAll.length; i++) {
        toggleAll[i].style.display = "none";

        startScreen.style.display = "flex";
        console.log("everything loaded!");
    }

});

// global
let gameMode = "normal"; // default game mode

let colorButton = document.getElementsByClassName("buttons");
let colorButtons = Array.from(colorButton);
let goButton = document.getElementById("go-button");

let cpuSequenceArray = [];
let playerSequence = [];

/**
 * Menu Navigation 
 */
function navigationMenu() {
    let startScreen = document.getElementById("start-screen");
    let startGame = document.getElementById("start-game");
    let gameInstructions = document.getElementById("instructions");
    let scores = document.getElementById("scores");
    let credits = document.getElementById("credits");
    let backToMenu = document.getElementById("back-to-menu");

    let difficultyScreen = document.getElementById("difficulty-screen");
    let instructionsScreen = document.getElementById("instructions-screen");
    let scoresScreen = document.getElementById("scores-screen");
    let creditsScreen = document.getElementById("credits-screen");
    let infoScreen = document.getElementById("info-screen");

    startGame.addEventListener("click", function () {
        difficultyScreen.style.display = "flex";
        backToMenu.style.display = "block";
        startScreen.style.display = "none";
        infoScreen.style.display = "flex";
        document.getElementById("info-text").textContent = "Difficulty Selection";
    });

    gameInstructions.addEventListener("click", function () {
        instructionsScreen.style.display = "flex";
        backToMenu.style.display = "block";
        startScreen.style.display = "none";
        infoScreen.style.display = "flex";
        document.getElementById("info-text").textContent = "Instructions";
    });

    scores.addEventListener("click", function () {
        scoresScreen.style.display = "flex";
        backToMenu.style.display = "block";
        startScreen.style.display = "none";
        infoScreen.style.display = "flex";
        document.getElementById("info-text").textContent = "Scores";
    });

    credits.addEventListener("click", function () {
        creditsScreen.style.display = "flex";
        backToMenu.style.display = "block";
        startScreen.style.display = "none";
        infoScreen.style.display = "flex";
        document.getElementById("info-text").textContent = "Credits";
    });
}

/**
 * Back to the Menu function, only appears outside the start-screen and game-area
 */
function backToMenu() {
    let backToMenu = document.getElementById("back-to-menu");

    function handleClick() {
        window.location.reload();
    }

    backToMenu.addEventListener("click", handleClick);
}

function bestScores() {

}
function bestScores() {

}

/**
 * Choosing either hard or normal difficulty will result in the same "game-screen" but with a different sidebar
 */
function chooseDifficulty() {
    let difficultyNormal = document.getElementById("difficulty-normal");
    let difficultyHard = document.getElementById("difficulty-hard");
    let difficultyScreen = document.getElementById("difficulty-screen");
    let sideMenu = document.getElementById("side-menu");

    let gameNormal = document.getElementById("game-screen");
    let gameHard = document.getElementById("game-screen");

    difficultyNormal.addEventListener("click", function () {
        difficultyScreen.style.display = "none";
        gameNormal.style.display = "flex";
        sideMenu.style.display = "block";
        document.getElementById("info-text").textContent = "Press 'GO!' to start the Game!";
        gameMode = "normal";
    });

    difficultyHard.addEventListener("click", function () {
        difficultyScreen.style.display = "none";
        gameHard.style.display = "flex";
        sideMenu.style.display = "block";
        document.getElementById("info-text").textContent = "Press 'GO!' to start the Game!";
        gameMode = "hard";
    });
    playSequence();
}

function showCurrentScore() {
    let newScore = playerSequence.length;
    let insertScore = document.getElementsByClassName("current-score");

    for (let i = 0; i < insertScore.length; i++) {
        insertScore[i].textContent = newScore;
    };
}


/**
 * when clicked the color names will display on the game pad and the "On" span will change to "Off", and the other way around
 */
function turnColorNameOption() {
    let colorNameButton = document.getElementById("side-color-name");
    let colorNames = document.getElementsByClassName("color-names");
    let colorNameOption = document.getElementById("color-name-option");

    colorNameButton.addEventListener("click", function () {
        for (let i = 0; i < colorNames.length; i++) {
            if (colorNames[i].style.display === "none" || colorNames[i].style.display === "") {
                colorNames[i].style.display = "flex";
                colorNameOption.innerText = "Off";
            } else {
                colorNames[i].style.display = "none";
                colorNameOption.innerText = "On";
            }
        }
    });
}

/**
 * Creates a random number between 0 and 3 and assigns a color (0 = red, 1 = blue, 2 = yellow, 3 = green)
 * when the Go Button is clicked, the random color will light up for a short time
 * the player has to repeat the sequence by clicking on the colored buttons
 */
function runGame() {
    let round = 1;
    let playerTurn = false;

    // Event listener for the go button click
    goButton.addEventListener("click", function () {
        cpuSequenceArray = [];
        playerSequence = [];
        round = 1;
        playerTurn = false;
        addToSequence();
        playSequence();
        gameInfo();
    });

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
                        round++;
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

    function gameInfo() {
        let infoText = document.getElementById("info-text");

        if (playerTurn) {
            infoText.textContent = "Do you remember the correct sequence?";
        } else {
            infoText.textContent = "Remember the sequence!";

        }
    }
}

function saveScore() {

}

function gameEndCard() {
    let losingScreen = document.getElementById("losing-screen");
    let gameNormal = document.getElementById("game-screen");
    let infoText = document.getElementById("info-text");

    infoText.textContent = "Oops...";
    losingScreen.style.display = "flex";
    gameNormal.style.display = "none";
}