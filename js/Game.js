"use strict";

import {Player} from "./Player.js";

export class Game {
    players = [];
    gameOn = false;
    whoseTurn = false;
    points = 101;
    page = null;
    form = null;

    constructor(form, page) {
        this.form = form;
        this.form.pointsSlider.value = this.form.pointsDisplay.value = this.points;
        this.page = page;
        this.page.gameFormArea.style.display = 'none';
    }

    removePlayer(index) {
        const temp = [];
        for (let i = 0; i < this.players.length; i++) {
            if (i !== parseInt(index)) temp.push(this.players[i]);
        }
        this.players = temp;
        this.drawPlayersTable();
    }

    addPlayer() {
        this.players.push(new Player(this.form.inputName.value, this.form.selectLevel.value));
        this.form.inputName.value = '';
        this.form.selectLevel.value = 1;
        this.form.inputName.focus();
        this.form.buttonAddPlayer.setAttribute('disabled', 'disabled');
        this.drawPlayersTable();
    }

    drawPlayersTable(includeRemoveButtons = true) {
        const playersList = document.getElementById('playersList');
        const levels = ['', 'Beginner', 'Advanced', 'Pro'];

        playersList.innerHTML = '';

        if (0 === this.players.length) return;

        const table = document.createElement('table');
        const row = document.createElement('tr');
        row.classList.add('table-header');

        for (const colName of ['Name', 'Level', 'Points', 'Chakas']) {
            const cell = document.createElement('td');
            cell.innerText = colName;
            row.appendChild(cell);
        }

        if (includeRemoveButtons) {
            const cell = document.createElement('td');
            cell.innerText = 'Remove';
            row.appendChild(cell);
        }

        table.append(row);

        for (const player of this.players) {
            const index = this.players.indexOf(player);
            const row = document.createElement('tr');
            row.id = index;

            if (index === this.whoseTurn) row.classList.add('activePlayer');

            const cellName = document.createElement('td');
            cellName.innerText = player.name;
            const cellLevel = document.createElement('td');
            cellLevel.innerText = levels[player.level];
            const cellChakas = document.createElement('td');
            cellChakas.innerText = player.chakas;
            const cellPoints = document.createElement('td');
            cellPoints.innerText = player.points;
            row.appendChild(cellName);
            row.appendChild(cellLevel);
            row.appendChild(cellPoints);
            row.appendChild(cellChakas);

            if (includeRemoveButtons) {
                const cellRemove = document.createElement('td');
                const removeButton = document.createElement('button');
                removeButton.dataset.id = index;
                removeButton.classList.add('removeButton');
                removeButton.innerText = 'Remove';
                cellRemove.appendChild(removeButton);
                row.appendChild(cellRemove);
            }

            table.append(row);
        }

        playersList.append(table);
    }

    start() {
        if (this.players.length === 0) {
            alert('Add players first please');
            return;
        }

        this.form.startGameButton.setAttribute('disabled', 'disabled');
        this.form.pointsSlider.setAttribute('disabled', 'disabled');
        this.form.resetGameButton.removeAttribute('disabled');
        this.form.clearGameButton.removeAttribute('disabled');
        this.form.addPlayersFormArea.style.display = 'none';
        this.page.gameFormArea.style.display = 'block';
        this.page.gameForm.throw.focus();

        for (const player of this.players) {
            player.setStartingPoint(this.points);
        }

        this.gameOn = true;
        this.whoseTurn = Math.floor(Math.random() * this.players.length);
        this.drawPlayersTable(false);
        this.manageFinishButtons();
    }

    newGame() {
        for (const player of this.players) {
            player.chakas = 0;
        }

        this.drawPlayersTable(false);
        this.start();
    }

    nextPlayer() {
        this.whoseTurn++;
        if (this.whoseTurn === this.players.length) this.whoseTurn = 0;
        this.drawPlayersTable(false);
        this.manageFinishButtons();
    }

    setPoints() {
        this.points = this.form.pointsSlider.value;
        this.form.pointsDisplay.value = this.points;
    }

    processThrow(score) {

        if (this.players[this.whoseTurn].addScore(score, this.points)) this.nextPlayer();

        this.page.gameForm.throw.value = '';
        this.page.gameForm.throw.focus();
    }

    manageFinishButtons() {
        const player = this.players[this.whoseTurn];
        const gameForm = this.page.gameForm;

        for (const button of gameForm.finishButtons) {
            button.removeAttribute('disabled');
        }

        if (2 === +player.level) {
            gameForm.singleFinish.setAttribute('disabled', 'disabled');
        }

        if (3 === +player.level) {
            gameForm.singleFinish.setAttribute('disabled', 'disabled');
            gameForm.tripleFinish.setAttribute('disabled', 'disabled');
        }
    }
}