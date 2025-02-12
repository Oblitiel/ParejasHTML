var cards = []
var row
var col
var tapped = []
var checking = false

function runGame(){
    row = document.getElementById("in_fila").value
    col = document.getElementById("in_col").value
    prepareGame(col, row)
    poblateCards(cards)
}

function prepareGame(){
    if (((row * col) % 2 ) != 0) {
        var parrafo = document.createElement("p")
        var text = document.createTextNode("No son unos valores de pareja validos")
        parrafo.appendChild(text)
        // var div = document.getElementById("input_div")
        // div.appendChild(parrafo)
        alert("No son unos valores de pareja validos")
        return
    }
    if (row<0 || col<0){
        alert("No son unos valores de pareja validos")
        return
    }

    // Esconde el div
    var div = document.getElementById("input_div")
    div.classList.add("invisible")
    // Borrar el elemento
    // document.getElementById("input_div").remove()

    document.getElementById("table_div").appendChild(generateTable(col,row))
}

function generateTable(col, row) {
    var table = document.createElement("table");

    for (let i = 0; i < row; i++) {
        var tr = document.createElement("tr")
        
        for (let j = 0; j < col; j++) {
            let td = document.createElement("td")
            let card = document.createElement("div")
            card.classList.add("card")
            card.classList.add("card-hide")
            
            card.style.width = 50 / col + "vh"
            card.style.height = 50 / col*1.25 + "vh"

            card.setAttribute("onclick","flipAndCheck(this)")
            cards.push(card)

            var p = document.createElement("p")
            card.appendChild(p)
            
            td.appendChild(card)
            tr.appendChild(td)
        }

        table.appendChild(tr)
    }
    return table
}

function hideCards() {
    cards.forEach(card => {
        card.classList.remove("card-show")
        card.classList.add("card-hide")
    });
}

function showCards() {
    cards.forEach(card => {
        card.classList.remove("card-hide")
        card.classList.add("card-show")
    });
}

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
        return true
    }
    return false
}

function poblateCards(cards){
    var nums = []
    for (let index = 0; index < row*col/2; index++) {
        nums.push(index)
        nums.push(index)
    }

    cards.forEach(card => {
        let randIndex = Math.floor(Math.random()*nums.length)
        card.firstElementChild.innerHTML = nums[randIndex]
        card.number = nums[randIndex]
        nums.splice(randIndex,1)
    });
}