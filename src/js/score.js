/** displaying highest and previous score form localStorage */
export const displayingScore = () => {
    const high = document.querySelector("#score--highest");
    const prev = document.querySelector("#score--previous");
    if (localStorage.getItem("prevScore")) {
        prev.innerText = localStorage.getItem("prevScore");
    }
    if (localStorage.getItem("highScore")) {
        high.innerText = localStorage.getItem("highScore");
    }
}