document.addEventListener("DOMContentLoaded", main);

function main() {
    console.log(moment().format("YYYY-MM-DD HH:mm:ss"))
    let btnFichar = document.querySelector(".fichar_boton");
    btnFichar.addEventListener("click", fichar);
    if (document.querySelector("#turno") == null) {
        btnFichar.disabled = true;
    }
}

function fichar() {
    if (document.querySelector("#turno") != null) {
        let url = "/fichaje/nuevo";
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
    let p = document.createElement("div");
    clearInterval(timeinterval);
    if (btnFichar.dataset.state == 0) {
        btnFichar.classList.remove("btn-primary");
        btnFichar.classList.add("btn-danger");
        btnFichar.innerText = "Fichar Salida";
        btnFichar.dataset.state = 1;
        fechafichaje = new Date(moment().format("YYYY-MM-DD") + " " + document.querySelector("#turno").dataset.horafin)
        var deadline = fechafichaje.toString();
        initializeClock('divRestante', deadline);
        p.innerHTML = "Entrada realizada! <i class='fas fa-check'><i/>"
    } else {
        btnFichar.style = "display: none";
        p.innerHTML = "Salida Realizada! <i class='fas fa-check'><i/>"
    }

    divRestante.parentElement.parentElement.appendChild(p);
    alert("Fichado correctamente!");
}
