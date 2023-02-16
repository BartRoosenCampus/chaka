"use strict";

import {Game} from "./Game.js";
import {page} from "./dom.js";

document.body.addEventListener('click', (event) => {
    if ('removeButton' === event.target.classList.value) {
        game.removePlayer(event.target.dataset.id);
    }
});

page.form.inputName.addEventListener('keyup', () => {
    if ('' !== page.form.inputName.value && 0 < page.form.selectLevel.value) {
        page.form.buttonAddPlayer.removeAttribute('disabled');
        if (game.players.length !== 0) page.form.startGameButton.removeAttribute('disabled');
    } else {
        page.form.buttonAddPlayer.setAttribute('disabled', 'disabled');
        if (game.players.length === 0) page.form.startGameButton.setAttribute('disabled', 'disabled');
    }
});

page.form.buttonAddPlayer.addEventListener('click', () => {
    game.addPlayer();
    if (game.players.length !== 0) page.form.startGameButton.removeAttribute('disabled');
});

page.form.startGameButton.addEventListener('click', () => {
    game.start();
});

page.form.resetGameButton.addEventListener('click', () => {
    game.newGame();
});

page.form.clearGameButton.addEventListener('click', () => {
    window.location.href = './';
});

page.form.pointsSlider.addEventListener('input', () => {
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

const game = new Game(page);