import { Hero } from "./hero";
import { Thief } from "./thief";
import { displayingScore } from "./score";

/** value which is responsible for checking the game is still active */
let isGameActive = false;

/**
 *  class game, which is contains hero, thief, actual score and methods responsible for game logic
 */
export class Game {
    /**
     * 
     * @param heroSpeed - speed of which hero will be moving 
     */
    constructor(heroSpeed) {

        /**  the fields on which hero is moving */
        this.pole = document.querySelectorAll("#game-board div");
        /** wrapper of user's score in menu */
        this.userScore = document.querySelector("#score");
        /**  hero */
        this.hero = new Hero();
        /**  thief */
        this.thief = new Thief();
        /**  actual score */
        this.score = 0;
        /** speed of which hero will be moving */
        this.heroSpeed = heroSpeed;

        /** elements to hide when game starts, or show when game ends */
        this.elements = {
            gameBoard: document.querySelector("#game-board"),
            btn: document.querySelector("#newGame-btn"),
            score: document.querySelector('.menu__score'),
            difficultyForm: document.querySelector("#difficulty-form"),
            body: document.querySelector("body")
        }

    }

    /** method which detect user finger swipe and based on that it sets hero direction  */
    mobileMove() {
        const mobileHeroMoves = this.hero;

        //variables based on which direction is returned
        let startingX, startingY, movingX, movingY;

        // return  initial touch position
        const touchStart = (e) => {
            startingX = e.touches[0].clientX;
            startingY = e.touches[0].clientY;
        }

        // return end touch position
        const touchMove = (e) => {
            movingX = e.touches[0].clientX;
            movingY = e.touches[0].clientY;
        }

        // setting the hero's direction based on finger movement
        function touchEnd() {
            if (startingX + 100 < movingX) {
                console.log('right');
                mobileHeroMoves.direction = "right";

            } else if (startingX - 100 > movingX) {
                console.log('left');
                mobileHeroMoves.direction = "left";

            }

            if (startingY + 100 < movingY) {
                console.log('down');
                mobileHeroMoves.direction = "down";
            } else if (startingY - 100 > movingY) {
                console.log('up');
                mobileHeroMoves.direction = "up";
            }
        }

        this.elements.body.addEventListener("touchstart", (e) => touchStart(e));
        this.elements.body.addEventListener("touchmove", (e) => touchMove(e));
        this.elements.body.addEventListener("touchend", (e) => touchEnd(e));
    }

    /**
     * method which returns actual position of element
     * @param  x - horizontal position
     * @param  y - vertical position
     * @returns 
     */
    position(x, y) {
        return x + (y * 10);
    }

    /**  method by which hero is displayed in particular pole in game board */
    showHero() {
        this.pole[this.position(this.hero.position.x, this.hero.position.y)].classList.add("hero");
    }

    /** method by which thief is displayed in particular pole in game board  */
    showThief() {
        this.pole[this.position(this.thief.position.x, this.thief.position.y)].classList.add("thief");
    }

    /**  method which removes the previous hero position in order to block cloning of hero position */
    removePreviousHero() {
        this.pole[this.position(this.hero.position.x, this.hero.position.y)].classList.remove("hero");
    }

    /**  method which removes the previous position in order to block cloning of thief position */
    removePreviousThief() {
        this.pole[this.position(this.thief.position.x, this.thief.position.y)].classList.remove("thief");
    }

    /**  method which blocks scrolling during play */
    blockScrolling() {
        window.scrollTo(0, 0);
    }

    /**  method by which the direction of hero is changed */
    moveHero() {
        // remove previous hero in order to avoid multipling hero 
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
        // check if user is fell off the game board
        this.gameOver();
        // show new hero
        this.showHero();
        // check if user has caught thief
        this.catchThief();
    }

    /** Check if user user has caught the thief */
    catchThief() {
        // checking if hero postion is equal to thief position 
        if (this.hero.position.x === this.thief.position.x && this.hero.position.y === this.thief.position.y) {
            // add point
            this.score++;
            this.userScore.innerText = this.score;
            // create new thief
            this.removePreviousThief();
            this.thief = new Thief();
            this.showThief();
        }
    }

    /** starting new game, and moving hero with selected speed  */
    start() {

        // block scrolling
        this.blockScrolling()
        this.elements.body.style.overflow = "hidden";

        // show score
        this.elements.score.style.display = "block";

        // set interval with breakes between hero moves, according to selected hero speed
        this.onPlay = setInterval(() => {
            this.moveHero();
        }, this.heroSpeed);
    }

