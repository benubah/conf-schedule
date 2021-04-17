document.addEventListener('DOMContentLoaded', function() {
  var timeZoneSelectorEl = document.getElementById('time-zone-selector');
 timeZone = document.getElementById('time-zone-selector').value;
  var loadingEl = document.getElementById('loading');
  var calendarEl = document.getElementById('calendar');
evnt = {
                url: "user2021.json", //your url,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    //based on the dropdown changetimezone of each event 
//console.log(data);

                    let updatedTime = [];
                    $.each(data, function( k, v ) {
v.start = moment.tz(v.start, timeZone).format();
v.end = moment.tz(v.end, timeZone).format();
                        updatedTime[k] = v ;
                    });
//console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
                    return updatedTime;
                }
            };
  var calendar = new FullCalendar.Calendar(calendarEl, {
    
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,listWeek,dayGridMonth,timeGridDay'
    },
initialDate: '2021-07-04',
titleFormat: { // will produce something like "Tuesday, September 18, 2018"
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  },
    initialView: 'timeGridWeek',
height: "auto",
        slotDuration: "00:30:00",
        defaultTimedEventDuration: "00:30:00",
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    selectable: true,
    dayMaxEvents: true, // allow "more" link when too many events


 eventDidMount: function(info) {
      var tooltip = new Tooltip(info.el, {
        title: info.event.extendedProps.description,
        placement: 'top',
        trigger: 'hover',
        container: 'body'
      });
    },
dayHeaderContent: (args) => {
    return moment(args.date).format('dddd Do')
},

events: evnt,
timeZone: timeZone,
      // events: 'user2021.json',
    loading: function(bool) {
      if (bool) {
        loadingEl.style.display = 'inline'; // show
      } else {
        loadingEl.style.display = 'none'; // hide
      }
    },

    eventTimeFormat: { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }
  });

  calendar.render();

  // load the list of available timezones, build the <select> options
  // it's highly encouraged to use your own AJAX lib instead of using FullCalendar's internal util
  

  // when the timezone selector changes, dynamically change the calendar option
  timeZoneSelectorEl.addEventListener('change', function() {
 timeZone = document.getElementById('time-zone-selector').value;

var eventSource = [];
                eventSource = calendar.getEventSources();
                $.each(eventSource, function (key, value) {
                    value.remove();
                });
                calendar.addEventSource(evnt);
//console.log(eventSource);
                calendar.refetchEvents();    //calendar.setOption('events', evnt);
  });

});
