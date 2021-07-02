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
    showHero() {
        this.pole[this.position(this.hero.position.x, this.hero.position.y)].classList.add("hero")
    }

    // method, by which thief is displayed
    showThief() {
        this.pole[this.position(this.thief.position.x, this.thief.position.y)].classList.add("thief")
    }

    // method which removes the previous position, and blocks cloning
    removePreviousHero() {
        this.pole[this.position(this.hero.position.x, this.hero.position.y)].classList.remove("hero")
    }

    // method which removes the previous position, and blocks cloning
    removePreviousThief() {
        this.pole[this.position(this.thief.position.x, this.thief.position.y)].classList.remove("thief")
    }

    // method by which the direction of a character's movement is changed
    moveHero() {
        if (this.hero.position.x < 0 || this.hero.position.x > 9 || this.hero.position.y < 0 || this.hero.position.y > 9) {
            console.log(true)
        }
        this.removePreviousHero()
        if (this.hero.direction === "right") {
            this.hero.position.x = this.hero.position.x + 1;
        } else if (this.hero.direction === "left") {
            this.hero.position.x = this.hero.position.x - 1;
        } else if (this.hero.direction === "up") {
            this.hero.position.y = this.hero.position.y - 1;
        } else if (this.hero.direction === "down") {
            this.hero.position.y = this.hero.position.y + 1;
        }
        this.gameOver()
        this.showHero()
        this.catchThief()
    }

    catchThief() {
        if (this.hero.position.x === this.thief.position.x && this.hero.position.y === this.thief.position.y) {
            // add point
            this.score++;

            // create new thief
            this.removePreviousThief()
            this.thief = new Thief()
            this.showThief()
        }

    }

    // moving hero by 250ms
    start() {
        this.onPlay = setInterval(() => {
            this.moveHero()
        }, 250)
    }

    // checking if a character has stepped out of the board
    gameOver() {
        if (this.hero.position.x < 0 || this.hero.position.x > 9 || this.hero.position.y < 0 || this.hero.position.y > 9) {

            //end position for hero
            this.hero.position.x = 0
            this.hero.position.y = 0

            // cleaning board
            this.removePreviousThief()

            //ending game by clearInterval
            clearInterval(this.onPlay)
        }
    }


    // control hero by keyboard arrows
    turnHero(event) {
        switch (event) {
            case "ArrowLeft":
                this.hero.direction = 'left';
                break;
            case "ArrowRight":
                this.hero.direction = 'right';
                break;
            case "ArrowDown":
                this.hero.direction = 'down';
                break;
            case "ArrowUp":
                this.hero.direction = 'up';
                break;
        }

    }

}


window.addEventListener('DOMContentLoaded', () => {
    const game = new Game()
    game.showHero()
    game.showThief()
    game.start()
    game.turnHero()
    document.addEventListener("keydown", (e) => {
        game.turnHero(e.key)
    })
});
