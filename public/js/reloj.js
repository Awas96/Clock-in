document.addEventListener("DOMContentLoaded", main);

function main() {
    var interval = setInterval(timestamphome, 1000);

    function timestamphome() {
        var date;
        date = new Date();
        var time = document.getElementById('divHora');
        time.innerHTML = date.toLocaleTimeString();
    }
}







