document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
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
        }
    });
    calendar.render();

});

function pulsarDia(info) {
    $("#exampleModal").modal();
}