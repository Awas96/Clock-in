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
