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

    startGame.addEventListener("click", function () {
        difficultyScreen.style.display = "flex";
        backToMenu.style.display = "block";
        startScreen.style.display = "none";
    });

    gameInstructions.addEventListener("click", function () {
        instructionsScreen.style.display = "flex";
        backToMenu.style.display = "block";
        startScreen.style.display = "none";
    });

    scores.addEventListener("click", function () {
        scoresScreen.style.display = "flex";
        backToMenu.style.display = "block";
        startScreen.style.display = "none";
    });

    credits.addEventListener("click", function () {
        creditsScreen.style.display = "flex";
        backToMenu.style.display = "block";
        startScreen.style.display = "none";
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
    let repeatPattern = document.getElementById("repeat-pattern");

    let gameNormal = document.getElementById("game-screen");
    let gameHard = document.getElementById("game-screen");

    difficultyNormal.addEventListener("click", function () {
        difficultyScreen.style.display = "none";
        gameNormal.style.display = "flex";
        sideMenu.style.display = "block";
    });

    difficultyHard.addEventListener("click", function () {
        difficultyScreen.style.display = "none";
        gameHard.style.display = "flex";
        sideMenu.style.display = "block";
        repeatPattern.style.display = "none";
    });
}

function showCurrentScore() {
    let newScore = playerSequence.length;
    document.getElementById("current-score").textContent = newScore;

}

function turnColorBlindOption() {

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
        }, 300); // Remove the light-up effect after .3 seconds
    }

    /**
     * plays the sequence of colors
     */
    function playSequence() {
        let index = 0;
        let interval = setInterval(function () {
            if (index >= cpuSequenceArray.length) {
                clearInterval(interval);
                playerTurn = true;
            } else {
                let buttonToLightUp = document.querySelector(`[data-color="${cpuSequenceArray[index]}"]`);
                lightUpButton(buttonToLightUp);
                index++;
            }
        }, 500); // Interval between lighting up each color .5 seconds
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
                    alert("Oops, that was incorrect, good luck next time!");
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
}

function saveScore() {

}

function gameEndCard() {

}