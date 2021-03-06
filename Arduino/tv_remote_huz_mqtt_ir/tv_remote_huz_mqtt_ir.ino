/***************************************************
  Some code taken from Adafruit MQTT Library ESP8266 Example
  Written by Tony DiCola for Adafruit Industries.
  MIT license, all text above must be included in any redistribution
 ****************************************************/
#include <ESP8266WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
#include "secret.h"

// IR libs
#include <Arduino.h>
#include <IRremoteESP8266.h>
#include <IRsend.h>

// Create an ESP8266 WiFiClient class to connect to the MQTT server.
WiFiClient client;
// or... use WiFiFlientSecure for SSL
//WiFiClientSecure client;

// Setup the MQTT client class by passing in the WiFi client and MQTT server and login details.
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_PASS);

Adafruit_MQTT_Subscribe presence = Adafruit_MQTT_Subscribe(&mqtt, "presence");
Adafruit_MQTT_Subscribe turnOnMsg = Adafruit_MQTT_Subscribe(&mqtt, "turnOn");
Adafruit_MQTT_Subscribe turnOffMsg = Adafruit_MQTT_Subscribe(&mqtt, "turnOff");
Adafruit_MQTT_Subscribe volUpMsg = Adafruit_MQTT_Subscribe(&mqtt, "volUp");
Adafruit_MQTT_Subscribe volDownMsg = Adafruit_MQTT_Subscribe(&mqtt, "volDown");
Adafruit_MQTT_Subscribe channelUpMsg = Adafruit_MQTT_Subscribe(&mqtt, "channelUp");
Adafruit_MQTT_Subscribe channelDownMsg = Adafruit_MQTT_Subscribe(&mqtt, "channelDown");
Adafruit_MQTT_Subscribe muteMsg = Adafruit_MQTT_Subscribe(&mqtt, "mute");
Adafruit_MQTT_Subscribe appleTvMsg = Adafruit_MQTT_Subscribe(&mqtt, "appleTV");
Adafruit_MQTT_Subscribe normalTvMsg = Adafruit_MQTT_Subscribe(&mqtt, "normalTV");
Adafruit_MQTT_Subscribe tvGuideMsg = Adafruit_MQTT_Subscribe(&mqtt, "tvGuide");

void MQTT_connect();

const uint16_t kIrLed = 4;
IRsend irsend(kIrLed);
// IR button codes
long powerCode = 0xE0E040BF;
long volUpCode = 0xE0E0E01F;
long volDownCode = 0xE0E0D02F;
long muteCode = 0xE0E0F00F;
long channelUpCode = 0xE0E048B7;
long channelDownCode = 0xE0E008F7;
long sourceCode = 0xE0E0807F;
long rightCode = 0xE0E046B9;
long leftCode = 0xE0E0A659;
long okCode = 0xE0E016E9;
long tvGuideCode = 0xE0E0F20D;

void setup() {
  Serial.begin(115200);
  delay(10);

  // Connect to WiFi access point.
  Serial.println(); Serial.println();
  Serial.print("Connecting to ");
  Serial.println(WLAN_SSID);

  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  mqtt.subscribe(&presence);
  mqtt.subscribe(&turnOffMsg);
  mqtt.subscribe(&turnOnMsg);
  mqtt.subscribe(&volUpMsg);
  mqtt.subscribe(&volDownMsg);
  mqtt.subscribe(&channelUpMsg);
  mqtt.subscribe(&channelDownMsg);
  mqtt.subscribe(&muteMsg);
  mqtt.subscribe(&appleTvMsg);
  mqtt.subscribe(&normalTvMsg);
  mqtt.subscribe(&tvGuideMsg);

  // IR setup
  irsend.begin();
  #if ESP8266
    Serial.begin(115200, SERIAL_8N1, SERIAL_TX_ONLY);
  #else  // ESP8266
    Serial.begin(115200, SERIAL_8N1);
  #endif  // ESP8266
}

uint32_t x=0;

void loop() {
  MQTT_connect();

  Serial.print(F("waiting..."));

  Adafruit_MQTT_Subscribe *subscription;
  while ((subscription = mqtt.readSubscription(5000))) {
    Serial.print(F("Found domething"));
    if (subscription == &presence) {
      Serial.print(F("Found custom message: "));
      Serial.println((char *)presence.lastread);
      irsend.sendNEC(volDownCode);
    } else if (subscription == &turnOnMsg) {
      Serial.print(F("Found turn on message: "));
      irsend.sendNEC(powerCode);
    } else if (subscription == &turnOffMsg) {
      Serial.print(F("Found turn off message: "));
      irsend.sendNEC(powerCode);
    } else if (subscription == &volUpMsg) {
      Serial.print(F("Found vol up message: "));
      irsend.sendNEC(volUpCode);
    } else if (subscription == &volDownMsg) {
      Serial.print(F("Found vol down message: "));
      irsend.sendNEC(volDownCode);
    } else if (subscription == &channelUpMsg) {
      Serial.print(F("Found channel up message: "));
      irsend.sendNEC(channelUpCode);
    } else if (subscription == &channelDownMsg) {
      Serial.print(F("Found channel down message: "));
      irsend.sendNEC(channelDownCode);
    } else if (subscription == &muteMsg) {
      Serial.print(F("Found mute message (TODO): "));
      irsend.sendNEC(muteCode);
    } else if (subscription == &tvGuideMsg) {
      Serial.print(F("Found TV guide message (TODO): "));
      irsend.sendNEC(tvGuideCode);
    } else if (subscription == &appleTvMsg) {
      Serial.print(F("Found Apple TV message: "));
      irsend.sendNEC(sourceCode); // need to 'press' one button at a time
      delay(700);
      irsend.sendNEC(rightCode);
      delay(700);
      irsend.sendNEC(okCode);
    } else if (subscription == &normalTvMsg) {
      Serial.print(F("Found Normal TV message: ")); // reverse sequence of above
      irsend.sendNEC(sourceCode);
      delay(700);
      irsend.sendNEC(leftCode);
      delay(700);
      irsend.sendNEC(okCode);
    }else {
      Serial.print(F("Found unknown message"));
    }
  }

  if(! mqtt.ping()) {
    mqtt.disconnect();
  }
}

void MQTT_connect() {
  int8_t ret;

  // Stop if already connected.
  if (mqtt.connected()) {
    return;
  }

  Serial.print("Connecting to MQTT... ");

  uint8_t retries = 3;
  while ((ret = mqtt.connect()) != 0) { // connect will return 0 for connected
       Serial.println(mqtt.connectErrorString(ret));
       Serial.println("Retrying MQTT connection in 5 seconds...");
       mqtt.disconnect();
       delay(5000);  // wait 5 seconds
       retries--;
       if (retries == 0) {
         // basically die and wait for WDT to reset me
         while (1);
       }
  }
  Serial.println("MQTT Connected!");
}
