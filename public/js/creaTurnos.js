$(function () {

   $('#btnCrea').on('click', function (e) {
      var $this = $(this),
          $panel = $this.parents('.creaTurnos_panel');

      $panel.find('.tuplaEscondida').slideToggle();
      if ($this.css('display') != 'none') {
         $panel.find('.tuplaEscondida').focus();
      }
   });
   $('[data-toggle="tooltip"]').tooltip();
})