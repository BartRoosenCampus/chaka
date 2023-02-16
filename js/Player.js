"use strict";

export class Player {
    name;
    level;
    chakas = 0;
    points;
    score = [];

    constructor(name, level) {
        this.name = name;
        this.level = level;
    }

    addChaka(number) {
        this.chakas += number;
    }

    setStartingPoint(points) {
        this.points = points;
    }

    addScore(score, points) {
        switch (score) {
            case 'busted':
                this.points = points;
                return true;
            case 'bullsEye':
            case 'double':
                this.points = points;
                this.chakas += 2;
                return true;
            case 'singleBull':
            case 'triple':
            case 'single':
                this.points = points;
                this.chakas += 1;
                return true;
            default:
                break;
        }

        if (+this.points === +points && +score === 180) {
            this.chakas += 3;
            this.score.push(score);
            return true;
        }

        if (+this.points === +points && +score >= 140) {
            this.chakas += 2;
            this.score.push(score);
            return true;
        }

        if (+this.points === +points && +score >= 100) {
            this.chakas += 1;
            this.score.push(score);
            return true;
        }

        if (+score > this.points) {
            alert('Use the "busted" button');
            return false;
        }

        if (+score === this.points) {
            alert('How did you finish? Use the correct button');
            return false;
        }

        this.points -= score;
        this.score.push(score);
        return true;
    }
}