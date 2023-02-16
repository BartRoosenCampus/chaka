"use strict";

import {Game} from "./Game.js";
import {form} from "./dom.js";
import {page} from "./dom.js";

document.body.addEventListener('click', (event) => {
    if ('removeButton' === event.target.classList.value) {
        game.removePlayer(event.target.dataset.id);
    }
});

form.inputName.addEventListener('keyup', () => {
    if ('' !== form.inputName.value && 0 < form.selectLevel.value) {
        form.buttonAddPlayer.removeAttribute('disabled');
        if (game.players.length !== 0) form.startGameButton.removeAttribute('disabled');
    } else {
        form.buttonAddPlayer.setAttribute('disabled', 'disabled');
        if (game.players.length === 0) form.startGameButton.setAttribute('disabled', 'disabled');
    }
});

form.buttonAddPlayer.addEventListener('click', () => {
    game.addPlayer();
    if (game.players.length !== 0) form.startGameButton.removeAttribute('disabled');
});

form.startGameButton.addEventListener('click', () => {
    game.start();
});

form.resetGameButton.addEventListener('click', () => {
    game.newGame();
});

form.clearGameButton.addEventListener('click', () => {
    window.location.href = './';
});

form.pointsSlider.addEventListener('input', () => {
    game.setPoints();
});

page.gameForm.throw.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        game.processThrow(this.value);
    }
});

page.gameForm.busted.addEventListener('click', () => {
    game.processThrow('busted');
});

page.gameForm.bullsEyeFinish.addEventListener('click', () => {
    game.processThrow('bullsEye');
});

page.gameForm.singleBullFinish.addEventListener('click', () => {
    game.processThrow('singleBull');
});

page.gameForm.doubleFinish.addEventListener('click', () => {
    game.processThrow('double');
});

page.gameForm.tripleFinish.addEventListener('click', () => {
    game.processThrow('triple');
});

page.gameForm.singleFinish.addEventListener('click', () => {
    game.processThrow('single');
});

const game = new Game(form, page);