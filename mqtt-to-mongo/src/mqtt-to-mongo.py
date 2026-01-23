import logging
import json
import paho.mqtt.client as mqtt
import pymongo
import os

logging.basicConfig(
    format='%(asctime)s %(levelname)-8s %(message)s',
    level=logging.INFO,
    datefmt='%Y-%m-%d %H:%M:%S')

def on_connect(client, userdata, flags, reason_code, properties):
    logging.warning(f"Connected with result code {reason_code}")
    client.subscribe(os.getenv('MQTT_ROOT_TOPIC','msh')+"/"+os.getenv('MQTT_REGION','US')+"/"+os.getenv('MQTT_INT','2')+"/json/"+os.getenv('MESH_PRESET','LongFast')+"/"+os.getenv('MESH_NODE_ID','#'))

def on_message(client, userdata, msg):
    try:
        dic = json.loads(str(msg.payload.decode()))
    except:
        logging.error("Error decoding payload")
    try:
        if (dic['type'] == 'nodeinfo'):
            #nodeinfoc.insert_one(dic)
            nodeinfoc.update_one({'from': dic['from']}, {'$set': dic}, upsert=True)
            logging.info("Inserted 1 row into nodeinfo")
        if (dic['type'] == 'text'):
            textc.insert_one(dic)
            logging.info("Inserted 1 row into text")

    except Exception as e:
            logging.error(f'Error inserting row: {e}')

mongoc = pymongo.MongoClient("mongodb://"+os.getenv('MONGO_USER','root')+":"+os.getenv('MONGO_PASS','Password')+"@mongo:27017/")
mongodb = mongoc[os.getenv('MONGO_DB','mesh')]
nodeinfoc = mongodb["nodeinfo"]
textc = mongodb["text"]

mqttc = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
mqttc.username_pw_set(os.getenv('MQTT_USER','mesh'), os.getenv('MQTT_PASS','mesh'))
mqttc.on_connect = on_connect
mqttc.on_message = on_message

mqttc.connect(os.getenv('MQTT_HOST','127.0.0.1'), int(os.getenv('MQTT_PORT',1883)), 60)

mqttc.loop_forever()