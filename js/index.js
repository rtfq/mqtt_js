var mqtt;
var reconnectTimeout = 5000;
var host= "raspberrypi.local";
var port=9001;
var count = 0;



function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Connected ");
    mqtt.subscribe("test/data");
}

function onFailure (message) {
    console.log("Connection failed, reattempting to connect");
    setTimeout(MQTTconnect, reconnectTimeout);
}

function onMessageArrived (msg) {
    let temp = JSON.parse(msg.payloadString);
    console.log(JSON.parse(msg.payloadString));
    updateGraph(temp);
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

  function updateGraph(temp) {
    Plotly.extendTraces('chart', {
      x: [[count]],
      y: [[temp.temp]]
    }, [0]);
    count ++;
  }
  