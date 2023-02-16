"use strict";

export const page = {
    playersList: document.getElementById('playersList'),
    gameFormArea: document.getElementById('gameFormArea'),
    form: {
        inputName: document.getElementById('playersName'),
        selectLevel: document.getElementById('playersLevel'),
        buttonAddPlayer: document.getElementById('addPlayerButton'),
        startGameButton: document.getElementById('startGameButton'),
        gameButtonsArea: document.getElementById('gameButtonsArea'),
        resetGameButton: document.getElementById('resetGameButton'),
        addPlayersFormArea: document.getElementById('addPlayersFormArea'),
        clearGameButton: document.getElementById('clearGameButton'),
        pointsSlider: document.getElementById('pointsSlider'),
        pointsDisplay: document.getElementById('pointsDisplay'),
    },
    gameForm: {
        throw: document.getElementById('throw'),
        bullsEyeFinish: document.getElementById('bullsEyeFinish'),
        singleBullFinish: document.getElementById('singleBullFinish'),
        doubleFinish: document.getElementById('doubleFinish'),
        tripleFinish: document.getElementById('tripleFinish'),
        singleFinish: document.getElementById('singleFinish'),
        busted: document.getElementById('busted'),
        finishButtons: document.getElementsByClassName('finish'),
    },
};