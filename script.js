var calendarEl = document.getElementById('calendar');
var calendar;
var events;

function initCalendar(data) {

    if (typeof calendar !== 'undefined') {
        calendar.destroy();
    }

    calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['interaction', 'dayGrid', 'timeGrid'],
        header: {
            left: 'prev,next today',
            center: 'title',
        },
        navLinks: true, // can click day/week names to navigate views
        selectable: true,
        selectMirror: true,
        editable: true,
        select: function (arg) {
            var title = prompt('Please enter your name:');
            if (title) {
                setData({
                    title: title,
                    start: arg.start,
                    end: arg.end,
                    allDay: arg.allDay
                });
            }
            calendar.unselect();
        },
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: data,
    });

    calendar.render();

}

function getData() {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            events = JSON.parse(this.responseText);
            for (var i = 0; i < events.length; i++) {
                delete events[i]['_id'];
            }
            initCalendar(events);
        }
    });
    
    xhr.open("GET", "https://events-dc99.restdb.io/rest/data");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "5d8bbd890e26877dd0577b17");
    xhr.setRequestHeader("cache-control", "no-cache");
    
    xhr.send(data);
}

function setData(arr) {

    var data = JSON.stringify(arr);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            getData();
        }
    });
    
    xhr.open("POST", "https://events-dc99.restdb.io/rest/data");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "5d8bbd890e26877dd0577b17");
    xhr.setRequestHeader("cache-control", "no-cache");
    
    xhr.send(data);             
}

document.addEventListener('DOMContentLoaded', function () {
    getData();
});
