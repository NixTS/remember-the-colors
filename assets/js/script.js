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

function backToMenu() {

}

function bestScores() {

}

function chooseDifficulty() {

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