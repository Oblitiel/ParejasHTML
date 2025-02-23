function showForm(isAdult) {
    changeVisibility(document.getElementById("age_div"),false)
    changeVisibility(document.getElementById("form_div"),true)
    changeVisibility(document.getElementById("extra_form"),isAdult)
}

function sendForm() {
    
}