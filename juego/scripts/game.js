var cards = []

function prepareGame(){
    var fila = document.getElementById("in_fila").value
    var col = document.getElementById("in_col").value

    if (((fila * col) % 2 ) != 0) {
        var parrafo = document.createElement("p")
        var text = document.createTextNode("No son unos valores de pareja validos")
        parrafo.appendChild(text)
        // var div = document.getElementById("input_div")
        // div.appendChild(parrafo)
        alert("No son unos valores de pareja validos")
        return
    }

    // Esconde el div
    var div = document.getElementById("input_div")
    div.classList.add("invisible")
    // Borrar el elemento
    // document.getElementById("input_div").remove()

    document.getElementById("table_div").appendChild(generateTable(col,fila))
}

function generateTable(col, row) {
    var table = document.createElement("table");

    for (let i = 0; i < row; i++) {
        var tr = document.createElement("tr")
        
        for (let j = 0; j < col; j++) {
            var td = document.createElement("td")
            var card = document.createElement("div")
            card.classList.add("card-hide")
            
            card.setAttribute("onclick","flip(this)")
            cards.push(card)
            td.appendChild(card)
            tr.appendChild(td)
        }

        table.appendChild(tr)
    }

    return table
}

function flip(card){
    if (card.classList.contains("card-show")){
        card.classList.remove("card-show")
    } else{
        card.classList.add("card-show")
    }
}