document.addEventListener('DOMContentLoaded', function() {
  var timeZoneSelectorEl = document.getElementById('time-zone-selector');
 timeZone = document.getElementById('time-zone-selector').value;
  var loadingEl = document.getElementById('loading');
  var calendarEl = document.getElementById('calendar');
var min_time = moment.utc('2021-07-07 06:00').tz(timeZone).format("hh:mm:ss");

evnt = {
                url: "useR2021_tutorials.json", //your url,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    //based on the dropdown changetimezone of each event 
//console.log(moment.tz('2021-07-06 07:00', 'America/Los_Angeles').format());

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
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
views: {
    resourceTimeGridTwoDay: {
      type: 'resourceTimeGrid',
      duration: { days: 2 },
visibleRange: {
    start: '2021-07-07',
    end: '2021-07-08'
  },
      buttonText: 'Time Grid'
    },
resourceTimelineTwoDay: {
      type: 'resourceTimelineDay',
      duration: { days: 2 },
visibleRange: {
    start: '2021-07-07',
    end: '2021-07-08'
  },
      buttonText: 'Timeline'
    },

timeGridTwoDay: {
      type: 'timeGridDay',
      duration: { days: 2 },
visibleRange: {
    start: '2021-07-07',
    end: '2021-07-08'
  },
      buttonText: 'Day'
    }


  },
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'resourceTimelineTwoDay,resourceTimeGridTwoDay,timeGridTwoDay'
    },
   resources: [
	{id: 'Track 1', title: 'Track 1'},
{id: 'Track 2', title: 'Track 2', eventBackgroundColor: 'green'},
{id: 'Track 3', title: 'Track 3', eventColor: 'orange'},
{id: 'Track 4', title: 'Track 4', eventBackgroundColor: 'red'}
],
resourceAreaHeaderContent: 'Tracks',
resourceAreaWidth: '10%',
initialDate: '2021-07-07',
//slotMinTime: min_time,
initialView: 'resourceTimeGridTwoDay',

height: "auto",
        slotDuration: "00:30:00",
    navLinks: true, // can click day/week names to navigate views
    editable: false,
    selectable: true,
    dayMaxEvents: true, // allow "more" link when too many events


 eventDidMount: function(info) {
      var tooltip = new Tooltip(info.el, {
        title: info.event.extendedProps.description,
        placement: 'right',
        trigger: 'hover',
	   animation: true, 
	   html: true,
	           container: 'body'
      });
    },

events: evnt,
timeZone: timeZone,
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
 // min_time = moment.utc('2021-07-06 20:00').tz(timeZone).format("hh:mm:ss");

var eventSource = [];
                eventSource = calendar.getEventSources();
                $.each(eventSource, function (key, value) {
                    value.remove();
                });
                calendar.addEventSource(evnt);
//calendar.setOption('slotMinTime', min_time);
//console.log(eventSource);
                calendar.refetchEvents();    //calendar.setOption('events', evnt);
  });

});
