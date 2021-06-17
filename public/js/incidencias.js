/* Estructuras y definiciones */
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

document.addEventListener('DOMContentLoaded', function () {
    let btnGuardar = document.querySelector("#btnGuardar");
    let slctUsuarios = document.querySelector("#selectUsuarios");
    slctUsuarios.selecterIndex = 0;

    slctUsuarios.addEventListener("change", cargarEventos);
 //  btnGuardar.addEventListener("click", crearModalGuardar);

});



function cargarEventos() {
    num = 0;
    eventos = []

  // let btnGuardar = document.querySelector("#btnGuardar").disabled = true;
   let slctUsuarios = document.querySelector("#selectUsuarios");

    slctUsuarios.disabled = false;
    let url = "/eventos/gestion/incidencias/leer/delimitado";
    let datos = {
        idusuario: slctUsuarios[slctUsuarios.selectedIndex].dataset.usuarioId,
        delim : 20
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

function cargarHorarios(eventos) {

    calendar.removeAllEvents();
    let datos = JSON.parse(eventos);
    datos.forEach(function (e) {
        evento = new Evento(e.id_evento, e.id_turno, e.fecha, e.start, e.end, e.title, "false", "#006cfa");
        aniadirEvento(evento);
    })


}
