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
            left: 'today,prev,next',
            right: 'title',
            center: ''
        },
        droppable: false,
        locale: 'es',
        initialView: 'dayGridMonth',
        selectable: true,
        editable: false,
        dateClick: function (info) {
            if (info.dateStr >= moment(Date.now()).format('YYYY-MM-DD')) {
                if (slctUsuarios[slctUsuarios.selectedIndex].dataset.usuarioId != "null") {
                    pulsarDia(info)
                } else {
                    btnGuardar.disabled = true;
                    crearModalMensaje("Advertencia", "Debes seleccionar un usuario antes de editar el horario!")
                }
            }
        },
        eventClick: function (calEvent) {
            let eventoFecha = moment(Date.parse(calEvent.event.start)).format("YYYY-MM-DD");
            if (eventoFecha > moment(Date.now()).format('YYYY-MM-DD')) {
                pulsarEvento(calEvent);
            }
        },
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
        }


    });
    cargarPredefinidos();
    calendar.render();
    let prevButton = document.querySelector(".fc-prev-button")
    let nextButton = document.querySelector(".fc-next-button")
    prevButton.disabled = true
    nextButton.disabled = true

    prevButton.addEventListener("click", function () {
        {
            num--
            if (num == -2) {
                if (document.querySelector("#btnGuardar").disabled == false) {
                    crearModalMensaje("Advertencia", "Se perderan todos los datos guardados", "Aceptar", "Cancelar", cargarEventos, volverAMesAtras)
                } else {
                    cargarEventos();
                }
            }
        }
    });
    nextButton.addEventListener("click", function () {
        {
            num++
            if (num == 2) {
                if (document.querySelector("#btnGuardar").disabled == false) {
                    crearModalMensaje("Advertencia", "Se perderan todos los datos guardados", "Aceptar", "Cancelar", cargarEventos, volverAMesAlante)
                } else {
                    cargarEventos();
                }
            }
        }
    });
    slctUsuarios.addEventListener("change", cargarEventos);
    btnGuardar.addEventListener("click", crearModalGuardar);
});

/* funciones de altas y bajas que se usan para luego guardar los datos */

function agregarNuevoEvento(info) {
    let evento = new Evento();
    let indice = document.querySelector("#modal-hora").selectedIndex;
    evento.id_evento = "new";
    evento.id_turno = "new";
    evento.fecha = info.dateStr;
    evento.start = document.querySelectorAll("#modal-hora option")[indice].dataset.hInit;
    evento.end = document.querySelectorAll("#modal-hora option")[indice].dataset.hSal;
    evento.title = "Turno";
    evento.save = "true";
    evento.color = "#ffaa03"
    let titulo = document.querySelector("#modal-title");
    titulo.innerText = "Evento de dia:  " + info.dateStr;
    aniadirEvento(evento);
}

function editarEvento(calEvent) {
    let indice = document.querySelector("#modal-hora").selectedIndex;
    /*Gestion de visual*/

    let evento = eventos.findIndex(elemento => elemento.id = calEvent.event.id);
    let index = eventos.findIndex(function (e) {
        return e.fecha == moment(Date.parse(calEvent.event.start)).format("YYYY-MM-DD");
    });
    /* Editar Graficos*/
    calEvent.el.childNodes[0].style = "border-color: #00a435";

    calEvent.event.setStart(new Date(eventos[index].fecha + " " + document.querySelectorAll("#modal-hora option")[indice].dataset.hInit));
    /*Editar Evento*/
    eventos[index].start = document.querySelectorAll("#modal-hora option")[indice].dataset.hInit;
    eventos[index].end = document.querySelectorAll("#modal-hora option")[indice].dataset.hSal;
    if (eventos[index].save != "true") {
        eventos[index].save = "edit";
    }
}

function borrarEvento(calEvent) {
    let index = eventos.findIndex(function (e) {
        return e.fecha == moment(Date.parse(calEvent.event.start)).format("YYYY-MM-DD");
    });
    /* Editar Graficos*/
    calEvent.el.childNodes[0].style = "border-color: #9f0000";
    /*Editar Evento*/
    if (eventos[index].save == "true" || eventos[index].save == "edit") {
        eventos[index].save = "false";
    } else {
        eventos[index].save = "delete";
    }
}

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
    console.log(eventos)
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
        document.querySelector("#btnGuardar").disabled = false;
        document.querySelector("#selectUsuarios").disabled = true;
        agregarNuevoEvento(info)
    });
    footer.appendChild(btnCancelar);
    footer.appendChild(btnAceptar);


}

function crearModalEvento(calEvent) {
    limpiaModal();
    /*Titulo*/
    document.querySelector(".modal-title").innerText = "Editar evento para día " + eventos.find(elemento => elemento.id = calEvent.event.id).fecha;
    /*Cuerpo*/
    let cuerpo = document.querySelector(".modal-body");
    let titulo = document.createElement("p");
    titulo.innerText = "Editar dia de trabajo para usuario " + document.querySelector('[data-usuario-username]').innerText;
    let selector = document.createElement("p");
    selector.innerText = "Seleccione un horario:";

    cuerpo.appendChild(titulo);
    cuerpo.appendChild(selector);
    let select = rellenarHorariosSelect();
    cuerpo.appendChild(select);


    /*Pie*/
    let footer = document.querySelector(".modal-footer");
    let btnCancelar = document.createElement("button");
    let btnBorrar = document.createElement("button");
    let btnAceptar = document.createElement("button");
    btnCancelar.classList.add("btn", "btn-secondary");
    btnCancelar.textContent = "Cancelar";
    btnCancelar.dataset.dismiss = "modal";
    btnBorrar.classList.add("btn", "btn-danger");
    btnBorrar.textContent = "Borrar";
    btnBorrar.dataset.dismiss = "modal";
    btnAceptar.classList.add("btn", "btn-primary");
    btnAceptar.dataset.dismiss = "modal";
    btnAceptar.textContent = "Aceptar"
    btnAceptar.addEventListener("click", function () {
        document.querySelector("#btnGuardar").disabled = false;
        document.querySelector("#selectUsuarios").disabled = true;
        editarEvento(calEvent);
    });
    btnBorrar.addEventListener("click", function () {
        document.querySelector("#btnGuardar").disabled = false;
        document.querySelector("#selectUsuarios").disabled = true;
        borrarEvento(calEvent);
    });
    footer.appendChild(btnCancelar);
    footer.appendChild(btnBorrar);
    footer.appendChild(btnAceptar);


}

