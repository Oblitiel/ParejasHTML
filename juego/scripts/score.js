var score = 0

function writeScore() {
    let div = document.getElementById("score_div")
    let p = div.firstElementChild
    p.innerHTML = score
}

function addPoints(points) {
    score += points
    writeScore()
}