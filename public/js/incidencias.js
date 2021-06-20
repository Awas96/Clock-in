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

    slctUsuarios.addEventListener("change", function () {
        cargarEventos(true)
    });
    //  btnGuardar.addEventListener("click", crearModalGuardar);

});

function cargarEventos(bool) {

    if (bool) {
        num = 0;
        eventos = []
        document.querySelector("#incidencias_tabla").innerHTML = "";
    }

    // let btnGuardar = document.querySelector("#btnGuardar").disabled = true;
    let slctUsuarios = document.querySelector("#selectUsuarios");

    slctUsuarios.disabled = false;
    let url = "/eventos/gestion/incidencias/leer/delimitado";
    let datos = {
        idusuario: slctUsuarios[slctUsuarios.selectedIndex].dataset.usuarioId,
        delim: num
    }
    num += 20;
    ajax(url, datos, cargarHorarios)
}

$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        let slctUsuarios = document.querySelector("#selectUsuarios");
        if (slctUsuarios.selectedIndex != 0) {
            cargarEventos(false);
        }
    }
});


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

    let cuerpoTabla = document.querySelector("#incidencias_tabla");
    arrDatos.forEach(function (e) {

        let tr = document.createElement("tr");
        let tdFecha = document.createElement("td");
        let tdEntrada = document.createElement("td");
        let tdSalida = document.createElement("td");
        let tdIncidencia = document.createElement("td");

        tdFecha.innerText = moment(e.fecha).format("YYYY-MM-DD");

        tdEntrada.innerText = e.start
        tdSalida.innerText = e.end

        let btnIncidencia = document.createElement("button")
        btnIncidencia.innerHTML = "<i class='fas fa-edit'></i>"
        btnIncidencia.classList.add("btn", "btn-danger");
        tdIncidencia.appendChild(btnIncidencia);


        tr.dataset.id = e.id_evento;
        tr.appendChild(tdFecha);
        tr.appendChild(tdEntrada);
        tr.appendChild(tdSalida);
        tr.appendChild(tdIncidencia);

        cuerpoTabla.appendChild(tr)
        cuentaFilas = 1;
        e.fichajes.forEach(function (ed) {
            cuentaFilas++;
            let trFichaje = document.createElement("tr");
            let tdFichHora = document.createElement("td");
            let tdFlecha = document.createElement("td");
            let tdFichTipo = document.createElement("td");
            let tdFichIncidencia = document.createElement("td");
            let icono = document.createElement("i");

            tdFecha.rowSpan = 3;
            icono.classList.add("fas", "fa-level-up-alt", "fa-rotate-90");
            tdFlecha.appendChild(icono);
            tdFichHora.innerText = moment(ed.hora.date).format("HH:mm");


            if (ed.tipo == 0) {

                tdFichTipo.innerText = "Entrada"
                trFichaje.style = "background-color: rgba(53,143,3,0.2)"

                // Hora de entrada segun el turno
                let horaEntrada = moment(Date.parse(moment().format("YYYY-MM-DD") + " " + tdEntrada.innerText))
                // Hora a la que se ha fichado
                let horaFichaje = moment(Date.parse(moment().format("YYYY-MM-DD") + " " + tdFichHora.innerText))
                horaEntrada.add(20, 'm')


                if (horaEntrada.unix() <= horaFichaje.unix()) {
                    tdFichIncidencia.innerText = "Retraso";
                    tdFichIncidencia.style = "color: rgba(160,0,0,0.8)"
                } else {
                    tdFichIncidencia.innerText = "Correcto";
                    tdFichIncidencia.style = "color: rgba(53,143,3,0.8)"
                }

            } else {
                tdFichTipo.innerText = "Salida"
                trFichaje.style = "background-color: rgba(160,0,0,0.1)"

                // Hora de salida segun el turno
                let horaSalida = moment(Date.parse(moment().format("YYYY-MM-DD") + " " + tdSalida.innerText))
                // Hora a la que se ha fichado
                let horaFichaje = moment(Date.parse(moment().format("YYYY-MM-DD") + " " + tdFichHora.innerText))

                horaSalida.subtract(20, 'm')
                if (horaSalida.unix() >= horaFichaje.unix()) {
                    tdFichIncidencia.innerText = "Salida antes de tiempo";
                    tdFichIncidencia.style = "color: rgba(160,0,0,0.8)"
                } else {
                    tdFichIncidencia.innerText = "Correcto";
                    tdFichIncidencia.style = "color: rgba(53,143,3,0.8)"
                }

            }

            trFichaje.dataset.id = ed.id;
            trFichaje.appendChild(tdFichHora);
            trFichaje.appendChild(tdFichTipo);
            trFichaje.appendChild(tdFichIncidencia);
            cuerpoTabla.appendChild(trFichaje);
        })
        if (cuentaFilas <= 2) {
            let fechaEvento = moment(e.fecha);
            let fechaHoy = moment(moment().format("YYYY-MM-DD"));

            console.log(fechaHoy.toDate())
            console.log(fechaEvento.toDate())

            let trSinDatos = document.createElement("tr");
            let tdSinDatos = document.createElement("td");
            tdSinDatos.colSpan = 3;
            trSinDatos.style = "background-color: rgba(160,0,0,0.3)"
            if (fechaEvento.unix() < fechaHoy.unix()) {
                tdSinDatos.innerText = "Sin datos";
            } else {
                tdSinDatos.innerText = "En Proceso";
            }

            trSinDatos.appendChild(tdSinDatos);
            cuerpoTabla.appendChild(trSinDatos);
        }

    })

    console.log(num)
}
