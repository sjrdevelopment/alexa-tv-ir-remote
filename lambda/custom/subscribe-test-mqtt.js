const mqtt = require('mqtt')
const config = require('./config')


console.log("connecting to client...")

const client  = mqtt.connect('mqtt://m24.cloudmqtt.com', config)

client.on('connect', function () {
    console.log("connected as sub!")
})

client.subscribe('presence', function (err) {
    console.log('subscribed!')
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log('topic: ' + topic)
    console.log(message.toString())
  
})

client.on('error', error => {
    console.log('error:')
    console.log(error)
})