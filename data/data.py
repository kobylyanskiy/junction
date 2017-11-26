import json
# import pandas as pd
import paho.mqtt.client as mqtt

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

def on_subscribe(client, userdata,mid, granted_qos):
    print("Subscribed: "+str(mid)+" "+str(granted_qos))

def on_message(client, userdata, msg):
    pid = json.loads(msg.payload)
    print(msg.payload, pid['values'])



client = mqtt.Client()
client.on_connect = on_connect
client.on_subscribe = on_subscribe
client.on_message = on_message
client.username_pw_set("group16","octopus")

client.connect("193.167.1.8", 1883)

client.subscribe("sensortag/#", qos=0)

client.loop_forever()