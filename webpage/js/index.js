var mqtt;
var reconnectTimeout = 5000;
var host= "raspberrypi.local";
var port=9001;
var count = 0;
var render_flag = false;


function renderChart(data) {
  console.log("Rendering chart...");
  console.log(data.time);
  console.log(data.temp);

  Plotly.newPlot('chart', [{
    x: [data.time],
    y: [0],
    type: 'line'
  }], {
    displaylogo: false
  });
  render_flag = false;
  console.log("Rendering chart complete");
}

function updateGraph(data) {
  //console.log(data.time);
  //console.log(data.temp);
  Plotly.extendTraces('chart', {
    x: [[data.time]],
    y: [[data.temp]]
  }, [0]);
}
  

function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Connected");
    render_flag = true;
    mqtt.subscribe("test/data");
}

function onFailure (message) {
    console.log("Connection failed, reattempting to connect");
    setTimeout(MQTTconnect, reconnectTimeout);
}

function onMessageArrived (msg) {
    let data = JSON.parse(msg.payloadString);
    //console.log(data.time);
    //console.log(data.temp);

    if (render_flag) {
      renderChart(data);
    } else {
      updateGraph(data);
    }
    
}

function MQTTconnect() {
    console.log("connecting to "+ host +" "+ port);
    mqtt = new Paho.MQTT.Client(host,port,"Client1");
    //document.write("connecting to "+ host);
    var options = {
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure,
    };
    mqtt.onMessageArrived = onMessageArrived;
 
    mqtt.connect(options); //connect
}

