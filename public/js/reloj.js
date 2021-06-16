document.addEventListener("DOMContentLoaded", main);

function main() {
    var interval = setInterval(timestamphome, 1000);

    function timestamphome() {
        var date;
        date = new Date();
        datehora = new Date("2015-03-25 " + document.querySelector("#turno").dataset.hora)
        console.log(datehora)
        var time = document.getElementById('divHora');
        var restante = document.getElementById('divRestante');
        time.innerHTML = date.toLocaleTimeString();
        var nueva = datehora - date;
        restante.innerHTML = new Date(nueva).toLocaleTimeString();
    }
}







