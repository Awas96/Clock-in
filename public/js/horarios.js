/* Estructuras y definiciones */
var calendar;

function Evento(horaentrada, horasalida, titulo) {
    this.horaentrada = horaentrada;
    this.horasalida = horasalida;
    this.titulo = titulo;
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
function agregarEvento() {
    alert(hola);
    let evento = new Evento();
    let x = document.querySelector("#modal-hora").selectedIndex;
    evento.horaentrada = document.querySelectorAll("#modal-hora option")[x].dataset.hInit;
    evento.horasalida = document.querySelectorAll("#modal-hora option")[x].dataset.hSal;
    evento.titulo = "Trabajo";
    let titulo = document.querySelector("#modal-title");
    titulo.innerText = "Evento de dia:  " + info.dateStr;
    console.log(evento)
    //aniadirEvento(evento);
}

function aniadirEvento(evento) {
    calendar.addEvent(evento);
}

/*Funciones para el Modal*/

function pulsarDia(info) {
    crearModalDia(info.dateStr);
    $('#Modal').modal()

}

function limpiaModal() {
    document.querySelector(".modal-title").innerHTML = "";
    document.querySelector(".modal-body").innerHTML = "";
    document.querySelector(".modal-footer").innerHTML = "";

}

function crearModalDia(fecha) {
    limpiaModal();
    /*Titulo*/
    document.querySelector(".modal-title").innerText = "Nuevo evento para día " + fecha;
    /*Cuerpo*/
    let cuerpo = document.querySelector(".modal-body");
    let titulo = document.createElement("p");
    titulo.innerText = "Nuevo dia de trabajo para usuario " + document.querySelector('[data-usuario-username]').innerText;
    let selector = document.createElement("p");
    selector.innerText = "Seleccione un horario:";

    cuerpo.appendChild(titulo);
    cuerpo.appendChild(selector);
    let select = rellenarHorariosSelect();
    console.log(select)
    cuerpo.appendChild(select);


    /*Pie*/
    let footer = document.querySelector(".modal-footer");
    let btnCancelar = document.createElement("button");
    let btnAceptar = document.createElement("button");
    btnCancelar.classList.add("btn", "btn-secondary");
    btnCancelar.textContent = "Cancelar"
    btnCancelar.dataset.dismiss = "modal";
    btnAceptar.classList.add("btn", "btn-primary");
    btnAceptar.textContent = "Aceptar"
    btnAceptar.addEventListener("click", agregarEvento);
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
        option.dataset.hInit = e.entrada;
        option.dataset.hSal = e.salida;
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
