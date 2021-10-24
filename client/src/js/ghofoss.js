window.$ = window.jQuery = global.$ = global.jQuery = require('jquery');
require('bootstrap-datepicker');

var backend_url = 'https://ghofoss.herokuapp.com/';

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
        row.find('.contents .node .title').text(element.text.it.headline);
        timeline.append(row);
    });
}

function fixMap(path) {
    $('.map').attr('src', 'public/images/maps/' + path + '.svg');
}

function fetchData(path) {
    let url = backend_url + path;

    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'JSON',
        success: function(data) {
            fixMap(path);
            renderTimeline(data);
        }
    });
}

$('select[name=country]').change(function() {
    fetchData($(this).find('option:selected').val());
});

/*
    By default, the global timeline is fetched and rendered
*/
fetchData('world');