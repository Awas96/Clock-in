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

/* num maneja el movimiento de los eventos en el limit*/
var num = 20;
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
        delim: num
    }
    num = num + 20;
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

function cargarHorarios(datos) {

    arrDatos = JSON.parse(datos);
    console.log(arrDatos)
    let cuerpoTabla = document.querySelector("#incidencias_tabla");
    cuerpoTabla.innerHTML = ""
    arrDatos.forEach(function (e) {

        let tr = document.createElement("tr");
        let tdFecha = document.createElement("td");
        let tdEntrada = document.createElement("td");
        let tdSalida = document.createElement("td");

        tdFecha.innerText = moment(e.fecha).format("YYYY-MM-DD");
        tdEntrada.innerText = moment(e.entrada).format("HH:mm");
        tdSalida.innerText = moment(e.salida).format("HH:mm");

        tr.dataset.id = e.id_evento;
        tr.appendChild(tdFecha);
        tr.appendChild(tdEntrada);
        tr.appendChild(tdSalida);
        cuerpoTabla.appendChild(tr)

        e.fichajes.forEach(function (ed) {
            let trfichaje = document.createElement("tr");
            let tdfichHora = document.createElement("td");
            let tdvacio = document.createElement("td");
            let tdfichTipo = document.createElement("td");
            let icono = document.createElement("i");

            icono.classList.add("fas", "fa-level-up-alt", "fa-rotate-90");
            tdvacio.appendChild(icono);
            tdfichHora.innerText = moment(ed.hora.date).format("HH:mm");


            if (ed.tipo == 0) {

                tdfichTipo.innerText = "Entrada"
            } else {
                tdfichTipo.innerText = "Salida"
            }

            trfichaje.dataset.id = ed.id;
            trfichaje.appendChild(tdvacio);
            trfichaje.appendChild(tdfichHora);
            trfichaje.appendChild(tdfichTipo);
            trfichaje.style = "background-color: rgba(0,0,0,0.05)";
            cuerpoTabla.appendChild(trfichaje);
        })

    })


}
