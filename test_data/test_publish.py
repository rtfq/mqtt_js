import paho.mqtt.client as paho
from json import dumps
from time import sleep, time
from gpiozero import CPUTemperature

mqtt_broker = "localhost"
mqtt_port = 1883

mqtt_topic = "test/data"

cpu = CPUTemperature()

def get_cpu_temp():
    return cpu.temperature

def main():
    client = paho.Client()
    client.connect(mqtt_broker, mqtt_port)

    try:
        while 1:
            payload = {
                'temp': get_cpu_temp(),
                'time': time()
            }
            client.publish(mqtt_topic, dumps(payload))
            sleep(1)

    except KeyboardInterrupt:
        client.disconnect()


if __name__ == '__main__':
    print("Testing MQTT publishing")
    main()
