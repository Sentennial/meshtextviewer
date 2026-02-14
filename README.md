# meshtextviewer

This is my attempt at creating a webapp which visualizes messages received on your meshtastic node. It does not connect to your node directly, but uses MQTT. It requires you to have an MQTT broker running and the node publishing messages to it.

## Requirements
A meshtastic node capable of MQTT over local network. 
Your meshtastic node configured to publish to your local MQTT broker, make sure you **disable encryption** and **enable JSON**
Docker and Compose installed on your system where this will be running
A MQTT broker (such as Mosquitto) running configured with a user and password that is allowed to write to your chosen topic (msh/# by default)

## Running
Clone repo, rename `example.env` to `.env`. Edit the default options for your environment.
Run with `docker compose up -d`
Visit `http://localhost:8844' to view the UI.

## ToDo