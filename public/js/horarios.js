var calendar;
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'today,prev,next',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,timeGridDay'
        },
        locale: 'es',
        initialView: 'dayGridMonth',
        selectable: true,
        editable: true,
        dateClick: function (info) {
            pulsarDia(info)
        },
        events:[
            {
                title: 'Evento1',
                descripcion: "awas was here",
                start: '2021-06-10 10:00:00',
            }
        ]
    });
    calendar.render();

});

function pulsarDia(info) {
    $('#Modal').modal()
    let titulo = document.querySelector("#modal-title");
    titulo.innerText = "Evento de dia:  " +info.dateStr;

    let  event = {id:1 , title: 'nuevoEvento', start: info.dateStr};
    calendar('renderEvent', {
        title: "Trabajo",
        start: info.dateStr,
        allday: true
    });

}
