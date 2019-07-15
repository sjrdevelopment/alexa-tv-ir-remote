# Alexa TV remote
### Control a TV using and Alexa Skill and Infrared, for dumb TVs

## Architecture
![](https://github.com/sjrdevelopment/alexa-tv-ir-remote/blob/master/docs/architecture-diagram-tv-remote.png)

## Controlling the TV
This project relies on reverse-engineering the Infra-red remote of a TV to control it.  I used Ken Shirrif's IR library with a standard Arduino Uno to decode my TV's remote codes.  I then used these in the project with an IR LED controlled using the ESP8266 IR library.

## Lambda and MQTT
An MQTT broker is required to host the connection between the hardware and the Lambda function that resolves each Alexa interaction with the skill.
