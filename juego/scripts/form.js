function createFormAgeValidation(){
    // let form = document.createElement("form")
    // let h2 = document.createElement("h2")
    // let textH2 = document.createTextNode("Tengo más de 18 años")
    // let buttomSi = document.createElement("input")
    // buttomSi.setAttribute("type","button")
    // buttomSi.setAttribute("value","Si")
    // buttomSi.setAttribute("onclick","createForm(true)")
    // let buttomNo = document.createElement("input")
    // buttomNo.setAttribute("type","button")
    // buttomNo.setAttribute("value","No")
    // buttomNo.setAttribute("onclick","createForm(false)")

    // form.appendChild(h2)
    // h2.appendChild(textH2)
    // form.appendChild(buttomSi)
    // form.appendChild(buttomNo)

    // document.getElementById("form_div").appendChild(form)

    document.getElementById("form_div").appendChild(jsonToHTML(
        { tag:"form",
            children:[
                { tag:"h2",
                    content:"Tengo más de 18 años"
                },
                {tag:"br"},
                {tag:"input",
                    attr:{
                        type:"button",
                    }
                }
            ]
        }
    ))
}

function createForm(isAdult) {
    let form = document.createElement("form")

    createQuestion("Hombre","sexo","radio", form, true)
    createQuestion("Mujer","sexo","radio", form, true)
    createQuestion("Prefero no decirlo","sexo","radio", form, true)

    createQuestion("Nombre:","name","text",form,true)

    createQuestion("Color favorito:","color","text",form, true)

    document.getElementById("form_div").appendChild(form)
}

function createQuestion(label, name, type, parent, br) {
    let labelElem = document.createElement("label")
    let input = document.createElement("input")
    let labelText = document.createTextNode(label)
    labelElem.appendChild(labelText)
    labelElem.setAttribute("for",name)
    input.setAttribute("type",type)
    input.setAttribute("name",name)

    parent.appendChild(labelElem)
    parent.appendChild(input)
    if (br) {
        parent.appendChild(document.createElement("br"))
    }
}