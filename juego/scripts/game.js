var row
var col
var tapped = []
var checking = false
var solvedPairs = 0


function runGame(){
    row = document.getElementById("in_fila").value
    col = document.getElementById("in_col").value
    prepareGame(col, row)
    // poblateCards(cards)
}

function prepareGame(col, row){
    if (((row * col) % 2 ) != 0 || row<0 || col<0) {
        alert("No son unos valores de pareja validos")
        return
    }

    // Esconde el div
    var div = document.getElementById("input_div")
    div.classList.add("invisible")

    // Genera la tabla
    let table = generateTable(col,row)
    document.getElementById("table_div").appendChild(table)
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
            let card = generateCard(nums[randIndex])
            nums.splice(randIndex,1)

            td.appendChild(card)
            tr.appendChild(td)
        }

        table.appendChild(tr)
    }
    return table
}

function generateCard(num){
    let card = document.createElement("div")
    card.classList.add("card")
    card.classList.add("card-hide")
    
    card.style.width = 50 / col + "vh"
    card.style.height = 50 / col * 1.25 + "vh"

    card.setAttribute("onclick","flipAndCheck(this)")

    var p = document.createElement("p")
    card.number = num
    p.innerHTML = card.number
    card.appendChild(p)
    return card
}

// function hideCards() {
//     cards.forEach(card => {
//         card.classList.remove("card-show")
//         card.classList.add("card-hide")
//     });
// }

// function showCards() {
//     cards.forEach(card => {
//         card.classList.remove("card-hide")
//         card.classList.add("card-show")
//     });
// }

function flipAndCheck(card){
    if (!card.classList.contains("card-show") && !checking) {
        // Girar carta y guardarla para comprobar más tarde
        card.classList.add("card-show")
        card.classList.remove("card-hide")
        tapped.push(card)
        
        if (tapped.length == 2) {
            checking = true
            if (isPair(tapped)) {
                tapped.splice(0,2)
                checking = false
            }
            else {
                setTimeout(unFlip,1000)
            }
        }
    }
}

function unFlip(pair){
    if (pair == undefined) {
        pair = tapped
    }

    pair.forEach(singleCard => {
        singleCard.classList.remove("card-show")
        singleCard.classList.add("card-hide")
    });
    checking = false
    tapped.splice(0,2)
}

function isPair(pair){
    if (pair[0].number == pair[1].number) {
        solvedPairs ++
        // Comprobar que esta resuleto
        if (solvedPairs == (col * row)/2) {
            alert("Ganaste pive")
        }
        return true
    }
    return false
}
