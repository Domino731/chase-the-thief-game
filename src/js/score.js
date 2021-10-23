/** displaying scores form localStorage */
export const displayingScore = () => {
    const high = document.querySelector("#score--highest");
    const prev = document.querySelector("#score--previous");
    if (localStorage.getItem("prevScore") !== null) {
        prev.innerText = localStorage.getItem("prevScore");
    }
    if (localStorage.getItem("highScore") !== null) {
        high.innerText = localStorage.getItem("highScore");
    }
}