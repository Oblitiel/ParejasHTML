var points = 0

function writeScore() {
    let div = document.getElementById("score_div")
    let p = div.firstElementChild
    p.innerHTML = points
}