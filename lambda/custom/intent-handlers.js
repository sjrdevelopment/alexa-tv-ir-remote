/* eslint-disable  func-names */
/* eslint-disable  no-console */

const mqtt = require('mqtt')
const config = require('./config.js')

const intents = {
  turnOn: {
    intentName: 'TurnOn',
    speechText: 'Ok, turning on the TV updated 2',
    eventName: 'turnOn',
    eventDescription: 'Turning on',
  },
  turnOff: {
    intentName: 'TurnOff',
    speechText: 'OK, turning TV off, thanks for watching',
    eventName: 'turnOff',
    eventDescription: 'turn off',
  },
  volUp: {
    intentName: 'VolUp',
    speechText: 'Turning up',
    eventName: 'volUp',
    eventDescription: 'turning volume up',
  },
  volDown: {
    intentName: 'VolDown',
    speechText: 'Turning down',
    eventName: 'volDown',
    eventDescription: 'turning volume down',
  },
  channelUp: {
    intentName: 'ChannelUp',
    speechText: 'Channel up',
    eventName: 'channelUp',
    eventDescription: 'channel up',
  },
  channelDown: {
    intentName: 'ChannelDown',
    speechText: 'Channel down',
    eventName: 'channelDown',
    eventDescription: 'channel down',
  },
  mute: {
    intentName: 'Mute',
    speechText: 'Mute',
    eventName: 'mute',
    eventDescription: 'Mute',
  },
  appleTV: {
    intentName: 'AppleTV',
    speechText: 'Changing to Apple TV',
    eventName: 'appleTV',
    eventDescription: 'Apple TV',
  },
  normalTV: {
    intentName: 'NormalTV',
    speechText: 'Changing to Normal TV',
    eventName: 'normalTV',
    eventDescription: 'Normal TV',
  },
  tvGuide: {
    intentName: 'TVGuide',
    speechText: 'Changing to TV Guide',
    eventName: 'tvGuide',
    eventDescription: 'TV Guide',
  },
}

const mqttBrokerUrl = 'mqtt://m24.cloudmqtt.com'

const clientEvent = (eventName, eventText) => {
  return new Promise(function(resolve, reject) {
    const client  = mqtt.connect(mqttBrokerUrl, config)

    client.on('connect', function () {
      console.log('connected!')
      client.publish(eventName, eventText)
      client.end()
      resolve('success')
    })

    client.on('error', error => {
      console.log('error:')
      console.log(error)
    })
  })
}

const buildResponse = (handlerInput, speechText) => {
  return handlerInput.responseBuilder
    .speak(speechText)
    .withSimpleCard(speechText)
    .withShouldEndSession(true)
    .getResponse()
}

const remoteActivityIntentHandler = requestedIntent => {
  return {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === requestedIntent.intentName
    },
    handle(handlerInput) {
      const talkToMQTT = clientEvent(requestedIntent.eventName, requestedIntent.eventDescription)
      const responder = buildResponse(handlerInput, requestedIntent.speechText)

      return talkToMQTT.then(() => {
        return responder
      })
    },
  }
}

module.exports = {
    TurnOnIntentHandler:remoteActivityIntentHandler(intents.turnOn),
    TurnOffIntentHandler:remoteActivityIntentHandler(intents.turnOff),
    VolUpIntentHandler:remoteActivityIntentHandler(intents.volUp),
    VolDownIntentHandler:remoteActivityIntentHandler(intents.volDown),
    ChannelUpIntentHandler:remoteActivityIntentHandler(intents.channelUp),
    ChannelDownIntentHandler:remoteActivityIntentHandler(intents.channelDown),
    MuteIntentHandler:remoteActivityIntentHandler(intents.mute),
    AppleTVIntentHandler:remoteActivityIntentHandler(intents.appleTV),
    NormalTVIntentHandler:remoteActivityIntentHandler(intents.normalTV),
    TVGuideIntentHandler:remoteActivityIntentHandler(intents.tvGuide),
}