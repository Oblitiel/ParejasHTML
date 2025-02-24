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
    changeVisibility(document.getElementById("game_div"),true)
    // Iniciar timer y Puntos
    startTimer()
    addPoints(1000)

    // Cambiar color del fondo
    let body = document.getElementById("body")
    body.style.animationName = "bg-animation"
    body.style.animationDuration = time + "s"

    // Esconde el div
    let div = document.getElementById("input_div")
    changeVisibility(div,false)

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
    images = getPosiblePairsImages(row*col)

    for (let i = 0; i < row; i++) {
        var tr = document.createElement("tr")
        
        for (let j = 0; j < col; j++) {
            let td = document.createElement("td")
            
            let randIndex = Math.floor(Math.random()*nums.length)
            let card = generateCard(nums[randIndex], 12.5, images)
            nums.splice(randIndex,1)

            td.appendChild(card)
            tr.appendChild(td)
        }

        table.appendChild(tr)
    }
    return table
}

function generateCard(num, size, images){
    let card = document.createElement("div")
    card.classList.add("card")
    card.classList.add("card-hide")
    
    card.style.width = size + "vh"
    card.style.height = size * 1.25 + "vh"

    card.setAttribute("onclick","flipAndCheck(this)")

    card.number = num

    var img = document.createElement("img")
    img.setAttribute("src",images[num])
    img.style.width = size + "vh"
    card.appendChild(img)
    
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
    
    changeVisibility(document.getElementById("game_div"),false)
    changeVisibility(document.getElementById("age_div"),true)

    let body = document.getElementById("body")
    body.style.animationName = ""
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

function changeVisibility(elem ,setVisible) {
    if (setVisible == undefined) {
        setVisible = elem.style.display == "none"
    }

    if (setVisible) {
        elem.style.display = ""
    } else {
        elem.style.display = "none"
    }
}

function getPosiblePairsImages(cardNum) {
    let pairs = cardNum / 2
    let images = []

    while (images.length < pairs) {
        let randIndex = Math.floor(Math.random()*24 + 1)
        if (randIndex < 10) {randIndex = "0" + randIndex}
        let rute = "src/emo" + randIndex + ".jpeg"

        if (!images.includes(rute)) {
            images.push(rute)
        }
    }

    return images
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