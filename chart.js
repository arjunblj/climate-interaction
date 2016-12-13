'use strict';

google.load("visualization", "1");

// Set callback to run when API is loaded
google.setOnLoadCallback(drawVisualization);

var timeline;
var data;

function CO2emissionsChart() {
  // Create and populate a data table.
  var data = new google.visualization.DataTable();
  data.addColumn('datetime', 'start');
  data.addColumn('datetime', 'end');
  data.addColumn('string', 'content');
  data.addColumn('string', 'group');
  data.addColumn('boolean', 'editable')

  data.addRows(metricTonSeries)

  var options = {
    width:  "100%",
    height: "300px",
    stackEvents: false,
    editable: true,
    style: "box"
  };

  var onadd = function() {
    console.log('add')
    var row = getSelectedRow();
    var newContent = prompt("Enter comment, stored on timeline.");
    if (newContent != undefined) {
      const dataDiv = '<div class="comment">' + newContent + '</div>'
      data.setValue(row, 2, dataDiv);
      timeline.redraw();
    }
    else {
      timeline.cancelAdd();
    }
  };

  timeline = new links.Timeline(document.getElementById('timeline'), options);
  google.visualization.events.addListener(timeline, 'add', onadd);
  timeline.draw(data);
}

function getSelectedRow() {
  var row = undefined;
  var sel = timeline.getSelection();
  if (sel.length) {
    if (sel[0].row != undefined) {
      row = sel[0].row;
    }
  }
  return row;
}

function drawVisualization() {
    CO2emissionsChart();
}
