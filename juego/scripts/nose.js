function jsonToHTML(json) {
    var elem = document.createElement(json.tag)
    if (json.content != undefined) {
        elem.innerHTML = json.content
    }
    if (json.attr != undefined) {
        for (var attrName in json.attr) {
            elem.setAttribute(attrName,json.attr[attrName])
        }
    }
    if (json.children != undefined) {
        for (var child in json.children) {
            elem.appendChild(jsonToHTML(json.children[child]))
        }
    }
    return elem
}

var x = jsonToHTML(
    {
        tag:"div",
        attr:{
            onclick:"hola()",
            hola:"hola"
        },
        children: [
            {
                tag:"p",
                content:"hola",
            },
            {
                tag:"p",
                content:"adios",
            }
        ]
    }
)