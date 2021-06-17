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
            hora_fichaje: moment().format("YYYY-MM-DD HH:mm:ss"),
            estado: document.querySelector(".fichar_boton").dataset.state
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

    let divRestante = document.querySelector("#divRestante");
    divRestante.parentElement.style = "display:none";
    let p = document.createElement("div");

    if (btnFichar.dataset.state == 0) {
        btnFichar.classList.remove("btn-primary");
        btnFichar.classList.add("btn-danger");
        btnFichar.innerText = "Salir";
        btnFichar.dataset.state = 1;
        p.innerHTML = "Salida realizada! <i class='fas fa-check'><i/>"
    } else {
        btnFichar.style = "display: none";
        p.innerHTML = "Entrada Realizada! <i class='fas fa-check'><i/>"
    }


    divRestante.parentElement.parentElement.appendChild(p);
    alert("Fichado correctamente!");
}
