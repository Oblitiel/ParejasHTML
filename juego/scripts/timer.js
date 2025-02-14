var time = 10
var iniTime = time
var interval

function startTimer(seg) {
    if (seg != undefined) {
        time = seg
        iniTime = seg
    }
    writeTime()
    interval = setInterval(passTime,1000)
}

function passTime() {
    time--
    writeTime()
    if (time <= 0) {
        endGame()
    }
}

function endTimer() {
    clearInterval(interval)
}

function getFormattedTime() {
    let min = Math.floor(time / 60)
    let seg = time - min * 60

    if (min < 10) {min = "0" + min}
    if (seg < 10) {seg = "0" + seg}

    return min + ":" + seg
}

function writeTime() {
    let div = document.getElementById("timer_div")
    let p = div.firstElementChild
    p.innerHTML = getFormattedTime()
}