document.addEventListener("DOMContentLoaded", main);

function main() {
    let interval = setInterval(timestamphome, 1000);

    function timestamphome() {
        let date;
        date = new Date();
        let time = document.getElementById('divHora');
        time.innerHTML = date.toLocaleTimeString();
    }
}



