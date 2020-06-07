# Alexa TV remote
### Control a TV using Alexa, using infrared for non-smart TVs

## Architecture
![](https://github.com/sjrdevelopment/alexa-tv-ir-remote/blob/master/docs/architecture-diagram-tv-remote.png)

## Controlling the TV
This project controls a TV using the infrared codes obtained from decoding the remote.  I used Ken Shirrif's IR library with a IR receiver connected to an Arduino Uno to decode my TV's remote codes.  I then used these in the project with an IR LED controlled using the ESP8266 IR library, running on an Adafruit Huzzah ESP8266 board.

## Lambda and MQTT
An MQTT broker is required to host the connection between the hardware and the Lambda function that resolves each Alexa interaction with the skill.