    /**  checking if a character has fall out of the game board */
    gameOver() {
        if (this.hero.position.x < 0 || this.hero.position.x > 9 || this.hero.position.y < 0 || this.hero.position.y > 9) {

            // adding scrolling
            this.elements.body.style.overflow = "auto";

            // animation
            this.elements.gameBoard.classList.add("gameOver");
            setTimeout(() => {
                this.elements.gameBoard.classList.remove("gameOver");
            }, 1000);

            //end position for hero
            this.hero.position.x = 0;
            this.hero.position.y = 0;

            // cleaning board
            this.removePreviousThief();

            // showing elements
            setTimeout(() => {
                this.elements.btn.style.display = "flex";
            }, 1000);

            // adding score to localStorage
            // previous score
            localStorage.setItem("prevScore", JSON.stringify(this.score));

            // highest score
            if (localStorage.getItem("highScore") !== null) {
                const highScore = JSON.parse(localStorage.getItem("highScore"));
                if (this.score > highScore) {
                    localStorage.setItem("highScore", JSON.stringify(this.score));
                }
            } else {
                localStorage.setItem("highScore", JSON.stringify(this.score));
            }

            //changing scoreboard
            displayingScore();

            // during the countdown the button text changes so you have to change it after the game ends
            this.elements.btn.innerText = "New Game";
            isGameActive = false;

            //ending game by clearInterval
            clearInterval(this.onPlay);
        }
    }

    /**  clear previous score in menu */
    clearPrevious() {
        this.userScore.innerText = 0
    }

    /**  controling hero by keyboard arrows */
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

    /** hide specific elements in game menu */
    hideElements() {
        this.elements.btn.style.display = "none"
    }

    mobile() {
        // needed to toggle content on mobile devices
        const menuContainer = document.querySelector('.game-menu');
        const gameContainer = document.querySelector('.game-menu');

        window.addEventListener('resize', () => {
            // end current game

            // on mobile devices hide game board container, show only menu
            if (window.innerWidth < 768) {

                gameContainer.classList.add('disabled');
                menuContainer.classList.remove('disabled');
            }

            // show both of them on larger devices
            else {
                gameContainer.classList.remove('disabled');
                menuContainer.classList.remove('disabled');
            }
        });
    }
    /**  initialization of game */
    init() {
        this.clearPrevious();
        this.hideElements();
        this.start();
        this.showHero();
        this.showThief();
        this.turnHero();
        this.mobileMove();
        this.mobile();
    }
}


/**  adding click event on start button in game menu, by this button can start new game */
export const gameInit = () => {

    // default hero speed -  difficulty level
    let heroSpeed = 250

    // user can choose diffrent difficulty level in menu. Each level has his own hero speed.
    const easyLevel = document.querySelector('.checkboxDifficulty:first-child input');
    const normalLevel = document.querySelector('.checkboxDifficulty:nth-child(2) input');
    const hardLevel = document.querySelector('.checkboxDifficulty:last-child input');
    easyLevel.addEventListener('click', () => heroSpeed = 250);
    normalLevel.addEventListener('click', () => heroSpeed = 150);
    hardLevel.addEventListener('click', () => heroSpeed = 80);

    // needed to toggle content on mobile devices
    const menuContainer = document.querySelector('.game-menu');
    const gameContainer = document.querySelector('.game-menu');

    window.addEventListener('resize', () => {
        // on mobile devices hide game board container, show only menu
        if (window.innerWidth < 768) {
            gameContainer.classList.add('disabled');
            menuContainer.classList.remove('disabled');
        }

        // show both of them on larger devices
        else {
            gameContainer.classList.remove('disabled');
            menuContainer.classList.remove('disabled');
        }
    });

    // add click event on button in game menu by which user can start new game
    const newGame = document.querySelector("#newGame-btn");
    newGame.addEventListener("click", () => {

        const action = () => {
            // at first do a countdown
            newGame.innerText = "Ready";
            setTimeout(() => {
                newGame.innerText = "Steady";
            }, 1000);
            setTimeout(() => {
                newGame.innerText = "Go";
            }, 2000)

            // starting new game after 3 seconds
            setTimeout(() => {

                // hide menu on mobile devices
                menuContainer.classList.add('disabled');

                // create game object
                const game = new Game(heroSpeed);
                game.init();

                // controlling hero by keyboard arrows
                document.addEventListener("keydown", (e) => {
                    game.turnHero(e.key);
                });
            }, 3000);
        }

        // prevent of multiple game starts
        if(isGameActive){
            console.log('The game has already started');
        }
        else {
            isGameActive = true;
            return action();
        }
    });
}



