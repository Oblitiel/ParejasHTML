var cards = []
var row
var col
var tapeds = 0

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
            var td = document.createElement("td")
            var card = document.createElement("div")
            card.classList.add("card-hide")
            
            card.style.width = 50 / col + "vh"
            card.style.height = 50 / col*1.25 + "vh"

            card.setAttribute("onclick","flip(this)")
            cards.push(card)
            
            td.appendChild(card)
            tr.appendChild(td)
        }

        table.appendChild(tr)
    }

    table.style.height = 50/col*1.25*row + "vh"
    return table
}

function flip(card){
    if (card.classList.contains("card-show")){
        card.classList.remove("card-show")
    } else{
        card.classList.add("card-show")
        tapeds
    }
}

function poblateCards(cards){
    var nums = []
    for (let index = 0; index < row*col/2; index++) {
        nums.push(index)
        nums.push(index)
    }

    cards.forEach(card => {
        let p = document.createElement("p")
        let randIndex = Math.floor(Math.random()*nums.length)
        let text = document.createTextNode(nums[randIndex])
        nums.splice(randIndex,1)
        p.appendChild(text)
        card.appendChild(p)
    });
}