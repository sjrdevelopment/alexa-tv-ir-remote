
/* eslint-disable  func-names */
/* eslint-disable  no-console */

const mqtt = require('mqtt')
const config = require('./config.js')

const intents = {
  turnOn: 'TurnOn',
  turnOff: 'TurnOff',
  volUp: 'VolUp',
  volDown: 'VolDown',
  channelUp: 'ChannelUp',
  channelDown: 'ChannelDown',
  mute: 'Mute',
  appleTV: 'AppleTV',
  normalTV: 'NormalTV',
  tvGuide: 'TVGuide'
}

const mqttBrokerUrl = 'mqtt://m24.cloudmqtt.com'

const TurnOnIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === intents.turnOn
  },
  handle(handlerInput) {
    const speechText = 'Ok, turning on the TV'
    const talkToMQTT = new Promise(function(resolve, reject) {
      const client  = mqtt.connect(mqttBrokerUrl, config)
      

      client.on('connect', function () {
        console.log('connected!')
        client.publish('turnOn', 'Turning on')
        client.end()
        resolve('success')
      })
    
      client.on('error', error => {
        console.log('error:')
        console.log(error)
      })
    })
      
    const responder = handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('TV On', 'hi')
      .withShouldEndSession(true)
      .getResponse()
      
    return talkToMQTT.then(function(value) {
      return responder
    })
  },
}

const TurnOffIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === intents.turnOff
  },
  handle(handlerInput) {
    const speechText = 'OK, turning TV off, thanks for watching!'
    
    const talkToMQTT = new Promise(function(resolve, reject) {
      const client  = mqtt.connect(mqttBrokerUrl, config)
    
      client.on('connect', function () {
        console.log('connected!')
        client.publish('turnOff', 'turn off')
        client.end()
        resolve('success')
      })
    
      client.on('error', error => {
        console.log('error:')
        console.log(error)
      })
    })

    const responder = handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('TV Off', speechText)
      .withShouldEndSession(true)
      .getResponse()
    
    return talkToMQTT.then(function(value) {
      return responder
    })
  },
}

const VolUpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === intents.volUp
  },
  handle(handlerInput) {
    const speechText = 'Turning up'
    
    const talkToMQTT = new Promise(function(resolve, reject) {
      const client  = mqtt.connect(mqttBrokerUrl, config)
    
      client.on('connect', function () {
        console.log('connected!')
        client.publish('volUp', 'turning volume up')
        client.end()
        resolve('success')
      })
    
      client.on('error', error => {
        console.log('error:')
        console.log(error)
      })
    })

    const responder = handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Volume Up', speechText)
      .withShouldEndSession(true)
      .getResponse()
    
    return talkToMQTT.then(function(value) {
      return responder
    })
  },
}

const VolDownIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === intents.volDown
  },
  handle(handlerInput) {
    const speechText = 'Turning down'
    
    const talkToMQTT = new Promise(function(resolve, reject) {
      const client  = mqtt.connect(mqttBrokerUrl, config)
    
      client.on('connect', function () {
        console.log('connected!')
        client.publish('volDown', 'turning volume down')
        client.end()
        resolve('success')
      })
    
      client.on('error', error => {
        console.log('error:')
        console.log(error)
      })
    })

    const responder = handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Volume down', speechText)
      .withShouldEndSession(true)
      .getResponse()
    
    return talkToMQTT.then(function(value) {
      return responder
    })
  },
}

const ChannelUpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === intents.channelUp
  },
  handle(handlerInput) {
    const speechText = 'Channel up'
    
    const talkToMQTT = new Promise(function(resolve, reject) {
      const client  = mqtt.connect(mqttBrokerUrl, config)
    
      client.on('connect', function () {
        console.log('connected!')
        client.publish('channelUp', 'channel up')
        client.end()
        resolve('success')
      })
    
      client.on('error', error => {
        console.log('error:')
        console.log(error)
      })
    })

    const responder = handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Channel Up', speechText)
      .withShouldEndSession(true)
      .getResponse()
    
    return talkToMQTT.then(function(value) {
      return responder
    })
  },
}

const ChannelDownIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === intents.channelDown
  },
  handle(handlerInput) {
    const speechText = 'Channel down'
    
    const talkToMQTT = new Promise(function(resolve, reject) {
      const client  = mqtt.connect(mqttBrokerUrl, config)
    
      client.on('connect', function () {
        console.log('connected!')
        client.publish('channelDown', 'channel down')
        client.end()
        resolve('success')
      })
    
      client.on('error', error => {
        console.log('error:')
        console.log(error)
      })
    })

    const responder = handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Channel Down', speechText)
      .withShouldEndSession(true)
      .getResponse()
    
    return talkToMQTT.then(function(value) {
      return responder
    })
  },
}

const MuteIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === intents.mute
  },
  handle(handlerInput) {
    const speechText = 'Mute'
    
    const talkToMQTT = new Promise(function(resolve, reject) {
      const client  = mqtt.connect(mqttBrokerUrl, config)
    
      client.on('connect', function () {
        console.log('connected!')
        client.publish('mute', 'Mute')
        client.end()
        resolve('success')
      })
    
      client.on('error', error => {
        console.log('error:')
        console.log(error)
      })
    })

    const responder = handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Mute', speechText)
      .withShouldEndSession(true)
      .getResponse()
    
    return talkToMQTT.then(function(value) {
      return responder
    })
  },
}

const AppleTVIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === intents.appleTV
  },
  handle(handlerInput) {
    const speechText = 'Changing to Apple TV'
    
    const talkToMQTT = new Promise(function(resolve, reject) {
      const client  = mqtt.connect(mqttBrokerUrl, config)
    
      client.on('connect', function () {
        console.log('connected!')
        client.publish('appleTV', 'Apple TV')
        client.end()
        resolve('success')
      })
    
      client.on('error', error => {
        console.log('error:')
        console.log(error)
      })
    })

    const responder = handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Apple TV', speechText)
      .withShouldEndSession(true)
      .getResponse()
    
    return talkToMQTT.then(function(value) {
      return responder
    })
  },
}

const NormalTVIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === intents.normalTV
  },
  handle(handlerInput) {
    const speechText = 'Changing to Normal TV'
    
    const talkToMQTT = new Promise(function(resolve, reject) {
      const client  = mqtt.connect(mqttBrokerUrl, config)
    
      client.on('connect', function () {
        console.log('connected!')
        client.publish('normalTV', 'Normal TV')
        client.end()
        resolve('success')
      })
    
      client.on('error', error => {
        console.log('error:')
        console.log(error)
      })
    })

    const responder = handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Normal TV', speechText)
      .withShouldEndSession(true)
      .getResponse()
    
    return talkToMQTT.then(function(value) {
      return responder
    })
  },
}

const TVGuideIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === intents.tvGuide
  },
  handle(handlerInput) {
    const speechText = 'Changing to TV Guide'
    
    const talkToMQTT = new Promise(function(resolve, reject) {
      const client  = mqtt.connect(mqttBrokerUrl, config)
    
      client.on('connect', function () {
        console.log('connected!')
        client.publish('tvGuide', 'TV Guide')
        client.end()
        resolve('success')
      })
    
      client.on('error', error => {
        console.log('error:')
        console.log(error)
      })
    })

    const responder = handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('TV Guide', speechText)
      .withShouldEndSession(true)
      .getResponse()
    
    return talkToMQTT.then(function(value) {
      return responder
    })
  },
}
module.exports = {
    TurnOnIntentHandler: TurnOnIntentHandler,
    TurnOffIntentHandler: TurnOffIntentHandler,
    VolUpIntentHandler: VolUpIntentHandler,
    VolDownIntentHandler: VolDownIntentHandler,
    ChannelUpIntentHandler: ChannelUpIntentHandler,
    ChannelDownIntentHandler: ChannelDownIntentHandler,
    MuteIntentHandler: MuteIntentHandler,
    AppleTVIntentHandler: AppleTVIntentHandler,
    NormalTVIntentHandler: NormalTVIntentHandler,
    TVGuideIntentHandler: TVGuideIntentHandler
}