import "./scss/index.scss";
import {gameInit} from './js/game';
import {displayingScore} from './js/score';
window.addEventListener('DOMContentLoaded', () => {
    gameInit();
    displayingScore();
});