$('#btnCrea').on('click', function () {
    let div = $('.creaTurnos_panel');
    toggle(div)
});

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
        ajax(datos);
    }
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

function ajax(data) {
    let url = '/turnos/predefinidos/crear';
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
        console.log(text);
    }).catch(function (error) {
        console.log(error);
    })
}
