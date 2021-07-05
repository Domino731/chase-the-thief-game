import {Hero} from "./hero";
import {Thief} from "./thief";
import {displayingScore} from "./score";

// class game, which is contains hero, thief, actual score and methods responsible for game management
// constructor //
// difficultyLevel --> changing the time in the interval and  changing the difficulty of the game
class Game {
    constructor(difficultyLevel) {
        // the field on which hero moves
        this.pole = document.querySelectorAll("#game-board div")

        // score on page
        this.userScore = document.querySelector("#score")

        // hero
        this.hero = new Hero()
        // thief
        this.thief = new Thief()
        // actual score
        this.score = 0

        //difficultyLevel
        this.level = difficultyLevel
        // element to hide when game starts, or show when ends
        this.elements = {
            gameBoard: document.querySelector("#game-board"),
            btn: document.querySelector("#newGame-btn"),
            score: document.querySelector('.menu__score'),
            difficultyForm: document.querySelector("#difficulty-form"),
            body: document.querySelector("body")
        }

    }

    // method which detect user finger swipe and based on that it sets hero direction
    mobileMove() {
        const mobileHeroMoves = this.hero

        //variables based on which direction is returned
        let startingX, startingY, movingX, movingY;

       // return  initial touch position
        const touchStart = (e) => {
            startingX = e.touches[0].clientX;
            startingY = e.touches[0].clientY;
        }

        // return end touch position
        const touchMove = (e) =>  {
            movingX = e.touches[0].clientX;
            movingY = e.touches[0].clientY;
        }

        // setting the hero's direction based on finger movement
        function touchEnd(){
            if(startingX + 100 < movingX){
                console.log('right');
                mobileHeroMoves.direction = "right"

            } else if(startingX - 100 > movingX){
                console.log('left');
                mobileHeroMoves.direction = "left"

            }

            if(startingY + 100 < movingY){
                console.log('down');
                mobileHeroMoves.direction = "down"
            } else if(startingY - 100 > movingY){
                console.log('up');
                mobileHeroMoves.direction = "up"
            }
        }

        this.elements.body.addEventListener("touchstart", (e) => touchStart(e))
        this.elements.body.addEventListener("touchmove", (e) => touchMove(e))
        this.elements.body.addEventListener("touchend", (e) => touchEnd(e))
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

    // method which blocks scrolling during play
    blockScrolling(){
       window.scrollTo(0,0)
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
            this.userScore.innerText = this.score
            // create new thief
            this.removePreviousThief()
            this.thief = new Thief()
            this.showThief()


        }

    }

    // moving hero by 250ms
    start() {

        // block scrolling
        this.blockScrolling()
        this.elements.body.style.overflow = "hidden"

        // show score
        this.elements.score.style.display = "block"
        this.onPlay = setInterval(() => {
            this.moveHero()
        }, this.level)
    }

    // checking if a character has stepped out of the board
    gameOver() {
        if (this.hero.position.x < 0 || this.hero.position.x > 9 || this.hero.position.y < 0 || this.hero.position.y > 9) {

            // adding scrolling

            this.elements.body.style.overflow = "auto"
            // animation
            this.elements.gameBoard.classList.add("gameOver")
            setTimeout(() => {
                this.elements.gameBoard.classList.remove("gameOver")
            }, 1000)
            //end position for hero
            this.hero.position.x = 0
            this.hero.position.y = 0


            // cleaning board
            this.removePreviousThief()

            // showing elements
            setTimeout(() => {
                this.elements.btn.style.display = "flex"
                //  this.elements.difficultyForm.style.display = "block"
            }, 1000)


            // adding score to localStorage
            // previous score
            localStorage.setItem("prevScore", JSON.stringify(this.score))

            // highest score
            if (localStorage.getItem("highScore") !== null) {
                const highScore = JSON.parse(localStorage.getItem("highScore"));
                if (this.score > highScore) {
                    localStorage.setItem("highScore", JSON.stringify(this.score))
                }
            } else {
                localStorage.setItem("highScore", JSON.stringify(this.score))
            }

            //changing scoreboard
            displayingScore()

            // during the countdown the button text changes so you have to change it after the game ends
            this.elements.btn.innerText = "New Game"
            //ending game by clearInterval
            clearInterval(this.onPlay)
        }
    }

    // clear previous score
    clearPrevious() {
        this.userScore.innerText = 0
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

    hideElements() {
        this.elements.btn.style.display = "none"
    }

    // initialization of game
    init() {
        this.clearPrevious()
        this.hideElements()
        this.start()
        this.showHero()
        this.showThief()
        this.turnHero()
        this.mobileMove()
    }
}


// starting new game by clicking new game button
const gameInit = () => {

    let difficultyLevel = 250
    // chose difficulty level

    const difficultyLevels = document.querySelectorAll(".checkboxDifficulty input")
    //Each input has a difficulty assigned, and when clicked on it change difficultyLevel variable
    difficultyLevels.forEach(el => {
        el.addEventListener("click", () => {
            difficultyLevel = parseFloat(el.dataset.defficulty)
        })
    })


    // start new game
    const newGame = document.querySelector("#newGame-btn")
    newGame.addEventListener("click", () => {

        // at first do a countdown
        newGame.innerText = "Ready"
        setTimeout(() => {
            newGame.innerText = "Steady"
        }, 1000)
        setTimeout(() => {
            newGame.innerText = "Go"
        }, 2000)


        // starting new game after countdown - after 3 seconds
        setTimeout(() => {

            const game = new Game(difficultyLevel)
            game.init()

            // controlling hero by keyboard arrows
            document.addEventListener("keydown", (e) => {
                game.turnHero(e.key)
            })
        }, 3000)


    })
}


window.addEventListener('DOMContentLoaded', () => {
    gameInit()
    displayingScore()
});
