
<h1 align="center">MQTT_js</h1>

</p>

<p align="center">
  <a href="#dart-about">| About | Requirments | </a> &#xa0; 
</p>

<br>

# :dart: About #

A repostiory to hold a few MQTT examples, including generating data and displaying it on a webpage.

### MQTT Example with 2 component parts:

### 1. Generate example data

- Reads CPU temperature (modify `get_cpu_temp()` for system-specific method of getting temperature)

- `test_publish.py` runs a 1Hz, timestamped data feed containng the current CPU temperature

- Timestamped data is published to the defined MQTT broker address, port and topic

- Default details:
```
mqtt_broker = "localhost"
mqtt_port = 1883

mqtt_topic = "test/data"
```


### 2. Display the temperature on a webpage

- Using the VSCode "Live Server" extension, index.html is rendered locally

- The webpage (i.e. the frontend JS) directly connects to the MQTT broker runnning onn the Pi, using the Websocket port at 9001

- `on_message` callback is set to update the Plotly graph on the webpage


# :white_check_mark: Requirements #

python packages listed in `requirements.txt`

An MQTT broker must be setup on one of the machines and the matching details set in the examples.

# :rocket: Installation #

```
# To be run on RPi for data generating service

pip3 install -r requirements.txt

sudo cp .test_data/test_publish.py /opt/test_publish.py
sudo cp .install/test_data.service /etc/systemd/system/test_data.service
sudo systemctl enable test_data.service
sudo systemctl start test_data.service

```

# :memo: ToDo and Improvements #
- Add MQTT Broker setup information
- Increase example base:
  - Better example dashboard: A full stack webapp with MQTT feeds fed to frontend through API's, possibly React based?
  - Database : Setup a logging feature to save the data to a database (could be local or cloud based)
  - Remote (cloud service) example: Publish or subscribe to data from a cloud broker
  - MQTT in depth: Explore some more intricate uses of MQTT with Authentication, Quality Of Service ("QoS"), Last Will & Testament(LWT) and Retain Message features.

<a href="#top">Back to top</a>
