var cards = []
var row
var col
var tapped = [[]]
var solved = []

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

            card.setAttribute("onclick","flip(this)")
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

function flip(card){
    if (card.classList.contains("card-hide")) {
        card.classList.remove("card-hide")
        if (tapped[tapped.length-1].length<2){
            tapped[tapped.length-1].push(card)
        }
        else {
            tapped.push([card])
            checkPair(tapped.shift())
        }
        if (tapped[tapped.length-1].length == 2) {
            setTimeout(checkPairTimeOut,1000)
        }
        console.log(tapped);
    }
}

function checkPairTimeOut(){
    checkPair(tapped.shift())
}

function checkPair(pair){
    if (pair[0].number == pair[1].number) {
        solved.concat(pair)
    }else{
        pair.forEach(singleCard => {
            singleCard.classList.add("card-hide")
        });
    }
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