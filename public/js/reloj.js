document.addEventListener("DOMContentLoaded", main);

function main() {
    var interval = setInterval(timestamphome, 1000);

    function timestamphome() {
        var date;
        date = new Date();
        datehora = new Date(moment().format("YYYY-MM-DD") + " " + document.querySelector("#turno").dataset.hora)
        var time = document.getElementById('divHora');
        var restante = document.getElementById('divRestante');
        time.innerHTML = date.toLocaleTimeString();
        var nueva
        if(date > datehora) {
            nueva = moment(date - datehora);
            restante.style = "color: red;";
        } else {
            nueva = moment(datehora - date);
        }
        restante.innerHTML = nueva.format("HH:mm:ss");
    }
}







