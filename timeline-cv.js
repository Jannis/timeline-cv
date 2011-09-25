/* vi:set sw=2 sts=2 ts=2 expandtab: */

function TimelineCV(uri) {
  this.uri = uri;
  this.data = TimelineCV.init_data;
  this.populate();
}

TimelineCV.prototype.populate = function() {
  this.populateHeader();
  this.populateTimeline();
}

TimelineCV.prototype.populateHeader = function() {
  $('#timeline-cv > thead').append('<tr></tr>');

  var row = $('#timeline-cv > thead > tr');
  
  row.append('<th>&nbsp;</th>');
  row.append('<td>&nbsp;</td>');

  $.each(this.data.categories, function (id, name) {
    row.append('<td>' + name + '</td>');
  });
}

TimelineCV.prototype.populateTimeline = function() {
  var tbody = $('#timeline-cv > tbody');

  var years = this.getYears();
  for (var year = years[years.length-1]; year >= years[0]; --year) {
    var months = [ 
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' 
    ];

    if (years.indexOf(year) < 0) {
      var row = document.createElement('tr');
      tbody.append(row);

      $(row).attr('id', 'timeline-cv-year-' + year);
      $(row).attr('class', 'year');

      /* create the year header cell */
      var cell = document.createElement('th');
      $(cell).html(year);
      $(row).append(cell);

      /* create the month header cell */
      var cell = document.createElement('td');
      $(cell).attr('class', 'month');
      $(row).append(cell);

      $.each(this.data.categories, function (id, name) {
        var cell = document.createElement('td');
        $(row).append(cell);
      });
    } else {
      for (var j = 0; j < 12; ++j) {
        /* create a row element for the month */
        var row = document.createElement('tr');
        tbody.append(row);

        if (j == 0) {
          $(row).attr('id', 'timeline-cv-year-' + year);
          $(row).attr('class', 'year');
        
          /* create the year header cell */
          var cell = document.createElement('th');
          $(cell).attr('rowspan', 12);
          $(cell).html(year);
          $(row).append(cell);
        }

        /* create the month header cell */
        var cell = document.createElement('td');
        $(cell).attr('class', 'month');
        $(cell).html(months[j]);
        $(row).append(cell);

        $.each(this.data.categories, function (id, name) {
          var cell = document.createElement('td');
          $(row).append(cell);
        });
      }
    }
  }
}

TimelineCV.prototype.getYears = function() {
  var years = new Array();

  $.each(this.data.items, function (key, val) {
    var date = new Date(val.date);
    var year = Number(date.getFullYear());
    if (years.indexOf(year) < 0) {
      years.push(year);
    }
  });

  return years.sort();
}
