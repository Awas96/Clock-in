function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);


    function updateClock() {
        var t = getTimeRemaining(endtime);

        clock.innerHTML ="" + ('0' + t.hours).slice(-2) +":"+ ('0' + t.minutes).slice(-2) +":"+ ('0' + t.seconds).slice(-2);

        let btnFichar = document.querySelector(".fichar_boton");
        console.log(t.hours)
        if(t.hours <= 0 ){
            btnFichar.disabled = false;
        } else {
            btnFichar.disabled = true;
        }
        if (t.total <= 0) {
            clock.innerHTML ="Hora de fichar!"
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

let fichaje = document.querySelector("#turno")

if( fichaje != null) {
    console.log(document.querySelector(".fichar_boton").dataset.state == 0)
    if(document.querySelector(".fichar_boton").dataset.state == 0) {
        var fechafichaje = new Date(moment().format("YYYY-MM-DD") + " " + document.querySelector("#turno").dataset.horainic)
    } else {
        var fechafichaje = new Date(moment().format("YYYY-MM-DD") + " " + document.querySelector("#turno").dataset.horafin)
    }
    var deadline = fechafichaje.toString();
    console.log(deadline)
    initializeClock('divRestante', deadline);
}