function crearModalGuardar(info) {
    limpiaModal();
    let ok = false;
    /*Titulo*/
    document.querySelector(".modal-title").innerText = "¿Quieres guardar todos los eventos?";
    /*Cuerpo*/
    let cuerpo = document.querySelector(".modal-body");
    let titulo = document.createElement("p");
    titulo.innerText = "Se guardarán todos los nuevos datos";
    cuerpo.appendChild(titulo);

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
        guardarDatos();
        crearModalMensaje("Mensaje", "Datos modificados correctamente!");
    })
    footer.appendChild(btnCancelar);
    footer.appendChild(btnAceptar);
    $('#Modal').modal()
}

/* Funcion de modal generica que asigna una cabecera, un mensaje y te permite añadir dos funciones con eventos y un parametro extra para el segundo boton (que normalmente suele ser cancelar)*/

/* El extra es utiliza en el segundo boton para opciones de volver atras por ejemplo */
function crearModalMensaje(cabecera, mensaje, btnmsg1 = "Aceptar", btnmsg2 = null, callback1, callback2, extra) {
    limpiaModal();
    /*Titulo*/
    document.querySelector(".modal-title").innerText = cabecera;
    let cuerpo = document.querySelector(".modal-body");
    let titulo = document.createElement("p");
    titulo.innerText = mensaje;
    cuerpo.appendChild(titulo);
    /*Pie*/
    let footer = document.querySelector(".modal-footer");
    let btnAceptar = document.createElement("button");

    btnAceptar.classList.add("btn", "btn-primary");
    btnAceptar.dataset.dismiss = "modal";
    btnAceptar.textContent = btnmsg1
    btnAceptar.addEventListener("click", function () {
        if (callback1 != null) callback1();
    })
    if (btnmsg2 != null) {
        let btnCerrar = document.createElement("button");
        btnCerrar.classList.add("btn", "btn-secondary");
        btnCerrar.dataset.dismiss = "modal";
        btnCerrar.textContent = btnmsg2
        btnCerrar.addEventListener("click", function () {
            if (callback2 != null) callback2(extra);
        })
        footer.appendChild(btnCerrar);
    }

    footer.appendChild(btnAceptar);
    $('#Modal').modal()

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

/* Funciones para enviar/recoger datos */

function cargarEventos() {
    num = 0;
    document.querySelector(".fc-prev-button").disabled = false;
    document.querySelector(".fc-next-button").disabled = false;
    eventos = []
    let btnGuardar = document.querySelector("#btnGuardar").disabled = true;
    let slctUsuarios = document.querySelector("#selectUsuarios");
    slctUsuarios.disabled = false;
    let url = "/eventos/gestion/horarios/leer";
    let datos = {
        idusuario: slctUsuarios[slctUsuarios.selectedIndex].dataset.usuarioId,
        mes: (calendar.getDate().getMonth() + 1),
        anno: calendar.getDate().getFullYear()
    }
    ajax(url, datos, cargarHorarios)
}

function guardarDatos() {
    let btnGuardar = document.querySelector("#btnGuardar").disabled = true;
    let select = document.querySelector("#selectUsuarios").disabled = false;
    if (eventos.length > 0) {
        let idusuario = document.querySelector("#selectUsuarios")[document.querySelector("#selectUsuarios").selectedIndex].dataset.usuarioId;
        let url = "/eventos/gestion/horarios/agregar"
        let datos = []
        eventos.forEach(function (e) {
            if (e.save !== "false") {
                let dato = {
                    id: idusuario,
                    id_evento: e.id_evento,
                    id_turno: e.id_turno,
                    fecha: e.fecha,
                    inicio: e.fecha + " " + e.start,
                    fin: e.fecha + " " + e.end,
                    tipo: e.title,
                    accion: e.save
                }
                datos.push(dato);
            }
        })
        ajax(url, datos, cargarEventos);

    } else {
        alert('Nada que guardar!');
    }
}

function cargarPredefinidos() {
    let url = '/turnos/predefinidos/get';
    ajax(url, null, guardarHorarios);
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

function guardarHorarios(datos) {
    datos = JSON.parse(datos);
    let sessionStorage = window.sessionStorage;
    sessionStorage.clear();
    datos.forEach(function (e) {
        sessionStorage.setItem("HORARIO_" + e.id, JSON.stringify(e));
    })
}

function cargarHorarios(eventos) {

    calendar.removeAllEvents();
    let datos = JSON.parse(eventos);
    datos.forEach(function (e) {
        evento = new Evento(e.id_evento, e.id_turno, e.fecha, e.start, e.end, e.title, "false", "#006cfa");
        aniadirEvento(evento);
    })


}

/* Funciones Miscelaneas*/

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

function volverAMesAtras() {
    document.querySelector(".fc-next-button").click();
    document.querySelector(".fc-next-button").click();
}

function volverAMesAlante() {
    document.querySelector(".fc-prev-button").click();
    document.querySelector(".fc-prev-button").click();
}