document.addEventListener("DOMContentLoaded", main);
function main() {
    var interval = setInterval(timestamphome, 1000);

    function timestamphome() {
        var date;
        date = new Date();
        if (document.querySelector("#turno") != null) {
            var datehoraInic = new Date(moment().format("YYYY-MM-DD") + " " + document.querySelector("#turno"));
            var datehoraFin = new Date(moment().format("YYYY-MM-DD") + " " + document.querySelector("#turno"));
        } else {
            var datehoraInic = null;
        }
        var time = document.getElementById('divHora');
        var restante = document.getElementById('divRestante');
        time.innerHTML = date.toLocaleTimeString();
        var nueva
        if (datehoraInic != null) {
            datehoraInic = new Date(moment().format("YYYY-MM-DD") + " " + document.querySelector("#turno").dataset.horainic);
            datehoraFin = new Date(moment().format("YYYY-MM-DD") + " " + document.querySelector("#turno").dataset.horafin);
            if (date > datehoraInic) {
                nueva = moment(date - datehoraInic);
                restante.style = "color: red;";
            } else {
                nueva = moment(datehoraInic - date);
            }
            restante.innerHTML = nueva.format("HH:mm:ss");
            let fechaahoraInic = date;
            let fechaahoraFin = date;
            fechaahoraInic.setHours(fechaahoraInic.getHours() + 1);
            fechaahoraFin.setHours(fechaahoraFin.getHours() + 1);
            btnEntrar = document.querySelector(".fichar_boton")
            if (fechaahoraInic > datehoraInic && fechaahoraFin > datehoraFin) {
                btnEntrar.disabled = false;
            } else {
                btnEntrar.disabled = true;
            }
        } else {
            restante.innerHTML = ""
        }
    }
}



