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
    swal({
      title: 'Leave a comment!',
      html:
        '<input id="swal-input1" class="swal2-input" autofocus>' +
        '<input id="swal-input2" class="swal2-input">',
      preConfirm: function() {
        return new Promise((resolve) => {
          resolve([
            $('#swal-input1').val(),
            $('#swal-input2').val()
          ])
        })
      }
    })
    .then((result) => {
      const name = result[0]
      const comment = result[1]
      if (comment != undefined) {
        const row = getSelectedRow()
        const dataDiv = '<div class="comment">' + name + ": " + comment + '</div>'
        data.setValue(row, 2, dataDiv)
        timeline.redraw()
      }
      else {
        timeline.cancelAdd();
      }
    })
    .catch(swal.noop)
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
