document.addEventListener("DOMContentLoaded", main);

function main() {
    let btnFichar = document.querySelector(".fichar_boton");
    btnFichar.addEventListener("click", fichar);
    if (document.querySelector("#turno") == null) {
        btnFichar.disabled = true;
    }
}

function fichar() {
    if (document.querySelector("#turno") != null) {
        let url = "/eventos/fichaje/nuevo";
        data = {
            id_evento: document.querySelector("#turno").dataset.id,
            hora_fichaje: moment().format("YYYY-MM-DD HH:mm:ss")
        }
        ajax(url, data, fichado);
    }
}


function ajax(url, data = null, callback = null) {

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/text',
            'X-Requested-With': 'XMLHttpRequest'
        },
    }).then(function (response) {
        return response.text();
    }).then(function (text) {
        if (callback != null) callback(text, data);
    })
}

function fichado() {
    let btnFichar = document.querySelector(".fichar_boton");
    btnFichar.disabled = true;
    btnFichar.classList.remove("btn-primary");
    btnFichar.classList.add("btn-danger");

    let divRestante = document.querySelector("#divRestante");
    divRestante.id = ""
    divRestante.innerHTML = "Fichado <i class='fas fa-check'><i/>"

    alert("Fichado correctamente!");
}
