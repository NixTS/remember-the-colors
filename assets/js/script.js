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

}

function turnColorBlindOption() {

} 

function runGame() {

}

function saveScore() {

}

function gameEndCard() {

}