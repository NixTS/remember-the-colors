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

function navigationMenu() {

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