import {Hero} from "./hero";
import {Thief} from "./thief";


// class game, which is contains hero, thief, actual score and methods responsible for game management
class Game {
    constructor() {
        // the field on which hero moves
        this.pole = document.querySelectorAll("#game-board div")
        // hero
        this.hero = new Hero()
        // thief
        this.thief = new Thief()
        // actual score
        this.score = 0
    }

    // method, which returns actual position of element
    position(x, y) {
     return x + (y * 10)
    }
    // method, by which hero is displayed
    showHero(){
         this.pole[this.position(this.hero.position.x, this.hero.position.y)].classList.add("hero")
    }
    // method, by which thief is displayed
    showThief(){
        this.pole[this.position(this.thief.position.x, this.thief.position.y)].classList.add("thief")
    }
}



window.addEventListener('DOMContentLoaded', () => {
    const game = new Game()
    game.showHero()
    game.showThief()
});
