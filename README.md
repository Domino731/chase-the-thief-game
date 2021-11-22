# Chase the thief
A simple game created in JavaScript. The user must catch the thief and at the same time must be careful not to fall off the game board. Game has 3 difficulty level, where each has his own hero speed. 
* Easy level - moving hero by each 250ms
* Normal level -  moving hero by each 150ms
* Hard level -  moving hero by each 80ms

This game has also opportunity to save user's score into local storage. User can move hero by using keyboard arrows (`turnHero` method in `Game` class) and by finger swipe on touch screen devices  (`mobileMove` in `Game` class).
Available at https://brave-perlman-74efe5.netlify.app
## Technology
* Webpack
* HTML
* JavaScript
* Sass
## How it works ?
When the user clicks on a button in the menu, a new object `Game` is created with selected difficulty level. Countdown starts and after 3s game starts.
* 1 - `clearPrevious()` method removes the previous score in menu
* 2 - `hideElements()` hides button in menu
* 3 - `start()` starts new game, and hero starts moving
* 4 - `showHero()` and `showThief()` displays thief and hero in game board container

## `Hero` class
Class for a hero, which is contains start position and actual direction. Used in `Game` class.
### Constructor
* `position` - hero position (in vertical and horizontal), needed to move hero by keyboard arrows (`turnHero` method in `Game` class) or by finger swipe (`mobileMove` in `Game` class). This position is also needed to check if the user caught the thief (`catchThief()` method in `Game` class). 
* `direction` - direction on which hero will be moving, at start it will be right, this value is changing by `turnHero` method and `mobileMove`.
## `Thief` class 
Class for thief, Used in `Game` class.
### Constructor
* `position` - thief position in vertical and horizontal, position is generated randomly. Needed in `Game` class to check if thief has caught by user (`catchThief()` method in `Game` class).


## `Game` class
Class which is responsible for whole logic behind game.
### Constructor
* `pole` - divs from game board on which hero is moving
* `userScore` - wrapper of user's score in menu
* `hero` - hero class which is described above
* `thief` - thief class which is described above
* `score` - actual score which is changing by `catchThief()` method. This value is also saved in local storage when game ends by `gameOver()` method.
* `heroSpeed` - speed of hero (in ms), needed to set interval which is responsible for moving hero with this value (`start()` method).
* `elements` - object with DOM elements which are needed to hide them when game starts, or show when game ends.
### Methods
* `mobileMove()` - method which detect user finger swipe and based on that it sets hero direction (`hero.direction`)
* `position()` - method which returns actual position of element
* `showHero()` - method by which hero is displayed in particular pole in game board
* `showThief()` - method by which thief is displayed in particular pole in game board
* `removePreviousHero()` -  method which removes the previous hero position in order to block cloning of hero position
* `removePreviousThief()` - method which removes the previous position in order to block cloning of thief position 
* `blockScrolling()` - method which blocks scrolling during play (mainly for mobile devices)
* `moveHero()` -  method by which the direction of hero is changed (`hero.direction`)
* `catchThief()` - check if user user has caught the thief
* `start()` - starting new game, and moving hero with selected speed
* `gameOver()`-  checking if a character has fall out of the game board 
* `clearPrevious()` - clear previous score in menu
* `turnHero()` - controling hero by keyboard arrows 
* `hideElements()` - hide specific elements in game menu
* ` init()` - initialization of game
## Available functions
* `displayingScore()` - displaying highest and previous score form localStorage
* `gameInit()` - adding click event on start button in game menu, by this button can start new game
## Project scripts
### ***Install dependencies by `npm i`***
### Production Build - `npm run build`
### Dev Build - `npm run build-dev`
### Dev Build with file changes listener - `npm run watch`
### Dev server on port 3001 - `npm start`
