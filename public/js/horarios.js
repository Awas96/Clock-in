/* Estructuras y definiciones */
var calendar;

function Evento(start, end, title) {
    this.start = start;
    this.end = end;
    this.title = title;
}

/* Funciones */
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        height: 500,
        headerToolbar: {
            left: 'today,prev,next',
            right: 'title',
            center: 'dayGridMonth,dayGridWeek,timeGridDay'
        },
        locale: 'es',
        initialView: 'dayGridMonth',
        selectable: true,
        editable: true,
        dateClick: function (info) {
            pulsarDia(info)
        },
    });
    getHorarios();
    calendar.render();
});

/* Funciones para eventos */
function agregarEvento(info) {
    let evento = new Evento();
    let indice = document.querySelector("#modal-hora").selectedIndex;
    evento.start = document.querySelectorAll("#modal-hora option")[indice].dataset.hInit;
    evento.end = document.querySelectorAll("#modal-hora option")[indice].dataset.hSal;
    evento.title = "Trabajo";
    let titulo = document.querySelector("#modal-title");
    titulo.innerText = "Evento de dia:  " + info.dateStr;
    aniadirEvento(evento, info.dateStr);
}

function aniadirEvento(evento, fecha) {

    calendar.addEvent({
        title: evento.title,
        start: fecha + " " + evento.start,
        end: fecha + " " + evento.end,
    });
}

/*Funciones para el Modal*/

function pulsarDia(info) {
    crearModalDia(info);
    $('#Modal').modal()

}

function limpiaModal() {
    document.querySelector(".modal-title").innerHTML = "";
    document.querySelector(".modal-body").innerHTML = "";
    document.querySelector(".modal-footer").innerHTML = "";

}

function crearModalDia(info) {
    limpiaModal();
    /*Titulo*/
    document.querySelector(".modal-title").innerText = "Nuevo evento para día " + info.dateStr;
    /*Cuerpo*/
    let cuerpo = document.querySelector(".modal-body");
    let titulo = document.createElement("p");
    titulo.innerText = "Nuevo dia de trabajo para usuario " + document.querySelector('[data-usuario-username]').innerText;
    let selector = document.createElement("p");
    selector.innerText = "Seleccione un horario:";

    cuerpo.appendChild(titulo);
    cuerpo.appendChild(selector);
    let select = rellenarHorariosSelect();
    cuerpo.appendChild(select);


    /*Pie*/
    let footer = document.querySelector(".modal-footer");
    let btnCancelar = document.createElement("button");
    let btnAceptar = document.createElement("button");
    btnCancelar.classList.add("btn", "btn-secondary");
    btnCancelar.textContent = "Cancelar"
    btnCancelar.dataset.dismiss = "modal";
    btnAceptar.classList.add("btn", "btn-primary");
    btnAceptar.dataset.dismiss = "modal";
    btnAceptar.textContent = "Aceptar"
    btnAceptar.addEventListener("click", function () {
        agregarEvento(info)
    });
    footer.appendChild(btnCancelar);
    footer.appendChild(btnAceptar);


}

function rellenarHorariosSelect() {
    let select = document.createElement("select")
    select.id = "modal-hora"
    datos = allStorage();
    datos.forEach(function (elemento) {
        let e = JSON.parse(elemento)
        let option = document.createElement("option");
        option.dataset.id = e.id;
        option.dataset.hInit = e.entrada.replace(".", ":");
        option.dataset.hSal = e.salida.replace(".", ":");
        option.text = " " + e.entrada + " ~ " + e.salida;
        select.appendChild(option)
    });

    return select;
}

/* Funciones para recoger datos */

function getHorarios() {
    let url = '/turnos/predefinidos/get';
    ajax(url, guardarHorarios);
}

function guardarHorarios(datos) {
    datos = JSON.parse(datos);
    let sessionStorage = window.sessionStorage;
    sessionStorage.clear();
    datos.forEach(function (e) {
        sessionStorage.setItem("HORARIO_" + e.id, JSON.stringify(e));
    })
}

function allStorage() {

    var values = [],
        keys = Object.keys(sessionStorage),
        i = keys.length;

    while (i--) {
        if (keys[i].includes("HORARIO")) {
            values.push(sessionStorage.getItem(keys[i]));
        }
    }
    return values;
}

function ajax(url, callback = null, data = null) {

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
