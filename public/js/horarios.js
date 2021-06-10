var calendar;

function Evento(id, fecha, titulo) {
    this.id = id;
    this.fecha = fecha;
    this.titulo = titulo;

}

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'today,prev,next',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,timeGridDay'
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

function pulsarDia(info) {
    crearModalDia(info.dateStr);
    $('#Modal').modal()

}

function getHorarios() {
    let url = '/turnos/predefinidos/get';
    ajax(url, guardarHorarios);
}

function guardarHorarios(data, datos) {
    alert("si")
    console.log(data)
    console.log(datos)
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
    titulo.innerText = "Nuevo dia de trabajo para usuario {{username}}";
    let selector = document.createElement("p");
    selector.innerText = "Seleccione un horario:";
    let select = document.createElement("select");
    cuerpo.appendChild(titulo);
    cuerpo.appendChild(selector);
    cuerpo.appendChild(select);


    /*Pie*/
    let footer = document.querySelector(".modal-footer");
    let btnCancelar = document.createElement("button");
    let btnAceptar = document.createElement("button");
    btnCancelar.classList.add("btn", "btn-secondary");
    btnCancelar.textContent = "Cancelar"
    btnAceptar.classList.add("btn", "btn-primary");
    btnAceptar.textContent = "Aceptar"
    footer.appendChild(btnCancelar);
    footer.appendChild(btnAceptar);


}

function agregarEvento(evento) {
    let titulo = document.querySelector("#modal-title");
    titulo.innerText = "Evento de dia:  " + info.dateStr;


}

function aniadirEvento(evento) {
    calendar.addEvent(evento);
}

function rellenarHorariosSelect() {

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
        if (callback != null) callback(data, text);
    })
}
