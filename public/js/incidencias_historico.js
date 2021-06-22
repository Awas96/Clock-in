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
        cargarEventos(true);
        cargarventanas(true);
    });
    //  btnGuardar.addEventListener("click", crearModalGuardar);

});

/*Funciones para el modal*/
function limpiaModal() {
    document.querySelector(".modal-title").innerHTML = "";
    document.querySelector(".modal-body").innerHTML = "";
    document.querySelector(".modal-footer").innerHTML = "";

}

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

function crearModalIncidencia(e) {
    limpiaModal();
    let ok = false;
    /*Titulo*/
    document.querySelector(".modal-title").innerText = "¿Crear incidencia?";
    /*Cuerpo*/
    let cuerpo = document.querySelector(".modal-body");
    let titulo = document.createElement("p");
    let selector = document.createElement("select");

    for (let i = 0; i <= 3; i++) {
        let option = document.createElement("option");
        switch (i) {
            case 0:
                option.innerText = "Retraso";
                option.dataset.tipo = "Retraso";
                break;
            case 1:
                option.innerText = "Salida Antes de tiempo";
                option.dataset.tipo = "Prematura";
                break;
            case 2:
                option.innerText = "Turno sin cerrar";
                option.dataset.tipo = "SinCerrar";
                break;
            case 3:
                option.innerText = "Absentismo";
                option.dataset.tipo = "Absentismo";
                break;
        }
        selector.appendChild(option);
    }

    titulo.innerText = "Especifique el motivo de la incidencia";
    cuerpo.appendChild(titulo);
    cuerpo.appendChild(selector);

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
        guardarIncidencia(e, selector[selector.selectedIndex].dataset.tipo);
        crearModalMensaje("Alerta", "Datos modificados correctamente!");
    })
    footer.appendChild(btnCancelar);
    footer.appendChild(btnAceptar);
    $('#Modal').modal()
}


/* Funciones para el manejo de las incidencias para guardar */
function pulsarIncidencia(e) {
    console.log(e);
    crearModalIncidencia(e);
    $('#Modal').modal()
}

function guardarIncidencia(e, tipo) {
    // Estilizamos el boton
    let tdBoton = e.parentElement;
    tdBoton.style = "display: flex;justify-content: space-around;align-items: center;"
    let btnVerIncidencias = document.createElement("a");

    let hiperenlace = document.createElement("a")
    hiperenlace.innerText = "Ver Incidencias"
    hiperenlace.classList.add("btn", "btn-danger");
    hiperenlace.href = " /incidencias/ev/" + e.dataset.evento;
    btnVerIncidencias.appendChild(hiperenlace);
    tdBoton.appendChild(btnVerIncidencias);


    //Creacion de la incidencia+
    let url = "/incidencia/nueva";
    let datos = {
        id_evento: e.dataset.evento,
        estado: 1,
        motivo: tipo,
        hora: moment().format("YYYY-MM-DD HH:mm")
    }
    ajax(url, datos);

}


/* funcion para activar el scroll para la carga de nuevos datos*/
function cargarventanas(bool) {
    if (bool) {
        $(window).bind('scroll', function () {
            if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                let slctUsuarios = document.querySelector("#selectUsuarios");
                if (slctUsuarios.selectedIndex != 0) {
                    cargarEventos(false);
                    console.log(num)
                }
            }
        });

    } else {
        $(window).unbind('scroll');
    }

}

/* Funciones para envio a ajax*/
function cargarEventos(bool) {

    if (bool) {
        num = 0;
        eventos = []
        document.querySelector("#incidencias_tabla").innerHTML = "";
    }

    // let btnGuardar = document.querySelector("#btnGuardar").disabled = true;
    let slctUsuarios = document.querySelector("#selectUsuarios");

    slctUsuarios.disabled = false;
    let url = "/historico/incidencias/leer/delimitado";
    let datos = {
        idusuario: slctUsuarios[slctUsuarios.selectedIndex].dataset.usuarioId,
        delim: num
    }
    num += 20;
    ajax(url, datos, cargarIncidencias)
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

/* funciones post ajax*/
function cargarIncidencias(datos) {

    arrDatos = JSON.parse(datos);
    console.log(arrDatos)
    if (arrDatos.length == 0) {
        cargarventanas(false);
    }
    let cuerpoTabla = document.querySelector("#incidencias_tabla");
    arrDatos.forEach(function (e) {

        let tr = document.createElement("tr");
        let tdFecha = document.createElement("td");
        let tdMotivo = document.createElement("td");
        let tdJustificacion = document.createElement("td");

        tdFecha.innerText = e.hora;
        tdMotivo.innerText = e.motivo;
        tdJustificacion.innerText = e.justificacion;


        tr.appendChild(tdFecha);
        tr.appendChild(tdMotivo);
        tr.appendChild(tdJustificacion);
        cuerpoTabla.appendChild(tr);
    });


}
