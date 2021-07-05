#Chase the thief
A simple game where the goal is to catch as many thieves as possible

###How it works ?
1. When user presses the button a countdown begins and after 3 seconds a new game object is created
2. AddEventListender is added for control the character
3. The start button is hidden
4. Hero and thief shows up
5. Scrolling is blocked, and the interval responsible for character movement is mounted
6. Interval is responsible for character movement, and checks if the thief is caught, the hero is not out of the game, and shows the hero in a new field
7. If the user leaves the field of play, the game ends and enable scroll, show game over animation, remove thief, show items on the page that have been removed, add scores to LocalStorage, change the text in the button(during the countdown the text in the button changes) and remove  game interval
