function getData() {
  return Math.random();
}

var data;
var time;



async function updateMeasurements() {
  await fetch('/latest')
    .then(function(response) {
      //console.log(response.json());
      return response.json();
    })
    .then(function(responseJSON) {
      data = responseJSON['pressure'];
      time = responseJSON['time'];
      //console.log(data);
      //return data;
    });
};



/*
var cnt = 0;
setInterval(function() {
  updateMeasurements();
  Plotly.extendTraces('chart', {
    x: [[time]],
    y: [[data]]
  }, [0]);
}, 330);


var chartData = [{
  x: [time],
  y: [data],
  mode: 'lines',
  line: {color: '#80CAF6'}
}]


Plotly.newPlot('chart', chartData);

var cnt = 0;

var interval = setInterval(function() {

  var update = {
  x:  [[time]],
  y: [[data]]
  }

  Plotly.extendTraces('chart', update, [0]);

  if(++cnt === 100) clearInterval(interval);
}, 1000);

setInterval();
*/
