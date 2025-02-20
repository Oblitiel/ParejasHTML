var tapped = []
var paused = false
var unSolvedPairs = 0


function runGame(){
    let row = document.getElementById("in_fila").value
    let col = document.getElementById("in_col").value
    
    if (((row * col) % 2 ) != 0 || row<0 || col<0) {
        alert("No son unos valores de pareja validos")
        return
    }

    prepareGame(col, row)
}

function prepareGame(col, row){
    // Iniciar timer y Puntos
    startTimer()
    addPoints(1000)

    // Cambiar color del fondo
    let body = document.getElementById("body")
    body.style.animationName = "bg-animation"
    body.style.animationDuration = time + "s"

    // Esconde el div
    let div = document.getElementById("input_div")
    div.classList.add("invisible")

    // Calcula el numero de parejas a resolver
    unSolvedPairs = row * col / 2

    // Genera la tabla
    document.getElementById("game_div").innerHTML="" // Vacio el div
    document.getElementById("game_div").appendChild(generateTable(col,row))
}

function generateTable(col, row) {
    var table = document.createElement("table");
    // Crear lista de los numeros aleatorios a poner
    var nums = []
    for (let index = 0; index < row*col/2; index++) {
        nums.push(index)
        nums.push(index)
    }

    for (let i = 0; i < row; i++) {
        var tr = document.createElement("tr")
        
        for (let j = 0; j < col; j++) {
            let td = document.createElement("td")
            
            let randIndex = Math.floor(Math.random()*nums.length)
            let card = generateCard(nums[randIndex], 12.5)
            nums.splice(randIndex,1)

            td.appendChild(card)
            tr.appendChild(td)
        }

        table.appendChild(tr)
    }
    return table
}

function generateCard(num, size){
    let card = document.createElement("div")
    card.classList.add("card")
    card.classList.add("card-hide")
    
    card.style.width = size + "vh"
    card.style.height = size * 1.25 + "vh"

    card.setAttribute("onclick","flipAndCheck(this)")

    var p = document.createElement("p")
    card.number = num
    p.innerHTML = card.number
    card.appendChild(p)
    return card
}

function flipAndCheck(card){
    if (!card.classList.contains("card-show") && !paused) {
        // Girar carta y guardarla para comprobar más tarde
        card.classList.add("card-show")
        card.classList.remove("card-hide")
        tapped.push(card)
        
        if (tapped.length == 2) {
            paused = true
            if (isPair(tapped)) {
                tapped.splice(0,2)
                paused = false
                addPoints(1000)
            }
            else {
                setTimeout(unFlip,1000,tapped)
                addPoints(-500)
            }
        }
        // Comprobar que esta resuleto
        if (unSolvedPairs == 0) {
            setTimeout(endGame,500,true)
        }
    }
}

function unFlip(pair){
    pair.forEach(singleCard => {
        singleCard.classList.remove("card-show")
        singleCard.classList.add("card-hide")
    });
    paused = false
    tapped.splice(0,2)
}

function isPair(pair){
    if (pair[0].number == pair[1].number) {
        unSolvedPairs --
        return true
    }
    return false
}

function endGame(win) {
    let mensaje = win && "Has Ganado!! :)" || "Has Perdido :("
    paused = true
    alert(mensaje)
    endTimer()
    document.getElementById("age_div").classList.remove("invisible")

}

// Misc
function capValue(elem,max) {
    if (elem.value <= 0) {
        elem.value = 1
    }

    if (elem.value >= max) {
        elem.value = max
    }
}

// Score
var score = 0

function writeScore() {
    let p = document.getElementById("score")
    p.innerHTML = score
}

function addPoints(points) {
    score += points
    writeScore()
}

// Forms
function showForm(isAdult) {
    document.getElementById("age_div").classList.add("invisible")
    document.getElementById("form_div").classList.remove("invisible")
    if (isAdult) {
        document.getElementById("extra_form").classList.remove("invisible")
    }
}