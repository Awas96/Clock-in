document.addEventListener('DOMContentLoaded', function () {
    let botonesJustificar = document.querySelectorAll(".boton_justificar");

    botonesJustificar.forEach(function (e) {
        e.addEventListener("click", function () {
            crearModalIncidencia(e);
        })

    })

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
    cuerpo.style = "display: flex; flex-direction: column;align-items: center;line-height: 2em;";
    let titulo = document.createElement("p");
    let textField = document.createElement("textarea");
    textField.style = "width: 99%; height: 5em;";

    titulo.innerText = "Especifique el motivo para justificar la incidencia";

    cuerpo.appendChild(titulo);
    cuerpo.appendChild(textField);

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
        guardarIncidencia(e, textField.value);

    })
    footer.appendChild(btnCancelar);
    footer.appendChild(btnAceptar);
    $('#Modal').modal()
}


/* Funciones para el manejo de las incidencias para guardar */
function pulsarIncidencia(e) {
    crearModalIncidencia(e);
    $('#Modal').modal()
}

function guardarIncidencia(e, motivo) {
    /* La escribimos en la base de datos*/
    let url = "/eventos/incidencia/justificar";
    let datos = {
        id_incidencia: e.dataset.id,
        estado: 2,
        justificacion: motivo,
    }
    ajax(url, datos, escribirIncidencia);
    crearModalMensaje("Alerta", "Datos introducidos Correctamente!");
}

/* Funciones para envio a ajax*/

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

function escribirIncidencia(mensaje, datos) {


    $('#Modal').modal()
    let target = document.querySelector("button[data-id='" + datos.id_incidencia + "']");
    let trIncidencia = target.parentElement.parentElement;
    let trMotivo = trIncidencia.children[0];
    trMotivo.innerText = datos.justificacion;
    target.hidden = true;

}