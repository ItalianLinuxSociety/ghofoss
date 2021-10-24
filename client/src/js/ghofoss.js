window.$ = window.jQuery = global.$ = global.jQuery = require('jquery');
require('bootstrap-datepicker');

$('.input-daterange').datepicker({});

$('.input-daterange input').each(function() {
    $(this).datepicker('clearDates');
});

function renderTimeline(data) {
    var timeline = $('.timeline');
    timeline.find('.row:not(.sample)').remove();

    data.events.forEach((element) => {
        let row = timeline.find('.row.sample').first().clone();
        row.removeClass('sample').removeClass('d-none');
        row.find('.year').text(element.start_date.year);
        row.find('.contents').find('.node').text(element.text.it.headline);
        timeline.append(row);
    });
}

function fetchData(path) {
    $.ajax({
        url: path,
        method: 'GET',
        dataType: 'JSON',
        success: function(data) {
            renderTimeline(data);
        }
    });
}

var backend_url = 'https://ghofoss.herokuapp.com/';

$('select[name=country]').change(function() {
    fetchData(backend_url + $(this).find('option:selected').val());
});

/*
    By default, the global timeline is fetched and rendered
*/
fetchData(backend_url + 'world');