/* Estructuras y definiciones */
var calendar;

function Evento(id_evento, id_turno, fecha, start, end, title, save, color) {
    this.id_evento = id_evento;
    this.id_turno = id_turno;
    this.fecha = fecha;
    this.start = start;
    this.end = end;
    this.title = title;
    this.save = save;
    this.color = color;
}

/* num maneja el movimiento con los meses para avisar al usuario si se van a borrar los cambios por recargar los eventos*/
var num = 0;
/* array de eventos que vamos a  usar para luego enviarlos al backend*/
var eventos = [];

/* Funciones */
/* Funcion principal carga el calendario y disponde de algunos eventos de la UI*/
document.addEventListener('DOMContentLoaded', function () {
    let btnGuardar = document.querySelector("#btnGuardar");
    let slctUsuarios = document.querySelector("#selectUsuarios");

    var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        height: 500,
        headerToolbar: {
            left: 'prev,next',
            right: 'title',
            center: 'dayGridMonth,dayGridWeek'
        },
        droppable: false,
        locale: 'es',
        initialView: 'dayGridWeek',
        selectable: true,
        editable: false,
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
        }

    });
    cargarEventos();
    calendar.render();
    let prevButton = document.querySelector(".fc-prev-button")
    let nextButton = document.querySelector(".fc-next-button")

    prevButton.addEventListener("click", function () {
        {
            num--
            if (num == -2) {

                cargarEventos();

            }
        }
    });
    nextButton.addEventListener("click", function () {
        {
            num++
            if (num == 2) {
                cargarEventos();

            }
        }
    });
});

/* funciones de altas y bajas que se usan para luego guardar los datos */


/*Funcion que agrega el evento al calendario Full Calendara para asi mostrarse, aparte añade ese evento al array de eventos para luego pasarlos*/

function aniadirEvento(evento) {
    calendar.addEvent({
        id: evento.id_evento,
        title: evento.title,
        start: evento.fecha + " " + evento.start,
        end: evento.fecha + " " + evento.end,
        color: evento.color,

    });
    eventos.push(evento);
}

/*Funciones para el Modal*/

function pulsarDia(info) {
    crearModalDia(info);
    $('#Modal').modal()

}

function pulsarEvento(calEvent) {
    crearModalEvento(calEvent);
    $('#Modal').modal()
}

function limpiaModal() {
    document.querySelector(".modal-title").innerHTML = "";
    document.querySelector(".modal-body").innerHTML = "";
    document.querySelector(".modal-footer").innerHTML = "";

}

/* Funcion de modal generica que asigna una cabecera, un mensaje y te permite añadir dos funciones con eventos y un parametro extra para el segundo boton (que normalmente suele ser cancelar)*/

/* El extra es utiliza en el segundo boton para opciones de volver atras por ejemplo */

/* Funciones para enviar/recoger datos */

function cargarEventos() {
    num = 0;
    eventos = []
    let url = "/gestion/horarios/leer";
    let datos = {
        idusuario: document.querySelector("#calendar").dataset.userId,
        mes: (calendar.getDate().getMonth() + 1),
        anno: calendar.getDate().getFullYear()
    }
    ajax(url, datos, cargarHorarios)
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

/* funciones callback tras llamada a datos*/

function cargarHorarios(eventos) {

    calendar.removeAllEvents();
    let datos = JSON.parse(eventos);
    datos.forEach(function (e) {
        evento = new Evento(e.id_evento, e.id_turno, e.fecha, e.start, e.end, e.title, "false", "#006cfa");
        aniadirEvento(evento);
    })

}

/* Funciones Miscelaneas*/

function volverAMesAtras() {
    document.querySelector(".fc-next-button").click();
    document.querySelector(".fc-next-button").click();
}

function volverAMesAlante() {
    document.querySelector(".fc-prev-button").click();
    document.querySelector(".fc-prev-button").click();
}