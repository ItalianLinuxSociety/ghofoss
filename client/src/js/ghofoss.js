window.$ = window.jQuery = global.$ = global.jQuery = require('jquery');
require('bootstrap-datepicker');

$('.input-daterange').datepicker({});

$('.input-daterange input').each(function() {
    $(this).datepicker('clearDates');
});