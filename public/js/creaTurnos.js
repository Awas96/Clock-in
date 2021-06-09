$('#btnCrea').on('click', function () {
    let div = $('.creaTurnos_panel');
    toggle(div)
});

$('.btnBorrar').on('click', function (){
    borrado($(this));
})

function borrado(obj) {
    let elemento = obj[0];
    let padre = elemento.parentElement.parentElement
    let id_ = padre.dataset.id
    let url = '/turnos/predefinidos/eliminar/'+ id_;
    ajax(url)
    $(padre).remove();

}

function toggle(div) {
    if ($(div).is(':visible')) {
        $(div).slideToggle(200);
    } else {
        $(div).slideToggle(300);
    }
}

$('#btnAceptar').on('click', subirHora);

function subirHora() {
    let horallegada = document.querySelector('#IN_TM_D');
    let horasalida = document.querySelector('#IN_TM_H');

    if (validar(horallegada) && validar(horasalida)) {
        let datos = {HoraInicio: horallegada.value, HoraFin: horasalida.value}
        let url = '/turnos/predefinidos/crear';
        ajax(url,datos,aniadirTupla)
    }
}

function aniadirTupla(datos, id_) {
    let hll = datos.HoraInicio;
    let hs = datos.HoraFin;
    let tabla = document.querySelector("#dev-table tbody");
    let fila = document.createElement("tr");
    fila.dataset.id = id_
    let tuplaHll = document.createElement("td");
    let tuplaHs = document.createElement("td");
    let tuplabtn = document.createElement("td");
    let boton = document.createElement("Button");
    boton.classList.add("btnBorrar","btn", "btn-danger");
    $(boton).on("click", function () {
        borrado($(this));
    });
    let icono = document.createElement("i");
    icono.classList.add("fas", "fa-times-circle");
    boton.appendChild(icono);
    tuplabtn.appendChild(boton);
    tuplaHll.innerText = hll;
    tuplaHs.innerText = hs;
    fila.appendChild(tuplaHll);
    fila.appendChild(tuplaHs);
    fila.appendChild(tuplabtn);
    tabla.appendChild(fila);
}

function validar(campo) {
    let reg = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/
    let ok = false
    if (reg.test(campo.value)) {
        ok = true;
    } else {
        campo.setCustomValidity("Por favor, introduzca un valor válido, el campo esta incompleto o tiene un valor erróneo");
        campo.reportValidity("");
    }
    return ok;
}

function ajax(url, data, callback = null) {

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
        if(callback != null) callback(data,text);
    })
}
