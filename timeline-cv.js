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
  this.createYearsAndMonths();
  this.createItems();
}

TimelineCV.prototype.createYearsAndMonths = function() {
  var $tbody = $('#timeline-cv > tbody');

  var years = this.getYears();
  for (var i = years.length-1; i >= 0; --i) {
    var year = years[i];

    var months = [ 
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' 
    ];

    for (var j = 12; j >= 1; --j) {
      /* create a row element for the month */
      var row = document.createElement('tr');
      $tbody.append(row);

      if (j >= 12) {
        $(row).attr('id', 'timeline-cv-year-' + year + '-month-' + j);
        $(row).attr('class', 'year');
      
        /* create the year header cell */
        var cell = document.createElement('th');
        $(cell).attr('rowspan', 12);
        $(cell).html('<p>' + year + '</p>');
        $(row).append(cell);
      } else {
        $(row).attr('id', 'timeline-cv-year-' + year + '-month-' + j)
      }

      /* create the month header cell */
      var cell = document.createElement('td');
      $(cell).attr('class', 'month');
      $(cell).html(months[j-1]);
      $(row).append(cell);

      $.each(this.data.categories, function (id, name) {
        var cell = document.createElement('td');
        $(row).append(cell);
      });
    }

    if (i >= 1 && years[i]-2 >= years[i-1]) {
      /* create a row element for the month */
      var row = document.createElement('tr');
      $tbody.append(row);

      $(row).attr('id', 'timeline-cv-year-' + year);
      $(row).attr('class', 'year empty');
      
      /* create the year header cell */
      var cell = document.createElement('th');
      if (years[i]-3 >= years[i-1]) {
        $(cell).html('<p>' + (years[i]-1) + '</p><p class="separator">&#124;</p><p>' + (years[i-1]+1) + '</p>');
      } else {
        $(cell).html(years[i]-1);
      }
      $(row).append(cell);

      /* create the month header cell */
      var cell = document.createElement('td');
      $(cell).attr('class', 'month');
      $(cell).html(months[j-1]);
      $(row).append(cell);
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

TimelineCV.prototype.createItems = function() {
  var categories = this.getCategories();
  var types = this.data.types;

  $.each(this.data.items, function (key, item) {
    var date = new Date(item.date);
    var year = Number(date.getFullYear());
    var month = Number(date.getMonth());

    var $row = $('#timeline-cv-year-' + year + '-month-' + (month+1) + '');
    $row.addClass('has-items');

    var column = categories[item.category];

    var $cell = $row.children('td:nth-last-child(' + (categories.length-column) + ')');
    
    var box = document.createElement('div');
    if (item.type && item.type.length > 0) {
      if (types[item.type] && types[item.type]['info-color']) {
        $(box).attr('style', 'background-color:' + types[item.type]['info-color']);
      }
    }
    $cell.append(box);
    $cell.addClass('has-items');

    var title = document.createElement('p');
    if (item.type && item.type.length > 0) {
      if (types[item.type] && types[item.type]['title-color']) {
        $(title).attr('style', 'background-color:' + types[item.type]['title-color']);
      }
    }
    $(title).html('<em>' + item.title + '</em>');
    $(box).append(title);

    var info = document.createElement('p');
    $(info).html(item.info);
    $(box).append(info);
  });
}

TimelineCV.prototype.getCategories = function() {
  var categories = new Array();
  var i = 0;

  $.each(this.data.categories, function (id, name) {
    categories[id] = i;
    categories[i++] = name;
  });

  return categories;
}
